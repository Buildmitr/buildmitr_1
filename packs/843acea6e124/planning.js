/* bm-build:843acea6e124 */
/* BuildMitr page code: planning */
function setRows(rows,source){
  rows=rows.filter(r=>r&&Object.values(r).some(v=>String(v??'').trim()!==''));
  IMP.rows=rows;IMP.source=source;IMP.cols=[...new Set(rows.flatMap(r=>Object.keys(r)))];IMP.map={};
  {const n=IMP.cols.find(c=>/name|description/i.test(String(c)));if(n)IMP.map.title=n;}
  for(const [k] of IMP_FIELDS){if(IMP.map[k])continue;const c=IMP.cols.find(c=>GUESS[k].test(String(c).trim())&&!Object.values(IMP.map).includes(c));if(c)IMP.map[k]=c;}
  if(!IMP.map.title)IMP.map.title=IMP.cols.find(c=>typeof rows[0][c]==='string'&&isNaN(rows[0][c]))||IMP.cols[0];
  impRender();
}
function parseXml(txt){
  const x=new DOMParser().parseFromString(txt,'application/xml');
  const tasks=[...x.getElementsByTagName('Task')];if(!tasks.length)throw new Error('No tasks found. In MS Project use File → Save As → XML.');
  const g=(t,n)=>{const e=t.getElementsByTagName(n)[0];return e?e.textContent:'';};
  const byUid={};tasks.forEach(t=>byUid[g(t,'UID')]=g(t,'OutlineNumber')||g(t,'Name'));
  return tasks.filter(t=>g(t,'Name')&&g(t,'UID')!=='0').map(t=>({'WBS':g(t,'OutlineNumber')||g(t,'WBS'),'Task Name':g(t,'Name'),'Start':g(t,'Start').slice(0,10),'Finish':g(t,'Finish').slice(0,10),
    '% Complete':g(t,'PercentComplete'),'Summary':g(t,'Summary')==='1'?'Yes':'','Predecessors':[...t.getElementsByTagName('PredecessorLink')].map(l=>byUid[g(l,'PredecessorUID')]).filter(Boolean).join(', ')}));
}
function parseXer(txt){
  const lines=txt.split(/\r?\n/);let tbl='',fields=[];const out=[];
  for(const ln of lines){const c=ln.split('\t');if(c[0]==='%T')tbl=c[1];else if(c[0]==='%F')fields=c.slice(1);else if(c[0]==='%R'&&tbl==='TASK'){const o={};fields.forEach((f,i)=>o[f]=c[i+1]);
    out.push({'Activity ID':o.task_code,'Activity Name':o.task_name,'Start':(o.act_start_date||o.target_start_date||o.early_start_date||'').slice(0,10),'Finish':(o.act_end_date||o.target_end_date||o.early_end_date||'').slice(0,10),'% Complete':o.phys_complete_pct||''});}}
  if(!out.length)throw new Error('No activities (TASK table) found in this XER file.');return out;
}
async function readImportFile(file){
  const ext=(file.name.split('.').pop()||'').toLowerCase();
  try{
    if(ext==='mpp'){toast('.mpp files cannot be read directly. In MS Project: File → Save As → XML (or Excel), then import that file.');return;}
    if(ext==='xml'){setRows(parseXml(await file.text()),'MS Project');return;}
    if(ext==='xer'){setRows(parseXer(await file.text()),'Primavera P6');return;}
    if(['xlsx','xls','xlsm','csv','ods','txt'].includes(ext)){
      toast('Reading file…');await loadSheetJS();
      const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellDates:true});
      const sh=wb.Sheets[wb.SheetNames[0]];
      let rows=XLSX.utils.sheet_to_json(sh,{defval:'',raw:true});
      const aoa=XLSX.utils.sheet_to_json(sh,{header:1,defval:''});
      const hi=aoa.findIndex(r=>r.filter(v=>String(v).trim()).length>=2&&r.some(v=>/task|activity|name|description/i.test(String(v))));
      if(hi>0)rows=XLSX.utils.sheet_to_json(sh,{defval:'',raw:true,range:hi});
      setRows(rows,ext==='csv'?'CSV':'Excel');return;}
    toast('Use an Excel, CSV, MS Project XML or Primavera XER file.');
  }catch(e){toast(e&&e.message?e.message:'Could not read this file.');}
}
function parsePaste(txt){
  const lines=txt.trim().split(/\r?\n/).filter(l=>l.trim());if(lines.length<2){toast('Paste a header row plus at least one activity row.');return;}
  const sep=lines[0].includes('\t')?'\t':',';const head=lines[0].split(sep).map(h=>h.trim());
  setRows(lines.slice(1).map(l=>{const c=l.split(sep);const o={};head.forEach((h,i)=>o[h||'Col '+(i+1)]=(c[i]||'').trim());return o;}),'Pasted');
}
function impBuild(){
  const m=IMP.map,pid=(document.getElementById('imp-proj')||{}).value;
  return IMP.rows.map(r=>{const g=k=>m[k]?r[m[k]]:'';
    if(m.summary&&/^(yes|y|1|true)$/i.test(String(g('summary')).trim()))return null;
    const title=String(g('title')||'').trim();if(!title)return null;
    let start=isoDate(g('start')),due=isoDate(g('due'));
    const dur=parseFloat(String(g('duration')).replace(/[^\d.]/g,''));
    if(start&&!due&&dur){const d=new Date(start+'T00:00');d.setDate(d.getDate()+Math.max(0,Math.round(dur)-1));due=isoDate(d);}
    let pr=parseFloat(String(g('progress')).replace('%',''));if(!isNaN(pr)&&pr>0&&pr<=1&&String(g('progress')).indexOf('%')<0&&IMP.rows.some(x=>parseFloat(x[m.progress])>1)===false)pr=pr*100;
    pr=isNaN(pr)?0:Math.max(0,Math.min(100,Math.round(pr)));
    const res=String(g('resource')||'').trim();const mem=res?D.members.find(x=>nm(x.id).toLowerCase()===res.toLowerCase()):null;
    const SO=MOD.tasks.fields.find(f=>f.k==='status').o,sv=String(g('status')||'').trim(),so=SO.find(o=>o.toLowerCase()===sv.toLowerCase());
    const o={project:pid,title,wbs:String(g('wbs')||'').trim(),start,due,progress:so==='Completed'?100:pr,status:so||(pr>=100?'Completed':pr>0?'In progress':'Not started'),resource:res,who:mem?mem.id:'',pred:String(g('pred')||'').trim(),source:IMP.source};
    const bm=String(g('bmid')||'').trim();if(bm)o.bmid=bm;if(m.notes)o.notes=String(g('notes')||'');return o;
  }).filter(Boolean);
}
function impRender(){
  const body=document.getElementById('impBody');if(!body)return;
  if(!IMP.rows.length){body.innerHTML='';return;}
  const rows=impBuild();const pid=(document.getElementById('imp-proj')||{}).value;
  const exist=TS().filter(t=>t.project===pid);const upd=rows.filter(r=>impMatch(r,exist)).length;const gone=exist.filter(t=>!rows.some(r=>impMatch(r,[t]))).length;
  const noDate=rows.filter(r=>!r.start&&!r.due).length;
  body.innerHTML=`<div class="code"><b>${IMP.rows.length}</b> rows read from ${esc(IMP.source)}. Check which column is which:</div>
  <div class="imp-map">${IMP_FIELDS.map(([k,l])=>`<label>${esc(l)}<select data-impmap="${k}"><option value="">— not in file —</option>${IMP.cols.map(c=>`<option ${IMP.map[k]===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>`).join('')}</div>
  <div class="note">${ico('info')}<span><b>${rows.length}</b> activities will be imported${upd?` · <b>${upd}</b> with the same name already exist and will be <b>updated</b>`:''}${noDate?` · ${noDate} have no dates and won't show on the timeline`:''}.</span></div>
  ${gone?`<label class="pl-chk"><input type="checkbox" id="imp-del" ${IMP.del?'checked':''}> Delete the ${gone} activit${gone>1?'ies':'y'} of this project that ${gone>1?'are':'is'} not in the file (use when you deleted rows in Excel)</label>`:''}
  <div class="tbl-wrap" style="max-height:260px;border:1px solid var(--line);border-radius:8px"><table><thead><tr><th>WBS</th><th>Activity</th><th>Start</th><th>Finish</th><th class="num">%</th><th>Resource</th></tr></thead><tbody>
  ${rows.slice(0,60).map(r=>`<tr><td class="code">${esc(r.wbs)}</td><td>${esc(r.title)}</td><td>${fd(r.start)}</td><td>${fd(r.due)}</td><td class="num">${r.progress}</td><td>${esc(r.resource)}</td></tr>`).join('')}
  ${rows.length>60?`<tr><td colspan="6" class="code">…and ${rows.length-60} more</td></tr>`:''}</tbody></table></div>`;
  const b=document.getElementById('impGo');if(b){b.disabled=!rows.length||!pid;b.textContent=rows.length?`Import ${rows.length} activities`:'Import';}
}
function openImport(){
  if(!D.projects.length){toast('Create a project first.');S.view='projects';render();return;}
  IMP.rows=[];IMP.cols=[];IMP.map={};
  const pid=S.proj!=='all'?S.proj:'';
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="impForm" style="width:min(720px,100%)">
    <div class="pane-h"><h2>Import work schedule</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b">
      <label class="req">Project<select id="imp-proj" required><option value="">— choose —</option>${PJ().map(p=>`<option value="${p.id}" ${p.id===pid?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
      <label class="drop-imp" for="imp-file">${ico('file-up')}<span><b>Choose a file</b> — Excel (.xlsx, .xls), CSV, MS Project XML (.xml) or Primavera (.xer)</span><input id="imp-file" type="file" accept=".xlsx,.xls,.xlsm,.csv,.ods,.xml,.xer,.mpp,.txt" hidden></label>
      <details><summary class="code" style="cursor:pointer">Or paste rows copied from Excel / Google Sheets</summary><textarea id="imp-paste" rows="5" placeholder="Task Name&#9;Start&#9;Finish&#9;% Complete&#10;Footing excavation&#9;01-12-2026&#9;05-12-2026&#9;0"></textarea><button type="button" class="btn sm" id="impPasteGo">Read pasted rows</button></details>
      <div class="code">From <b>MS Project</b>: File → Save As → XML (or Excel). From <b>Primavera P6</b>: Export → XER, or Excel. From <b>Google Sheets / Smartsheet</b>: download as Excel or CSV. <button type="button" class="btn sm ghost" id="impTpl">${ico('download')}Download blank template</button></div>
      <div id="impBody" style="display:grid;gap:10px"></div>
    </div>
    <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri" id="impGo" disabled>Import</button></div></form></div>`;
}
function impMatch(r,list){return (r.bmid&&list.find(t=>t.id===r.bmid))||(r.wbs&&list.find(t=>String(t.wbs||'')===r.wbs&&t.title.trim().toLowerCase()===r.title.toLowerCase()))||list.find(t=>t.title.trim().toLowerCase()===r.title.toLowerCase());}
async function runImport(){
  if(S.demo){toast('Exit the demo to import into your real projects.');return;}
  const rows=impBuild();const pid=(document.getElementById('imp-proj')||{}).value;if(!rows.length||!pid)return;
  const btn=document.getElementById('impGo');btn.disabled=true;btn.textContent='Importing…';
  const exist=TS().filter(t=>t.project===pid),used=new Set(),now=Date.now(),list=[];let added=0,updated=0;
  const nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  for(const r0 of rows){const {bmid,...r}=r0;const ex=impMatch(r0,exist.filter(t=>!used.has(t.id)));
    if(ex){used.add(ex.id);list.push([TC(),ex.id,{...recOf(ex),wbs:r.wbs||ex.wbs||'',title:r.title,start:r.start||ex.start||'',due:r.due||ex.due||'',progress:r.progress,status:r.status,pred:r.pred,resource:r.resource||ex.resource||'',...(r.notes!==undefined?{notes:r.notes}:{}),source:ex.source||r.source,upd:now}]);updated++;}
    else{list.push([TC(),nid(),{...r,by:ME.id,at:now}]);added++;}}
  const del=IMP.del&&document.getElementById('imp-del')&&document.getElementById('imp-del').checked?exist.filter(t=>!used.has(t.id)):[];
  const ok=await write(async()=>{for(let k=0;k<list.length;k+=60)await dbBatch(list.slice(k,k+60));for(const t of del)await db.doc(TC()+'/'+t.id).delete();});
  IMP.del=false;closeLayer();S.proj=pid;S.view=S.view==='designsched'?'designsched':'schedule';render();if(ok)toast(`Uploaded: ${added} new, ${updated} updated${del.length?`, ${del.length} deleted`:''}`);
}
async function schedExport(){
  try{await loadSheetJS();}catch(_){toast('Could not load the Excel tool — check the internet.');return;}
  const ts=TS().filter(t=>inProj(t)).sort((a,b)=>schWbsKey(a.wbs).localeCompare(schWbsKey(b.wbs))||String(a.start||'').localeCompare(String(b.start||'')));
  const dt=v=>v?new Date(v+'T00:00'):'';const all=S.proj==='all';
  const head=['WBS / No.','Activity',...(all?['Project']:[]),'Start','Finish','Days','Progress %','Status','Predecessors','Resource','Notes','BuildMitr ID'];
  const aoa=[head,...ts.map(t=>[t.wbs||'',t.title||'',...(all?[pname(t.project)]:[]),dt(t.start),dt(t.due),t.start&&t.due?dDiff(t.due,t.start)+1:'',t.status==='Completed'?100:(+t.progress||0),t.status||'Not started',t.pred||'',t.resource||'',t.notes||'',t.id])];
  const ws=XLSX.utils.aoa_to_sheet(aoa,{cellDates:true,dateNF:'dd-mmm-yyyy'});
  ws['!cols']=[{wch:9},{wch:46},...(all?[{wch:22}]:[]),{wch:13},{wch:13},{wch:6},{wch:10},{wch:13},{wch:14},{wch:22},{wch:30},{wch:24}];ws['!autofilter']={ref:ws['!ref']};
  const rm=XLSX.utils.aoa_to_sheet([['How to edit this schedule'],[''],['1. Change numbers, names, dates, progress or status in the Schedule sheet.'],['2. Add new rows at the bottom (leave BuildMitr ID empty). Delete rows you do not need.'],['3. In BuildMitr: Activity schedule → Upload Excel → choose this file.'],['4. Rows are matched by the BuildMitr ID column, so renamed activities update instead of duplicating.'],['5. To remove deleted rows from BuildMitr too, tick "Delete the activities … not in the file" before uploading.'],['Status can be: '+MOD.tasks.fields.find(f=>f.k==='status').o.join(', ')]]);rm['!cols']=[{wch:100}];
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Schedule');XLSX.utils.book_append_sheet(wb,rm,'Read me');
  const nmF=(all?'All projects':pname(S.proj)).replace(/[\\/:*?"<>|]+/g,' ').replace(/\s*[·•]\s*/g,' - ').replace(/[^\x20-\x7e]/g,'').replace(/\s+/g,' ').trim()||'Project';await saveFile(`${nmF} - activity schedule ${today()}.xlsx`,new Blob([XLSX.write(wb,{bookType:'xlsx',type:'array'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));toast('Excel downloaded — edit it and use Upload Excel to bring it back');
}
function schSave(wb,fn){const out=XLSX.write(wb,{bookType:'xlsx',type:'array'});const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([out],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));a.download=fn;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);}
function makeSchedule(floorNames,start,months,lift){
  const A=[];let id=0;const add=(wbs,title,res,dur,after,lag)=>{const s=Math.max(0,...(after||[]).map(a=>A[a].s+A[a].d+(lag||0)));A.push({i:id++,wbs,title,res,s,d:dur,pred:(after||[]).map(a=>A[a].wbs).join(', ')});return A.length-1;};
  const F=floorNames.length||1,fn=floorNames.length?floorNames:['Ground floor'];
  const mob=add('1.1','Mobilisation, site clearing & setting out','Civil gang',4,[]);
  const exc=add('2.1','Excavation for footings','Excavator + civil gang',6,[mob]);
  const ftg=add('2.2','PCC & RCC footings','Structure contractor',10,[exc]);
  const plb=add('2.3','Columns to plinth, plinth beams & back-filling','Structure contractor',8,[ftg]);
  let prev=plb;const slab=[],cure=[];
  fn.forEach((f,i)=>{const col=add(`3.${i*2+1}`,`Columns — ${f}`,'Structure contractor',6,[prev],i?7:0);   // next floor columns 7 days after casting
    const sl=add(`3.${i*2+2}`,`Beams & roof slab — ${f}`,'Structure contractor',10,[col]);slab.push(sl);prev=sl;});
  const head=add(`3.${F*2+1}`,'Headroom, parapet & terrace works','Structure contractor',8,[prev],7);
  const bw=[],cd=[],ip=[],fl=[];
  fn.forEach((f,i)=>{const b=add(`4.${i*3+1}`,`Block-work — ${f}`,'Masonry gang',10,[slab[i]],14);bw.push(b);   // after de-shuttering
    const c=add(`4.${i*3+2}`,`Electrical & plumbing conduits, chasing — ${f}`,'Electrician + plumber',6,[b]);cd.push(c);
    const p=add(`4.${i*3+3}`,`Internal plastering — ${f}`,'Plastering gang',10,[c]);ip.push(p);});
  const frames=add('4.'+(F*3+1),'Door & window frames, lintels','Carpenter',5,[bw[0]],3);
  const ext=add('5.1','External plastering','Plastering gang',18,[head,bw[F-1]]);
  const wp=add('5.2','Terrace waterproofing & screed','Waterproofing contractor',6,[head],7);
  let k=3;
  fn.forEach((f,i)=>{const tw=add(`5.${k++}`,`Toilet & balcony sunken waterproofing — ${f}`,'Waterproofing contractor',3,[ip[i]]);
    fl.push(add(`5.${k++}`,`Flooring, skirting & toilet tiling — ${f}`,'Tiling gang',10,[tw]));});const gr=add(`5.${k++}`,'Staircase granite, sills & kitchen platform','Granite contractor',8,[fl[F-1]],-4);
  const lf=lift?add(`5.${k++}`,'Lift installation & commissioning','Lift vendor',25,[head],10):null;
  const dw=add(`5.${k++}`,'Door shutters, windows & glass','Carpenter / window vendor',8,[fl[F-1]]);
  const rl=add(`5.${k++}`,'Staircase & balcony railing','Fabricator',6,[gr]);
  const pp=add(`5.${k++}`,'Painting — putty, primer & first coat','Painter',14,[ext,ip[F-1]]);
  const fx=add(`5.${k++}`,'Electrical fixtures, CP & sanitary fittings','Electrician + plumber',8,[fl[F-1],pp]);
  const fp=add(`5.${k++}`,'Final painting coat','Painter',8,[fx,dw,rl]);
  const ho=add('6.1','Cleaning, snag list & handover','Site engineer',5,[fp,wp,...(lf!==null?[lf]:[])]);
  const end0=Math.max(...A.map(a=>a.s+a.d)),target=Math.max(30,Math.round((+months||6)*30.4)),f=target/end0;
  const rows=A.map(a=>({...a,start:addDays(start,Math.round(a.s*f)),due:addDays(start,Math.max(Math.round(a.s*f)+1,Math.round((a.s+a.d)*f))-1)}));
  return {rows,keys:{mob,ftg,plb,slab,bw,ip,ext,fl,fx,ho},end:addDays(start,target)};
}
function scheduleRecords(pid,floorNames,start,months,lift){
  const S_=makeSchedule(floorNames,start,months,lift),nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  const ids=S_.rows.map(()=>nid()),now=Date.now(),recs=[];
  S_.rows.forEach((r,i)=>recs.push(['tasks',ids[i],{project:pid,wbs:r.wbs,title:r.title,resource:r.res,start:r.start,due:r.due,progress:0,status:'Not started',pred:r.pred,source:'BuildMitr schedule ('+months+' months)',by:ME.id,at:now}]));
  const K=S_.keys,fl=floorNames.length||1,se=+(30/fl).toFixed(1);
  const ms=[['Booking / agreement',5,null,start],['Foundation & footings',10,K.ftg],['Plinth beam',5,K.plb],...K.slab.map((s,i)=>[`${floorNames[i]||'Floor'} roof slab`,se,s]),
    ['Brickwork / blockwork',10,K.bw[K.bw.length-1]],['Plastering',10,K.ext],['Flooring & tiling',10,K.fl[K.fl.length-1]],['Doors, windows, electrical & plumbing',10,K.fx],['Painting & handover',10,K.ho]];
  ms.forEach(([st,p,ti,due])=>recs.push(['milestones',nid(),{project:pid,stage:st,pct:p,...(ti!==null&&ti!==undefined?{task:ids[ti]}:{due}),by:ME.id,at:now}]));
  return {recs,end:S_.end,n:S_.rows.length};
}
async function e2MakeProject(){
  const c=e2Calc(),v=c.v;if(!v.B){toast('Enter the slab areas first.');return;}
  const start=(document.getElementById('e2-start')||{}).value||today(),months=+((document.getElementById('e2-months')||{}).value||6);
  const nm=(E2.name||'New project').trim(),lead=D.leads.find(x=>x.id===E2.lead);
  const btn=document.getElementById('e2Proj');if(btn){btn.disabled=true;btn.textContent='Creating…';}
  const nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  const recs=[],now=Date.now();
  let client=lead?(D.clients.find(x=>x.phone&&lead.phone&&waNum(x.phone)===waNum(lead.phone))||{}).id:'';
  const cname=nm.split(/[—–-]/)[0].trim();
  if(!client){const ex=D.clients.find(x=>(x.name||'').toLowerCase()===cname.toLowerCase());client=ex?ex.id:nid();if(!ex)recs.push(['clients',client,{name:cname,phone:lead?lead.phone:'',address:lead?lead.place||'':'',by:ME.id,at:now}]);}
  const pid=nid(),floors=E2.floors.filter(f=>n(f.a)).map(f=>f.n);
  const sch=scheduleRecords(pid,floors,start,months,v.L>0);
  const prefix=(nm.match(/[A-Za-z]+/g)||['PRJ']).filter(w=>!/^(mr|mrs|ms|dr)$/i.test(w)).map(w=>w[0]).join('').toUpperCase().slice(0,4)||'PRJ';
  recs.unshift(['projects',pid,{prefix,name:nm,client,description:`${E2.tier} specification · ${v.F} floors · ${num(v.R)} rooms · ${num(v.T)} toilets${v.L?' · lift':''}. From the estimate of ${fd(today())}.`,
    start,end:sch.end,value:Math.round(c.sub),area:Math.round(v.B),created:now,by:ME.id,
    estimate:{tier:E2.tier,bua:Math.round(v.B),sub:Math.round(c.sub),gst:Math.round(c.gst),total:Math.round(c.total),date:today(),floors:E2.floors.filter(f=>n(f.a)),heads:c.heads.map(h=>({sec:h.sec,hd:h.hd,amt:Math.round(h.amt)}))}}]);
  c.heads.filter(h=>h.amt).forEach(h=>recs.push(['budget',nid(),{project:pid,cat:E2_CAT[h.hd]||'Material',amount:Math.round(h.amt*(1+(c.overP+c.contP)/100)),notes:`${h.sec} · ${h.hd} (incl. overheads & contingency)`,by:ME.id,at:now}]));
  recs.push(...sch.recs);
  const ok=await write(()=>dbBatch(recs),`Project created: ${sch.n} activities, ${months}-month schedule`);
  if(btn){btn.disabled=false;}
  if(ok)setTimeout(()=>{S.proj=pid;try{localStorage.setItem('bm-proj',pid);}catch(_){}S.view='schedule';render();scrollTo(0,0);},300);   // after the new project has reached the lists
}
function schedDialog(){
  const p=proj(S.proj);if(!p){toast('Choose a project first (top of the page).');return;}
  const has=D.tasks.filter(t=>t.project===p.id).length,est=p.estimate||{};
  const fl=(est.floors||[]).map(f=>f.n).join(', ')||'Ground floor, First floor';
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="schedForm">
    <div class="pane-h"><h2>Generate work schedule</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><p class="code">For <b data-notr>${esc(pname(p.id))}</b>. Activities floor by floor — footings, each slab, block-work, plastering, waterproofing, flooring, joinery, painting, fittings and handover — fitted into the time you choose. Payment stages are linked to the activities.</p>
      ${has?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('info')}<span>This project already has ${has} activities. The new schedule is added next to them.</span></div>`:''}
      <label class="req">Start date<input name="start" type="date" value="${esc(p.start||today())}" required></label>
      <label class="req">Complete in (months)<input name="months" type="number" min="1" max="60" step="0.5" value="6" required></label>
      <label class="req">Floors / slabs (comma separated, bottom to top)<input name="floors" value="${esc(fl)}" required></label>
      <label style="display:flex;gap:8px;align-items:center"><input name="lift" type="checkbox" style="width:auto" ${(est.heads||[]).some(h=>h.hd==='Lift'&&h.amt)?'checked':''}>Building has a lift</label></div>
    <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">${ico('gantt-chart')}<span>Make schedule</span></button></div></form></div>`;
}
async function schedMake(f){
  const p=proj(S.proj);if(!p)return;const g=k=>(f.elements[k]||{}).value;
  const floors=g('floors').split(',').map(x=>x.trim()).filter(Boolean),months=+g('months');
  const sch=scheduleRecords(p.id,floors,g('start'),months,f.elements.lift.checked);
  const ok=await write(async()=>{await dbBatch(sch.recs);await db.doc('projects/'+p.id).update({start:g('start'),end:sch.end});},`${sch.n} activities scheduled over ${months} months`);
  if(ok){closeLayer();render();}
}
function plSetType(t){PL.ptype=t;Object.entries(PT_SCOPE[t]||{}).forEach(([k,v])=>PL.scope[k]=!!v);(PT_C[t]||[]).forEach(x=>{if(PL.scope[x[0]]===undefined)PL.scope[x[0]]=true;});}
function plStdApply(){if(PL._std)return;const o=plStd();if(o.scope)Object.assign(PL.scope,o.scope);PL._std=1;}
function vPlanner(){
  plStdApply();
  if(!isAdmin())return header('Schedule planner')+`<div class="box hero-empty">${ico('shield')}<h2>Only the admin or project manager can plan schedules</h2></div>`;
  const c=plCalc(),L=esc,cities=plCities();
  const inp=(k,v,ph,w)=>`<input data-pl="${k}" value="${esc(v)}" placeholder="${esc(ph||'')}" ${w?`style="width:${w}"`:''} inputmode="decimal">`;
  const left=`<div class="box"><div class="box-h"><h2>Project & time</h2></div><div class="fhead">
    <label>Type of project<select id="pl-type">${PTYPES.map(t=>`<option ${PL.ptype===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label>
    <label>Project<select id="pl-pid"><option value="">— choose to save later —</option>${PJ().map(p=>`<option value="${p.id}" ${PL.pid===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Start date<input id="pl-start" type="date" value="${esc(PL.start||today())}"></label>
    <label>Complete in (months)<input data-pl="months" value="${esc(PL.months)}" placeholder="blank = normal pace" inputmode="decimal"></label>
    <label>Location (season)<select id="pl-city">${cities.map((x,i)=>`<option value="${i}" ${+PL.city===i?'selected':''}>${esc(x)}</option>`).join('')}</select></label></div>
    <div class="srow"><label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pl-sun" ${PL.sun?'checked':''} style="width:auto">Sundays off</label>
      <button type="button" class="linkish" id="plHolBtn">${PL.showHol?'Hide':'Edit'} holidays (${Object.keys(c.hol||plHolidays()).length})</button></div>
    ${PL.showHol?`<div style="padding:0 16px 12px"><textarea id="pl-hol" rows="8" style="width:100%;font-family:var(--f-mono,monospace);font-size:12.5px">${esc(PL.hol||PL_HOL_DEFAULT)}</textarea><div class="code">One per line: YYYY-MM-DD Name. Dates are tentative — check the official list.</div></div>`:''}
    <div class="box-h"><h2>Floors & area</h2><span class="code">Slab area of each floor (sq.ft)</span></div>
    <div class="tbl-wrap"><table><tbody>${PL.floors.map((f,i)=>`<tr><td><input data-plf="${i}" value="${esc(f.n)}" style="width:100%"></td><td style="width:120px">${inp('fa'+i,f.a,'sq.ft','110px')}</td><td style="width:44px">${PL.floors.length>1?`<button type="button" class="btn sm ghost" data-pldel="${i}" aria-label="Remove floor">${ico('x')}</button>`:''}</td></tr>`).join('')}</tbody></table></div>
    <div class="srow"><button type="button" class="btn sm" id="plAdd">${ico('plus')}<span>Add floor</span></button></div>
    <div class="fhead"><label>Rooms${inp('rooms',PL.rooms,'nos')}</label><label>Toilets${inp('toilets',PL.toilets,'nos')}</label><label>Kitchens${inp('kitchens',PL.kitchens,'nos')}</label><label>Lifts${inp('lifts',PL.lifts,'nos')}</label></div>
    <div class="box-h"><h2>Scope of works</h2><span class="code">Tick what this project includes</span></div>
    ${(PT_C[PL.ptype]||[]).length?`<div class="pl-scope"><div><div class="code" style="margin-bottom:6px"><b>${esc(PL.ptype.toUpperCase())} WORKS</b></div>${PT_C[PL.ptype].map(([k,l])=>`<label class="pl-chk"><input type="checkbox" data-plsc="${k}" ${PL.scope[k]!==false?'checked':''}>${L(l)}</label>`).join('')}</div></div>`:''}
    <div class="pl-scope">${['Civil','Interiors'].map(g=>`<div><div class="code" style="margin-bottom:6px"><b>${g.toUpperCase()}</b></div>${PL_SCOPE.filter(x=>x[2]===g).map(([k,l])=>`<label class="pl-chk"><input type="checkbox" data-plsc="${k}" ${PL.scope[k]?'checked':''} ${k==='struct'?'disabled':''}>${L(l)}</label>`).join('')}
      ${plCus().filter(x=>x.grp===g).map(x=>`<div class="pl-chk"><input type="checkbox" data-plsc="${x.key}" ${PL.scope[x.key]!==false?'checked':''} aria-label="Include"><span style="flex:1">${L(x.title)} <span class="pill p-blue">added</span><span class="code"> ${x.wd} days</span></span><button type="button" class="btn sm ghost" data-plcdel="${x.key}" title="Delete this item" aria-label="Delete ${L(x.title)}">${ico('x')}</button></div>`).join('')}</div>`).join('')}</div>
    ${CANW?`<div class="box-h"><h2>Add your own item</h2><span class="code">Untick any item above to remove it</span></div>
    <form id="plItemForm" class="e2form">
      <label class="wide">Activity<input name="title" required placeholder="e.g. Borewell, rainwater pit, home automation"></label>
      <label>Group<select name="grp"><option>Civil</option><option>Interiors</option></select></label>
      <label>Working days<input name="wd" required inputmode="numeric" placeholder="e.g. 5"></label>
      <label class="wide">Start after<select name="after"><option value="start">Project start</option>${(c.N?c.N.acts:[]).filter(a=>a.key!=='clean').map(a=>`<option value="${a.key}">${L(a.title)}</option>`).join('')}</select></label>
      <label class="pl-chk" style="align-self:center"><input type="checkbox" name="wet">Outdoor (affected by rain)</label>
      <button class="btn pri">${ico('plus')}<span>Add</span></button></form>`:''}
    ${isAdmin()?`<div class="srow"><button type="button" class="btn sm" id="plStdSave">${ico('check')}<span>Save this list as company standard</span></button>${PL.custom||plStd().scope?`<button type="button" class="btn sm ghost" id="plStdOrig">Back to BuildMitr default list</button>`:''}</div>`:''}</div>`;
  const on=c.rows.filter(r=>!r.off),wdTot=c.end?Math.round((dOf(c.end)-dOf(c.start))/864e5)+1:0;
  const sumry=`<div class="box"><div class="box-h"><h2>Timeline</h2>${c.end?`<span class="code">${fd(c.start)} → ${fd(c.end)}</span>`:''}</div>
    ${on.length?`<div class="tiles"><div class="tile"><b>${(wdTot/30.4).toFixed(1)}</b><span>Months</span></div><div class="tile"><b>${on.length}</b><span>Activities</span></div>
      <div class="tile"><b>${c.hs.length}</b><span>Holidays inside</span></div><div class="tile"><b style="color:${c.feasible?'inherit':'var(--red-ink)'}">${PL.months?(c.feasible?'Fits':'Too short'):'Normal pace'}</b><span>${PL.months?`Target ${PL.months} months`:`Normal finish ${fd(c.natEnd)}`}</span></div></div>
    ${c.warn.length?`<div class="pl-warn">${c.warn.map(([sv,t])=>`<div class="pl-w ${sv}">${ico(sv==='high'?'alert-triangle':'info')}<span>${L(t)}</span></div>`).join('')}</div>`:`<div class="note">${ico('check')}<span>No season or time problems found.</span></div>`}
    <div class="srow">${CANW?`<button class="btn pri" id="plSave" ${PL.pid?'':'disabled'}>${ico('check')}<span>${PL.pid&&plTasks(PL.pid).length?'Update activity schedule':'Save to project'}</span></button>`:''}<label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pl-ms" ${PL.ms!==false?'checked':''} style="width:auto">Add payment stages linked to activities</label>
      <button class="btn" id="plShare">${ico('share-2')}<span>Share</span></button>${PL.pid?'':'<span class="code">Choose a project to save.</span>'}</div>${PL.pid&&plTasks(PL.pid).length?`<div class="code" style="padding:0 16px 12px">${esc(pname(PL.pid))} already has ${plTasks(PL.pid).length} activities from the planner. <b>Update activity schedule</b> changes them to match this plan — dates and titles follow the planner, unticked steps are removed (unless work has started), new steps are added. Progress, status, comments and photos stay; completed activities keep their dates. Activities you added by hand are not touched.</div>`:''}`:`<div class="empty">Enter the slab area of each floor to see the schedule.</div>`}</div>`;
  const table=on.length||c.rows.length?`<div class="box"><div class="box-h"><h2>Activities</h2><span class="code">Days = working days · ☂ = monsoon extra · change anything; blank = automatic ${Object.keys(PL.ed).length?`<button type="button" class="linkish" id="plUndo">Undo my changes</button>`:''}</span></div>
    <div class="tbl-wrap"><table class="pl-tbl"><thead><tr><th></th><th>Activity</th><th class="num">Days</th><th>Fixed start</th><th>Start</th><th>Finish</th><th>Comment</th></tr></thead><tbody>
    ${c.rows.map(r=>{const e=PL.ed[r.key]||{};return `<tr class="${r.off?'pl-off':''}"><td><input type="checkbox" data-plon="${r.key}" ${r.off?'':'checked'} aria-label="Include"></td>
      <td><input data-plt="${r.key}" value="${esc(e.t||r.title)}" style="min-width:230px;width:100%">${r.res?`<div class="code">${L(r.res)}</div>`:''}</td>
      <td class="num"><input data-pld="${r.key}" value="${esc(e.d!==undefined?e.d:'')}" placeholder="${r.off?r.wd:r.days}" inputmode="numeric" style="width:64px;text-align:right">${!r.off&&r.f>1?` <span title="Monsoon extra time" class="pill p-blue">☂ +${Math.round((r.f-1)*100)}%</span>`:''}</td>
      <td><input type="date" data-plfix="${r.key}" value="${esc(e.fix||'')}" style="width:140px"></td>
      <td class="code">${r.off?'—':fd(r.start)}</td><td class="code">${r.off?'—':fd(r.due)}</td>
      <td><input data-plc="${r.key}" value="${esc(e.c||'')}" placeholder="Add a comment" style="min-width:160px;width:100%"></td></tr>`;}).join('')}
    </tbody></table></div></div>`:'';
  return header('Schedule planner')+`<div class="grid2">${left}${sumry}</div>`+(on.length?plGantt(c)+plMonths(c):'')+table;
}
function plGantt(c){
  const on=c.rows.filter(r=>!r.off),day=s=>dOf(s).getTime()/864e5,min=day(c.start)-2,max=day(c.end)+3,span=max-min,pos=d=>((d-min)/span*100).toFixed(2)+'%';
  const bands=[];const d0=dOf(c.start);d0.setDate(1);for(let d=new Date(d0);day(isoD(d))<=max;d.setMonth(d.getMonth()+1)){const f=c.rain[d.getMonth()];if(f>1){const a=Math.max(min,day(isoD(d))),e=new Date(d);e.setMonth(e.getMonth()+1);const b=Math.min(max,day(isoD(e)));bands.push(`<span class="pl-rain ${f>=1.3?'hv':''}" style="left:${pos(a)};width:${((b-a)/span*100).toFixed(2)}%"></span>`);}}
  const ticks=[];for(let d=new Date(d0);day(isoD(d))<=max;d.setMonth(d.getMonth()+1)){const v=day(isoD(d));if(v>=min)ticks.push(`<span class="g-tick" style="left:${pos(v)}">${d.toLocaleDateString(LOC(),{month:'short',year:'2-digit'})}</span>`);}
  const hl=c.hs.map(([d,nm_])=>`<span class="pl-hol" style="left:${pos(day(d))}" title="${esc(fd(d)+' '+nm_)}"></span>`).join('');
  return `<div class="box"><div class="box-h"><h2>Calendar view</h2><span class="code"><span class="pl-key rain"></span> monsoon <span class="pl-key hv"></span> heavy monsoon <span class="pl-key hol"></span> holiday</span></div><div class="tbl-wrap"><div class="gantt">
    <div class="g-row g-head"><div class="g-lab"></div><div class="g-track">${bands.join('')}${ticks.join('')}</div></div>
    ${on.map(r=>`<div class="g-row"><div class="g-lab"><b>${esc(r.title)}${r.comment?' 💬':''}</b><span>${fd(r.start)} → ${fd(r.due)} · ${r.days} days</span></div><div class="g-track">${bands.join('')}${hl}<div class="g-bar ${r.f>1?'pl-wet':''}" style="left:${pos(day(r.start))};width:${Math.max(.8,(day(r.due)-day(r.start)+1)/span*100).toFixed(2)}%" title="${esc(r.title)}"></div></div></div>`).join('')}
  </div></div></div>`;
}
function plMonths(c){
  const on=c.rows.filter(r=>!r.off),out=[];const d=dOf(c.start);d.setDate(1);
  while(isoD(d)<=c.end){const a=isoD(d),e=new Date(d);e.setMonth(e.getMonth()+1);e.setDate(0);const b=isoD(e);
    const acts=on.filter(r=>r.start<=b&&r.due>=a),hs=c.hs.filter(([x])=>x>=a&&x<=b),f=c.rain[d.getMonth()]||1;
    out.push(`<div class="pl-mon"><div class="pl-mh"><b>${d.toLocaleDateString(LOC(),{month:'long',year:'numeric'})}</b>${f>1?`<span class="pill ${f>=1.3?'p-red':'p-amber'}">☂ ${f>=1.3?'heavy':'moderate'} monsoon</span>`:''}${PL_HOT.includes(d.getMonth())?'<span class="pill p-amber">hot</span>':''}</div>
      ${hs.length?`<div class="code">Holidays: ${hs.map(([x,nm_])=>esc(`${dOf(x).getDate()} ${nm_}`)).join(', ')}</div>`:''}
      <ul>${acts.map(r=>`<li>${esc(r.title)} <span class="code">${fd(r.start)} → ${fd(r.due)}</span>${r.comment?`<div class="code">💬 ${esc(r.comment)}</div>`:''}</li>`).join('')||'<li class="code">—</li>'}</ul></div>`);
    d.setMonth(d.getMonth()+1);}
  return `<div class="box"><div class="box-h"><h2>Month by month</h2></div><div class="pl-months">${out.join('')}</div></div>`;
}
async function plSave(){
  const c=plCalc(),p=proj(PL.pid);if(!p||!c.rows.length)return;
  const on=c.rows.filter(r=>!r.off),nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  const old=plTasks(p.id),used=new Set(),prev={};
  const match=r=>{let t=old.find(x=>!used.has(x.id)&&x.plk===r.key);if(!t)t=old.find(x=>!used.has(x.id)&&!x.plk&&x.title===r.title);if(t)used.add(t.id);return t;};
  const ids={},recs=[],now=Date.now();on.forEach(r=>{const t=match(r);ids[r.key]=t?t.id:nid();if(t)prev[r.key]=t;});
  const wbs={};let grp={pre:1,soil:1,exc:2,ftg:2,plinth:2,sump:2,cwall:2,struct:3,head:3,bw:4,mep:4,ipl:4,dw:4};const cnt={};
  on.forEach(r=>{const g=grp[r.sc]||(['fc','mk','ward','tv','light','wallp','furn'].includes(r.sc)?6:r.sc==='clean'?7:(PT_C[PL.ptype]||[]).some(x=>x[0]===r.sc)?8:5);cnt[g]=(cnt[g]||0)+1;wbs[r.key]=`${g}.${cnt[g]}`;});
  let upd=0,add=0;
  on.forEach(r=>{const t=prev[r.key],done=t&&t.status==='Completed';
    const cm=[...((t&&t.comments)||[])];if(r.comment&&!cm.some(x=>x.t===r.comment))cm.push({t:r.comment,by:ME.name||ME.email,at:now});
    const fresh={project:p.id,plk:r.key,wbs:wbs[r.key],title:r.title,resource:r.res,start:done?t.start:r.start,due:done?t.due:r.due,
      pred:r.after.filter(k=>ids[k]).map(k=>wbs[k]).join(', '),source:`BuildMitr planner (${c.city}${PL.months?', '+PL.months+' months':''})`,notes:[r.comment,r.f>1?`Monsoon: ${Math.round((r.f-1)*100)}% extra time included.`:''].filter(Boolean).join(' '),comments:cm};
    if(t){const {id:_x,...keep}=t;recs.push(['tasks',t.id,{...keep,...fresh,progress:t.progress||0,status:t.status||'Not started',upd:now}]);upd++;}
    else{recs.push(['tasks',ids[r.key],{...fresh,progress:0,status:'Not started',by:ME.id,at:now}]);add++;}});
  /* planner activities that are no longer in the plan */
  const gone=old.filter(t=>!used.has(t.id)),started=t=>(t.status&&t.status!=='Not started')||(+t.progress||0)>0;
  const del=gone.filter(t=>!started(t)),keepOff=gone.filter(started);
  keepOff.forEach(t=>{const {id:_x,...keep}=t;recs.push(['tasks',t.id,{...keep,plk:'',source:(t.source||'')+' — removed from the plan (work had started)',upd:now}]);});
  /* payment stages made by the planner: replaced, except ones already invoiced */
  const oldIds=new Set(old.map(t=>t.id)),oldMs=D.milestones.filter(m=>m.project===p.id&&(m.plm||oldIds.has(m.task)));
  const msDel=[],msKeep=new Set();
  if(document.getElementById('pl-ms')&&document.getElementById('pl-ms').checked){
    oldMs.forEach(m=>{if(m.inv)msKeep.add(m.stage);else msDel.push(m.id);});
    const k=x=>ids[x]?x:null,slabs=on.filter(r=>/^slab\d+$/.test(r.key)),se=slabs.length?+(30/slabs.length).toFixed(1):0;
    const lastOf=pre=>{const xs=on.filter(r=>r.key.startsWith(pre));return xs.length?xs[xs.length-1].key:null;};
    const ms=[['Booking / agreement',5,null],['Foundation & footings',10,k('ftg')],['Plinth beam',5,k('plinth')],...slabs.map(r=>[r.title.replace('Beams & roof slab — ','')+' roof slab',se,r.key]),
      ['Brickwork / blockwork',10,lastOf('bw')],['Plastering',10,k('epl')||lastOf('ipl')],['Flooring & tiling',10,lastOf('fl')],['Doors, windows, electrical & plumbing',10,k('fit')],['Painting & handover',10,k('clean')]];
    const tot=ms.reduce((s,m)=>s+m[1],0);ms.filter(([st])=>!msKeep.has(st)).forEach(([st,pc,key])=>recs.push(['milestones',nid(),{project:p.id,stage:st,pct:+(pc*100/tot).toFixed(1),plm:1,...(key?{task:ids[key]}:{due:c.start}),by:ME.id,at:now}]));}
  const plan=JSON.parse(JSON.stringify({ptype:PL.ptype,start:PL.start,months:PL.months,city:PL.city,sun:PL.sun,floors:PL.floors,rooms:PL.rooms,toilets:PL.toilets,kitchens:PL.kitchens,lifts:PL.lifts,scope:PL.scope,hol:PL.hol,ed:PL.ed,ms:!!(document.getElementById('pl-ms')||{}).checked,at:now}));
  const msg=old.length?`Activity schedule updated: ${upd} changed${add?`, ${add} added`:''}${del.length?`, ${del.length} removed`:''}${keepOff.length?` (${keepOff.length} already started kept)`:''} · ${fd(c.start)} → ${fd(c.end)}`
    :`Schedule saved: ${on.length} activities, ${fd(c.start)} → ${fd(c.end)}`;
  const ok=await write(async()=>{await dbBatch(recs);for(const t of del)await db.doc('tasks/'+t.id).delete();for(const id of msDel)await db.doc('milestones/'+id).delete();
    await db.doc('projects/'+p.id).update({start:c.start,end:c.end,plan,ptype:PL.ptype});},msg);
  if(ok){S.proj=p.id;try{localStorage.setItem('bm-proj',p.id);}catch(_){}S.view='schedule';render();scrollTo(0,0);}
}
function plFromEst(est){const hd=(est.heads||[]).filter(h=>h.amt).map(h=>h.hd).join('|');
  [['fc',/ceiling/i],['mk',/modular kitchen/i],['ward',/wardrobe/i],['tv',/tv unit|panelling/i],['light',/lighting/i],['wallp',/wallpaper|texture/i],['furn',/furniture/i]].forEach(([k,re])=>{if(re.test(hd))PL.scope[k]=true;});}
function plOpen(pid,o){
  PL.pid=pid||PL.pid;const p=proj(PL.pid),est=(p&&p.estimate)||{};
  const sv=!o&&p&&p.plan&&typeof p.plan==='object'?JSON.parse(JSON.stringify(p.plan)):null;
  if(o){Object.assign(PL,o);}else if(sv){const {at:_a,ms,...rest}=sv;Object.assign(PL,{scope:{},ed:{},hol:''},rest);PL.ms=ms;}else if(est.floors&&est.floors.length){plFromEst(est);PL.floors=est.floors.map(f=>({n:f.n,a:String(f.a)}));PL.lifts=(est.heads||[]).some(h=>h.hd==='Lift'&&h.amt)?'1':'0';}
  if(!o){const pt=(sv&&sv.ptype)||(p&&p.ptype);PL.ptype=PTYPES.includes(pt)?pt:'Residential house';if(!sv)plSetType(PL.ptype);}
  if(p&&p.start&&!PL.start)PL.start=p.start;if(!sv)PL.ed={};S.view='planner';render();scrollTo(0,0);
}
function taskComments(id){
  const t=TS().find(x=>x.id===id);if(!t)return;const cs=t.comments||[];
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="tcForm" data-task="${esc(id)}">
    <div class="pane-h"><h2>Comments</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><p><b data-notr>${esc(t.title)}</b><br><span class="code">${esc(pname(t.project))} · ${fd(t.start)} → ${fd(t.due)}</span></p>
      ${cs.length?cs.map(x=>`<div class="pl-cm"><div>${esc(x.t)}</div><span class="code">${esc(x.by||'')} · ${new Date(x.at).toLocaleString(LOC())}</span></div>`).join(''):'<div class="code">No comments yet.</div>'}
      ${CANW?`<label>Add a comment<textarea name="t" rows="3" required placeholder="e.g. Shuttering material delayed by 2 days"></textarea></label>`:''}</div>
    <div class="pane-f"><button type="button" class="btn" data-close>Close</button>${CANW?`<button class="btn pri">${ico('check')}<span>Add comment</span></button>`:''}</div></form></div>`;
}
async function taskCommentAdd(f){
  const id=f.dataset.task,t=TS().find(x=>x.id===id),txt=(f.elements.t.value||'').trim();if(!t||!txt)return;
  const cs=[...(t.comments||[]),{t:txt,by:ME.name||ME.email,at:Date.now()}];
  const ok=await write(()=>db.doc(TC()+'/'+id).update({comments:cs}),'Comment added');if(ok){t.comments=cs;taskComments(id);}
}
function plRe(sel,pos){render();const x=document.querySelector(sel);if(x){x.focus();try{x.setSelectionRange(pos,pos);}catch(_){}}}
function schedEdit(id){
  const t=TS().find(x=>x.id===id);if(!t)return;const hasLinks=schedFollowers(t,'linked').length;
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="seForm" data-task="${esc(id)}">
   <div class="pane-h"><h2>Edit activity</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b">
    <label>Activity<input name="title" value="${esc(t.title||'')}" required></label>
    <div class="grid2" style="gap:10px"><label>Start<input type="date" name="start" value="${esc(t.start||'')}"></label><label>Finish<input type="date" name="due" value="${esc(t.due||'')}"></label></div>
    <div class="grid2" style="gap:10px"><label>Progress %<input name="progress" inputmode="numeric" value="${esc(t.progress??'')}"></label>
      <label>Status<select name="status">${MOD.tasks.fields.find(f=>f.k==='status').o.map(o=>`<option ${t.status===o?'selected':''}>${o}</option>`).join('')}</select></label></div>
    <label>Assigned to<select name="who"><option value="">—</option>${D.members.map(m=>`<option value="${esc(m.id)}" ${t.who===m.id?'selected':''}>${esc(nm(m.id))}</option>`).join('')}</select></label>
    <label>Resource / gang<input name="resource" value="${esc(t.resource||'')}"></label>
    <label>If the finish date changes<select name="mode"><option value="linked" ${hasLinks?'selected':''}>Move the linked activities that follow (${hasLinks})</option><option value="later" ${hasLinks?'':'selected'}>Move all later activities of this project</option><option value="none">Move only this activity</option></select></label>
    <label>Notes<textarea name="notes" rows="3">${esc(t.notes||'')}</textarea></label>
    <div class="code">WBS ${esc(t.wbs||'—')}${t.pred?` · after ${esc(t.pred)}`:''}</div>
   </div>
   <div class="pane-f"><button type="button" class="btn ghost warn" data-sedel="${esc(id)}">${S.confirm==='se'+id?'Tap again to delete':ico('trash-2')}</button><button type="button" class="btn" data-edit="tasks:${esc(id)}">All fields</button><button class="btn pri">${ico('check')}<span>Save</span></button></div></form></div>`;
}
function dsSecForm(){const l=dsSecs();
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="dsSecForm"><div class="pane-h"><h2>Design schedule sections</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:8px"><p class="code">Rename, add or remove sections (e.g. Architecture, Structure, 3D views, Interiors, Landscape). Renaming moves its activities to the new name in every project.</p>
    <div id="dsSecRows">${l.map(x=>`<div class="dle-row"><input data-dssec value="${esc(x)}" data-old="${esc(x)}" maxlength="40"><button type="button" class="btn sm ghost" data-dssecdel aria-label="Remove">${ico('x')}</button></div>`).join('')}</div>
    <button type="button" class="btn sm" id="dsSecAdd">${ico('plus')}<span>Add section</span></button></div>
  <div class="pane-f"><button class="btn pri">${ico('check')}<span>Save</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;}
function schedShiftDialog(){
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="ssForm"><div class="pane-h"><h2>Shift schedule</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b"><p class="code">Moves every activity of ${S.proj==='all'?'the chosen project':esc(pname(S.proj))} that starts on or after a date — for example after rain, a holiday or a delay in approvals.</p>
    ${S.proj==='all'?`<label>Project<select name="project">${PJ().map(p=>`<option value="${p.id}">${esc(pname(p.id))}</option>`).join('')}</select></label>`:''}
    <label>Activities starting on or after<input type="date" name="from" value="${today()}" required></label>
    <label>Move by (days; negative moves earlier)<input name="days" inputmode="numeric" required placeholder="e.g. 7"></label>
    <label class="pl-chk"><input type="checkbox" name="open" checked style="width:auto">Skip activities already completed</label></div>
   <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">${ico('check')}<span>Shift</span></button></div></form></div>`;
}
function dsOpen(){const p=proj(S.proj);if(!p){toast('Pick a project at the top first');return;}
  DSG.pid=p.id;DSG.type=PTYPES.includes(p.ptype)?p.ptype:DSG.type;DSG.start=DSG.start||today();DSG.sure=0;DS_SECT.forEach(x=>{if(DSG.sect[x]===undefined)DSG.sect[x]=true;});dsDraw();}
function dsDraw(){const rows=dsBuild(),old=D.dtasks.filter(t=>t.project===DSG.pid),end=rows.reduce((m,r)=>r.due>m?r.due:m,DSG.start);
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane"><div class="pane-h"><h2>Generate design schedule</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" id="dsBody"><div class="fhead">
    <label>Project<input value="${esc(pname(DSG.pid))}" disabled></label>
    <label>Type of project<select id="ds-type">${PTYPES.map(t=>`<option ${DSG.type===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label>
    <label>Start date<input type="date" id="ds-start" value="${esc(DSG.start)}"></label></div>
    <div class="code" style="margin:6px 0">Floors: ${esc(dlFloors(DSG.pid).join(' · '))} (change them in the Drawings library). Sundays and holidays are skipped.</div>
    <div class="pl-scope"><div>${DS_SECT.map(x=>`<label class="pl-chk"><input type="checkbox" data-dssect="${esc(x)}" ${DSG.sect[x]?'checked':''}>${esc(x)}</label>`).join('')}</div></div>
    <div class="note">${ico('calendar-range')}<span><b>${rows.length} activities</b> · ${fd(DSG.start)} → ${fd(end)} (about ${Math.max(1,Math.round((dOf(end)-dOf(DSG.start))/864e5/30.4*10)/10)} months)</span></div>
    <div class="tbl-wrap" style="max-height:44vh"><table class="pl-tbl"><thead><tr><th>No.</th><th>Activity</th><th>Section</th><th>Start</th><th>Finish</th><th class="num">Days</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td class="code">${r.wbs}</td><td>${esc(r.title)}</td><td class="code">${esc(r.disc)}</td><td class="code">${fd(r.start)}</td><td class="code">${fd(r.due)}</td><td class="num">${r.days}</td></tr>`).join('')}</tbody></table></div>
    ${old.length?`<div class="note warn">${ico('alert-triangle')}<span>This project already has ${old.length} design activities. Saving replaces the ones not started; activities with progress keep their progress and comments.</span></div>`:''}
  </div><div class="pane-f srow"><button type="button" class="btn pri" id="dsSave">${ico('check')}<span>${old.length?'Update design schedule':'Save design schedule'}</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></div></div>`;}
PK.done("planning");
