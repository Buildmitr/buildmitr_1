/* ================= BuildMitr — AI Agents =================
   24 agents in 6 groups. Agents marked ai:true send the person's own notes, photos,
   recordings or drawings (and the app data that person can already see) to the
   BuildMitr server, which asks Gemini (same key, limits and usage page as the AI
   assistant). The others work out their answer here on the phone from the app data.
   Nothing is ever saved by an agent: every result opens the normal form, or asks
   the person to tap a button, before anything is written. */
(function(){
const I={'bot':'<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  'cloud-rain':'<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>',
  'copy':'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'ruler':'<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  'layout-grid':'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  'sunrise':'<path d="M12 2v8"/><path d="m4.9 10.9 1.4 1.4"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.1 10.9-1.4 1.4"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>'};
Object.keys(I).forEach(k=>{if(!ICONS[k])ICONS[k]=I[k];});
})();

(function(){const st=document.createElement('style');st.textContent=`.ag-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;padding:4px 0}
.ag-card{display:grid;grid-template-columns:auto 1fr auto;gap:4px 8px;align-items:center;text-align:left;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--panel);cursor:pointer;color:inherit;font:inherit}
.ag-card:hover{border-color:var(--line-strong,#b8c4bf)}.ag-card b{font-size:15px}
.ag-form{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin:6px 0}.ag-f{display:grid;gap:3px;font-size:13px;min-width:160px;flex:1 1 160px}.ag-f>span{color:var(--muted,#667)}
.ag-f input,.ag-f select,.ag-f textarea{width:100%;box-sizing:border-box}.ag-wide{flex-basis:100%;margin:6px 0}
.ag-files{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:8px 0}.ag-chip{display:inline-flex;gap:6px;align-items:center}
.ag-txt{white-space:pre-wrap;font:inherit;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px;margin:8px 0;max-height:360px;overflow:auto}
.ag-det{border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:6px 0}.ag-det summary{cursor:pointer}.ag-sugg{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
body[data-view=agents] .box h3{font-size:14px;margin:12px 0 6px}
.ag-b{padding:10px 16px 14px;min-width:0}.ag-b>.tbl-wrap,.ag-b .tbl-wrap{margin:6px -16px}.ag-b .srow{padding:8px 0;border-bottom:0}.ag-m{color:var(--muted);font-size:13px;line-height:1.4}.ag-card .ag-m{grid-column:1/-1}.ag-b p{margin:6px 0}
body[data-view=agents] .box{margin-bottom:14px}
body[data-view=agents] #view .ag-b .btn{white-space:normal;max-width:100%;height:auto;text-align:left}`;document.head.appendChild(st);})();
const AG={cur:null,p:'',media:{},audio:null,rec:null,recT:0,busy:'',res:{},raw:{},inp:{},wx:{},wxErr:{}};
const AG_GROUPS=[['site','Site & daily work','hard-hat'],['mat','Material','package'],['lab','Labour','users'],['money','Money','indian-rupee'],['draw','Drawings & design','pencil-ruler'],['plan','Planning & management','gantt-chart']];
/* who may open which agent: views the role must be able to open (any of them) */
const AGENTS=[
  {id:'dpr',g:'site',ico:'notebook-pen',name:'DPR Agent',ai:1,need:['dpr'],w:'dpr',desc:'Speak a voice note (Telugu, Hindi or English) or type a few lines, add photos — get a ready daily report to check and save.'},
  {id:'photo',g:'site',ico:'images',name:'Photo Progress Agent',ai:1,need:['tasks'],w:'tasks',desc:'Reads site photos, names the stage and suggests progress % for the matching tasks.'},
  {id:'quality',g:'site',ico:'clipboard-check',name:'Quality Check Agent',ai:1,need:['tasks','issues'],desc:'Pre-pour checklists for concreting this week, curing and cube-test days, and an AI check of site photos.'},
  {id:'safety',g:'site',ico:'shield',name:'Safety Agent',ai:1,need:['issues'],desc:'Spots missing helmets, open edges, unsafe ladders and loose cables in site photos and raises a safety issue.'},
  {id:'weather',g:'site',ico:'cloud-rain',name:'Weather & Curing Agent',need:['tasks','schedule','dpr'],desc:'7-day rain and heat forecast for each site, with warnings for planned pours and curing.'},
  {id:'forecast',g:'mat',ico:'truck',name:'Material Forecast Agent',need:['inventory','requests'],desc:'Works out how many days each material will last and what to order before it runs out.'},
  {id:'wastage',g:'mat',ico:'alert-triangle',name:'Stock & Wastage Agent',need:['inventory'],desc:'Finds material issued but not used or returned, and daily-report usage that does not match the consumption entries.'},
  {id:'vendor',g:'mat',ico:'store',name:'Vendor Price Agent',need:['received','po'],desc:'Compares rates from your vendors, shows price rises and the best vendor for each material.'},
  {id:'invoice',g:'mat',ico:'receipt',name:'PO & Bill Agent',ai:1,need:['received','po'],desc:'Photo of a vendor bill → reads every line, matches it to your purchase orders and flags differences.'},
  {id:'attend',g:'lab',ico:'calendar-check',name:'Attendance Agent',ai:1,need:['attendance','labour'],desc:'Checks attendance against daily-report labour counts, finds frequent absentees, and counts workers in a site photo.'},
  {id:'prod',g:'lab',ico:'gauge',name:'Productivity Agent',ai:1,need:['dpr'],desc:'Compares work done per worker per day (from daily reports) with normal site output for each trade.'},
  {id:'quote',g:'money',ico:'calculator',name:'Quotation Agent',ai:1,need:['invoices','estimator'],desc:'Built-up area, floors and package → a priced quotation with scope and stage-wise payments, ready to send.'},
  {id:'boq',g:'money',ico:'table-2',name:'BOQ & Estimation Agent',ai:1,need:['boq'],w:'boq',desc:'Reads a drawing (photo or PDF) or pasted text and prepares BOQ lines to add to the project.'},
  {id:'variation',g:'money',ico:'file-diff',name:'Variation Agent',ai:1,need:['changes'],desc:'Finds extra work and client changes written in daily reports and issues that have no change order yet.'},
  {id:'budget',g:'money',ico:'wallet',name:'Budget Watch Agent',need:['budget','budgetva','payments'],desc:'Compares spending with work progress and warns before a project goes over budget.'},
  {id:'payfu',g:'money',ico:'hand-coins',name:'Payment Follow-up Agent',need:['invoices','milestones','payments'],desc:'Unpaid bills and due payment stages with ready WhatsApp reminders, plus next 30 days cash flow.'},
  {id:'revision',g:'draw',ico:'files',name:'Drawing Revision Agent',ai:1,need:['documents'],desc:'Finds old drawings still marked Approved, and compares two revisions to list what changed.'},
  {id:'drawqa',g:'draw',ico:'search',name:'Drawing Q&A Agent',ai:1,need:['documents'],desc:'Ask “what is the beam size at grid B2?” — answers from the drawing PDF or photo.'},
  {id:'bylaw',g:'draw',ico:'scale',name:'Bylaw Check Agent',ai:1,need:['documents','survey'],desc:'Checks setbacks, FAR, height, parking and stairs against GHMC / HMDA / BBMP / AP rules and the NBC.'},
  {id:'feas',g:'draw',ico:'layout-grid',name:'Feasibility Layout Agent',ai:1,need:['documents','survey','leads'],desc:'Three layout options with room sizes and an area statement for a plot.'},
  {id:'sched',g:'plan',ico:'gantt-chart',name:'Schedule Agent',ai:1,need:['tasks','schedule'],desc:'Late tasks and what they hold up, projected finish date, and a new schedule made for you from a template.'},
  {id:'ask',g:'plan',ico:'sparkles',name:'Ask BuildMitr',need:[],desc:'Chat with your data: “How much did we spend on Bhanu this month?”, “Who was absent yesterday?”'},
  {id:'brief',g:'plan',ico:'sunrise',name:'Owner Daily Brief Agent',ai:1,need:['dashboard'],desc:'One message for all sites: reports, labour, money in and out, delays, issues and low stock — share on WhatsApp.'},
  {id:'client',g:'plan',ico:'send',name:'Client Update Agent',ai:1,need:['dpr','projects'],desc:'A weekly update for the homeowner with progress and next steps, in their language.'},
];
const agOk=a=>!['Client','Sub-contractor','none'].includes(curRole())&&(!a.need.length||a.need.some(v=>canView(v)))&&(!a.w||(canEditView(a.w)&&CANW0));
const agList=()=>AGENTS.filter(agOk);
const agDef=id=>AGENTS.find(a=>a.id===id);

/* ---------- small helpers ---------- */
const agDays=(a,b)=>Math.round((new Date(String(b)+'T00:00:00')-new Date(String(a)+'T00:00:00'))/864e5);
const agAdd=(d,k)=>{const x=new Date(String(d||today())+'T00:00:00');x.setDate(x.getDate()+k);return isoDate(x);};
const agP=()=>{const ps=PJ();if(S.proj!=='all'&&ps.some(p=>p.id===S.proj))return S.proj;if(AG.p&&ps.some(p=>p.id===AG.p))return AG.p;if(S.proj!=='all'&&ps.some(p=>p.id===S.proj))return S.proj;return (ps[0]||{}).id||'';};
const agPs=()=>S.proj==='all'?PJ().filter(p=>!projArch(p.id)):PJ().filter(p=>p.id===S.proj);
const agIn=pid=>r=>r&&r.project===pid;
const agPick=(all)=>{if(S.proj!=='all')return '';const ps=PJ().filter(p=>!projArch(p.id));const cur=all?(AG.p||'all'):agP();
  return `<label class="psw">${ico('building-2')}<select data-agproj aria-label="Project">${all?`<option value="all" ${cur==='all'?'selected':''}>All projects</option>`:''}${ps.map(p=>`<option value="${p.id}" ${p.id===cur?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>`;};
const agScope=()=>agPs();
const agPill=(t,c)=>`<span class="pill ${c}">${esc(t)}</span>`;
const agSev={High:'p-red',Medium:'p-amber',Low:'p-grey'};
const agTbl=(head,rows)=>rows.length?`<div class="tbl-wrap"><table><thead><tr>${head.map(h=>`<th${/^#/.test(h)?' class="num"':''}>${esc(h.replace(/^#/,''))}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`:'';
const agEmpty=(ic,t,p)=>`<div class="box hero-empty">${ico(ic)}<h2>${esc(t)}</h2>${p?`<p>${esc(p)}</p>`:''}</div>`;
const agBox=(title,ic,body,extra)=>`<div class="box"><div class="box-h">${ico(ic)}<h2>${esc(title)}</h2>${extra||''}</div><div class="ag-b">${body}</div></div>`;
const agDone=t=>t&&t.status==='Completed';
const agPour=/slab|column|footing|beam|casting|concret|pcc|lintel|plinth|roof|raft|staircase|chajja|sunshade|pour/i;
const agTaskProg=pid=>{const ts=D.tasks.filter(t=>t.project===pid);if(!ts.length)return null;return Math.round(ts.reduce((s,t)=>s+(agDone(t)?100:Math.min(100,n(t.progress))),0)/ts.length);};
const agSpent=pid=>D.payments.filter(p=>p.project===pid&&p.dir!=='Received from client').reduce((s,p)=>s+n(p.amount),0);
const agBudget=pid=>D.budget.filter(b=>b.project===pid).reduce((s,b)=>s+n(b.amount),0);
const agClient=pid=>{const p=proj(pid)||{};return D.clients.find(c=>c.id===p.client)||null;};
const agShare=(text,phone)=>`<div class="srow" style="gap:6px;flex-wrap:wrap"><button class="btn sm" data-agcopy="1">${ico('copy')}<span>Copy</span></button><a class="btn sm pri" target="_blank" rel="noopener" href="${phone?waTo(phone,text):'https://wa.me/?text='+encodeURIComponent(text)}">${ico('message-circle')}<span>${phone?'Send on WhatsApp':'Share on WhatsApp'}</span></a></div>`;
const agTxt=t=>`<pre class="ag-txt" data-agtext>${esc(t)}</pre>`;

/* ---------- photos, PDFs and voice notes ---------- */
function agShrink(file){
  return new Promise((res,rej)=>{
    if(file.type==='application/pdf'){if(file.size>8*1048576){rej(new Error(file.name+' is over 8 MB'));return;}const fr=new FileReader();fr.onload=()=>res({mime:'application/pdf',data:String(fr.result).split(',')[1],name:file.name});fr.onerror=()=>rej(new Error('Could not read '+file.name));fr.readAsDataURL(file);return;}
    if(!/^image\//.test(file.type)){rej(new Error(file.name+': only photos or PDF'));return;}
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{const max=1600,sc=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
      res({mime:'image/jpeg',data:c.toDataURL('image/jpeg',0.82).split(',')[1],name:file.name});};
    img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('Could not read '+file.name));};img.src=url;});
}
const agFiles=(key,label,pdf)=>{const list=AG.media[key]||[];
  return `<div class="ag-files"><label class="btn sm">${ico('camera')}<span>${esc(label||'Add photos')}</span><input type="file" accept="image/*${pdf?',application/pdf':''}" multiple hidden data-agfile="${key}"></label>
    ${list.map((m,i)=>`<span class="pill p-grey ag-chip">${m.mime==='application/pdf'?'PDF':'Photo'} ${i+1}<button type="button" class="linkish" data-agfdel="${key}:${i}" aria-label="Remove">×</button></span>`).join('')}</div>`;};
const agRecBtn=()=>{const on=!!AG.rec;const has=!!AG.audio;
  return `<div class="ag-files"><button type="button" class="btn sm ${on?'pri':''}" data-agrec="1">${ico('mic')}<span>${on?'Stop recording ('+Math.round((Date.now()-AG.recT)/1000)+'s)':has?'Record again':'Record voice note'}</span></button>${has&&!on?`<span class="pill p-green ag-chip">Voice note ${AG.audio.secs||''}s<button type="button" class="linkish" data-agadel="1" aria-label="Remove">×</button></span>`:''}</div>`;};
async function agRecord(){
  if(AG.rec){try{AG.rec.stop();}catch(_){}return;}
  if(!navigator.mediaDevices||!window.MediaRecorder){toast('Voice recording is not supported here. Type the notes instead.');return;}
  let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true});}catch(_){toast('Please allow the microphone for BuildMitr.');return;}
  const mt=['audio/webm','audio/ogg','audio/mp4'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||'';
  let r;const ch=[];const end=()=>{st.getTracks().forEach(t=>t.stop());clearInterval(AG.recI);AG.rec=null;};
  try{r=new MediaRecorder(st,mt?{mimeType:mt}:undefined);}catch(_){end();toast('Voice recording is not supported here. Type the notes instead.');return;}
  AG.rec=r;AG.recT=Date.now();
  r.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data);};
  r.onerror=()=>{end();toast('Recording stopped because of an error.');render();};
  r.onstop=async()=>{const secs=Math.round((Date.now()-AG.recT)/1000);end();const leftPage=S.view!=='agents';
    const b=new Blob(ch,{type:(r.mimeType||mt||'audio/webm').split(';')[0]});
    if(leftPage){return;}
    // Gemini reads WAV reliably; phones record WebM/MP4 — convert with the same converter the meeting minutes use
    try{const w=(await mrToWavs(b))[0];if(!w)throw new Error('empty');const fr=new FileReader();fr.onload=()=>{AG.audio={mime:'audio/wav',data:String(fr.result).split(',')[1],secs};render();};fr.readAsDataURL(w.blob);}
    catch(_){toast('The recording could not be read. Please try again or type the notes.');render();}};
  r.start();AG.recI=setInterval(()=>{if(S.view!=='agents'||AG.cur!=='dpr'){if(AG.rec)AG.rec.stop();return;}
    const s2=Math.round((Date.now()-AG.recT)/1000);const lb=document.querySelector('[data-agrec] span');if(lb)lb.textContent=`Stop recording (${s2}s)`;
    if(s2>=270&&AG.rec)AG.rec.stop();},1000);render();
}

