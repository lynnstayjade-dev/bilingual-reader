const CACHE='lumina-v5';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  // 页面导航请求 + 数据/词库：网络优先，失败回退缓存 —— 保证新版 UI 与内容更新立即可见
  const isNav = e.request.mode==='navigate';
  if(isNav || url.pathname.endsWith('articles.json')||url.pathname.endsWith('dict.json')||url.pathname.endsWith('dict.min.json')||url.pathname.endsWith('dict.api.json')||url.href.includes('raw.githubusercontent.com')){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  // 其余静态资源（manifest/icon）：缓存优先
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return resp;})));
});
