/* bm-build:f3afea8ba48a */
/* BuildMitr page code: ai */
function aiPrompt(){
  const cols=AI_COLS.map(c=>`${c}: ${colFields(c).map(f=>f.k+(f.req?'*':'')).join(', ')}`).join('\n');
  return `You are the assistant inside BuildMitr, a construction project management app used by ${orgName()} (India). Today is ${today()}. The user is ${ME.name||'a team member'} (${ME.isOwner?'owner':ME.canEdit?'editor':'team member'})${S.demo?'; the app is showing DEMO sample data':''}.
Answer only from the app's data using the tools; never invent records, phone numbers or amounts. Amounts are Indian rupees (₹, use lakh/crore style like ₹12,50,000). Be brief and clear, suitable for site staff; use short lists. If something is not in the data, say so.
Only create records when the user clearly asks to add/create; if a required field is missing or a name is ambiguous, ask a short question instead of guessing. After creating, confirm what was saved. Never delete anything. For exports call export_data and tell the user to tap Download.
Current project filter: ${S.proj==='all'?'all projects':pname(S.proj)}. Projects: ${D.projects.map(p=>pname(p.id)).join('; ')||'none yet'}.
Collections and field keys (* = required):\n${cols}`;}
function aiMsg(role,text){const box=document.getElementById('aiMsgs');const d=document.createElement('div');d.className='ai-m '+(role==='user'?'u':'a');d.textContent=text;box.appendChild(d);box.scrollTop=box.scrollHeight;return d;}
async function aiAsk(q){
  if(AI.gemini)return aiAskGemini(q);
  if(AI.busy||!q.trim())return;
  if(!AI.sample){aiMsg('assistant',S.web?'The AI assistant works in the team version of BuildMitr inside Claude. On the website it needs an AI service account connected first.':'AI is not available in this view.');return;}
  AI.busy=true;document.getElementById('aiSend').textContent='Stop';
  aiMsg('user',q);AI.turns.push({role:'user',content:q});
  const out=aiMsg('assistant','Thinking…');out.classList.add('think');
  AI.ctl=new AbortController();
  try{
    const {text}=await AI.sample([{role:'user',content:aiPrompt()},{role:'assistant',content:'Understood. I will use the tools and the app data only.'},...AI.turns.slice(-12)],{tools:AI_TOOLS,signal:AI.ctl.signal,modelTier:'default',effort:'low',
      onText:({text})=>{out.classList.remove('think');out.textContent=text;document.getElementById('aiMsgs').scrollTop=1e9;}});
    out.classList.remove('think');out.textContent=text;AI.turns.push({role:'assistant',content:text});
  }catch(e){out.classList.remove('think');
    if(e&&e.code==='cancelled'){out.textContent=(e.text||'')+(e.text?'\n':'')+'(stopped)';}
    else{out.textContent=(e&&e.text?e.text+'\n\n':'')+(AI_ERR[e&&e.code]||'Something went wrong. Please try again.');}
    if(e&&e.text)AI.turns.push({role:'assistant',content:e.text});else AI.turns.pop();
    if(e&&['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(e.code)){AI.sample=null;}
  }finally{AI.busy=false;AI.ctl=null;document.getElementById('aiSend').textContent='Send';aiRender();}
}
async function aiTool(name,args){
  const a=args||{};
  if(name==='prepare_form')return aiPrepareForm(a);
  if(name==='open_record')return aiOpenRecord(a);
  const t=AI_TOOLS.find(x=>x.name===name);
  if(!t||name==='create_record')throw new Error('Unknown tool '+name);
  if(name==='open_screen'&&!canView(String(a.screen))&&!['dashboard','projects','settings'].includes(String(a.screen)))throw new Error('This person does not have access to that screen.');
  return await t.execute(a,{signal:{aborted:false}});
}
function aiPrepareForm(a){
  const c=String(a.collection||'');const fs=colFields(c);if(!fs.length)throw new Error('Unknown form '+c);
  if(c!=='projects'&&!canView(c))throw new Error('This person cannot add to '+c);
  if(c==='team'&&!isAdmin())throw new Error('Only the admin can add team members.');
  if(!CANW0)throw new Error('This person has view-only access.');
  let inF={};try{inF=typeof a.fields_json==='string'?JSON.parse(a.fields_json||'{}'):(a.fields_json||{});}catch(_){throw new Error('fields_json is not valid JSON');}
  const pre={},missing=[],problems=[];
  for(const f of fs){let v=inF[f.k]??inF[f.l];
    if((v===undefined||v==='')&&f.def==='today')v=today();
    if((v===undefined||v==='')&&f.k==='project'&&S.proj!=='all')v=S.proj;
    if(v===undefined||v===''||v===null){if(f.req)missing.push(f.l);continue;}
    try{pre[f.k]=f.t==='project'&&v===S.proj?v:toRef(f,v);}catch(e){problems.push(e.message);}}
  if(c==='projects'&&!pre.client&&inF.client){try{pre.client=toRef({t:'client'},inF.client);}catch(e){problems.push(e.message);}}
  if(problems.length)return {ready:false,problems,ask_user:'Ask the user to correct these before preparing the form.'};
  if(missing.length)return {ready:false,missing,ask_user:'Ask the user for these required fields, then call prepare_form again.'};
  if(c==='dpr'&&!dprWork(pre).trim())return {ready:false,missing:['Work done today: items as [{trade,work}] or work'],ask_user:'Ask the user what work was done today.'};
  const lbl=c==='projects'?'Project':MOD[c].label;
  const rows=Object.entries(pre).map(([k,v])=>{const f=fs.find(x=>x.k===k);return `<div><span class="code">${esc(f?f.l:k)}</span> <b data-notr>${esc(String(readable(c,{[k]:v})[k]??v))}</b></div>`;}).join('');
  AI.forms=AI.forms||{};const fid='f'+Date.now().toString(36);AI.forms[fid]={c,pre};
  aiCard(`<div style="display:grid;gap:4px;width:100%">${ico('clipboard-check')} <b>${esc(lbl)} — ready for your review</b>${rows}<span class="code">Nothing is saved yet. Review and edit it, then tap Save in the form.</span></div>`,
    `<button class="btn sm pri" data-aiform="${fid}">${ico('pencil')}Review & save</button>`);
  return {ready:true,shown_to_user:true,saved:false,note:'The filled form is shown to the user to review, edit and save. Tell them to tap "Review & save".'};
}
function aiOpenRecord(a){
  const c=String(a.collection||'');
  if(c==='me'){S.view='settings';render();return {opened:'My profile in Settings'};}
  if(c!=='projects'&&!canView(c))throw new Error('This person does not have access to '+c);
  const list=c==='projects'?PJ():D[c].filter(r=>!r.project||projOK(r.project));
  const key=c==='projects'?'name':(colFields(c).find(f=>f.k==='name'||f.k==='title')||{k:'name'}).k;
  const id=findByName(list,a.name||'',c==='projects'?'project':'record',key);
  if(c==='projects'){S.proj=id;S.view='project';render();return {opened:pname(id),record:readable(c,proj(id))};}
  const r=D[c].find(x=>x.id===id);S.view=c;S.q=String(r[key]||'');S.fwho='';render();
  return {opened:String(r[key]||''),record:readable(c,r)};
}
function aiTrim(g){let x=g.slice(-16);while(x.length&&(x[0].role!=='user'||x[0].parts.some(p=>p.functionResponse)))x.shift();return x;}
async function aiAskGemini(q){
  if(AI.busy||!q.trim())return;
  const max=(AI.usage&&AI.usage.maxInput)||600;if(q.length>max){aiMsg('assistant',`Please keep the question under ${max} characters.`);return;}
  AI.busy=true;AI.lastQ=q;const send=document.getElementById('aiSend');send.textContent='Stop';
  aiMsg('user',q);const start=AI.g.length;AI.g.push({role:'user',parts:[{text:q}]});AI.turns.push({role:'user',content:q});
  const out=aiMsg('assistant','Thinking…');out.classList.add('think');AI.stop=false;
  try{
    for(let round=0;round<6;round++){
      if(AI.stop)throw {code:'cancelled'};
      const j=await gasApi('ai',{contents:aiTrim(AI.g),screen:S.view});
      AI.usage={used:j.used,limit:j.limit,maxInput:max};aiUsageLine();
      const parts=(j.content&&j.content.parts)||[];AI.g.push({role:'model',parts});
      const calls=parts.filter(p=>p.functionCall);const text=parts.filter(p=>p.text).map(p=>p.text).join('\n').trim();
      if(!calls.length){aiFill(out,text||'(no answer)');AI.turns.push({role:'assistant',content:text});return;}
      out.textContent='Looking at your data…';
      const resp=[];
      for(const c of calls){let r;try{r=await aiTool(c.functionCall.name,c.functionCall.args);}catch(e){r={error:String(e&&e.message||e)};}
        resp.push({functionResponse:{name:c.functionCall.name,response:(r&&typeof r==='object'&&!Array.isArray(r))?r:{result:r}}});}
      AI.g.push({role:'user',parts:resp});
    }
    aiFill(out,'That needed too many steps. Please ask in a simpler way.');
  }catch(e){
    AI.g.length=start;AI.turns.pop();out.classList.remove('think');
    if(e&&e.code==='cancelled'){out.textContent='(stopped)';}
    else{out.textContent=(e&&e.message)||'Something went wrong. Please try again.';out.classList.add('err');
      if(!['ai_limit','ai_nokey','ai_off','denied'].includes(e&&e.code)){const b=document.createElement('button');b.className='btn sm';b.dataset.airetry='1';b.textContent='Retry';out.appendChild(document.createElement('br'));out.appendChild(b);}}
  }finally{AI.busy=false;send.textContent='Send';aiRender();}
}
function aiMd(t){return esc(t).replace(/^#{1,4} +(.+)$/gm,'<b>$1</b>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`([^`\n]+)`/g,'<span class="code">$1</span>').replace(/^(\s*)[*-] +/gm,'$1• ');}
function aiFill(out,text){
  out.classList.remove('think');out.textContent='';const body=document.createElement('div');body.className='ai-body';body.innerHTML=aiMd(text);out.appendChild(body);
  const bar=document.createElement('div');bar.className='ai-acts';
  if(text.length>700){out.classList.add('ai-long');const more=document.createElement('button');more.className='linkish';more.textContent='Show full answer';more.dataset.aimore='1';bar.appendChild(more);}
  const cp=document.createElement('button');cp.className='linkish';cp.textContent='Copy';cp.dataset.aicopy='1';bar.appendChild(cp);
  const sh=document.createElement('button');sh.className='linkish';sh.textContent='Share';sh.dataset.aishare='1';bar.appendChild(sh);out.appendChild(bar);
  document.getElementById('aiMsgs').scrollTop=1e9;
}
function aiUsageLine(){const s=document.getElementById('aiSub');if(!s)return;s.textContent=AI.usage&&AI.usage.limit?`${AI.usage.used}/${AI.usage.limit} questions today`:'Ask about clients, team, projects, money';}
function aiClear(){AI.g=[];AI.turns=[];AI.forms={};const b=document.getElementById('aiMsgs');if(b)b.innerHTML='';aiRender();}
PK.done("ai");
