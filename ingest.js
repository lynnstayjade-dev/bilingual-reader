#!/usr/bin/env node
/**
 * ingest.js — 双语外刊采集管线（生产级）
 *
 * 功能：
 *   1. 抓取配置的合法 RSS / 开放授权源（不搬运盗版整刊）
 *   2. 抽取正文（优先 <content:encoded>，否则清洗 <description>）
 *   3. 用机器翻译回填中文（默认百度翻译免费 API，可配置；无 key 则留空 cn）
 *   4. 自动标记固定搭配（collocations）与金句（quotes）
 *   5. 估算阅读难度（CEFR / IELTS 档）
 *   6. 输出 articles.json（被 index.html 消费）
 *
 * 运行（需开放网络，沙箱内多数外网被封）：
 *   node ingest.js
 * 定时：见 .github/workflows/daily.yml（GitHub Actions 每日自动跑）
 *
 * 环境变量：
 *   BAIDU_APPID / BAIDU_KEY   百度翻译 API 凭据（可选；缺省则 cn 留空）
 *   FEEDS_FILE                自定义源文件（json 数组），缺省用下方 DEFAULT_FEEDS
 *   MAX_PER_FEED              每源最多取几篇（默认 6）
 *   OUT                       输出路径（默认 ./articles.json）
 */

'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MAX_PER_FEED = parseInt(process.env.MAX_PER_FEED || '6', 10);
const OUT = process.env.OUT || path.join(__dirname, 'articles.json');
const BAIDU_APPID = process.env.BAIDU_APPID || '';
const BAIDU_KEY = process.env.BAIDU_KEY || '';

/* ---------- 合法 / 开放授权源（均为免费 RSS 或开放文，非盗版整刊）---------- */
const DEFAULT_FEEDS = [
  { source: 'The Guardian',        category: '新闻',   level: 'IELTS 7.5', url: 'https://www.theguardian.com/world/rss' },
  { source: 'BBC News',            category: '新闻',   level: 'IELTS 7',   url: 'https://feeds.bbci.co.uk/news/rss.xml' },
  { source: 'NPR',                 category: '新闻',   level: 'IELTS 7',   url: 'https://feeds.npr.org/1001/rss.xml' },
  { source: 'Scientific American', category: '科学',   level: 'IELTS 8',   url: 'https://www.scientificamerican.com/rss/news/' },
  { source: 'The Atlantic',        category: '文化',   level: 'IELTS 8',   url: 'https://www.theatlantic.com/feed/all/' },
  { source: 'Harvard Business Review', category: '商业', level: 'IELTS 8', url: 'https://hbr.org/rss/topic/the-latest' },
  { source: 'MIT Technology Review', category: '科技', level: 'IELTS 8',  url: 'https://www.technologyreview.com/feed/' },
  { source: 'The Conversation',    category: '观点',   level: 'IELTS 7.5', url: 'https://theconversation.com/us/articles.atom', license: 'CC BY' },
  { source: 'Nature',              category: '科学',   level: 'IELTS 8.5', url: 'https://www.nature.com/nature.rss' },
  { source: 'The Economist (Telegram/Newsletter 合法转发)', category: '商业', level: 'IELTS 8.5', url: '', note: 'Economist 正刊为付费墙；请用你本人订阅的 newsletter 转发，或仅采集其开放博客/读者来信。' },
  { source: 'Financial Times',     category: '商业',   level: 'IELTS 8.5', url: '', note: 'FT 正刊付费；同理走个人订阅 newsletter。' },
  { source: 'New York Times',      category: '新闻',   level: 'IELTS 8',   url: '', note: 'NYT RSS 需其开发者 API key；见 https://developer.nytimes.com' },
  { source: 'Vox',                 category: '观点',   level: 'IELTS 7',   url: 'https://www.vox.com/rss/index.xml' },
  { source: 'AP News',             category: '新闻',   level: 'IELTS 7',   url: 'https://tinyurl.com/aprssworld' },
  { source: 'Reuters',             category: '新闻',   level: 'IELTS 7.5', url: 'https://news.google.com/rss/search?q=site:reuters.com&hl=en-US' }
];

/* ---------- 固定搭配词库（用于在正文高亮）---------- */
const COLLOCATIONS = [
  'climate change','global warming','carbon emissions','renewable energy','fossil fuels','clean energy',
  'interest rates','central bank','monetary policy','fiscal policy','economic growth','supply chain',
  'trade deficit','stock market','cost of living','job market','labor market','gross domestic product',
  'artificial intelligence','machine learning','data privacy','cyber security','tech giant','social media',
  'public health','health care','mental health','pandemic','vaccine rollout','clinical trial',
  'human rights','civil society','rule of law','freedom of speech','income inequality','wealth gap',
  'foreign policy','national security','diplomatic relations','military alliance','nuclear weapons','peace treaty',
  'higher education','critical thinking','scientific research','breakthrough','peer review','field of study',
  'cost of living','standard of living','quality of life','sense of belonging','social cohesion','public opinion',
  'take effect','play a role','bear fruit','come to light','cast doubt','raise questions','draw attention',
  'in light of','with regard to','a wide range of','a matter of fact','by and large','on the grounds that',
  'pave the way for','at the forefront of','in the wake of','against the backdrop of','at the expense of'
];

