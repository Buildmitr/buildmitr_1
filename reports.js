/* ================= Admin panel → Daily PDF reports on WhatsApp =================
   The server makes one PDF per project at 7:30 am (yesterday's work + today's plan) and
   7:30 pm (today's work + tomorrow's plan) and sends it on WhatsApp to the people the admin
   ticks here. Each person gets only the projects on their Team entry, and only what their
   role may see (money only for roles with payments; clients get a client copy). */
const DRP={cfg:null,err:'',busy:0,msg:'',pv:{kind:'pm',view:'full'}};
async function drpLoad(){if(DRP.busy)return;DRP.busy=1;DRP.org=CLOUD.org;try{DRP.cfg=await gasApi('drpGet',{});DRP.err='';}catch(e){DRP.err=/Unknown request/i.test(e.message||'')?'Needs the server update — deploy the new server version.':(e.message||'Could not load');}DRP.busy=0;if(S.view==='adminpanel')render();}
const drpRoleSees=r=>{if(r==='Client')return 'Client copy of their project';if(r==='Sub-contractor')return 'Work done and plan — no money, tasks or issues';const a=ROLE_VIEWS[r];if(!a)return '';const has=v=>a===V_ALL||a.includes(v);if(!has('dpr')&&!has('tasks'))return '';return has('payments')?'Full report (with money)':'Work, labour, tasks'+(has('issues')?' & issues':'')+' — no money';};
const drpPhoneOk=p=>{let d=String(p||'').replace(/\D/g,'');if(d.length===10)d='91'+d;return d.length>=11&&d.length<=15;};
function drpBox(){
  if(DRP.org&&DRP.org!==CLOUD.org){DRP.cfg=null;DRP.err='';DRP.msg='';DRP.org=null;}   // another company was opened
  const h=`<div class="box-h">${ico('file-text')}<h2>Daily PDF reports on WhatsApp</h2>${DRP.cfg?`<span class="pill ${DRP.cfg.cfg.on?'p-green':'p-grey'}">${DRP.cfg.cfg.on?[DRP.cfg.cfg.am?'7:30 am':'',DRP.cfg.cfg.pm?'7:30 pm':''].filter(Boolean).join(' + ')||'On':'Off'}</span>`:''}</div>`;
  if(!DRP.cfg&&!DRP.err){drpLoad();return `<div class="box">${h}<div class="empty">Loading…</div></div>`;}
  if(!DRP.cfg)return `<div class="box">${h}<div class="note warn">${ico('alert-triangle')}<span style="flex:1">${esc(DRP.err)}</span><button type="button" class="btn sm" id="drpRetry">Try again</button></div></div>`;
  const c=DRP.cfg.cfg,wa=DRP.cfg.wa||{},pick=new Set(c.people||[]);
  const team=(D.team||[]).filter(t=>!/removed|inactive/i.test(String(t.status||''))&&t.role!=='Client');
  const pnames=t=>{const ps=(t.projects||[]);return t.role==='Admin'&&!ps.length||ps.includes('all')?'All projects':ps.map(id=>(proj(id)||{}).name).filter(Boolean).join(', ')||'No projects';};
  const pdfMode=wa.mode==='api'&&wa.api&&c.tpl;
  const live=PJ().filter(p=>!projArch(p.id));
  const log=(DRP.cfg.last&&DRP.cfg.last.log)||[];
  return `<div class="box" id="drpBox">${h}<div style="padding:0 16px 16px;display:grid;gap:12px;max-width:760px">
    <label class="pl-chk"><input type="checkbox" id="drp-on" ${c.on?'checked':''}> <b>Send daily PDF reports, one per project</b></label>
    <div class="dig-k"><label class="pl-chk"><input type="checkbox" id="drp-am" ${c.am?'checked':''}> <b>Morning</b> — 7:30 am</label><div class="code">Yesterday's work, labour, material and site photos, plus today's plan.${DRP.cfg.last.am?` Last sent ${esc(fd(DRP.cfg.last.am))}.`:''}</div></div>
    <div class="dig-k"><label class="pl-chk"><input type="checkbox" id="drp-pm" ${c.pm?'checked':''}> <b>Evening</b> — 7:30 pm</label><div class="code">Today's work, labour, material and site photos, plus tomorrow's plan.${DRP.cfg.last.pm?` Last sent ${esc(fd(DRP.cfg.last.pm))}.`:''}</div></div>
    <div><b>Who gets them</b> <span class="code">— each person gets only the projects on their Team entry, with what their role may see</span>
      <div class="dig-ppl">${team.length?team.map(t=>{const ok=drpPhoneOk(t.phone),sees=drpRoleSees(t.role);return `<label class="pl-chk"><input type="checkbox" data-drpto="${esc(t.id)}" ${pick.has(t.id)?'checked':''} ${ok&&sees?'':'disabled'}> <span><b data-notr>${esc(t.name||'')}</b> <span class="code">${esc(t.role||'')} · ${esc(pnames(t))} · ${ok?esc(sees||'No daily reports for this role'):'no valid mobile number on Team page'}</span></span></label>`;}).join(''):'<div class="code">Add people with a mobile number on the Team page first.</div>'}</div></div>
    <label class="pl-chk"><input type="checkbox" id="drp-cl" ${c.clients?'checked':''}> Also send each client a <b>client copy</b> of their own project (work done, progress, photos, plan, next payment stage — no costs, labour or internal issues). Uses the phone on the client's record.</label>
    <div class="dig-k"><b>How the PDF is sent</b>
      <div class="code">${pdfMode?`${ico('check')} As a PDF attachment through your WhatsApp Business account, template <b data-notr>${esc(c.tpl)}</b>.`:wa.mode==='api'&&wa.api?'WhatsApp Business is connected. Enter the name of your approved PDF template below to send the PDF itself; until then a link to the PDF is sent.':`Until the WhatsApp Business (Cloud) API is set up in Settings → WhatsApp updates, a message with a link to each PDF is sent instead — only to numbers that have a CallMeBot key there.`}</div>
      <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap"><label class="ag-f" style="min-width:220px"><span class="code">PDF template name (Meta)</span><input id="drp-tpl" value="${esc(c.tpl||'')}" placeholder="e.g. daily_report_pdf"></label><label class="ag-f" style="max-width:120px"><span class="code">Language</span><input id="drp-lang" value="${esc(c.lang||'en')}" placeholder="en"></label></div>
      <div class="code">The template needs a <b>Document</b> header and one body variable {{1}} (the summary line). Create it in Meta WhatsApp Manager → Message templates (category Utility) and wait for approval.</div></div>
    ${DRP.cfg.timer===false?`<div class="note warn">${ico('alert-triangle')}<span>The 7:30 timer is not running yet on the server (Apps Script: run <b>drpInstall</b> once).</span></div>`:''}
    <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap"><button type="button" class="btn pri" id="drpSave">${ico('check')}<span>Save</span></button>${DRP.msg?`<span class="code">${esc(DRP.msg)}</span>`:''}</div>
    <div class="dig-k"><b>Try it now</b>
      <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap">
        <select id="drp-proj" aria-label="Project">${live.map(p=>`<option value="${esc(p.id)}">${esc(pname(p.id))}</option>`).join('')}</select>
        <select id="drp-kind" aria-label="Morning or evening"><option value="am" ${DRP.pv.kind==='am'?'selected':''}>Morning</option><option value="pm" ${DRP.pv.kind==='pm'?'selected':''}>Evening</option></select>
        <select id="drp-view" aria-label="Copy"><option value="full">Full copy</option><option value="site" ${DRP.pv.view==='site'?'selected':''}>Site team copy (no money)</option><option value="client" ${DRP.pv.view==='client'?'selected':''}>Client copy</option></select>
        <button type="button" class="btn" id="drpPrev" ${live.length?'':'disabled'}>${ico('download')}<span>Preview PDF</span></button></div>
      <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap">
        <select id="drp-person" aria-label="Send a test to">${team.filter(t=>drpPhoneOk(t.phone)&&drpRoleSees(t.role)).map(t=>`<option value="${esc(t.id)}">${esc(t.name||'')} (${esc(t.role||'')})</option>`).join('')}</select>
        <button type="button" class="btn" id="drpTest" ${live.length?'':'disabled'}>${ico('send')}<span>Send test on WhatsApp</span></button></div></div>
    ${log.length?`<div class="dig-k"><b>Last run</b><div class="code">${log.slice(0,1).map(x=>x.at?`${esc(new Date(x.at).toLocaleString(LOC()))} · ${x.kind==='pm'?'evening':'morning'} · ${x.sent} sent`:'').join('')}</div>${log.slice(1,12).map(x=>`<div class="code">${esc(x.to)} · ${esc(x.p)} · ${x.err?'<b style="color:var(--red-ink)">'+esc(x.err)+'</b>':x.ok==='pdf'?'PDF sent':'link sent'}</div>`).join('')}</div>`:''}
  </div></div>`;
}
function drpRead(){const g=id=>document.getElementById(id);return {on:g('drp-on').checked,am:g('drp-am').checked,pm:g('drp-pm').checked,clients:g('drp-cl').checked,tpl:g('drp-tpl').value.trim(),lang:g('drp-lang').value.trim()||'en',
  people:[...document.querySelectorAll('[data-drpto]')].filter(x=>x.checked&&!x.disabled).map(x=>x.dataset.drpto)};}
