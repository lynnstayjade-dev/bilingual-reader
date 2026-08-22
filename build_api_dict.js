// 用免费词典 API (dictionaryapi.dev, 无需 key) 把 articles.json 中的真实单词
// 预抓成离线词库 dict.api.json（IPA 音标 + 词性 + 英文释义 + 发音音频）。
// 沙箱实测可达。带断点续传：中断后重跑会从已有进度继续。
const fs = require('fs');

const ART = './articles.json';
const MIN = './dict.min.json';
const OUT = './dict.api.json';
const TMP = './dict.api.progress.json';
const CONC = 8;
const RETRY = 3;

function uniqWords() {
  const a = JSON.parse(fs.readFileSync(ART, 'utf8'));
  const s = new Set();
  a.forEach(function (x) {
    (x.body || []).forEach(function (p) {
      p.toLowerCase().replace(/[^a-z'\- ]/g, ' ').split(/\s+/).forEach(function (w) {
        w = w.replace(/^'+|'+$/g, '');
        if (w && w.length > 2 && /^[a-z]/.test(w)) s.add(w);
      });
    });
  });
  return Array.from(s).sort();
}

function hasCn() {
  try { return new Set(Object.keys(JSON.parse(fs.readFileSync(MIN, 'utf8')))); }
  catch (e) { return new Set(); }
}

function pickPhonetic(phonetics) {
  if (!Array.isArray(phonetics)) return '';
  for (const p of phonetics) if (p && p.text) return p.text;
  return '';
}
function pickAudio(phonetics) {
  if (!Array.isArray(phonetics)) return '';
  for (const p of phonetics) if (p && p.audio) return p.audio;
  return '';
}

async function fetchWord(w) {
  for (let i = 0; i < RETRY; i++) {
    try {
      const r = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + w);
      if (r.status === 404) return null;
      if (r.status === 429) { await new Promise(s => setTimeout(s, 1500)); continue; }
      if (!r.ok) { await new Promise(s => setTimeout(s, 500)); continue; }
      const j = await r.json();
      if (!Array.isArray(j) || !j.length) return null;
      const e = j[0];
      const ph = pickPhonetic(e.phonetics) || (e.phonetic || '');
      const aud = pickAudio(e.phonetics);
      const m = (e.meanings && e.meanings[0]) || {};
      const def = (m.definitions && m.definitions[0] && m.definitions[0].definition) || '';
      return { p: ph, pos: m.partOfSpeech || '', en: def, audio: aud };
    } catch (e) {
      await new Promise(s => setTimeout(s, 600));
    }
  }
  return undefined;
}

(async () => {
  const words = uniqWords().filter(w => !hasCn().has(w));
  let done = {};
  try { done = JSON.parse(fs.readFileSync(TMP, 'utf8')); } catch (e) {}
  const queue = words.filter(w => !(w in done));
  console.log('总词 ' + words.length + '，已抓 ' + Object.keys(done).length + '，待抓 ' + queue.length);
  if (!queue.length) { fs.writeFileSync(OUT, JSON.stringify(done, null, 0)); console.log('已全部完成，写出 ' + OUT); return; }

  let idx = 0;
  async function worker() {
    while (idx < queue.length) {
      const w = queue[idx++];
      const res = await fetchWord(w);
      if (res !== undefined) { done[w] = res || { p: '', pos: '', en: '', audio: '' }; }
      if (Object.keys(done).length % 50 === 0) fs.writeFileSync(TMP, JSON.stringify(done));
    }
  }
  const workers = Array.from({ length: Math.min(CONC, queue.length) }, () => worker());
  await Promise.all(workers);
  fs.writeFileSync(TMP, JSON.stringify(done));
  fs.writeFileSync(OUT, JSON.stringify(done, null, 0));
  console.log('完成。写出 ' + OUT + ' 词条 ' + Object.keys(done).length);
})();
