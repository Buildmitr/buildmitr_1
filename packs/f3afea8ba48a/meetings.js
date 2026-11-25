/* bm-build:f3afea8ba48a */
/* BuildMitr page code: meetings */
function momText(m){const P=m.project?pname(m.project):'';const L=[`*Minutes of meeting — ${m.title||m.kind||'Meeting'}*`,`${P?P+' · ':''}${fd(m.date)}${m.time?' '+m.time:''}${m.place?' · '+m.place:''}`,`Type: ${m.kind||'—'}`];
  const att=[...(m.att||[]).map(pnm),...momLines(m.others)];if(att.length)L.push('','*Present:* '+att.join(', '));
  if(momLines(m.points).length)L.push('','*Discussed*',...momLines(m.points).map((x,i)=>`${i+1}. ${x}`));
  if(momLines(m.decisions).length)L.push('','*Decided*',...momLines(m.decisions).map(x=>'• '+x));
  if((m.acts||[]).length)L.push('','*Action items*',...m.acts.map(a=>`☐ ${a.t} — ${a.who?pnm(a.who):'—'}${a.due?' by '+fd(a.due):''}`));
  if(m.next)L.push('','*Next meeting:* '+fd(m.next));L.push('',`Recorded by ${pnm(m.by)} · ${orgName()}`);return L.join('\n');}
