/* bm-build:843acea6e124 */
/* BuildMitr page code: library */
function stdAccTxt(list){list=(list||[]).filter(x=>x!=='Admin'&&x!=='Project manager');if(!list.length)return 'Admin & project manager only';const ppl=list.filter(x=>D.team.some(t=>t.account===x));
  return 'Admin, project manager, '+[list.includes('all')?'everyone in the team':'',...list.filter(x=>x!=='all'&&!ppl.includes(x)),...ppl.map(u=>pnm(u))].filter(Boolean).join(', ');}
function vStdLib(){
  const fs=stdFolders().filter(stdCanSee),boss=isAdmin()||curRole()==='Project manager';
  if(STD.f&&!fs.some(f=>f.id===STD.f))STD.f='';
  const top=fs.filter(f=>!f.parent||!fs.some(p=>p.id===f.parent)),kids=id=>fs.filter(f=>f.parent===id);
  const files=(D.stdlib||[]).filter(x=>stdCanSee(stdF(x.folder)));
  const inF=id=>{const ids=[id,...kids(id).map(k=>k.id)];return files.filter(x=>ids.includes(x.folder));};
  const q=STD.q.trim().toLowerCase(),cur=stdF(STD.f);
  let list=q?files.filter(x=>(x.title+' '+(x.notes||'')+' '+(x.tags||'')+' '+(x.files||[]).map(f=>f.name).join(' ')).toLowerCase().includes(q)):STD.f?files.filter(x=>x.folder===STD.f):[];
  list=list.sort((a,b)=>String(a.title).localeCompare(String(b.title)));
  const fbtn=(f,lvl)=>`<button type="button" class="std-f ${STD.f===f.id?'on':''}" data-stdf="${esc(f.id)}" style="padding-left:${12+lvl*16}px">${ico(lvl?'folder':'folder')}<span>${esc(f.name)}</span><span class="code">${inF(f.id).length||''}</span></button>`;
  const tree=top.map(f=>fbtn(f,0)+kids(f.id).map(k=>fbtn(k,1)).join('')).join('');
  const row=x=>{const f=stdF(x.folder),mine=x.by===ME.id,canEd=boss||(mine&&stdCanUp(f));
    return `<div class="std-r"><div style="flex:1;min-width:0"><b>${esc(x.title)}</b>${x.rev?` <span class="pill p-grey">${esc(x.rev)}</span>`:''}
      <div class="dl-files">${(x.files||[]).map(fl=>`<span class="dl-f"><a href="/_blob/${esc(fl.id)}" target="_blank" rel="noopener">${ico(fileIco(fl))}${esc(fl.name)}</a></span>`).join('')}</div>
      <div class="code">${[q&&f?esc(f.name):'',x.by&&pnm(x.by)!=='—'?esc(pnm(x.by)):'',x.at?fd(new Date(x.at).toISOString().slice(0,10)):''].filter(Boolean).join(' · ')}${x.notes?' · '+esc(x.notes):''}</div>${(x.old||[]).length?`<details class="std-old"><summary class="code">${x.old.length} older version${x.old.length>1?'s':''}</summary>${x.old.map(o=>`<div class="code">${esc(o.rev||'—')}${o.at?' · '+fd(new Date(o.at).toISOString().slice(0,10)):''}: ${(o.files||[]).map(fl=>`<a href="/_blob/${esc(fl.id)}" target="_blank" rel="noopener">${esc(fl.name)}</a>`).join(', ')}</div>`).join('')}</details>`:''}</div>
      <div class="cal-act">${PJ().length&&CANW0&&canEditView('documents')?`<button type="button" class="btn sm" data-stdproj="${esc(x.id)}" title="Copy into a project's Drawings library">${ico('files')}<span>To project</span></button>`:''}
      ${stdCanUp(f)?`<button type="button" class="btn sm" data-stdup="${esc(x.folder)}|${esc(x.id)}">${ico('upload')}<span>New version</span></button>`:''}
      ${canEd?`<button type="button" class="btn sm ghost" data-stddel="${esc(x.id)}" aria-label="Delete">${ico('trash-2')}</button>`:''}</div></div>`;};
  const head=header(label('stdlib'),`${boss?`<button type="button" class="btn" id="stdFolders">${ico('settings')}<span>Folders & access</span></button>`:''}${cur&&stdCanUp(cur)?`<button type="button" class="btn pri" data-stdup="${esc(cur.id)}|">${ico('upload')}<span>Upload to ${esc(cur.name)}</span></button>`:''}`);
  return head+`<div class="note">${ico('archive')}<span>Company standard files for every project. Each folder shows who can see it and who can upload.</span></div>
  <div class="std-w"><div class="box std-tree"><div class="std-s"><input type="search" id="stdQ" placeholder="Search all standard files" value="${esc(STD.q)}" aria-label="Search the Common library"></div>${tree||'<div class="empty">No folders are shared with you yet.</div>'}</div>
  <div class="box">${cur&&!q?`<div class="box-h">${ico('folder')}<h2>${esc(cur.name)}</h2><span class="code">${list.length} file${list.length===1?'':'s'}</span></div>
    <div class="srow"><span class="code">👁 Can see: ${esc(stdAccTxt(cur.view))} · ⬆ Can upload: ${esc(stdAccTxt(cur.up))}</span></div>`:q?`<div class="box-h">${ico('search')}<h2>Search: ${esc(STD.q)}</h2><span class="code">${list.length} found</span></div>`:''}
    ${cur||q?(list.length?list.map(row).join(''):`<div class="empty">${q?'Nothing found.':'No files in this folder yet.'+(stdCanUp(cur)?' Press Upload to add the first one.':'')}</div>`):
      `<div class="empty">Pick a folder on the left${files.length?` — ${files.length} standard file${files.length>1?'s':''} in the library`:''}.</div>`}</div></div>`;}
