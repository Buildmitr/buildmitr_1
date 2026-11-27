/* bm-build:843acea6e124 */
/* BuildMitr page code: estimates */
function estModeBtns(){return `<div class="seg">${[['detail','Detailed template'],['quick','Quick (package rate)']].map(([k,l])=>`<button type="button" class="btn sm ${(EST.mode||'detail')===k?'pri':''}" data-estmode="${k}">${l}</button>`).join('')}</div>`;}
function vEstDetailed(){
  const c=e2Calc(),adm=isAdmin()&&CANW,L=esc,v=c.v;
  const inp=(k,val,ph)=>`<input data-e2="${k}" value="${esc(val)}" placeholder="${esc(ph||'')}" inputmode="decimal">`;
  const left=`<div class="box"><div class="box-h"><h2>Project</h2></div><div class="fhead">
    <label>Lead (optional)<select id="e2-lead"><option value="">— none —</option>${D.leads.filter(l=>l.stage!=='Lost').map(l=>`<option value="${l.id}" ${E2.lead===l.id?'selected':''}>${esc(l.name)}</option>`).join('')}</select></label>
    <label>Project / customer name<input data-e2="name" value="${esc(E2.name)}" placeholder="e.g. Mr. Rao — Duplex villa"></label>
    <label>Specification<select id="e2-tier">${E2_TIERS.map(x=>`<option ${E2.tier===x?'selected':''}>${x}</option>`).join('')}</select></label>
    <label>Location<select id="e2-city">${E2_CITY.map(([nm_,f],i)=>`<option value="${i}" ${+E2.city===i?'selected':''}>${esc(nm_)}${f!==1?` (×${f})`:''}</option>`).join('')}</select></label></div>
    <div class="box-h"><h2>Floors & slab area</h2><span class="code">Built-up area of each slab (sq.ft)</span></div>
    <div class="tbl-wrap"><table><tbody>${E2.floors.map((f,i)=>`<tr><td><input data-e2f="${i}" value="${esc(f.n)}" style="width:100%"></td><td style="width:130px">${inp('fa'+i,f.a,'sq.ft')}</td><td style="width:44px">${E2.floors.length>1?`<button type="button" class="btn sm ghost" data-e2del="${i}" aria-label="Remove floor">${ico('x')}</button>`:''}</td></tr>`).join('')}</tbody></table></div>
    <div class="srow"><button type="button" class="btn sm" id="e2Add">${ico('plus')}<span>Add floor</span></button>
      <label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="e2-head" ${E2.head?'checked':''} style="width:auto">Staircase headroom (150 sq.ft)</label></div>
    <div class="box-h"><h2>Rooms & services</h2></div><div class="fhead">
      <label>Rooms (bedrooms, hall, pooja)${inp('rooms',E2.rooms,'nos')}</label><label>Toilets${inp('toilets',E2.toilets,'nos')}</label>
      <label>Kitchens${inp('kitchens',E2.kitchens,'nos')}</label><label>Balconies${inp('balconies',E2.balconies,'nos')}</label>
      <label>Lifts${inp('lifts',E2.lifts,'nos')}</label><label>Duration (months)${inp('months',E2.months,v.M?String(v.M):'months')}</label></div>
    <div class="box-h"><h2>External works & extras</h2></div><div class="tbl-wrap"><table><tbody>${EXTRAS.map(([nm_,u,r],i)=>`<tr><td>${esc(nm_)}<div class="code">${inr(r)} / ${u}</div></td><td style="width:110px"><input data-e2x="${i}" value="${esc(E2.extras[i]||'')}" placeholder="${u}" inputmode="decimal"></td></tr>`).join('')}</tbody></table></div>
    <div class="srow"><label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="e2-gst" ${E2.gst?'checked':''} style="width:auto">Add GST 18%</label></div></div>`;
  const rb=x=>v.B?inr(x/v.B):'—';
  const abs=`<div class="box"><div class="box-h"><h2>Abstract — ${esc(E2.tier)}</h2><span class="code">BUA ${num(v.B)} sq.ft</span></div>
    ${v.B?`<div class="tbl-wrap"><table class="e2abs"><thead><tr><th>Sl.no</th><th>Description</th><th class="num">Amount</th><th class="num">Rate/BUA</th></tr></thead><tbody>
    ${E2_SECS.map(([sn,st])=>{const hs=c.heads.filter(h=>h.sec===sn&&(h.amt||h.rows.some(r=>r.note&&r.q&&!r.r)));if(!hs.length)return '';return `<tr class="e2sec"><td><b>${sn}</b></td><td colspan="3"><b>${st}</b></td></tr>`+hs.map((h,i)=>`<tr><td>${i+1}</td><td>${L(h.hd)}${!h.amt?`<div class="code">${L((h.rows.find(r=>r.note)||{}).note||'')}</div>`:''}</td><td class="num">${inr(h.amt)}</td><td class="num">${rb(h.amt)}</td></tr>`).join('');}).join('')}
    <tr><td></td><td>Overheads & contractor margin (${c.overP}%)</td><td class="num">${inr(c.over)}</td><td class="num">${rb(c.over)}</td></tr>
    <tr><td></td><td>Contingencies (${c.contP}%)</td><td class="num">${inr(c.cont)}</td><td class="num">${rb(c.cont)}</td></tr>
    <tr class="e2sec"><td colspan="2"><b>TOTAL</b></td><td class="num"><b>${inr(c.sub)}</b></td><td class="num"><b>${rb(c.sub)}</b></td></tr>
    ${E2.gst?`<tr><td></td><td>Add GST (18%)</td><td class="num">${inr(c.gst)}</td><td class="num">${rb(c.gst)}</td></tr>`:''}
    <tr class="e2sec"><td colspan="2"><b style="font-size:15px">GRAND TOTAL</b></td><td class="num"><b style="font-size:16px">${inr(c.total)}</b></td><td class="num"><b>${rb(c.total)}</b></td></tr>
    </tbody></table></div>
    <div class="note">${ico('info')}<span>2026 market range for ${esc(E2.tier)} homes in Hyderabad / Bangalore: about ${E2_BAND[E2.tier]} per sq.ft before GST. Excludes land, approvals, interiors and furniture.</span></div>
    <div style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn pri" id="e2Xls">${ico('file-down')}<span>Download Excel</span></button><button class="btn" id="e2Doc">${ico('printer')}<span>Download PDF view</span></button>
      <button class="btn" id="e2Share">${ico('share-2')}<span>Share or save</span></button>
      ${E2.lead&&CANW?`<button class="btn" id="e2Save">${ico('check')}<span>Save to lead</span></button>`:''}${canView('invoices')&&CANW?`<button class="btn" id="e2Quote">${ico('receipt')}<span>Make quotation</span></button>`:''}</div>
    ${CANW&&isAdmin()?`<div class="box-h" style="border-top:1px solid var(--line)"><h2>Make it a project</h2><span class="code">Project + budget + payment stages + work schedule</span></div><div class="srow" style="align-items:flex-end">
      <label class="code">Start date<input id="e2-start" type="date" value="${esc(E2.pstart||today())}"></label><label class="code">Complete in (months)<input id="e2-months" type="number" min="1" max="60" step="0.5" value="${esc(E2.pmonths||'6')}" style="width:110px"></label>
      <button class="btn pri" id="e2Proj">${ico('gantt-chart')}<span>Create project with work schedule</span></button></div>`:''}`
    :`<div class="empty">Enter the slab area of each floor to see the estimate.</div>`}</div>`;
  const boq=v.B?`<div class="box"><div class="box-h"><h2>BOQ</h2><span class="code">Change any quantity or rate — the totals update. ${Object.keys(E2.ov).length?`<button type="button" class="linkish" id="e2ResetOv">Undo my changes</button>`:''}</span></div>
    ${c.heads.filter(h=>h.rows.length).map(h=>{const key=h.sec+h.hd,open=E2.open[key];return `<div class="e2hd"><button type="button" class="e2hb" data-e2open="${esc(key)}" aria-expanded="${!!open}"><span>${esc(h.sec)} · ${L(h.hd)}</span><span class="num">${inr(h.amt)}</span>${ico('chevron-down','i chev')}</button>
      ${open?`<div class="tbl-wrap"><table><thead><tr><th>Particulars</th><th>Unit</th><th class="num">Quantity</th><th class="num">Rate</th><th class="num">Amount</th>${CANW?'<th></th>':''}</tr></thead><tbody>${h.rows.map(r=>`<tr${r.edited?' class="e2ed"':''}><td>${L(r.d)}${r.note?`<div class="code">${L(r.note)}</div>`:''}</td><td>${r.u}</td>
        <td class="num"><input data-e2q="${r.k}" value="${(E2.ov[r.k]||{}).q??fq(r.q).replace(/,/g,'')}" inputmode="decimal" style="width:90px;text-align:right"></td>
        <td class="num"><input data-e2r="${r.k}" value="${(E2.ov[r.k]||{}).r??r.r}" inputmode="decimal" style="width:100px;text-align:right"></td><td class="num">${inr(r.amt)}</td>${CANW?`<td><button type="button" class="btn sm ghost" data-e2rm="${esc(r.k)}" title="Remove this item" aria-label="Remove ${esc(r.d)}">${ico('x')}</button></td>`:''}</tr>`).join('')}</tbody></table></div>`:''}</div>`;}).join('')}${e2Editor(c)}</div>`:'';
  const specs=v.B?`<div class="box"><div class="box-h"><h2>What's included — ${esc(E2.tier)}</h2></div><div class="tbl-wrap"><table><tbody>${Object.entries(E2_SPEC).map(([k,s])=>`<tr><td style="width:30%"><b>${L(k)}</b></td><td>${L(s[c.t])}</td></tr>`).join('')}</tbody></table></div></div>`:'';
  const mats=v.B?`<div class="box"><div class="box-h"><h2>Main quantities</h2><span class="code">From the BOQ — check against the structural design</span></div><div class="tbl-wrap"><table><tbody>${c.mat.map(([m,u,q])=>`<tr><td>${L(m)}</td><td class="num">${fq(q)} ${u}</td></tr>`).join('')}<tr><td>Steel per sq.ft of BUA</td><td class="num">${(c.mat[3][2]*1000/v.B).toFixed(2)} kg</td></tr></tbody></table></div></div>`:'';
  const stg=v.B?`<div class="box"><div class="box-h"><h2>Payment stages</h2></div><div class="tbl-wrap"><table><thead><tr><th>Stage</th><th class="num">%</th><th class="num">Amount</th></tr></thead><tbody>${c.stages.map(([s,p])=>`<tr><td>${L(s)}</td><td class="num">${p}%</td><td class="num">${inr(c.total*p/100)}</td></tr>`).join('')}</tbody></table></div></div>`:'';
  const card=e2Card();
  const rates=E2.edit&&adm?`<div class="box"><div class="box-h"><h2>Your rate card</h2><span class="code">Starting rates for every estimate in your organisation (Hyderabad base)</span></div>
    <form id="e2RateForm"><div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Unit</th>${E2_TIERS.map(x=>`<th class="num">${x}</th>`).join('')}</tr></thead><tbody>
    ${E2_EL.map(([sec,hd,k,d,u,qf,rt])=>{const r=card.r&&card.r[k]?card.r[k]:rt;return `<tr><td>${L(d)}<div class="code">${L(hd)}</div></td><td>${u}</td>${r.map((x,i)=>`<td class="num"><input name="${k}_${i}" value="${x}" inputmode="decimal" style="width:90px"></td>`).join('')}</tr>`;}).join('')}
    <tr><td>Overheads & contractor margin %</td><td></td><td class="num"><input name="over" value="${card.over!==undefined?card.over:7.5}" style="width:90px"></td><td></td><td></td></tr>
    <tr><td>Contingencies %</td><td></td><td class="num"><input name="cont" value="${card.cont!==undefined?card.cont:5}" style="width:90px"></td><td></td><td></td></tr>
    </tbody></table></div><div class="srow"><button class="btn pri">${ico('check')}<span>Save rate card</span></button><button type="button" class="btn ghost" id="e2Reset">Back to default rates</button></div></form></div>`:'';
  return header(label('estimator'),estModeBtns()+(adm?`<button type="button" class="btn" id="e2Edit">${ico('pencil')}<span>${E2.edit?'Close rate card':'Edit rates'}</span></button>`:''))+rates+`<div class="grid2">${left}${abs}</div>`+boq+specs+mats+stg;
}
async function e2Xls(){   // Excel in the same layout as the office estimates: Abstract + BOQ
  try{await loadSheetJS();}catch(_){toast('Could not load the Excel tool. Check the connection.');return;}
  const c=e2Calc(),v=c.v,org=orgName();
  const A=[[`PROJECT: ${(E2.name||'').toUpperCase()}`],['BUA:',Math.round(v.B),'sqft','',`${E2.tier} · ${E2_CITY[E2.city][0]}`],[],['Sl.no','Description','Amount','Rate/BUA','Remarks']];
  E2_SECS.forEach(([sn,st])=>{const hs=c.heads.filter(h=>h.sec===sn&&(h.amt||h.rows.some(r=>r.note&&r.q&&!r.r)));if(!hs.length)return;A.push([sn,st]);hs.forEach((h,i)=>{const z=h.rows.find(r=>r.note&&r.q&&!r.r);A.push([i+1,h.hd.toUpperCase(),Math.round(h.amt),Math.round(h.amt/v.B*100)/100,z&&!h.amt?z.note:''])});});
  A.push(['','Overheads & contractor margin ('+c.overP+'%)',Math.round(c.over),Math.round(c.over/v.B*100)/100],['','Contingencies ('+c.contP+'%)',Math.round(c.cont),Math.round(c.cont/v.B*100)/100],['TOTAL','',Math.round(c.sub),Math.round(c.perEx*100)/100]);
  if(E2.gst)A.push(['','Add GST (18%)',Math.round(c.gst),Math.round(c.gst/v.B*100)/100]);A.push(['GRAND TOTAL','',Math.round(c.total),Math.round(c.per*100)/100]);
  const B=[[`${org} — ${E2.name||'Costing'}`],['Sl No','Particulars','Unit','Quantity','Rate','Amount']];
  let sl=0;c.heads.forEach(h=>{if(!h.rows.length&&!h.amt)return;sl++;B.push([sl,h.hd.toUpperCase()]);h.rows.forEach((r,i)=>B.push([`${sl}.${i+1}`,r.d+(r.note?` (${r.note})`:''),r.u,Math.round(r.q*100)/100,r.r,Math.round(r.amt)]));
    if(!h.rows.length)c.ex.forEach((x,i)=>B.push([`${sl}.${i+1}`,x.nm,x.u,x.q,x.r,Math.round(x.amt)]));B.push(['',`Sub total for ${h.hd}`,'','','',Math.round(h.amt)]);});
  B.push([],['','Built-up area','','','',''],...E2.floors.filter(f=>n(f.a)).map(f=>['',f.n,'Sft',n(f.a)]),...(v.HD?[['','Staircase headroom','Sft',150]]:[]),['','Total BUA','Sft',v.B]);
  const P=[['Stage','%','Amount'],...c.stages.map(([s,p])=>[s,p,Math.round(c.total*p/100)])];
  const wb=XLSX.utils.book_new();const ws1=XLSX.utils.aoa_to_sheet(A),ws2=XLSX.utils.aoa_to_sheet(B),ws3=XLSX.utils.aoa_to_sheet(P);
  ws1['!cols']=[{wch:8},{wch:42},{wch:14},{wch:10},{wch:34}];ws2['!cols']=[{wch:7},{wch:62},{wch:7},{wch:11},{wch:11},{wch:14}];ws3['!cols']=[{wch:40},{wch:6},{wch:14}];
  XLSX.utils.book_append_sheet(wb,ws1,'Abstract');XLSX.utils.book_append_sheet(wb,ws2,'BOQ');XLSX.utils.book_append_sheet(wb,ws3,'Payment stages');
  const out=XLSX.write(wb,{bookType:'xlsx',type:'array'});
  await saveFile(`Estimate-${(E2.name||E2.tier).replace(/[^\w-]+/g,'-')}.xlsx`,new Blob([out],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
}
async function e2Doc(){
  const c=e2Calc(),v=c.v,e=esc,org=D.org.find(o=>o.id==='main')||{};
  const rb=x=>inr(x/v.B);
  const absRows=E2_SECS.map(([sn,st])=>{const hs=c.heads.filter(h=>h.sec===sn&&h.amt);if(!hs.length)return '';return `<tr class="s"><td>${sn}</td><td colspan="3">${st}</td></tr>`+hs.map((h,i)=>`<tr><td>${i+1}</td><td>${e(h.hd)}</td><td class="n">${inr(h.amt)}</td><td class="n">${rb(h.amt)}</td></tr>`).join('');}).join('');
  const boqRows=c.heads.filter(h=>h.rows.length).map(h=>`<tr class="s"><td colspan="5">${e(h.sec)} · ${e(h.hd)}</td></tr>`+h.rows.filter(r=>r.q).map(r=>`<tr><td>${e(r.d)}${r.note?`<div class="m">${e(r.note)}</div>`:''}</td><td>${r.u}</td><td class="n">${fq(r.q)}</td><td class="n">${inr(r.r)}</td><td class="n">${inr(r.amt)}</td></tr>`).join('')).join('');
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Estimate ${e(E2.name||'')}</title><style>body{font-family:Segoe UI,Arial,sans-serif;max-width:900px;margin:26px auto;padding:0 22px;color:#1a2420;font-size:13px}h1{margin:0;font-size:21px}h2{font-size:16px;margin:22px 0 6px}table{width:100%;border-collapse:collapse;margin:6px 0}td,th{border:1px solid #ccd6d2;padding:6px 8px;text-align:left;vertical-align:top}th{background:#eef3f1}.n{text-align:right;white-space:nowrap}.s td{background:#f1f5f3;font-weight:700}.m{color:#5d6c66;font-size:11.5px}</style></head><body>
  <h1>${e(org.name||orgName())}</h1><div class="m">${e(org.address||'')}</div><h2>Cost estimate — ${e(E2.tier)} specification</h2>
  <p>${E2.name?`Project: <b>${e(E2.name)}</b><br>`:''}Date: ${fd(today())} · ${e(E2_CITY[E2.city][0])} · Valid for 30 days<br>BUA: <b>${num(v.B)} sq.ft</b> (${E2.floors.filter(f=>n(f.a)).map(f=>`${e(f.n)} ${num(n(f.a))}`).join(', ')}${v.HD?', headroom 150':''}) · Rooms ${num(v.R)} · Toilets ${num(v.T)} · Kitchens ${num(v.K)}${v.L?' · Lift '+num(v.L):''}</p>
  <h2>Abstract</h2><table><tr><th>Sl.no</th><th>Description</th><th class="n">Amount</th><th class="n">Rate/BUA</th></tr>${absRows}
  <tr><td></td><td>Overheads & contractor margin (${c.overP}%)</td><td class="n">${inr(c.over)}</td><td class="n">${rb(c.over)}</td></tr><tr><td></td><td>Contingencies (${c.contP}%)</td><td class="n">${inr(c.cont)}</td><td class="n">${rb(c.cont)}</td></tr>
  <tr class="s"><td colspan="2">TOTAL</td><td class="n">${inr(c.sub)}</td><td class="n">${rb(c.sub)}</td></tr>${E2.gst?`<tr><td></td><td>Add GST (18%)</td><td class="n">${inr(c.gst)}</td><td class="n">${rb(c.gst)}</td></tr>`:''}<tr class="s"><td colspan="2">GRAND TOTAL</td><td class="n">${inr(c.total)}</td><td class="n">${rb(c.total)}</td></tr></table>
  <h2>BOQ</h2><table><tr><th>Particulars</th><th>Unit</th><th class="n">Quantity</th><th class="n">Rate</th><th class="n">Amount</th></tr>${boqRows}${c.ex.map(x=>`<tr><td>${e(x.nm)}</td><td>${x.u}</td><td class="n">${fq(x.q)}</td><td class="n">${inr(x.r)}</td><td class="n">${inr(x.amt)}</td></tr>`).join('')}</table>
  <h2>What's included</h2><table>${Object.entries(E2_SPEC).map(([k,s])=>`<tr><td style="width:28%"><b>${e(k)}</b></td><td>${e(s[c.t])}</td></tr>`).join('')}</table>
  <h2>Payment stages</h2><table><tr><th>Stage</th><th class="n">%</th><th class="n">Amount</th></tr>${c.stages.map(([s,p])=>`<tr><td>${e(s)}</td><td class="n">${p}%</td><td class="n">${inr(c.total*p/100)}</td></tr>`).join('')}</table>
  <p class="m">Excludes land, approvals and fees, interiors and furniture. Quantities are worked out from the slab areas and room counts; the final quotation follows the approved drawings, structural design and site survey. Press Ctrl+P → Save as PDF to share.</p></body></html>`;
  await saveFile(`Estimate-${(E2.name||E2.tier).replace(/[^\w-]+/g,'-')}.html`,new Blob([html],{type:'text/html'}));
}
function e2Editor(c){
  if(!CANW)return '';
  const off=e2Off(),cus=e2Cus(),t=c.t,L=esc;
  const gone=E2_EL.filter(r=>off[r[2]]);
  const pres=E2_INT.filter(p=>!cus.some(x=>x.k===p[0]));
  const heads=[...new Set([...E2_EL.map(r=>r[1]),...E2_INT.map(r=>r[1]),...cus.map(x=>x.hd)])];
  const changed=!!(E2.off||E2.custom),std=e2Std(),hasStd=!!(std.add||std.off);
  return `<div class="e2edit">
    <div class="box-h"><h2>Add or remove items</h2><span class="code">Remove with ✕ on any line above. Add civil or interior items here.</span></div>
    ${pres.length?`<div class="srow"><span class="code"><b>INTERIORS</b></span>${pres.map(p=>`<button type="button" class="btn sm" data-e2pre="${p[0]}" title="${L(p[2])} — ${inr(p[5][t])}/${p[3]}">${ico('plus')}<span>${L(p[1])}</span></button>`).join('')}</div>`:''}
    <form id="e2ItemForm" class="e2form">
      <label>Section<select name="sec">${E2_SECS.map(([sn,st])=>`<option value="${sn}" ${sn==='VI'?'selected':''}>${sn} · ${L(st)}</option>`).join('')}</select></label>
      <label>Head<input name="hd" list="e2Heads" required placeholder="e.g. Earthwork, Interiors"></label>
      <label class="wide">Item description<input name="d" required placeholder="e.g. Rainwater harvesting pit"></label>
      <label>Unit<input name="u" required placeholder="Nos / Sqft / Cum / LS" list="e2Units"></label>
      <label>Quantity<input name="q" required inputmode="decimal" placeholder="0"></label>
      <label>Rate (₹)<input name="r" required inputmode="decimal" placeholder="0"></label>
      <button class="btn pri">${ico('plus')}<span>Add item</span></button>
      <datalist id="e2Heads">${heads.map(h=>`<option value="${L(h)}">`).join('')}</datalist><datalist id="e2Units">${['Nos','Sqft','Sqm','Rft','Rmt','Cum','MT','Kg','LS','Month'].map(u=>`<option value="${u}">`).join('')}</datalist>
    </form>
    ${gone.length?`<div class="srow"><span class="code">Removed:</span>${gone.map(r=>`<button type="button" class="btn sm ghost" data-e2back="${r[2]}" title="Add back">${ico('plus')}<span>${L(r[3])}</span></button>`).join('')}</div>`:''}
    ${isAdmin()?`<div class="srow"><button type="button" class="btn sm" id="e2StdSave">${ico('check')}<span>Save this item list as company standard</span></button>
      ${changed&&hasStd?`<button type="button" class="btn sm ghost" id="e2StdUse">Back to company standard</button>`:''}${changed||hasStd?`<button type="button" class="btn sm ghost" id="e2StdOrig">Back to BuildMitr default list</button>`:''}
      <span class="code">${hasStd?'Company standard list in use for new estimates.':'New estimates use the BuildMitr default list.'}</span></div>`:''}
  </div>`;
}
function e2Touch(){if(!E2.off)E2.off={...e2Off()};if(!E2.custom)E2.custom=e2Cus().map(x=>({...x}));}
async function e2SaveRates(f){
  const g=k=>Number((f.elements[k]||{}).value),o={r:{},over:g('over'),cont:g('cont')};
  E2_EL.forEach(([,,k,,,,rt])=>{const r=[0,1,2].map(i=>{const x=g(`${k}_${i}`);return isNaN(x)?rt[i]:x;});if(r.some((x,i)=>x!==rt[i]))o.r[k]=r;});
  const ok=await write(()=>db.doc('org/main').update({estRates2:o}),'Rate card saved');if(ok){E2.edit=false;render();}
}
function e2Rerender(sel,pos){render();const x=document.querySelector(sel);if(x){x.focus();try{x.setSelectionRange(pos,pos);}catch(_){}}}
function docTplPick(d){const k=docTplKey(d.kind),t={};DOC_TKEYS[k].forEach(x=>{if(d[x]!==undefined)t[x]=JSON.parse(JSON.stringify(d[x]));});return t;}
async function docTplSave(name,def){
  const d=DM.d,k=docTplKey(d.kind),o=orgMain(),list=[...(o.docTs||[])];const t=docTplPick(d);
  let ex=list.find(x=>x.kind===k&&x.name.toLowerCase()===name.toLowerCase());if(ex)ex.t=t;else{ex={id:'t'+Date.now().toString(36),name,kind:k,t};list.push(ex);}
  const patch={docTs:list};if(def){patch.docTdef={...(o.docTdef||{}),[k]:ex.id};patch.docT={...(o.docT||{}),[k]:t};}
  const ok=await write(()=>db.doc('org/main').update(patch),`Template “${name}” saved`);if(ok)render();return ok;}
function docTpl(kind){const t=(orgMain().docT||{})[docTplKey(kind)]||{};if(t.items&&!t.items.length)delete t.items;return JSON.parse(JSON.stringify({...DOC_DEF[docTplKey(kind)],...t}));}
function docBlank(kind,preset){
  const t=docTpl(kind);
  return {kind,no:docNextNo(kind),date:today(),project:S.proj!=='all'?S.proj:'',client:'',toName:'',toAddr:'',toPhone:'',toEmail:'',gst:'No GST',got:'',status:docIsQ(kind)?'Sent':'Unpaid',...t,...(preset||{})};
}
function docFromRec(r){
  const t=r.tpl||{},c=D.clients.find(x=>x.id===r.client)||{};
  const base=docBlank(r.kind);
  return {...base,...t,kind:r.kind,no:r.no,date:r.date,project:r.project||'',client:r.client||'',gst:r.gst||'No GST',got:r.got||'',status:r.status||base.status,
    toName:t.toName??c.name??'',toAddr:t.toAddr??c.address??'',toPhone:t.toPhone??c.phone??'',toEmail:t.toEmail??c.email??'',
    items:t.items||[{d:r.desc||'',amt:r.amount||''}]};
}
function docOpen(id){const r=D.invoices.find(x=>x.id===id);if(!r)return;DM={id,d:docFromRec(r)};S.view='docmaker';render();scrollTo(0,0);}
function docNew(kind,preset){DM={id:null,d:docBlank(kind||'Tax invoice',preset)};if(!DM.d.client){const p=proj(DM.d.project);if(p&&p.client)DM.d.client=p.client;}if(DM.d.client&&!(preset&&preset.toName))docClient(DM.d.client);S.view='docmaker';render();scrollTo(0,0);}
function docClient(id){const c=D.clients.find(x=>x.id===id)||{};Object.assign(DM.d,{client:id,toName:c.name||'',toAddr:c.address||'',toPhone:c.phone||'',toEmail:c.email||''});}
async function docPdfBlob(){
  await loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',()=>window.jspdf);
  const org=orgMain(),{pages}=docLayout(DM.d,org),cvs=await docDraw(pages,org,7);const pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4',compress:true});
  cvs.forEach((c,i)=>{if(i)pdf.addPage();pdf.addImage(c.toDataURL('image/jpeg',0.9),'JPEG',0,0,210,297);});
  pdf.setProperties({title:`${DM.d.title||DM.d.kind} ${DM.d.no||''}`,author:org.name||''});return pdf.output('blob');
}
async function docPdf(){if(DM.d.mode==='upload'){try{const f=await docUpBlob();await saveFile(f.name,f);}catch(e){toast(e.message||'Could not download');}return;}
  try{toast('Making the PDF…');const b=await docPdfBlob();await saveFile(docFile(DM.d)+'.pdf',b);}catch(e){toast(e.message||'Could not make the PDF');}}
async function docPptx(){
  try{toast('Making the PowerPoint…');await loadJs('https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js',()=>window.PptxGenJS);
  const org=orgMain(),{pages}=docLayout(DM.d,org),lh=await docImg(org.lh&&org.lh.id),sig=await docImg(org.sig&&org.sig.id);
  const P=new window.PptxGenJS();P.defineLayout({name:'A4P',width:8.27,height:11.69});P.layout='A4P';P.title=`${DM.d.title} ${DM.d.no}`;P.company=org.name||'';
  const I=mm=>mm/25.4;
  pages.forEach(items=>{const s=P.addSlide();if(lh)s.background={data:lh.url.replace(/^data:/,'')};else s.background={color:'FFFFFF'};
    items.forEach(it=>{
      if(it.k==='l'){s.addShape(P.ShapeType.line,{x:I(it.x1),y:I(it.y1),w:I(it.x2-it.x1),h:0,line:{color:it.c||'999999',width:Math.max(0.5,(it.t||0.3)*2.83)}});return;}
      if(it.k==='i'){if(sig){const r=Math.min(it.w/sig.im.width,it.h/sig.im.height);const w=sig.im.width*r,h=sig.im.height*r;s.addImage({data:sig.url.replace(/^data:/,''),x:I(it.x+it.w-w),y:I(it.y+it.h-h),w:I(w),h:I(h)});}return;}
      const w=it.w+3,x=it.al==='c'?it.x-w/2:it.al==='r'?it.x-w:it.x;
      s.addText(it.lines.join('\n'),{x:I(x),y:I(it.y),w:I(w),h:I(it.lines.length*it.s*0.3528*1.35+1),fontFace:'Arial',fontSize:it.s,bold:!!it.b,color:it.c||'1A1A1A',
        align:it.al==='c'?'center':it.al==='r'?'right':'left',valign:'top',margin:0,lineSpacingMultiple:1.05,fit:'none'});});});
  const b=await P.write({outputType:'blob'});await saveFile(docFile(DM.d)+'.pptx',b);}catch(e){toast(e.message||'Could not make the PowerPoint');}
}
async function docShareFile(){
  try{const f=DM.d.mode==='upload'?await docUpBlob():new File([await docPdfBlob()],docFile(DM.d)+'.pdf',{type:'application/pdf'});const b=f;
    if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:`${DM.d.title} ${DM.d.no}`,text:docText()});return;}
    await saveFile(f.name,b);toast('PDF saved — attach it in WhatsApp or email');}catch(e){if(e&&e.name!=='AbortError')toast(e.message||'Could not share');}
}
async function docSave(){
  const d=DM.d,t=docTotals(d);if(!d.no||!d.date){toast('Enter the number and date.');return false;}
  if(d.mode==='upload'&&!d.up){toast('Upload the file first.');return false;}
  let client=d.client;
  if(!client&&d.toName.trim()){const ex=D.clients.find(x=>(x.name||'').trim().toLowerCase()===d.toName.trim().toLowerCase());
    if(ex)client=ex.id;else{const ok=await write(async()=>{const ref=await db.collection('clients').add({name:d.toName.trim(),address:d.toAddr,phone:d.toPhone,email:d.toEmail,by:ME.id,at:Date.now()});client=ref.id;});if(!ok)return false;}d.client=client;}
  const {kind,no,date,project,gst,got,status,...rest0}=d;
  const rest=d.mode==='upload'?{...rest0,stages:[]}:(({up,mode,...r})=>({...r,up:null,mode:''}))(rest0);   // a made-here document keeps no uploaded file
  const body={kind,no,date,project:project||'',client:client||'',gst,got:n(got)||'',status,amount:t.sub,desc:(d.items||[]).filter(x=>x.d).map(x=>x.d).join('\n')||(d.mode==='upload'?((d.up||{}).name||d.kind):d.title),tpl:rest,by:ME.id,at:Date.now()};
  body.file=d.mode==='upload'&&d.up?d.up.id:'';   // the ready file is kept with the record (cleared if it is made here again)
  const ok=await write(async()=>{if(DM.id)await db.doc('invoices/'+DM.id).update(body);else{const ref=await db.collection('invoices').add(body);DM.id=ref.id;}},`${kind} ${no} saved`);
  if(ok)render();return ok;
}
function vDocMaker(){
  if(!DM)DM={id:null,d:docBlank('Tax invoice')};const d=DM.d,q=docIsQ(d.kind),L=esc,org=orgMain();
  const fi=(k,l,ph,o={})=>`<label${o.wide?' class="wide"':''}>${l}${o.ta?`<textarea data-dm="${k}" rows="${o.ta}" placeholder="${esc(ph||'')}">${esc(d[k]??'')}</textarea>`:`<input data-dm="${k}" value="${esc(d[k]??'')}" placeholder="${esc(ph||'')}" ${o.type?`type="${o.type}"`:''}>`}</label>`;
  const quotes=D.invoices.filter(r=>docIsQ(r.kind)&&r.project&&r.project===d.project&&((r.tpl||{}).stages||[]).length);
  const stageOpts=quotes.flatMap(r=>r.tpl.stages.map((s,i)=>({r,i,s,amt:n(r.amount)*n(s[1])/100})));
  const kinds=`<div class="srow">${['Quotation','Tax invoice','Proforma invoice','RA bill'].map(k=>`<button type="button" class="btn sm ${d.kind===k?'pri':''}" data-dmkind="${k}">${k}</button>`).join('')}</div>
   <div class="srow"><span class="code">How:</span><button type="button" class="btn sm ${d.mode!=='upload'?'pri':''}" data-dmmode="make">${ico('file-text')}<span>Make it here</span></button><button type="button" class="btn sm ${d.mode==='upload'?'pri':''}" data-dmmode="upload">${ico('upload')}<span>Upload ready file</span></button></div>`;
  if(d.mode==='upload')return docUpPage(d,q,fi,kinds);
  const left=`<div class="box"><div class="box-h"><h2>${q?'Quotation':'Invoice'} details</h2>${DM.id?'<span class="pill p-green">Saved</span>':'<span class="pill p-amber">Not saved yet</span>'}</div>
   ${kinds}
   <div class="srow"><label class="code" style="flex:1">Start from a template<select id="dm-preset"><option value="">— choose —</option>${docTpls(d.kind).map(x=>`<option value="n:${esc(x.id)}">${esc(x.name)}${x.def?' (default)':''}</option>`).join('')}${!docTpls(d.kind).length&&(orgMain().docT||{})[docTplKey(d.kind)]?`<option value="org">My saved ${q?'quotation':'invoice'} template</option>`:''}${DOC_PRESETS[docTplKey(d.kind)].map(([nm_],i)=>`<option value="${i}">${esc(nm_)}</option>`).join('')}</select></label></div>
   <div class="e2form">
    ${fi('title','Heading on the page','e.g. ARCHITECTURAL INVOICE',{wide:1})}${fi('no','Number','')}${fi('date','Date','',{type:'date'})}
    <label>Project<select id="dm-proj"><option value="">—</option>${PJ().map(p=>`<option value="${p.id}" ${d.project===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Client<select id="dm-client"><option value="">— type below —</option>${D.clients.map(c=>`<option value="${c.id}" ${d.client===c.id?'selected':''}>${esc(c.name||'')}</option>`).join('')}</select></label>
    ${fi('toName',q?'To (name)':'Bill to (name)','e.g. Mrs. Voggu Srilatha',{wide:1})}${fi('toAddr','Address','',{wide:1,ta:2})}${fi('toPhone','Client phone (WhatsApp)','')}${fi('toEmail','Client email','')}
    ${q?fi('salute','Greeting','Dear Sir,',{wide:1})+fi('intro','Opening paragraph','',{wide:1,ta:3}):fi('subject','Subject line','e.g. Stage 2 payment.',{wide:1})}
   </div>
   ${q?`<div class="box-h"><h2>Details</h2><span class="code">e.g. Project : Residence · Fees : 77/- per sqft</span></div><div class="tbl-wrap"><table><tbody>${(d.details||[]).map((x,i)=>`<tr><td style="width:34%"><input data-dmdl="${i}" value="${esc(x[0])}" placeholder="Label"></td><td><input data-dmdv="${i}" value="${esc(x[1])}" placeholder="Value"></td><td style="width:44px"><button type="button" class="btn sm ghost" data-dmrm="details:${i}" aria-label="Remove line">${ico('x')}</button></td></tr>`).join('')}</tbody></table></div>
     <div class="srow"><button type="button" class="btn sm" data-dmadd="details">${ico('plus')}<span>Add detail line</span></button></div>`:''}
   <div class="box-h"><h2>${q?'Amounts (optional)':'Items'}</h2><span class="code" id="dmTot"></span></div>
   <div class="tbl-wrap"><table><thead><tr><th>Description</th><th class="num">Amount (₹)</th><th></th></tr></thead><tbody>${(d.items||[]).map((x,i)=>`<tr><td><textarea data-dmid="${i}" rows="1" style="width:100%;min-width:200px" placeholder="e.g. Stage 2 payment (Final plan & 3D with execution drawings)">${esc(x.d)}</textarea></td><td class="num"><input data-dmia="${i}" value="${esc(x.amt)}" inputmode="decimal" style="width:120px;text-align:right"></td><td style="width:44px"><button type="button" class="btn sm ghost" data-dmrm="items:${i}" aria-label="Remove item">${ico('x')}</button></td></tr>`).join('')}</tbody></table></div>
   <div class="srow"><button type="button" class="btn sm" data-dmadd="items">${ico('plus')}<span>Add item</span></button>
     ${!q&&stageOpts.length?`<select id="dm-stage"><option value="">Bill a payment stage from the quotation…</option>${stageOpts.map(o=>`<option value="${o.r.id}:${o.i}">Stage ${o.i+1} — ${esc(o.s[0])} (${o.s[1]}%${o.amt?' = '+inr(o.amt):''})</option>`).join('')}</select>`:''}
     <label class="code">GST<select data-dm="gst">${['No GST','GST 18%','GST 12%','GST 5%'].map(g=>`<option ${d.gst===g?'selected':''}>${g}</option>`).join('')}</select></label>
     ${!q?`<label class="code">Received so far (₹)<input data-dm="got" value="${esc(d.got)}" inputmode="decimal" style="width:120px"></label>`:''}</div>
   ${q?`<div class="box-h"><h2>Scope of services</h2><label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="dm-np" ${d.newPage?'checked':''} style="width:auto">Scope & payment on new pages</label></div>
     <div class="e2form">${fi('scopeTitle','Heading','SCOPE OF WORK',{wide:1})}${fi('scope','One item per line','',{wide:1,ta:6})}</div>
     <div class="box-h"><h2>Schedule of payment</h2><span class="code">${(d.stages||[]).reduce((s,x)=>s+n(x[1]),0)}% in total</span></div>
     <div class="tbl-wrap"><table><tbody>${(d.stages||[]).map((x,i)=>`<tr><td class="code" style="width:60px">Stage ${i+1}</td><td><input data-dmsn="${i}" value="${esc(x[0])}" placeholder="e.g. Advance"></td><td style="width:90px"><input data-dmsp="${i}" value="${esc(x[1])}" inputmode="decimal" placeholder="%" style="width:70px;text-align:right"></td><td style="width:44px"><button type="button" class="btn sm ghost" data-dmrm="stages:${i}" aria-label="Remove stage">${ico('x')}</button></td></tr>`).join('')}</tbody></table></div>
     <div class="srow"><button type="button" class="btn sm" data-dmadd="stages">${ico('plus')}<span>Add stage</span></button></div>`:''}
   <div class="e2form">${fi('terms',q?'Closing paragraphs (one per line)':'Notes / terms (one per line)','',{wide:1,ta:3})}${q?fi('closing','Sign-off','Thanking you,'):''}
     ${!q?`<label class="pl-chk" style="align-self:end"><input type="checkbox" id="dm-bank" ${d.showBank?'checked':''}>Show bank details</label>`:''}
     <label>Status<select data-dm="status">${(q?['Sent','Accepted','Rejected']:['Unpaid','Part paid','Paid','Sent']).map(s=>`<option ${d.status===s?'selected':''}>${s}</option>`).join('')}</select></label></div>
   ${isAdmin()?`<div class="box-h"><h2>Save as a template</h2><span class="code">Heading, text, details, items, scope, stages and terms</span></div><div class="srow">
     <input id="dm-tname" list="dmTplNames" placeholder="Template name, e.g. Template-1" style="flex:1;min-width:180px" value="${esc(DM.tname||'')}"><datalist id="dmTplNames">${docTpls(d.kind).map(x=>`<option value="${esc(x.name)}">`).join('')}</datalist>
     <label class="code" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="dm-tdef" checked style="width:auto">Start new ${q?'quotations':'invoices'} with it</label>
     <button type="button" class="btn sm" id="dmTplSave">${ico('check')}<span>Save template</span></button></div>
     ${docTpls(d.kind).length?`<div class="srow"><span class="code">Saved:</span>${docTpls(d.kind).map(x=>`<span class="pill p-grey">${esc(x.name)}${x.def?' · default':''} <button type="button" class="linkish" data-dmtdel="${esc(x.id)}" aria-label="Delete template ${esc(x.name)}">✕</button></span>`).join('')}</div>`:''}`:''}
  </div>`;
  const right=`<div class="box dm-side"><div class="box-h"><h2>Preview</h2><span class="code">${org.lh&&org.lh.id?'On your letterhead':`<a href="#" data-go="settings">Add your letterhead in Settings</a>`}</span></div>
    <div class="srow dm-acts">${CANW?`<button class="btn pri" id="dmSave">${ico('check')}<span>Save</span></button>`:''}
      <button class="btn" id="dmPdf">${ico('file-down')}<span>PDF</span></button><button class="btn" id="dmPptx">${ico('presentation')}<span>PowerPoint (editable)</span></button></div>
    <div class="srow dm-acts"><button class="btn" id="dmWa">${ico('message-circle')}<span>WhatsApp</span></button><button class="btn" id="dmMail">${ico('mail')}<span>Email</span></button>
      <button class="btn" id="dmFile">${ico('share-2')}<span>Send PDF file</span></button><button class="btn ghost" id="dmMore">More…</button></div>
    <div id="dmPrev" class="dm-prev"><div class="empty">Preparing preview…</div></div></div>`;
  setTimeout(docPreview,0);
  const list=D.invoices.filter(r=>inProj(r)).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||0)-(a.at||0)).slice(0,12);
  const recent=`<div class="box"><div class="box-h"><h2>Recent quotations & invoices</h2></div>${list.length?`<div class="tbl-wrap"><table><tbody>${list.map(r=>`<tr${DM.id===r.id?' class="e2ed"':''}><td>${esc(r.kind)}<div class="code">${esc(r.no||'')}</div></td><td>${esc(cname(r.client))}<div class="code">${fd(r.date)}</div></td><td class="num">${inr(invTotal(r))}</td><td><span class="pill p-grey">${esc(r.status||'')}</span></td><td><button class="btn sm" data-dmopen="${r.id}">${ico('pencil')}<span>Open</span></button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">None yet.</div>'}</div>`;
  return header('Quotations & invoices',`<button class="btn" data-dmnew="Quotation">${ico('plus')}<span>New quotation</span></button><button class="btn pri" data-dmnew="Tax invoice">${ico('plus')}<span>New invoice</span></button>`)+`<div class="dm-grid">${left}${right}</div>`+recent;
}
function docUpPage(d,q,fi,kinds){
  const u=d.up||null,L=q?'quotation':'invoice';
  const left=`<div class="box"><div class="box-h"><h2>${q?'Quotation':'Invoice'} details</h2>${DM.id?'<span class="pill p-green">Saved</span>':'<span class="pill p-amber">Not saved yet</span>'}</div>
   ${kinds}
   <div class="e2form">
    <label class="dm-drop" id="dmDrop">${ico('upload')}<b>${u?'Replace the file':`Drop your ready ${L} here`}</b><span class="code">${u?esc(u.name)+' · '+Math.max(1,Math.round((u.size||0)/1024))+' KB':'or tap to choose · PDF, Word, Excel or a photo'}</span><input type="file" id="dm-upfile" accept="${DM_UP_ACCEPT}"></label>
    ${fi('no','Number','')}${fi('date','Date','',{type:'date'})}
    <label>Project<select id="dm-proj"><option value="">—</option>${PJ().map(p=>`<option value="${p.id}" ${d.project===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Client<select id="dm-client"><option value="">— type below —</option>${D.clients.map(c=>`<option value="${c.id}" ${d.client===c.id?'selected':''}>${esc(c.name||'')}</option>`).join('')}</select></label>
    ${fi('toName',q?'To (name)':'Bill to (name)','e.g. Mrs. Voggu Srilatha',{wide:1})}${fi('toPhone','Client phone (WhatsApp)','')}${fi('toEmail','Client email','')}
    <label class="wide">Description of work<input data-dmup="d" value="${esc(((d.items||[])[0]||{}).d||'')}" placeholder="e.g. Structural design of G+3 residence"></label>
    <label>Amount before tax (₹)<input data-dmup="amt" value="${esc(((d.items||[])[0]||{}).amt||'')}" inputmode="decimal"></label>
    <label>GST<select data-dm="gst">${['No GST','GST 18%','GST 12%','GST 5%'].map(g=>`<option ${d.gst===g?'selected':''}>${g}</option>`).join('')}</select></label>
    ${!q?`<label>Received so far (₹)<input data-dm="got" value="${esc(d.got)}" inputmode="decimal"></label>`:''}
    <label>Status<select data-dm="status">${(q?['Sent','Accepted','Rejected']:['Unpaid','Part paid','Paid','Sent']).map(s=>`<option ${d.status===s?'selected':''}>${s}</option>`).join('')}</select></label>
   </div><div class="srow"><span class="code" id="dmTot"></span></div></div>`;
  const prev=!u?`<div class="empty">Your ${L} file will show here.</div>`:/^image\//.test(u.type||'')?`<img class="dm-upimg" src="/_blob/${esc(u.id)}" alt="${esc(u.name)}">`:/pdf/.test(u.type||'')?`<div class="empty" id="dmUpPdf">Opening the PDF…</div>`
    :`<div class="empty">${ico('file')}<div><b>${esc(u.name)}</b></div><div class="code">${esc(u.type||'File')} — opens in the app that made it</div></div>`;
  const right=`<div class="box dm-side"><div class="box-h"><h2>Preview</h2><span class="code">Your own file is sent as it is</span></div>
    <div class="srow dm-acts">${CANW?`<button class="btn pri" id="dmSave">${ico('check')}<span>Save</span></button>`:''}<button class="btn" id="dmPdf" ${u?'':'disabled'}>${ico('file-down')}<span>Download</span></button></div>
    <div class="srow dm-acts"><button class="btn" id="dmWa">${ico('message-circle')}<span>WhatsApp</span></button><button class="btn" id="dmMail">${ico('mail')}<span>Email</span></button>
      <button class="btn" id="dmFile" ${u?'':'disabled'}>${ico('share-2')}<span>Send file</span></button><button class="btn ghost" id="dmMore">More…</button></div>
    <div id="dmPrev" class="dm-prev">${prev}</div></div>`;
  setTimeout(docUpShow,0);
  const list=D.invoices.filter(r=>inProj(r)).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||0)-(a.at||0)).slice(0,12);
  const recent=`<div class="box"><div class="box-h"><h2>Recent quotations & invoices</h2></div>${list.length?`<div class="tbl-wrap"><table><tbody>${list.map(r=>`<tr${DM.id===r.id?' class="e2ed"':''}><td>${esc(r.kind)}${(r.tpl||{}).up?' <span class="pill p-grey">uploaded</span>':''}<div class="code">${esc(r.no||'')}</div></td><td>${esc(cname(r.client))}<div class="code">${fd(r.date)}</div></td><td class="num">${inr(invTotal(r))}</td><td><button class="btn sm" data-dmopen="${esc(r.id)}">Open</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Nothing yet.</div>'}</div>`;
  return header('Quotations & invoices',`<button class="btn" data-dmnew="Quotation">${ico('plus')}<span>New quotation</span></button><button class="btn pri" data-dmnew="Tax invoice">${ico('plus')}<span>New invoice</span></button>`)+`<div class="dm-grid">${left}${right}</div>`+recent;
}
async function docUpShow(){const d=DM&&DM.d,u=d&&d.up;const t=d&&docTotals(d),s=document.getElementById('dmTot');if(s&&t)s.textContent=`Total ${inr2(t.total)}${t.rate?` (incl. GST ${t.rate*100}%)`:''}`;
  const box=document.getElementById('dmUpPdf');if(!box||!u)return;
  try{const r=await bmBlob(u.id,false);const b=await r.blob();if(!document.body.contains(box))return;const url=URL.createObjectURL(new Blob([b],{type:'application/pdf'}));
    if(DMURL)try{URL.revokeObjectURL(DMURL);}catch(_){}DMURL=url;
    box.outerHTML=`<iframe class="dm-upprev" title="${esc(u.name)}" src="${url}"></iframe><div class="code" style="text-align:center;padding:6px">PDF not showing on this phone? Use Download.</div>`;}catch(e){box.textContent='Could not open the preview — use Download.';}}
async function docUpBlob(){const u=DM.d.up;if(!u)throw new Error('Upload the file first.');const r=await bmBlob(u.id,false);const b=await r.blob();return new File([b],u.name||'document',{type:u.type||b.type||'application/octet-stream'});}
async function docUpFile(file){
  if(!file)return;if(!A||!CANW){toast('Uploading needs permission to add entries.');return;}if(file.size>(/^image\//.test(file.type||'')?30:10)*1048576){toast('The file is over 10 MB.');return;}
  const ty=file.type||fileType(file.name)||'application/octet-stream';
  toast('Uploading…');try{const r=await A.upload(file,{type:ty});DM.d.up={id:r.id,name:file.name||'document',type:ty,size:file.size};
    if(!DM.d.no||DM.d.no===docNextNo(DM.d.kind)){const base=String(file.name||'').replace(/\.[^.]+$/,'');const m=/(?:^|[^A-Za-z])((?:QT|INV|PI|RA)[\s\-_#:]?\d[\w\-\/]*)/i.exec(base);   // e.g. QT-77, INV_2026_14
      if(m){const no=m[1].replace(/[\s_#:]+/g,'-').toUpperCase();if(!D.invoices.some(r=>r.no===no&&r.id!==DM.id))DM.d.no=no;}}
    render();toast('File added — fill in the details and Save');}catch(e){toast((e&&e.message)||'Upload failed');}}
async function lhSave(f){
  const g=id=>document.getElementById(id),A=window.STORE||null;const up=async inp=>{const file=inp&&inp.files&&inp.files[0];if(!file)return null;
    if(!/^image\/(png|jpe?g)$/.test(file.type)){toast('Use a PNG or JPG image.');throw new Error('type');}const r=await gasApi('upload',{b64:await new Promise((ok,no)=>{const fr=new FileReader();fr.onload=()=>ok(String(fr.result).split(',')[1]||'');fr.onerror=no;fr.readAsDataURL(file);}),name:file.name,type:file.type});return r.id;};
  const o=orgMain();let lhId,sigId;try{toast('Saving…');lhId=await up(g('lh-file'));sigId=await up(g('lh-sig'));}catch(e){if(e.message!=='type')toast('Upload failed: '+(e.message||''));return;}
  const patch={lh:{id:lhId||(o.lh||{}).id||'',top:n(g('lh-top').value)||45,bottom:n(g('lh-bot').value)||40},person:g('lh-person').value.trim(),email:g('lh-email').value.trim(),holder:g('lh-holder').value.trim(),acctype:g('lh-acctype').value.trim()};
  if(sigId)patch.sig={id:sigId};
  const ok=await write(()=>db.doc('org/main').update(patch),'Letterhead saved');if(ok)render();
}
PK.done("estimates");
