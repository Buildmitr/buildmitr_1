// BuildMitr offline support: keeps the app and its helper libraries on the phone
const VER='buildmitr-v101',BUILD='dea491176253';   // BUILD is written by the website build on every deploy
const CACHE=VER+'-'+BUILD;
const CORE=['./','./index.html','./app.js','./config.js','./agents.js','./reports.js','./manifest.json'];
const CORE_SET=new Set(CORE.map(p=>new URL(p,self.location).pathname));
// a new version is saved only when the page and the app code are from the same build (checked by their build mark)
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))
  .then(()=>BUILD==='dev'?null:Promise.all(['./index.html','./app.js'].map(u=>c.match(u).then(r=>r?r.text():''))).then(([h,j])=>{
    if(h.indexOf('bm-build:'+BUILD)<0||j.indexOf('bm-build:'+BUILD)<0)return caches.delete(CACHE).then(()=>{throw new Error('mixed build — try again later');});})))
  .then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.origin===location.origin){
    // the app itself opens at once from the copy saved on the phone — no waiting for the site network.
    // Updates come as a new version of this file: the whole new set is saved, then the app refreshes or shows "Refresh".
    const nav=e.request.mode==='navigate'&&/\/(index\.html)?$/.test(u.pathname);   // only the app's own address — privacy.html, security.html open as themselves
    if(nav||(e.request.mode!=='navigate'&&CORE_SET.has(u.pathname))){
      e.respondWith(caches.open(CACHE).then(c=>c.match(nav?'./index.html':u.pathname,{ignoreSearch:true}).then(r=>r||fetch(new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'})).then(n=>{if(n.ok){const k=n.clone();c.put(nav?'./index.html':u.pathname,k);}return n;}))).catch(()=>fetch(e.request)));
      return;}
    // other files of the site: the network first, the saved copy when offline
    e.respondWith(fetch(new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'})).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return;}
  // libraries from cdnjs and fonts: use the saved copy first
  if(/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return n;})));}
});
// tapping a BuildMitr notification opens (or brings forward) the app on the right page
self.addEventListener('notificationclick',e=>{e.notification.close();const v=(e.notification.data&&e.notification.data.view)||'';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs[0];
    if(c){c.postMessage({bmView:v});return c.focus();}return self.clients.openWindow('./'+(v?'#v='+v:''));}));});