function stdUpForm(fid,id){const f=stdF(fid),x=id?(D.stdlib||[]).find(r=>r.id===id):null;if(!f)return;
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="stdUpForm" data-f="${esc(fid)}" data-id="${esc(id||'')}"><div class="pane-h"><h2>${x?'New version: '+esc(x.title):'Upload to '+esc(f.name)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:12px">
    <label>Title<input name="title" required maxlength="140" value="${esc(x?x.title:'')}" placeholder="e.g. Isolated footing typical detail"></label>
    <label>Folder<select name="folder">${stdFolders().filter(stdCanUp).map(o=>`<option value="${esc(o.id)}" ${o.id===(x?x.folder:fid)?'selected':''}>${esc((o.parent&&stdF(o.parent)?stdF(o.parent).name+' › ':'')+o.name)}</option>`).join('')}</select></label>
    <label>Version / revision (optional)<input name="rev" maxlength="20" value="${esc(x&&x.rev?'':'')}" placeholder="${x&&x.rev?'was '+esc(x.rev):'e.g. R0, 2026'}"></label>
    <label>Files (DWG, PDF, Excel, Word, images…)<input type="file" name="files" multiple required></label>
    <label>Notes / tags (optional)<input name="notes" maxlength="300" value="${esc(x&&x.notes||'')}"></label>
    <p class="code">Will be visible to: ${esc(stdAccTxt(f.view))}</p>
  </div><div class="pane-f"><button class="btn pri">${ico('upload')}<span>Upload</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;}
function stdFolderForm(){const fs=stdFolders(),ppl=schPeople(),roles=Object.keys(ROLE_VIEWS).filter(r=>r!=='none'&&r!=='Admin');
  const chips=(name,list,i)=>`<div class="std-acc"><label class="qa-ck"><input type="checkbox" data-sa="${i}|${name}|all" ${list.includes('all')?'checked':''}> Everyone in the team</label>
    ${roles.map(r=>`<label class="qa-ck"><input type="checkbox" data-sa="${i}|${name}|${esc(r)}" ${list.includes(r)?'checked':''}> ${esc(r)}</label>`).join('')}
    ${ppl.map(p=>`<label class="qa-ck"><input type="checkbox" data-sa="${i}|${name}|${esc(p.account)}" ${list.includes(p.account)?'checked':''}> 👤 ${esc(p.name)}</label>`).join('')}</div>`;
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="stdFForm"><div class="pane-h"><h2>Common library — folders & access</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:10px"><p class="code">Rename, add or remove folders and choose who can see and who can upload. The admin and project manager always can. Clients see a folder only if you tick “Client”.</p>
  ${fs.map((f,i)=>`<details class="box std-fe" data-i="${i}" data-id="${esc(f.id)}" ${i===0?'open':''}><summary><b>${esc(f.parent?'↳ ':'')}${esc(f.name)}</b> <span class="code">👁 ${esc(stdAccTxt(f.view))} · ⬆ ${esc(stdAccTxt(f.up))}</span></summary>
    <div style="display:grid;gap:8px;padding:10px 0">
      <label>Name<input data-sn="${i}" value="${esc(f.name)}" maxlength="60"></label>
      <label>Inside folder<select data-sp="${i}"><option value="">— top level —</option>${fs.filter(o=>!o.parent&&o.id!==f.id).map(o=>`<option value="${esc(o.id)}" ${f.parent===o.id?'selected':''}>${esc(o.name)}</option>`).join('')}</select></label>
      <b class="code">Who can see</b>${chips('view',f.view||[],i)}
      <b class="code">Who can upload</b>${chips('up',f.up||[],i)}
      <button type="button" class="btn sm danger" data-sfdel="${i}">${ico('trash-2')}<span>Remove folder</span></button></div></details>`).join('')}
  <button type="button" class="btn" id="stdFAdd">${ico('plus')}<span>Add folder</span></button></div>
  <div class="pane-f"><button class="btn pri">${ico('check')}<span>Save</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;}
function stdFolderForm2(open){const save=stdFolders;stdFolders=()=>STD_EDIT;try{stdFolderForm();}finally{stdFolders=save;}
  if(open!==undefined){document.querySelectorAll('.std-fe').forEach(d=>d.open=+d.dataset.i===open);}}
function stdCollect(){const F=document.getElementById('stdFForm');if(!F||!STD_EDIT)return;
  STD_EDIT=STD_EDIT.map((f,i)=>{const n=F.querySelector(`[data-sn="${i}"]`),p=F.querySelector(`[data-sp="${i}"]`);
    const pick=k=>[...F.querySelectorAll(`[data-sa^="${i}|${k}|"]:checked`)].map(c=>c.dataset.sa.split('|').slice(2).join('|'));
    return {...f,name:n?n.value.trim()||f.name:f.name,parent:p?p.value:f.parent,view:pick('view'),up:pick('up')};});}
function stdToProj(x){const pid0=S.proj!=='all'?S.proj:'';
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="stdPjForm" data-id="${esc(x.id)}"><div class="pane-h"><h2>Copy to a project</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:12px"><p class="code">“${esc(x.title)}” goes into the project's Drawings library (the same file — nothing is uploaded again).</p>
    <label>Project<select name="pid" id="stdPj">${PJ().map(p=>`<option value="${esc(p.id)}" ${p.id===pid0?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Library folder<select name="disc" id="stdPjD"></select></label>
    <label>Drawing name<input name="key" maxlength="120" value="${esc(x.title)}"></label></div>
  <div class="pane-f"><button class="btn pri">${ico('files')}<span>Copy</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;stdPjDisc();}
function stdPjDisc(){const p=document.getElementById('stdPj'),d=document.getElementById('stdPjD');if(!p||!d)return;d.innerHTML=dlLib(p.value).map(t=>`<option value="${esc(t.k)}">${esc(t.l||t.k)}</option>`).join('');}
PK.done("library");