/* ---------- one AI run on the server ---------- */
async function agAI(id,o){
  if(!S.cloud)throw new Error(S.demo||S.web?'AI agents work after you sign in (not in the demo).':'AI agents need the BuildMitr server.');
  let data=o.data||{},js=JSON.stringify(data);
  for(let i=0;js.length>55000&&i<8;i++){data=JSON.parse(js);Object.keys(data).forEach(k=>{if(Array.isArray(data[k])&&data[k].length>4)data[k]=data[k].slice(-Math.ceil(data[k].length/2));});js=JSON.stringify(data);}
  if(js.length>55000)js=js.slice(0,55000);
  try{return (await gasApi('agent',{agent:id,input:o.input||'',data:js,media:o.media||[],files:o.files||[]})).json||{};}
  catch(e){if(/Unknown request/i.test(e.message||''))throw new Error('Your BuildMitr server needs the AI Agents update (Apps Script → Deploy → new version).');throw e;}
}
async function agRun(id,fn){
  if(AG.busy)return;AG.busy=id;AG.res[id]='';render();
  try{const j=await fn();AG.raw[id]=j;AG.res[id]='';}
  catch(e){AG.raw[id]=null;AG.res[id]=`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('info')}<span>${esc(e.message||'Something went wrong. Please try again.')}</span></div>`;}
  finally{AG.busy='';render();}
}
const agBusy=id=>AG.busy===id?`<div class="note">${ico('sparkles')}<span>Working on it… this can take up to a minute.</span></div>`:'';
const agGo=(id,label,dis)=>`<button class="btn pri" data-agrun="${id}" ${AG.busy||dis?'disabled':''}>${ico('sparkles')}<span>${esc(label||'Run agent')}</span></button>`;
const agVal=(k,d)=>AG.inp[k]??d??'';
const agInput=(k,l,ph,type,d)=>`<label class="ag-f"><span>${esc(l)}</span><input data-agin="${k}" ${type?`type="${type}"`:''} value="${esc(agVal(k,d))}" placeholder="${esc(ph||'')}"></label>`;
const agArea=(k,l,ph,rows)=>`<label class="ag-f ag-wide"><span>${esc(l)}</span><textarea data-agin="${k}" rows="${rows||3}" placeholder="${esc(ph||'')}">${esc(agVal(k))}</textarea></label>`;
const agSel=(k,l,opts,d)=>`<label class="ag-f"><span>${esc(l)}</span><select data-agin="${k}">${opts.map(o=>{const[v,t]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${String(agVal(k,d))===String(v)?'selected':''}>${esc(t)}</option>`;}).join('')}</select></label>`;
const agLang=k=>agSel(k||'lang','Language',[['en','English'],['te','Telugu'],['hi','Hindi']],'en');
const LANGN={en:'English',te:'Telugu',hi:'Hindi'};

/* ================= the page ================= */
function vAgents(){
  if(AG.cur&&!agDef(AG.cur))AG.cur=null;
  if(AG.cur){const a=agDef(AG.cur);if(!agOk(a)){AG.cur=null;}else return vAgent(a);}
  const list=agList();
  return header('AI Agents')+`<div class="note">${ico('sparkles')}<span>Each agent does one job for you. Agents marked <b>AI</b> read your notes, photos, voice notes or drawings with Gemini; the others work from your app data. Nothing is saved until you check it and tap Save.</span></div>`+
    AG_GROUPS.map(([g,t,ic])=>{const as=list.filter(a=>a.g===g);if(!as.length)return '';
      return `<div class="box"><div class="box-h">${ico(ic)}<h2>${esc(t)}</h2></div><div class="ag-grid">${as.map(a=>`<button class="ag-card" data-agopen="${a.id}">${ico(a.ico)}<b>${esc(a.name)}</b>${a.ai?'<span class="pill p-blue">AI</span>':''}<span class="ag-m">${esc(a.desc)}</span></button>`).join('')}</div></div>`;}).join('');
}
function vAgent(a){
  let body='';try{body=(AG_UI[a.id]||(()=>''))();}catch(e){console.error(e);body=`<div class="note">${ico('info')}<span>This agent could not load: ${esc(e.message)}</span></div>`;}
  return header(a.name,`<button class="btn" data-agback="1">${ico('arrow-left')}<span>All agents</span></button>`)+`<div class="note">${ico(a.ico)}<span>${esc(a.desc)}</span></div>`+body;
}

/* ================= the agents ================= */
const AG_UI={};

/* ---- 1. DPR ---- */
AG_UI.dpr=()=>{const j=AG.raw.dpr,pid=agP();
  let out='';
  if(j){const it=(j.items||[]).filter(x=>x&&x.work),pl=(j.plan||[]).filter(x=>x&&x.work),crew=Object.entries(j.crew||{}).filter(([,v])=>+v>0),mats=(j.mats||[]).filter(m=>m&&(m.item||m.material));
    out=agBox('Daily report — ready to check','check',`
      ${it.length?`<h3>Work done</h3>${agTbl(['Work type','What was done'],it.map(x=>`<tr><td>${esc(x.trade)}</td><td>${esc(x.work)}</td></tr>`))}`:'<p class="ag-m">No work lines were found in the note.</p>'}
      ${crew.length?`<h3>Labour</h3><p>${esc(crew.map(([t,v])=>t+' '+v).join(' · '))}</p>`:''}
      ${mats.length?`<h3>Material</h3>${agTbl(['Material','#Qty','Unit','Received / used'],mats.map(m=>`<tr><td>${esc(m.item||m.material)}</td><td class="num">${num(m.qty)}</td><td>${esc(m.unit||'')}</td><td>${esc(m.kind||'Used')}</td></tr>`))}`:''}
      ${pl.length?`<h3>Plan for tomorrow</h3>${agTbl(['Work type','Planned'],pl.map(x=>`<tr><td>${esc(x.trade)}</td><td>${esc(x.work)}</td></tr>`))}`:''}
      ${j.notes?`<p class="ag-m">${esc(j.notes)}</p>`:''}
      <div class="srow"><button class="btn pri" data-agdpr="1">${ico('pencil')}<span>Review & save as daily report</span></button></div>
      ${(j.issues||[]).length?`<h3>Problems mentioned</h3>${(j.issues||[]).map((x,i)=>`<div class="srow"><span style="flex:1">${agPill(x.severity||'Medium',agSev[x.severity]||'p-amber')} ${esc(x.title)}</span>${canEditView('issues')?`<button class="btn sm" data-agissue="dpr:${i}">${ico('flag')}<span>Raise issue</span></button>`:''}</div>`).join('')}`:''}
      <p class="ag-m">Photos are not attached automatically — add them to each work line in the form.</p>`);}
  return agBox('Tell the agent about today','mic',`<div class="ag-form">${agPick()}${agInput('dprDate','Date','',`date`,today())}</div>
    ${agRecBtn()}${agArea('dprText','Or type the notes (any language)','e.g. GF slab shuttering 70% complete, 6 masons 4 helpers, 40 bags cement used, tomorrow column casting FF',4)}
    ${agFiles('dpr','Add site photos (optional)')}<div class="srow">${agGo('dpr','Make daily report',!pid)}</div>${agBusy('dpr')}${AG.res.dpr||''}`)+out;};
const AG_RUN={};
AG_RUN.dpr=()=>agRun('dpr',async()=>{const pid=agP();if(!pid)throw new Error('Add a project first.');
  const txt=String(agVal('dprText')).trim();if(!txt&&!AG.audio&&!(AG.media.dpr||[]).length)throw new Error('Record a voice note, type the notes or add photos first.');
  return agAI('dpr',{input:txt,data:{project:pname(pid),date:agVal('dprDate',today()),work_types:DPR_WTYPES,trades:DPR_TRADES,units:DPR_UNITS},media:[...(AG.audio?[AG.audio]:[]),...(AG.media.dpr||[]).slice(0,AG.audio?5:6).map(m=>({mime:m.mime,data:m.data}))]});});
function agDprForm(){const j=AG.raw.dpr;if(!j)return;const pid=agP();
  const crew={};Object.entries(j.crew||{}).forEach(([t,v])=>{if(+v>0)crew[DPR_TRADES.includes(t)?t:'Other']=(crew[DPR_TRADES.includes(t)?t:'Other']||0)+(+v);});
  const wt=t=>DPR_WTYPES.includes(t)?t:'Other';
  openForm('dpr',null,{project:pid,date:agVal('dprDate',today()),items:(j.items||[]).filter(x=>x&&x.work).map(x=>({trade:wt(x.trade),work:String(x.work)})),
    crew,mats:(j.mats||[]).filter(m=>m&&(m.item||m.material)).map(m=>({item:String(m.item||m.material),qty:n(m.qty)||'',unit:String(m.unit||''),kind:m.kind==='Received'?'Received':'Used'})),
    planItems:(j.plan||[]).filter(x=>x&&x.work).map(x=>({trade:wt(x.trade),work:String(x.work)})),work:j.notes||''});}

/* ---- 2. Photo progress ---- */
AG_UI.photo=()=>{const j=AG.raw.photo,pid=agP();let out='';
  if(j){const ups=(j.task_updates||[]).filter(u=>D.tasks.some(t=>t.id===u.task_id&&t.project===pid));
    out=agBox('What the photos show','images',`<p><b>Stage:</b> ${esc(j.stage||'—')}${j.overall_pct!=null?` · about <b>${n(j.overall_pct)}%</b> of this stage`:''}</p>
      ${(j.seen||[]).length?`<ul>${j.seen.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}
      ${ups.length?`<h3>Suggested task progress</h3>${agTbl(['Task','#Now','#Suggested','Why',''],ups.map(u=>{const t=D.tasks.find(x=>x.id===u.task_id);const p=Math.max(0,Math.min(95,Math.round(n(u.progress))));
        return `<tr><td>${esc(t.title)}</td><td class="num">${n(t.progress)}%</td><td class="num"><b>${p}%</b></td><td>${esc(u.why||'')}</td><td>${CANW0&&canEditView('tasks')&&p!==n(t.progress)?`<button class="btn sm" data-agprog="${t.id}:${p}">Set ${p}%</button>`:''}</td></tr>`;}))}<p class="ag-m">Completed tasks are marked from the task form so their checklists are checked. Suggestions stop at 95%.</p>`:'<p class="ag-m">No open task clearly matches these photos.</p>'}
      ${j.notes?`<p class="ag-m">${esc(j.notes)}</p>`:''}`);}
  return agBox('Site photos','camera',`<div class="ag-form">${agPick()}</div>${agFiles('photo','Add site photos')}<div class="srow">${agGo('photo','Read photos',!pid)}</div>${agBusy('photo')}${AG.res.photo||''}`)+out;};
