/* bm-build:f3afea8ba48a */
/* BuildMitr page code: drawings */
function relBadge(d){if(!d||!isDrawing(d)||relHide()||!((d.files||[]).length||d.link)||d.status==='Superseded')return '';
  return d.rel?`<span class="pill p-green" title="Released by ${esc(nm(d.rel.by))}, ${esc(fd(new Date(d.rel.at).toISOString().slice(0,10)))}">${ico('eye')} Visible to site & client</span>`
    :`<span class="pill p-grey" title="Clients and site engineers can't see it until the admin releases it">${ico('eye-off')} Not released</span>`;}
function relBtn(d){if(!d||!relCan()||!isDrawing(d)||!((d.files||[]).length||d.link)||d.status==='Superseded')return '';
  if(d.rel)return `<button type="button" class="btn sm ghost" data-dlrel="${esc(d.id)}|0" title="Hide from clients and site engineers">${ico('eye-off')}<span>Withdraw</span></button>`;
  return apStage(d)>=3?`<button type="button" class="btn sm pri" data-dlrel="${esc(d.id)}|1">${ico('send')}<span>Release to site & client</span></button>`:'';}
async function relSet(ids,on){const list=ids.map(id=>D.documents.find(x=>x.id===id)).filter(Boolean).map(d=>{const o={...recOf(d)};if(on)o.rel={by:ME.id,at:Date.now()};else delete o.rel;return ['documents',d.id,o];});
  if(!list.length)return;await write(()=>dbBatch(list),on?`${list.length>1?list.length+' drawings':'Drawing'} released to site engineers & clients`:'Withdrawn — clients and site engineers no longer see it');render();}
function dleOpen(){DLE.L=JSON.parse(JSON.stringify(dlLib(S.proj))).map(t=>({...t,groups:t.groups.map(g=>({...g,items:g.items.map(i=>({...i,o:i.o||i.n}))}))}));
  DLE.t=Math.max(0,DLE.L.findIndex(t=>t.k===DL.disc));DLE.own=!!(proj(S.proj)||{}).drawLib;dleDraw();}
