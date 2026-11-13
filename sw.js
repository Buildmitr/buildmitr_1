// BuildMitr offline support: keeps the app and its helper libraries on the phone
const CACHE='buildmitr-v75';
const CORE=['./','./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  // the app page: try the network first so updates arrive, fall back to the saved copy offline
  if(u.origin===location.origin){e.respondWith(fetch(e.request.mode==='navigate'||/\.(html|js|json)$|\/$/.test(u.pathname)?new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'}):e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return;}
  // libraries from cdnjs and fonts: use the saved copy first
  if(/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return n;})));}
});
// tapping a BuildMitr notification opens (or brings forward) the app on the right page
self.addEventListener('notificationclick',e=>{e.notification.close();const v=(e.notification.data&&e.notification.data.view)||'';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs[0];
    if(c){c.postMessage({bmView:v});return c.focus();}return self.clients.openWindow('./'+(v?'#v='+v:''));}));});