AG_RUN.photo=()=>agRun('photo',async()=>{const pid=agP();const ph=AG.media.photo||[];if(!ph.length)throw new Error('Add at least one site photo.');
  const open=D.tasks.filter(t=>t.project===pid&&!agDone(t)).slice(0,80).map(t=>({task_id:t.id,title:t.title,progress:n(t.progress),status:t.status||''}));
  return agAI('photo',{data:{project:pname(pid),open_tasks:open},media:ph.map(m=>({mime:m.mime,data:m.data}))});});

/* ---- 3. Quality ---- */
AG_UI.quality=()=>{const ps=agScope(),t=today(),j=AG.raw.quality;
  const up=D.tasks.filter(x=>ps.some(p=>p.id===x.project)&&!agDone(x)&&agPour.test(x.title||'')&&(x.start||x.due)>=agAdd(t,-3)&&(x.start||x.due)<=agAdd(t,7)).sort((a,b)=>String(a.start||a.due).localeCompare(String(b.start||b.due)));
  const cast=D.tasks.filter(x=>ps.some(p=>p.id===x.project)&&agDone(x)&&agPour.test(x.title||'')&&x.due&&agDays(x.due,t)>=0&&agDays(x.due,t)<=30);
  const CHK=['Cover blocks fixed (footing 50, column 40, beam 25, slab 20 mm)','Bar sizes, spacing and laps as per drawing; 135° stirrup hooks','Shuttering in line, level and plumb; joints sealed; props tight','Shuttering cleaned and oiled; no loose wire or debris','Conduits and sleeves fixed before pour','Cube moulds ready (6 cubes per 30 cum / each pour)','Vibrator, water and curing arrangement on site'];
  const curRows=cast.map(x=>{const d=agDays(x.due,t);const cube7=agAdd(x.due,7),cube28=agAdd(x.due,28);
    return `<tr><td>${esc(x.title)}<div class="ag-m">${esc(pname(x.project))}</div></td><td>${fd(x.due)}</td><td class="num">${d}</td><td>${d<7?agPill('Curing — keep wet','p-amber'):d<14?agPill('Curing (14 days for PPC/hot weather)','p-blue'):agPill('Curing done','p-green')}</td><td>${d<=7?'7-day cube test '+fd(cube7):d<=28?'28-day cube test '+fd(cube28):'—'}</td></tr>`;});
  let out='';
  if(j)out=agBox('AI photo check','clipboard-check',`<p><b>Stage:</b> ${esc(j.stage||'—')}</p>${(j.ok||[]).length?`<p>${ico('check')} ${esc(j.ok.join(' · '))}</p>`:''}
    ${(j.findings||[]).map((f,i)=>`<div class="srow"><span style="flex:1">${agPill(f.severity||'Medium',agSev[f.severity]||'p-amber')} <b>${esc(f.issue)}</b><br><span class="ag-m">Fix: ${esc(f.fix||'')}</span></span>${canEditView('issues')&&CANW0?`<button class="btn sm" data-agissue="quality:${i}">${ico('flag')}<span>Raise snag</span></button>`:''}</div>`).join('')||'<p>No problems seen.</p>'}
    ${j.retake?`<p class="ag-m">${esc(j.retake)}</p>`:''}`);
  return agBox('Concreting in the next 7 days','calendar-check',up.length?up.map(x=>`<details class="ag-det"><summary><b>${esc(x.title)}</b> · ${esc(pname(x.project))} · ${fd(x.start||x.due)}</summary><ul>${CHK.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></details>`).join(''):'<p class="ag-m">No slab, column, footing or beam work is planned in the next 7 days (from the construction schedule).</p>')+
    agBox('Curing and cube tests','flask-conical',curRows.length?agTbl(['Pour','Cast on','#Days','Curing','Next test'],curRows):'<p class="ag-m">No concreting completed in the last 30 days. The date used is the task due date.</p>')+
    agBox('Check a photo with AI','camera',`<div class="ag-form">${agPick()}${agSel('qStage','Stage',['Footing reinforcement','Column reinforcement','Beam & slab reinforcement','Shuttering','After casting / curing','Brickwork','Plastering','Waterproofing','Tiling','Other'])}</div>${agFiles('quality','Add photos')}<div class="srow">${agGo('quality','Check photos')}</div>${agBusy('quality')}${AG.res.quality||''}`)+out;};
AG_RUN.quality=()=>agRun('quality',async()=>{const ph=AG.media.quality||[];if(!ph.length)throw new Error('Add at least one photo.');return agAI('quality',{input:'Stage: '+agVal('qStage','Footing reinforcement'),media:ph.map(m=>({mime:m.mime,data:m.data}))});});

/* ---- 4. Safety ---- */
AG_UI.safety=()=>{const j=AG.raw.safety,ps=agScope();
  const open=D.issues.filter(i=>i.kind==='Safety'&&i.status!=='Resolved'&&ps.some(p=>p.id===i.project));
  let out='';
  if(j)out=agBox('Safety check result','shield',`${j.people_seen?`<p>${n(j.people_seen)} people seen.</p>`:''}
    ${(j.findings||[]).map((f,i)=>`<div class="srow"><span style="flex:1">${agPill(f.severity||'Medium',agSev[f.severity]||'p-amber')} <b>${esc(f.issue)}</b><br><span class="ag-m">Fix: ${esc(f.fix||'')}</span></span>${canEditView('issues')&&CANW0?`<button class="btn sm" data-agissue="safety:${i}">${ico('flag')}<span>Raise safety issue</span></button>`:''}</div>`).join('')||`<p>${ico('check')} No safety problems seen in these photos.</p>`}
    ${(j.good||[]).length?`<p class="ag-m">Good: ${esc(j.good.join(' · '))}</p>`:''}`);
  return agBox('Check site photos','camera',`<div class="ag-form">${agPick()}</div>${agFiles('safety','Add site photos')}<div class="srow">${agGo('safety','Check safety')}</div>${agBusy('safety')}${AG.res.safety||''}`)+out+
    agBox(`Open safety issues (${open.length})`,'alert-triangle',open.length?agTbl(['Issue','Project','Priority','Reported'],open.map(i=>`<tr><td>${esc(i.title)}</td><td>${esc(pname(i.project))}</td><td>${agPill(i.severity||'—',agSev[i.severity]||'p-grey')}</td><td>${fd(i.at?isoDate(new Date(i.at)):'')}</td></tr>`)):'<p class="ag-m">None open.</p>');};
AG_RUN.safety=()=>agRun('safety',async()=>{const ph=AG.media.safety||[];if(!ph.length)throw new Error('Add at least one site photo.');return agAI('safety',{media:ph.map(m=>({mime:m.mime,data:m.data}))});});
function agIssue(src,i){const j=AG.raw[src];if(!j)return;const pid=agP();
  if(src==='dpr'){const x=(j.issues||[])[i];if(!x)return;openForm('issues',null,{project:pid,title:String(x.title||'').slice(0,120),kind:['Site issue','Snag (quality defect)','Safety','Client complaint'].includes(x.kind)?x.kind:'Site issue',severity:['High','Medium','Low'].includes(x.severity)?x.severity:'Medium',status:'Open'});return;}
  const f=(j.findings||[])[i];if(!f)return;
  openForm('issues',null,{project:pid,title:String(f.issue||'').slice(0,120),kind:src==='safety'?'Safety':'Snag (quality defect)',severity:['High','Medium','Low'].includes(f.severity)?f.severity:'Medium',status:'Open',details:'Fix: '+(f.fix||'')+' (found by the '+(src==='safety'?'Safety':'Quality Check')+' Agent)'});}

