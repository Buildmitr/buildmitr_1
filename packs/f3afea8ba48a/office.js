/* bm-build:f3afea8ba48a */
/* BuildMitr page code: office */
function wtCsv(){const rs=wtRecs().slice().sort((a,b)=>(a.date+wtWho(a.user)).localeCompare(b.date+wtWho(b.user)));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const L=[['Date','Staff','Program','File','Project','Active (min)','Idle (min)','First','Last','PC'].map(q).join(',')].concat(rs.map(r=>[r.date,wtWho(r.user),r.app,r.file,wtProj(r.file),Math.round(n(r.act)/60),Math.round(n(r.idle)/60),r.first?new Date(r.first).toLocaleTimeString('en-IN'):'',r.last?new Date(r.last).toLocaleTimeString('en-IN'):'',r.pc].map(q).join(',')));
  const [a,b]=wtRange();saveFile(`Work time ${a}${a!==b?' to '+b:''}.csv`,new Blob(['﻿'+L.join('\r\n')],{type:'text/csv'}));}
async function ntHash(n){const t=`${n.title||''}\n${n.body||''}\n${(n.file&&n.file.id)||''}\n${n.ver||1}`;
  try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');}catch(_){return wtHash(t);}}
function ntPeople(n){return (D.team||[]).filter(t=>t.account&&(!n||t.account!==n.by)&&!['Client','Sub-contractor'].includes(t.role)&&(!n||!n.to||n.to==='all'||(Array.isArray(n.to)&&n.to.includes(t.role))));}
function llCsv(){const [a,b]=wtRange();let rs=(D.attlog||[]).filter(r=>r.date>=a&&r.date<=b);if(!(isAdmin()||S.demo))rs=rs.filter(r=>r.user===ME.id);
  rs.sort((x,y)=>(x.date+wtWho(x.user)+(x.start||0)).localeCompare(y.date+wtWho(y.user)+(y.start||0)));const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const L=[['Date','Staff','Log-in','Signed out','Last active','Device','App / browser','Place','Latitude','Longitude','Accuracy (m)','Location'].map(q).join(',')].concat(rs.map(r=>[r.date,wtWho(r.user),llTm(r.srv0||r.start),r.end?llTm(r.end):'',llTm(r.last),r.dev,r.app,r.place,r.lat,r.lng,r.acc,r.loc].map(q).join(',')));
  saveFile(`Log-in log ${a}${a!==b?' to '+b:''}.csv`,new Blob(['﻿'+L.join('\r\n')],{type:'text/csv'}));}
function vNotices(){const adm=isAdmin()&&!S.viewAs;
  if(S.cloud&&WT.srv===null)wtSrv();
  if(WT.srv===false)return header('Notices')+`<div class="box"><div class="box-h">${ico('file-signature')}<h2>Notices to accept</h2><span class="pill p-amber">Server update needed</span></div><div class="inst-b"><p>Notices are ready in the app, but your BuildMitr server needs a small update first (Apps Script → new version). After that you can upload notices here for staff to view and sign.</p></div></div>`;
  if(NT.open){const n=(D.notices||[]).find(x=>x.id===NT.open);if(n)return ntOne(n,adm);}
  const L=(D.notices||[]).filter(n=>adm||ntForMe(n)).sort((a,b)=>(b.at||0)-(a.at||0));
  const pend=ntPending();
  const list=L.length?`<div class="box">${L.map(n=>{const ppl=ntPeople(n),signed=ppl.filter(p=>ntSigOf(n.id,p.account)).length,mine=ntSigOf(n.id);
      return `<button type="button" class="nt-row" data-ntopen="${esc(n.id)}"><span class="nt-i">${ico('file-signature')}</span><span style="flex:1;min-width:0"><b>${esc(n.title)}</b>${n.ver>1?` <span class="code">v${n.ver}</span>`:''}<br><span class="code">${esc(fd(new Date(n.at).toISOString().slice(0,10)))} · ${esc(n.to==='all'||!n.to?'All staff':n.to.join(', '))}${n.active===false?' · Withdrawn':''}</span></span>
        ${adm?`<span class="pill ${signed===ppl.length&&ppl.length?'p-green':'p-amber'}">${signed}/${ppl.length} answered</span>`:mine?(mine.status==='declined'?`<span class="pill p-red">Declined</span>`:`<span class="pill p-green">Signed</span>`):n.by===ME.id?'':`<span class="pill p-amber">Please view & accept</span>`}</button>`;}).join('')}</div>`
    :`<div class="box hero-empty">${ico('file-signature')}<h2>No notices yet</h2><p>${adm?'Post a notice for your staff to read and accept — for example the work time and log-in recording notice.':'Notices from your company will appear here for you to read and accept.'}</p></div>`;
  return header('Notices',adm?`<button class="btn pri" id="ntNew">${ico('plus')}<span>New notice</span></button>`:'')+
    (adm?`<div class="box"><div class="srow"><span class="code" style="flex:1">Upload a notice as a PDF. Each staff member can only <b>view</b> it and tick to <b>accept</b> it, or <b>decline</b> it — they cannot edit or delete anything, and their answer is final. You see who signed, declined or has not answered yet.</span></div></div>`:'')+
    (pend.length&&!adm?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('file-signature')}<span>${pend.length} notice${pend.length>1?'s':''} to view and accept.</span></div>`:'')+list;}
function ntOne(n,adm){const ppl=ntPeople(n),mine=ntSigOf(n.id),locked=(D.noticesign||[]).some(s=>s.notice===n.id);
  const att=n.file?`<div class="srow"><button type="button" class="btn pri" data-ntview="${esc(n.id)}">${ico('file-text')}<span>View notice (PDF)</span></button><span class="code">${esc(n.file.name)}</span>${NT.viewed&&NT.viewed[n.id]?`<span class="pill p-green">Viewed</span>`:''}</div>`:'';
  const text=`<div class="box"><div class="box-h">${ico('file-signature')}<h2>${esc(n.title)}</h2>${n.ver>1?`<span class="code">Version ${n.ver}</span>`:''}</div>${n.body?`<div class="nt-body">${esc(n.body).replace(/\n/g,'<br>')}</div>`:''}${att}
    <div class="srow"><span class="code">Issued ${esc(fd(new Date(n.at).toISOString().slice(0,10)))} by ${esc(wtWho(n.by))} · ${esc(orgName())}</span></div></div>`;
  let sign='';
  if(mine&&mine.status==='declined')sign=`<div class="box"><div class="box-h">${ico('x')}<h2>You declined this notice</h2><span class="pill p-red">${esc(new Date(mine.srv0||mine.at).toLocaleString('en-IN'))}</span></div><div class="srow"><span class="code">Reason: ${esc(mine.reason||'—')}</span><button class="btn sm" data-ntpdf="${esc(mine.id)}">${ico('file-down')}<span>Copy (PDF)</span></button></div></div>`;
  else if(mine)sign=`<div class="box"><div class="box-h">${ico('check-check')}<h2>Accepted by you</h2><span class="pill p-green">${esc(new Date(mine.srv0||mine.at).toLocaleString('en-IN'))}</span></div><div class="srow">${mine.sig&&mine.sig.id?`<img src="/_blob/${esc(mine.sig.id)}" alt="Your signature" class="nt-sigimg">`:`<span class="pill p-green">${ico('check')} I have read and accept this notice</span>`}<span class="code">${esc(mine.typed||'')} · ${esc(mine.dev||'')}</span>
    <button class="btn sm" data-ntpdf="${esc(mine.id)}">${ico('file-down')}<span>Copy (PDF)</span></button></div></div>`;
  else if(ntForMe(n)&&n.by!==ME.id&&staffRole()&&!S.viewAs)sign=`<form class="box" id="ntSign" data-id="${esc(n.id)}"><div class="box-h">${ico('check-check')}<h2>Your acceptance</h2></div><div class="inst-b">
    ${n.file&&!(NT.viewed&&NT.viewed[n.id])?`<div class="note">${ico('file-text')}<span>Open <b>View notice (PDF)</b> above and read it first — then you can accept or decline.</span></div>`:''}
    <label class="pl-chk nt-agree"><input type="checkbox" name="agree"> <span>I, <b>${esc(ME.name||ME.email||'')}</b>, have read and understood this notice, and I accept it.</span></label>
    <div class="srow" style="padding:12px 0 0;border:0"><button class="btn pri" name="go" value="sign">${ico('check')}<span>Accept</span></button><button type="button" class="btn warn" id="ntDecl">${ico('x')}<span>Decline</span></button><span class="code">Your answer is saved with the date and time and cannot be changed or deleted afterwards.</span></div>
    <div id="ntDeclBox" hidden><label style="display:block;margin-top:10px">Why are you declining? (the admin will see this)<textarea name="reason" rows="3" placeholder="e.g. I would like to discuss the location recording first"></textarea></label><button class="btn warn" name="go" value="decline">${ico('x')}<span>Decline notice</span></button></div></div></form>`;
  const who=adm?`<div class="box"><div class="box-h">${ico('users')}<h2>Staff answers</h2><span class="code">${ppl.filter(p=>(ntSigOf(n.id,p.account)||{}).status!=='declined'&&ntSigOf(n.id,p.account)).length} accepted · ${ppl.filter(p=>(ntSigOf(n.id,p.account)||{}).status==='declined').length} declined · ${ppl.filter(p=>!ntSigOf(n.id,p.account)).length} pending</span></div>
    ${ppl.map(p=>{const s=ntSigOf(n.id,p.account);return `<div class="srow"><b style="flex:1;min-width:140px">${esc(p.name)}</b><span class="code">${esc(p.role||'')}</span>
      ${s?`<span class="pill ${s.status==='declined'?'p-red':'p-green'}">${s.status==='declined'?'Declined':'Accepted'} ${esc(new Date(s.srv0||s.at).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}))}</span>${s.status==='declined'&&s.reason?`<span class="code">“${esc(s.reason)}”</span>`:''}<button class="btn sm" data-ntpdf="${esc(s.id)}">${ico('file-down')}<span>PDF</span></button>`
        :`<span class="pill p-amber">Pending</span>${p.phone?`<button class="btn sm ghost" data-ntremind="${esc(n.id)}|${esc(p.phone)}|${esc(p.name)}">${ico('message-circle')}<span>Remind</span></button>`:''}`}</div>`;}).join('')||'<div class="srow"><span class="code">No staff with BuildMitr log-ins yet (add them in Team).</span></div>'}
    <div class="srow"><button class="btn sm" data-ntremind="${esc(n.id)}||">${ico('share-2')}<span>Remind everyone</span></button>
      ${locked?`<button class="btn sm" id="ntNewVer" data-id="${esc(n.id)}">${ico('copy')}<span>New version</span></button><span class="code">Signed notices are locked — changes go in a new version.</span>`:`<button class="btn sm" data-edit="notices:${esc(n.id)}" id="ntEdit">${ico('pencil')}<span>Edit</span></button>`}
      <button class="btn sm ghost" id="ntWithdraw" data-id="${esc(n.id)}">${n.active===false?'Re-issue':'Withdraw'}</button>${locked?'':`<button class="btn sm ghost warn" data-ntdel="${esc(n.id)}">${ico('trash-2')}<span>Delete</span></button>`}</div></div>`:'';
  return header(n.title,`<button class="btn" id="ntBack">${ico('arrow-left')}<span>All notices</span></button>`)+text+sign+who;}
async function ntPdf(sid){const s=(D.noticesign||[]).find(x=>x.id===sid);if(!s)return;const n=(D.notices||[]).find(x=>x.id===s.notice)||{title:s.title,body:''};toast('Preparing the signed copy…');
  try{await loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',()=>window.jspdf);
    const pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),W=210,M=18;let y=20;
    const line=(t,sz=10.5,b=false,gap=1.5)=>{pdf.setFont('helvetica',b?'bold':'normal');pdf.setFontSize(sz);pdf.splitTextToSize(String(t),W-2*M).forEach(l=>{if(y>275){pdf.addPage();y=20;}pdf.text(l,M,y);y+=sz*.42+gap;});};
    line(orgName(),11,true);line(n.title||s.title,15,true,3);if(n.file)line(`Notice document: ${n.file.name}`,9.5,true);y+=2;line(`Version ${n.ver||1} · issued ${n.at?new Date(n.at).toLocaleDateString('en-IN'):''}`,9);y+=3;
    String(n.body||'').split('\n').forEach(p=>p.trim()?line(p):y+=3);
    y+=6;if(y>220){pdf.addPage();y=20;}pdf.setDrawColor(150);pdf.line(M,y,W-M,y);y+=7;line(s.status==='declined'?'Declined by':'Accepted by',12,true);
    line(`Name: ${s.typed}`);line(`BuildMitr user: ${wtWho(s.user)}`);line(`${s.status==='declined'?'Declined':'Accepted'} on (server time): ${new Date(s.srv0||s.at).toLocaleString('en-IN')}`);line(`Device: ${s.dev||''} · ${s.app||''}`);
    if(s.viewed)line(`Notice opened (device time): ${new Date(s.viewed).toLocaleString('en-IN')}`);
    if(s.status==='declined'){line(`Reason given: ${s.reason||''}`);}else{line('[✓] Ticked: "I have read and understood this notice, and I accept it."',10,false);
    if(s.sig&&s.sig.id)try{const r=await bmBlob(s.sig.id);const b=await r.blob();const u=await new Promise(ok=>{const f=new FileReader();f.onload=()=>ok(f.result);f.readAsDataURL(b);});y+=2;pdf.addImage(u,'PNG',M,y,70,20);y+=24;}catch(_){line('[signature image could not be loaded]',9);}}
    line(`Notice fingerprint (SHA-256): ${s.hash}`,7.5);line(`Record: ${s.id}`,7.5);
    saveFile(`${(n.title||'Notice').replace(/[\\\/:*?"<>|]/g,'-').slice(0,60)} - ${s.status==='declined'?'declined':'accepted'} by ${s.typed}.pdf`,pdf.output('blob'));}
  catch(e){toast('Could not make the PDF: '+(e.message||e));}}
async function ntSign(f,go){const n=(D.notices||[]).find(x=>x.id===f.dataset.id);if(!n)return;
  if(n.file&&!(NT.viewed&&NT.viewed[n.id])){toast('Open “View notice (PDF)” and read it first');return;}
  const typed=ME.name||ME.email||'';
  if(go==='decline'){const reason=(f.elements.reason.value||'').trim();if(!reason){toast('Write why you are declining');return;}
    const hash=await ntHash(n),dev=await devDetail();
    const ok=await write(()=>db.doc(`noticesign/${ME.id}_${n.id}`).set({user:ME.id,name:ME.name||'',notice:n.id,title:n.title,ver:n.ver||1,hash,typed,status:'declined',reason,viewed:(NT.viewed||{})[n.id]||null,at:Date.now(),dev,app:appKind()}),'Your answer is saved — the admin will be informed');
    if(ok)render();return;}
  if(!f.elements.agree.checked){toast('Tick the box to accept the notice');return;}
  const btn=f.querySelector('.btn.pri');btn.disabled=true;
  try{const hash=await ntHash(n),dev=await devDetail();
    const ok=await write(()=>db.doc(`noticesign/${ME.id}_${n.id}`).set({user:ME.id,name:ME.name||'',notice:n.id,title:n.title,ver:n.ver||1,hash,typed,agree:true,status:'accepted',viewed:(NT.viewed||{})[n.id]||null,at:Date.now(),dev,app:appKind()}),'Notice accepted — thank you');
    if(ok)render();else btn.disabled=false;}
  catch(e){btn.disabled=false;toast('Could not save: '+(e.message||e));}}
function ntForm(n){const roles=MOD.team.fields.find(f=>f.k==='role').o.filter(r=>r!=='Client');const to=n&&Array.isArray(n.to)?n.to:null;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${n&&n.id?'Edit notice':'New notice'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <form id="ntForm" class="pane-b" data-id="${esc((n&&n.id)||'')}" data-ver="${(n&&n.ver)||1}"><label>Title<input name="title" required value="${esc((n&&n.title)||'')}"></label>
    <label>Notice PDF<input type="file" name="file" accept=".pdf,application/pdf" ${n&&n.file?'':'required'}></label>${n&&n.file?`<div class="code">Uploaded: ${esc(n.file.name)} (choose a file to replace it)</div>`:''}
    <label>Short message to staff (optional)<textarea name="body" rows="4" placeholder="e.g. Please read the attached notice and sign it by Friday.">${esc((n&&n.body)||'')}</textarea></label>
    <fieldset class="nt-to"><legend>Who must sign</legend><label class="pl-chk"><input type="radio" name="to" value="all" ${!to?'checked':''}> All staff</label><label class="pl-chk"><input type="radio" name="to" value="roles" ${to?'checked':''}> Only these roles:</label>
     <div class="nt-roles">${roles.map(r=>`<label class="pl-chk"><input type="checkbox" name="role" value="${esc(r)}" ${to&&to.includes(r)?'checked':''}> ${esc(r)}</label>`).join('')}</div></fieldset>
    <div class="srow" style="border:0;padding:12px 0 0"><button class="btn pri">${ico('check')}<span>${n&&n.id?'Save':'Post notice'}</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div></div>`;}
async function ntSave(f){const id=f.dataset.id,old=id?(D.notices||[]).find(x=>x.id===id):null;
  if(id&&(D.noticesign||[]).some(s=>s.notice===id)){toast('This notice is signed — make a new version instead');return;}
  const to=f.elements.to.value==='all'?'all':[...f.querySelectorAll('[name=role]:checked')].map(x=>x.value);if(to!=='all'&&!to.length){toast('Choose at least one role');return;}
  let file=old&&old.file||null;const fi=f.elements.file.files[0];if(!fi&&!file){toast('Upload the notice PDF');return;}if(fi&&!/pdf/i.test(fi.type||fi.name)){toast('Please upload a PDF');return;}
  if(fi){if(fi.size>10*1024*1024){toast('The file is larger than 10 MB');return;}toast('Uploading the document…');try{const r=await A.upload(fi,{type:fi.type});file={id:r.id,name:fi.name,type:fi.type||fileType(fi.name)};}catch(e){toast('Upload failed: '+(e.message||e));return;}}
  const d={title:f.elements.title.value.trim(),body:f.elements.body.value,to,file,ver:+f.dataset.ver||1,active:true,by:(old&&old.by)||ME.id,at:(old&&old.at)||Date.now()};d.hash=await ntHash(d);
  const nid=id||('n'+Date.now().toString(36));const ok=await write(()=>db.doc('notices/'+nid).set(d),id?'Notice saved':'Notice posted');if(ok){closeLayer();NT.open=nid;render();}}
PK.done("office");