document.addEventListener('click',async e=>{if(e.target.closest&&e.target.closest('#drpRetry')){DRP.err='';DRP.cfg=null;render();return;}
  const b=e.target.closest&&e.target.closest('#drpSave,#drpPrev,#drpTest');if(!b||!document.getElementById('drpBox'))return;e.preventDefault();
  if(b.disabled)return;b.disabled=true;const g=id=>(document.getElementById(id)||{}).value;
  try{
    if(b.id==='drpSave'){const c=drpRead();if(c.on&&!c.people.length&&!c.clients){toast('Tick at least one person.');return;}DRP.cfg=await gasApi('drpSet',{cfg:c});DRP.msg='Saved.';toast('Daily PDF reports saved');}
    if(b.id==='drpPrev'){DRP.pv={kind:g('drp-kind'),view:g('drp-view')};toast('Making the PDF…');const j=await gasApi('drpTest',{project:g('drp-proj'),kind:DRP.pv.kind,view:DRP.pv.view,preview:true});
      const bin=atob(j.b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const url=URL.createObjectURL(new Blob([u],{type:'application/pdf'}));
      const w=window.open(url,'_blank');if(!w){const a=document.createElement('a');a.href=url;a.download=j.name||'report.pdf';document.body.appendChild(a);a.click();a.remove();}setTimeout(()=>URL.revokeObjectURL(url),60000);}
    if(b.id==='drpTest'){if(!g('drp-person')){toast('Add a mobile number on the Team page first.');return;}if(!confirm('Send a test PDF on WhatsApp now?'))return;toast('Sending…');
      const j=await gasApi('drpTest',{project:g('drp-proj'),kind:g('drp-kind'),person:g('drp-person')});const er=(j.log||[]).find(x=>x.err);
      toast(j.sent?`Sent (${(j.log[0]||{}).ok==='pdf'?'PDF attachment':'PDF link'})`:er?er.err:'Nothing sent — this person cannot open that project.');}
  }catch(x){toast(/Unknown request/i.test(x.message||'')?'Needs the server update — deploy the new server version.':(x.message||'Something went wrong'));}
  finally{b.disabled=false;if(b.id==='drpSave')render();}
},true);
if(typeof S!=='undefined'&&S.view==='adminpanel'&&S.ready)render();
