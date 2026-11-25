/* bm-build:8a5d2b979024 */
/* BuildMitr page code: forms */
function accDoc(pid,tid){return D.formAccess.find(a=>a.id===`${pid}__${tid}`)||null;}
function formLevel(pid,tid){
  if(isAdmin()||(S.web&&!S.demo))return 'edit';
  const t=myTeamRec();if(!t)return S.demo?'edit':'';
  const a=accDoc(pid,tid),all=accDoc(pid,'all');
  if((a&&(a.edit||[]).includes(t.id))||(all&&(all.edit||[]).includes(t.id)))return 'edit';
  if((a&&(a.view||[]).includes(t.id))||(all&&(all.view||[]).includes(t.id)))return 'view';
  return '';
}
function projTeam(pid){return D.team.filter(t=>(t.projects||[]).includes('all')||(t.projects||[]).includes(pid)).filter(t=>t.role!=='Admin');}
function autoHead(label,p){
  const L=label.toLowerCase();
  if(/^project( name)?$/.test(L))return p.name||'';
  if(/client|customer/.test(L))return cname(p.client)!=='—'?cname(p.client):'';
  if(/project location|site location/.test(L))return p.address||'';
  if(L==='project id')return p.prefix||'';
  if(/site name/.test(L))return p.name||'';
  if(/^date$|updated as on|bill date/.test(L))return today();
  return '';
}
function vForms(){
  if(S.proj==='all'||!proj(S.proj)){
    const ps=PJ().filter(p=>isAdmin()||allTemplates().some(t=>formLevel(p.id,t.id)));
    return header(label('forms'))+`<div class="note">${ico('lock')}<span>Checklists and sheets are kept per project. Choose a project below, or pick one in the project selector at the top.</span></div>
    ${ps.length?`<div class="cards">${ps.map(p=>`<button class="pcard" data-fproj="${p.id}">${p.prefix?`<span class="code">${esc(p.prefix)}</span>`:''}<h3>${esc(p.name)}</h3><div class="meta"><span>${ico('clipboard-check')}${D.forms.filter(f=>f.project===p.id).length} saved forms</span></div></button>`).join('')}</div>`:`<div class="box hero-empty">${ico('lock')}<h2>No forms shared with you</h2><p>The admin has not given you access to any project's checklists or sheets yet.</p></div>`}`;
  }
  const p=proj(S.proj);
  const tpls=allTemplates();const groups=[...new Set(tpls.map(t=>t.group))];
  const sl=p.loc||(p.maps&&parseLoc(p.maps));
  const vis=tpls.filter(t=>formLevel(p.id,t.id));
  const rowsFor=t=>D.forms.filter(f=>f.project===p.id&&f.tpl===t.id);
  return header(`${esc(label('forms'))} · ${esc(p.name)}`,`<button class="btn" data-fpick="1">${ico('arrow-left')}All projects</button>`)+
  `<div class="note">${ico('lock')}<span><b>Forms & sheets for this project.</b> ${isAdmin()?'Only you see them until you give access — use <b>Access</b> on each form, or <b>Give access to all forms</b>.':'You see only the forms the admin has shared with you.'}</span>${isAdmin()?`<button class="btn sm" data-facc="all">${ico('users')}Give access to all forms</button>`:''}</div>
  ${vis.length?groups.map(g=>{const ts=vis.filter(t=>t.group===g);if(!ts.length)return '';return `<div class="box"><div class="box-h">${ico(g==='Sheets'||g.startsWith('Your')?'table-2':'clipboard-check')}<h2>${esc(g)}</h2><span class="code">${ts.length}</span></div>
    <div class="tbl-wrap"><table><tbody>${ts.map(t=>{const fs=rowsFor(t).sort((a,b)=>(b.upd||0)-(a.upd||0));const lvl=formLevel(p.id,t.id);const a=accDoc(p.id,t.id);
      const who=a?[...new Set([...(a.edit||[]),...(a.view||[])])].map(id=>(D.team.find(x=>x.id===id)||{}).name).filter(Boolean):[];
      return `${t.stage&&t.stage!==(ts[ts.indexOf(t)-1]||{}).stage?`<tr class="lgrp"><td colspan="4">${esc(t.stage)}</td></tr>`:''}<tr><td><b>${t.seq?t.seq+'. ':''}${esc(t.title)}</b>${t.code?`<div class="code">${esc(t.code)}</div>`:''}</td>
        <td>${fs.length?`${fs.length} saved · last ${fmtTs(fs[0].upd)}`:'<span class="code">Not started</span>'}</td>
        <td>${isAdmin()?(who.length?who.map(w=>`<span class="pill p-blue" style="margin:1px">${esc(w)}</span>`).join(' '):'<span class="pill p-grey">Admin only</span>'):`<span class="pill ${lvl==='edit'?'p-green':'p-blue'}">${lvl==='edit'?'Can edit':'View only'}</span>`}</td>
        <td class="acts">${fs.slice(0,S.fall===t.id?99:3).map(f=>`<button class="btn sm" data-fopen="${f.id}">${ico(lvl==='edit'?'pencil':'eye')}${esc((f.title||'Open').slice(0,22))}</button>`).join('')}${fs.length>3&&S.fall!==t.id?`<button class="btn sm ghost" data-fall="${t.id}">+${fs.length-3}</button>`:''}
          ${lvl==='edit'&&CANW?`<button class="btn sm pri" data-fnew="${t.id}">${ico('plus')}New</button>`:''}${isAdmin()?`<button class="btn sm ghost" data-facc="${t.id}">${ico('lock')}Access</button>`:''}</td></tr>`;}).join('')}</tbody></table></div></div>`;}).join('')
  :`<div class="box hero-empty">${ico('lock')}<h2>No forms shared with you</h2><p>The admin has not given you access to this project's checklists and sheets yet.</p></div>`}
  ${isAdmin()?`<div class="box"><div class="box-h">${ico('file-up')}<h2>Add your own Excel format</h2></div><div style="padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center"><span class="code" style="flex:1;min-width:220px">Upload any Excel sheet (for example your Expense Report). Its columns become an editable format available in every project.</span><label class="btn">${ico('upload')}Upload Excel format<input type="file" id="tplUp" accept=".xlsx,.xls,.xlsm,.csv,.ods" hidden></label></div>
    ${D.templates.length?`<div class="tbl-wrap"><table><tbody>${D.templates.map(t=>`<tr><td><b>${esc(t.title)}</b><div class="code">${(t.cols||[]).length} columns</div></td><td class="acts"><button class="btn sm ghost warn" data-tdelx="${t.id}">${S.confirm===t.id?'Tap again':ico('trash-2')}</button></td></tr>`).join('')}</tbody></table></div>`:''}</div>`:''}`;
}
function openAccess(tid){
  const p=proj(S.proj);const t=tid==='all'?{title:'All forms & sheets of this project'}:tplById(tid);const a=accDoc(p.id,tid)||{view:[],edit:[]};
  const team=projTeam(p.id);
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="accForm" data-tid="${esc(tid)}">
    <div class="pane-h"><h2>Access — ${esc(t.title)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><div class="note">${ico('info')}<span>Choose who may open this ${tid==='all'?'project\'s forms':'form'}. <b>View</b> = read and export. <b>Edit</b> = fill in and save. People must be on this project in the Team page. You always have full access.</span></div>
    ${team.length?`<div class="tbl-wrap"><table><thead><tr><th>Person</th><th>Role</th><th>No access</th><th>View</th><th>Edit</th></tr></thead><tbody>${team.map(m=>{const lv=(a.edit||[]).includes(m.id)?'edit':(a.view||[]).includes(m.id)?'view':'';
      return `<tr><td><b>${esc(m.name)}</b>${m.account?'':'<div class="code">not linked to an app account yet</div>'}</td><td>${esc(m.role)}</td>${['','view','edit'].map(v=>`<td><input type="radio" name="acc-${m.id}" value="${v}" ${lv===v?'checked':''} aria-label="${v||'none'}" style="width:auto"></td>`).join('')}</tr>`;}).join('')}</tbody></table></div>`
      :`<div class="empty">No team members are on this project yet. Add them on the Team page and tick this project.</div>`}
    </div><div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri" ${team.length?'':'disabled'}>Save access</button></div></form></div>`;
}
async function saveAccess(form){
  const p=proj(S.proj),tid=form.dataset.tid;const view=[],edit=[];
  projTeam(p.id).forEach(m=>{const r=form.querySelector(`input[name="acc-${m.id}"]:checked`);if(r&&r.value==='view')view.push(m.id);if(r&&r.value==='edit')edit.push(m.id);});
  const ok=await write(()=>db.doc('formAccess/'+`${p.id}__${tid}`).set({project:p.id,tpl:tid,view,edit,by:ME.id,at:Date.now()}),'Access saved');if(ok)audit('access','formAccess',`${p.id}__${tid}`,`${tid==='all'?'All forms':(tplById(tid)||{}).title} — ${view.length} view, ${edit.length} edit`);
  if(ok){closeLayer();render();}
}
async function newForm(tid){
  const p=proj(S.proj),t=tplById(tid);if(!t)return;
  const cnt=D.forms.filter(f=>f.project===p.id&&f.tpl===tid).length+1;
  const head={};(t.type==='check'?(t.head||(t.kind==='qc'?QC_HEAD:QA_HEAD)):(t.head||[])).forEach(h=>head[h]=autoHead(h,p));
  if(t.code)head['Doc. No.']=`${t.code}${p.prefix||'SDB'}/${String(cnt).padStart(3,'0')}`;
  if(t.id==='sh-bill')head['Bill no.']='RA-'+String(cnt).padStart(2,'0');
  const rows=t.type==='sheet'?(t.starter?t.starter.map(a=>{const r={};t.cols.forEach((c,i)=>{if(a[i]!==undefined)r[c.k]=a[i];});return r;}):(t.starterRows||[]).map(r=>({...r}))):[];
  while(t.type==='sheet'&&rows.length<5)rows.push({});
  FORM={project:p.id,tpl:tid,title:t.type==='check'?`${t.title.replace(/^Checklist for |^QC — /,'')} #${cnt}`:`${t.title} ${cnt>1?'#'+cnt:''}`.trim(),head,ans:{},foot:{},rows,gst:t.gst??'',status:'Draft',photos:[],dirty:true};
  S.view='form';render();
}
function openForm2(id){const f=D.forms.find(x=>x.id===id);if(!f)return;FORM=JSON.parse(JSON.stringify(f));FORM.dirty=false;S.proj=f.project;S.view='form';render();}
function itemList(t){let no=0;return t.items.map((s,i)=>s.startsWith('# ')?{sec:s.slice(2)}:s.startsWith('> ')?{note:s.slice(2)}:{key:'i'+i,no:++no,text:s});}
function vForm(){
  if(!FORM)return vForms();
  const t=tplById(FORM.tpl),p=proj(FORM.project);if(!t||!p){S.view='forms';return vForms();}
  const lvl=formLevel(p.id,t.id);if(!lvl){FORM=null;S.view='forms';return vForms();}
  const ro=lvl!=='edit'||!CANW||(FORM.status==='Approved'&&!isAdmin());
  const dis=ro?'disabled':'';
  const headHtml=Object.keys(FORM.head).length?`<div class="box"><div class="fhead">${Object.entries(FORM.head).map(([k,v])=>`<label>${esc(k)}<input data-fh="${esc(k)}" value="${esc(v)}" ${dis} ${/date|as on/i.test(k)&&/^\d{4}-/.test(v)?'type="date"':''}></label>`).join('')}</div></div>`:'';
  let body='';
  if(t.type==='check'){
    const it=itemList(t);const ans=FORM.ans;const done=it.filter(x=>x.key&&ans[x.key]&&ans[x.key].v).length,tot=it.filter(x=>x.key).length;
    const nos=it.filter(x=>x.key&&ans[x.key]&&ans[x.key].v==='NO').length;
    body=`<div class="box tiles"><div class="tile"><b>${done}/${tot}</b><span>Checked</span></div><div class="tile"><b style="color:${nos?'var(--red-ink)':'inherit'}">${nos}</b><span>Marked NO</span></div><div class="tile"><b>${it.filter(x=>x.key&&ans[x.key]&&ans[x.key].v==='NA').length}</b><span>Not applicable</span></div></div>
    <div class="box"><div class="tbl-wrap"><table class="ftab"><thead><tr><th style="width:44px">Sl.</th><th>Description</th><th style="width:190px">YES / NO / NA</th><th style="width:200px">Remarks</th></tr></thead><tbody>
    ${it.map(x=>x.sec?`<tr class="fsec"><td colspan="4">${esc(x.sec)}</td></tr>`:x.note?`<tr><td></td><td colspan="3" class="code">${esc(x.note)}</td></tr>`:
      `<tr class="${ans[x.key]&&ans[x.key].v==='NO'?'fno':''}"><td class="code">${x.no}</td><td>${esc(x.text)}</td><td><div class="seg">${['YES','NO','NA'].map(v=>`<button type="button" class="${ans[x.key]&&ans[x.key].v===v?'on '+v.toLowerCase():''}" data-fans="${x.key}" data-v="${v}" ${dis}>${v}</button>`).join('')}</div></td>
        <td><input data-frem="${x.key}" value="${esc(ans[x.key]&&ans[x.key].r||'')}" placeholder="${ans[x.key]&&ans[x.key].v==='NO'?'Reason / action needed':''}" ${dis}></td></tr>`).join('')}
    </tbody></table></div></div>
    <div class="box"><div class="fhead">${(t.kind==='qc'?QC_FOOT:QA_FOOT).map(([k,ty])=>`<label style="${ty==='area'?'grid-column:1/-1':''}">${esc(k)}${ty==='area'?`<textarea data-ff="${esc(k)}" rows="3" ${dis}>${esc(FORM.foot[k]||'')}</textarea>`:`<input data-ff="${esc(k)}" ${ty==='date'?'type="date"':''} value="${esc(FORM.foot[k]||'')}" ${dis}>`}</label>`).join('')}</div>
    <div style="padding:0 16px 14px;display:grid;gap:6px"><span class="code">Site photos</span><div style="display:flex;gap:6px;flex-wrap:wrap">${(FORM.photos||[]).map(id=>`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="" style="width:64px;height:64px;border-radius:6px;object-fit:cover"></a>`).join('')}${!ro&&A?`<label class="btn sm">${ico('camera')}Add photos<input type="file" accept="image/*" multiple hidden id="fPhotos"></label>`:''}</div></div></div>`;
  }else{
    const cols=t.cols;const rows=FORM.rows;
    const sums={};cols.forEach(c=>{if(c.sum||c.t==='num'||c.t==='calc')sums[c.k]=rows.reduce((s,r)=>s+(c.t==='calc'?c.f(r):n(r[c.k])),0);});
    const sumCols=cols.filter(c=>c.sum);
    let extra='';
    if(t.gst!==undefined){const tot=sums.amt||0,g=n(FORM.gst);extra=`<div class="ftot"><span>Total</span><b>${inr(tot)}</b><span>GST @ <input data-fgst value="${esc(FORM.gst)}" style="width:60px" ${dis}>%</span><b>${inr(tot*g/100)}</b><span>Grand total</span><b>${inr(tot*(1+g/100))}</b></div>`;}
    if(t.balance){const d=sums[t.balance[0]]||0,c=sums[t.balance[1]]||0;extra+=`<div class="ftot"><span>Total debit</span><b>${inr(d)}</b><span>Total credit</span><b>${inr(c)}</b><span class="pill ${Math.abs(d-c)<0.5?'p-green':'p-red'}">${Math.abs(d-c)<0.5?'Balanced':'Difference '+inr(d-c)}</span></div>`;}
    if(t.advance){const adv=n(FORM.head[t.advance]),tot=sums.amt||0;extra+=`<div class="ftot"><span>Total expenses</span><b>${inr(tot)}</b><span>Advance</span><b>${inr(adv)}</b><span>${adv-tot>=0?'Balance to return':'Amount to reimburse'}</span><b>${inr(Math.abs(adv-tot))}</b></div>`;}
    if(t.trial){const tb={};rows.forEach(r=>{if(!r.acct)return;tb[r.acct]=tb[r.acct]||{dr:0,cr:0};tb[r.acct].dr+=n(r.dr);tb[r.acct].cr+=n(r.cr);});
      const ks=Object.keys(tb);extra+=`<div class="box" style="margin:0 16px 14px"><div class="box-h"><h2>Preliminary trial balance</h2></div>${ks.length?`<div class="tbl-wrap"><table><thead><tr><th>Account</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>${ks.map(k=>{const b=tb[k].dr-tb[k].cr;return `<tr><td>${esc(k)}</td><td class="num">${b>0?inr(b):''}</td><td class="num">${b<0?inr(-b):''}</td></tr>`;}).join('')}
        <tr><td><b>Total</b></td><td class="num"><b>${inr(ks.reduce((s,k)=>s+Math.max(0,tb[k].dr-tb[k].cr),0))}</b></td><td class="num"><b>${inr(ks.reduce((s,k)=>s+Math.max(0,tb[k].cr-tb[k].dr),0))}</b></td></tr></tbody></table></div>`:'<div class="empty">Choose an account on each row.</div>'}</div>`;}
    body=`<div class="box"><div class="tbl-wrap"><table class="sheet"><thead><tr><th style="width:34px">#</th>${cols.map(c=>`<th style="min-width:${c.w||100}px" class="${c.t==='num'||c.t==='calc'?'num':''}">${esc(c.l)}</th>`).join('')}${ro?'':'<th></th>'}</tr></thead><tbody>
      ${rows.map((r,i)=>`<tr><td class="code">${i+1}</td>${cols.map(c=>`<td class="${c.t==='num'||c.t==='calc'?'num':''}">${c.t==='calc'?`<span class="calc">${num(c.f(r))}</span>`:c.t==='area'?`<textarea data-fc="${i}:${c.k}" rows="2" ${dis}>${esc(r[c.k]||'')}</textarea>`:c.t==='sel'?`<select data-fc="${i}:${c.k}" ${dis}><option value=""></option>${c.o.map(o=>`<option ${r[c.k]===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`:`<input data-fc="${i}:${c.k}" ${c.t==='date'?'type="date"':c.t==='num'?'inputmode="decimal"':''} value="${esc(r[c.k]??'')}" ${dis}>`}</td>`).join('')}${ro?'':`<td><button type="button" class="btn sm ghost warn" data-frow="${i}" aria-label="Delete row">${ico('x')}</button></td>`}</tr>`).join('')}
      ${sumCols.length?`<tr class="ftotrow"><td></td>${cols.map((c,i)=>`<td class="num">${c.sum?`<b>${inr(sums[c.k])}</b>`:i===0?'<b>Total</b>':''}</td>`).join('')}${ro?'':'<td></td>'}</tr>`:''}
    </tbody></table></div>${ro?'':`<div style="padding:10px 16px;display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn sm" data-faddrow="1">${ico('plus')}Add row</button><button type="button" class="btn sm" data-faddrow="10">${ico('plus')}Add 10 rows</button></div>`}${extra}
    ${t.foot?`<div class="fhead">${t.foot.map(k=>`<label>${esc(k)}<input data-ff="${esc(k)}" value="${esc(FORM.foot[k]||'')}" ${dis}></label>`).join('')}</div>`:''}</div>`;
  }
  const stPill=`<span class="pill ${FORM.status==='Approved'?'p-green':FORM.status==='Submitted'?'p-blue':'p-grey'}">${esc(FORM.status)}</span>`;
  return header(`${esc(t.title)}`,`<button class="btn" data-fback="1">${ico('arrow-left')}Checklists & sheets · ${esc(p.name)}</button>`)+
  `<div class="box"><div class="siteloc"><label style="flex:1;min-width:220px" class="code">Name of this ${t.type==='check'?'checklist':'sheet'}<input data-ftitle value="${esc(FORM.title)}" ${dis}></label><label class="code" style="min-width:200px">Linked activity (for quality gate)<select data-ftask ${dis}><option value="">—</option>${D.tasks.filter(x=>x.project===FORM.project).map(x=>`<option value="${x.id}" ${FORM.task===x.id?'selected':''}>${esc((x.wbs?x.wbs+' ':'')+x.title)}${(x.gates||[]).includes(FORM.tpl)?' ★':''}</option>`).join('')}</select></label>${stPill}${FORM.dirty&&!ro?'<span class="pill p-amber">Unsaved changes</span>':''}
    ${ro?`<span class="pill p-blue">${lvl==='view'?'View only':'Locked (approved)'}</span>`:`<button class="btn" data-fsave="Draft">${ico('check')}Save</button>${t.type==='check'?`<button class="btn" data-fsave="Submitted">${ico('send')}Submit</button>`:''}`}
    ${isAdmin()&&FORM.id&&FORM.status!=='Approved'?`<button class="btn pri" data-fsave="Approved">${ico('check')}Approve</button>`:''}${isAdmin()&&FORM.status==='Approved'?`<button class="btn" data-fsave="Draft">Unlock</button>`:''}
    <button class="btn" data-fxlsx="1">${ico('download')}Excel</button><button class="btn" data-fprint="1">${ico('file-down')}Print copy</button>
    ${isAdmin()&&FORM.id?`<button class="btn ghost warn" data-fdel="1">${S.confirm==='fdel'?'Tap again to delete':ico('trash-2')}</button>`:''}</div></div>${headHtml}${body}`;
}
async function saveFormDoc(status){
  if(S.demo){toast('Exit the demo to save real forms.');return;}
  const t=tplById(FORM.tpl);if(status==='Submitted'&&t.type==='check'){const it=itemList(t).filter(x=>x.key);const miss=it.filter(x=>!(FORM.ans[x.key]&&FORM.ans[x.key].v)).length;if(miss){toast(`${miss} items are not marked yet. Mark YES / NO / NA for every item before submitting.`);return;}
    const noRem=it.filter(x=>FORM.ans[x.key].v==='NO'&&!FORM.ans[x.key].r).length;if(noRem){toast(`Give a remark for the ${noRem} item(s) marked NO.`);return;}}
  const body={project:FORM.project,tpl:FORM.tpl,task:FORM.task||'',title:FORM.title||t.title,head:FORM.head,ans:FORM.ans,foot:FORM.foot,rows:FORM.rows,gst:FORM.gst,photos:FORM.photos||[],status,upd:Date.now(),updBy:ME.id,...(status==='Approved'?{apBy:ME.id,apAt:Date.now()}:{})};
  if(JSON.stringify(body).length>240000){toast('This sheet is too large to save in one piece. Split it into two sheets.');return;}
  const ok=FORM.id?await write(()=>db.doc('forms/'+FORM.id).update(body),status==='Approved'?'Approved':'Saved')
    :await write(async()=>{const r=await db.collection('forms').add({...body,by:ME.id,at:Date.now()});FORM.id=r.id;},'Saved');
  if(ok){FORM.status=status;FORM.dirty=false;audit(status==='Approved'?'approved':status==='Submitted'?'submitted':'saved','forms',FORM.id,FORM.title);render();}
}
async function exportFormXlsx(){
  const t=tplById(FORM.tpl),p=proj(FORM.project);
  try{await loadSheetJS();}catch(e){toast('Excel tool could not load.');return;}
  const aoa=[[t.title],[]];Object.entries(FORM.head).forEach(([k,v])=>aoa.push([k,v]));aoa.push([]);
  let ws;
  if(t.type==='check'){
    aoa.push(['Sl. No.','Description','YES','NO','NA','Remarks']);
    itemList(t).forEach(x=>{if(x.sec)aoa.push(['',x.sec.toUpperCase()]);else if(x.note)aoa.push(['','('+x.note+')']);else{const a=FORM.ans[x.key]||{};aoa.push([x.no,x.text,a.v==='YES'?'✓':'',a.v==='NO'?'✓':'',a.v==='NA'?'✓':'',a.r||'']);}});
    aoa.push([]);(t.kind==='qc'?QC_FOOT:QA_FOOT).forEach(([k])=>aoa.push([k,FORM.foot[k]||'']));
    ws=XLSX.utils.aoa_to_sheet(aoa);ws['!cols']=[{wch:7},{wch:70},{wch:6},{wch:6},{wch:6},{wch:35}];
  }else{
    const start=aoa.length+1;aoa.push(t.cols.map(c=>c.l));
    FORM.rows.forEach(r=>aoa.push(t.cols.map(c=>c.t==='calc'?c.f(r):(c.t==='num'?(r[c.k]===''||r[c.k]==null?'':n(r[c.k])):(r[c.k]||'')))));
    ws=XLSX.utils.aoa_to_sheet(aoa);
    const L=i=>XLSX.utils.encode_col(i);
    FORM.rows.forEach((r,ri)=>{const rr=start+1+ri;t.cols.forEach((c,ci)=>{if(c.t==='calc'&&c.xf){ws[L(ci)+rr]={t:'n',f:c.xf.replace(/\{r\}/g,rr),v:c.f(r)};}});});
    const last=start+FORM.rows.length;const tr=last+1;
    t.cols.forEach((c,ci)=>{if(c.sum){ws[L(ci)+tr]={t:'n',f:`SUM(${L(ci)}${start+1}:${L(ci)}${last})`,v:FORM.rows.reduce((s,r)=>s+(c.t==='calc'?c.f(r):n(r[c.k])),0)};}});
    ws[L(Math.max(0,t.cols.findIndex(c=>c.sum)-1))+tr]={t:'s',v:'Total'};
    if(t.gst!==undefined){const ai=t.cols.findIndex(c=>c.k==='amt');const g=n(FORM.gst);ws[L(ai-1)+(tr+1)]={t:'s',v:`GST @ ${g}%`};ws[L(ai)+(tr+1)]={t:'n',f:`${L(ai)}${tr}*${g}/100`,v:0};ws[L(ai-1)+(tr+2)]={t:'s',v:'Grand total'};ws[L(ai)+(tr+2)]={t:'n',f:`${L(ai)}${tr}+${L(ai)}${tr+1}`,v:0};}
    const rng=XLSX.utils.decode_range(ws['!ref']);rng.e.r=Math.max(rng.e.r,tr+2);ws['!ref']=XLSX.utils.encode_range(rng);
    ws['!cols']=t.cols.map(c=>({wch:Math.round((c.w||100)/7)}));
  }
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
  const buf=XLSX.write(wb,{type:'array',bookType:'xlsx'});
  await saveFile(`${(FORM.title||t.title).replace(/[^\w-]+/g,'-')}-${(p.prefix||p.name).replace(/[^\w-]+/g,'-')}.xlsx`,new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
}
async function printForm(){
  const t=tplById(FORM.tpl),org=D.org.find(o=>o.id==='main')||{};const e=esc;
  let body='';
  if(t.type==='check'){body=`<table><thead><tr><th>Sl.</th><th>Description</th><th>YES</th><th>NO</th><th>NA</th><th>Remarks</th></tr></thead><tbody>${itemList(t).map(x=>x.sec?`<tr><td colspan="6"><b>${e(x.sec)}</b></td></tr>`:x.note?`<tr><td></td><td colspan="5"><i>${e(x.note)}</i></td></tr>`:(()=>{const a=FORM.ans[x.key]||{};return `<tr><td>${x.no}</td><td>${e(x.text)}</td><td class="c">${a.v==='YES'?'✓':''}</td><td class="c">${a.v==='NO'?'✓':''}</td><td class="c">${a.v==='NA'?'✓':''}</td><td>${e(a.r||'')}</td></tr>`;})()).join('')}</tbody></table>
    <table class="ft">${(t.kind==='qc'?QC_FOOT:QA_FOOT).map(([k])=>`<tr><th>${e(k)}</th><td>${e(FORM.foot[k]||'').replace(/\n/g,'<br>')}</td></tr>`).join('')}</table>`;}
  else{body=`<table><thead><tr>${t.cols.map(c=>`<th>${e(c.l)}</th>`).join('')}</tr></thead><tbody>${FORM.rows.filter(r=>Object.values(r).some(v=>String(v).trim())).map(r=>`<tr>${t.cols.map(c=>`<td class="${c.t==='num'||c.t==='calc'?'n':''}">${c.t==='calc'?num(c.f(r)):e(r[c.k]||'')}</td>`).join('')}</tr>`).join('')}
    <tr>${t.cols.map((c,i)=>`<td class="n"><b>${c.sum?inr(FORM.rows.reduce((s,r)=>s+(c.t==='calc'?c.f(r):n(r[c.k])),0)):i===0?'Total':''}</b></td>`).join('')}</tr></tbody></table>
    ${t.foot?`<table class="ft">${t.foot.map(k=>`<tr><th>${e(k)}</th><td>${e(FORM.foot[k]||'')}</td></tr>`).join('')}</table>`:''}`;}
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${e(FORM.title)}</title><style>body{font-family:Segoe UI,Arial,sans-serif;font-size:12px;color:#1a2420;max-width:1000px;margin:24px auto;padding:0 20px}h1{font-size:18px;margin:0}h2{font-size:14px;margin:4px 0 12px;color:#2f6b4f}table{width:100%;border-collapse:collapse;margin:10px 0}th,td{border:1px solid #b9c6c0;padding:5px 7px;vertical-align:top;text-align:left}th{background:#e2efe8}.c{text-align:center;font-weight:700}.n{text-align:right;white-space:nowrap}.ft th{width:30%}.hd td{border:0;padding:2px 6px}</style></head><body>
  <h1>${e(org.name||'')}</h1><h2>${e(t.title)} — ${e(FORM.title)} · Status: ${e(FORM.status)}</h2>
  <table class="hd">${Object.entries(FORM.head).map(([k,v])=>`<tr><td><b>${e(k)}:</b></td><td>${e(v)}</td></tr>`).join('')}</table>${body}
  <p style="color:#5d6c66;font-size:11px">Open this file and press Ctrl+P → Save as PDF to print or share.</p></body></html>`;
  await saveFile(`${(FORM.title||t.title).replace(/[^\w-]+/g,'-')}.html`,new Blob([html],{type:'text/html'}));
}
async function uploadTemplate(file){
  if(S.demo){toast('Exit the demo to add your own formats.');return;}
  try{await loadSheetJS();const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellDates:true});const sh=wb.Sheets[wb.SheetNames[0]];
    const aoa=XLSX.utils.sheet_to_json(sh,{header:1,defval:''});
    const hi=aoa.findIndex(r=>r.filter(v=>String(v).trim()).length>=3);if(hi<0){toast('Could not find a header row with at least 3 columns.');return;}
    const hdr=aoa[hi].map((h,i)=>String(h).trim()||'Column '+(i+1));let last=hdr.length;while(last>0&&/^Column /.test(hdr[last-1]))last--;
    const cols=hdr.slice(0,last).map((l,i)=>{const vals=aoa.slice(hi+1).map(r=>r[i]).filter(v=>String(v).trim()!=='');const numeric=vals.length>0&&vals.filter(v=>!isNaN(parseFloat(v))&&isFinite(v)).length/vals.length>0.8;
      return {k:'c'+i,l,t:numeric?'num':vals.some(v=>v instanceof Date)?'date':String(vals[0]||'').length>40?'area':'text',w:numeric?100:160,sum:numeric&&/amount|total|cost|value|amt/i.test(l)?1:0};});
    const starterRows=aoa.slice(hi+1).filter(r=>r.some(v=>String(v).trim())).slice(0,150).map(r=>{const o={};cols.forEach((c,i)=>{let v=r[i];if(v instanceof Date)v=isoDate(v);if(String(v??'').trim()!=='')o[c.k]=String(v);});return o;});
    const title=(aoa.slice(0,hi).flat().find(v=>String(v).trim())||file.name.replace(/\.[^.]+$/,'')).toString().slice(0,80);
    const ok=await write(()=>db.collection('templates').add({title,cols,starterRows,src:file.name,by:ME.id,at:Date.now()}),`Format "${title}" added to every project`);
    if(ok)render();
  }catch(e){toast('Could not read this Excel file.');}
}
PK.done("forms");
