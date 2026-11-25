/* bm-build:8a5d2b979024 */
/* BuildMitr page code: admin */
async function backupXlsx(){
  try{await loadSheetJS();}catch(e){toast('Excel tool could not load.');return;}
  const wb=XLSX.utils.book_new();
  COLS.filter(c=>c!=='audit').forEach(c=>{const rows=D[c].map(r=>{const o={};Object.entries(r).forEach(([k,v])=>{o[k]=v&&typeof v==='object'?JSON.stringify(v):v;});return o;});
    if(rows.length)XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),c.slice(0,31));});
  if(!wb.SheetNames.length){toast('Nothing to back up yet.');return;}
  const buf=XLSX.write(wb,{type:'array',bookType:'xlsx'});
  await saveFile(`BuildMitr-backup-${today()}.xlsx`,new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
}
async function backupJson(){
  const data={app:'BuildMitr',version:1,at:new Date().toISOString(),collections:{}};COLS.forEach(c=>data.collections[c]=D[c]);
  await saveFile(`BuildMitr-backup-${today()}.json`,new Blob([JSON.stringify(data)],{type:'application/json'}));
}
async function restoreJson(file){
  if(S.demo){toast('Exit the demo before restoring.');return;}
  let data;try{data=JSON.parse(await file.text());}catch(e){toast('This is not a BuildMitr backup file.');return;}
  if(!data||data.app!=='BuildMitr'||!data.collections){toast('This is not a BuildMitr backup file.');return;}
  let added=0,skipped=0;
  for(const [c,rows] of Object.entries(data.collections)){
    if(!COLS.includes(c)||c==='audit'||c==='members')continue;
    for(const r of rows||[]){
      if(!r||!r.id||D[c].some(x=>x.id===r.id)){skipped++;continue;}
      const {id,...rest}=r;const ok=await write(()=>db.doc(c+'/'+id).set(rest));if(!ok){toast(`Restore stopped after ${added} records.`);return;}added++;
    }
  }
  audit('restored','backup','',`${added} records restored from ${file.name}`);
  toast(`Restored ${added} records${skipped?` (${skipped} already existed, kept as they are)`:''}`);
}
function vAdminPanel(){
  if(!isAdmin())return header(label('adminpanel'))+`<div class="box hero-empty">${ico('shield')}<h2>Only the admin can open this page</h2></div>`;
  const ppl=D.team.filter(t=>t.status!=='Removed').sort((a,b)=>(a.role==='Admin'?0:1)-(b.role==='Admin'?0:1)||String(a.name).localeCompare(String(b.name)));
  const noProj=ppl.filter(t=>t.role==='Client'&&!(t.projects||[]).length);
  const joined=ppl.filter(t=>t.account).length;
  const tiles=[[ppl.length,'People in the team'],[joined,'Signed in at least once'],[pendingJoins().length,'New account requests'],[noProj.length,'Clients without a project']];
  const roles=ALL_ROLES();
  const pname_=t=>(t.projects||[]).includes('all')?'All projects':(t.projects||[]).length?(t.projects||[]).map(id=>(D.projects.find(p=>p.id===id)||{}).name||'—').join(', '):'No project';
  return header(label('adminpanel'))+
  `<div class="box"><div class="tiles">${tiles.map(([n,l])=>`<div class="tile"><b>${n}</b><span>${l}</span></div>`).join('')}</div></div>`+
  (noProj.length?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('info')}<span><b>${noProj.length} client(s) cannot see any project yet.</b> Tap <b>Edit</b> next to them below and choose their project.</span></div>`:'')+
  joinReqBox()+(ME.isOwner&&S.cloud&&!S.demo?digBox():'')+
  `<div class="box"><div class="box-h">${ico('users')}<h2>People & roles</h2><span class="code">Change a role here — their screens switch within seconds</span></div>
   ${ppl.length?ppl.map(t=>{const me=t.account&&t.account===ME.id;return `<div class="srow"><span style="flex:1;min-width:190px"><b data-notr>${esc(t.name||'—')}</b>${me?' <span class="pill p-green">You</span>':''}<br><span class="code" data-notr>${esc(t.email||'no email')}${t.phone?' · '+esc(t.phone):''}</span><br><span class="code">${esc(pname_(t))} · ${t.account?'signed in':'not signed in yet'}</span></span>
     <select data-adrole="${esc(t.id)}" aria-label="Role" style="width:auto" ${me?'disabled':''}>${roles.map(r=>`<option ${r===t.role?'selected':''}>${esc(r)}</option>`).join('')}</select>
     <button class="btn sm" data-edit="team:${esc(t.id)}">${ico('pencil')}<span>Edit</span></button>${t.role!=='Admin'?`<button class="btn sm ghost" data-raperson="${esc(t.id)}">${ico('shield')}<span>Access</span></button>`:''}</div>`;}).join(''):`<div class="empty">No people yet. Share your invite link — new people create an account and you approve them here.</div>`}</div>`+
  `<div class="box"><div class="box-h">${ico('settings')}<h2>Admin tools</h2></div><div class="srow">
     <button class="btn" data-go="roleaccess">${ico('shield')}<span>Role access — what each role can see</span></button>
     <button class="btn" data-go="team">${ico('users')}<span>Team list</span></button>
     <button class="btn" data-go="settings">${ico('settings')}<span>Company settings</span></button>
     <button class="btn" data-go="audit">${ico('history')}<span>Change history</span></button></div></div>`+
  (S.cloud?`<div class="box"><div class="box-h">${ico('sparkles')}<h2>AI assistant</h2></div><div id="aiAdminBox"><div class="srow"><span class="code">Loading…</span></div></div></div>`:'')+
  `<div class="box"><div class="box-h">${ico('lock')}<h2>How people sign in</h2></div><div class="srow"><span class="code" style="white-space:normal">New people enter email, name, role and mobile. Their 6-digit code is emailed only to the admin; when you share it, they join with the role they chose. After that they sign in with their own email and password. Forgot password? They ask you for a new code. Removing someone from the team ends their access and deletes their password.</span></div></div>`;
}
async function adminSetRole(id,role){
  const t=D.team.find(x=>x.id===id);if(!t||t.role===role)return;
  const ok=await write(()=>db.doc('team/'+id).update({role}),`${t.name||'Person'} is now ${role}`);
  if(ok)audit('edited','team',id,`${t.name}: role ${t.role} → ${role}`);
}
function adminPhone(){const a=D.team.find(t=>t.role==='Admin'&&t.phone&&t.account!==ME.id&&t.status!=='Removed');return a?a.phone:'';}
function shareSheet(title,text,phone){
  SHARE={title:title||orgName(),text:String(text||''),phone:phone||''};
  const ap=!isAdmin()?adminPhone():'';
  const opt=(k,ic,l)=>`<button type="button" class="btn share-opt" data-shareto="${k}">${ico(ic)}<span>${l}</span></button>`;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane">
    <div class="pane-h"><h2>Share or save</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><div class="share-grid">
      ${opt('wa','message-circle',SHARE.phone?'WhatsApp to this person':'WhatsApp')}${ap?opt('wa-admin','message-circle','WhatsApp to admin'):''}
      ${opt('tg','send','Telegram')}${opt('mail','mail','Email')}${opt('sms','message-square','SMS')}
      ${navigator.share?opt('more','share-2','Other apps'):''}${opt('copy','copy','Copy text')}${opt('pdf','printer','Save as PDF')}${opt('txt','download','Save as text file')}</div>
      <pre class="share-prev" data-notr>${esc(SHARE.text)}</pre></div></div></div>`;
}
function shareTo(k){
  if(!SHARE)return;const{title,text,phone}=SHARE;const enc=encodeURIComponent;
  const go=u=>{const w=window.open(u,'_blank');if(w){try{w.opener=null;}catch(_){}}else location.href=u;};
  if(k==='wa')return go('https://wa.me/'+(phone?waNum(phone):'')+'?text='+enc(text));
  if(k==='wa-admin')return go('https://wa.me/'+waNum(adminPhone())+'?text='+enc(text));
  if(k==='tg')return go('https://t.me/share/url?url='+enc(title)+'&text='+enc(text));
  if(k==='mail'){location.href='mailto:?subject='+enc(title)+'&body='+enc(text.replace(/\*/g,''));return;}
  if(k==='sms'){location.href='sms:?body='+enc(text.replace(/\*/g,''));return;}
  if(k==='more'){navigator.share({title,text}).catch(()=>{});return;}
  if(k==='copy'){(navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(()=>toast('Copied')).catch(()=>toast('Could not copy'));return;}
  const file=(title||'BuildMitr').replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-')||'BuildMitr';
  if(k==='txt'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text.replace(/\*/g,'')],{type:'text/plain'}));a.download=file+'.txt';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);toast('Saved '+file+'.txt');return;}
  if(k==='pdf'){   // print view: choose "Save as PDF" in the print window
    const f=document.createElement('iframe');f.style.cssText='position:fixed;width:0;height:0;border:0;right:0;bottom:0';document.body.appendChild(f);
    const body=esc(text).replace(/\*([^*\n]+)\*/g,'<b>$1</b>');
    f.srcdoc=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(file)}</title><style>body{font:14px/1.55 system-ui,-apple-system,"Segoe UI","Noto Sans Telugu","Noto Sans Devanagari",sans-serif;color:#111;margin:28px;white-space:pre-wrap}h1{font-size:18px;margin:0 0 12px;white-space:normal}footer{margin-top:24px;color:#666;font-size:12px}</style></head><body><h1>${esc(title)}</h1>${body}<footer>BuildMitr · ${esc(new Date().toLocaleString())}</footer></body></html>`;
    f.onload=()=>{try{f.contentWindow.focus();f.contentWindow.print();}catch(_){toast('Printing is not available here.');}setTimeout(()=>f.remove(),60000);};return;}
}
function orgsBox(){
  if(!isSuperAdmin())return '';
  return `<div class="box"><div class="box-h">${ico('building-2')}<h2>Organisations</h2><span class="code">Only the BuildMitr admin sees this. Each organisation sees only its own data.</span></div>
    <div id="orgsList"><div class="srow"><span class="code">Loading…</span></div></div>
    <form id="orgNewForm" class="srow" style="align-items:flex-end">
      <label class="code">New organisation<input id="on-name" required maxlength="120" placeholder="e.g. RR Associates"></label>
      <label class="code">Its admin's email<input id="on-email" type="email" required placeholder="admin@example.com"></label>
      <label class="code">Admin name<input id="on-aname" maxlength="80" placeholder="e.g. Ravi Kumar"></label>
      <label class="code">Admin mobile<input id="on-phone" type="tel" inputmode="tel" placeholder="98765 43210"></label>
      <button class="btn pri">${ico('plus')}<span>Create organisation</span></button></form></div>`;
}
async function orgsLoad(q){
  const box=document.getElementById('orgsList');if(!box)return;
  let j;try{j=await gasApi('orgs',q||{});}catch(e){box.innerHTML=`<div class="srow"><span class="code">${esc(e.message)}</span></div>`;return false;}
  ORGS=j.orgs||[];ORGS_AT=Date.now();orgsDraw();return true;
}
function orgsDraw(){
  const box=document.getElementById('orgsList');if(!box)return;
  box.innerHTML=ORGS.length?ORGS.map(o=>`<div class="srow org-row"><span style="flex:1;min-width:210px"><b data-notr>${esc(o.name)}</b>${o.id===CLOUD.org?' <span class="pill p-green">Open now</span>':''}${o.hidden?' <span class="pill p-grey">Hidden from sign-up</span>':''}<br>
      <span class="code" data-notr>${o.admins.length?o.admins.map(a=>esc(a.email)+(a.joined?'':' (not signed in yet)')).join(', '):'No admin yet'} · ${o.people} people · ${o.projects} projects</span></span>
      ${o.id!==CLOUD.org?`<button type="button" class="btn sm" data-orgopen="${esc(o.id)}">${ico('log-in')}<span>Open</span></button>`:''}
      <button type="button" class="btn sm" data-orglink="${esc(o.id)}|${esc(o.name)}">${ico('link')}<span>Sign-in link</span></button>
      <button type="button" class="btn sm ghost" data-orgedit="${esc(o.id)}">${ico('pencil')}<span>Edit</span></button></div>
      <form class="srow org-edit" data-orgform="${esc(o.id)}" hidden style="align-items:flex-end">
      <label class="code">Name<input name="name" value="${esc(o.name)}" maxlength="120"></label>
      <label class="code">Add / change admin email<input name="email" type="email" placeholder="admin@example.com"></label>
      <label class="code">Admin name<input name="aname" maxlength="80"></label><label class="code">Admin mobile<input name="phone" type="tel"></label>
      <label class="code" style="display:flex;gap:6px;align-items:center"><input name="hidden" type="checkbox" ${o.hidden?'checked':''} style="width:auto">Hide from the sign-up list</label>
      <button class="btn pri">${ico('check')}<span>Save</span></button></form>`).join(''):`<div class="empty">No organisations yet. Create the first one below.</div>`;
}
async function orgCreate(f){
  const v=id=>(f.querySelector('#'+id)||{}).value||'';const btn=f.querySelector('button');btn.disabled=true;
  try{await gasApi('createOrg',{name:v('on-name').trim(),admin:{email:v('on-email').trim(),name:v('on-aname').trim(),phone:v('on-phone').trim()}});
    toast(`Organisation created. Its admin signs in with ${v('on-email').trim()} — their login code comes to you.`);f.reset();await orgsLoad();bmSet('bm-c-me',null);}
  catch(e){toast(e.message);}btn.disabled=false;
}
async function orgSave(f){
  const id=f.dataset.orgform,o=ORGS.find(x=>x.id===id)||{},g=k=>(f.elements[k]||{}).value||'';const q={org:id};
  if(g('name').trim()&&g('name').trim()!==o.name)q.rename=g('name').trim();
  if(!!f.elements.hidden.checked!==!!o.hidden)q.hidden=!!f.elements.hidden.checked;
  if(g('email').trim())q.admin={email:g('email').trim(),name:g('aname').trim(),phone:g('phone').trim()};
  const btn=f.querySelector('button');btn.disabled=true;
  if(await orgsLoad(q))toast('Saved');btn.disabled=false;
}
function orgOpen(id){try{localStorage.setItem('bm-org',id);}catch(_){}location.reload();}
function vInstall(){
  const card=(key,icon,title,body)=>`<div class="box inst ${PLAT===key?'inst-me':''}"><div class="box-h">${ico(icon)}<h2>${title}</h2>${PLAT===key?'<span class="pill p-green">This device</span>':''}</div><div class="inst-b">${body}</div></div>`;
  const prompt=INSTALL_EVT?`<button class="btn pri" id="instNow">${ico('download')}<span>Install BuildMitr now</span></button>`:'';
  setTimeout(instQR,0);
  return header('Install the app')+
  (isStandalone()?`<div class="note">${ico('check')}<span>You are using the installed BuildMitr app.</span></div>`:'')+
  `<div class="inst-grid">
  ${card('android','smartphone','Android phone',`<p>Download the BuildMitr app and open the file to install it. If the phone asks, allow installing from this source (Chrome / Files).</p>
    <div class="srow" style="padding:0;border:0"><a class="btn pri" href="${APK_URL}" target="_blank" rel="noopener">${ico('download')}<span>Download Android app (APK)</span></a>${PLAT==='android'?prompt:''}</div>
    <p class="code">Or in Chrome: menu ⋮ → <b>Install app</b> / <b>Add to Home screen</b>. Both open BuildMitr full screen with its own icon.</p>`)}
  ${card('ios','apple','iPhone & iPad',`<ol><li>Open <b>${esc(APP_URL)}</b> in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (square with an arrow).</li><li>Tap <b>Add to Home Screen</b> → <b>Add</b>.</li></ol><p class="code">BuildMitr then opens from its own icon, full screen, like any app.</p>`)}
  ${card('win','monitor','Windows PC / laptop',`<p>Download the BuildMitr installer for <b>Windows 10 and 11</b> and open it. It adds a desktop and Start-menu icon and opens BuildMitr in its own window — always the latest version.</p>
    <div class="srow" style="padding:0;border:0"><a class="btn pri" href="${WIN_URL}" target="_blank" rel="noopener">${ico('download')}<span>Download for Windows (.exe)</span></a>${PLAT==='win'?prompt:''}</div>
    <p class="code">If Windows shows “Windows protected your PC”, click <b>More info → Run anyway</b>. Or, without downloading: open BuildMitr in <b>Chrome</b> or <b>Edge</b> and click the <b>Install</b> icon at the right end of the address bar.</p>`)}
  ${card('mac','apple','MacBook / iMac',`<p><b>Safari:</b> File → <b>Add to Dock</b>.<br><b>Chrome / Edge:</b> click the <b>Install</b> icon in the address bar.</p>${PLAT==='mac'?prompt:''}<p class="code">BuildMitr appears in the Dock and Launchpad and opens in its own window.</p>`)}
  </div>
  <div class="box"><div class="box-h">${ico('scan-line')}<h2>Open on your phone</h2></div><div class="inst-b" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div id="instQR" class="inst-qr" aria-label="QR code for the BuildMitr web address"></div>
    <div><p>Scan with the phone camera to open BuildMitr, then install it as above.</p><p class="code">${esc(APP_URL)}</p><button type="button" class="btn sm" id="instShare">${ico('share-2')}<span>Share the app link</span></button></div></div></div>`;
}
function instQR(){const box=document.getElementById('instQR');if(!box||box.dataset.done)return;box.dataset.done=1;
  loadJs('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',()=>window.qrcode).then(()=>{const q=window.qrcode(0,'M');q.addData(APP_URL);q.make();box.innerHTML=q.createSvgTag({cellSize:5,margin:2,scalable:true});}).catch(()=>{box.textContent='';});}