function dleDraw(){const L=DLE.L,T=L[DLE.t];
  const up=(a,i,dir)=>`<button type="button" class="btn sm ghost" data-dlemv="${a}|${i}|${dir}" aria-label="Move ${dir<0?'up':'down'}">${dir<0?'↑':'↓'}</button>`;
  const grp=(G,gi)=>`<div class="dle-grp"><div class="dle-ghead">${ico('folder-open')}<input type="text" value="${esc(G.g)}" data-dleg="${gi}" placeholder="${T.groups.length>1?'Sub-folder name':'Sub-folder name (optional)'}" aria-label="Sub-folder name">
      ${up('g',gi,-1)}${up('g',gi,1)}<button type="button" class="btn sm ghost warn" data-dledelg="${gi}" aria-label="Remove sub-folder">${ico('trash-2')}</button></div>
    ${G.items.map((it,ii)=>`<div class="dle-row"><input type="text" value="${esc(it.n)}" data-dlei="${gi}|${ii}" aria-label="Drawing name">
      <label class="pl-chk"><input type="checkbox" data-dlepf="${gi}|${ii}" ${it.pf?'checked':''}> Each floor</label>
      ${up('i',gi+':'+ii,-1)}${up('i',gi+':'+ii,1)}<button type="button" class="btn sm ghost warn" data-dledeli="${gi}|${ii}" aria-label="Remove ${esc(it.n)}">${ico('trash-2')}</button></div>`).join('')}
    <button type="button" class="btn sm" data-dleaddi="${gi}">${ico('plus')}<span>Add drawing</span></button></div>`;
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane"><div class="pane-h"><h2>Edit drawings list</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b" id="dleBody">
    <div class="code" style="margin-bottom:8px">Folders are the tabs; sub-folders make the drop-down. Tick “Each floor” to list a drawing once per floor.</div>
    <div class="dle-tabs">${L.map((t,i)=>`<button type="button" class="btn sm ${i===DLE.t?'pri':''}" data-dlet="${i}">${esc(t.l||t.k)}</button>`).join('')}<button type="button" class="btn sm ghost" data-dleaddt>${ico('plus')}<span>Folder</span></button></div>
    ${T?`<div class="dle-ghead"><label class="code" style="min-width:90px">Folder name</label><input type="text" value="${esc(T.l||T.k)}" data-dletl aria-label="Folder name">
      <button type="button" class="btn sm ghost" data-dlemvt="-1" aria-label="Move folder left">←</button><button type="button" class="btn sm ghost" data-dlemvt="1" aria-label="Move folder right">→</button>
      <button type="button" class="btn sm ghost warn" data-dledelt>${ico('trash-2')}<span>Remove folder</span></button></div>
    ${T.groups.map(grp).join('')}
    <button type="button" class="btn sm" data-dleaddg>${ico('folder-plus')}<span>Add sub-folder</span></button>`:''}
   </div>
   <div class="pane-f srow dle-foot" style="flex-wrap:wrap;gap:8px">
    <button type="button" class="btn pri" data-dlesave="all">${ico('check')}<span>Save for all projects</span></button>
    <button type="button" class="btn" data-dlesave="proj">${ico('check')}<span>Only for ${esc(pname(S.proj))}</span></button>
    ${DLE.own?`<button type="button" class="btn ghost" data-dlesave="unproj">Use company list for this project</button>`:''}
    <button type="button" class="btn ghost" data-dlesave="reset">Back to standard list</button>
    <button type="button" class="btn ghost" data-close>Cancel</button></div></div></div>`;}
async function dleSave(how){const pid=S.proj;
  if(how==='reset'||how==='unproj'){const list=[];if(how==='reset')list.push(['org','drawlib',{tabs:null}]);if(proj(pid)&&proj(pid).drawLib)list.push(['projects',pid,{...recOf(proj(pid)),drawLib:null}]);
    if(await write(()=>dbBatch(list),how==='reset'?'Back to the standard drawings list':'This project now uses the company list')){closeLayer();render();}return;}
  const L=[],seen=new Set();
  for(const t of DLE.L){const l=String(t.l||t.k).trim();if(!l){toast('A folder needs a name');return;}if(seen.has(l.toLowerCase())){toast(`Two folders are called “${l}”`);return;}seen.add(l.toLowerCase());
    const k=t.nw?l:t.k;const gs=[],gseen=new Set();
    for(const g of t.groups){const gn=String(g.g||'').trim();if(gn&&gseen.has(gn.toLowerCase())){toast(`Two sub-folders in “${l}” are called “${gn}”`);return;}gseen.add(gn.toLowerCase());
      const items=g.items.map(i=>({n:String(i.n||'').trim(),pf:!!i.pf,o:i.o})).filter(i=>i.n);gs.push({g:gn,items});}
    if(gs.length>1&&gs.some(g=>!g.g)){toast(`Name every sub-folder in “${l}”`);return;}
    L.push({k,l,groups:gs});}
  /* renamed drawings keep their uploads */
  const mig=[];L.forEach(t=>t.groups.forEach(g=>g.items.forEach(i=>{if(i.o&&i.o!==i.n){const ob=i.o.replace(/s$/,''),nb=i.n.replace(/s$/,'');
    D.documents.filter(d=>d.disc===t.k&&(how!=='proj'||d.project===pid)).forEach(d=>{const k=d.dkey||d.title;let nk=null;if(k===i.o)nk=i.n;else if(String(k).startsWith(ob+' — '))nk=nb+String(k).slice(ob.length);
      if(nk)mig.push(['documents',d.id,{...recOf(d),dkey:nk,title:d.title===k?nk:d.title}]);});}delete i.o;})));
  const list=[...mig];
  if(how==='proj')list.push(['projects',pid,{...recOf(proj(pid)),drawLib:L}]);
  else{list.push(['org','drawlib',{tabs:L}]);if(proj(pid)&&proj(pid).drawLib)list.push(['projects',pid,{...recOf(proj(pid)),drawLib:null}]);}
  if(await write(()=>dbBatch(list),how==='proj'?`Drawings list saved for ${pname(pid)}`:'Drawings list saved for all projects')){DLE.L=null;closeLayer();render();}}
function dlMissing(pid){return dlLib(pid).map(T=>({T,items:dlItems(pid,T.k).filter(x=>!x.has)})).filter(g=>g.items.length);}
function vDlMissing(pid){const gs=dlMissing(pid),tot=gs.reduce((a,g)=>a+g.items.length,0),all=dlLib(pid).reduce((a,T)=>a+dlItems(pid,T.k).length,0);
  const canT=CANW&&(canEditView('dtasks')||canEditView('tasks'));
  const txt=`*Drawings still missing — ${pname(pid)}* (${tot} of ${all})\n`+gs.map(g=>`\n*${g.T.l||g.T.k}*\n`+g.items.map(x=>'☐ '+x.k).join('\n')).join('\n');
  return header('Missing drawings',`<button class="btn" data-dlmiss="0">${ico('arrow-left')}Drawings library</button>${tot?`<button type="button" class="btn" data-sharesum="${esc(txt)}" data-sharettl="Missing drawings ${esc(pname(pid))}">${ico('share-2')}<span>Share list</span></button>`:''}`)+
  `<div class="box"><div class="dl-prog"><div class="prog"><i style="width:${all?Math.round((all-tot)/all*100):0}%"></i></div><span class="code">${all-tot} of ${all} drawings uploaded · <b>${tot} missing</b></span></div>
   ${gs.length?gs.map(g=>`<div class="al-g">${esc(g.T.l||g.T.k)}<span class="code">${g.items.length} missing</span></div>${g.items.map(x=>{const tk=[...(D.dtasks||[]),...(D.tasks||[])].find(t=>t.project===pid&&!['Completed'].includes(t.status)&&(t.title===`Prepare ${x.k}`||t.doneFile===x.k));
     return `<div class="al-row"><span class="al-ic">${ico('file-text')}</span><div class="al-tx"><div>${esc(x.k)}</div><div class="code">${x.grp&&x.grp!=='General'?esc(x.grp)+' · ':''}${tk?`Task: ${esc(pnm(tk.who))} · ${esc(tk.status||'Not started')}${tk.due?' · due '+esc(fd(tk.due)):''}`:'No one is working on it'}</div></div>
       <button type="button" class="btn sm" data-dlmissgo="${esc(g.T.k)}">Open</button>${canT&&!tk?`<button type="button" class="btn sm pri" data-dlmtask="${esc(g.T.k)}|${esc(x.k)}">${ico('plus')}<span>Give as task</span></button>`:''}</div>`;}).join('')}`).join('')
   :`<div class="hero-empty">${ico('check')}<h2>Nothing missing</h2><p>Every drawing in the list for this project has been uploaded.</p></div>`}</div>`;}
function vDrawLib(){
  const pid=S.proj!=='all'?S.proj:'';if(pid&&DL.miss)return vDlMissing(pid);
  if(!pid)return header('Drawings library')+`<div class="box hero-empty">${ico('library')}<h2>Choose a project</h2><p>Pick a project at the top to see its Architecture, Structure, MEP, 3D views and Interior drawings.</p></div>`;
  const LIB=dlLib(pid);if(!LIB.some(t=>t.k===DL.disc)){DL.disc=LIB[0].k;DL.grp='';}
  const tabs=LIB.map(T=>{const d=T.k,it=dlItems(pid,d);const n=it.filter(x=>x.has).length;return `<button type="button" class="btn ${DL.disc===d?'pri':''}" data-dldisc="${esc(d)}">${esc(T.l||d)}${dlHasDrop(T)?' ▾':''} <span class="pill ${n===it.length?'p-green':'p-grey'}">${n}/${it.length}</span></button>`;}).join('');
  const TT=LIB.find(t=>t.k===DL.disc),G=dlHasDrop(TT),grps=G?[...TT.groups.map(x=>x.g||'General'),...(dlItems(pid,DL.disc).some(x=>x.grp==='Other')?['Other']:[])]:[];
  if(!grps.includes(DL.grp))DL.grp='';
  const allItems=dlItems(pid,DL.disc),items=DL.grp?allItems.filter(x=>x.grp===DL.grp):allItems,n=items.filter(x=>x.has).length,canUp=CANW&&canEditView('documents');
  const grpSel=G?`<div class="srow" style="padding-top:0"><label class="code" for="dlGrp">${DL.disc==='3D views'?'Show 3D views of':DL.disc==='Interiors'?'Show interior drawings for':'Sub-folder'}</label><select id="dlGrp" data-dlgrp style="max-width:320px">${['',...grps].map(g=>{const it=g?allItems.filter(x=>x.grp===g):allItems;return `<option value="${esc(g)}" ${DL.grp===g?'selected':''}>${g?esc(g):'All'} (${it.filter(x=>x.has).length}/${it.length})</option>`;}).join('')}</select></div>`:'';
  const rows=items.map((x,i)=>{const c=x.cur,f=(c&&c.files)||[],st=!x.has?'Pending':apStatus(c);
    return `${G&&!DL.grp&&(i===0||items[i-1].grp!==x.grp)?`<div class="dl-grp">${esc(x.grp)}</div>`:''}<div class="dl-row ${x.has?'':'dl-miss'}"><div class="dl-main"><div class="dl-t"><span class="dl-chk">${x.has?'✓':''}</span><b>${esc(x.k)}</b>${c&&c.rev?` <span class="code">${esc(c.rev)}</span>`:''} <span class="pill ${apPill(st)}">${esc(st)}</span>${x.has?' '+relBadge(c):''}${x.all.length>1?` <span class="code">${x.all.length} revisions</span>`:''}</div>
      ${f.length||c&&c.link?`<div class="dl-files">${f.map(ff=>`<span class="dl-f"><a href="/_blob/${esc(ff.id)}" target="_blank" rel="noopener" aria-label="${esc(ff.name)}">${ico(fileIco(ff))}${esc(ff.name)}</a><button type="button" class="btn sm ghost" data-fshare="${esc(ff.id)}|${esc(ff.name)}|${esc(ff.type||'')}|${esc(x.k)}" aria-label="Share ${esc(ff.name)}">${ico('share-2')}</button></span>`).join('')}${c&&c.link?`<a class="btn sm ghost" href="${esc(c.link)}" target="_blank" rel="noopener">${ico('external-link')}Link</a>`:''}</div>`:''}
      ${c&&c.fu?`<div class="code">Uploaded ${fd(new Date(c.at).toISOString().slice(0,10))} by ${esc(nm(c.by))}</div>`:''}
      ${x.has?apChips(c):''}${x.has?apLog(c):''}${x.all.length?trLibLine(pid,x):''}</div>
      <div class="dl-acts">${canUp?`<label class="btn sm pri" title="${x.has?'Uploads as the next revision — earlier revisions are kept':'Upload any file: drawings, PDFs, images, videos, models, Excel, Word, ZIP'}">${ico('upload')}<span>Upload${x.has?' <small style="opacity:.8;font-weight:500">new rev</small>':''}</span><input type="file" hidden multiple data-dlup="${esc(x.k)}"></label>`:''}
        ${x.has?`<button type="button" class="btn sm" data-dlshare="${esc(x.k)}">${ico('message-circle')}<span>Share</span></button>`:''}
        ${x.has?relBtn(c):''}${x.has&&!relHide()?apButtons(c,x.k):''}${x.has&&canUp&&qtCols().length?`<button type="button" class="btn sm" data-dlsend="${esc(c.id)}" title="Give this drawing to someone to update, with your corrections">${ico('send')}<span>Send to…</span></button>`:''}${dlDelBtn(c)}
        ${c&&canUp?`<button type="button" class="btn sm ghost" data-edit="documents:${esc(c.id)}" aria-label="Edit">${ico('pencil')}</button>`:''}</div></div>`;}).join('');
  const nMiss=dlMissing(pid).reduce((a,g)=>a+g.items.length,0);
  return header('Drawings library',`<button type="button" class="btn ${nMiss?'warn':''}" data-dlmiss="1">${ico('alert-triangle')}<span>Missing drawings · ${nMiss}</span></button>`+(canView('designsched')?`<button class="btn" data-go="designsched">${ico('pen-tool')}Design schedule</button>`:canView('schedule')?`<button class="btn" data-go="schedule">${ico('gantt-chart')}Construction schedule</button>`:''))+
   dlFloorBox(pid)+`<div class="box">${relCan()?`<div class="dl-edit-row"><button type="button" class="btn sm" data-dledit>${ico('pencil')}<span>Edit list</span></button></div>`:''}<div class="srow">${tabs}</div>${grpSel}
    <div class="dl-prog"><div class="prog"><i style="width:${items.length?Math.round(n/items.length*100):0}%"></i></div><span class="code">${n} of ${items.length} ${esc(DL.grp||(TT&&TT.l)||DL.disc)} ${DL.disc==='3D views'?'views':'drawings'} uploaded</span>
      ${relCan()&&items.some(x=>x.has&&x.cur&&!x.cur.rel&&apStage(x.cur)>=3&&x.cur.status!=='Superseded')?`<button type="button" class="btn sm pri" data-dlrelall>${ico('send')}<span>Release all approved</span></button>`:''}${n?`<button type="button" class="btn sm" data-dlshareall>${ico('share-2')}<span>Share all ${esc(DL.grp||(TT&&TT.l)||DL.disc)}</span></button>`:''}</div>
    <div class="dl-list">${rows}</div>
    ${canUp?`<form id="dlAdd" class="srow"><input name="t" placeholder="${DL.disc==='3D views'?'Add another 3D view, e.g. Balcony 3D':DL.disc==='Interiors'?'Add another interior drawing, e.g. Bar unit details':`Add another ${esc((TT&&TT.l)||DL.disc)} drawing${DL.disc==='Architecture'||DL.disc==='Structure'?', e.g. Lift shaft details':''}`}" style="flex:1;min-width:200px"><button class="btn sm">${ico('plus')}<span>Add to list</span></button></form>`:''}
    <div class="code" style="padding:0 16px 14px">${DL.disc==='3D views'?'Renders (JPG, PNG, PDF), walkthrough videos (MP4) and 3D model files (SketchUp, Revit, GLB, OBJ, ZIP) — up to 10 MB each. For a bigger walkthrough video, put it on Drive or YouTube and add the link with ✎.':'Any file — DWG, PDF, images, videos, 3D models, Excel, Word, ZIP… up to 10 MB each. Upload again any time for the next revision.'} A new upload becomes the next revision (R0, R1…), the older one is kept as Superseded.<br>
      Approval: ① Drafted (draftsman uploads) → ② Checked (architect / project manager) → ③ Approved (senior architect) → the admin taps <b>Release to site & client</b>; only then can clients and site engineers see it. Upload a PDF or image print with the DWG to use <b>Mark up</b> (pen, arrows, boxes, text).</div></div>`;
}
function dlFloorBox(pid){
  const fl=dlFloors(pid),p=proj(pid)||{},ed=CANW&&canEditView('projects');const above=fl.filter(f=>!/cellar|stilt/i.test(f)).length;
  return `<div class="box dl-floors"><div class="srow">${ico('building-2')}<span><b>Floors:</b> ${fl.map(esc).join(' · ')}</span>
    ${ed?`<button type="button" class="btn sm" id="dlFlEdit">${ico('pencil')}<span>${Array.isArray(p.floors)&&p.floors.length?'Change floors':'Set floors'}</span></button>`:''}</div>
    ${DL.flEdit?`<form id="dlFlForm" class="e2form">
      <label>Floors above ground (incl. ground)<input name="n" type="number" min="1" max="30" value="${above||1}" required></label>
      <label class="pl-chk" style="align-self:end"><input type="checkbox" name="cellar" ${fl.includes('Cellar')?'checked':''}>Cellar</label>
      <label class="pl-chk" style="align-self:end"><input type="checkbox" name="stilt" ${fl.includes('Stilt floor')?'checked':''}>Stilt floor</label>
      <label class="wide">Or type the floor names (comma separated)<input name="names" value="${esc(fl.join(', '))}" placeholder="Cellar, Ground floor, First floor, Second floor"></label>
      <div class="srow" style="grid-column:1/-1;padding:0;border:0"><button class="btn pri">${ico('check')}<span>Save floors</span></button><button type="button" class="btn ghost" id="dlFlCancel">Cancel</button>
      <span class="code">Floor plans, ceiling, flooring, shuttering, slab, beam, electrical, lighting, plumbing, drainage and AC drawings are listed once per floor.</span></div></form>`:''}</div>`;
}
async function dlUpload(key,files){return dlUploadTo(S.proj,DL.disc,key,files);}
function fileShareText(files,title){const p=S.proj!=='all'?pname(S.proj):'';
  return [`*${title}*${p?' — '+p:''}`,...files.map(f=>`${f.name}: ${f.link||fileLink(f)}`),'',`— ${orgName()} (BuildMitr)`].join('\n');}
function shareFiles(files,title){
  files=files.map(f=>({...f,link:fileLink(f)}));const text=fileShareText(files,title);
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane" style="height:auto;max-height:100%;margin-top:auto"><div class="pane-h"><h2>Share ${esc(title)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b"><div class="code" style="margin-bottom:10px">${files.map(f=>esc(f.name)).join(', ')}</div>
    <div class="sh-grid">
     <button type="button" class="btn pri" data-fsto="file">${ico('share-2')}<span>Send the file${files.length>1?'s':''}</span></button>
     <button type="button" class="btn" data-fsto="wa">${ico('message-circle')}<span>WhatsApp</span></button>
     <button type="button" class="btn" data-fsto="mail">${ico('mail')}<span>Email</span></button>
     <button type="button" class="btn" data-fsto="copy">${ico('copy')}<span>Copy member link${files.length>1?'s':''}</span></button>
     <button type="button" class="btn" data-fsto="tg">${ico('send')}<span>Telegram</span></button>
     <button type="button" class="btn" data-fsto="dl">${ico('file-down')}<span>Download</span></button>
     ${relCan()&&CLOUD.blob?`<button type="button" class="btn ghost warn" data-fsto="pub">${ico('globe')}<span>Public link${files.length>1?'s':''}</span></button>`:''}</div>
    <p class="code" style="margin-top:10px">Files are private. <b>Send the file</b> attaches the file itself (WhatsApp, email…) — use it for people outside BuildMitr. Links open only for BuildMitr members after they sign in.${relCan()&&CLOUD.blob?' <b>Public link</b> lets anyone with the link open that file.':''}</p></div></div></div>`;
  SHF={files,title,text};
}
async function shareFilesTo(k){
  const {files,title,text}=SHF||{};if(!files)return;
  if(k==='pub'){if(!SHF.sure){SHF.sure=1;const b=document.querySelector('[data-fsto="pub"] span');if(b)b.textContent='Tap again: anyone with the link can open it';return;}
    try{toast('Making a public link…');const out=[];for(const f of files){const j=await gasApi('pubFile',{id:f.id});out.push({...f,pub:j.url});}
      const t=fileShareText(out,title).replace(/\*/g,'');try{await navigator.clipboard.writeText(t);toast('Public link copied — paste it anywhere');}catch(_){prompt('Copy the public link',t);}SHF.files=out;SHF.text=fileShareText(out,title);}catch(e){toast(e.message||'Could not make a public link');}return;}
  if(k==='wa'&&navigator.canShare&&/Android|iPhone|iPad/i.test(navigator.userAgent)&&!files.some(f=>f.pub)){return shareFilesTo('file');}
  if(k==='wa'){const w=window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank');if(w)try{w.opener=null;}catch(_){}}
  else if(k==='tg'){const w=window.open('https://t.me/share/url?url='+encodeURIComponent(files[0].link)+'&text='+encodeURIComponent(text),'_blank');if(w)try{w.opener=null;}catch(_){}}
  else if(k==='mail')location.href='mailto:?subject='+encodeURIComponent(`${title}${S.proj!=='all'?' — '+pname(S.proj):''}`)+'&body='+encodeURIComponent(text.replace(/\*/g,''));
  else if(k==='copy'){try{await navigator.clipboard.writeText(text.replace(/\*/g,''));toast('Copied — paste it anywhere');}catch(_){toast('Could not copy');}}
  else if(k==='dl'){try{for(const f of files){const b=await (await bmBlob(f.id)).blob();await saveFile(f.name||BMF.name[f.id]||'file',b);}}catch(e){toast(e.message||'Could not download');}}
  else if(k==='file'){try{toast('Preparing the file…');const fs=[];for(const f of files){const r=await bmBlob(f.id);const b=await r.blob();fs.push(new File([b],f.name,{type:f.type||b.type||'application/octet-stream'}));}
      if(navigator.canShare&&navigator.canShare({files:fs})){await navigator.share({files:fs,title,text:text.replace(/\*/g,'')});}
      else{for(const f of fs)await saveFile(f.name,f);toast('Saved — attach it in WhatsApp or email');}}catch(e){if(e&&e.name!=='AbortError')toast(e.message||'Could not share the file');}}
}
function apChips(d){const st=apStage(d),a=(d&&d.appr)||{};
  return `<span class="ap-chips" aria-label="Approval stage ${st} of 3">${AP_STEPS.map((s,i)=>{const x=a['s'+(i+1)],done=st>i;
    return `<span class="ap-chip ${done?'on':''} ${st===i&&d&&d.status!=='Sent back'?'next':''}" title="${esc(s.n)}${x?` — ${esc(nm(x.by))}, ${esc(fd(new Date(x.at).toISOString().slice(0,10)))}`:` — ${esc(s.who)}`}"><b>${i+1}</b>${esc(s.n)}${x&&done?`<small>${esc(String(nm(x.by)).split(' ')[0])}</small>`:''}</span>`;}).join('<i class="ap-ln"></i>')}</span>`;}
function apButtons(d,key){if(!d||!((d.files||[]).length||d.link)||d.status==='Superseded')return '';const st=apStage(d),out=[];
  if(st<3&&apCan(st+1))out.push(`<button type="button" class="btn sm ${st===2?'pri':''}" data-apgo="${esc(d.id)}|${st+1}">${ico(st===2?'check-check':'check')}<span>${esc(AP_STEPS[st].act)}</span></button>`);
  if(st>=1&&apCan(Math.min(st+1,3)))out.push(`<button type="button" class="btn sm ghost" data-apback="${esc(d.id)}">${ico('corner-up-left')}<span>Send back</span></button>`);
  if(dlMarkable(d))out.push(`<button type="button" class="btn sm" data-mkup="${esc(d.id)}">${ico('pen-tool')}<span>Mark up</span></button>`);
  return out.join('');}
function apLog(d){const L=((d&&d.rv)||[]).slice().sort((a,b)=>(b.at||0)-(a.at||0));if(!L.length)return '';
  const one=x=>`<div class="ap-note ${x.k==='back'?'back':''}">${x.img?`<a href="/_blob/${esc(x.img.id)}" target="_blank" rel="noopener" aria-label="${esc(x.img.name)}" class="ap-thumb"><img src="/_blob/${esc(x.img.id)}" alt="Marked-up drawing" loading="lazy"></a>`:''}
    <div><b>${esc(nm(x.by))}</b> <span class="code">${esc(x.k==='back'?'sent it back':x.k==='mark'?'marked it up':x.k==='go'?AP_STEPS[(x.st||1)-1].n.toLowerCase():'commented')} · ${esc(fd(new Date(x.at).toISOString().slice(0,10)))}</span>${x.t?`<div>${esc(x.t)}</div>`:''}${trFiles(x.files)}
    ${canDelFiles()?`<button type="button" class="btn sm ghost warn" data-rvdel="${esc(d.id)}|${esc(x.at)}">${ico('trash-2')}<span>Remove</span></button>`:''}${x.img?`<button type="button" class="btn sm ghost" data-fshare="${esc(x.img.id)}|${esc(x.img.name)}|image/jpeg|${esc(x.img.name)}">${ico('share-2')}<span>Share</span></button>`:''}</div></div>`;
  return `<details class="ap-log" ${L[0].k==='back'&&d.status==='Sent back'?'open':''}><summary>${ico('message-square')} ${L.length} comment${L.length>1?'s':''} & markup${L[0].t?` — <i>${esc(String(L[0].t).slice(0,60))}</i>`:''}</summary>${L.map(one).join('')}</details>`;}
function apDialog(id,kind,st){const d=D.documents.find(x=>x.id===id);if(!d)return;const t=`${d.dkey||d.title}${d.rev?' '+d.rev:''}`;
  const head=kind==='back'?'Send back for changes':AP_STEPS[st-1].act;
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane" style="height:auto;max-height:100%"><div class="pane-h"><h2>${esc(head)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <form id="apForm" class="pane-b" data-id="${esc(id)}" data-kind="${kind}" data-st="${st||0}"><div class="code" style="margin-bottom:8px">${esc(t)} · ${esc(pname(d.project))}</div>
    ${apChips(d)}
    <label style="display:block;margin-top:12px">${kind==='back'?'What needs to change (required)':'Comment (optional)'}<textarea name="t" rows="3" ${kind==='back'?'required':''} placeholder="${kind==='back'?'e.g. Staircase width 1.2 m, update the door schedule':'e.g. Checked dimensions and grid lines'}"></textarea></label>
    ${kind==='back'?`<label style="display:block;margin-top:8px">Corrected / marked-up files (optional — DWG, PDF, photos…)<input type="file" name="files" multiple></label>${(()=>{const tk=trTasksOf(d.project,d.dkey||d.title,[d.id])[0];return tk?`<div class="code" style="margin-top:6px">The task “${esc(tk[1].title)}” goes back to ${esc(pnm(tk[1].who))} with this note.</div>`:'';})()}`:''}
    ${kind!=='back'&&st===3&&relCan()&&isDrawing(d)?`<label class="pl-chk" style="margin-top:8px"><input type="checkbox" name="rel" checked> Also release to site engineers & clients</label>`:''}
    <label class="pl-chk" style="margin-top:8px"><input type="checkbox" name="wa" checked> Tell the team on WhatsApp</label>
    <div class="srow" style="padding:12px 0 0;border:0"><button class="btn ${kind==='back'?'warn':'pri'}">${ico(kind==='back'?'corner-up-left':'check')}<span>${esc(head)}</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div></div>`;
  setTimeout(()=>{const ta=document.querySelector('#apForm textarea');if(ta)ta.focus();},50);}
async function apSave(id,kind,st,txt,wa,rel,fs){const d=D.documents.find(x=>x.id===id);if(!d)return;const now=Date.now(),t=`${d.dkey||d.title}${d.rev?' '+d.rev:''}`;
  const a={...(d.appr||{})},rv=[...(d.rv||[])];let status,up=[];
  if(kind==='back'){up=await trUpload(fs);if(up===null)return;status='Sent back';rv.push({k:'back',by:ME.id,at:now,t:txt,st:apStage(d),...(up.length?{files:up}:{})});Object.keys(a).forEach(k=>delete a[k]);}
  else{a['s'+st]={by:ME.id,at:now};for(let i=1;i<st;i++)if(!a['s'+i])a['s'+i]={by:ME.id,at:now};status=AP_STATUS[st];rv.push({k:'go',by:ME.id,at:now,t:txt,st});}
  const relX=kind==='back'?{rel:null}:(st===3&&rel&&relCan()?{rel:{by:ME.id,at:now}}:{});
  const ok=await write(()=>db.doc('documents/'+id).update({appr:a,status,rv,...relX}),kind==='back'?`${t}: sent back`:`${t}: ${AP_STEPS[st-1].n.toLowerCase()}`);
  if(!ok)return;
  if(kind!=='back'&&st===3){const tk=trTasksOf(d.project,d.dkey||d.title,[d.id]).find(([c,x])=>x.status==='For review');   // approving the drawing approves the task that made it
    if(tk&&trCanWrite(tk[0],tk[1]))await trPatch(tk[0],tk[1].id,{status:TR_DONE(tk[0]),progress:100,log:[...(tk[1].log||[]),{k:'ok',by:ME.id,at:now,t:'Approved in the Drawings library',key:d.dkey||d.title,rev:d.rev||''}]});}
  if(kind==='back'){const tk=trTasksOf(d.project,d.dkey||d.title,[d.id])[0];   // the task that made this drawing goes back to its person
    if(tk&&trCanWrite(tk[0],tk[1]))await trPatch(tk[0],tk[1].id,{status:'Changes requested',progress:Math.min(+tk[1].progress||0,90),log:[...(tk[1].log||[]),{k:'back',by:ME.id,at:now,t:txt,files:up,who:tk[1].who,key:d.dkey||d.title,rev:d.rev||''}]});}
  closeLayer();render();
  if(wa){const next=kind==='back'?'Please update and upload a new revision.':st===1?`Please check it (${apWho(2).filter(r=>r!=='Admin').join(' / ')}).`:st===2?'Ready for final approval by the senior architect.':'Approved — good for construction.';
    const msg=[`*${t}* — ${pname(d.project)}`,kind==='back'?`↩️ Sent back by ${ME.name||'me'}`:`✅ ${AP_STEPS[st-1].n} by ${ME.name||'me'} (stage ${st} of 3)`,txt?`“${txt}”`:'',next,'',...(d.files||[]).map(f=>`${f.name}: ${fileLink(f)}`),'',`— ${orgName()} (BuildMitr)`].filter((x,i,arr)=>x!==''||arr[i-1]!=='').join('\n');
    const w=window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');if(w)try{w.opener=null;}catch(_){}}}
async function mkOpen(id,fileId){const d=D.documents.find(x=>x.id===id);const f=fileId?((d&&d.files)||[]).find(x=>x.id===fileId):dlMarkFile(d);
  if(!d||!f){toast('Upload a PDF or image print of this drawing to mark it up — DWG files cannot be drawn on in a phone or browser.');return;}
  Object.assign(MK,{doc:d,file:f,img:null,shapes:[],zoom:1,page:1,pages:1,pdf:null,draw:null});
  document.getElementById('layer').innerHTML=`<div class="mk" role="dialog" aria-label="Mark up drawing">
   <div class="mk-bar"><button type="button" class="btn sm ghost" data-mkx aria-label="Close">${ico('x')}</button><b class="mk-t">${esc(d.dkey||d.title)}${d.rev?' '+esc(d.rev):''}</b>
    <span class="mk-pg" hidden><button type="button" class="btn sm ghost" data-mkpg="-1" aria-label="Previous page">${ico('chevron-left')}</button><span id="mkPg">1/1</span><button type="button" class="btn sm ghost" data-mkpg="1" aria-label="Next page">${ico('chevron-right')}</button></span>
    <button type="button" class="btn sm ghost" data-mkz="-1" aria-label="Zoom out">${ico('zoom-out')}</button><button type="button" class="btn sm ghost" data-mkz="1" aria-label="Zoom in">${ico('zoom-in')}</button></div>
   <div class="mk-stage" id="mkStage"><div class="mk-load">Opening ${esc(f.name)}…</div><canvas id="mkCv" hidden></canvas><input id="mkTxt" class="mk-txt" hidden placeholder="Type, then Enter"></div>
   <div class="mk-tools">${[['pen','pen-tool','Pen'],['hl','highlighter','Highlight'],['arrow','move-up-right','Arrow'],['box','square','Box'],['ring','circle','Circle'],['text','type','Text'],['hand','hand','Move']].map(([k,i,l])=>`<button type="button" class="btn sm mk-tool ${MK.tool===k?'pri':''}" data-mktool="${k}" aria-label="${l}" title="${l}">${ico(i)}</button>`).join('')}
    <span class="mk-sep"></span>${MK_COLORS.map(c=>`<button type="button" class="mk-col ${MK.color===c?'on':''}" data-mkcol="${c}" style="background:${c}" aria-label="Colour ${c}"></button>`).join('')}
    <span class="mk-sep"></span>${[1,2,4].map(s=>`<button type="button" class="btn sm mk-sz ${MK.size===s?'pri':''}" data-mksz="${s}" aria-label="Line ${s}"><i style="height:${s+1}px"></i></button>`).join('')}
    <span class="mk-sep"></span><button type="button" class="btn sm" data-mkundo aria-label="Undo">${ico('undo-2')}</button><button type="button" class="btn sm ghost" data-mkclear>Clear</button></div>
   <form class="mk-foot" id="mkForm"><input name="t" placeholder="Add a comment (optional)" aria-label="Comment"><button class="btn pri" name="go" value="save">${ico('save')}<span>Save</span></button><button class="btn" name="go" value="share">${ico('share-2')}<span>Save & share</span></button></form></div>`;
  try{const r=await bmBlob(f.id);const blob=await r.blob();
    if(/pdf/.test(f.type||'')||/\.pdf$/i.test(f.name)){await loadPdfJs();MK.pdf=await pdfjsLib.getDocument({data:new Uint8Array(await blob.arrayBuffer())}).promise;MK.pages=MK.pdf.numPages;await mkPage(1);}
    else{MK.img=await mkImage(blob);mkReady();}}
  catch(e){const s=document.querySelector('#mkStage .mk-load');if(s)s.textContent='Could not open the drawing: '+(e.message||e);}}
function mkImage(blob){return new Promise((ok,no)=>{const u=URL.createObjectURL(blob),im=new Image();im.onload=()=>{const c=document.createElement('canvas'),k=Math.min(1,3000/Math.max(im.width,im.height));c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);ok(c);};im.onerror=()=>no(new Error('not a picture'));im.src=u;});}
async function mkPage(n){if(!MK.pdf)return;if(MK.shapes.length&&!MK.okLeave){MK.okLeave=true;toast('Marks on this page are not saved — Save first, or tap again to leave them');return;}MK.page=Math.max(1,Math.min(MK.pages,n));MK.shapes=[];
  const pg=await MK.pdf.getPage(MK.page),v0=pg.getViewport({scale:1}),k=Math.min(4,2600/Math.max(v0.width,v0.height)),v=pg.getViewport({scale:k});
  const c=document.createElement('canvas');c.width=Math.round(v.width);c.height=Math.round(v.height);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
  await pg.render({canvasContext:x,viewport:v}).promise;MK.img=c;mkReady();}
function mkReady(){const cv=document.getElementById('mkCv');if(!cv||!MK.img)return;MK.okLeave=false;cv.width=MK.img.width;cv.height=MK.img.height;cv.hidden=false;
  const l=document.querySelector('#mkStage .mk-load');if(l)l.remove();const pg=document.querySelector('.mk-pg');if(pg){pg.hidden=MK.pages<2;document.getElementById('mkPg').textContent=MK.page+'/'+MK.pages;}
  mkFit();mkDraw();}
function mkFit(){const cv=document.getElementById('mkCv'),st=document.getElementById('mkStage');if(!cv||!st)return;const k=Math.min((st.clientWidth-8)/cv.width,(st.clientHeight-8)/cv.height);
  cv.style.width=Math.round(cv.width*k*MK.zoom)+'px';cv.style.height=Math.round(cv.height*k*MK.zoom)+'px';cv.style.touchAction=MK.tool==='hand'?'auto':'none';st.classList.toggle('zoomed',MK.zoom>1);}
function mkTextAt(p,e){const t=document.getElementById('mkTxt'),st=document.getElementById('mkStage'),r=st.getBoundingClientRect();
  t.hidden=false;t.value='';t.style.left=(e.clientX-r.left+st.scrollLeft)+'px';t.style.top=(e.clientY-r.top+st.scrollTop)+'px';t.style.color=MK.color;MK.txtAt=p;t.focus();setTimeout(()=>{if(document.activeElement!==t)t.focus();},50);}
function mkTextDone(){const t=document.getElementById('mkTxt');if(!t||t.hidden)return;const v=t.value.trim();t.hidden=true;if(v&&MK.txtAt){MK.shapes.push({t:'text',c:MK.color,w:MK.size,a:MK.txtAt,s:v});mkDraw();}MK.txtAt=null;}
function mkTools(){document.querySelectorAll('[data-mktool]').forEach(b=>b.classList.toggle('pri',b.dataset.mktool===MK.tool));document.querySelectorAll('[data-mkcol]').forEach(b=>b.classList.toggle('on',b.dataset.mkcol===MK.color));
  document.querySelectorAll('[data-mksz]').forEach(b=>b.classList.toggle('pri',+b.dataset.mksz===MK.size));mkFit();}
async function mkSave(share,txt){const d=MK.doc,cv=document.getElementById('mkCv');if(!d||!cv||!MK.img)return;if(!MK.shapes.length&&!txt){toast('Draw something on the drawing first');return;}
  if(!A){toast('Saving needs Contributor access.');return;}mkTextDone();
  const blob=await new Promise(ok=>cv.toBlob(ok,'image/jpeg',.85));const n=((d.rv||[]).filter(x=>x.k==='mark').length)+1;
  const name=`${(d.dkey||d.title||'Drawing').replace(/[\\\/:*?"<>|]/g,'-')}${d.rev?' '+d.rev:''} markup ${n}${MK.pages>1?' p'+MK.page:''}.jpg`;
  const btns=document.querySelectorAll('#mkForm button');btns.forEach(b=>b.disabled=true);toast('Saving the marked-up drawing…');
  try{const r=await A.upload(new File([blob],name,{type:'image/jpeg'}),{type:'image/jpeg'});const img={id:r.id,name,type:'image/jpeg'};
    const ok=await write(()=>db.doc('documents/'+d.id).update({rv:[...(d.rv||[]),{k:'mark',by:ME.id,at:Date.now(),t:txt,img,st:apStage(d)}]}),'Marked-up drawing saved');
    if(!ok){btns.forEach(b=>b.disabled=false);return;}MK.shapes=[];closeLayer();render();if(share)shareFiles([img],name.replace(/\.jpg$/,''));}
  catch(e){btns.forEach(b=>b.disabled=false);toast('Could not save: '+(e.message||e));}}
function finForm(src,id,date){
  const t=src==='cal'?(D.cal||[]).find(x=>x.id===id):(D[src]||[]).find(x=>x.id===id);if(!t)return;
  const pid=t.project||(S.proj!=='all'?S.proj:'');const tabs=pid?dlLib(pid):[];const dd=t.doneDisc||t.disc;const disc0=dd&&tabs.some(x=>x.k===dd)?dd:(src==='tasks'?'Structure':'Architecture');const dk=t.doneFile||t.dkey||'';const back=t.status==='Changes requested'?trLast(t,'back'):null;
  const items=d=>pid?dlItems(pid,d).map(x=>x.k):[];
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="finForm" data-src="${src}" data-id="${esc(id)}" data-date="${esc(date||'')}" data-pid="${esc(pid)}"><div class="pane-h"><h2>Finish: ${esc(t.title)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:12px">
    ${back?`<div class="note warn">${ico('corner-up-left')}<span><b>Corrections from ${esc(pnm(back.by))}:</b> ${esc(back.t||'')}${trFiles(back.files)}</span></div>`:''}
    ${pid?`<p class="code">The file goes into the Drawings library of ${esc(pname(pid))}${dk?' as the next revision of '+esc(dk):''}. ${src!=='cal'&&trNeeds(t)?`It then goes to ${esc(pnm(t.by))} for review.`:'The task is marked done and the admin is told.'}</p>
    <label>Library folder<select name="disc" id="finDisc">${tabs.map(x=>`<option value="${esc(x.k)}" ${x.k===disc0?'selected':''}>${esc(x.l||x.k)}</option>`).join('')}</select></label>
    <label>Drawing<select name="key" id="finKey"><option value="__new">+ New drawing (name below)</option>${items(disc0).map(k=>`<option ${(dk?k===dk:k.toLowerCase()===String(t.title).toLowerCase())?'selected':''}>${esc(k)}</option>`).join('')}</select></label>
    <label id="finNewL">New drawing name<input name="newk" maxlength="120" value="${esc(String(t.title).replace(/\s*\((every|daily).*\)$/i,''))}"></label>`:`<p class="note">This work has no project, so it cannot go into a project library. Pick a project on the work first, or just tick it done.</p>`}
    <label>Files (drawing, PDF, image, model…)<input type="file" name="files" multiple ${pid?'required':''}></label>
    <label>Note (optional)<textarea name="note" rows="2" maxlength="500"></textarea></label>
  </div><div class="pane-f"><button class="btn pri" ${pid?'':'disabled'}>${ico('upload')}<span>Upload & mark done</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;
  finNew();}
function finNew(){const k=document.getElementById('finKey'),l=document.getElementById('finNewL');if(k&&l)l.hidden=k.value!=='__new';}
PK.done("drawings");
