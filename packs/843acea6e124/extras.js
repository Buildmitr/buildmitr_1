/* bm-build:843acea6e124 */
/* BuildMitr page code: extras */
function waLink(k,r){return 'https://wa.me/?text='+encodeURIComponent(waText(k,r));}
async function convertLead(id){
  if(S.demo){toast('In your real data this creates the client and opens a new project form.');return;}
  const l=D.leads.find(x=>x.id===id);if(!l)return;
  let c=D.clients.find(x=>x.phone&&waNum(x.phone)===waNum(l.phone));
  if(!c){const ok=await write(async()=>{const ref=await db.collection('clients').add({name:l.name,phone:l.phone,address:l.place||'',by:ME.id,at:Date.now()});c={id:ref.id};});if(!ok)return;}
  openForm('projects',null,{name:`${l.name} – ${l.need||'Project'}`,client:c.id,address:l.place||'',description:[l.need,l.size,l.budget?'Budget '+inr(l.budget):''].filter(Boolean).join(' · '),_lead:l.id});
  toast('Client added. Fill the project details and save.');
}
async function findPlace(){
  const q=(document.getElementById('locSearch')||{}).value||'';if(!q.trim())return;
  try{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&q=${encodeURIComponent(q)}`,{headers:{'Accept-Language':'en'}});
    const j=await r.json();if(!j.length){toast('Place not found. Try a nearby landmark or area name.');return;}
    MAP.setView([+j[0].lat,+j[0].lon],17);MAP._place(+j[0].lat,+j[0].lon,true);}
  catch(e){toast('Search is not reachable right now. Tap the map instead.');}
}
function vAttBulk(){
  const ps=PJ();if(!ps.length)return header(label('attbulk'))+`<div class="box empty">Create a project first.</div>`;
  ATT.pid=S.proj!=='all'&&projOK(S.proj)?S.proj:(ATT.pid&&projOK(ATT.pid)?ATT.pid:ps[0].id);ATT.date=ATT.date||today();
  const workers=D.labour.filter(l=>l.project===ATT.pid||!l.project).concat(S.attAll?D.labour.filter(l=>l.project&&l.project!==ATT.pid):[]);
  const ex=D.attendance.filter(a=>a.project===ATT.pid&&a.date===ATT.date);
  workers.forEach(w=>{const e=ex.find(a=>a.labour===w.id);if(!(w.id in ATT.marks)){ATT.marks[w.id]=e?e.status:'';ATT.ot[w.id]=e&&e.ot?e.ot:'';}});
  const cnt=s=>workers.filter(w=>ATT.marks[w.id]===s).length;
  const pay=workers.reduce((s,w)=>s+(ATT.marks[w.id]==='Present'?1:ATT.marks[w.id]==='Half day'?.5:0)*n(w.wage)+n(ATT.ot[w.id])*n(w.wage)/8,0);
  return header(label('attbulk'),CANW?`<button class="btn" data-add="labour">${ico('plus')}Add worker</button>`:'')+
  `<div class="box"><div class="filters"><label class="code" style="display:flex;gap:6px;align-items:center">Project<select id="att-proj">${ps.map(p=>`<option value="${p.id}" ${p.id===ATT.pid?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label class="code" style="display:flex;gap:6px;align-items:center">Date<input type="date" id="att-date" value="${ATT.date}" style="width:auto"></label>
    <button class="btn sm" data-attall="1">${ATT.pid&&S.attAll?'Only this project\'s workers':'Show workers from other sites'}</button>
    <span class="code" style="margin-left:auto">${cnt('Present')} present · ${cnt('Half day')} half · ${cnt('Absent')} absent · wages ${inr(pay)}</span></div>
  ${workers.length?`<div style="padding:10px 16px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-attallset="Present">All present</button><button class="btn sm" data-attallset="">Clear</button></div>
  <div class="tbl-wrap"><table><tbody>${workers.map(w=>`<tr><td><b>${esc(w.name)}</b><div class="code">${esc(w.trade||'')}${w.wage?' · '+inr(w.wage)+'/day':''}</div></td>
    <td><div class="seg">${[['Present','P'],['Half day','½'],['Absent','A']].map(([v,l])=>`<button type="button" class="${ATT.marks[w.id]===v?'on '+(v==='Present'?'yes':v==='Absent'?'no':'na'):''}" data-attmark="${w.id}" data-v="${v}" aria-label="${v}">${l}</button>`).join('')}</div></td>
    <td style="width:110px"><input data-attot="${w.id}" value="${esc(ATT.ot[w.id]||'')}" placeholder="OT hrs" inputmode="decimal"></td></tr>`).join('')}</tbody></table></div>
  <div style="padding:12px 16px;display:flex;gap:10px;justify-content:flex-end">${CANW?`<button class="btn pri" id="attSave">${ico('check')}Save attendance</button>`:''}</div>`
  :`<div class="hero-empty">${ico('hard-hat')}<h2>No workers yet</h2><p>Add your workers under Labour (name, trade, daily wage, current project). Then mark everyone here in a few taps.</p></div>`}</div>`;
}
async function saveAttBulk(){
  if(S.demo){toast('Exit the demo to save real attendance.');return;}
  const ex=D.attendance.filter(a=>a.project===ATT.pid&&a.date===ATT.date);let c=0;
  for(const [wid,st] of Object.entries(ATT.marks)){
    const e=ex.find(a=>a.labour===wid);const ot=n(ATT.ot[wid]);
    if(!st&&!e)continue;
    const ok=e?(st?await write(()=>db.doc('attendance/'+e.id).update({status:st,ot})):await write(()=>db.doc('attendance/'+e.id).delete()))
             :await write(()=>db.collection('attendance').add({project:ATT.pid,date:ATT.date,labour:wid,status:st,ot,by:ME.id,at:Date.now()}));
    if(!ok)return;c++;
  }
  audit('saved',`attendance`,ATT.pid,`${c} workers on ${ATT.date}`);toast(`Attendance saved for ${c} workers`);ATT.marks={};ATT.ot={};render();
}
function vAudit(){
  const q=S.q.toLowerCase();
  const all=D.audit.slice().sort((a,b)=>(b.at||0)-(a.at||0)),days=+S.audD||0;
  const fl=all.filter(r=>(!q||JSON.stringify(r).toLowerCase().includes(q)||nm(r.by).toLowerCase().includes(q))&&(!S.audBy||r.by===S.audBy)&&(!S.audCol||r.col===S.audCol)&&(!S.audAct||r.action===S.audAct)&&(!days||Date.now()-(+r.at||0)<days*864e5));
  const rows=fl.slice(0,300),opt=(v,l,cur)=>`<option value="${esc(v)}" ${v===cur?'selected':''}>${esc(l)}</option>`;
  const ppl=[...new Set(all.map(r=>r.by).filter(Boolean))].sort((a,b)=>nm(a).localeCompare(nm(b))),cols=[...new Set(all.map(r=>r.col).filter(Boolean))].sort(),acts=[...new Set(all.map(r=>r.action).filter(Boolean))].sort();
  return header('Change history',`<button type="button" class="btn" data-audcsv>${ico('download')}<span>Download CSV</span></button>`)+`<div class="box"><div class="filters"><input id="q" placeholder="Search by person, section or text" value="${esc(S.q)}" aria-label="Search">
    <select data-audf="audBy" aria-label="Person" style="width:auto">${opt('','Everyone',S.audBy||'')}${ppl.map(x=>opt(x,nm(x),S.audBy)).join('')}</select>
    <select data-audf="audCol" aria-label="Section" style="width:auto">${opt('','All sections',S.audCol||'')}${cols.map(x=>opt(x,MOD[x]?MOD[x].label:x,S.audCol)).join('')}</select>
    <select data-audf="audAct" aria-label="Action" style="width:auto">${opt('','All actions',S.audAct||'')}${acts.map(x=>opt(x,x,S.audAct)).join('')}</select>
    <select data-audf="audD" aria-label="Period" style="width:auto">${[['','Any time'],['1','Last 24 hours'],['7','Last 7 days'],['30','Last 30 days']].map(([v,l])=>opt(v,l,S.audD||'')).join('')}</select>
    <span class="code" style="margin-left:auto;align-self:center">${fl.length>rows.length?`Showing ${rows.length} of ${fl.length}`:`${rows.length} change${rows.length===1?'':'s'}`}</span></div>
  ${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Section</th><th>Details</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="code">${new Date(r.at).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</td><td>${esc(nm(r.by))}</td><td><span class="pill ${r.action==='deleted'?'p-red':r.action==='approved'?'p-green':r.action==='created'?'p-blue':'p-grey'}">${esc(r.action)}</span></td><td>${esc(MOD[r.col]?MOD[r.col].label:r.col)}</td><td>${esc(r.summary)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No changes recorded yet. Every add, edit, delete, approval and access change will appear here.</div>'}</div>
  <div class="code">Only the admin and editors can see this history.</div>`;
}
PK.done("extras");