function orgLinkShare(id,name){
  const link=orgLink(id,name),text=`Join ${name} on BuildMitr:\n${link}\n\nOpen the link, tap “Create account”, fill your name, mobile, email and a password. You can use BuildMitr once the admin approves your account.`;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane" style="height:auto;max-height:100%;margin-top:auto"><div class="pane-h"><h2>Invite link — ${esc(name)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b"><p class="code">People who open this link can create an account only in <b>${esc(name)}</b> — they never see other companies. They see nothing until you approve them on the Team page and choose their role.</p>
    <div class="inst-b" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;padding:0"><div id="olQR" class="inst-qr" aria-label="QR code of the invite link"></div><code style="word-break:break-all;flex:1;min-width:200px">${esc(link)}</code></div>
    <div class="sh-grid" style="margin-top:12px"><a class="btn" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${ico('message-circle')}<span>WhatsApp</span></a>
     <a class="btn" href="mailto:?subject=${encodeURIComponent('Join '+name+' on BuildMitr')}&body=${encodeURIComponent(text)}">${ico('mail')}<span>Email</span></a>
     <button type="button" class="btn" data-olcopy="${esc(link)}">${ico('copy')}<span>Copy link</span></button>
     <button type="button" class="btn" data-olmore>${ico('share-2')}<span>More…</span></button></div></div></div></div>`;
  OLT={text,link,name};
  loadJs('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',()=>window.qrcode).then(()=>{const b=document.getElementById('olQR');if(!b)return;const q=window.qrcode(0,'M');q.addData(link);q.make();b.innerHTML=q.createSvgTag({cellSize:5,margin:2,scalable:true});}).catch(()=>{});
}
function dlDelBtn(c){return c&&canDelFiles()?`<button type="button" class="btn sm ghost warn" data-dldel="${esc(c.id)}" title="Delete this revision" aria-label="Delete this revision">${ico('trash-2')}</button>`:'';}
async function dlDelete(id){const d=D.documents.find(x=>x.id===id);if(!d)return;
  const prev=D.documents.filter(x=>x.id!==id&&x.project===d.project&&(x.dkey||x.title)===(d.dkey||d.title)&&(x.disc||'')===(d.disc||'')).sort((a,b)=>(b.at||0)-(a.at||0))[0];
  const files=recFileIds(d);const ok=await write(async()=>{await db.doc('documents/'+id).delete();
    if(prev&&prev.status==='Superseded'){const a=prev.appr||{};await db.doc('documents/'+prev.id).update({status:a.s3?'Approved':a.s2?'For approval':a.s1?'For checking':'Draft'});}},
    prev?`${d.rev||'Revision'} deleted — ${prev.rev||'the previous revision'} is current again`:'Drawing deleted');
  if(ok){audit('deleted','documents',id,`${d.dkey||d.title} ${d.rev||''}`);trashFiles(files);render();}}
async function dlMarkDel(id,at){const d=D.documents.find(x=>x.id===id);if(!d)return;const x=(d.rv||[]).find(v=>String(v.at)===String(at));if(!x)return;
  const ok=await write(()=>db.doc('documents/'+id).update({rv:(d.rv||[]).filter(v=>v!==x)}),x.k==='mark'?'Mark-up removed':'Comment removed');if(ok){if(x.img)trashFiles([x.img.id]);render();}}
async function feedLoad(reset){if(FEED.busy)return;FEED.busy=1;try{const j=await gasApi('feedGet',{reset:!!reset});FEED.tok=j.token||'';FEED.err='';if(reset)toast('New links made — the old ones no longer work.');}catch(e){FEED.err=/Unknown request/i.test(e.message||'')?'Needs the server update — deploy the new server version.':(e.message||'Could not make the links');}FEED.busy=0;render();}
function upiDialog(id){
  const r=D.invoices.find(x=>x.id===id);if(!r)return;const u=upiLink(r),org=D.org.find(o=>o.id==='main')||{};
  if(!u){toast(org.upi?'Nothing is pending on this invoice.':'Add your UPI ID in Settings → Company first.');return;}
  const due=invTotal(r)-(+r.got||0),c=D.clients.find(x=>x.id===r.client)||{};
  const msg=`Dear ${c.name||'Sir/Madam'},\n\nPlease pay ${inr(due)} for ${r.kind||'invoice'} ${r.no||''} (${pname(r.project)}).\nUPI ID: ${org.upi}\n\nScan the QR in the attached image or pay to the UPI ID above.\n\nThank you,\n${orgName()}`;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>Pay by UPI</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b" style="text-align:center"><div><b>${esc(r.no||'')}</b> · ${esc(pname(r.project))}</div><div style="font-size:24px;font-weight:700">${inr(due)}</div>
      <div id="upiQR" class="upi-qr">Loading QR…</div><div class="code">UPI ID: <b>${esc(org.upi)}</b> · any UPI app (GPay, PhonePe, Paytm, BHIM)</div>
      <a class="btn" href="${esc(u)}">${ico('smartphone')}<span>Open UPI app on this phone</span></a>
      <a class="btn" target="_blank" rel="noopener" href="${esc(c.phone?waTo(c.phone,msg):'https://wa.me/?text='+encodeURIComponent(msg))}">${ico('message-circle')}<span>Send payment request on WhatsApp</span></a>
      ${CANW&&canEditView('payments')?`<hr style="border:0;border-top:1px solid var(--line);width:100%"><div class="code">When the money reaches your bank:</div><button type="button" class="btn pri" data-upigot="${esc(r.id)}">${ico('check')}<span>Mark ${inr(due)} received</span></button>`:''}
      <p class="code">Tip: show this screen to the client, or take a screenshot and send it with the WhatsApp message.</p></div></div></div>`;
  qrSvg(u).then(svg=>{const b=document.getElementById('upiQR');if(b)b.innerHTML=svg;}).catch(()=>{const b=document.getElementById('upiQR');if(b)b.textContent='Could not load the QR — use the UPI ID.';});
}
async function digLoad(){if(DIG.busy)return;DIG.busy=1;try{DIG.cfg=await gasApi('digGet',{});DIG.err='';}catch(e){DIG.err=/Unknown request/i.test(e.message||'')?'Needs the server update — deploy the new server version.':(e.message||'Could not load');}DIG.busy=0;if(S.view==='adminpanel')render();}
function digBox(){
  const h=`<div class="box-h">${ico('mail')}<h2>Daily email reports</h2>${DIG.cfg?`<span class="pill ${DIG.cfg.on||DIG.cfg.eve?'p-green':'p-grey'}">${DIG.cfg.on&&DIG.cfg.eve?'Morning + evening':DIG.cfg.on?'Morning':DIG.cfg.eve?'Evening':'Off'}</span>`:''}</div>`;
  if(!DIG.cfg&&!DIG.err){digLoad();return `<div class="box">${h}<div class="empty">Loading…</div></div>`;}
  if(!DIG.cfg)return `<div class="box">${h}<div class="note warn">${ico('alert-triangle')}<span>${esc(DIG.err)}</span></div></div>`;
  const c=DIG.cfg,ppl=digPeople(),pick=new Set((c.to||[]).map(x=>String(x).toLowerCase())),none=!pick.size;
  return `<div class="box" id="digBox">${h}<div style="padding:0 16px 16px;display:grid;gap:12px;max-width:720px">
    <div class="dig-k"><label class="pl-chk"><input type="checkbox" id="dig-on" ${c.on?'checked':''}> <b>Morning summary</b> — 7:30 am</label>
      <div class="code">Yesterday's daily reports (and which sites sent none), labour and material, overdue tasks, open issues, money received and unpaid invoices.${c.last?` Last sent ${esc(fd(c.last))}.`:''}</div></div>
    <div class="dig-k"><label class="pl-chk"><input type="checkbox" id="dig-eve" ${c.eve?'checked':''}> <b>Evening report</b> — 7:30 pm</label>
      <div class="code">Today's daily reports and work done, labour and material, issues, money, tasks due tomorrow and the plan for tomorrow.${c.lastEve?` Last sent ${esc(fd(c.lastEve))}.`:''}</div></div>
    <div><b>Who gets them</b> <span class="code">— tick the people in your team${none?' (nobody ticked: only the admins get them)':''}</span>
      <div class="dig-ppl">${ppl.length?ppl.map(t=>{const em=String(t.email).trim().toLowerCase();return `<label class="pl-chk"><input type="checkbox" data-digto="${esc(em)}" ${pick.has(em)||(none&&t.role==='Admin')?'checked':''}> <span><b data-notr>${esc(t.name||em)}</b> <span class="code">${esc(t.role||'')} · ${esc(em)}</span></span></label>`;}).join(''):'<div class="code">Add people with an email on the Team page first.</div>'}</div></div>
    <div class="code">${ico('info')} Each person gets their own email with only the projects and sections their role and access allow — money only for admins, project managers and accountants; site staff see only their projects. They go out at 7:30 am and 7:30 pm — or, if nobody in the company has BuildMitr open then, as soon as someone opens it.${(c.sendsTo||[]).length?` Now going to: ${c.sendsTo.map(esc).join(', ')}.`:''}</div>
    <label class="pl-chk"><input type="checkbox" id="dig-wa" ${c.wa?'checked':''}> Also send them on WhatsApp (Settings → WhatsApp updates, when it is on)</label>
    <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap"><button type="button" class="btn pri" id="digSave">${ico('check')}<span>Save</span></button>
      <button type="button" class="btn" data-digtest="am">${ico('send')}<span>Email me a morning sample</span></button><button type="button" class="btn" data-digtest="pm">${ico('send')}<span>Email me an evening sample</span></button></div>
    ${DIG.prev?`<div class="dig-prev"><b>${DIG.prevKind==='pm'?'Evening report':'Morning summary'} — sample</b>${DIG.prev.map(([t,ls])=>`<div><b>${esc(t)}</b><ul>${ls.map(l=>`<li>${esc(l)}</li>`).join('')}</ul></div>`).join('')}</div>`:''}
  </div></div>`;}
PK.done("admin");
