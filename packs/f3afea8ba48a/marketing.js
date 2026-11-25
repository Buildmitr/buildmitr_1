/* bm-build:f3afea8ba48a */
/* BuildMitr page code: marketing */
function vPipeline(){
  const q=S.q.toLowerCase();
  const ls=D.leads.filter(l=>(!S.fbranch||l.branch===S.fbranch)&&(!q||[l.name,l.phone,l.place,l.source].join(' ').toLowerCase().includes(q)));
  const val=st=>ls.filter(l=>l.stage===st).reduce((s,l)=>s+n(l.budget),0);
  return header(label('pipeline'),CANW?`<button class="btn" data-go="leadimp">${ico('file-up')}Import leads</button><button class="btn pri" data-add="leads">${ico('plus')}New lead</button>`:'')+
  `<div class="filters" style="padding:0"><input id="q" placeholder="Search name, phone, place" value="${esc(S.q)}" aria-label="Search"><select id="fbranch" style="width:auto"><option value="">All branches</option>${BRANCHES.map(b=>`<option ${S.fbranch===b?'selected':''}>${b}</option>`).join('')}</select></div>
  <div class="board">${STAGES_L.map(st=>{const xs=ls.filter(l=>(l.stage||'New')===st).sort((a,b)=>(a.follow||'9').localeCompare(b.follow||'9'));
    return `<div class="bcol" data-dropstage="${st}"><div class="bcol-h"><b>${st}</b><span class="code">${xs.length}${val(st)?' · '+inrShort(val(st)):''}</span></div>
    ${xs.map(l=>`<div class="bcard" draggable="${CANW}" data-dragl="${l.id}"><b>${esc(l.name)}</b><div class="code">${esc(l.need||'')}${l.size?' · '+esc(l.size):''}</div>
      <div class="code">${esc(l.place||'')}${l.branch?' · '+esc(l.branch):''}${l.source?' · '+esc(l.source):''}</div>
      ${l.budget?`<div><b>${inrShort(l.budget)}</b></div>`:''}${l.follow?`<div class="code" style="color:${l.follow<=today()&&!['Won','Lost'].includes(st)?'var(--red-ink)':'inherit'}">Follow-up ${fd(l.follow)}</div>`:''}
      ${st==='Lost'&&l.lostReason?`<div class="pill p-grey">${esc(l.lostReason)}</div>`:''}
      <div class="bcard-a">${l.phone?`<a class="btn sm ghost" href="${esc(waTo(l.phone,tplText(st==='New'?'First reply':'Quotation follow-up',{name:firstName(l.name)})))}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${ico('message-circle')}</a>`:''}
        ${CANW?`${STAGES_L.indexOf(st)>0?`<button class="btn sm ghost" data-lmove="${l.id}:-1" aria-label="Move back">◀</button>`:''}${STAGES_L.indexOf(st)<STAGES_L.length-1?`<button class="btn sm ghost" data-lmove="${l.id}:1" aria-label="Move forward">▶</button>`:''}<button class="btn sm ghost" data-edit="leads:${l.id}" aria-label="Edit">${ico('pencil')}</button>`:''}</div></div>`).join('')||'<div class="code" style="padding:8px">—</div>'}</div>`;}).join('')}</div>
  <div class="code">Drag a card to another column, or use ◀ ▶. Moving to Lost asks for the reason.</div>`;
}
function vFollowups(){
  const qx=followQueue();
  return header(label('followups'))+`<div class="note">${ico('info')}<span>Every new lead gets a first reply, then follow-ups on day 1, 3, 7 and 15 after first contact. Tap <b>Send</b> to open WhatsApp with the message ready, then tap <b>Done</b> so the next step is scheduled. Edit the wording under WhatsApp templates.</span></div>
  <div class="box">${qx.length?qx.map((o,i)=>{const v=o.visit;const txt=tplText(o.kind,{name:firstName(o.l.name),date:v?fd(v.date):'',time:v?v.time||'':'',place:v?v.place||o.l.place||'':'',who:v?nm(v.who):''});
    return `<div class="fu"><div style="flex:1;min-width:220px"><b>${esc(o.l.name)}</b> <span class="code">${esc(o.l.phone||'')} · ${esc(o.l.stage||'New')}</span><div class="code" style="color:${o.due<today()?'var(--red-ink)':'inherit'}">${esc(o.why)} · due ${fd(o.due)}</div>
      <details><summary class="code" style="cursor:pointer">Message (${esc(o.kind)})</summary><div class="fu-msg">${esc(txt)}</div></details></div>
      ${o.l.phone?`<a class="btn sm pri" href="${esc(waTo(o.l.phone,txt))}" target="_blank" rel="noopener noreferrer">${ico('message-circle')}Send</a>`:'<span class="code">no phone</span>'}
      ${CANW?`<button class="btn sm" data-fudone="${o.l.id}|${o.kind}|${o.step||''}">${ico('check')}Done</button>`:''}</div>`;}).join('')
  :`<div class="hero-empty">${ico('check')}<h2>No follow-ups due</h2><p>All leads are up to date.</p></div>`}</div>`;
}
async function followDone(id,kind,step){
  const l=D.leads.find(x=>x.id===id);if(!l)return;const upd={};
  if(kind==='First reply'){upd.stage='Contacted';upd.contacted=l.contacted||Date.now();upd.seqStart=l.seqStart||today();upd.follow=addDays(today(),1);}
  else if(step){const seq=[...new Set([...(l.seq||[]),+step])];upd.seq=seq;const nx=SEQ.find(d=>!seq.includes(d));upd.follow=nx?addDays(l.seqStart||today(),nx):'';}
  else upd.follow=addDays(today(),3);
  const ok=await write(()=>db.doc('leads/'+id).update(upd),'Marked done');if(ok)audit('edited','leads',id,`${l.name}: ${kind} sent`);
}
function vEstimator(){return (EST.mode||'detail')==='quick'?vEstQuick():vEstDetailed();}
function vEstQuick(){
  const pk=D.packages.slice().sort((a,b)=>n(a.rate)-n(b.rate));
  if(!pk.length)return header(label('estimator'),estModeBtns())+`<div class="box hero-empty">${ico('calculator')}<h2>Add your packages first</h2><p>Create Basic, Standard and Premium packages with their rate per sq.ft and specifications. Then build estimates in seconds.</p>${CANW?`<button class="btn pri" data-add="packages">${ico('plus')}Add package</button>`:''}</div>`;
  if(!EST.pkg||!pk.find(p=>p.id===EST.pkg))EST.pkg=pk[Math.min(1,pk.length-1)].id;
  const p=pk.find(x=>x.id===EST.pkg);const area=n(EST.area);
  const base=area*n(p.rate);const ex=EXTRAS.map(([nm_,u,r],i)=>{const q=n(EST.extras[i]);return {nm:nm_,u,r,q,amt:q*r};}).filter(x=>x.q);
  const sub=base+ex.reduce((s,x)=>s+x.amt,0);const gst=EST.gst?sub*0.18:0;
  return header(label('estimator'),estModeBtns())+`<div class="grid2"><div class="box"><div class="box-h"><h2>Customer & house</h2></div><div class="fhead">
    <label>Lead<select id="est-lead"><option value="">— optional —</option>${D.leads.filter(l=>!['Lost'].includes(l.stage)).map(l=>`<option value="${l.id}" ${EST.lead===l.id?'selected':''}>${esc(l.name)}</option>`).join('')}</select></label>
    <label>Package<select id="est-pkg">${pk.map(x=>`<option value="${x.id}" ${x.id===EST.pkg?'selected':''}>${esc(x.name)} — ${inr(x.rate)}/sq.ft</option>`).join('')}</select></label>
    <label>Built-up area (sq.ft)<input id="est-area" inputmode="decimal" value="${esc(EST.area)}" placeholder="e.g. 2400"></label>
    <label>Floors<select id="est-floors">${['G','G+1','G+2','G+3','G+4'].map(f=>`<option ${EST.floors===f?'selected':''}>${f}</option>`).join('')}</select></label>
    <label style="flex-direction:row;display:flex;gap:8px;align-items:center"><input type="checkbox" id="est-gst" ${EST.gst?'checked':''} style="width:auto">Add GST 18%</label></div>
    <div class="box-h"><h2>Extras</h2></div><div class="tbl-wrap"><table><tbody>${EXTRAS.map(([nm_,u,r],i)=>`<tr><td>${esc(nm_)}<div class="code">${inr(r)} / ${u}</div></td><td style="width:110px"><input data-estx="${i}" value="${esc(EST.extras[i]||'')}" placeholder="${u}" inputmode="decimal"></td></tr>`).join('')}</tbody></table></div></div>
  <div class="box"><div class="box-h"><h2>Estimate</h2></div>
    <div class="tbl-wrap"><table><tbody><tr><td>${esc(p.name)} package · ${num(area)} sq.ft × ${inr(p.rate)}</td><td class="num">${inr(base)}</td></tr>
    ${ex.map(x=>`<tr><td>${esc(x.nm)} · ${num(x.q)} ${x.u}</td><td class="num">${inr(x.amt)}</td></tr>`).join('')}
    <tr><td><b>Sub-total</b></td><td class="num"><b>${inr(sub)}</b></td></tr>${EST.gst?`<tr><td>GST 18%</td><td class="num">${inr(gst)}</td></tr>`:''}
    <tr><td><b style="font-size:16px">Total estimate</b></td><td class="num"><b style="font-size:18px">${inr(sub+gst)}</b></td></tr>${area?`<tr><td class="code">All-in rate</td><td class="num code">${inr((sub+gst)/area)}/sq.ft</td></tr>`:''}</tbody></table></div>
    ${p.specs?`<div style="padding:10px 16px"><div class="code">WHAT'S INCLUDED (${esc(p.name)})</div><div style="white-space:pre-wrap;font-size:13.5px">${esc(p.specs)}</div></div>`:''}
    <div style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap">${area?`<button class="btn" id="estDoc">${ico('file-down')}Download estimate</button>
      ${(()=>{const l=D.leads.find(x=>x.id===EST.lead);return l&&l.phone?`<a class="btn pri" href="${esc(waTo(l.phone,tplText('Estimate',{name:firstName(l.name),area:num(area),package:p.name,amount:inr(sub+gst)})))}" target="_blank" rel="noopener noreferrer">${ico('message-circle')}Send on WhatsApp</a>`:'';})()}
      ${EST.lead&&CANW?`<button class="btn" id="estSave">${ico('check')}Save to lead</button>`:''}${canView('invoices')&&EST.lead&&CANW?`<button class="btn" id="estQuote">${ico('receipt')}Make quotation</button>`:''}`:'<span class="code">Enter the built-up area to see the estimate.</span>'}</div></div></div>`;
}
async function estDoc(){
  const c=estCalc();const l=D.leads.find(x=>x.id===EST.lead)||{};const e=esc;const org=D.org.find(o=>o.id==='main')||{};
  const rows=[[`${c.p.name} package — ${num(c.area)} sq.ft × ${inr(c.p.rate)}`,c.base],...EXTRAS.map(([nm_,u,r],i)=>n(EST.extras[i])?[`${nm_} — ${num(EST.extras[i])} ${u} × ${inr(r)}`,n(EST.extras[i])*r]:null).filter(Boolean)];
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Estimate ${e(l.name||'')}</title><style>body{font-family:Segoe UI,Arial,sans-serif;max-width:760px;margin:30px auto;padding:0 22px;color:#1a2420}h1{margin:0;font-size:22px}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border:1px solid #ccd6d1;padding:8px}.n{text-align:right}.muted{color:#5d6c66}</style></head><body>
  <h1>${e(org.name||orgName())}</h1><div class="muted">${e(org.address||'')}</div><h2>Construction estimate</h2>
  <p>For: <b>${e(l.name||'')}</b> ${l.place?'· '+e(l.place):''}<br>Date: ${fd(today())} · Floors: ${e(EST.floors)} · Valid for 30 days</p>
  <table>${rows.map(([d,a])=>`<tr><td>${e(d)}</td><td class="n">${inr(a)}</td></tr>`).join('')}<tr><td><b>Sub-total</b></td><td class="n"><b>${inr(c.sub)}</b></td></tr>${EST.gst?`<tr><td>GST 18%</td><td class="n">${inr(c.gst)}</td></tr>`:''}<tr><td><b>Total</b></td><td class="n"><b>${inr(c.total)}</b></td></tr></table>
  ${c.p.specs?`<h3>What's included</h3><div style="white-space:pre-wrap">${e(c.p.specs)}</div>`:''}<p class="muted">This is an estimate; the final quotation follows the approved drawings and site survey. Open this file and press Ctrl+P → Save as PDF to share.</p></body></html>`;
  await saveFile(`Estimate-${(l.name||'customer').replace(/[^\w-]+/g,'-')}.html`,new Blob([html],{type:'text/html'}));
}
function vContent(){
  const ps=PJ().filter(p=>S.proj==='all'||p.id===S.proj);const ids=new Set(ps.map(p=>p.id));
  const items=[];
  D.dpr.filter(d=>ids.has(d.project)).forEach(d=>(d.photos||[]).forEach(a=>items.push({a,p:d.project,date:d.date,src:'Daily report'})));
  D.workupd.filter(d=>ids.has(d.project)).forEach(d=>(d.photos||[]).forEach(a=>items.push({a,p:d.project,date:d.date,src:'Work update: '+(d.work||'')})));
  D.forms.filter(d=>ids.has(d.project)).forEach(d=>(d.photos||[]).forEach(a=>items.push({a,p:d.project,date:isoDate(new Date(d.upd||Date.now())),src:'Checklist: '+(d.title||'')})));
  D.portfolio.filter(d=>ids.has(d.project)).forEach(d=>(d.photos||[]).forEach(a=>items.push({a,p:d.project,date:'',src:'Portfolio'})));
  const flag=a=>D.cflags.find(c=>c.id===a);
  const shown=items.filter(x=>!S.cpub||(flag(x.a)||{}).ok);
  return header(label('content'))+`<div class="note">${ico('shield')}<span>All site photos from daily reports, work updates and checklists in one place. Mark a photo <b>OK for public use</b> only after the client has agreed — those are the ones your team may post on Instagram, Facebook or the website.</span></div>
  <div class="filters" style="padding:0"><label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="cpub" ${S.cpub?'checked':''} style="width:auto">Show only approved for public use</label><span class="code" style="margin-left:auto">${shown.length} photos</span></div>
  ${shown.length?`<div class="cgrid">${shown.map(x=>{const f=flag(x.a);return `<div class="citem"><a href="/_blob/${esc(x.a)}" target="_blank" rel="noopener"><img src="/_blob/${esc(x.a)}" alt="${esc(x.src)}" loading="lazy"></a>
    <div class="code">${esc(pname(x.p))}${x.date?' · '+fd(x.date):''}</div><div class="code" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(x.src)}</div>
    ${f&&f.ok?`<span class="pill p-green">OK for public use</span>`:'<span class="pill p-grey">Internal only</span>'}${CANW?`<button class="btn sm" data-cflag="${x.a}">${f&&f.ok?'Make internal':'Mark OK for public'}</button>`:''}</div>`;}).join('')}</div>`
  :`<div class="box hero-empty">${ico('image')}<h2>No photos yet</h2><p>Photos added to daily reports, work updates and checklists appear here automatically.</p></div>`}`;
}
function vMktDash(){
  const t=today(),mo=t.slice(0,7);const L=D.leads.filter(l=>!S.fbranch||l.branch===S.fbranch);
  const thisMo=L.filter(l=>isoDate(new Date(l.at||0)).startsWith(mo));
  const won=L.filter(l=>l.stage==='Won'),wonMo=won.filter(l=>String(l.wonAt?isoDate(new Date(l.wonAt)):isoDate(new Date(l.at||0))).startsWith(mo));
  const spendMo=D.campaigns.filter(c=>(!S.fbranch||c.branch===S.fbranch)&&(c.start||'')<=t&&(!c.end||c.end>=mo+'-01')).reduce((s,c)=>s+n(c.spend),0);
  const resp=L.filter(l=>l.contacted&&l.at).map(l=>(l.contacted-l.at)/36e5);const avgResp=resp.length?resp.reduce((s,v)=>s+v,0)/resp.length:0;
  const funnel=STAGES_L.filter(s=>s!=='Lost').map((st,i,arr)=>({st,c:L.filter(l=>STAGES_L.indexOf(l.stage||'New')>=STAGES_L.indexOf(st)&&l.stage!=='Lost'||(l.stage==='Lost'&&STAGES_L.indexOf(l.lostAt||'New')>=STAGES_L.indexOf(st))).length}));
  const bySrc={};L.forEach(l=>{const k=l.source||'Unknown';bySrc[k]=bySrc[k]||{n:0,w:0};bySrc[k].n++;if(l.stage==='Won')bySrc[k].w++;});
  const srcMax=Math.max(1,...Object.values(bySrc).map(x=>x.n));
  const byBr={};L.forEach(l=>{const k=l.branch||'—';byBr[k]=(byBr[k]||0)+1;});
  const lost={};L.filter(l=>l.stage==='Lost').forEach(l=>{const k=l.lostReason||'Not given';lost[k]=(lost[k]||0)+1;});
  const camp=D.campaigns.map(c=>campStats(c)).sort((a,b)=>b.won-a.won||b.leads-a.leads);
  return header(label('mktdash'),`<select id="fbranch" style="width:auto"><option value="">All branches</option>${BRANCHES.map(b=>`<option ${S.fbranch===b?'selected':''}>${b}</option>`).join('')}</select>`)+
  `<div class="box tiles"><div class="tile"><b>${thisMo.length}</b><span>New leads this month</span></div><div class="tile"><b>${wonMo.length}</b><span>Bookings this month</span></div>
   <div class="tile"><b>${L.length?Math.round(won.length/L.length*100):0}%</b><span>Lead → booking</span></div><div class="tile"><b>${resp.length?(avgResp<1?Math.round(avgResp*60)+' min':avgResp.toFixed(1)+' hrs'):'—'}</b><span>Avg first response</span></div>
   <div class="tile"><b>${followQueue().length}</b><span>Follow-ups due</span></div><div class="tile"><b>${D.visits.filter(v=>v.date===t).length}</b><span>Site visits today</span></div>
   ${canMoney()||curRole()==='Marketing'?`<div class="tile"><b>${inrShort(spendMo)}</b><span>Ad spend (active campaigns)</span></div><div class="tile"><b>${thisMo.length?inr(spendMo/thisMo.length):'—'}</b><span>Cost per lead</span></div>`:''}</div>
  <div class="grid2">
   <div class="box"><div class="box-h"><h2>Funnel</h2></div><div style="padding:12px 16px;display:grid;gap:8px">${funnel.map((f,i)=>`<div><div class="code" style="display:flex;justify-content:space-between"><span>${f.st}</span><span>${f.c}${i?` · ${funnel[0].c?Math.round(f.c/funnel[0].c*100):0}%`:''}</span></div><div class="prog" style="height:10px"><i style="width:${funnel[0].c?f.c/funnel[0].c*100:0}%"></i></div></div>`).join('')}</div></div>
   <div class="box"><div class="box-h"><h2>Leads by source</h2></div><div style="padding:12px 16px;display:grid;gap:8px">${Object.entries(bySrc).sort((a,b)=>b[1].n-a[1].n).map(([k,v])=>`<div><div class="code" style="display:flex;justify-content:space-between"><span>${esc(k)}</span><span>${v.n} leads · ${v.w} won</span></div><div class="prog" style="height:10px"><i style="width:${v.n/srcMax*100}%"></i></div></div>`).join('')||'<div class="code">No leads yet.</div>'}</div></div>
   <div class="box"><div class="box-h"><h2>Campaigns</h2><button class="btn sm" data-go="campaigns">Open</button></div>${camp.length?`<div class="tbl-wrap"><table><thead><tr><th>Campaign</th><th class="num">Leads</th><th class="num">Visits</th><th class="num">Won</th><th class="num">Cost / lead</th><th class="num">Cost / booking</th></tr></thead><tbody>${camp.map(c=>`<tr><td><b>${esc(c.c.name)}</b><div class="code">${esc(c.c.channel||'')}${c.c.branch?' · '+esc(c.c.branch):''}</div></td><td class="num">${c.leads}</td><td class="num">${c.visits}</td><td class="num">${c.won}</td><td class="num">${c.cpl?inr(c.cpl):'—'}</td><td class="num">${c.cpb?inr(c.cpb):'—'}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Add campaigns to track ad spend and results.</div>'}</div>
   <div class="box"><div class="box-h"><h2>Branches & lost reasons</h2></div><div style="padding:12px 16px;display:grid;gap:6px">${Object.entries(byBr).map(([k,v])=>`<div class="siteloc" style="padding:2px 0"><span style="flex:1">${esc(k)}</span><b>${v} leads</b></div>`).join('')}<div class="code" style="margin-top:8px">WHY WE LOST</div>${Object.entries(lost).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="siteloc" style="padding:2px 0"><span style="flex:1">${esc(k)}</span><b>${v}</b></div>`).join('')||'<div class="code">—</div>'}</div></div>
  </div>`;
}
function vLeadImp(){
  const map=LIMP.rows.length?leadMap(LIMP.rows[0]):null;
  return header(label('leadimp'))+`<div class="note">${ico('info')}<span>Download leads from <b>Meta Ads Manager → Leads Center → Download (CSV)</b>, <b>Google Ads → Lead form → Download</b>, your website form, or an expo list, and import them here. Duplicates (same phone) are skipped. Fully automatic capture needs the live backend.</span></div>
  <div class="box"><div class="fhead"><label>Source<select id="limp-src">${MOD.leads.fields.find(f=>f.k==='source').o.map(o=>`<option ${LIMP.src===o?'selected':''}>${o}</option>`).join('')}</select></label>
  <label>Branch<select id="limp-br"><option value="">—</option>${BRANCHES.map(b=>`<option>${b}</option>`).join('')}</select></label>
  <label class="drop-imp" for="limp-file" style="grid-column:1/-1">${ico('file-up')}<span><b>Choose the leads file</b> — CSV or Excel</span><input id="limp-file" type="file" accept=".csv,.xlsx,.xls" hidden></label></div>
  ${LIMP.rows.length?`<div style="padding:0 16px 14px"><div class="code">${LIMP.rows.length} rows · name ← <b>${esc(map.name||'?')}</b>, phone ← <b>${esc(map.phone||'?')}</b>, place ← ${esc(map.place||'—')}, campaign ← ${esc(map.campaign||'—')}</div>
    <div class="tbl-wrap" style="max-height:220px"><table><tbody>${LIMP.rows.slice(0,20).map(r=>`<tr><td>${esc(r[map.name]||'')}</td><td>${esc(r[map.phone]||'')}</td><td>${esc(r[map.place]||'')}</td><td>${esc(r[map.campaign]||'')}</td></tr>`).join('')}</tbody></table></div>
    ${CANW?`<button class="btn pri" id="limpGo" style="margin-top:10px">${ico('check')}Import ${LIMP.rows.length} leads</button>`:''}</div>`:''}</div>`;
}
function leadMap(r){const ks=Object.keys(r);const f=re=>ks.find(k=>re.test(k));
  return {name:f(/full.?name|^name|customer|client/i),phone:f(/phone|mobile|whatsapp|contact/i),email:f(/mail/i),place:f(/city|location|area|place|address/i),campaign:f(/campaign/i),need:f(/requirement|need|service|looking|plot|what/i),budget:f(/budget/i),date:f(/created|date|time/i)};}
async function runLeadImport(){
  if(S.demo){toast('Exit the demo to import real leads.');return;}
  const m=leadMap(LIMP.rows[0]);const br=(document.getElementById('limp-br')||{}).value||'';let add=0,skip=0;
  const phones=new Set(D.leads.map(l=>waNum(l.phone)));
  for(const r of LIMP.rows){const ph=String(r[m.phone]||'').replace(/^p:/,'');if(!ph||phones.has(waNum(ph))){skip++;continue;}
    let camp='';const cn=String(r[m.campaign]||'').trim();
    if(cn){let c=D.campaigns.find(x=>x.name.toLowerCase()===cn.toLowerCase());if(!c){let nid=null;await write(async()=>{const x=await db.collection('campaigns').add({name:cn,channel:LIMP.src,branch:br,start:today(),by:ME.id,at:Date.now()});nid=x.id;});c={id:nid,name:cn};D.campaigns.push(c);}camp=c.id;}
    const ok=await write(()=>db.collection('leads').add({name:String(r[m.name]||'Unknown').trim(),phone:ph,place:String(r[m.place]||''),need:'House construction',notes:[r[m.need],r[m.email]].filter(Boolean).join(' · '),budget:n(r[m.budget])||'',source:LIMP.src,campaign:camp,branch:br,stage:'New',follow:today(),by:ME.id,at:Date.now()}));
    if(!ok)break;phones.add(waNum(ph));add++;}
  audit('created','leads','',`Imported ${add} leads from ${LIMP.src}`);toast(`Imported ${add} leads${skip?`, ${skip} skipped (duplicate or no phone)`:''}`);LIMP.rows=[];S.view='pipeline';render();
}
async function portfolioDoc(id){
  const x=D.portfolio.find(r=>r.id===id);if(!x)return;const e=esc;const org=D.org.find(o=>o.id==='main')||{};
  const imgs=await Promise.all((x.photos||[]).slice(0,8).map(async a=>{try{const r=await bmBlob(a);const b=await r.blob();return await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(fr.result);fr.readAsDataURL(b);});}catch(_){return null;}}));
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(x.title)} — ${e(org.name||'')}</title><style>body{font-family:Segoe UI,Arial,sans-serif;margin:0;color:#1a2420}header{background:#1f3a2e;color:#fff;padding:28px 22px}h1{margin:0 0 6px}main{max-width:900px;margin:0 auto;padding:22px}.facts{display:flex;gap:22px;flex-wrap:wrap;margin:14px 0}.facts b{display:block;font-size:20px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}.g img{width:100%;border-radius:10px}blockquote{border-left:4px solid #2f6b4f;margin:18px 0;padding:6px 14px;font-style:italic}</style></head><body>
  <header><div style="opacity:.8">${e(org.name||'')}</div><h1>${e(x.title)}</h1><div>${e(x.location||'')}</div></header><main>
  <div class="facts">${x.type?`<div><b>${e(x.type)}</b>Type</div>`:''}${x.size?`<div><b>${num(x.size)} sq.ft</b>Built-up</div>`:''}${x.months?`<div><b>${num(x.months)} months</b>Completed in</div>`:''}</div>
  <p style="white-space:pre-wrap">${e(x.summary||'')}</p>${x.quote?`<blockquote>“${e(x.quote)}”${x.quoteBy?`<br>— ${e(x.quoteBy)}`:''}</blockquote>`:''}
  <div class="g">${imgs.filter(Boolean).map(s=>`<img src="${s}" alt="">`).join('')}</div>
  <p>${e(org.name||'')} · ${e(org.address||'')}${orgVal('website')?` · ${e(orgVal('website'))}`:''}</p></main></body></html>`;
  await saveFile(`${x.title.replace(/[^\w-]+/g,'-')}-portfolio.html`,new Blob([html],{type:'text/html'}));
}
async function readLeadFile(file){
  try{if(typeof XLSX==='undefined'){toast('Excel reader still loading — try again in a moment.');return;}
    const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellDates:true});const ws=wb.Sheets[wb.SheetNames[0]];
    LIMP.rows=XLSX.utils.sheet_to_json(ws,{defval:'',raw:false}).filter(r=>Object.values(r).some(v=>String(v).trim()));
    if(!LIMP.rows.length){toast('No rows found in that file.');return;}
    const m=leadMap(LIMP.rows[0]);if(!m.phone){toast('Could not find a phone column. Rename it to "Phone" and try again.');LIMP.rows=[];return;}
    render();}catch(e){toast('Could not read that file: '+(e.message||e));}
}
PK.done("marketing");