/* ---------- 工具 ---------- */
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
          || block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)/>`, 'i'));
  return m ? m[1].trim() : '';
}
function decode(s){ return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&apos;/g,"'"); }
function stripHtml(s){ return decode(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
function plainText(s){ return stripHtml(s); }

function parseFeed(xml, feed){
  const items = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks.slice(0, MAX_PER_FEED)){
    const title = stripHtml(tag(b,'title'));
    const link  = (tag(b,'link') || (b.match(/<link[^>]*href="([^"]+)"/i)||[])[1] || '').trim();
    const pub   = tag(b,'pubDate') || tag(b,'published') || tag(b,'updated') || tag(b,'dc:date');
    let body = tag(b,'content:encoded') || tag(b,'content') || tag(b,'description') || tag(b,'summary');
    body = stripHtml(body);
    if (!title || body.length < 120) continue;
    const paras = body.split(/\n{2,}|\.\s+(?=[A-Z])/).map(p=>p.trim()).filter(p=>p.length>40);
    if (!paras.length) paras.push(body.slice(0, 600));
    items.push({
      source: feed.source, category: feed.category, level: feed.level,
      title, titleCn: '', date: pub ? new Date(pub).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
      byline: feed.source + (feed.license ? ' · ' + feed.license : ''),
      url: link, excerpt: paras[0].slice(0,160), body: paras.slice(0, 40), bodyCn: [], tags: [], collocations: [], quotes: []
    });
  }
  return items;
}

/* ---------- 机器翻译（百度免费 API）---------- */
const transCache = new Map();
async function baiduTranslate(text){
  const q = text.slice(0, 5500);
  if (transCache.has(q)) return transCache.get(q);
  if (!BAIDU_APPID || !BAIDU_KEY) return '';
  const salt = String(Date.now());
  const sign = crypto.createHash('md5').update(BAIDU_APPID + q + salt + BAIDU_KEY).digest('hex');
  const params = new URLSearchParams({ q, from: 'en', to: 'zh', appid: BAIDU_APPID, salt, sign });
  try{
    const r = await fetch('https://fanyi-api.baidu.com/api/trans/vip/translate', { method:'POST', body: params, headers:{'Content-Type':'application/x-www-form-urlencoded'} });
    const j = await r.json();
    if (j && j.trans_result && j.trans_result[0]) { const d = j.trans_result[0].dst; transCache.set(q,d); return d; }
  }catch(e){ /* 网络/限流：留空，交人工/下次重试 */ }
  return '';
}
async function translateParagraphs(paras){
  const out = [];
  for (let i=0;i<paras.length;i+=3){
    const batch = paras.slice(i, i+3);
    const res = await Promise.all(batch.map(p=>baiduTranslate(p)));
    out.push(...res);
  }
  return out;
}

/* ---------- 搭配 / 金句 / 难度 ---------- */
function detectCollocations(text){
  const low = ' ' + text.toLowerCase() + ' ';
  return COLLOCATIONS.filter(c => low.includes(' ' + c + ' ')).slice(0, 12);
}
function detectQuotes(text){
  const qs = [];
  const re = /"([^"]{30,180})"/g; let m;
  while ((m = re.exec(text)) && qs.length < 2) qs.push(m[1].trim());
  return qs;
}
function estimateLevel(text){
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  if (!words.length) return 'IELTS 7';
  const avgLen = words.reduce((s,w)=>s+w.length,0)/words.length;
  const longRatio = words.filter(w=>w.length>=11).length / words.length;
  if (avgLen >= 5.6 || longRatio >= 0.12) return 'IELTS 8.5';
  if (avgLen >= 5.2 || longRatio >= 0.08) return 'IELTS 8';
  if (avgLen >= 4.8 || longRatio >= 0.05) return 'IELTS 7.5';
  if (avgLen >= 4.4) return 'IELTS 7';
  return 'IELTS 6.5';
}

/* ---------- 主流程 ---------- */
async function main(){
  let feeds = DEFAULT_FEEDS;
  if (process.env.FEEDS_FILE && fs.existsSync(process.env.FEEDS_FILE))
    feeds = JSON.parse(fs.readFileSync(process.env.FEEDS_FILE,'utf8'));
  feeds = feeds.filter(f => f.url);
  const all = [];
  for (const feed of feeds){
    try{
      const ctrl = new AbortController(); const t = setTimeout(()=>ctrl.abort(), 15000);
      const r = await fetch(feed.url, { signal: ctrl.signal, headers:{'User-Agent':'Mozilla/5.0 DailyReader/1.0'} });
      clearTimeout(t);
      if (!r.ok){ console.warn('✗', feed.source, r.status); continue; }
      const xml = await r.text();
      const items = parseFeed(xml, feed);
      for (const it of items){
        if (BAIDU_APPID){
          it.bodyCn = await translateParagraphs(it.body);
          it.titleCn = await baiduTranslate(it.title);
        }
        it.collocations = detectCollocations(it.body.join(' '));
        it.quotes = detectQuotes(it.body.join(' '));
        it.level = estimateLevel(it.body.join(' '));
        it.tags = it.collocations.slice(0,5).map(c=>c.split(' ').pop());
        it.min = Math.max(3, Math.round(it.body.join(' ').split(/\s+/).length / 200));
        it.id = crypto.createHash('md5').update(it.url||it.title).digest('hex').slice(0,12);
      }
      all.push(...items);
      console.log('✓', feed.source, items.length, '篇');
    }catch(e){ console.warn('✗', feed.source, e.message); }
  }
  // 去重 + 排序
  const seen = new Set(); const uniq = [];
  for (const a of all){ if (seen.has(a.id)) continue; seen.add(a.id); uniq.push(a); }
  uniq.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
  fs.writeFileSync(OUT, JSON.stringify(uniq, null, 2));
  console.log(`\n完成：共 ${uniq.length} 篇 → ${OUT}`);
  console.log(BAIDU_APPID ? '中文已由百度翻译回填。' : '未配置 BAIDU_APPID：cn 留空，阅读器仅显示英文（可人工精校或用其他翻译源回填）。');
}

main().catch(e=>{ console.error(e); process.exit(1); });