function vMeetings(){
  const tab=MM.tab==='notes'?'notes':'mom',q=(MM.q||'').trim().toLowerCase(),inP=x=>S.proj==='all'?(!x.project||projOK(x.project)):x.project===S.proj;
  const tabs=`<div class="al-sum"><button type="button" class="al-t ${tab==='mom'?'on':''}" data-mmtab="mom"><b>Minutes of meeting</b><span><i class="pill p-grey">${(n=>n+(n===1?' meeting':' meetings'))(D.meetings.filter(inP).length)}</i>${(()=>{const n=D.meetings.filter(inP).flatMap(m=>m.acts||[]).filter(a=>!['Completed','Done','Resolved'].includes(momActState(a))).length;return n?`<i class="pill p-amber">${n} open actions</i>`:'';})()}</span></button>
    <button type="button" class="al-t ${tab==='notes'?'on':''}" data-mmtab="notes"><b>Project notes</b><span><i class="pill p-grey">${(n=>n+(n===1?' note':' notes'))(D.pnotes.filter(inP).filter(x=>!x.hidden).length)}</i>${D.pnotes.filter(inP).some(n=>n.pin)?`<i class="pill p-blue">${D.pnotes.filter(inP).filter(n=>n.pin).length} pinned</i>`:''}</span></button></div>`;
  const canAdd=CANW0;
  if(tab==='notes'){const xs=D.pnotes.filter(inP).filter(n=>!n.hidden).filter(n=>!q||(n.t+' '+pname(n.project)+' '+pnm(n.by)).toLowerCase().includes(q)).sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||(b.at||0)-(a.at||0));
    return header(label('meetings'))+tabs+`<div class="box">${canAdd?`<form id="pnForm" class="tr-f" style="padding:12px 16px;border-bottom:1px solid var(--line)"><label>New note${S.proj==='all'?'':` for <b>${esc(pname(S.proj))}</b>`}<textarea name="t" rows="2" maxlength="2000" required placeholder="e.g. Client wants the kitchen window 6 inch wider — confirm with architect"></textarea></label>
      <div class="srow" style="padding:0;border:0;flex-wrap:wrap;gap:8px">${S.proj==='all'?`<select name="project" aria-label="Project" required><option value="">Project…</option>${D.projects.filter(p=>projOK(p.id)).map(p=>`<option value="${esc(p.id)}">${esc(pname(p.id))}</option>`).join('')}</select>`:''}<label class="pl-chk"><input type="checkbox" name="pin"> Pin to top</label>${A?`<label class="btn sm">${ico('camera')}<span>Photo</span><input type="file" name="files" accept="image/*" capture="environment" multiple hidden></label>`:''}<button class="btn pri">${ico('plus')}<span>Add note</span></button></div></form>`:''}
      <div class="al-bar"><label class="al-q">${ico('search')}<input type="search" id="mmQ" placeholder="Search notes" value="${esc(MM.q||'')}" aria-label="Search notes"></label></div>
      ${xs.length?xs.map(n=>`<div class="al-row ${n.pin?'sev-med':''}"><span class="al-ic">${ico(n.pin?'pin':'notebook-pen')}</span><div class="al-tx"><div style="white-space:pre-wrap">${esc(n.t)}</div>${trThumbs(n.files)}<div class="code">${n.project?esc(pname(n.project))+' · ':''}${esc(pnm(n.by))} · ${esc(trWhen(n.at))}</div></div>
        ${momMine(n)&&CANW0?`<button type="button" class="btn sm ghost" data-pnpin="${esc(n.id)}" title="${n.pin?'Unpin':'Pin to top'}">${n.pin?'Unpin':'Pin'}</button><button type="button" class="btn sm ghost" data-pnarch="${esc(n.id)}" title="Hide this note (kept in history)">${ico('archive')}</button>`:''}</div>`).join(''):`<div class="hero-empty">${ico('notebook-pen')}<h2>No notes yet</h2><p>Keep quick notes for a project here — client requests, site decisions, things to remember.</p></div>`}</div>`;}
  const xs=D.meetings.filter(inP).filter(m=>!q||momText(m).toLowerCase().includes(q)).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||(b.at||0)-(a.at||0));
  return header(label('meetings'),canAdd?`<button type="button" class="btn pri" data-momnew>${ico('plus')}<span>New MOM</span></button>`:'')+tabs+`<div class="box"><div class="al-bar"><label class="al-q">${ico('search')}<input type="search" id="mmQ" placeholder="Search meetings, people, decisions" value="${esc(MM.q||'')}" aria-label="Search meetings"></label></div>
    ${xs.length?xs.map(m=>{const acts=m.acts||[],open=acts.filter(a=>!['Completed','Done','Resolved'].includes(momActState(a))).length;
      return `<div class="al-row"><span class="al-ic">${ico('message-square-text')}</span><div class="al-tx"><div><b>${esc(m.title||m.kind||'Meeting')}</b></div><div class="code">${m.project?esc(pname(m.project))+' · ':''}${esc(fd(m.date))}${m.time?' '+esc(m.time):''} · ${esc(m.kind||'')} · ${(m.att||[]).length+momLines(m.others).length} present${acts.length?` · ${open} of ${acts.length} actions open`:''}</div></div><button type="button" class="btn sm" data-momopen="${esc(m.id)}">Open</button></div>`;}).join('')
      :`<div class="hero-empty">${ico('message-square-text')}<h2>No meetings recorded yet</h2><p>Write the minutes after each site or client meeting. Action items become tasks for the right person, with a due date.</p>${canAdd?`<button type="button" class="btn pri" data-momnew>${ico('plus')}<span>New MOM</span></button>`:''}</div>`}</div>`;
}
function momOpen(id){const m=D.meetings.find(x=>x.id===id);if(!m){toast('This meeting is no longer there');return;}const txt=momText(m);
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${esc(m.title||'Meeting')}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div><div class="pane-b" style="display:grid;gap:12px">
    <div class="code">${m.project?esc(pname(m.project))+' · ':''}${esc(fd(m.date))}${m.time?' '+esc(m.time):''}${m.place?' · '+esc(m.place):''} · ${esc(m.kind||'')}</div>
    <div><div class="md-g">Present</div><div>${[...(m.att||[]).map(u=>esc(pnm(u))),...momLines(m.others).map(esc)].join(', ')||'—'}</div></div>
    ${momLines(m.points).length?`<div><div class="md-g">Discussed</div><ol class="mom-ol">${momLines(m.points).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}
    ${momLines(m.decisions).length?`<div><div class="md-g">Decided</div><ul class="mom-ol">${momLines(m.decisions).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    ${(m.acts||[]).length?`<div><div class="md-g">Action items</div>${m.acts.map(a=>{const st=momActState(a);return `<div class="md-task"><div style="flex:1;min-width:0"><b>${esc(a.t)}</b><div class="code">${esc(a.who?pnm(a.who):'—')}${a.due?' · by '+esc(fd(a.due)):''}</div></div><span class="pill ${trPill(st)}">${esc(st)}</span>${momTc(a)&&a.tid&&trRec(momTc(a),a.tid)?`<button type="button" class="btn sm ghost" data-tropen="${momTc(a)}|${esc(a.tid)}">Task</button>`:''}</div>`;}).join('')}</div>`:''}
    ${m.next?`<div class="code">Next meeting: ${esc(fd(m.next))}</div>`:''}${trThumbs(m.files)}
    ${(m.audio||[]).length?`<div><div class="md-g">Recording · ${mrFmt(m.audio.reduce((s,a)=>s+(+a.dur||0),0))}</div>${m.audio.map((a,i)=>`<div class="srow" style="padding:4px 0;border:0"><span class="code">Part ${i+1} · ${mrFmt(+a.dur||0)}</span><button type="button" class="btn sm" data-mrlisten="${esc(a.id)}">${ico('play')}<span>Listen</span></button></div>`).join('')}${(m.tfiles||[]).map((t,i)=>`<button type="button" class="btn sm ghost" data-mrtxt="${esc(t.id)}">${ico('file-text')}<span>Read transcript${m.tfiles.length>1?' '+(i+1):''}</span></button>`).join('')}${m.transcript?`<details><summary>Transcript</summary><div class="mr-tr">${esc(m.transcript)}</div></details>`:''}</div>`:''}
    <div class="srow" style="padding:0;border:0;flex-wrap:wrap;gap:8px"><button type="button" class="btn pri" data-sharesum="${esc(txt)}" data-sharettl="MOM ${esc(m.title||'')}">${ico('share-2')}<span>Share (WhatsApp / PDF)</span></button>${momMine(m)&&CANW0?`<button type="button" class="btn" data-momedit="${esc(m.id)}">${ico('pencil')}<span>Edit</span></button>`:''}</div>
    <div class="code">Recorded by ${esc(pnm(m.by))} · ${esc(trWhen(m.at))}</div></div></div></div>`;}
async function momSave(f){const id=f.dataset.id,old=id?D.meetings.find(x=>x.id===id):null;const E_=f.elements,v=k=>(E_[k]&&E_[k].value||'').trim();
  const project=v('project');if(!project){toast('Choose the project');return;}if(!v('date')){toast('Choose the date');return;}
  if(MR.busy){toast('Wait until the recording is written into the form');return;}const btn=document.getElementById('momSaveBtn')||f.querySelector('.btn.pri');btn.disabled=true;
  const acts=[...f.querySelectorAll('.mom-act')].map(r=>({t:r.querySelector('[name=at]').value.trim(),who:r.querySelector('[name=aw]').value,due:r.querySelector('[name=ad]').value,tid:r.querySelector('[name=atid]').value,tc:r.querySelector('[name=atc]').value})).filter(a=>a.t);
  let up=[];if(E_.files&&E_.files.files.length){{const pk=phPick(E_.files.files);up=pk.length?await trUpload(await phEach(pk,bmShrink)):[];}if(up===null){btn.disabled=false;return;}}
  let tf=MR.tfile||null;if(!tf&&MR.files.length&&MR.transcript&&MR.formId===(id||'new')){const tu=await trUpload([new File([MR.transcript],`transcript-${v('date')||today()}.txt`,{type:'text/plain'})]);if(tu===null){btn.disabled=false;return;}tf=tu[0]||null;MR.tfile=tf;}
  const withRec=MR.files.length&&MR.formId===(id||'new');
  const rec={...(withRec?{audio:[...((old&&old.audio)||[]),...MR.files],tfiles:[...((old&&old.tfiles)||[]),...(tf?[tf]:[])]}:{}),project,kind:v('kind'),date:v('date'),time:v('time'),title:v('title'),place:v('place'),att:[...f.querySelectorAll('[name=att]:checked')].map(x=>x.value),others:v('others'),points:v('points'),decisions:v('decisions'),next:v('next'),files:[...((old&&old.files)||[]),...up]};
  const col=momTaskCol(),ttl=rec.title||rec.kind,now=Date.now();let made=0,skipped=0;
  for(const a of acts){if(a.tid||!a.who)continue;if(!col){skipped++;continue;}
    const tid='mom_'+now.toString(36)+'_'+Math.random().toString(36).slice(2,7);
    const ok=await write(()=>db.doc(col+'/'+tid).set({project,title:a.t,who:a.who,due:a.due||'',start:rec.date,status:'Not started',progress:0,notes:`From meeting: ${ttl} (${fd(rec.date)})`,by:ME.id,at:now,src:'mom'}));
    if(ok){a.tid=tid;a.tc=col;made++;if(D[col]&&!D[col].some(x=>x.id===tid))D[col].push({id:tid,project,title:a.t,who:a.who,due:a.due||'',status:'Not started',by:ME.id});}}
  rec.acts=acts.map(a=>({t:a.t,who:a.who,due:a.due,...(a.tid?{tid:a.tid,tc:a.tc}:{})}));
  let ok,nid=id;
  if(old)ok=await write(()=>db.doc('meetings/'+id).update(rec),'Minutes saved');
  else ok=await write(async()=>{const r=await db.collection('meetings').add({...rec,by:ME.id,at:now});nid=r.id;},'Minutes saved');
  btn.disabled=false;if(!ok)return;
  if(old)Object.assign(old,rec);else if(!D.meetings.some(x=>x.id===nid))D.meetings.push({id:nid,...rec,by:ME.id,at:now});
  try{audit(old?'edited':'added','meetings',nid,`MOM: ${ttl}`);}catch(_){}
  if(made)toast(`Minutes saved — ${made} task${made>1?'s':''} given out`);if(skipped)toast(`Minutes saved. ${skipped} action item${skipped>1?'s were':' was'} not made into tasks — you cannot give tasks; ask the project manager`);
  if(withRec)mrReset();
  MM.tab='mom';momOpen(nid);render();}
async function pnAdd(f){const t=f.elements.t.value.trim();const project=S.proj!=='all'?S.proj:(f.elements.project&&f.elements.project.value)||'';if(!t){toast('Write the note');return;}if(!project){toast('Choose the project');return;}
  const btn=f.querySelector('.btn.pri');btn.disabled=true;let up=[];
  if(f.elements.files&&f.elements.files.files.length){const now=new Date();{const pk=phPick(f.elements.files.files);up=pk.length?await trUpload(await phEach(pk,x=>bmStamp(x,[`Note · ${pname(project)}`,now.toLocaleString('en-IN'),pnm(ME.id)]))):[];}if(up===null){btn.disabled=false;return;}}
  const rec={project,t,pin:!!(f.elements.pin&&f.elements.pin.checked),files:up,by:ME.id,at:Date.now()};let nid='';
  const ok=await write(async()=>{const r=await db.collection('pnotes').add(rec);nid=r.id;},'Note added');btn.disabled=false;
  if(ok){if(!D.pnotes.some(x=>x.id===nid))D.pnotes.push({id:nid,...rec});render();}}
async function pnPatch(id,patch,msg){const n=D.pnotes.find(x=>x.id===id);if(!n)return;if(await write(()=>db.doc('pnotes/'+id).update(patch),msg)){Object.assign(n,patch);render();}}
async function snapSave(files){const pid=SNAP.pid;if(!pid){toast('Choose the project');return;}const to=(document.getElementById('snapTo')||{}).value||'',tag=(document.getElementById('trPhTag')||{}).value||'Progress',note=((document.getElementById('snapNote')||{}).value||'').trim();
  if(to){const [c,id]=to.split('|');closeLayer();await trPhoto(c,id,files,tag);if(note){const t=trRec(c,id);if(t)await trPatch(c,id,{log:[...(t.log||[]),{k:'note',by:ME.id,at:Date.now(),t:note}]});}return;}
  toast('Adding photo…');const loc=await bmLoc(),now=new Date();const lines=[`${tag} · ${pname(pid)}`,now.toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}),`${pnm(ME.id)}${loc?` · GPS ${loc.lat}, ${loc.lng}`:''}`];
  const pk=phPick(files);if(!pk.length)return;const st=await phEach(pk,f=>bmStamp(f,lines));const up=await trUpload(st);if(!up||!up.length)return;
  const rec={project:pid,t:note||`${tag} photo`,pin:false,files:up,ph:tag,...(loc?{loc}:{}),by:ME.id,at:Date.now()};let nid='';
  const ok=await write(async()=>{const r=await db.collection('pnotes').add(rec);nid=r.id;},`Photo added to ${pname(pid)} notes`);
  if(ok){if(!D.pnotes.some(x=>x.id===nid))D.pnotes.push({id:nid,...rec});closeLayer();render();}}
function mrChip(){let c=document.getElementById('mrChip');if(!MR.rec){if(c)c.remove();return;}
  if(!c){c=document.createElement('div');c.id='mrChip';c.setAttribute('role','status');document.body.appendChild(c);}
  c.innerHTML=`<i class="mr-dot"></i><b>Recording</b> <span>${mrFmt((Date.now()-MR.t0)/1000)}</span><button type="button" class="btn sm" data-mrstop>Stop</button>`;}
function mrSegStart(){const mt=mrMime();const r=new MediaRecorder(MR.stream,{...(mt?{mimeType:mt}:{}),audioBitsPerSecond:32000});const chunks=[];
  r.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  r.onstop=()=>{if(chunks.length)MR.parts.push(new Blob(chunks,{type:r.mimeType||mt||'audio/webm'}));if(MR._after){const f=MR._after;MR._after=null;f();}};
  r.onerror=()=>{toast('Recording stopped — the microphone was interrupted');mrStop();};
  r.start(1000);MR.rec=r;MR.segT0=Date.now();}
async function mrStart(){if(MR.rec||MR.starting)return;if(!navigator.mediaDevices||!window.MediaRecorder){toast('Recording is not supported in this browser. Use Upload recording instead.');return;}
  if(!MR.consent){toast('First tick: everyone present knows this meeting is being recorded');return;}
  MR.starting=true;try{MR.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,channelCount:1}});}catch(e){MR.starting=false;toast('Microphone permission was not given — allow the microphone for BuildMitr and try again');return;}
  MR.starting=false;const fm=document.getElementById('momForm');MR.formId=fm?(fm.dataset.id||'new'):'new';mrReset();MR.t0=Date.now();
  MR.stream.getTracks().forEach(t=>t.onended=()=>{if(MR.rec){toast('The microphone stopped (a call or another app?) — recording saved up to here');mrStop();}});
  try{mrSegStart();}catch(e){try{MR.stream.getTracks().forEach(t=>t.stop());}catch(_){}MR.stream=null;toast('Could not start recording on this device');return;}
  try{MR.lock=navigator.wakeLock?await navigator.wakeLock.request('screen'):null;}catch(_){MR.lock=null;}   // keep the phone awake while recording
  MR.timer=setInterval(()=>{mrChip();const el=document.getElementById('mrTime');if(el)el.textContent=mrFmt((Date.now()-MR.t0)/1000);
    if(MR.rec&&Date.now()-MR.segT0>=300000){const old=MR.rec;MR._after=null;try{old.stop();mrSegStart();}catch(e){mrStop();}}   // a new part every 5 minutes
    if(Date.now()-MR.t0>3*3600e3)mrStop();},1000);
  mrChip();mrPanelRefresh();toast('Recording — you can leave this screen; tap Stop at the bottom when the meeting ends');}
function mrStop(){if(!MR.rec||MR.stopping)return;MR.stopping=true;clearInterval(MR.timer);const r=MR.rec;
  MR._after=()=>{MR.stopping=false;try{MR.stream.getTracks().forEach(t=>t.stop());}catch(_){}MR.stream=null;try{MR.lock&&MR.lock.release();}catch(_){}MR.lock=null;MR.rec=null;mrChip();
    MR.msg=`Recorded ${mrFmt((Date.now()-MR.t0)/1000)} in ${MR.parts.length} part${MR.parts.length>1?'s':''}.`;
    if(document.getElementById('momForm'))mrPanelRefresh();else momForm(MR.formId&&MR.formId!=='new'?MR.formId:'');};
  if(r.state==='inactive'){const f=MR._after;MR._after=null;f();}else{try{r.stop();}catch(_){const f=MR._after;MR._after=null;f();}}}
function mrPanelRefresh(){const b=document.getElementById('mrPanel');if(b)b.innerHTML=mrPanel();}
async function mrGo(){if(MR.busy||!MR.parts.length)return;const f=document.getElementById('momForm');if(!f){toast('Open New MOM first');return;}
  if(MR.draft)return;MR.busy=true;MR.formId=f.dataset.id||'new';const set=t=>{MR.msg=t;mrPanelRefresh();};
  try{const wavs=[];for(let i=0;i<MR.parts.length;i++){set(`Preparing recording part ${i+1} of ${MR.parts.length}…`);wavs.push(...await mrToWavs(MR.parts[i]));}
    if(!wavs.length)throw new Error('The recording is empty.');
    const total=wavs.reduce((s,w)=>s+w.dur,0),texts=MR.tparts;
    for(let i=MR.tparts.length;i<wavs.length;i++){set(`Listening to part ${i+1} of ${wavs.length} (${mrFmt(total)} in all)… this takes about half a minute per part`);
      let fo=MR.files[i];if(!fo){const file=new File([wavs[i].blob],`meeting-${today()}-part${i+1}.wav`,{type:'audio/wav'});const up=await trUpload([file]);if(!up||!up.length)throw new Error('Upload failed — check the internet and try again.');fo={...up[0],dur:Math.round(wavs[i].dur)};MR.files[i]=fo;}
      const up=[fo];
      let j;for(let k=0;k<3;k++){try{j=await gasApi('momAudio',{id:up[0].id,part:i+1,of:wavs.length});break;}catch(e){if(e.code!=='ai_busy'&&e.code!=='net'||k===2)throw e;set(`Busy — trying part ${i+1} again in 20 s…`);await new Promise(r=>setTimeout(r,20000));}}
      texts.push(`— Part ${i+1} —\n`+String(j.text||''));MR.transcript=texts.join('\n\n');}
    set('Writing the minutes…');const pid=(f.elements.project&&f.elements.project.value)||'';
    const d=await gasApi('momDraft',{transcript:MR.transcript,people:momPeople(pid,[ME.id]).map(p=>p.name)});MR.draft=d;mrFill(f,d);if(d.cut)toast('The meeting was very long — the minutes cover the first part only; add the rest by hand');
    MR.msg='Draft written from the recording — check every line, correct anything wrong, then Save. The recording and transcript are saved with the minutes.';}
  catch(e){MR.msg='Could not finish: '+(e.message||e)+' Your recording is kept — tap “Write MOM from recording” to try again.';toast(e.message||'Could not finish');}
  finally{MR.busy=false;mrPanelRefresh();}}
function mrFill(f,d){const E_=f.elements,add=(k,arr)=>{if(!E_[k]||!arr||!arr.length)return;const cur=E_[k].value.trim();E_[k].value=(cur?cur+'\n':'')+arr.join('\n');};
  if(E_.title&&!E_.title.value.trim()&&d.title)E_.title.value=d.title;if(E_.kind&&MOM_KINDS.includes(d.kind))E_.kind.value=d.kind;
  add('others',d.others);add('points',d.points);add('decisions',d.decisions);if(E_.next&&d.next&&!E_.next.value)E_.next.value=d.next;
  const pid=(E_.project&&E_.project.value)||'',ppl=momPeople(pid,[ME.id]);
  const match=n=>{n=String(n||'').trim().toLowerCase();if(!n)return '';const p=ppl.find(x=>x.name.toLowerCase()===n)||ppl.find(x=>x.name.toLowerCase().split(/\s+/)[0]===n.split(/\s+/)[0])||ppl.find(x=>x.name.toLowerCase().includes(n)||n.includes(x.name.toLowerCase()));return p?p.account:'';};
  (d.team||[]).forEach(n=>{const u=match(n);const c=u&&f.querySelector(`[name=att][value="${CSS.escape(u)}"]`);if(c)c.checked=true;});
  const box=document.getElementById('momActs');(d.actions||[]).forEach(a=>{let r=[...box.querySelectorAll('.mom-act:not(.mom-done)')].find(x=>!x.querySelector('[name=at]').value.trim());
    if(!r){const t=box.querySelector('.mom-act:not(.mom-done)');if(!t)return;r=t.cloneNode(true);r.querySelectorAll('input').forEach(i=>i.value='');box.appendChild(r);}
    r.querySelector('[name=at]').value=a.t;const u=match(a.who);const sl=r.querySelector('[name=aw]');if(u&&[...sl.options].some(o=>o.value===u))sl.value=u;if(a.due)r.querySelector('[name=ad]').value=a.due;});}
async function mrListen(id,btn){try{btn.disabled=true;btn.textContent='Loading…';const u=await bmFileUrl(id);const a=document.createElement('audio');a.controls=true;a.src=u;a.style.width='100%';btn.replaceWith(a);a.play().catch(()=>{});}catch(e){btn.disabled=false;btn.textContent='Could not load — try again';}}
async function mrText(id,btn){try{btn.disabled=true;const u=await bmFileUrl(id);const t=await (await fetch(u)).text();const d=document.createElement('div');d.className='mr-tr';d.textContent=t;btn.replaceWith(d);}catch(e){btn.disabled=false;toast('Could not open the transcript');}}
PK.done("meetings");