/* ---- 5. Weather & curing ---- */
const agLoc=p=>p&&(p.loc&&p.loc.lat!=null?p.loc:(p.maps&&parseLoc(p.maps))||(typeof p.loc==='string'&&parseLoc(p.loc))||null);
async function agWx(pid){const p=proj(pid),l=agLoc(p);if(!l||AG.wx[pid]||AG.wxErr[pid])return;AG.wxErr[pid]='busy';
  try{const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${l.lat}&longitude=${l.lng}&daily=precipitation_sum,precipitation_probability_max,temperature_2m_max&timezone=Asia%2FKolkata&forecast_days=7`);
    const j=await r.json();if(!j.daily)throw new Error('no data');AG.wx[pid]=j.daily;delete AG.wxErr[pid];}
  catch(_){AG.wxErr[pid]='Could not get the forecast (no internet?).';}
  if(S.view==='agents'&&AG.cur==='weather')render();}
AG_UI.weather=()=>{const ps=agScope();
  const rows=ps.map(p=>{const l=agLoc(p);if(!l)return `<div class="srow"><b style="flex:1">${esc(pname(p.id))}</b><span class="ag-m">No site location — add the map pin in the project details to get the forecast.</span></div>`;
    const w=AG.wx[p.id];if(!w){setTimeout(()=>agWx(p.id),0);return `<div class="srow"><b style="flex:1">${esc(pname(p.id))}</b><span class="ag-m">${esc(AG.wxErr[p.id]&&AG.wxErr[p.id]!=='busy'?AG.wxErr[p.id]:'Getting the forecast…')}</span></div>`;}
    const pours=D.tasks.filter(t=>t.project===p.id&&!agDone(t)&&agPour.test(t.title||''));
    const days=w.time.map((d,i)=>{const rain=n(w.precipitation_sum[i]),pr=n((w.precipitation_probability_max||[])[i]),tmax=n(w.temperature_2m_max[i]);
      const pd=pours.filter(t=>(t.start||t.due)===d);const wet=rain>=5||pr>=60,hot=tmax>=38;
      const warn=[...(pd.length&&wet?[`Pour planned (${pd.map(t=>t.title).join(', ')}) — rain likely: keep polythene ready or shift the pour`]:[]),...(pd.length&&hot?['Hot day — pour early morning, use ice / retarder, start curing quickly']:[]),...(!pd.length&&hot?['Hot — extra curing water for recent pours']:[])];
      return `<tr><td>${fd(d)}</td><td class="num">${num(rain)} mm</td><td class="num">${pr?pr+'%':'—'}</td><td class="num">${Math.round(tmax)}°C</td><td>${warn.length?warn.map(x=>agPill(x,x.startsWith('Pour')?'p-red':'p-amber')).join(' '):wet?agPill('Rain likely','p-blue'):agPill('OK','p-green')}</td></tr>`;});
    return `<h3>${esc(pname(p.id))}</h3>${agTbl(['Day','#Rain','#Chance','#Max','Site advice'],days)}`;}).join('');
  return agBox('7-day forecast','cloud-rain',(rows||'<p class="ag-m">No projects.</p>')+'<p class="ag-m">Forecast from Open-Meteo. Pours are slab, column, footing and beam tasks from the construction schedule (by start date).</p>');};

/* ---- 6. Material forecast ---- */
function agUse(pid,mat,unit,days){const from=agAdd(today(),-days),k=String(mat).trim().toLowerCase();
  const sum=c=>D[c].filter(r=>r.project===pid&&String(r.material||'').trim().toLowerCase()===k&&(r.unit||'')===(unit||'')&&r.date&&r.date>=from).reduce((s,r)=>s+n(r.qty),0);
  return Math.max(sum('consumed'),sum('issue'));}
AG_UI.forecast=()=>{const ps=agScope(),t=today();
  const st=stock().filter(s=>ps.some(p=>p.id===s.project)&&s.received>0);
  const rows=st.map(s=>{const use=agUse(s.project,s.material,s.unit,30)/30;const pend=D.requests.filter(r=>r.project===s.project&&String(r.material||'').trim().toLowerCase()===s.material.toLowerCase()&&['Pending','Approved'].includes(r.status)).reduce((a,r)=>a+n(r.qty),0);
      const cover=use>0?s.store/use:Infinity;const need=Math.max(0,Math.ceil(use*14-s.store-pend));return {...s,use,pend,cover,need};})
    .sort((a,b)=>a.cover-b.cover);
  const low=rows.filter(r=>r.cover<7);
  const soon=D.tasks.filter(x=>ps.some(p=>p.id===x.project)&&!agDone(x)&&agPour.test(x.title||'')&&(x.start||x.due)&&(x.start||x.due)>=t&&(x.start||x.due)<=agAdd(t,14));
  return agBox(`Will run out within 7 days (${low.length})`,'alert-triangle',low.length?agTbl(['Material','Project','#In store','#Use per day','#Days left','#Requested','#Order for 14 days',''],low.map(r=>`<tr><td><b>${esc(r.material)}</b></td><td>${esc(pname(r.project))}</td><td class="num">${num(r.store)} ${esc(r.unit)}</td><td class="num">${num(r.use)}</td><td class="num"><b style="color:var(--red-ink)">${r.cover<1?'<1':Math.floor(r.cover)}</b></td><td class="num">${num(r.pend)}</td><td class="num">${num(r.need)}</td><td>${r.need>0&&canEditView('requests')&&CANW0?`<button class="btn sm" data-agreq="${esc(r.project)}|${esc(r.material)}|${esc(r.unit)}|${r.need}">Request</button>`:''}</td></tr>`)):'<p class="ag-m">Nothing runs out in the next 7 days at the last 30 days\' rate of use.</p>')+
    (soon.length?agBox('Concreting in the next 14 days','calendar-check',`<p>${soon.map(x=>`<b>${esc(x.title)}</b> (${esc(pname(x.project))}, ${fd(x.start||x.due)})`).join(' · ')}</p><p class="ag-m">Check cement, steel, sand, 20 mm and 12 mm aggregate, binding wire and cover blocks for these pours.</p>`):'')+
    agBox('All materials','boxes',rows.length?agTbl(['Material','Project','#In store','#Use per day','#Days left'],rows.map(r=>`<tr><td>${esc(r.material)}</td><td>${esc(pname(r.project))}</td><td class="num">${num(r.store)} ${esc(r.unit)}</td><td class="num">${r.use?num(r.use):'—'}</td><td class="num">${r.cover===Infinity?'—':Math.floor(r.cover)}</td></tr>`)):'<p class="ag-m">No material received yet.</p>')+
    `<p class="ag-m">Use per day = material issued or consumed in the last 30 days ÷ 30.</p>`;};

/* ---- 7. Stock & wastage ---- */
AG_UI.wastage=()=>{const ps=agScope(),from=agAdd(today(),-30);
  const st=stock().filter(s=>ps.some(p=>p.id===s.project));
  const gang=st.map(s=>({...s,open:s.issued-s.returned-s.consumed})).filter(s=>s.issued>0&&s.open>0.15*s.issued).sort((a,b)=>b.open/b.issued-a.open/a.issued);
  const cmp={};D.dpr.filter(r=>ps.some(p=>p.id===r.project)&&r.date&&r.date>=from).forEach(r=>dprMats(r).filter(m=>m.kind!=='Received').forEach(m=>{const k=r.project+'|'+String(m.item).trim().toLowerCase();cmp[k]=cmp[k]||{project:r.project,item:String(m.item).trim(),unit:m.unit||'',dpr:0,cons:0};cmp[k].dpr+=n(m.qty);}));
  D.consumed.filter(r=>ps.some(p=>p.id===r.project)&&r.date&&r.date>=from).forEach(r=>{const k=r.project+'|'+String(r.material||'').trim().toLowerCase();if(cmp[k])cmp[k].cons+=n(r.qty);});
  const mis=Object.values(cmp).filter(c=>c.dpr>0&&Math.abs(c.dpr-c.cons)>0.2*Math.max(c.dpr,c.cons));
  return agBox(`Issued to gangs but not used or returned (${gang.length})`,'alert-triangle',gang.length?agTbl(['Material','Project','#Issued','#Returned','#Used','#Not accounted','#%'],gang.map(s=>`<tr><td><b>${esc(s.material)}</b></td><td>${esc(pname(s.project))}</td><td class="num">${num(s.issued)}</td><td class="num">${num(s.returned)}</td><td class="num">${num(s.consumed)}</td><td class="num"><b>${num(s.open)} ${esc(s.unit)}</b></td><td class="num">${Math.round(s.open/s.issued*100)}%</td></tr>`))+'<p class="ag-m">Ask the gang or sub-contractor to return the balance, or enter what was used under Material consumption.</p>':'<p class="ag-m">Everything issued is used or returned (within 15%).</p>')+
    agBox(`Daily reports vs consumption entries — last 30 days (${mis.length})`,'scale',mis.length?agTbl(['Material','Project','#Used in daily reports','#Consumption entries','#Difference'],mis.map(c=>`<tr><td>${esc(c.item)}</td><td>${esc(pname(c.project))}</td><td class="num">${num(c.dpr)} ${esc(c.unit)}</td><td class="num">${num(c.cons)}</td><td class="num"><b>${num(c.dpr-c.cons)}</b></td></tr>`)):'<p class="ag-m">Daily-report material use matches the consumption entries (within 20%).</p>');};

/* ---- 8. Vendor price ---- */
AG_UI.vendor=()=>{const t=today(),a60=agAdd(t,-60),a180=agAdd(t,-180);
  const rs=[...D.received.map(r=>({...r,src:'Received'})),...D.po.filter(r=>r.status!=='Cancelled').map(r=>({...r,src:'PO'}))].filter(r=>inProj(r)&&r.material&&n(r.rate)>0&&r.vendor&&true);
  const by={};rs.forEach(r=>{const k=String(r.material).trim().toLowerCase()+'|'+(r.unit||'');(by[k]=by[k]||{material:String(r.material).trim(),unit:r.unit||'',rows:[]}).rows.push(r);});
  const mats=Object.values(by).map(m=>{const vs={};m.rows.forEach(r=>{const v=vs[r.vendor]=vs[r.vendor]||{id:r.vendor,n:0,sum:0,last:null};v.n++;v.sum+=n(r.rate);if(!v.last||String(r.date||'')>String(v.last.date||''))v.last=r;});
    const vl=Object.values(vs).map(v=>({...v,avg:v.sum/v.n,lr:n(v.last.rate)})).sort((a,b)=>a.lr-b.lr);
    const avg=x=>x.length?x.reduce((s,r)=>s+n(r.rate),0)/x.length:0;const now=avg(m.rows.filter(r=>r.date>=a60)),before=avg(m.rows.filter(r=>r.date<a60&&r.date>=a180));
    return {...m,vl,trend:now&&before?Math.round((now-before)/before*100):null};}).sort((a,b)=>(b.trend||0)-(a.trend||0));
  const up=mats.filter(m=>m.trend!=null&&m.trend>=5);
  return (up.length?agBox('Prices going up','trending-up',`<p>${up.map(m=>`<b>${esc(m.material)}</b> +${m.trend}%`).join(' · ')}</p><p class="ag-m">Average rate of the last 60 days compared with the 4 months before.</p>`):'')+
    agBox('Best vendor for each material','store',mats.length?mats.map(m=>`<details class="ag-det"><summary><b>${esc(m.material)}</b>${m.unit?' ('+esc(m.unit)+')':''} — best ${esc(vname(m.vl[0].id))} at ${inr(m.vl[0].lr)}${m.vl.length>1?` · ${m.vl.length} vendors`:''}${m.trend!=null?` · ${m.trend>0?'+':''}${m.trend}%`:''}</summary>
      ${agTbl(['Vendor','#Last rate','#Average','#Bills / POs','Last date'],m.vl.map((v,i)=>`<tr><td>${i===0?'⭐ ':''}${esc(vname(v.id))}</td><td class="num">${inr(v.lr)}</td><td class="num">${inr(v.avg)}</td><td class="num">${v.n}</td><td>${fd(v.last.date)}</td></tr>`))}</details>`).join(''):'<p class="ag-m">No rates yet. Rates come from Material received and Purchase orders that have a vendor and a rate.</p>');};

/* ---- 9. PO & bill ---- */
AG_UI.invoice=()=>{const j=AG.raw.invoice,pid=agP();let out='';
  if(j){const ls=j.lines||[];
    out=agBox('Bill read','receipt',`<p><b>${esc(j.vendor||'Vendor ?')}</b> · Bill ${esc(j.bill_no||'—')} · ${fd(j.date)}${j.total?` · Total <b>${inr(j.total)}</b>`:''}${j.gst?` (GST ${inr(j.gst)})`:''}</p>
      ${agTbl(['Material','#Qty','Unit','#Rate','Matching PO','Difference',''],ls.map((l,i)=>`<tr><td>${esc(l.material)}</td><td class="num">${num(l.qty)}</td><td>${esc(l.unit||'')}</td><td class="num">${inr(l.rate)}</td><td>${esc(l.po_no||'—')}</td><td>${l.diff?agPill(l.diff,'p-amber'):(l.po_no?agPill('Matches','p-green'):agPill('No PO','p-red'))}</td><td>${canEditView('received')&&CANW0?`<button class="btn sm" data-agrecv="${i}">Save as received</button>`:''}</td></tr>`))}
      ${(j.problems||[]).length?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('alert-triangle')}<span>${esc(j.problems.join(' · '))}</span></div>`:''}`);}
  return agBox('Vendor bill or delivery challan','receipt',`<div class="ag-form">${agPick()}</div>${agFiles('invoice','Photo of the bill',true)}<div class="srow">${agGo('invoice','Read bill',!pid)}</div>${agBusy('invoice')}${AG.res.invoice||''}`)+out;};
AG_RUN.invoice=()=>agRun('invoice',async()=>{const pid=agP();const ph=AG.media.invoice||[];if(!ph.length)throw new Error('Add a photo of the bill.');
  const pos=D.po.filter(r=>r.project===pid).slice(-80).map(r=>({po_id:r.id,po_no:r.no||'',vendor:vname(r.vendor),material:r.material,qty:n(r.qty),unit:r.unit||'',rate:n(r.rate),status:r.status||''}));
  return agAI('invoice',{data:{project:pname(pid),purchase_orders:pos},media:ph.map(m=>({mime:m.mime,data:m.data}))});});
function agRecv(i){const j=AG.raw.invoice;const l=j&&(j.lines||[])[i];if(!l)return;const pid=agP();
  const v=D.vendors.find(x=>String(x.name||'').trim().toLowerCase()===String(j.vendor||'').trim().toLowerCase());
  openForm('received',null,{project:pid,date:/^\d{4}-\d{2}-\d{2}$/.test(j.date||'')?j.date:today(),material:String(l.material||''),unit:String(l.unit||''),qty:n(l.qty)||'',rate:n(l.rate)||'',vendor:v?v.id:'',bill:String(j.bill_no||'')});
  if(!v&&j.vendor)toast(`Vendor “${j.vendor}” is not in your vendor list — choose or add it in the form.`);}

