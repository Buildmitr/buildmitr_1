/* bm-build:843acea6e124 */
/* BuildMitr page code: chat */
function tickState(m,key){
  const mem=threadMembers(m.project,m.grp).filter(x=>x.id!==m.from);
  const seenBy=mem.filter(x=>lastSeen(key,x.id)>=m.at);
  const men=(m.mentions||[]).filter(id=>mem.some(x=>x.id===id));
  if(mem.length&&seenBy.length===mem.length)return {cls:'red',txt:'✓✓',title:'Seen by everyone in this chat',seenBy,mem};
  if(men.length&&men.every(id=>seenBy.some(x=>x.id===id)))return {cls:'blue',txt:'✓✓',title:'Seen by '+men.map(chatName).join(', '),seenBy,mem};
  return {cls:'grey',txt:seenBy.length?'✓✓':'✓',title:seenBy.length?'Seen by '+seenBy.map(x=>x.name).join(', '):'Sent',seenBy,mem};
}
function projPeople(pid){
  const by=c=>D.team.filter(t=>CAT_OF[t.role]===c&&t.status!=='Removed'&&(pid===CO?c!=='client':((t.projects||[]).includes(pid)||((t.projects||[]).includes('all')&&c!=='client'))));
  const p=proj(pid);const cl=p&&p.client?D.clients.find(c=>c.id===p.client):null;
  const clients=by('client');if(!clients.length&&cl)clients.push({id:'',name:cl.name,role:'Client'});
  return {client:clients,site:by('site'),design:by('design'),marketing:by('marketing'),accounts:by('accounts')};
}
function chatProjects(){
  const me=myChatId(),cat=myCat();const ths=myThreads();
  const pids=[...new Set([CO,...PJ().map(p=>p.id)])].filter(pid=>!(pid===CO&&cat==='client'));
  return pids.map(pid=>{const ts=ths.filter(t=>t.pid===pid&&!t.archived);const last=ts.map(t=>t.last).filter(Boolean).sort((a,b)=>b.at-a.at)[0];
    return {pid,ts,last,unread:ts.reduce((s,t)=>s+t.unread,0),mentioned:ts.some(t=>t.mentioned),pin:PINS.includes(pid)};});
}
function vMessages(){
  const me=myChatId(),cat=myCat(),isOwn=cat==='owner';
  const q=(S.chatQ||'').trim().toLowerCase();const flt=S.chatF||'all';
  let projs=chatProjects();
  if(isOwn&&S.chatWho){const w=D.team.find(t=>t.id===S.chatWho);projs=projs.filter(p=>p.pid===CO?CAT_OF[w&&w.role]!=='client':w&&((w.projects||[]).includes(p.pid)||(w.projects||[]).includes('all')));}
  const open=S.chatThread?myThreads().find(t=>t.key===S.chatThread):null;
  if(open)S.chatProj=open.pid;
  const level=open?'conv':(S.chatProj||S.chatArch)?'chats':'projects';
  const archAll=myThreads().filter(t=>t.archived);
  /* ---- pane 1: projects / search / filtered threads ---- */
  const projText=p=>{const pp=projPeople(p.pid);const pr=proj(p.pid)||{};return [pnameX(p.pid),pr.address,...pp.client.map(x=>x.name),...pp.site.map(x=>x.name),...pp.design.map(x=>x.name)].join(' ').toLowerCase();};
  let pane1='';
  const head1=`<div class="chat-lh col"><div class="chat-search">${ico('search')}<input id="chatSearch" placeholder="Search project, client, person or message" value="${esc(S.chatQ||'')}" aria-label="Search chats"></div>
    <div class="fchips">${[['all','All'],['unread','Unread'],['mention','@ Me'],['star','⭐']].map(([k,l])=>`<button class="fchip ${flt===k?'on':''}" data-cfilter="${k}" ${k==='star'?'aria-label="Starred messages" title="Starred messages"':''}>${l}${k!=='all'&&k!=='star'?` <b>${k==='unread'?projs.reduce((s,p)=>s+p.unread,0):myThreads().filter(t=>t.mentioned&&!t.archived).length}</b>`:''}</button>`).join('')}
    ${isOwn?`<select id="chatWho" aria-label="Filter by person"><option value="">Any person</option>${['site','design','client','marketing','accounts'].map(c=>{const ps=D.team.filter(t=>CAT_OF[t.role]===c);return ps.length?`<optgroup label="${CAT_NAME[c]}s">${ps.map(t=>`<option value="${t.id}" ${S.chatWho===t.id?'selected':''}>${esc(t.name)}</option>`).join('')}</optgroup>`:'';}).join('')}</select>`:''}</div></div>`;
  if(q){
    const pm=projs.filter(p=>projText(p).includes(q));
    const mm=myThreads().filter(t=>projs.some(p=>p.pid===t.pid)).flatMap(t=>t.msgs.filter(m=>(m.text||'').toLowerCase().includes(q)).map(m=>({t,m}))).sort((a,b)=>b.m.at-a.m.at).slice(0,40);
    pane1=head1+`<div class="chat-sec">Projects (${pm.length})</div>${pm.map(projRow).join('')||'<div class="empty">No project matches.</div>'}
      <div class="chat-sec">Messages (${mm.length})</div>${mm.map(({t,m})=>`<button class="chat-th" data-chat="${esc(t.key)}">${projAv(t.pid)}<span class="chat-ti"><b>${esc(pnameX(t.pid))}</b><span class="code">${esc(grpLabel(t.g))}</span><span class="chat-pv"><b>${esc(firstName(chatName(m.from)))}:</b> ${esc(m.text.slice(0,90))}</span></span><span class="chat-meta"><span class="code">${esc(tms(m.at))}</span></span></button>`).join('')||'<div class="empty">No message matches.</div>'}`;
  }else if(flt==='star'){
    const st=(myPrefs().starred||[]);const mm=myThreads().flatMap(t=>t.msgs.filter(m=>st.includes(m.id)&&!m.deleted).map(m=>({t,m}))).sort((a,b)=>b.m.at-a.m.at);
    pane1=head1+`<div class="chat-sec">${ico('star')}Starred messages (${mm.length})</div>`+(mm.map(({t,m})=>`<button class="chat-th" data-chat="${esc(t.key)}" data-jumpto="${m.id}">${projAv(t.pid)}<span class="chat-ti"><b>${esc(pnameX(t.pid))}</b><span class="code">${esc(grpLabel(t.g))}</span><span class="chat-pv"><b>${esc(firstName(chatName(m.from)))}:</b> ${esc((m.text||'📷 Photo').slice(0,90))}</span></span><span class="chat-meta"><span class="code">${esc(tms(m.at))}</span></span></button>`).join('')||'<div class="empty">No starred messages. Long-press a message and tap Star.</div>');
  }else if(flt!=='all'){
    const ts=myThreads().filter(t=>!t.archived&&projs.some(p=>p.pid===t.pid)&&(flt==='unread'?t.unread:t.mentioned)).sort((a,b)=>b.last.at-a.last.at);
    pane1=head1+(ts.length?ts.map(t=>thRow(t,true)).join(''):`<div class="empty">${flt==='unread'?'All caught up — no unread messages.':'Nobody has mentioned you.'}</div>`);
  }else{
    const sorted=projs.slice().sort((a,b)=>(b.pin-a.pin)||(b.pid===CO)-(a.pid===CO)||(b.unread>0)-(a.unread>0)||((b.last?b.last.at:0)-(a.last?a.last.at:0))||pnameX(a.pid).localeCompare(pnameX(b.pid)));
    const pins=sorted.filter(p=>p.pin),rest=sorted.filter(p=>!p.pin);
    pane1=head1+(archAll.length?`<button class="arch-row ${S.chatArch?'on':''}" data-charch="1">${ico('archive')}<span style="flex:1">Archived</span><b>${archAll.length}</b></button>`:'')+(pins.length?`<div class="chat-sec">${ico('star')}Pinned</div>${pins.map(projRow).join('')}<div class="chat-sec">All projects (${rest.length})</div>`:`<div class="chat-sec">Projects (${rest.length})</div>`)+rest.map(projRow).join('');
  }
  function projRow(p){const pp=projPeople(p.pid);const pr=proj(p.pid)||{};
    const who=p.pid===CO?'Company-wide chats — no clients':[pp.client.length?`<span class="rdot rc-client"></span>${esc(names(pp.client))}`:'',pp.site.length?`<span class="rdot rc-site"></span>${esc(names(pp.site))}`:'',pp.design.length?`<span class="rdot rc-design"></span>${esc(names(pp.design))}`:''].filter(Boolean).join(' &nbsp;');
    return `<div class="chat-prow ${S.chatProj===p.pid?'on':''}"><button class="chat-th" data-chatproj="${p.pid}">${projAv(p.pid)}<span class="chat-ti"><b>${esc(p.pid===CO?'Company (all projects)':pr.name||'')}</b><span class="code">${esc(p.pid===CO?'Admin, marketing, accounts & site team':(pr.prefix||'')+(pr.address?' · '+pr.address:''))}</span><span class="chat-who">${who}</span>
      <span class="chat-pv">${p.last?`<b>${esc(firstName(chatName(p.last.from)))}:</b> ${esc((p.last.text||'📷 Photo').slice(0,60))}`:'No messages yet'}</span></span>
      <span class="chat-meta">${p.last?`<span class="code">${esc(tms(p.last.at))}</span>`:''}${p.unread?`<span class="nbadge ${p.mentioned?'at':''}">${p.mentioned?'@ ':''}${p.unread}</span>`:''}</span></button>
      <button class="pinb ${p.pin?'on':''}" data-chatpin="${p.pid}" aria-label="${p.pin?'Unpin':'Pin'}" title="${p.pin?'Unpin':'Pin to top'}">${ico('star')}</button></div>`;}
  function thRow(t,withProj){const mem=threadMembers(t.pid,t.g).filter(x=>x.id!==me);
    return `<div class="swr" data-swkey="${esc(t.key)}"><div class="swbg"><span class="sw-a">${ico('archive')}${t.archived?'Unarchive':'Archive'}</span><span class="sw-d">${ico('trash-2')}Delete</span></div><button class="chat-th ${open&&open.key===t.key?'on':''}" data-chat="${esc(t.key)}">${withProj?projAv(t.pid):`${gavOf(t.g)}`}<span class="chat-ti"><b>${esc(withProj?pnameX(t.pid):grpLabel(t.g))}${t.custom&&!withProj?' <span class="rbadge rc-owner">Group</span>':''}</b><span class="code">${esc(withProj?grpLabel(t.g):names(mem)||'Only you so far')}</span>
      <span class="chat-pv">${t.last?`<b>${esc(firstName(chatName(t.last.from)))}:</b> ${esc((t.last.text||'📷 Photo').slice(0,60))}`:'No messages yet'}</span></span>
      <span class="chat-meta">${t.last?`<span class="code">${esc(tms(t.last.at))}</span>`:''}${t.unread?`<span class="nbadge ${t.mentioned?'at':''}">${t.mentioned?'@ ':''}${t.unread}</span>`:''}</span></button></div>`;}
  /* ---- pane 2: chats inside the chosen project ---- */
  let pane2='';
  if(S.chatArch&&!S.chatProj){pane2=`<div class="chat-lh"><button class="btn sm ghost lvl-back" data-chatlevel="projects" aria-label="Back">${ico('arrow-left')}</button><b style="flex:1">${ico('archive')} Archived chats</b></div><div class="code" style="padding:6px 12px">Swipe right to unarchive · swipe left to delete.</div>${archAll.map(t=>thRow(t,true)).join('')||'<div class="empty">No archived chats.</div>'}`;}
  else if(S.chatProj){const pid=S.chatProj;const pp=projPeople(pid);const pr=proj(pid)||{};
    const ts=myThreads().filter(t=>t.pid===pid);const active=ts.filter(t=>!t.archived).filter(t=>t.custom||t.msgs.length||D.chatgroups.some(g=>g.project===pid&&g.grp===t.g)).sort((a,b)=>(b.last?b.last.at:0)-(a.last?a.last.at:0));
    const startable=ts.filter(t=>!active.includes(t)&&!t.archived&&!t.custom);const parch=ts.filter(t=>t.archived);
    const card=pid===CO?`<div class="pcard"><b>Company (all projects)</b><div class="code">Chats that are not about one site — marketing, accounts, all site staff. Clients are never added here.</div></div>`
      :`<div class="pcard"><div style="display:flex;gap:10px;align-items:center">${projAv(pid)}<div style="min-width:0"><b>${esc(pr.name||'')}</b><div class="code">${esc(pr.prefix||'')}${pr.address?' · '+esc(pr.address):''}</div></div></div>
        <div class="pteam">${[['client','Client'],['site','Site team'],['design','Architect'],['marketing','Marketing'],['accounts','Accounts']].filter(([c])=>pp[c].length).map(([c,l])=>`<div><span class="rbadge ${RC_CLS[c]}">${l}</span> ${esc(pp[c].map(x=>x.name).join(', '))}</div>`).join('')}</div></div>`;
    pane2=`<div class="chat-lh"><button class="btn sm ghost lvl-back" data-chatlevel="projects" aria-label="Back to projects">${ico('arrow-left')}</button><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(pnameX(pid))}</b>${CANW&&isOwn?`<button class="btn sm" id="chatNew">${ico('plus')}Group</button>`:''}</div>${card}
      <div class="chat-sec">Chats (${active.length})</div>${active.map(t=>thRow(t,false)).join('')||'<div class="empty">No chats yet — start one below.</div>'}
      ${active.length?'<div class="code sw-tip">Swipe a chat left to delete · right to archive</div>':''}${parch.length?`<button class="arch-row" data-charch="1">${ico('archive')}<span style="flex:1">Archived in this project</span><b>${parch.length}</b></button>`:''}
      ${startable.length?`<div class="chat-sec">Start a chat with</div><div class="startg">${startable.map(t=>{const mem=threadMembers(t.pid,t.g).filter(x=>x.id!==me);return `<button class="startb" data-chat="${esc(t.key)}">${gavOf(t.g)}<span><b>${esc(grpLabel(t.g))}</b><span class="code">${esc(names(mem))||'—'}</span></span></button>`;}).join('')}</div>`:''}`;
  }else pane2=`<div class="hero-empty">${ico('building-2')}<h2>Choose a project</h2><p>Every project has its own chats, so site, client and architect messages never mix between projects.</p></div>`;
  /* ---- pane 3: conversation ---- */
  let pane3='';
  if(open){const mem=threadMembers(open.pid,open.g);const others=mem.filter(x=>x.id!==me);const sel=S.chatMention||[];
    const byCat=c=>mem.filter(x=>CAT_OF[x.role]===c);
    pane3=`<div class="chat-ch"><button class="btn sm ghost lvl-back" data-chatlevel="chats" aria-label="Back to chats">${ico('arrow-left')}</button>${projAv(open.pid)}<div style="flex:1;min-width:0"><b>${esc(pnameX(open.pid))}</b><div class="code">${esc(grpLabel(open.g))} · ${mem.length} people</div></div><button class="btn sm ghost" data-chatppl="1" aria-label="People in this chat">${ico('users')}</button></div>
    ${S.chatPpl&&open.custom?(()=>{const d=pgDoc(open.g);const ML={admin:'Admin',member:'Member',view:'View only'};return `<div class="chat-ppl"><div style="display:flex;gap:8px;align-items:center"><b style="flex:1">${esc(d.name)}</b>${canEditPG(d)?`<button class="btn sm" data-gedit="${d.id}">${ico('pencil')}Edit group</button>`:''}</div><div class="code">Only the people below can see this group${chatRole(myChatId())==='Admin'?' (and you, as admin)':''}.</div>${mem.map(x=>`<div><span class="rbadge ${RC_CLS[CAT_OF[x.role]]}">${esc(CAT_NAME[CAT_OF[x.role]]||'')}</span> ${esc(x.name)} <span class="pill ${d.mm[x.id]==='admin'?'p-green':d.mm[x.id]==='view'?'p-grey':'p-blue'}">${ML[d.mm[x.id]]||'Member'}</span></div>`).join('')}</div>`;})():S.chatPpl?`<div class="chat-ppl">${CAT_ORDER.filter(c=>byCat(c).length).map(c=>`<div><span class="rbadge ${RC_CLS[c]}">${CAT_NAME[c]}</span> ${byCat(c).map(x=>`${esc(x.name)}${x.phone?` <a class="code" href="tel:${esc(x.phone)}">${esc(x.phone)}</a>`:''}`).join(', ')}</div>`).join('')}</div>`:''}
    ${pinBar(open)}<div class="chat-msgs" id="chatMsgs">${renderMsgs(open)}</div>
    ${!canSendIn(open.g)?`<div class="chat-comp"><div class="note" style="margin:10px 12px">${ico('eye')}<span>You can read this group. Only its admins and members can send messages.</span></div></div>`:''}<div class="chat-comp" ${canSendIn(open.g)?'':'hidden'}><div class="chat-to"><span class="code">Mention:</span>${(()=>{const fc={};others.forEach(x=>{const f=firstName(x.name);fc[f]=(fc[f]||0)+1;});return others.map(x=>`<button class="mchip ${sel.includes(x.id)?'on':''}" data-men="${x.id}" title="${esc(x.name+' — '+x.role)}"><i class="rdot ${RC_CLS[CAT_OF[x.role]]}"></i>@${esc(fc[firstName(x.name)]>1?x.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s*/,''):firstName(x.name))}</button>`).join('');})()}${others.length>1?`<button class="mchip ${others.every(x=>sel.includes(x.id))?'on':''}" data-men="*">@All</button>`:''}</div>
      ${(S.chatPhotos||[]).length?`<div class="bub-ph" style="padding:0 12px">${S.chatPhotos.map(id=>`<img src="/_blob/${esc(id)}" alt="">`).join('')}</div>`:''}
      ${S.chatReply||S.chatEdit?(()=>{const q=D.chats.find(x=>x.id===(S.chatReply||S.chatEdit));return q?`<div class="rstrip ${S.chatEdit?'ed':''}"><div style="flex:1;min-width:0"><b>${S.chatEdit?'Editing message':'Replying to '+esc(chatName(q.from))}</b><span>${esc((q.text||'📷 Photo').slice(0,120))}</span></div><button class="btn sm ghost" data-rcancel="1" aria-label="Cancel">${ico('x')}</button></div>`:'';})():''}
      <div class="chat-in">${A?`<label class="btn ghost" aria-label="Add photo">${ico('camera')}<input type="file" id="chatPhoto" accept="image/*" multiple hidden></label>`:''}<textarea id="chatText" rows="1" placeholder="Message ${esc(grpLabel(open.g))}">${esc(S.chatDraft||'')}</textarea><button class="btn pri" id="chatSend" aria-label="Send">${ico('send')}</button></div></div>`;
  }else pane3=`<div class="hero-empty">${ico('message-circle')}<h2>${S.chatProj?'Choose a chat':'Messages'}</h2><p>✓ sent · <b style="color:#1d8fe1">✓✓ blue</b> the people you mentioned have seen it · <b style="color:#d93025">✓✓ red</b> everyone in the chat has seen it.</p>
    <div class="legend">${CAT_ORDER.map(c=>`<span class="rbadge ${RC_CLS[c]}">${CAT_NAME[c]}</span>`).join(' ')}</div></div>`;
  return header(label('messages'))+`<div class="box chat3 lvl-${level} ${open?'open':''}"><div class="cp cp1">${pane1}</div><div class="cp cp2">${pane2}</div><div class="cp cp3 chat-conv">${pane3}</div></div>`;
}
async function chatMarkSeen(){
  if(S.view!=='messages'||!S.chatThread||S.viewAs)return;
  const t=myThreads().find(x=>x.key===S.chatThread);if(!t||!t.msgs.length)return;
  const me=myChatId();const lastAt=t.msgs[t.msgs.length-1].at;
  if(lastSeen(t.key,me)>=lastAt)return;
  if(S._seenBusy===t.key+lastAt)return;S._seenBusy=t.key+lastAt;
  try{await db.doc('chatseen/'+safeId(t.key+'__'+me)).set({thread:t.key,who:me,last:Date.now()});}catch(_){}
}
async function chatSend(){
  const t=myThreads().find(x=>x.key===S.chatThread);if(!t)return;
  if(!canSendIn(t.g)){toast('You can only read this group.');return;}
  const ta=document.getElementById('chatText');const text=((ta&&ta.value)||S.chatDraft||'').trim();const photos=S.chatPhotos||[];
  if(!text&&!photos.length)return;
  if(S.viewAs){toast('Preview only — messages are not sent while previewing.');return;}
  const me=myChatId();
  if(S.chatEdit){const id=S.chatEdit;S.chatEdit=null;S.chatDraft='';const ok=await write(()=>db.doc('chats/'+id).update({text,edited:true,editAt:Date.now()}),'Message edited');if(!ok){S.chatEdit=id;S.chatDraft=text;}render();return;}
  const body={project:t.pid,grp:t.g,text,mentions:S.chatMention||[],photos,from:me,by:ME.id,at:Date.now(),...(S.chatReply?{replyTo:S.chatReply}:{})};S.chatReply=null;
  S.chatDraft='';S.chatMention=[];S.chatPhotos=[];
  const ok=await write(()=>db.collection('chats').add(body));
  if(ok){try{await db.doc('chatseen/'+safeId(t.key+'__'+me)).set({thread:t.key,who:me,last:body.at});}catch(_){}}
  else{S.chatDraft=text;S.chatMention=body.mentions;S.chatPhotos=photos;}
  render();
}
function openChatGroup(d){
  const pids=[CO,...PJ().map(p=>p.id)];const me=myChatId();
  const pid=d?d.project:(S.chatProj||pids[1]||CO);const mm=d?{...d.mm}:{[me]:'admin'};
  const ppl=D.team.filter(t=>t.status!=='Removed').sort((a,b)=>CAT_ORDER.indexOf(CAT_OF[a.role])-CAT_ORDER.indexOf(CAT_OF[b.role])||(a.name||'').localeCompare(b.name||''));
  const elig=(t,p)=>p===CO?CAT_OF[t.role]!=='client':(CAT_OF[t.role]==='owner'||(t.projects||[]).includes(p)||((t.projects||[]).includes('all')&&CAT_OF[t.role]!=='client'));
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="pgForm" data-id="${d?d.id:''}"><div class="pane-h"><h2>${d?'Edit group':'New group'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b"><label>Group name<input id="pg-name" required value="${esc(d?d.name:'')}" placeholder="e.g. Slab casting team, Client approvals"></label>
  <label>Project<select id="pg-proj" ${d?'disabled':''}>${pids.map(p=>`<option value="${p}" ${pid===p?'selected':''}>${esc(pnameX(p))}</option>`).join('')}</select></label>
  <div><div class="code" style="margin-bottom:6px">Who can see this group — tick each person and choose what they can do</div>
   <div class="chat-search" style="margin-bottom:8px">${ico('search')}<input id="pg-q" placeholder="Search name or role"></div>
   <div class="pg-legend code"><b>Admin</b> can add or remove people and rename · <b>Member</b> can read and send · <b>View only</b> can only read</div>
   <div id="pg-list">${ppl.map(t=>`<div class="pg-row" data-pgrow="${t.id}" data-q="${esc((t.name+' '+t.role).toLowerCase())}" data-elig="${esc(pids.filter(p=>elig(t,p)).join(' '))}" ${elig(t,pid)?'':'hidden'}>
     <label class="pg-who"><input type="checkbox" value="${t.id}" ${mm[t.id]?'checked':''} ${t.id===me&&!d?'':''}><span class="rbadge ${RC_CLS[CAT_OF[t.role]]}">${esc(CAT_NAME[CAT_OF[t.role]]||t.role)}</span> ${esc(t.name)}</label>
     <select data-pgmode="${t.id}" aria-label="Access for ${esc(t.name)}"><option value="admin" ${mm[t.id]==='admin'?'selected':''}>Admin</option><option value="member" ${!mm[t.id]||mm[t.id]==='member'?'selected':''}>Member</option><option value="view" ${mm[t.id]==='view'?'selected':''}>View only</option></select></div>`).join('')}</div></div>
  ${d&&chatRole(me)==='Admin'?`<button type="button" class="btn warn" data-gdel="${d.id}">${ico('trash-2')}${S.confirm==='gdel'?'Tap again to delete this group':'Delete group'}</button>`:''}
  ${d?'':`<button type="button" class="btn ghost" id="pgRoles" style="justify-self:start">Or make a chat for whole roles (everyone with that role on the project)</button>`}</div>
  <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">${d?'Save group':'Create group'}</button></div></form></div>`;
}
function openRoleGroup(){
  const pids=[CO,...PJ().map(p=>p.id)];
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="chatGrpForm"><div class="pane-h"><h2>New group chat</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b"><label>Project<select id="cg-proj">${pids.map(p=>`<option value="${p}" ${S.chatProj===p?'selected':''}>${esc(pnameX(p))}</option>`).join('')}</select></label>
  <div><div class="code" style="margin-bottom:6px">Who is in this chat (Admin is always included)</div><div class="checks">${CAT_ORDER.filter(c=>c!=='owner').map(c=>`<label><input type="checkbox" value="${c}">${CAT_NAME[c]}${c==='client'?' <span class="code">(project chats only)</span>':''}</label>`).join('')}</div></div>
  <div class="code">Everyone with that role on the project joins automatically.</div></div>
  <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">Create chat</button></div></form></div>`;
}
function quoteHtml(id){const q=D.chats.find(x=>x.id===id);if(!q)return '';return `<button class="bub-q" data-jump="${q.id}"><b class="${RC_CLS[CAT_OF[chatRole(q.from)]]||''}">${esc(chatName(q.from))}</b><span>${q.deleted?'🚫 This message was deleted':esc((q.text||'📷 Photo').slice(0,120))}</span></button>`;}
function renderMsgs(open){
  const me=myChatId();const msgs=open.msgs;
  if(!msgs.length)return `<div class="empty">Start the conversation. Tap a name below to mention someone.</div>`;
  return msgs.map((m,i)=>{const mine=m.from===me;const ts=tickState(m,open.key);const prev=msgs[i-1];const day=isoDate(new Date(m.at));const pday=prev?isoDate(new Date(prev.at)):'';const same=prev&&prev.from===m.from&&day===pday&&m.at-prev.at<6e5;
    const rc={};Object.values(m.react||{}).forEach(e=>rc[e]=(rc[e]||0)+1);const myR=(m.react||{})[me];
    return `${day!==pday?`<div class="chat-day">${day===today()?'Today':fd(day)}</div>`:''}<div class="msgrow ${mine?'me':''}">${mine||same?'<span class="mav0"></span>':`<span class="mav ${RC_CLS[CAT_OF[chatRole(m.from)]||'owner']}">${esc(initials(chatName(m.from)))}</span>`}
      <div class="bub ${mine?'me':''} ${(m.mentions||[]).includes(me)&&!mine?'tome':''} ${m.deleted?'del':''}" data-mid="${m.id}" id="m-${m.id}">
      ${m.deleted?'':`<button class="bub-more" data-mmenu="${m.id}" aria-label="Message options">${ico('chevron-down')}</button>`}
      ${mine||same?'':`<div class="bub-who">${esc(chatName(m.from))} ${roleBadge(m.from)}</div>`}
      ${m.deleted?`<div class="bub-tx dl">🚫 ${mine?'You deleted this message':'This message was deleted'}</div>`:`
      ${m.fwd?`<div class="bub-fwd">${ico('arrow-up-right')}Forwarded</div>`:''}
      ${m.replyTo?quoteHtml(m.replyTo):''}
      ${(m.mentions||[]).length?`<div class="bub-men">${(m.mentions||[]).map(id=>`<span>@${esc(firstName(chatName(id)))}</span>`).join(' ')}</div>`:''}
      ${m.text?`<div class="bub-tx">${esc(m.text)}</div>`:''}
      ${(m.photos||[]).length?`<div class="bub-ph">${m.photos.map(id=>`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="Photo" loading="lazy"></a>`).join('')}</div>`:''}`}
      <div class="bub-ft">${m.pinned&&!m.deleted?'<span title="Pinned">📌</span>':''}${isStar(m.id)?'<span title="Starred">⭐</span>':''}${m.edited&&!m.deleted?'<span>Edited</span>':''}<span>${esc(new Date(m.at).toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'}))}</span>${mine&&!m.deleted?`<button class="tick ${ts.cls}" data-seen="${m.id}" title="${esc(ts.title)}" aria-label="${esc(ts.title)}">${ts.txt}</button>`:''}</div>
      ${Object.keys(rc).length&&!m.deleted?`<div class="reacts">${Object.entries(rc).map(([e,c])=>`<button class="rchip ${myR===e?'on':''}" data-react="${m.id}|${e}" title="${esc(Object.entries(m.react).filter(([,v])=>v===e).map(([u])=>chatName(u)).join(', '))}">${e}${c>1?` ${c}`:''}</button>`).join('')}</div>`:''}
      ${S.chatSeen===m.id?`<div class="bub-seen">${ts.mem.map(x=>{const l=lastSeen(open.key,x.id);return `<div><span>${esc(x.name)} ${roleBadge(x.id)}</span><span>${l>=m.at?'Seen '+esc(tm(l)):'Not seen yet'}</span></div>`;}).join('')}</div>`:''}
    </div></div>`;}).join('');
}
function pinBar(open){const p=open.msgs.filter(m=>m.pinned&&!m.deleted).sort((a,b)=>(b.pinnedAt||0)-(a.pinnedAt||0))[0];
  return p?`<button class="pinbar" data-jump="${p.id}">📌 <b>${esc(firstName(chatName(p.from)))}:</b> <span>${esc((p.text||'📷 Photo').slice(0,100))}</span></button>`:'';}
function openMsgMenu(id){
  const m=D.chats.find(x=>x.id===id);if(!m||m.deleted)return;const me=myChatId();const mine=m.from===me;const myR=(m.react||{})[me];
  const t=myThreads().find(x=>x.key===S.chatThread);const can=t?canSendIn(t.g):false;
  const acts=[can&&['reply','corner-up-left','Reply'],['forward','arrow-up-right','Forward'],m.text&&['copy','files','Copy'],['info','info','Info'],['star','star',isStar(id)?'Unstar':'Star'],can&&['pin','pin',m.pinned?'Unpin':'Pin'],
    mine&&m.text&&Date.now()-m.at<15*6e4&&['edit','pencil','Edit'],['delfme','trash-2','Delete for me'],(mine||chatRole(me)==='Admin')&&['delall','trash-2','Delete for everyone']].filter(Boolean);
  document.getElementById('layer').innerHTML=`<div class="drawer mmenu"><div class="mm-box" role="dialog" aria-label="Message options">
    ${can?`<div class="mm-react">${EMO.map(e=>`<button class="${myR===e?'on':''}" data-react="${id}|${e}" aria-label="React ${e}">${e}</button>`).join('')}</div>`:''}
    <div class="mm-prev ${mine?'me':''}"><b>${esc(chatName(m.from))}</b><span>${esc((m.text||'📷 Photo').slice(0,200))}</span></div>
    <div class="mm-acts">${acts.map(([k,i,l])=>`<button class="${k.startsWith('del')?'warn':''}" data-mact="${k}|${id}">${ico(i)}<span>${l}</span></button>`).join('')}</div></div></div>`;
}
function openForward(id){
  const m=D.chats.find(x=>x.id===id);if(!m)return;S.fwdSel=[];S.fwdId=id;
  const ths=myThreads().filter(t=>canSendIn(t.g)&&!t.archived).sort((a,b)=>(b.last?b.last.at:0)-(a.last?a.last.at:0));
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>Forward to…</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><div class="mm-prev"><span>${esc((m.text||'📷 Photo').slice(0,160))}</span></div><div class="chat-search">${ico('search')}<input id="fwdQ" placeholder="Search project or chat"></div>
    <div id="fwdList">${ths.map(t=>`<label class="pg-row" data-fq="${esc((pnameX(t.pid)+' '+grpLabel(t.g)).toLowerCase())}"><span class="pg-who"><input type="checkbox" value="${esc(t.key)}">${projAv(t.pid)}<span style="display:grid;min-width:0"><b style="font-size:13.5px">${esc(pnameX(t.pid))}</b><span class="code">${esc(grpLabel(t.g))}</span></span></span></label>`).join('')}</div></div>
    <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri" id="fwdGo">${ico('send')}Forward</button></div></div></div>`;
}
async function doForward(){
  const m=D.chats.find(x=>x.id===S.fwdId);const keys=[...document.querySelectorAll('#fwdList input:checked')].map(x=>x.value);
  if(!keys.length){toast('Choose at least one chat.');return;}if(S.viewAs){toast('Preview only — messages are not sent while previewing.');return;}
  const me=myChatId();let n=0;for(const k of keys){const [pid,g]=k.split('|');const ok=await write(()=>db.collection('chats').add({project:pid,grp:g,text:m.text||'',photos:m.photos||[],mentions:[],fwd:true,from:me,by:ME.id,at:Date.now()}));if(ok)n++;}
  closeLayer();toast(`Forwarded to ${n} chat${n===1?'':'s'}`);render();
}
async function msgAction(k,id){
  const m=D.chats.find(x=>x.id===id);if(!m)return;const me=myChatId();closeLayer();
  if(k==='reply'){S.chatReply=id;S.chatEdit=null;S.chatFocus=true;render();return;}
  if(k==='forward'){openForward(id);return;}
  if(k==='copy'){try{await navigator.clipboard.writeText(m.text||'');toast('Message copied');}catch(_){toast('Copy is blocked here — select the text instead.');}render();return;}
  if(k==='info'){S.chatSeen=id;render();setTimeout(()=>{const x=document.getElementById('m-'+id);x&&x.scrollIntoView&&x.scrollIntoView({block:'center'});},30);return;}
  if(k==='star'){const st=myPrefs().starred||[];await savePrefs({starred:st.includes(id)?st.filter(x=>x!==id):[...st,id]});toast(st.includes(id)?'Unstarred':'Starred');return;}
  if(k==='pin'){if(S.viewAs){toast('Preview only.');return;}await write(()=>db.doc('chats/'+id).update({pinned:!m.pinned,pinnedAt:Date.now(),pinnedBy:me}),m.pinned?'Unpinned':'Pinned to the top of this chat');return;}
  if(k==='edit'){S.chatEdit=id;S.chatReply=null;S.chatDraft=m.text||'';S.chatFocus=true;render();return;}
  if(k==='delfme'){const h=myPrefs().hidden||[];if(await savePrefs({hidden:[...h,id]}))snack('Message deleted for you',async()=>{await savePrefs({hidden:h});});return;}
  if(k==='delall'){if(S.viewAs){toast('Preview only.');return;}await write(()=>db.doc('chats/'+id).update({deleted:true,text:'',photos:[],react:{},pinned:false,delAt:Date.now()}),'Deleted for everyone');return;}
}
async function msgReact(id,e){
  const m=D.chats.find(x=>x.id===id);if(!m)return;if(S.viewAs){toast('Preview only.');closeLayer();return;}
  const me=myChatId();const r={...(m.react||{})};if(r[me]===e)delete r[me];else r[me]=e;closeLayer();
  await write(()=>db.doc('chats/'+id).update({react:r}));
}
function setLang(l){LANG=l;try{localStorage.setItem('bm-lang',LANG)}catch(_){}loadIndicFont();if(l!=='en')S._trUsed=true;render();trNode(document.body);}
PK.done("chat");
