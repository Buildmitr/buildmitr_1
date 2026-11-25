/* bm-build:f3afea8ba48a */
/* BuildMitr page code: cameras */
function loadHls(){if(window.Hls)return Promise.resolve();return new Promise((ok,bad)=>{const j=document.createElement('script');j.src='https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js';j.onload=ok;j.onerror=bad;document.head.appendChild(j);});}
function vCctv(){
  const all=D.cameras.filter(inProj),cams=all.filter(camAllowed);
  camStatus();const btn=CANW&&isAdmin()?`<button class="btn" id="camScan">${ico('scan-line')}Scan camera QR</button><button class="btn pri" data-add="cameras">${ico('plus')}Add camera</button>`:'';
  const intro=`<div class="note">${ico('shield')}<span><b>Live video plays inside BuildMitr.</b> ${isAdmin()?(CAM.ez?'EZVIZ is connected. ':'Connect your EZVIZ account in <a href="#" data-go="settings">Settings</a>, or add an HLS / YouTube Live link to a camera. '):''}The admin decides who sees each camera (<b>Client can see</b>, <b>Team access</b>). No camera passwords are stored.</span></div>`;
  if(!cams.length)return header(label('cctv'),btn)+intro+`<div class="box hero-empty">${ico('cctv')}<h2>${all.length?'No cameras you can view':'No site cameras yet'}</h2><p>${all.length?'The admin has not given you access to the cameras on this project.':'Add each camera installed on site — CP Plus, EZVIZ, Hikvision, Dahua, Imou, Tapo or any other — with where it is and who may watch it.'}</p>${btn}</div>`;
  const on=cams.filter(c=>c.status==='Online').length,off=cams.filter(c=>c.status==='Offline').length;
  return header(label('cctv'),btn)+intro+`<div class="box tiles"><div class="tile"><b>${cams.length}</b><span>Cameras</span></div><div class="tile"><b>${on}</b><span>Online</span></div><div class="tile"><b style="color:${off?'var(--red-ink)':'inherit'}">${off}</b><span>Offline</span></div><div class="tile"><b>${cams.filter(c=>c.clientView==='Yes').length}</b><span>Visible to client</span></div></div>
  <div class="cams">${cams.map(c=>{const b=BRANDS[c.brand]||BRANDS.Other;const snap=(c.photos||[])[0];
    return `<div class="cam box"><div class="cam-view" id="cam-${c.id}">${snap?`<img src="/_blob/${esc(snap)}" alt="">`:`<div class="cam-off">${ico('cctv')}<span>${canWatch(c)?'Tap Watch live':'No live view set up'}</span></div>`}<span class="cam-st pill ${STATUS_PILL[c.status]||'p-grey'}">${esc(c.status||'—')}</span></div>
      <div class="cam-b"><b>${esc(c.name)}</b><div class="code">${esc(pname(c.project))}${c.spot?' · '+esc(c.spot):''}</div>
      <div class="meta"><span>${ico('video')}${esc(c.brand)}${c.model?' '+esc(c.model):''}</span><span>${ico(c.clientView==='Yes'?'eye':'eye-off')}Client ${c.clientView==='Yes'?'can view':'hidden'}</span><span>${ico('users')}${c.teamView==='Admin & project managers only'?'Managers only':'All team'}</span></div>
      <div class="acts" style="display:flex;gap:6px;flex-wrap:wrap">${canWatch(c)?`<button class="btn sm pri" data-camplay="${c.id}">${ico('monitor-play')}Watch live</button><button type="button" class="btn sm" data-camfull="${c.id}" aria-label="Full screen">${ico('maximize')}</button>`:''}${c.live&&camKind(c.live)==='web'?`<a class="btn sm ghost" href="${esc(c.live)}" target="_blank" rel="noopener noreferrer" aria-label="Open link">${ico('external-link')}</a>`:''}
        ${c.app?`<a class="btn sm" href="${esc(c.app)}" target="_blank" rel="noopener noreferrer">${ico('smartphone')}Open in ${esc(b.app.split(' ')[0])}</a>`:`<a class="btn sm" href="${esc(playSearch(c.brand))}" target="_blank" rel="noopener noreferrer">${ico('smartphone')}Get ${esc(b.app.split(' ')[0])} app</a>`}
        ${CANW&&isAdmin()?`<button class="btn sm ghost" data-edit="cameras:${c.id}" aria-label="Edit">${ico('pencil')}</button>`:''}</div>
      ${isAdmin()?`<details class="code"><summary style="cursor:pointer">How to give live access (${esc(c.brand)})</summary><p style="margin:6px 0">${esc(b.share)}</p><p style="margin:6px 0"><b>Live inside BuildMitr:</b> ${esc(b.stream)}</p>${c.serial?`<p style="margin:6px 0">Device / NVR ID: ${esc(c.serial)}${c.channel?' · channel '+esc(c.channel):''}</p>`:''}</details>`:''}</div></div>`;}).join('')}</div>`;
}
async function hlsInto(box,url){
  box.innerHTML='<video class="cam-video" controls autoplay muted playsinline></video>';const v=box.querySelector('video');
  if(v.canPlayType('application/vnd.apple.mpegurl')){v.src=url;return;}
  await loadHls();if(HLSP)HLSP.destroy();HLSP=new Hls();HLSP.loadSource(url);HLSP.attachMedia(v);
  HLSP.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)box.innerHTML='<div class="cam-off">Stream not reachable. The camera may be offline or the link expired.</div>';});
}
async function playCam(id){
  const c=D.cameras.find(x=>x.id===id);if(!c)return;const box=document.getElementById('cam-'+id);if(!box)return;
  box.innerHTML='<div class="cam-off"><span>Connecting…</span></div>';
  try{
    const k=camKind(c.live);
    if(!k&&camEzBrand(c)&&S.cloud){const j=await gasApi('camLive',{id});await hlsInto(box,j.url);}
    else if(k==='hls')await hlsInto(box,c.live);
    else if(k==='yt')box.innerHTML=`<iframe class="cam-video" src="${esc(ytEmbed(c.live))}" title="${esc(c.name)}" allow="autoplay; fullscreen" allowfullscreen style="border:0"></iframe>`;
    else if(k==='mjpeg')box.innerHTML=`<img class="cam-video" src="${esc(c.live)}" alt="${esc(c.name)} live" style="object-fit:contain">`;
    else if(k==='web')box.innerHTML=`<iframe class="cam-video" src="${esc(c.live)}" title="${esc(c.name)}" allow="autoplay; fullscreen" allowfullscreen style="border:0;background:#000"></iframe><div class="cam-note">Blank? This viewer does not allow other apps — <a href="${esc(c.live)}" target="_blank" rel="noopener">open it here</a>.</div>`;
    else if(k==='rtsp')box.innerHTML='<div class="cam-off"><span>RTSP cannot play in a browser. Ask your installer for an HLS (.m3u8) link from a streaming service (go2rtc / MediaMTX), or connect the camera through EZVIZ.</span></div>';
    else box.innerHTML='<div class="cam-off"><span>No live view set up for this camera yet.</span></div>';
  }catch(e){box.innerHTML=`<div class="cam-off"><span>${esc(e.message||'Live view failed')}</span></div>`;}
}
function camFull(id){const box=document.getElementById('cam-'+id);const el=box&&(box.querySelector('video,iframe,img')||box);if(!el)return;(el.requestFullscreen||el.webkitRequestFullscreen||el.webkitEnterFullscreen||(()=>{})).call(el);}
function camParseQR(t){
  t=String(t||'').trim();const o={raw:t};
  for(const [b,re] of CAM_BRAND_RE)if(re.test(t)){o.brand=b;break;}
  let j=null;try{j=JSON.parse(t);}catch(_){}
  if(j&&typeof j==='object'){const g=(...ks)=>{for(const k of Object.keys(j))if(ks.includes(k.toLowerCase()))return String(j[k]);return '';};
    o.serial=g('sn','serial','serialno','deviceserial','devsn','id','did','uid','p2pid')||undefined;o.code=g('code','verifycode','safecode','validatecode','vc')||undefined;o.model=g('model','type','devicetype')||undefined;
    const u=g('url','link','live');if(u)o.url=u;}
  const url=t.match(/(https?|rtsp):\/\/\S+/i);
  if(url&&!o.url){o.url=url[0];try{const q=new URL(url[0]).searchParams;const sn=q.get('sn')||q.get('serial')||q.get('deviceSerial')||q.get('id');if(sn&&/^[\w-]{6,40}$/.test(sn)){o.serial=sn;delete o.url;}}catch(_){}}
  if(!o.serial){const m=t.match(/\b(?:S\/?N|serial(?:\s*no)?|device\s*id|P2P\s*ID|UID|ID)\s*[:=#]\s*([A-Za-z0-9-]{6,40})/i);if(m)o.serial=m[1];}
  const parts=t.split(/[\r\n,;|\s]+/).map(s=>s.trim()).filter(Boolean);
  if(!o.serial&&(/ys7|ezviz|hik/i.test(t)||parts.length>=3)){
    const ser=parts.find(s=>/^[A-Z0-9]{9}$/.test(s)&&/\d/.test(s))||parts.find(s=>/^[A-Z0-9]{8,20}$/.test(s)&&/\d/.test(s)&&/[A-Z]/.test(s));
    if(ser){o.serial=ser;o.brand=o.brand||'EZVIZ';}}
  if(!o.code){const c=parts.find(s=>/^[A-Z]{6}$/.test(s)&&s!==o.serial);if(c&&['EZVIZ','Hikvision'].includes(o.brand))o.code=c;}
  if(!o.model){const md=parts.find(s=>/^(CS|DS|CP|DH|IPC)-[\w-]+/i.test(s));if(md)o.model=md;}
  if(!o.serial&&!o.url&&/^[A-Za-z0-9-]{6,40}$/.test(t))o.serial=t;            // the QR is just the serial number
  if(o.serial)o.serial=o.serial.toUpperCase();
  return o;
}
function camScanDialog(){
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>Scan camera QR</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b"><p class="code">Point at the QR code on the camera, its box, or a QR shared from the camera app. Or pick a photo / screenshot of the QR.</p>
    <div class="qr-box"><video id="qrVid" playsinline muted></video><div class="qr-frame"></div></div>
    <div class="srow" style="padding:8px 0"><label class="btn">${ico('upload')}<span>Pick a QR photo</span><input type="file" id="qrFile" accept="image/*" hidden></label><button type="button" class="btn ghost" id="qrManual">Type the serial instead</button></div>
    <div class="code" id="qrMsg">Starting camera…</div><div class="code" style="margin-top:6px">Tip: hold the phone 10–20 cm from the label, in good light, so the QR fills the white box.</div></div></div></div>`;
  qrStart();
}
async function qrStart(){
  const v=document.getElementById('qrVid'),msg=t=>{const m=document.getElementById('qrMsg');if(m)m.textContent=t;};
  try{const st=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false});QRS=st;v.srcObject=st;await v.play();msg('Looking for a QR code…');}
  catch(e){msg(e&&e.name==='NotAllowedError'?'Camera permission is off — allow the camera for BuildMitr (or the browser) in phone settings, or pick a photo of the QR.':'Camera not available here — pick a photo of the QR instead.');return;}
  const cv=document.createElement('canvas');
  const loop=async()=>{if(!document.getElementById('qrVid')){qrStop();return;}
    if(v.videoWidth){cv.width=Math.min(1280,v.videoWidth);cv.height=Math.round(cv.width*v.videoHeight/v.videoWidth);cv.getContext('2d').drawImage(v,0,0,cv.width,cv.height);
      try{const t=await qrFromCanvas(cv);if(t){qrStop();camFromQR(t);return;}}catch(e){msg(e.message);}}
    setTimeout(loop,350);};loop();
}
async function camFromQR(text){
  const o=camParseQR(text);
  if(!o.url&&!o.serial){o.serial=(o.raw||'').slice(0,40);toast('QR read — check the serial number it filled in.');}
  let note='';
  if(o.serial&&['EZVIZ','Hikvision'].includes(o.brand)&&CAM.ez&&isAdmin()){
    try{const j=await gasApi('camAdd',{serial:o.serial,code:o.code||''});note=j.already?'Already on your EZVIZ account.':'Added to your EZVIZ account.';}catch(e){note='EZVIZ: '+e.message;}}
  const pre={brand:o.brand||'Other',serial:o.serial||'',model:o.model||'',live:o.url&&camKind(o.url)&&camKind(o.url)!=='web'?o.url:(o.url||''),status:'Online',clientView:'No',teamView:'All team on this project',project:S.proj!=='all'?S.proj:''};
  openForm('cameras',null,pre);
  toast(o.serial?`Camera ${o.serial} found. ${note} Add a name and where it is on site.`:'Live link found — add a name and save.');
}
PK.done("cameras");