/* ---- 10. Attendance ---- */
AG_UI.attend=()=>{const ps=agScope(),t=today(),j=AG.raw.attend;
  const days=[...Array(7)].map((_,i)=>agAdd(t,-i));
  const gap=[];ps.forEach(p=>days.forEach(d=>{const r=D.dpr.find(x=>x.project===p.id&&x.date===d);const crew=r?crewTot(r.crew):0;
    const att=D.attendance.filter(a=>a.project===p.id&&a.date===d).reduce((s,a)=>s+(a.status==='Present'?1:a.status==='Half day'?0.5:0),0)+D.vlabour.filter(v=>v.project===p.id&&v.date===d).reduce((s,v)=>s+n(v.count),0);
    if((crew||att)&&Math.abs(crew-att)>=Math.max(3,0.2*Math.max(crew,att)))gap.push({p:p.id,d,crew,att});}));
  const abs={};D.attendance.filter(a=>ps.some(p=>p.id===a.project)&&days.includes(a.date)&&a.status==='Absent').forEach(a=>{abs[a.labour]=(abs[a.labour]||0)+1;});
  const often=Object.entries(abs).filter(([,c])=>c>=3).map(([id,c])=>({w:D.labour.find(l=>l.id===id),c})).filter(x=>x.w);
  const notToday=ps.filter(p=>D.dpr.some(r=>r.project===p.id&&r.date>=agAdd(t,-2))&&!D.attendance.some(a=>a.project===p.id&&a.date===t)&&!D.vlabour.some(v=>v.project===p.id&&v.date===t));
  let out='';if(j){const pid=agP();const mk=D.attendance.filter(a=>a.project===pid&&a.date===t&&a.status!=='Absent').length+D.vlabour.filter(v=>v.project===pid&&v.date===t).reduce((s,v)=>s+n(v.count),0);
    out=agBox('Workers in the photo','users',`<p>About <b>${n(j.count)}</b> workers seen${j.low!=null&&j.high!=null&&j.high!==j.low?` (between ${n(j.low)} and ${n(j.high)})`:''}. Attendance marked today for ${esc(pname(pid))}: <b>${num(mk)}</b>.</p>${Math.abs(n(j.count)-mk)>=3?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('alert-triangle')}<span>The photo count and the attendance differ by ${Math.abs(n(j.count)-mk)}. Check before paying wages.</span></div>`:''}${j.notes?`<p class="ag-m">${esc(j.notes)}</p>`:''}`);}
  return (notToday.length?agBox('Attendance not marked today','calendar-plus',`<p>${notToday.map(p=>esc(pname(p.id))).join(' · ')}</p>${canView('attbulk')?`<button class="btn sm" data-go="attbulk">${ico('calendar-plus')}<span>Mark attendance</span></button>`:''}`):'')+
    agBox(`Labour count does not match — last 7 days (${gap.length})`,'scale',gap.length?agTbl(['Date','Project','#In daily report','#Attendance marked','#Difference'],gap.map(g=>`<tr><td>${fd(g.d)}</td><td>${esc(pname(g.p))}</td><td class="num">${num(g.crew)}</td><td class="num">${num(g.att)}</td><td class="num"><b>${num(g.att-g.crew)}</b></td></tr>`))+'<p class="ag-m">More attendance than labour in the report can mean extra names being paid; fewer can mean attendance was not marked.</p>':'<p class="ag-m">Daily reports and attendance agree.</p>')+
    agBox(`Absent 3 or more days this week (${often.length})`,'user',often.length?agTbl(['Worker','Trade','#Days absent'],often.map(x=>`<tr><td>${esc(x.w.name)}</td><td>${esc(x.w.trade||'')}</td><td class="num">${x.c}</td></tr>`)):'<p class="ag-m">Nobody.</p>')+
    agBox('Count workers in a site photo (AI)','camera',`<div class="ag-form">${agPick()}</div>${agFiles('attend','Add a site photo')}<div class="srow">${agGo('attend','Count workers')}</div>${agBusy('attend')}${AG.res.attend||''}`)+out;};
AG_RUN.attend=()=>agRun('attend',async()=>{const ph=AG.media.attend||[];if(!ph.length)throw new Error('Add a site photo.');const j=await agAI('headcount',{media:ph.map(m=>({mime:m.mime,data:m.data}))});return j;});

/* ---- 11. Productivity ---- */
AG_UI.prod=()=>{const j=AG.raw.prod,pid=agP();let out='';
  if(j)out=agBox('Output per worker','gauge',agTbl(['Trade','#Days','#Workers','Output','Per worker / day','Normal','Verdict'],(j.rows||[]).map(r=>`<tr><td>${esc(r.trade)}</td><td class="num">${num(r.days)}</td><td class="num">${num(r.workers)}</td><td>${esc(r.output||'')}</td><td>${esc(r.per_worker_day||'')}</td><td>${esc(r.norm||'')}</td><td>${agPill(r.verdict||'—',r.verdict==='Good'?'p-green':r.verdict==='Slow'?'p-red':'p-grey')}</td></tr>`))+(j.summary?`<p>${esc(j.summary)}</p>`:''));
  const n14=D.dpr.filter(r=>r.project===pid&&r.date>=agAdd(today(),-14)).length;
  return agBox('Check productivity','gauge',`<div class="ag-form">${agPick()}${agSel('prodDays','Period',[['7','Last 7 days'],['14','Last 14 days'],['30','Last 30 days']],'14')}</div><p class="ag-m">${n14} daily reports in the last 14 days for this project. Write quantities in the reports (e.g. “brickwork FF 450 sqft”) for the best result.</p><div class="srow">${agGo('prod','Check output',!pid)}</div>${agBusy('prod')}${AG.res.prod||''}`)+out;};
AG_RUN.prod=()=>agRun('prod',async()=>{const pid=agP(),d=+agVal('prodDays','14');const rs=D.dpr.filter(r=>r.project===pid&&r.date>=agAdd(today(),-d)).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  if(!rs.length)throw new Error('No daily reports in this period.');
  return agAI('productivity',{data:{project:pname(pid),reports:rs.map(r=>({date:r.date,work:dprItems(r).map(x=>x.trade+': '+x.work),labour:r.crew||{}}))}});});

/* ---- 12. Quotation ---- */
const AG_PKG=[['Standard','2300'],['Premium','2700'],['Luxury','3200']];
function agQ(){const pk=(D.packages||[]).filter(p=>n(p.rate)>0);const opts=pk.length?pk.map(p=>[p.id,`${p.name} — ${inr(p.rate)}/sq.ft`]):AG_PKG.map(([a,r])=>[a,`${a} — ₹${(+r).toLocaleString('en-IN')}/sq.ft (edit the rate)`]);
  const sel=agVal('qPkg',opts[0][0]);const p=pk.find(x=>x.id===sel)||null;const name=p?p.name:((AG_PKG.find(x=>x[0]===sel)||AG_PKG[0])[0]);const defRate=p?n(p.rate):n((AG_PKG.find(x=>x[0]===sel)||AG_PKG[0])[1]);
  const area=n(agVal('qArea')),rate=n(agVal('qRate',defRate))||defRate,extra=n(agVal('qExtra'));return {pk,opts,sel,p,name,defRate,area,rate,extra,base:area*rate,tot:area*rate+extra};}
AG_UI.quote=()=>{const {pk,opts,defRate,area,rate,extra,base,tot}=agQ();
  const j=AG.raw.quote;
  return agBox('Quotation details','calculator',`<div class="ag-form">${agSel('qClient','Client',[['','—'],...D.clients.map(c=>[c.id,c.name])])}${agInput('qArea','Built-up area (sq.ft, all floors)','e.g. 3200','number')}${agInput('qFloors','Floors','e.g. G+2')}${agSel('qPkg','Package',opts,opts[0][0])}${agInput('qRate','Rate per sq.ft (₹)','',`number`,defRate)}${agInput('qExtra','Extras (₹) — compound wall, sump, lift…','0','number')}</div>
    ${agArea('qNotes','Extras / notes','e.g. compound wall 180 rft, 10,000 L sump, lift shaft',2)}
    ${!pk.length?'<p class="ag-m">Tip: add your own packages and current rates on the Packages page so they appear here. Rates shown are starting points — always use your current rates.</p>':''}
    ${area?`<div class="tiles"><div class="tile"><b>${inr(base)}</b><span>${num(area)} sq.ft × ${inr(rate)}</span></div><div class="tile"><b>${inr(extra)}</b><span>Extras</span></div><div class="tile"><b>${inr(tot)}</b><span>Total before GST</span></div><div class="tile"><b>${inr(tot*1.18)}</b><span>With GST 18%</span></div></div>`:''}
    <div class="srow">${agGo('quote','Write scope & payment stages (AI)',!area)}${area&&canEditView('invoices')&&CANW0?`<button class="btn" data-agquote="1">${ico('file-text')}<span>Create quotation</span></button>`:''}</div>${agBusy('quote')}${AG.res.quote||''}
    ${j?`<h3>Scope</h3><p>${esc(j.desc||'')}</p>${(j.stages||[]).length?agTbl(['Stage','#%','#Amount'],j.stages.map(s=>`<tr><td>${esc(s.stage)}</td><td class="num">${n(s.pct)}%</td><td class="num">${inr(tot*n(s.pct)/100)}</td></tr>`)):''}${(j.exclusions||[]).length?`<p class="ag-m">Not included: ${esc(j.exclusions.join(', '))}</p>`:''}`:''}`);};
AG_RUN.quote=()=>agRun('quote',async()=>{const q=agQ();if(!q.area)throw new Error('Enter the built-up area.');
  return agAI('quote',{data:{builtup_sqft:q.area,floors:agVal('qFloors'),package:{name:q.name,specs:q.p?q.p.specs||'':''},rate_per_sqft:q.rate,extras_rs:q.extra,extras_notes:agVal('qNotes'),total_before_gst:q.tot}});});
function agQuote(){const {area,rate,tot,name}=agQ();const j=AG.raw.quote;
  const desc=[`House construction (${agVal('qFloors')||'as per drawings'}), built-up ${num(area)} sq.ft @ ${inr(rate)}/sq.ft — ${name} package`,n(agVal('qExtra'))?`Extras: ${inr(agVal('qExtra'))}${agVal('qNotes')?' ('+agVal('qNotes')+')':''}`:'',j&&j.desc?'\n'+j.desc:'',j&&(j.stages||[]).length?'\nPayment stages: '+j.stages.map(s=>`${s.stage} ${n(s.pct)}%`).join('; '):''].filter(Boolean).join('\n');
  openForm('invoices',null,{kind:'Quotation',client:agVal('qClient')||'',date:today(),desc,amount:Math.round(tot),gst:'GST 18%',status:'Sent',...(S.proj!=='all'?{project:S.proj}:{})});}

/* ---- 13. BOQ ---- */
AG_UI.boq=()=>{const j=AG.raw.boq,pid=agP();const ls=(j&&j.lines||[]).filter(l=>l&&l.desc);
  return agBox('Drawing or text to BOQ','table-2',`<div class="ag-form">${agPick()}</div>${agFiles('boq','Drawing photo or PDF',true)}${agArea('boqText','Or paste text (room sizes, Excel rows, notes)','e.g. 8 footings 5\'x5\'x1\'6", columns 9"x12" x 10 ft ×12, slab 1200 sqft 5"',4)}
    <div class="srow">${agGo('boq','Prepare BOQ',!pid)}</div>${agBusy('boq')}${AG.res.boq||''}
    ${ls.length?`<h3>${ls.length} BOQ lines</h3>${agTbl(['Item','Description','Unit','#Qty','#Rate','Note'],ls.map(l=>`<tr><td>${esc(l.item||'')}</td><td>${esc(l.desc)}</td><td>${esc(l.unit||'')}</td><td class="num">${num(l.qty)}</td><td class="num">${n(l.rate)?inr(l.rate):'—'}</td><td class="ag-m">${esc(l.note||'')}</td></tr>`))}
      ${(j.assumptions||[]).length?`<p class="ag-m">Assumptions: ${esc(j.assumptions.join(' · '))}</p>`:''}
      <div class="srow">${canEditView('boq')&&CANW0?`<button class="btn pri" data-agboqadd="1" ${AG.saving?'disabled':''}>${ico('plus')}<span>Add ${ls.length} lines to ${esc(pname(pid))} BOQ</span></button>`:''}<button class="btn" data-agcsv="boq">${ico('download')}<span>Download CSV</span></button></div><p class="ag-m">Check the quantities before adding — the AI reads only what the drawing shows clearly.</p>`:''}`);};
AG_RUN.boq=()=>agRun('boq',async()=>{const pid=agP();const fs=AG.media.boq||[];const txt=String(agVal('boqText')).trim();if(!fs.length&&!txt)throw new Error('Add a drawing or paste some text.');
  return agAI('boq',{input:txt,data:{project:pname(pid),units:['Cum','Sqft','Sqm','Rft','Rmt','Kg','MT','Nos','Lumpsum','Points']},media:fs.map(m=>({mime:m.mime,data:m.data}))});});
const AG_BOQU=['Cum','Sqft','Sqm','Rft','Rmt','Kg','MT','Nos','Lumpsum','Points'];
const agUnit=u=>{const x=String(u||'').trim().toLowerCase().replace(/\.$/,'');const m={'cu.m':'Cum','cum':'Cum','m3':'Cum','cft':'Cum','sq.m':'Sqm','sqm':'Sqm','m2':'Sqm','sq.ft':'Sqft','sqft':'Sqft','sft':'Sqft','rmt':'Rmt','rm':'Rmt','m':'Rmt','rft':'Rft','kg':'Kg','kgs':'Kg','mt':'MT','ton':'MT','tonne':'MT','nos':'Nos','no':'Nos','each':'Nos','ls':'Lumpsum','lumpsum':'Lumpsum','points':'Points','point':'Points'};return AG_BOQU.find(o=>o.toLowerCase()===x)||m[x]||String(u||'');};
async function agBoqAdd(){const j=AG.raw.boq,pid=agP();const ls=(j&&j.lines||[]).filter(l=>l&&l.desc);if(!ls.length||!pid||AG.saving)return;
  if(!confirm(`Add ${ls.length} lines to the BOQ of ${pname(pid)}?`))return;let k=0;AG.saving=1;render();
  const ok=await write(async()=>{for(const l of ls){await db.collection('boq').add({project:pid,item:String(l.item||''),desc:String(l.desc),unit:agUnit(l.unit),qty:n(l.qty),rate:n(l.rate)||'',done:0,by:ME.id,at:Date.now()});k++;}});
  AG.saving=0;if(k){audit('created','boq',null,`${k} BOQ lines via BOQ Agent`);toast(`${k} BOQ lines added`);AG.raw.boq=null;S.view='boq';S.proj=pid;render();}else{if(!ok)toast('Could not add the lines.');render();}}
function agCsv(kind){const j=AG.raw[kind];if(!j)return;const ls=(j.lines||[]);const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const csv=['Item,Description,Unit,Qty,Rate,Note',...ls.map(l=>[l.item,l.desc,l.unit,l.qty,l.rate,l.note].map(q).join(','))].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+csv],{type:'text/csv'}));a.download='BOQ-'+today()+'.csv';a.click();}

/* ---- 14. Variation ---- */
AG_UI.variation=()=>{const ps=agScope(),j=AG.raw.variation;
  const co=D.changes.filter(c=>ps.some(p=>p.id===c.project));const pend=co.filter(c=>c.status==='Requested'||!c.status),apr=co.filter(c=>c.status==='Approved');
  return agBox('Change orders','file-diff',`<div class="tiles"><div class="tile"><b>${pend.length}</b><span>Waiting for approval</span></div><div class="tile"><b>${inr(apr.reduce((s,c)=>s+n(c.amount),0))}</b><span>Approved extra cost</span></div><div class="tile"><b>${apr.reduce((s,c)=>s+n(c.days),0)}</b><span>Approved extra days</span></div><div class="tile"><b>${inr(pend.reduce((s,c)=>s+n(c.amount),0))}</b><span>Waiting — not billed yet</span></div></div>
    ${pend.length?agTbl(['CO','Project','What','#Cost','Date'],pend.map(c=>`<tr><td>${esc(c.no||'')}</td><td>${esc(pname(c.project))}</td><td>${esc(c.desc||'')}</td><td class="num">${inr(c.amount)}</td><td>${fd(c.date)}</td></tr>`)):''}`)+
    agBox('Find unrecorded changes (AI)','search',`<div class="ag-form">${agPick()}</div><p class="ag-m">Reads the last 45 days of daily reports and issues of the project and lists extra work that has no change order.</p><div class="srow">${agGo('variation','Find changes',!agP())}</div>${agBusy('variation')}${AG.res.variation||''}
    ${j?((j.found||[]).length?(j.found||[]).map((f,i)=>`<div class="srow"><span style="flex:1"><b>${esc(f.what)}</b><br><span class="ag-m">${fd(f.date)} · from ${esc(f.source||'')}${n(f.est_cost)?' · about '+inr(f.est_cost):''}${n(f.est_days)?' · '+n(f.est_days)+' days':''}</span></span>${canEditView('changes')&&CANW0?`<button class="btn sm" data-agco="${i}">${ico('plus')}<span>Change order</span></button>`:''}</div>`).join(''):'<p>No unrecorded changes found.</p>')+(j.summary?`<p class="ag-m">${esc(j.summary)}</p>`:''):''}`);};
AG_RUN.variation=()=>agRun('variation',async()=>{const pid=agP(),from=agAdd(today(),-45);
  const dpr=D.dpr.filter(r=>r.project===pid&&r.date>=from).map(r=>({date:r.date,work:dprWork(r)}));const iss=D.issues.filter(i=>i.project===pid&&(i.at||0)>=Date.parse(from)).map(i=>({date:i.at?isoDate(new Date(i.at)):'',title:i.title,details:i.details||''}));
  if(!dpr.length&&!iss.length)throw new Error('No daily reports or issues in the last 45 days.');
  return agAI('variation',{data:{project:pname(pid),daily_reports:dpr,issues:iss,change_orders:D.changes.filter(c=>c.project===pid).map(c=>({no:c.no,date:c.date,desc:c.desc}))}});});
function agCo(i){const f=((AG.raw.variation||{}).found||[])[i];if(!f)return;const pid=agP();const k=D.changes.filter(c=>c.project===pid).reduce((m,c)=>Math.max(m,parseInt(String(c.no||'').replace(/\D/g,''),10)||0),0)+1;
  openForm('changes',null,{project:pid,no:'CO-'+String(k).padStart(3,'0'),date:today(),desc:String(f.what||''),reqby:'Client',amount:n(f.est_cost)||'',days:n(f.est_days)||'',status:'Requested'});}

/* ---- 15. Budget watch ---- */
AG_UI.budget=()=>{const ps=agScope();
  const rows=ps.map(p=>{const bud=agBudget(p.id)||n(p.value),sp=agSpent(p.id),pr=agTaskProg(p.id);const burn=bud?Math.round(sp/bud*100):null;const fc=pr&&pr>=5?sp/pr*100:null;
    const st=!bud?['No budget','p-grey']:fc&&fc>bud*1.05?['Will go over','p-red']:burn!=null&&pr!=null&&burn>pr+15?['Spending ahead of work','p-amber']:['On track','p-green'];return {p,bud,sp,pr,burn,fc,st};});
  const over=[];ps.forEach(p=>CATS.forEach(c=>{const b=D.budget.filter(x=>x.project===p.id&&x.cat===c).reduce((s,x)=>s+n(x.amount),0);const a=D.payments.filter(x=>x.project===p.id&&x.dir!=='Received from client'&&(x.cat||'Other')===c).reduce((s,x)=>s+n(x.amount),0);if(b&&a>b)over.push({p:p.id,c,b,a});}));
  return agBox('Spending vs work done','wallet',rows.length?agTbl(['Project','#Budget','#Spent','#Spent %','#Work done %','#Expected final cost','Status'],rows.map(r=>`<tr><td><b>${esc(pname(r.p.id))}</b></td><td class="num">${r.bud?inr(r.bud):'—'}</td><td class="num">${inr(r.sp)}</td><td class="num">${r.burn!=null?r.burn+'%':'—'}</td><td class="num">${r.pr!=null?r.pr+'%':'—'}</td><td class="num">${r.fc?inr(r.fc):'—'}</td><td>${agPill(r.st[0],r.st[1])}</td></tr>`))+'<p class="ag-m">Budget = budget lines (or the contract value if there are none). Work done = average progress of the schedule tasks. Expected final cost = spent ÷ work done.</p>':'<p class="ag-m">No projects.</p>')+
    agBox(`Categories over budget (${over.length})`,'alert-triangle',over.length?agTbl(['Project','Category','#Budget','#Spent','#Over by'],over.map(o=>`<tr><td>${esc(pname(o.p))}</td><td>${esc(o.c)}</td><td class="num">${inr(o.b)}</td><td class="num">${inr(o.a)}</td><td class="num"><b style="color:var(--red-ink)">${inr(o.a-o.b)}</b></td></tr>`)):'<p class="ag-m">No category is over its budget.</p>');};

/* ---- 16. Payment follow-up ---- */
function agDue(){const t=today(),ps=agScope();
  const inv=D.invoices.filter(r=>ps.some(p=>p.id===r.project)&&['Tax invoice','RA bill','Proforma invoice'].includes(r.kind||'Tax invoice')&&r.status!=='Paid').map(r=>({r,bal:Math.round(invTotal(r)-n(r.got)),age:r.date?agDays(r.date,t):0})).filter(x=>x.bal>0);
  const ms=D.milestones.filter(m=>ps.some(p=>p.id===m.project)).map(m=>{const st=msStatus(m),dd=msDueDate(m);return {m,amt:msAmount(m),due:st==='Due',billed:st!=='Due',soon:st==='Upcoming'&&dd&&dd>=t&&dd<=agAdd(t,30),dd};});
  return {inv,ms};}
AG_UI.payfu=()=>{const {inv,ms}=agDue();const t=today();
  const remind=x=>{const c=D.clients.find(k=>k.id===x.r.client)||agClient(x.r.project);const txt=`Dear ${firstName(c&&c.name)||'Sir/Madam'},\nThis is a gentle reminder that ${x.r.kind||'invoice'} ${x.r.no||''} dated ${fd(x.r.date)} for ${pname(x.r.project)} has ₹${x.bal.toLocaleString('en-IN')} pending. Kindly arrange the payment at your earliest convenience.\nThank you,\n${orgName()}`;
    return c&&c.phone?`<a class="btn sm" target="_blank" rel="noopener" href="${waTo(c.phone,txt)}">${ico('message-circle')}<span>Remind</span></a>`:'<span class="ag-m">No client phone</span>';};
  const due=ms.filter(x=>x.due&&!x.billed),soon=ms.filter(x=>x.soon);
  const opP=D.po.filter(r=>agScope().some(p=>p.id===r.project)&&['Draft','Sent','Partly received'].includes(r.status)).reduce((s,r)=>s+n(r.qty)*n(r.rate),0);
  const wage14=D.attendance.filter(a=>agScope().some(p=>p.id===a.project)&&a.date>=agAdd(t,-14)).reduce((s,a)=>{const w=D.labour.find(l=>l.id===a.labour);return s+(w?n(w.wage)*(a.status==='Present'?1:a.status==='Half day'?0.5:0):0);},0)/14*26;
  const inflow=inv.reduce((s,x)=>s+x.bal,0)+due.reduce((s,x)=>s+x.amt,0)+soon.reduce((s,x)=>s+x.amt,0);
  return agBox('Next 30 days cash flow (estimate)','trending-up',`<div class="tiles"><div class="tile"><b>${inr(inflow)}</b><span>Can come in (unpaid bills + due stages)</span></div><div class="tile"><b>${inr(opP)}</b><span>Open purchase orders</span></div><div class="tile"><b>${inr(wage14)}</b><span>Wages (at last 2 weeks' rate)</span></div><div class="tile"><b style="color:${inflow-opP-wage14<0?'var(--red-ink)':'inherit'}">${inr(inflow-opP-wage14)}</b><span>Net</span></div></div>`)+
    agBox(`Unpaid bills (${inv.length})`,'receipt',inv.length?agTbl(['Bill','Project','#Pending','#Days old',''],inv.sort((a,b)=>b.age-a.age).map(x=>`<tr><td>${esc(x.r.kind||'')} ${esc(x.r.no||'')}</td><td>${esc(pname(x.r.project))}</td><td class="num"><b>${inr(x.bal)}</b></td><td class="num">${x.age>30?`<b style="color:var(--red-ink)">${x.age}</b>`:x.age}</td><td>${remind(x)}</td></tr>`)):'<p class="ag-m">No unpaid bills.</p>')+
    agBox(`Stages due but not billed (${due.length})`,'flag',due.length?agTbl(['Stage','Project','#Amount',''],due.map(x=>`<tr><td>${esc(x.m.stage||'')}</td><td>${esc(pname(x.m.project))}</td><td class="num">${inr(x.amt)}</td><td>${canEditView('invoices')&&CANW0?`<button class="btn sm" data-agbill="${x.m.id}">${ico('file-text')}<span>Make bill</span></button>`:''}</td></tr>`)):'<p class="ag-m">All due stages are billed.</p>')+
    (soon.length?agBox(`Stages due in the next 30 days (${soon.length})`,'calendar-clock',agTbl(['Stage','Project','#Amount','Due'],soon.map(x=>`<tr><td>${esc(x.m.stage||'')}</td><td>${esc(pname(x.m.project))}</td><td class="num">${inr(x.amt)}</td><td>${fd(x.dd)}</td></tr>`))):'');};
function agBill(mid){raiseInvoice(mid);}

/* ---- 17. Drawing revision ---- */
const agDocs=pid=>D.documents.filter(relOK).filter(d=>(!pid||pid==='all'?agScope().some(p=>p.id===d.project):d.project===pid));
const agDocFiles=d=>(Array.isArray(d.files)?d.files:[]).filter(f=>f&&f.id&&/pdf|image|jpe?g|png|webp/i.test((f.type||'')+' '+(f.name||'')));
AG_UI.revision=()=>{const ds=agDocs('all');const grp={};ds.forEach(d=>{const k=d.project+'|'+String(d.title||'').trim().toLowerCase().replace(/\s*(rev(ision)?\.?\s*[a-z0-9]+|r\d+)$/i,'');(grp[k]=grp[k]||[]).push(d);});
  const stale=[];Object.values(grp).filter(g=>g.length>1).forEach(g=>{const s=g.slice().sort((a,b)=>(b.at||0)-(a.at||0));const newest=s.find(d=>d.status==='Approved');if(!newest)return;s.filter(d=>d!==newest&&(d.at||0)<(newest.at||0)&&d.status!=='Superseded').forEach(d=>stale.push({d,newest}));});
  const withF=agDocs(agP()).filter(d=>agDocFiles(d).length);const opts=[['','— choose —'],...withF.map(d=>[d.id,`${d.title||'Drawing'}${d.rev?' · Rev '+d.rev:''} (${fd(d.at?isoDate(new Date(d.at)):'')})`])];const j=AG.raw.revision;
  return agBox(`Old revisions still in use (${stale.length})`,'alert-triangle',stale.length?agTbl(['Drawing','Project','Old rev','Status','Newer approved',''],stale.map(x=>`<tr><td>${esc(x.d.title||'')}</td><td>${esc(pname(x.d.project))}</td><td>${esc(x.d.rev||'—')}</td><td>${agPill(x.d.status||'—','p-amber')}</td><td>${esc(x.newest.rev||'newer')}</td><td>${canEditView('documents')&&CANW0?`<button class="btn sm" data-agsup="${x.d.id}">Mark superseded</button>`:''}</td></tr>`))+'<p class="ag-m">Marking the old sheet Superseded stops the site from using it by mistake.</p>':'<p class="ag-m">No old revisions are still marked as current.</p>')+
    agBox('Compare two revisions (AI)','files',`<div class="ag-form">${agPick()}${agSel('revOld','Old revision',opts)}${agSel('revNew','New revision',opts)}</div><p class="ag-m">Or add the two drawings as photos/PDF (old first, then new):</p>${agFiles('revision','Add old + new drawing',true)}<div class="srow">${agGo('revision','Compare')}</div>${agBusy('revision')}${AG.res.revision||''}
    ${j?`${(j.changes||[]).length?agTbl(['Change','Where','Impact'],j.changes.map(c=>`<tr><td>${esc(c.what)}</td><td>${esc(c.where||'')}</td><td>${agPill(c.impact||'—',agSev[c.impact]||'p-grey')}</td></tr>`)):'<p>No changes found.</p>'}${j.summary?`<p>${esc(j.summary)}</p>`:''}${j.site_alert?`<h3>Message for the site</h3>${agTxt(j.site_alert)}${agShare(j.site_alert)}`:''}`:''}`);};
AG_RUN.revision=()=>agRun('revision',async()=>{const o=D.documents.find(d=>d.id===agVal('revOld')),nw=D.documents.find(d=>d.id===agVal('revNew'));const fs=AG.media.revision||[];
  const okd=d=>d&&relOK(d)&&agDocFiles(d).length;
  if(o&&nw){if(!okd(o)||!okd(nw))throw new Error('Choose two drawings that have a PDF or photo file.');if(o.id===nw.id)throw new Error('Choose two different drawings.');return agAI('revision',{input:`Old: ${o.title} rev ${o.rev||''}. New: ${nw.title} rev ${nw.rev||''}.`,files:[agDocFiles(o)[0].id,agDocFiles(nw)[0].id]});}
  if(fs.length>=2)return agAI('revision',{media:fs.slice(0,2).map(m=>({mime:m.mime,data:m.data}))});
  throw new Error('Choose the old and new drawing, or add two drawings (old first).');});
async function agSup(id){const d=D.documents.find(x=>x.id===id);if(!d||!confirm(`Mark “${d.title}”${d.rev?' rev '+d.rev:''} as Superseded?`))return;const ok=await write(()=>db.doc('documents/'+id).update({status:'Superseded'}),'Marked superseded');if(ok){audit('updated','documents',id,`${d.title}: Superseded (Drawing Revision Agent)`);render();}}

/* ---- 18. Drawing Q&A ---- */
AG_UI.drawqa=()=>{const withF=agDocs(agP()).filter(d=>agDocFiles(d).length);const j=AG.raw.drawqa;
  return agBox('Ask about a drawing','search',`<div class="ag-form">${agPick()}${agSel('qaDoc','Drawing',[['','— or add a photo below —'],...withF.map(d=>[d.id,`${d.title||'Drawing'}${d.rev?' · Rev '+d.rev:''}`])])}</div>${agFiles('drawqa','Photo or PDF of the drawing',true)}
    ${agArea('qaQ','Your question','e.g. What is the size and steel of beam B4? What is the sill level of W2?',2)}<div class="srow">${agGo('drawqa','Ask')}</div>${agBusy('drawqa')}${AG.res.drawqa||''}
    ${j?`<div class="note">${ico(j.sure===false?'info':'check')}<span><b>${esc(j.answer||'')}</b>${j.found_on?`<br><span class="ag-m">Found on: ${esc(j.found_on)}</span>`:''}${j.sure===false?'<br><span class="ag-m">Not fully sure — please check on the drawing.</span>':''}</span></div>`:''}`);};
AG_RUN.drawqa=()=>agRun('drawqa',async()=>{const q=String(agVal('qaQ')).trim();if(!q)throw new Error('Type your question.');const d0=D.documents.find(x=>x.id===agVal('qaDoc'));const d=d0&&relOK(d0)&&agDocFiles(d0).length?d0:null;const fs=AG.media.drawqa||[];
  if(!d&&!fs.length)throw new Error('Choose a drawing or add a photo of it.');
  return agAI('drawqa',{input:q,files:d?agDocFiles(d).slice(0,2).map(f=>f.id):[],media:fs.map(m=>({mime:m.mime,data:m.data}))});});

/* ---- 19. Bylaw ---- */
AG_UI.bylaw=()=>{const j=AG.raw.bylaw;
  return agBox('Proposal details','scale',`<div class="ag-form">${agSel('bAuth','Rules',['Telangana — GHMC (G.O.Ms.168)','Telangana — HMDA','Andhra Pradesh — APDPMS / G.O.119','Karnataka — BBMP','Karnataka — BDA / BMRDA','National Building Code 2016'])}
    ${agInput('bPlot','Plot size (ft)','e.g. 40 x 60')}${agInput('bRoad','Road width (ft)','e.g. 30')}${agInput('bFloors','Floors','e.g. Stilt + 4')}${agInput('bHt','Building height (m)','e.g. 14.5')}
    ${agInput('bSet','Setbacks provided (ft) F/R/S1/S2','e.g. 10 / 5 / 5 / 5')}${agInput('bCov','Built-up per floor (sq.ft)','e.g. 1650')}${agInput('bPark','Car parks provided','e.g. 4')}${agInput('bStair','Stair width (ft)','e.g. 3.5')}</div>
    ${agArea('bNotes','Other details','e.g. corner plot, 2 flats per floor, lift provided',2)}${agFiles('bylaw','Plan photo / PDF (optional)',true)}
    <div class="srow">${agGo('bylaw','Check rules')}</div>${agBusy('bylaw')}${AG.res.bylaw||''}
    ${j?`${agTbl(['Rule','Required','Provided','Result'],(j.rows||[]).map(r=>`<tr><td>${esc(r.rule)}</td><td>${esc(r.required||'')}</td><td>${esc(r.provided||'')}</td><td>${agPill(r.result||'Check',r.result==='Pass'?'p-green':r.result==='Fail'?'p-red':'p-amber')}</td></tr>`))}${j.summary?`<p>${esc(j.summary)}</p>`:''}<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('info')}<span>${esc(j.disclaimer||'Confirm with the latest notified bylaws and the local authority before submitting.')}</span></div>`:''}`);};
AG_RUN.bylaw=()=>agRun('bylaw',async()=>{if(!agVal('bPlot'))throw new Error('Enter the plot size.');
  const f=k=>agVal(k);return agAI('bylaw',{input:`Rules: ${f('bAuth')||'Telangana — GHMC (G.O.Ms.168)'}\nPlot: ${f('bPlot')} ft\nRoad width: ${f('bRoad')} ft\nFloors: ${f('bFloors')}\nHeight: ${f('bHt')} m\nSetbacks F/R/S1/S2: ${f('bSet')} ft\nBuilt-up per floor: ${f('bCov')} sqft\nCar parks: ${f('bPark')}\nStair width: ${f('bStair')} ft\nNotes: ${f('bNotes')}`,media:(AG.media.bylaw||[]).map(m=>({mime:m.mime,data:m.data}))});});

/* ---- 20. Feasibility ---- */
AG_UI.feas=()=>{const j=AG.raw.feas;
  return agBox('Plot details','layout-grid',`<div class="ag-form">${agInput('fPlot','Plot size (ft)','e.g. 30 x 50')}${agSel('fFace','Facing',['East','West','North','South','North-East corner','South-East corner','North-West corner','South-West corner'])}${agInput('fFloors','Floors','e.g. G+2')}${agInput('fNeed','Requirement','e.g. 3BHK duplex, or 2 x 2BHK per floor')}${agInput('fSet','Setbacks (ft) F/R/S1/S2','e.g. 6 / 3 / 3 / 3')}${agSel('fVastu','Vastu',['Yes','No'])}${agSel('fPark','Parking',['Stilt parking','1 car on GF','No car parking'])}</div>
    ${agArea('fNotes','Other wishes','e.g. pooja room on GF, home office, lift, rental unit',2)}<div class="srow">${agGo('feas','Make 3 options')}</div>${agBusy('feas')}${AG.res.feas||''}
    ${j?(j.options||[]).map(o=>`<details class="ag-det" open><summary><b>${esc(o.name||'Option')}</b> — ${esc(o.idea||'')}</summary>${agTbl(['Floor','Room','Size'],(o.rooms||[]).map(r=>`<tr><td>${esc(r.floor||'')}</td><td>${esc(r.room||'')}</td><td>${esc(r.size||'')}</td></tr>`))}
      ${o.area?`<p class="ag-m">Plot ${num(o.area.plot_sqft)} sq.ft · coverage ${num(o.area.coverage_sqft)} · per floor ${num(o.area.builtup_per_floor_sqft)} · total ${num(o.area.total_sqft)} sq.ft</p>`:''}${(o.pros||[]).length?`<p>${ico('check')} ${esc(o.pros.join(' · '))}</p>`:''}${(o.cons||[]).length?`<p class="ag-m">${esc(o.cons.join(' · '))}</p>`:''}</details>`).join('')+(j.notes?`<p class="ag-m">${esc(j.notes)}</p>`:''):''}`);};
AG_RUN.feas=()=>agRun('feas',async()=>{if(!agVal('fPlot'))throw new Error('Enter the plot size.');const f=k=>agVal(k);
  return agAI('feasibility',{input:`Plot ${f('fPlot')} ft, facing ${f('fFace')||'East'}, floors ${f('fFloors')}, need ${f('fNeed')}, setbacks ${f('fSet')} ft, vastu ${f('fVastu')||'Yes'}, parking ${f('fPark')||'Stilt parking'}. ${f('fNotes')}`});});

/* ---- 21. Schedule ---- */
AG_UI.sched=()=>{const ps=agScope(),t=today(),j=AG.raw.sched;
  const rows=ps.map(p=>{const ts=D.tasks.filter(x=>x.project===p.id);const late=ts.filter(x=>!agDone(x)&&x.due&&x.due<t);const slip=late.reduce((m,x)=>Math.max(m,agDays(x.due,t)),0);
    const fin=ts.reduce((m,x)=>x.due&&x.due>m?x.due:m,'');const blocked=ts.filter(x=>!agDone(x)&&x.pred&&late.some(l=>l.wbs&&String(x.pred).split(/[,; ]+/).includes(String(l.wbs))));
    return {p,ts,late,slip,fin,blocked,proj:fin?agAdd(fin,slip):''};}).filter(r=>r.ts.length);
  return agBox('Delays','gantt-chart',rows.length?rows.map(r=>`<h3>${esc(pname(r.p.id))}</h3><div class="tiles"><div class="tile"><b>${r.late.length}</b><span>Late tasks</span></div><div class="tile"><b>${r.slip}</b><span>Days behind (worst)</span></div><div class="tile"><b>${fd(r.fin)}</b><span>Planned finish</span></div><div class="tile"><b style="color:${r.slip?'var(--red-ink)':'inherit'}">${fd(r.proj)}</b><span>Likely finish</span></div></div>
      ${r.late.length?agTbl(['Late task','Due','#Days late','Assigned to'],r.late.sort((a,b)=>String(a.due).localeCompare(String(b.due))).slice(0,15).map(x=>`<tr><td>${esc(x.title)}</td><td>${fd(x.due)}</td><td class="num">${agDays(x.due,t)}</td><td>${esc(x.who?pnm(x.who):'—')}</td></tr>`)):''}
      ${r.blocked.length?`<p class="ag-m">Held up by late tasks: ${esc(r.blocked.slice(0,10).map(x=>x.title).join(' · '))}</p>`:''}`).join(''):'<p class="ag-m">No schedule tasks yet. Make one below.</p>')+
    agBox('Make a new schedule (AI)','sparkles',`<div class="ag-form">${agPick()}${agInput('sFloors','Floors','e.g. Stilt + G+3')}${agInput('sArea','Built-up area (sq.ft)','e.g. 4800','number')}${agInput('sStart','Start date','',`date`,today())}${agSel('sType','Type',['Independent house','Villa','Apartment','Commercial'])}</div>
      ${agArea('sNotes','Notes','e.g. raft foundation, no cellar, lift, finishing by client',2)}<div class="srow">${agGo('sched','Make schedule',!agP())}</div>${agBusy('sched')}${AG.res.sched||''}
      ${j&&(j.tasks||[]).length?`<h3>${j.tasks.length} tasks · finish ${fd(j.finish)}</h3>${agTbl(['WBS','Task','Start','Due','After'],j.tasks.map(x=>`<tr><td>${esc(x.wbs||'')}</td><td>${esc(x.title)}</td><td>${fd(x.start)}</td><td>${fd(x.due)}</td><td>${esc(x.pred||'')}</td></tr>`))}${j.notes?`<p class="ag-m">${esc(j.notes)}</p>`:''}
        ${canEditView('tasks')&&CANW0?`<div class="srow"><button class="btn pri" data-agschedadd="1" ${AG.saving?'disabled':''}>${ico('plus')}<span>Add ${j.tasks.length} tasks to ${esc(pname(agP()))}</span></button></div>`:''}`:''}`);};
AG_RUN.sched=()=>agRun('sched',async()=>{if(!agVal('sFloors')&&!agVal('sArea'))throw new Error('Enter the floors or the built-up area.');
  return agAI('schedule',{input:`Type ${agVal('sType')||'Independent house'}, floors ${agVal('sFloors')}, built-up ${agVal('sArea')} sqft, start ${agVal('sStart',today())}. ${agVal('sNotes')}`});});
async function agSchedAdd(){const j=AG.raw.sched,pid=agP();const ts=(j&&j.tasks||[]).filter(x=>x&&x.title);if(!ts.length||!pid||AG.saving)return;
  if(!confirm(`Add ${ts.length} tasks to the schedule of ${pname(pid)}?`))return;let k=0;AG.saving=1;render();const d=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v:'';
  await write(async()=>{for(const x of ts){await db.collection('tasks').add({project:pid,wbs:String(x.wbs||''),title:String(x.title).slice(0,160),start:d(x.start),due:d(x.due),pred:String(x.pred||''),resource:String(x.resource||''),progress:0,status:'Not started',source:'Schedule Agent',by:ME.id,at:Date.now()});k++;}});
  AG.saving=0;if(!k)render();
  if(k){audit('created','tasks',null,`${k} tasks via Schedule Agent`);toast(`${k} tasks added`);AG.raw.sched=null;S.proj=pid;S.view='schedule';render();}}

/* ---- 22. Ask BuildMitr ---- */
AG_UI.ask=()=>agBox('Ask BuildMitr','sparkles',`<p>Ask anything about your projects, money, material, labour and team — in plain words. It answers only from data you can see, and can fill forms for you to check and save.</p>
  <div class="ag-sugg">${['Status of all projects','Which tasks are late?','How much did we spend this month?','Who was absent yesterday?','Which materials are low?','Client dues'].map(q=>`<button class="btn sm" data-agask="${esc(q)}">${esc(q)}</button>`).join('')}</div>
  <div class="srow"><button class="btn pri" data-agask="">${ico('sparkles')}<span>Open the assistant</span></button></div>`);

/* ---- 23. Owner daily brief ---- */
function agBriefText(){const t=today(),ps=agScope();const L=[`*${orgName()} — ${fd(t)}*`];let inT=0,outT=0;
  ps.forEach(p=>{const r=D.dpr.find(x=>x.project===p.id&&x.date===t);const crew=r?crewTot(r.crew):0;const att=D.attendance.filter(a=>a.project===p.id&&a.date===t&&a.status!=='Absent').length+D.vlabour.filter(v=>v.project===p.id&&v.date===t).reduce((s,v)=>s+n(v.count),0);
    const mon=canMoney();const pin=!mon?0:D.payments.filter(x=>x.project===p.id&&x.date===t&&x.dir==='Received from client').reduce((s,x)=>s+n(x.amount),0),pout=!mon?0:D.payments.filter(x=>x.project===p.id&&x.date===t&&x.dir!=='Received from client').reduce((s,x)=>s+n(x.amount),0);inT+=pin;outT+=pout;
    const late=D.tasks.filter(x=>x.project===p.id&&!agDone(x)&&x.due&&x.due<t).length,iss=D.issues.filter(x=>x.project===p.id&&x.status!=='Resolved'&&x.severity==='High').length;
    const low=stock().filter(s=>s.project===p.id&&s.received>0&&s.store<=s.received*0.1).map(s=>s.material);const req=D.requests.filter(x=>x.project===p.id&&x.status==='Pending').length;
    const pr=agTaskProg(p.id);
    const bits=[r?`Report ✓ (${dprItems(r).map(x=>x.trade).filter((v,i,a)=>a.indexOf(v)===i).join(', ')||'notes'})`:'No daily report yet',`Labour ${num(Math.max(crew,att))}`,pr!=null?`Progress ${pr}%`:'',pin?`Received ${inr(pin)}`:'',pout?`Paid ${inr(pout)}`:'',late?`${late} late tasks`:'',iss?`${iss} urgent issues`:'',low.length?`Low: ${low.slice(0,3).join(', ')}`:'',req?`${req} material requests waiting`:''].filter(Boolean);
    L.push(`\n*${pname(p.id)}*\n${bits.join(' · ')}`);});
  if(canMoney())L.push(`\nMoney today: in ${inr(inT)} · out ${inr(outT)}`);return L.join('\n');}
AG_UI.brief=()=>{const base=agBriefText();const j=AG.raw.brief;const txt=j&&j.text?j.text:base;const me=tmOf(ME.id)||{};
  return agBox('Today\'s brief','sunrise',`${agTxt(txt)}${agShare(txt,AG.inp.briefMe==='1'?me.phone:'')}
    <div class="ag-form">${agLang('briefLang')}</div><div class="srow">${agGo('brief','Rewrite short in this language (AI)')}${j?`<button class="btn sm" data-agreset="brief">Show the original</button>`:''}</div>${agBusy('brief')}${AG.res.brief||''}
    <p class="ag-m">Made from today's daily reports, attendance, payments, tasks, issues and stock. Open this page each evening, or forward it to partners.</p>`);};
AG_RUN.brief=()=>agRun('brief',async()=>agAI('brief',{input:'Language: '+LANGN[agVal('briefLang','en')],data:{brief:agBriefText()}}));

/* ---- 24. Client update ---- */
function agClientData(pid){const t=today(),from=agAdd(t,-7);const rs=D.dpr.filter(r=>r.project===pid&&r.date>=from).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  const last=D.dpr.filter(r=>r.project===pid).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0];
  const next=D.milestones.filter(m=>m.project===pid).map(m=>({m,tk:m.task&&D.tasks.find(x=>x.id===m.task)})).filter(x=>!(x.tk&&agDone(x.tk))&&!(x.m.due&&x.m.due<t)).sort((a,b)=>String(a.m.due||'9').localeCompare(String(b.m.due||'9')))[0];
  return {project:pname(pid),client:(agClient(pid)||{}).name||'',week_work:rs.flatMap(r=>dprItems(r).map(x=>`${fd(r.date)} ${x.trade}: ${x.work}`)).slice(0,40),photos_this_week:rs.reduce((s,r)=>s+dprPhotos(r).length,0),progress_pct:agTaskProg(pid),next_week_plan:last?dprPlan(last).map(x=>x.trade+': '+x.work):[],next_payment_stage:next?next.m.stage:'',company:orgName()};}
