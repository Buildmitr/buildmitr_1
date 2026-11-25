/* bm-build:f3afea8ba48a */
/* BuildMitr page code: reports */
function vReports(){
  const ps=S.proj==='all'?PJ():PJ().filter(p=>p.id===S.proj);
  const rows=ps.map(p=>{
    const pay=D.payments.filter(x=>x.project===p.id);
    const inA=pay.filter(x=>x.dir==='Received from client').reduce((s,x)=>s+(+x.amount||0),0);
    const outA=pay.filter(x=>x.dir!=='Received from client').reduce((s,x)=>s+(+x.amount||0),0);
    const matCost=D.received.filter(x=>x.project===p.id).reduce((s,x)=>s+(+x.qty||0)*(+x.rate||0),0);
    const mdays=D.attendance.filter(a=>a.project===p.id).reduce((s,a)=>s+(a.status==='Present'?1:a.status==='Half day'?.5:0),0)+D.vlabour.filter(v=>v.project===p.id).reduce((s,v)=>s+(+v.count||0),0);
    const ts=D.tasks.filter(t=>t.project===p.id),pc=ts.length?Math.round(ts.reduce((s,t)=>s+(t.status==='Completed'?100:+t.progress||0),0)/ts.length):0;
    const boqV=D.boq.filter(x=>x.project===p.id).reduce((s,x)=>s+(+x.qty||0)*(+x.rate||0),0);
    const boqDone=D.boq.filter(x=>x.project===p.id).reduce((s,x)=>s+(+x.done||0)*(+x.rate||0),0);
    const coV=D.changes.filter(x=>x.project===p.id&&x.status==='Approved').reduce((s,x)=>s+(+x.amount||0),0);
    const value=n(p.value)+coV,area=n(p.area);const poOpen=D.po.filter(x=>x.project===p.id&&['Draft','Sent','Partly received'].includes(x.status)).reduce((s,x)=>s+n(x.qty)*n(x.rate),0);
    return {p,inA,outA,matCost,mdays,pc,boqV,boqDone,coV,value,area,cps:area?outA/area:0,profit:value?value-outA-poOpen:0,open:D.issues.filter(i=>i.project===p.id&&i.status!=='Resolved').length,dprs:D.dpr.filter(d=>d.project===p.id).length};
  });
  const cf=cashFlow();const rh=rateHistory().sort((a,b)=>b.jump-a.jump);
  const moneyBox=`<div class="box"><div class="box-h">${ico('indian-rupee')}<h2>Cost & profit per project</h2></div>${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Project</th><th class="num">Contract value (incl. changes)</th><th class="num">Built-up area</th><th class="num">Spent so far</th><th class="num">Cost per sq.ft</th><th class="num">Received</th><th class="num">Projected profit</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(pname(r.p.id))}</b></td><td class="num">${r.value?inr(r.value):'<span class="code">add in project</span>'}</td><td class="num">${r.area?num(r.area)+' sft':'—'}</td><td class="num">${inr(r.outA)}</td><td class="num">${r.cps?inr(r.cps):'—'}</td><td class="num">${inr(r.inA)}</td><td class="num">${r.value?`<b style="color:${r.profit<0?'var(--red-ink)':'var(--green-ink)'}">${inr(r.profit)}</b> <span class="code">${Math.round(r.profit/r.value*100)}%</span>`:'—'}</td></tr>`).join('')}</tbody></table></div><div class="code" style="padding:8px 16px">Projected profit = contract value + approved changes − paid out − open purchase orders. Add contract value and area when editing a project.</div>`:'<div class="empty">No projects.</div>'}</div>
  <div class="box"><div class="box-h">${ico('trending-up')}<h2>Cash flow forecast</h2></div><div class="tbl-wrap"><table><thead><tr><th></th><th class="num">Next 30 days</th><th class="num">Next 60 days</th><th class="num">Next 90 days</th></tr></thead><tbody>
    ${[['Unpaid invoices (to receive)','invIn',1],['Payment stages coming due (incl. GST)','msIn',1],['Open purchase orders (to pay)','poOut',-1],['Labour at current rate (to pay)','labOut',-1]].map(([l,k,sg])=>`<tr><td>${l}</td>${[30,60,90].map(w=>`<td class="num" style="color:${sg<0?'var(--red-ink)':'inherit'}">${sg<0?'−':''}${inr(cf[w][k])}</td>`).join('')}</tr>`).join('')}
    <tr><td><b>Net cash position</b></td>${[30,60,90].map(w=>`<td class="num"><b style="color:${cf[w].net<0?'var(--red-ink)':'var(--green-ink)'}">${inr(cf[w].net)}</b></td>`).join('')}</tr></tbody></table></div></div>
  <div class="box"><div class="box-h">${ico('package')}<h2>Material rate history</h2></div>${rh.length?`<div class="tbl-wrap"><table><thead><tr><th>Material</th><th>Unit</th><th class="num">Latest</th><th class="num">Average</th><th class="num">Lowest</th><th class="num">Highest</th><th class="num">Change vs avg</th><th>Last bought</th></tr></thead><tbody>${rh.map(r=>`<tr><td><b>${esc(r.material)}</b></td><td>${esc(r.unit)}</td><td class="num">${inr(r.last)}</td><td class="num">${inr(r.avg)}</td><td class="num">${inr(r.min)}</td><td class="num">${inr(r.max)}</td><td class="num"><span class="pill ${r.jump>=10?'p-red':r.jump<=-5?'p-green':'p-grey'}">${r.jump>0?'+':''}${r.jump}%</span></td><td class="code">${fd(r.lastDate)} · ${esc(r.lastVendor)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Record material received with a rate to see price trends.</div>'}</div>`;
  const exp=Object.keys(MOD).map(k=>`<button class="btn sm" data-export="${k}">${ico('download')}${esc(MOD[k].label)}</button>`).join('');
  return header(label('reports'))+`
  <div class="box"><div class="box-h">${ico('file-bar-chart')}<h2>Project summary</h2></div>
  ${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Project</th><th>Progress</th><th class="num">Open issues</th><th class="num">DPRs</th><th class="num">BOQ value</th><th class="num">Work done (₹)</th><th class="num">Approved changes</th><th class="num">Man-days</th><th class="num">Material value</th><th class="num">Received</th><th class="num">Paid out</th><th class="num">Balance</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><td><b>${esc(pname(r.p.id))}</b></td><td>${cell({k:'progress',t:'number'},{progress:r.pc})}</td><td class="num">${r.open}</td><td class="num">${r.dprs}</td><td class="num">${inr(r.boqV)}</td><td class="num">${inr(r.boqDone)}</td><td class="num">${inr(r.coV)}</td><td class="num">${num(r.mdays)}</td><td class="num">${inr(r.matCost)}</td><td class="num">${inr(r.inA)}</td><td class="num">${inr(r.outA)}</td><td class="num"><b style="color:${r.inA-r.outA<0?'var(--red-ink)':'inherit'}">${inr(r.inA-r.outA)}</b></td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">Create a project to see its summary.</div>`}</div>
  ${canMoney()?moneyBox:''}
  <div class="box"><div class="box-h">${ico('download')}<h2>Export to Excel (CSV)</h2></div><div style="padding:14px 16px;display:flex;gap:8px;flex-wrap:wrap">${exp}<button class="btn sm" data-export="inventory">${ico('download')}Inventory</button><button class="btn sm" data-export="wages">${ico('download')}Wages (selected month)</button><button class="btn sm" data-export="balances">${ico('download')}Party balances</button></div>
  <div class="code" style="padding:0 16px 14px">Exports follow the project selected at the top. CSV files open in Excel and Google Sheets.</div></div>`;
}
async function downloadDoc(k,id){
  const r=D[k].find(x=>x.id===id);if(!r)return;
  let upiQ='';if(k==='invoices'&&upiLink(r)){try{upiQ=await Promise.race([qrSvg(upiLink(r)),new Promise(res=>setTimeout(()=>res(''),2500))]);}catch(_){upiQ='';}}
  const org=D.org.find(o=>o.id==='main')||{};
  const p=proj(r.project)||{};const e=s=>esc(s||'');
  let title,to,rowsH,total;
  if(k==='invoices'){const c=D.clients.find(x=>x.id===r.client)||{};title=r.kind;to=`<b>${e(c.name)}</b><br>${e(c.address)}${c.gstin?'<br>GSTIN: '+e(c.gstin):''}${c.phone?'<br>'+e(c.phone):''}`;
    const g=gstSplit(r);
    to+=c.state?`<br>State: ${e(c.state)}`:'';
    rowsH=`<tr><td>1</td><td>${e(r.desc).replace(/\n/g,'<br>')}${r.sac?`<br><span class="muted">HSN/SAC: ${e(r.sac)}</span>`:''}</td><td class="n">${inr(r.amount)}</td></tr>${g.rate?(g.inter?`<tr><td></td><td>IGST @ ${g.rate*100}%</td><td class="n">${inr(g.igst)}</td></tr>`:`<tr><td></td><td>CGST @ ${g.rate*50}%</td><td class="n">${inr(g.cgst)}</td></tr><tr><td></td><td>SGST @ ${g.rate*50}%</td><td class="n">${inr(g.sgst)}</td></tr>`):''}`;total=invTotal(r);
    r.__pos=g.pos;}
  else{const v=D.vendors.find(x=>x.id===r.vendor)||{};title='Purchase Order';to=`<b>${e(v.name)}</b><br>${e(v.address)}${v.gstin?'<br>GSTIN: '+e(v.gstin):''}${v.phone?'<br>'+e(v.phone):''}`;
    rowsH=`<tr><td>1</td><td>${e(r.material)} — ${num(r.qty)} ${e(r.unit)} @ ${inr(r.rate)}</td><td class="n">${inr((+r.qty||0)*(+r.rate||0))}</td></tr>`;total=(+r.qty||0)*(+r.rate||0);}
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${e(title)} ${e(r.no)}</title><style>
body{font-family:Segoe UI,Arial,sans-serif;color:#1a2420;max-width:780px;margin:32px auto;padding:0 24px;font-size:14px}
h1{font-size:22px;margin:0}.top{display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #2f6b4f;padding-bottom:14px}
.muted{color:#5d6c66}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ccd6d1;padding:8px;text-align:left;vertical-align:top}
th{background:#e2efe8}.n{text-align:right;white-space:nowrap}.tot td{font-weight:700;font-size:15px}.grid{display:flex;justify-content:space-between;gap:20px;margin-top:18px}
.foot{margin-top:40px;display:flex;justify-content:space-between}@media print{body{margin:0}}</style></head><body>
<div class="top"><div><h1>${e(org.name||'Your company')}</h1><div class="muted">${e(org.address).replace(/\n/g,'<br>')}${org.gstin?'<br>GSTIN: '+e(org.gstin):''}</div></div>
<div style="text-align:right"><h1>${e(title)}</h1><div>No: <b>${e(r.no)}</b><br>Date: ${fd(r.date)}${r.delivery?'<br>Deliver by: '+fd(r.delivery):''}</div></div></div>
<div class="grid"><div><div class="muted">${k==='po'?'To (vendor)':'Bill to'}</div>${to}</div><div style="text-align:right"><div class="muted">Project / site</div><b>${e(p.name)}</b><br>${e(p.address).replace(/\n/g,'<br>')}</div></div>
<table><thead><tr><th style="width:40px">#</th><th>Description</th><th class="n">Amount</th></tr></thead><tbody>${rowsH}
<tr class="tot"><td></td><td>Total</td><td class="n">${inr(total)}</td></tr>${k==='invoices'&&r.got?`<tr><td></td><td>Received</td><td class="n">${inr(r.got)}</td></tr><tr class="tot"><td></td><td>Balance due</td><td class="n">${inr(total-r.got)}</td></tr>`:''}</tbody></table>
${r.terms?`<p><b>Terms:</b> ${e(r.terms).replace(/\n/g,'<br>')}</p>`:''}
${k==='invoices'?`<p class="muted">Place of supply: ${e(r.__pos||'—')}${org.state?` · Supplier state: ${e(org.state)}`:''}</p>${org.bank||org.upi?`<table><tr><th>Bank details</th><td>${e(org.bank||'')}${org.acc?`<br>A/c no: ${e(org.acc)}`:''}${org.ifsc?`<br>IFSC: ${e(org.ifsc)}`:''}</td><th>UPI</th><td>${e(org.upi||'—')}</td></tr></table>`:''}`:''}
${upiQ?`<div style="display:flex;gap:16px;align-items:center;margin-top:18px"><div style="width:130px">${upiQ}</div><div><b>Scan to pay ${inr(total-(+r.got||0))} by UPI</b><div class="muted">Any UPI app · ${e((D.org.find(o=>o.id==='main')||{}).upi)}</div></div></div>`:''}
<div class="foot"><div class="muted">Thank you for your business.</div><div style="text-align:center"><br><br>Authorised signatory<br><b>${e(org.name||'')}</b></div></div>
<p class="muted" style="margin-top:30px;font-size:12px">Open this file and press Ctrl+P → Save as PDF to print or share it.</p></body></html>`;
  await saveFile(`${(title+'-'+(r.no||'')).replace(/[^\w-]+/g,'-')}.html`,new Blob([html],{type:'text/html'}));
}
function vWages(){
  const rows=wagesRows(),sum=f=>rows.reduce((s,r)=>s+r[f],0);
  return header(label('wages'),CANW?`<button class="btn" data-add="advances">${ico('hand-coins')}Advance</button><button class="btn pri" data-add="attendance">${ico('calendar-check')}Mark attendance</button>`:'')+
  `<div class="box"><div class="filters"><label class="code" style="display:flex;gap:8px;align-items:center">Month <input id="month" type="month" value="${esc(S.month||today().slice(0,7))}" style="width:auto"></label>
   <button class="btn sm" data-export="wages" style="margin-left:auto">${ico('download')}Export</button></div>
  ${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Worker</th><th>Trade</th><th class="num">Daily wage</th><th class="num">Days</th><th class="num">OT hrs</th><th class="num">Earned</th><th class="num">Advances</th><th class="num">To pay</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><td><b>${esc(r.name)}</b></td><td>${esc(r.trade)}</td><td class="num">${inr(r.wage)}</td><td class="num">${num(r.days)}</td><td class="num">${num(r.ot)}</td><td class="num">${inr(r.gross)}</td><td class="num">${inr(r.advance)}</td><td class="num"><b style="color:${r.net<0?'var(--red-ink)':'inherit'}">${inr(r.net)}</b></td></tr>`).join('')}
  <tr><td><b>Total</b></td><td></td><td></td><td class="num"><b>${num(sum('days'))}</b></td><td class="num"><b>${num(sum('ot'))}</b></td><td class="num"><b>${inr(sum('gross'))}</b></td><td class="num"><b>${inr(sum('advance'))}</b></td><td class="num"><b>${inr(sum('net'))}</b></td></tr></tbody></table></div>
  <div class="code" style="padding:10px 16px">Earned = days × daily wage + OT hours × (daily wage ÷ 8). Half day counts as 0.5.</div>`
  :`<div class="hero-empty">${ico('calculator')}<h2>No attendance this month</h2><p>Add workers under Labour with their daily wage, then mark attendance. Wages are worked out here automatically.</p></div>`}</div>`;
}
function vBalances(){
  const {vend,cli}=balanceRows();
  const tbl=(rows,a,b,c)=>rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Name</th><th class="num">${a}</th><th class="num">${b}</th><th class="num">${c}</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.name)}</b></td><td class="num">${inr(r.billed)}</td><td class="num">${inr(r.paid)}</td><td class="num"><span class="pill ${r.bal>0?'p-amber':r.bal<0?'p-blue':'p-green'}">${inr(r.bal)}</span></td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">Nothing yet.</div>`;
  return header(label('balances'),`<button class="btn sm" data-export="balances">${ico('download')}Export</button>`)+
  `<div class="box"><div class="box-h">${ico('arrow-down-left')}<h2>Clients — money to receive</h2></div>${tbl(cli,'Billed','Received','Balance due')}</div>
  <div class="box"><div class="box-h">${ico('arrow-up-right')}<h2>Vendors — money to pay</h2></div>${tbl(vend,'Bills (material, labour, equipment)','Paid','Balance to pay')}</div>
  <div class="code">Vendor bills come from Material received (qty × rate), Vendor labour (headcount × rate) and hired Equipment usage. Link payments to the vendor or client so they count here.</div>`;
}
function vBudgetVA(){
  const b=D.budget.filter(inProj),pay=D.payments.filter(p=>inProj(p)&&p.dir!=='Received from client');
  const rows=CATS.map(c=>({c,bud:b.filter(x=>x.cat===c).reduce((s,x)=>s+(+x.amount||0),0),act:pay.filter(x=>(x.cat||'Other')===c).reduce((s,x)=>s+(+x.amount||0),0)})).filter(r=>r.bud||r.act);
  const tb=rows.reduce((s,r)=>s+r.bud,0),ta=rows.reduce((s,r)=>s+r.act,0);
  return header(label('budgetva'),CANW?`<button class="btn pri" data-add="budget">${ico('plus')}Budget line</button>`:'')+
  (rows.length?`<div class="box tiles"><div class="tile"><b>${inr(tb)}</b><span>Budget</span></div><div class="tile"><b>${inr(ta)}</b><span>Spent</span></div><div class="tile"><b style="color:${tb-ta<0?'var(--red-ink)':'inherit'}">${inr(tb-ta)}</b><span>${tb-ta<0?'Over budget':'Remaining'}</span></div></div>
  <div class="box"><div class="tbl-wrap"><table><thead><tr><th>Category</th><th class="num">Budget</th><th class="num">Spent</th><th>Used</th><th class="num">Remaining</th></tr></thead><tbody>${rows.map(r=>{const pc=r.bud?Math.round(r.act/r.bud*100):100;return `<tr><td><b>${esc(r.c)}</b></td><td class="num">${inr(r.bud)}</td><td class="num">${inr(r.act)}</td>
    <td><div style="display:flex;gap:8px;align-items:center"><div class="prog" style="flex:1"><i style="width:${Math.min(100,pc)}%;${pc>100?'background:var(--red-ink)':''}"></i></div><span class="code">${pc}%</span></div></td>
    <td class="num"><b style="color:${r.bud-r.act<0?'var(--red-ink)':'inherit'}">${inr(r.bud-r.act)}</b></td></tr>`;}).join('')}</tbody></table></div></div>
  <div class="code">Spent = payments out, by the cost category chosen on each payment.</div>`
  :`<div class="box hero-empty">${ico('wallet')}<h2>No budget yet</h2><p>Add budget lines per category (Material, Labour, Sub-contract…). Choose a cost category on each payment and the comparison appears here.</p>${CANW?`<button class="btn pri" data-add="budget">${ico('plus')}Add budget line</button>`:''}</div>`);
}
function cashFlow(){
  const t=today(),inDays=d=>{const x=new Date(t+'T00:00');x.setDate(x.getDate()+d);return isoDate(x);};
  const ps=new Set(PJ().filter(p=>S.proj==='all'||p.id===S.proj).map(p=>p.id));
  const out={};[30,60,90].forEach(w=>{
    const end=inDays(w);
    const invIn=D.invoices.filter(i=>ps.has(i.project)&&(i.kind==='Tax invoice'||i.kind==='RA bill')&&i.status!=='Paid').reduce((s,i)=>s+invTotal(i)-n(i.got),0);
    const msIn=D.milestones.filter(m=>ps.has(m.project)&&!m.inv&&msStatus(m)!=='Paid'&&(msStatus(m)==='Due'||(msDueDate(m)&&msDueDate(m)<=end))).reduce((s,m)=>s+msAmount(m)*1.18,0);
    const poOut=D.po.filter(p=>ps.has(p.project)&&['Draft','Sent','Partly received'].includes(p.status)&&(!p.delivery||p.delivery<=end)).reduce((s,p)=>s+n(p.qty)*n(p.rate),0);
    const since=inDays(-14);const lab=D.attendance.filter(a=>ps.has(a.project)&&a.date>=since&&a.date<=t).reduce((s,a)=>{const l=D.labour.find(x=>x.id===a.labour)||{};return s+(a.status==='Present'?1:a.status==='Half day'?.5:0)*n(l.wage)+n(a.ot)*n(l.wage)/8;},0)
      +D.vlabour.filter(v=>ps.has(v.project)&&v.date>=since).reduce((s,v)=>s+n(v.count)*n(v.rate),0);
    const labOut=lab/14*w;
    out[w]={invIn,msIn,poOut,labOut,net:invIn+msIn-poOut-labOut};});
  return out;
}
function gstSplit(inv){
  const rate=GST[inv.gst]||0;const c=D.clients.find(x=>x.id===inv.client)||{};const os=orgVal('state'),cs=c.state||'';
  const inter=os&&cs&&os!==cs;const tax=n(inv.amount)*rate;
  return {rate,inter,tax,cgst:inter?0:tax/2,sgst:inter?0:tax/2,igst:inter?tax:0,pos:cs||os||''};
}
PK.done("reports");
