#!/usr/bin/env node
'use strict';
/* 流式：直接下载 ECDICT CSV → 按 oxford/collins/frq 筛选最常见词 → 写出 dict.json
   不落大中间文件；完成后打印统计。 */
const https=require('https');const fs=require('fs');const path=require('path');
const URL='https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv';
const OUT=path.join(__dirname,'dict.json');
const dict={};let buf='';let kept=0;let lines=0;

function parseLine(line){
  const out=[];let cur='';let q=false;
  for(let i=0;i<line.length;i++){const c=line[i];
    if(q){if(c==='"'){if(line[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=c;}
    else{if(c==='"')q=true;else if(c===','){out.push(cur);cur='';}else cur+=c;}}
  out.push(cur);return out;
}
function firstMeaning(t){if(!t)return'';const s=t.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,2).join('；').replace(/\s+/g,' ').trim();return s.length>70?s.slice(0,70)+'…':s;}

const req=https.get(URL,res=>{
  if(res.statusCode!==200){console.error('HTTP',res.statusCode);process.exit(1);}
  res.setEncoding('utf8');
  res.on('data',chunk=>{
    buf+=chunk;
    let idx;
    while((idx=buf.indexOf('\n'))>=0){
      let line=buf.slice(0,idx);buf=buf.slice(idx+1);
      if(line.endsWith('\r'))line=line.slice(0,-1);
      processLine(line);
    }
  });
  res.on('end',()=>{if(buf.trim())processLine(buf);finish();});
}).on('error',e=>{console.error('ERR',e.message);process.exit(1);});

let header=true;
function processLine(line){
  if(header){header=false;return;} // 跳过表头
  if(!line.trim())return;
  lines++;
  const f=parseLine(line);
  const word=(f[0]||'').trim().toLowerCase();
  if(!word||word.includes(' ')||word.includes('/'))return;
  const ph=(f[1]||'').replace(/^"|"$/g,'').trim();
  const tr=f[3]||'';const pos=(f[4]||'').trim();
  const col=(f[5]||'').trim();const ox=(f[6]||'').trim();const frq=parseInt(f[9]||'0',10)||0;
  if(!(ox||col||(frq>0&&frq<=6000)))return;
  if(!ph&&!tr)return;
  dict[word]={p:ph,pos:pos?pos[0]:'',cn:firstMeaning(tr)};
  kept++;
  if(kept%2000===0)process.stdout.write(`\r已收录 ${kept} 词`);
}
function finish(){
  fs.writeFileSync(OUT,JSON.stringify(dict));
  const kb=(fs.statSync(OUT).size/1024).toFixed(0);
  console.log(`\n完成：扫描 ${lines} 行，保留 ${kept} 词 → ${OUT} (${kb} KB)`);
}