function agClientTxt(d){return [`Dear ${firstName(d.client)||'Sir/Madam'},`,`Here is this week's update for ${d.project}:`,...(d.week_work.length?d.week_work.slice(-8).map(x=>'• '+x):['• Work is in progress as planned.']),d.progress_pct!=null?`Overall progress: ${d.progress_pct}%`:'',d.next_week_plan.length?`Next: ${d.next_week_plan.join('; ')}`:'',d.next_payment_stage?`Next payment stage: ${d.next_payment_stage}`:'',d.photos_this_week?`${d.photos_this_week} new site photos are in your BuildMitr app.`:'',`You are welcome to visit the site any time. Call us for any questions.`,`— ${d.company}`].filter(Boolean).join('\n');}
AG_UI.client=()=>{const pid=agP();if(!pid)return agEmpty('send','No projects yet');const d=agClientData(pid);const j=AG.raw.client;const txt=j&&j.text&&AG.inp._cpid===pid?j.text:agClientTxt(d);const c=agClient(pid);
  return agBox('Weekly update for the client','send',`<div class="ag-form">${agPick()}${agLang('cLang')}</div>${agTxt(txt)}${agShare(txt,c&&c.phone)}
    <div class="srow">${agGo('client','Write it nicely in this language (AI)')}</div>${agBusy('client')}${AG.res.client||''}${!c||!c.phone?'<p class="ag-m">Add the client\'s phone in Clients to send it straight to them.</p>':''}`);};
AG_RUN.client=()=>agRun('client',async()=>{const pid=agP();AG.inp._cpid=pid;return agAI('client',{input:'Language: '+LANGN[agVal('cLang','en')],data:agClientData(pid)});});

/* ================= taps and typing ================= */
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-agopen],[data-agback],[data-agrun],[data-agrec],[data-agadel],[data-agfdel],[data-agdpr],[data-agissue],[data-agprog],[data-agreq],[data-agrecv],[data-agquote],[data-agboqadd],[data-agcsv],[data-agco],[data-agbill],[data-agsup],[data-agschedadd],[data-agask],[data-agcopy],[data-agreset]');
  if(!b||S.view!=='agents')return;const d=b.dataset;e.preventDefault();
  if(d.agopen){AG.cur=d.agopen;AG.p='';scrollTo(0,0);render();return;}
  if(d.agback){AG.cur=null;render();return;}
  if(d.agrun){(AG_RUN[d.agrun]||(()=>{}))();return;}
  if(d.agrec){agRecord();return;}
  if(d.agadel){AG.audio=null;render();return;}
  if(d.agfdel){const[k,i]=d.agfdel.split(':');(AG.media[k]||[]).splice(+i,1);render();return;}
  if(d.agdpr){agDprForm();return;}
  if(d.agissue){const[s,i]=d.agissue.split(':');agIssue(s,+i);return;}
  if(d.agprog){const[id,p]=d.agprog.split(':');const t=D.tasks.find(x=>x.id===id);if(!t||!confirm(`Set “${t.title}” to ${p}%?`))return;const ok=await write(()=>db.doc('tasks/'+id).update({progress:+p,...(t.status==='Not started'&&+p>0?{status:'In progress'}:{})}),`${t.title}: ${p}%`);if(ok){audit('updated','tasks',id,`${t.title}: progress ${p}% (Photo Progress Agent)`);render();}return;}
  if(d.agreq){const[pid,mat,unit,q]=d.agreq.split('|');openForm('requests',null,{kind:'Request from site',project:pid,date:today(),material:mat,unit,qty:+q,needBy:agAdd(today(),3),status:'Pending'});return;}
  if(d.agrecv){agRecv(+d.agrecv);return;}
  if(d.agquote){agQuote();return;}
  if(d.agboqadd){agBoqAdd();return;}
  if(d.agcsv){agCsv(d.agcsv);return;}
  if(d.agco){agCo(+d.agco);return;}
  if(d.agbill){agBill(d.agbill);return;}
  if(d.agsup){agSup(d.agsup);return;}
  if(d.agschedadd){agSchedAdd();return;}
  if(d.agask!==undefined){aiOpen(true);if(d.agask){const ta=document.getElementById('aiText');if(ta){ta.value=d.agask;}}return;}
  if(d.agcopy){const p=b.closest('.box').querySelector('[data-agtext]');const tx=p?p.textContent:'';try{await navigator.clipboard.writeText(tx);toast('Copied');}catch(_){toast('Could not copy');}return;}
  if(d.agreset){AG.raw[d.agreset]=null;render();return;}
},true);
document.addEventListener('change',async e=>{const el=e.target;if(S.view!=='agents'||!el.closest)return;
  if(el.dataset.agproj!==undefined){AG.p=el.value;render();return;}
  if(el.dataset.agin){AG.inp[el.dataset.agin]=el.value;if(el.tagName==='SELECT'||['qArea','qRate','qExtra'].includes(el.dataset.agin))setTimeout(()=>{const a=document.activeElement,k=a&&a.dataset&&a.dataset.agin;render();if(k){const x=document.querySelector(`[data-agin="${k}"]`);if(x&&x.focus)x.focus();}},0);return;}
  if(el.dataset.agfile){const k=el.dataset.agfile;AG.media[k]=AG.media[k]||[];const mx=k==='dpr'&&AG.audio?5:6;for(const f of [...el.files].slice(0,6)){if(AG.media[k].length>=mx){toast(`Up to ${mx} files`);break;}try{AG.media[k].push(await agShrink(f));}catch(x){toast(x.message);}}render();}
},true);
document.addEventListener('input',e=>{const el=e.target;if(S.view!=='agents'||!el.dataset||!el.dataset.agin)return;AG.inp[el.dataset.agin]=el.value;},true);
if(typeof S!=='undefined'&&S.view==='agents'&&S.ready)render();
