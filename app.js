/* bm-build:843acea6e124 */
/* ---- page code in separate files (packs/*.js) ----
   The main screens are in this file. Other pages' code comes from small separate files that load in the background
   right after the app starts. Until a file has arrived, a stand-in with the same name takes its place:
   while a page is being drawn it notes the gap and the page shows "Loading…" for a moment, then draws in full;
   on a tap or other action it fetches that file at once. */
const BM_BUILD='843acea6e124';
const PK=(()=>{
  const P={"reports":["vReports","downloadDoc","vWages","vBalances","vBudgetVA","cashFlow","gstSplit"],"extras":["waLink","convertLead","findPlace","vAttBulk","saveAttBulk","vAudit"],"forms":["accDoc","formLevel","projTeam","autoHead","vForms","openAccess","saveAccess","newForm","openForm2","itemList","vForm","saveFormDoc","exportFormXlsx","printForm","uploadTemplate"],"admin":["backupXlsx","backupJson","restoreJson","vAdminPanel","adminSetRole","adminPhone","shareSheet","shareTo","orgsBox","orgsLoad","orgsDraw","orgCreate","orgSave","orgOpen","vInstall","instQR","orgLinkShare","dlDelBtn","dlDelete","dlMarkDel","feedLoad","upiDialog","digLoad","digBox"],"marketing":["vPipeline","vFollowups","followDone","vEstimator","vEstQuick","estDoc","vContent","vMktDash","vLeadImp","leadMap","runLeadImport","portfolioDoc","readLeadFile"],"chat":["tickState","projPeople","chatProjects","vMessages","chatMarkSeen","chatSend","openChatGroup","openRoleGroup","quoteHtml","renderMsgs","pinBar","openMsgMenu","openForward","doForward","msgAction","msgReact","setLang"],"cameras":["loadHls","vCctv","hlsInto","playCam","camFull","camParseQR","camScanDialog","qrStart","camFromQR"],"planning":["setRows","parseXml","parseXer","readImportFile","parsePaste","impBuild","impRender","openImport","impMatch","runImport","schedExport","schSave","makeSchedule","scheduleRecords","e2MakeProject","schedDialog","schedMake","plSetType","plStdApply","vPlanner","plGantt","plMonths","plSave","plFromEst","plOpen","taskComments","taskCommentAdd","plRe","schedEdit","dsSecForm","schedShiftDialog","dsOpen","dsDraw"],"ai":["aiPrompt","aiMsg","aiAsk","aiTool","aiPrepareForm","aiOpenRecord","aiTrim","aiAskGemini","aiMd","aiFill","aiUsageLine","aiClear"],"estimates":["estModeBtns","vEstDetailed","e2Xls","e2Doc","e2Editor","e2Touch","e2SaveRates","e2Rerender","docTplPick","docTplSave","docTpl","docBlank","docFromRec","docOpen","docNew","docClient","docPdfBlob","docPdf","docPptx","docShareFile","docSave","vDocMaker","docUpPage","docUpShow","docUpBlob","docUpFile","lhSave"],"drawings":["relBadge","relBtn","relSet","dleOpen","dleDraw","dleSave","dlMissing","vDlMissing","vDrawLib","dlFloorBox","dlUpload","fileShareText","shareFiles","shareFilesTo","apChips","apButtons","apLog","apDialog","apSave","mkOpen","mkImage","mkPage","mkReady","mkFit","mkTextAt","mkTextDone","mkTools","mkSave","finForm","finNew"],"office":["wtCsv","ntHash","ntPeople","llCsv","vNotices","ntOne","ntPdf","ntSign","ntForm","ntSave"],"library":["stdAccTxt","vStdLib","stdUpForm","stdFolderForm","stdFolderForm2","stdCollect","stdToProj","stdPjDisc"],"meetings":["momText","vMeetings","momOpen","momSave","pnAdd","pnPatch","snapSave","mrChip","mrSegStart","mrStart","mrStop","mrPanelRefresh","mrGo","mrFill","mrListen","mrText"]};const by={};Object.keys(P).forEach(p=>P[p].forEach(n=>{by[n]=p;}));
  const st={},waits={},hits=[],hitP=new Set();let inR=0;
  const dir='packs/'+(BM_BUILD?BM_BUILD+'/':'');   // each version has its own folder, so an open old version never picks up new page files
  const base=(()=>{try{const s=document.currentScript;return s&&s.src?new URL(dir,s.src).href:dir;}catch(_){return dir;}})();
  const url=p=>base+p+'.js'+(BM_BUILD?'?v='+BM_BUILD:'');
  const allOk=()=>Object.keys(P).every(p=>st[p]==='ok');
  function load(p){if(st[p]==='ok')return Promise.resolve();if(waits[p])return waits[p];st[p]='loading';
    return waits[p]=new Promise((ok,no)=>{const s=document.createElement('script');s.src=url(p);s.async=true;
      const fail=()=>{if(st[p]!=='ok')st[p]='err';delete waits[p];no(new Error('Could not load '+p));};
      s.onload=()=>{if(st[p]==='ok')ok();else fail();};s.onerror=fail;(document.head||document.documentElement).appendChild(s);});}
  function sync(p){try{const x=new XMLHttpRequest();x.open('GET',url(p),false);x.send();if(x.status!==200)return false;
      const s=document.createElement('script');s.textContent=x.responseText;(document.head||document.documentElement).appendChild(s);return st[p]==='ok';}catch(_){return false;}}
  let allP=null;
  function loadAll(){if(allP)return allP;allP=Promise.all(Object.keys(P).map(p=>load(p).catch(e=>{allP=null;throw e;})));allP.catch(()=>{setTimeout(loadAll,4000);});return allP;}
  function stub(n){const p=by[n];const f=function(){
      if(st[p]!=='ok'){hits.push((inR?'draw:':'call:')+n);
        if(inR){hitP.add(p);load(p).catch(()=>{});return '';}                       // while drawing: show "Loading…" and draw again when it arrives
        if(!sync(p)){load(p).then(()=>{try{render();}catch(_){}}).catch(()=>{});try{toast('One moment — loading this part of the app…');}catch(_){}return '';}
      }
      const g=window[n];if(typeof g!=='function'||g===f||g.__pk)return '';return g.apply(this,arguments);};
    f.__pk=p;return f;}
  Object.keys(by).forEach(n=>{window[n]=stub(n);});
  /* drawing a page: if a part of it is still loading, show "Loading…" in its place and draw again as soon as it is here */
  {const _r=render;render=function(){inR++;let out,err=null;try{out=_r.apply(this,arguments);}catch(e){err=e;}finally{inR--;}
    if(!inR&&hitP.size){const need=[...hitP];hitP.clear();const v0=typeof S!=='undefined'?S.view:'';
      try{const v=document.getElementById('view');if(v)v.innerHTML='<div class="box hero-empty"><h2>Loading…</h2></div>';}catch(_){}
      const again=()=>{try{render();}catch(e){try{console.error(e);}catch(_){}setTimeout(()=>{throw e;},0);}};   // a real error still shows up (console / error reports)
      const failMsg=()=>{if(typeof S!=='undefined'&&S.view!==v0)return;try{const v=document.getElementById('view');if(v)v.innerHTML='<div class="box hero-empty"><h2>Could not load this page</h2><p>Check the internet connection and try again.</p></div>';}catch(_){}};
      Promise.all(need.map(p=>load(p))).then(again).catch(()=>{setTimeout(()=>{if(typeof S!=='undefined'&&S.view!==v0)return;Promise.all(need.map(p=>load(p))).then(again).catch(failMsg);},3000);});
      return out;}                                   // a part was still loading: any error from the half-drawn page is ignored, it is drawn again in full
    if(err)throw err;return out;};}
  return {hits,done:p=>{st[p]='ok';},load,loadAll,ready:()=>loadAll(),allOk,packOf:n=>by[n]||'',state:()=>Object.assign({},st)};
})();
/* the other pages' files load once the first screen is up and the phone is idle (they come from the copy saved on the phone) */
{const go=()=>{PK.loadAll().catch(()=>{});};const idle=()=>{try{if(window.requestIdleCallback)requestIdleCallback(go,{timeout:2500});else setTimeout(go,1200);}catch(_){setTimeout(go,1200);}};
  if(document.readyState==='complete')setTimeout(idle,800);else window.addEventListener('load',()=>setTimeout(idle,800));}

/* ================= Module definitions =================
   Every list screen is driven by one of these. Field types:
   text, textarea, number, money, date, select, project, member, vendor, client, labour, photos */
const UNITS=['Bags','Kg','Tonne','Cum','Sqft','Rft','Nos','Litre','Load','Brass'];
const INDIAN_STATES=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh','Andaman & Nicobar','Dadra & Nagar Haveli and Daman & Diu','Lakshadweep'];
const CATS=['Material','Labour','Sub-contract','Equipment','Site expense','Design & approvals','Other'];
const BRANCHES=['Hyderabad','Bangalore','Guntur','Other'];
const LOST_REASONS=['Price too high','Chose another builder','Plan postponed','Loan not approved','Not reachable','Plot / approval issue','Other'];
const TPL_KINDS=['First reply','Brochure','Site visit confirmation','Site visit reminder','Quotation follow-up','Follow-up day 1','Follow-up day 3','Follow-up day 7','Follow-up day 15','Review request','Referral thanks','Estimate'];
const CAMP_CH=['Facebook ads','Instagram','Google','Website','YouTube','Expo / event','Hoardings / flyers','Newspaper','Referral drive','Other'];
const MOD={
  clients:{label:'Clients',te:'క్లయింట్లు',icon:'contact',noProject:true,fields:[
    {k:'name',l:'Client name',t:'text',req:1,list:1},{k:'phone',l:'Phone',t:'text',list:1},{k:'email',l:'Email',t:'text',list:1},{k:'gstin',l:'GSTIN',t:'text'},{k:'state',l:'State (for GST)',t:'select',o:INDIAN_STATES},{k:'address',l:'Address',t:'textarea'}]},
  vendors:{label:'Vendors',te:'వెండర్లు',icon:'store',noProject:true,fields:[
    {k:'name',l:'Vendor / firm name',t:'text',req:1,list:1},{k:'type',l:'Supplies',t:'select',o:['Material supplier','Labour contractor','Sub-contractor','Equipment hire','Other'],list:1},
    {k:'phone',l:'Phone',t:'text',list:1},{k:'gstin',l:'GSTIN',t:'text',list:1},{k:'address',l:'Address',t:'textarea'}]},
  tasks:{label:'Tasks',te:'పనులు',icon:'list-checks',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'wbs',l:'WBS / activity ID',t:'text',list:1},{k:'title',l:'Task',t:'text',req:1,list:1},{k:'who',l:'Assigned to',t:'member',list:1},
    {k:'resource',l:'Resource / gang (from schedule)',t:'text'},{k:'start',l:'Start date',t:'date'},{k:'due',l:'Due date',t:'date',list:1},{k:'progress',l:'Progress %',t:'number',list:1,max:100},
    {k:'status',l:'Status',t:'select',o:['Not started','In progress','Completed','On hold'],list:1},{k:'pred',l:'Predecessors',t:'text'},{k:'gates',l:'Checklists that must be approved before this can be marked Completed',t:'tplmulti',list:1},{k:'source',l:'Imported from',t:'text'},{k:'notes',l:'Notes',t:'textarea'}]},
  dtasks:{label:'Design activities',te:'డిజైన్ పనులు',icon:'pen-tool',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'wbs',l:'No.',t:'text',list:1},{k:'title',l:'Activity',t:'text',req:1,list:1},
    {k:'disc',l:'Section',t:'select',o:['Project management','Architecture','3D views','Structure','MEP','Interiors'],list:1},{k:'who',l:'Assigned to',t:'member',list:1},
    {k:'start',l:'Start date',t:'date'},{k:'due',l:'Due date',t:'date',list:1},{k:'progress',l:'Progress %',t:'number',list:1,max:100},
    {k:'status',l:'Status',t:'select',o:['Not started','In progress','Completed','On hold'],list:1},{k:'pred',l:'Predecessors',t:'text'},{k:'resource',l:'Team / person',t:'text'},{k:'source',l:'Made from',t:'text'},{k:'notes',l:'Notes',t:'textarea'}]},
  issues:{label:'Issues & snags',te:'సమస్యలు & లోపాలు',icon:'alert-triangle',actions:['whatsapp'],fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'title',l:'Issue',t:'text',req:1,list:1},
    {k:'kind',l:'Type',t:'select',o:['Site issue','Snag (quality defect)','Safety','Client complaint'],list:1},{k:'location',l:'Location (e.g. FF bedroom 2)',t:'text',list:1},
    {k:'severity',l:'Priority',t:'select',o:['Low','Medium','High'],list:1},{k:'who',l:'Assigned to',t:'member',list:1},{k:'due',l:'Fix by',t:'date',list:1},
    {k:'status',l:'Status',t:'select',o:['Open','Resolved'],list:1},{k:'details',l:'Details',t:'textarea'},{k:'photos',l:'Photos',t:'photos',list:1}]},
  dpr:{label:'Daily reports',te:'రోజువారీ నివేదిక',icon:'notebook-pen',actions:['whatsapp'],fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},
    {k:'items',l:'Choose the work type, then write what was done',t:'workrows',sec:'Work done today'},
    {k:'work',l:'Other notes',t:'textarea',list:1},
    {k:'crew',l:'Labour on site today',t:'crew',sec:'Labour'},
    {k:'mats',l:'Material received / used today',t:'matrows',sec:'Material'},
    {k:'planItems',l:'Choose the work type, then write what is planned',t:'workrows',plan:1,sec:'Plan for tomorrow'},
    {k:'hindrance',l:'Hindrances',t:'textarea',sec:'Hindrances'},{k:'photos',l:'Other site photos',t:'photos',list:1,sec:'Other photos'}]},
  team:{label:'Team',te:'టీమ్',icon:'users',noProject:true,actions:['call','invite'],fields:[
    {k:'name',l:'Name',t:'text',req:1,list:1},{k:'phone',l:'Mobile (WhatsApp)',t:'text',req:1,list:1},{k:'email',l:'Email',t:'text'},
    {k:'role',l:'Role',t:'select',o:['Admin','Project manager','Site engineer','Supervisor','Accountant','Storekeeper','Architect','Structural engineer','Sub-contractor','Marketing','Client'],req:1,list:1},
    {k:'access',l:'Access',t:'select',o:['Full access','Add & edit entries','View only'],req:1,list:1},
    {k:'projects',l:'Projects',t:'projects',list:1},{k:'account',l:'Linked app account (after they open the app)',t:'member',list:1},
    {k:'status',l:'Status',t:'select',o:['Invited','Active','Inactive'],list:1}]},
  cameras:{label:'Camera list',te:'కెమెరాలు',icon:'video',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'name',l:'Camera name (e.g. Main gate)',t:'text',req:1,list:1},{k:'spot',l:'Where on site',t:'text',list:1},
    {k:'brand',l:'Brand',t:'select',o:['CP Plus','EZVIZ','Hikvision','Dahua','Imou','TP-Link Tapo','Qubo','Godrej','Other'],req:1,list:1},
    {k:'model',l:'Model',t:'text'},{k:'serial',l:'Device serial / NVR ID (no passwords)',t:'text'},{k:'channel',l:'NVR channel no.',t:'text'},
    {k:'live',l:'Live link (optional — HLS .m3u8, YouTube Live, MJPEG or web viewer). EZVIZ / Hikvision cameras with a serial play without a link once EZVIZ is connected in Settings',t:'url'},{k:'app',l:'Link to open in brand app / cloud (optional)',t:'url'},
    {k:'clientView',l:'Client can see this camera',t:'select',o:['No','Yes'],req:1,list:1},
    {k:'teamView',l:'Team access',t:'select',o:['All team on this project','Admin & project managers only'],req:1,list:1},
    {k:'status',l:'Status',t:'select',o:['Online','Offline','Not installed yet'],list:1},{k:'installed',l:'Installed on',t:'date'},
    {k:'photos',l:'Snapshots',t:'photos'},{k:'notes',l:'Notes',t:'textarea'}]},
  leads:{label:'Leads',te:'లీడ్స్',icon:'user-plus',noProject:true,actions:['call','convert'],fields:[
    {k:'name',l:'Customer name',t:'text',req:1,list:1},{k:'phone',l:'Phone',t:'text',req:1,list:1},{k:'place',l:'Site location',t:'text',list:1},
    {k:'need',l:'Requirement',t:'select',o:['House construction','Design only','Structural design','Interiors','Renovation','Commercial building','Other'],list:1},
    {k:'size',l:'Plot / built-up size',t:'text'},{k:'budget',l:'Budget (₹)',t:'money',list:1},
    {k:'source',l:'Source',t:'select',o:['Referral','Website','Instagram','Facebook ads','Google','YouTube','Walk-in','Expo / event','Architect','Other'],list:1},
    {k:'branch',l:'Branch',t:'select',o:BRANCHES,list:1},{k:'campaign',l:'Campaign',t:'campaign'},
    {k:'stage',l:'Stage',t:'select',o:['New','Contacted','Site visit','Quotation sent','Negotiation','Won','Lost'],list:1},{k:'lostReason',l:'If lost — why',t:'select',o:LOST_REASONS},
    {k:'follow',l:'Next follow-up',t:'date',list:1},{k:'notes',l:'Notes',t:'textarea'}]},
  survey:{label:'Site surveys',te:'సైట్ సర్వే',icon:'scan-line',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Survey date',t:'date',req:1,list:1,def:'today'},
    {k:'plot',l:'Plot size (e.g. 30 × 40 ft)',t:'text',list:1},{k:'facing',l:'Facing',t:'select',o:['East','West','North','South','North-East','North-West','South-East','South-West'],list:1},
    {k:'road',l:'Road width',t:'text',list:1},{k:'soil',l:'Soil type',t:'select',o:['Hard murrum','Red soil','Black cotton soil','Rock','Filled-up soil','Not known'],list:1},
    {k:'levels',l:'Ground level vs road',t:'text'},{k:'utilities',l:'Water, power, drainage available',t:'textarea'},
    {k:'neighbours',l:'Neighbouring buildings / setbacks',t:'textarea'},{k:'notes',l:'Notes',t:'textarea'},{k:'photos',l:'Site photos',t:'photos',list:1}]},
  boq:{label:'BOQ',te:'బీఓక్యూ',icon:'table-2',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'item',l:'Item no.',t:'text',list:1},{k:'desc',l:'Description',t:'textarea',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:['Cum','Sqft','Sqm','Rft','Rmt','Kg','MT','Nos','Lumpsum','Points'],list:1},
    {k:'qty',l:'BOQ quantity',t:'number',req:1,list:1},{k:'rate',l:'Rate (₹)',t:'money',req:1,list:1},{k:'done',l:'Executed quantity',t:'number',list:1}],
    extra:[{l:'Amount',num:1,f:r=>inr((+r.qty||0)*(+r.rate||0))},{l:'Done',num:1,f:r=>{const p=+r.qty?Math.round((+r.done||0)/r.qty*100):0;return `<span class="pill ${p>=100?'p-green':p?'p-blue':'p-grey'}">${p}%</span>`;}}]},
  changes:{label:'Change orders',te:'మార్పు ఆర్డర్లు',icon:'file-diff',actions:['whatsapp'],fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'no',l:'CO number',t:'text',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},
    {k:'desc',l:'What is changing',t:'textarea',req:1,list:1},{k:'reqby',l:'Requested by',t:'select',o:['Client','Architect','Site team','Structural engineer'],list:1},
    {k:'amount',l:'Cost impact (₹, use minus for savings)',t:'money',list:1,neg:1},{k:'days',l:'Time impact (days)',t:'number',list:1},
    {k:'status',l:'Status',t:'select',o:['Requested','Approved','Rejected'],list:1},{k:'files',l:'Sketch / drawing',t:'files'}]},
  received:{label:'Material received',te:'మెటీరియల్ వచ్చింది',icon:'package-plus',group:'mat',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:UNITS,list:1},{k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'rate',l:'Rate (₹ per unit)',t:'money',list:1},
    {k:'vendor',l:'Vendor',t:'vendor',list:1},{k:'bill',l:'Bill / challan no.',t:'text'},{k:'photos',l:'Bill photo',t:'photos'}]},
  requests:{label:'Transfers & requests',te:'బదిలీలు & అభ్యర్థనలు',icon:'arrow-left-right',group:'mat',fields:[
    {k:'kind',l:'Type',t:'select',o:['Request from site','Transfer between sites'],list:1},{k:'project',l:'For project (to)',t:'project',req:1,list:1},
    {k:'from',l:'From project (transfers only)',t:'project'},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:UNITS,list:1},{k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'needBy',l:'Needed by',t:'date'},
    {k:'status',l:'Status',t:'select',o:['Pending','Approved','Delivered','Rejected'],list:1}]},
  issue:{label:'Material issue',te:'మెటీరియల్ ఇష్యూ',icon:'package-minus',group:'mat',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:UNITS,list:1},{k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'to',l:'Issued to (gang / sub-contractor)',t:'text',list:1},{k:'purpose',l:'For which work',t:'text',list:1}]},
  returned:{label:'Material return',te:'మెటీరియల్ రిటర్న్',icon:'undo-2',group:'mat',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:UNITS,list:1},{k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'retby',l:'Returned by',t:'text',list:1}]},
  consumed:{label:'Material consumption',te:'మెటీరియల్ వినియోగం',icon:'flame',group:'mat',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},
    {k:'unit',l:'Unit',t:'select',o:UNITS,list:1},{k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'work',l:'Used for (e.g. GF slab)',t:'text',list:1}]},
  labour:{label:'Labour',te:'కూలీలు',icon:'hard-hat',group:'man',noProject:true,fields:[
    {k:'name',l:'Name',t:'text',req:1,list:1},{k:'trade',l:'Trade',t:'select',o:['Mason','Helper','Carpenter','Bar bender','Electrician','Plumber','Painter','Tiler','Welder','Supervisor','Other'],list:1},
    {k:'wage',l:'Daily wage (₹)',t:'money',list:1},{k:'phone',l:'Phone',t:'text',list:1},{k:'project',l:'Current project',t:'project',list:1}]},
  attendance:{label:'Attendance',te:'హాజరు',icon:'calendar-check',group:'man',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'labour',l:'Worker',t:'labour',req:1,list:1},
    {k:'status',l:'Attendance',t:'select',o:['Present','Half day','Absent'],list:1},{k:'ot',l:'Overtime hours',t:'number',list:1}]},
  vlabour:{label:'Vendor labour',te:'వెండర్ కూలీలు',icon:'users',group:'man',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'vendor',l:'Labour contractor',t:'vendor',req:1,list:1},
    {k:'trade',l:'Trade',t:'text',list:1},{k:'count',l:'Headcount',t:'number',req:1,list:1},{k:'rate',l:'Rate per head (₹)',t:'money',list:1}]},
  workupd:{label:'Labour work updates',te:'కూలీ పని అప్‌డేట్',icon:'hammer',group:'man',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'gang',l:'Gang / contractor',t:'text',list:1},
    {k:'work',l:'Work item',t:'text',req:1,list:1},{k:'qty',l:'Quantity done',t:'number',list:1},{k:'unit',l:'Unit',t:'select',o:['Sqft','Rft','Cum','Nos','Points'],list:1},{k:'photos',l:'Photos',t:'photos'}]},
  payments:{label:'Payments',te:'చెల్లింపులు',icon:'indian-rupee',group:'fin',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},
    {k:'dir',l:'Type',t:'select',o:['Received from client','Paid to vendor','Paid to labour','Site expense'],req:1,list:1},
    {k:'cat',l:'Cost category',t:'select',o:CATS,list:1},
    {k:'client',l:'Client (if received)',t:'client'},{k:'vendor',l:'Vendor (if paid to vendor)',t:'vendor'},
    {k:'party',l:'Paid to / received from (others)',t:'text',list:1},{k:'amount',l:'Amount (₹)',t:'money',req:1,list:1},
    {k:'mode',l:'Mode',t:'select',o:['UPI','Bank transfer','Cash','Cheque'],list:1},{k:'ref',l:'Reference no.',t:'text'},{k:'photos',l:'Receipt photo',t:'photos'}]},
  invoices:{label:'Invoices & quotes',te:'ఇన్వాయిస్‌లు',icon:'receipt',group:'fin',actions:['download','whatsapp'],fields:[
    {k:'kind',l:'Document',t:'select',o:['Tax invoice','Quotation','Proforma invoice','RA bill'],req:1,list:1},
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'client',l:'Client',t:'client',list:1},{k:'no',l:'Number',t:'text',req:1,list:1},
    {k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'desc',l:'Description of work',t:'textarea',req:1},
    {k:'amount',l:'Amount before tax (₹)',t:'money',req:1,list:1},{k:'gst',l:'GST',t:'select',o:['No GST','GST 18%','GST 12%','GST 5%'],list:1},{k:'sac',l:'HSN / SAC code',t:'text'},
    {k:'status',l:'Status',t:'select',o:['Unpaid','Part paid','Paid','Sent','Accepted'],list:1},{k:'got',l:'Amount received so far (₹)',t:'money'}],
    extra:[{l:'Total',num:1,f:r=>inr(invTotal(r))}]},
  milestones:{label:'Payment stages',te:'చెల్లింపు దశలు',icon:'flag',group:'fin',actions:['raise'],fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'stage',l:'Stage (e.g. Plinth complete)',t:'text',req:1,list:1},{k:'pct',l:'% of contract value',t:'number',list:1},
    {k:'amount',l:'Or fixed amount before tax (₹)',t:'money'},{k:'task',l:'Linked activity (stage becomes due when it is completed)',t:'task',list:1},{k:'due',l:'Due date (if no linked activity)',t:'date'}],
    extra:[{l:'Amount',num:1,f:r=>inr(msAmount(r))},{l:'Status',num:0,f:r=>`<span class="pill ${MS_PILL[msStatus(r)]}">${msStatus(r)}</span>`}]},
  budget:{label:'Budget',te:'బడ్జెట్',icon:'wallet',group:'fin',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'cat',l:'Category',t:'select',o:CATS,req:1,list:1},{k:'amount',l:'Budget (₹)',t:'money',req:1,list:1},{k:'notes',l:'Notes',t:'text',list:1}]},
  po:{label:'Purchase orders',te:'కొనుగోలు ఆర్డర్లు',icon:'shopping-cart',group:'mat',actions:['download','whatsapp'],fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'vendor',l:'Vendor',t:'vendor',req:1,list:1},{k:'no',l:'PO number',t:'text',req:1,list:1},
    {k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'material',l:'Material',t:'material',req:1,list:1},{k:'unit',l:'Unit',t:'select',o:UNITS,list:1},
    {k:'qty',l:'Quantity',t:'number',req:1,list:1},{k:'rate',l:'Rate (₹ per unit)',t:'money',list:1},{k:'delivery',l:'Deliver by',t:'date'},
    {k:'terms',l:'Terms (GST, transport, payment)',t:'textarea'},{k:'status',l:'Status',t:'select',o:['Draft','Sent','Partly received','Received','Cancelled'],list:1}],
    extra:[{l:'Value',num:1,f:r=>inr((+r.qty||0)*(+r.rate||0))}]},
  advances:{label:'Labour advances',te:'అడ్వాన్సులు',icon:'hand-coins',group:'man',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'labour',l:'Worker',t:'labour',req:1,list:1},
    {k:'amount',l:'Amount (₹)',t:'money',req:1,list:1},{k:'mode',l:'Mode',t:'select',o:['Cash','UPI'],list:1}]},
  equipment:{label:'Equipment',te:'యంత్రాలు',icon:'truck',group:'eq',noProject:true,fields:[
    {k:'name',l:'Equipment',t:'text',req:1,list:1},{k:'type',l:'Type',t:'select',o:['JCB / excavator','Concrete mixer','Vibrator','Crane / hoist','Tractor / tipper','Shuttering set','Scaffolding','Generator','Water pump','Other'],list:1},
    {k:'own',l:'Owned or hired',t:'select',o:['Owned','Hired'],list:1},{k:'rate',l:'Rate per hour (₹)',t:'money',list:1},{k:'vendor',l:'Hired from',t:'vendor',list:1}]},
  equiplog:{label:'Equipment usage',te:'యంత్ర వినియోగం',icon:'gauge',group:'eq',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'equip',l:'Equipment',t:'equipment',req:1,list:1},
    {k:'hours',l:'Hours used',t:'number',req:1,list:1},{k:'fuel',l:'Diesel (litres)',t:'number',list:1},{k:'operator',l:'Operator',t:'text'},{k:'work',l:'Work done',t:'text',list:1}],
    extra:[{l:'Cost',num:1,f:r=>inr(equipCost(r))}]},
  documents:{label:'Drawings & documents',te:'డ్రాయింగ్‌లు & పత్రాలు',icon:'folder-open',fields:[
    {k:'project',l:'Project',t:'project',req:1,list:1},{k:'title',l:'Title',t:'text',req:1,list:1},
    {k:'cat',l:'Type',t:'select',o:['Architectural drawing','Structural drawing','Electrical / plumbing','3D view / render','Interior drawing','Approval / permit','Agreement','BOQ / estimate','Report','Other'],list:1},{k:'disc',l:'Drawings library section',t:'select',o:['Architecture','Structure','MEP','3D views','Interiors']},
    {k:'rev',l:'Revision',t:'text',list:1},{k:'status',l:'Status',t:'select',o:['Draft','For approval','Approved','Superseded'],list:1},{k:'files',l:'Files (DWG, PDF, photos and more — up to 10 MB each)',t:'files',list:1},
    {k:'link',l:'Or link (Drive / Dropbox for DWG, Revit, Excel)',t:'url',list:1},{k:'notes',l:'Notes',t:'textarea'}]},
  campaigns:{label:'Campaigns',te:'ప్రచారాలు',icon:'megaphone',noProject:true,fields:[
    {k:'name',l:'Campaign name',t:'text',req:1,list:1},{k:'channel',l:'Channel',t:'select',o:CAMP_CH,req:1,list:1},{k:'branch',l:'Branch',t:'select',o:BRANCHES,list:1},
    {k:'start',l:'Start',t:'date',list:1,def:'today'},{k:'end',l:'End',t:'date'},{k:'spend',l:'Amount spent (₹)',t:'money',list:1},{k:'notes',l:'Notes / target area',t:'textarea'}],
    extra:[{l:'Leads',f:r=>campStats(r).leads},{l:'Won',f:r=>campStats(r).won},{l:'Cost / lead',f:r=>{const x=campStats(r);return x.cpl?inr(x.cpl):'—';}},{l:'Cost / booking',f:r=>{const x=campStats(r);return x.cpb?inr(x.cpb):'—';}}]},
  visits:{label:'Site visits',te:'సైట్ విజిట్లు',icon:'map-pinned',noProject:true,
    wa:r=>{const l=D.leads.find(x=>x.id===r.lead);return l&&l.phone&&r.status==='Scheduled'?waTo(l.phone,tplText('Site visit confirmation',{name:firstName(l.name),date:fd(r.date),time:r.time||'',place:r.place||l.place||'',who:nm(r.who)})):'';},fields:[
    {k:'lead',l:'Customer (lead)',t:'lead',req:1,list:1},{k:'date',l:'Date',t:'date',req:1,list:1,def:'today'},{k:'time',l:'Time',t:'text',list:1},
    {k:'place',l:'Where (running site / office / their plot)',t:'text',list:1},{k:'who',l:'Our person',t:'member',list:1},
    {k:'status',l:'Status',t:'select',o:['Scheduled','Done','No-show','Rescheduled'],list:1},{k:'rating',l:'Customer interest',t:'select',o:['Very interested','Interested','Thinking','Not interested'],list:1},{k:'feedback',l:'Feedback',t:'textarea'}]},
  wtpl:{label:'WhatsApp templates',te:'వాట్సాప్ సందేశాలు',icon:'message-square-text',noProject:true,fields:[
    {k:'kind',l:'Used for',t:'select',o:TPL_KINDS,req:1,list:1},{k:'name',l:'Name',t:'text',list:1},{k:'text',l:'Message — use {name}, {company}, {date}, {time}, {place}, {review}, {brochure}',t:'textarea',req:1,list:1}]},
  packages:{label:'Packages',te:'ప్యాకేజీలు',icon:'layers',noProject:true,fields:[
    {k:'name',l:'Package name',t:'text',req:1,list:1},{k:'rate',l:'Rate per sq.ft (₹)',t:'money',req:1,list:1},{k:'specs',l:"What's included (cement, steel, tiles, paint…)",t:'textarea',list:1},{k:'validity',l:'Price valid till',t:'date',list:1}]},
  reviews:{label:'Reviews & testimonials',te:'రివ్యూలు',icon:'star',noProject:true,
    wa:r=>r.phone&&r.status!=='Received'?waTo(r.phone,tplText('Review request',{name:firstName(r.client)})):'',fields:[
    {k:'project',l:'Project',t:'project',list:1},{k:'client',l:'Client name',t:'text',req:1,list:1},{k:'phone',l:'Phone',t:'text'},
    {k:'type',l:'Type',t:'select',o:['Google review','Video testimonial','Written testimonial'],list:1},{k:'status',l:'Status',t:'select',o:['To ask','Requested','Received','Declined'],list:1},
    {k:'rating',l:'Stars',t:'select',o:['5','4','3','2','1']},{k:'quote',l:'What they said',t:'textarea',list:1},{k:'link',l:'Review / video link',t:'url'}]},
  referrals:{label:'Referrals',te:'రిఫరల్స్',icon:'gift',noProject:true,
    wa:r=>{const l=D.leads.find(x=>x.id===r.lead);return r.phone?waTo(r.phone,tplText('Referral thanks',{name:firstName(r.referrer),lead:l?l.name:'your friend'})):'';},fields:[
    {k:'referrer',l:'Referred by (client / architect)',t:'text',req:1,list:1},{k:'phone',l:'Their phone',t:'text',list:1},{k:'lead',l:'New lead they referred',t:'lead',list:1},
    {k:'reward',l:'Reward (₹)',t:'money',list:1},{k:'status',l:'Status',t:'select',o:['Lead received','Booked','Reward paid'],list:1},{k:'notes',l:'Notes',t:'textarea'}]},
  portfolio:{label:'Portfolio',te:'పోర్ట్‌ఫోలియో',icon:'award',noProject:true,actions:['download'],fields:[
    {k:'project',l:'Project',t:'project',list:1},{k:'title',l:'Title',t:'text',req:1,list:1},{k:'type',l:'Type',t:'select',o:['Independent house','Villa','Duplex','Apartment','Commercial','Renovation'],list:1},
    {k:'size',l:'Built-up (sq.ft)',t:'number',list:1},{k:'months',l:'Completed in (months)',t:'number'},{k:'location',l:'Location',t:'text',list:1},
    {k:'summary',l:'Summary',t:'textarea'},{k:'quote',l:'Client quote',t:'textarea'},{k:'quoteBy',l:'Quote by',t:'text'},{k:'photos',l:'Best photos (client-approved)',t:'photos',list:1},
    {k:'published',l:'Status',t:'select',o:['Draft','Published'],list:1}]},
  cflags:{label:'Photo approvals',te:'ఫోటో అనుమతులు',icon:'images',noProject:true,fields:[{k:'ok',l:'OK for public use',t:'text'}]},
};
const MAT_KEYS=['received','requests','issue','returned','consumed','po'];
const MAN_KEYS=['labour','attendance','vlabour','workupd','advances'];
const NAV=[
  {g:'',items:[['client','home','My home','నా ఇల్లు'],['cphotos','images','Progress photos','ప్రగతి ఫోటోలు'],['cpay','indian-rupee','Payments','చెల్లింపులు'],['cdocs','folder-open','Drawings & documents','డ్రాయింగ్‌లు'],['sitehome','home','Site home','సైట్ హోమ్'],['desk','pencil-ruler','Design desk','డిజైన్ డెస్క్'],['dashboard','layout-dashboard','Dashboard','డాష్‌బోర్డ్'],['orgs','building','Organisations','సంస్థలు'],['messages','message-circle','Messages','సందేశాలు'],['alerts','bell','Alerts','అలర్ట్‌లు'],['projects','building-2','Projects','ప్రాజెక్టులు'],['adminpanel','shield','Admin panel','అడ్మిన్ ప్యానెల్'],['team'],['roleaccess','shield','Role access','పాత్ర అనుమతులు']]},
  {g:'AI',items:[['agents','sparkles','AI Agents','AI ఏజెంట్లు']]},
  {g:'Leads & pipeline',items:[['pipeline','kanban','Pipeline board','పైప్‌లైన్'],['leads'],['visits'],['leadimp','file-up','Import leads','లీడ్స్ దిగుమతి']]},
  {g:'Follow-ups',items:[['followups','calendar-clock','Follow-ups due','ఫాలో-అప్‌లు'],['wtpl']]},
  {g:'Estimates',items:[['estimator','calculator','Estimate builder','అంచనా తయారీ'],['packages']]},
  {g:'Campaigns',items:[['mktdash','target','Marketing dashboard','మార్కెటింగ్ డాష్‌బోర్డ్'],['campaigns']]},
  {g:'Content & reviews',items:[['content','images','Content library','ఫోటో లైబ్రరీ'],['reviews'],['referrals'],['portfolio']]},
  {g:'Sales',items:[['docmaker','file-text','Quotations & invoices','కోటేషన్లు & ఇన్వాయిస్‌లు'],['invoices']]},
  {g:'Library',items:[['clients'],['vendors'],['documents']]},
  {g:'Planning',items:[['survey'],['boq'],['changes'],['schedule','gantt-chart','Construction schedule','నిర్మాణ షెడ్యూల్'],['designsched','pen-tool','Design schedule','డిజైన్ షెడ్యూల్'],['drawlib','library','Drawings library','డ్రాయింగ్ లైబ్రరీ'],['planner','calendar-range','Schedule planner','షెడ్యూల్ ప్లానర్']]},
  {g:'Progress & quality',items:[['tasks'],['issues'],['dpr']]},
  {g:'Site cameras',items:[['cctv','cctv','Live cameras','లైవ్ కెమెరాలు'],['cameras']]},
  {g:'Material',items:[['inventory','warehouse','Inventory','స్టాక్'],['po'],['received'],['requests'],['issue'],['returned'],['consumed']]},
  {g:'Manpower',items:[['attbulk','calendar-plus','Mark attendance','హాజరు వేయండి'],['labour'],['attendance'],['wages','calculator','Wages','జీతాలు'],['advances'],['vlabour'],['workupd']]},
  {g:'Equipment',items:[['equipment'],['equiplog']]},
  {g:'Money',items:[['payments'],['milestones'],['balances','scale','Party balances','బాకీలు'],['budget'],['budgetva','bar-chart-3','Budget vs actual','బడ్జెట్ vs ఖర్చు']]},
  {g:'Reports & export',items:[['reports','file-bar-chart','Summary & CSV export','నివేదికలు'],['forms','clipboard-check','Checklists & sheets','చెక్‌లిస్ట్‌లు & షీట్లు']]},
  {g:'',items:[['settings','settings','Settings','సెట్టింగ్‌లు'],['audit','history','Change history','మార్పుల చరిత్ర']]},
];
const GST={'GST 18%':.18,'GST 12%':.12,'GST 5%':.05};
function invTotal(r){return (+r.amount||0)*(1+(GST[r.gst]||0));}
function equipCost(r){const e=D.equipment.find(x=>x.id===r.equip);return (+r.hours||0)*(+(e&&e.rate)||0);}

/* ================= Helpers ================= */
let LANG='en';try{LANG=localStorage.getItem('bm-lang')||'en'}catch(e){}
/* Telugu / Hindi fonts are loaded only when that language is chosen (saves time on every open) */
function loadIndicFont(){if(LANG==='en'||document.getElementById('indicFont'))return;const l=document.createElement('link');l.id='indicFont';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600&family=Noto+Sans+Devanagari:wght@400;600&display=swap';document.head.appendChild(l);}
loadIndicFont();
let THEME='light';try{THEME=localStorage.getItem('bm-theme')||'light';}catch(e){}   // light is preselected; change it in Settings
function applyTheme(){const r=document.documentElement;if(THEME==='dark'||THEME==='light')r.setAttribute('data-theme',THEME);else r.removeAttribute('data-theme');
  const dark=THEME==='dark'||(THEME!=='light'&&typeof matchMedia!=='undefined'&&matchMedia('(prefers-color-scheme: dark)').matches);r.style.colorScheme=dark?'dark':'light';
  try{const m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',dark?'#101614':'#1f3a2e');}catch(_){}}
function setTheme(t){THEME=t;try{localStorage.setItem('bm-theme',t);}catch(_){}applyTheme();render();}
applyTheme();try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(THEME==='auto')applyTheme();});}catch(_){}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS={"chevron-right":"<path d=\"m9 18 6-6-6-6\"/>","mic":"<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/><line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\"/>","play":"<polygon points=\"6 3 20 12 6 21 6 3\"/>","x":"<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>","contact":"<path d=\"M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><circle cx=\"12\" cy=\"10\" r=\"2\"/><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"4\"/><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"4\"/>","text":"<path d=\"M17 6.1H3\"/><path d=\"M21 12.1H3\"/><path d=\"M15.1 18H3\"/>","phone":"<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/>","store":"<path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\"/><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\"/><path d=\"M2 7h20\"/><path d=\"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7\"/>","type":"<polyline points=\"4 7 4 4 20 4 20 7\"/><line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\"/><line x1=\"12\" x2=\"12\" y1=\"4\" y2=\"20\"/>","list-checks":"<path d=\"m3 17 2 2 4-4\"/><path d=\"m3 7 2 2 4-4\"/><path d=\"M13 6h8\"/><path d=\"M13 12h8\"/><path d=\"M13 18h8\"/>","alert-triangle":"<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>","notebook-pen":"<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\"/><path d=\"M2 6h4\"/><path d=\"M2 10h4\"/><path d=\"M2 14h4\"/><path d=\"M2 18h4\"/><path d=\"M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z\"/>","user-plus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\"/><line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\"/>","scan-line":"<path d=\"M3 7V5a2 2 0 0 1 2-2h2\"/><path d=\"M17 3h2a2 2 0 0 1 2 2v2\"/><path d=\"M21 17v2a2 2 0 0 1-2 2h-2\"/><path d=\"M7 21H5a2 2 0 0 1-2-2v-2\"/><path d=\"M7 12h10\"/>","table-2":"<path d=\"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18\"/>","file-diff":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M9 10h6\"/><path d=\"M12 13V7\"/><path d=\"M9 17h6\"/>","files":"<path d=\"M20 7h-3a2 2 0 0 1-2-2V2\"/><path d=\"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z\"/><path d=\"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8\"/>","package-plus":"<path d=\"M16 16h6\"/><path d=\"M19 13v6\"/><path d=\"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14\"/><path d=\"m7.5 4.27 9 5.15\"/><polyline points=\"3.29 7 12 12 20.71 7\"/><line x1=\"12\" x2=\"12\" y1=\"22\" y2=\"12\"/>","arrow-left-right":"<path d=\"M8 3 4 7l4 4\"/><path d=\"M4 7h16\"/><path d=\"m16 21 4-4-4-4\"/><path d=\"M20 17H4\"/>","package-minus":"<path d=\"M16 16h6\"/><path d=\"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14\"/><path d=\"m7.5 4.27 9 5.15\"/><polyline points=\"3.29 7 12 12 20.71 7\"/><line x1=\"12\" x2=\"12\" y1=\"22\" y2=\"12\"/>","undo-2":"<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11\"/>","flame":"<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/>","hard-hat":"<path d=\"M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z\"/><path d=\"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5\"/><path d=\"M4 15v-3a6 6 0 0 1 6-6h0\"/><path d=\"M14 6h0a6 6 0 0 1 6 6v3\"/>","calendar-check":"<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/><path d=\"m9 16 2 2 4-4\"/>","users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>","hammer":"<path d=\"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9\"/><path d=\"m18 15 4-4\"/><path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\"/>","indian-rupee":"<path d=\"M6 3h12\"/><path d=\"M6 8h12\"/><path d=\"m6 13 8.5 8\"/><path d=\"M6 13h3\"/><path d=\"M9 13c6.667 0 6.667-10 0-10\"/>","cat":"<path d=\"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z\"/><path d=\"M8 14v.5\"/><path d=\"M16 14v.5\"/><path d=\"M11.25 16.25h1.5L12 17l-.75-.75Z\"/>","receipt":"<path d=\"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z\"/><path d=\"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8\"/><path d=\"M12 17.5v-11\"/>","download":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>","wallet":"<path d=\"M21 12V7H5a2 2 0 0 1 0-4h14v4\"/><path d=\"M3 5v14a2 2 0 0 0 2 2h16v-5\"/><path d=\"M18 12a2 2 0 0 0 0 4h4v-4Z\"/>","shopping-cart":"<circle cx=\"8\" cy=\"21\" r=\"1\"/><circle cx=\"19\" cy=\"21\" r=\"1\"/><path d=\"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12\"/>","hand-coins":"<path d=\"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17\"/><path d=\"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9\"/><path d=\"m2 16 6 6\"/><circle cx=\"16\" cy=\"9\" r=\"2.9\"/><circle cx=\"6\" cy=\"5\" r=\"3\"/>","truck":"<path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\"/><path d=\"M15 18H9\"/><path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\"/><circle cx=\"17\" cy=\"18\" r=\"2\"/><circle cx=\"7\" cy=\"18\" r=\"2\"/>","gauge":"<path d=\"m12 14 4-4\"/><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"/>","fuel":"<line x1=\"3\" x2=\"15\" y1=\"22\" y2=\"22\"/><line x1=\"4\" x2=\"14\" y1=\"9\" y2=\"9\"/><path d=\"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18\"/><path d=\"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5\"/>","folder-open":"<path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/>","link":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>","layout-dashboard":"<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/>","building-2":"<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\"/><path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"/><path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\"/><path d=\"M10 6h4\"/><path d=\"M10 10h4\"/><path d=\"M10 14h4\"/><path d=\"M10 18h4\"/>","gantt-chart":"<path d=\"M8 6h10\"/><path d=\"M6 12h9\"/><path d=\"M11 18h7\"/>","warehouse":"<path d=\"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z\"/><path d=\"M6 18h12\"/><path d=\"M6 14h12\"/><rect width=\"12\" height=\"12\" x=\"6\" y=\"10\"/>","calculator":"<rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\"/><line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\"/><line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\"/><path d=\"M16 10h.01\"/><path d=\"M12 10h.01\"/><path d=\"M8 10h.01\"/><path d=\"M12 14h.01\"/><path d=\"M8 14h.01\"/><path d=\"M12 18h.01\"/><path d=\"M8 18h.01\"/>","scale":"<path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"/><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"/><path d=\"M7 21h10\"/><path d=\"M12 3v18\"/><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"/>","bar-chart-3":"<path d=\"M3 3v18h18\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>","file-bar-chart":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M8 18v-2\"/><path d=\"M12 18v-4\"/><path d=\"M16 18v-6\"/>","settings":"<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","library":"<path d=\"m16 6 4 14\"/><path d=\"M12 6v14\"/><path d=\"M8 8v12\"/><path d=\"M4 4v16\"/>","menu":"<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"/><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"/><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"/>","folder":"<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/>","chevron-down":"<path d=\"m6 9 6 6 6-6\"/>","flask-conical":"<path d=\"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2\"/><path d=\"M8.5 2h7\"/><path d=\"M7 16h10\"/>","languages":"<path d=\"m5 8 6 6\"/><path d=\"m4 14 6-6 2-3\"/><path d=\"M2 5h12\"/><path d=\"M7 2h1\"/><path d=\"m22 22-5-10-5 10\"/><path d=\"M14 18h6\"/>","globe":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>","plus":"<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>","external-link":"<path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>","file-text":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M10 9H8\"/><path d=\"M16 13H8\"/><path d=\"M16 17H8\"/>","image":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/>","arrow-right-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 12h8\"/><path d=\"m12 16 4-4-4-4\"/>","file-down":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M12 18v-6\"/><path d=\"m9 15 3 3 3-3\"/>","message-circle":"<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/>","pencil":"<path d=\"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z\"/><path d=\"m15 5 4 4\"/>","trash-2":"<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\"/><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>","map-pin":"<path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>","calendar":"<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/>","wifi-off":"<path d=\"M12 20h.01\"/><path d=\"M8.5 16.429a5 5 0 0 1 7 0\"/><path d=\"M5 12.859a10 10 0 0 1 5.17-2.69\"/><path d=\"M19 12.859a10 10 0 0 0-2.007-1.523\"/><path d=\"M2 8.82a15 15 0 0 1 4.177-2.643\"/><path d=\"M22 8.82a15 15 0 0 0-11.288-3.764\"/><path d=\"m2 2 20 20\"/>","check":"<path d=\"M20 6 9 17l-5-5\"/>","upload":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\"/>","camera":"<path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/>","code":"<polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/>","arrow-down-left":"<path d=\"M17 7 7 17\"/><path d=\"M17 17H7V7\"/>","arrow-up-right":"<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>","view":"<path d=\"M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z\"/><path d=\"M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/><path d=\"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2\"/><path d=\"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2\"/>","log-in":"<path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"/><polyline points=\"10 17 15 12 10 7\"/><line x1=\"15\" x2=\"3\" y1=\"12\" y2=\"12\"/>","user":"<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/>","send":"<path d=\"m22 2-7 20-4-9-9-4Z\"/><path d=\"M22 2 11 13\"/>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>","locate-fixed":"<line x1=\"2\" x2=\"5\" y1=\"12\" y2=\"12\"/><line x1=\"19\" x2=\"22\" y1=\"12\" y2=\"12\"/><line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"5\"/><line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\"/><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","map":"<polygon points=\"3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21\"/><line x1=\"9\" x2=\"9\" y1=\"3\" y2=\"18\"/><line x1=\"15\" x2=\"15\" y1=\"6\" y2=\"21\"/>","navigation":"<polygon points=\"3 11 22 2 13 21 11 13 3 11\"/>","sparkles":"<path d=\"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z\"/><path d=\"M5 3v4\"/><path d=\"M19 17v4\"/><path d=\"M3 5h4\"/><path d=\"M17 19h4\"/>","file-up":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M12 12v6\"/><path d=\"m15 15-3-3-3 3\"/>","video":"<path d=\"m22 8-6 4 6 4V8Z\"/><rect width=\"14\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" ry=\"2\"/>","cctv":"<path d=\"M7 9h.01\"/><path d=\"M16.75 12H22l-3.5 7-3.09-4.32\"/><path d=\"M18 9.5l-4 8-10.39-5.2a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3Z\"/><path d=\"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15\"/><path d=\"M2 21v-4\"/>","shield":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/>","eye":"<path d=\"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","eye-off":"<path d=\"M9.88 9.88a3 3 0 1 0 4.24 4.24\"/><path d=\"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68\"/><path d=\"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61\"/><line x1=\"2\" x2=\"22\" y1=\"2\" y2=\"22\"/>","monitor-play":"<path d=\"m10 7 5 3-5 3Z\"/><rect width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\"/><path d=\"M12 17v4\"/><path d=\"M8 21h8\"/>","smartphone":"<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/><path d=\"M12 18h.01\"/>","sheet":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><line x1=\"3\" x2=\"21\" y1=\"9\" y2=\"9\"/><line x1=\"3\" x2=\"21\" y1=\"15\" y2=\"15\"/><line x1=\"9\" x2=\"9\" y1=\"9\" y2=\"21\"/><line x1=\"15\" x2=\"15\" y1=\"9\" y2=\"21\"/>","edit":"<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z\"/>","arrow-left":"<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>","lock":"<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/>","clipboard-check":"<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\"/><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><path d=\"m9 14 2 2 4-4\"/>","briefcase":"<rect width=\"20\" height=\"14\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\"/><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/>","boxes":"<path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\"/><path d=\"m7 16.5-4.74-2.85\"/><path d=\"m7 16.5 5-3\"/><path d=\"M7 16.5v5.17\"/><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\"/><path d=\"m17 16.5-5-3\"/><path d=\"m17 16.5 4.74-2.85\"/><path d=\"M17 16.5v5.17\"/><path d=\"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z\"/><path d=\"M12 8 7.26 5.15\"/><path d=\"m12 8 4.74-2.85\"/><path d=\"M12 13.5V8\"/>","flag":"<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"/><line x1=\"4\" x2=\"4\" y1=\"22\" y2=\"15\"/>","home":"<path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/>","bell":"<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/>","calendar-plus":"<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><path d=\"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8\"/><path d=\"M3 10h18\"/><path d=\"M16 19h6\"/><path d=\"M19 16v6\"/>","history":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/>","trending-up":"<polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\"/><polyline points=\"16 7 22 7 22 13\"/>","package":"<path d=\"m7.5 4.27 9 5.15\"/><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\"/><path d=\"m3.3 7 8.7 5 8.7-5\"/><path d=\"M12 22V12\"/>","database":"<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5V19A9 3 0 0 0 21 19V5\"/><path d=\"M3 12A9 3 0 0 0 21 12\"/>","megaphone":"<path d=\"m3 11 18-5v12L3 14v-3z\"/><path d=\"M11.6 16.8a3 3 0 1 1-5.8-1.6\"/>","map-pinned":"<path d=\"M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/>","message-square-text":"<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/><path d=\"M13 8H7\"/><path d=\"M17 12H7\"/>","layers":"<path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\"/><path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\"/>","gift":"<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13\"/><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/>","award":"<circle cx=\"12\" cy=\"8\" r=\"6\"/><path d=\"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11\"/>","images":"<path d=\"M18 22H4a2 2 0 0 1-2-2V6\"/><path d=\"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/><rect width=\"16\" height=\"16\" x=\"6\" y=\"2\" rx=\"2\"/>","kanban":"<path d=\"M6 5v11\"/><path d=\"M12 5v6\"/><path d=\"M18 5v14\"/>","calendar-clock":"<path d=\"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5\"/><path d=\"M16 2v4\"/><path d=\"M8 2v4\"/><path d=\"M3 10h5\"/><path d=\"M17.5 17.5 16 16.3V14\"/><circle cx=\"16\" cy=\"16\" r=\"6\"/>","target":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>","star":"<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/>","pencil-ruler":"<path d=\"m15 5 4 4\"/><path d=\"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13\"/><path d=\"m8 6 2-2\"/><path d=\"m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z\"/><path d=\"m18 16 2-2\"/><path d=\"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17\"/>","archive":"<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"/><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\"/><path d=\"M10 12h4\"/>","corner-up-left":"<polyline points=\"9 14 4 9 9 4\"/><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"/>","pin":"<line x1=\"12\" x2=\"12\" y1=\"17\" y2=\"22\"/><path d=\"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z\"/>"};
const ico=(n,c='i')=>`<svg class="${c}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]||ICONS['folder']||''}</svg>`;
const TDX={at:0,v:''};   // today's date is asked for thousands of times per page: worked out at most once a second
const today=()=>{const n=Date.now();if(n-TDX.at<1000&&n>=TDX.at)return TDX.v;const d=new Date(n);TDX.v=new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);TDX.at=n;return TDX.v;};
const LOC=()=>LANG==='te'?'te-IN':LANG==='hi'?'hi-IN':'en-IN';
/* dates and amounts are written thousands of times per page: the formatters are made once and each date is kept once written */
const FDX={f:{},c:new Map()};
const fd=s=>{if(!s)return '—';const l=LOC(),k=l+'|'+s;let v=FDX.c.get(k);if(v!==undefined)return v;
  const f=FDX.f[l]||(FDX.f[l]=new Intl.DateTimeFormat(l,{day:'numeric',month:'short',year:'2-digit'}));
  const d=new Date(s+'T00:00');v=isNaN(d)?d.toLocaleDateString(l,{day:'numeric',month:'short',year:'2-digit'}):f.format(d);if(FDX.c.size>20000)FDX.c.clear();FDX.c.set(k,v);return v;};
const NFX={i:new Intl.NumberFormat('en-IN'),n:new Intl.NumberFormat('en-IN',{maximumFractionDigits:2})};
const inr=n=>'₹'+NFX.i.format(Math.round(+n||0));
const num=n=>NFX.n.format(+n||0);
const label=k=>{if(LANG==='hi'&&HI[k])return HI[k];if(LANG==='te'&&TE_X[k])return TE_X[k];const m=MOD[k];if(m)return LANG==='te'?m.te:m.label;for(const g of NAV)for(const it of g.items)if(it[0]===k&&it[2])return LANG==='te'?it[3]:it[2];return k;};
const icon=k=>MOD[k]?MOD[k].icon:(NAV.flatMap(g=>g.items).find(i=>i[0]===k)||[])[1];

/* ================= State ================= */
let db=null,U=null,A=null,ME={id:null,name:'',isOwner:false,canEdit:false},CANW=true,CANW0=true;
const COLS=['projects','members','org','joinreq','templates','forms','formAccess','audit','roleaccess','chats','chatseen','chatgroups','chatprefs','worklog',...Object.keys(MOD)];
const D={};COLS.forEach(c=>D[c]=[]);
let P={};
const S={view:'dashboard',proj:'all',q:'',fstat:'',fwho:'',lsort:(()=>{try{return localStorage.getItem('bm-lsort')||'';}catch(_){return '';}})(),confirm:null,ready:false,stale:false};
try{const p=localStorage.getItem('bm-proj');if(p)S.proj=p;}catch(e){}
const nm=id=>!id?'—':DEMO_NAMES[id]?DEMO_NAMES[id]:id===ME.id?(ME.name||'You'):((P[id]&&P[id].name)||'Someone');
const proj=id=>D.projects.find(p=>p.id===id);
const pname=id=>{const p=proj(id);return p?`${p.prefix?p.prefix+' · ':''}${p.name}`:'—';};
const vname=id=>(D.vendors.find(v=>v.id===id)||{}).name||'—';
const lname=id=>(D.labour.find(v=>v.id===id)||{}).name||'—';
const cname=id=>(D.clients.find(v=>v.id===id)||{}).name||'—';
const ename=id=>(D.equipment.find(v=>v.id===id)||{}).name||'—';
const inProj=r=>S.proj==='all'?(!r.project||(projOK(r.project)&&!projArch(r.project))):r.project===S.proj;
const canDel=r=>CANW&&(ME.canEdit||ME.isOwner||r.by===ME.id);
const orgName=()=>(D.org.find(o=>o.id==='main')||{}).name||'Your company';

/* ================= Demo mode (sample data in memory only) ================= */
const REAL={};const DEMO_NAMES={dm1:'Bala Krishna',dm2:'Ravi (site engineer)',dm3:'Suresh (supervisor)',dm4:'Kavya (architect)'};
function demoData(){
  const dd=n=>{const d=new Date();d.setDate(d.getDate()+n);return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);};
  const T=Date.now(),X={};COLS.forEach(c=>X[c]=[]);let n=0;const add=(c,o)=>{X[c].push({id:'demo'+(++n),by:'dm1',at:T-n*1e5,...o});return 'demo'+n;};
  X.members=['dm1','dm2','dm3','dm4'].map(id=>({id,joined:T}));
  [['Bala Krishna','9494694690','Admin','Full access',['all'],'dm1','Active'],['Ravi','9000055555','Site engineer','Add & edit entries',null,'dm2','Active'],['Suresh','9000066666','Supervisor','Add & edit entries',null,'dm3','Active'],['Kavya','9000077777','Architect','View only',null,'dm4','Active'],['Anil','9000088888','Accountant','Full access',['all'],'','Invited']]
    .forEach(([name,phone,role,access,projects,account,status])=>X.team.push({id:'tm'+name,name,phone,role,access,projects:projects||['P1'],account,status,by:'dm1',at:T}));
  X.org=[{id:'main',name:'BuildMitr (demo)',gstin:'36ABCDE1234F1Z5',address:'Banjara Hills, Hyderabad',state:'Telangana',invPrefix:'SDB',sac:'995411',bank:'HDFC Bank, Banjara Hills',acc:'(demo)',ifsc:'HDFC0000000',upi:'buildmitr@hdfcbank',phone:'9494694690',website:'https://buildmitr.github.io/buildmitr_1/',brochure:'',reviewLink:''}];
  const c1=add('clients',{name:'Mr. Prasad Reddy',phone:'9876543210',address:'Kondapur, Hyderabad',state:'Telangana'});
  const c2=add('clients',{name:'Mrs. Lakshmi Devi',phone:'9123456780',address:'Guntur',state:'Andhra Pradesh'});
  const p1=add('projects',{prefix:'BM-26-21',name:'Prasad Residence G+2',client:c1,address:'Plot 42, Kondapur, Hyderabad',loc:{lat:17.4632,lng:78.3631},start:dd(-40),end:dd(140),description:'3,600 sft, RCC framed',value:9200000,area:3600,created:T});
  const p2=add('projects',{prefix:'BM-26-18',name:'Lakshmi Villa G+1',client:c2,address:'Brodipet, Guntur',loc:{lat:16.3008,lng:80.4428},start:dd(-90),end:dd(60),description:'2,400 sft duplex',value:5600000,area:2400,created:T-1e6});
  const v1=add('vendors',{name:'Sri Sai Cement Traders',type:'Material supplier',phone:'9000011111',gstin:'36AAACS1111K1Z2'});
  const v2=add('vendors',{name:'Ramesh Steel',type:'Material supplier',phone:'9000022222'});
  const v3=add('vendors',{name:'Venkatesh Labour Contractor',type:'Labour contractor',phone:'9000033333'});
  const v4=add('vendors',{name:'Hanuman Earth Movers',type:'Equipment hire',phone:'9000044444'});
  const H1=36e5,cm1=add('campaigns',{name:'Kokapet villas – Meta lead form',channel:'Facebook ads',branch:'Hyderabad',start:dd(-30),spend:45000,notes:'25 km around Kokapet, age 30–55'});
  const cm2=add('campaigns',{name:'Google search – house construction',channel:'Google',branch:'Hyderabad',start:dd(-25),spend:30000});
  const cm3=add('campaigns',{name:'Guntur home expo',channel:'Expo / event',branch:'Guntur',start:dd(-12),end:dd(-10),spend:60000});
  const l1=add('leads',{name:'Mr. Kiran Kumar',phone:'9988776655',place:'Kokapet, Hyderabad',need:'House construction',size:'40 × 60 ft, G+2',budget:9500000,source:'Instagram',branch:'Hyderabad',campaign:cm1,stage:'Site visit',follow:dd(0),seqStart:dd(-6),seq:[1,3],at:T-7*864e5,contacted:T-7*864e5+0.5*H1});
  const l2=add('leads',{name:'Dr. Anitha',phone:'9876501234',place:'Manikonda',need:'Structural design',size:'30 × 50 ft',budget:150000,source:'Referral',branch:'Hyderabad',stage:'Quotation sent',follow:dd(-1),seqStart:dd(-9),seq:[1,3,7],at:T-10*864e5,contacted:T-10*864e5+2*H1});
  const l3=add('leads',{name:'Mr. Sandeep',phone:'9811122233',place:'Narsingi',need:'Interiors',budget:1800000,source:'Website',branch:'Hyderabad',campaign:cm2,stage:'New',follow:dd(0),at:T-3*H1});
  const l4=add('leads',{name:'Mrs. Padma',phone:'9849012345',place:'Tellapur',need:'House construction',size:'30 × 40 ft, G+1',budget:4200000,source:'Facebook ads',branch:'Hyderabad',campaign:cm1,stage:'Contacted',seqStart:dd(-3),seq:[1],follow:dd(0),at:T-4*864e5,contacted:T-4*864e5+1*H1});
  const l5=add('leads',{name:'Mr. Rahul Varma',phone:'9701234567',place:'Brodipet, Guntur',need:'House construction',size:'G+2, 3000 sft',budget:6500000,source:'Expo / event',branch:'Guntur',campaign:cm3,stage:'Negotiation',follow:dd(1),seqStart:dd(-10),seq:[1,3,7],at:T-11*864e5,contacted:T-11*864e5+3*H1});
  add('leads',{name:'Mr. Naveen',phone:'9640011223',place:'Gachibowli',need:'House construction',budget:7000000,source:'Google',branch:'Hyderabad',campaign:cm2,stage:'Won',wonAt:T-2*864e5,at:T-20*864e5,contacted:T-20*864e5+H1});
  add('leads',{name:'Mr. Srikanth',phone:'9550099887',place:'Whitefield, Bangalore',need:'House construction',budget:5000000,source:'Instagram',branch:'Bangalore',stage:'Lost',lostReason:'Price too high',at:T-15*864e5,contacted:T-15*864e5+5*H1});
  add('leads',{name:'Mrs. Swathi',phone:'9440055667',place:'Mangalagiri',need:'Renovation',budget:1200000,source:'Expo / event',branch:'Guntur',campaign:cm3,stage:'Lost',lostReason:'Plan postponed',at:T-11*864e5,contacted:T-11*864e5+4*H1});
  add('visits',{lead:l1,date:dd(0),time:'11:00 AM',place:'Running site – Prasad Residence, Kondapur',who:'dm2',status:'Scheduled'});
  add('visits',{lead:l5,date:dd(-4),time:'4:00 PM',place:'Lakshmi Villa site, Guntur',who:'dm3',status:'Done',rating:'Very interested',feedback:'Liked the steel and shuttering quality; asked for payment stages.'});
  add('visits',{lead:l4,date:dd(2),time:'10:30 AM',place:'Their plot, Tellapur',who:'dm2',status:'Scheduled'});
  add('packages',{name:'Basic',rate:1950,specs:'Cement: Dalmia / Maha (OPC 53)\nSteel: Fe 500 (Vizag / JSW)\nFlooring: vitrified tiles up to ₹50/sft\nPaint: Tractor emulsion inside, Ace outside\nDoors: teak frame, flush shutters',validity:dd(60)});
  add('packages',{name:'Standard',rate:2250,specs:'Cement: UltraTech / Ramco\nSteel: Fe 550D (JSW / Tata)\nFlooring: vitrified tiles up to ₹90/sft, granite stairs\nPaint: Royale inside, Apex outside\nDoors: teak main door, membrane inner\nUPVC windows',validity:dd(60)});
  add('packages',{name:'Premium',rate:2650,specs:'Cement: UltraTech\nSteel: Tata Tiscon Fe 550D\nFlooring: imported marble / large tiles up to ₹160/sft\nPaint: Royale Luxury, Ultima outside\nFull teak doors, UPVC sliding windows, false ceiling in living',validity:dd(60)});
  add('reviews',{project:p2,client:'Mrs. Lakshmi Devi',phone:'9123456780',type:'Google review',status:'Requested'});
  add('reviews',{project:p1,client:'Mr. Prasad Reddy',phone:'9876543210',type:'Video testimonial',status:'Received',rating:'5',quote:'Daily photos and the app made it easy to follow our house from Bangalore.'});
  add('referrals',{referrer:'Mr. Prasad Reddy',phone:'9876543210',lead:l2,reward:10000,status:'Lead received'});
  add('portfolio',{project:p2,title:'Lakshmi Villa — G+1 duplex',type:'Duplex',size:2400,months:11,location:'Brodipet, Guntur',summary:'2,400 sft duplex with RCC framed structure, stage-wise quality checks and handover in 11 months.',quote:'They finished on time and kept us updated every day.',quoteBy:'Mrs. Lakshmi Devi',published:'Draft'});
  X.team.push({id:'tmPriya',name:'Priya',phone:'9000088888',role:'Marketing',access:'Add & edit entries',projects:['all'],status:'Active',by:'dm1',at:T});
  add('survey',{project:p1,date:dd(-45),plot:'40 × 60 ft',facing:'East',road:'30 ft',soil:'Hard murrum',levels:'1 ft below road',utilities:'Borewell, 3-phase power nearby, open drain',neighbours:'G+1 on north side'});
  [['1.1','Earthwork excavation for footings','Cum',180,350,180],['2.1','PCC 1:4:8 below footings','Cum',14,5800,14],['3.1','RCC M25 footings & columns','Cum',62,7800,40],['3.2','RCC M25 slabs & beams','Cum',140,8200,30],['4.1','Brickwork 9" (solid blocks)','Cum',210,6200,0],['5.1','Plastering 12 mm','Sqm',2400,320,0]]
    .forEach(([item,desc,unit,qty,rate,done])=>add('boq',{project:p1,item,desc,unit,qty,rate,done}));
  add('changes',{project:p1,no:'CO-01',date:dd(-12),desc:'Add 3 ft cantilever balcony on first floor front',reqby:'Client',amount:185000,days:6,status:'Approved'});
  add('changes',{project:p1,no:'CO-02',date:dd(-2),desc:'Change staircase from dog-legged to open-well',reqby:'Architect',amount:60000,days:4,status:'Requested'});
  const tk=[['Site clearing & marking',-40,-37,100,'Completed','dm2'],['Footing excavation',-36,-30,100,'Completed','dm2'],['Footings & column starters',-29,-18,100,'Completed','dm3'],['Plinth beams',-17,-8,90,'In progress','dm3'],['GF columns',-6,4,40,'In progress','dm2'],['GF roof slab',5,16,0,'Not started','dm2'],['FF columns & slab',20,40,0,'Not started','dm3'],['Brickwork GF',18,35,0,'Not started','dm3']];
  const G={'Footing excavation':['cl-exc'],'Footings & column starters':['cl-ren','cl-pre'],'Plinth beams':['cl-ren','cl-con'],'GF columns':['cl-ren','cl-sht'],'GF roof slab':['cl-pre','cl-con'],'Brickwork GF':['cl-msn']};const TID={};tk.forEach(([title,a,b,progress,status,who],i)=>{TID[title]=add('tasks',{project:p1,wbs:String(i+1),title,start:dd(a),due:dd(b),progress,status,who,gates:G[title]||[]});});
  add('tasks',{project:p2,title:'Internal plastering',start:dd(-10),due:dd(-1),progress:70,status:'In progress',who:'dm3'});
  add('tasks',{project:p2,title:'Electrical conduits FF',start:dd(-3),due:dd(6),progress:30,status:'In progress',who:'dm2'});
  add('issues',{project:p1,title:'Honeycombing in column C7',kind:'Snag (quality defect)',location:'GF, grid B-3',severity:'High',who:'dm3',due:dd(1),status:'Open',details:'Chip loose concrete and repair with polymer mortar before next lift.'});
  add('issues',{project:p1,title:'Neighbour complaint on dust',kind:'Client complaint',severity:'Medium',who:'dm2',due:dd(3),status:'Open'});
  add('issues',{project:p2,title:'Helmets not worn on scaffold',kind:'Safety',severity:'High',who:'dm2',due:dd(0),status:'Resolved'});
  add('dpr',{project:p1,date:dd(0),weather:'Clear',work:'GF column shuttering for C1–C8 done. Reinforcement checked by structural engineer for C9–C14.',plan:'Concrete C1–C8 in the morning (M25, 4 cum).',hindrance:'Sand delivery delayed by half a day.'});
  add('dpr',{project:p1,date:dd(-1),weather:'Cloudy',work:'Plinth beam PB4–PB9 de-shuttering and curing. Bar bending for GF columns.',plan:'Start column shuttering.'});
  add('dpr',{project:p2,date:dd(0),weather:'Hot',work:'Internal plastering FF bedrooms 1 and 2 completed.',plan:'Plaster FF hall.'});
  const R=(project,date,material,unit,qty,rate,vendor)=>add('received',{project,date:dd(date),material,unit,qty,rate,vendor,bill:'B-'+(1000+n)});
  R(p1,-30,'Cement OPC 53','Bags',400,385,v1);R(p1,-8,'Cement OPC 53','Bags',300,390,v1);R(p1,-28,'Steel TMT 12 mm','Kg',4200,64,v2);R(p1,-26,'Steel TMT 8 mm','Kg',1800,66,v2);R(p1,-20,'River sand','Cum',40,2400,'');R(p2,-60,'Cement OPC 53','Bags',600,380,v1);
  add('issue',{project:p1,date:dd(-25),material:'Cement OPC 53',unit:'Bags',qty:420,to:'Venkatesh gang',purpose:'Footings & plinth'});
  add('issue',{project:p1,date:dd(-3),material:'Steel TMT 12 mm',unit:'Kg',qty:2900,to:'Bar bending team',purpose:'Columns'});
  add('returned',{project:p1,date:dd(-15),material:'Cement OPC 53',unit:'Bags',qty:15,retby:'Venkatesh gang'});
  add('consumed',{project:p1,date:dd(-18),material:'Cement OPC 53',unit:'Bags',qty:390,work:'Footings, PCC, plinth'});
  add('requests',{kind:'Request from site',project:p1,date:dd(0),material:'Aggregate 20 mm',unit:'Cum',qty:12,needBy:dd(2),status:'Pending'});
  add('requests',{kind:'Request from site',project:p2,date:dd(-1),material:'Wall putty',unit:'Bags',qty:40,needBy:dd(3),status:'Pending'});
  add('po',{project:p1,vendor:v2,no:'PO-2611-07',date:dd(-1),material:'Steel TMT 10 mm',unit:'Kg',qty:2500,rate:65,delivery:dd(4),terms:'Rates incl. GST. Unloading by vendor. Payment 15 days after delivery.',status:'Sent'});
  const L=[['Raju','Mason',1100],['Srinu','Mason',1100],['Lakshmi','Helper',700],['Durga','Helper',700],['Ramana','Bar bender',950],['Prakash','Carpenter',1000]].map(([name,trade,wage])=>add('labour',{name,trade,wage,project:p1,phone:''}));
  for(let d=-12;d<=0;d++){if(new Date(dd(d)+'T00:00').getDay()===0)continue;L.forEach((id,i)=>add('attendance',{project:p1,date:dd(d),labour:id,status:(d+i)%9===0?'Absent':(d+i)%7===0?'Half day':'Present',ot:i===0&&d%3===0?2:0}));}
  add('advances',{project:p1,date:dd(-6),labour:L[0],amount:2000,mode:'Cash'});add('advances',{project:p1,date:dd(-4),labour:L[4],amount:1500,mode:'UPI'});
  add('vlabour',{project:p1,date:dd(0),vendor:v3,trade:'Shuttering',count:6,rate:950});add('vlabour',{project:p1,date:dd(-1),vendor:v3,trade:'Shuttering',count:5,rate:950});
  add('workupd',{project:p1,date:dd(-1),gang:'Venkatesh gang',work:'Column shuttering',qty:420,unit:'Sqft'});
  const e1=add('equipment',{name:'JCB 3DX',type:'JCB / excavator',own:'Hired',rate:1100,vendor:v4});const e2=add('equipment',{name:'Mixer machine 1 bag',type:'Concrete mixer',own:'Owned',rate:150});
  add('equiplog',{project:p1,date:dd(-35),equip:e1,hours:14,fuel:60,operator:'Shankar',work:'Footing excavation'});add('equiplog',{project:p1,date:dd(0),equip:e2,hours:6,fuel:8,operator:'Raju',work:'Column concrete'});
  add('payments',{project:p1,date:dd(-40),dir:'Received from client',cat:'Other',client:c1,amount:1500000,mode:'Bank transfer',ref:'NEFT 4471'});
  add('payments',{project:p1,date:dd(-10),dir:'Received from client',cat:'Other',client:c1,amount:1000000,mode:'Bank transfer'});
  add('payments',{project:p1,date:dd(-20),dir:'Paid to vendor',cat:'Material',vendor:v1,amount:154000,mode:'UPI'});
  add('payments',{project:p1,date:dd(-15),dir:'Paid to vendor',cat:'Material',vendor:v2,amount:250000,mode:'Bank transfer'});
  add('payments',{project:p1,date:dd(-7),dir:'Paid to labour',cat:'Labour',party:'Weekly wages',amount:68400,mode:'Cash'});
  add('payments',{project:p1,date:dd(-30),dir:'Paid to vendor',cat:'Equipment',vendor:v4,amount:15400,mode:'UPI'});
  add('payments',{project:p1,date:dd(-5),dir:'Site expense',cat:'Site expense',party:'Water tanker & tea',amount:6200,mode:'Cash'});
  add('invoices',{kind:'RA bill',project:p1,client:c1,no:'RA-01',date:dd(-12),desc:'Running bill 1: excavation, PCC, footings and plinth beams as per BOQ items 1.1–3.1',amount:2200000,gst:'GST 18%',status:'Part paid',got:2500000});
  add('invoices',{kind:'Quotation',project:p2,client:c2,no:'Q-26-31',date:dd(-3),desc:'Modular kitchen and wardrobes',amount:640000,gst:'GST 18%',status:'Sent'});
  [['Material',3200000],['Labour',1400000],['Sub-contract',900000],['Equipment',150000],['Site expense',120000]].forEach(([cat,amount])=>add('budget',{project:p1,cat,amount}));
  add('documents',{project:p1,title:'Ground floor plan',cat:'Architectural drawing',rev:'R2',status:'Approved',link:'https://drive.google.com/'});
  add('documents',{project:p1,title:'Footing & column layout',cat:'Structural drawing',rev:'R1',status:'Approved',link:'https://drive.google.com/'});
  add('documents',{project:p1,title:'GF roof slab reinforcement',cat:'Structural drawing',rev:'R0',status:'For approval',link:'https://drive.google.com/'});
  X.team.forEach(t=>{if(t.projects[0]==='P1')t.projects=[p1];});
  {const ra=X.invoices.find(i=>i.kind==='RA bill');
   [['Booking / agreement',10,'',dd(-45),ra?ra.id:''],['Foundation & plinth complete',15,TID['Plinth beams'],'',''],['GF roof slab cast',15,TID['GF roof slab'],'',''],['FF roof slab cast',15,TID['FF columns & slab'],'',''],['Brickwork complete',15,TID['Brickwork GF'],'',''],['Finishing & handover',30,'',dd(140),'']]
    .forEach(([stage,pct,task,due,inv])=>add('milestones',{project:p1,stage,pct,task,due,inv}));}
  [['Main gate','Front gate, facing road','CP Plus','Online','Yes','All team on this project'],['Slab top','Terrace corner pole','EZVIZ','Online','Yes','All team on this project'],['Material store','Cement & steel store','CP Plus','Offline','No','Admin & project managers only']]
    .forEach(([name,spot,brand,status,clientView,teamView])=>add('cameras',{project:p1,name,spot,brand,status,clientView,teamView,installed:dd(-38),model:brand==='EZVIZ'?'C8C 4G':'CP-E35A',serial:'(demo)'}));
  {const ans={};['i0','i2','i3','i4','i5','i6','i7','i8','i9','i10'].forEach((k,j)=>ans[k]={v:j===1?'NO':'YES',r:j===1?'Barricade missing on north side — fixed next day':''});
   add('forms',{project:p1,tpl:'cl-exc',title:'Footing excavation — grid A to D',head:{'Project':'Prasad Residence G+2','Client':'Mr. Prasad Reddy','Doc. No.':'QA/CL-EXC/BM-26-21/001','Project Location':'Plot 42, Kondapur, Hyderabad','Site':'Kondapur','Location':'Footings F1–F12','Date':dd(-35)},ans,foot:{'Remarks / Observations':'Excavation size and depth checked against footing layout R1.','Checked By':'Ravi','Approved By':'Bala Krishna'},rows:[],status:'Approved',photos:[],upd:T-3e5});
   const br=[['1.1','Earthwork excavation for footings','Cum','180','350'],['2.1','PCC 1:4:8 below footings','Cum','14','5800'],['3.1','RCC M25 footings & columns','Cum','62','7800'],['3.2','RCC M25 slabs & beams','Cum','140','8200'],['4.1','Solid block masonry 200 mm','Cum','210','6200'],['8','TMT reinforcement Fe550D','Kg','24500','68']].map(a=>({sno:a[0],desc:a[1],unit:a[2],qty:a[3],rate:a[4]}));
   add('forms',{project:p1,tpl:'sh-boq',title:'BOQ — structure',head:{'Project':'Prasad Residence G+2','Location':'Kondapur','Date':dd(-40)},rows:br,gst:'18',ans:{},foot:{},status:'Draft',photos:[],upd:T-2e5});}
  X.formAccess.push({id:p1+'__all',project:p1,tpl:'all',view:['tmKavya'],edit:['tmRavi','tmSuresh'],by:'dm1',at:T});
  {const ck=(k,w)=>(k+'__'+w).replace(/[^A-Za-z0-9_-]/g,'_');const H=36e5;const OW='tmBala Krishna';
   const msg=(pid,g,from,text,mentions,ago)=>X.chats.push({id:'dc'+(++n),project:pid,grp:g,from,text,mentions,photos:[],by:'dm1',at:T-ago});
   const seen=(pid,g,who,ago)=>X.chatseen.push({id:ck(pid+'|'+g,who),thread:pid+'|'+g,who,last:T-ago});
   const g1='owner+site+client+design';
   msg(p1,g1,'tmRavi','Shuttering for the GF roof slab is complete. Please check the reinforcement before Monday\'s pour.',['tmKavya',OW],5*H);
   msg(p1,g1,'tmKavya','Checked against the drawings — add 2 extra T12 bars around the staircase opening.',['tmRavi'],4*H);
   msg(p1,g1,OW,'Mr. Prasad, slab casting is planned for Monday 9 AM. You are welcome to visit the site.',['tmPrasad'],3*H);
   msg(p1,g1,OW,'Ravi, please send photos once the extra bars are tied.',['tmRavi'],0.3*H);
   seen(p1,g1,'tmRavi',1*H);seen(p1,g1,'tmKavya',2*H);seen(p1,g1,'tmPrasad',2.5*H);seen(p1,g1,'tmSuresh',3.5*H);seen(p1,g1,OW,0.3*H);
   const g2='owner+site';
   msg(p1,g2,OW,'How many workers are needed for tomorrow?',['tmRavi'],6*H);
   msg(p1,g2,'tmRavi','18 workers and 2 bar benders. Cement 40 bags is enough.',[OW],5.5*H);
   seen(p1,g2,'tmRavi',5*H);seen(p1,g2,'tmSuresh',4.8*H);seen(p1,g2,OW,5.4*H);
   const g3='owner+client';
   msg(p1,g3,'tmPrasad','Can we change the kitchen floor tiles to a matt finish?',[OW],2*H);
   seen(p1,g3,'tmPrasad',2*H);
   const g4='owner+marketing';
   msg('_co',g4,'tmPriya','3 new leads from the Kokapet campaign today. One wants a site visit on Sunday.',[OW],0.5*H);
   seen('_co',g4,'tmPriya',0.5*H);
   X.chatgroups.push({id:'dpg1',project:p1,name:'Slab casting team',mm:{[OW]:'admin','tmRavi':'admin','tmSuresh':'member','tmKavya':'view'},by:'dm1',creator:OW,at:T-8*H});
   msg(p1,'g:dpg1',OW,'Created this group for Monday\'s GF roof slab pour. Ravi is admin and can add the bar bender and RMC supplier.',[],7*H);
   msg(p1,'g:dpg1','tmRavi','RMC booked: 32 cubic metres M25, pump at 8:30 AM. Suresh please arrange 2 vibrators.',['tmSuresh'],6.5*H);
   seen(p1,'g:dpg1','tmSuresh',6*H);seen(p1,'g:dpg1','tmKavya',6.2*H);seen(p1,'g:dpg1',OW,6.4*H);seen(p1,'g:dpg1','tmRavi',6.5*H);
  }
  X.team.push({id:'tmPrasad',name:'Mr. Prasad Reddy',phone:'9876543210',role:'Client',access:'View only',projects:[p1],account:'',status:'Invited',by:'dm1',at:T});
  return X;
}
/* ================= Web mode (outside Claude, e.g. Netlify): browser-only store ================= */
function localDb(){
  let store;try{store=JSON.parse(localStorage.getItem('bm-local')||'null');}catch(e){}
  if(!store){store=demoData();}
  COLS.forEach(c=>store[c]=store[c]||[]);
  const ls={};const save=()=>{try{localStorage.setItem('bm-local',JSON.stringify(store));}catch(e){toast('Browser storage is full.');}};
  const snap=c=>({docs:store[c].map(r=>{const{id,...rest}=r;return {id,exists:true,data:()=>rest};}),metadata:{fromCache:false,hasPendingWrites:false}});
  const emit=c=>(ls[c]||[]).forEach(f=>f(snap(c)));
  const docRef=(c,id)=>({get:async()=>{const r=store[c].find(x=>x.id===id);return {id,exists:!!r,data:()=>r?(({id,...rest})=>rest)(r):undefined};},
    set:async o=>{const i=store[c].findIndex(x=>x.id===id);const v={id,...o};if(i>=0)store[c][i]=v;else store[c].push(v);save();emit(c);},
    update:async o=>{const r=store[c].find(x=>x.id===id);if(!r)throw {code:'invalid_argument'};Object.assign(r,o);save();emit(c);},
    delete:async()=>{store[c]=store[c].filter(x=>x.id!==id);save();emit(c);}});
  return {
    doc:path=>{const[c,id]=path.split('/');return docRef(c,id);},
    collection:c=>({doc:id=>docRef(c,id||'l'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)),
      add:async o=>{const id='l'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);store[c].push({id,...o});save();emit(c);return {id};},
      onSnapshot:next=>{(ls[c]=ls[c]||[]).push(next);setTimeout(()=>next(snap(c)),0);return()=>{};}}),
    reset:()=>{try{localStorage.removeItem('bm-local');}catch(e){}location.reload();}
  };
}
async function saveFile(filename,blob){
  const dl=window.claude&&claude.use?await claude.use('downloads'):null;
  if(dl){try{await dl.save({filename,data:blob});}catch(_){}return;}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
}

function setDemo(on){
  S.demo=on;S.proj='all';S.view='dashboard';
  if(on){const X=demoData();COLS.forEach(c=>D[c]=X[c]||[]);}else COLS.forEach(c=>D[c]=REAL[c]||[]);
  render();scrollTo(0,0);toast(on?'Demo loaded — sample data only, nothing is saved':'Back to your real data');
}

/* ================= Writes ================= */
async function write(fn,ok){
  if(S.demo){toast('This is demo data — exit the demo to add or change real entries.');return false;}
  try{await fn();if(ok)toast(ok);return true;}
  catch(e){
    if(e&&e.code==='invalid_argument'){CANW=CANW0=false;toast('You can view but not change data. Ask the admin for Contributor access.');render();}
    else if(e&&e.code==='quota_exceeded')toast('Storage is full. Remove old entries first.');
    else toast('Could not save. Check your connection and try again.');
    return false;
  }
}

/* ================= Shell ================= */
const SUPER=[{name:'Marketing & sales',icon:'megaphone',groups:['Leads & pipeline','Follow-ups','Campaigns','Content & reviews','Sales']},{name:'Project management',icon:'briefcase',groups:['Library','Estimates','Planning','Progress & quality','Reports & export']},{name:'Site resources',icon:'boxes',groups:['Material','Manpower','Equipment','Money']}];
const GROUP_ICON={'AI':'sparkles','Leads & pipeline':'kanban','Follow-ups':'calendar-clock','Estimates':'calculator','Campaigns':'target','Content & reviews':'star','Reports & export':'file-bar-chart','Site cameras':'cctv','Sales':'user-plus','Library':'library','Planning':'gantt-chart','Progress & quality':'list-checks','Material':'warehouse','Manpower':'hard-hat','Equipment':'truck','Money':'indian-rupee'};
let COLLAPSED=false;try{COLLAPSED=localStorage.getItem('bm-collapsed')==='1';}catch(e){}
const SMALL_MQ='(max-width:1024px)';
if(typeof matchMedia!=='undefined'&&matchMedia(SMALL_MQ).matches)COLLAPSED=true;
try{if(typeof matchMedia!=='undefined'){const mq=matchMedia(SMALL_MQ);const on=()=>{COLLAPSED=mq.matches;try{document.querySelector('.app').classList.toggle('collapsed',COLLAPSED);}catch(_){}if(typeof S!=='undefined'&&S.ready){side();draw();}};mq.addEventListener?mq.addEventListener('change',on):mq.addListener&&mq.addListener(on);}}catch(_){}
const OPENG=new Set();
function setCollapsed(v){COLLAPSED=v;try{localStorage.setItem('bm-collapsed',v?'1':'0')}catch(e){}document.querySelector('.app').classList.toggle('collapsed',v);side();draw();syncMenuLock();}
let MENU_Y=0;
function syncMenuLock(){try{const small=matchMedia('(max-width:1024px)').matches;const open=small&&!COLLAPSED&&!(S.cloud&&S.authStep);const h=document.documentElement,b=document.body;
  if(open&&!h.classList.contains('menu-open')){MENU_Y=window.scrollY||0;b.style.top=(-MENU_Y)+'px';h.classList.add('menu-open');}
  else if(!open&&h.classList.contains('menu-open')){h.classList.remove('menu-open');b.style.top='';window.scrollTo(0,MENU_Y);}}catch(_){}}
function side(){
  document.querySelector('.app').classList.toggle('collapsed',COLLAPSED);syncMenuLock();
  NAV.forEach(g=>{if(g.g&&g.items.some(i=>i[0]===S.view)&&!OPENG.has('auto:'+S.view)){OPENG.add(g.g);const sp=SUPER.find(x=>x.groups.includes(g.g));if(sp)OPENG.add(sp.name);OPENG.add('auto:'+S.view);}});
  const navBtn=k=>`<button class="nav ${S.view===k?'on':''}" data-go="${k}" title="${esc(label(k))}">${ico(icon(k))}<span class="lbl">${esc(label(k))}</span>${k==='messages'?(()=>{const c=chatUnread();return c?`<span class="nbadge">${c}</span>`:'';})():''}</button>`;
  let h=`<div class="side-top"><span class="brand">BuildMitr</span><button class="burger" id="burger" title="${COLLAPSED?'Open menu':'Collapse menu'}" aria-label="${COLLAPSED?'Open menu':'Collapse menu'}" aria-expanded="${!COLLAPSED}">${ico('menu')}</button></div><div class="org">${esc(orgName())}</div><div class="uibadge">${esc(UI_NAME[uiOf()])}${S.viewAs?' · preview':''}</div>`;
  const okItem=k=>k==='alerts'?false:UI_ONLY[k]?(uiOf()===UI_ONLY[k]&&canView(k)):k==='dashboard'&&['site','design'].includes(uiOf())?false:canView(k);
  const grpHtml=(g0,cls='')=>{const g={...g0,items:g0.items.filter(i=>okItem(i[0]))};if(!g.items.length)return '';const open=OPENG.has(g.g),active=g.items.some(i=>i[0]===S.view);
    return `<button class="gh ${cls} ${open?'open':''} ${active?'has':''}" data-grp="${esc(g.g)}" aria-expanded="${open}" title="${esc(trG(g.g))}">${ico(GROUP_ICON[g.g]||'folder')}<span class="lbl">${esc(trG(g.g))}</span>${ico('chevron-down','i chev')}</button>${open?`<div class="subs">${g.items.map(([k])=>navBtn(k)).join('')}</div>`:''}`;};
  const done=new Set();
  NAV.forEach(g=>{
    if(!g.g){h+=g.items.filter(([k])=>okItem(k)).map(([k])=>navBtn(k)).join('');return;}
    const sp=SUPER.find(x=>x.groups.includes(g.g));
    if(!sp){h+=grpHtml(g);return;}
    if(done.has(sp.name))return;done.add(sp.name);
    const kids=sp.groups.map(n=>NAV.find(x=>x.g===n)).filter(Boolean).filter(k=>k.items.some(i=>okItem(i[0])));if(!kids.length)return;
    const open=OPENG.has(sp.name),active=kids.some(k=>k.items.some(i=>i[0]===S.view));
    h+=`<button class="gh sup ${open?'open':''} ${active?'has':''}" data-grp="${esc(sp.name)}" aria-expanded="${open}" title="${esc(trG(sp.name))}">${ico(sp.icon)}<span class="lbl">${esc(trG(sp.name))}</span>${ico('chevron-down','i chev')}</button>`;
    if(open)h+=`<div class="subs supsubs">${kids.map(k=>grpHtml(k,'sub2')).join('')}</div>`;
  });
  h+=`<div class="grow"></div>${S.web?'':`<button class="nav" data-demo="${S.demo?'off':'on'}" title="Demo">${ico('flask-conical')}<span class="lbl">${S.demo?'Exit demo':'View demo'}</span></button>`}<button class="nav" id="langBtn" title="Language">${ico('languages')}<span class="lbl">${(LANGS.find(l=>l[0]===LANG)||LANGS[0])[1]}</span></button>${S.cloud?`<button class="nav" id="signOut" title="Sign out">${ico('log-in')}<span class="lbl">Sign out</span></button>`:''}`;
  document.getElementById('side').innerHTML=h;
}
function header(title,actions=''){
  const opts=PJ().sort((a,b)=>(b.created||0)-(a.created||0)).map(p=>`<option value="${p.id}" ${S.proj===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('');
  return `${S.web&&!S.cloud?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('globe')}<span style="flex:1"><b>Web demo.</b> Sample data is loaded and everything you add is saved only in this browser. Photo and file uploads work in the team version.</span>${cloudCfg()?`<button class="btn sm pri" id="lgExitDemo">Sign in</button>`:''}<button class="btn sm" data-reset="1">Reset demo</button></div>`:''}${S.demo?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('flask-conical')}<span style="flex:1"><b>Demo mode.</b> Sample projects to show how BuildMitr works. Nothing here is saved.</span><button class="btn sm" data-demo="off">Exit demo</button></div>`:''}${S.viewAs?previewBar():''}<div class="bar">${backBtn()}<h1>${title}</h1>${S.ready&&canView('alerts')?(()=>{const c=bellCount(S.proj);return `<button class="btn bell" data-go="alerts" aria-label="Alerts">${ico('bell')}${c?`<span class="bell-n">${c}</span>`:''}</button>`;})():''}
    <label class="psw">${ico('building-2')}<select id="projSel" aria-label="Project"><option value="all">All projects</option>${opts}</select></label>${actions}</div>`;
}
const isAdmin=()=>ME.isOwner||ME.canEdit;
const addBtn=k=>CANW&&(!['team','cameras'].includes(k)||isAdmin())?`<button class="btn pri" data-add="${k}">${ico('plus')}Add</button>`:'';

/* ================= Cell rendering ================= */
const STATUS_PILL={'Completed':'p-green','In progress':'p-blue','Not started':'p-grey','On hold':'p-amber','Open':'p-red','Resolved':'p-green','High':'p-red','Medium':'p-amber','Low':'p-grey',
  'Pending':'p-amber','Approved':'p-blue','Delivered':'p-green','Rejected':'p-grey','Present':'p-green','Snag (quality defect)':'p-amber','Online':'p-green','Offline':'p-red','Not installed yet':'p-grey','Yes':'p-green','No':'p-grey','Safety':'p-red','Won':'p-green','Lost':'p-grey','New':'p-blue','Quotation sent':'p-amber','Negotiation':'p-amber','Site visit':'p-blue','Requested':'p-amber','For approval':'p-amber','Superseded':'p-grey','Draft':'p-grey','Unpaid':'p-red','Part paid':'p-amber','Paid':'p-green','Half day':'p-amber','Absent':'p-red','Received from client':'p-green'};
function cell(f,r){
  const v=r[f.k];
  switch(f.t){
    case 'project':return esc(pname(v));
    case 'member':return esc(pnm(v));
    case 'lead':{const l=D.leads.find(x=>x.id===v);return l?esc(l.name):'—';}
    case 'campaign':{const c=D.campaigns.find(x=>x.id===v);return c?esc(c.name):'—';}
    case 'vendor':return esc(vname(v));
    case 'labour':return esc(lname(v));
    case 'client':return esc(cname(v));
    case 'tplmulti':return (v||[]).length?(()=>{const miss=gateMissing(r);return `<span class="pill ${miss.length?'p-amber':'p-green'}" title="${esc((v||[]).map(tplName).join(', '))}">${miss.length?`🔒 ${v.length-miss.length}/${v.length} approved`:`✓ ${v.length} approved`}</span>`;})():'—';
    case 'task':{const t=D.tasks.find(x=>x.id===v);return t?esc(t.title):'—';}
    case 'projects':return (v||[]).includes('all')?'<span class="pill p-green">All projects</span>':(v||[]).length?(v||[]).map(id=>`<span class="pill p-grey" style="margin:1px">${esc(pname(id))}</span>`).join(' '):'—';
    case 'equipment':return esc(ename(v));
    case 'url':return v?`<a class="btn sm" href="${esc(v)}" target="_blank" rel="noopener noreferrer">${ico('external-link')}Open link</a>`:'—';
    case 'files':return (v||[]).length?`<div class="acts-f" style="display:flex;gap:6px;flex-wrap:wrap">${v.map(x=>`<span class="dl-f"><a class="btn sm" href="/_blob/${esc(x.id)}" target="_blank" rel="noopener" aria-label="${esc(x.name)}">${ico(fileIco(x))}${esc(x.name.length>22?x.name.slice(0,20)+'…':x.name)}</a><button type="button" class="btn sm ghost" data-fshare="${esc(x.id)}|${esc(x.name)}|${esc(x.type||'')}|${esc(r.title||x.name)}" aria-label="Share ${esc(x.name)}">${ico('share-2')}</button></span>`).join('')}</div>`:'—';
    case 'date':return fd(v);
    case 'money':return v?inr(v):'—';
    case 'number':return f.k==='progress'?`<div style="display:flex;gap:8px;align-items:center"><div class="prog"><i style="width:${Math.min(100,+v||0)}%"></i></div><span class="code">${+v||0}%</span></div>`:(v===''||v==null?'—':num(v));
    case 'crew':return crewTot(v)?`<b>${num(crewTot(v))}</b> <span class="code">${esc(crewTxt(v))}</span>`:'—';
    case 'workrows':{const ph=(Array.isArray(v)?v:[]).flatMap(wrPh);const t=[...new Set((Array.isArray(v)?v:[]).filter(x=>x&&x.work).map(x=>x.trade||'Other'))];return t.length?esc(t.join(', '))+(ph.length?` <span class="code">· ${ph.length} 📷</span>`:''):'—';}
    case 'matrows':return (v||[]).length?`${v.length} item${v.length>1?'s':''}`:'—';
    case 'photos':{const ph=Array.isArray(v)?v:[];return ph.length?`<div class="thumbs">${ph.map((id,i)=>i<3?`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="" loading="lazy"></a>`:i===3?`<a class="th-more" data-img href="/_blob/${esc(id)}" target="_blank" rel="noopener" aria-label="Photo 4 of ${ph.length}">+${ph.length-3}</a>`:`<a hidden data-img href="/_blob/${esc(id)}"></a>`).join('')}</div>`:'—';}
    case 'select':return v?(STATUS_PILL[v]?`<span class="pill ${STATUS_PILL[v]}">${esc(v)}</span>`:esc(v)):'—';
    case 'textarea':return v?esc(String(v).length>90?String(v).slice(0,90)+'…':v):'—';
    default:return esc(v||'—');
  }
}
const isNum=f=>f.t==='number'&&f.k!=='progress'||f.t==='money';
/* ---- daily report: trades, material rows, text ---- */
const DPR_WTYPES=['Civil','Electrical','Plumbing','Carpentry','Painting','Tiles / flooring','Fabrication / steel','Waterproofing','False ceiling','Other'];
MOD.dpr.fields.find(f=>f.k==='items').o=DPR_WTYPES;
const DPR_PH={Civil:'e.g. GF slab shuttering 60%, brickwork FF east wall',Electrical:'e.g. Conduits in FF slab, DB fixing',Plumbing:'e.g. Sleeves in toilet slab, drain line to sump'};
/* work lines of a report as [{trade,work}] — new reports keep them in items; the first test build used civil / electrical / plumbing */
const wrPh=x=>Array.isArray(x&&x.photos)?x.photos.filter(i=>typeof i==='string'&&i):[];
const dprItems=r=>{const a=(Array.isArray(r&&r.items)?r.items:[]).filter(x=>x&&(typeof x.work==='string'||typeof x.work==='number')&&String(x.work).trim()).map(x=>({trade:String(x.trade||'Other'),work:String(x.work),photos:wrPh(x)}));
  [['Civil','civil'],['Electrical','electrical'],['Plumbing','plumbing']].forEach(([t,k])=>{if(r&&r[k]&&String(r[k]).trim())a.push({trade:t,work:String(r[k]),photos:[]});});return a;};
const dprPlan=r=>{const a=(Array.isArray(r&&r.planItems)?r.planItems:[]).filter(x=>x&&(typeof x.work==='string'||typeof x.work==='number')&&String(x.work).trim()).map(x=>({trade:String(x.trade||'Other'),work:String(x.work)}));
  if(!a.length&&r&&r.plan&&String(r.plan).trim())a.push({trade:'Other',work:String(r.plan)});return a;};
const dprPhotos=r=>[...dprItems(r).flatMap(x=>x.photos),...(Array.isArray(r&&r.photos)?r.photos:[])];
/* the latest report of this project before the date that has a plan — its plan becomes the starting point of the next report */
const prevPlan=(pid,date)=>{if(!pid||!date||D.dpr.some(d=>d.project===pid&&d.date===date))return null;
  const p=D.dpr.filter(d=>d.project===pid&&d.date&&String(d.date)<String(date)).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')))[0];
  if(!p||!dprPlan(p).length)return null;const g=(new Date(date+'T00:00:00')-new Date(p.date+'T00:00:00'))/864e5;return g>=0&&g<=3?p:null;};
const dprTypes=r=>{const t=new Set(dprItems(r).map(x=>x.trade));if(crewTot(r.crew))t.add('Labour');if(dprMats(r).length)t.add('Material');if(r.work&&String(r.work).trim()&&!dprItems(r).length)t.add('Other');return t;};
let WRN=0;
const MKT={};
const nextDay=d=>{const x=new Date(String(d||today())+'T00:00:00');x.setDate(x.getDate()+1);return isoDate(x);};
function wrRow(x,plan){x=x||{};const ts=[...new Set([...DPR_WTYPES,...(x.trade?[x.trade]:[])])],rk='w'+(++WRN),fk='wr:'+rk;
  if(!plan)DRAFT.photos[fk]=[...wrPh(x)];
  return `<div class="wr-row" data-rk="${rk}"><select data-w="trade" aria-label="Work type">${ts.map(t=>`<option ${t===(x.trade||'Civil')?'selected':''}>${esc(t)}</option>`).join('')}</select>
    <textarea data-w="work" rows="2" placeholder="${esc(plan?'What is planned for tomorrow':DPR_PH[x.trade]||'What was done today')}" aria-label="${plan?'Planned work':'Work done'}">${esc(x.work||'')}</textarea>
    <button type="button" class="btn sm ghost" data-wrdel aria-label="Remove">${ico('x')}</button>
    ${plan?'':`<div class="wr-ph"><div data-phlist="${fk}" class="wr-phl">${phChips(fk)}</div>${A?`<label class="btn sm ghost" style="width:max-content">${ico('camera')}<span>Photos</span><input type="file" accept="image/*" multiple hidden data-photos="${fk}"></label>`:''}</div>`}</div>`;}
const DPR_TRADES=['Mason','Helper / coolie','Carpenter','Bar bender','Electrician','Plumber','Painter','Tiles / flooring','Other'];
const DPR_UNITS=['Bags','Cum','Cft','Kg','Ton','Nos','Rft','Sqft','Ltr','Load','Trip'];
const crewTot=c=>Object.values(c&&typeof c==='object'?c:{}).reduce((a,x)=>a+(+x||0),0);
const crewTxt=c=>Object.entries(c&&typeof c==='object'?c:{}).filter(([,x])=>+x>0).map(([t,x])=>`${t} ${num(+x)}`).join(' · ');
const dprMats=r=>(Array.isArray(r&&r.mats)?r.mats:[]).filter(m=>m&&m.item);
function mrRow(m){m=m||{};const u=[...new Set([...DPR_UNITS,...(m.unit?[m.unit]:[])])];
  return `<div class="mr-row"><input data-m="item" list="dprmat" placeholder="e.g. Cement OPC 53" value="${esc(m.item||'')}" aria-label="Material">
    <input data-m="qty" type="number" min="0" step="any" inputmode="decimal" placeholder="Qty" value="${esc(m.qty??'')}" aria-label="Quantity">
    <select data-m="unit" aria-label="Unit"><option value="">Unit</option>${u.map(x=>`<option ${x===m.unit?'selected':''}>${esc(x)}</option>`).join('')}</select>
    <select data-m="kind" aria-label="Received or used">${['Received','Used'].map(x=>`<option ${x===(m.kind||'Received')?'selected':''}>${x}</option>`).join('')}</select>
    <button type="button" class="btn sm ghost" data-mrdel aria-label="Remove row">${ico('x')}</button></div>`;}
const dprWork=r=>dprItems(r).map(x=>`${x.trade}: ${x.work.trim()}`).concat(r.work&&String(r.work).trim()?[String(r.work).trim()]:[]).join('\n');

/* ================= Generic module list ================= */
const teamRole=id=>{const t=(D.team||[]).find(x=>x.account===id);return t&&t.role||'';};
/* long lists show the newest 200 rows first, then more on request (totals and counts still use every row) */
const LM_STEP=200;
const lmLim=k=>(S.lmN&&S.lmN[k])||LM_STEP;
const lmMore=(k,n,span)=>n>lmLim(k)?`<tr class="lm-more"><td colspan="${span}" style="text-align:center"><button type="button" class="btn sm" data-lmmore="${esc(k)}">Show ${Math.min(LM_STEP,n-lmLim(k))} more <span class="code">(${n-lmLim(k)} not shown)</span></button></td></tr>`:'';
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lmmore]');if(!b)return;const k=b.dataset.lmmore;S.lmN=S.lmN||{};S.lmN[k]=lmLim(k)+LM_STEP;render();});
function vModule(k){
  const m=MOD[k];
  let rows=D[k].filter(r=>m.noProject&&S.proj!=='all'?(k!=='labour'||r.project===S.proj):inProj(r));if(k==='documents')rows=rows.filter(relOK);
  if(k==='cameras')rows=rows.filter(camAllowed);
  const q=S.q.toLowerCase();
  if(q)rows=rows.filter(r=>m.fields.some(f=>String(cell(f,r)).toLowerCase().replace(/<[^>]+>/g,'').includes(q))||k==='dpr'&&[dprWork(r),r.plan,r.hindrance,crewTxt(r.crew),...dprMats(r).map(x=>x.item)].join(' ').toLowerCase().includes(q));
  const stF=m.fields.find(f=>f.k==='status');
  if(S.fstat&&stF)rows=rows.filter(r=>r.status===S.fstat);
  if(k==='dpr'&&S.dprT)rows=rows.filter(r=>dprTypes(r).has(S.dprT));
  rows.sort((a,b)=>(b.date||b.due||'').localeCompare(a.date||a.due||'')||(b.at||0)-(a.at||0));
  /* person / team: filter + sort + group (lists with an "Assigned to" person) */
  const whoF=m.fields.find(f=>f.k==='who'&&f.t==='member');let gKey=null,gHead=null;
  const pplOpts=whoF?(()=>{const ids=[...new Set(D[k].filter(r=>m.noProject&&S.proj!=='all'?(k!=='labour'||r.project===S.proj):inProj(r)).map(r=>r.who).filter(Boolean))];return ids.map(id=>[id,pnm(id)]).sort((a,b)=>a[1].localeCompare(b[1]));})():[];
  const lsort=whoF&&['person','team','due','status'].includes(S.lsort)?S.lsort:'';
  if(whoF){const fw=pplOpts.some(o=>o[0]===S.fwho)||S.fwho==='_none'?S.fwho:'';if(fw)rows=rows.filter(r=>fw==='_none'?!r.who:r.who===fw);
    const done=r=>['Completed','Resolved','Closed','Won','Lost','Done','No-show','Cancelled'].includes(r.status)?1:0,due=r=>r.due||r.follow||r.date||'9999',t0=today();
    const byDue=(a,b)=>done(a)-done(b)||due(a).localeCompare(due(b));
    if(lsort==='due')rows.sort(byDue);
    else if(lsort==='status')rows.sort((a,b)=>(a.status||'').localeCompare(b.status||'')||byDue(a,b));
    else if(lsort==='person'||lsort==='team'){
      gKey=r=>!r.who?'~':lsort==='person'?pnm(r.who)+'\u0001'+r.who:(teamRole(r.who)||'Other');
      rows.sort((a,b)=>(gKey(a)==='~')-(gKey(b)==='~')||gKey(a).localeCompare(gKey(b))||pnm(a.who||'').localeCompare(pnm(b.who||''))||byDue(a,b));
      gHead=(key,xs)=>{const open=xs.filter(r=>!done(r)).length,late=xs.filter(r=>!done(r)&&due(r)<t0&&due(r)!=='9999').length,ppl=new Set(xs.map(r=>r.who).filter(Boolean)).size;
        const gn=key==='~'?'Not assigned':key.split('\u0001')[0],sub=lsort==='person'&&key!=='~'?teamRole(xs[0].who):lsort==='team'&&key!=='~'?ppl+(ppl===1?' person':' people'):'';
        return `${esc(gn)}${sub?` <span class="code">· ${esc(sub)}</span>`:''}<span class="lg-n">${open} open${late?` · <b style="color:var(--red-ink)">${late} late</b>`:''}${xs.length-open?` · ${xs.length-open} done`:''}</span>`;};}}
  const cols=m.fields.filter(f=>f.list&&!(f.t==='project'&&S.proj!=='all'));
  let foot='';
  const sumF=cols.filter(f=>['qty','amount','count'].includes(f.k));
  if(rows.length&&sumF.length&&(k!=='received'&&k!=='issue'&&k!=='returned'&&k!=='consumed'&&k!=='requests'&&k!=='po'&&k!=='equiplog'&&k!=='workupd'||new Set(rows.map(r=>r.material)).size===1))
    foot=`<tr>${cols.map((f,i)=>`<td class="${isNum(f)?'num':''}"><b>${i===0?'Total':sumF.includes(f)?(f.t==='money'?inr(rows.reduce((s,r)=>s+(+r[f.k]||0),0)):num(rows.reduce((s,r)=>s+(+r[f.k]||0),0))):''}</b></td>`).join('')}${(m.extra||[]).map(()=>'<td></td>').join('')}<td></td></tr>`;
  const intro=k==='team'?joinReqBox()+teamIntro():k==='wtpl'?wtplIntro():'';
  return header(esc(label(k)),(k==='dpr'&&CANW?`<button class="btn" data-quick="dprauto">${ico('sparkles')}Build today's report</button>`:'')+(k==='attendance'&&CANW?`<button class="btn" data-go="attbulk">${ico('calendar-plus')}Mark for whole gang</button>`:'')+(k==='tasks'&&CANW?`<button class="btn" data-import="1">${ico('file-up')}Import schedule</button>`:'')+(k==='team'&&canView('roleaccess')?`<button class="btn" data-go="roleaccess">${ico('shield')}Role access</button>`:'')+(k==='leads'?`<button class="btn" data-go="pipeline">${ico('kanban')}Pipeline board</button>`:'')+addBtn(k))+intro+
  `<div class="box"><div class="filters"><input id="q" placeholder="Search" value="${esc(S.q)}" aria-label="Search">
    ${k==='dpr'?`<select id="fdprt" aria-label="Work type" style="width:auto"><option value="">All work types</option>${[...DPR_WTYPES,'Labour','Material'].map(o=>`<option ${S.dprT===o?'selected':''}>${o}</option>`).join('')}</select>`:''}
    ${stF?`<select id="fstat" aria-label="Status"><option value="">All statuses</option>${stF.o.map(o=>`<option ${S.fstat===o?'selected':''}>${o}</option>`).join('')}</select>`:''}
    ${whoF?`<select id="fwho" aria-label="${esc(whoF.l)}"><option value="">Everyone</option>${pplOpts.map(([id,nm])=>`<option value="${esc(id)}" ${S.fwho===id?'selected':''}>${esc(nm)}</option>`).join('')}<option value="_none" ${S.fwho==='_none'?'selected':''}>Not assigned</option></select>
    <select id="lsort" aria-label="Sort by"><option value="">Sort: newest</option><option value="due" ${lsort==='due'?'selected':''}>Sort: due date</option><option value="person" ${lsort==='person'?'selected':''}>Group: by person</option><option value="team" ${lsort==='team'?'selected':''}>Group: by team / role</option>${stF?`<option value="status" ${lsort==='status'?'selected':''}>Sort: status</option>`:''}</select>`:''}
    <span class="code" style="margin-left:auto;align-self:center">${rows.length} ${rows.length===1?'entry':'entries'}</span></div>
  ${rows.length&&k==='dpr'?dprCards(rows,m):rows.length?`<div class="tbl-wrap mtbl"><table><thead><tr>${cols.map(f=>`<th class="${isNum(f)?'num':''}">${esc(f.l)}</th>`).join('')}${(m.extra||[]).map(x=>`<th class="num">${esc(x.l)}</th>`).join('')}<th></th></tr></thead>
  <tbody>${rows.slice(0,lmLim(k)).map((r,i)=>(gKey&&(i===0||gKey(rows[i-1])!==gKey(r))?`<tr class="lgrp"><td colspan="${cols.length+(m.extra||[]).length+1}">${gHead(gKey(r),rows.filter(x=>gKey(x)===gKey(r)))}</td></tr>`:'')+`<tr>${cols.map(f=>`<td class="${isNum(f)?'num':''}" data-label="${esc(f.l)}">${cell(f,r)}</td>`).join('')}${(m.extra||[]).map(x=>`<td class="num" data-label="${esc(x.l)}"><b>${x.f(r)}</b></td>`).join('')}
    <td class="acts">${rowActs(k,r,m)}</td></tr>`).join('')}${lmMore(k,rows.length,cols.length+(m.extra||[]).length+1)}${foot}</tbody></table></div>`
  :k==='dpr'&&(S.dprT||S.q)&&D.dpr.some(inProj)?`<div class="hero-empty">${ico('search')}<h2>No reports match</h2><p>Nothing found for ${esc(S.dprT||'')}${S.dprT&&S.q?' and ':''}${S.q?'“'+esc(S.q)+'”':''}.</p><button type="button" class="btn" data-dprclear>Show all reports</button></div>`
  :`<div class="hero-empty">${ico(m.icon)}<h2>No ${esc(m.label.toLowerCase())} yet</h2><p>${S.proj!=='all'&&!m.noProject?'Nothing recorded for this project.':'Add the first entry to start keeping records here.'}</p>${addBtn(k)}</div>`}</div>`;
}

/* daily reports as readable cards: every section in full, all photos (tap to open, swipe through) */
function dprCards(rows,m){
  const lim=S.dprN||15,show=rows.slice(0,lim),multi=S.proj==='all',T=S.dprT||'',TICO={Civil:'hammer',Electrical:'zap',Plumbing:'droplet',Painting:'paintbrush',Waterproofing:'droplet'};
  const txt=v=>`<div class="dpr-t">${esc(String(v).trim())}</div>`;
  const grid=ph=>ph.length?`<div class="dpr-ph">${ph.map((id,i)=>`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener" aria-label="Photo ${i+1} of ${ph.length}"><img src="/_blob/${esc(id)}" alt="" loading="lazy"></a>`).join('')}</div>`:'';
  const sec=(ic,l,v,ph)=>v&&String(v).trim()?`<div class="dpr-s"><div class="dpr-l">${ico(ic)}<span>${esc(l)}</span>${ph&&ph.length?`<span class="dpr-n">${ph.length} 📷</span>`:''}</div>${txt(v)}${ph?grid(ph):''}</div>`:'';
  const planSec=r=>{const pl=dprPlan(r);if(!pl.length)return '';const have=new Set(D.tasks.filter(t=>t.source==='Daily report '+r.id).map(t=>t.title)),done=pl.every(x=>have.has(`${x.trade}: ${x.work.trim().replace(/\s+/g,' ').slice(0,200)}`));
    return `<div class="dpr-s"><div class="dpr-l">${ico('calendar')}<span>Plan for tomorrow</span></div>${pl.map(x=>`<div class="dpr-pl"><span class="pill p-grey">${esc(x.trade)}</span> <span class="dpr-t">${esc(x.work.trim())}</span></div>`).join('')}
      ${CANW&&canEditView('tasks')&&nextDay(r.date)>=today()?done?`<div class="code" style="margin-top:6px">${ico('check')} Added to Tasks</div>`:`<button type="button" class="btn sm" style="margin-top:6px" data-dprtasks="${esc(r.id)}">${ico('list-checks')}<span>Make tasks for ${fd(nextDay(r.date))}</span></button>`:''}</div>`;};
  return `<div class="dpr-list">${show.map(r=>{const c=r.crew&&typeof r.crew==='object'?r.crew:{},tot=crewTot(c),ms=dprMats(r),ph=Array.isArray(r.photos)?r.photos:[];
    return `<article class="dpr-card">
      <header class="dpr-h"><div class="dpr-d"><b>${fd(r.date)}</b>${multi?`<span class="pill p-grey">${esc(pname(r.project))}</span>`:''}${r.by?`<span class="code">by ${esc(pnm(r.by))}</span>`:''}</div>
        <div class="dpr-a">${rowActs('dpr',r,m)}</div></header>
      <div class="dpr-b">
        ${Object.entries(dprItems(r).reduce((o,x)=>{const g=o[x.trade]=o[x.trade]||{w:[],p:[]};g.w.push(x.work.trim());g.p.push(...x.photos);return o;},Object.create(null))).filter(([t])=>!T||t===T).map(([t,g])=>sec(TICO[t]||'hammer',t,g.w.join('\n'),g.p)).join('')}${!T||T==='Other'?sec('notebook-pen',dprItems(r).length?'Other notes':'Work done',r.work):''}
        ${tot&&(!T||T==='Labour')?`<div class="dpr-s"><div class="dpr-l">${ico('hard-hat')}<span>Labour · ${num(tot)} on site</span></div><div class="crew-chips">${Object.entries(c).filter(([,x])=>+x>0).map(([t,x])=>`<span class="pill p-grey">${esc(t)} <b>${num(+x)}</b></span>`).join('')}</div></div>`:''}
        ${ms.length&&(!T||T==='Material')?`<div class="dpr-s"><div class="dpr-l">${ico('package')}<span>Material</span></div><div class="tbl-wrap"><table class="dpr-mt"><thead><tr><th>Material</th><th class="num">Qty</th><th>Unit</th><th></th></tr></thead><tbody>${ms.map(x=>`<tr><td>${esc(x.item)}</td><td class="num">${x.qty===''||x.qty==null||isNaN(+x.qty)?'—':num(+x.qty)}</td><td>${esc(x.unit||'')}</td><td><span class="pill ${x.kind==='Used'?'p-amber':'p-green'}">${esc(x.kind||'Received')}</span></td></tr>`).join('')}</tbody></table></div></div>`:''}
        ${T?'':planSec(r)+sec('alert-triangle','Hindrances',r.hindrance)}
        ${ph.length&&!T?`<div class="dpr-s"><div class="dpr-l">${ico('camera')}<span>${dprItems(r).some(x=>x.photos.length)?'Other site photos':`${ph.length} photo${ph.length>1?'s':''} — tap to open, swipe for the next`}</span></div>${grid(ph)}</div>`:''}
      </div></article>`;}).join('')}
    ${rows.length>lim?`<div style="text-align:center;padding:8px"><button type="button" class="btn" data-dprmore>${ico('chevron-down')}<span>Show ${Math.min(15,rows.length-lim)} more (${rows.length-lim} older)</span></button></div>`:''}</div>`;
}
function rowActs(k,r,m){return `${TR_COLS.includes(k)?`${A&&trCanWrite(k,r)?trCamBtn(k,r.id):''}<button class="btn sm ghost" data-tropen="${k}|${esc(r.id)}" aria-label="Details and history">${ico('message-square')}${(r.log||[]).length?' '+(r.log||[]).length:''}</button>${r.status==='For review'&&trCanReview(r)&&trCanWrite(k,r)?`<button class="btn sm pri" data-trok="${k}|${esc(r.id)}">${ico('check')}Approve</button><button class="btn sm warn" data-trback="${k}|${esc(r.id)}">${ico('corner-up-left')}Send back</button>`:''}`:''}${(m.actions||[]).includes('raise')&&msStatus(r)==='Due'&&!r.inv&&canView('invoices')&&CANW?`<button class="btn sm pri" data-raise="${r.id}">${ico('receipt')}Raise invoice</button>`:''}${(m.actions||[]).includes('call')&&r.phone?`<a class="btn sm ghost" href="https://wa.me/${esc(waNum(r.phone))}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp chat">${ico('phone')}</a>`:''}${k==='team'?teamAuthBtns(r):''}${k==='team'&&canView('roleaccess')&&r.role!=='Admin'?`<button class="btn sm" data-raperson="${r.id}">${ico('shield')}Access${personOv(r.id)?' ·':''}</button>`:''}${(m.actions||[]).includes('invite')&&r.phone?`<a class="btn sm" href="${esc(inviteLink(r))}" target="_blank" rel="noopener noreferrer">${ico('send')}Invite</a>`:''}${(m.actions||[]).includes('convert')&&CANW&&r.stage!=='Won'?`<button class="btn sm" data-convert="${r.id}">${ico('arrow-right-circle')}Make project</button>`:''}${(m.actions||[]).includes('convert')&&r.project&&proj(r.project)?`<button class="btn sm ghost" data-proj="${r.project}">${ico('building-2')}Open project</button>`:''}${(m.actions||[]).includes('download')?`<button class="btn sm ghost" data-doc="${k}:${r.id}" aria-label="Download">${ico('file-down')}</button>`:''}${k==='invoices'&&upiLink(r)?`<button class="btn sm ghost" data-upi="${esc(r.id)}" aria-label="Pay by UPI" title="Pay by UPI (QR)">${ico('qr-code')}</button>`:''}${(m.actions||[]).includes('whatsapp')?`<button type="button" class="btn sm ghost" data-shrec="${esc(k)}:${esc(r.id)}" aria-label="Share or save">${ico('share-2')}</button>`:''}${m.wa?(()=>{const u=m.wa(r);return u?`<a class="btn sm ghost" href="${esc(u)}" target="_blank" rel="noopener noreferrer" aria-label="Send on WhatsApp">${ico('message-circle')}</a>`:'';})():''}${CANW&&(!['team','cameras'].includes(k)||isAdmin())?`<button class="btn sm ghost" data-edit="${k}:${r.id}" aria-label="Edit">${ico('pencil')}</button>`:''}${canDel(r)&&(!['team','cameras'].includes(k)||isAdmin())?`<button class="btn sm ghost warn" data-del="${k}:${r.id}" aria-label="Delete">${S.confirm===r.id?'Tap again':ico('trash-2')}</button>`:''}`;}

function teamIntro(){
  const linked=new Set(D.team.map(t=>t.account).filter(Boolean));
  const unlinked=D.members.filter(m=>!linked.has(m.id));
  const roles={};D.team.forEach(t=>roles[t.role]=(roles[t.role]||0)+1);
  const invBtn=S.cloud&&CLOUD.org&&isAdmin()?`<button type="button" class="btn sm pri" data-orglink="${esc(CLOUD.org)}|${esc(orgName())}">${ico('share-2')}<span>Invite people</span></button>`:'';
  return `<div class="note">${ico('info')}<span><b>How to add people:</b> tap <b>Invite people</b> and send your company's invite link — they create an account with their own password and appear under <b>New account requests</b>, where you approve them and choose their role. Or add someone here yourself with their email and tap <b>Invite</b> on their row.</span>${invBtn}</div>
  ${D.team.length?`<div class="box tiles">${Object.entries(roles).map(([r,n])=>`<div class="tile"><b>${n}</b><span>${esc(r)}</span></div>`).join('')}</div>`:''}
  ${unlinked.length?`<div class="box"><div class="box-h">${ico('user-plus')}<h2>Opened the app, not in the team list yet</h2></div><div class="tbl-wrap"><table><tbody>${unlinked.map(m=>`<tr><td><b>${esc(nm(m.id))}</b><div class="code">Joined ${m.joined?new Date(m.joined).toLocaleDateString(LOC()):'—'}</div></td><td class="acts">${CANW&&isAdmin()?`<button class="btn sm pri" data-addteam="${m.id}">${ico('plus')}Add to team</button>`:''}</td></tr>`).join('')}</tbody></table></div></div>`:''}`;
}

/* ================= Inventory (computed) ================= */
function stock(){
  const map={};
  const key=r=>`${r.project}|${(r.material||'').trim().toLowerCase()}|${r.unit||''}`;
  const add=(r,field,sign)=>{if(!r.material)return;const k=key(r);map[k]=map[k]||{project:r.project,material:r.material.trim(),unit:r.unit||'',received:0,issued:0,returned:0,consumed:0,tin:0,tout:0};map[k][field]+=sign*(+r.qty||0);};
  D.received.forEach(r=>add(r,'received',1));
  D.issue.forEach(r=>add(r,'issued',1));
  D.returned.forEach(r=>add(r,'returned',1));
  D.consumed.forEach(r=>add(r,'consumed',1));
  D.requests.filter(r=>r.kind==='Transfer between sites'&&r.status==='Delivered').forEach(r=>{add(r,'tin',1);if(r.from)add({...r,project:r.from},'tout',1);});
  return Object.values(map).map(s=>({...s,store:s.received+s.tin-s.tout-s.issued+s.returned}));
}
function vInventory(){
  const rows=stock().filter(inProj).sort((a,b)=>a.material.localeCompare(b.material));
  return header(label('inventory'),CANW?`<button class="btn" data-add="received">${ico('package-plus')}Receive</button><button class="btn pri" data-add="issue">${ico('package-minus')}Issue</button>`:'')+
  `<div class="note">${ico('info')}<span>Stock in store = received + transferred in + returned − issued − transferred out. Consumption is tracked against what was issued.</span></div>
  <div class="box">${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Material</th>${S.proj==='all'?'<th>Project</th>':''}<th>Unit</th><th class="num">Received</th><th class="num">Issued</th><th class="num">Returned</th><th class="num">Consumed</th><th class="num">In store</th></tr></thead>
  <tbody>${rows.map(s=>`<tr><td><b>${esc(s.material)}</b></td>${S.proj==='all'?`<td>${esc(pname(s.project))}</td>`:''}<td>${esc(s.unit||'—')}</td><td class="num">${num(s.received+s.tin)}</td><td class="num">${num(s.issued+s.tout)}</td><td class="num">${num(s.returned)}</td><td class="num">${num(s.consumed)}</td>
    <td class="num"><span class="pill ${s.store<0?'p-red':s.store===0?'p-grey':'p-green'}">${num(s.store)}</span></td></tr>`).join('')}</tbody></table></div>`
  :`<div class="hero-empty">${ico('warehouse')}<h2>No stock yet</h2><p>Record material received at site and the stock appears here automatically.</p>${CANW?`<button class="btn pri" data-add="received">${ico('package-plus')}Record material received</button>`:''}</div>`}</div>`;
}

/* ================= Projects ================= */
/* ================= Dashboard ================= */
/* dashboard tile: tap to open; zero tiles are hidden on phones */
const dTile=(v,lbl,go,shown)=>{const can=go&&canView(go);return `<${can?'button type="button"':'div'} class="tile ${+v?'':'z'}" ${can?`data-go="${go}"`:''}><b>${shown!==undefined?shown:v}</b><span>${lbl}</span></${can?'button':'div'}>`;};
function vDashboard(){
  if(!PJ().length)return header(label('dashboard'))+`<div class="box hero-empty">${ico('hard-hat')}<h2>Welcome to BuildMitr</h2><p>Create a project first. Then your team can log daily reports, tasks, issues, material and labour from site — on phone or computer.</p><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${CANW?`<button class="btn pri" data-add="projects">${ico('plus')}Create first project</button>`:''}<button class="btn" data-demo="on">${ico('flask-conical')}See a demo with sample data</button></div></div>`;
  const t=today(),f=a=>a.filter(inProj);
  const tasks=f(D.tasks),issues=f(D.issues),pay=f(D.payments);
  const openT=tasks.filter(x=>x.status!=='Completed'),late=openT.filter(x=>x.due&&x.due<t);
  const openI=issues.filter(x=>x.status!=='Resolved');
  const present=f(D.attendance).filter(a=>a.date===t&&a.status!=='Absent').length+f(D.vlabour).filter(v=>v.date===t).reduce((s,v)=>s+(+v.count||0),0);
  const inA=pay.filter(p=>p.dir==='Received from client').reduce((s,p)=>s+(+p.amount||0),0),outA=pay.filter(p=>p.dir!=='Received from client').reduce((s,p)=>s+(+p.amount||0),0);
  const pend=f(D.requests).filter(r=>r.status==='Pending');
  const dprs=f(D.dpr).sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,5);
  const sp=S.proj!=='all'?proj(S.proj):null,sl=sp&&(sp.loc||(sp.maps&&parseLoc(sp.maps)));
  const pc=sp?D.cameras.filter(c=>c.project===sp.id&&camAllowed(c)):[];
  const siteBox=sp?`<div class="box"><div class="siteloc">${pc.length?`<button class="btn sm" data-go="cctv">${ico('cctv')}${pc.length} camera${pc.length>1?'s':''} · ${pc.filter(c=>c.status==='Online').length} online</button>`:''}${canView('invoices')&&CANW?`<button class="btn sm" data-dmnew="Quotation">${ico('file-text')}Quotation</button><button class="btn sm" data-dmnew="Tax invoice">${ico('receipt')}Invoice</button>`:''}${ico('map-pin')}<div style="flex:1;min-width:180px"><b>${esc(sp.name)}</b><div class="code">${esc(sp.address||'No address yet')}</div></div>${sl?mapButtons(sl,true):`${CANW?`<button class="btn sm" data-edit="projects:${sp.id}">${ico('map-pin')}Add map pin</button>`:''}`}</div></div>`:'';
  const al=computeAlerts().filter(a=>S.proj==='all'||!a.pid||a.pid===S.proj);
  const alBox=al.length?`<div class="box"><div class="box-h">${ico('bell')}<h2>Needs attention</h2><span class="pill p-red">${al.filter(a=>a.sev==='high').length} urgent</span><button class="btn sm" data-go="alerts">See all ${al.length}</button></div>${al.slice(0,4).map(a=>`<div class="siteloc" style="border-bottom:1px solid var(--line);padding:9px 16px"><span class="pill ${a.sev==='high'?'p-red':a.sev==='med'?'p-amber':'p-grey'}">${a.sev==='high'?'Urgent':a.sev==='med'?'Soon':'Info'}</span><span style="flex:1;min-width:180px">${esc(a.txt)}</span><button class="btn sm" data-alertgo="${a.view}|${a.pid||''}">Open</button></div>`).join('')}</div>`:'';
  return header(label('dashboard'),isAdmin()?`<button type="button" class="btn pri" data-shareupd>${ico('message-circle')}<span>Today's update</span></button>`:'')+ntBox()+siteBox+sugBox()+ownerBox()+actWeekBox()+mktBox()+`
  ${S.stale?`<div class="note">${ico('wifi-off')}<span>Can't reach the server right now — figures may be out of date.</span></div>`:''}
  <div class="box tiles dash-tiles">
    ${dTile(openT.length,`Open tasks${late.length?` · <span style="color:var(--red-ink)">${late.length} late</span>`:''}`,'tasks')}
    ${dTile(openI.length,'Open issues','issues')}
    ${dTile(present,'Workers on site today','attendance')}
    ${dTile(pend.length,'Material requests pending','requests')}
    ${canMoney()?`${dTile(inA,'Received from clients','payments',inr(inA))}
    ${dTile(outA,'Paid out','payments',inr(outA))}
    ${(v=>dTile(v,'Due on invoices','invoices',inr(v)))(f(D.invoices).filter(i=>(i.kind==='Tax invoice'||i.kind==='RA bill')&&i.status!=='Paid').reduce((s,i)=>s+invTotal(i)-(+i.got||0),0))}`:''}
    ${canView('leads')?dTile(D.leads.filter(l=>l.follow&&l.follow<=t&&!['Won','Lost'].includes(l.stage)).length,'Lead follow-ups due','followups'):''}
    ${(v=>dTile(v,'Equipment hours today','equiplog',num(v)))(f(D.equiplog).filter(x=>x.date===t).reduce((s,x)=>s+(+x.hours||0),0))}
  </div>
  ${qtBox()}${trReviewBox()}${wfBox()}
  ${canView('calendar')?`<div class="m-hide">${calBox('dash')}</div>${mCalLink()}`:''}
  <div class="grid2">
    <div class="box"><div class="box-h">${ico('notebook-pen')}<h2>Latest daily reports</h2>${CANW?`<button class="btn sm pri" data-quick="dprauto">${ico('sparkles')}Build today's report</button>`:''}</div>
      ${dprs.length?dprs.map(r=>`<div style="padding:12px 16px;border-bottom:1px solid var(--line)"><div class="code">${fd(r.date)} · ${esc(pname(r.project))} · ${esc(nm(r.by))}</div><div style="overflow-wrap:anywhere;white-space:pre-line">${esc(dprWork(r).slice(0,300))}</div>${(r.photos||[]).length?`<div class="thumbs" style="display:flex;gap:4px;margin-top:6px">${r.photos.map((id,i)=>i>3?`<a hidden data-img href="/_blob/${esc(id)}"></a>`:`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="" loading="lazy" style="width:48px;height:48px;border-radius:6px;object-fit:cover"></a>`).join('')}${r.photos.length>4?`<span class="code" style="align-self:center">+${r.photos.length-4}</span>`:''}</div>`:''}</div>`).join(''):`<div class="empty">No daily reports yet.</div>`}</div>
    <div class="box"><div class="box-h">${ico('alert-triangle')}<h2>Open issues</h2></div>
      ${openI.length?`<div class="tbl-wrap"><table><tbody>${openI.slice(0,8).map(i=>`<tr><td><b>${esc(i.title)}</b><div class="code">${esc(pname(i.project))}</div></td><td>${cell(MOD.issues.fields[2],i)}</td><td>${fd(i.due)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">No open issues.</div>`}</div>
    <div class="box m-hide"><div class="box-h">${ico('list-checks')}<h2>Tasks due soon</h2></div>
      ${openT.length?`<div class="tbl-wrap"><table><tbody>${openT.sort((a,b)=>(a.due||'9').localeCompare(b.due||'9')).slice(0,8).map(x=>`<tr><td><b>${esc(x.title)}</b><div class="code">${esc(pnm(x.who))}</div></td><td>${cell(MOD.tasks.fields[5],x)}</td><td style="${x.due&&x.due<t?'color:var(--red-ink)':''}">${fd(x.due)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">No open tasks.</div>`}</div>
    <div class="box"><div class="box-h">${ico('arrow-left-right')}<h2>Pending material requests</h2></div>
      ${pend.length?`<div class="tbl-wrap"><table><tbody>${pend.slice(0,8).map(r=>`<tr><td><b>${esc(r.material)}</b><div class="code">${esc(pname(r.project))}</div></td><td class="num">${num(r.qty)} ${esc(r.unit||'')}</td><td>${fd(r.needBy)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">No pending requests.</div>`}</div>
  </div>`;
}

/* ================= Reports & export ================= */
/* → reports: vReports */

/* ================= Settings ================= */
function vSettings(){
  const org=D.org.find(o=>o.id==='main')||{};
  const admin=ME.isOwner||ME.canEdit;
  return header(label('settings'),`<button class="btn" data-go="install">${ico('download')}<span>Install app (Android, iPhone, PC, Mac)</span></button><a class="btn" href="security.html" target="_blank" rel="noopener">${ico('lock')}<span>Security</span></a>`)+`
  ${myProfileBox(admin)}
  ${actBoss()?ctBox()+trSetBox():''}
  ${bmUpdBox()}
  <div class="box"><div class="box-h">${ico('bell')}<h2>Notifications</h2></div>${ntSettings()}<div class="srow"><span class="code">Shows a Windows / phone notification when someone messages you, gives you a task or drawing, changes it, or schedules work for you — while BuildMitr is open or running in the background (the Windows app keeps running in the tray).</span></div></div>
  ${isAdmin()&&S.cloud&&!S.demo?waBox():''}
  ${feedBox()}
  ${admin?`<div class="box"><div class="box-h"><h2>Company</h2></div><form id="orgForm" style="padding:16px;display:grid;gap:12px;max-width:520px">
    <label class="code">Company name<input id="o-name" value="${esc(org.name||'')}" ${admin?'':'disabled'} placeholder="e.g. BuildMitr"></label>
    <label class="code">GSTIN<input id="o-gst" value="${esc(org.gstin||'')}" ${admin?'':'disabled'}></label>
    <label class="code">Address<textarea id="o-addr" rows="2" ${admin?'':'disabled'}>${esc(org.address||'')}</textarea></label>
    <label class="code">State (for GST)<select id="o-state" ${admin?'':'disabled'}><option value="">—</option>${INDIAN_STATES.map(x=>`<option ${org.state===x?'selected':''}>${x}</option>`).join('')}</select></label>
    <div class="two"><label class="code">Invoice number prefix<input id="o-pre" value="${esc(org.invPrefix||'INV')}" ${admin?'':'disabled'}></label><label class="code">Default HSN / SAC<input id="o-sac" value="${esc(org.sac||'995411')}" ${admin?'':'disabled'}></label></div>
    <label class="code">Bank name & branch<input id="o-bank" value="${esc(org.bank||'')}" ${admin?'':'disabled'}></label>
    <div class="two"><label class="code">Account number<input id="o-acc" value="${esc(org.acc||'')}" ${admin?'':'disabled'} inputmode="numeric"></label><label class="code">IFSC<input id="o-ifsc" value="${esc(org.ifsc||'')}" ${admin?'':'disabled'}></label></div>
    <label class="code">UPI ID (shown on invoices)<input id="o-upi" value="${esc(org.upi||'')}" ${admin?'':'disabled'} placeholder="name@bank"></label>
    <div class="code" style="margin-top:6px"><b>MARKETING</b> — used in WhatsApp messages, estimates and portfolio pages</div>
    <div class="two"><label class="code">Sales phone<input id="o-phone" value="${esc(org.phone||'')}" ${admin?'':'disabled'} inputmode="tel"></label><label class="code">Website<input id="o-web" value="${esc(org.website||'')}" ${admin?'':'disabled'} placeholder="https://buildmitr.github.io/buildmitr_1/"></label></div>
    <label class="code">Brochure link (Drive / website PDF)<input id="o-broch" value="${esc(org.brochure||'')}" ${admin?'':'disabled'} placeholder="https://…"></label>
    <label class="code">Google review link<input id="o-review" value="${esc(org.reviewLink||'')}" ${admin?'':'disabled'} placeholder="https://g.page/r/…/review"></label>
    ${admin?`<div><button class="btn pri">${ico('check')}Save</button></div>`:'<p class="code">Only the admin or editors can change company details.</p>'}</form></div>`:''}
  ${admin?orgLinkBox():''}
  ${admin?letterheadBox():''}
  ${admin?camSettingsBox():''}
  ${S.cloud?`<div class="box"><div class="box-h">${ico('user')}<h2>Your login</h2></div><div class="srow"><span style="flex:1">Signed in as <b data-notr>${esc(ME.email||'')}</b> · <span data-notr>${esc(((CLOUD.mem||{}).organizations||{}).name||'')}</span></span><button class="btn" id="pwSet">${ico('lock')}<span>${LG.hasPw?'Change password':'Set a password'}</span></button><button class="btn" id="signOut">${ico('log-in')}<span>Sign out</span></button></div><div class="code" style="padding:0 16px 12px">${LG.hasPw?'You can sign in with your password or with a login code sent to your email. Changing the password needs your current password.':'Set a password so you can sign in with email + password next time (a login code to your email also works).'}</div></div>`:''}
  <div class="box"><div class="box-h">${ico('eye')}<h2>Colour theme</h2></div><div style="padding:14px 16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
    ${[['light','Light'],['dark','Dark'],['auto','Automatic (same as phone)']].map(([k,l])=>`<button class="btn ${THEME===k?'pri':''}" data-settheme="${k}">${l}</button>`).join('')}</div></div>
  <div class="box"><div class="box-h">${ico('languages')}<h2>Language</h2></div><div style="padding:14px 16px;display:grid;gap:12px">
    <div style="display:flex;gap:8px;flex-wrap:wrap">${LANGS.map(([k,l])=>`<button class="btn ${LANG===k?'pri':''}" data-setlang="${k}">${l}</button>`).join('')}</div>
    <label class="code"><span>Keep these words in English (comma separated)</span><textarea id="keepWords" rows="2" placeholder="Slab, Column, Beam">${esc(I18N_USERKEEP.split(',').filter(Boolean).join(', '))}</textarea></label>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn" id="keepSave">${ico('check')}<span>Save</span></button><span class="code">Site words like BOQ, GST, DPR, RCC, PCC, sq.ft, WhatsApp always stay in English. Names, addresses and chat messages are never changed.</span></div></div></div>
  ${admin?`<div class="box"><div class="box-h"><h2>Team</h2></div><div style="padding:14px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="code" style="flex:1">Team members, roles and access are now on their own page.</span><button class="btn pri" data-go="team">${ico('users')}Open Team</button></div></div>`:''}
  ${admin?`<div class="box"><div class="box-h">${ico('eye')}<h2>Preview the app as another role</h2></div><div style="padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center"><span class="code" style="flex:1;min-width:220px">See exactly which screens a client, site engineer, accountant or others get.</span><select id="viewAsSel" style="width:auto"><option value="">Choose a role…</option>${PREVIEW_ROLES.map(r=>`<option>${r}</option>`).join('')}</select></div></div>
  ${canView('audit')?`<div class="box"><div class="box-h">${ico('history')}<h2>Change history</h2></div><div style="padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center"><span class="code" style="flex:1;min-width:220px">Who added, edited, deleted or approved what, and when.</span><button class="btn" data-go="audit">${ico('history')}Open change history</button></div></div>`:''}
  ${admin?`<div class="box"><div class="box-h">${ico('database')}<h2>Backup & restore</h2></div><div style="padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center"><span class="code" style="flex:1;min-width:220px">Download everything — all projects, entries and forms — as one Excel workbook or a backup file. Restore adds back anything missing; it never overwrites existing records.</span>
    <button class="btn" id="bkXlsx">${ico('download')}Excel backup</button><button class="btn" id="bkJson">${ico('download')}Backup file</button><label class="btn">${ico('upload')}Restore<input type="file" id="bkRestore" data-nodrop accept=".json" hidden></label></div></div>`:''}`:''}`;
}

/* ================= Form drawer ================= */
const DRAFT={photos:{}};
function fieldInput(f,v){
  const id='f-'+f.k,req=f.req?'required':'';
  const sel=(opts,val)=>`<select id="${id}" ${req}><option value="">—</option>${opts.map(([k,l])=>`<option value="${esc(k)}" ${String(val)===String(k)?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  switch(f.t){
    case 'textarea':return `<textarea id="${id}" rows="3" ${f.ph?`placeholder="${esc(f.ph)}"`:''} ${req}>${esc(v||'')}</textarea>`;
    case 'workrows':{const rows=(Array.isArray(v)?v:[]).filter(x=>x&&x.work),pl=!!f.plan;
      return `<div id="${id}" class="wrows" data-wrows ${pl?'data-plan':''}>${(rows.length?rows:pl?[{trade:'Civil'}]:[{trade:'Civil'},{trade:'Electrical'},{trade:'Plumbing'}]).map(x=>wrRow(x,pl)).join('')}
        <button type="button" class="btn sm" data-wradd>${ico('plus')}<span>${pl?'Add planned work':'Add work'}</span></button></div>`;}
    case 'crew':{const c=v&&typeof v==='object'?v:{},extra=Object.keys(c).filter(t=>!DPR_TRADES.includes(t));
      return `<div id="${id}" class="crew" data-crew>${[...DPR_TRADES,...extra].map((t,i)=>`<span class="crew-i"><span>${esc(t)}</span><input type="number" min="0" step="any" inputmode="decimal" data-trade="${esc(t)}" value="${+c[t]>0?esc(+c[t]):''}" aria-label="${esc(t)}" placeholder="0"></span>`).join('')}
        <div class="crew-tot code">Total on site: <b data-crewtot>${num(crewTot(c))}</b></div></div>`;}
    case 'matrows':{const rows=(Array.isArray(v)?v:[]).filter(x=>x&&x.item);
      return `<div id="${id}" class="mrows" data-mrows><datalist id="dprmat">${[...new Set([...MAT_KEYS].flatMap(k=>(D[k]||[]).map(r=>(r.material||'').trim())).filter(Boolean))].sort().map(m=>`<option value="${esc(m)}">`).join('')}</datalist>
        <div class="mr-head code"><span>Material</span><span>Qty</span><span>Unit</span><span>Received / used</span><span></span></div>
        ${(rows.length?rows:[{},{}]).map(mrRow).join('')}
        <button type="button" class="btn sm" data-mradd>${ico('plus')}<span>Add material</span></button></div>`;}
    case 'number':case 'money':return `<input id="${id}" type="number" step="any" ${f.neg?'':'min="0"'} ${f.max?`max="${f.max}"`:''} inputmode="decimal" value="${esc(v??'')}" ${req}>`;
    case 'date':return `<input id="${id}" type="date" value="${esc(v||(f.def==='today'?today():''))}" ${req}>`;
    case 'select':return sel(f.o.map(o=>[o,o]),v??(f.o[0]&&f.k==='status'?f.o[0]:''));
    case 'project':return sel(PJ().map(p=>[p.id,pname(p.id)]),v??(S.proj!=='all'&&f.k==='project'?S.proj:''));
    case 'member':return sel(D.members.map(m=>[m.id,nm(m.id)]),v);
    case 'vendor':return sel(D.vendors.map(x=>[x.id,x.name]),v);
    case 'lead':return sel(D.leads.map(x=>[x.id,`${x.name}${x.phone?' · '+x.phone:''}`]),v);
    case 'campaign':return sel(D.campaigns.map(x=>[x.id,`${x.name}${x.channel?' · '+x.channel:''}`]),v);
    case 'labour':return sel(D.labour.map(x=>[x.id,`${x.name}${x.trade?' · '+x.trade:''}`]),v);
    case 'client':return sel(D.clients.map(x=>[x.id,x.name]),v);
    case 'tplmulti':return `<div id="${id}" class="checks">${CHECKLISTS.map(t=>`<label><input type="checkbox" value="${t.id}" ${(v||[]).includes(t.id)?'checked':''}>${esc(t.title.replace(/^Checklist for /,''))}</label>`).join('')}</div>`;
    case 'task':{const ts=D.tasks.filter(t=>projOK(t.project)&&(S.proj==='all'||t.project===S.proj)).sort((a,b)=>(a.start||'').localeCompare(b.start||''));return sel(ts.map(t=>[t.id,`${S.proj==='all'?(proj(t.project)||{}).prefix+' · ':''}${t.wbs?t.wbs+' ':''}${t.title}`]),v);}
    case 'location':{const L=DRAFT.loc;
      return `<div class="locbox">
        ${S.web?`<div class="loc-tools"><input id="locSearch" placeholder="Search place, area or landmark" aria-label="Search place"><button type="button" class="btn sm" id="locFind">${ico('search')}Find</button><button type="button" class="btn sm" id="locMe">${ico('locate-fixed')}My location</button></div>
        <div id="mapPick" class="mappick"><div class="code" style="padding:12px">Loading map…</div></div>
        <div class="code">Tap the map or drag the pin to the exact plot. The address below fills in automatically.</div>`
        :`<div class="code">Open <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps</a> or <a href="https://maps.apple.com/" target="_blank" rel="noopener noreferrer">Apple Maps</a>, drop a pin on the plot, copy the link or the coordinates, and paste it here.</div>`}
        <div class="loc-tools"><input id="locPaste" placeholder="Paste Google/Apple Maps link or 17.4483, 78.3915" aria-label="Paste map link or coordinates"><button type="button" class="btn sm" id="locUse">${ico('map-pin')}Use</button></div>
        <div id="locShow" class="locshow">${locShow(L)}</div></div>`;}
    case 'projects':return D.projects.length?`<div id="${id}" class="checks">${D.projects.map(p=>`<label><input type="checkbox" value="${p.id}" ${(v||[]).includes(p.id)?'checked':''}>${esc(pname(p.id))}</label>`).join('')}<label><input type="checkbox" value="all" ${(v||[]).includes('all')?'checked':''}><b>All projects (now and future)</b></label></div>`:'<span class="code">Create a project first.</span>';
    case 'equipment':return sel(D.equipment.map(x=>[x.id,`${x.name}${x.own?' · '+x.own:''}`]),v);
    case 'url':return `<input id="${id}" type="url" placeholder="https://…" value="${esc(v||'')}" ${req}>`;
    case 'files':return `<div id="fl-list" data-fllist="${f.k}" style="display:grid;gap:4px">${flChips(f.k)}</div>
      ${A?`<label class="btn sm" style="width:max-content">${ico('upload')}Add files<input type="file" accept=".pdf,image/*,.dwg,.dxf,.dwf,.skp,.xlsx,.xls,.docx,.doc,.zip,.rvt,.ifc" multiple hidden data-files="${f.k}"></label>`:'<span class="code">File upload needs Contributor access.</span>'}`;
    case 'material':{const mats=[...new Set([...MAT_KEYS].flatMap(k=>D[k].map(r=>(r.material||'').trim())).filter(Boolean))].sort();
      return `<input id="${id}" list="matlist" value="${esc(v||'')}" placeholder="e.g. Cement OPC 53" ${req}><datalist id="matlist">${mats.map(m=>`<option value="${esc(m)}">`).join('')}</datalist>`;}
    case 'photos':return `<div id="ph-list" data-phlist="${f.k}" style="display:flex;gap:6px;flex-wrap:wrap">${phChips(f.k)}</div>
      ${A?`<label class="btn sm" style="width:max-content">${ico('camera')}Add photos<input type="file" accept="image/*" multiple hidden data-photos="${f.k}"></label>`:'<span class="code">Photo upload needs Contributor access.</span>'}`;
    default:return `<input id="${id}" value="${esc(v||'')}" ${req}>`;
  }
}
function openForm(k,id,preset){
  const isP=k==='projects';
  const m=isP?{label:'Project',fields:[
    {k:'prefix',l:'Project code / prefix',t:'text'},{k:'name',l:'Project name',t:'text',req:1},{k:'ptype',l:'Type of project',t:'select',o:['Residential house','Villa','Apartment','Commercial / office','Industrial / factory','Warehouse','Restaurant / café','Hotel','Hospital / clinic','School / college','Retail / showroom']},{k:'description',l:'Description',t:'textarea'},
    {k:'start',l:'Start date',t:'date'},{k:'end',l:'End date',t:'date'},{k:'client',l:'Client',t:'client'},{k:'value',l:'Contract value (₹, before GST)',t:'money'},{k:'area',l:'Built-up area (sq.ft)',t:'number'},{k:'nfloors',l:'Number of floors above ground (incl. ground floor)',t:'number',max:40},{k:'base',l:'Below / stilt',t:'select',o:['None','Cellar','Stilt floor','Cellar + Stilt floor']},{k:'loc',l:'Site location (pin on map)',t:'location'},{k:'address',l:'Site address (fills in from the pin, you can edit)',t:'textarea'},...(id||!isAdmin()?[]:[{k:'tpl',l:'Start from a template (adds schedule with checklists, payment stages and budget)',t:'select',o:['None',...Object.keys(PTPL)]}])]}:MOD[k];
  const r=id?D[k].find(x=>x.id===id):null;
  DRAFT.k=k;DRAFT.id=id||null;DRAFT.fields=m.fields;DRAFT.photos={};DRAFT.files={};DRAFT.fresh=new Set();DRAFT.removed=[];
  if(k==='invoices'&&!r){preset={...(preset||{})};preset.no=preset.no||nextInvNo(preset.kind||'Tax invoice');preset.sac=preset.sac||orgVal('sac')||'995411';}
  const pv=r||preset||null;m.fields.filter(f=>f.t==='photos').forEach(f=>DRAFT.photos[f.k]=[...(pv&&pv[f.k])||[]]);
  m.fields.filter(f=>f.t==='files').forEach(f=>DRAFT.files[f.k]=[...(r&&r[f.k])||[]]);
  DRAFT.loc=(r&&r.loc)||(r&&r.maps&&parseLoc(r.maps))||null;
  if(!isP&&!D.projects.length&&m.fields.some(f=>f.t==='project'&&f.req)){toast('Create a project first.');S.view='projects';render();return;}
  DRAFT.carry=null;
  if(k==='dpr'&&!r){const pid=(preset&&preset.project)||(S.proj!=='all'?S.proj:(PJ().length===1?PJ()[0].id:''));const pp=pid?prevPlan(pid,(preset&&preset.date)||today()):null;
    if(pp&&(!dprItems(preset||{}).length||preset._carry)){preset={...(preset||{}),project:pid,items:[...dprPlan(pp).map(x=>({trade:x.trade,work:x.work})),...dprItems(preset||{})]};DRAFT.carry=pp.date;}}
  DRAFT.carryRows=DRAFT.carry?JSON.stringify(dprPlan(prevPlan((preset||{}).project,(preset&&preset.date)||today())||{}).map(x=>[x.trade,x.work.trim()])):'';
  const vals=r||preset||null;DRAFT.lead=preset&&preset._lead||null;DRAFT.ms=preset&&preset._ms||null;
  const body=m.fields.map(f=>`${f.sec?`<div class="f-sec">${esc(trW(f.sec))}</div>`:''}${f.t==='crew'||f.t==='matrows'||f.t==='workrows'?`<div class="f-grp"><span class="f-gl">${esc(trW(f.l))}</span>${fieldInput(f,vals?(f.t==='workrows'?(f.plan?dprPlan(vals):dprItems(vals)):vals[f.k]):undefined)}${k==='dpr'&&f.k==='items'?`<div id="dprCarry">${DRAFT.carry?`<div class="carry code">${ico('calendar')} Filled from the plan of ${fd(DRAFT.carry)} — change it to what was actually done today.</div>`:''}</div>`:''}</div>`:`<label class="${f.req?'req':''}" for="f-${f.k}">${esc(trW(f.l))}${fieldInput(f,vals?vals[f.k]:undefined)}</label>`}`).join('');
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="entryForm">
    <div class="pane-h"><h2>${r?'Edit':isP?'Create':'Add'} ${esc((isP?'project':m.label.replace(/s$/,'')).toLowerCase())}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b">${body}</div>
    <div class="pane-f">${r&&!isP&&canDelFiles()?`<button type="button" class="btn ghost warn" data-fdelrec="${esc(k)}:${esc(id)}" style="margin-right:auto">${ico('trash-2')}<span>Delete</span></button>`:''}<button type="button" class="btn" data-close>Cancel</button><button class="btn pri">${r?'Save changes':isP?'Create project':'Save'}</button></div></form></div>`;
  draw();
  const first=document.querySelector('.pane-b input:not([type=date]):not(#locSearch):not(#locPaste),.pane-b textarea');if(first)first.focus();
  if(m.fields.some(f=>f.t==='location')&&S.web)initMap();
}
function closeLayer(){if(MAP){MAP.remove();MAP=null;PIN=null;}document.getElementById('layer').innerHTML='';if(S.dirtyL){S.dirtyL=false;setTimeout(()=>{if(!document.querySelector('.drawer'))render();},0);}}
async function addPhotos(files,fk){
  if(S.demo){toast('Exit the demo to upload photos.');return;}
  if(!A){toast('Photo upload needs Contributor access.');return;}
  const jobs=[];
  for(const file of [...files]){
    const ext=(file.name.split('.').pop()||'').toLowerCase();
    const type={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif'}[ext]||(/^image\/(jpeg|png|webp|gif)$/.test(file.type)?file.type:'');
    if(!type){toast(`${file.name}: use JPG or PNG photos.`);continue;}
    if(file.size>20*1048576){toast(`${file.name} is over 20 MB.`);continue;}
    jobs.push({file,type,done:false,id:null});
  }
  if(!jobs.length)return;
  /* up to 3 photos go up at the same time (each one takes a few seconds on the server); they are added in the order they were picked */
  toast(jobs.length>1?`Uploading ${jobs.length} photos…`:'Uploading photo…');
  let next=0,shown=0,added=0;
  const place=()=>{while(shown<jobs.length&&jobs[shown].done){const j=jobs[shown++];if(!j.id)continue;
      let key=fk;if(/^wr:/.test(fk)&&!document.querySelector(`[data-phlist="${CSS.escape(fk)}"]`)){key='photos';toast('That work line was removed — the photo went to “Other site photos”.');}
      if(!DRAFT.photos[key]){toast('The form was closed before the photo finished uploading.');continue;}DRAFT.photos[key].push(j.id);DRAFT.fresh&&DRAFT.fresh.add(j.id);added++;flDraw();}};
  const run=async()=>{while(next<jobs.length){const j=jobs[next++];
      try{const r=await A.upload(j.file,{type:j.type});j.id=r.id;}
      catch(e){toast({too_large:'Photo is too large.',quota_or_state:'Storage is full.',rate_limited:'Too many uploads. Wait a moment.'}[e&&e.code]||'Photo upload failed.');}
      j.done=true;place();}};
  await Promise.all([run(),run(),run()].slice(0,Math.min(3,jobs.length)));
  if(added)toast(added>1?`${added} photos added`:'Photo added');
}

async function addFiles(files,fk){
  if(S.demo){toast('Exit the demo to upload files.');return;}
  if(!A){toast('File upload needs Contributor access.');return;}
  for(const file of [...files]){
    const ext=(file.name.split('.').pop()||'').toLowerCase();
    const type=fileType(file.name);
    if(!type){toast(`${ext.toUpperCase()} files can't be uploaded here. Use the link box instead.`);continue;}
    if(file.size>10*1048576){toast(`${file.name} is over 10 MB. Save it as PDF, zip it, or use the link box.`);continue;}
    toast(`Uploading ${file.name}…`);
    try{const r=await A.upload(file,{type});DRAFT.files[fk].push({id:r.id,name:file.name,type});DRAFT.fresh&&DRAFT.fresh.add(r.id);flDraw();
      
      toast(`${file.name} added`);}
    catch(e){toast({too_large:'File is too large.',quota_or_state:'Storage is full.',rate_limited:'Too many uploads. Wait a moment.'}[e&&e.code]||'Upload failed.');}
  }
}

/* ================= WhatsApp sharing ================= */
/* → extras: waLink */
function waText(k,r){
  let t='';
  if(k==='dpr'){const sec=(l,v)=>v&&String(v).trim()?`\n\n*${l}:*\n${String(v).trim()}`:'';const ms=dprMats(r),tot=crewTot(r.crew);
    t=`*Daily report – ${pname(r.project)}*\nDate: ${fd(r.date)}${Object.entries(dprItems(r).reduce((o,x)=>{(o[x.trade]=o[x.trade]||[]).push(x.work.trim());return o;},Object.create(null))).map(([t,ws])=>sec(t,ws.join('\n'))).join('')}${sec(dprItems(r).length?'Other notes':'Work done',r.work)}${tot?`\n\n*Labour (${num(tot)}):*\n${crewTxt(r.crew)}`:''}${ms.length?`\n\n*Material:*\n${ms.map(x=>`• ${x.item}${x.qty!==''&&x.qty!=null?' '+num(+x.qty):''} ${x.unit||''} (${x.kind||'Received'})`).join('\n')}`:''}${sec('Tomorrow',dprPlan(r).map(x=>`${x.trade}: ${x.work.trim()}`).join('\n'))}${sec('Hindrances',r.hindrance)}${dprPhotos(r).length?`\n\n📷 ${dprPhotos(r).length} photo${dprPhotos(r).length>1?'s':''} in BuildMitr`:''}\n\n— ${orgName()}`;}
  if(k==='invoices')t=`Dear ${cname(r.client)!=='—'?cname(r.client):'Sir/Madam'},\n\n${r.kind} ${r.no} dated ${fd(r.date)} for ${pname(r.project)}\nAmount: ${inr(invTotal(r))}${r.gst&&r.gst!=='No GST'?' (incl. '+r.gst+')':''}${r.got?`\nReceived: ${inr(r.got)}\nBalance: ${inr(invTotal(r)-(+r.got||0))}`:''}${upiLink(r)?`\n\nPay by UPI: ${(D.org.find(o=>o.id==='main')||{}).upi}`:''}\n\nThank you,\n${orgName()}`;
  if(k==='po')t=`*Purchase order ${r.no}* – ${orgName()}\nTo: ${vname(r.vendor)}\nSite: ${pname(r.project)}${proj(r.project)?.address?'\n'+proj(r.project).address:''}${proj(r.project)?.loc?'\nLocation: '+gmaps(proj(r.project).loc):''}\n\n${r.material}: ${num(r.qty)} ${r.unit||''}${r.rate?` @ ${inr(r.rate)} = ${inr(r.qty*r.rate)}`:''}${r.delivery?`\nDeliver by: ${fd(r.delivery)}`:''}${r.terms?`\n\nTerms: ${r.terms}`:''}`;
  if(k==='issues')t=`*${r.kind||'Issue'}: ${r.title}*\nProject: ${pname(r.project)}${r.location?'\nLocation: '+r.location:''}\nPriority: ${r.severity||'—'}${r.who?'\nAssigned to: '+nm(r.who):''}${r.due?'\nFix by: '+fd(r.due):''}${r.details?'\n\n'+r.details:''}`;
  if(k==='changes')t=`*Change order ${r.no}* – ${pname(r.project)}\nDate: ${fd(r.date)}\n\n${r.desc}\n\nCost impact: ${inr(r.amount)}${r.days?'\nTime impact: '+r.days+' days':''}\nStatus: ${r.status||'Requested'}\n\nPlease confirm approval.\n— ${orgName()}`;
  return t;
}

/* → extras: convertLead */
function inviteLink(r){
  const ps=(r.projects||[]).includes('all')?'all projects':(r.projects||[]).map(pname).join(', ')||'our projects';
  const link=S.web&&CLOUD.org&&typeof orgLink==='function'?orgLink(CLOUD.org,orgName()):S.web?location.href.split('#')[0]:'(I will share the app link with you)';
  const t=`Hello ${r.name},\n\nYou are added to the ${orgName()} team on *BuildMitr* as *${r.role}* for ${ps}.\nAccess: ${r.access}.\n\nOpen the app here: ${link}\nFirst time: tap “First time or forgot password?”, enter this email (${r.email||''}), enter the code we email you, then set your password.\nUse it to add daily reports, attendance, material and photos from site.${(r.projects||[]).filter(id=>proj(id)?.loc).map(id=>`\n📍 ${pname(id)}: ${gdir(proj(id).loc)}`).join('')}\n\n— ${ME.name||orgName()}`;
  return 'https://wa.me/'+waNum(r.phone)+'?text='+encodeURIComponent(t);
}
const waNum=p=>{let d=String(p||'').replace(/\D/g,'');if(d.length===10)d='91'+d;return d;};

/* ================= Activity schedules (timeline) =================
   Two schedules per project: the CONSTRUCTION schedule (collection "tasks", for the site team) and the DESIGN schedule
   (collection "dtasks": project management, architecture, 3D & elevation, structure, MEP, interiors — for the design team).
   Who sees which one is set in Role access; by default architects see design, site engineers construction, and the
   admin, project manager and senior (project) architect see both. */
const TC=()=>S.view==='designsched'?'dtasks':'tasks';
const TS=()=>D[TC()]||[];
function vSchedule(){const DS=S.view==='designsched',VK=DS?'designsched':'schedule';
  const wbsKey=w=>String(w||'').split(/[.\-]/).map(x=>String(x).padStart(5,'0')).join('.');
  let ts=TS().filter(t=>inProj(t)&&(t.start||t.due)).map(t=>({...t,s:t.start||t.due,e:t.due||t.start})).sort((a,b)=>(a.wbs&&b.wbs&&a.project===b.project)?wbsKey(a.wbs).localeCompare(wbsKey(b.wbs)):a.s.localeCompare(b.s));
  const allTs=ts;if(DS&&S.dsSec&&S.dsSec!=='all')ts=ts.filter(t=>secOf(t)===S.dsSec);if(S.schWho&&S.schWho!=='all')ts=ts.filter(t=>S.schWho==='none'?!t.who:t.who===S.schWho);
  const secBar=(DS||true)&&allTs.length?schFilterBar(allTs,DS):'';
  const ed=CANW&&canEditView(S.view==='designsched'?'designsched':'tasks');const other=DS?(canView('schedule')?`<button class="btn" data-go="schedule">${ico('gantt-chart')}Construction schedule</button>`:''):(canView('designsched')?`<button class="btn" data-go="designsched">${ico('pen-tool')}Design schedule</button>`:'');
  const btn=`${other}`+(CANW?`${DS?(ed?`<button class="btn" id="dsGen">${ico('sparkles')}Generate design schedule</button>`:''):isAdmin()?`<button class="btn" id="schedGen">${ico('gantt-chart')}Generate work schedule</button>`:''}${ed&&TS().some(t=>inProj(t)&&(t.start||t.due))?`<button class="btn ${S.schedTable?'pri':''}" id="schedTbl">${ico('pencil')}${S.schedTable?'Show timeline':'Edit as table'}</button><button class="btn" id="schedShift">${ico('arrow-left-right')}Shift schedule</button>`:''}${canView('documents')?`<button class="btn" data-go="drawlib">${ico('library')}Drawings library</button>`:''}${TS().some(t=>inProj(t))?`<button class="btn" id="schedXls">${ico('file-down')}Download Excel</button>`:''}<button class="btn" data-import="1">${ico('file-up')}Upload Excel</button><button class="btn pri" data-add="${TC()}">${ico('plus')}Add activity</button>`:'');
  if(!ts.length)return header(label(VK),btn)+(DS?`<div class="box hero-empty">${ico('pen-tool')}<h2>No design schedule yet</h2><p>Tap <b>Generate design schedule</b>: choose the type of project (house, villa, apartment, office, factory, restaurant, hotel, hospital…) and BuildMitr lays out project management, architecture, 3D & elevation, structure, MEP and interior activities with dates. Everything can be edited afterwards.</p>${btn}</div>`:`<div class="box hero-empty">${ico('gantt-chart')}<h2>No scheduled activities</h2><p>Add tasks with a start and due date (for example "Footing excavation", "GF slab casting"). They appear here as a timeline with progress against today.</p>${btn}</div>`);
  const day=s=>new Date(s+'T00:00').getTime()/864e5;
  let min=Math.min(...ts.map(t=>day(t.s)),day(today()))-2,max=Math.max(...ts.map(t=>day(t.e)),day(today()))+3;
  const span=max-min,pos=d=>((d-min)/span*100).toFixed(2)+'%';
  const ticks=[];const st=new Date(min*864e5);st.setDate(1);
  for(let d=new Date(st);d.getTime()/864e5<=max;d.setMonth(d.getMonth()+1)){const v=d.getTime()/864e5;if(v>=min)ticks.push([v,d.toLocaleDateString(LOC(),{month:'short',year:'2-digit'})]);}
  if(span<75){ticks.length=0;for(let v=Math.ceil(min);v<=max;v+=7)ticks.push([v,new Date(v*864e5).toLocaleDateString(LOC(),{day:'numeric',month:'short'})]);}
  {const vw=innerWidth||1000,trackW=Math.max(vw<=720?vw*0.44+420:760,Math.min(vw,1400)-300)-(vw<=720?vw*0.44:240),need=58,step=Math.max(1,Math.ceil(need/(trackW/Math.max(1,ticks.length))));   // keep month labels apart on narrow screens
    const keep=ticks.filter((t,i)=>i%step===0);ticks.length=0;ticks.push(...keep);}
  const tdy=day(today());
  if(!ts.length)return header(label(VK),btn)+secBar+`<div class="box"><div class="empty">Nothing in this section${S.schWho&&S.schWho!=='all'?' for this person':''}.</div></div>`;
  if(S.schedTable&&ed)return header(label(VK),btn)+secBar+schedTable(ts,DS);
  const SE=DS?{ds:1,rain:{},bands:'',hl:'',wet:()=>false,warn:[],hs:Object.entries(plHolidays()).filter(([d])=>d>=ts[0].s&&d<=ts[ts.length-1].e),city:''}:schedSeason(ts,min,max,pos);
  if(!S.dsFold)S.dsFold=new Set();
  const grp=DS&&(!S.dsSec||S.dsSec==='all');let tsR=ts;if(grp){const order=[...dsSecs(),...new Set(ts.map(secOf))];tsR=[...ts].sort((a,b)=>order.indexOf(secOf(a))-order.indexOf(secOf(b)));}
  let lastSec=null;
  const rows=tsR.map(t=>{const sc=grp?secOf(t):null;let head='';if(grp&&sc!==lastSec){lastSec=sc;const xs=ts.filter(x=>secOf(x)===sc),dn=xs.filter(x=>x.status==='Completed').length,fo=S.dsFold.has(sc);
      head=`<div class="g-row g-sec"><button type="button" class="g-secb" data-dsfold="${esc(sc)}" aria-expanded="${!fo}">${ico('chevron-down')}<b>${esc(sc)}</b><span class="code">${dn}/${xs.length} done</span></button><div class="g-track"></div></div>`;}
    if(grp&&S.dsFold.has(sc))return head;
    const done=t.status==='Completed'?100:+t.progress||0;const late=t.status!=='Completed'&&t.e<today();
    const w=Math.max(.8,(day(t.e)-day(t.s)+1)/span*100);
    return head+`<div class="g-row"><div class="g-lab"><b>${t.wbs?`<span class="code">${esc(t.wbs)}</span> `:''}${esc(t.title)}${(t.gates||[]).length?(gateMissing(t).length?` <span title="Needs approved: ${esc(gateMissing(t).join(', '))}">🔒</span>`:' <span title="Checklists approved">✅</span>'):''}</b><span>${(()=>{const w=[S.proj==='all'?pname(t.project):'',t.who?'👤 '+pnm(t.who):''].filter(x=>x&&x!=='—').join(' · ');return w?esc(w)+' · ':'';})()}<span class="g-dt">${fd(t.s)} → ${fd(t.e)}</span> <span class="g-acts"><button type="button" class="linkish g-cm" data-tcm="${esc(t.id)}" title="Comments">💬${(t.comments||[]).length?' '+(t.comments||[]).length:''}</button>${ed?`<button type="button" class="linkish g-cm" data-sedit="${esc(t.id)}" title="Edit activity" aria-label="Edit ${esc(t.title)}">✎ Edit</button>`:''}</span></span></div>
      <div class="g-track"${ed?` data-sedit="${esc(t.id)}" style="cursor:pointer" title="Tap to edit"`:''}>${SE.bands}${SE.hl}<div class="g-bar ${late?'late':SE.wet(t)?'pl-wet':''}" style="left:${pos(day(t.s))};width:${w.toFixed(2)}%" title="${esc(t.title)} · ${done}%"><i style="width:${done}%"></i></div></div></div>`;}).join('');
  const late=ts.filter(t=>t.status!=='Completed'&&t.e<today()).length;
  const planned=ts.filter(t=>t.e<=today()).length,doneN=ts.filter(t=>t.status==='Completed').length;
  const s0=ts.reduce((m,t)=>t.s<m?t.s:m,ts[0].s),e0=ts.reduce((m,t)=>t.e>m?t.e:m,ts[0].e);
  return header(label(VK),btn)+secBar+`<div class="grid2"><div class="box"><div class="box-h"><h2>Timeline</h2><span class="code">${fd(s0)} → ${fd(e0)}${SE.city?' · '+esc(SE.city):''}</span></div><div class="tiles"><div class="tile"><b>${((day(e0)-day(s0)+1)/30.4).toFixed(1)}</b><span>Months</span></div><div class="tile"><b>${ts.length}</b><span>Activities</span></div><div class="tile"><b>${doneN}</b><span>Completed</span></div><div class="tile"><b>${planned}</b><span>Should be done by today</span></div><div class="tile"><b style="color:${late?'var(--red-ink)':'inherit'}">${late}</b><span>Behind schedule</span></div><div class="tile"><b>${SE.hs.length}</b><span>Holidays inside</span></div></div></div>
  <div class="box"><div class="box-h"><h2>${DS?'Time check':'Season & time check'}</h2></div>${SE.warn.length?`<div class="pl-warn">${SE.warn.map(([sv,t])=>`<div class="pl-w ${sv}">${ico(sv==='high'?'alert-triangle':'info')}<span>${esc(t)}</span></div>`).join('')}</div>`:`<div class="note">${ico('check')}<span>${DS?'Nothing behind schedule.':'No season or time problems found.'}</span></div>`}</div></div>
  <div class="box"><div class="box-h"><h2>Calendar view</h2>${DS?'':`<span class="code"><span class="pl-key rain"></span> monsoon <span class="pl-key hv"></span> heavy monsoon <span class="pl-key hol"></span> holiday <span class="pl-key wet"></span> outdoor work in monsoon</span>`}</div><div class="tbl-wrap"><div class="gantt">
    <div class="g-row g-head"><div class="g-lab"></div><div class="g-track">${SE.bands}${ticks.map(([v,l])=>`<span class="g-tick" style="left:${pos(v)}">${l}</span>`).join('')}<span class="g-today" style="left:${pos(tdy)}"><em>Today</em></span></div></div>
    ${rows}<div class="g-row g-foot"><div class="g-lab"></div><div class="g-track">${ticks.map(([v])=>`<span class="g-line" style="left:${pos(v)}"></span>`).join('')}<span class="g-today" style="left:${pos(tdy)}"></span></div></div>
  </div></div><div class="code" style="padding:10px 16px">Bar = planned start to due date · dark fill = progress · red = past due and not complete · blue = outdoor work in monsoon · 💬 comments.</div></div>${schedMonths(ts,SE)}`;
}
/* the planner's season view for the Activity schedule: monsoon months, holidays, warnings, month by month */
const SCH_WET=/excavat|footing|foundation|plinth|slab|casting|concret|column|beam|roof|terrace|external|exterior|outer|waterproof|compound|elevation|landscap|sump|septic|earth|backfill|shuttering|centering|brick ?work|masonry/i;
const SCH_POUR=/slab|casting|concret|column|beam|footing|raft/i;
function schedCity(ts){for(const t of ts){const m=String(t.source||'').match(/planner \(([^,)]+)/);if(m&&PL_RAIN[m[1]])return m[1];}
  const p=proj(ts[0]&&ts[0].project)||{},a=String((p.address||'')+' '+(p.city||'')+' '+(orgMain().address||''));
  return /bangal|bengal/i.test(a)?'Bangalore':/guntur|vijayawada|tier/i.test(a)?'Tier-2 town (Guntur, Vijayawada…)':'Hyderabad';}
function schedSeason(ts,min,max,pos){const city=schedCity(ts),rain=PL_RAIN[city]||{},hol=plHolidays(),day=s=>new Date(s+'T00:00').getTime()/864e5;
  const iso=d=>isoDate(d);const bands=[];const d0=new Date(min*864e5);d0.setDate(1);
  for(let d=new Date(d0);d.getTime()/864e5<=max;d.setMonth(d.getMonth()+1)){const f=rain[d.getMonth()];if(f>1){const a=Math.max(min,d.getTime()/864e5),e=new Date(d);e.setMonth(e.getMonth()+1);const b=Math.min(max,e.getTime()/864e5);
    bands.push(`<span class="pl-rain ${f>=1.3?'hv':''}" style="left:${pos(a)};width:${((b-a)/(max-min)*100).toFixed(2)}%"></span>`);}}
  const hs=Object.entries(hol).filter(([d])=>day(d)>=min&&day(d)<=max).sort();
  const hl=hs.map(([d,n])=>`<span class="pl-hol" style="left:${pos(day(d))}" title="${esc(fd(d)+' '+n)}"></span>`).join('');
  const monthsOf=t=>{const out=[];const d=new Date(t.s+'T00:00');d.setDate(1);while(iso(d)<=t.e){out.push(d.getMonth());d.setMonth(d.getMonth()+1);}return out;};
  const wet=t=>SCH_WET.test(t.title||'')&&monthsOf(t).some(m=>(rain[m]||1)>1);
  const MN=m=>new Date(2026,m,1).toLocaleDateString(LOC(),{month:'short'});const warn=[];
  const open=ts.filter(t=>t.status!=='Completed');
  const lateN=open.filter(t=>t.e<today()).length;if(lateN)warn.push(['high',`${lateN} activit${lateN>1?'ies are':'y is'} past the due date and not complete — update progress or shift the schedule.`]);
  open.filter(t=>SCH_WET.test(t.title||'')).forEach(t=>{const hv=monthsOf(t).filter(m=>(rain[m]||1)>=1.3),md=monthsOf(t).filter(m=>(rain[m]||1)>1&&(rain[m]||1)<1.3);
    if(hv.length)warn.push(['high',`${t.title} runs in heavy monsoon (${[...new Set(hv)].map(MN).join(', ')}) in ${city} — plan covers, dewatering and extra days.`]);
    else if(md.length)warn.push(['med',`${t.title} runs in the monsoon (${[...new Set(md)].map(MN).join(', ')}) — keep a few days spare for rain.`]);});
  open.filter(t=>SCH_POUR.test(t.title||'')&&monthsOf(t).some(m=>PL_HOT.includes(m))).slice(0,3).forEach(t=>warn.push(['low',`${t.title} falls in the hot months (Apr–May) — longer curing, avoid noon pours.`]));
  const hIn=t=>hs.filter(([d])=>d>=t.s&&d<=t.e).length;const busy=open.filter(t=>hIn(t)>=2&&SCH_POUR.test(t.title||''));busy.slice(0,2).forEach(t=>warn.push(['low',`${t.title} has ${hIn(t)} holidays inside — labour may be short.`]));
  return {city,rain,hs,bands:bands.join(''),hl,wet,warn:warn.slice(0,8)};}
function schedMonths(ts,SE){if(!ts.length)return '';const s0=ts.reduce((m,t)=>t.s<m?t.s:m,ts[0].s),e0=ts.reduce((m,t)=>t.e>m?t.e:m,ts[0].e),out=[];const d=new Date(s0+'T00:00');d.setDate(1);let n=0;
  while(isoDate(d)<=e0&&n++<48){const a=isoDate(d),e=new Date(d);e.setMonth(e.getMonth()+1);e.setDate(0);const b=isoDate(e);
    const acts=ts.filter(t=>t.s<=b&&t.e>=a),hs=SE.hs.filter(([x])=>x>=a&&x<=b),f=SE.rain[d.getMonth()]||1;
    out.push(`<div class="pl-mon ${a.slice(0,7)===today().slice(0,7)?'now':''}"><div class="pl-mh"><b>${d.toLocaleDateString(LOC(),{month:'long',year:'numeric'})}</b>${a.slice(0,7)===today().slice(0,7)?'<span class="pill p-green">this month</span>':''}${f>1?`<span class="pill ${f>=1.3?'p-red':'p-amber'}">☂ ${f>=1.3?'heavy':'moderate'} monsoon</span>`:''}${!SE.ds&&PL_HOT.includes(d.getMonth())?'<span class="pill p-amber">hot</span>':''}</div>
      ${hs.length?`<div class="code">Holidays: ${hs.map(([x,n_])=>esc(`${new Date(x+'T00:00').getDate()} ${n_}`)).join(', ')}</div>`:''}
      <ul>${acts.map(t=>{const p=t.status==='Completed'?100:+t.progress||0,late=t.status!=='Completed'&&t.e<today();const cm=(t.comments||[]).slice(-1)[0];
        return `<li>${esc(t.title)} <span class="code">${fd(t.s)} → ${fd(t.e)}</span> <span class="pill ${p>=100?'p-green':late?'p-red':p?'p-blue':'p-grey'}">${p>=100?'Done':late?'Late · '+p+'%':p+'%'}</span>${cm&&cm.t?`<div class="code">💬 ${esc(cm.t)}</div>`:''}</li>`;}).join('')||'<li class="code">—</li>'}</ul></div>`);
    d.setMonth(d.getMonth()+1);}
  return `<div class="box"><div class="box-h"><h2>Month by month</h2></div><div class="pl-months">${out.join('')}</div></div>`;}

/* ================= Printable invoice / PO ================= */
/* → reports: downloadDoc */

/* ================= Wages (payroll) ================= */
function wagesRows(){
  const mo=S.month||today().slice(0,7);
  const att=D.attendance.filter(a=>inProj(a)&&(a.date||'').startsWith(mo));
  const adv=D.advances.filter(a=>inProj(a)&&(a.date||'').startsWith(mo));
  const ids=new Set([...att.map(a=>a.labour),...adv.map(a=>a.labour)]);
  return [...ids].map(id=>{const w=D.labour.find(l=>l.id===id)||{};const wage=+w.wage||0;
    const my=att.filter(a=>a.labour===id);
    const days=my.reduce((s,a)=>s+(a.status==='Present'?1:a.status==='Half day'?.5:0),0);
    const ot=my.reduce((s,a)=>s+(+a.ot||0),0);
    const gross=days*wage+ot*wage/8;const advance=adv.filter(a=>a.labour===id).reduce((s,a)=>s+(+a.amount||0),0);
    return {id,name:w.name||'—',trade:w.trade||'',wage,days,ot,gross,advance,net:gross-advance};}).sort((a,b)=>a.name.localeCompare(b.name));
}
/* → reports: vWages */

/* ================= Party balances ================= */
function balanceRows(){
  const vend=D.vendors.map(v=>{
    const mat=D.received.filter(r=>inProj(r)&&r.vendor===v.id).reduce((s,r)=>s+(+r.qty||0)*(+r.rate||0),0);
    const lab=D.vlabour.filter(r=>inProj(r)&&r.vendor===v.id).reduce((s,r)=>s+(+r.count||0)*(+r.rate||0),0);
    const eq=D.equiplog.filter(r=>inProj(r)&&(D.equipment.find(e=>e.id===r.equip)||{}).vendor===v.id).reduce((s,r)=>s+equipCost(r),0);
    const paid=D.payments.filter(p=>inProj(p)&&p.vendor===v.id).reduce((s,p)=>s+(+p.amount||0),0);
    return {name:v.name,kind:'Vendor',billed:mat+lab+eq,paid,bal:mat+lab+eq-paid};}).filter(r=>r.billed||r.paid);
  const cli=D.clients.map(c=>{
    const billed=D.invoices.filter(i=>inProj(i)&&i.client===c.id&&(i.kind==='Tax invoice'||i.kind==='RA bill')).reduce((s,i)=>s+invTotal(i),0);
    const paid=D.payments.filter(p=>inProj(p)&&p.client===c.id&&p.dir==='Received from client').reduce((s,p)=>s+(+p.amount||0),0);
    return {name:c.name,kind:'Client',billed,paid,bal:billed-paid};}).filter(r=>r.billed||r.paid);
  return {vend,cli};
}
/* → reports: vBalances */

/* ================= Budget vs actual ================= */
/* → reports: vBudgetVA */

/* ================= Site location (maps) ================= */
function parseLoc(str){
  str=String(str||'').trim();if(!str)return null;
  const pats=[/!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/,/@(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,/[?&](?:q|query|ll|destination|daddr|sll|coordinate)=(-?\d{1,2}\.\d+)(?:,|%2C)\s*(-?\d{1,3}\.\d+)/i,/^(-?\d{1,2}\.\d+)\s*[, ]\s*(-?\d{1,3}\.\d+)$/];
  for(const re of pats){const m=str.match(re);if(m){const lat=+m[1],lng=+m[2];if(Math.abs(lat)<=90&&Math.abs(lng)<=180)return {lat:+lat.toFixed(6),lng:+lng.toFixed(6)};}}
  return null;
}
const gmaps=l=>`https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
const gdir=l=>`https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`;
const amaps=l=>`https://maps.apple.com/?ll=${l.lat},${l.lng}&q=Site`;
const adir=l=>`https://maps.apple.com/?daddr=${l.lat},${l.lng}`;
function mapButtons(l,dir){if(!l)return '';return `<a class="btn sm" href="${esc(dir?gdir(l):gmaps(l))}" target="_blank" rel="noopener noreferrer">${ico('map')}Google Maps</a><a class="btn sm" href="${esc(dir?adir(l):amaps(l))}" target="_blank" rel="noopener noreferrer">${ico('navigation')}Apple Maps</a>`;}
function locShow(l){return l?`<span class="pill p-green">${ico('map-pin')} ${l.lat.toFixed(5)}, ${l.lng.toFixed(5)}</span> ${mapButtons(l)} <button type="button" class="btn sm ghost warn" id="locClear">${ico('x')}Remove pin</button>`:'<span class="code">No pin yet.</span>';}
let MAP=null,PIN=null;
function loadLeaflet(){
  if(window.L&&L.map)return Promise.resolve();
  return new Promise((ok,bad)=>{
    const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';document.head.appendChild(css);
    const js=document.createElement('script');js.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';js.onload=ok;js.onerror=bad;document.head.appendChild(js);
  });
}
async function initMap(){
  const box=document.getElementById('mapPick');if(!box)return;
  try{await loadLeaflet();}catch(e){box.innerHTML='<div class="code" style="padding:12px">Map could not load. Paste a map link below instead.</div>';return;}
  if(!document.getElementById('mapPick'))return;
  box.innerHTML='';
  const start=DRAFT.loc||{lat:17.385,lng:78.4867};
  MAP=L.map(box,{zoomControl:true}).setView([start.lat,start.lng],DRAFT.loc?17:11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(MAP);
  const icon=L.divIcon({className:'pin-ic',html:'<span></span>',iconSize:[26,26],iconAnchor:[13,26]});
  PIN=null;
  const place=(lat,lng,geo)=>{if(!PIN){PIN=L.marker([lat,lng],{draggable:true,icon}).addTo(MAP);PIN.on('dragend',()=>{const p=PIN.getLatLng();setLoc(p.lat,p.lng,true);});}else PIN.setLatLng([lat,lng]);setLoc(lat,lng,geo);};
  MAP._place=place;
  if(DRAFT.loc)place(DRAFT.loc.lat,DRAFT.loc.lng,false);
  MAP.on('click',e=>place(e.latlng.lat,e.latlng.lng,true));
  setTimeout(()=>MAP&&MAP.invalidateSize(),200);
}
async function setLoc(lat,lng,geo){
  DRAFT.loc={lat:+(+lat).toFixed(6),lng:+(+lng).toFixed(6)};
  const sh=document.getElementById('locShow');if(sh){sh.innerHTML=locShow(DRAFT.loc);}
  if(geo&&S.web){
    try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${lat}&lon=${lng}`,{headers:{'Accept-Language':'en'}});
      const j=await r.json();const a=document.getElementById('f-address');
      if(j&&j.display_name&&a){a.value=j.display_name;DRAFT.loc.address=j.display_name;toast('Address filled in from the pin');}
    }catch(e){toast('Pin saved. Type the address yourself — address lookup is not reachable.');}
  }
}
/* → extras: findPlace */

/* ================= Project forms & sheets (from the owner's Excel formats) ================= */
const QA_HEAD=['Project','Client','Doc. No.','Project Location','Site','Location','Date'];
const QC_HEAD=['Name of the Customer','Date','Project Name','Project ID','Name of the Contractor','Location','Drawing Ref. No.','Quantity'];
const QA_FOOT=[['Remarks / Observations','area'],['Signature','text'],['Signed date','date'],['Checked By','text'],['Approved By','text']];
const QC_FOOT=[['Corrective action proposed (item-wise — if NO is marked, give reasons and corrective action)','area'],['Comments','area'],["Contractor's Rep.",'text'],['Client Rep.','text'],['PMC Rep.','text']];
// sections: '# Heading', '> note line', other = item
const CHECKLISTS=[
 {id:'qc-mat',title:'QC — Material Receipt Inspection',kind:'qc',items:['# Cement','Brand, grade (OPC 43/53, PPC) and week of manufacture checked','Bags not lumpy, stored on raised platform away from walls','# Steel','Brand, grade (Fe500 / Fe550D) and test certificate received','Diameters and weight checked on sample','No heavy rust; stored off the ground','# Sand / M-sand','Silt content checked (field test), free from clay lumps','Grading suitable for plaster / concrete','# Aggregate','Size (20 mm / 12 mm) as specified; clean','# Bricks / blocks','Size, shape, colour uniform; sample soaked and checked','Count tallied with challan','# General','Quantity matches challan / invoice','Rejected material returned and noted']},
 {id:'qc-saf',title:'QC — Site Safety',kind:'qc',items:['# Workers','Helmets, shoes, gloves in use','Safety belts / harness used for work at height','First-aid box available and stocked','Drinking water and toilet available','# Site','Scaffolding firm, tied and with working platforms','Openings, lift wells and slab edges barricaded','Temporary electrical wiring with proper DB and earthing; no loose wires','Excavations shored and barricaded','Material stacked safely; no blocking of access','Fire extinguisher at site','# Records','Toolbox talk done today','Any accident or near-miss recorded and reported']},
 {id:'qc-sur',title:'QC — Surveying & Setting Out',kind:'qc',items:['Is contour / survey plan available?','Establishment of coordinate points, main grid lines, centre lines in both directions, block levels, spot levels etc. — as per drawings?','Check setbacks are as per the norms of the local authority approval drawing?','Any variation in the actual marking — is it recorded / reported?','Location of individual structural elements like column footings, columns, piles etc. — as per drawings?']},
 {id:'cl-exc',title:'Checklist for Excavation',code:'QA/CL-EXC/',kind:'qa',items:['Are there any underground utilities like sewers, water pipelines, cables?','> If YES, bring to the notice of the Project Manager and take adequate precautions while excavating','Check whether the excavated pits are adequately shored / timbered?','Are the excavated areas provided with fences / barricades?','Is the excavated material kept at least 1 m from the edge of the pit / trench?','Are heavy equipment such as cranes, shovels, backhoe loaders etc. kept at least 6 m from the edge of the excavated pit?','Are danger signs provided near the excavated area?','Means of access and exit from the work area provided?','Check set out','Check excavation size with tolerance (offset)','Check for loose materials / loose soil','Check bottom of excavation (indicate proposed GL / basement level with respect to existing road level)','Check for underground water seepage and if de-watering is needed','Check for uniform level of PCC bed']},
 {id:'qc-ewb',title:'QC — Earthwork & Backfilling',kind:'qc',items:['# Earthwork','Surveying complied?','Suitable arrangements for re-routing the service lines done?','Is the layout, alignment and size of excavation marked on the ground as per drawings?','Is adequate shoring, strutting done?','Check for dewatering. Is it OK?','Is the excavation done up to the level as per drawing?','> A. Natural existing ground level / B. Founding level / C. Depth of excavation — note in remarks','# Backfilling','Is the earth used for filling as per specification?','Check for the approved method of compaction','Check for levels of soil']},
 {id:'cl-att',title:'Checklist for Anti Termite Treatment',code:'QA/CL-ATT/',kind:'qa',items:['Check surface preparation',"Check the chemical's make & quality being used","Check application as per manufacturer's instructions (MSDS) & architect's specs",'Check the final finished treatment of work',"Check for mix proportion (as per manufacturer's instruction) water / kerosene",'Check for stages like foundation / flooring / joinery / external']},
 {id:'cl-pcc',title:'Checklist for PCC',code:'QA/CL-PCC/',kind:'qa',head:['Project','Client','Doc. No.','Project Location','Contractor','Location','Date'],items:['Check surface preparation','Check marking & levels with respect to drawing','Check for form work, bull marks','Check for finished level','Check for mixing of cement, sand and aggregate & adequate material','Check for pouring height','Do not allow extra cement mortar on top of PCC for smooth finishing','Check for button marking for PCC thickness','Check for curing at least 7 days']},
 {id:'cl-ren',title:'Checklist for Reinforcement',code:'QA/CL-REN/',kind:'qa',items:['Structural drawing no. and date as per which reinforcement checked','Bar bending schedule prepared?','Connecting of bars to existing dowels checked for alignment. OK?','Placing of bars — length, diameter, number, spacing match with the construction schedule?','Lap length, position of lap OK?','Cleanliness of shuttering and bars OK?','Chairs provided?','Cover for reinforcement OK?','Provision of cover blocks / preparation of cover blocks','Check the construction joint for proper concrete bonding before placing reinforcement','Laying of bars of required dia. as per requirement, stirrups at designated locations','Check test reports for steel and whether approved brand','Check colour coding for identification','Check for proper binding (double strand / binding wire of 18 SWG)','Check for any rework or alteration']},
 {id:'cl-sht',title:'Checklist for Shuttering',code:'QA/CL-SHT/',kind:'qa',items:['# Shuttering','Shuttering material is new / old?','Repairs are OK?','Cleanliness of shuttering?','Oiling of shuttering?','# Fixed shuttering','Shuttering design OK? (dimension, diagonal, sunken portions etc.)','Alignment / level / rigidity OK?','Check props. Are they OK?','Check acrow span. Are they OK?','Check braces. Are they OK?','Check sealing joints / holes OK?','Check for any rework or alterations','# After removal of shutter','Surface of concrete — good / moderate, level and line?','Repair of surface required?','> If YES, the repair is to be carried out and checked by the Quality Assurance Engineer']},
 {id:'cl-prc',title:'Checklist for Pre Concreting',code:'QA/CL-PRC/',kind:'qa',head:['Project','Client','Doc. No.','Contractor','Site','Location','Date','Structure','Max aggregate size','Slump','Cement test cert no.','Steel test cert no.'],items:['# Pre concreting','Check surface preparation','Check form work levels and proper required supports below formwork','Conduits / ducts opening provided?','Check for provision of vibrators?','Check quality of formwork and gaps between boards, column gabdi junction, shuttering oil on boards','Access platform and walkways (if required) provided?','Check reinforcement as per drawings','Check proper tying of reinforcement bars','Check cover to reinforcement','Check extra reinforcement, lapping length, connections of slab reinforcement into beam reinforcement','Check concrete pouring levels','Check for concrete (pour card)']},
 {id:'cl-con',title:'Checklist for Concreting',code:'QA/CL-CON/',kind:'qa',head:['Project','Client','Doc. No.','Contractor','Site','Location','Date','Structure','Max aggregate size','Slump','Cement test cert no.','Steel test cert no.'],items:['# Pre concreting','Check surface preparation','Check for form work and staging','Conduits / ducts openings / insert plates provided?','Check for provision of vibrators?','Working condition of mixer / vibrators checked and gaps between plates in mixer drum checked?','Access platform and walkways (if required) provided?','Check reinforcement as per drawings','Check embedded parts','Check cover to reinforcement','Check plumb','Check reduced levels','Check for concrete (pour card)']},
 {id:'cl-cub',title:'Concrete Cube Test Register',code:'QA/CL-CUB/',kind:'qa',items:['Grade of concrete (M20 / M25 / …) and mix (RMC / site mix) noted','Location of pour (footing / column / slab / beam) and quantity (cum)','Number of cubes cast (minimum 1 set of 3 per pour / per 5 cum or as specified)','Cubes marked with date, grade and location','Cubes kept in curing tank at site / lab','7-day result recorded (≈ 65–70% of grade strength expected)','28-day result recorded and compared with required strength','RMC delivery challan / batch slip attached','Slump test done at site; value recorded','> If any result is below the required strength, inform the structural engineer before the next pour']},
 {id:'cl-dsh',title:'Checklist for De-shuttering & Curing',code:'QA/CL-DSH/',kind:'qa',items:['# Before removing shuttering','Date and time of concreting recorded','Minimum time before striking met (side forms of columns, beams & walls ≥ 16–24 h; slab soffit ≥ 7 days with props re-shored; beam soffit ≥ 14 days; or as per engineer)','Props under slab / beam left or re-propped as required','Engineer approval taken for early removal (if any)','# After removing shuttering','Honeycombing, cold joints or exposed steel? Mark location and report','Line, level and plumb of member OK?','Cover to steel visible? Any rust marks?','Repairs done with approved method / material','# Curing','Curing started within 24 h of casting','Method: ponding / wet hessian / sprinkling / curing compound — note in remarks','Curing continued for at least 7 days (OPC) / 10 days (PPC, slag) or as specified','Curing record kept daily (date, done by)']},
 {id:'cl-pln',title:'Checklist for Plinth Beam, DPC & Plinth Filling',code:'QA/CL-PLN/',kind:'qa',items:['# Plinth beam','Plinth beam size, level and alignment as per drawing','Reinforcement checked (see Checklist for Reinforcement)','Top level of plinth matches approved FFL','# DPC','DPC thickness and mix as specified (e.g. 1:2:4 with waterproofing compound)','DPC laid on full wall width, continuous at junctions','Bitumen / waterproof coat applied if specified','# Plinth filling','Filling material as specified (earth / murram / sand), free from organic matter','Filled in layers of 150–200 mm, watered and compacted','Anti-termite treatment done before PCC','Levels checked before floor PCC']},
 {id:'cl-str',title:'Checklist for Staircase',code:'QA/CL-STR/',kind:'qa',items:['Waist slab thickness and reinforcement as per drawing','Number of steps, riser and tread as per drawing (uniform within 5 mm)','Landing levels match floor levels','Mid landing beam detailed and cast as per drawing','Dowels / starter bars left for next flight','Head room clear (min. 2.1 m)','Nosing and finish as specified','Handrail height (≈ 900 mm) and baluster gaps (safe for children) as per drawing','Railing fixing strong; no shake']},
 {id:'cl-msn',title:'Checklist for Masonry',code:'QA/CL-MSN/',kind:'qa',items:['# Brickwork','Availability of material as per daily requirement','Cleaning work area — material / concrete','Proper stacking of bricks / blocks','Quality of bricks / sand — tests performed and OK?','Wetting of bricks','Check for lintel beam, concrete bed provision','Check for door, window & ventilation openings, chajja provision','Line out rechecked? (room dimension, diagonals, alignment with one layer of brickwork, door opening position & verticality etc.)','Check mortar preparation & provision of platform','Check plumb & alignment of brickwork','Check finished level / right angle / proportion of mix','Check hacking / conduit / silt content in sand','Check cleaning of dead mortar','Check curing / raking','Check provision of patti','Check for any additions & alterations','Check for proper pointing, packing & finishing']},
 {id:'qc-ele',title:'QC — Electrical Installation Works',kind:'qc',items:['# Before slab casting','Check conduit placement at designated locations as per drawings','Check placement of fan boxes and any hooks','Check location of MCB, DB & meter box','Check proper looping & placement of junction boxes','# Wall electricals','Check wall chipping and placement of conduits, switch board boxes, junction boxes, looping at drop end at DB / MCB','Check wiring type, dia and numbers & proper looping and distribution','Check placement of communication cables, CCTV wiring','Check placement of fixtures, dummy plates, switches & switch board, and proper functioning','Check placement & connection of MCB / DB, inverter, solar power provision']},
 {id:'qc-wsl',title:'QC — Plumbing, Sanitary & Water Supply',kind:'qc',items:['# Water supply','All pipe joints and method of jointing as per specification and relevant IS codes?','Samples of pipes and fittings as per approved specification?','Concealed pipe lines painted and protected as per specification?','Connected pipe lines and fittings satisfactorily tested for leaks before covering?','Ceiling suspended lines adequately supported by suitable dia rod / anchor fastener with suitable spacing?','# Sewer line','Approved pipes used for the sewer lines. OK?','Levels and alignment of sewer line as per drawing / specifications. OK?','Jointing of pipes as per specifications / drawing. OK?','Inspection chambers at correct location, shape and invert level as per drawings / specifications?','Leak tests conducted?','# Sanitary fixtures & fittings','Fixtures fixed in correct position and level as per drawings / specifications?']},
 {id:'cl-tnk',title:'Checklist for Sump, Overhead Tank & Septic Tank',code:'QA/CL-TNK/',kind:'qa',items:['# Sump / underground tank','Location, size and depth as per drawing','Base and wall reinforcement checked','Waterproofing done (see waterproofing checklist)','Manhole cover size and level as per drawing','Leak test: filled and checked for 48–72 h; no drop in level','# Overhead tank','Tank support / slab designed and checked by structural engineer','Inlet, outlet, overflow, scour and vent pipes fixed','Leak test done','# Septic tank / soak pit','Distance from sump / borewell as per norms','Chambers, baffles and vent pipe as per drawing','Inlet and outlet invert levels correct']},
 {id:'cl-pls',title:'Checklist for Plastering',code:'QA/CL-PLS/',kind:'qa',items:['# Before plastering','Check drawing no. / date & revision for all other services like electrical, plumbing etc.','Safety access platform','Check for hacking / bull marking / mortar thickness','Provision of chicken mesh for conduits, columns & beam areas','Preparation of surface — remove moss / efflorescence & dampen surface','Material stacked — cement, sand at various locations','Pre-wetting of surface','Quality of sand — screening, silt','Check for door frame projections','# During plastering','Platform for mortar mixing on tray','Check thickness / level & line & right angle','Proportion of mix','Proper roughing of first coat','Check collection of mortar spills','Cleaning of dead mortar','Check for undulations','Check for grooves / drip moulds','Application of cement slurry on concrete surface / space for tile area, cutting for skirting area','Check proper concealing of plumbing & electrical provisions','# After plastering','Curing water distribution for various locations','Check for hollowness','Check for cracks','Check plastering date for curing']},
 {id:'cl-wpf',title:'Checklist for Waterproofing (Terrace, Toilets, Sump)',code:'QA/CL-WPF/',kind:'qa',items:['# Surface preparation','Surface cleaned of loose mortar, dust, oil','Cracks and honeycombing repaired','Pipe sleeves / outlets fixed before waterproofing','Coving (fillet) done at wall-floor junction','# Application','Approved product / system used (make, batch no.)','Primer applied as per manufacturer','Number of coats and thickness as specified','Upturn on walls (min. 300 mm in toilets, 150–300 mm at parapets) done','Mesh / fabric at corners and joints','# Testing','Ponding test done for 24–48 h (toilets, terrace)','No leakage seen below — checked and recorded','Protection screed laid after test','Slope towards drain outlets checked (terrace)']},
 {id:'cl-dw',title:'Checklist for Doors & Windows',code:'QA/CL-DW/',kind:'qa',items:['# Frames','Opening sizes as per drawing (width, height, sill level)','Frame material and section as per specification (wood / steel / UPVC / aluminium)','Frames in plumb, line and level','Hold-fasts / anchors fixed properly; gaps filled','Termite / primer treatment for wooden frames','# Shutters & glazing','Shutter size and thickness as specified','Hinges, tower bolts, handles, locks as per specification','Glass type and thickness as per drawing','Smooth opening and closing; no rubbing','Silicone / weather sealing around frames','# Final','Mosquito mesh / grills fitted where required','Protection film removed only at handover','No water leakage at windows after water test']},
 {id:'qc-fab',title:'QC — Fabrication Works',kind:'qc',items:['# Before fabrication','Quality of materials / test certificates of materials submitted','Approval obtained for the fabrication drawing','Approved welding rods used','Fabrication material free from mud stains / other materials','# After fabrication','Material section used as per drawing','Welding length as per drawing','All interconnection sections welded / holes drilled to assemble other members','Proper finishing of welded butt joints & application of protection paint and final paint']},
 {id:'qc-fc',title:'QC — Interior False Ceiling',kind:'qc',items:['Type of false ceiling as per specification','If grid type, grids marked as per drawing to locate the service points?','Frame work and hanger rods as per specification?','Before fixing boards, all service works checked (electrical, AC ducting, fire alarm, sprinkler, speakers, smoke / heat detectors) and cut-outs / openings provided?','Cornices, trap door provision as per drawing?','Painting of ceiling (if board) as per specification?']},
 {id:'cl-til',title:'Checklist for Tiling — Wall Dadoing & Flooring',code:'QA/CL-TIL/',kind:'qa',items:['# Before tiling','Check for any additions & alterations','Cleaning slab of loose mortar / material','Check levels, bull marking, mortar thickness, rough surface with hacking at wall','Availability of material — sand, tiles, cement','Proper stacking of tiles','Quality of tiles / sand, cement','Check for any platform, b/w for wardrobe area','# During tiling','Drg. no. / date as per which pattern given / starting point','Line / level fixed, checked & slopes as per requirement','Check difference in colour shade of tiles and replace with same batch / lot','Proportion of bedding mortar mixing','Clearing waste tiles / mortar','Clearing of joints / workmanship','Check the skirting for projection, right angle etc.','# After tiling','No material stacked after fixing? (crack or any damage)','Tile surface cleaned properly before grouting of tile joints','Check for any hollow sound','Any cracked tiles to be replaced','Check the pointing and grouting materials','Curing for four days after grouting (first coat)?']},
 {id:'cl-grn',title:'Checklist for Granite / Marble Laying',code:'QA/CL-GRN/',kind:'qa',items:['# Before laying','Cleaning slab of loose mortar / material','Availability of material — cement, sand, tiles / granite / stone / marble','Proper stacking of granite / marble / tiles / stone','Quality — check for proper edges and dimensions of the flooring material','# During laying','Drg. no. / date as per which pattern given / start point','Line / level fixed, checked & slopes as per requirement','Proportion of bedding cement mortar','Check grinding & polishing process','Clearing of joints / workmanship / any nosing, particularly for washbasin & kitchen counter','Check grouting for spacer joints','# After laying','No material stacked after fixing?','Finished surface cleaned properly before polishing','Check for any hollow sound','Any cracked pieces to be replaced','Curing for four days after laying']},
 {id:'cl-pnt',title:'Checklist for Painting Works',code:'QA/CL-PNT/',kind:'qa',items:['# Painting for walls','Check for any wall cracks; curing period completed or not','Check the material / paints are of approved make','Check colour shade approved','Cleaning of walls (scraping), surface finishing','Cracks, dampness, any leakages identified and repaired','Application of putty, texture, primer, paint','Application of coats as per specs checked','Other materials covered neatly with masking tape (electrical switch plates, door / window joints, glass partitions, wardrobes)','Check number of coats applied & final touch-up work completed','Check overall coverage and any brush marks','Check cleaning of flooring, window / door glasses & joinery fittings after painting','Check for any incomplete work and additions & alterations','Check floor polishing before final coat (in case of marble flooring)']},
 {id:'qc-int',title:'QC — Interior Furniture, Storage, Partition & Furnishing',kind:'qc',items:['# Furniture','Setting out in line with drawing / layout','Provisions made such as pencil drawer, keyboard drawer, storage units attached with the table','Type of finish: a) laminate b) veneer with melamine polish c) others — note in remarks','Approved make and thickness of materials as per specifications and drawings','# Storage unit','Type of storage','Hardware such as lock, hinges, handles as per specifications / drawings','Plywood thickness, finishing with laminate or veneer','Modular / custom built','# Partition / panelling','Type of internal frame work (wood / aluminium box sections)','Type of partition (fully solid / fully glazed / combination)','Before fixing plywood, electrical, civil and other services checked','Type of skirting','Location of switch boxes OK?','# Furnishing works','Carpet of specified make, colour and shade','Chairs of specified make, colour and shade','Fabric pin-up board — fabric, colour, size as per drawing / specification','Etching designs in glass partition']},
 {id:'qc-ext',title:'QC — External Plaster, Elevation & Painting',kind:'qc',items:['Scaffolding safe and tied to structure','Chicken mesh fixed at RCC–brick joints','Grooves / bands as per elevation drawing','Plaster in line, level and plumb; drip moulds at sills and chajjas','Curing of external plaster done for 7 days','Cladding / stone fixed as per drawing with proper anchors','Primer, putty (if any) and paint coats as specified','Shade matched with approved sample','Rain water pipes fixed and clamped']},
 {id:'qc-cmp',title:'QC — Compound Wall, Gate, Paving & Rainwater Harvesting',kind:'qc',items:['# Compound wall','Alignment along property line checked with survey','Foundation, columns and wall as per drawing','Expansion gaps / pillars at specified spacing','# Gate','Gate size, swing / sliding direction and track level as per drawing','# Paving & drainage','Paver / tile slope away from the building','Storm water drains and chambers as per drawing','# Rainwater harvesting','Recharge pit / sump location and size as per drawing','Filter media layers (pebbles, gravel, sand) as specified','Roof rain pipes connected to the system']},
 {id:'qc-elt',title:'QC — Electrical Testing & Earthing',kind:'qc',items:['Earth pit(s) made as per specification; earth resistance tested and recorded','Insulation (megger) test done for each circuit; values recorded','Polarity checked at all sockets and switches','RCCB / ELCB tripping tested','Load balanced across phases','DB labelling done for all circuits','All points working (lights, fans, sockets, AC, geyser)','Inverter / solar changeover tested','Test report shared with client']},
 {id:'qc-hnd',title:'QC — Pre-handover Inspection & Snag List',kind:'qc',items:['# Civil & finishes','Walls, ceilings and floors free from cracks, stains and patches','Tiles: no hollow sound, cracks or lippage; grout complete','Doors and windows open, close and lock smoothly','# Services','All taps, flush, showers working; no leakage','Drains flowing; no water standing in toilets / balconies','All electrical points, lights, fans working; DB labelled','# Others','Sump and overhead tank cleaned','Site cleaned; debris removed','Keys, warranty cards, manuals and as-built drawings handed over','Snag items recorded with photos and a date to close each one','Client walk-through done and sign-off taken']},
 {id:'dq-brf',title:'Design QA — Brief, Site Data & Bye-laws',code:'DQ/BRF/',kind:'dq',stage:'A. Before design',items:['# Client brief','Client requirements written and signed (rooms, floors, budget, vastu, parking, future floors)','Brief reviewed with client; changes recorded with date','# Site data','Site survey with boundary dimensions, levels, road widths, north direction','Soil investigation report (SBC) available or assumed SBC agreed in writing','Existing services noted: water, sewer, power line, trees, neighbouring structures','# Bye-laws','Setbacks, FAR / FSI, ground coverage, height and parking checked against local rules','Approval drawing requirements of the authority listed']},
 {id:'dq-arc',title:'Design QC — Architectural Working Drawings',code:'DQ/ARC/',kind:'dq',stage:'B. Drawings',items:['# Plans','Room sizes and areas match the approved concept / brief','All dimensions add up (internal + wall thickness = overall)','Wall thickness as per standard (external / internal)','Door and window sizes match the schedule; door swings do not clash','Floor levels, sunken areas (toilets, balconies) and steps marked','Staircase: riser, tread, headroom (min 2.1 m), landing widths OK','Toilets and kitchen have ventilation / exhaust','Furniture layout fits (bed, wardrobe, kitchen platform, car parking)','# Sections & elevations','Sections cut through staircase and toilets; levels match plans','Lintel, sill, slab and parapet levels consistent','Elevation matches plan openings; materials and colours noted','# Sheet','Title block, drawing number, revision, date, scale and north arrow complete']},
 {id:'dq-str',title:'Design QC — Structural Drawings',code:'DQ/STR/',kind:'dq',stage:'B. Drawings',items:['# Layout','Grid lines and column positions match the architectural plan; no column in a door, window or car path','Column sizes and orientation as per analysis; enlarged columns grow inside the building','Beam layout: no beam below a window / door head unless planned; main beams continuous column to column','Footing sizes as per SBC and loads; sizes in multiples of 3" (75 mm), min 4\'-0" wide','# Analysis','Model loads match the drawings (wall loads, floor finish, live load, water tank, lift)','Analysis and design checks passed (no failed members); deflection checked','# Detailing','Concrete grade and steel grade noted','Clear cover for footing, column, beam, slab noted','Lap / development length (Ld = 50 × bar dia) and extra bars as per office standard','Slab thickness, sunken slabs and cut-outs shown','Staircase, lintels, chajjas, sump and water tank detailed','Bar bending / reinforcement schedule matches the drawings','# Sheet','General notes, legend, title block, revision and date complete']},
 {id:'dq-mep',title:'Design QC — Electrical & Plumbing Drawings',code:'DQ/MEP/',kind:'dq',stage:'B. Drawings',items:['# Electrical','Light, fan, socket and switch points match the furniture layout','AC, geyser, kitchen appliance, washing machine and EV / inverter points provided','DB / meter location accessible; circuits and load worked out','Earthing pits and lightning protection (if needed) marked','CCTV, internet and TV points','# Plumbing & drainage','Water supply lines, sizes and tank capacities worked out','Shafts / ducts for pipes provided and not blocked by beams','Drain slopes, inspection chambers and invert levels shown','Rainwater pipes, harvesting pit and storm drains shown','Sump, overhead tank and septic tank positions agreed with structural']},
 {id:'dq-crd',title:'Design QC — Coordination / Clash Check',code:'DQ/CRD/',kind:'dq',stage:'C. Before issue',items:['Architectural, structural and services drawings are the same revision','Column and beam positions checked over the architectural plan (overlay)','Beam depths vs door / window heads and false ceiling levels','Toilet and kitchen sunken slabs match plumbing drawings','Openings and cut-outs (shafts, staircase, lift, skylights) same in all drawings','Electrical / plumbing runs do not cut through beams or columns','Staircase dimensions and levels match in architectural and structural','Changes from client meetings (MOM) included in all affected drawings']},
 {id:'dq-iss',title:'Design QA — Drawing Issue & Release',code:'DQ/ISS/',kind:'dq',stage:'C. Before issue',items:['Drawing checked and initialled by the checker (not only the drafter)','Revision number and date updated; revision note says what changed','Old revision marked Superseded in the library','Title block: project, client, drawing title, number, scale complete','PDF plotted with correct line weights and readable text','Client / owner approval taken where needed','Released to site and client in BuildMitr (not only sent on WhatsApp)','Issue register / transmittal updated']},
];
const LEDGER_ACCTS=['Cash','Accounts Receivable','Inventory','Supplies','Equipment','Accounts Payable','Notes Payable','Capital','Drawing','401 Sales','412 Sales Returns & Allowances','420 Sales Discount','Cost of Goods Sold','Advertising Expense','Freight Out','Salaries','Utilities'];
const SHEETS=[
 {id:'sh-boq',title:'BOQ (Bill of Quantities)',head:['Project','Location','Date'],cols:[{k:'sno',l:'S.No',t:'text',w:50},{k:'desc',l:'Description',t:'area',w:340},{k:'unit',l:'Unit',t:'text',w:60},{k:'qty',l:'Qty',t:'num',w:80},{k:'rate',l:'Rate',t:'num',w:90},{k:'amt',l:'Amount',t:'calc',w:110,f:r=>n(r.qty)*n(r.rate),xf:'D{r}*E{r}',sum:1}],gst:18,
   starter:[['1','Earth work excavation in all types of soils for foundations, pits and trenches, dressing of sides and ramming of bottom, lift up to 1.5 m depth, stacking away from the edge of foundation, complete.','Cum'],['2','Pre-constructional anti-termite chemical treatment as per IS 6313 Part II through approved agency with 10-year guarantee bond (plinth area).','Sqm'],['3','Plain cement concrete 1:4:8 with 40 mm aggregate, machine mixed and vibrated, in foundation trenches, plinth, bed blocks etc. including curing.','Cum'],['4','Coursed rubble stone masonry in CM 1:6 in walls, piers, foundations and plinth including bond stones every 2 m c/c and curing.','Cum'],['5','Filling available excavated earth in trenches, plinth, sides of foundation in layers not exceeding 20 cm, ramming and watering.','Cum'],['6','Filling murrum / approved material brought from outside in layers not exceeding 20 cm, ramming and watering, for levelling and below flooring.','Cum'],['7a','RCC M25 (incl. centering & shuttering, excl. reinforcement) — Pedestals','Cum'],['7b','RCC M25 — Plinth beams','Cum'],['7c','RCC M25 — Footings','Cum'],['8','HYSD / TMT reinforcement bars of approved make — straightening, cutting, bending, binding and placing as per structural drawings.','Kg'],['9','CC flooring 1:2:4, 40 mm thick with 20 mm aggregate, finished with neat cement slurry (plinth protection all round).','Sqm']]},
 {id:'sh-mat',title:'Material Reconciliation — Planned vs Actual',head:['Site name','Site location','Updated as on'],cols:[{k:'sno',l:'S.No',t:'text',w:50},{k:'mat',l:'Type of material',t:'text',w:150},{k:'vendor',l:'Vendor name',t:'text',w:130},{k:'inv',l:'Invoice no. & date',t:'text',w:120},{k:'unit',l:'Unit',t:'text',w:60},{k:'est',l:'Qty estimated (Arch / Struct team)',t:'num',w:100},{k:'pur',l:'Qty purchased by client',t:'num',w:100},{k:'used',l:'Qty used at site',t:'num',w:90},{k:'loc',l:'Location where used',t:'text',w:130},{k:'avail',l:'Qty available at site',t:'calc',w:100,f:r=>n(r.pur)-n(r.used),xf:'G{r}-H{r}'},{k:'cost',l:'Cost per unit',t:'num',w:90},{k:'tot',l:'Total cost',t:'calc',w:110,f:r=>n(r.pur)*n(r.cost),xf:'G{r}*K{r}',sum:1},{k:'rem',l:'Remarks',t:'text',w:140}]},
 {id:'sh-bill',title:'Billing Format — RA Bill',head:['Project','Location','Bill no.','Bill date','Period'],cols:[{k:'item',l:'Item',t:'text',w:50},{k:'desc',l:'Description of works',t:'area',w:260},{k:'qty',l:'Qty (A)',t:'num',w:70},{k:'unit',l:'Unit (B)',t:'text',w:60},{k:'rate',l:'Unit cost (C)',t:'num',w:90},{k:'amt',l:'Amount (D)',t:'calc',w:110,f:r=>n(r.qty)*n(r.rate),xf:'C{r}*E{r}',sum:1},{k:'tdp',l:'To date %',t:'num',w:70},{k:'tda',l:'To date amount',t:'calc',w:110,f:r=>n(r.qty)*n(r.rate)*n(r.tdp)/100,xf:'F{r}*G{r}/100',sum:1},{k:'pvp',l:'Previous %',t:'num',w:70},{k:'pva',l:'Previous amount',t:'calc',w:110,f:r=>n(r.qty)*n(r.rate)*n(r.pvp)/100,xf:'F{r}*I{r}/100',sum:1},{k:'thp',l:'This period %',t:'calc',w:80,f:r=>n(r.tdp)-n(r.pvp),xf:'G{r}-I{r}'},{k:'tha',l:'This period amount',t:'calc',w:110,f:r=>n(r.qty)*n(r.rate)*(n(r.tdp)-n(r.pvp))/100,xf:'H{r}-J{r}',sum:1}],foot:['Prepared by','Checked by','Approved by']},
 {id:'sh-jrn',title:'Journal Entry',head:['Page no.','Period'],cols:[{k:'date',l:'Date',t:'date',w:120},{k:'desc',l:'Description',t:'area',w:320},{k:'ref',l:'Post ref.',t:'text',w:80},{k:'dr',l:'Debit',t:'num',w:110,sum:1},{k:'cr',l:'Credit',t:'num',w:110,sum:1}],balance:['dr','cr']},
 {id:'sh-ldg',title:'General Ledger & Trial Balance',head:['Period'],cols:[{k:'acct',l:'Account',t:'sel',o:LEDGER_ACCTS,w:180},{k:'date',l:'Date',t:'date',w:120},{k:'rem',l:'Remarks',t:'text',w:220},{k:'ref',l:'Post ref.',t:'text',w:80},{k:'dr',l:'Debit',t:'num',w:110,sum:1},{k:'cr',l:'Credit',t:'num',w:110,sum:1}],trial:true,balance:['dr','cr']},
 {id:'sh-exp',title:'Expense Report',head:['Site / employee','Period from','Period to','Advance received (₹)'],cols:[{k:'date',l:'Date',t:'date',w:120},{k:'desc',l:'Description',t:'text',w:220},{k:'cat',l:'Category',t:'sel',o:['Material','Labour','Transport','Fuel','Food & tea','Tools','Site expense','Travel','Other'],w:120},{k:'to',l:'Paid to',t:'text',w:140},{k:'bill',l:'Bill no.',t:'text',w:80},{k:'amt',l:'Amount',t:'num',w:100,sum:1},{k:'mode',l:'Mode',t:'sel',o:['Cash','UPI','Bank','Card'],w:90},{k:'by',l:'Paid by',t:'text',w:120}],advance:'Advance received (₹)',foot:['Submitted by','Approved by']},
];
const n=v=>{const x=parseFloat(String(v??'').replace(/[,₹\s]/g,''));return isNaN(x)?0:x;};
const CL_STAGE={'qc-mat':'Throughout the job','qc-saf':'Throughout the job','qc-sur':'1. Setting out','cl-exc':'2. Excavation & foundation','qc-ewb':'2. Excavation & foundation','cl-att':'2. Excavation & foundation','cl-pcc':'2. Excavation & foundation','cl-ren':'3. RCC work — every pour','cl-sht':'3. RCC work — every pour','cl-prc':'3. RCC work — every pour','cl-con':'3. RCC work — every pour','cl-cub':'3. RCC work — every pour','cl-dsh':'3. RCC work — every pour','cl-pln':'4. Plinth','cl-str':'5. Structure & walls','cl-msn':'5. Structure & walls','qc-ele':'6. Services rough-in','qc-wsl':'6. Services rough-in','cl-tnk':'6. Services rough-in','cl-pls':'7. Plaster & waterproofing','cl-wpf':'7. Plaster & waterproofing','cl-dw':'8. Doors, windows & fabrication','qc-fab':'8. Doors, windows & fabrication','qc-fc':'9. Finishes & interiors','cl-til':'9. Finishes & interiors','cl-grn':'9. Finishes & interiors','cl-pnt':'9. Finishes & interiors','qc-int':'9. Finishes & interiors','qc-ext':'10. External works','qc-cmp':'10. External works','qc-elt':'11. Testing & handover','qc-hnd':'11. Testing & handover'};
function allTemplates(){
  let sq=0,dq=0;
  return [...CHECKLISTS.map(t=>({...t,type:'check',group:t.kind==='dq'?'Design QA / QC checklists':'Site QA / QC checklists — in construction order',seq:t.kind==='dq'?++dq:++sq,stage:CL_STAGE[t.id]||t.stage||''})),...SHEETS.map(t=>({...t,type:'sheet',group:'Sheets'})),
    ...D.templates.map(t=>({...t,type:'sheet',group:'Your uploaded formats',custom:true,cols:(t.cols||[]).map(c=>({...c}))}))];
}
const tplById=id=>allTemplates().find(t=>t.id===id);
/* access: formAccess doc `${pid}__${tplId}` or `${pid}__all` → {view:[teamId], edit:[teamId]} */
/* → forms: accDoc */
/* → forms: formLevel */
/* → forms: projTeam */
/* → forms: autoHead */

/* ---- project page ---- */
/* → forms: vForms */
function vProject(){
  const p=proj(S.proj);if(!p){S.view='projects';return vProjects();}
  const sl=p.loc||(p.maps&&parseLoc(p.maps));const nf=D.forms.filter(f=>f.project===p.id).length;
  const by=c=>D[c].filter(x=>x.project===p.id);const ts=by('tasks');
  const pc=ts.length?Math.round(ts.reduce((s,t)=>s+(t.status==='Completed'?100:+t.progress||0),0)/ts.length):0;
  const ed_=canStage(p)&&!p.shared;if(isAdmin()&&S.cloud)setTimeout(()=>shrLoad(),0);
  return header(esc(p.name),`<button class="btn" data-go="projects">${ico('arrow-left')}Projects</button>`)+`<div class="box"><div class="box-h">${ico('flag')}<h2>Project stage</h2>${ed_?'<span class="code">Tap a stage to mark it done</span>':''}</div>${stageStrip(p,ed_)}
    <div class="srow" style="flex-wrap:wrap;gap:6px"><span class="code">Services</span>${PSERV.map(x=>(p.services||[]).includes(x)?`<button type="button" class="pill p-blue" ${ed_?`data-pserv="${esc(p.id)}|${esc(x)}"`:'disabled'}>${esc(x)}</button>`:ed_?`<button type="button" class="pill p-grey" data-pserv="${esc(p.id)}|${esc(x)}" style="opacity:.6">+ ${esc(x)}</button>`:'').join('')}</div></div>`+
  `<div class="box"><div class="siteloc">${ico('map-pin')}<div style="flex:1;min-width:180px"><b>${esc(p.prefix||'')}</b> ${esc(cname(p.client)!=='—'?'· '+cname(p.client):'')}<div class="code">${esc(p.address||'No address yet')}</div></div>${sl?mapButtons(sl,true):''}${S.cloud&&isAdmin()&&!p.shared?`<button class="btn sm" data-pshare="${esc(p.id)}">${ico('share-2')}Share with a company</button>`:''}${CANW&&!p.shared&&(isAdmin()||(canEditView('projects')&&p.by===ME.id))?`<button class="btn sm" data-edit="projects:${p.id}">${ico('pencil')}Edit project</button>`:''}</div></div>
  <div class="box tiles"><div class="tile"><b>${pc}%</b><span>Progress</span></div><div class="tile"><b>${ts.filter(t=>t.status!=='Completed').length}</b><span>Open tasks</span></div><div class="tile"><b>${by('issues').filter(i=>i.status!=='Resolved').length}</b><span>Open issues</span></div><div class="tile"><b>${fd(p.start)} → ${fd(p.end)}</b><span>Schedule</span></div></div>${p.shared?`<div class="note">${ico('share-2')}<span style="flex:1">Shared by <b data-notr>${esc(p.shared.name)}</b>. Your team works on its tasks, drawings, site updates and calendar here; payments, invoices and budget stay with ${esc(p.shared.name)}.</span>${isAdmin()?`<button type="button" class="btn sm" data-shstop="${esc(p.shared.id)}">Stop sharing</button>`:''}</div>`:''}${!p.start?`<div class="note warn">${ico('pause-circle')}<span><b>No project date — tasks paused.</b> This project's tasks and calendar work don't send alerts to anyone. Add a start date in <b>Edit project</b> to switch them on.</span></div>`:''}
  <div class="box"><div class="siteloc" style="gap:8px"><button class="btn pri" data-go="dashboard">${ico('layout-dashboard')}Project dashboard</button><button class="btn" data-go="schedule">${ico('gantt-chart')}Activity schedule</button>${canView('documents')?`<button class="btn" data-go="drawlib">${ico('library')}Drawings library</button>`:''}<button class="btn" data-go="forms">${ico('clipboard-check')}Checklists & sheets${nf?` · ${nf}`:''}</button><button class="btn" data-go="reports">${ico('file-bar-chart')}Summary & export</button><button class="btn" data-go="cctv">${ico('cctv')}Cameras</button>${canView('invoices')&&!p.shared?`${CANW?`<button class="btn" data-dmnew="Quotation">${ico('file-text')}Quotation</button><button class="btn" data-dmnew="Tax invoice">${ico('receipt')}Invoice</button>`:''}<button class="btn ghost" data-go="docmaker">Quotations & invoices${by('invoices').length?` · ${by('invoices').length}`:''}</button>`:''}${canView('tasks')?(()=>{let n=ts.filter(t=>t.status!=='Completed').length;try{if(canView('calendar'))n+=calOpen(90,365).filter(x=>x.project===p.id).length;}catch(_){}return `<button class="btn" data-go="tasks" data-ptasks="${esc(p.id)}">${ico('list-checks')}Tasks${n?` · ${n} open`:''}</button>`;})():''}</div></div>`+projMeetBox(p);
}
const fmtTs=ms=>ms?new Date(ms).toLocaleDateString(LOC(),{day:'numeric',month:'short'}):'—';

/* ---- access drawer ---- */
/* → forms: openAccess */
/* → forms: saveAccess */

/* ---- form instance ---- */
let FORM=null; // working copy {id?, ...}
/* → forms: newForm */
/* → forms: openForm2 */
/* → forms: itemList */
/* → forms: vForm */
/* → forms: saveFormDoc */
/* → forms: exportFormXlsx */
/* → forms: printForm */
/* → forms: uploadTemplate */

/* ================= Roles: who sees which screens and projects ================= */
const V_ALL='*';
const V_SITE=['dashboard','sitehome','projects','project','documents','survey','schedule','tasks','issues','dpr','cctv','cameras','inventory','received','requests','issue','returned','consumed','labour','attendance','attbulk','vlabour','workupd','equipment','equiplog','forms','form','alerts'];
const ROLE_VIEWS={
  'Admin':V_ALL,
  'Project manager':V_ALL,
  'Site engineer':[...V_SITE,'po','boq','changes','agents'],
  'Supervisor':[...V_SITE,'agents'],
  'Storekeeper':['sitehome','dashboard','projects','project','inventory','po','received','requests','issue','returned','consumed','equipment','equiplog','forms','form','alerts','agents'],
  'Accountant':['dashboard','projects','project','invoices','clients','vendors','payments','balances','budget','budgetva','milestones','wages','advances','labour','attendance','received','po','reports','forms','form','alerts','agents'],
  'Architect':['desk','dashboard','projects','project','documents','survey','boq','changes','designsched','dtasks','issues','dpr','cctv','forms','form','alerts','agents'],
  'Structural engineer':['desk','dashboard','projects','project','documents','survey','boq','changes','designsched','dtasks','issues','dpr','cctv','forms','form','alerts','agents'],
  'Sub-contractor':['sitehome','project','schedule','tasks','issues','dpr','attendance','attbulk','workupd','forms','form','alerts'],
  'Marketing':['mktdash','pipeline','leads','visits','leadimp','followups','wtpl','estimator','packages','campaigns','content','reviews','referrals','portfolio','cflags','agents'],
  'Client':['client','cphotos','cpay','cdocs','cctv','forms','form'],
  'none':[],
};
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&!a.includes('messages'))a.push('messages');});
const PREVIEW_ROLES=Object.keys(ROLE_VIEWS).filter(r=>r!=='none'&&r!=='Admin');
function curRole(){
  if(S.viewAs)return S.viewAs;
  if(isAdmin())return 'Admin';
  if(S.web&&!S.demo&&!S.cloud)return 'Admin';
  const t=myTeamRec();
  if(!t)return S.demo?'Admin':'none';
  return ROLE_VIEWS[t.role]?t.role:'Supervisor';
}
const fullAccess=()=>ROLE_VIEWS[curRole()]===V_ALL;
const canView=v=>{if(v==='settings'||v==='install')return true;if(v==='attend'&&!S.viewAs&&!S.viewAsPerson&&ME.id&&(D.team||[]).some(t=>t.mgr===ME.id&&t.status!=='Removed'))return true;if(v==='notices')return !['Client','none'].includes(curRole());if(v==='docmaker')v='invoices';if(v==='drawlib')v='documents';if(v==='orgs')return isSuperAdmin();const r=curRole();const a=ROLE_VIEWS[r];{const t=curPerson();if(t&&t.role!=='Admin'){const po=personOv(t.id);if(po&&po[v]&&v!=='roleaccess')return po[v]!=='h';}}if(a===V_ALL)return true;if(v==='roleaccess')return false;const o=raOverride(r);if(o&&o[v])return o[v]!=='h';return (a||[]).includes(v);};
const homeView=()=>{const r=curRole();if(r==='Client')return 'client';if(r!=='none'&&!fullAccess()&&canView('myday'))return 'myday';{const u=UI_OF[r];if(u==='site'&&canView('sitehome'))return 'sitehome';if(u==='design'&&canView('desk'))return 'desk';}if(r==='none')return 'noaccess';const a=ROLE_VIEWS[r];if(a===V_ALL)return 'dashboard';const pref=[UI_OF[r]==='site'?'sitehome':UI_OF[r]==='design'?'desk':r==='Marketing'?'mktdash':'dashboard','dashboard',...a,...NAV.flatMap(g=>g.items.map(i=>i[0]))].find(v=>canView(v)&&!(UI_ONLY[v]&&UI_ONLY[v]!==UI_OF[r]));return pref||'noaccess';};
function myProjSet(){
  if(S.viewAsPerson){const t=D.team.find(x=>x.id===S.viewAsPerson);if(t)return (t.projects||[]).includes('all')?'all':new Set(t.projects||[]);}
  if(fullAccess()&&!S.viewAs)return 'all';
  if(S.viewAs)return 'all';
  const t=myTeamRec();if(!t)return S.demo?'all':new Set();
  return (t.projects||[]).includes('all')?'all':new Set(t.projects||[]);
}
const projOK=pid=>{const s=myProjSet();return s==='all'||s.has(pid)||((D.projects.find(p=>p.id===pid)||{}).by===ME.id&&!!ME.id);};   // a project you added is always yours to open
const PJ=()=>D.projects.filter(p=>projOK(p.id)&&!p.archived);
const canMoney=()=>canView('payments');
function vNoAccess(){
  return `<div class="bar"><h1>Welcome to BuildMitr</h1></div><div class="box hero-empty">${ico('lock')}<h2>Waiting for access</h2><p>You have opened the app, but the admin has not added you to a project yet. Ask the admin to add you on the Team page and link your account. Once that is done, your screens appear here automatically.</p></div>`;
}

/* ================= Client portal ================= */
function vClient(){
  const ps=PJ();
  const t=myTeamRec();
  const pm=D.team.find(x=>['Project manager','Admin','Site engineer'].includes(x.role)&&x.phone&&((x.projects||[]).includes('all')||ps.some(p=>(x.projects||[]).includes(p.id))));
  if(!ps.length)return `<div class="bar"><h1>My home</h1></div><div class="box hero-empty">${ico('home')}<h2>No project linked yet</h2><p>Your builder will add your project here.</p></div>`;
  return `${S.viewAs?previewBar():''}<div class="bar"><h1>${esc((t&&t.name)?'Welcome, '+t.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s*/,'').split(' ')[0]:'My home')}</h1>${pm?`<a class="btn pri" href="https://wa.me/${esc(waNum(pm.phone))}" target="_blank" rel="noopener noreferrer">${ico('message-circle')}Message ${esc(pm.name.split(' ')[0])}</a>`:''}</div>`+
  ps.map(p=>{
    const by=c=>D[c].filter(x=>x.project===p.id);const ts=by('tasks').sort((a,b)=>(a.start||a.due||'').localeCompare(b.start||b.due||''));
    const pc=ts.length?Math.round(ts.reduce((s,x)=>s+(x.status==='Completed'?100:+x.progress||0),0)/ts.length):0;
    const now=ts.filter(x=>x.status==='In progress'),next=ts.filter(x=>x.status==='Not started').slice(0,3);
    const dprs=by('dpr').sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,4);
    const photos=dprs.flatMap(d=>(d.photos||[]).map(id=>({id,date:d.date}))).slice(0,8);
    const docs=by('documents').filter(d=>d.status==='Approved');
    const ms=by('milestones');const inv=by('invoices').filter(i=>i.kind==='Tax invoice'||i.kind==='RA bill');
    const cos=by('changes').filter(c=>c.status==='Requested');
    const cams=D.cameras.filter(c=>c.project===p.id&&camAllowed(c));
    const paid=D.payments.filter(x=>x.project===p.id&&x.dir==='Received from client').reduce((s,x)=>s+n(x.amount),0);
    const due=inv.filter(i=>i.status!=='Paid').reduce((s,i)=>s+invTotal(i)-n(i.got),0);
    return `<div class="box"><div class="box-h">${ico('home')}<h2>${esc(p.name)}</h2><span class="code">${esc(p.address||'')}</span></div>
      <div class="tiles"><div class="tile"><b>${pc}%</b><span>Work completed</span></div><div class="tile"><b>${fd(p.end)}</b><span>Planned handover</span></div>${canView('cpay')?`<div class="tile"><b>${inr(paid)}</b><span>Paid so far</span></div><div class="tile"><b style="color:${due?'var(--amber-ink)':'inherit'}">${inr(due)}</b><span>Due now</span></div>`:''}</div>
      <div class="grid2" style="padding:14px 16px">
        <div><h3 class="code" style="margin:0 0 6px">NOW HAPPENING</h3>${now.length?now.map(x=>`<div style="margin:4px 0">• <b>${esc(x.title)}</b> <span class="code">${+x.progress||0}%</span></div>`).join(''):'<div class="code">—</div>'}
          <h3 class="code" style="margin:12px 0 6px">COMING NEXT</h3>${next.length?next.map(x=>`<div style="margin:4px 0">• ${esc(x.title)} <span class="code">from ${fd(x.start)}</span></div>`).join(''):'<div class="code">—</div>'}</div>
        <div><h3 class="code" style="margin:0 0 6px">LATEST SITE UPDATES</h3>${dprs.length?dprs.map(d=>`<div style="margin:6px 0"><span class="code">${fd(d.date)}</span><div style="overflow-wrap:anywhere">${esc(dprWork(d).replace(/\n/g,' · ').slice(0,220))}</div></div>`).join(''):'<div class="code">No updates yet.</div>'}</div>
      </div>
      ${photos.length&&canView('cphotos')?`<div style="display:flex;gap:6px;flex-wrap:wrap;padding:0 16px 14px">${photos.map(x=>`<a href="/_blob/${esc(x.id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(x.id)}" alt="Site photo ${esc(fd(x.date))}" style="width:96px;height:72px;object-fit:cover;border-radius:8px"></a>`).join('')}</div>`:''}
      ${cos.length?`<div style="padding:0 16px 14px"><h3 class="code" style="margin:0 0 6px">CHANGES WAITING FOR YOUR APPROVAL</h3>${cos.map(c=>`<div class="siteloc" style="padding:8px 0;border-top:1px solid var(--line)"><div style="flex:1;min-width:180px"><b>${esc(c.no)}</b> ${esc(c.desc)}<div class="code">Cost ${inr(c.amount)}${c.days?' · '+c.days+' days':''}</div></div>${CANW?`<button class="btn sm pri" data-coapp="${c.id}:Approved">${ico('check')}Approve</button><button class="btn sm" data-coapp="${c.id}:Rejected">Reject</button>`:''}</div>`).join('')}</div>`:''}
      <div class="grid2" style="padding:0 16px 14px">
        <div>${canView('cpay')?`<h3 class="code" style="margin:0 0 6px">PAYMENT STAGES</h3>`:''}${!canView('cpay')?'':ms.length?ms.map(m=>{const st=msStatus(m);return `<div class="siteloc" style="padding:5px 0;gap:8px"><span style="flex:1">${esc(m.stage)}</span><b>${inr(msAmount(m))}</b><span class="pill ${MS_PILL[st]}">${st}</span></div>`;}).join(''):'<div class="code">—</div>'}</div>
        <div>${canView('cdocs')?`<h3 class="code" style="margin:0 0 6px">APPROVED DRAWINGS</h3>`:''}${!canView('cdocs')?'':docs.length?docs.map(d=>`<div style="margin:4px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center">${esc(d.title)} <span class="code">${esc(d.rev||'')}</span>${(d.files||[]).map(f=>`<a class="btn sm" href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico('file-text')}Open</a>`).join('')}${d.link?`<a class="btn sm" href="${esc(d.link)}" target="_blank" rel="noopener noreferrer">${ico('external-link')}Open</a>`:''}</div>`).join(''):'<div class="code">—</div>'}
          ${cams.length&&canView('cctv')?`<button class="btn sm" data-go="cctv" style="margin-top:8px">${ico('cctv')}Watch site cameras (${cams.length})</button>`:''}</div></div></div>`;
  }).join('');
}
function previewBar(){return `<div class="note" style="background:var(--blue);color:var(--blue-ink)">${ico('eye')}<span style="flex:1"><b>Previewing as ${S.viewAsPerson?esc(((D.team.find(t=>t.id===S.viewAsPerson)||{}).name||'')+' ('+S.viewAs+')'):esc(S.viewAs)}.</b> This is what someone with this role sees (all projects shown for the preview).</span><button class="btn sm" data-viewas="">Stop preview</button></div>`;}

/* ================= Quick add (phone-friendly site entries) ================= */
const QUICK=[['dprauto','notebook-pen','Today\'s daily report'],['attbulk','calendar-check','Mark attendance'],['received','package-plus','Material received'],['issue','package-minus','Material issue'],['requests','arrow-left-right','Request material'],['issues','alert-triangle','Issue / snag'],['tasks','list-checks','Task'],['workupd','hammer','Work update'],['payments','indian-rupee','Payment'],['equiplog','gauge','Equipment usage']];
function runQuick(k){
  closeLayer();
  if(k==='dprauto'){const pid=S.proj!=='all'?S.proj:(PJ()[0]||{}).id;if(!pid){toast('Create a project first.');return;}autoDpr(pid,today());return;}
  if(k==='attbulk'){S.view='attbulk';render();scrollTo(0,0);return;}
  openForm(k);
}

/* ================= Bulk attendance (one screen for the whole gang) ================= */
const ATT={date:null,pid:null,marks:{},ot:{}};
/* → extras: vAttBulk */
/* → extras: saveAttBulk */

/* ================= Auto daily report ================= */
function buildDpr(pid,date){
  const on=c=>D[c].filter(x=>x.project===pid&&x.date===date);
  const att=on('attendance'),vl=on('vlabour'),rec=on('received'),iss=on('issue'),con=on('consumed'),wu=on('workupd'),eq=on('equiplog');
  const pres=att.filter(a=>a.status==='Present').length,half=att.filter(a=>a.status==='Half day').length;
  const trades={};att.filter(a=>a.status!=='Absent').forEach(a=>{const t=(D.labour.find(l=>l.id===a.labour)||{}).trade||'Worker';trades[t]=(trades[t]||0)+(a.status==='Half day'?.5:1);});
  const L=[];
  if(wu.length){L.push('Work done:');wu.forEach(w=>L.push(`• ${w.work}${w.qty?` — ${num(w.qty)} ${w.unit||''}`:''}${w.gang?` (${w.gang})`:''}`));}
  const prog=D.tasks.filter(t=>t.project===pid&&t.status==='In progress');
  if(prog.length){L.push('Activities in progress:');prog.forEach(t=>L.push(`• ${t.title} — ${+t.progress||0}%`));}
  if(false&&(att.length||vl.length)){L.push('Manpower:');if(att.length)L.push(`• Own labour: ${pres} present${half?`, ${half} half day`:''} (${Object.entries(trades).map(([t,c])=>`${t} ${c}`).join(', ')})`);vl.forEach(v=>L.push(`• ${vname(v.vendor)}: ${v.count} ${v.trade||'workers'}`));}
  if(false&&rec.length){L.push('Material received:');rec.forEach(r=>L.push(`• ${r.material} ${num(r.qty)} ${r.unit||''}${r.vendor?` from ${vname(r.vendor)}`:''}`));}
  if(iss.length){L.push('Material issued:');iss.forEach(r=>L.push(`• Issued ${r.material} ${num(r.qty)} ${r.unit||''}${r.to?` to ${r.to}`:''}`));}if(false){con.forEach(r=>L.push(`• Consumed ${r.material} ${num(r.qty)} ${r.unit||''}${r.work?` for ${r.work}`:''}`));}
  if(eq.length){L.push('Equipment:');eq.forEach(e=>L.push(`• ${ename(e.equip)} ${num(e.hours)} hrs${e.work?` — ${e.work}`:''}`));}
  const nd=new Date(date+'T00:00');nd.setDate(nd.getDate()+1);const tm=isoDate(nd);
  const plan=D.tasks.filter(t=>t.project===pid&&t.status!=='Completed'&&(t.start||'')<=tm&&(t.due||'9')>=tm).map(t=>`• ${t.title}`);
  const hin=[...D.issues.filter(i=>i.project===pid&&i.status!=='Resolved'&&i.severity==='High').map(i=>`• ${i.title}`),...D.requests.filter(r=>r.project===pid&&r.status==='Pending').map(r=>`• Waiting for ${r.material} (${num(r.qty)} ${r.unit||''})`)];
  const photos=[...wu.flatMap(w=>w.photos||[]),...D.issues.filter(i=>i.project===pid&&i.due===date).flatMap(i=>i.photos||[])];
  const crew={},tmap=t=>{t=String(t||'').toLowerCase();return /mason|brick/.test(t)?'Mason':/carpen|shutter/.test(t)?'Carpenter':/bar ?bend|steel|fitter/.test(t)?'Bar bender':/electric/.test(t)?'Electrician':/plumb/.test(t)?'Plumber':/paint/.test(t)?'Painter':/tile|floor|granite|marble/.test(t)?'Tiles / flooring':/help|cool|labou?r|worker|mazdoor|kuli/.test(t)?'Helper / coolie':'Other';};
  Object.entries(trades).forEach(([t,c])=>{const k=tmap(t);crew[k]=(crew[k]||0)+c;});vl.forEach(v=>{const k=tmap(v.trade);crew[k]=(crew[k]||0)+(+v.count||0);});
  const mats=[...rec.map(r=>({item:r.material,qty:+r.qty||'',unit:r.unit||'',kind:'Received'})),...con.map(r=>({item:r.material,qty:+r.qty||'',unit:r.unit||'',kind:'Used'}))].filter(x=>x.item);
  return {work:L.join('\n')||'',plan:plan.join('\n'),hindrance:hin.join('\n'),photos,crew,mats};
}
function autoDpr(pid,date){
  const ex=D.dpr.find(d=>d.project===pid&&d.date===date);
  const b=buildDpr(pid,date);
  if(ex){toast('A report for today already exists — opening it with the latest figures added below.');openForm('dpr',ex.id);setTimeout(()=>{const w=document.getElementById('f-work');if(w&&b.work&&!w.value.includes(b.work.slice(0,30)))w.value=(w.value?w.value+'\n\n':'')+b.work;
    const cb=document.getElementById('f-crew');if(cb){Object.entries(b.crew||{}).forEach(([t,c])=>{const i=cb.querySelector(`input[data-trade="${CSS.escape(t)}"]`);if(i&&!(+i.value>0))i.value=c;});cb.dispatchEvent(new Event('input',{bubbles:true}));}
    const mb=document.getElementById('f-mats');if(mb){const have=new Set([...mb.querySelectorAll('.mr-row')].map(rw=>rw.querySelector('[data-m=item]').value.trim().toLowerCase()+'|'+rw.querySelector('[data-m=kind]').value));
      (b.mats||[]).filter(x=>!have.has(x.item.trim().toLowerCase()+'|'+x.kind)).forEach(x=>{const empty=[...mb.querySelectorAll('.mr-row')].find(rw=>!rw.querySelector('[data-m=item]').value.trim()&&!rw.querySelector('[data-m=qty]').value.trim());
        if(empty)empty.outerHTML=mrRow(x);else mb.querySelector('[data-mradd]').insertAdjacentHTML('beforebegin',mrRow(x));});}},50);return;}
  openForm('dpr',null,{project:pid,date,_carry:1,items:b.work?[{trade:'Other',work:b.work}]:[],work:'',planItems:b.plan?[{trade:'Other',work:b.plan}]:[],hindrance:b.hindrance,photos:b.photos,crew:b.crew,mats:b.mats});
  toast('Report built from today\'s entries. Check it, add remarks and photos, then Save.');
}

/* ================= Quality gates (checklists before a task can be completed) ================= */
function gateMissing(task){
  return (task.gates||[]).filter(tid=>!D.forms.some(f=>f.project===task.project&&f.tpl===tid&&f.status==='Approved'&&(!f.task||f.task===task.id))).map(tid=>(tplById(tid)||{title:tid}).title);
}
const tplName=id=>(tplById(id)||{title:id}).title.replace(/^Checklist for /,'');

/* ================= Payment milestones ================= */
const MS_PILL={'Upcoming':'p-grey','Due':'p-amber','Invoiced':'p-blue','Paid':'p-green'};
function msAmount(m){if(n(m.amount))return n(m.amount);const p=proj(m.project);return n(m.pct)*n(p&&p.value)/100;}
function msStatus(m){
  if(m.inv){const i=D.invoices.find(x=>x.id===m.inv);if(i&&i.status==='Paid')return 'Paid';if(i)return 'Invoiced';}
  const t=D.tasks.find(x=>x.id===m.task);
  if(t&&(t.status==='Completed'))return 'Due';
  if(!m.task&&m.due&&m.due<=today())return 'Due';
  return 'Upcoming';
}
function msDueDate(m){const t=D.tasks.find(x=>x.id===m.task);return (t&&t.due)||m.due||'';}
function raiseInvoice(mid){
  const m=D.milestones.find(x=>x.id===mid);if(!m)return;const p=proj(m.project)||{};
  openForm('invoices',null,{kind:'Tax invoice',project:m.project,client:p.client||'',no:nextInvNo('Tax invoice'),date:today(),desc:`Stage payment: ${m.stage}${m.pct?` (${m.pct}% of contract value)`:''} — ${p.name||''}`,amount:msAmount(m),gst:'GST 18%',sac:orgVal('sac')||'995411',status:'Unpaid',_ms:mid});
}

/* ================= Alerts ================= */
/* a project whose date was removed (no start date) is paused: none of its tasks or calendar work raise alerts */
const projLive=pid=>{if(!pid)return true;const p=proj(pid);return !p||!!p.start;};
function computeAlerts(){
  const t=today(),A_=[];const add=(sev,txt,view,pid,d,who)=>{if(canView(view)&&(!pid||projOK(pid)))A_.push({sev,txt,view,pid,d:d||'',who:who||''});};
  const bossA=isAdmin()||curRole()==='Project manager';
  try{if(isAdmin()&&S.cloud){if(!SHR.data)setTimeout(()=>shrLoad(),0);((SHR.data||{}).invites||[]).forEach(x=>A_.push({sev:'med',txt:`${x.from} wants to share project ${x.name} with you — accept on Projects`,view:'projects',pid:'',d:'',who:''}));}}catch(_){}
  // a task made from Calendar work alerts only while that work is still on the calendar; tasks of a project with no date never alert
  const calLive=x=>{if(!projLive(x.project))return false;if(!x.calId)return true;return (D.cal||[]).some(c=>c.id===x.calId);};
  D.tasks.filter(x=>x.status!=='Completed'&&x.status!=='For review'&&x.due&&x.due<t&&calLive(x)&&(bossA||x.who===ME.id)).forEach(x=>add('high',`Task late: ${x.title} (due ${fd(x.due)})${x.who&&bossA?' — '+pnm(x.who):''}`,canView('tasks')?'tasks':'myday',x.project,x.due,x.who));
  (D.dtasks||[]).filter(x=>x.status!=='Completed'&&x.status!=='For review'&&x.due&&x.due<t&&calLive(x)&&x.who===ME.id).forEach(x=>add('high',`Design task late: ${x.title} (due ${fd(x.due)})`,canView('designsched')?'designsched':'myday',x.project,x.due,x.who));
  D.tasks.filter(x=>x.status!=='Completed'&&n(x.progress)>=100&&gateMissing(x).length).forEach(x=>add('med',`${x.title}: waiting for approved ${gateMissing(x).join(', ')}`,'forms',x.project));
  D.issues.filter(x=>x.status!=='Resolved'&&(x.severity==='High'||(x.due&&x.due<t))).forEach(x=>add('high',`${x.kind||'Issue'}: ${x.title}${x.due&&x.due<t?' — overdue':''}`,'issues',x.project,x.due,x.who));
  D.leads.filter(l=>l.follow&&l.follow<=t&&!['Won','Lost'].includes(l.stage)).forEach(l=>add('med',`Follow up lead: ${l.name} (${l.phone})`,'leads','',l.follow,l.who));
  stock().filter(s=>s.received>0&&s.store<=s.received*0.1).forEach(s=>add('med',`Low stock: ${s.material} — ${num(s.store)} ${s.unit} left`,'inventory',s.project));
  if(isAdmin())pendingJoins().forEach(r=>A_.push({sev:'high',txt:`Login code sent to a new person: ${r.name||r.email}${r.role?' — '+r.role:''} (${r.email}${r.phone?', '+r.phone:''})`,view:'team'}));
  D.requests.filter(r=>r.status==='Pending').forEach(r=>add('med',`Material request pending: ${r.material} ${num(r.qty)} ${r.unit||''}${r.needBy?` by ${fd(r.needBy)}`:''}`,'requests',r.project,r.needBy));
  D.forms.filter(f=>f.status==='Submitted').forEach(f=>{if(isAdmin())add('med',`Checklist waiting for your approval: ${f.title}`,'forms',f.project);});
  D.documents.filter(d=>d.status==='For approval').forEach(d=>add('med',`Drawing for approval: ${d.title} ${d.rev||''}`,'documents',d.project));
  D.changes.filter(c=>c.status==='Requested').forEach(c=>add('med',`Change order ${c.no} waiting for approval (${inr(c.amount)})`,'changes',c.project));
  D.invoices.filter(i=>(i.kind==='Tax invoice'||i.kind==='RA bill')&&i.status!=='Paid'&&i.date&&(Date.now()-new Date(i.date+'T00:00'))>15*864e5).forEach(i=>add('high',`Payment overdue: ${i.no} — ${inr(invTotal(i)-n(i.got))} from ${cname(i.client)}`,'invoices',i.project,i.date));
  D.milestones.filter(m=>msStatus(m)==='Due').forEach(m=>add('high',`Stage reached — raise invoice: ${m.stage} (${inr(msAmount(m))})`,'milestones',m.project));
  D.cameras.filter(c=>c.status==='Offline'&&camAllowed(c)).forEach(c=>add('low',`Camera offline: ${c.name}`,'cctv',c.project));
  rateHistory().filter(r=>r.jump>=10).forEach(r=>add('low',`Price up ${r.jump}%: ${r.material} now ${inr(r.last)}/${r.unit} (avg ${inr(r.avg)})`,'reports'));
  const o={high:0,med:1,low:2};return A_.sort((a,b)=>o[a.sev]-o[b.sev]);
}
/* ================= Alerts: two tabs (Needs action / Updates), type chips, search, sort ================= */
const AL={tab:'act',cat:'',sort:'urgent',q:'',unread:false,snap:0};
const AL_CAT={tasks:'Tasks',designsched:'Tasks',myday:'Tasks',issues:'Site',inventory:'Site',requests:'Site',cctv:'Site',forms:'Approvals',documents:'Approvals',changes:'Approvals',invoices:'Money',milestones:'Money',reports:'Money',leads:'Sales',team:'Team'};
const AL_ICO={Tasks:'list-checks',Site:'hard-hat',Approvals:'clipboard-check',Money:'indian-rupee',Sales:'target',Team:'users',Reviews:'eye',Drawings:'pencil-ruler',Assigned:'calendar-check',Other:'bell'};
const alUpdCat=a=>['review','returned','approved','comment'].includes(a.action)?'Reviews':['uploaded','updated'].includes(a.action)?'Drawings':['assigned','scheduled'].includes(a.action)?'Assigned':'Other';
const alAgo=t=>{const m=Math.round((Date.now()-t)/6e4);return m<1?'just now':m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':m<2880?'yesterday':fd(new Date(t).toISOString().slice(0,10));};
function alItems(){const t=today();
  const act=computeAlerts().filter(a=>S.proj==='all'||!a.pid||a.pid===S.proj).map((a,i)=>({k:'a'+i,sev:a.sev,txt:a.txt,pid:a.pid||'',cat:AL_CAT[a.view]||'Other',when:a.d||'',who:a.who||'',
    meta:a.d?(a.d<t?'Since '+fd(a.d):fd(a.d)):'',btn:`<button class="btn sm" data-alertgo="${a.view}|${a.pid||''}">Open</button>`}));
  const go=a=>a.col==='stdlib'?'stdlib':a.col==='documents'?'documents':a.col==='dtasks'?'designsched':a.col==='tasks'?'tasks':a.col==='cal'?'calendar':'dashboard';
  const upd=bellActs().filter(a=>S.proj==='all'||!a.project||a.project===S.proj).map(a=>({k:'u'+a.at,sev:a.action==='returned'?'high':a.action==='review'?'med':'low',txt:a.summary,pid:a.project||'',cat:alUpdCat(a),at:a.at,isNew:a.at>AL.snap,who:a.by||'',
    meta:pnm(a.by)+' · '+alAgo(a.at),btn:TR_COLS.includes(a.col)&&a.ref&&trRec(a.col,a.ref)?`<button class="btn sm" data-tropen="${a.col}|${esc(a.ref)}">Open</button>`:canView(go(a))?`<button class="btn sm" data-alertgo="${go(a)}|${esc(a.project||'')}">Open</button>`:''}));
  return {act,upd};}
function alRow(x){return `<div class="al-row sev-${x.sev} ${x.isNew?'new':''}">${x.isNew?'<i class="bell-dot" aria-label="New"></i>':''}<span class="al-ic">${ico(AL_ICO[x.cat]||'bell')}</span>
  <div class="al-tx"><div>${esc(x.txt)}</div><div class="code">${x.cat}${x.pid?' · '+esc(pname(x.pid)):''}${x.meta?' · '+esc(x.meta):''}</div></div>${x.btn}</div>`;}
function vAlerts(){
  const {act,upd}=alItems(),tab=AL.tab==='upd'?'upd':'act',all=tab==='act'?act:upd,nNew=upd.filter(x=>x.isNew).length;
  const q=(AL.q||'').trim().toLowerCase();
  const base=all.filter(x=>(!AL.unread||tab!=='upd'||x.isNew)&&(!q||(x.txt+' '+pname(x.pid)+' '+x.meta+' '+(x.who?pnm(x.who)+' '+teamRole(x.who):'')).toLowerCase().includes(q)));
  const cats=[...new Set(base.map(x=>x.cat))];const cat=cats.includes(AL.cat)?AL.cat:'';
  const xs=base.filter(x=>!cat||x.cat===cat);
  const so={high:0,med:1,low:2},sort=AL.sort||'urgent';
  const byWhen=(a,b)=>tab==='upd'?b.at-a.at:(a.when||'9999').localeCompare(b.when||'9999');
  let groups;
  if(sort==='project'){const m={};xs.forEach(x=>(m[x.pid||'']=m[x.pid||'']||[]).push(x));groups=Object.keys(m).sort((a,b)=>(a?pname(a):'~').localeCompare(b?pname(b):'~')).map(k=>[k?pname(k):'General',m[k].sort((a,b)=>so[a.sev]-so[b.sev]||byWhen(a,b))]);}
  else if(sort==='person'||sort==='team'){const none=tab==='act'?'Not assigned to anyone':'System',key=x=>!x.who?'~':sort==='person'?pnm(x.who)+'\u0001'+x.who:(teamRole(x.who)||'Other');const m={};xs.forEach(x=>(m[key(x)]=m[key(x)]||[]).push(x));
    groups=Object.keys(m).sort((a,b)=>(a==='~')-(b==='~')||a.localeCompare(b)).map(k=>{const xs2=m[k].sort((a,b)=>so[a.sev]-so[b.sev]||byWhen(a,b)),nm0=k==='~'?none:k.split('\u0001')[0];
      const sub=k==='~'?'':sort==='person'?teamRole(xs2[0].who):(n=>n+(n===1?' person':' people'))(new Set(xs2.map(x=>x.who)).size);return [nm0+(sub?' · '+sub:''),xs2];});}
  else if(sort==='type'){const m={};xs.forEach(x=>(m[x.cat]=m[x.cat]||[]).push(x));groups=Object.keys(m).sort().map(k=>[k,m[k].sort((a,b)=>so[a.sev]-so[b.sev]||byWhen(a,b))]);}
  else if(sort==='newest'||tab==='upd'&&sort==='urgent'){const ys=[...xs].sort((a,b)=>tab==='upd'?b.at-a.at:(b.when||'').localeCompare(a.when||''));
    if(tab==='upd'){const d0=new Date();d0.setHours(0,0,0,0);const t0=d0.getTime(),y0=t0-864e5;groups=[['Today',ys.filter(x=>x.at>=t0)],['Yesterday',ys.filter(x=>x.at<t0&&x.at>=y0)],['Earlier',ys.filter(x=>x.at<y0)]];}
    else groups=[['Newest first',ys]];}
  else groups=[['Urgent',xs.filter(x=>x.sev==='high')],['Needs attention',xs.filter(x=>x.sev==='med')],['For information',xs.filter(x=>x.sev==='low')]].map(([g,a])=>[g,a.sort(byWhen)]);
  groups=groups.filter(g=>g[1].length);
  const cnt=sv=>act.filter(a=>a.sev===sv).length;
  const txt=`*${orgName()} — daily summary ${fd(today())}*\n\n`+(act.length?act.slice(0,25).map(a=>`${a.sev==='high'?'🔴':a.sev==='med'?'🟠':'⚪'} ${a.txt}${a.pid?` [${(proj(a.pid)||{}).prefix||''}]`:''}`).join('\n'):'All clear — nothing pending.');
  const sorts=tab==='act'?[['urgent','Most urgent'],['newest','Latest date'],['person','By person'],['team','By team / role'],['project','By project'],['type','By type']]:[['urgent','Newest'],['person','By person (who did it)'],['team','By team / role'],['project','By project'],['type','By type']];
  const empty=tab==='act'?`<div class="box hero-empty">${ico('check')}<h2>${q||cat?'Nothing matches':'All clear'}</h2><p>${q||cat?'Try another word or type.':'No late tasks, pending approvals, dues or low stock right now.'}</p></div>`
    :`<div class="box hero-empty">${ico('bell')}<h2>${AL.unread?'No new updates':'No updates yet'}</h2><p>Drawings, reviews and work given to you in the last 14 days show here.</p></div>`;
  if(tab==='upd')setTimeout(()=>{if(S.view!=='alerts'||AL.tab!=='upd')return;try{localStorage.setItem(ACT_SEEN_K(),String(Date.now()));}catch(_){}},1500);   // opened → read (the dots stay until you leave)
  const more=S.proj!=='all'?bellCount('all')-bellCount(S.proj):0;
  return header(label('alerts'))+(more>0?`<div class="note">${ico('filter')}<span style="flex:1">Showing <b data-notr>${esc(pname(S.proj))}</b> only. <b>${more}</b> more alert${more===1?'':'s'} in other projects.</span><button type="button" class="btn sm" data-alall="1">Show all projects</button></div>`:'')+
  `<div class="al-sum">
    <button type="button" class="al-t ${tab==='act'?'on':''}" data-altab="act"><b>Needs action</b><span>${cnt('high')?`<i class="pill p-red">${cnt('high')} urgent</i>`:''}${cnt('med')?`<i class="pill p-amber">${cnt('med')} soon</i>`:''}${!act.length?'<i class="pill p-green">All clear</i>':''}${cnt('low')?`<i class="pill p-grey">${cnt('low')} info</i>`:''}</span></button>
    <button type="button" class="al-t ${tab==='upd'?'on':''}" data-altab="upd"><b>Recent updates</b><span>${nNew?`<i class="pill p-blue">${nNew} new</i>`:''}<i class="pill p-grey">${upd.length>=60?'latest 60':upd.length+' in 14 days'}</i></span></button>
  </div>
  <div class="box"><div class="al-bar">
    <label class="al-q">${ico('search')}<input type="search" id="alQ" placeholder="Search alerts, people, projects" value="${esc(AL.q||'')}" aria-label="Search alerts"></label>
    <label class="al-s">Sort <select id="alSort" aria-label="Sort by">${sorts.map(([v,l])=>`<option value="${v}" ${sort===v?'selected':''}>${l}</option>`).join('')}</select></label>
    ${tab==='upd'?`<label class="al-u"><input type="checkbox" id="alUnread" ${AL.unread?'checked':''}> New only</label><button type="button" class="btn sm ghost" data-alread>${ico('check')}Mark all read</button>`:''}
  </div>
  ${cats.length>1?`<div class="al-chips"><button type="button" class="chip ${!cat?'on':''}" data-alcat="">All · ${base.length}</button>${cats.sort().map(c=>`<button type="button" class="chip ${cat===c?'on':''}" data-alcat="${c}">${ico(AL_ICO[c]||'bell')}${c} · ${base.filter(x=>x.cat===c).length}</button>`).join('')}</div>`:''}
  ${groups.length?groups.map(([g,a])=>`<div class="al-g">${esc(g)}<span class="code">${a.length}</span></div>${a.map(alRow).join('')}`).join(''):''}</div>
  ${groups.length?'':empty}
  ${tab==='act'?`<div class="al-share"><span class="code">Share today's list</span><a class="btn sm" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener noreferrer">${ico('message-circle')}WhatsApp</a><button type="button" class="btn sm" data-sharesum="${esc(txt)}">${ico('share-2')}<span>Share or save</span></button>${isAdmin()?`<button type="button" class="btn sm" data-shareupd>${ico('notebook-pen')}<span>Today's site update</span></button>`:''}</div>`:''}`;
}
let alQT=0;function alQRender(){if(S.view!=='alerts')return;const i0=document.getElementById('alQ'),had=document.activeElement===i0,pos=i0?i0.selectionStart:null;render();const i=document.getElementById('alQ');if(i&&had){i.focus();try{i.setSelectionRange(pos,pos);}catch(_){}}}
document.addEventListener('input',e=>{if(S.view!=='alerts'||!e.target||e.target.id!=='alQ')return;AL.q=e.target.value;if(e.isComposing)return;clearTimeout(alQT);alQT=setTimeout(alQRender,250);});   // waits for the word (phone/Telugu keyboards)
document.addEventListener('compositionend',e=>{if(S.view!=='alerts'||!e.target||e.target.id!=='alQ')return;AL.q=e.target.value;clearTimeout(alQT);alQT=setTimeout(alQRender,250);});
document.addEventListener('change',e=>{if(S.view!=='alerts'||!e.target)return;if(e.target.id==='alSort'){AL.sort=e.target.value;render();}else if(e.target.id==='alUnread'){AL.unread=e.target.checked;render();}});
document.addEventListener('click',e=>{if(S.view!=='alerts')return;const al=e.target.closest&&e.target.closest('[data-alall]');if(al){S.proj='all';try{localStorage.setItem('bm-proj','all');}catch(_){}render();return;}const b=e.target.closest&&e.target.closest('[data-altab],[data-alcat],[data-alread]');if(!b)return;
  if(b.dataset.altab){AL.tab=b.dataset.altab;AL.cat='';AL.sort='urgent';}else if(b.hasAttribute('data-alread')){AL.snap=Date.now();try{localStorage.setItem(ACT_SEEN_K(),String(AL.snap));}catch(_){}}else AL.cat=b.dataset.alcat;render();});

/* ================= Material rate history ================= */
function rateHistory(){
  const m={};D.received.filter(r=>n(r.rate)&&r.material&&(S.proj==='all'||r.project===S.proj)).sort((a,b)=>(a.date||'').localeCompare(b.date||'')).forEach(r=>{const k=(r.material.trim().toLowerCase())+'|'+(r.unit||'');(m[k]=m[k]||{material:r.material.trim(),unit:r.unit||'',rows:[]}).rows.push(r);});
  return Object.values(m).map(x=>{const rs=x.rows.map(r=>n(r.rate));const last=rs[rs.length-1],avg=rs.reduce((s,v)=>s+v,0)/rs.length;
    return {...x,last,avg,min:Math.min(...rs),max:Math.max(...rs),count:rs.length,lastDate:x.rows[x.rows.length-1].date,lastVendor:vname(x.rows[x.rows.length-1].vendor),jump:rs.length>1?Math.round((last-avg)/avg*100):0};});
}

/* ================= Cash flow forecast ================= */
/* → reports: cashFlow */

/* ================= GST helpers ================= */
const orgVal=k=>((D.org.find(o=>o.id==='main')||{})[k]||'');
const GSTIN_RE=/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
function fyStr(d){const x=new Date((d||today())+'T00:00');const y=x.getMonth()>=3?x.getFullYear():x.getFullYear()-1;return `${y}-${String((y+1)%100).padStart(2,'0')}`;}
function nextInvNo(kind){
  const pre={'Tax invoice':orgVal('invPrefix')||'INV','Quotation':'QT','Proforma invoice':'PI','RA bill':'RA'}[kind]||'INV';
  const fy=fyStr(today());const re=new RegExp('^'+pre.replace(/[^\w]/g,'\\$&')+'/'+fy+'/(\\d+)$');
  const mx=D.invoices.reduce((m,i)=>{const r=String(i.no||'').match(re);return r?Math.max(m,+r[1]):m;},0);
  return `${pre}/${fy}/${String(mx+1).padStart(3,'0')}`;
}
/* → reports: gstSplit */

/* ================= Change history (audit log) ================= */
function audit(action,col,id,summary){
  if(S.demo||!db)return;
  try{db.collection('audit').add({at:Date.now(),by:ME.id,action,col,ref:id||'',summary:String(summary||'').slice(0,300)});}catch(_){}
}
/* → extras: vAudit */
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.audf)return;S[t.dataset.audf]=t.value;render();});
document.addEventListener('click',e=>{if(!e.target.closest||!e.target.closest('[data-audcsv]'))return;
  const q=(S.q||'').toLowerCase(),days=+S.audD||0,cell=v=>{v=String(v??'');if(/^[=+\-@]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';};
  const rows=D.audit.slice().sort((a,b)=>(b.at||0)-(a.at||0)).filter(r=>(!q||JSON.stringify(r).toLowerCase().includes(q)||nm(r.by).toLowerCase().includes(q))&&(!S.audBy||r.by===S.audBy)&&(!S.audCol||r.col===S.audCol)&&(!S.audAct||r.action===S.audAct)&&(!days||Date.now()-(+r.at||0)<days*864e5));
  const csv=['When,Who,Action,Section,Details',...rows.map(r=>[new Date(+r.at||0).toLocaleString('en-IN'),nm(r.by),r.action,MOD[r.col]?MOD[r.col].label:r.col,r.summary].map(cell).join(','))].join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'}));a.download=`${orgName()} change history ${today()}.csv`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);});
const recLabel=(c,r)=>String(r.name||r.title||r.material||r.no||r.stage||(c==='dpr'?dprWork(r):r.work)||r.desc||(r.amount?inr(r.amount):'')||'').slice(0,80);

/* ================= Project templates ================= */
const PTPL={
  'G+1 house':{floors:1,days:240},'G+2 house':{floors:2,days:300},'Duplex villa':{floors:1,days:270,villa:1},'Commercial G+3':{floors:3,days:420,comm:1},
};
function tplStages(name){
  const c=PTPL[name];if(!c)return [];
  const fl=['GF','FF','SF','TF'].slice(0,c.floors+1);
  const S_=[['1','Site clearing, survey & setting out',4,['qc-sur']],['2','Footing excavation',7,['cl-exc']],['3','Anti-termite & PCC',4,['cl-att','cl-pcc']],['4','Footings & column starters',12,['cl-ren','cl-sht','cl-pre']],['5','Plinth beams & backfilling',10,['cl-con','qc-ewb']]];
  fl.slice(0,-1).forEach((f,i)=>{const nx=fl[i+1];S_.push([`${6+i*2}`,`${f} columns`,10,['cl-ren','cl-sht']],[`${7+i*2}`,`${f} roof slab & beams (${nx} floor slab)`,16,['cl-pre','cl-con']]);});
  const last=fl[fl.length-1];
  S_.push([`${6+(fl.length-1)*2}`,`${last} roof slab & headroom`,16,['cl-pre','cl-con']]);
  const base=S_.length;
  [['Brickwork / blockwork',35,['cl-msn']],['Electrical conduits & plumbing lines',20,['qc-ele','qc-wsl']],['Internal & external plastering',35,['cl-pls']],['Flooring & wall tiling',30,['cl-til']],['Doors, windows & fabrication',20,['qc-fab']],['Painting',25,['cl-pnt']],['Sanitary & electrical fixtures',12,['qc-wsl','qc-ele']],['Cleaning & handover',5,[]]].forEach((x,i)=>S_.push([String(base+1+i),...x]));
  if(c.comm)S_.splice(S_.length-1,0,[String(S_.length),'False ceiling & interiors',25,['qc-fc','qc-int']]);
  return S_;
}
const MS_STD=[['Booking / agreement',10,null],['Foundation & plinth complete',15,'Plinth'],['Roof slab',15,'roof slab'],['Brickwork complete',15,'Brickwork'],['Plastering complete',15,'plastering'],['Flooring & tiling complete',15,'Flooring'],['Handover',15,'handover']];
const BUDGET_STD=[['Material',55],['Labour',20],['Sub-contract',12],['Equipment',3],['Site expense',3],['Design & approvals',2]];
async function seedProject(pid,name,start,value){
  const st=tplStages(name);if(!st.length)return;
  let d=new Date((start||today())+'T00:00');const ids=[];
  for(const [wbs,title,dur,gates] of st){
    const s=isoDate(d);const e=new Date(d);e.setDate(e.getDate()+dur-1);
    let id=null;await write(async()=>{const r=await db.collection('tasks').add({project:pid,wbs,title,start:s,due:isoDate(e),progress:0,status:'Not started',gates,source:'Template: '+name,by:ME.id,at:Date.now()});id=r.id;});
    ids.push({id,title});d=new Date(e);d.setDate(d.getDate()+1);
  }
  const roofs=ids.filter(x=>/roof slab/i.test(x.title));
  for(const [stage,pct,match] of MS_STD){
    if(match==='roof slab'){for(const r of roofs)await write(()=>db.collection('milestones').add({project:pid,stage:r.title.replace(/ & .*/,'')+' cast',pct:Math.round(15/roofs.length*10)/10,task:r.id,by:ME.id,at:Date.now()}));continue;}
    const t=match?ids.find(x=>x.title.toLowerCase().includes(match.toLowerCase())):null;
    await write(()=>db.collection('milestones').add({project:pid,stage,pct,task:t?t.id:'',due:match?'':start||today(),by:ME.id,at:Date.now()}));
  }
  if(n(value))for(const [cat,pct] of BUDGET_STD)await write(()=>db.collection('budget').add({project:pid,cat,amount:Math.round(n(value)*pct/100),notes:`${pct}% of contract value (template)`,by:ME.id,at:Date.now()}));
  audit('created','projects',pid,`Template "${name}": ${st.length} activities, payment stages${n(value)?' and budget':''}`);
  toast(`Template added: ${st.length} activities with checklists, payment stages${n(value)?' and budget':''}`);
}

/* ================= Languages (English / Telugu / Hindi) ================= */
const LANGS=[['en','English'],['te','తెలుగు'],['hi','हिन्दी']];
const HI={dashboard:'डैशबोर्ड',projects:'प्रोजेक्ट',team:'टीम',leads:'लीड्स',invoices:'बिल और कोटेशन',clients:'ग्राहक',vendors:'विक्रेता',documents:'ड्रॉइंग व दस्तावेज़',survey:'साइट सर्वे',boq:'बीओक्यू',changes:'बदलाव आदेश',schedule:'कार्य अनुसूची',tasks:'काम',issues:'समस्याएं',dpr:'दैनिक रिपोर्ट',cctv:'लाइव कैमरे',cameras:'कैमरा सूची',inventory:'स्टॉक',po:'खरीद आदेश',received:'सामग्री प्राप्त',requests:'सामग्री मांग',issue:'सामग्री जारी',returned:'सामग्री वापसी',consumed:'सामग्री खपत',labour:'मज़दूर',attendance:'हाज़िरी',attbulk:'हाज़िरी लगाएं',wages:'मज़दूरी',advances:'अग्रिम',vlabour:'ठेकेदार मज़दूर',workupd:'काम अपडेट',equipment:'मशीनें',equiplog:'मशीन उपयोग',payments:'भुगतान',balances:'बकाया',budget:'बजट',budgetva:'बजट बनाम खर्च',milestones:'भुगतान चरण',reports:'सारांश व निर्यात',forms:'चेकलिस्ट व शीट',settings:'सेटिंग्स',alerts:'अलर्ट',client:'मेरा घर'};
const TE_X={attbulk:'హాజరు వేయండి',milestones:'చెల్లింపు దశలు',alerts:'అలర్ట్‌లు',client:'నా ఇల్లు',team:'టీమ్'};
const GRP_TR={te:{'AI':'AI','Marketing & sales':'మార్కెటింగ్ & అమ్మకాలు','Marketing':'మార్కెటింగ్','Leads & pipeline':'లీడ్స్ & పైప్‌లైన్','Follow-ups':'ఫాలో-అప్‌లు','Estimates':'అంచనాలు','Campaigns':'ప్రచారాలు','Content & reviews':'కంటెంట్ & రివ్యూలు','Sales':'అమ్మకాలు','Project management':'ప్రాజెక్ట్ నిర్వహణ','Library':'లైబ్రరీ','Planning':'ప్లానింగ్','Progress & quality':'ప్రగతి & నాణ్యత','Reports & export':'నివేదికలు & ఎగుమతి','Site cameras':'సైట్ కెమెరాలు','Site resources':'సైట్ వనరులు','Material':'మెటీరియల్','Manpower':'కూలీలు','Equipment':'యంత్రాలు','Money':'డబ్బు'},
  hi:{'AI':'AI','Marketing & sales':'मार्केटिंग व बिक्री','Marketing':'मार्केटिंग','Leads & pipeline':'लीड्स व पाइपलाइन','Follow-ups':'फॉलो-अप','Estimates':'अनुमान','Campaigns':'कैंपेन','Content & reviews':'कंटेंट व रिव्यू','Sales':'बिक्री','Project management':'प्रोजेक्ट प्रबंधन','Library':'लाइब्रेरी','Planning':'योजना','Progress & quality':'प्रगति व गुणवत्ता','Reports & export':'रिपोर्ट व निर्यात','Site cameras':'साइट कैमरे','Site resources':'साइट संसाधन','Material':'सामग्री','Manpower':'मज़दूर','Equipment':'मशीनें','Money':'पैसा'}};
const WORDS={te:{'Add':'జోడించు','Save':'సేవ్','Cancel':'రద్దు','Edit':'మార్చు','Search':'వెతకండి','Total':'మొత్తం','Project':'ప్రాజెక్ట్','Date':'తేదీ','Status':'స్థితి','Material':'మెటీరియల్','Unit':'యూనిట్','Quantity':'పరిమాణం','Rate (₹ per unit)':'రేటు (₹ / యూనిట్)','Vendor':'వెండర్','Task':'పని','Assigned to':'ఎవరికి','Start date':'ప్రారంభ తేదీ','Due date':'గడువు తేదీ','Progress %':'ప్రగతి %','Notes':'గమనికలు','Issue':'సమస్య','Priority':'ప్రాధాన్యత','Fix by':'ఎప్పటికి సరిచేయాలి','Details':'వివరాలు','Photos':'ఫోటోలు','Weather':'వాతావరణం','Work done today':'ఈరోజు చేసిన పని','Plan for tomorrow':'రేపటి ప్లాన్','Hindrances':'అడ్డంకులు','Site photos':'సైట్ ఫోటోలు','Worker':'కూలీ','Attendance':'హాజరు','Overtime hours':'ఓవర్‌టైమ్ గంటలు','Name':'పేరు','Trade':'పని రకం','Daily wage (₹)':'రోజు కూలీ (₹)','Phone':'ఫోన్','Amount (₹)':'మొత్తం (₹)','Type':'రకం','Mode':'విధానం','Issued to (gang / sub-contractor)':'ఎవరికి ఇచ్చారు','For which work':'ఏ పనికి','Used for (e.g. GF slab)':'దేనికి వాడారు','Work item':'పని','Quantity done':'చేసిన పరిమాణం','Gang / contractor':'గ్యాంగ్ / కాంట్రాక్టర్','Headcount':'మనుషుల సంఖ్య','Labour contractor':'లేబర్ కాంట్రాక్టర్','Hours used':'వాడిన గంటలు','Diesel (litres)':'డీజిల్ (లీటర్లు)','Equipment':'యంత్రం','Needed by':'ఎప్పటికి కావాలి','Bill / challan no.':'బిల్ / చలాన్ నం.','entries':'ఎంట్రీలు','Quick add':'త్వరగా జోడించు'},
  hi:{'Add':'जोड़ें','Save':'सेव करें','Cancel':'रद्द करें','Edit':'बदलें','Search':'खोजें','Total':'कुल','Project':'प्रोजेक्ट','Date':'तारीख','Status':'स्थिति','Material':'सामग्री','Unit':'इकाई','Quantity':'मात्रा','Rate (₹ per unit)':'दर (₹ प्रति इकाई)','Vendor':'विक्रेता','Task':'काम','Assigned to':'किसको सौंपा','Start date':'शुरू तारीख','Due date':'अंतिम तारीख','Progress %':'प्रगति %','Notes':'नोट','Issue':'समस्या','Priority':'प्राथमिकता','Fix by':'कब तक ठीक करें','Details':'विवरण','Photos':'फोटो','Weather':'मौसम','Work done today':'आज किया गया काम','Plan for tomorrow':'कल की योजना','Hindrances':'रुकावटें','Site photos':'साइट फोटो','Worker':'मज़दूर','Attendance':'हाज़िरी','Overtime hours':'ओवरटाइम घंटे','Name':'नाम','Trade':'काम का प्रकार','Daily wage (₹)':'दैनिक मज़दूरी (₹)','Phone':'फ़ोन','Amount (₹)':'राशि (₹)','Type':'प्रकार','Mode':'तरीका','Issued to (gang / sub-contractor)':'किसको दिया','For which work':'किस काम के लिए','Used for (e.g. GF slab)':'किसमें लगा','Work item':'काम','Quantity done':'किया गया काम','Gang / contractor':'गैंग / ठेकेदार','Headcount':'लोगों की संख्या','Labour contractor':'लेबर ठेकेदार','Hours used':'घंटे','Diesel (litres)':'डीज़ल (लीटर)','Equipment':'मशीन','Needed by':'कब तक चाहिए','Bill / challan no.':'बिल / चालान नं.','entries':'एंट्री','Quick add':'जल्दी जोड़ें'}};
const trW=s=>LANG==='en'?s:((WORDS[LANG]||{})[s]||s);
const trG=s=>LANG==='en'?s:((GRP_TR[LANG]||{})[s]||s);

/* ================= Backup & restore ================= */
/* → admin: backupXlsx */
/* → admin: backupJson */
/* → admin: restoreJson */

/* ================= Marketing ================= */
const STAGES_L=['New','Contacted','Site visit','Quotation sent','Negotiation','Won','Lost'];
const SEQ=[1,3,7,15];
const DEFAULT_TPL={
  'First reply':'Namaste {name} 🙏\nThank you for contacting {company}. We design and build houses end-to-end — planning, structure, construction and handover.\nWhen is a good time to call you to understand your plot and requirement?\n— {me}, {company} ({myphone})',
  'Brochure':'Hi {name}, here is our brochure with packages, specifications and completed homes: {brochure}\nHappy to explain any part on a call.',
  'Site visit confirmation':'Hi {name}, your site visit is confirmed for {date} at {time}.\nLocation: {place}\nOur engineer {who} will meet you. — {company}',
  'Site visit reminder':'Hi {name}, reminder: site visit today at {time} — {place}. See you there! — {company}',
  'Quotation follow-up':'Hi {name}, did you get a chance to look at the quotation we shared? We can walk you through the specifications or adjust the package to your budget.',
  'Follow-up day 1':'Hi {name}, thank you for your time yesterday. Sharing a few homes we built recently: {website}\nAny questions, just reply here.',
  'Follow-up day 3':'Hi {name}, many of our clients ask about payment stages and quality checks — we follow 19 stage-wise quality checklists and share live site photos and cameras. Shall I explain on a short call?',
  'Follow-up day 7':'Hi {name}, would you like to visit one of our running sites this week? Seeing the work quality in person helps a lot.',
  'Follow-up day 15':'Hi {name}, just checking in on your house plans. If timing has changed, no problem — tell us when to reconnect.',
  'Review request':'Hi {name}, thank you for trusting {company} with your home 🙏 If you are happy with our work, could you share a quick Google review? It helps other families: {review}',
  'Referral thanks':'Hi {name}, thank you for referring {lead} to us! 🙏 We will keep you updated, and your referral reward will be shared once the booking is done.',
  'Estimate':'Hi {name}, as discussed, your estimate for {area} sq.ft ({package}) comes to {amount}. Detailed estimate attached. Valid for 30 days. — {company}',
};
function tplText(kind,vars){
  const custom=D.wtpl.filter(t=>t.kind===kind).sort((a,b)=>(b.at||0)-(a.at||0))[0];
  let t=(custom&&custom.text)||DEFAULT_TPL[kind]||'';
  const base={company:orgName(),me:(ME.name||'').split(' ')[0]||'Team',myphone:orgVal('phone')||'',brochure:orgVal('brochure')||'(brochure link)',website:orgVal('website')||'(website)',review:orgVal('reviewLink')||'(Google review link)',...vars};
  return t.replace(/\{(\w+)\}/g,(m,k)=>base[k]!=null&&base[k]!==''?String(base[k]):m);
}
const waTo=(phone,text)=>`https://wa.me/${waNum(phone)}?text=${encodeURIComponent(text)}`;
const firstName=s=>String(s||'').replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.?)\s*/i,'').split(' ')[0];

/* ---- pipeline board ---- */
/* → marketing: vPipeline */
const inrShort=v=>{v=n(v);return v>=1e7?'₹'+(v/1e7).toFixed(2)+' Cr':v>=1e5?'₹'+(v/1e5).toFixed(1)+' L':inr(v);};
async function moveLead(id,stage,reason){
  const l=D.leads.find(x=>x.id===id);if(!l||l.stage===stage)return;
  if(stage==='Lost'&&!reason){openLostReason(id);return;}
  const upd={stage};if(stage==='Lost')upd.lostReason=reason;if(stage==='Won')upd.wonAt=Date.now();
  if(!l.contacted&&stage!=='New')upd.contacted=Date.now();
  if(stage==='Contacted'&&!l.seqStart){upd.seqStart=today();upd.follow=addDays(today(),1);}
  const ok=await write(()=>db.doc('leads/'+id).update(upd),`${l.name} → ${stage}`);
  if(ok)audit('edited','leads',id,`${l.name}: ${l.stage||'New'} → ${stage}${reason?' ('+reason+')':''}`);
  if(ok&&stage==='Won'&&canView('projects')&&CANW)toast(`${l.name} won! Use "Make project" in Leads to create the project.`);
}
function openLostReason(id){
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="lostForm" data-id="${id}" style="height:auto;margin:auto 0 auto auto">
    <div class="pane-h"><h2>Why was this lead lost?</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><div class="checks">${LOST_REASONS.map((r,i)=>`<label><input type="radio" name="lr" value="${r}" ${i===0?'checked':''}>${r}</label>`).join('')}</div></div>
    <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">Mark as Lost</button></div></form></div>`;
}
const addDays=(d,k)=>{const x=new Date(d+'T00:00');x.setDate(x.getDate()+k);return isoDate(x);};

/* ---- follow-ups (sequence) ---- */
function followQueue(){
  const t=today();const out=[];
  D.leads.filter(l=>!['Won','Lost'].includes(l.stage||'New')).forEach(l=>{
    if((l.stage||'New')==='New'){out.push({l,kind:'First reply',due:isoDate(new Date(l.at||Date.now())),why:'New enquiry — reply first'});return;}
    const sent=l.seq||[];
    if(l.seqStart){const nx=SEQ.find(d=>!sent.includes(d));if(nx){const due=addDays(l.seqStart,nx);if(due<=t)out.push({l,kind:`Follow-up day ${nx}`,step:nx,due,why:`Day ${nx} follow-up`});}}
    if(l.stage==='Quotation sent'&&l.follow&&l.follow<=t)out.push({l,kind:'Quotation follow-up',due:l.follow,why:'Quotation follow-up'});
    else if(l.follow&&l.follow<=t&&!out.some(o=>o.l===l))out.push({l,kind:'Follow-up day 7',due:l.follow,why:'Follow-up date reached'});
  });
  D.visits.filter(v=>v.date===t&&v.status==='Scheduled').forEach(v=>{const l=D.leads.find(x=>x.id===v.lead);if(l)out.push({l,kind:'Site visit reminder',due:t,why:`Site visit today ${v.time||''}`,visit:v});});
  return out.sort((a,b)=>a.due.localeCompare(b.due));
}
/* → marketing: vFollowups */
/* → marketing: followDone */

/* ---- estimate builder ---- */
const EST={pkg:'',area:'',floors:'G+1',extras:{},gst:true,lead:''};
const EXTRAS=[['Compound wall','rft',1800],['Sump (10,000 L)','nos',150000],['Borewell with motor','nos',180000],['Overhead tank','nos',45000],['Solar water heater','nos',65000],['Lift provision','nos',250000],['Modular kitchen','nos',350000],['Car parking shed','sqft',450]];
/* → marketing: vEstimator */
/* → marketing: vEstQuick */
function estCalc(){const p=D.packages.find(x=>x.id===EST.pkg)||{};const area=n(EST.area);const base=area*n(p.rate);const ex=EXTRAS.reduce((s,[,u,r],i)=>s+n(EST.extras[i])*r,0);const sub=base+ex;return {p,area,base,sub,gst:EST.gst?sub*0.18:0,total:sub*(EST.gst?1.18:1)};}
/* → marketing: estDoc */

/* ---- content library ---- */
/* → marketing: vContent */

/* ---- marketing dashboard ---- */
/* → marketing: vMktDash */
function campStats(c){
  const ls=D.leads.filter(l=>l.campaign===c.id);const won=ls.filter(l=>l.stage==='Won');
  const visits=D.visits.filter(v=>ls.some(l=>l.id===v.lead)&&v.status==='Done').length;
  const rev=won.reduce((s,l)=>s+n((proj(l.project)||{}).value||l.budget),0);
  return {c,leads:ls.length,won:won.length,visits,cpl:ls.length?n(c.spend)/ls.length:0,cpb:won.length?n(c.spend)/won.length:0,rev,roi:n(c.spend)?rev/n(c.spend):0};
}

/* ---- import leads (Meta / Google / website exports) ---- */
const LIMP={rows:[],src:'Facebook ads'};
/* → marketing: vLeadImp */
/* → marketing: leadMap */
/* → marketing: runLeadImport */

/* ---- portfolio page ---- */
/* → marketing: portfolioDoc */

function wtplIntro(){
  const have=new Set(D.wtpl.map(t=>t.kind));
  return `<div class="note">${ico('info')}<span>Ready-made messages are built in for every step. Tap <b>Customise</b> to change the wording — your version is then used everywhere (follow-ups, pipeline, site visits, reviews).</span></div>
  <div class="box"><div class="tbl-wrap"><table><thead><tr><th>Used for</th><th>Message</th><th></th></tr></thead><tbody>${TPL_KINDS.map(k=>`<tr><td><b>${esc(k)}</b>${have.has(k)?' <span class="pill p-green">customised</span>':''}</td><td class="code" style="white-space:pre-wrap;max-width:520px">${esc(tplText(k,{name:'Ramesh'}))}</td><td>${CANW&&!have.has(k)?`<button class="btn sm" data-wtpl="${esc(k)}">${ico('pencil')}Customise</button>`:''}</td></tr>`).join('')}</tbody></table></div></div>`;
}
function mktBox(){
  if(!canView('mktdash')||!D.leads.length)return '';
  const t=today(),mo=t.slice(0,7);
  const nw=D.leads.filter(l=>isoDate(new Date(l.at||0)).startsWith(mo)).length,fu=followQueue().length;
  const vis=D.visits.filter(v=>v.status==='Scheduled'&&v.date>=t).length,open=D.leads.filter(l=>!['Won','Lost'].includes(l.stage||'New'));
  const won=D.leads.filter(l=>l.stage==='Won'&&isoDate(new Date(l.wonAt||l.at||0)).startsWith(mo)).length;
  return `<div class="box"><div class="box-h">${ico('megaphone')}<h2>Marketing</h2><button class="btn sm" data-go="followups">${ico('calendar-clock')}Follow-ups</button><button class="btn sm" data-go="mktdash">Open marketing</button></div>
  <div class="tiles"><div class="tile"><b>${nw}</b><span>New leads this month</span></div><div class="tile"><b style="${fu?'color:var(--red-ink)':''}">${fu}</b><span>Follow-ups due</span></div>
  <div class="tile"><b>${vis}</b><span>Site visits booked</span></div><div class="tile"><b>${open.length}</b><span>Open leads · ${inrShort(open.reduce((s,l)=>s+n(l.budget),0))}</span></div><div class="tile"><b>${won}</b><span>Bookings this month</span></div></div></div>`;
}
/* → marketing: readLeadFile */
document.addEventListener('dragstart',e=>{const c=e.target.closest&&e.target.closest('[data-dragl]');if(c){e.dataTransfer.setData('text/plain',c.dataset.dragl);e.dataTransfer.effectAllowed='move';}});
document.addEventListener('dragover',e=>{const c=e.target.closest&&e.target.closest('[data-dropstage]');if(c){e.preventDefault();c.classList.add('dropon');}});
document.addEventListener('dragleave',e=>{const c=e.target.closest&&e.target.closest('[data-dropstage]');if(c)c.classList.remove('dropon');});
document.addEventListener('drop',e=>{const c=e.target.closest&&e.target.closest('[data-dropstage]');if(!c)return;e.preventDefault();c.classList.remove('dropon');const id=e.dataTransfer.getData('text/plain');if(id)moveLead(id,c.dataset.dropstage);});

Object.assign(HI,{mktdash:'मार्केटिंग डैशबोर्ड',pipeline:'पाइपलाइन बोर्ड',visits:'साइट विज़िट',leadimp:'लीड्स इम्पोर्ट',followups:'फॉलो-अप',wtpl:'व्हाट्सऐप संदेश',estimator:'अनुमान बनाएं',packages:'पैकेज',campaigns:'कैंपेन',content:'फोटो लाइब्रेरी',reviews:'रिव्यू',referrals:'रेफरल',portfolio:'पोर्टफोलियो'});
/* ================= Role-based user interfaces ================= */
const UI_OF={'Admin':'owner','Project manager':'owner','Accountant':'owner','Marketing':'owner',
  'Site engineer':'site','Supervisor':'site','Storekeeper':'site','Sub-contractor':'site',
  'Architect':'design','Structural engineer':'design','Client':'client','none':'owner'};
const uiOf=()=>UI_OF[curRole()]||'owner';
const UI_NAME={owner:'Admin view',site:'Site view',design:'Design desk',client:'Client view'};
const UI_ONLY={sitehome:'site',desk:'design',client:'client',cphotos:'client',cpay:'client',cdocs:'client'};
const TABS={
  site:[['myday','sun','My day'],['sitehome','home','Site'],['+','plus','Add'],['messages','message-circle','Chat'],['tasks','list-checks','Tasks']],
  client:[['client','home','Home'],['cphotos','images','Photos'],['cpay','indian-rupee','Payments'],['messages','message-circle','Chat'],['cctv','cctv','Cameras']],
  design:[['myday','sun','My day'],['desk','pencil-ruler','Desk'],['+','plus','Add'],['drawlib','library','Drawings'],['designsched','pen-tool','Schedule']],
};
function tabBar(){
  let t=TABS[uiOf()];if(!S.ready)return '';
  if(!t){const ic={dashboard:'layout-dashboard',...(['Admin','Project manager'].includes(curRole())?{tasks:'list-checks',messages:'message-circle',alerts:'bell'}:{messages:'message-circle'}),projects:'building-2',mktdash:'target',pipeline:'kanban',followups:'calendar-clock',alerts:'bell',payments:'indian-rupee',invoices:'receipt',leads:'user-plus'};
    const nm={dashboard:'Home',tasks:'Tasks',messages:'Chat',projects:'Projects',mktdash:'Marketing',pipeline:'Pipeline',followups:'Follow-ups',alerts:'Alerts',payments:'Payments',invoices:'Bills',leads:'Leads'};
    const c=Object.keys(ic).filter(k=>canView(k)).slice(0,4).map(k=>[k,ic[k],nm[k]]);c.splice(Math.min(2,c.length),0,['+','plus','Add']);t=c;}
  const items=t.filter(([k])=>k==='+'?true:canView(k));
  return `<nav class="tabbar" aria-label="Main">${items.map(([k,i,l])=>k==='+'?`<button class="tab tab-add" id="tabAdd" aria-label="Quick add">${ico(i)}<span>${l}</span></button>`
    :`<button class="tab ${S.view===k?'on':''}" data-go="${k}">${ico(i)}<span>${esc(l)}</span>${k==='messages'?(()=>{const c=chatUnread();return c?`<em class="tbadge">${c}</em>`:'';})():''}</button>`).join('')}<button class="tab" id="tabMore" aria-label="More">${ico('menu')}<span>More</span></button></nav>`;
}
const curPid=()=>S.proj!=='all'&&projOK(S.proj)?S.proj:(PJ().length===1?PJ()[0].id:null);
const hello=()=>{const t=myTeamRec();const nm0=(t&&t.name)||(S.viewAs?'':(ME.name||''));const h=new Date().getHours();
  return `${h<12?'Good morning':h<17?'Good afternoon':'Good evening'}${nm0?', '+esc(nm0.replace(/^(Mr\.|Mrs\.|Dr\.)\s*/,'').split(' ')[0]):''}`;};
function projPicker(next){
  return `<div class="box"><div class="box-h">${ico('building-2')}<h2>Choose your site</h2></div><div class="qa-grid">${PJ().map(p=>`<button class="qa-btn" data-pickproj="${p.id}">${ico('building-2')}<span>${esc(p.name)}</span><span class="code">${esc(p.prefix||'')}</span></button>`).join('')||'<div class="code">No project is linked to you yet. Ask the admin.</div>'}</div></div>`;
}

/* ---- Site engineer / supervisor home ---- */
function vSiteHome(){
  const pid=curPid();const t=today();
  const head=header(hello(),`<span class="code">${new Date().toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'})}</span>`);
  if(!pid)return head+projPicker();
  const p=proj(pid);const by=c=>D[c].filter(x=>x.project===pid);
  const present=by('attendance').filter(a=>a.date===t&&a.status!=='Absent').length+by('vlabour').filter(v=>v.date===t).reduce((s,v)=>s+n(v.count),0);
  const dprToday=by('dpr').some(d=>d.date===t);
  const ts=by('tasks').filter(x=>x.status!=='Completed');
  const todayT=ts.filter(x=>(x.start||'')<=t).sort((a,b)=>(a.due||'9').localeCompare(b.due||'9'));
  const late=todayT.filter(x=>x.due&&x.due<t);
  const req=by('requests').filter(r=>r.status==='Pending');
  const iss=by('issues').filter(x=>x.status!=='Resolved').sort((a,b)=>(a.who===ME.id?-1:0)-(b.who===ME.id?-1:0)||({High:0,Medium:1,Low:2}[a.severity]-{High:0,Medium:1,Low:2}[b.severity]));
  const acts=[['attbulk','calendar-check','Mark attendance'],['dprauto','notebook-pen',"Today's report"],['received','package-plus','Material received'],['requests','arrow-left-right','Request material'],['issue','package-minus','Material issued'],['issues','alert-triangle','Issue / snag'],['workupd','hammer','Work update'],['equiplog','gauge','Equipment hours'],['forms','clipboard-check','Checklist']]
    .filter(([k])=>k==='dprauto'?canView('dpr')&&canEditView('dpr'):k==='forms'?canView('forms'):k==='attbulk'?canEditView('attendance'):canView(k)&&canEditView(k));
  return head+qtBox()+trReviewBox()+`<div class="box site-head"><div class="siteloc">${ico('map-pin')}<div style="flex:1;min-width:160px"><b>${esc(p.name)}</b><div class="code">${esc(p.address||'')}</div></div>
    ${p.loc?`<a class="btn sm" href="https://www.google.com/maps/dir/?api=1&destination=${p.loc.lat},${p.loc.lng}" target="_blank" rel="noopener noreferrer">${ico('navigation')}Directions</a>`:''}</div>
    <div class="tiles"><div class="tile"><b>${present}</b><span>Workers today</span></div>
    <div class="tile"><b style="color:${dprToday?'var(--green-ink)':'var(--amber-ink)'}">${dprToday?'Done':'Pending'}</b><span>Today's report</span></div>
    <div class="tile"><b>${todayT.length}${late.length?` <small style="color:var(--red-ink);font-size:14px">· ${late.length} late</small>`:''}</b><span>Work on now</span></div>
    <div class="tile"><b>${req.length}</b><span>Material requests pending</span></div></div></div>
  ${CANW?`<div class="box"><div class="box-h">${ico('plus')}<h2>Add from site</h2></div><div class="qa-grid big">${acts.map(([k,i,l])=>`<button class="qa-btn" ${k==='forms'?`data-go="forms"`:`data-quick="${k}"`}>${ico(i)}<span>${esc(l)}</span></button>`).join('')}</div></div>`:''}
  <div class="grid2">
    <div class="box"><div class="box-h">${ico('list-checks')}<h2>Work on now</h2><button class="btn sm" data-go="tasks">All tasks</button></div>
      ${todayT.length?todayT.slice(0,8).map(x=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(x.title)}</b><div class="code">${x.due?`Finish by ${fd(x.due)}`:''}${x.who?' · '+esc(nm(x.who)):''}</div></div>
        <div class="prog" style="width:70px"><i style="width:${x.status==='Completed'?100:n(x.progress)}%"></i></div>${CANW&&canEditView('tasks')?`<button class="btn sm ghost" data-edit="tasks:${x.id}" aria-label="Update">${ico('pencil')}</button>`:''}</div>`).join(''):'<div class="empty">Nothing scheduled right now.</div>'}</div>
    <div class="box"><div class="box-h">${ico('alert-triangle')}<h2>Open issues</h2><button class="btn sm" data-go="issues">All</button></div>
      ${iss.length?iss.slice(0,6).map(x=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(x.title)}</b><div class="code">${x.who===ME.id?'<b>Assigned to you</b> · ':''}${x.due?'Fix by '+fd(x.due):''}</div></div>${cell(MOD.issues.fields.find(f=>f.k==='severity'),x)}</div>`).join(''):'<div class="empty">No open issues.</div>'}</div>
    ${canView('requests')?'':'<!--'}<div class="box"><div class="box-h">${ico('arrow-left-right')}<h2>Material requested</h2></div>
      ${req.length?req.slice(0,6).map(r=>`<div class="srow"><b style="flex:1">${esc(r.material)}</b><span class="code">${num(r.qty)} ${esc(r.unit||'')} · by ${fd(r.needBy)}</span></div>`).join(''):'<div class="empty">No pending requests.</div>'}</div>${canView('requests')?'':'-->'}
  </div>`;
}

/* ---- Architect / structural engineer desk ---- */
function vDesk(){
  const ids=new Set(PJ().filter(p=>S.proj==='all'||p.id===S.proj).map(p=>p.id));const t=today();
  const inP=r=>ids.has(r.project);
  const docs=D.documents.filter(inP),forA=docs.filter(d=>d.status==='For approval'),draft=docs.filter(d=>d.status==='Draft'),appr=docs.filter(d=>d.status==='Approved');
  const iss=D.issues.filter(inP).filter(x=>x.status!=='Resolved');
  const cos=D.changes.filter(inP).filter(c=>c.status==='Requested');
  const wk=addDays(t,-7),soon=addDays(t,21);
  const upcoming=(canView('designsched')?D.dtasks.filter(inP).filter(x=>x.status!=='Completed'&&x.due&&x.due<=soon):D.tasks.filter(inP).filter(x=>x.status==='Not started'&&x.start&&x.start>=t&&x.start<=soon)).sort((a,b)=>a.start.localeCompare(b.start));
  const photos=[...D.dpr,...D.workupd].filter(inP).filter(d=>(d.date||'')>=wk).sort((a,b)=>(b.date||'').localeCompare(a.date||'')).flatMap(d=>(d.photos||[]).map(id=>({id,d}))).slice(0,12);
  const sw=s=>({'For approval':'p-amber','Draft':'p-grey','Approved':'p-green','Superseded':'p-grey'}[s]||'p-grey');
  const docRow=d=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(d.title)}</b> <span class="code">${esc(d.rev||'')}</span><div class="code">${esc(pname(d.project))} · ${esc(d.cat||'')}</div></div><span class="pill ${sw(d.status)}">${esc(d.status||'—')}</span>
    ${(d.files||[]).slice(0,1).map(f=>`<a class="btn sm ghost" href="/_blob/${esc(f.id)}" target="_blank" rel="noopener" aria-label="Open">${ico('file-text')}</a>`).join('')}${d.link?`<a class="btn sm ghost" href="${esc(d.link)}" target="_blank" rel="noopener noreferrer" aria-label="Open link">${ico('external-link')}</a>`:''}${CANW&&canEditView('documents')?`<button class="btn sm ghost" data-edit="documents:${d.id}" aria-label="Edit">${ico('pencil')}</button>`:''}</div>`;
  return header(hello(),CANW&&canEditView('documents')?`<button class="btn pri" data-add="documents">${ico('upload')}Upload drawing / revision</button>`:'')+qtBox()+trReviewBox()+
  `<div class="box tiles"><div class="tile"><b style="color:${forA.length?'var(--amber-ink)':'inherit'}">${forA.length}</b><span>Waiting for approval</span></div><div class="tile"><b>${draft.length}</b><span>Drafts</span></div>
   <div class="tile"><b>${appr.length}</b><span>Approved drawings</span></div><div class="tile"><b>${iss.length}</b><span>Open site questions</span></div><div class="tile"><b>${cos.length}</b><span>Change orders open</span></div><div class="tile"><b>${upcoming.length}</b><span>Work starting in 3 weeks</span></div></div>
  <div class="grid2">
    <div class="box"><div class="box-h">${ico('folder-open')}<h2>Drawings in progress</h2><button class="btn sm" data-go="documents">Register</button></div>${[...forA,...draft].length?[...forA,...draft].map(docRow).join(''):'<div class="empty">No drawings pending.</div>'}</div>
    <div class="box"><div class="box-h">${ico('alert-triangle')}<h2>Questions from site</h2><button class="btn sm" data-go="issues">All</button></div>
      ${iss.length?iss.slice(0,8).map(x=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(x.title)}</b><div class="code">${esc(pname(x.project))}${x.due?' · by '+fd(x.due):''}</div></div>${cell(MOD.issues.fields.find(f=>f.k==='severity'),x)}${CANW&&canEditView('issues')?`<button class="btn sm ghost" data-edit="issues:${x.id}" aria-label="Reply">${ico('pencil')}</button>`:''}</div>`).join(''):'<div class="empty">No open questions.</div>'}</div>
    <div class="box"><div class="box-h">${ico('calendar')}<h2>${canView('designsched')?'Design work due soon':'Drawings needed soon'}</h2>${canView('designsched')||canView('schedule')?`<button class="btn sm" data-go="${canView('designsched')?'designsched':'schedule'}">Schedule</button>`:''}</div>
      ${upcoming.length?upcoming.slice(0,8).map(x=>`<div class="srow"><b style="flex:1">${esc(x.title)}</b><span class="code">${esc((proj(x.project)||{}).prefix||'')} · ${x.disc?'due '+fd(x.due):'starts '+fd(x.start)}</span></div>`).join(''):'<div class="empty">No work starting in the next 3 weeks.</div>'}</div>
    <div class="box"><div class="box-h">${ico('file-diff')}<h2>Change orders</h2><button class="btn sm" data-go="changes">All</button></div>
      ${cos.length?cos.map(c=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(c.no||'')}</b> ${esc(c.desc||'')}<div class="code">${esc(pname(c.project))}</div></div><span class="pill p-amber">Requested</span></div>`).join(''):'<div class="empty">No open change orders.</div>'}</div>
  </div>
  <div class="box"><div class="box-h">${ico('camera')}<h2>Site photos this week</h2><span class="code">Check work against your drawings</span></div>
    ${photos.length?`<div class="thumbs big" style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap">${photos.map(x=>`<a href="/_blob/${esc(x.id)}" target="_blank" rel="noopener" title="${esc(pname(x.d.project)+' · '+fd(x.d.date))}"><img src="/_blob/${esc(x.id)}" alt="Site photo" style="width:120px;height:90px;object-fit:cover;border-radius:8px"></a>`).join('')}</div>`:'<div class="empty">No photos this week.</div>'}</div>`;
}

/* ---- Admin overview (added to dashboard) ---- */
function ownerBox(){
  if(uiOf()!=='owner'||!fullAccess())return '';
  const t=today();
  const rows=PJ().map(p=>{const ts=D.tasks.filter(x=>x.project===p.id);const pc=ts.length?Math.round(ts.reduce((s,x)=>s+(x.status==='Completed'?100:n(x.progress)),0)/ts.length):0;
    const got=D.payments.filter(x=>x.project===p.id&&x.dir==='Received from client').reduce((s,x)=>s+n(x.amount),0);
    const spent=D.payments.filter(x=>x.project===p.id&&x.dir!=='Received from client').reduce((s,x)=>s+n(x.amount),0);
    const late=ts.filter(x=>x.status!=='Completed'&&x.due&&x.due<t).length;const dpr=D.dpr.some(d=>d.project===p.id&&d.date===t);
    return {p,pc,got,spent,late,dpr};});
  if(!rows.length)return '';
  if(folded('own'))return `<div class="box"><div class="box-h">${foldBtn('own')}${ico('briefcase')}<h2>All projects review</h2><span class="code">${rows.length} projects · ${rows.filter(r=>r.late).length} with late tasks</span></div></div>`;
  return `<div class="box"><div class="box-h">${foldBtn('own')}${ico('briefcase')}<h2>All projects review</h2>
    <span class="code" style="margin-left:auto">See their screen:</span>${['Site engineer','Architect','Client','Marketing'].map(r=>`<button class="btn sm" data-viewas="${r}">${esc(r)}</button>`).join('')}</div>
  <div class="tbl-wrap"><table class="mtbl own-t"><thead><tr><th>Project</th><th>Progress</th><th class="num">Contract</th><th class="num">Received</th><th class="num">Spent</th><th>Late tasks</th><th>Today's report</th></tr></thead><tbody>
  ${rows.map(r=>`<tr><td data-label="Project"><button class="btn sm ghost" style="padding:2px 4px" data-proj="${r.p.id}"><b>${esc(r.p.name)}</b></button><div class="code">${esc(r.p.prefix||'')}</div></td><td data-label="Progress"><div style="display:flex;gap:8px;align-items:center"><div class="prog"><i style="width:${r.pc}%"></i></div><span class="code">${r.pc}%</span></div></td>
    <td class="num" data-label="Contract">${inr(r.p.value)}</td><td class="num" data-label="Received">${inr(r.got)}</td><td class="num" data-label="Spent">${inr(r.spent)}</td><td data-label="Late tasks">${r.late?`<span class="pill p-red">${r.late} late</span>`:'<span class="pill p-green">On time</span>'}</td><td data-label="Today's report">${r.dpr?'<span class="pill p-green">Sent</span>':'<span class="pill p-amber">Not yet</span>'}</td></tr>`).join('')}</tbody></table></div></div>`;
}

/* ---- Client tabs ---- */
function clientHead(title){return `${S.viewAs?previewBar():''}<div class="bar">${backBtn()}<h1>${title}</h1></div>`;}
function vCPhotos(){
  const ids=new Set(PJ().map(p=>p.id));
  const ds=[...D.dpr,...D.workupd].filter(d=>ids.has(d.project)&&(d.photos||[]).length).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const byDate={};ds.forEach(d=>{(byDate[d.date]=byDate[d.date]||[]).push(d);});
  return clientHead('Progress photos')+(ds.length?Object.entries(byDate).map(([dt,arr])=>`<div class="box"><div class="box-h">${ico('calendar')}<h2>${fd(dt)}</h2>${PJ().length>1?`<span class="code">${esc([...new Set(arr.map(d=>(proj(d.project)||{}).name))].join(', '))}</span>`:''}</div>
    <div style="padding:10px 16px">${arr.map(d=>`<div class="code" style="margin-bottom:6px;overflow-wrap:anywhere">${esc(dprWork(d).replace(/\n/g,' · ').slice(0,160))}</div>`).join('')}<div style="display:flex;gap:8px;flex-wrap:wrap">${arr.flatMap(d=>d.photos).map(id=>`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="Site photo ${esc(fd(dt))}" style="width:150px;height:112px;object-fit:cover;border-radius:10px"></a>`).join('')}</div></div></div>`).join('')
    :`<div class="box hero-empty">${ico('images')}<h2>No photos yet</h2><p>Photos from the site team appear here every day.</p></div>`);
}
function vCPay(){
  const ps=PJ();const upi=orgVal('upi');
  return clientHead('Payments')+ps.map(p=>{
    const ms=D.milestones.filter(m=>m.project===p.id);const inv=D.invoices.filter(i=>i.project===p.id&&['Tax invoice','RA bill'].includes(i.kind));
    const paid=D.payments.filter(x=>x.project===p.id&&x.dir==='Received from client');const tot=paid.reduce((s,x)=>s+n(x.amount),0);
    const due=inv.filter(i=>i.status!=='Paid').reduce((s,i)=>s+invTotal(i)-n(i.got),0);
    return `<div class="box"><div class="box-h">${ico('home')}<h2>${esc(p.name)}</h2></div>
    <div class="tiles"><div class="tile"><b>${inr(p.value)}</b><span>Contract value</span></div><div class="tile"><b>${inr(tot)}</b><span>Paid so far</span></div><div class="tile"><b style="color:${due?'var(--amber-ink)':'inherit'}">${inr(due)}</b><span>Due now</span></div><div class="tile"><b>${inr(Math.max(0,n(p.value)-tot))}</b><span>Balance to complete</span></div></div>
    ${due&&upi?`<div class="note" style="margin:0 16px 12px">${ico('indian-rupee')}<span>Pay by UPI to <b>${esc(upi)}</b>${orgVal('bank')?` or bank transfer to ${esc(orgVal('bank'))}, IFSC ${esc(orgVal('ifsc'))}`:''}. Share the payment screenshot with your project manager.</span></div>`:''}
    <div class="grid2" style="padding:0 16px 14px"><div><h3 class="code">PAYMENT STAGES</h3>${ms.length?ms.map(m=>{const st=msStatus(m);return `<div class="srow"><span style="flex:1">${esc(m.stage)}</span><b>${inr(msAmount(m))}</b><span class="pill ${MS_PILL[st]}">${st}</span></div>`;}).join(''):'<div class="code">—</div>'}</div>
    <div><h3 class="code">BILLS</h3>${inv.length?inv.map(i=>`<div class="srow"><div style="flex:1"><b>${esc(i.no||'')}</b><div class="code">${fd(i.date)}</div></div><b>${inr(invTotal(i))}</b>${cell(MOD.invoices.fields.find(f=>f.k==='status'),i)}<button class="btn sm ghost" data-doc="invoices:${i.id}" aria-label="Download bill">${ico('file-down')}</button></div>`).join(''):'<div class="code">—</div>'}
    <h3 class="code" style="margin-top:12px">PAYMENTS RECEIVED</h3>${paid.length?paid.sort((a,b)=>(b.date||'').localeCompare(a.date||'')).map(x=>`<div class="srow"><span style="flex:1">${fd(x.date)} ${x.mode?'· '+esc(x.mode):''}</span><b>${inr(x.amount)}</b></div>`).join(''):'<div class="code">—</div>'}</div></div></div>`;}).join('');
}
function vCDocs(){
  const ids=new Set(PJ().map(p=>p.id));const docs=D.documents.filter(d=>ids.has(d.project)&&d.status==='Approved'&&relOK(d));
  const cats=[...new Set(docs.map(d=>d.cat||'Other'))];
  return clientHead('Drawings & documents')+(docs.length?cats.map(c=>`<div class="box"><div class="box-h">${ico('folder-open')}<h2>${esc(c)}</h2></div>${docs.filter(d=>(d.cat||'Other')===c).map(d=>`<div class="srow"><div style="flex:1;min-width:0"><b>${esc(d.title)}</b> <span class="code">${esc(d.rev||'')}</span></div>${(d.files||[]).map(f=>`<a class="btn sm" href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico('file-text')}Open</a>`).join('')}${d.link?`<a class="btn sm" href="${esc(d.link)}" target="_blank" rel="noopener noreferrer">${ico('external-link')}Open</a>`:''}</div>`).join('')}</div>`).join('')
    :`<div class="box hero-empty">${ico('folder-open')}<h2>No drawings yet</h2><p>Drawings appear here once the office approves and releases them.</p></div>`);
}

Object.assign(HI,{sitehome:'साइट होम',desk:'डिज़ाइन डेस्क',cphotos:'प्रगति फोटो',cpay:'भुगतान',cdocs:'ड्रॉइंग'});
/* ================= Owner-controlled role access ================= */
const RA_MAIN=['Site engineer','Architect','Client','Marketing'];
const RA_MORE=['Supervisor','Storekeeper','Structural engineer','Sub-contractor','Accountant'];
const ROLE_KEY=r=>String(r).toLowerCase().replace(/[^a-z0-9]+/g,'-');
const EDIT_TIE={pipeline:'leads',followups:'leads',leadimp:'leads',estimator:'leads',content:'cflags',attbulk:'attendance',schedule:'tasks',designsched:'dtasks',forms:'forms'};
const raEditable=k=>!!MOD[k]||k in EDIT_TIE||k==='projects';
const RA_SKIP=new Set(['settings','audit','roleaccess','adminpanel','team','dashboard','cflags']);
const PKEY=id=>'person-'+id;
function curPerson(){if(S.viewAsPerson)return D.team.find(t=>t.id===S.viewAsPerson)||null;if(S.viewAs)return null;if(isAdmin())return null;return myTeamRec()||null;}
function personOv(pid){if(!pid)return null;const o=D.roleaccess.find(x=>x.id===PKEY(pid));return o&&o.v?o.v:null;}
function raValP(t,k){const po=personOv(t&&t.id);if(po&&po[k])return po[k];return raVal(t.role,k);}
function raOverride(role){const o=D.roleaccess.find(x=>x.id===ROLE_KEY(role));return o&&o.v?o.v:null;}
function raDefaultEdit(role,k){
  if(k==='projects')return ['Architect','Senior architect','Accountant'].includes(role);   // who may add projects (the admin and project manager always can)
  if(role==='Client')return k==='changes';
  if(['Architect','Structural engineer','Draftsman','Senior architect'].includes(role))return ['documents','issues','changes','forms','dtasks','designsched','calendar'].includes(k)||(k==='projects'&&['Architect','Senior architect'].includes(role));
  return true;
}
function raVal(role,k){
  const def=ROLE_VIEWS[role];if(def===V_ALL)return 'e';
  const o=raOverride(role);if(o&&o[k])return o[k];
  if(!(def||[]).includes(k))return 'h';
  return raEditable(k)&&raDefaultEdit(role,k)?'e':'v';
}
function canEditView(k){
  if(k==='drawlib')k='documents';if(k==='docmaker')k='invoices';   // screens that work on another screen's records
  const r=curRole();if(r==='none')return false;const t=curPerson();const pv=t&&t.role!=='Admin'?personOv(t.id):null;
  const val=kk=>pv&&pv[kk]?pv[kk]:raVal(r,kk);
  if(!pv&&fullAccess())return true;
  const v=val(k);if(v==='e')return true;
  const tie=EDIT_TIE[k];return tie?val(tie)==='e'&&v!=='h':false;
}
/* the screens shown in the grid for one role, grouped like the menu */
function raGroups(role){
  const ui=UI_OF[role]||'owner';const out=[];
  const ok=k=>!RA_SKIP.has(k)&&(!UI_ONLY[k]||UI_ONLY[k]===ui);
  const top=NAV.filter(g=>!g.g).flatMap(g=>g.items.map(i=>i[0])).filter(ok);
  if(top.length)out.push(['Main',top]);
  NAV.filter(g=>g.g).forEach(g=>{const ks=g.items.map(i=>i[0]).filter(ok);if(ks.length){const sp=SUPER.find(s=>s.groups.includes(g.g));out.push([(sp?sp.name+' › ':'')+g.g,ks]);}});
  return out;
}
function vRoleAccess(){
  if(S.raMode==='person')return vPersonAccess();
  const admin=isAdmin()||(S.web&&!S.demo)||S.demo;
  if(!S.raRole)S.raRole='Site engineer';const role=S.raRole;
  const groups=raGroups(role);const all=groups.flatMap(g=>g[1]);
  const cnt=r=>{const ks=raGroups(r).flatMap(g=>g[1]);return ks.filter(k=>raVal(r,k)!=='h').length;};
  const custom=!!raOverride(role);
  const seg=(k)=>{const v=raVal(role,k);const ed=raEditable(k);
    const b=(val,txt)=>`<button class="seg-b ${v===val?'on':''} ${val}" ${admin?`data-ra="${esc(k)}|${val}"`:'disabled'}>${txt}</button>`;
    return `<div class="seg">${b('h','Hidden')}${b('v',ed?'View only':'Show')}${ed?b('e','Add & edit'):''}</div>`;};
  return header(label('roleaccess'))+raModeBar()+
  `<div class="note">${ico('shield')}<span>Choose what each role can see and change. <b>Hidden</b> removes the screen from their menu, <b>View only</b> lets them look without changing anything, and <b>Add & edit</b> lets them add entries. Changes apply straight away for everyone with that role. Use <b>Preview</b> to check exactly what they see.</span></div>
  <div class="ra-roles">${RA_MAIN.map(r=>`<button class="ra-chip ${role===r?'on':''}" data-rarole="${esc(r)}"><b>${esc(r)}</b><span>${cnt(r)} screens${raOverride(r)?' · custom':''}</span></button>`).join('')}</div>
  <div class="ra-roles small"><span class="code">Other roles:</span>${RA_MORE.map(r=>`<button class="ra-chip sm ${role===r?'on':''}" data-rarole="${esc(r)}">${esc(r)}${raOverride(r)?' ·':''}</button>`).join('')}</div>
  <div class="box"><div class="box-h">${ico('user')}<h2>${esc(role)}</h2><span class="pill ${custom?'p-blue':'p-grey'}">${custom?'Custom':'Default'}</span>
    <button class="btn sm" data-viewas="${esc(role)}">${ico('eye')}Preview</button>${admin?`<button class="btn sm" data-raall="v">Show all</button><button class="btn sm" data-raall="h">Hide all</button>${custom?`<button class="btn sm" data-rareset="1">Reset to default</button>`:''}`:''}</div>
    ${groups.map(([g,ks])=>`<div class="ra-g">${esc(g.split(' › ').map(trG).join(' › '))}</div>${ks.map(k=>`<div class="srow ra-row"><span style="flex:1;min-width:150px;display:flex;gap:10px;align-items:center">${ico(icon(k)||'folder')}${esc(label(k))}</span>${seg(k)}</div>`).join('')}`).join('')}
    ${admin?'':'<div class="note" style="margin:12px 16px">Only the admin can change role access.</div>'}
  </div>
  <div class="code" style="padding:0 4px">Projects each person can open are still set per person on the Team page. Payments, wages and money screens stay hidden unless you switch them on here.</div>`;
}
function raModeBar(){return `<div class="ra-roles"><div class="seg big"><button class="seg-b ${S.raMode!=='person'?'on v':''}" data-ramode="role">${ico('users')}By role</button><button class="seg-b ${S.raMode==='person'?'on v':''}" data-ramode="person">${ico('user')}By person</button></div></div>`;}
function vPersonAccess(){
  const admin=isAdmin()||(S.web&&!S.demo)||S.demo;
  const ppl=D.team.filter(t=>t.role!=='Admin'&&t.status!=='Removed').sort((a,b)=>(a.role||'').localeCompare(b.role||'')||(a.name||'').localeCompare(b.name||''));
  if(!ppl.length)return header(label('roleaccess'))+raModeBar()+`<div class="box hero-empty">${ico('users')}<h2>No team members yet</h2><p>Add people on the Team page first.</p><button class="btn pri" data-go="team">Open Team</button></div>`;
  if(!S.raPerson||!ppl.find(t=>t.id===S.raPerson))S.raPerson=ppl[0].id;
  const t=ppl.find(x=>x.id===S.raPerson);const po=personOv(t.id)||{};
  const groups=raGroups(t.role);const nCustom=groups.flatMap(g=>g[1]).filter(k=>po[k]&&po[k]!==raVal(t.role,k)).length;
  const seg=k=>{const v=raValP(t,k);const ed=raEditable(k);const own=po[k]&&po[k]!==raVal(t.role,k);
    const b=(val,txt)=>`<button class="seg-b ${v===val?'on':''} ${val}" ${admin?`data-rap="${esc(k)}|${val}"`:'disabled'}>${txt}</button>`;
    return `${own?`<span class="pill p-blue" title="Role default: ${esc({h:'Hidden',v:'View only',e:'Add & edit'}[raVal(t.role,k)])}">Only for ${esc((t.name||'').split(' ')[0])}</span>`:''}<div class="seg">${b('h','Hidden')}${b('v',ed?'View only':'Show')}${ed?b('e','Add & edit'):''}</div>`;};
  return header(label('roleaccess'))+raModeBar()+
  `<div class="note">${ico('shield')}<span>Set limits for one person. Each person starts with their role's access; anything you change here applies <b>only to that person</b> and is marked in blue. <b>Reset to role</b> removes their personal limits.</span></div>
  <div class="ra-roles">${ppl.map(p=>`<button class="ra-chip ${p.id===t.id?'on':''}" data-raperson="${p.id}"><b>${esc(p.name||'—')}</b><span>${esc(p.role||'')}${personOv(p.id)?' · custom':''}</span></button>`).join('')}</div>
  <div class="box"><div class="box-h">${ico('user')}<h2>${esc(t.name||'')}</h2><span class="code">${esc(t.role||'')}${t.phone?' · '+esc(t.phone):''}</span><span class="pill ${nCustom?'p-blue':'p-grey'}">${nCustom?nCustom+' personal limits':'Same as role'}</span>
    <button class="btn sm" data-viewperson="${t.id}">${ico('eye')}Preview</button>${admin?`<button class="btn sm" data-rapall="v">Show all</button><button class="btn sm" data-rapall="h">Hide all</button>${personOv(t.id)?`<button class="btn sm" data-rapreset="1">Reset to role</button>`:''}`:''}</div>
    <div class="srow"><span class="code" style="flex:1">Projects this person can open</span>${(t.projects||[]).includes('all')?'<span class="pill p-green">All projects</span>':(t.projects||[]).map(id=>`<span class="pill p-grey">${esc(pname(id))}</span>`).join(' ')||'<span class="pill p-amber">None</span>'}${admin?`<button class="btn sm" data-edit="team:${t.id}">${ico('pencil')}Change</button>`:''}</div>
    ${groups.map(([g,ks])=>`<div class="ra-g">${esc(g.split(' › ').map(trG).join(' › '))}</div>${ks.map(k=>`<div class="srow ra-row"><span style="flex:1;min-width:150px;display:flex;gap:10px;align-items:center">${ico(icon(k)||'folder')}${esc(label(k))}</span>${seg(k)}</div>`).join('')}`).join('')}
  </div>`;
}
async function raSetPerson(pid,changes){
  const t=D.team.find(x=>x.id===pid);if(!t)return;const cur={...(personOv(pid)||{})};
  Object.entries(changes).forEach(([k,v])=>{if(v===raVal(t.role,k))delete cur[k];else cur[k]=v;});
  const ok=Object.keys(cur).length?await write(()=>db.doc('roleaccess/'+PKEY(pid)).set({person:pid,role:t.role,name:t.name,v:cur,by:ME.id,at:Date.now()}),'Access updated for '+(t.name||'this person'))
    :await write(()=>db.doc('roleaccess/'+PKEY(pid)).delete(),(t.name||'This person')+' now follows the '+t.role+' role');
  if(ok)audit('edited','roleaccess',PKEY(pid),`${t.name}: ${Object.entries(changes).map(([k,v])=>`${label(k)} → ${{h:'hidden',v:'view only',e:'add & edit'}[v]}`).join(', ').slice(0,300)}`);
}
async function raSet(role,changes){
  const groups=raGroups(role).flatMap(g=>g[1]);const cur={};
  groups.forEach(k=>cur[k]=raVal(role,k));Object.assign(cur,changes);
  /* keep linked detail screens in step */
  ['project','form','alerts'].forEach(k=>{cur[k]=raVal(role,k);});
  if(Object.entries(cur).some(([k,v])=>v!=='h'&&!['project','form','alerts'].includes(k))){if(cur.forms!=='h'&&cur.form==='h')cur.form='v';}
  const ok=await write(()=>db.doc('roleaccess/'+ROLE_KEY(role)).set({role,v:cur,by:ME.id,at:Date.now()}),'Access updated for '+role);
  if(ok)audit('edited','roleaccess',ROLE_KEY(role),`${role}: ${Object.entries(changes).map(([k,v])=>`${label(k)} → ${{h:'hidden',v:'view only',e:'add & edit'}[v]}`).join(', ').slice(0,300)}`);
}

Object.assign(HI,{roleaccess:'रोल एक्सेस',adminpanel:'एडमिन पैनल',orgs:'संगठन'});
/* ================= Messages (group chat with mentions & read ticks) ================= */
const CAT_OF={'Admin':'owner','Project manager':'owner','Site engineer':'site','Supervisor':'site','Storekeeper':'site','Sub-contractor':'site',
  'Architect':'design','Structural engineer':'design','Client':'client','Marketing':'marketing','Accountant':'accounts'};
const CAT_NAME={owner:'Admin',site:'Site engineer',design:'Architect',client:'Client',marketing:'Marketing',accounts:'Accounts'};
const CAT_ORDER=['owner','site','client','design','marketing','accounts'];
const CO='_co'; /* company-wide chats, not tied to one project */
const CHAT_PRESETS={proj:[['owner','site','client','design'],['owner','site','client'],['owner','client','design'],['owner','site','design'],['owner','client'],['owner','site'],['owner','design'],['owner','site','client','design','marketing'],['owner','client','marketing']],
  co:[['owner','marketing'],['owner','site','design'],['owner','accounts'],['owner','site','design','marketing','accounts']]};
const grpKey=cats=>CAT_ORDER.filter(c=>cats.includes(c)).join('+');
const thKey=(pid,g)=>pid+'|'+g;
const safeId=s=>String(s).replace(/[^A-Za-z0-9_-]/g,'_');
const pnameX=pid=>pid===CO?'Company (all projects)':pname(pid);
function myChatId(){
  const t=curPerson();if(t)return t.id;
  const r=curRole();
  if(S.viewAs){const x=D.team.find(m=>m.role===r);return x?x.id:'owner';}
  const own=D.team.find(m=>m.role==='Admin'&&m.account&&m.account===ME.id)||D.team.find(m=>m.role==='Admin');
  return own?own.id:'owner';
}
const myCat=()=>{const t=D.team.find(m=>m.id===myChatId());return t?CAT_OF[t.role]||'site':(CAT_OF[curRole()]||'owner');};
function threadMembers(pid,g){
  if(g.startsWith('g:')){const d=pgDoc(g);if(!d)return [];return Object.keys(d.mm||{}).map(id=>D.team.find(t=>t.id===id)||(id==='owner'?{id:'owner',name:'Owner',role:'Admin'}:null)).filter(Boolean);}
  const cats=g.split('+');
  const ms=D.team.filter(t=>t.status!=='Removed'&&cats.includes(CAT_OF[t.role])&&!(pid===CO&&CAT_OF[t.role]==='client')&&(pid===CO||CAT_OF[t.role]==='owner'||(t.projects||[]).includes('all')||(t.projects||[]).includes(pid)));
  if(!ms.some(t=>CAT_OF[t.role]==='owner'))ms.unshift({id:'owner',name:'Owner',role:'Admin'});
  return ms;
}
const chatName=id=>{const t=D.team.find(m=>m.id===id);return t?t.name:id==='owner'?'Owner':'Someone';};
const chatRole=id=>{const t=D.team.find(m=>m.id===id);return t?t.role:'Admin';};
function lastSeen(key,id){const d=D.chatseen.find(x=>x.id===safeId(key+'__'+id));return d?n(d.last):0;}
function myThreads(){
  const me=myChatId(),cat=myCat(),isOwn=cat==='owner';
  const pids=[CO,...PJ().map(p=>p.id)];const out=[];
  pids.forEach(pid=>{
    const custom=D.chatgroups.filter(g=>g.project===pid&&g.grp).map(g=>g.grp.split('+'));
    const used=new Set(D.chats.filter(c=>c.project===pid&&!String(c.grp).startsWith('g:')).map(c=>c.grp));
    const list=[...(pid===CO?CHAT_PRESETS.co:CHAT_PRESETS.proj),...custom,...[...used].map(g=>g.split('+'))];
    const seen=new Set();
    list.forEach(cats=>{const g=grpKey(cats);if(seen.has(g))return;seen.add(g);
      if(!isOwn&&!g.split('+').includes(cat))return;
      if(pid===CO&&cat==='client')return;
      if(pid!==CO&&!isOwn&&!projOK(pid))return;
      const key=thKey(pid,g);const msgs=D.chats.filter(c=>c.project===pid&&c.grp===g&&visMsg(key,c)).sort((a,b)=>a.at-b.at);
      const ls=lastSeen(key,me);const unread=msgs.filter(m=>m.from!==me&&m.at>ls).length;
      const mentioned=msgs.some(m=>m.from!==me&&m.at>ls&&(m.mentions||[]).includes(me));
      out.push({pid,g,key,msgs,last:msgs[msgs.length-1],unread,mentioned,archived:isArch(key)});});
    D.chatgroups.filter(d=>d.project===pid&&d.mm).forEach(d=>{
      if(!(chatRole(me)==='Admin'||(d.mm||{})[me]))return;
      const g='g:'+d.id,key=thKey(pid,g);const msgs=D.chats.filter(c=>c.project===pid&&c.grp===g&&visMsg(key,c)).sort((a,b)=>a.at-b.at);
      const ls=lastSeen(key,me);const unread=msgs.filter(m=>m.from!==me&&m.at>ls).length;
      const mentioned=msgs.some(m=>m.from!==me&&m.at>ls&&(m.mentions||[]).includes(me));
      out.push({pid,g,key,msgs,last:msgs[msgs.length-1],unread,mentioned,custom:true,archived:isArch(key)});});
  });
  return out;
}
const pgDoc=g=>D.chatgroups.find(x=>x.id===String(g).slice(2));
const pgMode=(g,id)=>{const d=pgDoc(g);return d&&d.mm?d.mm[id]||'':'';};
const canEditPG=d=>!!d&&(chatRole(myChatId())==='Admin'||(d.mm||{})[myChatId()]==='admin');
const canSendIn=g=>!String(g).startsWith('g:')||chatRole(myChatId())==='Admin'||['admin','member'].includes(pgMode(g,myChatId()));
const gavOf=g=>String(g).startsWith('g:')?`<span class="gav pg">${esc(initials((pgDoc(g)||{}).name||'G'))}</span>`:`<span class="gav">${g.split('+').filter(c=>c!=='owner').map(c=>`<i class="rdot ${RC_CLS[c]}"></i>`).join('')||'<i class="rdot rc-owner"></i>'}</span>`;
const chatUnread=()=>{try{return myThreads().filter(t=>!t.archived).reduce((s,t)=>s+t.unread,0);}catch(_){return 0;}};
/* → chat: tickState */
const grpLabel=g=>String(g).startsWith('g:')?((pgDoc(g)||{}).name||'Group'):g.split('+').map(c=>CAT_NAME[c]).join(' · ');
const tm=ts=>{const d=new Date(ts);const t=today();const ds=isoDate(d);return (ds===t?'':fd(ds)+' ')+d.toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'});};
const tms=ts=>{const d=new Date(ts);const ds=isoDate(d);if(ds===today())return d.toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'});if(ds===addDays(today(),-1))return 'Yesterday';return d.toLocaleDateString(LOC(),{day:'numeric',month:'short'});};
const RC_CLS={owner:'rc-owner',site:'rc-site',design:'rc-design',client:'rc-client',marketing:'rc-mkt',accounts:'rc-acc'};
const roleBadge=id=>{const r=chatRole(id);const c=CAT_OF[r]||'owner';return `<span class="rbadge ${RC_CLS[c]}">${esc(c==='site'||c==='design'?r:CAT_NAME[c])}</span>`;};
const initials=s=>String(s||'?').replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.?)\s*/i,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()||'?';
const hue=s=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))%360;return h;};
const projAv=pid=>{if(pid===CO)return `<span class="pav co">${ico('briefcase')}</span>`;const p=proj(pid)||{};const code=(p.prefix||p.name||'P').replace(/^.*-/,'').slice(-3);return `<span class="pav" style="--h:${hue(pid)}">${esc(code)}</span>`;};
/* → chat: projPeople */
const names=a=>a.map(x=>firstName(x.name)).join(', ');
let PINS=[];try{PINS=JSON.parse(localStorage.getItem('bm-chatpin')||'[]');}catch(_){}
/* → chat: chatProjects */
/* → chat: vMessages */

/* → chat: chatMarkSeen */
/* → chat: chatSend */
/* → chat: openChatGroup */
/* → chat: openRoleGroup */

Object.assign(HI,{messages:'संदेश'});
/* ---- chat: per-person prefs (archive, delete-for-me, star) ---- */
const EMO=['👍','❤️','😂','😮','🙏','✅'];
const prefId=()=>safeId('p_'+myChatId());
const myPrefs=()=>D.chatprefs.find(x=>x.id===prefId())||{};
async function savePrefs(patch){const cur=myPrefs();const nx={archived:cur.archived||[],cleared:cur.cleared||{},hidden:cur.hidden||[],starred:cur.starred||[],...patch,who:myChatId(),at:Date.now()};
  if(S.viewAs){toast('Preview only — not saved while previewing.');return false;}
  return write(()=>db.doc('chatprefs/'+prefId()).set(nx));}
const isArch=key=>(myPrefs().archived||[]).includes(key);
const visMsg=(key,m)=>{const p=myPrefs();return m.at>((p.cleared||{})[key]||0)&&!(p.hidden||[]).includes(m.id);};
const isStar=id=>(myPrefs().starred||[]).includes(id);
let SNACK_FN=null;
function snack(msg,undo){document.querySelectorAll('.snack').forEach(x=>x.remove());const d=document.createElement('div');d.className='snack';d.setAttribute('role','status');
  d.innerHTML=`<span>${esc(msg)}</span>${undo?'<button id="snackUndo">Undo</button>':''}`;document.body.appendChild(d);SNACK_FN=undo||null;setTimeout(()=>{d.remove();},6000);}
async function chatSwipe(key,dir){
  const p=myPrefs();
  if(dir==='right'){const arch=p.archived||[];const was=arch.includes(key);const nx=was?arch.filter(k=>k!==key):[...arch,key];
    if(await savePrefs({archived:nx})){if(S.chatThread===key)S.chatThread=null;snack(was?'Chat unarchived':'Chat archived',async()=>{await savePrefs({archived:arch});});}}
  else{const cl={...(p.cleared||{})};const prev=cl[key];cl[key]=Date.now();
    if(await savePrefs({cleared:cl})){if(S.chatThread===key)S.chatThread=null;snack('Chat deleted for you',async()=>{const c2={...(myPrefs().cleared||{})};if(prev)c2[key]=prev;else delete c2[key];await savePrefs({cleared:c2});});}}
}
/* ---- message list ---- */
/* → chat: quoteHtml */
/* → chat: renderMsgs */
/* → chat: pinBar */
/* ---- long-press menu ---- */
/* → chat: openMsgMenu */
/* → chat: openForward */
/* → chat: doForward */
/* → chat: msgAction */
/* → chat: msgReact */
/* ---- gestures: swipe chat rows, long-press messages ---- */
let SW=null,LP=null;
document.addEventListener('pointerdown',e=>{
  if(e.button!==undefined&&e.button!==0)return;
  const row=e.target.closest&&e.target.closest('.swr');
  if(row&&!e.target.closest('.pinb'))SW={row,inner:row.querySelector('.chat-th'),x:e.clientX,y:e.clientY,dx:0,on:false,w:row.offsetWidth||300};
  const b=e.target.closest&&e.target.closest('.bub[data-mid]');
  if(b&&!e.target.closest('a,button,textarea,input')&&!b.classList.contains('del')){const id=b.dataset.mid;LP={x:e.clientX,y:e.clientY,fired:false,t:setTimeout(()=>{LP&&(LP.fired=true);S._noClick=Date.now();try{navigator.vibrate&&navigator.vibrate(15);}catch(_){}openMsgMenu(id);},480)};}
});
document.addEventListener('pointermove',e=>{
  if(LP&&(Math.abs(e.clientX-LP.x)>8||Math.abs(e.clientY-LP.y)>8)){clearTimeout(LP.t);LP=null;}
  if(!SW)return;const dx=e.clientX-SW.x,dy=e.clientY-SW.y;
  if(!SW.on){if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.3){SW.on=true;SW.row.classList.add('swiping');}else if(Math.abs(dy)>12){SW=null;return;}else return;}
  SW.dx=dx;SW.inner.style.transform=`translateX(${dx}px)`;
  SW.row.classList.toggle('to-r',dx>0);SW.row.classList.toggle('to-l',dx<0);SW.row.classList.toggle('arm',Math.abs(dx)>=SW.w*0.35);
});
const swEnd=()=>{if(LP){clearTimeout(LP.t);LP=null;}
  if(!SW)return;const s=SW;SW=null;if(!s.on)return;S._noClick=Date.now();
  const done=Math.abs(s.dx)>=s.w*0.35;const key=s.row.dataset.swkey;
  s.inner.style.transition='transform .18s';s.inner.style.transform=done?`translateX(${s.dx>0?s.w:-s.w}px)`:'translateX(0)';
  setTimeout(()=>{s.inner.style.transition='';s.row.classList.remove('swiping','to-r','to-l','arm');if(done)chatSwipe(key,s.dx>0?'right':'left');else s.inner.style.transform='';},190);};
document.addEventListener('pointerup',swEnd);document.addEventListener('pointercancel',swEnd);
document.addEventListener('contextmenu',e=>{const b=e.target.closest&&e.target.closest('.bub[data-mid]');if(b&&!b.classList.contains('del')&&!e.target.closest('a')){e.preventDefault();openMsgMenu(b.dataset.mid);}});

const I18N={"Dashboard":["డాష్‌బోర్డ్","डैशबोर्ड"],"Messages":["సందేశాలు","संदेश"],"Alerts":["అలర్ట్‌లు","अलर्ट"],"Projects":["ప్రాజెక్టులు","प्रोजेक्ट"],"Project":["ప్రాజెక్ట్","प्रोजेक्ट"],"Team":["టీమ్","टीम"],"Role access":["పాత్ర అనుమతులు","रोल एक्सेस"],"Marketing":["మార్కెటింగ్","मार्केटिंग"],"Sales":["అమ్మకాలు","बिक्री"],"Project management":["ప్రాజెక్ట్ నిర్వహణ","प्रोजेक्ट प्रबंधन"],"Site cameras":["సైట్ కెమెరాలు","साइट कैमरे"],"Site resources":["సైట్ వనరులు","साइट संसाधन"],"Settings":["సెట్టింగ్‌లు","सेटिंग्स"],"Change history":["మార్పుల చరిత్ర","बदलाव इतिहास"],"Owner view":["అడ్మిన్ వ్యూ","एडमिन व्यू"],"Site view":["సైట్ వ్యూ","साइट व्यू"],"Client view":["క్లయింట్ వ్యూ","ग्राहक व्यू"],"Design desk":["డిజైన్ డెస్క్","डिज़ाइन डेस्क"],"preview":["ప్రివ్యూ","प्रीव्यू"],"Web demo.":["వెబ్ డెమో.","वेब डेमो."],"Reset demo":["డెమో రీసెట్","डेमो रीसेट"],"Sample data is loaded and everything you add is saved only in this browser. Photo and file uploads work in the team version.":["నమూనా డేటా లోడ్ అయింది. మీరు జోడించేది ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతుంది. ఫోటో, ఫైల్ అప్‌లోడ్ టీమ్ వెర్షన్‌లో పనిచేస్తాయి.","नमूना डेटा लोड है। आप जो जोड़ते हैं वह केवल इसी ब्राउज़र में सेव होता है। फोटो व फाइल अपलोड टीम वर्ज़न में चलते हैं।"],"All projects":["అన్ని ప్రాజెక్టులు","सभी प्रोजेक्ट"],"Needs attention":["గమనించాల్సినవి","ध्यान दें"],"Urgent":["అత్యవసరం","ज़रूरी"],"urgent":["అత్యవసరం","ज़रूरी"],"Open":["తెరువు","खोलें"],"Soon":["త్వరలో","जल्द"],"See all":["అన్నీ చూడండి","सब देखें"],"All sites at a glance":["అన్ని సైట్లు ఒక్క చూపులో","सभी साइटें एक नज़र में"],"See their screen:":["వారి స్క్రీన్ చూడండి:","उनकी स्क्रीन देखें:"],"Site engineer":["సైట్ ఇంజనీర్","साइट इंजीनियर"],"Site engineers":["సైట్ ఇంజనీర్లు","साइट इंजीनियर"],"Architect":["ఆర్కిటెక్ట్","आर्किटेक्ट"],"Architects":["ఆర్కిటెక్ట్‌లు","आर्किटेक्ट"],"Client":["క్లయింట్","ग्राहक"],"Clients":["క్లయింట్లు","ग्राहक"],"Owner":["అడ్మిన్","एडमिन"],"Admin":["అడ్మిన్","एडमिन"],"Project manager":["ప్రాజెక్ట్ మేనేజర్","प्रोजेक्ट मैनेजर"],"Supervisor":["సూపర్‌వైజర్","सुपरवाइज़र"],"Storekeeper":["స్టోర్ కీపర్","स्टोरकीपर"],"Accountant":["అకౌంటెంట్","अकाउंटेंट"],"Accounts":["అకౌంట్స్","अकाउंट्स"],"Structural engineer":["స్ట్రక్చరల్ ఇంజనీర్","स्ट्रक्चरल इंजीनियर"],"Sub-contractor":["సబ్-కాంట్రాక్టర్","सब-कॉन्ट्रैक्टर"],"Progress":["ప్రగతి","प्रगति"],"Contract":["ఒప్పందం","अनुबंध"],"Received":["అందినది","प्राप्त"],"Spent":["ఖర్చు","खर्च"],"Late tasks":["ఆలస్యమైన పనులు","देर वाले काम"],"Today's report":["నేటి రిపోర్ట్","आज की रिपोर्ट"],"Today's daily report":["నేటి రోజువారీ రిపోర్ట్","आज की दैनिक रिपोर्ट"],"Sent":["పంపబడింది","भेजा"],"Not yet":["ఇంకా లేదు","अभी नहीं"],"On time":["సమయానికి","समय पर"],"Follow-ups":["ఫాలో-అప్‌లు","फॉलो-अप"],"Open marketing":["మార్కెటింగ్ తెరువు","मार्केटिंग खोलें"],"New leads this month":["ఈ నెల కొత్త లీడ్స్","इस महीने नए लीड"],"Follow-ups due":["ఫాలో-అప్ చేయాల్సినవి","बाकी फॉलो-अप"],"Site visits booked":["బుక్ అయిన సైట్ విజిట్లు","बुक साइट विज़िट"],"Open leads":["తెరిచి ఉన్న లీడ్స్","खुले लीड"],"Bookings this month":["ఈ నెల బుకింగ్‌లు","इस महीने बुकिंग"],"Open tasks":["పెండింగ్ పనులు","बाकी काम"],"Open issues":["పెండింగ్ సమస్యలు","खुली समस्याएं"],"Workers on site today":["ఈరోజు సైట్‌లో కూలీలు","आज साइट पर मज़दूर"],"Material requests pending":["పెండింగ్ మెటీరియల్ అభ్యర్థనలు","बाकी सामग्री मांग"],"Received from clients":["క్లయింట్ల నుండి అందినది","ग्राहकों से प्राप्त"],"Paid out":["చెల్లించినది","भुगतान किया"],"Due on invoices":["బిల్లులపై బాకీ","बिलों पर बाकी"],"Lead follow-ups due":["లీడ్ ఫాలో-అప్‌లు","लीड फॉलो-अप बाकी"],"Equipment hours today":["ఈరోజు యంత్రాల గంటలు","आज मशीन घंटे"],"Latest daily reports":["తాజా రోజువారీ రిపోర్టులు","नई दैनिक रिपोर्ट"],"Build today's report":["నేటి రిపోర్ట్ తయారు చేయి","आज की रिपोर्ट बनाएं"],"Tasks due soon":["త్వరలో పూర్తి చేయాల్సిన పనులు","जल्द होने वाले काम"],"Pending material requests":["పెండింగ్ మెటీరియల్ అభ్యర్థనలు","बाकी सामग्री मांग"],"Home":["హోమ్","होम"],"Chat":["చాట్","चैट"],"Add":["జోడించు","जोड़ें"],"More":["మరిన్ని","और"],"Ask AI":["AI ని అడగండి","AI से पूछें"],"Ask about clients, team, projects, money":["క్లయింట్లు, టీమ్, ప్రాజెక్టులు, డబ్బు గురించి అడగండి","ग्राहक, टीम, प्रोजेक्ट, पैसे के बारे में पूछें"],"Send":["పంపు","भेजें"],"Menu":["మెనూ","मेनू"],"Open menu":["మెనూ తెరువు","मेनू खोलें"],"Collapse menu":["మెనూ మూయి","मेनू बंद करें"],"Language":["భాష","भाषा"],"Main":["ముఖ్య","मुख्य"],"Quick add":["త్వరగా జోడించు","जल्दी जोड़ें"],"Open AI assistant":["AI సహాయకుడిని తెరువు","AI सहायक खोलें"],"AI assistant":["AI సహాయకుడు","AI सहायक"],"Close assistant":["సహాయకుడిని మూయి","सहायक बंद करें"],"Message":["సందేశం","संदेश"],"New project":["కొత్త ప్రాజెక్ట్","नया प्रोजेक्ट"],"Pinned":["పిన్ చేసినవి","पिन किए"],"Search projects":["ప్రాజెక్టులు వెతకండి","प्रोजेक्ट खोजें"],"Material":["మెటీరియల్","सामग्री"],"Inventory":["స్టాక్","स्टॉक"],"Purchase orders":["కొనుగోలు ఆర్డర్లు","खरीद ऑर्डर"],"Material received":["అందిన మెటీరియల్","प्राप्त सामग्री"],"Transfers & requests":["బదిలీలు & అభ్యర్థనలు","ट्रांसफर व मांग"],"Material issue":["మెటీరియల్ ఇచ్చినది","सामग्री जारी"],"Material return":["మెటీరియల్ తిరిగి","सामग्री वापसी"],"Material consumption":["మెటీరియల్ వినియోగం","सामग्री खपत"],"Manpower":["కూలీలు","मज़दूर"],"Equipment":["యంత్రాలు","मशीनें"],"Money":["డబ్బు","पैसा"],"Receive":["స్వీకరించు","प्राप्त"],"Issue":["ఇవ్వు","जारी"],"Unit":["యూనిట్","इकाई"],"Issued":["ఇచ్చినది","जारी किया"],"Returned":["తిరిగి వచ్చినది","वापस"],"Consumed":["వాడినది","खपत"],"In store":["స్టోర్‌లో","स्टोर में"],"Library":["లైబ్రరీ","लाइब्रेरी"],"Planning":["ప్లానింగ్","योजना"],"Progress & quality":["ప్రగతి & నాణ్యత","प्रगति व गुणवत्ता"],"Reports & export":["నివేదికలు & ఎగుమతి","रिपोर्ट व निर्यात"],"Summary & CSV export":["సారాంశం & CSV ఎగుమతి","सारांश व CSV निर्यात"],"Checklists & sheets":["చెక్‌లిస్ట్‌లు & షీట్లు","चेकलिस्ट व शीट"],"Project summary":["ప్రాజెక్ట్ సారాంశం","प्रोजेक्ट सारांश"],"BOQ value":["BOQ విలువ","BOQ मूल्य"],"Work done (₹)":["చేసిన పని (₹)","किया गया काम (₹)"],"Approved changes":["ఆమోదించిన మార్పులు","मंज़ूर बदलाव"],"Man-days":["మనుషుల రోజులు","मानव-दिन"],"Material value":["మెటీరియల్ విలువ","सामग्री मूल्य"],"Balance":["మిగులు","शेष"],"Cost & profit per project":["ప్రతి ప్రాజెక్ట్ ఖర్చు & లాభం","प्रति प्रोजेक्ट लागत व लाभ"],"Contract value (incl. changes)":["ఒప్పంద విలువ (మార్పులతో)","अनुबंध मूल्य (बदलाव सहित)"],"Built-up area":["బిల్ట్-అప్ ఏరియా","बिल्ट-अप एरिया"],"Spent so far":["ఇప్పటివరకు ఖర్చు","अब तक खर्च"],"Cost per sq.ft":["sq.ft కి ఖర్చు","प्रति sq.ft लागत"],"Projected profit":["అంచనా లాభం","अनुमानित लाभ"],"Cash flow forecast":["నగదు ప్రవాహ అంచనా","नकद प्रवाह अनुमान"],"Unpaid invoices (to receive)":["చెల్లించని బిల్లులు (రావాల్సినవి)","बकाया बिल (मिलने हैं)"],"Payment stages coming due (incl. GST)":["రాబోయే చెల్లింపు దశలు (GST తో)","आने वाले भुगतान चरण (GST सहित)"],"Open purchase orders (to pay)":["పెండింగ్ కొనుగోలు ఆర్డర్లు (చెల్లించాల్సినవి)","खुले खरीद ऑर्डर (देने हैं)"],"Labour at current rate (to pay)":["ప్రస్తుత రేటుతో కూలీ (చెల్లించాల్సినది)","मौजूदा दर पर मज़दूरी (देनी है)"],"Net cash position":["నికర నగదు స్థితి","शुद्ध नकद स्थिति"],"Material rate history":["మెటీరియల్ రేట్ల చరిత్ర","सामग्री दर इतिहास"],"Latest":["తాజా","नवीनतम"],"Average":["సగటు","औसत"],"Lowest":["అత్యల్ప","न्यूनतम"],"Highest":["అత్యధిక","अधिकतम"],"Change vs avg":["సగటుతో తేడా","औसत से अंतर"],"Last bought":["చివరి కొనుగోలు","आखिरी खरीद"],"Export to Excel (CSV)":["Excel (CSV) కి ఎగుమతి","Excel (CSV) में निर्यात"],"Vendors":["వెండర్లు","विक्रेता"],"Vendor":["వెండర్","विक्रेता"],"Tasks":["పనులు","काम"],"Task":["పని","काम"],"Issues & snags":["సమస్యలు & లోపాలు","समस्याएं व कमियां"],"Issues":["సమస్యలు","समस्याएं"],"Daily reports":["రోజువారీ రిపోర్టులు","दैनिक रिपोर्ट"],"Camera list":["కెమెరాల జాబితా","कैमरा सूची"],"Leads":["లీడ్స్","लीड्स"],"Lead":["లీడ్","लीड"],"Site surveys":["సైట్ సర్వేలు","साइट सर्वे"],"Change orders":["మార్పు ఆర్డర్లు","बदलाव आदेश"],"Labour":["కూలీలు","मज़दूर"],"Attendance":["హాజరు","हाज़िरी"],"Vendor labour":["కాంట్రాక్ట్ కూలీలు","ठेका मज़दूर"],"Labour work updates":["కూలీ పని అప్‌డేట్లు","मज़दूर काम अपडेट"],"Payments":["చెల్లింపులు","भुगतान"],"Payment":["చెల్లింపు","भुगतान"],"Invoices & quotes":["బిల్లులు & కొటేషన్లు","बिल व कोटेशन"],"Payment stages":["చెల్లింపు దశలు","भुगतान चरण"],"Budget":["బడ్జెట్","बजट"],"Labour advances":["కూలీ అడ్వాన్సులు","मज़दूर एडवांस"],"Equipment usage":["యంత్రాల వినియోగం","मशीन उपयोग"],"Drawings & documents":["డ్రాయింగ్‌లు & పత్రాలు","ड्रॉइंग व दस्तावेज़"],"Campaigns":["ప్రచారాలు","कैंपेन"],"Campaign":["ప్రచారం","कैंपेन"],"Site visits":["సైట్ విజిట్లు","साइट विज़िट"],"Site visit":["సైట్ విజిట్","साइट विज़िट"],"WhatsApp templates":["వాట్సాప్ సందేశాలు","व्हाट्सऐप संदेश"],"Packages":["ప్యాకేజీలు","पैकेज"],"Package":["ప్యాకేజీ","पैकेज"],"Reviews & testimonials":["రివ్యూలు & అభిప్రాయాలు","रिव्यू व प्रशंसापत्र"],"Referrals":["రిఫరల్స్","रेफरल"],"Portfolio":["పోర్ట్‌ఫోలియో","पोर्टफोलियो"],"Photo approvals":["ఫోటో అనుమతులు","फोटो अनुमति"],"Wages (selected month)":["జీతాలు (ఎంచుకున్న నెల)","मज़दूरी (चुना महीना)"],"Party balances":["బాకీలు","बकाया"],"Company":["కంపెనీ","कंपनी"],"Company name":["కంపెనీ పేరు","कंपनी का नाम"],"Address":["చిరునామా","पता"],"State (for GST)":["రాష్ట్రం (GST కోసం)","राज्य (GST के लिए)"],"Invoice number prefix":["బిల్ నంబర్ ప్రారంభం","बिल नंबर प्रीफ़िक्स"],"Default HSN / SAC":["డిఫాల్ట్ HSN / SAC","डिफ़ॉल्ट HSN / SAC"],"Bank name & branch":["బ్యాంక్ పేరు & బ్రాంచ్","बैंक नाम व शाखा"],"Account number":["ఖాతా నంబర్","खाता नंबर"],"UPI ID (shown on invoices)":["UPI ID (బిల్లులపై చూపబడుతుంది)","UPI ID (बिलों पर दिखेगा)"],"MARKETING":["మార్కెటింగ్","मार्केटिंग"],"— used in WhatsApp messages, estimates and portfolio pages":["— వాట్సాప్ సందేశాలు, అంచనాలు, పోర్ట్‌ఫోలియోలో వాడతారు","— व्हाट्सऐप संदेश, अनुमान व पोर्टफोलियो में उपयोग"],"Sales phone":["సేల్స్ ఫోన్","सेल्स फोन"],"Website":["వెబ్‌సైట్","वेबसाइट"],"Brochure link (Drive / website PDF)":["బ్రోచర్ లింక్ (Drive / వెబ్‌సైట్ PDF)","ब्रोशर लिंक (Drive / वेबसाइट PDF)"],"Google review link":["Google రివ్యూ లింక్","Google रिव्यू लिंक"],"Save":["సేవ్ చేయి","सेव करें"],"Team members, roles and access are now on their own page.":["టీమ్ సభ్యులు, పాత్రలు, అనుమతులు ఇప్పుడు వేరే పేజీలో ఉన్నాయి.","टीम सदस्य, रोल व एक्सेस अब अलग पेज पर हैं।"],"Open Team":["టీమ్ తెరువు","टीम खोलें"],"Preview the app as another role":["వేరే పాత్రగా యాప్ చూడండి","दूसरे रोल के रूप में ऐप देखें"],"Choose a role…":["పాత్ర ఎంచుకోండి…","रोल चुनें…"],"Who added, edited, deleted or approved what, and when.":["ఎవరు ఏమి జోడించారు, మార్చారు, తొలగించారు లేదా ఆమోదించారు, ఎప్పుడు.","किसने क्या जोड़ा, बदला, हटाया या मंज़ूर किया, और कब।"],"Open change history":["మార్పుల చరిత్ర తెరువు","बदलाव इतिहास खोलें"],"Backup & restore":["బ్యాకప్ & రీస్టోర్","बैकअप व रीस्टोर"],"Excel backup":["Excel బ్యాకప్","Excel बैकअप"],"Backup file":["బ్యాకప్ ఫైల్","बैकअप फाइल"],"Restore":["రీస్టోర్","रीस्टोर"],"Mark attendance":["హాజరు వేయండి","हाज़िरी लगाएं"],"Wages":["జీతాలు","मज़दूरी"],"Advance":["అడ్వాన్స్","एडवांस"],"Month":["నెల","महीना"],"Export":["ఎగుమతి","निर्यात"],"Worker":["కూలీ","मज़दूर"],"Trade":["పని రకం","काम का प्रकार"],"Daily wage":["రోజు కూలీ","दैनिक मज़दूरी"],"Days":["రోజులు","दिन"],"OT hrs":["OT గంటలు","OT घंटे"],"Earned":["సంపాదించినది","कमाई"],"Advances":["అడ్వాన్సులు","एडवांस"],"To pay":["చెల్లించాలి","देना है"],"Helper":["హెల్పర్","हेल्पर"],"Carpenter":["కార్పెంటర్","बढ़ई"],"Mason":["మేస్త్రీ","मिस्त्री"],"Bar bender":["బార్ బెండర్","बार बेंडर"],"Electrician":["ఎలక్ట్రీషియన్","इलेक्ट्रीशियन"],"Plumber":["ప్లంబర్","प्लंबर"],"Painter":["పెయింటర్","पेंटर"],"Tiler":["టైల్స్ మేస్త్రీ","टाइल मिस्त्री"],"Welder":["వెల్డర్","वेल्डर"],"Total":["మొత్తం","कुल"],"Budget vs actual":["బడ్జెట్ vs ఖర్చు","बजट बनाम खर्च"],"Clients — money to receive":["క్లయింట్లు — రావాల్సిన డబ్బు","ग्राहक — मिलने वाला पैसा"],"Name":["పేరు","नाम"],"Billed":["బిల్ చేసినది","बिल किया"],"Balance due":["బాకీ","बकाया"],"Vendors — money to pay":["వెండర్లు — ఇవ్వాల్సిన డబ్బు","विक्रेता — देने वाला पैसा"],"Bills (material, labour, equipment)":["బిల్లులు (మెటీరియల్, కూలీ, యంత్రాలు)","बिल (सामग्री, मज़दूरी, मशीन)"],"Paid":["చెల్లించినది","भुगतान हुआ"],"Balance to pay":["చెల్లించాల్సిన మిగులు","देने का शेष"],"Budget line":["బడ్జెట్ అంశం","बजट मद"],"Remaining":["మిగిలినది","बाकी"],"Category":["వర్గం","श्रेणी"],"Used":["వాడినది","उपयोग"],"Sub-contract":["సబ్-కాంట్రాక్ట్","सब-कॉन्ट्रैक्ट"],"Site expense":["సైట్ ఖర్చు","साइट खर्च"],"Activity schedule":["పనుల షెడ్యూల్","कार्य अनुसूची"],"Import schedule":["షెడ్యూల్ దిగుమతి","अनुसूची आयात"],"Add activity":["పని జోడించు","काम जोड़ें"],"Activities":["పనులు","काम"],"Completed":["పూర్తయింది","पूरा"],"Should be done by today":["ఈరోజుకు పూర్తి కావాల్సినవి","आज तक पूरा होना चाहिए"],"Behind schedule":["ఆలస్యంగా ఉంది","पीछे चल रहा"],"Today":["ఈరోజు","आज"],"Yesterday":["నిన్న","कल"],"Checklists approved":["ఆమోదించిన చెక్‌లిస్ట్‌లు","मंज़ूर चेकलिस्ट"],"Live cameras":["లైవ్ కెమెరాలు","लाइव कैमरे"],"Add camera":["కెమెరా జోడించు","कैमरा जोड़ें"],"Owner controls access.":["అడ్మిన్ అనుమతి నియంత్రిస్తారు.","एडमिन एक्सेस नियंत्रित करते हैं।"],"Client can see":["క్లయింట్ చూడగలరు","ग्राहक देख सकते हैं"],"Team access":["టీమ్ అనుమతి","टीम एक्सेस"],"Cameras":["కెమెరాలు","कैमरे"],"Online":["ఆన్‌లైన్","ऑनलाइन"],"Offline":["ఆఫ్‌లైన్","ऑफ़लाइन"],"Visible to client":["క్లయింట్‌కు కనిపిస్తుంది","ग्राहक को दिखता है"],"No live link added":["లైవ్ లింక్ జోడించలేదు","लाइव लिंक नहीं जोड़ा"],"Client can view":["క్లయింట్ చూడగలరు","ग्राहक देख सकते हैं"],"All team":["మొత్తం టీమ్","पूरी टीम"],"Client hidden":["క్లయింట్‌కు దాచబడింది","ग्राहक से छिपा"],"Managers only":["మేనేజర్లకు మాత్రమే","केवल मैनेजर"],"Edit":["మార్చు","बदलें"],"Send summary on WhatsApp":["సారాంశం వాట్సాప్‌లో పంపు","सारांश व्हाट्सऐप पर भेजें"],"For information":["సమాచారం కోసం","जानकारी के लिए"],"Add worker":["కూలీని జోడించు","मज़दूर जोड़ें"],"Date":["తేదీ","तारीख"],"Show workers from other sites":["ఇతర సైట్ల కూలీలను చూపు","दूसरी साइटों के मज़दूर दिखाएं"],"All present":["అందరూ హాజరు","सब हाज़िर"],"Clear":["తొలగించు","साफ़ करें"],"Save attendance":["హాజరు సేవ్ చేయి","हाज़िरी सेव करें"],"Present":["హాజరు","हाज़िर"],"Half day":["సగం రోజు","आधा दिन"],"Absent":["గైర్హాజరు","ग़ैरहाज़िर"],"Only the admin and editors can see this history.":["అడ్మిన్, ఎడిటర్లు మాత్రమే ఈ చరిత్ర చూడగలరు.","केवल एडमिन और एडिटर यह इतिहास देख सकते हैं।"],"Search by person, section or text":["వ్యక్తి, విభాగం లేదా పదంతో వెతకండి","व्यक्ति, सेक्शन या शब्द से खोजें"],"Search":["వెతకండి","खोजें"],"Forms & sheets for this project.":["ఈ ప్రాజెక్ట్ ఫారాలు & షీట్లు.","इस प्रोजेक्ट के फ़ॉर्म व शीट।"],"Access":["అనుమతి","एक्सेस"],"Give access to all forms":["అన్ని ఫారాలకు అనుమతి ఇవ్వు","सभी फ़ॉर्म का एक्सेस दें"],"QA checklists":["QA చెక్‌లిస్ట్‌లు","QA चेकलिस्ट"],"QC checklists":["QC చెక్‌లిస్ట్‌లు","QC चेकलिस्ट"],"Owner only":["అడ్మిన్ మాత్రమే","केवल एडमिन"],"New":["కొత్త","नया"],"Not started":["ప్రారంభం కాలేదు","शुरू नहीं"],"In progress":["జరుగుతోంది","चल रहा है"],"On hold":["ఆపబడింది","रुका हुआ"],"Sheets":["షీట్లు","शीट"],"Add your own Excel format":["మీ Excel ఫార్మాట్ జోడించండి","अपना Excel फ़ॉर्मेट जोड़ें"],"Upload Excel format":["Excel ఫార్మాట్ అప్‌లోడ్","Excel फ़ॉर्मेट अपलोड"],"All":["అన్నీ","सभी"],"Unread":["చదవనివి","अपठित"],"Any person":["ఎవరైనా","कोई भी"],"Company (all projects)":["కంపెనీ (అన్ని ప్రాజెక్టులు)","कंपनी (सभी प्रोजेक्ट)"],"Owner, marketing, accounts & site team":["అడ్మిన్, మార్కెటింగ్, అకౌంట్స్ & సైట్ టీమ్","एडमिन, मार्केटिंग, अकाउंट्स व साइट टीम"],"Company-wide chats — no clients":["కంపెనీ చాట్‌లు — క్లయింట్లు ఉండరు","कंपनी चैट — ग्राहक नहीं"],"No messages yet":["ఇంకా సందేశాలు లేవు","अभी कोई संदेश नहीं"],"Choose a project":["ప్రాజెక్ట్ ఎంచుకోండి","प्रोजेक्ट चुनें"],"Choose a chat":["చాట్ ఎంచుకోండి","चैट चुनें"],"✓ sent ·":["✓ పంపబడింది ·","✓ भेजा ·"],"✓✓ blue":["✓✓ నీలం","✓✓ नीला"],"the people you mentioned have seen it ·":["మీరు పేర్కొన్నవారు చూశారు ·","जिनका ज़िक्र किया उन्होंने देखा ·"],"✓✓ red":["✓✓ ఎరుపు","✓✓ लाल"],"everyone in the chat has seen it.":["చాట్‌లో అందరూ చూశారు.","चैट में सबने देख लिया।"],"Search project, client, person or message":["ప్రాజెక్ట్, క్లయింట్, వ్యక్తి లేదా సందేశం వెతకండి","प्रोजेक्ट, ग्राहक, व्यक्ति या संदेश खोजें"],"Search chats":["చాట్‌లు వెతకండి","चैट खोजें"],"Starred messages":["స్టార్ చేసిన సందేశాలు","स्टार संदेश"],"Filter by person":["వ్యక్తి ద్వారా ఫిల్టర్","व्यक्ति से फ़िल्टर"],"Pin to top":["పైన పిన్ చేయి","ऊपर पिन करें"],"Pin":["పిన్","पिन"],"Unpin":["పిన్ తీసివేయి","पिन हटाएं"],"By role":["పాత్ర ప్రకారం","रोल के अनुसार"],"By person":["వ్యక్తి ప్రకారం","व्यक्ति के अनुसार"],"Choose what each role can see and change.":["ప్రతి పాత్ర ఏమి చూడగలదో, మార్చగలదో ఎంచుకోండి.","हर रोल क्या देख और बदल सकता है चुनें।"],"Hidden":["దాచబడింది","छिपा"],"removes the screen from their menu,":["వారి మెనూ నుండి స్క్రీన్ తీసివేస్తుంది,","उनके मेनू से स्क्रीन हटाता है,"],"View only":["చూడటం మాత్రమే","केवल देखना"],"lets them look without changing anything, and":["ఏమీ మార్చకుండా చూడనిస్తుంది, మరియు","बिना बदले देखने देता है, और"],"Add & edit":["జోడించు & మార్చు","जोड़ें व बदलें"],"lets them add entries.":["ఎంట్రీలు జోడించనిస్తుంది.","एंट्री जोड़ने देता है।"],"Changes apply straight away for everyone with that role. Use":["మార్పులు ఆ పాత్ర గల అందరికీ వెంటనే వర్తిస్తాయి. వాడండి","बदलाव उस रोल वाले सभी पर तुरंत लागू होते हैं। उपयोग करें"],"Preview":["ప్రివ్యూ","प्रीव्यू"],"to check exactly what they see.":["వారు ఏమి చూస్తారో తనిఖీ చేయడానికి.","वे क्या देखते हैं जांचने के लिए।"],"Other roles:":["ఇతర పాత్రలు:","अन्य रोल:"],"Default":["డిఫాల్ట్","डिफ़ॉल्ट"],"Custom":["కస్టమ్","कस्टम"],"custom":["కస్టమ్","कस्टम"],"Show all":["అన్నీ చూపు","सब दिखाएं"],"Hide all":["అన్నీ దాచు","सब छिपाएं"],"Reset to default":["డిఫాల్ట్‌కు మార్చు","डिफ़ॉल्ट पर लौटें"],"Reset to role":["పాత్ర ప్రకారం మార్చు","रोल पर लौटें"],"Same as role":["పాత్ర ప్రకారమే","रोल जैसा"],"Site home":["సైట్ హోమ్","साइट होम"],"Show":["చూపు","दिखाएं"],"Pipeline board":["పైప్‌లైన్ బోర్డ్","पाइपलाइन बोर्ड"],"Pipeline":["పైప్‌లైన్","पाइपलाइन"],"Import leads":["లీడ్స్ దిగుమతి","लीड आयात"],"Estimate builder":["అంచనా తయారీ","अनुमान बनाएं"],"Marketing dashboard":["మార్కెటింగ్ డాష్‌బోర్డ్","मार्केटिंग डैशबोर्ड"],"Content library":["ఫోటో లైబ్రరీ","फोटो लाइब्रेरी"],"Leads & pipeline":["లీడ్స్ & పైప్‌లైన్","लीड्स व पाइपलाइन"],"Estimates":["అంచనాలు","अनुमान"],"Content & reviews":["కంటెంట్ & రివ్యూలు","कंटेंट व रिव्यू"],"New lead":["కొత్త లీడ్","नया लीड"],"All branches":["అన్ని బ్రాంచ్‌లు","सभी शाखाएं"],"Other":["ఇతర","अन्य"],"Interiors":["ఇంటీరియర్స్","इंटीरियर"],"Contacted":["సంప్రదించాం","संपर्क किया"],"Quotation sent":["కొటేషన్ పంపాం","कोटेशन भेजा"],"Negotiation":["చర్చలు","बातचीत"],"Won":["గెలిచాం","जीता"],"Lost":["కోల్పోయాం","हारा"],"House construction":["ఇంటి నిర్మాణం","घर निर्माण"],"Price too high":["ధర ఎక్కువ","कीमत ज़्यादा"],"Renovation":["రెనోవేషన్","मरम्मत"],"Plan postponed":["ప్లాన్ వాయిదా","योजना टली"],"Search name, phone, place":["పేరు, ఫోన్, స్థలం వెతకండి","नाम, फोन, जगह खोजें"],"Move forward":["ముందుకు","आगे बढ़ाएं"],"Move back":["వెనక్కి","पीछे करें"],"Done":["పూర్తి","हो गया"],"Customer & house":["కస్టమర్ & ఇల్లు","ग्राहक व घर"],"— optional —":["— ఐచ్ఛికం —","— वैकल्पिक —"],"Built-up area (sq.ft)":["బిల్ట్-అప్ ఏరియా (sq.ft)","बिल्ट-अप एरिया (sq.ft)"],"Floors":["అంతస్తులు","मंज़िलें"],"Extras":["అదనపు పనులు","अतिरिक्त"],"Compound wall":["కాంపౌండ్ వాల్","चारदीवारी"],"Borewell with motor":["మోటార్‌తో బోర్‌వెల్","मोटर सहित बोरवेल"],"Overhead tank":["ఓవర్‌హెడ్ ట్యాంక్","ओवरहेड टैंक"],"Solar water heater":["సోలార్ వాటర్ హీటర్","सोलर वॉटर हीटर"],"Lift provision":["లిఫ్ట్ ఏర్పాటు","लिफ्ट प्रावधान"],"Modular kitchen":["మాడ్యులర్ కిచెన్","मॉड्यूलर किचन"],"Car parking shed":["కార్ పార్కింగ్ షెడ్","कार पार्किंग शेड"],"Estimate":["అంచనా","अनुमान"],"Sub-total":["ఉప మొత్తం","उप-योग"],"Total estimate":["మొత్తం అంచనా","कुल अनुमान"],"Enter the built-up area to see the estimate.":["అంచనా చూడటానికి బిల్ట్-అప్ ఏరియా ఇవ్వండి.","अनुमान देखने के लिए बिल्ट-अप एरिया डालें।"],"Download estimate":["అంచనా డౌన్‌లోడ్","अनुमान डाउनलोड"],"Save to lead":["లీడ్‌కు సేవ్","लीड में सेव"],"Make quotation":["కొటేషన్ తయారు చేయి","कोटेशन बनाएं"],"OK for public use":["బయట వాడటానికి సరే","सार्वजनिक उपयोग के लिए ठीक"],"Internal only":["లోపల మాత్రమే","केवल आंतरिक"],"Mark OK for public":["బయట వాడటానికి అనుమతించు","सार्वजनिक के लिए ठीक करें"],"Make internal":["లోపలికి మార్చు","आंतरिक करें"],"Show only approved for public use":["బయట వాడటానికి అనుమతించినవి మాత్రమే","केवल सार्वजनिक मंज़ूर दिखाएं"],"No photos yet":["ఇంకా ఫోటోలు లేవు","अभी कोई फोटो नहीं"],"Lead → booking":["లీడ్ → బుకింగ్","लीड → बुकिंग"],"Avg first response":["సగటు మొదటి స్పందన","औसत पहला जवाब"],"Site visits today":["ఈరోజు సైట్ విజిట్లు","आज साइट विज़िट"],"Ad spend (active campaigns)":["ప్రకటన ఖర్చు (చురుకైన ప్రచారాలు)","विज्ञापन खर्च (सक्रिय कैंपेन)"],"Cost per lead":["లీడ్‌కు ఖర్చు","प्रति लीड लागत"],"Funnel":["ఫన్నెల్","फ़नल"],"Leads by source":["మూలం ప్రకారం లీడ్స్","स्रोत अनुसार लीड"],"Referral":["రిఫరల్","रेफरल"],"Visits":["విజిట్లు","विज़िट"],"Cost / lead":["ఖర్చు / లీడ్","लागत / लीड"],"Cost / booking":["ఖర్చు / బుకింగ్","लागत / बुकिंग"],"Branches & lost reasons":["బ్రాంచ్‌లు & కోల్పోయిన కారణాలు","शाखाएं व हार के कारण"],"WHY WE LOST":["ఎందుకు కోల్పోయాం","हम क्यों हारे"],"Source":["మూలం","स्रोत"],"Walk-in":["నేరుగా వచ్చారు","सीधे आए"],"Branch":["బ్రాంచ్","शाखा"],"Choose the leads file":["లీడ్స్ ఫైల్ ఎంచుకోండి","लीड फाइल चुनें"],"— CSV or Excel":["— CSV లేదా Excel","— CSV या Excel"],"Client name":["క్లయింట్ పేరు","ग्राहक का नाम"],"Phone":["ఫోన్","फोन"],"Email":["ఇమెయిల్","ईमेल"],"Delete":["తొలగించు","हटाएं"],"Vendor / firm name":["వెండర్ / సంస్థ పేరు","विक्रेता / फर्म का नाम"],"Supplies":["సరఫరా","आपूर्ति"],"Material supplier":["మెటీరియల్ సరఫరాదారు","सामग्री आपूर्तिकर्ता"],"Labour contractor":["లేబర్ కాంట్రాక్టర్","मज़दूर ठेकेदार"],"Equipment hire":["యంత్రాల అద్దె","मशीन किराया"],"All statuses":["అన్ని స్థితులు","सभी स्थितियां"],"WBS / activity ID":["WBS / పని ID","WBS / काम ID"],"Assigned to":["ఎవరికి","किसको सौंपा"],"Due date":["గడువు తేదీ","अंतिम तारीख"],"Progress %":["ప్రగతి %","प्रगति %"],"Status":["స్థితి","स्थिति"],"Resolved":["పరిష్కరించబడింది","हल हुआ"],"Type":["రకం","प्रकार"],"Priority":["ప్రాధాన్యత","प्राथमिकता"],"Fix by":["ఎప్పటికి సరిచేయాలి","कब तक ठीक करें"],"Photos":["ఫోటోలు","फोटो"],"Low":["తక్కువ","कम"],"Medium":["మధ్యస్థం","मध्यम"],"High":["ఎక్కువ","ज़्यादा"],"Safety":["భద్రత","सुरक्षा"],"Share on WhatsApp":["వాట్సాప్‌లో షేర్ చేయి","व्हाट्सऐप पर शेयर करें"],"Weather":["వాతావరణం","मौसम"],"Work done today":["ఈరోజు చేసిన పని","आज किया काम"],"Site photos":["సైట్ ఫోటోలు","साइट फोटो"],"Hot":["ఎండ","गर्मी"],"Cloudy":["మేఘావృతం","बादल"],"Rain":["వర్షం","बारिश"],"How to give access:":["అనుమతి ఎలా ఇవ్వాలి:","एक्सेस कैसे दें:"],"Invite":["ఆహ్వానించు","आमंत्रित करें"],"Invited":["ఆహ్వానించాం","आमंत्रित"],"Active":["చురుకుగా","सक्रिय"],"Inactive":["నిష్క్రియం","निष्क्रिय"],"Mobile (WhatsApp)":["మొబైల్ (వాట్సాప్)","मोबाइल (व्हाट्सऐप)"],"Role":["పాత్ర","रोल"],"Linked app account (after they open the app)":["లింక్ చేసిన యాప్ ఖాతా (యాప్ తెరిచిన తర్వాత)","जुड़ा ऐप खाता (ऐप खोलने के बाद)"],"Full access":["పూర్తి అనుమతి","पूरा एक्सेस"],"Add & edit entries":["ఎంట్రీలు జోడించు & మార్చు","एंट्री जोड़ें व बदलें"],"WhatsApp chat":["వాట్సాప్ చాట్","व्हाट्सऐप चैट"],"Not installed yet":["ఇంకా అమర్చలేదు","अभी नहीं लगाया"],"Camera name (e.g. Main gate)":["కెమెరా పేరు (ఉదా. మెయిన్ గేట్)","कैमरा नाम (जैसे मुख्य गेट)"],"Where on site":["సైట్‌లో ఎక్కడ","साइट पर कहां"],"Brand":["బ్రాండ్","ब्रांड"],"Client can see this camera":["క్లయింట్ ఈ కెమెరా చూడగలరు","ग्राहक यह कैमरा देख सकते हैं"],"Yes":["అవును","हां"],"No":["కాదు","नहीं"],"All team on this project":["ఈ ప్రాజెక్ట్ మొత్తం టీమ్","इस प्रोजेक्ट की पूरी टीम"],"Admin & project managers only":["అడ్మిన్ & ప్రాజెక్ట్ మేనేజర్లు మాత్రమే","केवल एडमिन व प्रोजेक्ट मैनेजर"],"Customer name":["కస్టమర్ పేరు","ग्राहक का नाम"],"Site location":["సైట్ ప్రదేశం","साइट स्थान"],"Requirement":["అవసరం","ज़रूरत"],"Budget (₹)":["బడ్జెట్ (₹)","बजट (₹)"],"Stage":["దశ","चरण"],"Next follow-up":["తదుపరి ఫాలో-అప్","अगला फॉलो-अप"],"Make project":["ప్రాజెక్ట్‌గా మార్చు","प्रोजेक्ट बनाएं"],"Open project":["ప్రాజెక్ట్ తెరువు","प्रोजेक्ट खोलें"],"Structural design":["స్ట్రక్చరల్ డిజైన్","स्ट्रक्चरल डिज़ाइन"],"Survey date":["సర్వే తేదీ","सर्वे तारीख"],"Facing":["ముఖం","दिशा"],"Road width":["రోడ్డు వెడల్పు","सड़क चौड़ाई"],"Soil type":["మట్టి రకం","मिट्टी का प्रकार"],"East":["తూర్పు","पूर्व"],"West":["పడమర","पश्चिम"],"North":["ఉత్తరం","उत्तर"],"South":["దక్షిణం","दक्षिण"],"North-East":["ఈశాన్యం","उत्तर-पूर्व"],"North-West":["వాయువ్యం","उत्तर-पश्चिम"],"South-East":["ఆగ్నేయం","दक्षिण-पूर्व"],"South-West":["నైరుతి","दक्षिण-पश्चिम"],"Hard murrum":["గట్టి మొరం","कड़ा मुरम"],"Red soil":["ఎర్ర మట్టి","लाल मिट्टी"],"Black cotton soil":["నల్ల రేగడి మట్టి","काली मिट्टी"],"Rock":["రాయి","चट्टान"],"Filled-up soil":["నింపిన మట్టి","भराव मिट्टी"],"Not known":["తెలియదు","पता नहीं"],"Item no.":["అంశం సంఖ్య","मद संख्या"],"Description":["వివరణ","विवरण"],"BOQ quantity":["BOQ పరిమాణం","BOQ मात्रा"],"Rate (₹)":["రేటు (₹)","दर (₹)"],"Executed quantity":["చేసిన పరిమాణం","किया गया मात्रा"],"Amount":["మొత్తం","राशि"],"Requested":["అభ్యర్థించారు","मांगा"],"Approved":["ఆమోదించారు","मंज़ूर"],"Rejected":["తిరస్కరించారు","अस्वीकार"],"CO number":["CO నంబర్","CO नंबर"],"What is changing":["ఏమి మారుతోంది","क्या बदल रहा है"],"Requested by":["అభ్యర్థించినవారు","किसने मांगा"],"Cost impact (₹, use minus for savings)":["ఖర్చు ప్రభావం (₹, ఆదాకు మైనస్ వాడండి)","लागत असर (₹, बचत के लिए माइनस)"],"Time impact (days)":["సమయ ప్రభావం (రోజులు)","समय असर (दिन)"],"Quantity":["పరిమాణం","मात्रा"],"Rate (₹ per unit)":["రేటు (₹ / యూనిట్)","दर (₹ प्रति इकाई)"],"Pending":["పెండింగ్","बाकी"],"Delivered":["అందించారు","पहुंचा"],"For project (to)":["ప్రాజెక్ట్‌కు (వరకు)","प्रोजेक्ट के लिए (तक)"],"Request from site":["సైట్ నుండి అభ్యర్థన","साइट से मांग"],"Issued to (gang / sub-contractor)":["ఎవరికి ఇచ్చారు (గ్యాంగ్ / సబ్-కాంట్రాక్టర్)","किसे दिया (गैंग / सब-कॉन्ट्रैक्टर)"],"For which work":["ఏ పని కోసం","किस काम के लिए"],"Returned by":["ఎవరు తిరిగి ఇచ్చారు","किसने लौटाया"],"Used for (e.g. GF slab)":["దేనికి వాడారు (ఉదా. GF స్లాబ్)","किसमें उपयोग (जैसे GF स्लैब)"],"Daily wage (₹)":["రోజు కూలీ (₹)","दैनिक मज़दूरी (₹)"],"Current project":["ప్రస్తుత ప్రాజెక్ట్","मौजूदा प्रोजेक्ट"],"Mark for whole gang":["మొత్తం గ్యాంగ్‌కు వేయండి","पूरे गैंग की लगाएं"],"Overtime hours":["ఓవర్‌టైమ్ గంటలు","ओवरटाइम घंटे"],"Headcount":["మనుషుల సంఖ్య","लोगों की संख्या"],"Rate per head (₹)":["తలకు రేటు (₹)","प्रति व्यक्ति दर (₹)"],"Gang / contractor":["గ్యాంగ్ / కాంట్రాక్టర్","गैंग / ठेकेदार"],"Work item":["పని అంశం","काम मद"],"Quantity done":["చేసిన పరిమాణం","किया गया मात्रा"],"Cost category":["ఖర్చు వర్గం","लागत श्रेणी"],"Paid to / received from (others)":["ఎవరికి చెల్లించారు / ఎవరి నుండి అందింది (ఇతరులు)","किसे दिया / किससे मिला (अन्य)"],"Amount (₹)":["మొత్తం (₹)","राशि (₹)"],"Mode":["విధానం","तरीका"],"Cash":["నగదు","नकद"],"Paid to labour":["కూలీలకు చెల్లించారు","मज़दूरों को दिया"],"Received from client":["క్లయింట్ నుండి అందింది","ग्राहक से मिला"],"Bank transfer":["బ్యాంక్ బదిలీ","बैंक ट्रांसफर"],"Paid to vendor":["వెండర్‌కు చెల్లించారు","विक्रेता को दिया"],"Cheque":["చెక్","चेक"],"Unpaid":["చెల్లించలేదు","बकाया"],"Part paid":["కొంత చెల్లించారు","आंशिक भुगतान"],"Accepted":["అంగీకరించారు","स्वीकार"],"Document":["పత్రం","दस्तावेज़"],"Number":["నంబర్","नंबर"],"Amount before tax (₹)":["పన్ను ముందు మొత్తం (₹)","टैक्स से पहले राशि (₹)"],"Quotation":["కొటేషన్","कोटेशन"],"Tax invoice":["టాక్స్ ఇన్‌వాయిస్","टैक्स इनवॉइस"],"Proforma invoice":["ప్రొఫార్మా ఇన్‌వాయిస్","प्रोफ़ॉर्मा इनवॉइस"],"Download":["డౌన్‌లోడ్","डाउनलोड"],"Stage (e.g. Plinth complete)":["దశ (ఉదా. ప్లింత్ పూర్తి)","चरण (जैसे प्लिंथ पूरा)"],"% of contract value":["ఒప్పంద విలువలో %","अनुबंध मूल्य का %"],"Linked activity (stage becomes due when it is completed)":["లింక్ చేసిన పని (అది పూర్తయినప్పుడు దశ బాకీ అవుతుంది)","जुड़ा काम (पूरा होने पर चरण देय होगा)"],"Upcoming":["రాబోయేది","आने वाला"],"Invoiced":["బిల్ చేసినది","बिल किया"],"Due":["బాకీ","देय"],"Notes":["గమనికలు","नोट्स"],"Draft":["డ్రాఫ్ట్","ड्राफ़्ट"],"Drafts":["డ్రాఫ్ట్‌లు","ड्राफ़्ट"],"Partly received":["కొంత అందింది","आंशिक प्राप्त"],"Cancelled":["రద్దు చేశారు","रद्द"],"PO number":["PO నంబర్","PO नंबर"],"Value":["విలువ","मूल्य"],"Owned or hired":["సొంతం లేదా అద్దె","अपना या किराए पर"],"Rate per hour (₹)":["గంటకు రేటు (₹)","प्रति घंटा दर (₹)"],"Hired from":["ఎవరి నుండి అద్దె","किससे किराए पर"],"JCB / excavator":["JCB / ఎక్స్‌కవేటర్","JCB / खुदाई मशीन"],"Hired":["అద్దె","किराए पर"],"Owned":["సొంతం","अपना"],"Concrete mixer":["కాంక్రీట్ మిక్సర్","कंक्रीट मिक्सर"],"Hours used":["వాడిన గంటలు","उपयोग घंटे"],"Diesel (litres)":["డీజిల్ (లీటర్లు)","डीज़ल (लीटर)"],"Work done":["చేసిన పని","किया गया काम"],"Cost":["ఖర్చు","लागत"],"For approval":["ఆమోదం కోసం","मंज़ूरी के लिए"],"Superseded":["పాతది","पुराना"],"Title":["శీర్షిక","शीर्षक"],"Revision":["రివిజన్","संशोधन"],"Or link (Drive / Dropbox for DWG, Revit, Excel)":["లేదా లింక్ (DWG, Revit, Excel కోసం Drive / Dropbox)","या लिंक (DWG, Revit, Excel के लिए Drive / Dropbox)"],"Architectural drawing":["ఆర్కిటెక్చరల్ డ్రాయింగ్","आर्किटेक्चरल ड्रॉइंग"],"Structural drawing":["స్ట్రక్చరల్ డ్రాయింగ్","स्ट्रक्चरल ड्रॉइंग"],"Open link":["లింక్ తెరువు","लिंक खोलें"],"Campaign name":["ప్రచారం పేరు","कैंपेन नाम"],"Channel":["ఛానల్","चैनल"],"Start":["ప్రారంభం","शुरुआत"],"End":["ముగింపు","अंत"],"Amount spent (₹)":["ఖర్చు చేసినది (₹)","खर्च राशि (₹)"],"Scheduled":["షెడ్యూల్ చేశారు","तय"],"No-show":["రాలేదు","नहीं आए"],"Rescheduled":["తేదీ మార్చారు","दोबारा तय"],"Customer (lead)":["కస్టమర్ (లీడ్)","ग्राहक (लीड)"],"Time":["సమయం","समय"],"Where (running site / office / their plot)":["ఎక్కడ (జరుగుతున్న సైట్ / ఆఫీస్ / వారి ప్లాట్)","कहां (चल रही साइट / ऑफिस / उनका प्लॉट)"],"Our person":["మా వ్యక్తి","हमारा व्यक्ति"],"Customer interest":["కస్టమర్ ఆసక్తి","ग्राहक रुचि"],"Very interested":["చాలా ఆసక్తి","बहुत रुचि"],"Interested":["ఆసక్తి ఉంది","रुचि है"],"Thinking":["ఆలోచిస్తున్నారు","सोच रहे हैं"],"Not interested":["ఆసక్తి లేదు","रुचि नहीं"],"Feedback":["అభిప్రాయం","प्रतिक्रिया"],"Send on WhatsApp":["వాట్సాప్‌లో పంపు","व्हाट्सऐप पर भेजें"],"Customise":["మార్చుకోండి","बदलें"],"customised":["మార్చారు","बदला गया"],"Used for":["దేనికి","किसके लिए"],"First reply":["మొదటి జవాబు","पहला जवाब"],"Brochure":["బ్రోచర్","ब्रोशर"],"Site visit confirmation":["సైట్ విజిట్ నిర్ధారణ","साइट विज़िट पुष्टि"],"Site visit reminder":["సైట్ విజిట్ గుర్తు","साइट विज़िट याद"],"Quotation follow-up":["కొటేషన్ ఫాలో-అప్","कोटेशन फॉलो-अप"],"Review request":["రివ్యూ అభ్యర్థన","रिव्यू अनुरोध"],"Referral thanks":["రిఫరల్ ధన్యవాదాలు","रेफरल धन्यवाद"],"Add the first entry to start keeping records here.":["రికార్డులు ఉంచడానికి మొదటి ఎంట్రీ జోడించండి.","रिकॉर्ड रखने के लिए पहली एंट्री जोड़ें।"],"Package name":["ప్యాకేజీ పేరు","पैकेज नाम"],"Rate per sq.ft (₹)":["sq.ft కి రేటు (₹)","प्रति sq.ft दर (₹)"],"What's included (cement, steel, tiles, paint…)":["ఏమి ఉంటుంది (సిమెంట్, స్టీల్, టైల్స్, పెయింట్…)","क्या शामिल है (सीमेंट, स्टील, टाइल, पेंट…)"],"Price valid till":["ధర చెల్లుబాటు వరకు","कीमत मान्य तक"],"To ask":["అడగాలి","पूछना है"],"Declined":["నిరాకరించారు","मना किया"],"What they said":["వారు ఏమన్నారు","उन्होंने क्या कहा"],"Google review":["Google రివ్యూ","Google रिव्यू"],"Video testimonial":["వీడియో అభిప్రాయం","वीडियो प्रशंसापत्र"],"Written testimonial":["రాతపూర్వక అభిప్రాయం","लिखित प्रशंसापत्र"],"Lead received":["లీడ్ అందింది","लीड मिला"],"Booked":["బుక్ అయింది","बुक हुआ"],"Reward paid":["బహుమతి ఇచ్చాం","इनाम दिया"],"Referred by (client / architect)":["ఎవరు సూచించారు (క్లయింట్ / ఆర్కిటెక్ట్)","किसने भेजा (ग्राहक / आर्किटेक्ट)"],"Their phone":["వారి ఫోన్","उनका फोन"],"New lead they referred":["వారు సూచించిన కొత్త లీడ్","उनका भेजा नया लीड"],"Reward (₹)":["బహుమతి (₹)","इनाम (₹)"],"Built-up (sq.ft)":["బిల్ట్-అప్ (sq.ft)","बिल्ट-अप (sq.ft)"],"Location":["ప్రదేశం","स्थान"],"Best photos (client-approved)":["ఉత్తమ ఫోటోలు (క్లయింట్ ఆమోదించినవి)","सबसे अच्छी फोटो (ग्राहक मंज़ूर)"],"Duplex":["డ్యూప్లెక్స్","डुप्लेक्स"],"Stop preview":["ప్రివ్యూ ఆపు","प्रीव्यू बंद करें"],"Choose your site":["మీ సైట్ ఎంచుకోండి","अपनी साइट चुनें"],"Directions":["దారి","रास्ता"],"Workers today":["ఈరోజు కూలీలు","आज मज़दूर"],"Work on now":["ఇప్పుడు జరుగుతున్న పని","अभी चल रहा काम"],"Add from site":["సైట్ నుండి జోడించండి","साइट से जोड़ें"],"Request material":["మెటీరియల్ అడగండి","सामग्री मांगें"],"Material issued":["ఇచ్చిన మెటీరియల్","जारी सामग्री"],"Issue / snag":["సమస్య / లోపం","समस्या / कमी"],"Work update":["పని అప్‌డేట్","काम अपडेट"],"Equipment hours":["యంత్రాల గంటలు","मशीन घंटे"],"Checklist":["చెక్‌లిస్ట్","चेकलिस्ट"],"All tasks":["అన్ని పనులు","सभी काम"],"Material requested":["అడిగిన మెటీరియల్","मांगी गई सामग्री"],"Update":["అప్‌డేట్","अपडेट"],"Desk":["డెస్క్","डेस्क"],"Drawings":["డ్రాయింగ్‌లు","ड्रॉइंग"],"Schedule":["షెడ్యూల్","अनुसूची"],"Waiting for approval":["ఆమోదం కోసం వేచి ఉంది","मंज़ूरी का इंतज़ार"],"Approved drawings":["ఆమోదించిన డ్రాయింగ్‌లు","मंज़ूर ड्रॉइंग"],"Open site questions":["సైట్ ప్రశ్నలు","साइट के सवाल"],"Change orders open":["పెండింగ్ మార్పు ఆర్డర్లు","खुले बदलाव आदेश"],"Work starting in 3 weeks":["3 వారాల్లో మొదలయ్యే పని","3 हफ़्ते में शुरू होने वाला काम"],"Drawings in progress":["తయారవుతున్న డ్రాయింగ్‌లు","बन रही ड्रॉइंग"],"Register":["రిజిస్టర్","रजिस्टर"],"Questions from site":["సైట్ నుండి ప్రశ్నలు","साइट से सवाल"],"Drawings needed soon":["త్వరలో కావాల్సిన డ్రాయింగ్‌లు","जल्द चाहिए ड्रॉइंग"],"Site photos this week":["ఈ వారం సైట్ ఫోటోలు","इस हफ़्ते की साइट फोटो"],"Check work against your drawings":["మీ డ్రాయింగ్‌లతో పనిని సరిచూడండి","अपनी ड्रॉइंग से काम जांचें"],"No photos this week.":["ఈ వారం ఫోటోలు లేవు.","इस हफ़्ते कोई फोटो नहीं।"],"Upload drawing / revision":["డ్రాయింగ్ / రివిజన్ అప్‌లోడ్","ड्रॉइंग / संशोधन अपलोड"],"Reply":["జవాబు","जवाब"],"My home":["నా ఇల్లు","मेरा घर"],"Progress photos":["ప్రగతి ఫోటోలు","प्रगति फोटो"],"Work completed":["పూర్తయిన పని","पूरा काम"],"Planned handover":["అప్పగింత తేదీ","सौंपने की तारीख"],"Paid so far":["ఇప్పటివరకు చెల్లించినది","अब तक भुगतान"],"Due now":["ఇప్పుడు బాకీ","अभी देय"],"NOW HAPPENING":["ఇప్పుడు జరుగుతోంది","अभी चल रहा"],"COMING NEXT":["తర్వాత రాబోయేది","आगे आने वाला"],"LATEST SITE UPDATES":["తాజా సైట్ అప్‌డేట్లు","नए साइट अपडेट"],"CHANGES WAITING FOR YOUR APPROVAL":["మీ ఆమోదం కోసం మార్పులు","आपकी मंज़ूरी के लिए बदलाव"],"Approve":["ఆమోదించు","मंज़ूर करें"],"Reject":["తిరస్కరించు","अस्वीकार करें"],"PAYMENT STAGES":["చెల్లింపు దశలు","भुगतान चरण"],"APPROVED DRAWINGS":["ఆమోదించిన డ్రాయింగ్‌లు","मंज़ूर ड्रॉइंग"],"Photos from the site team appear here every day.":["సైట్ టీమ్ ఫోటోలు రోజూ ఇక్కడ కనిపిస్తాయి.","साइट टीम की फोटो रोज़ यहां दिखेंगी।"],"Contract value":["ఒప్పంద విలువ","अनुबंध मूल्य"],"Balance to complete":["పూర్తి చేయడానికి మిగిలినది","पूरा करने के लिए शेष"],"Pay by UPI to":["UPI ద్వారా చెల్లించండి","UPI से भुगतान करें"],"BILLS":["బిల్లులు","बिल"],"PAYMENTS RECEIVED":["అందిన చెల్లింపులు","प्राप्त भुगतान"],"Download bill":["బిల్ డౌన్‌లోడ్","बिल डाउनलोड"],"Cancel":["రద్దు","रद्द करें"],"Close":["మూయి","बंद करें"],"Start date":["ప్రారంభ తేదీ","शुरू तारीख"],"Predecessors":["ముందు పనులు","पिछले काम"],"Resource / gang (from schedule)":["వనరు / గ్యాంగ్ (షెడ్యూల్ నుండి)","संसाधन / गैंग (अनुसूची से)"],"Site issue":["సైట్ సమస్య","साइट समस्या"],"Client complaint":["క్లయింట్ ఫిర్యాదు","ग्राहक शिकायत"],"Snag (quality defect)":["లోపం (నాణ్యత)","कमी (गुणवत्ता)"],"Details":["వివరాలు","विवरण"],"Photo upload needs Contributor access.":["ఫోటో అప్‌లోడ్‌కు Contributor అనుమతి కావాలి.","फोटो अपलोड के लिए Contributor एक्सेस चाहिए।"],"File upload needs Contributor access.":["ఫైల్ అప్‌లోడ్‌కు Contributor అనుమతి కావాలి.","फाइल अपलोड के लिए Contributor एक्सेस चाहिए।"],"Plan for tomorrow":["రేపటి ప్లాన్","कल की योजना"],"Hindrances":["ఆటంకాలు","रुकावटें"],"All projects (now and future)":["అన్ని ప్రాజెక్టులు (ఇప్పుడు, భవిష్యత్తు)","सभी प्रोजेक्ट (अभी और आगे)"],"Model":["మోడల్","मॉडल"],"Device serial / NVR ID (no passwords)":["డివైస్ సీరియల్ / NVR ID (పాస్‌వర్డ్‌లు వద్దు)","डिवाइस सीरियल / NVR ID (पासवर्ड नहीं)"],"NVR channel no.":["NVR ఛానల్ నం.","NVR चैनल नं."],"Link to open in brand app / cloud (optional)":["బ్రాండ్ యాప్ / క్లౌడ్‌లో తెరిచే లింక్ (ఐచ్ఛికం)","ब्रांड ऐप / क्लाउड में खोलने का लिंक (वैकल्पिक)"],"Installed on":["అమర్చిన తేదీ","लगाने की तारीख"],"Snapshots":["స్నాప్‌షాట్లు","स्नैपशॉट"],"Design only":["డిజైన్ మాత్రమే","केवल डिज़ाइन"],"Commercial building":["వాణిజ్య భవనం","व्यावसायिक भवन"],"Plot / built-up size":["ప్లాట్ / బిల్ట్-అప్ సైజ్","प्लॉट / बिल्ट-अप साइज़"],"If lost — why":["కోల్పోతే — ఎందుకు","हारे तो — क्यों"],"Chose another builder":["వేరే బిల్డర్‌ను ఎంచుకున్నారు","दूसरा बिल्डर चुना"],"Loan not approved":["లోన్ మంజూరు కాలేదు","लोन मंज़ूर नहीं"],"Not reachable":["అందుబాటులో లేరు","संपर्क नहीं"],"Plot / approval issue":["ప్లాట్ / అనుమతి సమస్య","प्लॉट / मंज़ूरी समस्या"],"Ground level vs road":["రోడ్డుతో భూమి ఎత్తు","सड़क से ज़मीन का स्तर"],"Water, power, drainage available":["నీరు, కరెంట్, డ్రైనేజ్ అందుబాటు","पानी, बिजली, नाली उपलब्ध"],"Neighbouring buildings / setbacks":["పక్క భవనాలు / సెట్‌బ్యాక్‌లు","पड़ोसी भवन / सेटबैक"],"Lumpsum":["లంప్‌సమ్","एकमुश्त"],"Points":["పాయింట్లు","पॉइंट"],"Site team":["సైట్ టీమ్","साइट टीम"],"Sketch / drawing":["స్కెచ్ / డ్రాయింగ్","स्केच / ड्रॉइंग"],"Tonne":["టన్ను","टन"],"Litre":["లీటర్","लीटर"],"Load":["లోడ్","लोड"],"Bill / challan no.":["బిల్ / చలాన్ నం.","बिल / चालान नं."],"Bill photo":["బిల్ ఫోటో","बिल फोटो"],"Transfer between sites":["సైట్ల మధ్య బదిలీ","साइटों के बीच ट्रांसफर"],"From project (transfers only)":["ఏ ప్రాజెక్ట్ నుండి (బదిలీలకు మాత్రమే)","किस प्रोजेक्ट से (केवल ट्रांसफर)"],"Needed by":["ఎప్పటికి కావాలి","कब तक चाहिए"],"Design & approvals":["డిజైన్ & అనుమతులు","डिज़ाइन व मंज़ूरी"],"Client (if received)":["క్లయింట్ (అందితే)","ग्राहक (अगर मिला)"],"Vendor (if paid to vendor)":["వెండర్ (వెండర్‌కు చెల్లిస్తే)","विक्रेता (अगर विक्रेता को दिया)"],"Reference no.":["రిఫరెన్స్ నం.","संदर्भ नं."],"Receipt photo":["రసీదు ఫోటో","रसीद फोटो"],"Description of work":["పని వివరణ","काम का विवरण"],"No GST":["GST లేదు","GST नहीं"],"HSN / SAC code":["HSN / SAC కోడ్","HSN / SAC कोड"],"Amount received so far (₹)":["ఇప్పటివరకు అందిన మొత్తం (₹)","अब तक मिली राशि (₹)"],"Or fixed amount before tax (₹)":["లేదా పన్ను ముందు స్థిర మొత్తం (₹)","या टैक्स से पहले तय राशि (₹)"],"Due date (if no linked activity)":["గడువు తేదీ (లింక్ చేసిన పని లేకపోతే)","अंतिम तारीख (अगर जुड़ा काम नहीं)"],"Deliver by":["ఎప్పటికి అందించాలి","कब तक पहुंचाएं"],"Terms (GST, transport, payment)":["నిబంధనలు (GST, రవాణా, చెల్లింపు)","शर्तें (GST, परिवहन, भुगतान)"],"Vibrator":["వైబ్రేటర్","वाइब्रेटर"],"Crane / hoist":["క్రేన్ / హాయిస్ట్","क्रेन / होइस्ट"],"Tractor / tipper":["ట్రాక్టర్ / టిప్పర్","ट्रैक्टर / टिपर"],"Shuttering set":["షట్టరింగ్ సెట్","शटरिंग सेट"],"Scaffolding":["స్కాఫోల్డింగ్","पाड़"],"Generator":["జనరేటర్","जनरेटर"],"Water pump":["నీటి పంపు","पानी पंप"],"Operator":["ఆపరేటర్","ऑपरेटर"],"Electrical / plumbing":["ఎలక్ట్రికల్ / ప్లంబింగ్","इलेक्ट्रिकल / प्लंबिंग"],"Approval / permit":["అనుమతి / పర్మిట్","मंज़ूरी / परमिट"],"Agreement":["ఒప్పందం","अनुबंध"],"BOQ / estimate":["BOQ / అంచనా","BOQ / अनुमान"],"Report":["రిపోర్ట్","रिपोर्ट"],"Hoardings / flyers":["హోర్డింగ్‌లు / కరపత్రాలు","होर्डिंग / पर्चे"],"Newspaper":["వార్తాపత్రిక","अख़बार"],"Referral drive":["రిఫరల్ ప్రచారం","रेफरल अभियान"],"Notes / target area":["గమనికలు / లక్ష్య ప్రాంతం","नोट्स / लक्ष्य क्षेत्र"],"Stars":["స్టార్లు","स्टार"],"Review / video link":["రివ్యూ / వీడియో లింక్","रिव्यू / वीडियो लिंक"],"Independent house":["ఇండిపెండెంట్ ఇల్లు","स्वतंत्र मकान"],"Villa":["విల్లా","विला"],"Apartment":["అపార్ట్‌మెంట్","अपार्टमेंट"],"Commercial":["వాణిజ్య","व्यावसायिक"],"Completed in (months)":["ఎన్ని నెలల్లో పూర్తి","कितने महीनों में पूरा"],"Summary":["సారాంశం","सारांश"],"Client quote":["క్లయింట్ మాట","ग्राहक का कथन"],"Quote by":["ఎవరి మాట","किसका कथन"],"Published":["ప్రచురించారు","प्रकाशित"],"Group":["గ్రూప్","ग्रुप"],"Archive":["ఆర్కైవ్","आर्काइव"],"Unarchive":["ఆర్కైవ్ నుండి తీయి","आर्काइव से निकालें"],"Archived":["ఆర్కైవ్ చేసినవి","आर्काइव"],"Archived chats":["ఆర్కైవ్ చేసిన చాట్‌లు","आर्काइव चैट"],"Archived in this project":["ఈ ప్రాజెక్ట్‌లో ఆర్కైవ్","इस प्रोजेक्ट में आर्काइव"],"Swipe a chat left to delete · right to archive":["తొలగించడానికి చాట్‌ను ఎడమకు · ఆర్కైవ్‌కు కుడికి జరపండి","हटाने के लिए चैट बाएं · आर्काइव के लिए दाएं खिसकाएं"],"Swipe right to unarchive · swipe left to delete.":["ఆర్కైవ్ తీయడానికి కుడికి · తొలగించడానికి ఎడమకు జరపండి.","आर्काइव हटाने के लिए दाएं · हटाने के लिए बाएं खिसकाएं।"],"Start a chat with":["వీరితో చాట్ మొదలు పెట్టండి","इनसे चैट शुरू करें"],"Chats":["చాట్‌లు","चैट"],"Mention:":["పేర్కొను:","ज़िक्र करें:"],"Back to projects":["ప్రాజెక్టులకు వెనక్కి","प्रोजेक्ट पर वापस"],"Back to chats":["చాట్‌లకు వెనక్కి","चैट पर वापस"],"Back":["వెనక్కి","वापस"],"People in this chat":["ఈ చాట్‌లో వ్యక్తులు","इस चैट के लोग"],"Message options":["సందేశ ఎంపికలు","संदेश विकल्प"],"New group":["కొత్త గ్రూప్","नया ग्रुप"],"Edit group":["గ్రూప్ మార్చు","ग्रुप बदलें"],"Group name":["గ్రూప్ పేరు","ग्रुप नाम"],"Member":["సభ్యుడు","सदस्य"],"can add or remove people and rename ·":["వ్యక్తులను జోడించగలరు, తీసేయగలరు, పేరు మార్చగలరు ·","लोग जोड़-हटा और नाम बदल सकते हैं ·"],"can read and send ·":["చదవగలరు, పంపగలరు ·","पढ़ और भेज सकते हैं ·"],"can only read":["చదవడం మాత్రమే","केवल पढ़ सकते हैं"],"Create group":["గ్రూప్ తయారు చేయి","ग्रुप बनाएं"],"Save group":["గ్రూప్ సేవ్ చేయి","ग्रुप सेव करें"],"Delete group":["గ్రూప్ తొలగించు","ग्रुप हटाएं"],"Search name or role":["పేరు లేదా పాత్ర వెతకండి","नाम या रोल खोजें"],"Who can see this group — tick each person and choose what they can do":["ఈ గ్రూప్ ఎవరు చూడగలరు — ప్రతి వ్యక్తిని టిక్ చేసి, వారు ఏమి చేయగలరో ఎంచుకోండి","यह ग्रुप कौन देख सकता है — हर व्यक्ति चुनें और उनकी अनुमति तय करें"],"Or make a chat for whole roles (everyone with that role on the project)":["లేదా మొత్తం పాత్రలకు చాట్ (ప్రాజెక్ట్‌లో ఆ పాత్ర గల అందరూ)","या पूरे रोल के लिए चैट (प्रोजेक्ट में उस रोल के सभी)"],"Forward":["ఫార్వర్డ్","फ़ॉरवर्ड"],"Forward to…":["ఎవరికి ఫార్వర్డ్…","किसे फ़ॉरवर्ड करें…"],"Forwarded":["ఫార్వర్డ్ చేసినది","फ़ॉरवर्ड किया"],"Copy":["కాపీ","कॉपी"],"Info":["వివరాలు","जानकारी"],"Star":["స్టార్","स्टार"],"Unstar":["స్టార్ తీసివేయి","स्टार हटाएं"],"Delete for me":["నాకు తొలగించు","मेरे लिए हटाएं"],"Delete for everyone":["అందరికీ తొలగించు","सबके लिए हटाएं"],"Edited":["మార్చబడింది","बदला गया"],"Type a message":["సందేశం టైప్ చేయండి","संदेश लिखें"],"Not seen yet":["ఇంకా చూడలేదు","अभी नहीं देखा"],"Undo":["రద్దు","पूर्ववत"],"Seen by everyone in this chat":["చాట్‌లో అందరూ చూశారు","चैट में सबने देखा"],"Editing message":["సందేశం మారుస్తున్నారు","संदेश बदल रहे हैं"],"This message was deleted":["ఈ సందేశం తొలగించబడింది","यह संदेश हटाया गया"],"You deleted this message":["మీరు ఈ సందేశం తొలగించారు","आपने यह संदेश हटाया"],"Only you so far":["ఇప్పటికి మీరు మాత్రమే","अभी तक केवल आप"],"No chats yet — start one below.":["ఇంకా చాట్‌లు లేవు — కింద మొదలు పెట్టండి.","अभी कोई चैट नहीं — नीचे शुरू करें।"],"Start the conversation. Tap a name below to mention someone.":["సంభాషణ మొదలు పెట్టండి. ఎవరినైనా పేర్కొనడానికి కింద పేరు నొక్కండి.","बातचीत शुरू करें। किसी का ज़िक्र करने के लिए नीचे नाम दबाएं।"],"You can read this group. Only its admins and members can send messages.":["మీరు ఈ గ్రూప్ చదవగలరు. అడ్మిన్‌లు, సభ్యులు మాత్రమే సందేశాలు పంపగలరు.","आप यह ग्रुप पढ़ सकते हैं। केवल एडमिन व सदस्य संदेश भेज सकते हैं।"],"Good morning":["శుభోదయం","सुप्रभात"],"Good afternoon":["నమస్కారం","नमस्ते"],"Good evening":["శుభ సాయంత్రం","शुभ संध्या"],"Welcome":["స్వాగతం","स्वागत है"],"Previewing as":["ప్రివ్యూ చూస్తున్నారు:","प्रीव्यू:"],"This is what someone with this role sees (all projects shown for the preview).":["ఈ పాత్ర గలవారు చూసేది ఇదే (ప్రివ్యూ కోసం అన్ని ప్రాజెక్టులు చూపబడ్డాయి).","इस रोल वाले यही देखते हैं (प्रीव्यू में सभी प्रोजेक्ट दिखाए गए)।"],"Other roles":["ఇతర పాత్రలు","अन्य रोल"],"Projects this person can open":["ఈ వ్యక్తి తెరవగల ప్రాజెక్టులు","यह व्यक्ति कौन से प्रोजेक्ट खोल सकता है"],"Change":["మార్చు","बदलें"],"None":["ఏదీ లేదు","कोई नहीं"],"entries":["ఎంట్రీలు","एंट्री"],"entry":["ఎంట్రీ","एंट्री"],"screens":["స్క్రీన్లు","स्क्रीन"],"people":["మంది","लोग"],"leads":["లీడ్స్","लीड"],"won":["గెలిచాం","जीते"],"late":["ఆలస్యం","देर"],"days":["రోజులు","दिन"],"hrs":["గంటలు","घंटे"],"min":["నిమి","मिनट"],"photos":["ఫోటోలు","फोटो"],"personal limits":["వ్యక్తిగత పరిమితులు","व्यक्तिगत सीमाएं"],"Only for":["వీరికి మాత్రమే","केवल इनके लिए"],"No team members yet":["ఇంకా టీమ్ సభ్యులు లేరు","अभी कोई टीम सदस्य नहीं"],"Keep these words in English":["ఈ పదాలు ఇంగ్లీష్‌లోనే ఉంచండి","ये शब्द अंग्रेज़ी में ही रखें"],"Choose language":["భాష ఎంచుకోండి","भाषा चुनें"],"Excavation":["తవ్వకం","खुदाई"],"Anti Termite Treatment":["చెదల నివారణ","दीमक रोधी उपचार"],"Reinforcement":["స్టీల్ కట్టడం","सरिया बांधना"],"Shuttering":["షట్టరింగ్","शटरिंग"],"Pre Concreting":["కాంక్రీట్ ముందు","कंक्रीट से पहले"],"Concreting":["కాంక్రీటింగ్","कंक्रीटिंग"],"Masonry":["ఇటుక పని","चिनाई"],"Plastering":["ప్లాస్టరింగ్","प्लास्टर"],"Tiling — Wall Dadoing & Flooring":["టైల్స్ — గోడ డాడో & ఫ్లోరింగ్","टाइल — दीवार डाडो व फ़्लोरिंग"],"Granite / Marble Laying":["గ్రానైట్ / మార్బుల్ వేయడం","ग्रेनाइट / मार्बल बिछाना"],"Painting Works":["పెయింటింగ్ పనులు","पेंटिंग काम"],"Surveying & Setting Out":["సర్వే & మార్కింగ్","सर्वे व मार्किंग"],"Earthwork & Backfilling":["మట్టి పని & నింపడం","मिट्टी काम व भराई"],"Electrical Installation Works":["ఎలక్ట్రికల్ పనులు","इलेक्ट्रिकल काम"],"Plumbing, Sanitary & Water Supply":["ప్లంబింగ్, శానిటరీ & నీటి సరఫరా","प्लंबिंग, सैनिटरी व पानी सप्लाई"],"Fabrication Works":["ఫ్యాబ్రికేషన్ పనులు","फ़ैब्रिकेशन काम"],"Interior False Ceiling":["ఇంటీరియర్ ఫాల్స్ సీలింగ్","इंटीरियर फ़ॉल्स सीलिंग"],"Interior Furniture, Storage, Partition & Furnishing":["ఇంటీరియర్ ఫర్నిచర్, స్టోరేజ్, పార్టిషన్ & ఫర్నిషింగ్","इंटीरियर फ़र्नीचर, स्टोरेज, पार्टीशन व फ़र्निशिंग"],"BOQ (Bill of Quantities)":["BOQ (పరిమాణాల బిల్)","BOQ (मात्रा बिल)"],"Material Reconciliation — Planned vs Actual":["మెటీరియల్ లెక్క — ప్లాన్ vs అసలు","सामग्री मिलान — योजना बनाम वास्तविक"],"Billing Format — RA Bill":["బిల్లింగ్ ఫార్మాట్ — RA బిల్","बिलिंग फ़ॉर्मेट — RA बिल"],"Journal Entry":["జర్నల్ ఎంట్రీ","जर्नल एंट्री"],"General Ledger & Trial Balance":["జనరల్ లెడ్జర్ & ట్రయల్ బ్యాలెన్స్","जनरल लेजर व ट्रायल बैलेंस"],"Expense Report":["ఖర్చుల రిపోర్ట్","खर्च रिपोर्ट"],"RA bill":["RA బిల్","RA बिल"],"Follow-up":["ఫాలో-అప్","फॉलो-अप"],"issues & snag":["సమస్యలు & లోపం","समस्या व कमी"],"issues":["సమస్యలు","समस्याएं"],"snag":["లోపం","कमी"],"site":["సైట్","साइट"],"Site":["సైట్","साइट"],"work":["పని","काम"],"Work":["పని","काम"],"report":["రిపోర్ట్","रिपोर्ट"],"daily":["రోజువారీ","दैनिक"],"survey":["సర్వే","सर्वे"],"order":["ఆర్డర్","ऑर्डर"],"purchase":["కొనుగోలు","खरीद"],"received":["అందినది","प्राप्त"],"return":["తిరిగి","वापसी"],"consumption":["వినియోగం","खपत"],"request":["అభ్యర్థన","मांग"],"transfers & request":["బదిలీలు & అభ్యర్థన","ट्रांसफर व मांग"],"advance":["అడ్వాన్స్","एडवांस"],"update":["అప్‌డేట్","अपडेट"],"usage":["వినియోగం","उपयोग"],"document":["పత్రం","दस्तावेज़"],"drawings & document":["డ్రాయింగ్‌లు & పత్రం","ड्रॉइंग व दस्तावेज़"],"invoices & quote":["బిల్లులు & కొటేషన్","बिल व कोटेशन"],"reviews & testimonial":["రివ్యూలు & అభిప్రాయం","रिव्यू व प्रशंसापत्र"],"whatsapp template":["వాట్సాప్ సందేశం","व्हाट्सऐप संदेश"],"photo approval":["ఫోటో అనుమతి","फोटो अनुमति"],"camera list":["కెమెరా జాబితా","कैमरा सूची"],"payment stage":["చెల్లింపు దశ","भुगतान चरण"],"change order":["మార్పు ఆర్డర్","बदलाव आदेश"],"labour work update":["కూలీ పని అప్‌డేట్","मज़दूर काम अपडेट"],"vendor labour":["కాంట్రాక్ట్ కూలీలు","ठेका मज़दूर"],"material received":["అందిన మెటీరియల్","प्राप्त सामग्री"],"material issue":["మెటీరియల్ ఇచ్చినది","सामग्री जारी"],"material return":["మెటీరియల్ తిరిగి","सामग्री वापसी"],"material consumption":["మెటీరియల్ వినియోగం","सामग्री खपत"],"labour advance":["కూలీ అడ్వాన్స్","मज़दूर एडवांस"],"equipment usage":["యంత్రాల వినియోగం","मशीन उपयोग"],"purchase order":["కొనుగోలు ఆర్డర్","खरीद ऑर्डर"],"site survey":["సైట్ సర్వే","साइट सर्वे"],"site visit":["సైట్ విజిట్","साइट विज़िट"],"daily report":["రోజువారీ రిపోర్ట్","दैनिक रिपोर्ट"],"referral":["రిఫరల్","रेफरल"],"portfolio":["పోర్ట్‌ఫోలియో","पोर्टफोलियो"],"package":["ప్యాకేజీ","पैकेज"],"campaign":["ప్రచారం","कैंपेन"],"lead":["లీడ్","लीड"],"client":["క్లయింట్","ग्राहक"],"vendor":["వెండర్","विक्रेता"],"task":["పని","काम"],"team":["టీమ్","टीम"],"labour":["కూలీ","मज़दूर"],"attendance":["హాజరు","हाज़िरी"],"payment":["చెల్లింపు","भुगतान"],"budget":["బడ్జెట్","बजट"],"equipment":["యంత్రం","मशीन"],"camera":["కెమెరా","कैमरा"],"worker":["కూలీ","मज़दूर"],"gang":["గ్యాంగ్","गैंग"],"of":["యొక్క","का"],"for":["కోసం","के लिए"],"from":["నుండి","से"],"to":["కు","को"],"and":["మరియు","और"],"or":["లేదా","या"],"with":["తో","के साथ"],"per":["ప్రతి","प्रति"],"by":["ద్వారా","द्वारा"],"in":["లో","में"],"on":["పై","पर"],"no":["లేదు","नहीं"],"the":["-","-"],"a":["-","-"],"Plot":["ప్లాట్","प्लॉट"],"gate":["గేట్","गेट"],"roof":["రూఫ్","छत"],"slab":["స్లాబ్","स्लैब"],"columns":["కాలమ్స్","कॉलम"],"column":["కాలమ్","कॉलम"],"beams":["బీమ్స్","बीम"],"beam":["బీమ్","बीम"],"footing":["ఫుటింగ్","फ़ुटिंग"],"plinth":["ప్లింత్","प्लिंथ"],"Brickwork":["ఇటుక పని","चिनाई"],"brickwork":["ఇటుక పని","चिनाई"],"Cement":["సిమెంట్","सीमेंट"],"cement":["సిమెంట్","सीमेंट"],"Steel":["స్టీల్","स्टील"],"steel":["స్టీల్","स्टील"],"Sand":["ఇసుక","रेत"],"sand":["ఇసుక","रेत"],"bags":["బస్తాలు","बोरी"],"Bags":["బస్తాలు","बोरी"],"Kg":["కిలో","किलो"],"complete":["పూర్తి","पूरा"],"Booking":["బుకింగ్","बुकिंग"],"agreement":["ఒప్పందం","अनुबंध"],"Foundation":["పునాది","नींव"],"cast":["వేశారు","ढाला"],"Finishing":["ఫినిషింగ్","फ़िनिशिंग"],"handover":["అప్పగింత","सौंपना"],"new":["కొత్త","नया"],"open":["పెండింగ్","खुला"],"due":["బాకీ","देय"],"today":["ఈరోజు","आज"],"week":["వారం","हफ़्ता"],"month":["నెల","महीना"],"year":["సంవత్సరం","साल"],"months":["నెలలు","महीने"],"weeks":["వారాలు","हफ़्ते"],"hours":["గంటలు","घंटे"],"workers":["కూలీలు","मज़दूर"],"present":["హాజరు","हाज़िर"],"approved":["ఆమోదించారు","मंज़ूर"],"received from client":["క్లయింట్ నుండి అందింది","ग्राहक से मिला"],"Ready-made messages are built in for every step. Tap":["ప్రతి దశకు సిద్ధంగా ఉన్న సందేశాలు ఉన్నాయి. నొక్కండి","हर चरण के लिए तैयार संदेश हैं। दबाएं"],"to change the wording — your version is then used everywhere (follow-ups, pipeline, site visits, reviews).":["మాటలు మార్చడానికి — మీ వెర్షన్ అన్నిచోట్లా వాడబడుతుంది (ఫాలో-అప్‌లు, పైప్‌లైన్, సైట్ విజిట్లు, రివ్యూలు).","शब्द बदलने के लिए — आपका वर्ज़न हर जगह उपयोग होगा (फॉलो-अप, पाइपलाइन, साइट विज़िट, रिव्यू)।"],"Every new lead gets a first reply, then follow-ups on day 1, 3, 7 and 15 after first contact. Tap":["ప్రతి కొత్త లీడ్‌కు మొదటి జవాబు, తర్వాత 1, 3, 7, 15వ రోజుల్లో ఫాలో-అప్‌లు. నొక్కండి","हर नए लीड को पहला जवाब, फिर 1, 3, 7 और 15वें दिन फॉलो-अप। दबाएं"],"to open WhatsApp with the message ready, then tap":["సందేశంతో వాట్సాప్ తెరవడానికి, తర్వాత నొక్కండి","संदेश के साथ व्हाट्सऐप खोलने के लिए, फिर दबाएं"],"so the next step is scheduled. Edit the wording under WhatsApp templates.":["తదుపరి దశ షెడ్యూల్ అవుతుంది. వాట్సాప్ సందేశాలలో మాటలు మార్చండి.","ताकि अगला चरण तय हो। व्हाट्सऐप संदेश में शब्द बदलें।"],"No follow-ups due":["ఫాలో-అప్‌లు లేవు","कोई फॉलो-अप बाकी नहीं"],"All leads are up to date.":["అన్ని లీడ్స్ తాజాగా ఉన్నాయి.","सभी लीड अपडेट हैं।"],"Drag a card to another column, or use ◀ ▶. Moving to Lost asks for the reason.":["కార్డ్‌ను వేరే కాలమ్‌కు లాగండి, లేదా ◀ ▶ వాడండి. కోల్పోయాంకు మారిస్తే కారణం అడుగుతుంది.","कार्ड को दूसरे कॉलम में खींचें, या ◀ ▶ उपयोग करें। हारा में डालने पर कारण पूछेगा।"],"Why was this lead lost?":["ఈ లీడ్ ఎందుకు కోల్పోయాం?","यह लीड क्यों हारे?"],"Mark as Lost":["కోల్పోయాం అని గుర్తించు","हारा मार्क करें"],"Duplicates (same phone) are skipped. Fully automatic capture needs the live backend.":["ఒకే ఫోన్ ఉన్నవి వదిలేస్తాం. పూర్తి ఆటోమేటిక్‌కు లైవ్ బ్యాకెండ్ కావాలి.","एक ही फोन वाले छोड़े जाते हैं। पूरे ऑटोमैटिक के लिए लाइव बैकएंड चाहिए।"],"Add your packages first":["ముందు మీ ప్యాకేజీలు జోడించండి","पहले अपने पैकेज जोड़ें"],"Add package":["ప్యాకేజీ జోడించు","पैकेज जोड़ें"],"Keep these words in English (comma separated)":["ఈ పదాలు ఇంగ్లీష్‌లోనే ఉంచండి (కామాలతో వేరు చేయండి)","ये शब्द अंग्रेज़ी में ही रखें (कॉमा से अलग करें)"],"Site words like BOQ, GST, DPR, RCC, PCC, sq.ft, WhatsApp always stay in English. Names, addresses and chat messages are never changed.":["BOQ, GST, DPR, RCC, PCC, sq.ft, WhatsApp వంటి సైట్ పదాలు ఎప్పుడూ ఇంగ్లీష్‌లోనే ఉంటాయి. పేర్లు, చిరునామాలు, చాట్ సందేశాలు మారవు.","BOQ, GST, DPR, RCC, PCC, sq.ft, WhatsApp जैसे साइट शब्द हमेशा अंग्रेज़ी में रहते हैं। नाम, पते और चैट संदेश नहीं बदलते।"],"Task late":["ఆలస్యమైన పని","देर वाला काम"],"Follow up lead":["లీడ్ ఫాలో-అప్","लीड फॉलो-अप"],"Low stock":["స్టాక్ తక్కువ","कम स्टॉक"],"Material request pending":["పెండింగ్ మెటీరియల్ అభ్యర్థన","बाकी सामग्री मांग"],"Checklist waiting for your approval":["మీ ఆమోదం కోసం చెక్‌లిస్ట్","आपकी मंज़ूरी के लिए चेकलिस्ट"],"Drawing for approval":["ఆమోదం కోసం డ్రాయింగ్","मंज़ूरी के लिए ड्रॉइंग"],"Payment overdue":["చెల్లింపు ఆలస్యం","भुगतान में देरी"],"Stage reached — raise invoice":["దశ పూర్తి — బిల్ వేయండి","चरण पूरा — बिल बनाएं"],"Camera offline":["కెమెరా ఆఫ్‌లైన్","कैमरा ऑफ़लाइन"],"overdue":["ఆలస్యం","देरी"],"waiting for approved":["ఆమోదం కావాలి:","मंज़ूरी चाहिए:"],"left":["మిగిలింది","बचा"],"Next 30 days":["తదుపరి 30 రోజులు","अगले 30 दिन"],"Next 60 days":["తదుపరి 60 రోజులు","अगले 60 दिन"],"Next 90 days":["తదుపరి 90 రోజులు","अगले 90 दिन"],"half":["సగం","आधा"],"day":["రోజు","दिन"],"saved":["సేవ్ అయినవి","सेव"],"last":["చివరి","आखिरी"],"forms":["ఫారాలు","फ़ॉर्म"],"changes":["మార్పులు","बदलाव"],"Jan":["జన","जन"],"Feb":["ఫిబ్ర","फ़र"],"Mar":["మార్చి","मार्च"],"Apr":["ఏప్రి","अप्रै"],"May":["మే","मई"],"Jun":["జూన్","जून"],"Jul":["జులై","जुला"],"Aug":["ఆగ","अग"],"Sept":["సెప్టెం","सितं"],"Sep":["సెప్టెం","सितं"],"Oct":["అక్టో","अक्टू"],"Nov":["నవం","नवं"],"Dec":["డిసెం","दिसं"],"boq":["BOQ","BOQ"],"Sump (10,000 L)":["సంప్ (10,000 L)","संप (10,000 L)"],"Basic":["బేసిక్","बेसिक"],"Standard":["స్టాండర్డ్","स्टैंडर्ड"],"Premium":["ప్రీమియం","प्रीमियम"],"Stock in store = received + transferred in + returned − issued − transferred out. Consumption is tracked against what was issued.":["స్టోర్ స్టాక్ = అందినది + బదిలీ వచ్చినది + తిరిగి వచ్చినది − ఇచ్చినది − బదిలీ వెళ్ళినది. వినియోగం ఇచ్చిన దాని ప్రకారం లెక్కిస్తాం.","स्टोर स्टॉक = प्राप्त + ट्रांसफर आया + वापस − जारी − ट्रांसफर गया। खपत जारी के अनुसार गिनी जाती है।"],"Projected profit = contract value + approved changes − paid out − open purchase orders. Add contract value and area when editing a project.":["అంచనా లాభం = ఒప్పంద విలువ + ఆమోదించిన మార్పులు − చెల్లించినది − పెండింగ్ కొనుగోలు ఆర్డర్లు. ప్రాజెక్ట్ మార్చేటప్పుడు ఒప్పంద విలువ, ఏరియా ఇవ్వండి.","अनुमानित लाभ = अनुबंध मूल्य + मंज़ूर बदलाव − भुगतान − खुले खरीद ऑर्डर। प्रोजेक्ट बदलते समय अनुबंध मूल्य व एरिया डालें।"],"Exports follow the project selected at the top. CSV files open in Excel and Google Sheets.":["ఎగుమతులు పైన ఎంచుకున్న ప్రాజెక్ట్ ప్రకారం ఉంటాయి. CSV ఫైళ్ళు Excel, Google Sheets లో తెరుచుకుంటాయి.","निर्यात ऊपर चुने प्रोजेक्ट के अनुसार होता है। CSV फाइलें Excel व Google Sheets में खुलती हैं।"],"See exactly which screens a client, site engineer, accountant or others get.":["క్లయింట్, సైట్ ఇంజనీర్, అకౌంటెంట్ లేదా ఇతరులకు ఏ స్క్రీన్లు వస్తాయో చూడండి.","ग्राहक, साइट इंजीनियर, अकाउंटेंट या अन्य को कौन सी स्क्रीन मिलती है देखें।"],"Download everything — all projects, entries and forms — as one Excel workbook or a backup file. Restore adds back anything missing; it never overwrites existing records.":["అన్నీ డౌన్‌లోడ్ చేయండి — అన్ని ప్రాజెక్టులు, ఎంట్రీలు, ఫారాలు — ఒక Excel ఫైల్ లేదా బ్యాకప్ ఫైల్‌గా. రీస్టోర్ లేనివి మాత్రమే జోడిస్తుంది; ఉన్నవాటిని మార్చదు.","सब कुछ डाउनलोड करें — सभी प्रोजेक्ट, एंट्री व फ़ॉर्म — एक Excel फाइल या बैकअप फाइल में। रीस्टोर केवल गायब चीज़ें जोड़ता है; मौजूदा रिकॉर्ड नहीं बदलता।"],"Earned = days × daily wage + OT hours × (daily wage ÷ 8). Half day counts as 0.5.":["సంపాదన = రోజులు × రోజు కూలీ + OT గంటలు × (రోజు కూలీ ÷ 8). సగం రోజు = 0.5.","कमाई = दिन × दैनिक मज़दूरी + OT घंटे × (दैनिक मज़दूरी ÷ 8)। आधा दिन = 0.5।"],"Vendor bills come from Material received (qty × rate), Vendor labour (headcount × rate) and hired Equipment usage. Link payments to the vendor or client so they count here.":["వెండర్ బిల్లులు: అందిన మెటీరియల్ (పరిమాణం × రేటు), కాంట్రాక్ట్ కూలీలు (మనుషులు × రేటు), అద్దె యంత్రాలు. ఇక్కడ లెక్కలోకి రావడానికి చెల్లింపులను వెండర్ లేదా క్లయింట్‌కు లింక్ చేయండి.","विक्रेता बिल: प्राप्त सामग्री (मात्रा × दर), ठेका मज़दूर (लोग × दर), किराए की मशीनें। यहां गिनने के लिए भुगतान को विक्रेता या ग्राहक से जोड़ें।"],"Spent = payments out, by the cost category chosen on each payment.":["ఖర్చు = బయటకు వెళ్ళిన చెల్లింపులు, ప్రతి చెల్లింపుపై ఎంచుకున్న వర్గం ప్రకారం.","खर्च = बाहर गए भुगतान, हर भुगतान पर चुनी श्रेणी के अनुसार।"],"Bar = planned start to due date · dark fill = progress · red = past due and not complete.":["బార్ = ప్లాన్ ప్రారంభం నుండి గడువు వరకు · ముదురు రంగు = ప్రగతి · ఎరుపు = గడువు దాటి పూర్తి కాలేదు.","बार = योजना शुरू से अंतिम तारीख तक · गहरा रंग = प्रगति · लाल = समय निकल गया, पूरा नहीं।"],"For each camera choose":["ప్రతి కెమెరాకు ఎంచుకోండి","हर कैमरे के लिए चुनें"],"No changes recorded yet. Every add, edit, delete, approval and access change will appear here.":["ఇంకా మార్పులు లేవు. ప్రతి జోడింపు, మార్పు, తొలగింపు, ఆమోదం, అనుమతి మార్పు ఇక్కడ కనిపిస్తుంది.","अभी कोई बदलाव नहीं। हर जोड़, बदलाव, हटाना, मंज़ूरी व एक्सेस बदलाव यहां दिखेगा।"],"Checklists and sheets are kept per project. Choose a project below, or pick one in the project selector at the top.":["చెక్‌లిస్ట్‌లు, షీట్లు ప్రతి ప్రాజెక్ట్‌కు వేరుగా ఉంటాయి. కింద ప్రాజెక్ట్ ఎంచుకోండి, లేదా పైన ఎంచుకోండి.","चेकलिस्ट व शीट हर प्रोजेक्ट में अलग रहती हैं। नीचे प्रोजेक्ट चुनें या ऊपर चुनें।"],"Only you see them until you give access — use":["మీరు అనుమతి ఇచ్చే వరకు మీకే కనిపిస్తాయి — వాడండి","जब तक एक्सेस न दें केवल आपको दिखेंगी — उपयोग करें"],"on each form, or":["ప్రతి ఫారంపై, లేదా","हर फ़ॉर्म पर, या"],"Upload any Excel sheet (for example your Expense Report). Its columns become an editable format available in every project.":["ఏదైనా Excel షీట్ అప్‌లోడ్ చేయండి (ఉదా. మీ ఖర్చుల రిపోర్ట్). దాని కాలమ్స్ ప్రతి ప్రాజెక్ట్‌లో మార్చగల ఫార్మాట్ అవుతాయి.","कोई भी Excel शीट अपलोड करें (जैसे आपकी खर्च रिपोर्ट)। उसके कॉलम हर प्रोजेक्ट में बदलने योग्य फ़ॉर्मेट बनेंगे।"],"Every project has its own chats, so site, client and architect messages never mix between projects.":["ప్రతి ప్రాజెక్ట్‌కు దాని చాట్‌లు ఉంటాయి, కాబట్టి సైట్, క్లయింట్, ఆర్కిటెక్ట్ సందేశాలు కలవవు.","हर प्रोजेक्ट की अपनी चैट हैं, इसलिए साइट, ग्राहक व आर्किटेक्ट के संदेश मिलते नहीं।"],"lets them add entries. Changes apply straight away for everyone with that role. Use":["ఎంట్రీలు జోడించనిస్తుంది. మార్పులు ఆ పాత్ర గల అందరికీ వెంటనే వర్తిస్తాయి. వాడండి","एंट्री जोड़ने देता है। बदलाव उस रोल वाले सभी पर तुरंत लागू होते हैं। उपयोग करें"],"Projects each person can open are still set per person on the Team page. Payments, wages and money screens stay hidden unless you switch them on here.":["ప్రతి వ్యక్తి తెరవగల ప్రాజెక్టులు టీమ్ పేజీలో సెట్ చేస్తారు. చెల్లింపులు, జీతాలు, డబ్బు స్క్రీన్లు మీరు ఇక్కడ ఆన్ చేసే వరకు దాచబడి ఉంటాయి.","हर व्यक्ति कौन से प्रोजेक्ट खोल सकता है यह टीम पेज पर तय होता है। भुगतान, मज़दूरी व पैसे की स्क्रीन तब तक छिपी रहती हैं जब तक आप यहां चालू न करें।"],"Follow-up date reached":["ఫాలో-అప్ తేదీ వచ్చింది","फॉलो-अप की तारीख आ गई"],"New enquiry — reply first":["కొత్త విచారణ — ముందు జవాబు ఇవ్వండి","नई पूछताछ — पहले जवाब दें"],"Message — use {name}, {company}, {date}, {time}, {place}, {review}, {brochure}":["సందేశం — {name}, {company}, {date}, {time}, {place}, {review}, {brochure} వాడండి","संदेश — {name}, {company}, {date}, {time}, {place}, {review}, {brochure} उपयोग करें"],"All site photos from daily reports, work updates and checklists in one place. Mark a photo":["రోజువారీ రిపోర్టులు, పని అప్‌డేట్లు, చెక్‌లిస్ట్‌ల నుండి అన్ని సైట్ ఫోటోలు ఒకచోట. ఫోటోను గుర్తించండి","दैनिक रिपोर्ट, काम अपडेट व चेकलिस्ट की सभी साइट फोटो एक जगह। फोटो चिह्नित करें"],"only after the client has agreed — those are the ones your team may post on Instagram, Facebook or the website.":["క్లయింట్ ఒప్పుకున్న తర్వాతే — అవే మీ టీమ్ Instagram, Facebook లేదా వెబ్‌సైట్‌లో పెట్టవచ్చు.","ग्राहक की सहमति के बाद ही — वही आपकी टीम Instagram, Facebook या वेबसाइट पर डाल सकती है।"],"Photos added to daily reports, work updates and checklists appear here automatically.":["రోజువారీ రిపోర్టులు, పని అప్‌డేట్లు, చెక్‌లిస్ట్‌లలో జోడించిన ఫోటోలు ఇక్కడ ఆటోమేటిక్‌గా కనిపిస్తాయి.","दैनिक रिपोर्ट, काम अपडेट व चेकलिस्ट की फोटो यहां अपने आप दिखेंगी।"],"Download leads from":["లీడ్స్ డౌన్‌లోడ్ చేయండి:","लीड यहां से डाउनलोड करें:"],", your website form, or an expo list, and import them here. Duplicates (same phone) are skipped. Fully automatic capture needs the live backend.":[", మీ వెబ్‌సైట్ ఫారం లేదా ఎక్స్‌పో జాబితా, ఇక్కడ దిగుమతి చేయండి. ఒకే ఫోన్ ఉన్నవి వదిలేస్తాం. పూర్తి ఆటోమేటిక్‌కు లైవ్ బ్యాకెండ్ కావాలి.",", आपकी वेबसाइट फ़ॉर्म या एक्सपो सूची, और यहां आयात करें। एक ही फोन वाले छोड़े जाते हैं। पूरे ऑटोमैटिक के लिए लाइव बैकएंड चाहिए।"],"Checklists that must be approved before this can be marked Completed":["పూర్తయింది అని గుర్తించే ముందు ఆమోదించాల్సిన చెక్‌లిస్ట్‌లు","पूरा मार्क करने से पहले मंज़ूर होने वाली चेकलिस्ट"],"Location (e.g. FF bedroom 2)":["ప్రదేశం (ఉదా. FF బెడ్‌రూమ్ 2)","स्थान (जैसे FF बेडरूम 2)"],"Plot size (e.g. 30 × 40 ft)":["ప్లాట్ సైజ్ (ఉదా. 30 × 40 ft)","प्लॉट साइज़ (जैसे 30 × 40 ft)"],"Files (PDF or photos, up to 20 MB each)":["ఫైళ్ళు (PDF లేదా ఫోటోలు, ఒక్కొక్కటి 20 MB వరకు)","फाइलें (PDF या फोटो, हर एक 20 MB तक)"],"to send them a WhatsApp message. Once they open the app, link their account below.":["వారికి వాట్సాప్ సందేశం పంపడానికి. వారు యాప్ తెరిచాక, కింద వారి ఖాతా లింక్ చేయండి.","उन्हें व्हाट्सऐप संदेश भेजने के लिए। ऐप खोलने के बाद नीचे उनका खाता जोड़ें।"],"Imported from":["దిగుమతి:","आयात:"],"Live view link (HLS .m3u8 stream or web viewer page)":["లైవ్ లింక్ (HLS .m3u8 లేదా వెబ్ వ్యూయర్ పేజీ)","लाइव लिंक (HLS .m3u8 या वेब व्यूअर पेज)"],"e.g. Create a project for Mr. Rao in Kokapet starting 1 Dec":["ఉదా. Kokapet లో Mr. Rao కోసం 1 Dec నుండి ప్రాజెక్ట్ తయారు చేయి","जैसे Kokapet में Mr. Rao के लिए 1 Dec से प्रोजेक्ट बनाएं"],"e.g. Slab casting team, Client approvals":["ఉదా. స్లాబ్ కాస్టింగ్ టీమ్, క్లయింట్ ఆమోదాలు","जैसे स्लैब ढलाई टीम, ग्राहक मंज़ूरी"],"or bank transfer to":["లేదా బ్యాంక్ బదిలీ:","या बैंक ट्रांसफर:"],"How to give live access (CP Plus)":["లైవ్ అనుమతి ఎలా ఇవ్వాలి (CP Plus)","लाइव एक्सेस कैसे दें (CP Plus)"],"How to give live access (EZVIZ)":["లైవ్ అనుమతి ఎలా ఇవ్వాలి (EZVIZ)","लाइव एक्सेस कैसे दें (EZVIZ)"],"Live inside BuildMitr:":["BuildMitr లోనే లైవ్:","BuildMitr में ही लाइव:"],"Get gCMOB app":["gCMOB యాప్ పొందండి","gCMOB ऐप लें"],"Get EZVIZ app":["EZVIZ యాప్ పొందండి","EZVIZ ऐप लें"],"No whatsapp templates yet":["ఇంకా వాట్సాప్ సందేశాలు లేవు","अभी कोई व्हाट्सऐप संदेश नहीं"],"No photo approvals yet":["ఇంకా ఫోటో అనుమతులు లేవు","अभी कोई फोटो अनुमति नहीं"],"Day":["రోజు","दिन"],"follow-up":["ఫాలో-అప్","फॉलो-अप"],"reached":["వచ్చింది","आ गया"],"Expo / event":["ఎక్స్‌పో / ఈవెంట్","एक्सपो / इवेंट"],"ads":["ప్రకటనలు","विज्ञापन"],". Passwords are never stored here — to give someone live access in the brand app, share the device from that app (steps on each camera below).":[". పాస్‌వర్డ్‌లు ఇక్కడ ఎప్పుడూ ఉంచం — బ్రాండ్ యాప్‌లో లైవ్ అనుమతి ఇవ్వడానికి, ఆ యాప్ నుండి డివైస్ షేర్ చేయండి (ప్రతి కెమెరా కింద దశలు).","। पासवर्ड यहां कभी नहीं रखे जाते — ब्रांड ऐप में लाइव एक्सेस देने के लिए उसी ऐप से डिवाइस शेयर करें (हर कैमरे के नीचे चरण)।"],"In the CP Plus app open the device → Share (or add the person as a user on the NVR) and give \"Live view\" only.":["CP Plus యాప్‌లో డివైస్ తెరవండి → Share (లేదా NVR లో యూజర్‌గా జోడించండి), \"Live view\" మాత్రమే ఇవ్వండి.","CP Plus ऐप में डिवाइस खोलें → Share (या NVR पर यूज़र जोड़ें) और केवल \"Live view\" दें।"],"Ask your CP Plus installer for the NVR RTSP address; a streaming service (e.g. go2rtc/MediaMTX) turns it into a web .m3u8 link.":["మీ CP Plus ఇన్‌స్టాలర్‌ను NVR RTSP అడ్రస్ అడగండి; స్ట్రీమింగ్ సర్వీస్ (ఉదా. go2rtc/MediaMTX) దాన్ని వెబ్ .m3u8 లింక్‌గా మారుస్తుంది.","अपने CP Plus इंस्टॉलर से NVR RTSP पता लें; स्ट्रीमिंग सर्विस (जैसे go2rtc/MediaMTX) उसे वेब .m3u8 लिंक बनाती है।"],"In the EZVIZ app open the camera → Settings → Share device → enter their EZVIZ account; allow Live view only.":["EZVIZ యాప్‌లో కెమెరా తెరవండి → Settings → Share device → వారి EZVIZ ఖాతా ఇవ్వండి; Live view మాత్రమే అనుమతించండి.","EZVIZ ऐप में कैमरा खोलें → Settings → Share device → उनका EZVIZ खाता डालें; केवल Live view दें।"],"EZVIZ Open Platform gives an HLS (.m3u8) live link for your device that plays inside BuildMitr web.":["EZVIZ Open Platform మీ డివైస్‌కు HLS (.m3u8) లైవ్ లింక్ ఇస్తుంది, అది BuildMitr వెబ్‌లో ప్లే అవుతుంది.","EZVIZ Open Platform आपके डिवाइस के लिए HLS (.m3u8) लाइव लिंक देता है जो BuildMitr वेब में चलता है।"],"1) Add the person here with their role, projects and access. 2) Tap":["1) వ్యక్తిని పాత్ర, ప్రాజెక్టులు, అనుమతితో ఇక్కడ జోడించండి. 2) నొక్కండి","1) व्यक्ति को रोल, प्रोजेक्ट व एक्सेस के साथ यहां जोड़ें। 2) दबाएं"],"Needs approved":["ఆమోదం కావాలి","मंज़ूरी चाहिए"],"Device / NVR ID":["డివైస్ / NVR ID","डिवाइस / NVR ID"],"Sign in":["సైన్ ఇన్","साइन इन"],"Sign out":["సైన్ అవుట్","साइन आउट"],"Send code":["కోడ్ పంపు","कोड भेजें"],"Sending…":["పంపుతోంది…","भेज रहे हैं…"],"Enter your email. We will send a 6-digit code — no password needed.":["మీ ఇమెయిల్ ఇవ్వండి. 6 అంకెల కోడ్ పంపుతాం — పాస్‌వర్డ్ అవసరం లేదు.","अपना ईमेल डालें। हम 6 अंकों का कोड भेजेंगे — पासवर्ड की ज़रूरत नहीं।"],"Your company admin must add your email on the Team page first. Admins signing in for the first time can create their company after the code.":["ముందుగా మీ కంపెనీ అడ్మిన్ టీమ్ పేజీలో మీ ఇమెయిల్ జోడించాలి. మొదటిసారి వచ్చే యజమానులు కోడ్ తర్వాత కంపెనీ తయారు చేయవచ్చు.","पहले आपकी कंपनी के एडमिन को टीम पेज पर आपका ईमेल जोड़ना होगा। पहली बार आने वाले एडमिन कोड के बाद कंपनी बना सकते हैं।"],"Enter the code":["కోడ్ ఇవ్వండి","कोड डालें"],"We sent a 6-digit code to":["6 అంకెల కోడ్ పంపాం:","6 अंकों का कोड भेजा:"],"Check your inbox and spam folder.":["ఇన్‌బాక్స్, స్పామ్ ఫోల్డర్ చూడండి.","इनबॉक्स और स्पैम फ़ोल्डर देखें।"],"6-digit code":["6 అంకెల కోడ్","6 अंकों का कोड"],"Checking…":["తనిఖీ చేస్తోంది…","जांच रहे हैं…"],"Change email":["ఇమెయిల్ మార్చు","ईमेल बदलें"],"Send the code again":["కోడ్ మళ్ళీ పంపు","कोड फिर भेजें"],"Welcome to BuildMitr":["BuildMitr కి స్వాగతం","BuildMitr में स्वागत है"],"You are signed in as":["మీరు సైన్ ఇన్ అయ్యారు:","आप साइन इन हैं:"],", but you are not part of a company yet.":[", కానీ ఇంకా ఏ కంపెనీలో లేరు.",", पर अभी किसी कंपनी में नहीं हैं।"],"Joining your company's team? Ask the admin to add your email on the":["మీ కంపెనీ టీమ్‌లో చేరుతున్నారా? అడ్మిన్ని మీ ఇమెయిల్ జోడించమని అడగండి:","कंपनी की टीम में जुड़ रहे हैं? एडमिन से अपना ईमेल जोड़ने को कहें:"],"page, then tap":["పేజీలో, తర్వాత నొక్కండి","पेज पर, फिर दबाएं"],"Check again":["మళ్ళీ చూడు","फिर जांचें"],"or, if you are the owner":["లేదా, మీరు అడ్మిన్ అయితే","या, अगर आप एडमिन हैं"],"Create my company":["నా కంపెనీ తయారు చేయి","मेरी कंपनी बनाएं"],"Creating…":["తయారవుతోంది…","बना रहे हैं…"],"Choose company":["కంపెనీ ఎంచుకోండి","कंपनी चुनें"],"Loading…":["లోడ్ అవుతోంది…","लोड हो रहा है…"],"Opening your projects.":["మీ ప్రాజెక్టులు తెరుస్తోంది.","आपके प्रोजेक्ट खुल रहे हैं।"],"Try the demo":["డెమో చూడండి","डेमो देखें"],"Your login":["మీ లాగిన్","आपका लॉगिन"],"Signed in as":["సైన్ ఇన్:","साइन इन:"],"Please enter a valid email address.":["సరైన ఇమెయిల్ ఇవ్వండి.","सही ईमेल डालें।"],"The code has 6 digits.":["కోడ్‌లో 6 అంకెలు ఉంటాయి.","कोड में 6 अंक होते हैं।"],"That code is wrong or has expired. Check it, or send a new code.":["ఆ కోడ్ తప్పు లేదా గడువు ముగిసింది. సరిచూడండి, లేదా కొత్త కోడ్ పంపండి.","यह कोड गलत है या समय खत्म हो गया। जांचें या नया कोड भेजें।"],"Too many tries. Wait a minute and try again.":["చాలా సార్లు ప్రయత్నించారు. ఒక నిమిషం ఆగి మళ్ళీ ప్రయత్నించండి.","बहुत बार कोशिश हुई। एक मिनट रुककर फिर करें।"],"Enter your company name.":["కంపెనీ పేరు ఇవ్వండి.","कंपनी का नाम डालें।"],"Could not reach the server. Check your internet connection.":["సర్వర్ అందుబాటులో లేదు. ఇంటర్నెట్ చూడండి.","सर्वर से संपर्क नहीं हुआ। इंटरनेट जांचें।"],"Your company admin must add your email on the Team page first.":["ముందుగా మీ కంపెనీ అడ్మిన్ టీమ్ పేజీలో మీ ఇమెయిల్ జోడించాలి.","पहले आपकी कंपनी के एडमिन को टीम पेज पर आपका ईमेल जोड़ना होगा।"],"Try again":["మళ్ళీ ప్రయత్నించు","फिर कोशिश करें"],"This email is not on a company team yet. Ask your company admin to add it on the Team page.":["ఈ ఇమెయిల్ ఇంకా ఏ కంపెనీ టీమ్‌లో లేదు. టీమ్ పేజీలో జోడించమని మీ అడ్మిన్ని అడగండి.","यह ईमेल अभी किसी कंपनी की टीम में नहीं है। एडमिन से टीम पेज पर जोड़ने को कहें।"],"Too many wrong codes. Send a new code.":["చాలా సార్లు తప్పు కోడ్. కొత్త కోడ్ పంపండి.","बहुत बार गलत कोड। नया कोड भेजें।"],"Please sign in again.":["దయచేసి మళ్ళీ సైన్ ఇన్ అవ్వండి.","कृपया फिर से साइन इन करें।"],"Your login has expired. Please sign in again.":["మీ లాగిన్ గడువు ముగిసింది. మళ్ళీ సైన్ ఇన్ అవ్వండి.","आपका लॉगिन समाप्त हो गया। फिर से साइन इन करें।"],"You no longer have access to this company. Ask your admin.":["ఈ కంపెనీలో మీకు ఇక యాక్సెస్ లేదు. అడ్మిన్ని అడగండి.","अब आपके पास इस कंपनी की पहुंच नहीं है। एडमिन से पूछें।"],"Only the company admin can create a company. Ask your admin to add you on the Team page.":["కంపెనీ అడ్మిన్ మాత్రమే కంపెనీ తయారు చేయగలరు. టీమ్ పేజీలో జోడించమని అడ్మిన్ని అడగండి.","केवल कंपनी एडमिन ही कंपनी बना सकते हैं। एडमिन से टीम पेज पर जोड़ने को कहें।"],"You do not have permission to change this.":["దీన్ని మార్చే అనుమతి మీకు లేదు.","आपको इसे बदलने की अनुमति नहीं है।"],"The file is larger than 10 MB.":["ఫైల్ 10 MB కంటే పెద్దది.","फ़ाइल 10 MB से बड़ी है।"],"The server did not answer properly. Try again in a minute.":["సర్వర్ సరిగా స్పందించలేదు. ఒక నిమిషం తర్వాత ప్రయత్నించండి.","सर्वर ने ठीक से जवाब नहीं दिया। एक मिनट बाद कोशिश करें।"],"Enter your details. A 6-digit login code goes to the BuildMitr admin, who shares it with you — no password needed.":["మీ వివరాలు ఇవ్వండి. 6 అంకెల లాగిన్ కోడ్ BuildMitr అడ్మిన్‌కు వెళ్తుంది, వారు మీకు చెబుతారు — పాస్‌వర్డ్ అవసరం లేదు.","अपनी जानकारी डालें। 6 अंकों का लॉगिन कोड BuildMitr एडमिन को जाता है, वे आपको बताएंगे — पासवर्ड की ज़रूरत नहीं।"],"Your name (new users)":["మీ పేరు (కొత్తవారు)","आपका नाम (नए उपयोगकर्ता)"],"Mobile number (new users)":["మొబైల్ నంబర్ (కొత్తవారు)","मोबाइल नंबर (नए उपयोगकर्ता)"],"Request login code":["లాగిన్ కోడ్ అడగండి","लॉगिन कोड मांगें"],"New here? After you sign in, the admin approves you and chooses your role.":["కొత్తవారా? సైన్ ఇన్ తర్వాత అడ్మిన్ ఆమోదించి మీ పాత్రను ఎంచుకుంటారు.","नए हैं? साइन इन के बाद एडमिन आपको मंज़ूरी देकर आपकी भूमिका चुनेंगे।"],"The BuildMitr admin has your request and will choose your role. This page opens by itself once you are approved — you can keep it open or come back later.":["మీ అభ్యర్థన BuildMitr అడ్మిన్‌కు చేరింది, వారు మీ పాత్రను ఎంచుకుంటారు. ఆమోదం రాగానే ఈ పేజీ తానే తెరుచుకుంటుంది — తెరిచి ఉంచవచ్చు లేదా తర్వాత రావచ్చు.","आपका अनुरोध BuildMitr एडमिन के पास है, वे आपकी भूमिका चुनेंगे। मंज़ूरी मिलते ही यह पेज अपने आप खुलेगा — इसे खुला रखें या बाद में आएं।"],"Call or WhatsApp the admin to get it.":["కోడ్ కోసం అడ్మిన్‌కు కాల్ లేదా వాట్సాప్ చేయండి.","कोड के लिए एडमिन को कॉल या व्हाट्सऐप करें।"],"Join requests":["చేరిక అభ్యర్థనలు","जुड़ने के अनुरोध"],"Approve & choose role":["ఆమోదించి పాత్ర ఎంచుకో","मंज़ूर करें और भूमिका चुनें"],"Request rejected":["అభ్యర్థన తిరస్కరించబడింది","अनुरोध अस्वीकार किया गया"],"Please enter your name.":["దయచేసి మీ పేరు ఇవ్వండి.","कृपया अपना नाम डालें।"],"Too many login requests today. Try again tomorrow.":["ఈరోజు చాలా లాగిన్ అభ్యర్థనలు వచ్చాయి. రేపు ప్రయత్నించండి.","आज बहुत सारे लॉगिन अनुरोध हो चुके। कल फिर कोशिश करें।"],"Password":["పాస్‌వర్డ్","पासवर्ड"],"Your password":["మీ పాస్‌వర్డ్","आपका पासवर्ड"],"first time, or forgot your password?":["మొదటిసారా, లేదా పాస్‌వర్డ్ మర్చిపోయారా?","पहली बार, या पासवर्ड भूल गए?"],"Get a login code from the admin":["అడ్మిన్ నుండి లాగిన్ కోడ్ పొందండి","एडमिन से लॉगिन कोड लें"],"Get a login code":["లాగిన్ కోడ్ పొందండి","लॉगिन कोड लें"],"New here? After you sign in, the admin approves you and chooses your role. Then you set your own password for next time.":["కొత్తవారా? సైన్ ఇన్ తర్వాత అడ్మిన్ ఆమోదించి మీ పాత్రను ఎంచుకుంటారు. తర్వాత మీరు మీ సొంత పాస్‌వర్డ్ పెట్టుకోవచ్చు.","नए हैं? साइन इन के बाद एडमिन आपको मंज़ूरी देकर भूमिका चुनेंगे। फिर आप अगली बार के लिए अपना पासवर्ड बना सकते हैं।"],"I already have a password":["నాకు ఇప్పటికే పాస్‌వర్డ్ ఉంది","मेरे पास पहले से पासवर्ड है"],"Set your password":["మీ పాస్‌వర్డ్ పెట్టండి","अपना पासवर्ड बनाएं"],"Change password":["పాస్‌వర్డ్ మార్చు","पासवर्ड बदलें"],"Set password":["పాస్‌వర్డ్ పెట్టు","पासवर्ड बनाएं"],"Set a password now so next time you can sign in with your email and password — no code from the admin needed.":["ఇప్పుడే పాస్‌వర్డ్ పెట్టండి — తర్వాత ఇమెయిల్, పాస్‌వర్డ్‌తో సైన్ ఇన్ అవ్వచ్చు, అడ్మిన్ కోడ్ అవసరం లేదు.","अभी पासवर्ड बनाएं — अगली बार ईमेल और पासवर्ड से साइन इन करें, एडमिन के कोड की ज़रूरत नहीं।"],"New password (at least 6 characters)":["కొత్త పాస్‌వర్డ్ (కనీసం 6 అక్షరాలు)","नया पासवर्ड (कम से कम 6 अक्षर)"],"Type it again":["మళ్ళీ టైప్ చేయండి","फिर से टाइप करें"],"Later":["తర్వాత","बाद में"],"Save password":["పాస్‌వర్డ్ సేవ్ చేయి","पासवर्ड सेव करें"],"Password saved. Next time sign in with your email and password.":["పాస్‌వర్డ్ సేవ్ అయింది. తర్వాత ఇమెయిల్, పాస్‌వర్డ్‌తో సైన్ ఇన్ అవ్వండి.","पासवर्ड सेव हो गया। अगली बार ईमेल और पासवर्ड से साइन इन करें।"],"The password needs at least 6 characters.":["పాస్‌వర్డ్‌కు కనీసం 6 అక్షరాలు కావాలి.","पासवर्ड में कम से कम 6 अक्षर चाहिए।"],"The two passwords are not the same.":["రెండు పాస్‌వర్డ్‌లు ఒకేలా లేవు.","दोनों पासवर्ड एक जैसे नहीं हैं।"],"Enter your password.":["మీ పాస్‌వర్డ్ ఇవ్వండి.","अपना पासवर्ड डालें।"],"Wrong email or password. Forgot it? Ask the admin for a login code.":["ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు. మర్చిపోయారా? అడ్మిన్ నుండి లాగిన్ కోడ్ అడగండి.","ईमेल या पासवर्ड गलत है। भूल गए? एडमिन से लॉगिन कोड मांगें।"],"Too many wrong passwords. Wait 15 minutes, or ask the admin for a login code.":["చాలా సార్లు తప్పు పాస్‌వర్డ్. 15 నిమిషాలు ఆగండి, లేదా అడ్మిన్ నుండి కోడ్ అడగండి.","बहुत बार गलत पासवर्ड। 15 मिनट रुकें, या एडमिन से कोड मांगें।"],"Your role (new users)":["మీ పాత్ర (కొత్తవారు)","आपकी भूमिका (नए उपयोगकर्ता)"],"Choose your role":["మీ పాత్ర ఎంచుకోండి","अपनी भूमिका चुनें"],"Asked to join as:":["ఈ పాత్రగా చేరాలని అడిగారు:","इस भूमिका में जुड़ना चाहते हैं:"],"Please choose your role.":["దయచేసి మీ పాత్రను ఎంచుకోండి.","कृपया अपनी भूमिका चुनें।"],"New here? Choose your role. When you enter the code from the admin you are in straight away — then set your own password for next time.":["కొత్తవారా? మీ పాత్ర ఎంచుకోండి. అడ్మిన్ ఇచ్చిన కోడ్ ఇవ్వగానే లోపలికి వెళ్తారు — తర్వాత మీ సొంత పాస్‌వర్డ్ పెట్టుకోండి.","नए हैं? अपनी भूमिका चुनें। एडमिन का कोड डालते ही आप अंदर — फिर अगली बार के लिए अपना पासवर्ड बनाएं।"],"New people — code sent, not signed in yet":["కొత్తవారు — కోడ్ పంపారు, ఇంకా సైన్ ఇన్ కాలేదు","नए लोग — कोड भेजा, अभी साइन इन नहीं किया"],"Admin panel":["అడ్మిన్ ప్యానెల్","एडमिन पैनल"],"Admin view":["అడ్మిన్ వ్యూ","एडमिन व्यू"],"People in the team":["టీమ్‌లో వ్యక్తులు","टीम में लोग"],"Signed in at least once":["కనీసం ఒక్కసారి సైన్ ఇన్ అయినవారు","कम से कम एक बार साइन इन"],"Code sent, not signed in yet":["కోడ్ పంపారు, ఇంకా సైన్ ఇన్ కాలేదు","कोड भेजा, अभी साइन इन नहीं"],"Clients without a project":["ప్రాజెక్ట్ లేని క్లయింట్లు","बिना प्रोजेक्ट वाले क्लाइंट"],"People & roles":["వ్యక్తులు & పాత్రలు","लोग और भूमिकाएं"],"Change a role here — their screens switch within seconds":["ఇక్కడ పాత్ర మార్చండి — వారి స్క్రీన్లు వెంటనే మారుతాయి","यहां भूमिका बदलें — उनकी स्क्रीन तुरंत बदल जाएगी"],"Admin tools":["అడ్మిన్ సాధనాలు","एडमिन टूल"],"Role access — what each role can see":["పాత్ర అనుమతులు — ఎవరు ఏమి చూడగలరు","रोल एक्सेस — कौन क्या देख सकता है"],"Team list":["టీమ్ జాబితా","टीम सूची"],"Company settings":["కంపెనీ సెట్టింగ్‌లు","कंपनी सेटिंग्स"],"How people sign in":["వ్యక్తులు ఎలా సైన్ ఇన్ అవుతారు","लोग कैसे साइन इन करते हैं"],"You":["మీరు","आप"],"Only the admin can open this page":["అడ్మిన్ మాత్రమే ఈ పేజీ తెరవగలరు","यह पेज केवल एडमिन खोल सकते हैं"],"No project":["ప్రాజెక్ట్ లేదు","कोई प्रोजेक्ट नहीं"],"signed in":["సైన్ ఇన్ అయ్యారు","साइन इन किया"],"not signed in yet":["ఇంకా సైన్ ఇన్ కాలేదు","अभी साइन इन नहीं"],"Admin controls access.":["అడ్మిన్ అనుమతి నియంత్రిస్తారు.","एडमिन एक्सेस नियंत्रित करते हैं।"],"Admin only":["అడ్మిన్ మాత్రమే","केवल एडमिन"],"Admin, marketing, accounts & site team":["అడ్మిన్, మార్కెటింగ్, అకౌంట్స్ & సైట్ టీమ్","एडमिन, मार्केटिंग, अकाउंट्स व साइट टीम"],"or, if you are the admin":["లేదా, మీరు అడ్మిన్ అయితే","या, अगर आप एडमिन हैं"],"My profile":["నా ప్రొఫైల్","मेरी प्रोफ़ाइल"],"Only the admin can change your role and projects":["మీ పాత్ర, ప్రాజెక్టులు అడ్మిన్ మాత్రమే మార్చగలరు","आपकी भूमिका और प्रोजेक्ट केवल एडमिन बदल सकते हैं"],"Log out":["లాగ్ అవుట్","लॉग आउट"],"No project yet":["ఇంకా ప్రాజెక్ట్ లేదు","अभी कोई प्रोजेक्ट नहीं"],"Projects:":["ప్రాజెక్టులు:","प्रोजेक्ट:"],"Access:":["అనుమతి:","एक्सेस:"],"Colour theme":["రంగు థీమ్","रंग थीम"],"Light":["లైట్","लाइट"],"Dark":["డార్క్","डार्क"],"Automatic (same as phone)":["ఆటోమేటిక్ (ఫోన్ లాగే)","अपने आप (फ़ोन जैसा)"],"Retry":["మళ్ళీ ప్రయత్నించు","फिर कोशिश करें"],"Show full answer":["పూర్తి జవాబు చూపు","पूरा जवाब दिखाएं"],"Show less":["తక్కువ చూపు","कम दिखाएं"],"Review & save":["చూసి సేవ్ చేయండి","देखें और सेव करें"],"Questions today":["ఈరోజు ప్రశ్నలు","आज के प्रश्न"],"Questions this month":["ఈ నెల ప్రశ్నలు","इस महीने के प्रश्न"],"Tokens this month":["ఈ నెల టోకెన్లు","इस महीने के टोकन"],"Questions per person per day":["ఒక్కొక్కరికి రోజుకు ప్రశ్నలు","प्रति व्यक्ति प्रतिदिन प्रश्न"],"AI switched on":["AI ఆన్","AI चालू"],"Looking at your data…":["మీ డేటా చూస్తోంది…","आपका डेटा देख रहे हैं…"],"Thinking…":["ఆలోచిస్తోంది…","सोच रहे हैं…"]};

/* ---- whole-app translation (Telugu / Hindi) ---- */
const I18N_KEEP_BASE='BOQ,GST,GSTIN,PO,DPR,RA,UPI,IFSC,HSN,SAC,CSV,Excel,PDF,WhatsApp,RCC,PCC,GF,FF,SF,TF,QA,QC,CL,NVR,ID,OTP,AI,sq.ft,sqft,rft,Rft,Rmt,Sqm,Cum,Kg,MT,Nos,nos,JCB,CP Plus,EZVIZ,Hikvision,Dahua,Imou,TP-Link Tapo,Qubo,Godrej,Google,Instagram,YouTube,Facebook,Meta,Drive,Dropbox,DWG,Revit,M25,BuildMitr,WBS,CO,₹,vs,Contributor,Editor,Viewer,G,P,A,OT,SC,Sqft,Brass,Load';
let I18N_USERKEEP='';try{I18N_USERKEEP=localStorage.getItem('bm-keep')||'';}catch(_){}
let KEEP=new Set();function buildKeep(){KEEP=new Set((I18N_KEEP_BASE+','+I18N_USERKEEP).split(',').map(x=>x.trim()).filter(Boolean));TRC.te.clear();TRC.hi.clear();}
const TRC={te:new Map(),hi:new Map()};
const I18N_LO={};Object.keys(I18N).forEach(k=>{const l=k.toLowerCase();if(!(l in I18N_LO))I18N_LO[l]=k;});
buildKeep();
function phr(s){const li=LANG==='te'?0:1;if(KEEP.has(s))return s;let e=I18N[s];if(!e){const k=I18N_LO[s.toLowerCase()];if(k&&s.length>1)e=I18N[k];}return e?e[li]:null;}
const I18N_PAT=[
 [/^See all (\d+)$/,(n)=>LANG==='te'?`అన్నీ చూడండి (${n})`:`सब देखें (${n})`],
 [/^Last (\d+) changes$/,(n)=>LANG==='te'?`చివరి ${n} మార్పులు`:`आखिरी ${n} बदलाव`],
 [/^(\d+) saved forms?$/,(n)=>LANG==='te'?`${n} సేవ్ అయిన ఫారాలు`:`${n} सेव फ़ॉर्म`],
 [/^Watch site cameras \((\d+)\)$/,(n)=>LANG==='te'?`సైట్ కెమెరాలు చూడండి (${n})`:`साइट कैमरे देखें (${n})`],
 [/^Message \((.+)\)$/,(x)=>`${phr('Message')} (${trCore(x)})`],
 [/^Follow-up day (\d+)$/,(n)=>LANG==='te'?`${n}వ రోజు ఫాలో-అప్`:`${n}वें दिन फॉलो-अप`],
 [/^Day (\d+) follow-up$/,(n)=>LANG==='te'?`${n}వ రోజు ఫాలో-అప్`:`${n}वें दिन फॉलो-अप`],
 [/^Site visit today (.+)$/,(x)=>LANG==='te'?`ఈరోజు సైట్ విజిట్ ${x}`:`आज साइट विज़िट ${x}`],
 [/^due (.+)$/,(x)=>LANG==='te'?`గడువు ${x}`:`देय ${x}`],
 [/^WHAT'S INCLUDED \((.+)\)$/,(x)=>LANG==='te'?`ఏమి ఉంటుంది (${trCore(x)})`:`क्या शामिल है (${trCore(x)})`],
 [/^(Task late|Follow up lead|Low stock|Material request pending|Checklist waiting for your approval|Drawing for approval|Payment overdue|Stage reached — raise invoice|Camera offline|Snag \(quality defect\)|Safety|Client complaint|Site issue|Issue): (.+)$/,(a,x)=>`${phr(a)||trCore(a)}: ${x.replace(/\(due ([^)]+)\)/,(m,d)=>'('+(LANG==='te'?'గడువు ':'देय ')+d+')').replace(/ — overdue$/,' — '+phr('overdue'))}`],
 [/^Change order (\S+) waiting for approval \((.+)\)$/,(c,a)=>LANG==='te'?`మార్పు ఆర్డర్ ${c} ఆమోదం కోసం (${a})`:`बदलाव आदेश ${c} मंज़ूरी के लिए (${a})`],
 [/^Price up (\d+)%: (.+)$/,(p,x)=>LANG==='te'?`ధర ${p}% పెరిగింది: ${x}`:`कीमत ${p}% बढ़ी: ${x}`],
 [/^Add (.+)$/,(x)=>{const t=trCore(x);if(t===x&&x.split(' ').length>3)return null;return LANG==='te'?`${t} జోడించు`:`${t} जोड़ें`;}],
 [/^Needs approved: (.+)$/,(x)=>`${phr('Needs approved')}: ${x.split(', ').map(trCore).join(', ')}`],
 [/^Checklist for (.+)$/,(x)=>LANG==='te'?`${trCore(x)} చెక్‌లిస్ట్`:`${trCore(x)} चेकलिस्ट`],
 [/^Previewing as (.+?)\.?$/,(x)=>LANG==='te'?`ప్రివ్యూ: ${trCore(x)}.`:`प्रीव्यू: ${trCore(x)}।`],
 [/^Access for (.+)$/,(x)=>LANG==='te'?`${x} అనుమతి`:`${x} का एक्सेस`],
 [/^Seen by (.+)$/,(x)=>LANG==='te'?`${x} చూశారు`:`${x} ने देखा`],
 [/^Seen (.+)$/,(x)=>LANG==='te'?`చూశారు ${x}`:`देखा ${x}`],
 [/^Replying to (.+)$/,(x)=>LANG==='te'?`${x} కి జవాబు`:`${x} को जवाब`],
 [/^Message (.+)$/,(x)=>LANG==='te'?`${trCore(x)} కి సందేశం`:`${trCore(x)} को संदेश`],
 [/^Only for (.+)$/,(x)=>LANG==='te'?`${x} కి మాత్రమే`:`केवल ${x} के लिए`],
 [/^React (.+)$/,(x)=>LANG==='te'?`స్పందన ${x}`:`प्रतिक्रिया ${x}`],
 [/^(Good morning|Good afternoon|Good evening|Welcome), (.+)$/,(g,x)=>`${phr(g)||g}, ${x}`],
 [/^Follow-up (\d.+)$/,(x)=>`${phr('Follow-up')} ${x}`],
 [/^Fix by (.+)$/,(x)=>`${phr('Fix by')} ${x}`],
 [/^Finish by (.+)$/,(x)=>LANG==='te'?`${x} లోపు పూర్తి`:`${x} तक पूरा`],
 [/^starts (.+)$/,(x)=>LANG==='te'?`${x} నుండి`:`${x} से शुरू`],
 [/^from (.+)$/,(x)=>LANG==='te'?`${x} నుండి`:`${x} से`],
 [/^by (\d.+)$/,(x)=>LANG==='te'?`${x} లోపు`:`${x} तक`],
 [/^Due (\d.+)$/,(x)=>LANG==='te'?`బాకీ ${x}`:`देय ${x}`],
 [/^(\d+) (.+)$/,(n,x)=>{const t=trCore(x);return t!==x?`${n} ${t}`:null;}],
];
function wordMode(s){
  const toks=s.split(/(\s+|[(),/&+%•·:;!?…→✓=@-])/);let any=false;const out=[];
  for(const t of toks){if(!t)continue;if(!/[A-Za-z]/.test(t)){out.push(t);continue;}
    if(KEEP.has(t)||/^[A-Z0-9.]{2,6}$/.test(t)&&/[A-Z]/.test(t)){out.push(t);continue;}
    let e=I18N[t];if(!e&&t.length>1){const k=I18N_LO[t.toLowerCase()];if(k&&!k.includes(' '))e=I18N[k];}
    if(!e)return null;const v=e[LANG==='te'?0:1];any=true;out.push(v==='-'?'':v);}
  return any?out.join('').replace(/\s{2,}/g,' ').trim():null;
}
function trCore(core){
  if(!core||!/[A-Za-z]/.test(core))return core;
  const p=phr(core);if(p!=null)return p;
  const pm=core.match(/^(.*?)([:.…]+)$/);if(pm&&pm[1]){const q=phr(pm[1]);if(q!=null)return q+pm[2];}
  for(const sep of [' · ',' › ',' | ']){if(core.includes(sep)){const parts=core.split(sep);const tp=parts.map(x=>trCore(x));if(tp.some((x,i)=>x!==parts[i]))return tp.join(sep);}}
  for(const [re,fn] of I18N_PAT){const m=core.match(re);if(m){const r=fn(...m.slice(1));if(r!=null)return r;}}
  for(const sep of [' · ',' — ',' › ',' | ',', ']){if(core.includes(sep)){const parts=core.split(sep);const tp=parts.map(x=>trCore(x));if(tp.some((x,i)=>x!==parts[i]))return tp.join(sep);}}
  return wordMode(core)??core;
}
function trS(s){if(LANG==='en')return s;const c=TRC[LANG];if(c.has(s))return c.get(s);const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);const r=m[1]+trCore(m[2])+m[3];if(c.size>20000)c.clear();c.set(s,r);return r;}
const TRORIG=new WeakMap();
const NOTR='.bub-tx,.chat-pv,.mm-prev span,.bub-q span,.fu-msg,.pinbar span,.brand,.org,textarea,[data-notr],script,style,.pav,.mav,.gav,.chat-who';
function trNode(root){
  if(!root)return;
  const doText=n=>{const pe=n.parentElement;if(!pe||pe.closest(NOTR))return;let o=TRORIG.get(n);if(o===undefined){o=n.nodeValue;TRORIG.set(n,o);}
    const t=LANG==='en'?o:trS(o);if(n.nodeValue!==t){if(pe.tagName==='OPTION'&&!pe.hasAttribute('value'))pe.setAttribute('value',o.trim());n.nodeValue=t;}};
  if(root.nodeType===3){doText(root);return;}
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())doText(n);
  const els=[root,...root.querySelectorAll('[placeholder],[title],[aria-label]')];
  for(const el of els){if(!el.hasAttribute)continue;
    for(const a of ['placeholder','title','aria-label']){if(!el.hasAttribute||!el.hasAttribute(a))continue;const k='data-tro-'+a;let o=el.getAttribute(k);if(o==null){o=el.getAttribute(a);el.setAttribute(k,o);}const t=LANG==='en'?o:trS(o);if(el.getAttribute(a)!==t)el.setAttribute(a,t);}}
}
try{if(typeof MutationObserver!=='undefined'){new MutationObserver(ms=>{if(LANG==='en'&&!S._trUsed)return;for(const m of ms)for(const n of m.addedNodes)trNode(n);}).observe(document.body,{childList:true,subtree:true});}}catch(_){}
/* → chat: setLang */

/* ================= Cloud login (Google Drive server) — website / Play Store version ================= */
const CLOUD={url:'',token:'',org:null,mem:null,user:null,blob:''};
const cloudCfg=()=>{const c=window.BM_CONFIG||{};return c.googleScriptUrl&&/^https:\/\//.test(c.googleScriptUrl)?c:null;};
const JOIN_ROLES=['Site engineer','Supervisor','Architect','Structural engineer','Client','Project manager','Accountant','Storekeeper','Sub-contractor','Marketing'];
const LG={mode:'pw',   // sign-in page opens on password; “Get a login code” and “I have an invite code” are just below
  hasPw:true,pwAsked:false,email:'',name:'',phone:'',role:'',busy:false,err:'',sentAt:0,orgs:[],toAdmin:true,owner:false,wait:null};
async function gasApi(action,args){
  let r;
  try{r=await fetch(CLOUD.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,token:CLOUD.token,org:CLOUD.org,...(args||{})}),redirect:'follow'});}
  catch(_){const e=new Error('Could not reach the server. Check your internet connection.');e.code='net';throw e;}
  let j;try{j=await r.json();}catch(_){const e=new Error('The server did not answer properly. Try again in a minute.');e.code='net';throw e;}
  if(!j.ok){const e=new Error(j.error||'Something went wrong.');e.code=j.code||'error';
    if(e.code==='auth'&&S.ready){toast('Your login has expired. Please sign in again.');setTimeout(cloudSignOut,1500);}
    if(e.code==='no_access'&&S.ready){toast(e.message);setTimeout(cloudSignOut,2500);}
    throw e;}
  return j;
}
function vLogin(){
  const step=S.authStep;const cfg=window.BM_CONFIG||{};const brand=esc(cfg.companyName||'BuildMitr');
  const langs=`<div class="lg-lang">${LANGS.map(([k,l])=>`<button type="button" class="fchip ${LANG===k?'on':''}" data-setlang="${k}">${l}</button>`).join('')}</div>`;
  const err=LG.err?`<div class="lg-err" role="alert">${esc(LG.err)}</div>`:'';
  let body='';
  if(step==='email'&&LG.fixedOrg)lgLoadOrgs();
  const lgOrgN=LG.fixedOrg?(((LG.orgList||[]).find(o=>o.id===LG.fixedOrg)||{}).name||LG.fixedName||''):'';
  const lgOrgFix=LG.fixedOrg?`<div class="lg-orgfix">${ico('building-2')}<span>Organisation: <b data-notr>${esc(lgOrgN||'from your invite link')}</b></span></div>`:'';
  if(step==='email'&&LG.mode==='pw')body=`<form id="lgPwForm" class="lg-form"><h2>Sign in${lgOrgN?` to <span data-notr>${esc(lgOrgN)}</span>`:''}</h2>
    <label>Email<input id="lgEmail" type="email" inputmode="email" autocomplete="username" required value="${esc(LG.email)}" placeholder="name@example.com"></label>
    <label>Password<input id="lgPw" type="password" autocomplete="current-password" required placeholder="Your password"></label>${err}
    <button class="btn pri lg-go" ${LG.busy?'disabled':''}>${LG.busy?'Checking…':'Sign in'}</button>
    <button type="button" class="btn ghost sm" id="lgUseCode">First time or forgot password?</button>
    ${gsiOK()?`<div id="gsiWrap"><div class="lg-or"><span>or</span></div><div id="gsiBtn" class="gsi-btn"></div></div>`:''}
    ${LG.fixedOrg?`<div class="lg-or"><span>new to ${esc(lgOrgN||'this company')}?</span></div><button type="button" class="btn" id="lgSignup">${ico('user-plus')}<span>Create account</span></button>`:`<div class="code lg-hint">${ico('link')}<span>New here? Open the invite link your company admin sent you, then tap <b>Create account</b>.</span></div>`}</form>`;
  else if(step==='email')body=`<form id="lgEmailForm" class="lg-form"><h2>Get a code on your email</h2><p class="code">For people your company admin has already added or approved. We email you a 6-digit code — enter it, then set your password.</p>
    <label>Email<input id="lgEmail" type="email" inputmode="email" autocomplete="email" required value="${esc(LG.email)}" placeholder="name@example.com"></label>${err}
    <button class="btn pri lg-go" ${LG.busy?'disabled':''}>${LG.busy?'Sending…':'Send code'}</button>
    <button type="button" class="btn ghost sm" id="lgUsePw">Back to sign in</button></form>`;
  else if(step==='signup')body=`<form id="lgSignupForm" class="lg-form"><h2>Create account</h2>${lgOrgFix}
    <label>Your name<input id="lgName" autocomplete="name" required value="${esc(LG.name)}" placeholder="e.g. Ravi Kumar"></label>
    <label>Mobile number<input id="lgPhone" type="tel" inputmode="tel" autocomplete="tel" required value="${esc(LG.phone)}" placeholder="e.g. 98765 43210"></label>
    <label>Email<input id="lgEmail" type="email" inputmode="email" autocomplete="username" required value="${esc(LG.email)}" placeholder="name@example.com"></label>
    <label>Password (at least 8 characters)<input id="lgPw1" type="password" autocomplete="new-password" minlength="8" required></label>
    <label>Type the password again<input id="lgPw2" type="password" autocomplete="new-password" minlength="8" required></label>${err}
    <button class="btn pri lg-go" ${LG.busy?'disabled':''}>${LG.busy?'Creating…':'Create account'}</button>
    <p class="code">We email you a code to confirm your email. Then your company admin approves your account and chooses your role.</p>
    <button type="button" class="btn ghost sm" id="lgUsePw">I already have an account</button></form>`;
  else if(step==='wait')body=`<div class="lg-form"><h2>Waiting for approval</h2><p class="code">You are signed in as <b data-notr>${esc((CLOUD.user||{}).email||LG.email)}</b>.</p>
    <div class="note">${ico('history')}<span>Your account is created. Your company admin will approve it and choose your role — this page opens by itself once you are approved. You can keep it open or come back later and sign in with your email and password.</span></div>${err}
    <button type="button" class="btn" id="lgRecheck">${ico('history')}<span>Check again</span></button>
    <button type="button" class="btn ghost sm" id="lgOut">Sign out</button></div>`;
  else if(step==='code')body=`<form id="lgCodeForm" class="lg-form"><h2>Enter the code</h2><p class="code">${LG.invite?`Enter the 6-digit <b>invite code</b> your admin shared with you for <b data-notr>${esc(LG.email)}</b>. It works once.`:`We sent a 6-digit code to <b data-notr>${esc(LG.email)}</b>. Check your inbox and spam folder. ${LG.signup?'Enter it to confirm your email and create your account.':'After you enter it, set your password.'}`}</p>
    <label>6-digit code<input id="lgCode" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required placeholder="••••••" class="lg-code"></label>${err}
    <button class="btn pri lg-go" ${LG.busy?'disabled':''}>${LG.busy?'Checking…':'Sign in'}</button>
    <div class="lg-row"><button type="button" class="btn ghost sm" id="lgBack">Change email</button>${LG.invite||LG.signup?'':`<button type="button" class="btn ghost sm" id="lgResend" ${Date.now()-LG.sentAt<60000?'disabled':''}>Send the code again</button>`}</div></form>`;
  else if(step==='org')body=`<form id="lgOrgForm" class="lg-form"><h2>Welcome to BuildMitr</h2><p class="code">You are signed in as <b data-notr>${esc((CLOUD.user||{}).email||'')}</b>, but you are not part of a company yet.</p>
    <div class="note">${ico('info')}<span>Joining your company's team? Ask the admin to add your email on the <b>Team</b> page, then tap <b>Check again</b>.</span></div>
    <button type="button" class="btn" id="lgRecheck">${ico('history')}<span>Check again</span></button>
    <div class="lg-or"><span>or, if you are the admin</span></div>
    <label>Company name<input id="lgOrgName" required placeholder="e.g. BuildMitr"></label>${err}
    <button class="btn pri lg-go" ${LG.busy?'disabled':''}>${LG.busy?'Creating…':'Create my company'}</button>
    <button type="button" class="btn ghost sm" id="lgOut">Sign out</button></form>`;
  else if(step==='pick')body=`<div class="lg-form"><h2>Choose organisation</h2>${LG.orgs.map(m=>`<button class="btn lg-org" data-lgorg="${esc(m.org_id)}"><b data-notr>${esc(m.org_name||'Company')}</b><span class="code">${esc(m.role)}</span></button>`).join('')}<button type="button" class="btn ghost sm" id="lgOut">Sign out</button></div>`;
  else body=`<div class="lg-form"><h2>Loading…</h2><p class="code">Opening your projects.</p>${err}${err?`<button type="button" class="btn" id="lgRetry">${ico('history')}<span>Try again</span></button><button type="button" class="btn ghost sm" id="lgOut">Sign out</button>`:''}</div>`;
  return `<div class="lg-wrap"><div class="lg-card"><div class="lg-brand">${ico('building-2')}<span data-notr>${brand}</span></div>${langs}${body}</div>
    <p class="lg-foot code">${location.hostname?`<span data-notr>${esc(location.hostname)}</span> · `:''}<button class="linkish" id="lgDemo">Try the demo</button></p>${lgGetApp()}</div>`;
}
/* sign-in page: get the app before signing in (Android app, Windows setup, iPhone home screen) */
function lgGetApp(){let inst=false;try{inst=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true||/src=(android|win)/.test(location.search);}catch(_){}if(inst)return '';
  const R='https://github.com/Buildmitr/buildmitr_1/releases/download/';
  return `<div class="lg-apps"><span class="code">Get the BuildMitr app:</span>
    <a class="btn sm" href="${R}android-latest/BuildMitr.apk" target="_blank" rel="noopener">${ico('smartphone')}<span>Android</span></a>
    <a class="btn sm" href="${R}windows-latest/BuildMitr-Setup.exe" target="_blank" rel="noopener">${ico('monitor')}<span>Windows PC</span></a>
    <button type="button" class="btn sm" id="lgIos">${ico('apple')}<span>iPhone / iPad</span></button></div>`;}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#lgIos'))toast('On iPhone / iPad: open this page in Safari → Share → Add to Home Screen');},true);
function lgSet(step,err){S.authStep=step;LG.err=err||'';LG.busy=false;render();setTimeout(()=>{const i=document.querySelector('#lgName,#lgEmail,#lgCode,#lgOrgName');i&&i.focus&&i.focus();},30);}
async function lgSend(){
  const v=(document.getElementById('lgEmail')||{}).value||LG.email;LG.email=v.trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(LG.email)){lgSet(S.authStep==='code'?'code':'email','Please enter a valid email address.');return;}
  LG.busy=true;LG.invite=false;LG.signup=false;render();
  try{await gasApi('resetCode',{email:LG.email});}catch(e){lgSet(S.authStep==='code'?'code':'email',e.message);return;}
  LG.toAdmin=false;LG.reset=true;
  LG.sentAt=Date.now();lgSet('code');
}
async function lgSignup(){
  const g=id=>((document.getElementById(id)||{}).value||'');
  LG.name=g('lgName').trim();LG.phone=g('lgPhone').trim();LG.email=g('lgEmail').trim().toLowerCase();const a=g('lgPw1'),b=g('lgPw2');
  if(!LG.name){lgSet('signup','Please enter your name.');return;}
  if(LG.phone.replace(/\D/g,'').length<10){lgSet('signup','Please enter your mobile number.');return;}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(LG.email)){lgSet('signup','Please enter a valid email address.');return;}
  if(a.length<8){lgSet('signup','The password needs at least 8 characters.');return;}
  if(a!==b){lgSet('signup','The two passwords are not the same.');return;}
  LG.busy=true;render();let j;
  let sj;try{sj=await gasApi('signup',{email:LG.email,name:LG.name,phone:LG.phone,password:a,org:LG.fixedOrg||''});}catch(e){lgSet('signup',e.message);return;}
  LG.snonce=sj.nonce||'';
  LG.signup=true;LG.reset=false;LG.invite=false;LG.toAdmin=false;LG.sentAt=Date.now();lgSet('code');
}
async function lgVerify(){
  const code=((document.getElementById('lgCode')||{}).value||'').replace(/\D/g,'');
  if(code.length!==6){lgSet('code','The code has 6 digits.');return;}
  LG.busy=true;render();
  if(LG.signup){let j;try{j=await gasApi('signupVerify',{email:LG.email,code,nonce:LG.snonce});}catch(e){lgSet('code',e.message);return;}
    LG.signup=false;CLOUD.token=j.token;try{localStorage.setItem('bm-token',j.token);localStorage.setItem('bm-haspw','1');}catch(_){}
    LG.owner=!!j.owner;LG.hasPw=true;await cloudEnter(j.user,null,j.mems,null);return;}
  let j;const so=(()=>{try{return localStorage.getItem('bm-org')||'';}catch(_){return '';}})();try{j=await gasApi('verify',{email:LG.email,code,org:so});}catch(e){lgSet('code',e.message);return;}
  CLOUD.token=j.token;try{localStorage.setItem('bm-token',j.token);}catch(_){}
  LG.owner=!!j.owner;LG.hasPw=!!j.hasPw;LG.pwAsked=false;if(LG.reset){LG.askPw=true;LG.forcePw=true;}LG.reset=false;
  await cloudEnter(j.user,j.org||null,j.mems,j.data?{rows:j.data.rows,now:j.data.now}:null);
}
/* ---- Sign in with Google (for people already in a company; new people still join through the company link) ---- */
function gsiOK(){const c=window.BM_CONFIG||{};if(!c.googleClientId||!/\.apps\.googleusercontent\.com$/.test(c.googleClientId))return false;
  const ua=navigator.userAgent||'';if(/Electron|; wv\)|BuildMitrApp/.test(ua))return false;   // Google blocks its sign-in inside app windows: use email there
  return location.protocol==='https:'&&(c.googleOrigins||['https://buildmitr.github.io']).includes(location.origin);}
let GSI_P=null,GSI_INIT=false;
function gsiMount(b){
  GSI_P=GSI_P||Promise.race([loadJs('https://accounts.google.com/gsi/client',()=>window.google&&google.accounts&&google.accounts.id),new Promise((_,no)=>setTimeout(()=>no(new Error('slow')),10000))]);
  GSI_P.then(()=>{
    if(!document.body.contains(b))return;
    if(!GSI_INIT){google.accounts.id.initialize({client_id:window.BM_CONFIG.googleClientId,callback:gsiDone,ux_mode:'popup',auto_select:false,cancel_on_tap_outside:true});GSI_INIT=true;}
    google.accounts.id.renderButton(b,{theme:'outline',size:'large',text:'signin_with',shape:'pill',width:Math.min(320,b.clientWidth||300)});
  }).catch(()=>{GSI_P=null;const w=document.getElementById('gsiWrap');if(w)w.hidden=true;});}
setInterval(()=>{if(S.ready)return;const b=document.getElementById('gsiBtn');if(b&&!b.dataset.on){b.dataset.on='1';gsiMount(b);}},400);
async function gsiDone(resp){
  if(!resp||!resp.credential||LG.busy)return;
  LG.busy=true;render();let j;
  const so=(()=>{try{return localStorage.getItem('bm-org')||'';}catch(_){return '';}})();
  try{j=await gasApi('gsignin',{credential:resp.credential,org:so});}catch(e){LG.busy=false;lgSet('email',e.message);return;}
  CLOUD.token=j.token;try{localStorage.setItem('bm-token',j.token);}catch(_){}
  LG.email=j.user.email;LG.owner=!!j.owner;LG.hasPw=!!j.hasPw;LG.busy=false;if(!j.hasPw)LG.askPw=true;   // a password too, for the Windows / Android apps
  await cloudEnter(j.user,j.org||null,j.mems,j.data?{rows:j.data.rows,now:j.data.now}:null);
}
async function lgPwLogin(){
  LG.email=((document.getElementById('lgEmail')||{}).value||'').trim().toLowerCase();const pw=(document.getElementById('lgPw')||{}).value||'';
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(LG.email)){lgSet('email','Please enter a valid email address.');return;}
  if(!pw){lgSet('email','Enter your password.');return;}
  LG.busy=true;render();let j;
  const so=(()=>{try{return localStorage.getItem('bm-org')||'';}catch(_){return '';}})();try{j=await gasApi('loginPw',{email:LG.email,password:pw,org:so});}catch(e){lgSet('email',e.message);return;}
  CLOUD.token=j.token;try{localStorage.setItem('bm-token',j.token);}catch(_){}
  LG.owner=!!j.owner;LG.hasPw=true;await cloudEnter(j.user,j.org||null,j.mems,j.data?{rows:j.data.rows,now:j.data.now}:null);
}
function pwDialog(first){
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="pwForm" autocomplete="on">
    <div class="pane-h"><h2>${first?'Set your password':'Change password'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b">${first?`<div class="note">${ico('lock')}<span>Set your password. From now on, sign in with your email and this password.</span></div>`:''}
      <input type="email" autocomplete="username" value="${esc(ME.email||'')}" hidden>
      ${!first&&LG.hasPw?`<label class="req">Current password<input id="pw0" type="password" autocomplete="current-password" required></label><div class="code">Forgot it? Sign out, tap “First time or forgot password?”, enter the code from your email, then set a new password.</div>`:''}
      <label class="req">New password (at least 8 characters, not your email)<input id="pw1" type="password" autocomplete="new-password" minlength="8" required></label>
      <label class="req">Type it again<input id="pw2" type="password" autocomplete="new-password" minlength="8" required></label>
      ${LG.hasPw?`<div class="code">After a change, your other phones and PCs are signed out — sign in there with the new password.</div>`:''}</div>
    <div class="pane-f"><button type="button" class="btn" data-close>${first?'Later':'Cancel'}</button><button class="btn pri" id="pwSave">Save password</button></div></form></div>`;
  draw();setTimeout(()=>{const i=document.getElementById('pw0')||document.getElementById('pw1');i&&i.focus();},30);
}
async function pwSave(){
  const a=(document.getElementById('pw1')||{}).value||'',b=(document.getElementById('pw2')||{}).value||'';
  if(a.length<8){toast('The password needs at least 8 characters.');return;}
  if(a!==b){toast('The two passwords are not the same.');return;}
  const btn=document.getElementById('pwSave');if(btn)btn.disabled=true;
  const old=(document.getElementById('pw0')||{}).value||'';
  try{await gasApi('setPw',{password:a,old});LG.hasPw=true;try{localStorage.setItem('bm-haspw','1');}catch(_){}document.getElementById('layer').innerHTML='';toast('Password saved. Next time sign in with your email and password (or a code to your email).');if(S.view==='settings')render();}
  catch(e){if(btn)btn.disabled=false;toast(e.message);}
}
async function lgCreateOrg(){
  const name=((document.getElementById('lgOrgName')||{}).value||'').trim();if(!name){lgSet('org','Enter your company name.');return;}
  LG.busy=true;render();let j;
  try{j=await gasApi('createOrg',{name});}catch(e){lgSet('org',e.message);return;}
  await cloudEnter(CLOUD.user,j.org_id);
}
async function cloudEnter(user,orgId,mems,pre0){
  CLOUD.user=user;S.authStep='loading';LG.err='';render();
  let pre=pre0||null,fromCache=false;
  const pickSaved=()=>{try{return localStorage.getItem('bm-org');}catch(_){return null;}};
  if(!mems){
    const c=bmGet('bm-c-me');
    if(c&&c.user&&c.mems&&c.mems.length&&(!user||!user.email||c.user.email===user.email)){   // last visit's details: open at once, check in the background
      mems=c.mems;CLOUD.user=user=c.user;LG.owner=!!c.owner;LG.hasPw=c.hasPw!==false;fromCache=true;}
    else{
      try{const j=await gasApi('boot',{org:orgId||pickSaved()||''});mems=j.mems;CLOUD.user=user=j.user;LG.owner=!!j.owner;LG.hasPw=j.hasPw!==false;if(j.data&&j.org){pre=j.data;orgId=j.org;}}
      catch(e){if(e.code==='auth'){cloudForget();lgSet('email',e.message);}else lgSet('loading',e.message);return;}}
  }
  if(!fromCache&&mems&&mems.length)bmSet('bm-c-me',{user,mems,owner:LG.owner,hasPw:LG.hasPw});
  clearTimeout(LG.wait);
  if(!mems||!mems.length){
    if(LG.owner){lgSet('org');return;}
    lgSet('wait');LG.wait=setTimeout(()=>{if(S.authStep==='wait')cloudEnter(CLOUD.user);},15000);return;}
  let pick=orgId||pickSaved();
  let m=mems.find(x=>x.org_id===pick);
  if(!m&&mems.length>1){LG.orgs=mems;lgSet('pick');return;}
  m=m||mems[0];try{localStorage.setItem('bm-org',m.org_id);}catch(_){}
  if(pre&&m.org_id!==orgId)pre=null;
  m.organizations={name:m.org_name};CLOUD.org=m.org_id;CLOUD.mem=m;CLOUD.mems=mems;
  ME={id:user.id,name:m.name||user.email.split('@')[0],email:user.email,isOwner:m.role==='Admin',canEdit:m.role==='Admin'||m.role==='Project manager',avatarUrl:''};
  if(fromCache)gasApi('me').then(j=>{   // membership may have changed since the last visit
    if(!j.mems.some(x=>x.org_id===CLOUD.org)){bmClearCache();toast('Your access has changed. Opening again…');setTimeout(()=>location.reload(),1500);return;}
    bmSet('bm-c-me',{user:j.user,mems:j.mems,owner:!!j.owner,hasPw:j.hasPw!==false});CLOUD.mems=j.mems;LG.owner=!!j.owner;LG.hasPw=j.hasPw!==false;
    const nm=j.mems.find(x=>x.org_id===CLOUD.org);if(nm&&nm.role!==CLOUD.mem.role){bmClearCache();location.reload();}
  }).catch(()=>{});
  db=gasDb(CLOUD.org,pre);A=gasAssets(CLOUD.org);CANW=CANW0=true;
  const loaded=new Set();
  COLS.forEach(c=>db.collection(c).onSnapshot(snap=>{REAL[c]=snap.docs.map(x=>({id:x.id,...x.data()}));D[c]=REAL[c];loaded.add(c);
    if(loaded.size===COLS.length&&!S.ready){S.ready=true;S.authStep=null;S.view=homeView();cloudAfterLoad();AI.gemini=true;{const f=document.getElementById('aiFab');f.hidden=false;document.getElementById('aiFabIco').innerHTML=ico('sparkles');}render();}refresh();}));
}
async function cloudAfterLoad(){
  /* make sure the signed-in person has a Team card linked to their login */
  const me=CLOUD.user;
  if(isSuperAdmin())return;   // the BuildMitr admin is not added to each organisation's team
  const t=D.team.find(x=>x.account===me.id)||D.team.find(x=>(x.email||'').toLowerCase()===me.email.toLowerCase());
  try{if(t&&t.account!==me.id&&ME.isOwner)await db.doc('team/'+t.id).update({account:me.id,status:'Active'});
    else if(!t&&ME.isOwner)await db.collection('team').add({name:ME.name,email:me.email,phone:'',role:'Admin',access:'Full access',projects:['all'],account:me.id,status:'Active',by:me.id,at:Date.now()});
    await db.doc('members/'+me.id).set({joined:Date.now(),email:me.email});}catch(_){}
}
function cloudForget(){CLOUD.token='';bmClearCache();try{localStorage.removeItem('bm-token');localStorage.removeItem('bm-org');}catch(_){}}
async function cloudSignOut(){cloudForget();location.reload();}
/* ---- data layer: same interface the app already uses (collection / doc / onSnapshot) ---- */
function gasDb(org,pre){
  const store={},ls={};COLS.forEach(c=>store[c]=[]);let ready=false,cursor=0,polling=false,pend=0;
  const CK='bm-c-data:'+org;let saveT=0;
  const saveCache=()=>{clearTimeout(saveT);saveT=setTimeout(()=>{const rows=[];Object.keys(store).forEach(c=>(store[c]||[]).forEach(r=>rows.push([c,r.id,JSON.stringify(r.data)])));bmSet(CK,{cursor,rows,at:Date.now()});},1500);};
  const fill=rows=>{Object.keys(store).forEach(c=>store[c]=[]);(rows||[]).forEach(([c,id,s])=>{(store[c]=store[c]||[]).push({id,data:parse(s)});});out.forEach(o=>applyOp(o));};
  const snap=c=>({docs:(store[c]||[]).map(r=>({id:r.id,exists:true,data:()=>r.data})),metadata:{fromCache:false,hasPendingWrites:pend>0}});
  const timers={};const emit=c=>{clearTimeout(timers[c]);timers[c]=setTimeout(()=>(ls[c]||[]).forEach(f=>f(snap(c))),20);};
  const put=(c,id,data)=>{const a=store[c]||(store[c]=[]);const i=a.findIndex(x=>x.id===id);if(i>=0)a[i]={id,data};else a.push({id,data});emit(c);};
  const drop=(c,id)=>{const a=store[c]||[];const i=a.findIndex(x=>x.id===id);if(i>=0){a.splice(i,1);emit(c);}};
  const parse=s=>{try{return JSON.parse(s)||{};}catch(_){return {};}};
  const fail=e=>{const x=new Error(e&&e.message||'save failed');x.code=e&&e.code==='denied'?'invalid_argument':'save_failed';return x;};
  const newId=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  /* Saving is instant: a change shows at once and goes into an outbox that is sent in order in the background.
     The outbox is kept on the device, so nothing is lost if the network drops or the app is closed; it is sent when back online. */
  const OK='bm-c-out:'+org;let out=(()=>{const o=bmGet(OK);return Array.isArray(o)?o:[];})(),flushing=false,resync=false;
  const saveOut=()=>{bmSet(OK,out);pend=out.length;saveChip(out.length?(navigator.onLine===false?'offline':'saving'):'');};
  const opIds=o=>o.a==='putMany'||o.a==='delMany'?o.args.items.map(([c,id])=>c+'|'+id):[o.args.col+'|'+o.args.id];
  const pendingIds=()=>new Set(out.flatMap(opIds));
  const applyOp=o=>{if(o.a==='put')put(o.args.col,o.args.id,o.args.data);else if(o.a==='merge'){const pr=(store[o.args.col]||[]).find(x=>x.id===o.args.id);put(o.args.col,o.args.id,{...(pr?pr.data:{}),...o.args.patch});}
    else if(o.a==='del')drop(o.args.col,o.args.id);else if(o.a==='delMany')o.args.items.forEach(([c,id])=>drop(c,id));else if(o.a==='putMany')o.args.items.forEach(([c,id,d])=>put(c,id,d));};
  let opsOk=null,opsMax=25,opsFails=0;   // does this server take several changes in one request? (batch size shrinks if a batch keeps failing)
  const flush=async()=>{if(flushing||!out.length)return;flushing=true;saveChip('saving');
    while(out.length){
      const batch=[];for(const o of out){if(!['put','merge','del'].includes(o.a))break;batch.push(o);if(batch.length>=opsMax)break;}
      if(batch.length>1&&opsOk!==false){   // many changes (e.g. a meeting + its tasks + history) go in one request instead of one by one
        try{const j=await gasApi('ops',{ops:batch.map(o=>({a:o.a,args:o.args}))});opsOk=true;opsFails=0;opsMax=25;out.splice(0,batch.length);saveOut();
          (j.res||[]).forEach(r=>{if(!r||!r.error)return;resync=true;
            if(r.code==='denied')deniedToast(r.error);   // one change was not allowed — everything else keeps working
            else if(r.code!=='auth'&&r.code!=='no_access')toast('A change could not be saved: '+(r.error||'server error'));});
          continue;}
        catch(e){if(/Unknown request/i.test(e.message||'')){opsOk=false;continue;}
          if(e.code==='auth'||e.code==='no_access'){opsMax=1;continue;}   // handled once by the one-by-one path below
          if(navigator.onLine!==false&&++opsFails>=2){opsMax=Math.max(1,opsMax>>1);opsFails=0;}   // too big / too slow for one request: send fewer at a time
          if(e.code==='net'){flushing=false;saveChip('offline');setTimeout(flush,navigator.onLine===false?15000:5000);return;}
          if(opsMax>1)continue;}}   // older server or a request-level problem: send one by one below
      const o=out[0];
      try{await gasApi(o.a,o.args);out.shift();saveOut();}
      catch(e){if(e.code==='net'){flushing=false;saveChip('offline');setTimeout(flush,navigator.onLine===false?15000:5000);return;}
        out.shift();saveOut();resync=true;
        if(e.code==='denied')deniedToast(e.message);
        else if(e.code!=='auth'&&e.code!=='no_access')toast('A change could not be saved: '+(e.message||'server error'));}}
    flushing=false;saveChip('');
    if(resync){resync=false;try{const j=await gasApi('load');fill(j.rows);cursor=(j.now||Date.now())-3000;saveCache();COLS.forEach(emit);}catch(_){}}};
  const send=(a,args)=>{out.push({a,args});saveOut();setTimeout(flush,0);return Promise.resolve();};
  try{window.addEventListener('online',()=>flush());window.addEventListener('beforeunload',ev=>{if(out.length){ev.preventDefault();ev.returnValue='';}});}catch(_){}
  let shsig=null;   // which projects other companies share with us: when it changes, everything is loaded again
  const poll=async()=>{if(polling||!ready)return;polling=true;
    try{const j=await gasApi('since',{ts:cursor});
      if(j.shsig!==undefined&&shsig!==null&&j.shsig!==shsig){const k=await gasApi('load');fill(k.rows);shsig=k.shsig!==undefined?k.shsig:null;cursor=(k.now||Date.now())-3000;saveCache();COLS.forEach(emit);polling=false;return;}
      if(j.shsig!==undefined)shsig=j.shsig;
      const pi=pendingIds();try{if(window.bmIncoming&&(j.rows||[]).length)window.bmIncoming(j.rows.filter(([c,id])=>!pi.has(c+'|'+id)).map(([c,id,s])=>{const o=(store[c]||[]).find(x=>x.id===id);return [c,id,parse(s),o?o.data:null];}));}catch(_){}
      (j.rows||[]).forEach(([c,id,s])=>{if(COLS.includes(c)&&!pi.has(c+'|'+id))put(c,id,parse(s));});(j.gone||[]).forEach(([c,id])=>{if(!pi.has(c+'|'+id))drop(c,id);});
      cursor=Math.max(cursor,(j.now||Date.now())-3000);if((j.rows||[]).length||(j.gone||[]).length)saveCache();}catch(_){}
    polling=false;};
  const tick=()=>{const hidden=document.visibilityState==='hidden';setTimeout(async()=>{await poll();tick();},hidden?30000:(S.view==='messages'?4000:8000));};
  try{document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')poll();});}catch(_){}
  const cached=pre?null:bmGet(CK);
  if(pre){fill(pre.rows);if(pre.shsig!==undefined)shsig=pre.shsig;cursor=(pre.now||Date.now())-3000;ready=true;saveCache();setTimeout(tick,0);}
  if(out.length)setTimeout(flush,800);       // came with the sign-in request
  else if(cached&&cached.rows){fill(cached.rows);cursor=cached.cursor||0;ready=true;}                         // last visit's copy: shown at once
  (async()=>{if(pre)return;
    for(let k=0;k<3;k++){try{const j=await gasApi('load');
        fill(j.rows);if(j.shsig!==undefined)shsig=j.shsig;cursor=(j.now||Date.now())-3000;ready=true;saveCache();break;}
      catch(e){if(e.code==='auth'||e.code==='no_access'){bmClearCache();if(!cached){lgSet(e.code==='auth'?'email':'loading',e.message);if(e.code==='auth')cloudForget();}return;}
        if(k===2){if(!cached)lgSet('loading','Could not load your data: '+e.message);else{toast('Showing saved data — could not reach the server.');tick();}return;}await new Promise(r=>setTimeout(r,1500));}}
    COLS.forEach(c=>(ls[c]||[]).forEach(f=>f(snap(c))));tick();})();
  const docRef=(c,id)=>({
    get:async()=>{const r=(store[c]||[]).find(x=>x.id===id);return {id,exists:!!r,data:()=>r?r.data:undefined};},
    set:async o=>{try{NTF.mine[c+'|'+id]=Date.now();}catch(_){}try{const pv=(store[c]||[]).find(x=>x.id===id);actLog(c,id,pv?pv.data:null,o);}catch(_){}put(c,id,o);saveCache();await send('put',{col:c,id,data:o});},
    update:async o=>{try{NTF.mine[c+'|'+id]=Date.now();}catch(_){}const prev=(store[c]||[]).find(x=>x.id===id);if(!prev)throw {code:'invalid_argument'};try{actLog(c,id,prev.data,{...prev.data,...o});}catch(_){}put(c,id,{...prev.data,...o});saveCache();await send('merge',{col:c,id,patch:o});},
    delete:async()=>{drop(c,id);saveCache();await send('del',{col:c,id});}});
  return {
    doc:path=>{const i=path.indexOf('/');return docRef(path.slice(0,i),path.slice(i+1));},
    collection:c=>({doc:id=>docRef(c,id||newId()),
      add:async o=>{const id=newId();await docRef(c,id).set(o);return {id};},
      onSnapshot:next=>{(ls[c]=ls[c]||[]).push(next);if(ready)setTimeout(()=>next(snap(c)),0);return()=>{};}}),
    refreshNow:poll,
    reloadAll:async()=>{const k=await gasApi('load');fill(k.rows);if(k.shsig!==undefined)shsig=k.shsig;cursor=(k.now||Date.now())-3000;saveCache();COLS.forEach(emit);},
    /* many entries in one request (e.g. a whole work schedule) */
    batch:async list=>{list.forEach(([c,id,d])=>{try{NTF.mine[c+'|'+id]=Date.now();}catch(_){}try{const pv=(store[c]||[]).find(x=>x.id===id);actLog(c,id,pv?pv.data:null,d);}catch(_){}put(c,id,d);});saveCache();for(let i=0;i<list.length;i+=300)await send('putMany',{items:list.slice(i,i+300)});},
    delMany:async list=>{list.forEach(([c,id])=>drop(c,id));saveCache();for(let i=0;i<list.length;i+=1500)await send('delMany',{items:list.slice(i,i+1500)});},
    flush,pending:()=>out.length,
    reset:()=>toast('Your data is saved on the server — nothing to reset.')
  };
}
function gasAssets(org){
  CLOUD.blob='drive';
  return {upload:async(file,{type}={})=>{
    file=await bmShrink(file);
    if(file.size>10*1024*1024)throw new Error('The file is larger than 10 MB.');
    const ty=type||file.type||'application/octet-stream',th=/^image\//.test(ty)?await bmThumbOf(file):null;
    const args={b64:await bmB64(file),name:file.name||'file',type:ty};if(th&&th.size<300e3)args.t64=await bmB64(th);
    const j=await gasApi('upload',args);bmKeepLocal(j.id,file,th);return {id:j.id};}};   // a file attached to a shared project moves to the owner company when the entry is saved (server)
}
/* photos & files are PRIVATE: each one comes through the server only for a signed-in member who may see it.
   /_blob/<id> pictures load as private copies (small preview in lists, full size when opened); links open in the app viewer. */
Object.assign(ICONS,{loader:ICONS.loader||'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'});
const BMF={u:{},q:[],run:0,name:{}};
const BMF_PH='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
function bmFileUrl(id,thumb){const k=id+(thumb?'~t':'');if(BMF.u[k])return BMF.u[k];
  const pr=new Promise((ok,no)=>{BMF.q.push({id,thumb,ok,no});bmPump();}).then(r=>r.blob()).then(b=>URL.createObjectURL(b));
  pr.catch(()=>{delete BMF.u[k];});return BMF.u[k]=pr;}
function bmPump(){while(BMF.run<(BMF.q.length&&BMF.q[0].thumb?8:4)&&BMF.q.length){const j=BMF.q.shift();BMF.run++;bmBlob(j.id,j.thumb).then(j.ok,j.no).finally(()=>{BMF.run--;bmPump();});}}
function fixBlobs(root){if(!CLOUD.blob||!root||root.nodeType!==1)return;
  const els=root.matches&&root.matches('img[src^="/_blob/"]')?[root]:[];els.push(...root.querySelectorAll('img[src^="/_blob/"]'));
  els.forEach(el=>{const id=el.getAttribute('src').slice(7);el.setAttribute('src',BMF_PH);el.dataset.bmf=id;el.classList.add('bmf-load');
    const thumb=!!el.closest('.thumbs:not(.big),.bub-ph,.ph-chip,.citem,.dpr-ph');
    bmFileUrl(id,thumb).then(u=>{if(el.dataset.bmf===id){el.src=u;el.classList.remove('bmf-load');}}).catch(()=>{el.classList.remove('bmf-load');el.classList.add('bmf-err');el.title='Could not load this photo';});});}
/* phone photos are made smaller before upload (max 2000 px) — faster to send and to open on site */
/* phone photos are made smaller before upload: max 1600 px, good JPEG quality — sharp for reports and PDFs, quick to send */
const BM_PH={max:1600,q:.8,thumb:480,tq:.7};
const bmBmp=f=>createImageBitmap(f,{imageOrientation:'from-image'}).catch(()=>createImageBitmap(f));   // keep the photo the right way up
async function bmShrink(file){try{const png=/^image\/png$/.test(file.type||'');   // drawings and screenshots (PNG) stay as before: only very big ones are made smaller
  if(!/^image\/(jpeg|png|webp)$/.test(file.type||'')||file.size<(png?1.2e6:450e3))return file;
  const bmp=await bmBmp(file);const k=Math.min(1,(png?2000:BM_PH.max)/Math.max(bmp.width,bmp.height));
  const c=document.createElement('canvas');c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(bmp,0,0,c.width,c.height);try{bmp.close&&bmp.close();}catch(_){}
  const b=await new Promise(ok=>c.toBlob(ok,'image/jpeg',BM_PH.q));if(!b||b.size>=file.size)return file;
  return new File([b],String(file.name||'photo').replace(/\.(png|webp|jpe?g)$/i,'')+'.jpg',{type:'image/jpeg'});}catch(_){return file;}}
/* the small preview shown in lists (about 30–50 KB) */
async function bmThumbOf(blob){try{if(!/^image\/(jpeg|png|webp|gif)$/.test(blob.type||'')||blob.size<120e3)return null;const bmp=await bmBmp(blob);const k=Math.min(1,BM_PH.thumb/Math.max(bmp.width,bmp.height));
  const c=document.createElement('canvas');c.width=Math.max(1,Math.round(bmp.width*k));c.height=Math.max(1,Math.round(bmp.height*k));const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(bmp,0,0,c.width,c.height);try{bmp.close&&bmp.close();}catch(_){}
  return await new Promise(ok=>c.toBlob(ok,'image/jpeg',BM_PH.tq));}catch(_){return null;}}
const bmB64=blob=>new Promise((ok,no)=>{const fr=new FileReader();fr.onload=()=>ok(String(fr.result).split(',')[1]||'');fr.onerror=()=>no(new Error('Could not read the file.'));fr.readAsDataURL(blob);});
/* the photo you just uploaded is kept on this device, so it never has to come back down from the server */
async function bmKeepLocal(id,blob,thumb){try{const c=await caches.open('bm-files');await c.put('/f/'+id,new Response(blob,{headers:{'Content-Type':blob.type||'application/octet-stream'}}));
  if(thumb)await c.put('/f/'+id+'?t',new Response(thumb,{headers:{'Content-Type':'image/jpeg'}}));}catch(_){}}
/* an older photo that has no small preview yet: this device makes one and sends it, so lists load quickly for everyone */
const BMT={q:[],run:false,done:new Set(),n:0};
function bmThumbBackfill(id,blob){let boss=false;try{boss=isAdmin()||curRole()==='Project manager';}catch(_){}if(!boss||!CLOUD.blob||S.demo||BMT.done.has(id)||BMT.n>=40||!/^image\//.test(blob.type||''))return;BMT.done.add(id);BMT.n++;BMT.q.push([id,blob]);if(!BMT.run)bmThumbPump();}
async function bmThumbPump(){BMT.run=true;while(BMT.q.length){const [id,blob]=BMT.q.shift();try{const t=await bmThumbOf(blob);if(t&&t.size<300e3){await gasApi('thumbSet',{id,t64:await bmB64(t)});try{const c=await caches.open('bm-files');await c.put('/f/'+id+'?t',new Response(t,{headers:{'Content-Type':'image/jpeg'}}));}catch(_){}}}catch(e){if(/Unknown request/i.test(e&&e.message||'')){BMT.q.length=0;BMT.n=99;}}
    await new Promise(r=>setTimeout(r,800));}BMT.run=false;}
try{new MutationObserver(ms=>{if(!CLOUD.blob)return;for(const m of ms)for(const n of m.addedNodes)fixBlobs(n);}).observe(document.body,{childList:true,subtree:true});}catch(_){}
/* the PDF report reads photo bytes: ask the server for them (Drive pictures cannot be read directly by the page) */
function saveChip(st){let c=document.getElementById('saveChip');if(!c){c=document.createElement('div');c.id='saveChip';c.setAttribute('role','status');document.body.appendChild(c);}
  c.className=st?'on '+st:'';c.textContent=st==='offline'?'Offline — changes will save when you are back online':st==='saving'?'Saving…':'';}
async function bmBlob(id,thumb){
  if(!CLOUD.blob)return fetch('/_blob/'+id);
  const key='/f/'+id+(thumb?'?t':'');
  let cache=null;try{cache=await caches.open('bm-files');const hit=await cache.match(key)||(thumb?await cache.match('/f/'+id):null);if(hit)return hit;}catch(_){}
  const r=thumb?await bmThumbNet(id):await bmBlobNet(id,thumb);try{if(cache)await cache.put(key,r.clone());}catch(_){}return r;
}
const BMN={q:[],t:0,single:false};
const b64Resp=j=>{const bin=atob(j.b64||'');const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Response(new Blob([u],{type:j.type||'application/octet-stream'}));};
function bmThumbNet(id){if(BMN.single)return bmBlobNet(id,true);return new Promise((ok,no)=>{BMN.q.push({id,ok,no});clearTimeout(BMN.t);BMN.t=setTimeout(bmThumbGo,30);});}
function bmThumbGo(){while(BMN.q.length){const grp=BMN.q.splice(0,8);
  if(grp.length===1||BMN.single){grp.forEach(j=>bmBlobNet(j.id,true).then(j.ok,j.no));continue;}
  gasApi('files',{ids:grp.map(j=>j.id),thumb:1}).then(r=>{const by={};(r.files||[]).forEach(f=>{by[f.id]=f;});
    grp.forEach(j=>{const f=by[j.id];if(f&&!f.error&&f.b64){if(f.name)BMF.name[j.id]=f.name;j.ok(b64Resp(f));}else if(f&&(f.code==='denied'||f.code==='missing'))j.no(new Error(f.error||'Not found'));else bmBlobNet(j.id,true).then(j.ok,j.no);});})
   .catch(e=>{if(/Unknown request/i.test(e.message||''))BMN.single=true;grp.forEach(j=>bmBlobNet(j.id,true).then(j.ok,j.no));});}}
async function bmBlobNet(id,thumb){
  const j=await gasApi('file',thumb?{id,thumb:1}:{id});if(j.name)BMF.name[id]=j.name;const bin=atob(j.b64);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const bl=new Blob([u],{type:j.type||'application/octet-stream'});if(thumb&&!j.thumb)bmThumbBackfill(id,bl);
  return new Response(bl);
}


/* ---- join requests: new people who signed in and wait for the admin to approve them with a role ---- */
function pendingJoins(){const em=new Set(D.team.filter(t=>t.status!=='Removed').map(t=>String(t.email||'').toLowerCase()));return (D.joinreq||[]).filter(r=>r.status==='Pending'&&!em.has(String(r.email||'').toLowerCase())).sort((a,b)=>(b.at||0)-(a.at||0));}
function joinReqBox(){
  if(!isAdmin())return '';const L=pendingJoins();if(!L.length)return '';
  return `<div class="box"><div class="box-h">${ico('user-plus')}<h2>New account requests</h2><span class="pill p-amber">${L.length}</span></div>
    ${L.map(r=>`<div class="srow"><span style="flex:1;min-width:180px"><b data-notr>${esc(r.name||'—')}</b><br><span class="code" data-notr>${esc(r.email)}${r.phone?' · '+esc(r.phone):''}</span><br>${r.role?`<span class="pill p-blue">Asked to join as: ${esc(r.role)}</span><br>`:''}<span class="code">Asked ${fd(new Date(r.at||Date.now()).toISOString().slice(0,10))}</span></span>
      ${r.phone?`<a class="btn sm ghost" href="tel:${esc(String(r.phone).replace(/\s/g,''))}">${ico('phone')}<span>Call</span></a>`:''}
      <button class="btn sm pri" data-jrok="${esc(r.id)}">${ico('check')}<span>Approve & choose role</span></button><button class="btn sm warn" data-jrno="${esc(r.id)}">${ico('x')}<span>Reject</span></button></div>`).join('')}
    <div class="srow"><span class="code">These people created an account from your invite link. Tap <b>Approve & choose role</b>, pick their role and projects and save — they can then sign in with their own password. Reject if you don't know them. Change anyone's role or projects later on this Team page.</span></div></div>`;
}
async function joinReqAct(id,ok){
  const r=(D.joinreq||[]).find(x=>x.id===id);if(!r)return;
  if(ok){openForm('team',null,{name:r.name||'',phone:r.phone||'',email:r.email,role:JOIN_ROLES.includes(r.role)?r.role:'',access:'Add & edit entries',projects:[],status:'Invited'});return;}
  try{await db.doc('joinreq/'+id).update({status:'Rejected',by:ME.id,decidedAt:Date.now()});toast('Request rejected');}catch(e){toast('Could not save: '+(e.message||e));}
}

/* ================= Admin panel: all admin controls in one place ================= */
const ALL_ROLES=()=>MOD.team.fields.find(f=>f.k==='role').o;
/* → admin: vAdminPanel */
/* → admin: adminSetRole */

/* settings: what each person sees — admin gets company controls; everyone else only their own things */
function myProfileBox(admin){
  const t=myTeamRec();const role=curRole();
  const pj=t?((t.projects||[]).includes('all')?'All projects':(t.projects||[]).map(id=>(D.projects.find(p=>p.id===id)||{}).name||'—').join(', ')||'No project yet'):'—';
  return `<div class="box"><div class="box-h">${ico('user')}<h2>My profile</h2>${admin?'':`<span class="code">Only the admin can change your role and projects</span>`}</div>
    <div class="srow"><span style="flex:1;min-width:200px"><b data-notr>${esc((t&&t.name)||ME.name||'')}</b><br><span class="code" data-notr>${esc(ME.email||'')}${t&&t.phone?' · '+esc(t.phone):''}</span></span>
    <span class="pill p-blue">${esc(role)}</span></div>
    <div class="srow"><span class="code" style="white-space:normal">Projects: <span data-notr>${esc(pj)}</span>${t&&t.access?' · Access: '+esc(t.access):''}</span></div></div>`;
}
const HOME_VIEWS=['dashboard','sitehome','desk','client','mktdash','noaccess'];
function signOutBar(){
  if(!S.cloud||!S.ready||S.viewAs)return '';
  const many=(CLOUD.mems||[]).length>1;
  return `<div class="box signout-bar"><div class="srow"><span style="flex:1;min-width:180px" class="code">Signed in as <b data-notr>${esc(ME.email||'')}</b> · ${esc(curRole())}${CLOUD.mem?` · <b data-notr>${esc(CLOUD.mem.org_name||'')}</b>`:''}</span>
    ${many&&!isSuperAdmin()?`<button class="btn" id="orgPick">${ico('building-2')}<span>Switch organisation</span></button>`:''}
    ${isStandalone()?'':`<button class="btn" data-go="install">${ico('download')}<span>Install app</span></button>`}<button class="btn" data-go="settings">${ico('settings')}<span>Settings</span></button><button class="btn warn" id="signOut">${ico('log-in')}<span>Log out</span></button></div></div>`;
}
/* ================= Site cameras ================= */
const BRANDS={
  'CP Plus':{app:'gCMOB (Android) / iCMOB (iPhone)',share:'In the CP Plus app open the device → Share (or add the person as a user on the NVR) and give "Live view" only.',stream:'Ask your CP Plus installer for the NVR RTSP address; a streaming service (e.g. go2rtc/MediaMTX) turns it into a web .m3u8 link.'},
  'EZVIZ':{app:'EZVIZ',share:'In the EZVIZ app open the camera → Settings → Share device → enter their EZVIZ account; allow Live view only.',stream:'EZVIZ Open Platform gives an HLS (.m3u8) live link for your device that plays inside BuildMitr web.'},
  'Hikvision':{app:'Hik-Connect',share:'In Hik-Connect open the device → Share → enter their account and tick Live view only.',stream:'Hik-Connect for Teams / HikCentral, or RTSP through a streaming service, gives a web link.'},
  'Dahua':{app:'DMSS',share:'In DMSS open the device → Share → add their account with Live view permission.',stream:'RTSP from the NVR through a streaming service gives a web link.'},
  'Imou':{app:'Imou Life',share:'In Imou Life open the device → Share → enter their account.',stream:'Imou Open Platform offers live links for your devices.'},
  'TP-Link Tapo':{app:'Tapo',share:'In the Tapo app open the camera → Settings → Camera sharing.',stream:'Enable the camera account (RTSP) in Tapo and use a streaming service for a web link.'},
  'Qubo':{app:'Qubo',share:'In the Qubo app use device sharing to add family/team members.',stream:'Viewing stays in the Qubo app.'},
  'Godrej':{app:'Godrej Smart Care / brand app',share:'Use the brand app’s sharing option.',stream:'Ask the installer for an RTSP or cloud link.'},
  'Other':{app:'the camera’s own app',share:'Use the app’s Share device option, live view only.',stream:'Ask the installer for an RTSP or cloud web link.'},
};
const playSearch=b=>`https://play.google.com/store/search?q=${encodeURIComponent((BRANDS[b]||BRANDS.Other).app.split(' ')[0])}&c=apps`;
function myTeamRec(){return D.team.find(t=>t.account&&t.account===ME.id);}
function camAllowed(c){
  if(isAdmin()||(S.web&&!S.demo))return true;
  const t=myTeamRec();if(!t)return S.demo;
  const onProj=(t.projects||[]).includes('all')||(t.projects||[]).includes(c.project);if(!onProj)return false;
  if(t.role==='Client')return c.clientView==='Yes';
  if(c.teamView==='Admin & project managers only')return ['Admin','Project manager'].includes(t.role);
  return true;
}
let HLSP=null;
/* → cameras: loadHls */
/* → cameras: vCctv */

/* ================= Schedule import (Excel, CSV, MS Project XML, Primavera XER, paste) ================= */
const IMP={rows:[],cols:[],map:{},source:''};
const IMP_FIELDS=[['bmid','BuildMitr ID (matches rows)'],['title','Activity / task name'],['wbs','WBS / ID'],['start','Start'],['due','Finish / due'],['progress','% complete'],['resource','Resource / assigned to'],['pred','Predecessors'],['duration','Duration'],['status','Status'],['notes','Notes'],['summary','Summary row (skip)']];
const GUESS={bmid:/^(buildmitr|bm) ?id/i,status:/^status/i,notes:/^(notes?|remarks?|comments?)$/i,title:/^(task|activity|name|task name|activity name|description|work|item)/i,wbs:/^(wbs|outline|id|activity id|task code|s\.?\s?no|sl\.?\s?no|code)/i,start:/start|begin|from/i,due:/finish|end|due|complete by|to date|^to$/i,progress:/%|percent|progress|complete/i,resource:/resource|assign|owner|responsib|gang|by/i,pred:/pred|depend/i,duration:/dur|days/i,summary:/summary/i};
function loadSheetJS(){if(window.XLSX)return Promise.resolve();return new Promise((ok,bad)=>{const j=document.createElement('script');j.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';j.onload=ok;j.onerror=bad;document.head.appendChild(j);});}
function isoDate(v){
  if(v==null||v==='')return '';
  if(v instanceof Date&&!isNaN(v)){const day=Math.round((v.getTime()-v.getTimezoneOffset()*6e4)/864e5);return new Date(day*864e5).toISOString().slice(0,10);}
  if(typeof v==='number'&&v>20000&&v<80000){const d=new Date(Math.round((v-25569)*864e5));return d.toISOString().slice(0,10);}
  let t=String(v).trim().replace(/^(mon|tue|wed|thu|fri|sat|sun)[a-z]*[ ,]*/i,'').replace(/[T ].*$/,m=>/^T/.test(m)?'':m);
  let m=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);if(m)return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
  m=t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);if(m){let y=+m[3];if(y<100)y+=2000;return `${y}-${String(m[2]).padStart(2,'0')}-${String(m[1]).padStart(2,'0')}`;}
  const d=new Date(String(v));return isNaN(d)?'':isoDate(d);
}
/* → planning: setRows */
/* → planning: parseXml */
/* → planning: parseXer */
/* → planning: readImportFile */
/* → planning: parsePaste */
/* → planning: impBuild */
/* → planning: impRender */
/* → planning: openImport */
/* → planning: impMatch */
document.addEventListener('change',e=>{if(e.target.id==='imp-del')IMP.del=e.target.checked;});
/* → planning: runImport */
/* download the schedule as Excel — edit it and upload it back (rows are matched by the BuildMitr ID column) */
/* → planning: schedExport */
/* → planning: schSave */
const schWbsKey=w=>String(w||'~').split(/[.\-]/).map(x=>String(x).padStart(5,'0')).join('.');

/* ================= AI assistant ================= */
const AI={sample:null,turns:[],busy:false,ctl:null};
const AI_COLS=['projects','team','clients','vendors','leads',...Object.keys(MOD).filter(k=>!['team','clients','vendors','leads'].includes(k))];
function colFields(c){return c==='projects'?[{k:'prefix',l:'Project code',t:'text'},{k:'name',l:'Project name',t:'text',req:1},{k:'description',l:'Description',t:'textarea'},{k:'start',l:'Start date',t:'date'},{k:'end',l:'End date',t:'date'},{k:'client',l:'Client',t:'client'},{k:'address',l:'Site address',t:'textarea'}]:(MOD[c]||{}).fields||[];}
function readable(c,r){const o={id:r.id};colFields(c).forEach(f=>{const v=r[f.k];if(v===undefined||v===''||v===null)return;
  o[f.k]=f.t==='project'?pname(v):f.t==='client'?cname(v):f.t==='vendor'?vname(v):f.t==='labour'?lname(v):f.t==='equipment'?ename(v):f.t==='member'?pnm(v):f.t==='projects'?((v||[]).includes('all')?'All projects':(v||[]).map(pname)):f.t==='photos'?`${v.length} photo(s)`:f.t==='files'?v.map(x=>x.name):f.t==='location'?(v?`${v.lat},${v.lng}`:''):(typeof v==='string'&&v.length>200?v.slice(0,200)+'…':v);});
  if(c==='projects'&&r.loc)o.map=gmaps(r.loc);if(MOD[c]&&MOD[c].extra)MOD[c].extra.forEach(x=>o[x.l]=String(x.f(r)).replace(/<[^>]+>/g,''));return o;}
function findByName(list,val,what,key='name'){
  const v=String(val||'').trim().toLowerCase();if(!v)return '';
  const ex=list.find(x=>String(x.id)===val||String(x[key]||'').toLowerCase()===v||(x.prefix&&x.prefix.toLowerCase()===v));if(ex)return ex.id;
  const part=list.filter(x=>String(x[key]||'').toLowerCase().includes(v)||(x.prefix||'').toLowerCase().includes(v));
  if(part.length===1)return part[0].id;
  throw new Error(`${part.length?'More than one':'No'} ${what} matches "${val}". Options: ${list.slice(0,15).map(x=>x[key]).join('; ')||'none yet'}`);}
function toRef(f,v){
  if(f.t==='project')return findByName(PJ(),v,'project');
  if(f.t==='client')return findByName(D.clients,v,'client');
  if(f.t==='vendor')return findByName(D.vendors,v,'vendor');
  if(f.t==='labour')return findByName(D.labour,v,'worker');
  if(f.t==='equipment')return findByName(D.equipment,v,'equipment');
  if(f.t==='member'){const m=D.members.find(x=>nm(x.id).toLowerCase().includes(String(v).toLowerCase()));if(!m)throw new Error(`No app user named "${v}". People in the app: ${D.members.map(x=>nm(x.id)).join(', ')}`);return m.id;}
  if(f.t==='projects'){const a=Array.isArray(v)?v:String(v).split(/[,;]/);return a.map(x=>/^all/i.test(String(x).trim())?'all':findByName(PJ(),x,'project'));}
  if(f.t==='number'||f.t==='money'){const n=Number(String(v).replace(/[₹,\s]/g,''));if(isNaN(n))throw new Error(`${f.l} must be a number`);return n;}
  if(f.t==='date'){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(v)))throw new Error(`${f.l} must be a date as YYYY-MM-DD`);return String(v);}
  if(f.t==='select'){const o=f.o.find(x=>x.toLowerCase()===String(v).toLowerCase())||f.o.find(x=>x.toLowerCase().includes(String(v).toLowerCase()));if(!o)throw new Error(`${f.l} must be one of: ${f.o.join(', ')}`);return o;}
  if(f.t==='location'){const l=parseLoc(v);if(!l)throw new Error('Location must be a map link or "lat, lng"');return l;}
  if(f.t==='photos'||f.t==='files')throw new Error('Photos and files must be uploaded in the form, not through chat');
  if(f.t==='workrows'){if(Array.isArray(v))return v.filter(x=>x&&(typeof x.work==='string'||typeof x.work==='number')&&String(x.work).trim()).slice(0,40).map(x=>({trade:DPR_WTYPES.find(t=>t.toLowerCase()===String(x.trade||'').toLowerCase())||'Other',work:String(x.work).slice(0,4000)}));throw new Error(`${f.l} must be a list like [{"trade":"Civil","work":"GF slab shuttering"},{"trade":"Electrical","work":"Conduits"}]`);}
  if(f.t==='crew'){if(v&&typeof v==='object'&&!Array.isArray(v))return Object.fromEntries(Object.entries(v).filter(([,x])=>+x>0).slice(0,20).map(([t,x])=>[String(t).slice(0,40),Math.round(+x*2)/2]));throw new Error(`${f.l} must be like {"Mason":4,"Helper / coolie":6}`);}
  if(f.t==='matrows'){if(Array.isArray(v))return v.filter(x=>x&&x.item).slice(0,60).map(x=>({item:String(x.item).slice(0,120),qty:x.qty===''||x.qty==null||isNaN(+x.qty)?'':+x.qty,unit:String(x.unit||'').slice(0,20),kind:/use/i.test(x.kind||'')?'Used':'Received'}));throw new Error(`${f.l} must be a list like [{"item":"Cement","qty":20,"unit":"Bags","kind":"Received"}]`);}
  return String(v);}
const AI_TOOLS=[
  {name:'find_records',description:'Search one collection and return matching records with names resolved (max 40). Use for any question about data: who is the client, team members, phone numbers, tasks, payments, stock etc. Returns {total, records}.',
   inputSchema:{type:'object',properties:{collection:{type:'string',enum:AI_COLS},project:{type:'string',description:'Optional project name or code to filter'},text:{type:'string',description:'Optional words to match in any field'},limit:{type:'number'}},required:['collection']},
   execute:i=>{const c=String(i.collection);if(!D[c])throw new Error('Unknown collection '+c);if(c!=='projects'&&!canView(c))throw new Error('Your role does not have access to '+c);let rows=c==='projects'?PJ():D[c].filter(r=>!r.project||projOK(r.project));if(c==='cameras')rows=rows.filter(camAllowed);
     if(i.project){const pid=findByName(PJ(),i.project,'project');rows=rows.filter(r=>c==='projects'?r.id===pid:(r.project===pid||(r.projects||[]).includes(pid)||(r.projects||[]).includes('all')));}
     let out=rows.map(r=>readable(c,r));
     if(i.text){const q=String(i.text).toLowerCase();out=out.filter(o=>JSON.stringify(o).toLowerCase().includes(q));}
     return {total:out.length,records:out.slice(0,Math.min(40,+i.limit||40))};}},
  {name:'get_summary',description:'Key numbers per project: progress, late tasks, open issues, money received/paid, invoice dues, BOQ value, workers today, stock alerts, pending requests, lead follow-ups. Use for overview or status questions.',
   inputSchema:{type:'object',properties:{project:{type:'string'}}},
   execute:i=>{const ps=i.project?[proj(findByName(PJ(),i.project,'project'))]:PJ();const t=today();
     return {today:t,openLeads:D.leads.filter(l=>!['Won','Lost'].includes(l.stage)).length,followUpsDue:D.leads.filter(l=>l.follow&&l.follow<=t&&!['Won','Lost'].includes(l.stage)).map(l=>l.name),
       projects:ps.map(p=>{const by=c=>D[c].filter(x=>x.project===p.id);const pay=by('payments');const ts=by('tasks');
         return {project:pname(p.id),client:cname(p.client),address:p.address||'',map:p.loc?gmaps(p.loc):'',start:p.start,end:p.end,
           tasksOpen:ts.filter(x=>x.status!=='Completed').length,tasksLate:ts.filter(x=>x.status!=='Completed'&&x.due&&x.due<t).map(x=>x.title),
           avgProgress:ts.length?Math.round(ts.reduce((s,x)=>s+(x.status==='Completed'?100:+x.progress||0),0)/ts.length):0,
           openIssues:by('issues').filter(x=>x.status!=='Resolved').map(x=>x.title),
           ...(canMoney()?{received:pay.filter(x=>x.dir==='Received from client').reduce((s,x)=>s+(+x.amount||0),0)}:{}),paidOut:pay.filter(x=>x.dir!=='Received from client').reduce((s,x)=>s+(+x.amount||0),0),
           ...(canMoney()?{}:{_note:'money hidden for this role'}),invoiceDue:canMoney()&&by('invoices').filter(x=>(x.kind==='Tax invoice'||x.kind==='RA bill')&&x.status!=='Paid').reduce((s,x)=>s+invTotal(x)-(+x.got||0),0),
           boqValue:by('boq').reduce((s,x)=>s+(+x.qty||0)*(+x.rate||0),0),workersToday:by('attendance').filter(a=>a.date===t&&a.status!=='Absent').length+by('vlabour').filter(v=>v.date===t).reduce((s,v)=>s+(+v.count||0),0),
           lowStock:stock().filter(s=>s.project===p.id&&s.store<=0&&s.received>0).map(s=>s.material),pendingRequests:by('requests').filter(r=>r.status==='Pending').map(r=>`${r.material} ${r.qty} ${r.unit||''}`)};})};}},
  {name:'list_fields',description:'Return the fields of a collection (key, label, type, required, allowed options). Call before create_record if unsure which fields exist.',
   inputSchema:{type:'object',properties:{collection:{type:'string',enum:AI_COLS}},required:['collection']},
   execute:i=>colFields(String(i.collection)).map(f=>({key:f.k,label:f.l,type:f.t,required:!!f.req,options:f.o}))},
  {name:'create_record',description:'Create ONE new record when the user explicitly asks to add/create something (project, client, task, payment, lead, team member, DPR...). Give fields by key; for links use names (client name, project name/code, vendor name, worker name). Dates YYYY-MM-DD. Returns the saved record, or an error listing what is missing — then ask the user.',
   inputSchema:{type:'object',properties:{collection:{type:'string',enum:AI_COLS},fields:{type:'object',description:'field key → value'}},required:['collection','fields']},
   execute:async(i,ctx)=>{const c=String(i.collection);const fs=colFields(c);if(!fs.length)throw new Error('Unknown collection '+c);if(c!=='projects'&&!canView(c))throw new Error('Your role cannot add to '+c);if(c==='tasks'&&String((i.fields||{}).status||'').toLowerCase()==='completed')throw new Error('Mark tasks Completed from the form so the checklist gate is checked.');
     if(c==='team'&&!isAdmin())throw new Error('Only the admin or an editor can add team members.');
     if(S.demo)throw new Error('The app is in demo mode; exit the demo to create real records.');
     if(!CANW)throw new Error('This user has view-only access.');
     const inF=i.fields||{};const body={};const missing=[];
     for(const f of fs){let v=inF[f.k]??inF[f.l];
       if((v===undefined||v==='')&&f.def==='today')v=today();
       if((v===undefined||v==='')&&f.k==='project'&&S.proj!=='all')v=S.proj;
       if(v===undefined||v===''){if(f.req)missing.push(f.l);continue;}
       body[f.k]=f.t==='project'&&v===S.proj?v:toRef(f,v);}
     if(c==='projects'&&!body.client&&inF.client)body.client=toRef({t:'client'},inF.client);
     if(missing.length)throw new Error('Missing required: '+missing.join(', '));
     if(c==='dpr'&&!dprWork(body).trim())throw new Error('A daily report needs the work done today: items as [{trade,work}] (trade one of the work types) or work.');
     if(ctx.signal.aborted)throw new Error('Stopped');
     let id=null;const ok=await write(async()=>{const r=await db.collection(c).add({...body,by:ME.id,at:Date.now(),...(c==='projects'?{created:Date.now()}:{})});id=r.id;});
     if(!ok)throw new Error('Saving failed (no permission or connection).');
     audit('created',c,id,'via AI: '+recLabel(c,body));aiCard(`${ico('check')} Created in <b>${esc(c==='projects'?'Projects':MOD[c].label)}</b>: ${esc(body.name||body.title||body.material||body.no||'entry')}`,`<button class="btn sm" data-aiundo="${c}:${id}">Undo</button><button class="btn sm" data-go="${c==='projects'?'projects':c}">Open</button>`);
     return {saved:true,id,collection:c,record:readable(c,{id,...body})};}},
  {name:'export_data',description:'Prepare a CSV (Excel) export of a collection, or of computed reports inventory/wages/balances, optionally for one project. Shows a Download button to the user; tell them to tap it.',
   inputSchema:{type:'object',properties:{what:{type:'string',enum:[...AI_COLS.filter(c=>c!=='projects'),'inventory','wages','balances']},project:{type:'string'},month:{type:'string',description:'YYYY-MM for wages'}},required:['what']},
   execute:i=>{const w=String(i.what);const pid=i.project?findByName(PJ(),i.project,'project'):'all';if(i.month)S.month=String(i.month);
     aiCard(`${ico('download')} Export ready: <b>${esc(w)}</b>${pid!=='all'?' · '+esc(pname(pid)):''}`,`<button class="btn sm pri" data-aiexport="${esc(w)}|${pid}">Download CSV</button>`);return 'Download button shown to the user.';}},
  {name:'open_screen',description:'Open a screen of the app for the user (e.g. dashboard, schedule, wages, balances, invoices, team), optionally switching to one project.',
   inputSchema:{type:'object',properties:{screen:{type:'string',enum:['dashboard','projects','inventory','reports','settings','wages','balances','budgetva','schedule',...Object.keys(MOD)]},project:{type:'string'}},required:['screen']},
   execute:i=>{if(i.project)S.proj=findByName(PJ(),i.project,'project');S.view=String(i.screen);render();return 'Opened '+S.view;}},
];
/* → ai: aiPrompt */
function aiRender(){
  const box=document.getElementById('aiMsgs');if(!box)return;
  if(!AI.turns.length&&!box.children.length)box.innerHTML=`<div class="ai-m a">Hi${ME.name?' '+esc(ME.name.split(' ')[0]):''}! Ask me anything about your projects, clients, team, material, labour or money. ${AI.gemini?'I can also fill forms for you to review and save, and prepare Excel exports.':'I can also create entries and prepare Excel exports.'}</div>`;
  const sg=document.getElementById('aiSugg');
  sg.innerHTML=AI.turns.length?'':['Status of all projects','Which tasks are late?','Who are the team members and their phones?','Client dues and vendor balances','Export this month\'s wages','Create a task: GF slab casting next Monday'].map(q=>`<button type="button" data-aiq="${esc(q)}">${esc(q)}</button>`).join('');
}
/* → ai: aiMsg */
function aiCard(html,acts){const box=document.getElementById('aiMsgs');const d=document.createElement('div');d.className='ai-card';d.innerHTML=html+(acts||'');box.appendChild(d);box.scrollTop=box.scrollHeight;}
const AI_ERR={not_granted:'Using AI was not allowed for this app. You can allow it from the app\'s permissions next time.',sampling_disabled:'AI is not available for this account.',rate_limited:'Too many requests right now. Please try again in a minute.',session_expired:'Please sign in to Claude again.',tools_unavailable:'This Claude app version cannot run the assistant\'s tools. Update the app and try again.',refused:'I can\'t help with that request.',prompt_too_large:'Too much data at once. Ask about one project.',upstream_error:'Connection problem. Please try again.'};
/* → ai: aiAsk */
function aiOpen(v){document.getElementById('aiPanel').hidden=!v;document.getElementById('aiFab').hidden=v;if(v){aiRender();setTimeout(()=>document.getElementById('aiText').focus(),50);}}

/* ================= AI assistant on the website / Android app (Google Gemini via the BuildMitr server) =================
   The Gemini key stays on the Google server. The data tools below read only the records the server
   already sent to this person (filtered by their role and projects), so the AI cannot see anything
   the person could not open themselves. Nothing is saved without the person tapping Save in the form. */
AI.gemini=false;AI.g=[];AI.lastQ='';AI.usage=null;
/* run one tool the model asked for, on this person's own data */
/* → ai: aiTool */
/* form auto-fill: check the values, then show them for review — the person edits and saves in the normal form */
/* → ai: aiPrepareForm */
/* open one record (or the person's own profile) — only from data this person can see */
/* → ai: aiOpenRecord */
/* keep the last part of the conversation, always starting with a question */
/* → ai: aiTrim */
/* → ai: aiAskGemini */
/* show an answer: copy button, long answers fold open */
/* show Gemini's simple markdown (bold, code, bullets, headings) safely: text is escaped first */
/* → ai: aiMd */
/* → ai: aiFill */
/* → ai: aiUsageLine */
/* → ai: aiClear */

/* ---- admin panel: AI assistant settings and usage ---- */
async function aiAdminLoad(set){
  const box=document.getElementById('aiAdminBox');if(!box)return;
  let j;try{j=await gasApi('aiAdmin',set?{set}:{});}catch(e){box.innerHTML=`<div class="srow"><span class="code">${esc(e.message)}</span></div>`;return;}
  const c=j.cfg;const usd=j.costUSD||0;
  box.innerHTML=`<div class="srow"><span style="flex:1;min-width:200px">${j.hasKey?`<span class="pill p-green">Gemini key added</span>`:`<span class="pill p-red">Gemini key missing</span> <span class="code">Add GEMINI_API_KEY in the server's Script Properties</span>`} ${c.enabled?'':'<span class="pill p-grey">Switched off</span>'}</span><span class="code" data-notr>${esc(c.model)}</span></div>
    <div class="tiles"><div class="tile"><b>${j.today}</b><span>Questions today</span></div><div class="tile"><b>${j.questions}</b><span>Questions this month</span></div><div class="tile"><b>${((j.inTokens+j.outTokens)/1000).toFixed(1)}k</b><span>Tokens this month</span></div><div class="tile"><b>$${usd.toFixed(2)}</b><span>Estimated cost this month (≈ ₹${Math.round(usd*88)})</span></div></div>
    ${j.canSet===false?`<div class="srow"><span class="code">Daily limits and the AI model are set by the BuildMitr admin. Usage below is for your organisation only.</span></div>`:`<form id="aiCfgForm" class="srow" style="align-items:flex-end">
      <label class="code">Questions per person per day<input id="ai-lim" type="number" min="0" max="2000" value="${c.dailyLimit}" style="width:110px"></label>
      <label class="code">Longest question (characters)<input id="ai-in" type="number" min="50" max="4000" value="${c.maxInputChars}" style="width:110px"></label>
      <label class="code">Longest answer (tokens)<input id="ai-out" type="number" min="100" max="4000" value="${c.maxOutputTokens}" style="width:110px"></label>
      <label class="code">Model<input id="ai-model" value="${esc(c.model)}" style="width:190px"></label>
      <label class="code" style="display:flex;gap:6px;align-items:center"><input id="ai-on" type="checkbox" ${c.enabled?'checked':''} style="width:auto">AI switched on</label>
      <button class="btn pri">${ico('check')}<span>Save</span></button></form>`}
    ${j.people.length?`<div class="tbl-wrap"><table><thead><tr><th>Person</th><th>Role</th><th class="num">Today</th><th class="num">This month</th><th class="num">Tokens</th></tr></thead><tbody>${j.people.map(p=>`<tr><td data-notr>${esc(p.email)}</td><td>${esc(p.role)}</td><td class="num">${p.today}</td><td class="num">${p.month}</td><td class="num">${((p.inTokens+p.outTokens)/1000).toFixed(1)}k</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No AI questions this month yet.</div>'}
    <div class="srow"><span class="code" style="white-space:normal">Cost uses the paid prices set on the server ($${c.priceInPerM} per million input tokens, $${c.priceOutPerM} per million output tokens). On Google's free tier it costs nothing but has lower limits.</span></div>`;
}

/* ================= Organisations, sharing & fast start ================= */
Object.assign(ICONS,{
  'building':'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  'share-2':'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
  'mail':'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'message-square':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'copy':'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'printer':'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>'
});

/* ---- small storage helpers for the start-up cache (data of the last visit, kept only on this device) ---- */
function bmGet(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(_){return null;}}
function bmSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(_){try{localStorage.removeItem(k);}catch(__){}return false;}}
function bmClearCache(){try{Object.keys(localStorage).filter(k=>k.indexOf('bm-c-')===0).forEach(k=>localStorage.removeItem(k));}catch(_){}}
const isSuperAdmin=()=>!!(CLOUD.mem&&CLOUD.mem.super);

/* ---- share sheet: one place for WhatsApp, Telegram, email, SMS, phone share, copy, PDF and text file ---- */
let SHARE=null;
/* → admin: adminPhone */
/* → admin: shareSheet */
/* → admin: shareTo */

/* ---- daily update for the admin: today's work, people, money and urgent items per project ---- */
function dailyUpdateText(){
  const t=today(),L=x=>D[x]||[],ps=PJ().filter(p=>projOK(p.id)&&(S.proj==='all'||p.id===S.proj));
  const out=[`*${orgName()} — site update ${fd(t)}*`],quiet=[];
  ps.forEach(p=>{
    const on=r=>r.project===p.id&&r.date===t;
    const dp=L('dpr').filter(on);
    const ppl=L('attendance').filter(r=>on(r)&&r.status!=='Absent').length+L('vlabour').filter(on).reduce((a,r)=>a+n(r.count),0);
    const got=L('payments').filter(r=>on(r)&&r.dir==='Received from client').reduce((a,r)=>a+n(r.amount),0);
    const paid=L('payments').filter(r=>on(r)&&r.dir!=='Received from client').reduce((a,r)=>a+n(r.amount),0);
    const mat=L('received').filter(on);
    const iss=L('issues').filter(r=>r.project===p.id&&r.status!=='Resolved');
    const late=L('tasks').filter(x=>x.project===p.id&&x.status!=='Completed'&&x.due&&x.due<t).length;
    if(!dp.length&&!ppl&&!got&&!paid&&!mat.length&&!iss.length&&!late){quiet.push(pname(p.id));return;}
    out.push('',`🏗️ *${pname(p.id)}*`);
    dp.length?dp.forEach(r=>{out.push(`• Work: ${dprWork(r).replace(/\s+/g,' ').slice(0,280)}`);if(crewTot(r.crew))out.push(`• Labour: ${num(crewTot(r.crew))} (${crewTxt(r.crew)})`);if(r.hindrance)out.push(`• Hindrance: ${String(r.hindrance).replace(/\s+/g,' ').slice(0,160)}`);}):out.push('• No daily report yet today');
    if(ppl)out.push(`• Workers on site: ${ppl}`);
    if(mat.length)out.push(`• Material received: ${mat.slice(0,5).map(r=>`${r.material} ${num(r.qty)} ${r.unit||''}`.trim()).join(', ')}${mat.length>5?' …':''}`);
    if(got)out.push(`• Received from client: ${inr(got)}`);
    if(paid)out.push(`• Paid / spent: ${inr(paid)}`);
    if(iss.length)out.push(`• Open issues: ${iss.length}${iss.some(x=>x.severity==='High')?' (high priority included)':''}`);
    if(late)out.push(`• Late tasks: ${late}`);
  });
  if(quiet.length)out.push('',`No activity today: ${quiet.join(', ')}`);
  const urgent=computeAlerts().filter(a=>a.sev==='high'&&(S.proj==='all'||!a.pid||a.pid===S.proj)).slice(0,8);
  if(urgent.length)out.push('','*Needs attention*',...urgent.map(a=>'🔴 '+a.txt));
  out.push('','— BuildMitr');
  return out.join('\n');
}

/* ---- BuildMitr admin: organisations ---- */
/* → admin: orgsBox */
let ORGS=[],ORGS_AT=0;
/* → admin: orgsLoad */
/* → admin: orgsDraw */
/* → admin: orgCreate */
/* → admin: orgSave */
/* → admin: orgOpen */

/* sign-up form: list of organisations a new person can ask to join */
async function lgLoadOrgs(){
  if(LG.orgList||LG.orgListBusy)return;LG.orgListBusy=true;
  try{const j=await gasApi('orgList');LG.orgList=j.orgs||[];}catch(_){LG.orgList=[];}
  LG.orgListBusy=false;
  if(S.authStep==='email'&&(LG.orgList.length>1||LG.fixedOrg)){   // keep what was already typed, then show the organisation list
    const v=id=>{const x=document.getElementById(id);return x?x.value:null;};
    [['lgEmail','email'],['lgName','name'],['lgPhone','phone'],['lgRole','role']].forEach(([id,k])=>{const x=v(id);if(x!==null)LG[k]=k==='email'?x.trim():x;});
    const f=document.activeElement&&document.activeElement.id;render();if(f){const x=document.getElementById(f);x&&x.focus&&x.focus();}}
}

document.addEventListener('click',e=>{
  if(!e.target.closest)return;
  {const b=e.target.closest('[data-shareto]');if(b){shareTo(b.dataset.shareto);return;}}
  {const b=e.target.closest('[data-shareupd]');if(b){shareSheet(`${orgName()} — site update ${fd(today())}`,dailyUpdateText());return;}}
  {const b=e.target.closest('[data-sharesum]');if(b){shareSheet(b.dataset.sharettl||`${orgName()} — daily summary`,b.dataset.sharesum);return;}}
  {const b=e.target.closest('[data-shrec]');if(b){const[k,id]=b.dataset.shrec.split(':');const r=(D[k]||[]).find(x=>x.id===id);if(r)shareSheet(((MOD[k]||{}).label||'Entry'),waText(k,r));return;}}
  {const b=e.target.closest('[data-aishare]');if(b){const t=b.closest('.ai-m').querySelector('.ai-body').textContent;shareSheet('BuildMitr AI answer',t);return;}}
  {const b=e.target.closest('[data-orgopen]');if(b){orgOpen(b.dataset.orgopen);return;}}
  {const b=e.target.closest('[data-orgedit]');if(b){const f=document.querySelector(`[data-orgform="${CSS.escape(b.dataset.orgedit)}"]`);if(f)f.hidden=!f.hidden;return;}}
  {const b=e.target.closest('[data-orgswitch]');if(b){S.view='orgs';render();scrollTo(0,0);return;}}
},true);
document.addEventListener('submit',e=>{
  if(e.target.id==='orgNewForm'){e.preventDefault();orgCreate(e.target);return;}
  if(e.target.dataset&&e.target.dataset.orgform){e.preventDefault();orgSave(e.target);return;}
},true);

/* ================= Detailed estimate template — Abstract + BOQ (format of the office's Chandradar / Prasad Reddy estimates) =================
 * Quantities come from the slab area of each floor and the counts of rooms, toilets, kitchens, balconies and lifts,
 * using ratios taken from those two real estimates. Starting rates are the rates used in those sheets (Oct 2026),
 * adjusted for Standard / Premium / Luxury. Every quantity and rate can be changed on the estimate; the admin can
 * change the organisation's rate card. */
const E2_TIERS=['Standard','Premium','Luxury'];
const E2_SECS=[['I','SHELL & CORE'],['II','FINISHES'],['III','MEP'],['IV','MACHINERY & SCAFFOLDING'],['V','IDC — SITE & DESIGN COSTS'],['VI','EXTERNAL WORKS & EXTRAS'],['VII','INTERIORS']];
/* element: [section, head, key, description, unit, quantity(v), rates [Standard, Premium, Luxury], note]
 * v = {B built-up incl. headroom, S sum of floor slabs, GF ground-floor slab, TOP top slab (terrace), F floors, R rooms, T toilets, K kitchens, BL balconies, L lifts, M months} */
const SQM=0.0929;
const E2_EL=[
 ['I','Earthwork','ew_exc','Excavation for footings by machine, up to 2 m depth','Cum',v=>v.GF*0.10,[250,250,250]],
 ['I','Earthwork','ew_fill','Back-filling with excavated earth, watered & compacted','Cum',v=>v.GF*0.06,[450,450,450]],
 ['I','Earthwork','ew_at','Anti-termite treatment','Sqm',v=>v.GF*SQM*1.1,[75,75,75]],
 ['I','Concrete works','c_pcc','PCC (M10) below footings & floors','Cum',v=>v.GF*0.0045,[3811,3811,3811]],
 ['I','Concrete works','c_ftg','RCC footings & pedestals','Cum',v=>v.GF*0.012,[5300,5610,6200]],
 ['I','Concrete works','c_plb','RCC plinth beams','Cum',v=>v.GF*0.0035,[5300,5610,6200]],
 ['I','Concrete works','c_col','RCC columns — all floors','Cum',v=>v.B*0.0034,[5300,5610,6200]],
 ['I','Concrete works','c_bm','RCC roof beams — all floors','Cum',v=>v.B*0.0055,[5300,5610,6200]],
 ['I','Concrete works','c_slab','RCC roof slabs — all floors','Cum',v=>v.B*0.0105,[5300,5610,6200]],
 ['I','Concrete works','c_stair','RCC staircase, lintels & sunshades','Cum',v=>v.F*1.6+v.B*0.0006,[5300,5610,6200]],
 ['I','Formwork','f_all','Formwork & shuttering — columns, beams, slabs','Sqm',v=>v.B*0.17,[0,0,0],'Included in structure labour (as in your sheets)'],
 ['I','Reinforcement','st_ftg','TMT steel — footings & plinth beams','MT',v=>v.GF*0.0014,[70000,72000,75000]],
 ['I','Reinforcement','st_frm','TMT steel — columns, beams, slabs, staircase','MT',v=>v.B*0.0026,[70000,72000,75000]],
 ['I','Waterproofing','wp_sunk','Toilet & balcony sunken waterproofing','Sqm',v=>v.T*5.5+v.BL*2,[1091,1091,1300]],
 ['I','Waterproofing','wp_sscr','Sunken filling / screed, 100 mm average','Cum',v=>v.T*0.55+v.BL*0.2,[3811,3811,3811]],
 ['I','Waterproofing','wp_terr','Terrace waterproofing','Sqm',v=>v.TOP*SQM,[1200,1560,1900]],
 ['I','Waterproofing','wp_tscr','Terrace screed concrete with slope, 100 mm average','Cum',v=>v.TOP*SQM*0.1,[6411,6411,6411]],
 ['I','Labour cost for structure','lb_pl','Structure labour — plinth','Sft',v=>v.GF,[60,60,60]],
 ['I','Labour cost for structure','lb_rf','Structure labour incl. shuttering — each roof slab','Sft',v=>v.S+v.HD,[120,130,140]],
 ['I','Block-work & plastering','bw_ext','External walls 200/230 mm','Sqm',v=>v.B*0.11,[1368,1368,1500]],
 ['I','Block-work & plastering','bw_int','Internal walls 100/150 mm','Sqm',v=>v.B*0.07,[1039,1039,1100]],
 ['I','Block-work & plastering','bw_par','Terrace parapet wall, 1 m high','Sqm',v=>Math.sqrt(v.TOP)*4*0.3048,[1039,1039,1100]],
 ['I','Block-work & plastering','pl_ext','External plastering 20 mm, two coats','Sqm',v=>v.B*0.13+Math.sqrt(v.TOP)*4*0.3048*2,[442,442,480]],
 ['I','Block-work & plastering','pl_int','Internal plastering 12–15 mm','Sqm',v=>v.B*0.20,[300,300,320]],
 ['II','Painting','pt_int','Internal walls — putty, primer, 2 coats emulsion','Sqm',v=>v.B*0.20,[300,474,650]],
 ['II','Painting','pt_cl','Ceilings — putty, primer, 2 coats','Sqm',v=>v.B*0.085,[180,237,320]],
 ['II','Painting','pt_ext','External — texture / weather-proof emulsion','Sqm',v=>v.B*0.13+Math.sqrt(v.TOP)*4*0.3048*2,[300,401,600]],
 ['II','Tiling','tl_flr','Floor tiles incl. laying (vitrified / large format / marble)','Sqm',v=>v.B*0.07,[1000,1600,5200]],
 ['II','Tiling','tl_sk','Skirting 100 mm','Rmt',v=>v.B*0.065,[120,142,350]],
 ['II','Tiling','tl_as','Anti-skid tiles — toilets & balconies','Sqm',v=>v.T*4.5+v.BL*4,[1100,1238,1600]],
 ['II','Tiling','tl_dd','Wall dado — toilets (7 ft) & kitchen','Sqm',v=>v.T*16+v.K*4,[950,1134,2200]],
 ['II','Granite','gr_st','Staircase granite — treads & risers','Sqm',v=>v.F*9.2,[2600,3116,4500]],
 ['II','Granite','gr_sk','Staircase skirting','Rmt',v=>v.F*3,[288,288,400]],
 ['II','Granite','gr_jb','Window sills & jambs','Sqm',v=>v.B*0.0035,[2600,3116,4500]],
 ['II','Granite','gr_kt','Kitchen platform (granite / quartz)','Sqm',v=>v.K*4,[2500,3116,6000]],
 ['II','Granite','gr_lf','Lift cladding','Sqm',v=>v.L*v.F*13,[3116,3116,4500]],
 ['II','Doors & windows','dw_mn','Main door — frame, shutter & hardware','Nos',v=>v.S?1:0,[45000,75000,200000]],
 ['II','Doors & windows','dw_rm','Room doors — frame, shutter & hardware','Nos',v=>v.R,[20000,32000,55000]],
 ['II','Doors & windows','dw_tl','Toilet doors (WPC / FRP)','Nos',v=>v.T,[12000,16000,28000]],
 ['II','Doors & windows','dw_wn','Windows & ventilators (aluminium / UPVC / system)','Sft',v=>v.B,[95,150,300],'Per sq.ft of built-up area'],
 ['II','Railing','rl_st','Staircase railing','Sft',v=>v.F*80,[650,900,1800]],
 ['II','Railing','rl_bl','Balcony railing','Sft',v=>v.BL*35,[650,900,1800]],
 ['III','Lift','mp_lift','Lift — supply & installation','Nos',v=>v.L,[1000000,1120000,1500000]],
 ['III','Plumbing material — CP & sanitary','mp_cp','CP fittings & sanitaryware','Nos',v=>v.T,[35000,75000,200000],'Per toilet'],
 ['III','Plumbing material — CP & sanitary','mp_pp','Plumbing pipes, fittings & drainage','Sft',v=>v.B,[60,75,100],'Per sq.ft of built-up area'],
 ['III','Plumbing material — CP & sanitary','mp_kt','Kitchen sink, taps & points','Nos',v=>v.K,[15000,25000,65000]],
 ['III','Labour cost civil per toilet','mp_tl','Civil & plumbing labour per toilet','Nos',v=>v.T,[40000,50000,65000]],
 ['III','Electrical','mp_el','Internal electrical — wiring, DB, switches, fittings','Sft',v=>v.B,[190,280,420],'Per sq.ft of built-up area'],
 ['III','Electrical','mp_ex','External electrical — meter, earthing, cable, outdoor lights','Sft',v=>v.B,[25,35,60],'Per sq.ft of built-up area'],
 ['IV','Machinery & scaffolding','mc','Machinery, scaffolding & site equipment','Sft',v=>v.B,[30,35,45],'Per sq.ft of built-up area'],
 ['V','IDC','idc_dsg','Design fees — architect, structural & MEP','Sft',v=>v.B,[27,27,40],'Architect ₹20 + structural ₹5 + MEP ₹2 per sq.ft'],
 ['V','IDC','idc_eng','Site engineer / supervisor','Month',v=>v.M,[25000,35000,45000]],
 ['V','IDC','idc_sec','Security / watchman','Month',v=>v.M,[10000,12000,15000]],
 ['V','IDC','idc_inf','Site infra, water, power & NMR labour','Month',v=>v.M,[8000,10000,15000]],
];
const E2_SPEC={ // what's included, by specification
 'Concrete & steel':['M20–M25 RCC, Fe500 TMT, UltraTech / Dalmia','M25–M30 RMC, Fe500D TMT (JSW / Tata), UltraTech / ACC','M30 design-mix RMC, Fe550D TMT (Tata Tiscon)'],
 'Walls & plaster':['200/230 mm external & 100/150 mm internal block / brick walls, sand-cement plaster','Same, double-coat external plaster with waterproof compound','AAC / brick walls, premium plaster & gypsum finish'],
 'Waterproofing':['Polymer-cement toilets & terrace','Polymer-cement toilets, membrane terrace','Premium membrane system with warranty'],
 'Painting':['Tractor emulsion inside, Apex exterior','Royale / acrylic premium inside, Apex Ultima / texture exterior','Royale Luxury / texture inside, Ultima Protek exterior'],
 'Flooring':['Vitrified 2′×2′ (tile up to ₹60/sq.ft)','Large vitrified 4′×2′ (up to ₹120/sq.ft), granite staircase','Italian marble / premium porcelain (up to ₹350/sq.ft)'],
 'Doors & windows':['Teak-frame main door, flush room doors, WPC toilet doors, aluminium windows','Teak main door, laminated room doors, UPVC windows with mesh','Designer teak main door, veneer doors, system aluminium / UPVC'],
 'Railing':['MS railing','SS railing','SS / glass railing'],
 'Toilets & kitchen':['Hindware / Parryware, Jaquar Continental; granite platform','Wall-hung WC, Jaquar / Kohler; semi-modular kitchen, quartz top','Grohe / Kohler, rain shower; modular kitchen, premium top'],
 'Electrical':['Finolex / Polycab FR wires, Anchor Roma switches','Havells / Polycab FRLS, Legrand / Schneider modular','FRLS, Legrand Arteor / Schneider premium, automation-ready'],
};
const E2={tier:'Standard',floors:[{n:'Ground floor',a:''},{n:'First floor',a:''}],head:true,city:0,rooms:'4',toilets:'3',kitchens:'1',balconies:'1',lifts:'0',months:'',extras:{},ov:{},gst:true,lead:'',name:'',edit:false,open:{}};
/* interiors (optional, added from the BOQ): Hyderabad 2026 indicative rates [Standard, Premium, Luxury] */
const E2_INT=[
 ['int_fc','False ceiling','Gypsum false ceiling with framing (about 35% of floor area)','Sqft',v=>v.B*0.35,[85,120,180]],
 ['int_mk','Modular kitchen','Modular kitchen — base + wall units, per running ft of counter','Rft',v=>Math.max(1,v.K)*12,[9000,13000,18000]],
 ['int_wd','Wardrobes & storage','Wardrobes, shutter area (about 42 sq.ft per bedroom)','Sqft',v=>Math.max(1,v.R-1)*42,[1300,1900,2800]],
 ['int_tv','TV unit & wall panelling','TV unit with wall panelling (one per floor) — allowance','Nos',v=>Math.max(1,v.F),[45000,85000,150000]],
 ['int_lt','Decorative lighting & fans','Decorative lights, profile lights & fans — allowance per sq.ft','Sqft',v=>v.B,[40,70,120]],
 ['int_wp','Wallpaper / texture finishes','Wallpaper / texture on feature walls — allowance','Sqft',v=>v.R*80,[90,130,200]],
 ['int_fu','Loose furniture & soft furnishing','Beds, sofa, dining, curtains — allowance per sq.ft','Sqft',v=>v.B,[250,450,800]],
];
const e2Std=()=>{const o=(D.org.find(x=>x.id==='main')||{}).estList;return o&&typeof o==='object'?o:{};};
const e2Off=()=>E2.off||e2Std().off||{};
const e2Cus=()=>E2.custom||e2Std().add||[];
const E2_CITY=[['Hyderabad',1],['Bangalore',1.05],['Tier-2 town (Guntur, Vijayawada…)',0.93]];
function e2Card(){ // organisation rate card: {r:{key:[s,p,l]}, over, cont}
  const o=(D.org.find(x=>x.id==='main')||{}).estRates2;return o&&typeof o==='object'?o:{};}
function e2Calc(){
  const card=e2Card(),t=Math.max(0,E2_TIERS.indexOf(E2.tier)),cf=(E2_CITY[E2.city]||E2_CITY[0])[1];
  const slabs=E2.floors.map(f=>n(f.a)),S=slabs.reduce((s,x)=>s+x,0),HD=E2.head&&S?150:0;
  const ls=slabs.filter(Boolean);const F=ls.length;
  const v={S,HD,B:S+HD,GF:ls[0]||0,TOP:ls[ls.length-1]||0,F,R:n(E2.rooms),T:n(E2.toilets),K:n(E2.kitchens),BL:n(E2.balconies),L:n(E2.lifts)};
  v.M=n(E2.months)||(F?Math.round(4+1.5*F):0);
  const off=e2Off(),cus=e2Cus().map(x=>{const pr=E2_INT.find(y=>y[0]===x.pre);return [x.sec,x.hd,x.k,x.d,x.u,x.q!==undefined&&x.q!==''?()=>n(x.q):pr?pr[4]:()=>0,(Array.isArray(x.r)?x.r:[n(x.r),n(x.r),n(x.r)]).map(y=>x.pre?y:y/cf),x.note||''];});
  const rows=[...E2_EL,...cus].filter(r=>!off[r[2]]).map(([sec,hd,k,d,u,qf,rt,note])=>{const ov=E2.ov[k]||{};const base=(card.r&&card.r[k]?card.r[k]:rt)[t];
    const q=ov.q!==undefined&&ov.q!==''?n(ov.q):Math.round(qf(v)*100)/100;const r=ov.r!==undefined&&ov.r!==''?n(ov.r):Math.round(base*cf);
    return {sec,hd,k,d,u,q,r,amt:q*r,note:note||'',edited:ov.q!==undefined&&ov.q!==''||ov.r!==undefined&&ov.r!==''};});
  const ex=EXTRAS.map(([nm_,u,r],i)=>({nm:nm_,u,r,q:n(E2.extras[i]),amt:n(E2.extras[i])*r})).filter(x=>x.q);
  const heads=[];rows.forEach(r=>{let h=heads.find(x=>x.sec===r.sec&&x.hd===r.hd);if(!h)heads.push(h={sec:r.sec,hd:r.hd,amt:0,rows:[]});h.amt+=r.amt;h.rows.push(r);});
  E2_SECS.forEach(([sn],i)=>heads.forEach(h=>{if(h.sec===sn)h.o=i;}));heads.sort((a,b)=>a.o-b.o);
  const exT=ex.reduce((s,x)=>s+x.amt,0);if(exT)heads.push({sec:'VI',hd:'External works & extras',amt:exT,rows:[]});
  const works=heads.reduce((s,h)=>s+h.amt,0);
  const overP=card.over!==undefined?+card.over:7.5,contP=card.cont!==undefined?+card.cont:5;
  const over=works*overP/100,cont=works*contP/100,sub=works+over+cont,gst=E2.gst?sub*0.18:0,total=sub+gst;
  const fl=E2.floors.filter(f=>n(f.a));const se=fl.length?30/fl.length:30;
  const stages=[['Booking / agreement',5],['Foundation & footings',10],['Plinth beam',5],...fl.map(f=>[`${f.n} roof slab`,+se.toFixed(1)]),['Brickwork / blockwork',10],['Plastering',10],['Flooring & tiling',10],['Doors, windows, electrical & plumbing',10],['Painting & handover',10]];
  const q=k=>(rows.find(r=>r.k===k)||{}).q||0;
  const conc=['c_ftg','c_plb','c_col','c_bm','c_slab','c_stair'].reduce((s,k)=>s+q(k),0);
  const mat=[['RCC concrete','Cum',conc],['PCC','Cum',q('c_pcc')],['Cement for RCC & PCC (≈8.6 bags/cum)','Bags',(conc+q('c_pcc'))*8.6],['TMT steel','MT',q('st_ftg')+q('st_frm')],['Block / brick walls','Sqm',q('bw_ext')+q('bw_int')+q('bw_par')],['Plastering','Sqm',q('pl_ext')+q('pl_int')],['Painting','Sqm',q('pt_int')+q('pt_cl')+q('pt_ext')],['Tiles (floor, anti-skid, dado)','Sqm',q('tl_flr')+q('tl_as')+q('tl_dd')],['Granite','Sqm',q('gr_st')+q('gr_jb')+q('gr_kt')+q('gr_lf')]];
  return {t,cf,v,rows,heads,ex,exT,works,overP,contP,over,cont,sub,gst,total,stages,mat,per:v.B?total/v.B:0,perEx:v.B?sub/v.B:0};
}
const E2_BAND={Standard:'₹2,200–2,730',Premium:'₹2,835–4,200',Luxury:'₹4,200–7,000'};
/* → estimates: estModeBtns */
const fq=x=>x>=100?num(Math.round(x)):(Math.round(x*100)/100).toLocaleString('en-IN');
/* → estimates: vEstDetailed */
function e2Text(){
  const c=e2Calc(),v=c.v;
  return [`*${orgName()} — cost estimate*`,E2.name?`Project: ${E2.name}`:'',`Date: ${fd(today())} · ${E2.tier} · ${E2_CITY[E2.city][0]}`,
    `BUA: ${num(v.B)} sq.ft (${E2.floors.filter(f=>n(f.a)).map(f=>`${f.n} ${num(n(f.a))}`).join(', ')}${v.HD?', headroom 150':''})`,
    `Rooms ${num(v.R)} · Toilets ${num(v.T)} · Kitchens ${num(v.K)}${v.L?` · Lift ${num(v.L)}`:''}`,'',
    ...E2_SECS.flatMap(([sn,st])=>{const hs=c.heads.filter(h=>h.sec===sn&&h.amt);return hs.length?[`*${sn}. ${st}*`,...hs.map(h=>`• ${h.hd}: ${inr(h.amt)} (${inr(h.amt/v.B)}/sft)`)]:[];}),
    `• Overheads & margin ${c.overP}%: ${inr(c.over)}`,`• Contingencies ${c.contP}%: ${inr(c.cont)}`,'',
    `TOTAL: ${inr(c.sub)} (${inr(c.perEx)}/sft)`,E2.gst?`GST 18%: ${inr(c.gst)}`:'',`*GRAND TOTAL: ${inr(c.total)}* (${inr(c.per)}/sft)`,'',
    'Excludes land, approvals, interiors & furniture. Valid for 30 days.'].filter(x=>x!=='').join('\n');
}
/* → estimates: e2Xls */
/* → estimates: e2Doc */
/* add / remove BOQ items (civil and interiors); the list can be saved as the company standard */
/* → estimates: e2Editor */
/* → estimates: e2Touch */
document.addEventListener('click',e=>{if(!e.target.closest||S.view!=='estimator')return;
  {const b=e.target.closest('[data-e2rm]');if(b){const k=b.dataset.e2rm;e2Touch();if(E2.custom.some(x=>x.k===k))E2.custom=E2.custom.filter(x=>x.k!==k);else E2.off[k]=true;delete E2.ov[k];render();toast('Item removed — add it back below if needed');return;}}
  {const b=e.target.closest('[data-e2back]');if(b){e2Touch();delete E2.off[b.dataset.e2back];render();return;}}
  {const b=e.target.closest('[data-e2pre]');if(b){const p=E2_INT.find(x=>x[0]===b.dataset.e2pre);if(!p)return;e2Touch();
    E2.custom.push({k:p[0],pre:p[0],sec:'VII',hd:p[1],d:p[2],u:p[3],r:p[5].slice()});E2.open['VII'+p[1]]=true;render();toast(p[1]+' added under VII · Interiors');return;}}
  const id=(e.target.closest('button')||{}).id;
  if(id==='e2StdSave'){const o={add:e2Cus(),off:e2Off()};write(()=>db.doc('org/main').update({estList:o}),'Saved as your company standard item list').then(ok=>{if(ok){E2.off=null;E2.custom=null;render();}});return;}
  if(id==='e2StdUse'){E2.off=null;E2.custom=null;E2.ov={};render();return;}
  if(id==='e2StdOrig'){E2.off={};E2.custom=[];E2.ov={};render();toast('BuildMitr default list for this estimate. Save as company standard to keep it.');return;}
},true);
document.addEventListener('submit',e=>{if(e.target.id!=='e2ItemForm')return;e.preventDefault();const f=e.target,g=k=>(f.elements[k].value||'').trim();
  e2Touch();const r=n(g('r'));E2.custom.push({k:'cx'+Date.now().toString(36),sec:g('sec'),hd:g('hd'),d:g('d'),u:g('u'),q:g('q'),r:[r,r,r]});E2.open[g('sec')+g('hd')]=true;
  render();toast('Item added');},true);
/* → estimates: e2SaveRates */
/* → estimates: e2Rerender */
document.addEventListener('input',e=>{const t=e.target,d=t.dataset||{};if(!t.closest||!t.closest('#view'))return;
  if(d.e2!==undefined){const k=d.e2,pos=t.selectionStart;if(/^fa\d+$/.test(k))E2.floors[+k.slice(2)].a=t.value;else E2[k]=t.value;e2Rerender(`[data-e2="${k}"]`,pos);return;}
  if(d.e2x!==undefined){E2.extras[d.e2x]=t.value;e2Rerender(`[data-e2x="${d.e2x}"]`,t.selectionStart);return;}
  if(d.e2q!==undefined||d.e2r!==undefined){const k=d.e2q||d.e2r,f=d.e2q!==undefined?'q':'r';E2.ov[k]=Object.assign({},E2.ov[k],{[f]:t.value});
    if(E2.ov[k].q===undefined&&E2.ov[k].r==='')delete E2.ov[k];e2Rerender(`[data-e2${f}="${k}"]`,t.selectionStart);return;}
  if(d.e2f!==undefined){E2.floors[+d.e2f].n=t.value;}
  if(t.id==='e2-start')E2.pstart=t.value;if(t.id==='e2-months')E2.pmonths=t.value;
},true);
document.addEventListener('change',e=>{const t=e.target;if(!t.id&&!(t.dataset&&t.dataset.e2f!==undefined))return;
  if(t.id==='e2-tier'){E2.tier=t.value;E2.ov={};render();}else if(t.id==='e2-city'){E2.city=+t.value;render();}
  else if(t.id==='e2-gst'){E2.gst=t.checked;render();}else if(t.id==='e2-head'){E2.head=t.checked;render();}
  else if(t.id==='e2-lead'){E2.lead=t.value;const l=D.leads.find(x=>x.id===t.value);if(l&&!E2.name)E2.name=l.name+(l.place?', '+l.place:'');render();}
  else if(t.dataset&&t.dataset.e2f!==undefined)render();
},true);
document.addEventListener('click',e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-estmode]');if(b){EST.mode=b.dataset.estmode;render();return;}}
  {const b=e.target.closest('[data-e2del]');if(b){E2.floors.splice(+b.dataset.e2del,1);render();return;}}
  {const b=e.target.closest('[data-e2open]');if(b){const k=b.dataset.e2open;E2.open[k]=!E2.open[k];render();return;}}
  const id=(e.target.closest('button')||{}).id;
  if(id==='e2Add'){const names=['Ground floor','First floor','Second floor','Third floor','Fourth floor','Fifth floor','Sixth floor'];E2.floors.push({n:names[E2.floors.length]||`Floor ${E2.floors.length}`,a:(E2.floors[E2.floors.length-1]||{}).a||''});render();return;}
  if(id==='e2Edit'){E2.edit=!E2.edit;render();scrollTo(0,0);return;}
  if(id==='e2Reset'){write(()=>db.doc('org/main').update({estRates2:null}),'Back to the default rates').then(()=>render());return;}
  if(id==='e2ResetOv'){E2.ov={};render();return;}
  if(id==='e2Xls'){e2Xls();return;}
  if(id==='e2Doc'){e2Doc();return;}
  if(id==='e2Share'){shareSheet(`Estimate${E2.name?' — '+E2.name:''}`,e2Text());return;}
  if(id==='e2Save'){const c=e2Calc(),l=D.leads.find(x=>x.id===E2.lead);if(!l)return;
    write(()=>db.doc('leads/'+l.id).update({budget:Math.round(c.total),estimate:{pkg:E2.tier,area:c.v.B,floors:c.v.F,rooms:c.v.R,toilets:c.v.T,total:Math.round(c.total),date:today()}}),'Estimate saved to '+l.name);return;}
  if(id==='e2Quote'){const c=e2Calc(),l=D.leads.find(x=>x.id===E2.lead)||{};const cl=D.clients.find(x=>x.phone&&l.phone&&waNum(x.phone)===waNum(l.phone));
    docNew('Quotation',{client:cl?cl.id:'',toName:cl?cl.name:(l.name||E2.name||''),toAddr:cl?cl.address:(l.place||''),toPhone:cl?cl.phone:(l.phone||''),gst:E2.gst?'GST 18%':'No GST',
      details:[['Project',E2.name||'Residence'],['Specification',E2.tier],['Built-up area',`${num(c.v.B)} sq.ft · ${c.v.F} floors · ${num(c.v.R)} rooms · ${num(c.v.T)} toilets`],['Rate',`${inr(c.perEx)} per sq.ft (before GST)`]],
      items:[...c.heads.filter(h=>h.amt).map(h=>({d:`${h.sec}. ${h.hd}`,amt:String(Math.round(h.amt))})),{d:`Overheads & contractor margin (${c.overP}%)`,amt:String(Math.round(c.over))},{d:`Contingencies (${c.contP}%)`,amt:String(Math.round(c.cont))}],
      stages:c.stages.map(([st,pc])=>[st,String(pc)])});return;}
},true);
document.addEventListener('submit',e=>{if(e.target.id==='e2RateForm'){e.preventDefault();e2SaveRates(e.target);}},true);

/* ================= Work schedule generator + "create project from estimate" =================
 * Builds a floor-wise construction schedule (substructure → each slab → masonry & MEP rough-in per floor →
 * plastering, waterproofing, flooring, joinery, painting, fittings → handover) and stretches or squeezes it to the
 * duration asked for (e.g. 6 months). Payment stages are linked to the activity that completes them. */
/* → planning: makeSchedule */
/* tasks + payment-stage milestones for a project, written in one request */
/* → planning: scheduleRecords */
async function dbBatch(list){
  if(db.batch)return db.batch(list);
  for(const [c,id,d] of list)await db.doc(c+'/'+id).set(d);
}
const E2_CAT={'Earthwork':'Sub-contract','Formwork':'Sub-contract','Labour cost for structure':'Labour','Labour cost civil per toilet':'Labour','Lift':'Sub-contract','Electrical':'Sub-contract','Machinery & scaffolding':'Equipment','IDC':'Design & approvals','External works & extras':'Sub-contract'};
/* → planning: e2MakeProject */
/* → planning: schedDialog */
/* → planning: schedMake */
document.addEventListener('click',e=>{if(!e.target.closest)return;const b=e.target.closest('button');if(!b)return;
  if(b.id==='e2Proj'){e2MakeProject();return;}
  if(b.id==='schedGen'){plOpen(S.proj!=='all'?S.proj:'');return;}
},true);
document.addEventListener('submit',e=>{if(e.target.id==='schedForm'){e.preventDefault();schedMake(e.target);}},true);

/* ================= Schedule planner =================
 * Builds an editable activity schedule from: scope checklist (civil + interiors), floors and their areas, rooms,
 * toilets, lifts, a time limit, the local monsoon season and the holiday calendar. Durations are WORKING days
 * (Sundays and holidays skipped); weather-sensitive works get extra time in the rainy months of the chosen city.
 * Every activity can be switched off, renamed, given other days, a fixed start date and a comment. */
Object.assign(ICONS,{'calendar-range':'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/>'});
/* ---- project types: each adds its own construction works (planner) and design activities (design schedule) ----
   construction extra = [key, title, anchor, working days, resource]; anchor: struct = after the structure, mep = with the
   rough-in (after block-work), finish = after flooring, paint = after first paint coat, end = just before handover */
const PTYPES=['Residential house','Villa','Apartment','Commercial / office','Industrial / factory','Warehouse','Restaurant / café','Hotel','Hospital / clinic','School / college','Retail / showroom'];
const PT_C={
 'Villa':[['vpool','Swimming pool & deck','struct',25,'Pool contractor'],['vauto','Home automation & CCTV','finish',6,'Automation vendor']],
 'Apartment':[['aff','Fire fighting, hydrant & fire alarm','mep',20,'Fire contractor'],['astp','STP, WTP & rainwater harvesting','struct',20,'MEP contractor'],['adg','DG set, transformer & common-area electricals','finish',10,'Electrical contractor'],['apark','Basement parking, ramps & signage','finish',12,'Civil contractor'],['acom','Common areas, lobby & clubhouse finishes','paint',20,'Interior contractor']],
 'Commercial / office':[['cglz','Glazing / ACP facade','finish',25,'Facade contractor'],['chv','HVAC (VRF) ducting & units','mep',25,'HVAC contractor'],['cff','Fire alarm & sprinklers','mep',18,'Fire contractor'],['cit','Data, IT & security cabling','finish',10,'IT vendor'],['cdg','DG set, transformer & panels','finish',10,'Electrical contractor'],['cnoc','Fire NOC & occupancy certificate','end',15,'Liaison']],
 'Industrial / factory':[['ipeb','PEB steel structure erection','struct',30,'PEB vendor'],['ishe','Roof & wall sheeting, skylights','struct',15,'PEB vendor'],['iflr','Industrial (VDF) flooring','finish',15,'Flooring contractor'],['icrn','Crane rails & gantry','struct',10,'Fabricator'],['ihyd','Fire hydrant & sprinklers','mep',18,'Fire contractor'],['isub','Electrical substation & panels','finish',15,'Electrical contractor'],['iutl','Compressed air & process utilities','finish',15,'MEP contractor'],['iroad','Internal roads & storm drains','end',15,'Civil contractor'],['ilic','Factory licence & pollution board inspection','end',10,'Liaison']],
 'Warehouse':[['wpeb','PEB steel structure erection','struct',25,'PEB vendor'],['wshe','Roof & wall sheeting','struct',12,'PEB vendor'],['wflr','Industrial (VDF) flooring & dock levellers','finish',15,'Flooring contractor'],['whyd','Fire hydrant & sprinklers','mep',15,'Fire contractor'],['wroad','Truck yard, roads & drains','end',15,'Civil contractor']],
 'Restaurant / café':[['rkex','Kitchen exhaust & fresh air ducting','mep',8,'HVAC contractor'],['rgas','LPG bank & gas pipeline','mep',5,'Gas vendor'],['rhv','Air-conditioning','mep',8,'HVAC contractor'],['rkit','Commercial kitchen equipment','finish',8,'Kitchen vendor'],['rsup','Hood fire suppression & fire alarm','finish',4,'Fire contractor'],['rgt','Grease trap & drainage','mep',3,'Plumber'],['rsig','Signage & branding','paint',5,'Signage vendor'],['rlic','FSSAI, trade licence & fire NOC','end',10,'Liaison']],
 'Hotel':[['hhv','Central HVAC (chillers & AHUs)','mep',35,'HVAC contractor'],['hff','Fire fighting, sprinklers & fire alarm','mep',25,'Fire contractor'],['hmock','Mock-up guest room','finish',15,'Interior contractor'],['hkl','Kitchen & laundry equipment','finish',15,'Kitchen vendor'],['hffe','Guest room FF&E fit-out','paint',30,'Interior contractor'],['hbms','BMS, IT, IPTV & CCTV','finish',15,'IT vendor'],['hstp','STP & WTP','struct',25,'MEP contractor'],['hpool','Swimming pool','struct',25,'Pool contractor'],['hdg','DG set, transformer & panels','finish',12,'Electrical contractor'],['hnoc','Fire NOC, trade licence & brand audit','end',15,'Liaison']],
 'Hospital / clinic':[['qmg','Medical gas pipeline (O₂, vacuum, air)','mep',18,'Medical gas vendor'],['qhv','HVAC with HEPA filters (OT & ICU)','mep',30,'HVAC contractor'],['qff','Fire fighting, sprinklers & fire alarm','mep',22,'Fire contractor'],['qrs','Radiation shielding (X-ray / CT rooms)','mep',8,'Shielding vendor'],['qot','Modular OT panels & ICU fit-out','finish',25,'OT vendor'],['qnc','Nurse call, BMS & CCTV','finish',12,'IT vendor'],['qstp','STP / ETP & bio-medical waste room','struct',25,'MEP contractor'],['qdg','DG set, UPS & transformer','finish',12,'Electrical contractor'],['qnoc','Fire NOC, NABH & AERB inspections','end',15,'Liaison']],
 'School / college':[['sff','Fire alarm & fire extinguishers','mep',10,'Fire contractor'],['slab','Labs & library fit-out','paint',15,'Interior contractor'],['splay','Playground, sports courts & landscaping','end',20,'Landscape contractor'],['snoc','Fire NOC & building fitness certificate','end',10,'Liaison']],
 'Retail / showroom':[['tfront','Shopfront glazing','finish',8,'Glazing vendor'],['thv','Air-conditioning','mep',8,'HVAC contractor'],['tfix','Display fixtures & visual merchandising','paint',12,'Interior contractor'],['tsig','Signage & branding','paint',5,'Signage vendor'],['tsec','CCTV, security & billing points','finish',4,'IT vendor']]};
/* scope ticks per type (on / off) */
const PT_SCOPE={'Villa':{elev:1,cwall:1,land:1,solar:1},'Apartment':{elev:1,cwall:1,land:1},'Commercial / office':{fc:1,elev:1,mk:0,ward:0,tv:0},'Industrial / factory':{fc:0,mk:0,ward:0,tv:0,wallp:0,furn:0,granite:0,twp:0},'Warehouse':{fc:0,mk:0,ward:0,tv:0,wallp:0,furn:0,granite:0,twp:0,elev:0},
 'Restaurant / café':{fc:1,light:1,furn:1,wallp:1,mk:0,ward:0,tv:0},'Hotel':{fc:1,light:1,furn:1,wallp:1,ward:1,tv:1,elev:1,land:1},'Hospital / clinic':{fc:1,light:1,mk:0,tv:0,wallp:0},'School / college':{fc:0,mk:0,ward:0,tv:0,wallp:0,cwall:1,land:1},'Retail / showroom':{fc:1,light:1,furn:1,wallp:1,mk:0,ward:0,tv:0}};
/* → planning: plSetType */
/* scope checklist: key, label, group, on by default */
const PL_SCOPE=[
 ['pre','Site clearance, setting out & mobilisation','Civil',1],['soil','Soil test, approvals & drawings sign-off','Civil',0],['exc','Excavation','Civil',1],['ftg','PCC & footings','Civil',1],
 ['plinth','Plinth beams & back-filling','Civil',1],['struct','Columns & roof slabs (each floor)','Civil',1],['head','Headroom, parapet & terrace','Civil',1],['sump','Sump & septic tank','Civil',1],
 ['bw','Block / brick work','Civil',1],['mep','Electrical & plumbing rough-in','Civil',1],['ipl','Internal plastering','Civil',1],['epl','External plastering','Civil',1],
 ['twp','Toilet & balcony waterproofing','Civil',1],['terwp','Terrace waterproofing','Civil',1],['floor','Flooring & tiling','Civil',1],['granite','Granite — staircase, sills, kitchen','Civil',1],
 ['dw','Doors & windows','Civil',1],['rail','Railings & grills','Civil',1],['paint','Painting','Civil',1],['fit','Electrical & sanitary fittings','Civil',1],
 ['elev','Elevation cladding / facade features','Civil',0],['cwall','Compound wall & gate','Civil',0],['solar','Solar heater / panels','Civil',0],['land','Landscaping & paving','Civil',0],
 ['fc','False ceiling','Interiors',0],['mk','Modular kitchen','Interiors',0],['ward','Wardrobes & storage','Interiors',0],['tv','TV unit & wall panelling','Interiors',0],
 ['light','Decorative lighting & fans','Interiors',0],['wallp','Wallpaper / texture finishes','Interiors',0],['furn','Loose furniture & soft furnishing','Interiors',0],['clean','Deep cleaning, snag list & handover','Civil',1]];
/* rainy months per location: 0..11 -> extra-time factor for weather-sensitive works */
const PL_RAIN={Hyderabad:{5:1.15,6:1.35,7:1.35,8:1.15,9:1.05},Bangalore:{5:1.15,6:1.15,7:1.15,8:1.35,9:1.35,10:1.15},'Tier-2 town (Guntur, Vijayawada…)':{5:1.15,6:1.35,7:1.35,8:1.35,9:1.35,10:1.15}};
const PL_HOT=[3,4];   // April–May: hot — longer curing, avoid noon pours
/* site holidays (tentative — check against the official list; sites usually close 3–4 days for Sankranti) */
const PL_HOL_DEFAULT=`2026-01-14 Bhogi
2026-01-15 Sankranti
2026-01-16 Kanuma
2026-01-26 Republic Day
2026-03-03 Holi
2026-03-19 Ugadi
2026-03-21 Ramzan
2026-08-15 Independence Day
2026-09-14 Vinayaka Chavithi
2026-10-02 Gandhi Jayanti
2026-10-20 Dussehra
2026-10-21 Day after Dussehra
2026-11-08 Deepavali
2026-12-25 Christmas
2027-01-13 Bhogi
2027-01-14 Sankranti
2027-01-15 Sankranti
2027-01-16 Kanuma
2027-01-26 Republic Day
2027-03-09 Ramzan
2027-03-22 Holi
2027-04-07 Ugadi
2027-05-01 May Day
2027-05-17 Bakrid
2027-09-04 Vinayaka Chavithi
2027-10-02 Gandhi Jayanti
2027-10-09 Dussehra
2027-10-29 Deepavali
2027-12-25 Christmas`;
const PL={ptype:'Residential house',pid:'',start:'',months:'6',city:0,sun:true,floors:[{n:'Ground floor',a:''},{n:'First floor',a:''}],rooms:'4',toilets:'3',kitchens:'1',lifts:'0',scope:{},hol:'',ed:{},showHol:false};
PL_SCOPE.forEach(([k,,,on])=>PL.scope[k]=!!on);
const plStd=()=>{const o=(D.org.find(x=>x.id==='main')||{}).plStd;return o&&typeof o==='object'?o:{};};
const plCus=()=>PL.custom||plStd().custom||[];
/* → planning: plStdApply */
const plCities=()=>Object.keys(PL_RAIN);
const isoD=d=>new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const dOf=s=>new Date(s+'T00:00');
function plHolidays(){const m={};String(PL.hol||PL_HOL_DEFAULT).split('\n').forEach(l=>{const x=l.trim().match(/^(\d{4}-\d{2}-\d{2})\s*(.*)$/);if(x)m[x[1]]=x[2]||'Holiday';});return m;}
/* the activity network (before the calendar): key, title, scope, working days, after [keys], lag (calendar days), wet, floor */
function plNetwork(){
  const fl=PL.floors.filter(f=>n(f.a)),F=fl.length,A=fl.map(f=>n(f.a)),AT=A.reduce((s,x)=>s+x,0),GF=A[0]||0,TOP=A[F-1]||0;
  const T=n(PL.toilets),R=n(PL.rooms),L=n(PL.lifts),Tf=F?T/F:0,on=k=>PL.scope[k],acts=[];
  const add=(key,title,sc,wd,after,o)=>{if(!on(sc)&&!/^cu/.test(key))return null;acts.push({key,title,sc,wd:Math.max(1,Math.round(wd)),after:(after||[]).filter(Boolean),lag:(o&&o.lag)||0,wet:!!(o&&o.wet),res:(o&&o.res)||''});return key;};
  const pre=add('pre','Site clearance, setting out & mobilisation','pre',3,[],{res:'Civil gang'});
  const soil=add('soil','Soil test, approvals & drawings sign-off','soil',7,[pre],{res:'Site engineer'});
  const exc=add('exc','Excavation for footings','exc',3+GF/400,[pre,soil],{wet:1,res:'Excavator + civil gang'});
  const ftg=add('ftg','PCC & RCC footings','ftg',8+GF/200,[exc],{wet:1,res:'Structure contractor'});
  const plb=add('plinth','Columns to plinth, plinth beams & back-filling','plinth',5+GF/300,[ftg],{wet:1,res:'Structure contractor'});
  const sump=add('sump','Sump & septic tank','sump',10,[ftg],{wet:1,res:'Structure contractor'});
  const cw=add('cwall','Compound wall & gate','cwall',10,[plb],{wet:1,res:'Masonry gang'});
  const slab=[];let prev=plb||ftg||exc||pre;
  fl.forEach((f,i)=>{const c=add('col'+i,`Columns — ${f.n}`,'struct',4+A[i]/400,[prev],{lag:i?7:0,res:'Structure contractor'});
    const s=add('slab'+i,`Beams & roof slab — ${f.n}`,'struct',8+A[i]/150,[c],{wet:1,res:'Structure contractor'});slab.push(s);if(s)prev=s;});
  const head=add('head','Headroom, parapet & terrace works','head',6,[prev],{lag:7,wet:1,res:'Structure contractor'});
  const bw=[],ip=[],flr=[];
  fl.forEach((f,i)=>{const b=add('bw'+i,`Block-work — ${f.n}`,'bw',Math.max(6,A[i]/80),[slab[i]],{lag:14,res:'Masonry gang'});bw.push(b);
    const m=add('mep'+i,`Electrical & plumbing rough-in — ${f.n}`,'mep',4+A[i]/300,[b],{res:'Electrician + plumber'});
    const p=add('ipl'+i,`Internal plastering — ${f.n}`,'ipl',Math.max(6,A[i]/70),[m||b],{res:'Plastering gang'});ip.push(p);
    const w=add('twp'+i,`Toilet & balcony waterproofing — ${f.n}`,'twp',2+Tf,[p],{res:'Waterproofing contractor'});
    flr.push(add('fl'+i,`Flooring, skirting & toilet tiling — ${f.n}`,'floor',Math.max(6,A[i]/80+Tf*2),[w||p],{res:'Tiling gang'}));});
  const lastB=bw.filter(Boolean).pop(),lastP=ip.filter(Boolean).pop(),lastF=flr.filter(Boolean).pop();
  const frames=add('frames','Door & window frames, lintels','dw',3+R*0.3,[bw[0]],{lag:3,res:'Carpenter'});
  const terwp=add('terwp','Terrace waterproofing & screed','terwp',4+TOP/600,[head],{lag:7,wet:1,res:'Waterproofing contractor'});
  const epl=add('epl','External plastering','epl',10+AT/150,[head,lastB],{wet:1,res:'Plastering gang'});
  const elev=add('elev','Elevation cladding / facade features','elev',8+AT/600,[epl],{wet:1,res:'Facade contractor'});
  const lift=L?add('lift','Lift installation & commissioning','struct',25,[head],{lag:10,res:'Lift vendor'}):null;
  const fc=add('fc','False ceiling','fc',Math.max(6,AT/150),[lastP],{res:'Interior contractor'});
  const gr=add('granite','Staircase granite, sills & kitchen platform','granite',4+F*1.5,[lastF],{lag:-3,res:'Granite contractor'});
  const sh=add('shutters','Door shutters, windows & glass','dw',3+R*0.5,[lastF],{res:'Carpenter / window vendor'});
  const rl=add('rail','Staircase & balcony railing, grills','rail',3+F,[gr||lastF],{res:'Fabricator'});
  const p1=add('paint1','Painting — putty, primer & first coat','paint',10+AT/150,[epl,lastP,fc],{res:'Painter'});
  const solar=add('solar','Solar heater / panels','solar',3,[terwp],{res:'Solar vendor'});
  const mk=add('mk','Modular kitchen','mk',8+Math.max(1,n(PL.kitchens))*4,[lastF,p1],{res:'Interior contractor'});
  const wd=add('ward','Wardrobes & storage','ward',6+R*1.5,[p1],{res:'Interior contractor'});
  const tv=add('tv','TV unit & wall panelling','tv',5,[p1],{res:'Interior contractor'});
  const fit=add('fit','Electrical fixtures, CP & sanitary fittings','fit',6+T*1.5,[lastF,p1],{res:'Electrician + plumber'});
  const lt=add('light','Decorative lighting & fans','light',4,[fit,fc],{res:'Electrician'});
  const p2=add('paint2','Final painting coat','paint',6+AT/300,[fit,sh,rl,wd,mk,tv],{res:'Painter'});
  const wp=add('wallp','Wallpaper / texture finishes','wallp',4,[p2],{res:'Interior contractor'});
  const land=add('land','Landscaping & paving','land',8,[epl,cw],{wet:1,res:'Landscape contractor'});
  const furn=add('furn','Loose furniture & soft furnishing','furn',5,[p2,wp,lt],{res:'Interior contractor'});
  const anc={struct:head||prev,mep:lastB||head,finish:lastF||lastP,paint:p1||lastF,end:p2||lastF};const tx=[];
  (PT_C[PL.ptype]||[]).forEach(([k,t,a,d,res])=>{if(PL.scope[k]===false)return;tx.push(add(k,t,k,d*(a==='paint'||a==='end'?1:Math.max(1,AT/4000)),[anc[a]],{res,wet:a==='struct'||a==='end'?1:0}));});
  const cu=plCus().filter(x=>PL.scope[x.key]!==false).map(x=>{const k=add(x.key,x.title,x.key,n(x.wd)||1,[x.after&&x.after!=='start'?x.after:(x.after==='start'?null:pre)],{wet:x.wet,res:x.res||(x.grp==='Interiors'?'Interior contractor':'Civil contractor')});return k;});
  add('clean','Deep cleaning, snag list & handover','clean',4,[p2,lift,terwp,land,furn,wp,lt,solar,sump,elev,...tx,...cu],{res:'Site engineer'});
  const keys=new Set(acts.map(a=>a.key));acts.forEach(a=>a.after=a.after.filter(k=>keys.has(k)));   // drop links to unticked works
  return {acts,F,AT,fl};
}
/* place the network on the calendar; s = speed factor (<1 compresses, >1 stretches) */
function plPlace(acts,start,s,hol,rain){
  const out={},isWork=d=>!(PL.sun&&d.getDay()===0)&&!hol[isoD(d)];
  const nextWork=d=>{const x=new Date(d);while(!isWork(x))x.setDate(x.getDate()+1);return x;};
  acts.forEach(a=>{const e=PL.ed[a.key]||{};if(e.off)return;
    let st=dOf(start);a.after.forEach(k=>{const p=out[k];if(!p)return;const x=dOf(p.due);x.setDate(x.getDate()+1+(a.lag||0));if(x>st)st=x;});
    if(e.fix&&dOf(e.fix)>st)st=dOf(e.fix);st=nextWork(st);
    const base=e.d!==undefined&&e.d!==''?Math.max(1,+e.d):Math.max(1,Math.round(a.wd*s));
    const f=a.wet?(rain[st.getMonth()]||1):1,wd=Math.max(1,Math.round(base*f));
    let d=new Date(st),left=wd;while(true){if(isWork(d)){left--;if(!left)break;}d.setDate(d.getDate()+1);}
    out[a.key]={...a,title:e.t||a.title,start:isoD(st),due:isoD(d),days:wd,base,f,comment:e.c||'',fixed:e.fix||''};});
  return out;
}
function plCalc(){
  const N=plNetwork(),hol=plHolidays(),city=plCities()[PL.city]||'Hyderabad',rain=PL_RAIN[city];
  const start=PL.start||today();if(!N.acts.length||!N.fl.length)return {N,rows:[],warn:[]};
  const endOf=pl=>Object.values(pl).reduce((m,r)=>r.due>m?r.due:m,start);
  const natural=plPlace(N.acts,start,1,hol,rain),natEnd=endOf(natural);
  const months=+PL.months||0;let s=1,pl=natural,feasible=true,minEnd=null;
  if(months){const target=isoD(new Date(dOf(start).setMonth(dOf(start).getMonth()+months))),tgtT=dOf(target).getTime();
    let lo=0.55,hi=2.5;for(let k=0;k<22;k++){const mid=(lo+hi)/2;const e=endOf(plPlace(N.acts,start,mid,hol,rain));if(dOf(e).getTime()<=tgtT)lo=mid;else hi=mid;}
    s=lo;pl=plPlace(N.acts,start,s,hol,rain);if(dOf(endOf(pl)).getTime()>tgtT){feasible=false;minEnd=endOf(plPlace(N.acts,start,0.55,hol,rain));}
    PL._target=target;}else PL._target='';
  const rows=N.acts.map(a=>pl[a.key]?pl[a.key]:{...a,off:true,title:(PL.ed[a.key]||{}).t||a.title,comment:(PL.ed[a.key]||{}).c||''});
  const end=endOf(pl),warn=[];
  if(months&&!feasible)warn.push(['high',`${months} months is too short for this scope. Even with extra gangs (about 45% faster) it needs until ${fd(minEnd)} — about ${Math.ceil((dOf(minEnd)-dOf(start))/864e5/30.4)} months.`]);
  if(months&&feasible&&s<0.8)warn.push(['med',`To finish in ${months} months the works run about ${Math.round((1-s)*100)}% faster than normal — plan extra gangs / double shifts for structure and finishes.`]);
  rows.filter(r=>!r.off&&r.wet&&r.f>1).forEach(r=>warn.push([r.f>=1.3?'high':'med',`${r.title} starts ${fd(r.start)} in ${r.f>=1.3?'heavy':'moderate'} monsoon (${city}) — ${Math.round((r.f-1)*100)}% extra time added. ${/slab|footing/i.test(r.title)?'Pour on dry days, keep tarpaulins and a dewatering pump ready.':/plaster|paint|facade|elevation/i.test(r.title)?'Keep external work for dry spells; cover fresh plaster.':/waterproof/i.test(r.title)?'Waterproofing needs a dry surface — check the forecast before starting.':'Keep pumps and cover sheets ready.'}`]));
  rows.filter(r=>!r.off&&/slab|footing|plinth/i.test(r.title)&&PL_HOT.includes(dOf(r.start).getMonth())).forEach(r=>warn.push(['low',`${r.title} is in hot weather (${dOf(r.start).toLocaleDateString(LOC(),{month:'long'})}) — cure at least 10 days, avoid noon pours.`]));
  const hs=Object.entries(hol).filter(([d])=>d>=start&&d<=end);
  return {N,rows,warn,start,end,natEnd,s,feasible,minEnd,city,rain,hol,hs};
}
/* ---- page ---- */
/* → planning: vPlanner */
/* Gantt with monsoon months shaded and holidays marked */
/* → planning: plGantt */
/* month by month: what runs, holidays, season */
/* → planning: plMonths */
function plText(){const c=plCalc(),on=c.rows.filter(r=>!r.off);
  return [`*${orgName()} — work schedule*`,PL.pid?pname(PL.pid):'',`${fd(c.start)} → ${fd(c.end)} (${((dOf(c.end)-dOf(c.start))/864e5/30.4).toFixed(1)} months) · ${c.city}`,'',
    ...on.map(r=>`• ${r.title}: ${fd(r.start)} → ${fd(r.due)}${r.comment?` — ${r.comment}`:''}`),'',...c.warn.map(([,t])=>'⚠ '+t)].filter(Boolean).join('\n');}
/* Save the planner to the project's Activity schedule. Saving again UPDATES the same activities (matched by
   planner step): changed dates / titles are applied, unticked steps are removed (unless work has started on them),
   new steps are added. Progress, status, comments and photos already entered stay; completed activities keep their dates. */
const plTasks=pid=>D.tasks.filter(t=>t.project===pid&&(t.plk||/^BuildMitr planner/.test(t.source||'')));
/* → planning: plSave */
/* open the planner, optionally filled from a project / estimate */
/* → planning: plFromEst */
/* → planning: plOpen */
/* comments on saved activities (Activity schedule) */
/* → planning: taskComments */
/* → planning: taskCommentAdd */
/* ---- events ---- */
/* → planning: plRe */
const plEd=k=>PL.ed[k]||(PL.ed[k]={});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset||{};if(!t.closest||!t.closest('#view')||S.view!=='planner')return;const pos=t.selectionStart;
  if(d.pl!==undefined){const k=d.pl;if(/^fa\d+$/.test(k))PL.floors[+k.slice(2)].a=t.value;else PL[k]=t.value;plRe(`[data-pl="${k}"]`,pos);return;}
  if(d.plf!==undefined){PL.floors[+d.plf].n=t.value;return;}
  if(d.pld!==undefined){const x=plEd(d.pld);if(t.value==='')delete x.d;else x.d=t.value;plRe(`[data-pld="${d.pld}"]`,pos);return;}
  if(d.plt!==undefined){plEd(d.plt).t=t.value;return;}       // names and comments: saved without redrawing while typing
  if(d.plc!==undefined){plEd(d.plc).c=t.value;return;}
  if(t.id==='pl-hol'){PL.hol=t.value;return;}
},true);
document.addEventListener('change',e=>{const t=e.target,d=t.dataset||{};if(S.view!=='planner')return;
  if(t.id==='pl-type'){plSetType(t.value);render();return;}
  if(t.id==='pl-pid'){PL.pid=t.value;const p=proj(t.value);if(p){if(p.ptype&&PTYPES.includes(p.ptype))plSetType(p.ptype);const est=p.estimate||{};plFromEst(est);if(est.floors&&est.floors.length)PL.floors=est.floors.map(f=>({n:f.n,a:String(f.a)}));if(p.start)PL.start=p.start;}render();return;}
  if(t.id==='pl-start'){PL.start=t.value;render();return;}if(t.id==='pl-city'){PL.city=+t.value;render();return;}
  if(t.id==='pl-sun'){PL.sun=t.checked;render();return;}if(t.id==='pl-ms'){PL.ms=t.checked;return;}
  if(t.id==='pl-hol'||d.plf!==undefined||d.plt!==undefined||d.plc!==undefined){render();return;}
  if(d.plsc!==undefined){PL.scope[d.plsc]=t.checked;render();return;}
  if(d.plon!==undefined){const x=plEd(d.plon);if(t.checked)delete x.off;else x.off=true;render();return;}
  if(d.plfix!==undefined){const x=plEd(d.plfix);if(t.value)x.fix=t.value;else delete x.fix;render();return;}
},true);
document.addEventListener('click',e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-pldel]');if(b){PL.floors.splice(+b.dataset.pldel,1);render();return;}}
  {const b=e.target.closest('[data-plcdel]');if(b){PL.custom=plCus().filter(x=>x.key!==b.dataset.plcdel);delete PL.scope[b.dataset.plcdel];render();return;}}
  {const b=e.target.closest('[data-tcm]');if(b){e.stopPropagation();trOpen(TC(),b.dataset.tcm);return;}}
  const id=(e.target.closest('button')||{}).id;if(!id)return;
  if(id==='plAdd'){const nm_=['Ground floor','First floor','Second floor','Third floor','Fourth floor','Fifth floor','Sixth floor'];PL.floors.push({n:nm_[PL.floors.length]||`Floor ${PL.floors.length}`,a:(PL.floors[PL.floors.length-1]||{}).a||''});render();return;}
  if(id==='plHolBtn'){PL.showHol=!PL.showHol;render();return;}
  if(id==='plUndo'){PL.ed={};render();return;}
  if(id==='plStdSave'){const o={scope:PL.scope,custom:plCus()};write(()=>db.doc('org/main').update({plStd:o}),'Saved as your company standard scope list');return;}
  if(id==='plStdOrig'){PL.custom=[];PL_SCOPE.forEach(([k,,,on])=>PL.scope[k]=!!on);render();toast('BuildMitr default list. Save as company standard to keep it.');return;}
  if(id==='plSave'){plSave();return;}
  if(id==='plShare'){shareSheet('Work schedule',plText());return;}
},true);
document.addEventListener('submit',e=>{if(e.target.id==='tcForm'){e.preventDefault();taskCommentAdd(e.target);}
  if(e.target.id==='plItemForm'){e.preventDefault();const f=e.target,g=k=>(f.elements[k].value||'').trim(),key='cu'+Date.now().toString(36);
    PL.custom=[...plCus(),{key,title:g('title'),grp:g('grp'),wd:Math.max(1,Math.round(n(g('wd')))),after:g('after'),wet:f.elements.wet.checked}];PL.scope[key]=true;render();toast('Added to the schedule');}},true);

/* ================= Quotation & invoice maker (on each organisation's own letterhead) =================
 * One layout (A4, mm) feeds three outputs: the on-screen preview (canvas), the PDF and an editable PowerPoint,
 * so they always match. Letterhead = a full-page A4 image uploaded in Settings; without one, a plain header is drawn. */
Object.assign(ICONS,{'file-text':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'presentation':'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>'});
const DOC_DEF={
  Quotation:{title:'QUOTATION',salute:'Dear Sir / Madam,',intro:'We are pleased to submit our quotation for the work detailed below:',details:[['Project',''],['Location',''],['Services','']],
    items:[],terms:'This quotation is valid for 30 days from the date above.\nGST extra as applicable.',scopeTitle:'SCOPE OF WORK',scope:'',stagesTitle:'SCHEDULE OF PAYMENT',stages:[],newPage:true,closing:'Thanking you,'},
  Invoice:{title:'TAX INVOICE',subject:'',items:[{d:'',amt:''}],terms:'',showBank:true}};
const DOC_PRESETS={"Quotation": [["Standard quotation", {}], ["Architecture & interior services (letter of appointment)", {"title": "ARCHITECTURE AND INTERIOR SERVICES", "salute": "Dear Sir,", "intro": "We have great pleasure in rendering our Comprehensive Architectural services as detailed below :", "details": [["Project", "Residence"], ["Services", "Architectural and Interior"], ["Fees", "77/- per sqft"]], "terms": "This letter of appointment, together with the scope of Architectural and Interior services and the accompanying fee schedule, shall constitute the terms governing this agreement.\nA duplicate copy of this letter is enclosed. Kindly sign and return one copy as confirmation of your acceptance.", "closing": "Thanking You,", "scopeTitle": "A R C H I T E C T U R E     S E R V I C E S     S C O P E", "scope": "Taking Client's instructions and preparation of design brief\nSite evaluation and analysis\nArchitectural floor plans\nInterior design / space planning / development and volumetric study\nDesign of fixed items of work, loose furniture, and interior related civil work\nSelection of materials, equipment, and other interior related elements\nIllumination design\nElectrical, electronic design\nSanitary plumbing, drainage, water supply, and sewerage design\nIntegration of all engineering services\nInteriors (3D and virtual reality)\nDetailed working drawings of interiors\nScheduled site visit for each set", "stagesTitle": "SCHEDULE OF PAYMENT", "stages": [["Advance", "10"], ["Final plan & 3D with execution drawings", "20"], ["Electrical & plumbing drawings", "20"], ["Working drawings", "20"], ["3D view interiors", "10"], ["Material selections", "10"], ["Successful completion", "10"]], "newPage": true}], ["Construction quotation", {"title": "QUOTATION FOR CONSTRUCTION", "salute": "Dear Sir / Madam,", "intro": "We are pleased to submit our quotation for the construction of your building as detailed below:", "details": [["Project", ""], ["Location", ""], ["Built-up area", ""], ["Specification", ""]], "terms": "Rates are valid for 30 days from the date above.\nGST extra as applicable. Approvals, borewell and electricity deposits are not included unless listed above.", "closing": "Thanking you,", "scopeTitle": "SCOPE OF WORK", "scope": "Excavation, foundations and plinth\nRCC frame, slabs and staircase\nBlock work and plastering\nWaterproofing\nFlooring and tiling\nDoors and windows\nElectrical and plumbing\nPainting\nHandover with cleaning", "stagesTitle": "SCHEDULE OF PAYMENT", "stages": [["Booking / agreement", "5"], ["Foundation & footings", "10"], ["Plinth beam", "5"], ["Each roof slab", "30"], ["Brickwork", "10"], ["Plastering", "10"], ["Flooring & tiling", "10"], ["Doors, windows, electrical & plumbing", "10"], ["Painting & handover", "10"]], "newPage": true}]], "Invoice": [["Tax invoice", {}], ["Architectural invoice (stage payment)", {"title": "ARCHITECTURAL INVOICE", "showBank": true, "terms": ""}]]};
const docIsQ=k=>k==='Quotation';
const DOC_TKEYS={Quotation:['title','salute','intro','details','items','terms','closing','scopeTitle','scope','stagesTitle','stages','newPage','gst'],Invoice:['title','subject','items','terms','showBank','gst']};
const docTpls=kind=>((orgMain().docTs)||[]).filter(x=>x.kind===docTplKey(kind)).map(x=>({...x,def:(orgMain().docTdef||{})[x.kind]===x.id}));
/* → estimates: docTplPick */
/* → estimates: docTplSave */
const docTplKey=k=>docIsQ(k)?'Quotation':'Invoice';
const orgMain=()=>D.org.find(o=>o.id==='main')||{};
/* design schedule sections (Architecture, Structure, 3D views, Interiors…): the admin can edit the list */
/* boxes that can be closed / opened (remembered on this device) */
let FOLD={};try{FOLD=JSON.parse(localStorage.getItem('bm-fold')||'{}')||{};}catch(_){}
const folded=k=>!!FOLD[k];
const foldBtn=(k,open)=>`<button type="button" class="btn sm ghost fold-b" data-fold="${k}" aria-expanded="${!folded(k)}" aria-label="${folded(k)?'Open':'Close'}">${ico('chevron-down')}</button>`;
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fold]');if(!b)return;const k=b.dataset.fold;FOLD[k]=!FOLD[k];try{localStorage.setItem('bm-fold',JSON.stringify(FOLD));}catch(_){}render();});
const DS_SEC_DEF=['Project management','Architecture','Structure','3D views','MEP','Interiors'];
const dsSecs=()=>{const l=orgMain().dsSecs;return Array.isArray(l)&&l.length?l:DS_SEC_DEF;};
const secOf=t=>{const d=String(t.disc||'');return d==='3D & elevation'?'3D views':(d||'Other');};
const inr2=x=>'₹'+(+x||0).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
const fdLong=s=>s?new Date(s+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}):'';
function inWords(v){v=Math.round(+v||0);if(!v)return 'Zero';
  const a=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'],b=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const two=x=>x<20?a[x]:b[Math.floor(x/10)]+(x%10?' '+a[x%10]:''),three=x=>(x>=100?a[Math.floor(x/100)]+' Hundred'+(x%100?' ':''):'')+(x%100?two(x%100):'');
  const p=[[1e7,'Crore'],[1e5,'Lakh'],[1e3,'Thousand']];let out=[];for(const [d,nm_] of p){if(v>=d){out.push(three(Math.floor(v/d))+' '+nm_);v%=d;}}if(v)out.push(three(v));return out.join(' ');}
function docNextNo(kind){
  const q=docIsQ(kind),y=new Date().getFullYear(),pre=q?'QT':(orgVal('invPrefix')||'INV');
  const same=D.invoices.filter(r=>docIsQ(r.kind)===q&&String(r.no||'').includes(String(y)));
  const mx=same.reduce((m,r)=>{const x=+(String(r.no).match(/(\d+)\s*$/)||[])[1]||0;return Math.max(m,x);},0);
  return `${pre}-${y}-${String(mx+1).padStart(3,'0')}`;
}
/* → estimates: docTpl */
let DM=null;   // the document being edited
/* → estimates: docBlank */
/* → estimates: docFromRec */
/* → estimates: docOpen */
/* → estimates: docNew */
/* → estimates: docClient */
const docSub=d=>(d.items||[]).reduce((s,x)=>s+n(x.amt),0);
function docTotals(d){const sub=docSub(d),rate=GST[d.gst]||0,c=D.clients.find(x=>x.id===d.client)||{},os=orgVal('state'),cs=c.state||'',inter=!!(os&&cs&&os!==cs);
  const tax=sub*rate;return {sub,rate,tax,inter,total:sub+tax,got:n(d.got)};}

/* ---------- layout ---------- */
let MCTX=null;
function mW(t,s,b){if(!MCTX)MCTX=document.createElement('canvas').getContext('2d');MCTX.font=`${b?'bold ':''}${s}px Arial, Helvetica, sans-serif`;return MCTX.measureText(t).width*0.3528;}
function wrap(t,w,s,b){const out=[];String(t??'').split('\n').forEach(par=>{if(!par.trim()){out.push('');return;}if(mW(par,s,b)<=w){out.push(par);return;}let line='';par.split(/\s+/).forEach(word=>{const x=line?line+' '+word:word;if(mW(x,s,b)<=w||!line)line=x;else{out.push(line);line=word;}});out.push(line);});return out;}
function docLayout(d,org){
  const lh=org.lh&&org.lh.id?org.lh:null,top=lh?+lh.top||45:36,bot=lh?+lh.bottom||40:22,X=20,R=190,W=170,pages=[];let pg,y;
  const head=()=>{if(lh)return;pg.push({k:'p',x:X,y:12,w:W,s:16,b:1,lines:[org.name||'Your company'],c:'1f3a2e'});
    const ct=[org.address,org.phone,org.email].filter(Boolean).join('  ·  ');if(ct)pg.push({k:'p',x:X,y:20,w:W,s:8.5,lines:wrap(ct,W,8.5),c:'555555'});
    pg.push({k:'l',x1:X,y1:29,x2:R,y2:29,c:'2f6b4f',t:0.6});pg.push({k:'l',x1:X,y1:297-14,x2:R,y2:297-14,c:'cccccc',t:0.3});
    if(org.gstin)pg.push({k:'p',x:X,y:297-12,w:W,s:7.5,lines:['GSTIN: '+org.gstin],c:'777777'});};
  const page=()=>{pg=[];pages.push(pg);y=top;head();};page();
  const lhOf=s=>s*0.3528*1.35;
  const need=h=>{if(y+h>297-bot)page();};
  const P=(t,o={})=>{const s=o.s||10,w=o.w||W,lines=wrap(t,w,s,o.b);need(Math.min(lines.length,2)*lhOf(s));
    let i=0;while(i<lines.length){const fit=Math.max(1,Math.floor((297-bot-y)/lhOf(s)));const part=lines.slice(i,i+fit);
      pg.push({k:'p',x:o.al==='c'?105:o.al==='r'?(o.x||R):(o.x||X),y,w,s,b:o.b,al:o.al,lines:part,c:o.c});y+=part.length*lhOf(s);i+=fit;if(i<lines.length)page();}
    y+=o.after??1.5;return lines.length;};
  const gap=mm=>{y+=mm;};
  const line=(c,t)=>pg.push({k:'l',x1:X,y1:y,x2:R,y2:y,c:c||'999999',t:t||0.3});
  const row=(cols,o={})=>{const s=o.s||10;const ls=cols.map(c=>wrap(c.t,c.w,c.s||s,c.b||o.b));const h=Math.max(...ls.map(l=>l.length))*lhOf(s);need(h+2);
    cols.forEach((c,i)=>{if(ls[i].length&&ls[i].join(''))pg.push({k:'p',x:c.x,y,w:c.w,s:c.s||s,b:c.b||o.b,al:c.al,lines:ls[i],c:c.c});});y+=h+(o.after??1.5);};
  const kv=(l,v,o={})=>row([{t:l,x:X,w:38},{t:':',x:X+38,w:4},{t:v,x:X+44,w:W-44,b:o.b}],{s:o.s||10,after:2.2});
  const t=docTotals(d),q=docIsQ(d.kind);
  const table=()=>{const its=(d.items||[]).filter(x=>String(x.d||'').trim()||n(x.amt));if(!its.length)return;
    gap(2);line('555555',0.4);gap(1.5);row([{t:'#',x:X,w:8,b:1},{t:'Description',x:X+10,w:118,b:1},{t:'Amount',x:R,w:40,al:'r',b:1}],{s:9.5,after:1});line('555555',0.4);gap(2);
    its.forEach((x,i)=>row([{t:String(i+1),x:X,w:8},{t:x.d,x:X+10,w:118},{t:x.amt!==''?inr2(x.amt):'',x:R,w:40,al:'r'}],{s:10,after:2}));
    line('bbbbbb');gap(2);if(!t.sub)return;
    if(t.rate){row([{t:'Sub-total',x:X+10,w:118},{t:inr2(t.sub),x:R,w:40,al:'r'}],{after:1.2});
      if(t.inter)row([{t:`IGST @ ${t.rate*100}%`,x:X+10,w:118},{t:inr2(t.tax),x:R,w:40,al:'r'}],{after:1.2});
      else{row([{t:`CGST @ ${t.rate*50}%`,x:X+10,w:118},{t:inr2(t.tax/2),x:R,w:40,al:'r'}],{after:1.2});row([{t:`SGST @ ${t.rate*50}%`,x:X+10,w:118},{t:inr2(t.tax/2),x:R,w:40,al:'r'}],{after:1.2});}}
    row([{t:'Total',x:X+10,w:118,b:1},{t:inr2(t.total),x:R,w:40,al:'r',b:1}],{s:11,after:1.2});
    if(!q&&t.got){row([{t:'Received',x:X+10,w:118},{t:inr2(t.got),x:R,w:40,al:'r'}],{after:1.2});row([{t:'Balance due',x:X+10,w:118,b:1},{t:inr2(t.total-t.got),x:R,w:40,al:'r',b:1}],{s:11,after:1.2});}
    P(`(Rupees ${inWords(q||!t.got?t.total:t.total-t.got)} only)`,{s:9,c:'555555',after:2});};
  const sign=(client)=>{const sh=org.sig&&org.sig.id?16:0;need(26+sh);gap(8);const y0=y;
    if(client)pg.push({k:'p',x:X,y:y0+sh+8,w:70,s:10,lines:["Client's signature"]});
    pg.push({k:'p',x:R,y:y0,w:80,s:10,b:1,al:'r',lines:['For '+(org.name||'')]});
    if(sh)pg.push({k:'i',key:'sig',x:R-38,y:y0+5,w:38,h:sh});
    pg.push({k:'p',x:R,y:y0+sh+8,w:80,s:10,al:'r',lines:[org.person||'Authorised signatory']});
    if(org.person)pg.push({k:'p',x:R,y:y0+sh+12.8,w:80,s:8.5,al:'r',c:'555555',lines:['Authorised signatory']});y=y0+sh+20;};
  P(d.title||'',{s:14,b:1,al:'c',after:5});
  if(q){
    row([{t:d.no?`Ref: ${d.no}`:'',x:X,w:85,s:9},{t:`Date: ${fdLong(d.date)}`,x:R,w:85,s:9,al:'r'}],{after:4});
    kv('From',org.name||'',{b:1});kv('To',[d.toName,d.toAddr].filter(Boolean).join('\n'),{b:0});gap(3);
    if(d.salute)P(d.salute,{after:2.5});if(d.intro)P(d.intro,{after:3});
    (d.details||[]).filter(x=>String(x[0]||'').trim()&&String(x[1]||'').trim()).forEach(([l,v])=>kv(l,v));
    table();gap(2);
    String(d.terms||'').split('\n').filter(s=>s.trim()).forEach(s=>P(s,{after:2.5}));
    if(d.closing){gap(2);P(d.closing,{after:1});}
    sign(true);
    const sc=String(d.scope||'').split('\n').map(s=>s.trim()).filter(Boolean);
    if(sc.length){if(d.newPage)page();else gap(6);P(d.scopeTitle||'SCOPE OF WORK',{b:1,s:11,after:3});sc.forEach(s=>{const lines=wrap(s.replace(/^[-•*]\s*/,''),W-8,10);need(lhOf(10));pg.push({k:'p',x:X+2,y,w:5,s:10,lines:['•']});P(s.replace(/^[-•*]\s*/,''),{x:X+8,w:W-8,after:1.8});});}
    const st=(d.stages||[]).filter(x=>String(x[0]||'').trim());
    if(st.length){if(d.newPage)page();else gap(6);P(d.stagesTitle||'SCHEDULE OF PAYMENT',{b:1,s:11,after:3});
      const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];line('555555',0.4);gap(1.5);
      row([{t:'Stage',x:X,w:18,b:1},{t:'Description',x:X+20,w:100,b:1},{t:'%',x:R-42,w:14,al:'r',b:1},{t:'Amount',x:R,w:28,al:'r',b:1}],{s:9.5,after:1});line('555555',0.4);gap(2);
      st.forEach((x,i)=>row([{t:'Stage '+(roman[i]||i+1),x:X,w:18},{t:x[0],x:X+20,w:100},{t:n(x[1])?n(x[1])+'%':'',x:R-42,w:14,al:'r'},{t:t.sub&&n(x[1])?inr2(t.sub*n(x[1])/100):'',x:R,w:28,al:'r'}],{after:2}));
      const pc=st.reduce((s,x)=>s+n(x[1]),0);line('bbbbbb');gap(2);row([{t:'Total',x:X+20,w:100,b:1},{t:pc+'%',x:R-42,w:14,al:'r',b:1},{t:t.sub?inr2(t.sub*pc/100):'',x:R,w:28,al:'r',b:1}],{after:2});}
  }else{
    const from=[org.person,org.phone,[org.name,org.address].filter(Boolean).join(', '),org.email,org.gstin?'GSTIN: '+org.gstin:''].filter(Boolean).join('\n');
    const meta=[`No: ${d.no||''}`,`Date: ${fdLong(d.date)}`,d.project?`Project: ${pname(d.project)}`:''].filter(Boolean).join('\n');
    row([{t:from,x:X,w:100,s:9.5},{t:meta,x:R,w:65,s:9.5,al:'r'}],{after:4});
    P('Bill To:',{s:9.5,c:'555555',after:0.5});P(d.toName||'',{b:1,after:0.5});if(d.toAddr)P(d.toAddr,{s:9.5,after:0.5});if(d.toPhone)P(d.toPhone,{s:9.5,after:0.5});
    gap(3);if(d.subject)P(d.subject,{b:1,after:2});
    table();
    const bank=[org.acc?`Account number : ${org.acc}`:'',org.bank?`Bank name : ${org.bank}`:'',org.acctype?`Account type : ${org.acctype}`:'',org.holder?`Holder's name : ${org.holder}`:'',org.ifsc?`IFSC code : ${org.ifsc}`:'',org.upi?`UPI ID : ${org.upi}`:''].filter(Boolean);
    if(d.showBank&&bank.length){gap(4);P('Bank details:',{b:1,s:10,after:1});bank.forEach(s=>P(s,{s:9.5,after:0.6}));}
    String(d.terms||'').split('\n').filter(s=>s.trim()).forEach((s,i)=>{if(!i)gap(3);P(s,{s:9,c:'444444',after:1.5});});
    sign(false);
  }
  return {pages,lh};
}
/* ---------- images (letterhead / signature) ---------- */
const DOCIMG={};
function docImg(id){if(!id)return Promise.resolve(null);if(DOCIMG[id])return DOCIMG[id];
  DOCIMG[id]=bmBlob(id).then(r=>r.blob()).then(b=>new Promise((ok,no)=>{const fr=new FileReader();fr.onload=()=>ok(fr.result);fr.onerror=no;fr.readAsDataURL(b);}))
    .then(url=>new Promise(ok=>{const im=new Image();im.onload=()=>ok({url,im});im.onerror=()=>ok(null);im.src=url;})).catch(()=>{delete DOCIMG[id];return null;});return DOCIMG[id];}
async function docDraw(pages,org,PX){
  const lh=await docImg(org.lh&&org.lh.id),sig=await docImg(org.sig&&org.sig.id);
  return pages.map(items=>{const cv=document.createElement('canvas');cv.width=210*PX;cv.height=297*PX;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);
    if(lh)g.drawImage(lh.im,0,0,cv.width,cv.height);g.textBaseline='top';
    items.forEach(it=>{if(it.k==='l'){g.strokeStyle='#'+(it.c||'999999');g.lineWidth=(it.t||0.3)*PX;g.beginPath();g.moveTo(it.x1*PX,it.y1*PX);g.lineTo(it.x2*PX,it.y2*PX);g.stroke();return;}
      if(it.k==='i'){if(it.key==='sig'&&sig){const r=Math.min(it.w/sig.im.width,it.h/sig.im.height);const w=sig.im.width*r,h=sig.im.height*r;g.drawImage(sig.im,(it.x+it.w-w)*PX,(it.y+it.h-h)*PX,w*PX,h*PX);}return;}
      g.fillStyle='#'+(it.c||'1a1a1a');g.font=`${it.b?'bold ':''}${it.s*0.3528*PX}px Arial, Helvetica, sans-serif`;g.textAlign=it.al==='c'?'center':it.al==='r'?'right':'left';
      it.lines.forEach((l,i)=>g.fillText(l,it.x*PX,(it.y+i*it.s*0.3528*1.35)*PX+it.s*0.3528*0.12*PX));});
    return cv;});
}
let DMT=0;
async function docPreview(){const box=document.getElementById('dmPrev');if(!box||!DM)return;const my=++DMT;const org=orgMain();
  const {pages}=docLayout(DM.d,org);const cvs=await docDraw(pages,org,4);if(my!==DMT)return;
  box.innerHTML='';cvs.forEach((c,i)=>{c.className='dm-page';c.setAttribute('aria-label',`Page ${i+1}`);box.appendChild(c);});
  const t=docTotals(DM.d),s=document.getElementById('dmTot');if(s)s.textContent=`${pages.length} page${pages.length>1?'s':''} · Total ${inr2(t.total)}`;}
const docQ=()=>{clearTimeout(docQ.t);docQ.t=setTimeout(docPreview,220);};
/* ---------- outputs ---------- */
function loadJs(src,ok){if(ok())return Promise.resolve();return new Promise((res,rej)=>{const j=document.createElement('script');j.src=src;j.onload=res;j.onerror=()=>rej(new Error('Could not load '+src));document.head.appendChild(j);});}
const docFile=d=>`${(d.title||d.kind)} ${d.no||''} ${d.toName||''}`.replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-')||'document';
/* → estimates: docPdfBlob */
/* → estimates: docPdf */
/* → estimates: docPptx */
function docText(){const d=DM.d.mode==='upload'?{...DM.d,title:''}:DM.d,t=docTotals(d),org=orgMain(),q=docIsQ(d.kind);
  return [`Dear ${d.toName||'Sir/Madam'},`,'',q?`Please find our ${d.title?d.title.toLowerCase():'quotation'} (${d.no}) dated ${fdLong(d.date)}.`:`Please find ${d.title?d.title.toLowerCase():'invoice'} ${d.no} dated ${fdLong(d.date)}${d.subject?' — '+d.subject.replace(/\.+$/,''):''}.`,
    ...(d.items||[]).filter(x=>x.d).map(x=>`• ${x.d}${x.amt!==''?': '+inr2(x.amt):''}`),`*Total: ${inr2(t.total)}*${t.rate?` (incl. GST ${t.rate*100}%)`:''}`,
    !q&&t.got?`Received: ${inr2(t.got)} · Balance: ${inr2(t.total-t.got)}`:'',!q&&org.upi?`UPI: ${org.upi}`:'','',`Thank you,`,org.person||'',org.name||'',org.phone||''].filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n').trim();}
/* → estimates: docShareFile */
/* → estimates: docSave */
/* ---------- page ---------- */
/* → estimates: vDocMaker */
/* ---------- a quotation or invoice already made elsewhere (PDF, Word, Excel or a photo): upload it and keep it with the others ---------- */
const DM_UP_ACCEPT='.pdf,.doc,.docx,.xls,.xlsx,.odt,.ods,image/*';
/* → estimates: docUpPage */
let DMURL=null;
/* → estimates: docUpShow */
/* → estimates: docUpBlob */
/* → estimates: docUpFile */
/* ---------- settings: letterhead, signature, billing details ---------- */
function letterheadBox(){
  if(!isAdmin())return '';const o=orgMain(),lh=o.lh||{};
  return `<div class="box" id="lhBox"><div class="box-h">${ico('file-text')}<h2>Letterhead for quotations & invoices</h2></div>
   <div class="lh-wrap"><div class="lh-thumb">${lh.id?`<img src="/_blob/${esc(lh.id)}" alt="Your letterhead">`:'<div class="code">No letterhead yet — a plain header with your company name is used.</div>'}</div>
   <form id="lhForm" class="e2form" style="flex:1">
    <label class="wide">Letterhead — full A4 page image (PNG or JPG, portrait)<input type="file" id="lh-file" accept="image/png,image/jpeg"></label>
    <label>Space at top (mm)<input id="lh-top" value="${esc(lh.top||45)}" inputmode="decimal"></label><label>Space at bottom (mm)<input id="lh-bot" value="${esc(lh.bottom||40)}" inputmode="decimal"></label>
    <label class="wide">Signature or stamp (optional, PNG)<input type="file" id="lh-sig" accept="image/png,image/jpeg"></label>
    <label>Contact person on documents<input id="lh-person" value="${esc(o.person||'')}" placeholder="e.g. Asresha Reddy"></label><label>Email on documents<input id="lh-email" value="${esc(o.email||'')}" placeholder="name@gmail.com"></label>
    <label>Account holder's name<input id="lh-holder" value="${esc(o.holder||'')}"></label><label>Account type<input id="lh-acctype" value="${esc(o.acctype||'')}" placeholder="Current / Savings"></label>
    <div class="srow" style="grid-column:1/-1;padding:0;border:0"><button class="btn pri">${ico('check')}<span>Save letterhead</span></button>${lh.id?`<button type="button" class="btn ghost" id="lhDel">Remove letterhead</button>`:''}${o.sig&&o.sig.id?`<button type="button" class="btn ghost" id="sigDel">Remove signature</button>`:''}
      <button type="button" class="btn" data-go="docmaker">${ico('file-text')}<span>Open quotations & invoices</span></button></div>
    <div class="code" style="grid-column:1/-1">Bank name, account number, IFSC and UPI are taken from the Company box above. Top and bottom space keep the text clear of your logo and footer.</div>
   </form></div></div>`;
}
/* → estimates: lhSave */
/* ---------- events ---------- */
document.addEventListener('input',e=>{if(S.view!=='docmaker'||!DM)return;const t=e.target,d=t.dataset||{},D_=DM.d;
  if(d.dm!==undefined){D_[d.dm]=t.value;if(D_.mode==='upload')docUpShow();else docQ();return;}
  if(d.dmup!==undefined){D_.items=D_.items&&D_.items.length?D_.items:[{d:'',amt:''}];D_.items[0][d.dmup]=t.value;docUpShow();return;}
  if(d.dmdl!==undefined){D_.details[+d.dmdl][0]=t.value;docQ();return;}if(d.dmdv!==undefined){D_.details[+d.dmdv][1]=t.value;docQ();return;}
  if(d.dmid!==undefined){D_.items[+d.dmid].d=t.value;t.style.height='auto';t.style.height=t.scrollHeight+'px';docQ();return;}if(d.dmia!==undefined){D_.items[+d.dmia].amt=t.value;docQ();return;}
  if(d.dmsn!==undefined){D_.stages[+d.dmsn][0]=t.value;docQ();return;}if(d.dmsp!==undefined){D_.stages[+d.dmsp][1]=t.value;docQ();return;}
},true);
document.addEventListener('change',e=>{if(S.view!=='docmaker'||!DM)return;const t=e.target,D_=DM.d;
  if(t.id==='dm-proj'){D_.project=t.value;const p=proj(t.value);if(p&&p.client&&!D_.client)docClient(p.client);render();return;}
  if(t.id==='dm-client'){if(t.value)docClient(t.value);else D_.client='';render();return;}
  if(t.id==='dm-preset'&&t.value!==''){const k=docTplKey(D_.kind);const tp=t.value.startsWith('n:')?((orgMain().docTs||[]).find(x=>x.id===t.value.slice(2))||{}).t:t.value==='org'?(orgMain().docT||{})[k]:{...DOC_DEF[k],...DOC_PRESETS[k][+t.value][1]};if(t.value.startsWith('n:'))DM.tname=((orgMain().docTs||[]).find(x=>x.id===t.value.slice(2))||{}).name;
    Object.assign(D_,JSON.parse(JSON.stringify({...DOC_DEF[k],...tp})));render();toast('Template applied — edit anything');return;}
  if(t.id==='dm-upfile'){const f=t.files&&t.files[0];t.value='';docUpFile(f);return;}
  if(t.id==='dm-np'){D_.newPage=t.checked;docQ();return;}if(t.id==='dm-bank'){D_.showBank=t.checked;docQ();return;}
  if(t.id==='dm-stage'&&t.value){const [rid,i]=t.value.split(':');const r=D.invoices.find(x=>x.id===rid);const s=r&&r.tpl.stages[+i];if(!s)return;
    const amt=Math.round(n(r.amount)*n(s[1])/100);D_.items=(D_.items||[]).filter(x=>String(x.d||'').trim()||n(x.amt));D_.items.push({d:`Stage ${+i+1} payment (${s[0]})`,amt:String(amt)});
    if(!D_.subject)D_.subject=`Stage ${+i+1} payment.`;if(!D_.client&&r.client)docClient(r.client);render();return;}
  if(t.dataset&&t.dataset.dm==='gst'||t.dataset&&t.dataset.dm==='status'){DM.d[t.dataset.dm]=t.value;if(DM.d.mode==='upload')docUpShow();else docQ();}
},true);
document.addEventListener('click',e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-doc^="invoices:"]');if(b){e.preventDefault();e.stopPropagation();docOpen(b.dataset.doc.split(':')[1]);return;}}
  {const b=e.target.closest('[data-dmnew]');if(b){docNew(b.dataset.dmnew);return;}}
  {const b=e.target.closest('[data-dmopen]');if(b){docOpen(b.dataset.dmopen);return;}}
  if(S.view==='docmaker'&&DM){
    {const b=e.target.closest('[data-dmkind]');if(b){const k=b.dataset.dmkind;if(docIsQ(k)!==docIsQ(DM.d.kind)){const keep={project:DM.d.project,client:DM.d.client,toName:DM.d.toName,toAddr:DM.d.toAddr,toPhone:DM.d.toPhone,toEmail:DM.d.toEmail,
        ...(DM.d.mode==='upload'?{mode:'upload',up:DM.d.up,items:DM.d.items,gst:DM.d.gst,no:DM.d.up?DM.d.no:docNextNo(k),date:DM.d.date}:{})};DM={id:null,d:docBlank(k,keep)};}else DM.d.kind=k;render();return;}}
    {const b=e.target.closest('[data-dmmode]');if(b){const up=b.dataset.dmmode==='upload';if(up===(DM.d.mode==='upload'))return;
      if(up){DM.keepItems=JSON.parse(JSON.stringify(DM.d.items||[]));const its=(DM.d.items||[]).filter(x=>String(x.d||'').trim()||n(x.amt));   // one line: all lines added up, so the amount and the total agree
        DM.d.items=[{d:its.map(x=>x.d).filter(Boolean).join('; '),amt:String(docSub(DM.d)||'')}];}
      else if(DM.keepItems){DM.d.items=DM.keepItems;DM.keepItems=null;}
      DM.d.mode=up?'upload':'';render();return;}}
    {const b=e.target.closest('[data-dmadd]');if(b){const k=b.dataset.dmadd;DM.d[k]=DM.d[k]||[];DM.d[k].push(k==='items'?{d:'',amt:''}:['','']);render();return;}}
    if(e.target.closest('[data-dmtdel]')){const tid=e.target.closest('[data-dmtdel]').dataset.dmtdel,o=orgMain(),x=(o.docTs||[]).find(y=>y.id===tid);if(!x||!confirm(`Delete template “${x.name}”?`))return;
    const patch={docTs:(o.docTs||[]).filter(y=>y.id!==tid)};if((o.docTdef||{})[x.kind]===tid){patch.docTdef={...o.docTdef,[x.kind]:''};patch.docT={...(o.docT||{}),[x.kind]:null};}write(()=>db.doc('org/main').update(patch),'Template deleted').then(()=>render());return;}
    {const b=e.target.closest('[data-dmrm]');if(b){const [k,i]=b.dataset.dmrm.split(':');DM.d[k].splice(+i,1);render();return;}}
  }
  const id=(e.target.closest('button')||{}).id;if(!id)return;
  if(id==='dmSave'){docSave();return;}if(id==='dmPdf'){docPdf();return;}if(id==='dmPptx'){docPptx();return;}
  if(id==='dmWa'){const ph=DM.d.toPhone;const u='https://wa.me/'+(ph?waNum(ph):'')+'?text='+encodeURIComponent(docText());const w=window.open(u,'_blank');if(w){try{w.opener=null;}catch(_){}}toast('Tip: “Send PDF file” attaches the PDF on a phone');return;}
  if(id==='dmMail'){const upm=DM.d.mode==='upload';if(upm&&!DM.d.up){toast('Upload the file first.');return;}location.href='mailto:'+encodeURIComponent(DM.d.toEmail||'')+'?subject='+encodeURIComponent(`${upm?DM.d.kind:(DM.d.title||DM.d.kind)} ${DM.d.no} — ${orgName()}`)+'&body='+encodeURIComponent(docText().replace(/\*/g,'')+(upm?'\n\n(file attached)':'\n\n(PDF attached)'));docPdf();return;}
  if(id==='dmFile'){docShareFile();return;}
  if(id==='dmMore'){shareSheet(`${DM.d.title||DM.d.kind} ${DM.d.no}`,docText(),DM.d.toPhone);return;}
  if(id==='dmTplSave'){const name=(document.getElementById('dm-tname').value||'').trim();if(!name){toast('Give the template a name, e.g. Template-1');return;}
    const def=document.getElementById('dm-tdef').checked;DM.tname=name;docTplSave(name,def);return;}
  if(id==='lhDel'){write(()=>db.doc('org/main').update({lh:null}),'Letterhead removed').then(()=>render());return;}
  if(id==='sigDel'){write(()=>db.doc('org/main').update({sig:null}),'Signature removed').then(()=>render());return;}
},true);
document.addEventListener('submit',e=>{if(e.target.id==='lhForm'){e.preventDefault();lhSave(e.target);}},true);

/* ================= Editing the activity schedule =================
 * Pencil on each activity opens a quick editor; when a finish date changes, the activities that follow can move by the same
 * number of days. "Edit as table" lets you change many activities in place; "Shift schedule" moves a whole stretch at once. */
const addD=(s,k)=>{if(!s)return s;const d=new Date(s+'T00:00');d.setDate(d.getDate()+k);return isoD(d);};
const dDiff=(a,b)=>Math.round((new Date(a+'T00:00')-new Date(b+'T00:00'))/864e5);
function schedFollowers(t,mode){
  const same=TS().filter(x=>x.project===t.project&&x.id!==t.id);
  if(mode==='later')return same.filter(x=>(x.start||x.due||'')>=(t.due||t.start||''));
  if(mode!=='linked'||!t.wbs)return [];
  const out=new Map(),q=[t];
  while(q.length){const cur=q.shift();if(!cur.wbs)continue;
    same.forEach(x=>{if(out.has(x.id))return;const ps=String(x.pred||'').split(/[,;\s]+/).map(s=>s.replace(/(FS|SS|FF|SF)([+-]\d+\s*d?)?$/i,'')).filter(Boolean);
      if(ps.includes(String(cur.wbs))){out.set(x.id,x);q.push(x);}});}
  return [...out.values()];
}
const recOf=r=>{const {id,...d}=r;return d;};
async function schedApply(t,patch,mode){if(patch&&patch.status)patch.status=trGate(TC(),t,patch.status);
  const delta=patch.due&&t.due?dDiff(patch.due,t.due):0;const list=[[TC(),t.id,{...recOf(t),...patch}]];
  if(delta&&mode&&mode!=='none')schedFollowers(t,mode).forEach(x=>list.push([TC(),x.id,{...recOf(x),start:addD(x.start,delta),due:addD(x.due,delta)}]));
  const ok=await write(()=>dbBatch(list),list.length>1?`Saved · ${list.length-1} following ${list.length-1===1?'activity':'activities'} moved ${delta>0?'+':''}${delta} days`:'Saved');
  return ok;
}
/* → planning: schedEdit */
document.addEventListener('submit',async e=>{if(e.target.id!=='seForm')return;e.preventDefault();const f=e.target,t=TS().find(x=>x.id===f.dataset.task);if(!t)return;
  const g=k=>f.elements[k].value;const patch={title:g('title').trim(),start:g('start'),due:g('due'),progress:g('progress')===''?'':Math.max(0,Math.min(100,n(g('progress')))),status:g('status'),who:g('who'),resource:g('resource'),notes:g('notes')};
  if(patch.status==='Completed')patch.progress=100;if(patch.start&&patch.due&&patch.due<patch.start){toast('Finish is before start.');return;}
  if(await schedApply(t,patch,g('mode'))){document.getElementById('layer').innerHTML='';render();}},true);
/* table editing */
Object.assign(ICONS,{'list-ordered':ICONS['list-ordered']||'<path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>'});
/* edit the whole schedule as a table: number, name, dates, days, progress, status, links; add, delete, duplicates */
const schDupKey=t=>[t.project,String(t.title||'').trim().toLowerCase(),t.start||'',t.due||''].join('|');
function schDups(ts){const seen={},d=[];ts.forEach(t=>{const k=schDupKey(t);if(seen[k])d.push(t);else seen[k]=t;});return d;}
/* section drop-down (design schedule) + "assigned to" filter */
function schPeople(){return D.team.filter(t=>t.account&&t.role!=='Client'&&t.status!=='Removed');}
function schFilterBar(all,DS){const secs=[...new Set([...dsSecs(),...all.map(secOf)])].filter(x=>all.some(t=>secOf(t)===x)||dsSecs().includes(x));
  const cnt=x=>all.filter(t=>secOf(t)===x).length,ppl=schPeople();
  return `<div class="box sch-f">${DS?`<label class="code">Section<select id="dsSec"><option value="all">All sections (${all.length})</option>${secs.map(x=>`<option value="${esc(x)}" ${S.dsSec===x?'selected':''}>${esc(x)} (${cnt(x)})</option>`).join('')}</select></label>`:''}
    <label class="code">Assigned to<select id="schWho"><option value="all">Everyone</option><option value="none" ${S.schWho==='none'?'selected':''}>Not assigned yet</option>${ppl.map(p=>`<option value="${esc(p.account)}" ${S.schWho===p.account?'selected':''}>${esc(p.name)} (${all.filter(t=>t.who===p.account).length})</option>`).join('')}</select></label>
    ${DS&&!S.schedTable?`<button type="button" class="btn sm ghost" id="dsFoldAll">${S.dsFold&&S.dsFold.size?'Open all sections':'Close all sections'}</button>`:''}
    ${DS&&isAdmin()?`<button type="button" class="btn sm" id="dsSecEdit">${ico('pencil')}<span>Edit sections</span></button>`:''}</div>`;}
/* → planning: dsSecForm */
function schedTable(ts,DS){
  if(!S.stSel)S.stSel=new Set();const sel=S.stSel;[...sel].forEach(id=>{if(!ts.some(t=>t.id===id))sel.delete(id);});
  if(S.stSort==='date')ts=[...ts].sort((a,b)=>String(a.s).localeCompare(String(b.s))||schWbsKey(a.wbs).localeCompare(schWbsKey(b.wbs)));
  const dups=new Set(schDups(ts).map(t=>t.id)),SO=MOD.tasks.fields.find(f=>f.k==='status').o,PPL=schPeople();
  return `<div class="box"><div class="box-h" style="flex-wrap:wrap;gap:8px"><h2>Edit activities</h2>
    <label class="code" style="display:flex;gap:6px;align-items:center">Sort by<select id="st-sort"><option value="wbs" ${S.stSort!=='date'?'selected':''}>number</option><option value="date" ${S.stSort==='date'?'selected':''}>start date</option></select></label>
    <label class="code" style="display:flex;gap:6px;align-items:center">When a finish date changes:<select id="st-mode"><option value="linked" ${S.stMode==='linked'||!S.stMode?'selected':''}>move linked activities</option><option value="later" ${S.stMode==='later'?'selected':''}>move all later activities</option><option value="none" ${S.stMode==='none'?'selected':''}>move only that one</option></select></label></div>
  <div class="srow st-bar">${S.proj!=='all'?`<button type="button" class="btn sm" id="stAdd">${ico('plus')}<span>Add row</span></button>`:''}
    <button type="button" class="btn sm" id="stRenum" title="Number the activities 1, 2, 3… in the order shown">${ico('list-ordered')}<span>Renumber</span></button>
    ${dups.size?`<button type="button" class="btn sm warn" id="stDups">${ico('copy')}<span>Remove ${dups.size} duplicate${dups.size>1?'s':''}</span></button>`:''}
    <select id="stWhoSel" ${sel.size?'':'disabled'} aria-label="Assign selected to"><option value="">Assign selected to…</option>${PPL.map(p=>`<option value="${esc(p.account)}">${esc(p.name)}</option>`).join('')}<option value="-">Nobody (unassign)</option></select>
    ${DS?`<select id="stSecSel" ${sel.size?'':'disabled'} aria-label="Move selected to section"><option value="">Move selected to section…</option>${dsSecs().map(x=>`<option>${esc(x)}</option>`).join('')}</select>`:''}
    <button type="button" class="btn sm ${sel.size?'warn':''}" id="stDelSel" ${sel.size?'':'disabled'}>${ico('trash-2')}<span>${sel.size&&S.stSure&&Date.now()-S.stSure<8000?'Tap again to delete '+sel.size:'Delete selected'+(sel.size?' ('+sel.size+')':'')}</span></button>
    <button type="button" class="btn sm" id="schedXls">${ico('file-down')}<span>Download Excel</span></button><button type="button" class="btn sm" data-import="1">${ico('file-up')}<span>Upload Excel</span></button></div>
  <div class="tbl-wrap"><table class="pl-tbl st-tbl"><thead><tr><th><input type="checkbox" id="stAll" aria-label="Select all" ${sel.size&&sel.size===ts.length?'checked':''}></th><th>No.</th><th>Activity</th>${DS?'<th>Section</th>':''}<th>Assigned to</th><th>Start</th><th>Finish</th><th class="num">Days</th><th class="num">Progress</th><th>Status</th><th>After</th><th></th></tr></thead><tbody>
  ${ts.map(t=>`<tr class="${dups.has(t.id)?'st-dup':''}"><td><input type="checkbox" data-stsel="${t.id}" ${sel.has(t.id)?'checked':''} aria-label="Select ${esc(t.title||'')}"></td>
    <td><input data-st="${t.id}:wbs" value="${esc(t.wbs||'')}" style="width:62px" aria-label="Number"></td>
    <td><input data-st="${t.id}:title" value="${esc(t.title||'')}" style="min-width:220px;width:100%" aria-label="Activity">${S.proj==='all'?`<div class="code">${esc(pname(t.project))}</div>`:''}${dups.has(t.id)?'<span class="pill p-red">Duplicate</span>':''}</td>
    ${DS?`<td><select data-st="${t.id}:disc" aria-label="Section">${[...new Set([...dsSecs(),secOf(t)])].map(x=>`<option ${secOf(t)===x?'selected':''}>${esc(x)}</option>`).join('')}</select></td>`:''}
    <td><select data-st="${t.id}:who" aria-label="Assigned to" style="max-width:150px"><option value="">—</option>${PPL.map(p=>`<option value="${esc(p.account)}" ${t.who===p.account?'selected':''}>${esc(p.name)}</option>`).join('')}</select></td>
    <td><input type="date" data-st="${t.id}:start" value="${esc(t.start||'')}" aria-label="Start"></td><td><input type="date" data-st="${t.id}:due" value="${esc(t.due||'')}" aria-label="Finish"></td>
    <td class="num"><input data-st="${t.id}:days" value="${t.start&&t.due?dDiff(t.due,t.start)+1:''}" inputmode="numeric" style="width:54px;text-align:right" aria-label="Days"></td>
    <td class="num"><input data-st="${t.id}:progress" value="${esc(t.status==='Completed'?100:(t.progress??''))}" inputmode="numeric" style="width:58px;text-align:right" aria-label="Progress"></td>
    <td><select data-st="${t.id}:status" aria-label="Status">${SO.map(o=>`<option ${t.status===o?'selected':''}>${o}</option>`).join('')}</select></td>
    <td><input data-st="${t.id}:pred" value="${esc(t.pred||'')}" style="width:80px" placeholder="e.g. 2.1" aria-label="After (numbers)"></td>
    <td class="acts"><button type="button" class="btn sm ghost" data-sedit="${t.id}" aria-label="More">${ico('pencil')}</button><button type="button" class="btn sm ghost" data-tcm="${t.id}" aria-label="Details, history and comments">💬${((t.comments||[]).length+(t.log||[]).length)||''}</button>${t.status==='For review'||t.status==='Changes requested'?`<span class="pill ${trPill(t.status)}">${t.status==='For review'?'Review':'Corrections'}</span>`:''}</td></tr>`).join('')}
  </tbody></table></div><div class="code" style="padding:10px 16px">Changes save as soon as you leave a box. Changing <b>Days</b> moves the finish date. Edit many rows at once in Excel: <b>Download Excel</b> → change → <b>Upload Excel</b>.</div></div>`;
}
document.addEventListener('change',e=>{const t=e.target;if(t.id==='st-sort'){S.stSort=t.value;render();return;}
  if(t.id==='stAll'){S.stSel=new Set(t.checked?[...document.querySelectorAll('[data-stsel]')].map(x=>x.dataset.stsel):[]);render();return;}
  if(t.dataset&&t.dataset.stsel){if(!S.stSel)S.stSel=new Set();t.checked?S.stSel.add(t.dataset.stsel):S.stSel.delete(t.dataset.stsel);
    ['stWhoSel','stSecSel'].forEach(k=>{const x=document.getElementById(k);if(x)x.disabled=!S.stSel.size;});
    const b=document.getElementById('stDelSel');if(b){b.disabled=!S.stSel.size;b.classList.toggle('warn',!!S.stSel.size);b.querySelector('span').textContent=`Delete selected${S.stSel.size?' ('+S.stSel.size+')':''}`;}}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#stAdd,#stRenum,#stDups,#stDelSel');if(!b)return;
  const nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  const ts=TS().filter(t=>inProj(t)&&(t.start||t.due));
  if(b.id==='stAdd'){const last=ts.reduce((m,t)=>(t.due||'')>m?t.due:m,'');const st=last?addD(last,1):today();
    const nums=ts.map(t=>parseInt(String(t.wbs||'').split('.')[0])).filter(x=>!isNaN(x)),w=nums.length?String(Math.max(...nums)+1):'1';
    if(await write(()=>db.collection(TC()).add({project:S.proj,wbs:w,title:'New activity',start:st,due:addD(st,4),progress:0,status:'Not started',by:ME.id,at:Date.now()}),'Row added at the end — type its name'))
      {render();setTimeout(()=>{const x=[...document.querySelectorAll('[data-st$=":title"]')].find(i=>i.value==='New activity');if(x){x.scrollIntoView({block:'center'});x.focus();x.select();}},120);}return;}
  if(b.id==='stRenum'){const rows=[...document.querySelectorAll('[data-st$=":wbs"]')].map(x=>x.dataset.st.split(':')[0]);const by={};
    const list=rows.map((id,i)=>{const t=TS().find(x=>x.id===id);by[t.wbs||'']=String(i+1);return [t,String(i+1)];});
    const out=list.map(([t,w])=>[TC(),t.id,{...recOf(t),wbs:w,pred:String(t.pred||'').split(/\s*,\s*/).filter(Boolean).map(p=>by[p]||p).join(', ')}]);
    if(await write(()=>dbBatch(out),`Renumbered 1 to ${out.length}`))render();return;}
  if(b.id==='stDups'){const G={};ts.forEach(t=>(G[schDupKey(t)]=G[schDupKey(t)]||[]).push(t));const ids=[];
    Object.values(G).filter(g=>g.length>1).forEach(g=>{g.sort((a,c)=>((+c.progress||0)*10+(c.comments||[]).length)-((+a.progress||0)*10+(a.comments||[]).length));g.slice(1).forEach(t=>ids.push(t.id));});if(await write(async()=>{for(const id of ids)await db.doc(TC()+'/'+id).delete();},`${ids.length} duplicate${ids.length>1?'s':''} removed`))render();return;}
  if(b.id==='stDelSel'){const ids=[...(S.stSel||[])];if(!ids.length)return;if(!b.dataset.sure&&!(S.stSure&&Date.now()-S.stSure<8000)){b.dataset.sure=1;S.stSure=Date.now();b.querySelector('span').textContent=`Tap again to delete ${ids.length}`;return;}
    S.stSure=0;if(await write(async()=>{for(const id of ids)await db.doc(TC()+'/'+id).delete();},`${ids.length} activit${ids.length>1?'ies':'y'} deleted`)){S.stSel=new Set();render();}return;}});
document.addEventListener('change',async e=>{const t0=e.target;if(t0.id==='st-mode'){S.stMode=t0.value;return;}
  const k=t0.dataset&&t0.dataset.st;if(!k)return;const [id,fld]=k.split(':');const t=TS().find(x=>x.id===id);if(!t)return;
  let v=t0.value;if(fld==='progress')v=v===''?'':Math.max(0,Math.min(100,n(v)));if(fld==='title'&&!v.trim()){t0.value=t.title;return;}
  if(fld==='days'){const d=Math.round(n(v));if(!t.start||!(d>=1)){toast(t.start?'Days must be 1 or more':'Set the start date first');t0.value=t.start&&t.due?dDiff(t.due,t.start)+1:'';return;}await schedApply(t,{due:addD(t.start,d-1)},S.stMode||'linked');return;}
  if(fld==='disc'||fld==='who'){await write(()=>db.doc(TC()+'/'+id).update({[fld]:v}),fld==='who'?(v?'Assigned to '+pnm(v):'Unassigned'):'Moved to '+v);if(fld==='disc')render();return;}
  if(fld==='wbs'||fld==='pred'){v=v.trim();await write(()=>db.doc(TC()+'/'+id).update({[fld]:v}),'Saved');return;}
  const patch={[fld]:v};if(fld==='status'&&v==='Completed')patch.progress=100;
  if(fld==='start'&&t.start&&t.due&&v){patch.due=addD(t.due,dDiff(v,t.start));}   // moving the start keeps the duration
  if((patch.due||t.due)&&(patch.start||t.start)&&(patch.due||t.due)<(patch.start||t.start)){toast('Finish is before start.');t0.value=t[fld]||'';return;}
  await schedApply(t,patch,S.stMode||'linked');},true);
document.addEventListener('change',async e=>{const t=e.target;
  if(t.id==='dsSec'){S.dsSec=t.value;render();return;}
  if(t.id==='schWho'){S.schWho=t.value;render();return;}
  if((t.id==='stWhoSel'||t.id==='stSecSel')&&t.value){const ids=[...(S.stSel||[])];if(!ids.length)return;const who=t.id==='stWhoSel';const v=t.value==='-'?'':t.value;
    const out=ids.map(id=>TS().find(x=>x.id===id)).filter(Boolean).map(x=>[TC(),x.id,{...recOf(x),[who?'who':'disc']:v}]);
    if(await write(()=>dbBatch(out),who?`${out.length} activit${out.length>1?'ies':'y'} ${v?'assigned to '+pnm(v):'unassigned'}`:`${out.length} moved to ${v}`)){S.stSel=new Set();render();}}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-dsfold],#dsFoldAll,#dsSecEdit,#dsSecAdd,[data-dssecdel]');if(!b)return;
  if(b.dataset.dsfold!==undefined){if(!S.dsFold)S.dsFold=new Set();const k=b.dataset.dsfold;S.dsFold.has(k)?S.dsFold.delete(k):S.dsFold.add(k);render();return;}
  if(b.id==='dsFoldAll'){if(S.dsFold&&S.dsFold.size)S.dsFold=new Set();else S.dsFold=new Set(TS().filter(inProj).map(secOf));render();return;}
  if(b.id==='dsSecEdit'){dsSecForm();return;}
  if(b.id==='dsSecAdd'){document.getElementById('dsSecRows').insertAdjacentHTML('beforeend',`<div class="dle-row"><input data-dssec value="" data-old="" maxlength="40" placeholder="New section"><button type="button" class="btn sm ghost" data-dssecdel aria-label="Remove">${ico('x')}</button></div>`);return;}
  if(b.dataset.dssecdel!==undefined){b.closest('.dle-row').remove();return;}});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='dsSecForm')return;e.preventDefault();
  const rows=[...f.querySelectorAll('[data-dssec]')].map(i=>({n:i.value.trim(),o:i.dataset.old})).filter(r=>r.n);const list=[...new Set(rows.map(r=>r.n))];if(!list.length){toast('Keep at least one section');return;}
  const ren=rows.filter(r=>r.o&&r.o!==r.n),mv=[];ren.forEach(r=>(D.dtasks||[]).filter(t=>secOf(t)===r.o).forEach(t=>mv.push(['dtasks',t.id,{...recOf(t),disc:r.n}])));
  const ok=await write(async()=>{await db.doc('org/main').update({dsSecs:list});if(mv.length)await dbBatch(mv);},`Sections saved${mv.length?' · '+mv.length+' activities moved':''}`);if(ok){closeLayer();render();}});
/* shift a stretch of the schedule */
/* → planning: schedShiftDialog */
document.addEventListener('submit',async e=>{if(e.target.id!=='ssForm')return;e.preventDefault();const f=e.target;const pid=S.proj!=='all'?S.proj:f.elements.project.value,from=f.elements.from.value,k=Math.round(n(f.elements.days.value));
  if(!k){toast('Enter the number of days.');return;}
  const ts=TS().filter(t=>t.project===pid&&(t.start||t.due||'')>=from&&!(f.elements.open.checked&&t.status==='Completed'));
  if(!ts.length){toast('No activities start on or after that date.');return;}
  const ok=await write(()=>dbBatch(ts.map(t=>[TC(),t.id,{...recOf(t),start:addD(t.start,k),due:addD(t.due,k)}])),`${ts.length} activities moved ${k>0?'+':''}${k} days`);
  if(ok){document.getElementById('layer').innerHTML='';render();}},true);
document.addEventListener('click',e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-sedit]');if(b){e.stopPropagation();schedEdit(b.dataset.sedit);return;}}
  {const b=e.target.closest('[data-sedel]');if(b){const id=b.dataset.sedel;if(S.confirm!=='se'+id){S.confirm='se'+id;b.textContent='Tap again to delete';return;}S.confirm=null;
    write(()=>db.doc(TC()+'/'+id).delete(),'Activity deleted').then(ok=>{if(ok){document.getElementById('layer').innerHTML='';render();}});return;}}
  const id=(e.target.closest('button')||{}).id;
  if(id==='schedTbl'){S.schedTable=!S.schedTable;render();return;}
  if(id==='schedXls'){schedExport();return;}
  if(id==='schedShift'){schedShiftDialog();return;}
  if(id==='schedPlan'){plOpen(S.proj!=='all'?S.proj:'');return;}
},true);

/* ================= Open files inside the app ================= */
function fileIdOf(href){const m=String(href||'').match(/drive\.google\.com\/file\/d\/([\w-]+)|lh3\.googleusercontent\.com\/d\/([\w-]+)|\/_blob\/([\w-]+)/);return m?(m[1]||m[2]||m[3]):null;}
const appLink=id=>location.origin+location.pathname+'#f='+encodeURIComponent(id);
async function openFile(id,isImg,name,gal){
  const L=document.getElementById('layer');const tok=Date.now()+Math.random();OPENF.t=tok;OPENF.cur=id;
  OPENF.gal=gal&&gal.length>1&&gal.includes(id)?gal:null;const gi=OPENF.gal?OPENF.gal.indexOf(id):-1,gn=OPENF.gal?OPENF.gal.length:0;
  if(OPENF.gal)name=`Photo ${gi+1} of ${gn}`;
  const nav=OPENF.gal?`<button type="button" class="fv-nav fv-prev" data-fvgo="-1" aria-label="Previous photo" ${gi===0?'disabled':''}>${ico('chevron-left')}</button><button type="button" class="fv-nav fv-next" data-fvgo="1" aria-label="Next photo" ${gi===gn-1?'disabled':''}>${ico('chevron-right')}</button><span class="fv-count">${gi+1} / ${gn}</span>`:'';
  const shell=(body,extra='')=>`<div class="drawer fv"><div class="pane fv-pane"><div class="pane-h"><h2 style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(name||(isImg?'Photo':'File'))}</h2>${extra}
    <button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div><div class="pane-b" id="fvBody" style="padding:8px">${body}</div></div></div>`;
  L.innerHTML=shell(`<div class="fv-msg">${ico('loader')}<span>Opening ${esc(name||'the file')}…</span></div>`);
  let blob;try{blob=await (await bmBlob(id)).blob();}catch(e){if(OPENF.t===tok)L.innerHTML=shell(`<div class="fv-msg">${ico('lock')}<span>${esc(e.message||'Could not open this file.')}</span></div>`);return;}
  if(OPENF.t!==tok)return;
  const nm=name||BMF.name[id]||'File',type=blob.type||'',img=/^image\//.test(type),pdf=/pdf/.test(type)||/\.pdf$/i.test(nm);
  const fname=/\.[a-z0-9]{2,5}$/i.test(nm)?nm:(BMF.name[id]&&/\.[a-z0-9]{2,5}$/i.test(BMF.name[id])?BMF.name[id]:nm+(img?'.jpg':pdf?'.pdf':''));
  if(OPENF.u)URL.revokeObjectURL(OPENF.u);const u=OPENF.u=URL.createObjectURL(blob);OPENF.blob=blob;OPENF.fname=fname;
  const acts=`<button type="button" class="btn sm" data-fshare="${esc(id)}|${esc(nm)}|${esc(type)}|${esc(nm)}">${ico('share-2')}<span>Share</span></button>
    <button type="button" class="btn sm" data-fvdl>${ico('file-down')}<span>Download</span></button>${img||pdf?`<a class="btn sm ghost fv-tab" href="${u}" target="_blank" rel="noopener" aria-label="Open in a new tab">${ico('external-link')}</a>`:''}`;
  const body=img?`<div class="fv-img">${nav}<img src="${u}" alt="${esc(nm)}" style="max-width:100%;max-height:calc(100vh - 150px);display:block;margin:auto;border-radius:6px"></div>`
    :pdf?`<div id="fvPdf" class="fv-pdf"><div class="fv-msg">${ico('loader')}<span>Opening the PDF…</span></div></div>`
    :`<div class="fv-msg" style="flex-direction:column">${ico(fileIco({name:fname,type}))}<b>${esc(fname)}</b><span class="code">${(blob.size/1048576).toFixed(1)} MB · this kind of file opens in its own program (AutoCAD, Excel…)</span><button type="button" class="btn pri" data-fvdl>${ico('file-down')}<span>Download to open</span></button></div>`;
  L.innerHTML=shell(body,acts);
  if(pdf){try{await loadPdfJs();const doc=await pdfjsLib.getDocument({data:new Uint8Array(await blob.arrayBuffer())}).promise;const box=document.getElementById('fvPdf');if(!box||OPENF.t!==tok)return;box.innerHTML='';
    const W=Math.min(box.clientWidth||800,1400),dpr=Math.min(2,devicePixelRatio||1);
    for(let n=1;n<=Math.min(doc.numPages,60);n++){const pg=await doc.getPage(n);const v0=pg.getViewport({scale:1}),sc=W/v0.width,v=pg.getViewport({scale:sc*dpr});
      const c=document.createElement('canvas');c.width=v.width;c.height=v.height;c.style.width=W+'px';c.className='fv-page';box.appendChild(c);await pg.render({canvasContext:c.getContext('2d'),viewport:v}).promise;if(OPENF.t!==tok)return;}
    if(doc.numPages>60)box.insertAdjacentHTML('beforeend',`<div class="fv-msg">Showing 60 of ${doc.numPages} pages — download for the rest.</div>`);}
   catch(e){const box=document.getElementById('fvPdf');if(box)box.innerHTML=`<div class="fv-msg">Could not show the PDF here — use Download.</div>`;}}
}
const OPENF={};
document.addEventListener('change',e=>{const t=e.target;
  if(t&&(t.id==='f-project'||t.id==='f-date')&&DRAFT.k==='dpr'&&!DRAFT.id){const box=document.getElementById('f-items');if(!box)return;const rows=[...box.querySelectorAll('.wr-row')];
    if(rows.some(rw=>(DRAFT.photos['wr:'+rw.dataset.rk]||[]).length))return;
    const cur=JSON.stringify(rows.filter(rw=>rw.querySelector('[data-w=work]').value.trim()).map(rw=>[rw.querySelector('[data-w=trade]').value,rw.querySelector('[data-w=work]').value.trim()]));
    if(cur!=='[]'&&!(DRAFT.carry&&cur===DRAFT.carryRows))return;
    const pp=prevPlan((document.getElementById('f-project')||{}).value,(document.getElementById('f-date')||{}).value||today());rows.forEach(rw=>rw.remove());const add=box.querySelector('[data-wradd]');
    (pp?dprPlan(pp):[{trade:'Civil'},{trade:'Electrical'},{trade:'Plumbing'}]).forEach(x=>add.insertAdjacentHTML('beforebegin',wrRow(x,false)));DRAFT.carry=pp?pp.date:null;DRAFT.carryRows=pp?JSON.stringify(dprPlan(pp).map(x=>[x.trade,x.work.trim()])):'';
    const c=document.getElementById('dprCarry');if(c)c.innerHTML=pp?`<div class="carry code">${ico('calendar')} Filled from the plan of ${fd(pp.date)} — change it to what was actually done today.</div>`:'';return;}
  if(t&&t.matches&&t.matches('.wr-row [data-w=trade]')){const ta=t.closest('.wr-row').querySelector('textarea');ta.placeholder=DPR_PH[t.value]||'What was done today';}});
document.addEventListener('input',e=>{const box=e.target.closest&&e.target.closest('[data-crew]');if(!box)return;const t=box.querySelector('[data-crewtot]');if(t)t.textContent=num([...box.querySelectorAll('input[data-trade]')].reduce((a,i)=>a+(+i.value>0?+i.value:0),0));});
document.addEventListener('click',e=>{if(!e.target.closest)return;
  const wa=e.target.closest('[data-wradd]');if(wa){const box=wa.closest('[data-wrows]');if(box.querySelectorAll('.wr-row').length>=40){toast('Up to 40 work lines in one report.');return;}const used=[...box.querySelectorAll('[data-w=trade]')].map(x=>x.value);wa.insertAdjacentHTML('beforebegin',wrRow({trade:box.hasAttribute('data-plan')?'Civil':DPR_WTYPES.find(t=>!used.includes(t))||'Other'},box.hasAttribute('data-plan')));const rs=box.querySelectorAll('.wr-row');rs[rs.length-1].querySelector('textarea').focus();return;}
  const wd=e.target.closest('[data-wrdel]');if(wd){const rw=wd.closest('.wr-row'),box=rw.closest('[data-wrows]'),fk='wr:'+rw.dataset.rk,ph=DRAFT.photos[fk]||[];
    if(ph.length){DRAFT.photos.photos=[...(DRAFT.photos.photos||[]),...ph];DRAFT.photos[fk]=[];flDraw();toast('Its photos were moved to “Other site photos”.');}
    if(box.querySelectorAll('.wr-row').length>1)rw.remove();else rw.querySelector('textarea').value='';return;}
  const ad=e.target.closest('[data-mradd]');if(ad){const box=ad.closest('[data-mrows]');if(box.querySelectorAll('.mr-row').length>=60){toast('Up to 60 materials in one report.');return;}ad.insertAdjacentHTML('beforebegin',mrRow({}));const rs=box.querySelectorAll('.mr-row');rs[rs.length-1].querySelector('input').focus();return;}
  const dl=e.target.closest('[data-mrdel]');if(dl){const rw=dl.closest('.mr-row'),box=rw.closest('[data-mrows]');if(box.querySelectorAll('.mr-row').length>1)rw.remove();else rw.querySelectorAll('input').forEach(i=>i.value='');return;}
  const dt=e.target.closest('[data-dprtasks]');if(dt){const r=D.dpr.find(x=>x.id===dt.dataset.dprtasks);if(!r||MKT[r.id])return;
    if(!(CANW&&canEditView('tasks'))){toast('You do not have permission to add tasks.');return;}
    const day=nextDay(r.date),ttl=x=>`${x.trade}: ${x.work.trim().replace(/\s+/g,' ').slice(0,200)}`,have=new Set(D.tasks.filter(t=>t.source==='Daily report '+r.id).map(t=>t.title)),pl=dprPlan(r).filter(x=>!have.has(ttl(x)));
    if(!pl.length){toast('Already added to Tasks.');return;}
    MKT[r.id]=1;dt.disabled=true;
    write(async()=>{for(const x of pl)await db.collection('tasks').add({project:r.project,title:ttl(x),start:day,due:day,progress:0,status:'Not started',source:'Daily report '+r.id,notes:x.work.trim(),by:ME.id,at:Date.now()});})
      .then(ok=>{if(ok!==false){toast(`${pl.length} task${pl.length>1?'s':''} added for ${fd(day)}.`);render();}else dt.disabled=false;}).catch(()=>{dt.disabled=false;}).finally(()=>{delete MKT[r.id];});return;}
  if(e.target.closest('[data-dprclear]')){S.dprT='';S.q='';S.dprN=0;render();return;}
  if(e.target.closest('[data-dprmore]')){S.dprN=(S.dprN||15)+15;render();}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fvdl]');if(!b||!OPENF.blob)return;saveFile(OPENF.fname,OPENF.blob);});
/* a member link (…#f=<id>) opens that file after sign-in */
(function bmDeepFile(){const m=/#f=([\w-]{2,200})/.exec(location.hash||'');if(!m)return;let n=0;const t=setInterval(()=>{if(++n>240){clearInterval(t);return;}
  if(S.ready&&CLOUD.blob&&ME&&ME.id){clearInterval(t);try{history.replaceState(null,'',location.pathname+location.search);}catch(_){}openFile(m[1],false,'');}},500);})();
document.addEventListener('click',e=>{if(!e.target.closest||!CLOUD.blob)return;const a=e.target.closest('a[href]');if(!a||a.closest('.fv')||e.ctrlKey||e.metaKey||e.shiftKey)return;
  const id=fileIdOf(a.getAttribute('href'));if(!id)return;e.preventDefault();e.stopPropagation();
  const img=!!a.querySelector('img')||a.hasAttribute('data-img');
  let gal=null;if(img){const box=a.closest('.thumbs,.dpr-ph,[data-gal]')||a.parentElement;gal=[...new Set([...box.querySelectorAll('a[href]')].filter(x=>x.querySelector('img')||x.hasAttribute('data-img')).map(x=>fileIdOf(x.getAttribute('href'))).filter(Boolean))];}
  openFile(id,img,(a.getAttribute('aria-label')||a.textContent||'').trim().replace(/^Open$/,''),gal);},true);
/* photo viewer: next / previous by button, arrow keys or swipe */
function fvGo(d){const g=OPENF.gal;if(!g||!document.querySelector('.drawer.fv'))return;const i=g.indexOf(OPENF.cur)+d;if(i<0||i>=g.length)return;openFile(g[i],true,'',g);}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fvgo]');if(b){e.preventDefault();fvGo(+b.dataset.fvgo);}});
document.addEventListener('keydown',e=>{if(e.repeat||!OPENF.gal||!document.querySelector('.drawer.fv'))return;if(e.key==='ArrowRight')fvGo(1);else if(e.key==='ArrowLeft')fvGo(-1);});
(()=>{let x0=null,y0=0;document.addEventListener('touchstart',e=>{x0=e.target.closest&&e.target.closest('.fv-img')&&e.touches.length===1?e.touches[0].clientX:null;y0=x0===null?0:e.touches[0].clientY;},{passive:true});
  document.addEventListener('touchmove',e=>{if(e.touches.length>1)x0=null;},{passive:true});
  document.addEventListener('touchend',e=>{if(x0===null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)fvGo(dx<0?1:-1);},{passive:true});})();

/* ================= Live cameras inside BuildMitr =================
 * • EZVIZ (and Hikvision cameras on an EZVIZ account): the admin connects the company's EZVIZ account once; live video
 *   then plays inside the app (short-lived HLS link made on the server — the key and verification codes never reach phones).
 * • Any HLS (.m3u8), YouTube Live, MJPEG or web-viewer link also plays inside the app.
 * • "Scan camera QR" reads the QR on the camera / box / a shared QR picture and fills in the camera for you. */
Object.assign(ICONS,{'refresh-cw':'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>','qr-code':'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',droplet:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>','scan-line':'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  'maximize':'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'});
const CAM={ez:null,list:null};
const camEzBrand=c=>['EZVIZ','Hikvision'].includes(c.brand)&&c.serial&&!/demo/i.test(c.serial);
const camKind=u=>{u=String(u||'');if(/\.m3u8(\?|$)/i.test(u))return 'hls';if(/youtube\.com|youtu\.be/i.test(u))return 'yt';if(/\.mjpe?g(\?|$)|mjpg|\/video(\?|$)|action=stream/i.test(u))return 'mjpeg';if(/^rtsp:/i.test(u))return 'rtsp';if(/^https?:/i.test(u))return 'web';return '';};
const ytEmbed=u=>{const m=String(u).match(/(?:v=|youtu\.be\/|live\/|embed\/)([\w-]{11})/);return m?`https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1&playsinline=1`:'';};
const canWatch=c=>!!(c.live&&camKind(c.live))||(camEzBrand(c)&&CAM.ez!==false);
async function camStatus(){if(!S.cloud||CAM.ez!==null)return;try{const j=await gasApi('camStatus');CAM.ez=!!j.connected;}catch(e){CAM.ez=false;if(/Unknown request/i.test(e.message||''))CAM.old=true;}if(S.view==='cctv'||S.view==='settings')render();}
/* → cameras: hlsInto */
/* → cameras: playCam */
/* → cameras: camFull */
/* ---------- QR scan ---------- */
let QRS=null;
function loadJsQR(){if(window.jsQR)return Promise.resolve();return new Promise((ok,bad)=>{const j=document.createElement('script');j.src='https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';j.onload=ok;j.onerror=()=>bad(new Error('QR reader could not load'));document.head.appendChild(j);});}
async function qrFromCanvas(cv){
  if('BarcodeDetector' in window){try{const d=new BarcodeDetector({formats:['qr_code','data_matrix','code_128']});const r=await d.detect(cv);if(r[0])return r[0].rawValue;}catch(_){}}
  await loadJsQR();const g=cv.getContext('2d');
  const tryAt=(x,y,w,h)=>{const im=g.getImageData(x,y,w,h);const r=window.jsQR(im.data,im.width,im.height,{inversionAttempts:'attemptBoth'});return r?r.data:'';};
  let t=tryAt(0,0,cv.width,cv.height);if(t)return t;
  /* small QR on a label: look again at the middle, enlarged */
  const s=Math.round(Math.min(cv.width,cv.height)*0.6),x=Math.round((cv.width-s)/2),y=Math.round((cv.height-s)/2);
  const c2=document.createElement('canvas');c2.width=c2.height=Math.min(900,s*2);c2.getContext('2d').drawImage(cv,x,y,s,s,0,0,c2.width,c2.height);
  const im=c2.getContext('2d').getImageData(0,0,c2.width,c2.height);const r=window.jsQR(im.data,im.width,im.height,{inversionAttempts:'attemptBoth'});return r?r.data:'';
}
/* reads the QR of any camera brand: EZVIZ / Hikvision labels, CP Plus / Dahua / Imou "SN:…", plain serial numbers, JSON, links */
const CAM_BRAND_RE=[['EZVIZ',/ys7|ezviz/i],['Hikvision',/hik-?connect|hikvision|\bDS-\d/i],['CP Plus',/cp-?plus|cpplus|gcmob|icmob|ezykam|\bCP-[A-Z]/i],['Imou',/imou|easy4ip|lechange/i],['Dahua',/dahua|dmss|\bDH-/i],['TP-Link Tapo',/tapo|tp-?link/i],['Qubo',/qubo/i],['Godrej',/godrej/i]];
/* → cameras: camParseQR */
/* → cameras: camScanDialog */
/* → cameras: qrStart */
function qrStop(){if(QRS){QRS.getTracks().forEach(t=>t.stop());QRS=null;}}
/* → cameras: camFromQR */
/* ---------- settings: connect EZVIZ, import cameras ---------- */
function camSettingsBox(){
  if(!isAdmin()||!S.cloud)return '';camStatus();
  return `<div class="box" id="camBox"><div class="box-h">${ico('cctv')}<h2>Site cameras — watch inside BuildMitr</h2><span class="pill ${CAM.ez?'p-green':'p-grey'}">${CAM.ez?'EZVIZ connected':CAM.ez===false?'Not connected':'Checking…'}</span></div>
   <div style="padding:12px 16px" class="code">Connect the EZVIZ account your site cameras are in (EZVIZ and Hikvision cameras added in the EZVIZ app). Free key: sign in at <a href="https://open.ezvizlife.com" target="_blank" rel="noopener">open.ezvizlife.com</a> with that same EZVIZ account → <b>My application</b> → copy the <b>AppKey</b> and <b>AppSecret</b>. They are kept only on your BuildMitr server, never on phones. Team members and clients then watch live inside the app — no EZVIZ app or password needed, and you still decide who sees each camera.</div>
   ${CAM.old?`<div class="note">${ico('info')}<span>The BuildMitr server is being updated for in-app cameras. This will be ready shortly.</span></div>`:''}
   <form id="ezForm" class="e2form" ${CAM.old?'hidden':''}>
    <label>AppKey<input name="key" autocomplete="off" placeholder="${CAM.ez?'•••••• (connected — enter to change)':'32 characters'}"></label>
    <label>AppSecret<input name="secret" type="password" autocomplete="new-password"></label>
    <label>Region<select name="host"><option value="https://open.ezvizlife.com">Global (auto)</option><option value="https://isgpopen.ezvizlife.com">Asia — India / Singapore</option><option value="https://ieuopen.ezvizlife.com">Europe</option><option value="https://open.ys7.com">China</option></select></label>
    <div class="srow" style="grid-column:1/-1;padding:0;border:0"><button class="btn pri">${ico('check')}<span>${CAM.ez?'Update':'Connect EZVIZ'}</span></button>${CAM.ez?`<button type="button" class="btn" id="ezList">${ico('download')}<span>Import my EZVIZ cameras</span></button><button type="button" class="btn ghost" id="ezOff">Disconnect</button>`:''}</div>
   </form>
   ${CAM.list?`<div class="tbl-wrap"><table><thead><tr><th>Camera</th><th>Serial</th><th>Status</th><th>Add to project</th></tr></thead><tbody>${CAM.list.map(d=>{const have=D.cameras.find(c=>String(c.serial||'').toUpperCase()===d.serial);return `<tr><td>${esc(d.name||'')}<div class="code">${esc(d.model||'')}</div></td><td class="code">${esc(d.serial)}</td><td><span class="pill ${d.online?'p-green':'p-grey'}">${d.online?'Online':'Offline'}</span></td>
     <td>${have?`<span class="code">In ${esc(pname(have.project))}</span>`:`<select data-ezadd="${esc(d.serial)}"><option value="">Choose project…</option>${PJ().map(p=>`<option value="${p.id}">${esc(pname(p.id))}</option>`).join('')}</select>`}</td></tr>`;}).join('')}</tbody></table></div>`:''}</div>`;
}
document.addEventListener('submit',async e=>{if(e.target.id!=='ezForm')return;e.preventDefault();const f=e.target;
  try{toast('Connecting to EZVIZ…');const j=await gasApi('camKeys',{key:f.elements.key.value,secret:f.elements.secret.value,host:f.elements.host.value});CAM.ez=j.connected;toast(j.connected?'EZVIZ connected — cameras now play inside BuildMitr':'Disconnected');render();}
  catch(err){toast(err.message);}},true);
document.addEventListener('change',async e=>{const s=e.target.closest&&e.target.closest('[data-ezadd]');if(!s||!s.value)return;const d=(CAM.list||[]).find(x=>x.serial===s.dataset.ezadd);if(!d)return;
  await write(()=>db.collection('cameras').add({project:s.value,name:d.name||d.serial,brand:'EZVIZ',model:d.model||'',serial:d.serial,status:d.online?'Online':'Offline',clientView:'No',teamView:'All team on this project',by:ME.id,at:Date.now()}),`${d.name||d.serial} added`);render();},true);
document.addEventListener('click',async e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-camfull]');if(b){camFull(b.dataset.camfull);return;}}
  const id=(e.target.closest('button')||{}).id;if(!id)return;
  if(id==='camScan'){camScanDialog();return;}
  if(id==='qrManual'){qrStop();openForm('cameras',null,{project:S.proj!=='all'?S.proj:'',status:'Online',clientView:'No',teamView:'All team on this project'});setTimeout(()=>{const f=document.getElementById('f-serial');f&&f.focus();},200);return;}
  if(id==='ezList'){try{toast('Reading your EZVIZ cameras…');const j=await gasApi('camList');CAM.list=j.devices;render();setTimeout(()=>{const b=document.getElementById('camBox');b&&b.scrollIntoView({block:'start'});},50);}catch(err){toast(err.message);}return;}
  if(id==='ezOff'){if(!confirm('Disconnect EZVIZ? Cameras will no longer play inside the app.'))return;try{await gasApi('camKeys',{key:''});CAM.ez=false;CAM.list=null;render();}catch(err){toast(err.message);}return;}
},true);
document.addEventListener('change',async e=>{if(e.target.id!=='qrFile')return;const f=e.target.files[0];if(!f)return;
  const im=new Image();im.onload=async()=>{const cv=document.createElement('canvas');const sc=Math.min(1,1400/Math.max(im.width,im.height));cv.width=im.width*sc;cv.height=im.height*sc;cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);
    try{const t=await qrFromCanvas(cv);if(t){qrStop();camFromQR(t);}else toast('No QR code found in that picture.');}catch(err){toast(err.message);}};im.src=URL.createObjectURL(f);},true);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-close]'))qrStop();},true);

/* ================= Install the app (Android APK, iPhone/iPad, Windows PC, Mac) ================= */
Object.assign(ICONS,{'download':ICONS.download||'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  'monitor':'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>','apple':'<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>'});
const APK_URL='https://github.com/Buildmitr/buildmitr_1/releases/download/android-latest/BuildMitr.apk';
const APP_URL='https://buildmitr.github.io/buildmitr_1/';
const WIN_URL='https://github.com/Buildmitr/buildmitr_1/releases/download/windows-latest/BuildMitr-Setup.exe';
let INSTALL_EVT=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();INSTALL_EVT=e;if(S.view==='install')render();});
window.addEventListener('appinstalled',()=>{INSTALL_EVT=null;toast('BuildMitr is installed');});
const PLAT=(()=>{const u=navigator.userAgent||'';if(/android/i.test(u))return 'android';if(/iphone|ipad|ipod/i.test(u)||(/Macintosh/.test(u)&&navigator.maxTouchPoints>1))return 'ios';if(/Macintosh|Mac OS X/.test(u))return 'mac';if(/Windows/.test(u))return 'win';return 'other';})();
const isStandalone=()=>{try{return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true||/src=(android|win)/.test(location.search);}catch(_){return false;}};
/* → admin: vInstall */
/* → admin: instQR */
document.addEventListener('click',async e=>{const id=(e.target.closest&&(e.target.closest('button')||{}).id);
  if(id==='instNow'&&INSTALL_EVT){INSTALL_EVT.prompt();try{await INSTALL_EVT.userChoice;}catch(_){}INSTALL_EVT=null;render();}
  if(id==='instShare')shareSheet('BuildMitr app',`BuildMitr — construction project management.\nOpen: ${APP_URL}\nAndroid app: ${APK_URL}\nWindows PC / laptop: ${WIN_URL}`);},true);

/* ================= Slim sticky top bar + Back ================= */
Object.assign(ICONS,{'arrow-left':ICONS['arrow-left']||'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>'});
/* the page's top bar stays on screen while scrolling, and gets slimmer once you scroll down */
(function(){let on=false,lock=0;const f=()=>{if(Date.now()<lock)return;const de=document.documentElement,y=window.scrollY||de.scrollTop,room=de.scrollHeight-window.innerHeight;
  const s=on?y>8:(y>64&&room>260);   // two limits + only on long pages, so the bar never flickers between sizes
  if(s!==on){const b=document.querySelector('.bar'),h0=b?b.offsetHeight:0;on=s;document.body.classList.toggle('scrolled',s);
    // the bar changes height: move the page by the same amount so nothing jumps (and the browser's scroll anchoring cannot bounce it back)
    const d=b?h0-b.offsetHeight:0;if(d&&s){lock=Date.now()+250;window.scrollTo(0,Math.max(y-d,0)>8?y-d:y);}}};
  window.addEventListener('scroll',f,{passive:true});})();
/* Back: every page you open is remembered; Back (button, phone back key, browser back) returns to the page before */
const HIST=[];let LASTV=null,NAVBACK=false;
function navTrack(){
  if(!S.ready||(S.cloud&&S.authStep))return;
  const cur={view:S.view,proj:S.proj,y:0};
  if(LASTV&&(LASTV.view!==cur.view||LASTV.proj!==cur.proj)){
    if(!NAVBACK){LASTV.y=LASTV.y||0;HIST.push(LASTV);if(HIST.length>40)HIST.shift();try{history.pushState({bm:HIST.length},'');}catch(_){}}
  }
  if(!LASTV||LASTV.view!==cur.view||LASTV.proj!==cur.proj)LASTV=cur;
  NAVBACK=false;
}
window.addEventListener('scroll',()=>{if(LASTV)LASTV.y=window.scrollY;},{passive:true});
function goBack(fromPop){
  const l=document.getElementById('layer');if(l&&l.innerHTML.trim()){if(typeof qrStop==='function')qrStop();closeLayer();if(fromPop)try{history.pushState({bm:HIST.length},'');}catch(_){}return true;}
  const p=HIST.pop();if(!p)return false;NAVBACK=true;if(S.view!==p.view)S.fwho='';S.view=p.view;S.proj=p.proj;LASTV={...p};render();setTimeout(()=>scrollTo(0,p.y||0),0);return true;
}
window.addEventListener('popstate',()=>{goBack(true);});
const backBtn=()=>HIST.length&&!HOME_VIEWS.includes(S.view)?`<button type="button" class="btn ghost back-btn" data-back aria-label="Back">${ico('arrow-left')}<span>Back</span></button>`:'';
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-back]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(HIST.length){try{history.back();}catch(_){goBack();}}else goBack();},true);

/* ================= Drawings library (Architecture / Structure / MEP) + share any file =================
 * Each project gets a standard checklist of drawings per discipline. Upload DWG, DXF, PDF or images against each item;
 * a new upload becomes the next revision and the older one is marked Superseded. Any file can be shared by WhatsApp,
 * email, copied link, or sent as the file itself from a phone. Saved in the existing "documents" list. */
Object.assign(ICONS,{'file':ICONS.file||'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>','library':'<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>'});
const DL_DISC=['Architecture','Structure','MEP','3D views','Interiors'];
/* sections with a drop-down of groups (3D views, Interiors) */
const DL_GROUPS={
  '3D views':{
    'Exterior & elevations':['Front elevation 3D','Side & corner views 3D','Rear view 3D',"Bird's-eye view 3D",'Night view render','Elevation colour options'],
    'Interiors':['Living room 3D','Dining 3D','Kitchen 3D','Master bedroom 3D','Bedrooms 3D','Kids bedroom 3D','Pooja room 3D','Toilets 3D','Home theatre / family lounge 3D','Staircase & lobby 3D'],
    'Landscape':['Landscape & garden 3D','Terrace garden 3D','Compound wall & gate 3D','Driveway & car parking 3D','Swimming pool / water feature 3D'],
    'Walkthrough & 3D model':['Walkthrough video','360° panorama views','3D model file (SketchUp / Revit)']},
  'Interiors':{
    'Ceiling':['False ceiling layout','False ceiling sections & details','Cove & profile light details'],
    'Lighting & electrical':['Lighting layout','Switchboard & electrical points layout','Light fixture schedule'],
    'Furniture':['Furniture layout','Loose furniture layout','Loft layout','Furniture details'],
    'Wardrobes & storage':['Wardrobe details','Loft details','TV unit details','Crockery unit details','Shoe rack & foyer unit','Study table & bookshelf','Dressing unit details','Bed back panel & headboard'],
    'Kitchen & utility':['Modular kitchen layout','Kitchen elevations & details','Utility area details'],
    'Pooja, walls & partitions':['Pooja unit details','Wall panelling details','Partition & glass details','Wallpaper & paint layout'],
    'Bathrooms':['Toilet layout & vanity details','Toilet wall & floor tile layout','Shower partition details'],
    'Flooring':['Flooring layout','Skirting & threshold details'],
    'Schedules':['Material & finish schedule','Hardware & fittings schedule','Interior BOQ']}};
const dlGrpOf=(disc,k,c,pid)=>{const t=dlTab(disc,pid);if(!dlHasDrop(t))return '';const b=String(k).split(' — ')[0];for(const G of t.groups)if(G.items.some(i=>i.n===b||i.n===b+'s'||i.n===k))return G.g||'General';return (c&&c.grp)||'Other';};
const DL_STD={
  Architecture:['Site plan','Floor plans','Terrace plan','Elevations','Sections','Door & window schedule','Staircase details','Toilet details','Kitchen details','Compound wall & gate','Furniture layout','Municipal approval drawings'],
  Structure:['Soil investigation report','Centre line / column marking','Footing layout & details','Column layout & schedule','Plinth beam layout','Roof shuttering layouts','Slab reinforcement details','Beam reinforcement details','Staircase reinforcement','Lintel & chajja details','Compound / retaining wall details','Sump & septic tank','Headroom / overhead tank','Bar bending schedule','Structural design report'],
  MEP:['Electrical layout','Electrical single-line diagram','Lighting layout','Water supply (plumbing) layout','Drainage layout','Rainwater harvesting','Sump & overhead tank piping','AC / HVAC layout','Fire safety layout','Solar layout','CCTV, data & low-voltage layout','Earthing & lightning protection'],
  '3D views':Object.values(DL_GROUPS['3D views']).flat(),
  Interiors:Object.values(DL_GROUPS.Interiors).flat()};
const DL_CAT={Architecture:'Architectural drawing',Structure:'Structural drawing',MEP:'Electrical / plumbing','3D views':'3D view / render',Interiors:'Interior drawing'};
/* drawings made once for every floor (listed as "Floor plans — First floor" …); roof drawings are per floor roof */
const DL_PERFLOOR={Architecture:['Floor plans'],Structure:['Roof shuttering layouts','Slab reinforcement details','Beam reinforcement details'],MEP:['Electrical layout','Lighting layout','Water supply (plumbing) layout','Drainage layout','AC / HVAC layout'],Interiors:['False ceiling layout','Lighting layout','Furniture layout','Flooring layout']};
const FLOOR_NAMES=['Ground floor','First floor','Second floor','Third floor','Fourth floor','Fifth floor','Sixth floor','Seventh floor','Eighth floor','Ninth floor','Tenth floor'];
const dlKey=p=>`${n(p.nfloors)||''}|${p.base||''}`;
function dlFloors(pid){const p=proj(pid)||{};
  if(Array.isArray(p.floors)&&p.floors.length&&(!n(p.nfloors)||p.floorsKey===dlKey(p)))return p.floors;   // edited in the library
  if(n(p.nfloors))return dlFloorList({n:Math.min(40,Math.round(n(p.nfloors))),cellar:/cellar/i.test(p.base||''),stilt:/stilt/i.test(p.base||'')});
  const ef=((p.estimate||{}).floors||[]).map(f=>f.n).filter(Boolean);return ef.length?ef:['Ground floor'];}
const dlFloorKey=(k,f)=>`${k.replace(/s$/,'')} — ${/roof|slab|beam/i.test(k)?dlRoof(f):f}`;
const dlRoof=f=>/ floor$/i.test(f)?f.replace(/ floor$/i,' floor roof'):f+' roof';
function dlFloorList({n,cellar,stilt}){const out=[];if(cellar)out.push('Cellar');if(stilt)out.push('Stilt floor');for(let i=0;i<n;i++)out.push(FLOOR_NAMES[i]||`Floor ${i}`);return out;}
const DL={disc:'Architecture',grp:''};
/* drawings reach clients and site engineers only after the admin releases them (the server enforces the same rule) */
const REL_ROLES=['Client','Site engineer','Supervisor'];
const DRAW_CATS=['Architectural drawing','Structural drawing','Electrical / plumbing','3D view / render','Interior drawing'];
const isDrawing=d=>!!(d&&(d.disc||DRAW_CATS.includes(d.cat)));
const relHide=()=>REL_ROLES.includes(curRole());
const relOK=d=>!relHide()||!isDrawing(d)||!!d.rel;
const relCan=()=>CANW&&(apMyRole()==='Admin'||apMyRole()==='Project manager');
/* → drawings: relBadge */
/* → drawings: relBtn */
/* → drawings: relSet */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-dlrel]');if(!b)return;const [id,on]=b.dataset.dlrel.split('|');relSet([id],on==='1');});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-dlrelall]');if(!b)return;
  const ids=dlItems(S.proj,DL.disc).filter(x=>(!DL.grp||x.grp===DL.grp)&&x.cur&&x.has&&!x.cur.rel&&apStage(x.cur)>=3&&x.cur.status!=='Superseded').map(x=>x.cur.id);
  if(!ids.length){toast('No approved drawings waiting to be released');return;}relSet(ids,true);});
document.addEventListener('change',e=>{if(!e.target.matches||!e.target.matches('[data-dlgrp]'))return;DL.grp=e.target.value;render();});
const dlStd=()=>{const o=orgMain().drawStd;return o&&typeof o==='object'?{...DL_STD,...o}:DL_STD;};
/* the editable list: folders (tabs) → sub-folders (drop-down) → drawings; "pf" = one per floor.
   Saved for the company (org/drawlib) or for one project (project.drawLib); the standard list is the fallback. */
function dlDefault(){const std=dlStd();return DL_DISC.map(k=>{const per=DL_PERFLOOR[k]||[],it=n=>({n,pf:per.includes(n)});
  const G=DL_GROUPS[k];return {k,l:k,groups:G?Object.entries(G).map(([g,a])=>({g,items:a.map(it)})):[{g:'',items:(std[k]||[]).map(it)}]};});}
const dlValid=L=>Array.isArray(L)&&L.length&&L.every(t=>t&&t.k&&Array.isArray(t.groups));
function dlLib(pid){const p=pid&&proj(pid);if(p&&dlValid(p.drawLib))return p.drawLib;const o=(D.org.find(x=>x.id==='drawlib')||{}).tabs;return dlValid(o)?o:dlDefault();}
const dlTab=(k,pid)=>dlLib(pid===undefined?S.proj:pid).find(t=>t.k===k);
const dlHasDrop=t=>!!t&&(t.groups.length>1||!!(t.groups[0]&&t.groups[0].g));
const dlCat=k=>DL_CAT[k]||'Drawing';
Object.assign(ICONS,{'folder-plus':ICONS['folder-plus']||'<path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'});
/* ---------- Edit list: add / rename / remove / reorder folders, sub-folders and drawings ---------- */
const DLE={L:null,t:0};
/* → drawings: dleOpen */
/* → drawings: dleDraw */
function dleUsed(disc,names){return D.documents.filter(d=>d.disc===disc&&((d.files||[]).length||d.link)&&(!names||names.some(n=>{const k=d.dkey||d.title;return k===n||String(k).startsWith(n.replace(/s$/,'')+' — ');})));}
document.addEventListener('input',e=>{if(!DLE.L||!e.target.closest||!e.target.closest('#dleBody'))return;const t=e.target,T=DLE.L[DLE.t],ds=t.dataset;
  if('dletl' in ds)T.l=t.value;
  else if(ds.dleg!==undefined)T.groups[+ds.dleg].g=t.value;
  else if(ds.dlei){const [g,i]=ds.dlei.split('|').map(Number);T.groups[g].items[i].n=t.value;}
  else if(ds.dlepf){const [g,i]=ds.dlepf.split('|').map(Number);T.groups[g].items[i].pf=t.checked;}});
document.addEventListener('change',e=>{const ds=e.target.dataset||{};if(DLE.L&&ds.dlepf){const [g,i]=ds.dlepf.split('|').map(Number);DLE.L[DLE.t].groups[g].items[i].pf=e.target.checked;}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-dledit],[data-dlet],[data-dleaddt],[data-dledelt],[data-dlemvt],[data-dleaddg],[data-dledelg],[data-dleaddi],[data-dledeli],[data-dlemv],[data-dlesave]');if(!b)return;
  const ds=b.dataset;if('dledit' in ds){dleOpen();return;}
  const L=DLE.L;if(!L)return;const T=L[DLE.t];const swap=(a,i,j)=>{if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];};
  const focusLast=sel=>setTimeout(()=>{const x=[...document.querySelectorAll(sel)].pop();if(x){x.focus();x.select&&x.select();}},30);
  if(ds.dlet!==undefined){DLE.t=+ds.dlet;dleDraw();return;}
  if('dleaddt' in ds){let n='New folder',i=2;while(L.some(t=>t.k===n||t.l===n))n='New folder '+i++;L.push({k:n,l:n,groups:[{g:'',items:[]}],nw:1});DLE.t=L.length-1;dleDraw();focusLast('[data-dletl]');return;}
  if('dledelt' in ds){const u=dleUsed(T.k);if(u.length){toast(`“${T.l||T.k}” has ${u.length} uploaded drawing${u.length>1?'s':''} — delete or move them first`);return;}if(L.length<2){toast('Keep at least one folder');return;}L.splice(DLE.t,1);DLE.t=Math.max(0,DLE.t-1);dleDraw();return;}
  if(ds.dlemvt){const j=DLE.t+ +ds.dlemvt;if(j>=0&&j<L.length){swap(L,DLE.t,j);DLE.t=j;dleDraw();}return;}
  if('dleaddg' in ds){T.groups.push({g:'',items:[]});dleDraw();focusLast('[data-dleg]');return;}
  if(ds.dledelg!==undefined){const G=T.groups[+ds.dledelg];const u=dleUsed(T.k,G.items.map(i=>i.o||i.n));
    if(u.length&&!b.dataset.sure){b.dataset.sure=1;b.innerHTML=`${ico('trash-2')}<span>Remove? ${u.length} uploaded stay under “Other”</span>`;return;}
    T.groups.splice(+ds.dledelg,1);if(!T.groups.length)T.groups.push({g:'',items:[]});dleDraw();return;}
  if(ds.dleaddi!==undefined){T.groups[+ds.dleaddi].items.push({n:'',pf:false});dleDraw();focusLast(`[data-dlei^="${ds.dleaddi}|"]`);return;}
  if(ds.dledeli){const [g,i]=ds.dledeli.split('|').map(Number);T.groups[g].items.splice(i,1);dleDraw();return;}
  if(ds.dlemv){const [a,ix,dir]=ds.dlemv.split('|');if(a==='g')swap(T.groups,+ix,+ix + +dir);else{const [g,i]=ix.split(':').map(Number);swap(T.groups[g].items,i,i+ +dir);}dleDraw();return;}
  if(ds.dlesave)dleSave(ds.dlesave);});
/* → drawings: dleSave */

const FILE_TYPES={pdf:'application/pdf',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',dwg:'image/vnd.dwg',dxf:'image/vnd.dxf',dwf:'model/vnd.dwf',skp:'application/vnd.sketchup.skp',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',xls:'application/vnd.ms-excel',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',doc:'application/msword',zip:'application/zip',rvt:'application/octet-stream',ifc:'application/octet-stream',mp4:'video/mp4',mov:'video/quicktime',glb:'model/gltf-binary',gltf:'model/gltf+json',obj:'model/obj',fbx:'application/octet-stream'};
const fileType=n=>FILE_TYPES[(String(n).split('.').pop()||'').toLowerCase()]||'';
const fileIco=f=>/pdf/.test(f.type||'')?'file-text':/^image\/(jpe?g|png|webp)/.test(f.type||'')?'image':'file';
const fileLink=f=>f.pub||appLink(f.id);
/* the drawings of one project: checklist items + anything else filed under that discipline */
function dlItems(pid,disc){
  const docs=D.documents.filter(d=>d.project===pid&&(d.disc===disc||(!d.disc&&DL_CAT[disc]&&d.cat===DL_CAT[disc]))&&relOK(d));
  const fl=dlFloors(pid),t=dlTab(disc,pid);
  const names=(t?t.groups.flatMap(G=>G.items):[]).flatMap(i=>i.pf?fl.map(f=>dlFloorKey(i.n,f)):[i.n]);
  docs.forEach(d=>{const k=d.dkey||d.title;if(k&&!names.includes(k))names.push(k);});
  return names.map(k=>{const all=docs.filter(d=>(d.dkey||d.title)===k).sort((a,b)=>(b.at||0)-(a.at||0));const cur=relHide()?all[0]:(all.find(d=>d.status!=='Superseded')||all[0]);
    return {k,all,cur,grp:dlGrpOf(disc,k,cur,pid),has:!!(cur&&((cur.files||[]).length||cur.link))};}).filter(x=>x.all.length||!x.k.includes(' — ')||names.indexOf(x.k)>=0);
}
/* every drawing still missing for a project, all sections together — to chase, share or give as a task */
/* → drawings: dlMissing */
/* → drawings: vDlMissing */
/* → drawings: vDrawLib */
/* → drawings: dlFloorBox */
document.addEventListener('click',e=>{const id=(e.target.closest&&(e.target.closest('button')||{}).id);if(id==='dlFlEdit'){DL.flEdit=true;render();}if(id==='dlFlCancel'){DL.flEdit=false;render();}},true);
document.addEventListener('input',e=>{const f=e.target.form;if(!f||f.id!=='dlFlForm'||e.target.name==='names')return;   // number / cellar / stilt fill the names box
  f.elements.names.value=dlFloorList({n:Math.max(1,Math.min(30,+f.elements.n.value||1)),cellar:f.elements.cellar.checked,stilt:f.elements.stilt.checked}).join(', ');},true);
document.addEventListener('change',e=>{const f=e.target.form;if(!f||f.id!=='dlFlForm'||e.target.type!=='checkbox')return;f.elements.names.value=dlFloorList({n:Math.max(1,Math.min(30,+f.elements.n.value||1)),cellar:f.elements.cellar.checked,stilt:f.elements.stilt.checked}).join(', ');},true);
document.addEventListener('submit',e=>{if(e.target.id!=='dlFlForm')return;e.preventDefault();const f=e.target;
  const list=[...new Set(String(f.elements.names.value).split(',').map(x=>x.trim()).filter(Boolean))].slice(0,40);if(!list.length){toast('Enter at least one floor');return;}
  const above=list.filter(x=>!/cellar|stilt/i.test(x)).length,base=[list.some(x=>/cellar/i.test(x))?'Cellar':'',list.some(x=>/stilt/i.test(x))?'Stilt floor':''].filter(Boolean).join(' + ')||'None';
  write(()=>db.doc('projects/'+S.proj).update({floors:list,nfloors:above,base,floorsKey:`${above}|${base}`}),`Floors saved: ${list.length}`).then(ok=>{if(ok){DL.flEdit=false;render();}});},true);
/* → drawings: dlUpload */
async function dlUploadTo(pid,disc,key,files,extra){
  if(!A){toast('File upload needs Contributor access.');return false;}
  const prev=dlItems(pid,disc).find(x=>x.k===key);const up=[];
  for(const file of [...files]){const type=fileType(file.name)||file.type||'application/octet-stream';
    if(file.size>10*1048576){toast(`${file.name} is over 10 MB — save it as PDF, zip it, or put it on Drive and add the link.`);continue;}
    toast(`Uploading ${file.name}…`);try{const r=await A.upload(file,{type});up.push({id:r.id,name:file.name,type});}catch(e){toast(`${file.name}: ${e.message||'upload failed'}`);}}
  if(!up.length)return false;extra=extra||{};
  const cur=prev&&prev.cur;const revN=prev?prev.all.filter(d=>(d.files||[]).length||d.link).length:0;
  const list=[];
  let nid='';
  if(cur&&!(cur.files||[]).length&&!cur.link){nid=cur.id;list.push(['documents',cur.id,{...recOf(cur),...extra,files:up,rev:'R'+revN,status:'For checking',appr:{s1:{by:ME.id,at:Date.now()}},rv:[],fu:1,at:Date.now(),by:ME.id}]);}
  else{if(cur&&cur.status!=='Superseded')list.push(['documents',cur.id,{...recOf(cur),status:'Superseded'}]);
    const id=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
    nid=id;list.push(['documents',id,{project:pid,disc,...extra,...(prev&&prev.cur&&prev.cur.grp?{grp:prev.cur.grp}:{}),dkey:key,title:key,cat:dlCat(disc),rev:'R'+revN,status:'For checking',appr:{s1:{by:ME.id,at:Date.now()}},files:up,fu:1,by:ME.id,at:Date.now()}]);}
  const ok=await write(()=>dbBatch(list),`${key}: ${up.length} file${up.length>1?'s':''} uploaded (R${revN})`);render();return ok?{id:nid,rev:'R'+revN,files:up}:false;
}
/* ---------- share a file ---------- */
/* → drawings: fileShareText */
/* → drawings: shareFiles */
let SHF=null;
/* → drawings: shareFilesTo */
/* ---------- events ---------- */
document.addEventListener('click',e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-fsto]');if(b){shareFilesTo(b.dataset.fsto);return;}}
  {const b=e.target.closest('[data-fshare]');if(b){e.preventDefault();e.stopPropagation();const [id,name,type,t]=b.dataset.fshare.split('|');shareFiles([{id,name,type}],t||name);return;}}
  {const b=e.target.closest('[data-dldisc]');if(b){if(DL.disc!==b.dataset.dldisc)DL.grp='';DL.disc=b.dataset.dldisc;render();return;}}
  {const b=e.target.closest('[data-dlmiss]');if(b){DL.miss=b.dataset.dlmiss==='1';render();scrollTo(0,0);return;}}
  {const b=e.target.closest('[data-dlmissgo]');if(b){DL.miss=false;DL.disc=b.dataset.dlmissgo;DL.grp='';render();scrollTo(0,0);return;}}
  {const b=e.target.closest('[data-dlmtask]');if(b){const v=b.dataset.dlmtask,ix=v.indexOf('|'),disc=v.slice(0,ix),k=v.slice(ix+1);const pid=S.proj;const c=CANW&&canEditView('dtasks')?'dtasks':'tasks';
    openForm(c,null,c==='dtasks'?{project:pid,title:`Prepare ${k}`,disc:['Architecture','3D views','Structure','MEP','Interiors'].includes(disc)?disc:'Architecture',status:'Not started'}:{project:pid,title:`Prepare ${k}`,status:'Not started'});return;}}
  {const b=e.target.closest('[data-dlshare]');if(b){const x=dlItems(S.proj,DL.disc).find(y=>y.k===b.dataset.dlshare);if(x&&x.cur)shareFiles(x.cur.files||[],`${x.k}${x.cur.rev?' '+x.cur.rev:''}`);return;}}
  {const b=e.target.closest('[data-dlshareall]');if(b){const fs=dlItems(S.proj,DL.disc).filter(x=>x.has&&x.cur&&(!DL.grp||x.grp===DL.grp)).flatMap(x=>x.cur.files||[]);if(fs.length)shareFiles(fs,`${DL.grp||DL.disc} ${DL.disc==='3D views'?'views':'drawings'}`);return;}}
  {const b=e.target.closest('[data-dlok]');if(b){const d=D.documents.find(x=>x.id===b.dataset.dlok);if(d)write(()=>db.doc('documents/'+d.id).update({status:'Approved'}),'Approved').then(()=>render());return;}}
},true);
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.dlup){const fs=t.files;dlUpload(t.dataset.dlup,fs);t.value='';}},true);
document.addEventListener('submit',e=>{if(e.target.id!=='dlAdd')return;e.preventDefault();const v=(e.target.elements.t.value||'').trim();if(!v)return;
  if(dlItems(S.proj,DL.disc).some(x=>x.k.toLowerCase()===v.toLowerCase())){toast('Already in the list');return;}
  write(()=>db.collection('documents').add({project:S.proj,disc:DL.disc,...(DL.grp&&DL.grp!=='Other'?{grp:DL.grp}:{}),dkey:v,title:v,cat:dlCat(DL.disc),status:'Draft',files:[],by:ME.id,at:Date.now()}),`${v} added`).then(()=>render());},true);

/* ================= Sign-in link for each organisation ================= */
Object.assign(ICONS,{'link':ICONS.link||'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'});
const orgLink=(id,name)=>APP_URL+'?org='+encodeURIComponent(id)+(name?'&n='+encodeURIComponent(name):'');
/* → admin: orgLinkShare */
let OLT=null;
function orgLinkBox(){
  if(!isAdmin()||!S.cloud||!CLOUD.org)return '';const name=orgName();
  return `<div class="box"><div class="box-h">${ico('link')}<h2>Invite link for ${esc(name)}</h2></div><div class="srow"><code style="flex:1;min-width:200px;word-break:break-all">${esc(orgLink(CLOUD.org,name))}</code>
    <button type="button" class="btn pri" data-orglink="${esc(CLOUD.org)}|${esc(name)}">${ico('share-2')}<span>Invite people</span></button></div>
    <div class="code" style="padding:0 16px 12px">Send this to your team and clients. They tap <b>Create account</b> and set their own password; you approve them on the Team page and choose their role.</div></div>`;
}
document.addEventListener('click',async e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-orglink]');if(b){const [id,...nm_]=b.dataset.orglink.split('|');orgLinkShare(id,nm_.join('|'));return;}}
  {const b=e.target.closest('[data-olcopy]');if(b){try{await navigator.clipboard.writeText(b.dataset.olcopy);toast('Link copied');}catch(_){toast('Could not copy');}return;}}
  {const b=e.target.closest('[data-olmore]');if(b&&OLT){if(navigator.share){try{await navigator.share({title:'BuildMitr — '+OLT.name,text:OLT.text});}catch(_){}}else shareSheet('Sign-in link',OLT.text);return;}}
},true);

/* ================= Projects page: search, sort, grid / list, own order, archive, delete ================= */
Object.assign(ICONS,{'archive':'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'layout-grid':'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  'list':'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>','arrow-up':'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>','arrow-down':'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  'rotate-ccw':'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'});
const PV=(()=>{try{return JSON.parse(localStorage.getItem('bm-pview')||'{}');}catch(_){return {};}})();
PV.sort=PV.sort||'order';PV.lay=PV.lay||'grid';
const pvSave=()=>{try{localStorage.setItem('bm-pview',JSON.stringify({sort:PV.sort,lay:PV.lay}));}catch(_){}};
const projArch=id=>{const p=D.projects.find(x=>x.id===id);return !!(p&&p.archived);};
function projOrdered(list){
  const by={order:(a,b)=>(a.order??1e9)-(b.order??1e9)||(b.created||0)-(a.created||0),name:(a,b)=>String(a.name||'').localeCompare(String(b.name||''),undefined,{numeric:true}),
    code:(a,b)=>String(a.prefix||'').localeCompare(String(b.prefix||''),undefined,{numeric:true})||String(a.name||'').localeCompare(String(b.name||'')),
    start:(a,b)=>String(a.start||'9').localeCompare(String(b.start||'9')),newest:(a,b)=>(b.created||0)-(a.created||0)}[PV.sort]||((a,b)=>0);
  return [...list].sort(by);
}
function vProjects(){
  const canEd=CANW&&canEditView('projects'),admin=isAdmin();
  const all=D.projects.filter(p=>projOK(p.id)),arch=all.filter(p=>p.archived);if(PV.arch&&!arch.length)PV.arch=false;
  const q=S.q.toLowerCase(),list=projOrdered(all.filter(p=>!!p.archived===!!PV.arch).filter(p=>[p.prefix,p.name,p.address,p.description,cname(p.client)].join(' ').toLowerCase().includes(q)));
  const btn=CANW&&canEditView('projects')?`<button class="btn pri" data-add="projects">${ico('plus')}New project</button>`:'';
  if(!D.projects.length){setTimeout(()=>shrLoad(),0);return header(label('projects'))+shrInviteBox()+`<div class="box hero-empty">${ico('building-2')}<h2>No projects yet</h2><p>Start by creating your first project. Then record daily reports, tasks, material, labour and payments against it.</p>${btn}</div>`;}
  const stats=p=>{const ts=D.tasks.filter(t=>t.project===p.id),pc=ts.length?Math.round(ts.reduce((s,t)=>s+(t.status==='Completed'?100:+t.progress||0),0)/ts.length):0;return {pc,open:D.issues.filter(i=>i.project===p.id&&i.status!=='Resolved').length};};
  const moveOK=canEd&&admin&&PV.sort==='order'&&!q&&!PV.arch;
  const acts=(p,i)=>`${moveOK?`<button type="button" class="btn sm ghost" data-pmove="${p.id}|-1" ${i===0?'disabled':''} aria-label="Move ${esc(p.name)} up">${ico('arrow-up')}</button><button type="button" class="btn sm ghost" data-pmove="${p.id}|1" ${i===list.length-1?'disabled':''} aria-label="Move ${esc(p.name)} down">${ico('arrow-down')}</button>`:''}
    ${canEd&&!p.shared&&(admin||p.by===ME.id)?`<button type="button" class="btn sm ghost" data-edit="projects:${p.id}" aria-label="Edit ${esc(p.name)}">${ico('pencil')}</button>`:''}
    ${admin&&!p.shared?(p.archived?`<button type="button" class="btn sm ghost" data-parch="${p.id}|0">${ico('rotate-ccw')}<span>Restore</span></button>`:`<button type="button" class="btn sm ghost" data-parch="${p.id}|1" aria-label="Archive ${esc(p.name)}">${ico('archive')}</button>`)+`<button type="button" class="btn sm ghost warn" data-pdel="${p.id}" aria-label="Delete ${esc(p.name)}">${ico('trash-2')}</button>`:''}`;
  const card=(p,i)=>{const s=stats(p);return `<div class="pcard-w"><button class="pcard" data-proj="${p.id}">${p.prefix?`<span class="code">${esc(p.prefix)}</span>`:''}<h3>${esc(p.name)}${p.archived?' <span class="pill p-grey">Archived</span>':''}${p.shared?` <span class="pill p-blue" title="Shared by ${esc(p.shared.name)}">${ico('share-2')} ${esc(p.shared.name)}</span>`:shrCount(p.id)?` <span class="pill p-blue">${ico('share-2')} Shared</span>`:''}</h3>
      <div class="meta"><span>${ico('map-pin')}${esc(p.address||'—')}</span>${p.loc?'<span class="pill p-green">Pinned</span>':''}</div>
      <div class="meta"><span>${ico('calendar')}${fd(p.start)} → ${fd(p.end)}</span><span>${ico('alert-triangle')}${s.open} open</span></div>
      <div style="display:flex;gap:8px;align-items:center"><div class="prog" style="flex:1"><i style="width:${s.pc}%"></i></div><span class="code">${s.pc}%</span></div></button>
      ${canEd||admin?`<div class="pcard-acts">${acts(p,i)}</div>`:''}</div>`;};
  const row=(p,i)=>{const s=stats(p);return `<tr><td class="code">${esc(p.prefix||'')}</td><td><button type="button" class="linkish" data-proj="${p.id}"><b>${esc(p.name)}</b></button>${p.archived?' <span class="pill p-grey">Archived</span>':''}${p.shared?` <span class="pill p-blue">${ico('share-2')} ${esc(p.shared.name)}</span>`:''}<div class="code">${esc(p.address||'')}</div></td>
      <td>${esc(cname(p.client)||'—')}</td><td class="code">${fd(p.start)} → ${fd(p.end)}</td><td class="num">${s.pc}%</td><td class="num">${s.open}</td><td class="acts">${acts(p,i)}</td></tr>`;};
  const bar=`<div class="pl-bar"><input id="q" placeholder="Search projects by name, code, client, place" value="${esc(S.q)}" aria-label="Search projects">
    <label class="code">Sort<select id="pv-sort">${[['order','My order'],['name','Name A–Z'],['code','Project code / number'],['start','Start date'],['newest','Newest first']].map(([v,l])=>`<option value="${v}" ${PV.sort===v?'selected':''}>${l}</option>`).join('')}</select></label>
    <div class="seg" role="group" aria-label="Layout"><button type="button" class="btn sm ${PV.lay==='grid'?'pri':''}" data-play="grid" aria-label="Grid">${ico('layout-grid')}</button><button type="button" class="btn sm ${PV.lay==='list'?'pri':''}" data-play="list" aria-label="List">${ico('list')}</button></div>
    ${arch.length||PV.arch?`<button type="button" class="btn sm ${PV.arch?'pri':''}" data-parchv>${ico('archive')}<span>${PV.arch?'Back to active projects':`Archived (${arch.length})`}</span></button>`:''}</div>
    ${PV.sort==='order'&&canEd&&!PV.arch?'<div class="code" style="margin:-4px 0 10px">Use ↑ ↓ to set your own order.</div>':''}`;
  const body=!list.length?`<div class="empty">${q?'No project matches your search.':PV.arch?'No archived projects.':'No projects.'}</div>`:
    PV.lay==='list'?`<div class="box"><div class="tbl-wrap"><table><thead><tr><th>Code</th><th>Project</th><th>Client</th><th>Dates</th><th class="num">Done</th><th class="num">Issues</th><th></th></tr></thead><tbody>${list.map(row).join('')}</tbody></table></div></div>`:
    `<div class="cards">${list.map(card).join('')}</div>`;
  setTimeout(()=>shrLoad(),0);
  return header(PV.arch?'Archived projects':label('projects'),btn)+shrInviteBox()+bar+body;
}
/* ---- one project shared with another company ---- */
const SHR={data:null,at:0,busy:false};
async function shrLoad(force){
  if(!S.cloud||!S.ready||SHR.busy||!isAdmin())return;if(!force&&SHR.data&&Date.now()-SHR.at<60000)return;
  SHR.busy=true;let ch=false;try{const d=await gasApi('shareList');ch=JSON.stringify(d)!==JSON.stringify(SHR.data);SHR.data=d;}catch(_){if(!SHR.data)SHR.data={out:[],in:[],invites:[]};}SHR.at=Date.now();SHR.busy=false;
  if(ch&&['projects','project'].includes(S.view)&&!document.querySelector('#layer .drawer'))render();
  if(document.getElementById('shareForm'))shrDialog(document.getElementById('shareForm').dataset.pid);
}
const shrCount=pid=>((SHR.data||{}).out||[]).filter(x=>x.project===pid).length;
function shrInviteBox(){
  const inv=((SHR.data||{}).invites||[]);if(!inv.length||!isAdmin())return '';
  return `<div class="box"><div class="box-h">${ico('share-2')}<h2>Projects shared with ${esc(orgName())}</h2><span class="code">${inv.length} waiting</span></div>${inv.map(x=>`<div class="srow" style="flex-wrap:wrap;gap:8px"><span style="flex:1;min-width:220px"><b data-notr>${esc(x.from)}</b> wants to share <b data-notr>${esc(x.name)}</b> with you. Your team can work on its tasks, drawings and site updates; money stays with ${esc(x.from)}.</span><button type="button" class="btn sm pri" data-shacc="${esc(x.id)}">${ico('check')}<span>Accept</span></button><button type="button" class="btn sm" data-shdec="${esc(x.id)}">Decline</button></div>`).join('')}</div>`;
}
function shrDialog(pid){
  const p=proj(pid);if(!p)return;const out=((SHR.data||{}).out||[]).filter(x=>x.project===pid);
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="shareForm" data-pid="${esc(pid)}">
    <div class="pane-h"><h2>Share with another company</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><p class="code">Share <b data-notr>${esc(pname(pid))}</b> with another company on BuildMitr. Their team can see and work on its tasks, design tasks, drawings, issues, site updates, calendar work, meetings and checklists. <b>Payments, invoices, budget, quotations and the project value stay with ${esc(orgName())}.</b></p>
      <label class="req">Email of the other company's admin<input name="email" type="email" inputmode="email" required placeholder="admin@theircompany.com"></label>
      <p class="code">They get an email and accept from their Projects page. You or they can stop sharing at any time.</p>
      ${out.length?`<div class="tbl-wrap"><table><thead><tr><th>Shared with</th><th>Status</th><th></th></tr></thead><tbody>${out.map(x=>`<tr><td><b data-notr>${esc(x.to||x.email)}</b>${x.to?`<div class="code" data-notr>${esc(x.email)}</div>`:''}</td><td>${x.status==='Active'?'<span class="pill p-green">Sharing</span>':'<span class="pill p-amber">Waiting to accept</span>'}</td><td><button type="button" class="btn sm" data-shstop="${esc(x.id)}">${x.status==='Active'?'Stop sharing':'Cancel'}</button></td></tr>`).join('')}</tbody></table></div>`:''}
    </div><div class="pane-f"><button type="button" class="btn" data-close>Close</button><button class="btn pri">${ico('send')}<span>Share</span></button></div></form></div>`;
}
async function shrAct(a,args,msg){
  try{SHR.data=await gasApi(a,args);SHR.at=Date.now();toast(msg);}catch(e){toast(e.message||'Could not do that.');return false;}
  try{if(db&&db.reloadAll)await db.reloadAll();else if(db&&db.refreshNow)await db.refreshNow();}catch(_){}
  if(document.getElementById('shareForm'))shrDialog(document.getElementById('shareForm').dataset.pid);else render();
  return true;
}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pshare],[data-shstop],[data-shacc],[data-shdec]');if(!b)return;e.preventDefault();
  if(b.dataset.pshare){shrDialog(b.dataset.pshare);shrLoad(true);return;}
  if(b.dataset.shacc){b.disabled=true;shrAct('shareAccept',{id:b.dataset.shacc},'Project added — your team can now work on it.');return;}
  if(b.dataset.shdec){if(!confirm('Decline this shared project?'))return;shrAct('shareStop',{id:b.dataset.shdec},'Declined.');return;}
  if(b.dataset.shstop){if(!confirm('Stop sharing this project? The other company will no longer see it.'))return;shrAct('shareStop',{id:b.dataset.shstop},'Sharing stopped.').then(ok=>{if(ok&&S.view==='project'&&!proj(S.proj)){S.view='projects';render();}});return;}
},true);
document.addEventListener('submit',e=>{if(!e.target||e.target.id!=='shareForm')return;e.preventDefault();const f=e.target,em=(f.elements.email.value||'').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast('Enter a valid email.');return;}
  const btn=f.querySelector('.btn.pri');if(btn)btn.disabled=true;
  shrAct('shareAdd',{project:f.dataset.pid,email:em},'Invitation sent to '+em+'.').then(()=>{const b2=document.querySelector('#shareForm .btn.pri');if(b2)b2.disabled=false;});},true);
async function projMove(id,dir){
  const list=projOrdered(D.projects.filter(p=>projOK(p.id)&&!p.archived));const i=list.findIndex(p=>p.id===id),j=i+dir;if(i<0||j<0||j>=list.length)return;
  [list[i],list[j]]=[list[j],list[i]];
  const ch=list.map((p,k)=>[p,k]).filter(([p,k])=>p.order!==k&&!p.shared).map(([p,k])=>['projects',p.id,{...recOf(p),order:k}]);   // a shared project belongs to the other company: its place is not saved
  await write(()=>dbBatch(ch),'Order saved');render();
}
function projDelDialog(id){
  const p=proj(id);if(!p)return;const cols=Object.keys(D).filter(c=>Array.isArray(D[c])&&c!=='projects');
  const n=cols.reduce((s,c)=>s+D[c].filter(r=>r.project===id).length,0);
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="pdelForm" data-id="${esc(id)}" style="height:auto;max-height:100%;margin-top:auto"><div class="pane-h"><h2>Delete project</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b"><p>This permanently deletes <b>${esc(p.name)}</b> and everything recorded in it — <b>${n}</b> entries (tasks, reports, payments, drawings list, invoices…). Uploaded files stay in Google Drive.</p>
    <p class="code">Want to keep the records? Use <b>Archive</b> instead — it hides the project and can be restored.</p>
    <label>Type the project name to confirm<input name="c" autocomplete="off" placeholder="${esc(p.name)}" required></label></div>
   <div class="pane-f"><button type="button" class="btn" data-parch="${esc(id)}|1">${ico('archive')}<span>Archive instead</span></button><button class="btn warn">${ico('trash-2')}<span>Delete for ever</span></button></div></form></div>`;
}
document.addEventListener('submit',async e=>{if(e.target.id!=='pdelForm')return;e.preventDefault();const f=e.target,id=f.dataset.id,p=proj(id);if(!p)return;
  if(f.elements.c.value.trim().toLowerCase()!==String(p.name).trim().toLowerCase()){toast('The name does not match.');return;}
  const items=[];Object.keys(D).forEach(c=>{if(Array.isArray(D[c])&&c!=='projects')D[c].forEach(r=>{if(r.project===id)items.push([c,r.id]);});});items.push(['projects',id]);
  const ok=await write(()=>db.delMany(items),`${p.name} deleted`);if(ok){closeLayer();if(S.proj===id)S.proj='all';render();}},true);
document.addEventListener('click',async e=>{if(!e.target.closest)return;
  {const b=e.target.closest('[data-play]');if(b){PV.lay=b.dataset.play;pvSave();render();return;}}
  {const b=e.target.closest('[data-parchv]');if(b){PV.arch=!PV.arch;render();return;}}
  {const b=e.target.closest('[data-pmove]');if(b){e.stopPropagation();const [id,d]=b.dataset.pmove.split('|');projMove(id,+d);return;}}
  {const b=e.target.closest('[data-pdel]');if(b){e.stopPropagation();projDelDialog(b.dataset.pdel);return;}}
  {const b=e.target.closest('[data-parch]');if(b){e.stopPropagation();const [id,v]=b.dataset.parch.split('|');const p=proj(id);if(!p)return;
    const ok=await write(()=>db.doc('projects/'+id).update({archived:v==='1'?Date.now():null}),v==='1'?`${p.name} archived — find it under Archived`:`${p.name} restored`);
    if(ok){closeLayer();if(v==='1'&&S.proj===id)S.proj='all';render();}return;}}
},true);
document.addEventListener('change',e=>{if(e.target.id==='pv-sort'){PV.sort=e.target.value;pvSave();render();}},true);

/* ================= Drawing approval (3 stages) + pen markup =================
 * Every drawing in the library goes: ① Drafted (draftsman uploads / submits) → ② Checked (architect, structural engineer
 * or project manager) → ③ Approved (senior architect or admin). Any reviewer can send it back with a comment.
 * "Mark up" opens the PDF / image of the drawing to draw on it like WhatsApp's pen; the marked copy is saved on the drawing. */
Object.assign(ICONS,{
  'pen-tool':'<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  'square':'<rect width="18" height="18" x="3" y="3" rx="2"/>','circle':'<circle cx="12" cy="12" r="10"/>',
  'type':ICONS.type||'<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>',
  'hand':'<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  'zoom-in':'<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  'zoom-out':'<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
  'check-check':'<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>','chevron-left':'<path d="m15 18-6-6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'save':'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  'highlighter':'<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>',
  'move-up-right':'<path d="M13 5H19V11"/><path d="M19 5L5 19"/>',
  'undo-2':ICONS['undo-2']||'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  'corner-up-left':ICONS['corner-up-left']||'<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>'});

/* two new team roles: Draftsman and Senior architect (they see what an architect sees) */
ROLE_VIEWS['Senior architect']=ROLE_VIEWS['Senior architect']||[...ROLE_VIEWS['Architect'],'schedule','tasks'];   // the project architect sees both schedules
['Draftsman','Senior architect'].forEach(r=>{if(!ROLE_VIEWS[r])ROLE_VIEWS[r]=ROLE_VIEWS['Architect'];UI_OF[r]='design';CAT_OF[r]='design';});
/* offered in Team / sign-up only once the server knows these two roles (see wtSrv) */
function apAddRoles(){['Draftsman','Senior architect'].forEach(r=>{const o=MOD.team.fields.find(f=>f.k==='role').o;if(!o.includes(r))o.splice(o.indexOf('Structural engineer')+1,0,r);
  if(!JOIN_ROLES.includes(r))JOIN_ROLES.push(r);if(!RA_MORE.includes(r))RA_MORE.push(r);});}
{const st=MOD.documents.fields.find(f=>f.k==='status');if(st)st.o=['Draft','For checking','For approval','Approved','Sent back','Superseded'];}

const AP_STEPS=[{n:'Drafted',who:'Draftsman',act:'Submit for checking'},{n:'Checked',who:'Architect / PM',act:'Mark checked'},{n:'Approved',who:'Senior architect',act:'Approve'}];
const AP_STATUS=['Draft','For checking','For approval','Approved'];
const AP_WHO_DEF={2:['Admin','Project manager','Senior architect','Architect','Structural engineer'],3:['Admin','Senior architect']};
const apWho=st=>{const o=(orgMain().apprRoles||{})[st];return Array.isArray(o)&&o.length?o:AP_WHO_DEF[st];};
/* my own role for approvals: the owner is Admin; everyone else by their team role (a project manager is not the senior architect) */
function apMyRole(){if(S.viewAs)return S.viewAs;if(ME.isOwner)return 'Admin';const t=myTeamRec();if(t&&t.role)return t.role;if(S.demo||(S.web&&!S.cloud))return 'Admin';return isAdmin()?'Project manager':'';}
function apCan(st){if(!CANW)return false;if(st===1)return canEditView('documents');const r=apMyRole();return r==='Admin'||apWho(st).includes(r);}
/* stage reached: 0 = not submitted / sent back, 1 = drafted, 2 = checked, 3 = approved */
function apStage(d){if(!d)return 0;if(d.status==='Approved')return 3;if(d.status==='Sent back'||d.status==='Superseded'&&!d.appr)return 0;
  const a=d.appr;if(a)return a.s3?3:a.s2?2:a.s1?1:0;return d.status==='For approval'?1:((d.files||[]).length||d.link)&&d.fu?1:0;}
const apStatus=d=>d&&d.status==='Sent back'?'Sent back':d&&d.status==='Superseded'?'Superseded':AP_STATUS[apStage(d)];
const apPill=st=>st==='Approved'?'p-green':st==='Pending'?'p-grey':st==='Sent back'?'p-red':st==='For checking'||st==='For approval'?'p-amber':'p-blue';
/* → drawings: apChips */
/* → drawings: apButtons */
/* comments, send-backs and marked-up copies of one drawing */
/* → drawings: apLog */

/* the dialog for a stage / send back: who, comment, and a WhatsApp nudge to the next person */
/* → drawings: apDialog */
/* → drawings: apSave */

/* ---------- pen markup ---------- */
const dlMarkFile=d=>((d&&d.files)||[]).find(f=>/pdf|^image\/(jpe?g|png|webp)/.test(f.type||fileType(f.name)))||null;
const dlMarkable=d=>!!dlMarkFile(d);
const MK={doc:null,file:null,img:null,shapes:[],tool:'pen',color:'#e11d48',size:2,zoom:1,page:1,pages:1,pdf:null,draw:null};
const MK_COLORS=['#e11d48','#2563eb','#16a34a','#f59e0b','#111827','#ffffff'];
async function loadPdfJs(){await loadJs('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',()=>window.pdfjsLib);
  pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}
/* → drawings: mkOpen */
/* → drawings: mkImage */
/* → drawings: mkPage */
/* → drawings: mkReady */
/* → drawings: mkFit */
const mkU=()=>Math.max(MK.img?MK.img.width:1000,MK.img?MK.img.height:1000)/700;   // 1 "screen pixel" in drawing pixels
function mkShape(x,s){const u=mkU();x.save();x.strokeStyle=s.c;x.fillStyle=s.c;x.lineWidth=(s.t==='hl'?7:1.6)*s.w*u;x.lineCap='round';x.lineJoin='round';x.globalAlpha=s.t==='hl'?.35:1;
  if(s.t==='pen'||s.t==='hl'){x.beginPath();s.p.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));if(s.p.length===1)x.lineTo(s.p[0][0]+.1,s.p[0][1]);x.stroke();}
  else if(s.t==='box'){x.strokeRect(s.a[0],s.a[1],s.b[0]-s.a[0],s.b[1]-s.a[1]);}
  else if(s.t==='ring'){x.beginPath();x.ellipse((s.a[0]+s.b[0])/2,(s.a[1]+s.b[1])/2,Math.abs(s.b[0]-s.a[0])/2||1,Math.abs(s.b[1]-s.a[1])/2||1,0,0,Math.PI*2);x.stroke();}
  else if(s.t==='arrow'){const [x1,y1]=s.a,[x2,y2]=s.b,an=Math.atan2(y2-y1,x2-x1),h=(10+4*s.w)*u;x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke();
    x.beginPath();x.moveTo(x2,y2);x.lineTo(x2-h*Math.cos(an-.45),y2-h*Math.sin(an-.45));x.lineTo(x2-h*Math.cos(an+.45),y2-h*Math.sin(an+.45));x.closePath();x.fill();}
  else if(s.t==='text'){const fs=(12+5*s.w)*u;x.font=`600 ${fs}px system-ui,sans-serif`;x.textBaseline='top';x.lineWidth=fs/6;x.strokeStyle=s.c==='#ffffff'?'#111827':'#ffffff';
    String(s.s).split('\n').forEach((ln,i)=>{x.strokeText(ln,s.a[0],s.a[1]+i*fs*1.2);x.fillText(ln,s.a[0],s.a[1]+i*fs*1.2);});}
  x.restore();}
function mkDraw(){const cv=document.getElementById('mkCv');if(!cv||!MK.img)return;const x=cv.getContext('2d');x.drawImage(MK.img,0,0);MK.shapes.forEach(s=>mkShape(x,s));if(MK.draw)mkShape(x,MK.draw);}
function mkPt(e){const cv=document.getElementById('mkCv'),r=cv.getBoundingClientRect();return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height];}
document.addEventListener('pointerdown',e=>{if(e.target.id!=='mkCv'||MK.tool==='hand')return;e.preventDefault();const p=mkPt(e);
  if(MK.tool==='text'){mkTextAt(p,e);return;}
  try{e.target.setPointerCapture(e.pointerId);}catch(_){}MK.draw=MK.tool==='pen'||MK.tool==='hl'?{t:MK.tool,c:MK.color,w:MK.size,p:[p]}:{t:MK.tool,c:MK.color,w:MK.size,a:p,b:p};mkDraw();});
document.addEventListener('pointermove',e=>{if(!MK.draw||e.target.id!=='mkCv')return;e.preventDefault();const p=mkPt(e);if(MK.draw.p)MK.draw.p.push(p);else MK.draw.b=p;mkDraw();});
const mkEnd=()=>{if(!MK.draw)return;const s=MK.draw;MK.draw=null;if(s.p||Math.hypot(s.b[0]-s.a[0],s.b[1]-s.a[1])>3)MK.shapes.push(s);mkDraw();};
document.addEventListener('pointerup',mkEnd);document.addEventListener('pointercancel',mkEnd);
/* → drawings: mkTextAt */
/* → drawings: mkTextDone */
document.addEventListener('keydown',e=>{if(e.target.id==='mkTxt'){if(e.key==='Enter'){e.preventDefault();mkTextDone();}if(e.key==='Escape'){e.target.hidden=true;}return;}
  if(document.querySelector('.mk')&&(e.ctrlKey||e.metaKey)&&e.key==='z'){e.preventDefault();MK.shapes.pop();mkDraw();}});
document.addEventListener('focusout',e=>{if(e.target.id==='mkTxt')setTimeout(mkTextDone,0);});
window.addEventListener('resize',()=>{if(document.getElementById('mkCv'))mkFit();});
/* → drawings: mkTools */
/* → drawings: mkSave */

/* ---------- events ---------- */
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-apgo]'))){const [id,st]=b.dataset.apgo.split('|');apDialog(id,'go',+st);return;}
  if((b=e.target.closest('[data-apback]'))){apDialog(b.dataset.apback,'back');return;}
  if((b=e.target.closest('[data-mkup]'))){mkOpen(b.dataset.mkup);return;}
  if((b=e.target.closest('[data-mkx]'))){if(MK.shapes.length&&!MK.okClose){MK.okClose=true;toast('Marks not saved — tap ✕ again to close without saving');setTimeout(()=>MK.okClose=false,4000);return;}MK.okClose=false;MK.shapes=[];closeLayer();return;}
  if((b=e.target.closest('[data-mktool]'))){mkTextDone();MK.tool=b.dataset.mktool;mkTools();return;}
  if((b=e.target.closest('[data-mkcol]'))){MK.color=b.dataset.mkcol;mkTools();return;}
  if((b=e.target.closest('[data-mksz]'))){MK.size=+b.dataset.mksz;mkTools();return;}
  if((b=e.target.closest('[data-mkundo]'))){MK.shapes.pop();mkDraw();return;}
  if((b=e.target.closest('[data-mkclear]'))){MK.shapes=[];mkDraw();return;}
  if((b=e.target.closest('[data-mkz]'))){MK.zoom=Math.max(1,Math.min(6,MK.zoom*(+b.dataset.mkz>0?1.5:1/1.5)));if(MK.zoom>1&&MK.tool!=='hand')toast('Use ✋ Move to scroll around');mkFit();return;}
  if((b=e.target.closest('[data-mkpg]'))){mkPage(MK.page+ +b.dataset.mkpg);return;}
},true);
document.addEventListener('submit',e=>{const f=e.target;
  if(f.id==='apForm'){e.preventDefault();const t=(f.elements.t.value||'').trim();if(f.dataset.kind==='back'&&!t){toast('Write what needs to change');return;}apSave(f.dataset.id,f.dataset.kind,+f.dataset.st,t,f.elements.wa.checked,!!(f.elements.rel&&f.elements.rel.checked),f.elements.files?f.elements.files.files:null);return;}
  if(f.id==='mkForm'){e.preventDefault();mkSave((e.submitter&&e.submitter.value)==='share',(f.elements.t.value||'').trim());}},true);

/* ================= Staff work time (AutoCAD, SketchUp, Revit…) =================
 * The BuildMitr Windows app records, on office PCs, which program is in front and whether the PC is in use
 * (idle after 5 minutes without mouse / keyboard; locked screen is not counted). Only program names and drawing
 * file names are kept — no screenshots, no typing. The admin switches it on for the company; staff see their own time. */
Object.assign(ICONS,{'timer':'<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>'});
{const g=NAV[0].items;const i=g.findIndex(x=>x[0]==='team');if(!g.some(x=>x[0]==='worktime'))g.splice(i+1,0,['worktime','timer','Staff work time','పని సమయం']);}
const DESK=window.bmDesk||null;
const WT={range:'week',from:'',to:'',person:'',last:'',seen:null};
const WT_CAD=['AutoCAD','SketchUp','Revit','ETABS','SAFE','SAP2000','STAAD','Tekla','3ds Max','ArchiCAD','Rhino','Navisworks','Photoshop','Rendering'],WT_OFFICE=['Excel','Word','PowerPoint','MS Project','PDF reader','Google Sheets','Google Docs','Google Slides','BuildMitr'],WT_PERSONAL=['YouTube','WhatsApp'];
const wtGroup=a=>WT_CAD.includes(a)?'cad':WT_OFFICE.includes(a)?'office':WT_PERSONAL.includes(a)?'personal':a==='Browser'?'browser':'other';
const WT_GL={cad:'Drawing (CAD)',office:'Office & BuildMitr',browser:'Browser',personal:'YouTube / WhatsApp',other:'Other programs',idle:'Idle'};
const WT_GC={cad:'#16a34a',office:'#2563eb',browser:'#8b5cf6',personal:'#e11d48',other:'#94a3b8',idle:'#f59e0b'};
const wtOn=()=>!!orgMain().workTrack&&WT.srv!==false;
const hm=s=>{s=Math.round((s||0)/60);const h=Math.floor(s/60),m=s%60;return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}m`;};
const wtHash=s=>{let h=5381;for(const c of String(s))h=((h<<5)+h+c.charCodeAt(0))>>>0;return h.toString(36);};


/* the server must know staff work time before anything is recorded (older servers answer "Unknown request") */
WT.srv=null;
async function wtSrv(){if(WT.srv!==null||!S.cloud||WT.srvBusy)return WT.srv;WT.srvBusy=1;try{await gasApi('wtok');WT.srv=true;apAddRoles();}catch(e){WT.srv=/Unknown request/i.test(e.message||'')?false:null;}WT.srvBusy=0;if(S.view==='worktime')render();return WT.srv;}
/* ---- desktop app ⇄ page ---- */
function wtSync(){if(S.cloud&&S.ready&&WT.srv===null){wtSrv();return;}if(!DESK)return;const on=!!(S.ready&&!S.demo&&db&&ME.id&&wtOn()&&!['Client','none'].includes(curRole()));
  const key=on+'|'+ME.id+'|'+(ME.name||'');if(key===WT.last)return;WT.last=key;try{DESK.track({on,user:ME.name||'',org:orgName()});}catch(_){}}
setInterval(wtSync,4000);
function wtSeen(){if(!WT.seen){try{WT.seen=JSON.parse(localStorage.getItem('bm-wt-seq:'+(ME.id||''))||'[]');}catch(_){WT.seen=[];}}return WT.seen;}
if(DESK)DESK.onWork(async batches=>{
  if(!S.ready||S.demo||!ME.id||!wtOn())return;const seen=wtSeen();const list=[],acks=[];const tot={};
  for(const b of batches||[]){if(seen.includes(b.seq)){acks.push(b.seq);continue;}
    for(const it of b.items||[]){const id=`${ME.id}_${it.date}_${wtHash(it.app+'|'+it.file)}`;
      const old=tot[id]||D.worklog.find(x=>x.id===id)||{};
      tot[id]={user:ME.id,name:ME.name||'',date:it.date,app:it.app,file:it.file||'',act:n(old.act)+n(it.act),idle:n(old.idle)+n(it.idle),
        first:Math.min(n(old.first)||it.first,it.first),last:Math.max(n(old.last),it.last),pc:b.pc||old.pc||'',at:Date.now()};}
    acks.push(b.seq);}
  Object.entries(tot).forEach(([id,d])=>list.push(['worklog',id,d]));
  try{if(list.length)await dbBatch(list);
    acks.forEach(s=>{if(!seen.includes(s))seen.push(s);try{DESK.ack(s);}catch(_){}});WT.seen=seen.slice(-300);
    try{localStorage.setItem('bm-wt-seq:'+ME.id,JSON.stringify(WT.seen));}catch(_){}
    if(S.view==='worktime')refresh();}catch(_){}   // not saved: the desktop app keeps it and sends it again
});

/* ---- reading the records ---- */
function wtRange(){const t=new Date(today()+'T00:00:00'),d=x=>isoDate(x),add=(x,k)=>{const y=new Date(x);y.setDate(y.getDate()+k);return y;};
  if(WT.range==='today')return [d(t),d(t)];if(WT.range==='yday')return [d(add(t,-1)),d(add(t,-1))];
  if(WT.range==='week'){const m=add(t,-((t.getDay()+6)%7));return [d(m),d(t)];}if(WT.range==='7d')return [d(add(t,-6)),d(t)];
  if(WT.range==='month')return [d(new Date(t.getFullYear(),t.getMonth(),1)),d(t)];
  return [WT.from||d(add(t,-6)),WT.to||d(t)];}
function wtRecs(){const [a,b]=wtRange();const all=(D.worklog||[]).filter(r=>r.date>=a&&r.date<=b);return isAdmin()||S.demo?all:all.filter(r=>r.user===ME.id);}
function wtSum(rs){const o={act:0,idle:0,cad:0,office:0,browser:0,personal:0,other:0,apps:{},days:new Set(),first:0,last:0};
  rs.forEach(r=>{o.act+=n(r.act);o.idle+=n(r.idle);o[wtGroup(r.app)]+=n(r.act);o.apps[r.app]=(o.apps[r.app]||0)+n(r.act);if(n(r.act))o.days.add(r.date);
    if(n(r.first)&&(!o.first||r.first<o.first))o.first=r.first;if(n(r.last)>o.last)o.last=r.last;});
  o.tot=o.act+o.idle;o.pct=o.tot?Math.round(o.cad/o.tot*100):0;return o;}
const wtWho=id=>{const t=D.team.find(x=>x.account===id);return (t&&t.name)||nm(id);};
function wtBar(o){const segs=['cad','office','browser','personal','other'].map(k=>[k,o[k]]).concat([['idle',o.idle]]).filter(x=>x[1]>0);
  return `<div class="wt-bar" role="img" aria-label="${segs.map(([k,v])=>`${WT_GL[k]} ${hm(v)}`).join(', ')}">${segs.map(([k,v])=>`<i style="flex:${v};background:${WT_GC[k]}" title="${esc(WT_GL[k])}: ${hm(v)}"></i>`).join('')}</div>`;}
const wtLegend=()=>`<div class="wt-leg">${Object.keys(WT_GL).map(k=>`<span><i style="background:${WT_GC[k]}"></i>${esc(WT_GL[k])}</span>`).join('')}</div>`;
const wtPctPill=p=>`<span class="pill ${p>=60?'p-green':p>=35?'p-amber':'p-red'}">${p}%</span>`;
// which project a file belongs to: the admin's own choice first, then the project code, then words of the project / client name
const wtKey=f=>String(f||'').toLowerCase().replace(/\.[a-z0-9]{2,5}$/,'').replace(/[^a-z0-9]+/g,' ').trim();
const wtMap=()=>{const o=(D.org.find(x=>x.id==='main')||{}).wtmap;return o&&typeof o==='object'?o:{};};
const WT_STOP=new Set(['residence','residential','house','home','villa','project','projects','building','apartment','apartments','plan','plans','floor','layout','details','detail','elevation','section','sections','drawing','drawings','final','new','old','rev','copy','site','work','working','the','and','for','mr','mrs','sri','smt','dr','ltd','pvt','private','limited','interior','interiors','exterior','structure','structural','boq','estimate','ground','first','second','third','plot','commercial','office']);
const WT_WEAK=new Set(['nagar','road','colony','layout','city','town','street','enclave','hills','park','gardens','phase','block','sector']);
function wtWords(t){return String(t||'').toLowerCase().split(/[^a-z0-9]+/).filter(x=>x.length>=3&&!WT_STOP.has(x)&&!/^\d+$/.test(x));}
const WT_PC={};
function wtProjId(file){const k=wtKey(file);if(!k)return '';const m=wtMap();if(m[k]!==undefined)return m[k];
  if(WT_PC[k]!==undefined)return WT_PC[k];
  const fw=new Set(wtWords(k)),fk=' '+k+' ';let best='',bs=0;
  PJ().forEach(p=>{let sc=0;const pre=String(p.prefix||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    if(pre&&fk.includes(' '+pre+' '))sc+=10;
    const nw=wtWords(p.name);sc+=nw.filter(w=>fw.has(w)).reduce((t,w)=>t+(WT_WEAK.has(w)?1:3),0)+nw.filter(w=>w.length>=5&&!fw.has(w)&&!WT_WEAK.has(w)&&k.includes(w)).length*2;
    const pw=String(p.name||'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);for(let i=0;i+1<pw.length;i++)if(fk.includes(' '+pw[i]+' '+pw[i+1]+' ')&&!WT_STOP.has(pw[i+1])||fk.includes(' '+pw[i]+' '+pw[i+1]+' ')&&pw[i].length<3)sc+=3;
    const cw=wtWords(typeof cname==='function'?cname(p.client):'');sc+=cw.filter(w=>fw.has(w)).length*2;
    if(sc>bs){bs=sc;best=p.id;}});
  return WT_PC[k]=bs>=2?best:'';}
function wtProj(file){const id=wtProjId(file);const p=id&&proj(id);return p?p.name:'';}

function wtProjBox(rs,who){const by={};let none=0;
  rs.forEach(r=>{const a=n(r.act);if(!a||wtGroup(r.app)==='personal')return;const id=r.file?wtProjId(r.file):'';if(!id){none+=a;return;}
    const x=by[id]||(by[id]={act:0,ppl:new Set(),apps:{}});x.act+=a;x.ppl.add(r.user);x.apps[r.app]=(x.apps[r.app]||0)+a;});
  const L=Object.entries(by).sort((a,b)=>b[1].act-a[1].act);if(!L.length)return '';const mx=L[0][1].act;
  return `<div class="box"><div class="box-h">${ico('folder')}<h2>Time by project</h2><span class="code">${L.length}</span></div>
    <div class="tbl-wrap"><table class="wt-t"><thead><tr><th>Project</th><th style="min-width:160px">Time</th><th>Programs</th>${who?'<th class="num">Staff</th>':''}</tr></thead><tbody>
    ${L.map(([id,x])=>`<tr><td><b>${esc(pname(id))}</b></td><td><div class="wt-bar"><i style="flex:${x.act};background:${WT_GC.cad}"></i><i style="flex:${Math.max(mx-x.act,0)};background:transparent"></i></div><span class="code">${hm(x.act)}</span></td>
      <td class="code">${Object.entries(x.apps).sort((a,b)=>b[1]-a[1]).map(([a,v])=>esc(a)+' '+hm(v)).join(' · ')}</td>${who?`<td class="num">${x.ppl.size}</td>`:''}</tr>`).join('')}</tbody></table></div>
    ${none?`<div class="srow"><span class="code">${hm(none)} of work could not be linked to a project (no file name, or a name that matches no project). ${isAdmin()||S.demo?'Pick the project next to a file under the person\'s files worked on — it is remembered for that file.':''}</span></div>`:''}</div>`;}
/* ---- the page ---- */
function vWorkTime(){Object.keys(WT_PC).forEach(k=>delete WT_PC[k]);
  const adm=isAdmin()||S.demo,[a,b]=wtRange(),rs=wtRecs();
  const ranges=[['today','Today'],['yday','Yesterday'],['week','This week'],['7d','Last 7 days'],['month','This month'],['custom','Pick dates']];
  const top=`<div class="box"><div class="srow">${ranges.map(([k,l])=>`<button type="button" class="btn sm ${WT.range===k?'pri':''}" data-wtr="${k}">${l}</button>`).join('')}
    ${WT.range==='custom'?`<label class="code">From <input type="date" id="wtFrom" value="${esc(a)}"></label><label class="code">To <input type="date" id="wtTo" value="${esc(b)}"></label>`:''}
    <span class="code" style="margin-left:auto">${esc(fd(a))}${a!==b?' – '+esc(fd(b)):''}</span>${rs.length?`<button type="button" class="btn sm" id="wtCsv">${ico('file-down')}<span>Excel / CSV</span></button>`:''}</div></div>`;
  const setup=adm?wtSetupBox():(wtOn()?`<div class="note">${ico('timer')}<span>${esc(orgName())} records work time on office PCs through the BuildMitr Windows app: which program is open (AutoCAD, SketchUp…), the drawing file name, and idle time. No screenshots or typing. You see your own time here.</span></div>`:'');
  if(WT.person)return header('Work time — '+wtWho(WT.person),`<button class="btn" data-wtp="">${ico('arrow-left')}<span>All staff</span></button>`)+top+wtPerson(WT.person,rs.filter(r=>r.user===WT.person));
  if(!adm)return header('My work time')+setup+top+(rs.length?wtPerson(ME.id,rs):`<div class="box hero-empty">${ico('timer')}<h2>No work time yet</h2><p>${wtOn()?'Open the BuildMitr Windows app on your office PC and sign in — your time is added every few minutes.':'Your admin has not switched on work time recording.'}</p></div>`);
  const by={};rs.forEach(r=>(by[r.user]=by[r.user]||[]).push(r));
  const ppl=Object.keys(by).map(u=>({u,name:wtWho(u),o:wtSum(by[u])})).sort((x,y)=>y.o.cad-x.o.cad);
  const all=wtSum(rs);
  const table=ppl.length?`<div class="box"><div class="box-h">${ico('users')}<h2>Staff</h2><span class="code">${ppl.length} ${ppl.length>1?'people':'person'}</span></div>${wtLegend()}
    <div class="tbl-wrap"><table class="wt-t"><thead><tr><th>Staff</th><th>Drawing time</th><th style="min-width:200px">Where the time went</th><th class="num">AutoCAD</th><th class="num">SketchUp</th><th class="num">Revit</th><th class="num">Other work</th><th class="num">YouTube / WhatsApp</th><th class="num">Idle</th><th class="num">Days</th><th>Last seen</th></tr></thead>
    <tbody>${ppl.map(({u,name,o})=>`<tr class="wt-row" data-wtp="${esc(u)}" tabindex="0"><td><b>${esc(name)}</b></td><td>${wtPctPill(o.pct)} <span class="code">${hm(o.cad)}</span></td><td>${wtBar(o)}</td>
      <td class="num">${hm(o.apps.AutoCAD)}</td><td class="num">${hm(o.apps.SketchUp)}</td><td class="num">${hm(o.apps.Revit)}</td><td class="num">${hm(o.act-(o.apps.AutoCAD||0)-(o.apps.SketchUp||0)-(o.apps.Revit||0)-o.personal)}</td>
      <td class="num">${hm(o.personal)}</td><td class="num">${hm(o.idle)}</td><td class="num">${o.days.size}</td><td class="code">${o.last?esc(new Date(o.last).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})):'—'}</td></tr>`).join('')}</tbody></table></div>
    <div class="srow"><span class="code"><b>Drawing time</b> = time in AutoCAD, SketchUp, Revit, ETABS, STAAD, 3ds Max, rendering and other design programs ÷ all recorded time (including idle). Tap a name for each day and each drawing file.</span></div></div>`
   :`<div class="box hero-empty">${ico('timer')}<h2>No work time recorded ${WT.range==='today'?'today':'in these dates'}</h2><p>${wtOn()?'Install the BuildMitr Windows app on each office PC and let staff sign in once. Time appears here a few minutes later.':'Switch on work time recording above, then install the BuildMitr Windows app on the office PCs.'}</p></div>`;
  const kpi=ppl.length?`<div class="box"><div class="tiles">${[['Drawing time',hm(all.cad),`${all.pct}% of recorded time`],['AutoCAD',hm(all.apps.AutoCAD),''],['SketchUp',hm(all.apps.SketchUp),''],['Revit',hm(all.apps.Revit),''],['Idle',hm(all.idle),all.tot?Math.round(all.idle/all.tot*100)+'% of recorded time':'']].map(([l,v,x])=>`<div class="tile"><b>${v}</b><span>${l}${x?' · '+x:''}</span></div>`).join('')}</div></div>`:'';
  return header('Staff work time')+setup+top+kpi+table+wtProjBox(rs,1);
}
function wtPerson(u,rs){const adm=isAdmin()||S.demo;
  const o=wtSum(rs);const days=[...new Set(rs.map(r=>r.date))].sort().reverse();
  const daysBox=`<div class="box"><div class="box-h">${ico('calendar-range')}<h2>Each day</h2>${wtPctPill(o.pct)}<span class="code">drawing time ${hm(o.cad)} of ${hm(o.tot)}</span></div>${wtLegend()}
    <div class="tbl-wrap"><table class="wt-t"><thead><tr><th>Day</th><th style="min-width:220px">Where the time went</th><th class="num">Drawing</th><th class="num">Idle</th><th class="num">Total</th><th>First – last</th></tr></thead><tbody>
    ${days.map(d=>{const x=wtSum(rs.filter(r=>r.date===d));return `<tr><td>${esc(fd(d))}</td><td>${wtBar(x)}</td><td class="num">${hm(x.cad)} ${wtPctPill(x.pct)}</td><td class="num">${hm(x.idle)}</td><td class="num">${hm(x.tot)}</td><td class="code">${x.first?new Date(x.first).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'}):''} – ${x.last?new Date(x.last).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'}):''}</td></tr>`;}).join('')}</tbody></table></div></div>`;
  const files={};rs.filter(r=>r.file).forEach(r=>{const k=r.app+'|'+r.file;const f=files[k]||(files[k]={app:r.app,file:r.file,act:0,idle:0,days:new Set()});f.act+=n(r.act);f.idle+=n(r.idle);f.days.add(r.date);});
  const fl=Object.values(files).sort((a,b)=>b.act-a.act);
  const filesBox=`<div class="box"><div class="box-h">${ico('file-text')}<h2>Files worked on</h2><span class="code">${fl.length}</span></div>${fl.length?`<div class="tbl-wrap"><table class="wt-t"><thead><tr><th>File</th><th>Program</th><th>Project</th><th class="num">Active</th><th class="num">Idle</th><th class="num">Days</th></tr></thead><tbody>
    ${fl.slice(0,60).map(f=>`<tr><td><b>${esc(f.file)}</b></td><td>${esc(f.app)}</td><td>${adm?`<select class="wt-pj" style="min-width:140px;max-width:220px" data-wtmap="${esc(wtKey(f.file))}" aria-label="Project for ${esc(f.file)}"><option value="">—</option>${PJ().map(p=>`<option value="${esc(p.id)}" ${wtProjId(f.file)===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select>`:(esc(wtProj(f.file))||'<span class="code">—</span>')}</td><td class="num">${hm(f.act)}</td><td class="num">${hm(f.idle)}</td><td class="num">${f.days.size}</td></tr>`).join('')}</tbody></table></div>`:`<div class="srow"><span class="code">No files in these dates. File names show for AutoCAD, Revit, SketchUp, ETABS, Excel, Word and most design programs.</span></div>`}</div>`;
  const apps=Object.entries(o.apps).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  const appsBox=`<div class="box"><div class="box-h">${ico('monitor')}<h2>Programs</h2></div><div class="wt-apps">${apps.map(([k,v])=>`<div><span>${esc(k)}</span><div class="prog"><i style="width:${o.act?Math.max(2,Math.round(v/o.act*100)):0}%;background:${WT_GC[wtGroup(k)]}"></i></div><b>${hm(v)}</b></div>`).join('')}</div></div>`;
  return daysBox+wtProjBox(rs,0)+filesBox+appsBox;
}
function wtSetupBox(){const on=wtOn();if(S.cloud&&WT.srv===null)wtSrv();
  if(WT.srv===false)return `<div class="box"><div class="box-h">${ico('timer')}<h2>Work time recording</h2><span class="pill p-amber">Server update needed</span></div><div class="inst-b"><p>Work time recording is ready in the app, but your BuildMitr server needs a small update first (Apps Script → new version). After that you can switch it on here.</p></div></div>`;
  return `<div class="box"><div class="box-h">${ico('timer')}<h2>Work time recording</h2><span class="pill ${on?'p-green':'p-grey'}">${on?'On':'Off'}</span></div><div class="inst-b">
    <p>The <b>BuildMitr Windows app</b> on each office PC records the time each person spends in <b>AutoCAD, SketchUp, Revit, ETABS</b>, Excel and other programs, the <b>drawing file</b> they have open, and <b>idle time</b> (no mouse or keyboard for 5 minutes). A locked screen is not counted. No screenshots, no typing.</p>
    <p class="code">Staff see a BuildMitr icon in the taskbar tray saying their work time is recorded, and can see their own time in BuildMitr. Tell your staff before switching it on (India's DPDP Act needs notice to employees).</p>
    <div class="srow" style="padding:0;border:0"><button type="button" class="btn ${on?'warn':'pri'}" id="wtToggle">${ico(on?'x':'check')}<span>${on?'Switch off':'Switch on for '+esc(orgName())}</span></button>
      <a class="btn" href="${typeof WIN_URL!=='undefined'?WIN_URL:'#'}" target="_blank" rel="noopener">${ico('download')}<span>Windows app for office PCs</span></a>
      <button type="button" class="btn ghost" id="wtShare">${ico('share-2')}<span>Send install steps to staff</span></button></div>
    <ol class="code" style="margin:10px 0 0 18px"><li>Install BuildMitr-Setup.exe on each office PC.</li><li>Each person opens BuildMitr once and signs in with their login code.</li><li>From then on it starts with Windows and records in the background (closing the window keeps it in the tray).</li></ol></div></div>`;}
/* → office: wtCsv */
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-wtr]'))){WT.range=b.dataset.wtr;render();return;}
  if((b=e.target.closest('[data-wtp]'))){WT.person=b.dataset.wtp;render();scrollTo(0,0);return;}
  const id=(e.target.closest('button')||{}).id;
  if(id==='wtCsv'){wtCsv();return;}
  if(id==='wtToggle'){const on=!wtOn();write(()=>db.doc('org/main').update({workTrack:on}),on?'Work time recording switched on':'Work time recording switched off').then(()=>render());return;}
  if(id==='wtShare'){shareSheet('BuildMitr work time',`Hello team,\n\n${orgName()} uses BuildMitr to record work time on office PCs (programs like AutoCAD / SketchUp, the drawing file name, and idle time — no screenshots).\n\n1. Download and install: ${typeof WIN_URL!=='undefined'?WIN_URL:APP_URL}\n2. Open BuildMitr and sign in with your login code.\n3. Keep it running — it stays in the taskbar tray.\n\nYou can see your own time in BuildMitr → Staff work time.\n\n— ${ME.name||orgName()}`);return;}
},true);
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('wt-row')){WT.person=e.target.dataset.wtp;render();}},true);
document.addEventListener('change',e=>{const m=e.target.dataset&&e.target.dataset.wtmap;if(m!==undefined&&m!==''){const o=Object.assign({},wtMap());o[m]=e.target.value;Object.keys(WT_PC).forEach(k=>delete WT_PC[k]);
    write(()=>db.doc('org/main').update({wtmap:o}),e.target.value?'Saved — this file now counts for '+(proj(e.target.value)||{}).name:'Project removed for this file').then(()=>render());return;}
  if(e.target.id==='wtFrom'){WT.from=e.target.value;render();}if(e.target.id==='wtTo'){WT.to=e.target.value;render();}},true);

/* demo: a week of sample work time for the demo team */
{const _dd=demoData;demoData=function(){const X=_dd();const t=new Date();const L=[];
  const P=[['dm4','AutoCAD',['GF Roof Shuttering Layout.dwg','Column Layout.dwg','JP Nagar Floor Plans.dwg'],.72],['dm4','SketchUp',['JP Nagar Elevation.skp'],.5],['dm2','AutoCAD',['Site Plan.dwg'],.3],['dm2','SketchUp',['Interior Living.skp'],.25],['dm3','AutoCAD',['Plinth Beam Layout.dwg'],.45],['dm2','Revit',['Prasad WD'],.3],['dm3','ETABS',['Lakshmi G+1 frame.EDB'],.3],['dm2','Excel',['BM-26-21 BOQ'],.12]];
  for(let k=0;k<7;k++){const d=new Date(t);d.setDate(t.getDate()-k);if(d.getDay()===0)continue;const ds=isoDate(d),base=new Date(ds+'T09:30:00').getTime();
    P.forEach(([u,app,files,w],i)=>files.forEach((f,j)=>{const act=Math.round((3600*7*w/files.length)*(0.8+((k*7+i*3+j)%5)/10)/15)*15;L.push({id:`${u}_${ds}_${i}${j}`,user:u,date:ds,app,file:f,act,idle:Math.round(act*.12/15)*15,first:base+j*1800e3,last:base+8*3600e3,pc:'OFFICE-PC'+(i%3+1)});}));
    ['dm2','dm3','dm4'].forEach((u,i)=>{L.push({id:`${u}_${ds}_x`,user:u,date:ds,app:['YouTube','WhatsApp','Excel'][(i+k)%3],file:'',act:900*(1+(i+k)%3),idle:600,first:base,last:base+7*3600e3});L.push({id:`${u}_${ds}_b`,user:u,date:ds,app:'BuildMitr',file:'',act:1200,idle:0,first:base,last:base+7*3600e3});});}
  X.worklog=L;return X;};}

/* ================= Notices to sign + Log-in log =================
 * Notices: the admin posts a notice (text and/or a PDF); each staff member reads it, ticks "I agree", types their name and
 * signs. The server stamps its own time; a signature can never be changed. A signed copy can be downloaded as PDF.
 * Log-in log: every time someone opens BuildMitr it records when, the device (mobile / tablet / PC / laptop), the app or
 * browser, and the location (asked once), plus sign-outs and last activity. Staff see their own; the admin sees everyone. */
Object.assign(ICONS,{
  'file-signature':'<path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7.5V8"/><path d="M14 2v6h6"/><path d="M10 18H7"/><path d="M21.4 10.6a2 2 0 1 1 2.8 2.8L19 18.6l-4 1 1-4Z"/>',
  'laptop':'<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
  'tablet':'<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>',
  'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  'paperclip':'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  'eraser':'<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>'});
COLS.push('notices','noticesign','attlog');
{const g=NAV[0].items;const i=g.findIndex(x=>x[0]==='messages');if(!g.some(x=>x[0]==='notices'))g.splice(i+1,0,['notices','file-signature','Notices','నోటీసులు']);}
const NT={open:'',edit:false};
const staffRole=()=>!['Client','none'].includes(curRole());
const ntForMe=n=>n&&n.active!==false&&(!n.to||n.to==='all'||(Array.isArray(n.to)&&n.to.includes(apMyRole()||curRole())));
const ntSigOf=(nid,uid)=>(D.noticesign||[]).find(s=>s.notice===nid&&s.user===(uid||ME.id));
const ntPending=()=>staffRole()&&!S.demo?(D.notices||[]).filter(n=>ntForMe(n)&&n.by!==ME.id&&!ntSigOf(n.id)):[];
/* → office: ntHash */
/* staff who should sign: team members with a BuildMitr account, not clients */
/* → office: ntPeople */

/* ---------- device, app and place ---------- */
function devKind(){const ua=navigator.userAgent||'';
  if(/iPad|Tablet/i.test(ua)||(/Android/i.test(ua)&&!/Mobile/i.test(ua))||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1))return 'Tablet';
  if(/Mobi|iPhone|Android/i.test(ua))return 'Mobile';return 'PC';}
function appKind(){const ua=navigator.userAgent||'';
  if(DESK||/src=win/.test(location.search))return 'Windows app';if(/src=android/.test(location.search))return 'Android app';
  const os=/Windows/.test(ua)?'Windows':/Android/.test(ua)?'Android':/iPhone|iPad/.test(ua)?'iOS':/Mac OS X|Macintosh/.test(ua)?'macOS':/Linux/.test(ua)?'Linux':'';
  const br=/Edg\//.test(ua)?'Edge':/OPR\//.test(ua)?'Opera':/SamsungBrowser/.test(ua)?'Samsung Internet':/Firefox\//.test(ua)?'Firefox':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)?'Safari':'Browser';
  let inst=false;try{inst=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}catch(_){}
  return (inst?'Installed app · ':'')+br+(os?' on '+os:'');}
async function devDetail(){let d=devKind();
  if(d==='PC'){try{if(DESK&&DESK.device){const k=await DESK.device();if(k)return k;}}catch(_){}
    try{if(navigator.getBattery){const b=await navigator.getBattery();if(!b.charging||b.level<1||(b.dischargingTime&&b.dischargingTime!==Infinity))return 'Laptop';}}catch(_){}
    return 'PC / Laptop';}
  return d;}
const distM=(a,b)=>{const R=6371e3,r=x=>x*Math.PI/180,dl=r(b.lat-a.lat),dg=r(b.lng-a.lng);const h=Math.sin(dl/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
function placeOf(lat,lng){const here={lat,lng},c=[];const o=orgMain().office;if(o&&o.lat)c.push(['Office',o]);
  PJ().forEach(p=>{const l=p.loc||(p.maps&&parseLoc(p.maps));if(l&&l.lat)c.push([p.name+' site',l]);});
  let best=null;c.forEach(([n,l])=>{const d=distM(here,l);if(!best||d<best[1])best=[n,d];});
  return best&&best[1]<=400?`At ${best[0]}`:best&&best[1]<=3000?`${(best[1]/1000).toFixed(1)} km from ${best[0]}`:'';}
const DEV_ICO={Mobile:'smartphone',Tablet:'tablet',Laptop:'laptop','PC / Laptop':'monitor',PC:'monitor'};

/* ---------- this session in the log-in log ---------- */
const LL={sid:null,id:null,beat:null,locAsked:false,locErr:''};
function llDay(){return today();}
async function llStart(){
  if(LL.id||!S.cloud||!S.ready||S.demo||S.viewAs||!ME.id||WT.srv!==true)return;
  try{LL.sid=sessionStorage.getItem('bm-sess:'+ME.id);}catch(_){}
  if(!LL.sid){LL.sid=Date.now().toString(36)+Math.random().toString(36).slice(2,6);try{sessionStorage.setItem('bm-sess:'+ME.id,LL.sid);sessionStorage.setItem('bm-sess-day:'+ME.id,llDay());}catch(_){}}
  let day=llDay();try{day=sessionStorage.getItem('bm-sess-day:'+ME.id)||day;}catch(_){}
  LL.id=`${ME.id}_${day}_${LL.sid}`;const old=(D.attlog||[]).find(x=>x.id===LL.id);const now=Date.now();
  if(!old){const dev=await devDetail();
    await write(()=>db.doc('attlog/'+LL.id).set({user:ME.id,name:ME.name||'',date:day,start:now,last:now,dev,app:appKind(),ua:String(navigator.userAgent||'').slice(0,200),loc:'asking'}),null);}
  else await write(()=>db.doc('attlog/'+LL.id).update({last:now}),null);
  if(!old||!old.lat)llLocate();
  clearInterval(LL.beat);LL.beat=setInterval(()=>{if(document.visibilityState==='visible'||DESK)write(()=>db.doc('attlog/'+LL.id).update({last:Date.now()}),null);},5*60*1000);
}
function llLocate(){if(!LL.id)return;LL.locAsked=true;
  if(!navigator.geolocation){write(()=>db.doc('attlog/'+LL.id).update({loc:'Not available on this device'}),null);return;}
  navigator.geolocation.getCurrentPosition(p=>{const lat=+p.coords.latitude.toFixed(6),lng=+p.coords.longitude.toFixed(6);LL.locErr='';
      write(()=>db.doc('attlog/'+LL.id).update({lat,lng,acc:Math.round(p.coords.accuracy||0),place:placeOf(lat,lng),loc:'ok'}),null);if(S.view==='worktime')render();},
    e=>{LL.locErr=e&&e.code===1?'Not allowed':'Not found';write(()=>db.doc('attlog/'+LL.id).update({loc:LL.locErr}),null);
      toast(e&&e.code===1?'Please allow location for BuildMitr — your log-in is recorded without a location.':'Could not find your location.');if(S.view==='worktime')render();},
    {enableHighAccuracy:true,timeout:20000,maximumAge:60000});}
setInterval(()=>{if(S.ready&&S.cloud&&!LL.id&&WT.srv===true)llStart();},3000);
{const _so=cloudSignOut;cloudSignOut=async function(){try{if(LL.id&&db){await write(()=>db.doc('attlog/'+LL.id).update({end:Date.now(),last:Date.now(),endKind:'Signed out'}),null);
  await Promise.race([db.flush&&db.flush(),new Promise(r=>setTimeout(r,3000))]);}}catch(_){}try{sessionStorage.removeItem('bm-sess:'+ME.id);}catch(_){}return _so.apply(this,arguments);};}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&LL.id)write(()=>db.doc('attlog/'+LL.id).update({last:Date.now()}),null);});

/* ---------- Log-in log page (a tab in Staff work time) ---------- */
const llTm=t=>t?new Date(t).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'}):'';
function vLogLog(){const adm=isAdmin()||S.demo,[a,b]=wtRange();
  let rs=(D.attlog||[]).filter(r=>r.date>=a&&r.date<=b);if(!adm)rs=rs.filter(r=>r.user===ME.id);if(WT.person)rs=rs.filter(r=>r.user===WT.person);
  const office=orgMain().office;
  const officeBox=adm&&!S.demo?`<div class="box"><div class="srow"><span class="code" style="flex:1">${ico('map-pin')} Office location ${office&&office.lat?`set (${office.lat.toFixed(4)}, ${office.lng.toFixed(4)}) — log-ins within 400 m show “At Office”. Project sites with a location show “At … site”.`:'not set — stand in the office and tap the button so log-ins there show “At Office”.'}</span>
    <button type="button" class="btn sm" id="llOffice">${ico('map-pin')}<span>${office&&office.lat?'Reset':'Set'} office location here</span></button></div></div>`:'';
  const me=!adm&&LL.locErr==='Not allowed'?`<div class="note" style="background:var(--amber);color:var(--amber-ink)">${ico('map-pin')}<span style="flex:1">Location is blocked for BuildMitr. Allow it in the browser / phone settings (Site settings → Location → Allow), then tap Try again.</span><button class="btn sm" id="llRetry">Try again</button></div>`:'';
  const by={};rs.forEach(r=>{const k=r.user+'|'+r.date;(by[k]=by[k]||[]).push(r);});
  const keys=Object.keys(by).sort((x,y)=>{const [ux,dx]=x.split('|'),[uy,dy]=y.split('|');return dy.localeCompare(dx)||wtWho(ux).localeCompare(wtWho(uy));});
  const row=r=>{const dev=r.dev||'—',loc=r.lat?`<a href="https://www.google.com/maps?q=${r.lat},${r.lng}" target="_blank" rel="noopener">${ico('map-pin')}${esc(r.place||`${(+r.lat).toFixed(4)}, ${(+r.lng).toFixed(4)}`)}</a>${r.acc?` <span class="code">±${r.acc} m</span>`:''}`
      :`<span class="${r.loc==='asking'?'code':'ll-bad'}">${esc(r.loc==='asking'?'Asking…':r.loc==='Not allowed'?'Location not allowed':r.loc||'No location')}</span>`;
    const end=r.end?`${ico('log-out')} Signed out ${llTm(r.end)}`:`<span class="code">Last active ${llTm(r.last)}</span>`;
    return `<div class="ll-s"><span class="ll-t">${ico('log-in')}<b>${llTm(r.srv0||r.start)}</b></span><span class="ll-e">${end}</span><span class="ll-d">${ico(DEV_ICO[dev]||'monitor')}${esc(dev)} <span class="code">· ${esc(r.app||'')}</span></span><span class="ll-l">${loc}</span></div>`;};
  const body=keys.length?keys.map(k=>{const [u,d]=k.split('|');const L=by[k].sort((x,y)=>(x.srv0||x.start)-(y.srv0||y.start));const first=L[0],last=L.reduce((m,x)=>Math.max(m,x.end||x.last||0),0);
      return `<div class="box"><div class="box-h">${ico('calendar-range')}<h2>${adm?esc(wtWho(u))+' · ':''}${esc(fd(d))}</h2><span class="pill p-green">First log-in ${llTm(first.srv0||first.start)}</span><span class="code">${L.length} log-in${L.length>1?'s':''} · until ${llTm(last)}</span></div>${L.map(row).join('')}</div>`;}).join('')
    :`<div class="box hero-empty">${ico('log-in')}<h2>No log-ins in these dates</h2><p>${WT.srv===false?'The server update is needed before log-ins are recorded.':'Every time someone opens BuildMitr on a phone or PC, it shows here with the device and location.'}</p></div>`;
  return me+officeBox+body;}
/* the Staff work time page gets two tabs: Work time and Log-in log */
{const _vw=vWorkTime;vWorkTime=function(){const tab=WT.tab||'time';
  const tabs=`<div class="srow" style="padding:0 0 10px;border:0"><button type="button" class="btn ${tab==='time'?'pri':''}" data-wttab="time">${ico('timer')}<span>Work time (PC programs)</span></button><button type="button" class="btn ${tab==='log'?'pri':''}" data-wttab="log">${ico('log-in')}<span>Log-in log</span></button></div>`;
  if(tab==='time'){const h=_vw();const i=h.indexOf('<div class="box');return i<0?h+tabs:h.slice(0,i)+tabs+h.slice(i);}
  const adm=isAdmin()||S.demo,[a,b]=wtRange();
  const ranges=[['today','Today'],['yday','Yesterday'],['week','This week'],['7d','Last 7 days'],['month','This month'],['custom','Pick dates']];
  const ppl=[...new Set((D.attlog||[]).map(r=>r.user))];
  const top=`<div class="box"><div class="srow">${ranges.map(([k,l])=>`<button type="button" class="btn sm ${WT.range===k?'pri':''}" data-wtr="${k}">${l}</button>`).join('')}
    ${WT.range==='custom'?`<label class="code">From <input type="date" id="wtFrom" value="${esc(a)}"></label><label class="code">To <input type="date" id="wtTo" value="${esc(b)}"></label>`:''}
    ${adm&&ppl.length?`<select id="llWho" aria-label="Staff" style="width:auto;max-width:220px"><option value="">All staff</option>${ppl.map(u=>`<option value="${esc(u)}" ${WT.person===u?'selected':''}>${esc(wtWho(u))}</option>`).join('')}</select>`:''}
    <span class="code" style="margin-left:auto">${esc(fd(a))}${a!==b?' – '+esc(fd(b)):''}</span><button type="button" class="btn sm" id="llCsv">${ico('file-down')}<span>Excel / CSV</span></button></div></div>`;
  return header(adm?'Staff work time':'My work time')+tabs+top+vLogLog();};}
/* → office: llCsv */

/* ---------- Notices page ---------- */
/* → office: vNotices */
/* → office: ntOne */
const NT_SAMPLE=()=>({title:'Notice: recording of work time, log-ins and location',body:`Dear team,

${orgName()} uses BuildMitr to manage projects and office work. To plan work fairly and keep accurate records, the following information is recorded while you use company systems:

1. Log-in log — every time you open BuildMitr on a phone or PC: the date and time, the device type (mobile / tablet / PC / laptop), the app or browser, and your location at that moment (only if you allow location).
2. Work time on office PCs — through the BuildMitr Windows app: which program is in use (for example AutoCAD, SketchUp, Revit), the name of the drawing file that is open, and idle time (no mouse or keyboard for 5 minutes). No screenshots are taken and nothing you type is recorded. A locked screen is not counted.

Why: to plan projects, check workloads and drawing time, and keep attendance records.
Who can see it: the company admin / management. You can see your own records in BuildMitr at any time (Staff work time).
How long it is kept: for as long as you work with us and up to one year after, unless the law requires longer.
Your rights: under the Digital Personal Data Protection Act, 2023 you may ask to see your data, ask for corrections, and raise any concern with the admin.

By signing below you confirm that you have read and understood this notice and agree to this recording during working hours on company devices and in BuildMitr.`});
/* → office: ntPdf */
/* signature pad */
const PAD={on:false,ink:false};
document.addEventListener('pointerdown',e=>{if(e.target.id!=='ntPad')return;e.preventDefault();const c=e.target,x=c.getContext('2d'),r=c.getBoundingClientRect();
  PAD.on=true;PAD.ink=true;try{c.setPointerCapture(e.pointerId);}catch(_){}x.lineWidth=3.2;x.lineCap='round';x.lineJoin='round';x.strokeStyle='#111827';x.beginPath();x.moveTo((e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height);});
document.addEventListener('pointermove',e=>{if(!PAD.on||e.target.id!=='ntPad')return;e.preventDefault();const c=e.target,x=c.getContext('2d'),r=c.getBoundingClientRect();x.lineTo((e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height);x.stroke();});
document.addEventListener('pointerup',()=>{PAD.on=false;});
/* → office: ntSign */
/* → office: ntForm */
/* → office: ntSave */
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-wttab]'))){WT.tab=b.dataset.wttab;WT.person='';render();return;}
  if((b=e.target.closest('[data-ntopen]'))){NT.open=b.dataset.ntopen;render();scrollTo(0,0);return;}
  if((b=e.target.closest('[data-ntpdf]'))){ntPdf(b.dataset.ntpdf);return;}
  if((b=e.target.closest('[data-ntview]'))){const n=(D.notices||[]).find(x=>x.id===b.dataset.ntview);if(!n||!n.file)return;NT.viewed=NT.viewed||{};const first=!NT.viewed[n.id];NT.viewed[n.id]=NT.viewed[n.id]||Date.now();
    openFile(n.file.id,false,n.file.name);if(first)setTimeout(()=>{if(!document.querySelector('#layer .drawer'))render();},300);return;}
  if((b=e.target.closest('[data-ntremind]'))){const [nid,ph,name]=b.dataset.ntremind.split('|');const n=(D.notices||[]).find(x=>x.id===nid);if(!n)return;
    shareSheet('Please accept: '+n.title,`Hello${name?' '+name:''},\n\nPlease read this notice in BuildMitr → Notices and tick to accept it:\n*${n.title}*\n\n${APP_URL}\n\n— ${ME.name||orgName()}`,ph||'');return;}
  const id=(e.target.closest('button')||{}).id;
  if(id==='ntBack'){NT.open='';render();return;}
  if(id==='ntNew'){ntForm(null);return;}
  if(id==='ntEdit'){e.preventDefault();e.stopPropagation();ntForm((D.notices||[]).find(x=>x.id===NT.open));return;}
  if(id==='ntNewVer'){const n=(D.notices||[]).find(x=>x.id===e.target.closest('button').dataset.id);if(n)ntForm({title:n.title,body:n.body,file:n.file,to:n.to,ver:(n.ver||1)+1});return;}
  if(id==='ntWithdraw'){const nid=e.target.closest('button').dataset.id,n=(D.notices||[]).find(x=>x.id===nid);if(n)write(()=>db.doc('notices/'+nid).update({active:n.active===false}),n.active===false?'Notice re-issued':'Notice withdrawn').then(()=>render());return;}
  if(id==='ntDecl'){const x=document.getElementById('ntDeclBox');x.hidden=!x.hidden;if(!x.hidden)x.querySelector('textarea').focus();return;}
  if(id==='ntPadClear'){const c=document.getElementById('ntPad');c.getContext('2d').clearRect(0,0,c.width,c.height);PAD.ink=false;return;}
  if(id==='llCsv'){llCsv();return;}
  if(id==='llRetry'){llLocate();return;}
  if(id==='llOffice'){if(!navigator.geolocation){toast('This device cannot share location');return;}toast('Finding your location…');
    navigator.geolocation.getCurrentPosition(p=>write(()=>db.doc('org/main').update({office:{lat:+p.coords.latitude.toFixed(6),lng:+p.coords.longitude.toFixed(6)}}),'Office location saved').then(()=>render()),()=>toast('Location not allowed on this device'),{enableHighAccuracy:true,timeout:20000});return;}
},true);
document.addEventListener('change',e=>{if(e.target.id==='llWho'){WT.person=e.target.value;render();}},true);
document.addEventListener('submit',e=>{const f=e.target;if(f.id==='ntSign'){e.preventDefault();ntSign(f,(e.submitter&&e.submitter.value)||'sign');}if(f.id==='ntForm'){e.preventDefault();ntSave(f);}},true);
/* unsigned notices: shown once per session when BuildMitr opens */
setInterval(()=>{if(!S.ready||NT.shown||S.view==='notices'||document.querySelector('#layer .drawer'))return;const p=ntPending();if(!p.length)return;NT.shown=true;
  S.view='notices';NT.open=p[0].id;render();toast(`Please read and accept ${p.length>1?p.length+' notices':'this notice'}`);},2500);

/* demo: a sample notice, signatures and log-ins */
{const _dd2=demoData;demoData=function(){const X=_dd2();const t=Date.now(),d=isoDate(new Date());const s=NT_SAMPLE();
  X.notices=[{id:'ndemo',...s,to:'all',ver:1,active:true,by:'dm1',at:t-86400e3*2,hash:'demo'}];
  X.noticesign=[{id:'dm4_ndemo',user:'dm4',notice:'ndemo',title:s.title,ver:1,hash:'demo',typed:'Kavya',agree:true,sig:{id:'',name:''},at:t-86400e3,srv0:t-86400e3,dev:'Mobile',app:'Android app'}];
  const base=new Date(d+'T09:12:00').getTime();
  X.attlog=[['dm4','Laptop','Windows app',0,null,'At Office'],['dm4','Mobile','Android app',5.2,6.1,'At JP Nagar Residence site'],['dm2','PC / Laptop','Chrome on Windows',0.3,null,'At Office'],['dm3','Mobile','Chrome on Android',0.8,8.5,'']].map(([u,dev,app,h,e,place],i)=>({id:`${u}_${d}_${i}`,user:u,date:d,start:base+h*3600e3,srv0:base+h*3600e3,last:base+(e||h+7)*3600e3,end:e?base+e*3600e3:null,endKind:e?'Signed out':'',dev,app,lat:place?12.8915+i*.001:null,lng:place?77.5857:null,acc:place?18:null,place,loc:place?'ok':'Not allowed'}));
  return X;};}

/* ================= Admin: remove uploaded files and delete data =================
 * In any form the admin can remove saved files / photos (✕); anyone can remove a file they just added before saving.
 * Records, drawing revisions, mark-ups and unanswered notices can be deleted by the admin.
 * Removed files go to the Google Drive trash on the server (recoverable there for 30 days). */
Object.assign(ICONS,{'trash-2':ICONS['trash-2']||'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'});
const canDelFiles=()=>isAdmin()&&CANW&&!S.viewAs;
/* every uploaded file id inside a record (files lists, photos, a single file, signature, mark-up images…) */
function recFileIds(r){const out=new Set();const walk=(v,k)=>{if(!v)return;
  if(Array.isArray(v)){v.forEach(x=>typeof x==='string'?(/^(photos|pics|images)$/i.test(k||'')&&out.add(x)):walk(x,k));return;}
  if(typeof v==='object'){if(v.id&&(v.name||v.type)&&typeof v.id==='string')out.add(v.id);Object.entries(v).forEach(([kk,x])=>{if(typeof x==='object')walk(x,kk);});}};
  Object.entries(r||{}).forEach(([k,v])=>walk(v,k));return [...out].filter(id=>/^[\w-]{2,100}$/.test(id));}
async function trashFiles(ids){ids=[...new Set((ids||[]).filter(Boolean))];if(!ids.length||!S.cloud||!canDelFiles())return;
  try{const c=await caches.open('bm-files');await Promise.all(ids.flatMap(id=>[c.delete('/_blob/'+id),c.delete('/f/'+id),c.delete('/f/'+id+'?t')]));}catch(_){}
  if(WT.srv!==true)return;   // older server: the record no longer points to the file; the Drive copy stays
  try{await gasApi('delFile',{ids});}catch(_){}}

/* ---- form: file and photo lists with ✕ ---- */
function flChips(fk){return (DRAFT.files[fk]||[]).map((x,i)=>{const can=canDelFiles()||(DRAFT.fresh&&DRAFT.fresh.has(x.id));
  return `<span class="code fl-chip">${ico(fileIco(x))} <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${esc(x.name)}</span>${can?`<button type="button" class="btn sm ghost" data-flrm="${esc(fk)}|${i}" aria-label="Remove ${esc(x.name)}" title="Remove">${ico('x')}</button>`:''}</span>`;}).join('');}
function phChips(fk){return (DRAFT.photos[fk]||[]).map((pid,i)=>{const can=canDelFiles()||(DRAFT.fresh&&DRAFT.fresh.has(pid));
  return `<span class="ph-chip"><img src="/_blob/${esc(pid)}" alt="" style="width:56px;height:56px;border-radius:6px;object-fit:cover">${can?`<button type="button" data-phrm="${esc(fk)}|${i}" aria-label="Remove photo" title="Remove">${ico('x')}</button>`:''}</span>`;}).join('');}
function flDraw(){document.querySelectorAll('[data-fllist]').forEach(l=>l.innerHTML=flChips(l.dataset.fllist));document.querySelectorAll('[data-phlist]').forEach(l=>l.innerHTML=phChips(l.dataset.phlist));}
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-flrm]'))){e.preventDefault();const [fk,i]=b.dataset.flrm.split('|');const x=(DRAFT.files[fk]||[])[+i];if(!x)return;
    DRAFT.files[fk].splice(+i,1);if(!(DRAFT.fresh&&DRAFT.fresh.has(x.id)))DRAFT.removed.push(x.id);else trashFiles([x.id]);flDraw();toast(`${x.name} removed — Save to confirm`);return;}
  if((b=e.target.closest('[data-phrm]'))){e.preventDefault();const [fk,i]=b.dataset.phrm.split('|');const pid=(DRAFT.photos[fk]||[])[+i];if(!pid)return;
    DRAFT.photos[fk].splice(+i,1);if(!(DRAFT.fresh&&DRAFT.fresh.has(pid)))DRAFT.removed.push(pid);else trashFiles([pid]);flDraw();toast('Photo removed — Save to confirm');return;}
  /* delete the whole record from its form */
  if((b=e.target.closest('[data-fdelrec]'))){e.preventDefault();const [k,id]=b.dataset.fdelrec.split(':');
    if(S.confirm!=='rec'+id){S.confirm='rec'+id;b.innerHTML=`${ico('trash-2')}<span>Tap again to delete</span>`;setTimeout(()=>{if(S.confirm==='rec'+id)S.confirm=null;},5000);return;}
    S.confirm=null;delRecord(k,id).then(ok=>{if(ok)closeLayer();});return;}
},true);
async function delRecord(k,id){const r=(D[k]||[]).find(x=>x.id===id);if(!r)return false;const lb=recLabel(k,r),files=recFileIds(r);
  const ok=await write(()=>db.doc(k+'/'+id).delete(),'Deleted');if(ok){audit('deleted',k,id,lb);trashFiles(files);render();}return ok;}

/* ---- Drawings library: delete the current revision (the one before becomes current again) and mark-ups ---- */
/* → admin: dlDelBtn */
/* → admin: dlDelete */
/* → admin: dlMarkDel */
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-dldel]'))){const id=b.dataset.dldel;if(S.confirm!=='dl'+id){S.confirm='dl'+id;b.innerHTML=`${ico('trash-2')}<span>Tap again to delete</span>`;setTimeout(()=>{if(S.confirm==='dl'+id){S.confirm=null;render();}},5000);return;}
    S.confirm=null;dlDelete(id);return;}
  if((b=e.target.closest('[data-rvdel]'))){const [id,at]=b.dataset.rvdel.split('|');if(S.confirm!=='rv'+at){S.confirm='rv'+at;b.textContent='Tap again';setTimeout(()=>{if(S.confirm==='rv'+at)S.confirm=null;},5000);return;}
    S.confirm=null;dlMarkDel(id,at);return;}
  if((b=e.target.closest('[data-ntdel]'))){const id=b.dataset.ntdel;if((D.noticesign||[]).some(s=>s.notice===id)){toast('Staff have answered this notice — it is kept as a record. Withdraw it instead.');return;}
    if(S.confirm!=='nt'+id){S.confirm='nt'+id;b.innerHTML=`${ico('trash-2')}<span>Tap again to delete</span>`;setTimeout(()=>{if(S.confirm==='nt'+id)S.confirm=null;},5000);return;}
    S.confirm=null;const n=(D.notices||[]).find(x=>x.id===id);write(()=>db.doc('notices/'+id).delete(),'Notice deleted').then(ok=>{if(ok){trashFiles(recFileIds(n));NT.open='';render();}});return;}
},true);

/* ================= Password after the first sign-in =================
 * First sign-in: a code the organisation admin shares. Then each person can set a password and sign in with
 * password or a code to their own email; changing the password needs the current one. */
setInterval(()=>{try{if(LG.hasPw)localStorage.setItem('bm-haspw','1');}catch(_){}},3000);
/* a gentle note on the dashboard until a password is set (not a pop-up) */
{const _vd=vDashboard;vDashboard=function(){const out=_vd.apply(this,arguments);if(!S.cloud||S.demo||LG.hasPw||S.viewAs)return out;
  const note=`<div class="note" id="pwNote">${ico('lock')}<span style="flex:1">Set a password so next time you can sign in with your email and password (a login code to your email also works).</span><button type="button" class="btn sm pri" id="pwSet">Set password</button></div>`;
  const i=out.indexOf('<div class="box');return i<0?out+note:out.slice(0,i)+note+out.slice(i);};}
/* ================= Sign-in: invite code → password or email code, remembered devices =================
 * First sign-in: a one-time invite code from the organisation admin (or the code the admin receives by email).
 * Then: password or a code to the person's own email. Each phone / PC / browser stays signed in for 90 days after it
 * was last used. Settings → My devices lists them, with sign-out; the admin can sign a team member out everywhere. */
Object.assign(ICONS,{'key-round':'<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>'});
/* this device: an id kept in the browser + a readable name */
const DID=(()=>{let d='';try{d=localStorage.getItem('bm-did')||'';}catch(_){}if(!/^d[\w]{8,40}$/.test(d)){d='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);try{localStorage.setItem('bm-did',d);}catch(_){}}return d;})();
const devLabel=()=>{try{return `${devKind()} · ${appKind()}`;}catch(_){return 'Device';}};
{const _api=gasApi;gasApi=async function(action,args){
  if(action==='verify'||action==='loginPw'||action==='gsignin'||action==='boot'||action==='signupVerify')args={...(args||{}),did:DID,dev:devLabel()};
  const j=await _api(action,args);
  if(j&&j.token&&['boot','setPw','devOutAll'].includes(action)){CLOUD.token=j.token;try{localStorage.setItem('bm-token',j.token);}catch(_){}}   // renewed login for this device
  if(j&&j.user&&j.user.email&&(action==='verify'||action==='loginPw'||action==='gsignin')){try{localStorage.setItem('bm-last-email',j.user.email);}catch(_){}if(action==='verify'&&!j.hasPw)LG.askPw=true;}
  return j;};}
try{if(!LG.email)LG.email=localStorage.getItem('bm-last-email')||'';}catch(_){}
/* right after a first code sign-in without a password: ask once to set one */
setInterval(()=>{if(!LG.askPw||!S.ready||!S.cloud||S.demo||(LG.hasPw&&!LG.forcePw)||document.querySelector('#layer .drawer'))return;LG.askPw=false;LG.forcePw=false;pwDialog(true);},1500);
/* "I have an invite code": go straight to entering it */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#lgHaveCode');if(!b)return;e.preventDefault();
  const i=document.getElementById('lgEmail');LG.email=((i&&i.value)||LG.email||'').trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(LG.email)){lgSet('email','Enter your email first, then tap “I have an invite code”.');return;}
  LG.toAdmin=false;LG.invite=true;LG.sentAt=Date.now();lgSet('code');},true);

/* ---- Settings → My devices ---- */
const DV={list:null,busy:false,err:''};
async function dvLoad(){if(DV.busy||!S.cloud)return;DV.busy=true;try{DV.list=(await gasApi('devices')).devices;DV.err='';}catch(e){DV.err=e.code==='error'&&/Unknown/i.test(e.message)?'old':e.message;}DV.busy=false;if(S.view==='settings')render();}
function dvBox(){if(!S.cloud||S.demo)return '';if(DV.list===null&&!DV.busy&&!DV.err)setTimeout(dvLoad,0);
  if(DV.err==='old')return '';
  const ago=t=>{const m=Math.round((Date.now()-t)/60000);return m<2?'now':m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':Math.round(m/1440)+' days ago';};
  const L=DV.list||[];
  return `<div class="box"><div class="box-h">${ico('monitor')}<h2>My devices</h2><span class="code">Signed in — stays signed in for 90 days after last use</span></div>
    ${DV.list===null?`<div class="srow"><span class="code">${DV.err?esc(DV.err):'Loading…'}</span></div>`:L.map(d=>`<div class="srow"><span style="flex:1;min-width:0">${ico(/Mobile/.test(d.label)?'smartphone':/Tablet/.test(d.label)?'tablet':/Laptop/.test(d.label)?'laptop':'monitor')} <b>${esc(d.label||'Device')}</b>${d.me?' <span class="pill p-green">This device</span>':''}<br><span class="code">First signed in ${esc(fd(isoDate(new Date(d.created))))} · last used ${ago(d.last)}</span></span>
      ${d.me?'':`<button type="button" class="btn sm" data-dvout="${esc(d.did)}">${ico('log-out')}<span>Sign out</span></button>`}</div>`).join('')||'<div class="srow"><span class="code">Only this device.</span></div>'}
    ${L.length>1?`<div class="srow"><button type="button" class="btn sm warn" id="dvOutAll">${ico('log-out')}<span>Sign out all other devices</span></button><span class="code">Use this if a phone is lost or someone else used your login.</span></div>`:''}</div>`;}
{const _vs=vSettings;vSettings=function(){const h=_vs.apply(this,arguments);const box=dvBox();if(!box)return h;const i=h.indexOf('<div class="box"><div class="box-h">'+ico('eye'));return i<0?h+box:h.slice(0,i)+box+h.slice(i);};}

/* ---- Team (admin): invite code and sign out everywhere ---- */
function teamAuthBtns(r){if(!S.cloud||S.demo||WT.srv!==true||!isAdmin()||!CANW||!r.email||r.account===ME.id||r.role==='Admin'&&!ME.isOwner)return '';
  return `${r.account?`<button class="btn sm ghost" data-tout="${esc(r.id)}" title="Sign out of all devices">${ico('log-out')}</button>`:''}`;}
async function teamInvite(id){const r=D.team.find(x=>x.id===id);if(!r)return;toast('Making the invite code…');let j;
  try{j=await gasApi('invite',{email:r.email});}catch(e){toast(e.message);return;}
  const until=new Date(j.expires).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
  const link=typeof orgLink==='function'?orgLink(CLOUD.org,orgName()):APP_URL;
  const msg=`Hello ${r.name||''},\n\nYour BuildMitr sign-in for ${orgName()}:\n1. Open ${link}\n2. Enter your email: ${r.email}\n3. Tap “I have an invite code” and enter: *${j.code}*\n\nThe code works once, until ${until}. After signing in, set your own password — next time sign in with the password or a code to your email.`;
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane" style="height:auto;max-height:100%"><div class="pane-h"><h2>Invite code for ${esc(r.name||r.email)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><p class="code">Share this code only with ${esc(r.name||'this person')}. It works once, with ${esc(r.email)}, until ${esc(until)}.</p>
    <div class="lg-code" style="font-size:34px;letter-spacing:8px;font-weight:700;text-align:center;padding:14px;border:1px dashed var(--line);border-radius:12px;user-select:all" aria-label="Invite code">${esc(j.code)}</div>
    <div class="srow" style="border:0;padding:14px 0 0"><button type="button" class="btn pri" id="tinvShare">${ico('share-2')}<span>Share on WhatsApp / email</span></button><button type="button" class="btn" id="tinvCopy">${ico('copy')}<span>Copy</span></button></div></div></div></div>`;
  TINV={msg,phone:r.phone||'',name:r.name||'',code:j.code};}
let TINV=null;
document.addEventListener('click',e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-tinv]'))){e.stopPropagation();teamInvite(b.dataset.tinv);return;}
  if((b=e.target.closest('[data-tout]'))){e.stopPropagation();const r=D.team.find(x=>x.id===b.dataset.tout);if(!r)return;
    if(S.confirm!=='to'+r.id){S.confirm='to'+r.id;toast(`Tap again to sign ${r.name||r.email} out of all devices`);setTimeout(()=>{if(S.confirm==='to'+r.id)S.confirm=null;},5000);return;}
    S.confirm=null;gasApi('devOutAll',{email:r.email}).then(()=>{toast(`${r.name||r.email} is signed out everywhere — they need a password or code to sign in again`);audit('signed out','team',r.id,r.name||r.email);}).catch(er=>toast(er.message));return;}
  const id=(e.target.closest('button')||{}).id;
  if(id==='tinvShare'&&TINV){shareSheet('BuildMitr invite code',TINV.msg,TINV.phone);return;}
  if(id==='tinvCopy'&&TINV){try{navigator.clipboard.writeText(TINV.msg);toast('Copied');}catch(_){toast('Copy failed — select the code');}return;}
  if((b=e.target.closest('[data-dvout]'))){gasApi('devOut',{did:b.dataset.dvout}).then(()=>{toast('Signed out on that device');DV.list=null;dvLoad();}).catch(er=>toast(er.message));return;}
  if(id==='dvOutAll'){if(S.confirm!=='dvall'){S.confirm='dvall';toast('Tap again to sign out all your other devices');setTimeout(()=>{if(S.confirm==='dvall')S.confirm=null;},5000);return;}
    S.confirm=null;gasApi('devOutAll',{}).then(()=>{toast('All other devices are signed out');DV.list=null;dvLoad();}).catch(er=>toast(er.message));return;}
},true);

/* ================= live updates =================
   Every phone, PC and installed app loads BuildMitr from the website, so a new version reaches everyone without
   reinstalling. This checks for a new version when the app comes back to the screen (and every 30 min), then
   refreshes by itself if nothing is being typed, or shows a "Refresh" button. */
let BM_UPD=false;
function bmSwReg(){try{if(!('serviceWorker' in navigator)||location.protocol!=='https:')return;
  let had=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').then(reg=>{const chk=()=>{try{reg.update();}catch(_){}};setInterval(chk,30*60e3);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){chk();if(BM_UPD)bmUpdNow(true);}});}).catch(()=>{});
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!had){had=true;return;}if(BM_UPD)return;BM_UPD=true;bmUpdNow(document.visibilityState!=='visible');});}catch(_){}}
function bmBusy(){const a=document.activeElement;return !!(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName)&&a.value)||!!document.querySelector('#layer .drawer,#layer .modal,#layer [role=dialog]');}
function bmUpdNow(quiet){if(quiet&&!bmBusy()){location.reload();return;}
  if(document.getElementById('bmUpd'))return;const d=document.createElement('div');d.id='bmUpd';d.className='note';d.setAttribute('role','status');
  d.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom));z-index:60;max-width:min(92vw,460px);box-shadow:0 8px 24px rgba(0,0,0,.18);background:var(--panel)';
  d.innerHTML=`${ico('sparkles')}<span style="flex:1">A new version of BuildMitr is ready.</span><button type="button" class="btn sm pri" id="bmUpdGo">Refresh</button><button type="button" class="btn sm ghost" id="bmUpdX" aria-label="Later">${ico('x')}</button>`;
  document.body.appendChild(d);d.querySelector('#bmUpdGo').onclick=()=>location.reload();d.querySelector('#bmUpdX').onclick=()=>d.remove();}

/* Settings → App updates: shows the version on this device, checks the website for a newer one, and reloads cleanly */
const bmVer=()=>{try{return caches.keys().then(ks=>Math.max(0,...ks.map(k=>+((k.match(/^buildmitr-v(\d+)(?:-[0-9a-f]+)?$/)||[])[1]||0))));}catch(_){return Promise.resolve(0);}};
function bmUpdBox(){setTimeout(()=>{bmVer().then(v=>{const e=document.getElementById('bmVerTxt');if(e)e.textContent=v?'Version '+v:'';}).catch(()=>{});},0);
  return `<div class="box"><div class="box-h">${ico('download')}<h2>App updates</h2><span class="code" id="bmVerTxt"></span></div>
  <div class="srow" style="flex-wrap:wrap;gap:10px"><span class="code" style="flex:1 1 260px">New versions usually load by themselves. If the app looks old or stuck, tap <b>Check for update</b> — no need to close and reopen it.</span>
  <button type="button" class="btn pri" id="bmChk">${ico('download')}<span>Check for update</span></button><button type="button" class="btn" id="bmReload">${ico('history')}<span>Reload app</span></button></div></div>`;}
async function bmHardReload(msg){if(!navigator.onLine){toast('No internet — connect and try again');return;}
  try{const r=await fetch('sw.js',{cache:'no-store'}),d=Date.parse(r.headers.get('date')||'');if(!r.ok||(d&&Date.now()-d>10*60e3))throw 0;}catch(_){toast('Could not reach BuildMitr — try again in a minute');return;}   // only clear the saved copy when a fresh one can load
  toast(msg);
  try{const r=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(r)await r.update().catch(()=>{});}catch(_){}
  try{const ks=await caches.keys();await Promise.all(ks.filter(k=>/^buildmitr-/.test(k)).map(k=>caches.delete(k)));}catch(_){}   // only the saved app files — your data stays on the server
  setTimeout(()=>location.reload(),600);}
async function bmCheckUpd(){if(!navigator.onLine){toast('No internet — connect and try again');return;}toast('Checking for a new version…');
  const cur=await bmVer().catch(()=>0);let lat=0;
  try{const t=await (await fetch('sw.js',{cache:'no-store'})).text();lat=+((t.match(/buildmitr-v(\d+)/)||[])[1]||0);}catch(_){toast('Could not reach BuildMitr — try again in a minute');return;}
  if(lat&&cur&&lat<=cur){toast(`You have the latest version (${cur})`);return;}
  bmHardReload(lat?`Updating to version ${lat}…`:'Reloading the app…');}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#bmChk,#bmReload');if(!b)return;
  if(b.id==='bmChk'){bmCheckUpd();return;}
  bmHardReload('Reloading the app…');});

/* ================= Design schedule generator =================
   Lays out the design work of a project by its type: [key, section, activity, working days, after keys, options]
   options: pf = one per floor, types = only for these project types, not = not for these types */
const DS_SECT=['Project management','Architecture','3D views','Structure','MEP','Interiors'];
const DS_FACTOR={'Residential house':1,'Villa':1.1,'Apartment':1.4,'Commercial / office':1.4,'Industrial / factory':1.2,'Warehouse':1,'Restaurant / café':0.7,'Hotel':1.8,'Hospital / clinic':2,'School / college':1.4,'Retail / showroom':0.7};
const DS_NOINT=['Industrial / factory','Warehouse'];
const DS_HVAC=['Commercial / office','Industrial / factory','Restaurant / café','Hotel','Hospital / clinic','Retail / showroom','School / college'];
const DS_FIRE=['Apartment','Commercial / office','Industrial / factory','Warehouse','Hotel','Hospital / clinic','School / college','Restaurant / café'];
const DS_T=[
 ['pm1','Project management','Kick-off meeting & client brief',2,[]],
 ['pm2','Project management','Site visit, survey & site photographs',3,['pm1']],
 ['pm3','Project management','Requirement sheet & area programme sign-off',4,['pm2']],
 ['pm4','Project management','Fee proposal, agreement & advance',3,['pm3']],
 ['pm5','Project management','Design programme & team allocation',1,['pm4']],
 ['id1','Project management','Process / machinery layout with the client',7,['pm3'],{types:['Industrial / factory']}],
 ['hs1','Project management','Medical planning & department layout with hospital consultant',10,['pm3'],{types:['Hospital / clinic']}],
 ['ht1','Project management','Brand standards & operator review',5,['pm3'],{types:['Hotel']}],
 ['ar1','Architecture','Concept design — zoning & 2–3 plan options',7,['pm5','id1','hs1','ht1']],
 ['e1','3D views','Massing study',3,['ar1']],
 ['ar2','Architecture','Concept presentation & client feedback',3,['ar1','e1']],
 ['ar3','Architecture','Schematic design — final floor plans',7,['ar2']],
 ['ap1','Architecture','Typical floor & unit plans',6,['ar3'],{types:['Apartment']}],
 ['cm1','Architecture','Core & shell planning',5,['ar3'],{types:['Commercial / office']}],
 ['rs1','Architecture','Kitchen layout & equipment with kitchen consultant',5,['ar3'],{types:['Restaurant / café','Hotel']}],
 ['sc1','Architecture','Classroom, lab & activity area planning',6,['ar3'],{types:['School / college']}],
 ['pk1','Architecture','Parking, ramps & circulation',4,['ar3'],{types:['Apartment','Commercial / office','Hotel','Hospital / clinic']}],
 ['ar4','Architecture','Design development — plans, sections & elevations',10,['ar3','ap1','cm1','rs1','sc1','pk1']],
 ['ap2','Architecture','Amenities & clubhouse design',6,['ar4'],{types:['Apartment']}],
 ['ar5','Architecture','Municipal / approval drawings',5,['ar4']],
 ['ar6','Project management','Approval submission & follow-up',20,['ar5']],
 ['ap4','Project management','RERA drawings & brochure plans',6,['ar5'],{types:['Apartment']}],
 ['id4','Project management','Factory licence & pollution board drawings',10,['ar5'],{types:['Industrial / factory','Warehouse']}],
 ['ar7','Architecture','Working drawings',4,['ar4','st2'],{pf:1}],
 ['ar8','Architecture','Sections, elevations & staircase details',5,['ar7']],
 ['ar9','Architecture','Door & window schedule, toilet & kitchen details',4,['ar8']],
 ['e2','3D views','Elevation design options (2–3)',6,['ar3']],
 ['cm2','3D views','Facade / glazing design',6,['e2'],{types:['Commercial / office','Hotel','Retail / showroom']}],
 ['e3','3D views','Final elevation 3D & colour scheme',5,['e2','cm2']],
 ['e4','3D views','Exterior renders (day & night)',4,['e3']],
 ['e5','3D views','Landscape & pool 3D',5,['e3'],{types:['Villa','Hotel','Apartment']}],
 ['rs3','3D views','Branding, signage & menu boards',5,['e3'],{types:['Restaurant / café','Retail / showroom']}],
 ['e6','3D views','Walkthrough video',6,['e4'],{types:['Villa','Apartment','Hotel','Commercial / office']}],
 ['st1','Structure','Structural system & grid finalisation',3,['ar3']],
 ['id2','Structure','PEB steel structure design coordination',10,['st1'],{types:['Industrial / factory','Warehouse']}],
 ['st2','Structure','Structural analysis & design (ETABS)',10,['st1','ar4']],
 ['st3','Structure','Foundation & column layout drawings',4,['st2']],
 ['st4','Structure','Beam, slab & staircase reinforcement drawings',5,['st3'],{pf:1}],
 ['m1','MEP','Electrical layouts — points, DBs & conduits',6,['ar4']],
 ['m2','MEP','Plumbing, drainage & water supply layouts',5,['ar4']],
 ['m3','MEP','HVAC layouts & load calculation',6,['ar4'],{types:DS_HVAC}],
 ['m4','MEP','Fire fighting & fire alarm layouts, fire NOC drawings',6,['ar4'],{types:DS_FIRE}],
 ['hs2','MEP','Medical gas pipeline design',6,['ar4'],{types:['Hospital / clinic']}],
 ['rs2','MEP','Kitchen exhaust, fresh air & gas line design',4,['rs1'],{types:['Restaurant / café','Hotel']}],
 ['id3','MEP','Utilities — compressed air, process water & power',6,['ar4','id1'],{types:['Industrial / factory']}],
 ['m5','MEP','MEP coordination with structure & ceilings',3,['m1','m2','m3','m4','hs2','rs2','id3','st3']],
 ['in1','Interiors','Interior brief, mood board & material palette',4,['ar3'],{not:DS_NOINT}],
 ['in2','Interiors','Furniture layouts',4,['in1','ar4'],{not:DS_NOINT}],
 ['ht2','Interiors','Typical guest room & mock-up room design',10,['in2'],{types:['Hotel']}],
 ['hs3','Interiors','OT, ICU & isolation room detailing',8,['in2'],{types:['Hospital / clinic']}],
 ['rs4','Interiors','Seating layout & bar counter details',4,['in2'],{types:['Restaurant / café']}],
 ['rt2','Interiors','Display fixtures & visual merchandising',6,['in2'],{types:['Retail / showroom']}],
 ['in3','Interiors','Interior 3D views',10,['in2','ht2','hs3','rs4','rt2'],{not:DS_NOINT}],
 ['in4','Interiors','Client review of interior 3D & revisions',4,['in3'],{not:DS_NOINT}],
 ['in5','Interiors','False ceiling layouts',4,['in4'],{not:DS_NOINT,pf:1}],
 ['in6','Interiors','Lighting & switch-point layouts',4,['in5','m1'],{not:DS_NOINT,pf:1}],
 ['in7','Interiors','Wardrobe, kitchen & TV unit joinery details',8,['in4'],{not:[...DS_NOINT,'Hospital / clinic','School / college','Retail / showroom','Commercial / office']}],
 ['in8','Interiors','Flooring, wall finish & tile layouts',4,['in4'],{not:DS_NOINT}],
 ['ht4','Interiors','FF&E specifications & schedule',8,['in4'],{types:['Hotel','Restaurant / café']}],
 ['in9','Interiors','Material & finish schedule, interior BOQ',4,['in6','in7','in8','ht4'],{not:DS_NOINT}],
 ['ar10','Architecture','Good-for-construction (GFC) drawing set issue',2,['ar9','st4','m5','in9','e4']],
 ['hs5','Project management','NABH & fire compliance review',4,['ar10'],{types:['Hospital / clinic']}],
 ['pm9','Project management','Handover of drawings to site & construction kick-off',2,['ar10','hs5','ar6']]];
const DSG={pid:'',type:'Residential house',start:'',sect:{},sure:0};
/* → planning: dsOpen */
function dsBuild(){const fl=dlFloors(DSG.pid),f=DS_FACTOR[DSG.type]||1,T=DSG.type,hol=plHolidays();
  const inc=it=>{const o=it[5]||{};if(!DSG.sect[it[1]])return false;if(o.types&&!o.types.includes(T))return false;if(o.not&&o.not.includes(T))return false;return true;};
  const items=[];DS_T.filter(inc).forEach(it=>{const o=it[5]||{};if(o.pf&&fl.length>1)fl.forEach((fn,i)=>items.push({key:it[0]+'_'+i,base:it[0],disc:it[1],title:`${it[2]} — ${/slab|beam/i.test(it[2])?dlRoof(fn):fn}`,wd:it[3],after:i?[it[0]+'_'+(i-1)]:it[4],pf:1}));else items.push({key:it[0],base:it[0],disc:it[1],title:it[2],wd:it[3],after:it[4]});});
  const keys=new Set(items.map(x=>x.key)),lastOf={};items.forEach(x=>lastOf[x.base]=x.key);
  const isWork=d=>d.getDay()!==0&&!hol[isoD(d)],out={};
  items.forEach(x=>{const af=x.after.map(k=>keys.has(k)?k:lastOf[k]).filter(Boolean);x.after=af;
    let st=dOf(DSG.start);af.forEach(k=>{const p=out[k];if(p){const d=dOf(p.due);d.setDate(d.getDate()+1);if(d>st)st=d;}});while(!isWork(st))st.setDate(st.getDate()+1);
    const wd=Math.max(1,Math.round(x.wd*(x.pf?Math.max(.6,f*.8):f)));let d=new Date(st),left=wd;while(true){if(isWork(d)){left--;if(!left)break;}d.setDate(d.getDate()+1);}
    out[x.key]={...x,start:isoD(st),due:isoD(d),days:wd};});
  const cnt={},wbs={};items.forEach(x=>{const g=DS_SECT.indexOf(x.disc)+1;cnt[g]=(cnt[g]||0)+1;wbs[x.key]=g+'.'+cnt[g];});
  return items.map(x=>({...out[x.key],wbs:wbs[x.key],pred:x.after.map(k=>wbs[k]).filter(Boolean).join(', ')}));}
/* → planning: dsDraw */
document.addEventListener('change',e=>{const t=e.target;if(!t.closest||!t.closest('#dsBody'))return;
  if(t.id==='ds-type'){DSG.type=t.value;dsDraw();return;}if(t.id==='ds-start'){if(t.value){DSG.start=t.value;dsDraw();}return;}
  if(t.dataset.dssect){DSG.sect[t.dataset.dssect]=t.checked;dsDraw();}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#dsGen,#dsSave');if(!b)return;
  if(b.id==='dsGen'){dsOpen();return;}
  const rows=dsBuild(),pid=DSG.pid,old=D.dtasks.filter(t=>t.project===pid),now=Date.now(),list=[],used=new Set();
  const nid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
  const started=t=>(t.status&&t.status!=='Not started')||(+t.progress||0)>0;
  rows.forEach(r=>{const ex=old.find(t=>!used.has(t.id)&&(t.dk===r.key||t.title===r.title));const rec={project:pid,dk:r.key,wbs:r.wbs,title:r.title,disc:r.disc,start:r.start,due:r.due,pred:r.pred,source:'BuildMitr design schedule ('+DSG.type+')'};
    if(ex){used.add(ex.id);const done=ex.status==='Completed';list.push(['dtasks',ex.id,{...recOf(ex),...rec,...(done?{start:ex.start,due:ex.due}:{}),upd:now}]);}
    else list.push(['dtasks',nid(),{...rec,progress:0,status:'Not started',by:ME.id,at:now}]);});
  const del=old.filter(t=>!used.has(t.id)&&!started(t));
  const p=proj(pid);
  const ok=await write(async()=>{for(let k=0;k<list.length;k+=60)await dbBatch(list.slice(k,k+60));for(const t of del)await db.doc('dtasks/'+t.id).delete();
    if(p&&p.ptype!==DSG.type&&isAdmin())await db.doc('projects/'+pid).update({ptype:DSG.type});},`Design schedule saved: ${rows.length} activities`);
  if(ok){closeLayer();S.view='designsched';S.schedTable=false;render();}});

/* ================= WhatsApp updates to the admin =================
   The server sends the WhatsApp itself (nobody has to tap Send). Keys stay on the server; the app only sees the last 3 characters. */
/* ================= Google Calendar & Google Sheets links ================= */
const FEED={tok:'',err:'',busy:0,col:'dpr',p:''};
const FEED_LIST=[['dpr','Daily reports'],['tasks','Tasks'],['issues','Issues & snags'],['received','Material received'],['issue','Material issue'],['consumed','Material consumption'],['attendance','Attendance'],['requests','Material requests'],['payments','Payments'],['invoices','Invoices & quotes'],['milestones','Payment stages'],['po','Purchase orders'],['vlabour','Vendor labour'],['cal','Calendar']];
const feedBase=()=>{const c=cloudCfg();return c?c.googleScriptUrl:'';};
const feedUrl=q=>`${feedBase()}?feed=${FEED.tok}&${q}`;
/* → admin: feedLoad */
function feedBox(){
  if(!S.cloud||S.demo||!feedBase())return '';
  const h=`<div class="box-h">${ico('calendar')}<h2>Google Calendar & Google Sheets</h2></div>`;
  if(!FEED.tok)return `<div class="box" id="feedBox">${h}<div style="padding:0 16px 16px;display:grid;gap:10px;max-width:680px"><p class="code" style="margin:0">See your BuildMitr tasks, calendar work, site visits and payment stages in Google Calendar, and keep a Google Sheet that fills itself from BuildMitr. You get private links that show only what you can see here.</p>
    ${FEED.err?`<div class="note warn">${ico('alert-triangle')}<span>${esc(FEED.err)}</span></div>`:''}<button type="button" class="btn pri" style="width:max-content" data-feedmk>${ico('link')}<span>Make my private links</span></button></div></div>`;
  const fl=FEED_LIST.filter(([k])=>canView(k));if(fl.length&&!fl.some(([k])=>k===FEED.col))FEED.col=fl[0][0];
  const cal=feedUrl('cal=1'),cs=feedUrl(`csv=${FEED.col}${FEED.p?'&p='+encodeURIComponent(FEED.p):''}`),f=`=IMPORTDATA("${cs}")`;
  const copy=(v,l)=>`<div class="feed-l"><input readonly value="${esc(v)}" aria-label="${esc(l)}"><button type="button" class="btn sm" data-copy="${esc(v)}">${ico('copy')}<span>Copy</span></button></div>`;
  return `<div class="box" id="feedBox">${h}<div style="padding:0 16px 16px;display:grid;gap:14px;max-width:680px">
    <div><b>Google Calendar</b><ol class="code feed-s"><li>Copy this link.</li><li>Open <a href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" target="_blank" rel="noopener">Google Calendar → Other calendars → + → From URL</a>.</li><li>Paste it and tap <b>Add calendar</b>. Google refreshes it every few hours.</li></ol>${copy(cal,'Calendar link')}</div>
    <div><b>Google Sheets (fills itself)</b>
      <div class="fhead" style="margin:6px 0"><label class="code">What<select data-feedcol>${fl.map(([k,l])=>`<option value="${k}" ${FEED.col===k?'selected':''}>${l}</option>`).join('')}</select></label>
        <label class="code">Project<select data-feedp><option value="">All my projects</option>${PJ().filter(p=>!p.shared).map(p=>`<option value="${esc(p.id)}" ${FEED.p===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label></div>
      <ol class="code feed-s"><li>Open a new Google Sheet (<a href="https://sheets.new" target="_blank" rel="noopener">sheets.new</a>).</li><li>Click cell A1, paste this formula and press Enter.</li><li>The sheet updates by itself about every hour.</li></ol>${copy(f,'Sheet formula')}</div>
    <div class="note">${ico('lock')}<span>Anyone who has these links can see the same data you can. Don't post them in public groups. If a link leaks, make new ones — the old ones stop working.</span></div>
    <button type="button" class="btn sm" style="width:max-content" data-feedreset>${ico('refresh-cw')}<span>Make new links</span></button></div></div>`;}
document.addEventListener('click',e=>{if(!e.target.closest)return;
  if(e.target.closest('[data-feedmk]')){feedLoad(false);return;}
  if(e.target.closest('[data-feedreset]')){if(confirm('Make new links? Calendars and sheets using the old links will stop updating.'))feedLoad(true);return;}
  const c=e.target.closest('[data-copy]');if(c){const v=c.dataset.copy;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>toast('Copied')).catch(()=>{const i=c.parentElement.querySelector('input');if(i){i.select();try{document.execCommand('copy');toast('Copied');}catch(_){}}});}});
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.dataset)return;if('feedcol' in t.dataset){FEED.col=t.value;render();}else if('feedp' in t.dataset){FEED.p=t.value;render();}});

/* ================= UPI payment QR for invoices ================= */
function upiLink(r){const org=D.org.find(o=>o.id==='main')||{};if(!r||!['Tax invoice','RA bill'].includes(r.kind)||r.status==='Paid'||!org.upi||!/^[\w.\-]{2,}@[\w.\-]{2,}$/.test(String(org.upi).trim()))return '';
  const due=Math.max(0,Math.round((invTotal(r)-(+r.got||0))*100)/100);if(!(due>0))return '';
  return 'upi://pay?'+[['pa',String(org.upi).trim()],['pn',(org.name||orgName()).slice(0,40)],['am',due.toFixed(2)],['cu','INR'],['tn',`${r.no||'Invoice'} ${pname(r.project)}`.slice(0,60)]].map(([k,v])=>k+'='+encodeURIComponent(v)).join('&');}
const qrSvg=t=>loadJs('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',()=>window.qrcode).then(()=>{const q=window.qrcode(0,'M');q.addData(t);q.make();return q.createSvgTag({cellSize:5,margin:2,scalable:true});});
/* → admin: upiDialog */
const UPIG={};
document.addEventListener('click',async e=>{if(!e.target.closest)return;
  const q=e.target.closest('[data-upi]');if(q){upiDialog(q.dataset.upi);return;}
  const g=e.target.closest('[data-upigot]');if(!g)return;const r=D.invoices.find(x=>x.id===g.dataset.upigot);if(!r||UPIG[r.id])return;
  const due=Math.round((invTotal(r)-(+r.got||0))*100)/100;if(!(due>0))return;UPIG[r.id]=1;g.disabled=true;
  const ok=await write(async()=>{await db.doc('invoices/'+r.id).update({got:Math.round(((+r.got||0)+due)*100)/100,status:'Paid'});
    await db.collection('payments').add({project:r.project,date:today(),dir:'Received from client',cat:'',client:r.client||'',party:'',amount:due,mode:'UPI',ref:r.no||'',by:ME.id,at:Date.now()});},`${inr(due)} received — invoice marked Paid`);
  delete UPIG[r.id];if(ok)closeLayer();else g.disabled=false;render();});

/* ================= Daily email reports (company admin, in Admin panel) ================= */
const DIG={cfg:null,err:'',busy:0,prev:null,prevKind:''};
/* → admin: digLoad */
function digPeople(){return (D.team||[]).filter(t=>t.status!=='Removed'&&t.role!=='Client'&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(t.email||'').trim())).sort((a,b)=>(a.role==='Admin'?0:1)-(b.role==='Admin'?0:1)||String(a.name||'').localeCompare(String(b.name||'')));}
/* → admin: digBox */
function digRead(){const g=id=>document.getElementById(id);return {on:!!(g('dig-on')||{}).checked,eve:!!(g('dig-eve')||{}).checked,wa:!!(g('dig-wa')||{}).checked,
  to:[...document.querySelectorAll('[data-digto]')].filter(i=>i.checked).map(i=>i.dataset.digto)};}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#digSave,[data-digtest]');if(!b||!DIG.cfg)return;b.disabled=true;
  try{const cfg=digRead();if((cfg.on||cfg.eve)&&!cfg.to.length&&digPeople().length){toast('Tick at least one person to get the reports.');b.disabled=false;return;}
    DIG.cfg=await gasApi('digSet',{cfg});
    if(b.dataset.digtest){const r=await gasApi('digTest',{kind:b.dataset.digtest});DIG.prev=r.lines||null;DIG.prevKind=b.dataset.digtest;toast(r.sent?'Sample sent to your email':(r.lines||[]).length?'Could not send the email':'Nothing to report for your projects yet');}
    else{const n=(DIG.cfg.sendsTo||[]).length;toast(cfg.on||cfg.eve?`Saved — ${n} ${n===1?'person gets':'people get'} the reports`:'Daily email reports are off');}}
  catch(err){toast(err.message||'Could not save');}b.disabled=false;render();});

/* ================= Suggestions to approve ================= */
/* Drafts BuildMitr prepares from the company's own data. Nothing is sent or saved until a person taps Approve. */
const SUG_SKIP_KEY='bm_sugskip';
function sugSkipped(){try{const o=JSON.parse(localStorage.getItem(SUG_SKIP_KEY)||'{}'),now=Date.now();Object.keys(o).forEach(k=>{if(o[k]<now)delete o[k];});return o;}catch(_){return {};}}
function sugSkip(id,days){try{const o=sugSkipped();o[id]=Date.now()+days*864e5;localStorage.setItem(SUG_SKIP_KEY,JSON.stringify(o));}catch(_){}}
const DAX={t:'',z:0,c:new Map()};
const daysAgo=d=>{if(!d)return 0;const t=today();if(DAX.t!==t){DAX.t=t;DAX.z=+new Date(t+'T00:00:00');DAX.c.clear();}const k=String(d);let v=DAX.c.get(k);if(v===undefined){v=Math.floor((DAX.z-new Date(k+'T00:00:00'))/864e5);if(DAX.c.size<20000)DAX.c.set(k,v);}return v;};
function suggestions(){
  if(!CANW||S.demo)return [];
  const out=[],t=today(),sk=sugSkipped(),f=a=>(a||[]).filter(inProj);
  const cli=id=>D.clients.find(c=>c.id===id)||{};
  /* 1. unpaid invoices older than 15 days → payment reminder to the client */
  if(canEditView('invoices'))f(D.invoices).filter(v=>['Tax invoice','RA bill'].includes(v.kind)&&v.status!=='Paid'&&daysAgo(v.date)>=15&&(!v.reminded||daysAgo(v.reminded)>=7)).slice(0,5).forEach(v=>{
    const c=cli(v.client),due=Math.max(0,invTotal(v)-(+v.got||0));if(!due)return;
    out.push({id:'inv:'+v.id,ico:'receipt',kind:'Payment reminder',title:`${v.no||'Invoice'} · ${inr(due)} pending · ${daysAgo(v.date)} days`,sub:`${c.name||'Client'} · ${pname(v.project)}`,phone:c.phone||'',
      text:`Dear ${c.name||'Sir/Madam'},\n\nThis is a gentle reminder that ${inr(due)} is pending against ${v.kind||'invoice'} ${v.no||''} dated ${fd(v.date)} for ${pname(v.project)}.\n\nKindly arrange the payment at the earliest. Please ignore if already paid.\n\nThank you,\n${orgName()}`,
      act:'wa',done:()=>db.doc('invoices/'+v.id).update({reminded:t})});});
  /* 2. yesterday's plan → today's tasks */
  if(canEditView('tasks'))f(D.dpr).filter(r=>nextDay(r.date)===t&&dprPlan(r).length).forEach(r=>{
    const have=new Set(D.tasks.filter(x=>x.source==='Daily report '+r.id).map(x=>x.title)),pl=dprPlan(r).filter(x=>!have.has(`${x.trade}: ${x.work.trim().replace(/\s+/g,' ').slice(0,200)}`));if(!pl.length)return;
    out.push({id:'plan:'+r.id,ico:'list-checks',kind:'Today\'s tasks',title:`Make ${pl.length} task${pl.length>1?'s':''} from yesterday's plan`,sub:`${pname(r.project)} · ${pl.map(x=>x.trade).join(', ')}`,
      text:pl.map(x=>`${x.trade}: ${x.work.trim()}`).join('\n'),act:'tasks',rid:r.id});});
  /* 3. weekly progress update to the client */
  if(isAdmin())PJ().filter(p=>!p.shared&&inProj({project:p.id})&&p.start&&p.start<=t&&!/complet|closed|hold/i.test(p.status||'')&&(!p.cupd||daysAgo(p.cupd)>=7)).forEach(p=>{
    const c=cli(p.client),wk=D.dpr.filter(r=>r.project===p.id&&daysAgo(r.date)<7&&daysAgo(r.date)>=0).sort((a,b)=>String(a.date).localeCompare(String(b.date)));if(!wk.length)return;
    const by={};wk.forEach(r=>dprItems(r).forEach(x=>{(by[x.trade]=by[x.trade]||[]).push(x.work.trim().split('\n')[0]);}));
    const ph=wk.reduce((s,r)=>s+dprPhotos(r).length,0),plan=dprPlan(wk[wk.length-1]);
    out.push({id:'cu:'+p.id,ico:'message-circle',kind:'Client update',title:`Weekly progress update — ${pname(p.id)}`,sub:`${c.name||'Client'} · ${wk.length} daily report${wk.length>1?'s':''} this week`,phone:c.phone||'',
      text:`Dear ${c.name||'Sir/Madam'},\n\nWeekly progress — ${pname(p.id)} (${fd(wk[0].date)} to ${fd(wk[wk.length-1].date)}):\n${Object.entries(by).map(([k,ws])=>`\n*${k}*\n${[...new Set(ws)].slice(0,4).map(w=>'• '+w).join('\n')}`).join('\n')}${plan.length?`\n\n*Next:*\n${plan.map(x=>'• '+x.trade+': '+x.work.trim().split('\n')[0]).join('\n')}`:''}${ph?`\n\n📷 ${ph} site photos taken this week.`:''}\n\nRegards,\n${orgName()}`,
      act:'wa',done:()=>db.doc('projects/'+p.id).update({cupd:t})});});
  /* 4. material finished at a site → request */
  if(canEditView('requests'))stock().filter(s=>inProj(s)&&s.store<=0&&s.received>0&&!D.requests.some(r=>r.project===s.project&&r.status==='Pending'&&String(r.material||'').trim().toLowerCase()===s.material.toLowerCase())).slice(0,5).forEach(s=>{
    out.push({id:'stk:'+s.project+'|'+s.material,ico:'package',kind:'Material',title:`${s.material} is finished at ${pname(s.project)}`,sub:`Received so far ${num(s.received)} ${s.unit||''} — raise a request to the store / purchase`,
      text:String(Math.max(1,Math.round(s.received/4))),act:'req',s});});
  return out.filter(x=>!sk[x.id]);
}
function sugBox(){
  const L=suggestions();if(!L.length)return '';
  return `<div class="box" id="sugBox"><div class="box-h">${ico('sparkles')}<h2>Suggestions to approve</h2><span class="pill p-blue">${L.length}</span></div>
    <p class="code" style="margin:0 16px 8px">BuildMitr prepared these from your data. Nothing is sent or saved until you tap Approve.</p>
    ${L.slice(0,8).map(x=>`<div class="sug"><span class="sug-i">${ico(x.ico)}</span><div class="sug-b"><div class="code">${esc(x.kind)}</div><b>${esc(x.title)}</b><div class="code">${esc(x.sub)}</div></div>
      <div class="sug-a"><button type="button" class="btn sm pri" data-sugok="${esc(x.id)}">${ico('check')}<span>Approve</span></button><button type="button" class="btn sm" data-sugedit="${esc(x.id)}">${ico('pencil')}<span>Edit</span></button><button type="button" class="btn sm ghost" data-sugskip="${esc(x.id)}" aria-label="Skip for a week">${ico('x')}</button></div></div>`).join('')}
  </div>`;}
const SUG_BUSY={};
async function sugRun(x,text){
  if(SUG_BUSY[x.id])return;SUG_BUSY[x.id]=1;
  try{
    if(x.act==='wa'){const w=window.open(x.phone?waTo(x.phone,text):'https://wa.me/?text='+encodeURIComponent(text),'_blank');if(w)try{w.opener=null;}catch(_){}
      if(await write(async()=>{await x.done();}))toast('WhatsApp opened — press Send there.');}
    else if(x.act==='tasks'){const r=D.dpr.find(d=>d.id===x.rid);if(!r)return;const day=nextDay(r.date),src='Daily report '+r.id;
      const have=new Set(D.tasks.filter(t=>t.source===src).map(t=>t.title));
      const lines=(text===x.text?dprPlan(r).map(p=>({trade:p.trade,work:p.work.trim()})):String(text).split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const m=l.match(/^([^:]{2,30}):\s*(.+)$/);return m&&DPR_WTYPES.includes(m[1].trim())?{trade:m[1].trim(),work:m[2]}:{trade:'Other',work:l};}))
        .filter(x=>!have.has(`${x.trade}: ${x.work.replace(/\s+/g,' ').slice(0,200)}`));
      if(!lines.length){toast('Already added to Tasks.');return;}
      if(await write(async()=>{for(const l of lines)await db.collection('tasks').add({project:r.project,title:`${l.trade}: ${l.work.replace(/\s+/g,' ').slice(0,200)}`,start:day,due:day,progress:0,status:'Not started',source:src,notes:l.work,by:ME.id,at:Date.now()});}))toast(`${lines.length} task${lines.length>1?'s':''} added for today.`);}
    else if(x.act==='req'){const q=+String(text).replace(/[^\d.]/g,'');if(!(q>0)){toast('Enter the quantity needed.');return;}
      if(await write(async()=>{await db.collection('requests').add({kind:'Request from site',project:x.s.project,date:today(),material:x.s.material,unit:x.s.unit||'',qty:q,status:'Pending',by:ME.id,at:Date.now()});}))toast('Material request raised.');}
  }finally{delete SUG_BUSY[x.id];render();}
}
function sugEdit(x){
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="sugForm"><div class="pane-h"><h2>${esc(x.kind)}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b"><div><b>${esc(x.title)}</b><div class="code">${esc(x.sub)}</div></div>
      ${x.act==='wa'?`<label>Send to (WhatsApp number)<input id="sug-ph" type="tel" value="${esc(x.phone||'')}" placeholder="Leave empty to choose the contact in WhatsApp"></label>`:''}
      <label>${x.act==='req'?'Quantity needed':x.act==='tasks'?'Tasks (one per line, “Type: work”)':'Message'}${x.act==='req'?`<input id="sug-t" inputmode="decimal" value="${esc(x.text)}">`:`<textarea id="sug-t" rows="12">${esc(x.text)}</textarea>`}</label></div>
    <div class="pane-f"><button type="button" class="btn" data-close>Cancel</button><button class="btn pri">${ico('check')}<span>Approve</span></button></div></form></div>`;
  document.getElementById('sugForm').onsubmit=ev=>{ev.preventDefault();const t=document.getElementById('sug-t').value.trim();if(!t){toast('Write something first.');return;}
    const ph=document.getElementById('sug-ph');const y={...x,phone:ph?ph.value.trim():x.phone};closeLayer();sugRun(y,t);};
}
document.addEventListener('click',e=>{if(!e.target.closest)return;
  const ok=e.target.closest('[data-sugok]'),ed=e.target.closest('[data-sugedit]'),sk=e.target.closest('[data-sugskip]');if(!ok&&!ed&&!sk)return;
  const id=(ok||ed||sk).dataset[ok?'sugok':ed?'sugedit':'sugskip'],x=suggestions().find(s=>s.id===id);if(!x){render();return;}
  if(sk){sugSkip(id,7);toast('Hidden for a week.');render();return;}
  if(ed){sugEdit(x);return;}
  sugRun(x,x.text);});

/* ================= This week in BuildMitr (admin) ================= */
const ACT_MIN={dpr:15,tasks:3,issues:5,payments:4,invoices:20,received:4,attendance:1,requests:4,documents:5,approvals:5,photos:1};
function actWeekBox(){
  if(!isAdmin())return '';
  const wk=r=>{const a=+r.at||0;return a?Date.now()-a<7*864e5:(r.date?daysAgo(r.date)<7&&daysAgo(r.date)>=0:false);},f=a=>(a||[]).filter(inProj).filter(wk);
  const recent=new Set((D.audit||[]).filter(a=>Date.now()-(+a.at||0)<7*864e5).map(a=>a.ref));
  const c={dpr:f(D.dpr).length,tasks:(D.tasks||[]).filter(inProj).filter(t=>t.status==='Completed'&&recent.has(t.id)).length,
    issues:f(D.issues).length,payments:f(D.payments).length,invoices:f(D.invoices).length,received:f(D.received).length,attendance:f(D.attendance).length,requests:f(D.requests).length,
    documents:f(D.documents).length,approvals:(D.audit||[]).filter(a=>a.action==='approved'&&Date.now()-(+a.at||0)<7*864e5).length,
    photos:f(D.dpr).reduce((s,r)=>s+dprPhotos(r).length,0)+f(D.issues).reduce((s,r)=>s+(Array.isArray(r.photos)?r.photos.length:0),0)};
  const L=[['dpr','Daily reports'],['tasks','Tasks completed'],['issues','Issues raised'],['received','Material entries'],['attendance','Attendance marks'],['payments','Payments recorded'],['invoices','Invoices & quotes'],['requests','Material requests'],['documents','Drawings / documents'],['approvals','Approvals'],['photos','Site photos']].filter(([k])=>c[k]);
  if(!L.length)return '';
  const mins=L.reduce((s,[k])=>s+c[k]*ACT_MIN[k],0),people=new Set((D.audit||[]).filter(a=>Date.now()-(+a.at||0)<7*864e5).map(a=>a.by)).size;
  return `<div class="box"><div class="box-h">${ico('activity')}<h2>This week in BuildMitr</h2><span class="code">last 7 days${people?` · ${people} people active`:''}</span></div>
    <div class="act-wk">${L.map(([k,l])=>`<div><b>${num(c[k])}</b><span class="code">${l}</span></div>`).join('')}<div class="act-sv"><b>≈ ${mins>=90?num(Math.round(mins/6)/10)+' hours':num(mins)+' min'}</b><span class="code">office time saved*</span></div></div>
    <p class="code" style="margin:0 16px 12px">*Estimate: time to collect the same information by phone calls and paperwork — about ${ACT_MIN.dpr} min per daily report, ${ACT_MIN.invoices} per invoice, ${ACT_MIN.issues} per issue, 1 per photo.</p></div>`;}

const WAC={cfg:null,last:null,busy:0,err:''};
const WA_KINDS=[['attlog','Late check-ins'],['eod','End-of-day reports'],['leave','Leave requests'],['documents','Drawings — uploads, approvals, release'],['tasks','Construction schedule — status, progress, comments'],['dtasks','Design schedule — status, progress, comments'],['issues','Issues & snags'],['dpr','Daily reports'],['changes','Change orders'],['requests','Material requests'],['received','Material received'],['po','Purchase orders'],['payments','Payments'],['invoices','Invoices'],['noticesign','Notices accepted / declined'],['workupd','Work updates'],['projects','New projects'],['leads','New leads'],['forms','Checklists']];
async function waLoad(){if(WAC.busy)return;WAC.busy=1;try{const j=await gasApi('waGet',{});WAC.cfg=j.cfg;WAC.last=j.last;WAC.err='';}catch(e){WAC.err=/Unknown request/i.test(e.message||'')?'Needs the server update — deploy the new server version.':(e.message||'Could not load');}WAC.busy=0;if(S.view==='settings')render();}
function waBox(){
  if(!WAC.cfg&&!WAC.err){waLoad();return `<div class="box"><div class="box-h">${ico('message-circle')}<h2>WhatsApp updates</h2></div><div class="empty">Loading…</div></div>`;}
  if(!WAC.cfg)return `<div class="box"><div class="box-h">${ico('message-circle')}<h2>WhatsApp updates</h2></div><div class="note warn">${ico('alert-triangle')}<span>${esc(WAC.err)}</span></div></div>`;
  const c=WAC.cfg,bot=c.mode!=='api',to=c.to&&c.to.length?c.to:[{phone:'',key:''}],L=WAC.last;
  return `<div class="box" id="waBox"><div class="box-h">${ico('message-circle')}<h2>WhatsApp updates</h2><span class="pill ${c.on?'p-green':'p-grey'}">${c.on?'On':'Off'}</span></div>
  <div style="padding:0 16px 16px;display:grid;gap:12px;max-width:640px">
    <p class="code" style="margin:0">Get a WhatsApp on your phone when anyone uploads a drawing, changes a task, raises an issue, sends a daily report… Your own changes are not sent to you.</p>
    <label class="pl-chk"><input type="checkbox" id="wa-on" ${c.on?'checked':''}> <b>Send me WhatsApp updates</b></label>
    <div class="seg"><button type="button" class="seg-b ${bot?'on v':''}" data-wamode="bot">Free bot (CallMeBot)</button><button type="button" class="seg-b ${!bot?'on v':''}" data-wamode="api">WhatsApp Business API</button></div>
    ${bot?`<div class="note">${ico('info')}<span><b>Free bot — set up once per phone:</b> 1) Open <a href="https://www.callmebot.com/blog/free-api-whatsapp-messages/" target="_blank" rel="noopener">CallMeBot's WhatsApp page</a> and save the bot's number in your contacts. 2) Send it this WhatsApp: <i>I allow callmebot to send me messages</i>. 3) It replies with your API key — paste it below. Messages come from the bot's number. If the bot doesn't reply, it is full for now — use the WhatsApp Business API instead.</span></div>`
     :`<div class="note">${ico('info')}<span><b>WhatsApp Business API (Meta):</b> in Meta Business Manager create a WhatsApp app, add your business number, and get a <b>Phone number ID</b> and a <b>permanent access token</b>. Create a <b>Utility</b> message template with one variable, e.g. <i>BuildMitr update: {{1}}</i>, and wait for approval. Meta charges a small fee per message.</span></div>
       <div class="fhead"><label>Phone number ID<input id="wa-pid" value="${esc(c.api.pid||'')}" inputmode="numeric"></label><label>Template name<input id="wa-tpl" value="${esc(c.api.tpl||'')}" placeholder="e.g. buildmitr_update"></label><label>Template language<input id="wa-lang" value="${esc(c.api.lang||'en')}" placeholder="en"></label></div>
       <label class="code">Access token<input id="wa-token" type="password" autocomplete="off" value="${esc(c.api.token||'')}" placeholder="Paste the permanent token"></label>`}
    <div><div class="code" style="margin-bottom:6px">Send to (up to 5 numbers, with country code)</div>
      ${to.map((x,i)=>`<div class="dle-row"><input type="tel" data-waph="${i}" value="${esc(x.phone||'')}" placeholder="+91 98xxxxxxxx" style="max-width:200px">${bot?`<input type="password" autocomplete="off" data-wakey="${i}" value="${esc(x.key||'')}" placeholder="CallMeBot API key" style="max-width:200px">`:''}${to.length>1?`<button type="button" class="btn sm ghost" data-wadel="${i}" aria-label="Remove number">${ico('trash-2')}</button>`:''}</div>`).join('')}
      ${to.length<5?`<button type="button" class="btn sm" id="waAdd">${ico('plus')}<span>Add number</span></button>`:''}</div>
    <details><summary class="code">Which updates (${WA_KINDS.filter(([k])=>(c.cols||{})[k]!==false).length} of ${WA_KINDS.length})</summary><div class="pl-scope" style="margin-top:8px"><div>${WA_KINDS.map(([k,l])=>`<label class="pl-chk"><input type="checkbox" data-wacol="${k}" ${(c.cols||{})[k]!==false?'checked':''}>${esc(l)}</label>`).join('')}</div></div></details>
    <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap"><button type="button" class="btn pri" id="waSave">${ico('check')}<span>Save</span></button><button type="button" class="btn" id="waTest">${ico('send')}<span>Send a test message</span></button></div>
    ${L?`<div class="code">${L.err?`<span style="color:var(--red-ink)">Last send failed (${esc(fdt(L.at))}): ${esc(L.err)}</span>`:`Last update sent ${esc(fdt(L.at))}.`}</div>`:''}
  </div></div>`;}
const fdt=t=>{try{return new Date(t).toLocaleString(LOC(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}catch(_){return '';}};
function waRead(){const c=WAC.cfg,g=id=>{const e=document.getElementById(id);return e?e.value:undefined;};
  c.on=!!(document.getElementById('wa-on')||{}).checked;
  const ph=[...document.querySelectorAll('[data-waph]')].map(e=>e.value),ky=[...document.querySelectorAll('[data-wakey]')].map(e=>e.value);
  c.to=ph.map((p,i)=>({phone:p.trim(),key:(c.mode!=='api'?(ky[i]||''):((c.to[i]||{}).key||''))}));
  if(c.mode==='api')c.api={...c.api,pid:g('wa-pid')??c.api.pid,tpl:g('wa-tpl')??c.api.tpl,lang:g('wa-lang')??c.api.lang,token:g('wa-token')??c.api.token};
  c.cols={...(c.cols||{})};document.querySelectorAll('[data-wacol]').forEach(e=>{if(e.checked)delete c.cols[e.dataset.wacol];else c.cols[e.dataset.wacol]=false;});}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-wamode],#waAdd,[data-wadel],#waSave,#waTest');if(!b||!WAC.cfg)return;waRead();
  if(b.dataset.wamode){WAC.cfg.mode=b.dataset.wamode;render();return;}
  if(b.id==='waAdd'){WAC.cfg.to.push({phone:'',key:''});render();return;}
  if(b.dataset.wadel){WAC.cfg.to.splice(+b.dataset.wadel,1);render();return;}
  if(b.id==='waSave'||b.id==='waTest'){b.disabled=true;try{const j=await gasApi('waSet',{cfg:WAC.cfg});WAC.cfg=j.cfg;WAC.last=j.last;
      if(b.id==='waTest'){toast('Sending a test…');await gasApi('waTest',{});toast('Test sent — check WhatsApp');const k=await gasApi('waGet',{});WAC.last=k.last;}else toast(WAC.cfg.on?'WhatsApp updates are on':'Saved — WhatsApp updates are off');}
    catch(err){toast(err.message||'Could not save');try{const k=await gasApi('waGet',{});WAC.last=k.last;}catch(_){}}b.disabled=false;render();}});

/* ================= My day, attendance, leave, daily routines, end-of-day reports, interns =================
   eod/leave/rtick/ptask are each person's own records (the server lets only them write, and only them, their
   reporting manager and the admin see them). Office hours, leave quota and routines are set by the admin. */
Object.assign(ICONS,{sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'user-check':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>'});
COLS.push('eod','leave','rtick','ptask','routine');['eod','leave','rtick','ptask','routine'].forEach(c=>{if(!D[c])D[c]=[];});
{const g=NAV[0].items;if(!g.some(x=>x[0]==='myday'))g.unshift(['myday','sun','My day','నా రోజు']);
 const i=g.findIndex(x=>x[0]==='worktime');if(!g.some(x=>x[0]==='attend'))g.splice(i>=0?i:g.length,0,['attend','user-check','Attendance & leave','హాజరు & సెలవులు']);}
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&r!=='Client'&&!a.includes('myday'))a.unshift('myday');});
/* team record: type of staff, reporting manager, joining date, internship */
{const F=MOD.team.fields,at=F.findIndex(f=>f.k==='projects');const add=[{k:'kind',l:'Type',t:'select',o:['Staff','Intern','Trainee']},{k:'mgr',l:'Reporting manager (checks reports, approves leave)',t:'member'},{k:'joined',l:'Joining date',t:'date'},
  {k:'istart',l:'Internship / training start',t:'date'},{k:'iend',l:'Internship / training end',t:'date'},{k:'mentor',l:'Mentor',t:'member'},{k:'itarget',l:'Attendance needed for certificate (%)',t:'number'}];
  add.forEach(x=>{if(!F.some(f=>f.k===x.k))F.splice(at,0,x);});}
const HR_DEF={start:'09:30',end:'18:30',grace:10,sat:true,quota:{'Casual leave':12,'Sick leave':6,'Earned leave':12},eodReq:true};
const hrCfg=()=>({...HR_DEF,...(orgMain().hr||{}),quota:{...HR_DEF.quota,...((orgMain().hr||{}).quota||{})}});
const ROUTINE_DEF={'Site engineer':['Safety check — helmets, scaffolding, edges','Count labour on site & mark attendance','Check material received against PO','Take progress photos','Update today\'s tasks','Send the daily report'],
  'Supervisor':['Safety check — helmets, scaffolding, edges','Count labour on site','Check curing of yesterday\'s concrete','Take progress photos','Update today\'s tasks'],
  'Architect':['Reply to site questions','Check comments on your drawings','Update the drawings library','Update the design schedule'],
  'Senior architect':['Check drawings waiting for approval','Reply to site questions','Review the design schedule'],
  'Draftsman':['Check drawings sent back for changes','Upload today\'s drawings','Update the design schedule'],
  'Structural engineer':['Reply to site questions','Check structural drawings for approval','Update the design schedule'],
  'Accountant':['Record payments received','Check bills & vendor payments due','Update material purchases'],
  'Storekeeper':['Record material received','Record material issued','Check low stock'],
  'Marketing':['Reply to new leads','Follow-ups due today','Post on social media']};
const routineFor=role=>{const r=(D.routine||[]).find(x=>x.id===ROLE_KEY(role));return r&&Array.isArray(r.items)?r.items:(ROUTINE_DEF[role]||[]);};
const meRole=()=>{const t=myTeamRec();return t?t.role:curRole();};
const tmOf=uid=>D.team.find(t=>t.account===uid);
const pnm=uid=>!uid?'—':((tmOf(uid)||{}).name||nm(uid));
const staffList=()=>D.team.filter(t=>t.role!=='Client'&&t.role!=='Admin'&&t.status!=='Removed'&&t.account);
const tmOfDay=ms=>new Date(ms).toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'});
const minOfDay=ms=>{const d=new Date(ms);return d.getHours()*60+d.getMinutes();};
const toMin=s=>{const [h,m]=String(s||'0:0').split(':').map(Number);return (h||0)*60+(m||0);};
/* first log-in of a person on a date */
function checkIn(uid,date){const xs=(D.attlog||[]).filter(x=>x.user===uid&&x.date===date);if(!xs.length)return null;const f=xs.reduce((a,b)=>(+a.start<=+b.start?a:b));const last=xs.reduce((m,x)=>Math.max(m,+x.end||+x.last||+x.start),0);return {start:+f.start,last,place:f.place||'',dev:f.dev||''};}
const isLate=ms=>minOfDay(ms)>toMin(hrCfg().start)+(+hrCfg().grace||0);
function workDays(from,to){const hol=plHolidays(),c=hrCfg(),out=[];for(let d=dOf(from);isoD(d)<=to;d.setDate(d.getDate()+1)){const k=isoD(d),w=d.getDay();if(w===0||(w===6&&!c.sat)||hol[k])continue;out.push(k);}return out;}
const leavesOf=uid=>(D.leave||[]).filter(l=>l.user===uid);
function onLeave(uid,date){return leavesOf(uid).find(l=>l.status==='Approved'&&l.from<=date&&(l.to||l.from)>=date);}
function attStats(uid,from,to){const days=workDays(from,to>today()?today():to).filter(d=>d<today()||checkIn(uid,d));let p=0,late=0,lv=0;days.forEach(d=>{if(onLeave(uid,d)){lv++;return;}const c=checkIn(uid,d);if(c){p++;if(isLate(c.start))late++;}});
  const due=Math.max(0,days.length-lv);return {days:days.length,present:p,late,leave:lv,absent:Math.max(0,due-p),pct:due?Math.round(p*100/due):100};}
const monthRange=(ym)=>{const [y,m]=(ym||today().slice(0,7)).split('-').map(Number);const a=`${y}-${String(m).padStart(2,'0')}-01`,b=isoD(new Date(y,m,0));return [a,b];};
const myEod=d=>(D.eod||[]).find(x=>x.user===ME.id&&x.date===(d||today()));
const myTick=d=>(D.rtick||[]).find(x=>x.user===ME.id&&x.date===(d||today()));
const PSTAGES=['Enquiry','Agreement','Advance','Design','Approval','Construction','Handover'];
const PSERV=['Architecture','Structure','Interiors','MEP','3D views','Turnkey construction','Project management'];
function stageStrip(p,editable){const st=p.stages||{};const last=PSTAGES.reduce((m,s,i)=>st[s]?i:m,-1);
  return `<div class="pst">${PSTAGES.map((s,i)=>`<button type="button" class="pst-s ${st[s]?'done':''} ${i===last+1?'next':''}" ${editable?`data-pstage="${esc(p.id)}|${esc(s)}"`:'disabled'} title="${st[s]?esc(s)+' · '+fd(st[s]):esc(s)}">${st[s]?ico('check'):''}<span>${esc(s)}</span></button>`).join('')}</div>`;}
const canStage=p=>CANW&&(isAdmin()||(p&&p.by===ME.id));
/* ---------------- My day ---------------- */
const MD={add:false,eod:false,leave:false};
function vMyDay(){
  const t=myTeamRec()||{},role=meRole(),c=hrCfg(),d0=today(),ci=checkIn(ME.id,d0),eod=myEod(),lvToday=onLeave(ME.id,d0);
  const hello=new Date().getHours()<12?'Good morning':new Date().getHours()<17?'Good afternoon':'Good evening';
  const late=ci&&isLate(ci.start),endMin=toMin(c.end),nowMin=minOfDay(Date.now());
  const top=`<div class="box md-hero"><div class="code">${esc(new Date().toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'}).toUpperCase())}</div>
    <h2>${hello}, ${esc((ME.name||t.name||'').split(' ')[0]||'there')}</h2>
    <div class="srow" style="padding:0;gap:8px;flex-wrap:wrap">${lvToday?`<span class="pill p-blue">${ico('calendar')} On leave today</span>`:ci?`<span class="pill ${late?'p-amber':'p-green'}">Started ${tmOfDay(ci.start)} · ${late?'Late':'On time'}</span>`:`<span class="pill p-grey">Not checked in yet</span>`}
      <span class="code">Office ${esc(c.start)} – ${esc(c.end)}</span></div>
    <p class="code" style="margin:8px 0 0">Finish your routine and tasks one by one.${c.eodReq?` Before you leave at ${esc(c.end)}, submit your end-of-day report.`:''}</p>
    ${eod?`<div class="note">${ico('check')}<span>End-of-day report sent${eod.at||eod.srv?' at '+tmOfDay(eod.at||eod.srv):''}.</span><button type="button" class="btn sm" data-mdeod="1">Edit</button></div>`:`<button type="button" class="btn ${nowMin>=endMin-60?'pri':''}" data-mdeod="1">${ico('notebook-pen')}<span>End my day & submit report</span></button>`}</div>`;
  /* intern card */
  let intern='';if(t.kind==='Intern'||t.kind==='Trainee'){const a=t.istart||t.joined||d0,b=t.iend||d0,tot=workDays(a,b).length,done=workDays(a,d0<b?d0:b).length,s=attStats(ME.id,a,b),tg=+t.itarget||80;
    intern=`<div class="box"><div class="box-h">${ico('award')}<h2>My ${esc(t.kind.toLowerCase())}ship</h2><span class="code">Day ${done} of ${tot}</span></div><div class="tiles"><div class="tile"><b style="color:${s.pct<tg?'var(--amber-ink)':'inherit'}">${s.pct}%</b><span>Attendance</span></div><div class="tile"><b>${fd(b)}</b><span>Ends</span></div><div class="tile"><b>${esc(t.mentor?pnm(t.mentor):'—')}</b><span>Mentor</span></div></div><div class="code" style="padding:0 16px 12px">Keep attendance at ${tg}% or more and submit your daily report to receive your completion certificate.</div></div>`;}
  /* routine */
  const R=routineFor(role),tk=myTick(),done=new Set((tk&&tk.done)||[]);
  const routine=R.length?`<div class="box"><div class="box-h">${ico('clipboard-check')}<h2>Daily routine</h2><span class="pill ${done.size>=R.length?'p-green':'p-grey'}">${R.filter(x=>done.has(x)).length}/${R.length}</span></div>
    ${R.map(x=>`<label class="md-chk"><input type="checkbox" data-mdrt="${esc(x)}" ${done.has(x)?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div>`:'';
  /* today's work: tasks assigned to me + my own tasks */
  const mine=[...(D.tasks||[]).filter(x=>x.who===ME.id).map(x=>({...x,src:'tasks'})),...(D.dtasks||[]).filter(x=>x.who===ME.id).map(x=>({...x,src:'dtasks'})),...(D.ptask||[]).filter(x=>x.user===ME.id).map(x=>({...x,src:'ptask'})),...calMine(d0),...calMissed()].filter(x=>!x.calId)
    .filter(x=>x.status!=='Completed'&&x.status!=='Resolved'&&x.status!=='For review'&&!x.done);
  const inRev=[...(D.tasks||[]).filter(x=>x.who===ME.id&&x.status==='For review').map(x=>({...x,src:'tasks'})),...(D.dtasks||[]).filter(x=>x.who===ME.id&&x.status==='For review').map(x=>({...x,src:'dtasks'}))];
  const dueOf=x=>x.due||x.start||'';const ov=mine.filter(x=>dueOf(x)&&dueOf(x)<d0),td=mine.filter(x=>!dueOf(x)||(x.start||d0)<=d0&&dueOf(x)>=d0),up=mine.filter(x=>!ov.includes(x)&&!td.includes(x));
  const doneToday=[...(D.ptask||[]).filter(x=>x.user===ME.id&&x.done&&String(x.doneAt||'').startsWith(d0)),...calMine(d0).filter(x=>x.done)];
  const trow=x=>`<div class="md-task ${dueOf(x)&&dueOf(x)<d0?'ov':''}">${x.src==='ptask'?`<input type="checkbox" data-mdpt="${esc(x.id)}" aria-label="Done">`:x.src==='cal'?`<input type="checkbox" data-mdcal="${esc(x.id)}" aria-label="Done">`:`<span class="pill p-grey">${x.src==='dtasks'?'Design':'Site'}</span>`}<div style="flex:1;min-width:0"><b>${x.first?'⭐ ':''}${esc(x.title)}</b>${trBadge(x)}${(x.chk||[]).length?`<div class="qt-chk">${x.chk.map((c,i)=>`<label><input type="checkbox" data-qtchk="${x.src}|${esc(x.id)}|${i}" ${c.done?'checked':''}> ${esc(c.t)}</label>`).join('')}<span class="code">${x.chk.filter(c=>c.done).length}/${x.chk.length}</span></div>`:''}${(x.files||[]).length&&x.src!=='cal'?`<div class="dl-files">${x.files.map(f=>`<span class="dl-f"><a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico(fileIco(f))}${esc(f.name)}</a></span>`).join('')}</div>`:''}<div class="code">${x.src==='tasks'||x.src==='dtasks'?(x.src==='dtasks'&&x.disc?esc(secOf(x))+' · ':'')+(x.by&&x.by!==ME.id?'Assigned by '+esc(pnm(x.by))+' · ':''):''}${x.src==='cal'?(calPn(x)?esc(calPn(x))+' · ':'')+esc(x.kind||'')+' · ':x.project?esc(pname(x.project))+' · ':''}${dueOf(x)?(dueOf(x)<d0?'Overdue · ':'Due ')+fd(dueOf(x)):'No date'}${x.src!=='ptask'&&x.progress?' · '+x.progress+'%':''}</div></div>
    ${x.src!=='ptask'&&(x.project||x.src!=='cal')?`<button type="button" class="btn sm" data-fin="${x.src==='cal'?'cal|'+esc(x.cid)+'|'+esc(x.date):x.src+'|'+esc(x.id)+'|'}" title="Upload the finished file into the Drawings library and mark this done">${ico('upload')}<span>${x.status==='Changes requested'?'Upload corrected file':'Upload & finish'}</span></button>`:''}${x.src==='tasks'||x.src==='dtasks'?`${A&&trCanWrite(x.src,x)?trCamBtn(x.src,x.id):''}<button type="button" class="btn sm ghost" data-tropen="${x.src}|${esc(x.id)}" title="Details, history and comments">${ico('message-square')}<span>Details</span></button>`:''}
    ${x.src==='cal'?`<button type="button" class="btn sm" data-go="calendar" data-calday="${esc(x.date)}">${x.time?esc(x.time):'Calendar'}</button>`:x.src==='ptask'?`<button type="button" class="btn sm ghost" data-mdptdel="${esc(x.id)}" aria-label="Remove">${ico('x')}</button>`:`<button type="button" class="btn sm" data-go="${x.src==='dtasks'?'designsched':'schedule'}" ${x.project?`data-pid="${esc(x.project)}"`:''} data-mopen>Open</button>`}</div>`;
  const srt=xs=>[...xs].sort((a,b)=>(b.status==='Changes requested'?1:0)-(a.status==='Changes requested'?1:0)||(b.first?1:0)-(a.first?1:0)||String(dueOf(a)||'9999').localeCompare(String(dueOf(b)||'9999')));
  const grp=(n,xs)=>xs.length?`<div class="md-g">${n} · ${xs.length}</div>${srt(xs).map(trow).join('')}`:'';
  const work=`<div class="box"><div class="box-h">${ico('list-checks')}<h2>Today's work</h2><span class="code">${doneToday.length}/${doneToday.length+td.length+ov.length} done</span></div>
    ${grp('Overdue',ov)}${grp('Today',td)}${grp('Coming up',up.slice(0,6))}${inRev.length?`<div class="md-g">Sent for review · ${inRev.length}</div>${inRev.map(x=>`<div class="md-task"><div style="flex:1;min-width:0"><b>${esc(x.title)}</b>${trBadge(x)}<div class="code">${x.project?esc(pname(x.project))+' · ':''}${x.doneFile?esc(x.doneFile):''}</div></div><button type="button" class="btn sm ghost" data-tropen="${x.src}|${esc(x.id)}">Details</button></div>`).join('')}`:''}${!mine.length&&!inRev.length?'<div class="empty">Nothing assigned to you. Add your own tasks below.</div>':''}
    ${MD.add?`<form id="mdAddForm" class="md-add"><input name="t" required placeholder="What do you need to do?" autofocus><input name="d" type="date" value="${d0}"><select name="p"><option value="">No project</option>${PJ().map(p=>`<option value="${p.id}">${esc(pname(p.id))}</option>`).join('')}</select><button class="btn sm pri">Add</button><button type="button" class="btn sm ghost" data-mdadd="0">Cancel</button></form>`
     :`<div class="srow"><button type="button" class="btn sm" data-mdadd="1">${ico('plus')}<span>Add a task</span></button></div>`}</div>`;
  /* my projects with stage strip */
  const myP=PJ().filter(p=>!(t.projects||[]).length||(t.projects||[]).includes('all')||(t.projects||[]).includes(p.id)).slice(0,8);
  const projs=myP.length?`<div class="box"><div class="box-h">${ico('building-2')}<h2>My projects</h2></div>${myP.map(p=>`<div class="md-proj"><div class="srow" style="padding:0"><b style="flex:1">${esc(pname(p.id))}</b><span class="pill ${p.stages&&p.stages.Handover?'p-green':'p-blue'}">${esc((PSTAGES.slice().reverse().find(s=>(p.stages||{})[s]))||'New')}</span></div><div class="code">${esc([cname(p.client)!=='—'?cname(p.client):'',(p.services||[]).join(', '),p.ptype||''].filter(Boolean).join(' · '))}</div>${stageStrip(p,false)}</div>`).join('')}</div>`:'';
  /* leave + attendance */
  const [ma,mb]=monthRange(),ms=attStats(ME.id,ma,mb),q=hrCfg().quota,yr=d0.slice(0,4);
  const used=k=>leavesOf(ME.id).filter(l=>l.status==='Approved'&&l.type===k&&String(l.from).startsWith(yr)).reduce((s,l)=>s+(+l.days||1),0);
  const myL=leavesOf(ME.id).sort((a,b)=>String(b.from).localeCompare(String(a.from))).slice(0,5);
  const leave=`<div class="box"><div class="box-h">${ico('calendar')}<h2>Attendance & leave</h2><button type="button" class="btn sm pri" data-mdleave="1">${ico('plus')}<span>Request leave</span></button></div>
    <div class="m-only code" style="padding:10px 16px">This month ${ms.pct}% · ${ms.late} late · ${Object.entries(q).map(([k,v])=>`${esc(k.replace(' leave',''))} ${Math.max(0,v-used(k))}`).join(' · ')} left</div><div class="tiles m-hide"><div class="tile"><b>${ms.pct}%</b><span>Attendance this month</span></div><div class="tile"><b>${ms.late}</b><span>Late days</span></div>${Object.entries(q).map(([k,v])=>`<div class="tile"><b>${Math.max(0,v-used(k))}/${v}</b><span>${esc(k)} left</span></div>`).join('')}</div>
    ${myL.length?myL.map(l=>`<div class="srow"><span style="flex:1">${esc(l.type)} · ${fd(l.from)}${l.to&&l.to!==l.from?' → '+fd(l.to):''}${l.half?' (half day)':''}</span><span class="pill ${l.status==='Approved'?'p-green':l.status==='Rejected'?'p-red':l.status==='Cancelled'?'p-grey':'p-amber'}">${esc(l.status)}</span>${l.status==='Pending'?`<button type="button" class="btn sm ghost" data-mdlcancel="${esc(l.id)}">Cancel</button>`:''}</div>`).join(''):''}</div>`;
  return header('My day')+ntBox()+qtBox()+trReviewBox()+top+intern+`<div class="grid2"><div>${routine}${work}</div><div>${leave}</div></div>`+(canView('calendar')?`<div class="m-hide">${calBox('md')}</div>${mCalLink()}`:'');
}
async function mdTick(item,on){const d0=today(),id=`${ME.id}_${d0}`,t=myTick(),done=new Set((t&&t.done)||[]);on?done.add(item):done.delete(item);
  await write(()=>db.doc('rtick/'+id).set({user:ME.id,name:ME.name||'',date:d0,role:meRole(),done:[...done],of:routineFor(meRole()).length,mgr:(myTeamRec()||{}).mgr||''}),null);render();}
function mdEodForm(){const e=myEod()||{},PS=PJ(),rows=(e.proj&&e.proj.length?e.proj:[{pid:S.proj!=='all'?S.proj:'',hrs:'',what:''}]);
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="eodForm"><div class="pane-h"><h2>End-of-day report · ${fd(today())}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b" style="display:grid;gap:12px">
    <label class="code">What did you finish today?<textarea name="done" rows="4" required placeholder="e.g. GF working drawing dims done, replied to 3 site queries">${esc(e.done||'')}</textarea></label>
    <div><div class="code" style="margin-bottom:6px">Hours by project</div><div id="eodRows">${rows.map((r,i)=>eodRow(r,i,PS)).join('')}</div><button type="button" class="btn sm" id="eodAddRow">${ico('plus')}<span>Add project</span></button></div>
    <label class="code">Anything blocking you?<textarea name="block" rows="2" placeholder="e.g. waiting for client approval of elevation">${esc(e.block||'')}</textarea></label>
    <label class="code">Plan for tomorrow<textarea name="next" rows="2">${esc(e.next||'')}</textarea></label>
  </div><div class="pane-f"><button class="btn pri">${ico('send')}<span>Submit report</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;}
function eodRow(r,i,PS){return `<div class="dle-row"><select data-eodp="${i}"><option value="">Office / general</option>${(PS||PJ()).map(p=>`<option value="${p.id}" ${r.pid===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select><input data-eodh="${i}" value="${esc(r.hrs||'')}" inputmode="decimal" placeholder="hrs" style="max-width:70px"><input data-eodw="${i}" value="${esc(r.what||'')}" placeholder="What (optional)"></div>`;}
function mdLeaveForm(){const q=hrCfg().quota;document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="lvForm"><div class="pane-h"><h2>Request leave</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b fhead" style="display:grid;gap:12px"><label>Type<select name="type">${[...Object.keys(q),'Unpaid leave','Work from home','On-site duty'].map(k=>`<option>${esc(k)}</option>`).join('')}</select></label>
    <label>From<input type="date" name="from" required value="${today()}"></label><label>To<input type="date" name="to" value="${today()}"></label>
    <label class="pl-chk"><input type="checkbox" name="half"> Half day</label><label class="wide">Reason<textarea name="reason" rows="3" required></textarea></label>
    <div class="code">${(()=>{const t=myTeamRec();return t&&t.mgr?'Goes to '+esc(pnm(t.mgr))+' and the admin.':'Goes to the admin.';})()}</div></div>
  <div class="pane-f"><button class="btn pri">${ico('send')}<span>Send request</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;}
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.mdrt!==undefined){mdTick(t.dataset.mdrt,t.checked);return;}
  if(t.dataset&&t.dataset.mdpt){const x=(D.ptask||[]).find(y=>y.id===t.dataset.mdpt);if(x)write(()=>db.doc('ptask/'+x.id).update({done:t.checked,doneAt:t.checked?today():''}),t.checked?'Done ✓':null).then(()=>render());}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-mdeod],[data-mdadd],[data-mdptdel],[data-mdleave],[data-mdlcancel],#eodAddRow,[data-pstage],[data-pserv]');if(!b)return;const ds=b.dataset;
  if(ds.pserv){const [pid,x]=ds.pserv.split('|'),p=proj(pid);if(!p||!canStage(p))return;const sv=new Set(p.services||[]);sv.has(x)?sv.delete(x):sv.add(x);await write(()=>db.doc('projects/'+pid).update({services:[...sv]}),null);render();return;}
  if(ds.mdeod){mdEodForm();return;}
  if(ds.mdadd!==undefined){MD.add=ds.mdadd==='1';render();return;}
  if(ds.mdptdel){await write(()=>db.doc('ptask/'+ds.mdptdel).delete(),'Removed');render();return;}
  if(ds.mdleave){mdLeaveForm();return;}
  if(ds.mdlcancel){await write(()=>db.doc('leave/'+ds.mdlcancel).update({status:'Cancelled'}),'Leave request cancelled');render();return;}
  if(b.id==='eodAddRow'){const box=document.getElementById('eodRows');box.insertAdjacentHTML('beforeend',eodRow({},box.children.length));return;}
  if(ds.pstage){const [pid,s]=ds.pstage.split('|'),p=proj(pid);if(!p||!canStage(p))return;const st={...(p.stages||{})};if(st[s])delete st[s];else{const i=PSTAGES.indexOf(s);PSTAGES.slice(0,i+1).forEach(x=>{if(!st[x])st[x]=today();});}
    await write(()=>db.doc('projects/'+pid).update({stages:st}),st[s]?`${p.name}: ${s} ✓`:`${p.name}: ${s} undone`);render();}});
document.addEventListener('submit',async e=>{const f=e.target;
  if(f.id==='mdAddForm'){e.preventDefault();const id=`${ME.id}_${Date.now().toString(36)}`;await write(()=>db.doc('ptask/'+id).set({user:ME.id,title:f.elements.t.value.trim(),due:f.elements.d.value||'',project:f.elements.p.value||'',done:false,at:Date.now()}),'Task added');MD.add=false;render();return;}
  if(f.id==='eodForm'){e.preventDefault();const n=document.querySelectorAll('[data-eodp]').length,proj_=[];for(let i=0;i<n;i++){const pid=(document.querySelector(`[data-eodp="${i}"]`)||{}).value||'',hrs=+((document.querySelector(`[data-eodh="${i}"]`)||{}).value||0),what=((document.querySelector(`[data-eodw="${i}"]`)||{}).value||'').trim();if(hrs||what||pid)proj_.push({pid,hrs,what});}
    const t=myTeamRec()||{},d0=today(),tk=myTick();
    const ok=await write(()=>db.doc(`eod/${ME.id}_${d0}`).set({user:ME.id,name:ME.name||t.name||'',role:meRole(),date:d0,done:f.elements.done.value.trim(),block:f.elements.block.value.trim(),next:f.elements.next.value.trim(),proj:proj_,hrs:proj_.reduce((s,x)=>s+(+x.hrs||0),0),rt:tk?(tk.done||[]).length:0,rtOf:routineFor(meRole()).length,mgr:t.mgr||'',at:Date.now()}),'Report submitted — have a good evening');
    if(ok){closeLayer();render();}return;}
  if(f.id==='lvForm'){e.preventDefault();const g=k=>f.elements[k].value,from=g('from'),to=g('to')&&g('to')>=from?g('to'):from,half=f.elements.half.checked,t=myTeamRec()||{};
    const days=half?0.5:workDays(from,to).length||1,id=`${ME.id}_${Date.now().toString(36)}`;
    const ok=await write(()=>db.doc('leave/'+id).set({user:ME.id,name:ME.name||t.name||'',type:g('type'),from,to,half,days,reason:g('reason').trim(),status:'Pending',mgr:t.mgr||'',at:Date.now()}),'Leave request sent');if(ok){closeLayer();render();}}});
/* ---------------- Attendance & leave (admin, project manager, reporting managers) ---------------- */
const AT={tab:'today',month:today().slice(0,7),date:today()};
const myTeamIds=()=>staffList().filter(t=>isAdmin()||t.mgr===ME.id).map(t=>t.account);
function vAttend(){
  const adm=isAdmin(),ids=myTeamIds();
  if(!adm&&!ids.length)return header('Attendance & leave')+`<div class="box hero-empty">${ico('user-check')}<h2>Nobody reports to you</h2><p>The admin sets a reporting manager for each person on the Team page.</p></div>`;
  const ppl=staffList().filter(t=>ids.includes(t.account));
  const pend=(D.leave||[]).filter(l=>l.status==='Pending'&&ids.includes(l.user));
  const tabs=[['today','Today'],['month','Month'],['leave',`Leave requests${pend.length?' ('+pend.length+')':''}`],['eod','Daily reports'],['hours','Project hours'],['interns','Interns'],...(adm?[['setup','Office settings']]:[])];
  const bar=`<div class="box"><div class="srow" style="flex-wrap:wrap;gap:6px">${tabs.map(([k,l])=>`<button type="button" class="btn sm ${AT.tab===k?'pri':''}" data-attab="${k}">${l}</button>`).join('')}
    ${['month','hours'].includes(AT.tab)?`<input type="month" id="atMonth" value="${esc(AT.month)}" style="margin-left:auto">`:AT.tab==='eod'||AT.tab==='today'?`<input type="date" id="atDate" value="${esc(AT.date)}" style="margin-left:auto">`:''}</div></div>`;
  let body='';const c=hrCfg();
  if(AT.tab==='today'){const d=AT.date,rows=ppl.map(t=>{const ci=checkIn(t.account,d),lv=onLeave(t.account,d),eod=(D.eod||[]).find(x=>x.user===t.account&&x.date===d),rt=(D.rtick||[]).find(x=>x.user===t.account&&x.date===d),R=routineFor(t.role).length;
      return {t,ci,lv,eod,rt,R,st:lv?'Leave':ci?(isLate(ci.start)?'Late':'On time'):'Not in'};});
    const n=k=>rows.filter(r=>r.st===k).length;
    body=`<div class="box tiles"><div class="tile"><b>${n('On time')}</b><span>On time</span></div><div class="tile"><b style="color:${n('Late')?'var(--amber-ink)':'inherit'}">${n('Late')}</b><span>Late</span></div><div class="tile"><b style="color:${n('Not in')?'var(--red-ink)':'inherit'}">${n('Not in')}</b><span>Not in</span></div><div class="tile"><b>${n('Leave')}</b><span>On leave</span></div><div class="tile"><b>${rows.filter(r=>r.eod).length}/${rows.length-n('Leave')}</b><span>Reports sent</span></div></div>
    <div class="box"><div class="tbl-wrap"><table><thead><tr><th>Person</th><th>Status</th><th>Started</th><th>Last seen</th><th>Where</th><th>Routine</th><th>End-of-day report</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.t.name)}</b><div class="code">${esc(r.t.role)}${r.t.kind&&r.t.kind!=='Staff'?' · '+esc(r.t.kind):''}</div></td>
      <td><span class="pill ${r.st==='On time'?'p-green':r.st==='Late'?'p-amber':r.st==='Leave'?'p-blue':'p-red'}">${r.st==='Leave'?esc(r.lv.type):r.st}</span></td><td>${r.ci?tmOfDay(r.ci.start):'—'}</td><td>${r.ci&&r.ci.last?tmOfDay(r.ci.last):'—'}</td><td class="code">${esc((r.ci&&(r.ci.place||r.ci.dev))||'')}</td>
      <td>${r.R?`${r.rt?(r.rt.done||[]).length:0}/${r.R}`:'—'}</td><td>${r.eod?`<button type="button" class="linkish" data-ateod="${esc(r.eod.id)}">Sent ${tmOfDay(r.eod.at||r.eod.srv)}${r.eod.hrs?' · '+r.eod.hrs+' h':''}</button>`:d===today()&&minOfDay(Date.now())<toMin(c.end)?'<span class="code">Due by '+esc(c.end)+'</span>':'<span class="pill p-red">Not sent</span>'}</td></tr>`).join('')}</tbody></table></div></div>`;}
  if(AT.tab==='month'){const [a,b]=monthRange(AT.month);const rows=ppl.map(t=>({t,s:attStats(t.account,a,b),e:(D.eod||[]).filter(x=>x.user===t.account&&x.date>=a&&x.date<=b).length}));
    body=`<div class="box"><div class="box-h"><h2>${esc(new Date(a+'T00:00').toLocaleDateString(LOC(),{month:'long',year:'numeric'}))}</h2><span class="code">${workDays(a,b>today()?today():b).length} working days so far · office ${esc(c.start)} (+${c.grace} min grace)</span><button type="button" class="btn sm" id="atXls">${ico('file-down')}<span>Download Excel</span></button></div>
    <div class="tbl-wrap"><table><thead><tr><th>Person</th><th class="num">Present</th><th class="num">Late</th><th class="num">Leave</th><th class="num">Absent</th><th class="num">Attendance</th><th class="num">Reports</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.t.name)}</b><div class="code">${esc(r.t.role)}</div></td><td class="num">${r.s.present}</td><td class="num">${r.s.late}</td><td class="num">${r.s.leave}</td><td class="num">${r.s.absent}</td><td class="num"><b style="color:${r.s.pct<80?'var(--red-ink)':'inherit'}">${r.s.pct}%</b></td><td class="num">${r.e}</td></tr>`).join('')}</tbody></table></div></div>`;}
  if(AT.tab==='leave'){const all=(D.leave||[]).filter(l=>ids.includes(l.user)).sort((x,y)=>(x.status==='Pending'?0:1)-(y.status==='Pending'?0:1)||String(y.from).localeCompare(String(x.from))).slice(0,80);
    body=`<div class="box">${all.length?all.map(l=>`<div class="srow" style="flex-wrap:wrap"><div style="flex:1;min-width:220px"><b>${esc(l.name||pnm(l.user))}</b> · ${esc(l.type)}<div class="code">${fd(l.from)}${l.to&&l.to!==l.from?' → '+fd(l.to):''} · ${l.days||1} day${(l.days||1)>1?'s':''}${l.half?' (half)':''} — ${esc(l.reason||'')}</div></div>
      <span class="pill ${l.status==='Approved'?'p-green':l.status==='Rejected'?'p-red':l.status==='Pending'?'p-amber':'p-grey'}">${esc(l.status)}</span>${l.status==='Pending'&&CANW?`<button type="button" class="btn sm pri" data-atlv="${esc(l.id)}|Approved">Approve</button><button type="button" class="btn sm" data-atlv="${esc(l.id)}|Rejected">Reject</button>`:''}</div>`).join(''):'<div class="empty">No leave requests.</div>'}</div>`;}
  if(AT.tab==='eod'){const d=AT.date,rs=(D.eod||[]).filter(x=>x.date===d&&ids.includes(x.user));
    body=rs.length?rs.map(x=>`<div class="box"><div class="box-h"><h2>${esc(x.name||pnm(x.user))}</h2><span class="code">${esc(x.role||'')} · sent ${tmOfDay(x.at||x.srv)}${x.hrs?' · '+x.hrs+' h':''}${x.rtOf?` · routine ${x.rt}/${x.rtOf}`:''}</span></div><div style="padding:0 16px 14px;display:grid;gap:6px">
      <div style="white-space:pre-wrap">${esc(x.done||'')}</div>${(x.proj||[]).length?`<div class="code">${x.proj.map(p=>`${esc(p.pid?pname(p.pid):'Office')}: ${p.hrs||0} h${p.what?' — '+esc(p.what):''}`).join(' · ')}</div>`:''}${x.block?`<div class="note warn">${ico('alert-triangle')}<span>${esc(x.block)}</span></div>`:''}${x.next?`<div class="code">Tomorrow: ${esc(x.next)}</div>`:''}</div></div>`).join(''):`<div class="box hero-empty">${ico('notebook-pen')}<h2>No reports for ${fd(d)}</h2></div>`;}
  if(AT.tab==='hours'){const [a,b]=monthRange(AT.month),by={},per={};(D.eod||[]).filter(x=>x.date>=a&&x.date<=b&&ids.includes(x.user)).forEach(x=>(x.proj||[]).forEach(p=>{const k=p.pid||'_office';by[k]=(by[k]||0)+(+p.hrs||0);per[k]=per[k]||{};per[k][x.name||nm(x.user)]=(per[k][x.name||nm(x.user)]||0)+(+p.hrs||0);}));
    const ks=Object.keys(by).sort((x,y)=>by[y]-by[x]),tot=ks.reduce((s,k)=>s+by[k],0);
    body=`<div class="box"><div class="box-h"><h2>Hours by project</h2><span class="code">${tot} h from end-of-day reports</span></div>${ks.length?ks.map(k=>`<div class="srow"><b style="flex:1">${esc(k==='_office'?'Office / general':pname(k))}</b><span class="code" style="flex:2">${Object.entries(per[k]).map(([n,h])=>`${esc(n)} ${h} h`).join(' · ')}</span><b>${by[k]} h</b></div>`).join(''):'<div class="empty">No hours yet — staff add them in their end-of-day report.</div>'}</div>`;}
  if(AT.tab==='interns'){const xs=ppl.filter(t=>t.kind==='Intern'||t.kind==='Trainee');
    body=`<div class="box">${xs.length?xs.map(t=>{const a=t.istart||t.joined||today(),b=t.iend||today(),s=attStats(t.account,a,b),tg=+t.itarget||80,ended=b<=today(),eods=(D.eod||[]).filter(x=>x.user===t.account&&x.date>=a&&x.date<=b).length;
      return `<div class="srow" style="flex-wrap:wrap"><div style="flex:1;min-width:220px"><b>${esc(t.name)}</b> · ${esc(t.kind)} · ${esc(t.role)}<div class="code">${fd(a)} → ${fd(b)} · mentor ${esc(t.mentor?pnm(t.mentor):'—')} · ${eods} daily reports</div></div><span class="pill ${s.pct>=tg?'p-green':'p-amber'}">${s.pct}% (needs ${tg}%)</span>
        ${adm?`<button type="button" class="btn sm ${ended&&s.pct>=tg?'pri':''}" data-atcert="${esc(t.id)}">${ico('award')}<span>Certificate</span></button>`:''}</div>`;}).join(''):`<div class="empty">No interns or trainees. On the Team page set a person's Type to Intern and add the start and end dates.</div>`}</div>`;}
  if(AT.tab==='setup'&&adm){const R=AT.rrole||'Site engineer';
    body=`<div class="box"><div class="box-h"><h2>Office hours & leave</h2></div><form id="hrForm" class="fhead" style="padding:0 16px 16px">
      <label>Office starts<input type="time" name="start" value="${esc(c.start)}"></label><label>Office ends<input type="time" name="end" value="${esc(c.end)}"></label><label>Grace (minutes)<input name="grace" value="${esc(c.grace)}" inputmode="numeric"></label>
      <label class="pl-chk"><input type="checkbox" name="sat" ${c.sat?'checked':''}> Saturday is a working day</label><label class="pl-chk"><input type="checkbox" name="eodReq" ${c.eodReq?'checked':''}> Ask for an end-of-day report</label>
      ${Object.entries(c.quota).map(([k,v])=>`<label>${esc(k)} per year<input name="q:${esc(k)}" value="${esc(v)}" inputmode="numeric"></label>`).join('')}
      <div class="code wide">Holidays come from the holiday list in the Schedule planner. Sundays are always off.</div><button class="btn pri">${ico('check')}<span>Save</span></button></form></div>
    <div class="box"><div class="box-h"><h2>Daily routine by role</h2></div><div class="ra-roles" style="padding:0 16px">${[...RA_MAIN,...RA_MORE,'Senior architect','Draftsman','Project manager'].filter((x,i,a)=>a.indexOf(x)===i&&x!=='Client').map(r=>`<button type="button" class="ra-chip sm ${R===r?'on':''}" data-atrr="${esc(r)}">${esc(r)}</button>`).join('')}</div>
      <form id="rtForm" style="padding:0 16px 16px"><label class="code">One item per line — ${esc(R)}<textarea name="items" rows="8" style="width:100%">${esc(routineFor(R).join('\n'))}</textarea></label><button class="btn pri">${ico('check')}<span>Save routine</span></button></form></div>`;}
  return header('Attendance & leave')+bar+body;
}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-attab],[data-atlv],[data-ateod],[data-atcert],[data-atrr],#atXls');if(!b)return;const ds=b.dataset;
  if(ds.attab){AT.tab=ds.attab;render();return;}
  if(ds.atrr){AT.rrole=ds.atrr;render();return;}
  if(ds.atlv){const [id,st]=ds.atlv.split('|');await write(()=>db.doc('leave/'+id).update({status:st,decBy:ME.id,decAt:Date.now()}),`Leave ${st.toLowerCase()}`);render();return;}
  if(ds.ateod){const x=(D.eod||[]).find(y=>y.id===ds.ateod);if(x){AT.tab='eod';AT.date=x.date;render();}return;}
  if(ds.atcert){atCert(ds.atcert);return;}
  if(b.id==='atXls'){atXls();}});
document.addEventListener('change',e=>{if(e.target.id==='atMonth'){AT.month=e.target.value||AT.month;render();}if(e.target.id==='atDate'){AT.date=e.target.value||AT.date;render();}});
document.addEventListener('submit',async e=>{const f=e.target;
  if(f.id==='hrForm'){e.preventDefault();const g=k=>f.elements[k],q={};[...f.elements].filter(x=>x.name&&x.name.startsWith('q:')).forEach(x=>q[x.name.slice(2)]=Math.max(0,+x.value||0));
    const hr={start:g('start').value||'09:30',end:g('end').value||'18:30',grace:Math.max(0,+g('grace').value||0),sat:g('sat').checked,eodReq:g('eodReq').checked,quota:q};
    await write(()=>db.doc('org/main').update({hr}),'Office settings saved');render();return;}
  if(f.id==='rtForm'){e.preventDefault();const R=AT.rrole||'Site engineer',items=f.elements.items.value.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,20);
    await write(()=>db.doc('routine/'+ROLE_KEY(R)).set({role:R,items,by:ME.id,at:Date.now()}),`Routine saved for ${R}`);render();}});
async function atXls(){try{await loadSheetJS();}catch(_){toast('Could not load the Excel tool');return;}
  const [a,b]=monthRange(AT.month),ppl=staffList().filter(t=>myTeamIds().includes(t.account)),days=workDays(a,b>today()?today():b);
  const head=['Person','Role',...days.map(d=>d.slice(8)+'/'+d.slice(5,7)),'Present','Late','Leave','Absent','Attendance %'];
  const rows=ppl.map(t=>{const s=attStats(t.account,a,b);return [t.name,t.role,...days.map(d=>{const lv=onLeave(t.account,d);if(lv)return 'L';const c=checkIn(t.account,d);return c?(isLate(c.start)?'Late '+tmOfDay(c.start):tmOfDay(c.start)):'A';}),s.present,s.late,s.leave,s.absent,s.pct];});
  const ws=XLSX.utils.aoa_to_sheet([head,...rows]);ws['!cols']=[{wch:20},{wch:16},...days.map(()=>({wch:9})),{wch:8},{wch:6},{wch:6},{wch:7},{wch:12}];
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Attendance');
  await saveFile(`Attendance ${AT.month}.xlsx`,new Blob([XLSX.write(wb,{bookType:'xlsx',type:'array'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));}
async function atCert(tid){const t=D.team.find(x=>x.id===tid);if(!t)return;toast('Preparing the certificate…');
  try{await loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',()=>window.jspdf);}catch(_){toast('Could not load the PDF tool');return;}
  const o=orgMain(),a=t.istart||t.joined||today(),b=t.iend||today(),s=attStats(t.account,a,b),pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4',orientation:'landscape'});
  pdf.setDrawColor(48,28,81);pdf.setLineWidth(1.2);pdf.rect(10,10,277,190);pdf.setLineWidth(0.3);pdf.rect(14,14,269,182);
  pdf.setFont('helvetica','bold');pdf.setFontSize(26);pdf.text(String(o.name||orgName()||'').toUpperCase(),148.5,40,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(11);if(o.address)pdf.text(String(o.address).replace(/\s+/g,' ').slice(0,120),148.5,48,{align:'center'});
  pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.text(`CERTIFICATE OF ${t.kind==='Trainee'?'TRAINING':'INTERNSHIP'}`,148.5,72,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(13);pdf.text('This is to certify that',148.5,90,{align:'center'});
  pdf.setFont('helvetica','bold');pdf.setFontSize(24);pdf.text(String(t.name||''),148.5,106,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(13);
  const lines=pdf.splitTextToSize(`has successfully completed ${t.kind==='Trainee'?'training':'an internship'} as ${t.role||'a team member'} with us from ${fd(a)} to ${fd(b)}, with ${s.pct}% attendance${t.mentor?`, under the guidance of ${nm(t.mentor)}`:''}. During this period they worked on our live projects and showed sincerity and a good willingness to learn. We wish them every success.`,220);
  pdf.text(lines,148.5,120,{align:'center'});
  pdf.setFontSize(11);pdf.text(`Date: ${fd(today())}`,30,178);pdf.line(200,172,265,172);pdf.text('Authorised signatory',232.5,178,{align:'center'});
  await saveFile(`${(t.kind||'Internship')} certificate - ${t.name}.pdf`.replace(/[\\/:*?"<>|]/g,' '),pdf.output('blob'));}

/* ================= Calendar: schedule work for months and years, assign it to the team =================
   cal = scheduled work (title, project, dates, repeat, people). caldone = each person's own "done" tick for one day.
   The project schedules (construction and design tasks), approved leave and holidays are shown too.
   Work assigned to someone appears in their My day on that day automatically. */
COLS.push('cal','caldone');['cal','caldone'].forEach(c=>{if(!D[c])D[c]=[];});
{const g=NAV[0].items;if(!g.some(x=>x[0]==='calendar')){const i=g.findIndex(x=>x[0]==='dashboard');g.splice(i>=0?i+1:1,0,['calendar','calendar','Calendar','క్యాలెండర్']);}}
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&r!=='Client'&&!a.includes('calendar'))a.push('calendar');});
EDIT_TIE.calendar='calendar';
const CAL_KINDS=['Site work','Design work','Site visit','Meeting','Inspection / checking','Concrete pour','Material delivery','Client payment','Approval / submission','Office work','Other'];
const CAL_REP=[['','Does not repeat'],['daily','Every day'],['weekdays','Every working day'],['weekly','Every week'],['monthly','Every month'],['yearly','Every year']];
const CAL_PAL=['#2f7d55','#2563eb','#c2410c','#7c3aed','#0e7490','#b91c1c','#a16207','#be185d','#4d7c0f','#475569'];
const CAL={m:'',sel:'',mode:'month',who:'all',sched:true,sort:'time'};
/* rows of one day, in time order or grouped by project */
function calSortRows(xs,rowFn){const tm=(a,b)=>(a.src==='cal'?0:1)-(b.src==='cal'?0:1)||String(a.time||'99').localeCompare(String(b.time||'99'))||String(a.title).localeCompare(String(b.title));
  if(CAL.sort!=='project')return [...xs].sort(tm).map(rowFn).join('');
  const by={};xs.forEach(x=>{const k=calPn(x)||'Office / no project';(by[k]=by[k]||[]).push(x);});
  return Object.keys(by).sort((a,b)=>a==='Office / no project'?1:b==='Office / no project'?-1:a.localeCompare(b)).map(k=>`<div class="md-g" style="display:flex;gap:8px;align-items:center"><i style="width:10px;height:10px;border-radius:5px;background:${calColor(by[k][0].project)}"></i>${esc(k)} · ${by[k].length}</div>${by[k].sort(tm).map(rowFn).join('')}`).join('');}
const calPn=x=>{const n=x.project?pname(x.project):'';return n&&n!=='—'?n:((x.c&&x.c.pn)||x.pn||'');};
const calColor=pid=>{if(!pid)return '#64748b';const i=PJ().findIndex(p=>p.id===pid);return CAL_PAL[(i<0?0:i)%CAL_PAL.length];};
const calCanEdit=c=>CANW0&&canEditView('calendar')&&(!c||isAdmin()||curRole()==='Project manager'||c.by===ME.id);
const calPeople=()=>D.team.filter(t=>t.account&&t.role!=='Client'&&t.status!=='Removed');
const calDone=(cid,date,uid)=>(D.caldone||[]).find(x=>x.id===`${uid||ME.id}_${cid}_${date}`);
const ymOf=d=>d.slice(0,7);
function calAddM(ym,k){const [y,m]=ym.split('-').map(Number);const d=new Date(y,m-1+k,1);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');}
const dimOf=(y,m)=>new Date(y,m,0).getDate();
/* is one scheduled work on this date? */
function calOn(c,d){
  if(!c||!c.start||d<c.start)return false;if(c.until&&d>c.until)return false;if((c.skip||[]).includes(d))return false;
  const r=c.repeat||'';if(!r)return d<=(c.end&&c.end>=c.start?c.end:c.start);
  const a=dOf(c.start),b=dOf(d);
  if(r==='daily')return true;
  if(r==='weekdays'){const w=b.getDay();return w!==0&&!(w===6&&!hrCfg().sat)&&!plHolidays()[d];}
  if(r==='weekly')return a.getDay()===b.getDay();
  if(r==='monthly'){const dd=Math.min(a.getDate(),dimOf(b.getFullYear(),b.getMonth()+1));return b.getDate()===dd;}
  if(r==='yearly')return c.start.slice(5)===d.slice(5)||(c.start.slice(5)==='02-29'&&d.slice(5)==='02-28'&&dimOf(b.getFullYear(),2)===28);
  return false;}
const calAll=()=>actBoss();
const calWhoOK=xs=>{const w=calAll()?CAL.who:'me';return w==='all'||(xs||[]).includes(w==='me'?ME.id:w);};
/* everything on the calendar between two dates, one entry per day */
function calItems(from,to){
  const out=[],days=[];for(let d=dOf(from);isoD(d)<=to;d.setDate(d.getDate()+1))days.push(isoD(d));
  const inP=r=>inProj(r)||(r.who||[]).includes(ME.id);
  (D.cal||[]).filter(c=>inP(c)&&(calWhoOK(c.who)||(!calAll()&&c.by===ME.id))).forEach(c=>days.forEach(d=>{if(calOn(c,d))out.push({src:'cal',id:c.id,c,date:d,title:c.title,project:c.project,who:c.who||[],kind:c.kind,time:c.time});}));
  if(CAL.sched)[['tasks','Site'],['dtasks','Design']].forEach(([col,lab])=>{if(!canView(col==='tasks'?'schedule':'designsched')&&!canView(col))return;
    (D[col]||[]).filter(t=>!t.calId&&inProj(t)&&t.status!=='Completed'&&(t.start||t.due)&&calWhoOK(t.who?[t.who]:[])).forEach(t=>{const a=t.start||t.due,b=t.due&&t.due>=a?t.due:a;
      days.forEach(d=>{if(d>=a&&d<=b)out.push({src:col,id:t.id,date:d,title:t.title,project:t.project,who:t.who?[t.who]:[],kind:lab+' schedule',first:d===a||d===from,last:d===b});});});});
  return out;}
function calLeaves(d){return (D.leave||[]).filter(l=>l.status==='Approved'&&l.from<=d&&(l.to||l.from)>=d);}
function calLoad(d){const m={};calItems(d,d).forEach(x=>x.who.forEach(u=>m[u]=(m[u]||0)+1));return m;}
/* today's calendar work for one person (My day) */
function calMine(d,uid){uid=uid||ME.id;return (D.cal||[]).filter(c=>(c.who||[]).includes(uid)&&calOn(c,d)).map(c=>({src:'cal',id:c.id+'|'+d,cid:c.id,date:d,title:c.title,project:c.project,pn:c.pn,due:d,start:d,time:c.time,kind:c.kind,done:!!calDone(c.id,d,uid)}));}
function calMissed(uid){const d0=today(),out=[];for(let k=1;k<=7;k++){const d=new Date(dOf(d0));d.setDate(d.getDate()-k);const ds=isoD(d);
  (D.cal||[]).filter(c=>!c.repeat&&(c.who||[]).includes(uid||ME.id)&&calOn(c,ds)&&(c.end||c.start)===ds&&!calDone(c.id,ds,uid)).forEach(c=>out.push({src:'cal',id:c.id+'|'+ds,cid:c.id,date:ds,title:c.title,project:c.project,due:ds,start:c.start,kind:c.kind}));}return out;}

/* ---------------- the calendar box (Dashboard, My day and the Calendar page) ---------------- */
const mCalLink=()=>`<div class="box m-only"><button type="button" class="m-link" data-go="calendar">${ico('calendar')}<span><b>Calendar</b><small>Who is doing what, day by day</small></span>${ico('chevron-right')}</button></div>`;
function calBox(where){
  const d0=today();if(!CAL.m)CAL.m=ymOf(d0);if(!CAL.sel)CAL.sel=d0;
  const people=calPeople(),canAdd=calCanEdit(null);
  const [y,m]=CAL.m.split('-').map(Number);
  const title=CAL.mode==='year'?String(y):CAL.mode==='list'?(()=>{const a=CAL.sel||d0,e=dOf(a);e.setDate(e.getDate()+59);const f=x=>new Date(x+'T00:00').toLocaleDateString(LOC(),{day:'numeric',month:'short'});return f(a)+' – '+f(isoD(e));})():new Date(y,m-1,1).toLocaleDateString(LOC(),{month:'long',year:'numeric'});
  const tools=`<div class="cal-bar"><div class="cal-nav"><button type="button" class="btn sm ghost" data-calm="-1" aria-label="Previous">‹</button><b class="cal-t">${esc(title)}</b><button type="button" class="btn sm ghost" data-calm="1" aria-label="Next">›</button><button type="button" class="btn sm" data-caltoday>Today</button></div>
    <div class="cal-nav">${[['month','Month'],['year','Year'],['list','List']].map(([k,l])=>`<button type="button" class="btn sm ${CAL.mode===k?'pri':''}" data-calmode="${k}">${l}</button>`).join('')}
    ${calAll()?`<select data-calwho aria-label="Whose work"><option value="all" ${CAL.who==='all'?'selected':''}>Everyone</option><option value="me" ${CAL.who==='me'?'selected':''}>My work</option>${people.filter(p=>p.account!==ME.id).map(p=>`<option value="${esc(p.account)}" ${CAL.who===p.account?'selected':''}>${esc(p.name)}</option>`).join('')}</select>`:'<span class="pill p-grey">My work</span>'}
    <label class="cal-chk"><input type="checkbox" data-calsched ${CAL.sched?'checked':''}> Project schedules</label></div></div>`;
  let body='';
  if(CAL.mode==='year')body=calYear(y);
  else if(CAL.mode==='list')body=calList();
  else body=calMonth(y,m)+calDay(CAL.sel);
  const fk='cal-'+where,fo=where!=='page'&&folded(fk);
  const head=`<div class="box-h">${where!=='page'?foldBtn(fk):''}${ico('calendar')}<h2>Calendar</h2>${fo?`<span class="code">${calMine(d0).filter(x=>!x.done).length} for you today</span>`:''}${canAdd&&where==='page'?`<button type="button" class="btn sm pri" data-caladd="${esc(CAL.sel)}" data-caltask="1">${ico('list-checks')}<span>New task</span></button>`:''}${where!=='page'&&canView('calendar')?`<button type="button" class="btn sm" data-go="calendar">Open full calendar</button>`:''}</div>`;
  if(fo)return `<div class="box cal">${head}</div>`;
  return `<div class="box cal ${where==='page'?'cal-page':''}">${head}${tools}${body}</div>`;}
function calChip(x){const done=x.src==='cal'&&x.who.includes(ME.id)&&calDone(x.id,x.date);const col=calColor(x.project);
  const drag=x.src==='cal'&&!x.c.repeat&&calCanEdit(x.c);
  return `<span class="cal-ch ${x.src!=='cal'?'sch':''} ${done?'done':''}" style="--c:${col}" ${drag?`draggable="true" data-caldrag="${esc(x.id)}"`:''} title="${esc(x.title+(x.project?' · '+pname(x.project):''))}">${x.time?`<i>${esc(x.time)}</i> `:''}${esc(x.title)}</span>`;}
function calMonth(y,m){
  const first=new Date(y,m-1,1),start=new Date(first);start.setDate(1-((first.getDay()+6)%7));
  const cells=[];for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);cells.push(isoD(d));}
  while(cells.length>35&&cells.slice(-7).every(d=>+d.slice(5,7)!==m))cells.splice(-7);
  const items=calItems(cells[0],cells[cells.length-1]),by={};items.forEach(x=>(by[x.date]=by[x.date]||[]).push(x));
  const hol=plHolidays(),c=hrCfg(),d0=today();
  const wk=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return `<div class="cal-g" role="grid">${wk.map(w=>`<div class="cal-wd">${w}</div>`).join('')}${cells.map(d=>{const dt=dOf(d),w=dt.getDay(),off=w===0||(w===6&&!c.sat)||hol[d];
    const xs=(by[d]||[]).sort((a,b)=>(a.src==='cal'?0:1)-(b.src==='cal'?0:1)||String(a.time||'').localeCompare(String(b.time||''))),lv=calLeaves(d).length;
    return `<button type="button" class="cal-c ${+d.slice(5,7)!==m?'out':''} ${off?'off':''} ${d===d0?'td':''} ${d===CAL.sel?'sel':''}" data-calday="${d}" data-caldrop="${d}">
      <span class="cal-n"><b class="cal-dn">${dt.getDate()}</b>${hol[d]?`<em>${esc(hol[d])}</em>`:''}</span>
      <span class="cal-xs">${xs.slice(0,3).map(calChip).join('')}${xs.length>3?`<span class="cal-more">+${xs.length-3} more</span>`:''}</span>
      <span class="cal-dots">${xs.slice(0,5).map(x=>`<i style="background:${calColor(x.project)}"></i>`).join('')}</span>
      ${lv&&calAll()?`<span class="cal-lv">${lv} on leave</span>`:''}</button>`;}).join('')}</div>`;}
function calDay(d){
  const xs=calItems(d,d),lv=calLeaves(d),load=calLoad(d),hol=plHolidays()[d];
  const busy=Object.entries(load).filter(([,k])=>k>=4);
  const row=x=>{const c=x.c,mine=x.src==='cal'&&x.who.includes(ME.id),dn=mine&&calDone(x.id,d);
    const doneN=x.src==='cal'?x.who.filter(u=>calDone(x.id,d,u)).length:0;
    return `<div class="cal-r" style="--c:${calColor(x.project)}">${mine?`<input type="checkbox" data-calck="${esc(x.id)}|${d}" ${dn?'checked':''} aria-label="Done">`:`<span class="cal-bar-c"></span>`}
      <div style="flex:1;min-width:0"><b>${x.time?esc(x.time)+' · ':''}${esc(x.title)}</b>
      <div class="code">${calPn(x)?esc(calPn(x))+' · ':''}${esc(x.kind||'')}${c&&c.repeat?' · '+esc((CAL_REP.find(r=>r[0]===c.repeat)||[])[1]||''):''}${x.who.length?' · '+x.who.map(u=>esc(pnm(u))+(x.src==='cal'&&calDone(x.id,d,u)?' ✓':'')+(onLeave(u,d)?' (on leave)':'')).join(', '):''}${x.src==='cal'&&x.who.length>1?` · ${doneN}/${x.who.length} done`:''}</div>
      ${c&&c.notes?`<div class="code" style="white-space:pre-wrap">${esc(c.notes)}</div>`:''}${c&&(c.files||[]).length?`<div class="dl-files">${c.files.map(f=>`<span class="dl-f"><a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico(fileIco(f))}${esc(f.name)}</a></span>`).join('')}</div>`:''}</div>
      ${x.src==='cal'&&(calCanEdit(c)||mine)?`<div class="cal-act">${mine&&!dn&&x.project?`<button type="button" class="btn sm" data-fin="cal|${esc(x.id)}|${d}">${ico('upload')}<span>Upload & finish</span></button>`:''}${calCanEdit(c)?`<button type="button" class="btn sm" data-caledit="${esc(x.id)}">${ico('pencil')}<span>Edit</span></button>${c.repeat?`<button type="button" class="btn sm ghost" data-calskip="${esc(x.id)}|${d}" title="Not on this day">Skip day</button>`:''}`:''}</div>`:x.src!=='cal'?`<button type="button" class="btn sm" data-go="${x.src==='dtasks'?'designsched':'schedule'}" ${x.project?`data-pid="${esc(x.project)}"`:''} data-mopen>Open</button>`:''}</div>`;};
  return `<div class="cal-day"><div class="srow"><b style="flex:1">${esc(new Date(d+'T00:00').toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long',year:'numeric'}))}${hol?` · ${esc(hol)}`:''}</b>${calCanEdit(null)?`<button type="button" class="btn sm" data-caladd="${d}" data-caltask="1">${ico('plus')}<span>New task this day</span></button>`:''}</div>
    ${busy.length&&calAll()?`<div class="note">${ico('alert-triangle')}<span>Busy day: ${busy.map(([u,k])=>`${esc(pnm(u))} has ${k} works`).join(', ')}.</span></div>`:''}
    ${xs.length>1?`<div class="srow" style="padding-top:0"><label class="code" style="display:flex;gap:6px;align-items:center">Sort<select data-calsort><option value="time" ${CAL.sort!=='project'?'selected':''}>By time</option><option value="project" ${CAL.sort==='project'?'selected':''}>By project</option></select></label></div>`:''}
    ${xs.length?calSortRows(xs,row):`<div class="empty">Nothing scheduled.${calCanEdit(null)?' Tap “New task this day” to plan something.':''}</div>`}
    ${lv.length?`<div class="srow"><span class="code">${ico('calendar')} On leave: ${lv.map(l=>esc(pnm(l.user))+' ('+esc(l.type)+')').join(', ')}</span></div>`:''}</div>`;}
function calYear(y){
  const items=calItems(`${y}-01-01`,`${y}-12-31`),cnt={};items.forEach(x=>cnt[x.date]=(cnt[x.date]||0)+1);
  const d0=today();
  return `<div class="cal-y">${Array.from({length:12},(_,i)=>{const m=i+1,f=new Date(y,i,1),pad=(f.getDay()+6)%7,n=dimOf(y,m);
    const tot=Object.keys(cnt).filter(k=>k.startsWith(`${y}-${String(m).padStart(2,'0')}`)).reduce((s,k)=>s+cnt[k],0);
    return `<button type="button" class="cal-ym" data-calym="${y}-${String(m).padStart(2,'0')}"><b>${esc(f.toLocaleDateString(LOC(),{month:'long'}))}</b><span class="code">${tot?tot+' scheduled':''}</span>
      <span class="cal-yg">${'<i></i>'.repeat(pad)}${Array.from({length:n},(_,k)=>{const ds=`${y}-${String(m).padStart(2,'0')}-${String(k+1).padStart(2,'0')}`,c=cnt[ds]||0;return `<i class="${ds===d0?'td':''}" style="${c?`background:color-mix(in srgb,var(--green) ${Math.min(25+c*18,100)}%,transparent)`:''}"></i>`;}).join('')}</span></button>`;}).join('')}</div>`;}
function calList(){
  const a=CAL.sel||today(),b=(()=>{const d=dOf(a);d.setDate(d.getDate()+59);return isoD(d);})();
  const xs=calItems(a,b).filter(x=>x.src==='cal'||x.first),by={};xs.forEach(x=>(by[x.date]=by[x.date]||[]).push(x));
  const ds=Object.keys(by).sort();
  return `<div class="srow"><label class="code" style="display:flex;gap:6px;align-items:center">Sort each day<select data-calsort><option value="time" ${CAL.sort!=='project'?'selected':''}>By time</option><option value="project" ${CAL.sort==='project'?'selected':''}>By project</option></select></label></div><div class="cal-list">${ds.length?ds.map(d=>`<div class="md-g">${esc(new Date(d+'T00:00').toLocaleDateString(LOC(),{weekday:'short',day:'numeric',month:'short'}))}</div>${calSortRows(by[d],x=>{const mine=x.src==='cal'&&x.who.includes(ME.id),c=x.c;return `<div class="cal-r" style="--c:${calColor(x.project)}">${mine?`<input type="checkbox" data-calck="${esc(x.id)}|${d}" ${calDone(x.id,d)?'checked':''} aria-label="Done">`:'<span class="cal-bar-c"></span>'}<div style="flex:1;min-width:0"><b>${x.time?esc(x.time)+' · ':''}${esc(x.title)}${x.src!=='cal'?' <span class="pill p-grey">starts</span>':''}</b><div class="code">${calPn(x)?esc(calPn(x))+' · ':''}${esc(x.kind||'')}${x.who.length?' · '+x.who.map(u=>esc(pnm(u))+(x.src==='cal'&&calDone(x.id,d,u)?' ✓':'')).join(', '):''}</div></div>
      <div class="cal-act">${mine&&!calDone(x.id,d)&&x.project?`<button type="button" class="btn sm" data-fin="cal|${esc(x.id)}|${d}">${ico('upload')}<span>Upload & finish</span></button>`:''}${x.src==='cal'&&calCanEdit(c)?`<button type="button" class="btn sm" data-caledit="${esc(x.id)}">${ico('pencil')}<span>Edit</span></button>${c.repeat?`<button type="button" class="btn sm ghost" data-calskip="${esc(x.id)}|${d}">Skip day</button>`:''}`:''}<button type="button" class="btn sm ghost" data-calday="${d}" data-calmode2="month">Day</button></div></div>`;})}`).join(''):`<div class="empty">Nothing in the next 60 days.</div>`}</div>`;}
function calIntoTasks(h){try{calBackfill();}catch(_){}if(!canView('calendar'))return h;const one=S.proj&&S.proj!=='all';const xs=calOpen(one?90:30,one?365:30).filter(x=>!one||x.project===S.proj).sort((a,b)=>(b.first?1:0)-(a.first?1:0)||a.due0.localeCompare(b.due0)),d0=today();
  const box=`<div class="box"><div class="box-h">${foldBtn('caltasks')}${ico('calendar')}<h2>${one?'Calendar work for this project':'Calendar work'}</h2><span class="code">${xs.length} open · ${one?'next 12 months':'next 30 days'}</span>${calCanEdit(null)?`<button type="button" class="btn sm pri" data-caladd="${d0}" data-caltask="1">${ico('plus')}<span>New task</span></button>`:''}${canView('calendar')?`<button type="button" class="btn sm" data-go="calendar">Calendar</button>`:''}</div>
  ${folded('caltasks')?'':xs.length?xs.map(x=>{const mine=x.who.includes(ME.id),ov=x.due0<d0;return `<div class="cal-r" style="--c:${calColor(x.project)}">${mine?`<input type="checkbox" data-calck="${esc(x.id)}|${x.due0}" ${calDone(x.id,x.due0)?'checked':''} aria-label="Done">`:'<span class="cal-bar-c"></span>'}
    <div style="flex:1;min-width:0"><b>${x.first?'⭐ ':''}${x.time?esc(x.time)+' · ':''}${esc(x.title)}</b><div class="code"><span class="${ov?'late-t':''}">${ov?'Late · ':''}${fd(x.due0)}</span> · ${esc(calPn(x)||'Office')} · ${esc(x.kind||'')}${x.who.length?' · '+x.who.map(u=>esc(pnm(u))+(calDone(x.id,x.due0,u)?' ✓':'')).join(', '):''}</div></div>
    <div class="cal-act">${calCanEdit(x.c)?`<button type="button" class="btn sm" data-caledit="${esc(x.id)}">${ico('pencil')}<span>Edit</span></button>`:''}</div></div>`;}).join(''):`<div class="empty">${one?'No calendar work for this project.':'No calendar work in the next 30 days.'}</div>`}</div>`;
  const i=h.indexOf('<div class="box');return i<0?h+box:h.slice(0,i)+box+h.slice(i);}
function vCalendar(){try{setTimeout(calBackfill,1500);}catch(_){}
  const mineN=calMine(today()).filter(x=>!x.done).length;
  return header('Calendar',`<button type="button" class="btn" data-calics>${ico('download')}<span>Add my work to phone calendar</span></button>`)
    +(mineN?`<div class="note">${ico('list-checks')}<span>${mineN} work${mineN>1?'s':''} scheduled for you today — they are also in My day.</span>${canView('myday')?`<button type="button" class="btn sm" data-go="myday">My day</button>`:''}</div>`:'')
    +calBox('page');}

/* ---------------- add / change scheduled work ---------------- */
function calForm(c,date,task){c=c||{};const ppl=calPeople(),who=new Set(c.who||(c.id||isAdmin()?[]:[ME.id])),pid=c.project||(S.proj!=='all'?S.proj:'');
  document.getElementById('layer').innerHTML=`<div class="drawer"><form class="pane" id="calForm" data-id="${esc(c.id||'')}"><div class="pane-h"><h2>${c.id?'Change task':'New task'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
  <div class="pane-b fhead" style="display:grid;gap:12px">
    <label class="wide">What work<input name="title" required maxlength="120" value="${esc(c.title||'')}" placeholder="e.g. First floor slab concreting, Elevation drawings to client"></label>
    <label>Project<select name="project"><option value="">Office / no project</option>${PJ().map(p=>`<option value="${esc(p.id)}" ${pid===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Type<select name="kind">${CAL_KINDS.map(k=>`<option ${(c.kind||(task&&['design','owner'].includes(uiOf())?'Design work':''))===k?'selected':''}>${esc(k)}</option>`).join('')}</select></label>
    <label>Date<input type="date" name="start" required value="${esc(c.start||date||today())}"></label>
    <label>Till (for work over many days)<input type="date" name="end" value="${esc(c.end||'')}"></label>
    <label>Time (optional)<input type="time" name="time" value="${esc(c.time||'')}"></label>
    <label>Repeat<select name="repeat">${CAL_REP.map(([k,l])=>`<option value="${k}" ${(c.repeat||'')===k?'selected':''}>${l}</option>`).join('')}</select></label>
    <label>Repeat until (blank = no end)<input type="date" name="until" value="${esc(c.until||'')}"></label>
    <div class="wide"><div class="code" style="margin-bottom:6px">Assign to — it shows in their My day on each date</div>
      <div class="cal-ppl">${ppl.map(p=>`<label class="pl-chk"><input type="checkbox" name="who" value="${esc(p.account)}" ${who.has(p.account)?'checked':''}> ${esc(p.name)} <span class="code">${esc(p.role||'')}</span></label>`).join('')||'<span class="code">Add your team first (Team).</span>'}</div></div>
    <label class="wide qa-ck"><input type="checkbox" name="mktask" ${c.id?(calWantsTask(c)?'checked':''):'checked'}> Also add to Tasks — each person gets a task (shows in Tasks and Work to do first)</label>
    <label class="wide">Notes<textarea name="notes" rows="3" maxlength="1000">${esc(c.notes||'')}</textarea></label>
    <div class="wide"><label>Attach files (reference drawings, photos, PDFs)<input type="file" name="att" multiple></label>
      ${(c.files||[]).length?`<div class="dl-files" style="margin-top:6px">${c.files.map(f=>`<label class="dl-f"><input type="checkbox" name="keepf" value="${esc(f.id)}" checked> <a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico(fileIco(f))}${esc(f.name)}</a></label>`).join('')}</div><div class="code">Untick a file to remove it.</div>`:''}</div>
    <div class="wide code" id="calWarn"></div>
  </div><div class="pane-f"><button class="btn pri">${ico('check')}<span>${c.id?'Save':'Create task'}</span></button>${c.id?`<button type="button" class="btn danger" data-caldel="${esc(c.id)}">${ico('trash-2')}<span>Delete</span></button>`:''}<button type="button" class="btn ghost" data-close>Cancel</button></div></form></div>`;
  calWarn();}
function calWarn(){const f=document.getElementById('calForm');if(!f)return;const w=document.getElementById('calWarn');const d=f.elements.start.value;
  const who=[...f.querySelectorAll('input[name=who]:checked')].map(x=>x.value);const lv=who.filter(u=>onLeave(u,d)),load=calLoad(d),busy=who.filter(u=>(load[u]||0)>=3);
  w.innerHTML=(lv.length?`⚠ On leave that day: ${lv.map(u=>esc(pnm(u))).join(', ')}. `:'')+(busy.length?`⚠ Already busy that day: ${busy.map(u=>esc(pnm(u))+' ('+load[u]+')').join(', ')}.`:'');}
function calIcs(){const d0=today(),xs=(D.cal||[]).filter(c=>(c.who||[]).includes(ME.id)&&(c.repeat?(!c.until||c.until>=d0):(c.end||c.start)>=d0));
  if(!xs.length){toast('Nothing is scheduled for you yet');return;}
  const z=s=>String(s||'').replace(/[\\,;]/g,m=>'\\'+m).replace(/\n/g,'\\n'),dd=s=>s.replace(/-/g,'');
  const nx=s=>{const d=dOf(s);d.setDate(d.getDate()+1);return dd(isoD(d));};
  const RR={daily:'FREQ=DAILY',weekdays:'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'+(hrCfg().sat?',SA':''),weekly:'FREQ=WEEKLY',monthly:'FREQ=MONTHLY',yearly:'FREQ=YEARLY'};
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//BuildMitr//Calendar//EN','CALSCALE:GREGORIAN'];
  xs.forEach(c=>{L.push('BEGIN:VEVENT','UID:'+c.id+'@buildmitr','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z');
    if(c.time){const t=c.time.replace(':','')+'00';L.push('DTSTART:'+dd(c.start)+'T'+t,'DURATION:PT1H');}else L.push('DTSTART;VALUE=DATE:'+dd(c.start),'DTEND;VALUE=DATE:'+nx(!c.repeat&&c.end&&c.end>c.start?c.end:c.start));
    if(c.repeat&&RR[c.repeat])L.push('RRULE:'+RR[c.repeat]+(c.until?';UNTIL='+dd(c.until):''));
    L.push('SUMMARY:'+z(c.title+(c.project?' — '+pname(c.project):'')),'DESCRIPTION:'+z((c.kind||'')+(c.notes?'\n'+c.notes:'')),'END:VEVENT');});
  L.push('END:VCALENDAR');saveFile('BuildMitr - my work.ics',new Blob([L.join('\r\n')],{type:'text/calendar'}));}
/* bell: my work today */
{const _ca=computeAlerts;computeAlerts=function(){const A_=_ca();try{if(canView('calendar'))calMine(today()).filter(x=>!x.done&&projLive(x.project)).forEach(x=>A_.push({sev:'med',txt:`Today: ${x.title}${x.project?' ('+pname(x.project)+')':''}`,view:canView('myday')?'myday':'calendar',pid:x.project}));}catch(_){}return A_;};}

async function calTick(cid,d,on){const c=(D.cal||[]).find(x=>x.id===cid);if(!c)return;const id=`${ME.id}_${cid}_${d}`;
  if(on)await write(()=>db.doc('caldone/'+id).set({user:ME.id,cal:cid,date:d,own:c.by||'',title:c.title,at:Date.now()}),'Done ✓');
  else await write(()=>db.doc('caldone/'+id).delete(),null);render();calTaskDone(cid,ME.id,on);}
document.addEventListener('change',e=>{const t=e.target;if(!t.dataset)return;
  if(t.dataset.calck){const [cid,d]=t.dataset.calck.split('|');calTick(cid,d,t.checked);return;}
  if(t.dataset.mdcal){const [cid,d]=t.dataset.mdcal.split('|');calTick(cid,d,t.checked);return;}
  if(t.dataset.calwho!==undefined){CAL.who=t.value;render();return;}
  if(t.dataset.calsched!==undefined){CAL.sched=t.checked;render();return;}
  if(t.dataset.calsort!==undefined){CAL.sort=t.value;render();return;}
  if(t.closest&&t.closest('#calForm'))calWarn();});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-calm],[data-caltoday],[data-calmode],[data-calday],[data-calym],[data-caladd],[data-caledit],[data-caldel],[data-calskip],[data-calics]');if(!b)return;const ds=b.dataset;
  if(ds.calm){const k=+ds.calm;if(CAL.mode==='year')CAL.m=calAddM(CAL.m,12*k);else if(CAL.mode==='list'){const d=dOf(CAL.sel||today());d.setDate(d.getDate()+60*k);CAL.sel=isoD(d);CAL.m=ymOf(CAL.sel);}else CAL.m=calAddM(CAL.m,k);render();return;}
  if(ds.caltoday!==undefined){CAL.sel=today();CAL.m=ymOf(CAL.sel);render();return;}
  if(ds.calmode){CAL.mode=ds.calmode;render();return;}
  if(ds.calym){CAL.m=ds.calym;CAL.mode='month';CAL.sel=ds.calym+'-01';render();return;}
  if(ds.calday){CAL.sel=ds.calday;if(ds.calmode2){CAL.mode='month';CAL.m=ymOf(CAL.sel);}render();return;}
  if(ds.caladd!==undefined){calForm(null,ds.caladd||CAL.sel,!!ds.caltask);return;}
  if(ds.caledit){const c=(D.cal||[]).find(x=>x.id===ds.caledit);if(c)calForm(c);return;}
  if(ds.caldel){const c=(D.cal||[]).find(x=>x.id===ds.caldel);if(!c)return;if(b.dataset.sure!=='1'){b.dataset.sure='1';b.querySelector('span').textContent='Tap again to delete';return;}
    const ok=await write(()=>db.doc('cal/'+c.id).delete(),'Deleted');if(ok){await calDropTasks(c.id);closeLayer();render();}return;}
  if(ds.calskip){const [cid,d]=ds.calskip.split('|'),c=(D.cal||[]).find(x=>x.id===cid);if(!c)return;await write(()=>db.doc('cal/'+cid).update({skip:[...new Set([...(c.skip||[]),d])]}),'Removed from '+fd(d)+' only');render();return;}
  if(ds.calics!==undefined){calIcs();return;}});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='calForm')return;e.preventDefault();
  const g=k=>f.elements[k].value.trim(),start=g('start'),end=g('end'),rep=g('repeat');
  const who=[...f.querySelectorAll('input[name=who]:checked')].map(x=>x.value);
  const id=f.dataset.id||`c${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`,old=(D.cal||[]).find(x=>x.id===id)||{};
  let files=(old.files||[]).filter(x=>[...f.querySelectorAll('input[name=keepf]:checked')].some(i=>i.value===x.id));
  const att=f.elements.att&&f.elements.att.files;if(att&&att.length){if(!A){toast('File upload needs Contributor access.');return;}
    for(const file of [...att]){if(file.size>10*1048576){toast(file.name+' is over 10 MB');continue;}toast('Uploading '+file.name+'…');try{const r=await A.upload(file,{type:fileType(file.name)||file.type||'application/octet-stream'});files.push({id:r.id,name:file.name,type:fileType(file.name)||file.type});}catch(e){toast(file.name+': '+(e.message||'upload failed'));}}}
  const mk=!!(f.elements.mktask&&f.elements.mktask.checked);
  const rec={files,mkTask:mk,title:g('title'),project:g('project'),pn:g('project')?pname(g('project')):'',kind:g('kind'),start,end:!rep&&end&&end>start?end:'',time:g('time'),repeat:rep,until:rep?g('until'):'',who,notes:g('notes'),skip:old.skip||[]};
  if(!rec.title)return;
  const ok=await write(()=>db.doc('cal/'+id).set(rec),f.dataset.id?'Saved':`Scheduled${who.length?' — sent to '+who.map(u=>pnm(u)).join(', '):''}`);
  if(ok){CAL.sel=start;CAL.m=ymOf(start);closeLayer();render();const n=await calSyncTasks({...old,...rec,id,by:old.by||ME.id});if(n)toast(`Scheduled — ${n} task${n>1?'s':''} created / updated for ${who.map(u=>pnm(u)).join(', ')}`);}});
/* drag a one-time work to another day (computer) */
document.addEventListener('dragstart',e=>{const b=e.target.closest&&e.target.closest('[data-caldrag]');if(b&&e.dataTransfer){e.dataTransfer.setData('text/plain','cal:'+b.dataset.caldrag);e.dataTransfer.effectAllowed='move';}});
document.addEventListener('dragover',e=>{const c=e.target.closest&&e.target.closest('[data-caldrop]');if(c){e.preventDefault();c.classList.add('drop');}});
document.addEventListener('dragleave',e=>{const c=e.target.closest&&e.target.closest('[data-caldrop]');if(c)c.classList.remove('drop');});
document.addEventListener('drop',async e=>{const c=e.target.closest&&e.target.closest('[data-caldrop]');if(!c)return;e.preventDefault();const v=(e.dataTransfer&&e.dataTransfer.getData('text/plain'))||'';if(!v.startsWith('cal:'))return;
  const x=(D.cal||[]).find(r=>r.id===v.slice(4));const to=c.dataset.caldrop;if(!x||!calCanEdit(x)||x.repeat||to===x.start)return;
  const sh=Math.round((dOf(to)-dOf(x.start))/864e5),ne=x.end?(()=>{const d=dOf(x.end);d.setDate(d.getDate()+sh);return isoD(d);})():'';
  await write(()=>db.doc('cal/'+x.id).update({start:to,end:ne}),`Moved to ${fd(to)}`);CAL.sel=to;render();calSyncTasks({...x,start:to,end:ne});});

/* ================= Work to do first (Dashboard) =================
   Open construction tasks and design activities in one list: ⭐ "do first" ones on top, then late, then by due date.
   Shows the type (Design / Site), the project and who it is assigned to; editors can reassign or star from here. */
const WF={who:'all',type:'all',all:false};
function wfItems(){const d0=today(),out=[];
  [['tasks','Site'],['dtasks','Design']].forEach(([col,lab])=>{if(!canView(col)&&!canView(col==='tasks'?'schedule':'designsched'))return;
    (D[col]||[]).filter(t=>inProj(t)&&t.status!=='Completed').forEach(t=>out.push({...t,col,lab,due0:t.due||t.start||''}));});
  if(canView('calendar'))out.push(...calOpen(30,60));
  const hasW=(x,u)=>Array.isArray(x.who)?x.who.includes(u):x.who===u,noW=x=>Array.isArray(x.who)?!x.who.length:!x.who;
  return out.filter(x=>(WF.type==='all'||WF.type===x.lab)&&(WF.who==='all'||(WF.who==='none'?noW(x):hasW(x,WF.who==='me'?ME.id:WF.who))))
    .sort((a,b)=>(b.first?1:0)-(a.first?1:0)||((a.due0&&a.due0<d0)?0:1)-((b.due0&&b.due0<d0)?0:1)||String(a.due0||'9999').localeCompare(String(b.due0||'9999')));}
const wfEdit=x=>x.col==='cal'?calCanEdit(x.c):CANW0&&canEditView(x.col==='tasks'?'tasks':'dtasks');
/* calendar work that is still open: late one-time work (last `back` days) and the next date of each work (next `fwd` days) */
function calOpen(back,fwd){const d0=today(),out=[];const add=(d,k)=>{const x=dOf(d0);x.setDate(x.getDate()+k);return isoD(x);};
  (D.cal||[]).filter(c=>(inProj(c)||(c.who||[]).includes(ME.id))&&(actBoss()||(c.who||[]).includes(ME.id)||c.by===ME.id)).forEach(c=>{const ppl=c.who||[];const allDone=d=>ppl.length?ppl.every(u=>calDone(c.id,d,u)):false;
    let due='';
    if(!c.repeat){const last=c.end&&c.end>c.start?c.end:c.start;if(last>=add(d0,-back)&&last<=add(d0,fwd)&&!allDone(last))due=last<d0?last:(c.start>d0?c.start:d0);}
    else for(let k=0;k<=fwd;k++){const d=add(d0,k);if(calOn(c,d)&&!allDone(d)){due=d;break;}}
    if(due&&!calLinked(c.id).length)out.push({id:c.id,c,col:'cal',lab:'Calendar',title:c.title,project:c.project,pn:c.pn,who:ppl,due0:due,first:!!c.first,kind:c.kind,time:c.time,repeat:c.repeat,doneN:ppl.filter(u=>calDone(c.id,due,u)).length});});
  return out;}
function wfBox(){try{setTimeout(calBackfill,1500);}catch(_){}
  const fk='wf';const xs=wfItems(),d0=today(),late=xs.filter(x=>x.due0&&x.due0<d0).length,ppl=schPeople();
  const head=`<div class="box-h">${foldBtn(fk)}${ico('list-checks')}<h2>Work to do first</h2><span class="code">${xs.length} open${late?` · <span style="color:var(--red-ink)">${late} late</span>`:''}</span></div>`;
  if(folded(fk))return `<div class="box">${head}</div>`;
  const show=WF.all?xs:xs.slice(0,12);
  return `<div class="box">${head}<div class="sch-f"><label class="code">Show<select id="wfType"><option value="all">Design & site</option><option value="Design" ${WF.type==='Design'?'selected':''}>Design / drawings</option><option value="Site" ${WF.type==='Site'?'selected':''}>Site work</option><option value="Calendar" ${WF.type==='Calendar'?'selected':''}>Calendar work</option></select></label>
    <label class="code">Assigned to<select id="wfWho"><option value="all">Everyone</option><option value="me" ${WF.who==='me'?'selected':''}>Me</option><option value="none" ${WF.who==='none'?'selected':''}>Not assigned yet</option>${ppl.map(p=>`<option value="${esc(p.account)}" ${WF.who===p.account?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label>
    <span class="code">⭐ = do first (tap the star to set)</span></div>
  ${show.length?`<div class="tbl-wrap"><table class="wf-t"><thead><tr><th></th><th>Work</th><th>Type</th><th>Project</th><th>Assigned to</th><th>Due</th><th class="num">Done</th></tr></thead><tbody>
  ${show.map(x=>{const ov=x.due0&&x.due0<d0,ed=wfEdit(x);return `<tr><td><button type="button" class="wf-star ${x.first?'on':''}" ${ed?`data-wfstar="${x.col}|${esc(x.id)}"`:'disabled'} aria-label="${x.first?'Remove do first':'Mark do first'}" aria-pressed="${!!x.first}">⭐</button></td>
    <td><b>${x.wbs?`<span class="code">${esc(x.wbs)}</span> `:''}${x.time?esc(x.time)+' · ':''}${esc(x.title)}</b>${x.col==='dtasks'&&x.disc?`<div class="code">${esc(secOf(x))}</div>`:''}${x.col==='cal'?`<div class="code">${esc(x.kind||'')}${x.repeat?' · '+esc((CAL_REP.find(r=>r[0]===x.repeat)||[])[1]||''):''}</div>`:''}</td>
    <td><span class="pill ${x.lab==='Design'?'p-blue':x.lab==='Calendar'?'p-green':'p-amber'}">${x.lab}</span></td><td>${esc(x.col==='cal'?(calPn(x)||'Office'):pname(x.project))}</td>
    <td>${x.col==='cal'?`${esc(x.who.map(u=>pnm(u)).join(', ')||'—')}${ed?` <button type="button" class="btn sm ghost" data-caledit="${esc(x.id)}" aria-label="Edit">${ico('pencil')}</button>`:''}`:ed?`<select data-wfwho="${x.col}|${esc(x.id)}" aria-label="Assigned to"><option value="">— not assigned</option>${ppl.map(p=>`<option value="${esc(p.account)}" ${x.who===p.account?'selected':''}>${esc(p.name)}</option>`).join('')}</select>`:esc(x.who?pnm(x.who):'—')}</td>
    <td class="${ov?'late-t':''}">${x.due0?(ov?'Late · ':'')+fd(x.due0):'—'}</td><td class="num">${x.col==='cal'?(x.who.length?`${x.doneN}/${x.who.length}`:'—'):(x.status==='Completed'?100:n(x.progress))+'%'}</td></tr>`;}).join('')}</tbody></table></div>
  ${xs.length>12?`<div class="srow"><button type="button" class="btn sm" id="wfAll">${WF.all?'Show fewer':'Show all '+xs.length}</button></div>`:''}`:`<div class="empty">Nothing open here.</div>`}</div>`;}
document.addEventListener('change',async e=>{const t=e.target;
  if(t.id==='wfType'){WF.type=t.value;render();return;}if(t.id==='wfWho'){WF.who=t.value;render();return;}
  if(t.dataset&&t.dataset.wfwho){const [c,id]=t.dataset.wfwho.split('|');await write(()=>db.doc(c+'/'+id).update({who:t.value}),t.value?'Assigned to '+pnm(t.value):'Unassigned');render();}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-wfstar],#wfAll');if(!b)return;
  if(b.id==='wfAll'){WF.all=!WF.all;render();return;}
  const [c,id]=b.dataset.wfstar.split('|'),x=(D[c]||[]).find(r=>r.id===id);if(c==='cal'&&x&&!calCanEdit(x))return;if(!x)return;await write(()=>db.doc(c+'/'+id).update({first:!x.first}),x.first?'Removed from do first':'⭐ Marked to do first');render();});

/* ================= Notifications on this device =================
   When new data arrives from the server: a chat message for me, or a task / design activity / calendar work
   assigned to me (new, newly assigned, or changed by someone else) → a Windows / phone notification
   (or a small message at the bottom when BuildMitr is already on screen). Nothing is sent for my own changes. */
const NTF={mine:{},unread:-1,last:{}};
const ntOK=()=>typeof Notification!=='undefined'&&Notification.permission==='granted';
const ntOn=()=>{try{return localStorage.getItem('bm-notif')!=='off';}catch(_){return true;}};
function ntShow(title,body,view,tag){
  if(!ntOn())return;
  try{if(navigator.setAppBadge&&typeof chatUnread==='function')navigator.setAppBadge(chatUnread()+calMine(today()).filter(x=>!x.done).length).catch(()=>{});}catch(_){}
  if(document.visibilityState==='visible'&&document.hasFocus&&document.hasFocus()){toast(title+(body?' — '+body:''));return;}
  if(!ntOK()){toast(title+(body?' — '+body:''));return;}
  const o={body:String(body||'').slice(0,180),tag:tag||'bm-'+Date.now(),icon:'icon-192.png',badge:'icon-192.png',data:{view:view||''},renotify:true};
  try{if(navigator.serviceWorker&&navigator.serviceWorker.controller){navigator.serviceWorker.ready.then(r=>r.showNotification(title,o)).catch(()=>{try{new Notification(title,o);}catch(_){}});return;}}catch(_){}
  try{const n=new Notification(title,o);n.onclick=()=>{try{window.focus();}catch(_){}if(view){S.view=view;render();}n.close();};}catch(_){}}
/* called by the data layer with each batch from the server: [collection, id, data, old data] */
window.bmIncoming=function(list){
  if(!ME||!ME.id||!S.ready)return;const me=ME.id,now=Date.now(),mine=k=>NTF.mine[k]&&now-NTF.mine[k]<120000;
  const out=[];
  list.forEach(([c,id,d,old])=>{if(!d||mine(c+'|'+id))return;
    if(c==='chats'){if(old||d.by===me||(typeof myChatId==='function'&&d.from===myChatId()))return;out.push(['chat',d]);return;}
    if(TR_COLS.includes(c)&&old&&d.by===me&&d.who!==me&&old.status!==d.status&&d.status==='For review'){out.push(['task',`Ready for your review: ${d.title}`,`${pnm(d.who)} finished it${d.doneFile?' · '+d.doneFile:''}`,'myday']);return;}
    if(TR_COLS.includes(c)){if(d.who!==me)return;const lab=c==='dtasks'?'Design task':c==='issues'?'Issue':'Site task',pn=d.project?pname(d.project):'';
      if(!old||old.who!==me){out.push(['task',`New ${lab.toLowerCase()} for you`,`${d.title}${pn?' · '+pn:''}${d.due?' · due '+fd(d.due):''}`,c==='dtasks'?'designsched':'schedule']);return;}
      const ch=[];if(old.status!==d.status)ch.push(d.status==='Changes requested'?'corrections: '+String((trLast(d,'back')||{}).t||'').slice(0,90):d.status);if(old.due!==d.due&&d.due)ch.push('due '+fd(d.due));if(!!old.first!==!!d.first&&d.first)ch.push('⭐ do first');
      if((d.comments||[]).length>(old.comments||[]).length){const k=d.comments[d.comments.length-1]||{};if(k.by!==me)ch.push('comment: '+String(k.t||k.text||'').slice(0,80));}
      if(ch.length)out.push(['task',`${lab} updated: ${d.title}`,ch.join(' · '),c==='dtasks'?'designsched':'schedule']);return;}
    if(c==='cal'){if(!(d.who||[]).includes(me))return;if(old&&(old.who||[]).includes(me)&&old.start===d.start&&old.title===d.title)return;
      out.push(['task',old&&(old.who||[]).includes(me)?'Calendar work changed':'New work scheduled for you',`${d.title} · ${fd(d.start)}${d.time?' '+d.time:''}${d.project?' · '+pname(d.project):''}`,'myday']);return;}
    if(c==='audit'&&!old&&d.by!==me&&actBoss()&&['uploaded','updated','assigned'].includes(d.action)){out.push(['task',d.action==='assigned'?'Task given to the team':'Drawing updated',d.summary+' · '+pnm(d.by),'alerts']);return;}
    if(c==='leave'&&old&&old.user===me&&old.status!==d.status&&['Approved','Rejected'].includes(d.status))out.push(['task','Leave '+d.status.toLowerCase(),`${d.type} · ${fd(d.from)}`,'myday']);});
  if(!out.length)return;
  setTimeout(()=>{   // after the new data is in place
    const chats=out.filter(x=>x[0]==='chat').map(x=>x[1]);
    if(chats.length){const u=chatUnread();if(u>0){const m=chats[chats.length-1],who=typeof chatName==='function'?chatName(m.from):'Someone';
      ntShow(chats.length>1?`${chats.length} new messages`:`Message from ${who}`,(chats.length>1?who+': ':'')+(m.text||(m.photos&&m.photos.length?'📷 Photo':'')),'messages','bm-chat');}}
    out.filter(x=>x[0]==='task').slice(0,4).forEach((x,i)=>ntShow(x[1],x[2],x[3],'bm-t'+i+Date.now()));},400);};
function ntBox(){if(typeof Notification==='undefined'||!ME.id)return '';
  if(Notification.permission==='granted')return '';
  if(Notification.permission==='denied')return '';
  return `<div class="note">${ico('bell')}<span style="flex:1">Get a notification on this ${/Mobi|Android|iPhone/i.test(navigator.userAgent)?'phone':'computer'} when someone messages you or gives you a task.</span><button type="button" class="btn sm pri" id="ntAsk">Turn on notifications</button></div>`;}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ntAsk,#ntOff,#ntTest');if(!b)return;
  if(b.id==='ntAsk'){try{const r=await Notification.requestPermission();try{localStorage.setItem('bm-notif','on');}catch(_){}toast(r==='granted'?'Notifications are on for this device':'Notifications were not allowed — you can allow them in the browser / phone settings');}catch(_){toast('This browser cannot show notifications');}render();return;}
  if(b.id==='ntOff'){const on=!ntOn();try{localStorage.setItem('bm-notif',on?'on':'off');}catch(_){}toast(on?'Notifications on':'Notifications off on this device');render();return;}
  if(b.id==='ntTest'){const v=document.visibilityState;setTimeout(()=>{if(ntOK()){navigator.serviceWorker&&navigator.serviceWorker.controller?navigator.serviceWorker.ready.then(r=>r.showNotification('BuildMitr',{body:'Notifications work on this device ✓',icon:'icon-192.png'})):new Notification('BuildMitr',{body:'Notifications work on this device ✓'});}else toast('Allow notifications first');},300);}});
/* settings row */
function ntSettings(){if(typeof Notification==='undefined')return `<div class="srow"><span class="code">This browser cannot show notifications.</span></div>`;
  const p=Notification.permission;return `<div class="srow" style="flex-wrap:wrap;gap:8px"><b style="flex:1">Notifications on this device</b>${p==='granted'?`<span class="pill ${ntOn()?'p-green':'p-grey'}">${ntOn()?'On':'Off'}</span><button type="button" class="btn sm" id="ntOff">${ntOn()?'Turn off':'Turn on'}</button><button type="button" class="btn sm" id="ntTest">Send a test</button>`:p==='denied'?'<span class="code">Blocked — allow notifications for BuildMitr in the browser or phone settings.</span>':`<button type="button" class="btn sm pri" id="ntAsk">Turn on</button>`}</div>`;}
/* opened from a notification */
try{navigator.serviceWorker&&navigator.serviceWorker.addEventListener('message',e=>{const v=e.data&&e.data.bmView;if(v&&S.ready&&canView(v)){S.view=v;render();}});}catch(_){}

/* ================= Updates in the bell =================
   Every drawing change and every task given to someone is written to the activity log (the "audit" list):
   the admin / project manager sees all of them in the bell; each person sees the work given to them.
   Unread ones are counted on the bell until the bell page is opened. */
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&r!=='Client'&&!a.includes('alerts'))a.push('alerts');});
const ACT_SEEN_K=()=>'bm-bellseen-'+(ME&&ME.id||'');
const actSeen=()=>{try{return +localStorage.getItem(ACT_SEEN_K())||0;}catch(_){return 0;}};
const actBoss=()=>isAdmin()||curRole()==='Project manager';
const DOC_FLDS=['file','rev','status','rel','title','url','files','revs'];
/* called by the data layer for every change I make: [collection, id, before, after] */
function actLog(c,id,prev,next){
  if(S.demo||!db||!ME||!ME.id||c==='audit'||!next)return;
  try{
    const add=(action,summary,to,project,col)=>db.collection('audit').add({at:Date.now(),by:ME.id,action,col:col||c,ref:id,summary:String(summary).slice(0,300),to:to||[],project:project||''});
    if(c==='documents'){
      const tk=next.task?((D[next.taskCol]||[]).find(x=>x.id===next.task)||{}).title:next.cal?((D.cal||[]).find(x=>x.id===next.cal)||{}).title:'';
      if(!prev)return add('uploaded',`Drawing added: ${next.title||id}${next.rev?' '+next.rev:''}${tk?' — task done: '+tk:''}`,[],next.project);
      const ch=DOC_FLDS.filter(k=>JSON.stringify(prev[k])!==JSON.stringify(next[k]));if(!ch.length)return;
      const what=(prev.rev!==next.rev||JSON.stringify(prev.revs)!==JSON.stringify(next.revs)||prev.file!==next.file||prev.url!==next.url)?`new revision${next.rev?' '+next.rev:''}`:prev.status!==next.status?(next.status||'status changed'):prev.rel!==next.rel?(next.rel?'released to client / site':'withdrawn'):'details changed';
      const toU=prev.status!==next.status&&['Sent back','Approved'].includes(next.status)&&next.by&&next.by!==ME.id?[next.by]:[];   // the person who drew it hears about it
      return add('updated',`Drawing updated: ${next.title||id} — ${what}${tk&&prev.task!==next.task?' (task done: '+tk+')':''}`,toU,next.project);}
    if(c==='stdlib'){const ch=!prev||JSON.stringify(prev.files)!==JSON.stringify(next.files);if(!ch)return;const fo=(stdFolders().find(f=>f.id===next.folder)||{}).name||'';
      return add(prev?'updated':'uploaded',`Common library${fo?' › '+fo:''}: ${next.title}${prev?' — new version':' added'}`,[],'' ,'stdlib');}
    if(TR_COLS.includes(c)&&prev){const ps=prev.status,ns=next.status,L=next.log||[],last=L.length>(prev.log||[]).length?L[L.length-1]:null,tt=next.title||'';
      if(ns!==ps&&ns==='For review'&&next.by&&next.by!==ME.id)return add('review',`${pnm(next.who)} finished “${tt}” — please check${next.doneFile?' ('+next.doneFile+')':''}`,[next.by],next.project);
      if(ns==='Changes requested'&&(ns!==ps||(last&&last.k==='back'))&&next.who&&next.who!==ME.id)return add('returned',`Corrections for you: “${tt}”${last&&last.t?' — '+String(last.t).slice(0,160):''}`,[next.who],next.project);
      if(ns!==ps&&ns===TR_DONE(c)&&ps==='For review'&&next.who&&next.who!==ME.id)return add('approved',`Approved: “${tt}”`,[next.who],next.project);
      if(last&&last.k==='note'){const to=[next.who,next.by].filter((u,i,a)=>u&&u!==ME.id&&a.indexOf(u)===i);if(to.length)return add('comment',`${tt}: “${String(last.t||'file added').slice(0,160)}”`,to,next.project);}}
    if(c==='tasks'||c==='dtasks'){const w=next.who||'',pw=prev?prev.who||'':'';if(!w||w===pw||next.calId)return;
      return add('assigned',`${c==='dtasks'?'Design task':'Task'} given to ${pnm(w)}: ${next.title||''}${next.due?' (due '+fd(next.due)+')':''}`,[w],next.project);}
    if(c==='cal'){const nw=(next.who||[]).filter(u=>!(prev&&prev.who||[]).includes(u));if(!nw.length)return;
      return add('scheduled',`Work scheduled for ${nw.map(u=>pnm(u)).join(', ')}: ${next.title||''} (${fd(next.start)}${next.time?' '+next.time:''})`,nw,next.project);}
  }catch(_){}}
/* what this person should see in the bell */
function bellActs(){const me=ME&&ME.id;if(!me)return [];const boss=actBoss(),wk=Date.now()-14*864e5;
  return (D.audit||[]).filter(a=>a.at>wk&&a.by!==me&&['uploaded','updated','assigned','scheduled','review','returned','approved','comment'].includes(a.action)&&(boss?(!a.project||projOK(a.project)):(a.to||[]).includes(me)))
    .sort((a,b)=>b.at-a.at).slice(0,60);}
const bellUnread=()=>{const s=actSeen();return bellActs().filter(a=>a.at>s).length;};
/* the bell number = exactly what the Alerts page shows for the chosen project (or all projects) */
function bellCount(pid){const s=actSeen(),inP=p=>pid==='all'||!p||p===pid;
  return computeAlerts().filter(a=>inP(a.pid)).length+bellActs().filter(a=>a.at>s&&inP(a.project)).length;}
/* ================= Calendar work → tasks =================
   Each person a calendar work is given to also gets a task (design kinds → design schedule tasks, others → site tasks),
   kept in step when the work is changed, moved, re-assigned, ticked done or deleted. Task id: cal_<work>_<person>. */
const CAL_DESIGN=['Design work','Approval / submission','Office work','Meeting'];
function calTaskCol(kind){const pref=CAL_DESIGN.includes(kind)?'dtasks':'tasks',alt=pref==='tasks'?'dtasks':'tasks';
  const can=c=>CANW0&&canEditView(c);return can(pref)?pref:can(alt)?alt:'';}
const calTid=(cid,u)=>`cal_${cid}_${u}`.replace(/[^\w-]/g,'_').slice(0,120);
const calLinked=cid=>[...(D.tasks||[]).map(t=>['tasks',t]),...(D.dtasks||[]).map(t=>['dtasks',t])].filter(([,t])=>t.calId===cid);
function calTaskRec(c,u,old){const rep=c.repeat?((CAL_REP.find(r=>r[0]===c.repeat)||[])[1]||''):'';
  return {...(old||{}),project:c.project||'',title:c.title+(rep?' ('+rep.toLowerCase()+')':''),start:c.start,due:c.repeat?(c.until||''):(c.end&&c.end>c.start?c.end:c.start),
    who:u,status:(old&&old.status)||'Not started',progress:(old&&old.progress)||0,calId:c.id,kind:c.kind||'',notes:c.notes||'',files:c.files||[],by:(old&&old.by)||c.by||ME.id,...(old?{}:{disc:'Calendar work'})};}
const calTasksOn=()=>orgMain().calTasks!==false;   // Settings: does calendar work create tasks (for work that did not choose)?
const calWantsTask=c=>c&&c.mkTask!==undefined?!!c.mkTask:calTasksOn();
async function calSyncTasks(c){if(!c||!c.id)return 0;if(!calWantsTask(c)){if(c.mkTask===false&&calLinked(c.id).length)await calDropTasks(c.id);return 0;}const col=calTaskCol(c.kind);const have=calLinked(c.id),out=[],del=[];
  (c.who||[]).forEach(u=>{const ex=have.find(([,t])=>t.who===u);if(ex&&ex[0]!==col&&col){del.push(ex);}
    const k=col||(ex&&ex[0]);if(!k||!(CANW0&&canEditView(k)))return;const old=ex&&ex[0]===k?ex[1]:null;
    const rec=calTaskRec(c,u,old);if(old&&['project','title','start','due','who','notes','kind'].every(f=>String(old[f]||'')===String(rec[f]||''))&&JSON.stringify(old.files||[])===JSON.stringify(rec.files||[]))return;out.push([k,old?old.id:calTid(c.id,u),rec]);});
  have.forEach(ex=>{if(!(c.who||[]).includes(ex[1].who))del.push(ex);});
  try{if(out.length)await dbBatch(out);for(const [k,t] of del)if(CANW0&&canEditView(k))await db.doc(k+'/'+t.id).delete();}catch(_){}
  return out.length;}
async function calDropTasks(cid){for(const [k,t] of calLinked(cid))if(CANW0&&canEditView(k)){try{await db.doc(k+'/'+t.id).delete();}catch(_){}}}
/* a person ticks a one-time work done → their task is completed (and un-ticking reopens it) */
async function calTaskDone(cid,uid,on){const c=(D.cal||[]).find(x=>x.id===cid);if(!c||c.repeat)return;const ex=calLinked(cid).find(([,t])=>t.who===uid);if(!ex||!(CANW0&&canEditView(ex[0])))return;
  try{await db.doc(ex[0]+'/'+ex[1].id).update(on?{status:'Completed',progress:100}:{status:'In progress',progress:0});}catch(_){}}
/* work scheduled before this existed: create the missing tasks once (admin / project manager / the person who scheduled it) */
let CT_BACK=false;
let DENIED_T=0;function deniedToast(m){if(Date.now()-DENIED_T<8000)return;DENIED_T=Date.now();toast('Not saved: '+(m||'you do not have permission to change this.'));}
function calBackfill(){if(!actBoss()&&!canEditView("tasks"))return;if(CT_BACK||!S.ready||S.demo||!ME||!ME.id)return;CT_BACK=true;const d0=today(),old=(()=>{const d=dOf(d0);d.setDate(d.getDate()-30);return isoD(d);})();
  (D.cal||[]).filter(c=>calWantsTask(c)&&(c.who||[]).length&&(actBoss()||c.by===ME.id)&&(c.repeat?(!c.until||c.until>=d0):(c.end||c.start)>=old)&&(c.who||[]).some(u=>!calLinked(c.id).some(([,t])=>t.who===u)))
    .forEach(c=>calSyncTasks(c));}

/* ================= Finish a task by uploading the work into the Drawings library =================
   From My day / the Calendar the person picks the library folder and drawing (or types a new name), uploads the file(s);
   the drawing is filed in the library (linked to the task), the task is marked done, and the admin's bell shows it. */
/* → drawings: finForm */
/* → drawings: finNew */
document.addEventListener('change',e=>{const t=e.target;if(t.id==='finKey')finNew();
  if(t.id==='finDisc'){const f=t.form,pid=f.dataset.pid;const k=document.getElementById('finKey');k.innerHTML=`<option value="__new">+ New drawing (name below)</option>`+dlItems(pid,t.value).map(x=>`<option>${esc(x.k)}</option>`).join('');finNew();}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fin]');if(!b)return;const [src,id,date]=b.dataset.fin.split('|');finForm(src,id,date);});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='finForm')return;e.preventDefault();
  const src=f.dataset.src,id=f.dataset.id,pid=f.dataset.pid,date=f.dataset.date||today();if(!pid)return;
  const disc=f.elements.disc.value,key=f.elements.key.value==='__new'?f.elements.newk.value.trim():f.elements.key.value;if(!key){toast('Give the drawing a name');return;}
  const fs=f.elements.files.files;if(!fs.length){toast('Choose the file(s) to upload');return;}
  const btn=f.querySelector('.btn.pri');btn.disabled=true;btn.querySelector('span').textContent='Uploading…';
  const task=src==='cal'?calLinked(id).find(([,t])=>t.who===ME.id):[src,(D[src]||[]).find(x=>x.id===id)];
  const ok=await dlUploadTo(pid,disc,key,fs,{task:task&&task[1]?task[1].id:'',taskCol:task?task[0]:'',cal:src==='cal'?id:'',note:f.elements.note.value.trim()});
  if(!ok){btn.disabled=false;btn.querySelector('span').textContent='Upload & mark done';return;}
  if(src==='cal')await calTick(id,date,true);
  else{const t0=(D[src]||[]).find(x=>x.id===id);
    if(t0&&trCanWrite(src,t0)){const rv=trNeeds(t0),now=Date.now();NTF.mine[src+'|'+id]=now;
      try{await db.doc(src+'/'+id).update({status:rv?'For review':'Completed',progress:100,doneFile:key,doneDisc:disc,doneDoc:ok.id||'',doneAt:now,log:[...(t0.log||[]),{k:'done',by:ME.id,at:now,t:f.elements.note.value.trim(),key,rev:ok.rev||'',files:ok.files||[]}]});
        closeLayer();toast(rv?`${key} filed — sent to ${pnm(t0.by)} for review ✓`:`${key} filed in the library — task done ✓`);render();return;}
      catch(e2){closeLayer();toast(`${key} is filed in the library, but the task could not be updated (${(e2&&e2.message)||'no connection'}) — open the task and tap Done`);render();return;}}
    closeLayer();toast(`${key} is filed in the library. You cannot change this task — tell ${t0&&t0.by?pnm(t0.by):'the admin'} it is done`);render();return;}
  closeLayer();toast(`${key} filed in the library — task done ✓`);render();});

/* ================= Create task (quick box on every home screen) =================
   Like the task bar in Powerplay / Onsite / RDash: type the task, pick project, person, due date and press Create.
   "More" adds type (site / design), start date, priority (⭐ do first), notes, checklist and files.
   The person sees it in My day and the bell (and a phone / PC notification if turned on). */
const QT={more:false};
const qtCols=()=>['tasks','dtasks'].filter(c=>CANW0&&canEditView(c));
let QTO=false;
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-qtopen]');if(!b)return;const bx=b.closest('.box.qt');bx.classList.toggle('open');QTO=bx.classList.contains('open');if(QTO){const i=bx.querySelector('#qtForm [name=title]');if(i)i.focus();}});
function qtBox(){const cols=qtCols();if(!S.ready||!cols.length||curRole()==='Client')return '';
  const ppl=schPeople(),pid=S.proj!=='all'?S.proj:'',d0=today();
  const defCol=cols.includes(['design'].includes(uiOf())?'dtasks':'tasks')?(['design'].includes(uiOf())?'dtasks':'tasks'):cols[0];
  return `<div class="box qt ${QTO?'open':''}"><button type="button" class="m-only m-link qt-open" data-qtopen>${ico('plus')}<span><b>New task</b><small>Give work to someone or to yourself</small></span>${ico('chevron-down')}</button><form id="qtForm" class="qt-f" autocomplete="off">
    <span class="qt-i">${ico('list-checks')}</span>
    <input name="title" required maxlength="140" placeholder="Create a task… e.g. Send GF plan to client" aria-label="Task">
    <select name="project" aria-label="Project">${PJ().length>1||!pid?'<option value="">Project…</option>':''}${PJ().map(p=>`<option value="${esc(p.id)}" ${pid===p.id?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select>
    <select name="who" aria-label="Assign to"><option value="">Assign to…</option><option value="${esc(ME.id)}">Me</option>${ppl.filter(p=>p.account!==ME.id).map(p=>`<option value="${esc(p.account)}">${esc(p.name)}${p.role?' · '+esc(p.role):''}</option>`).join('')}</select>
    <input type="date" name="due" value="${d0}" aria-label="Due date">
    <button type="button" class="btn sm ghost" id="qtMore" aria-expanded="${QT.more}">${QT.more?'Less':'More'}</button>
    <button class="btn pri">${ico('plus')}<span>Create</span></button>
    <div class="qt-more" ${QT.more?'':'hidden'}>
      <label>Type<select name="col">${cols.map(c=>`<option value="${c}" ${c===defCol?'selected':''}>${c==='dtasks'?'Design / drawing':'Site work'}</option>`).join('')}</select></label>
      <label>Start<input type="date" name="start" value="${d0}"></label>
      <label>Priority<select name="prio"><option value="">Normal</option><option value="1">⭐ Do first</option></select></label>
      ${cols.includes('dtasks')?`<label>Section (design)<select name="disc"><option value="">—</option>${dsSecs().map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>`:''}
      <label class="qt-w">Notes<textarea name="notes" rows="2" maxlength="1000"></textarea></label>
      <label class="qt-w">Checklist (one item per line)<textarea name="chk" rows="2" maxlength="1500" placeholder="Plan&#10;Sections&#10;Elevations"></textarea></label>
      <label class="qt-w">Attach files<input type="file" name="att" multiple></label>
    </div></form></div>`;}
document.addEventListener('change',async e=>{const t=e.target;if(!t.dataset||!t.dataset.qtchk)return;const [c,id,i]=t.dataset.qtchk.split('|'),x=(D[c]||[]).find(r=>r.id===id);if(!x)return;
  const chk=(x.chk||[]).map((k,j)=>j===+i?{...k,done:t.checked}:k),dn=chk.filter(k=>k.done).length,pr=Math.round(dn/chk.length*100);
  await write(()=>db.doc(c+'/'+id).update({chk,progress:pr,...(pr===100?{status:'Completed'}:x.status==='Not started'?{status:'In progress'}:{})}),pr===100?'All done ✓':null);render();});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#qtMore');if(!b)return;QT.more=!QT.more;const m=document.querySelector('.qt-more');if(m)m.hidden=!QT.more;b.textContent=QT.more?'Less':'More';b.setAttribute('aria-expanded',QT.more);});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='qtForm')return;e.preventDefault();
  const g=k=>(f.elements[k]?String(f.elements[k].value||'').trim():''),cols=qtCols();
  const col=cols.includes(g('col'))?g('col'):(cols.includes(['design'].includes(uiOf())?'dtasks':'tasks')?(['design'].includes(uiOf())?'dtasks':'tasks'):cols[0]);
  const title=g('title');if(!title)return;const project=g('project');if(!project&&PJ().length){toast('Pick the project');f.elements.project.focus();return;}
  const btn=f.querySelector('.btn.pri');btn.disabled=true;
  const files=[];const att=f.elements.att&&f.elements.att.files;
  if(att&&att.length&&A)for(const file of [...att]){if(file.size>10*1048576){toast(file.name+' is over 10 MB');continue;}try{const r=await A.upload(file,{type:fileType(file.name)||file.type||'application/octet-stream'});files.push({id:r.id,name:file.name,type:fileType(file.name)||file.type});}catch(_){toast(file.name+': upload failed');}}
  const chk=g('chk').split('\n').map(x=>x.trim()).filter(Boolean).map(t=>({t,done:false}));
  const due=g('due'),start=g('start')||today();
  const rec={project,title,who:g('who'),start:start>due&&due?due:start,due,status:'Not started',progress:0,by:ME.id,at:Date.now(),...(g('prio')?{first:true}:{}),...(g('notes')?{notes:g('notes')}:{}),...(chk.length?{chk}:{}),...(files.length?{files}:{}),...(col==='dtasks'?{disc:g('disc')||''}:{})};
  const id=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;
  const ok=await write(()=>db.doc(col+'/'+id).set(rec),`Task created${rec.who?' — given to '+(rec.who===ME.id?'you':pnm(rec.who)):''}`);
  btn.disabled=false;if(ok){f.reset();if(f.elements.due)f.elements.due.value=today();render();}});

/* ================= "+" quick menu — on every screen, set to each person's needs =================
   Create (task, upload drawing, project, daily report, …), Go to (calendar, tasks, library, …) and pinned projects.
   Only what the person's role is allowed shows. "Customise" lets each person choose and order their shortcuts
   (remembered for their login on this device). */
const QA_ALL=[
  // [key, icon, label, group, allowed, run]
  ['sitepay','wallet','Site payment','c',()=>typeof spCan==='function'&&spCan()&&canView('sitepay'),()=>{SP.kind='';spForm('');}],
  ['snap','camera','Site photo','c',()=>CANW0&&!!A&&!['Client','none'].includes(curRole()),()=>snapOpen()],
  ['mom','message-square-text','New MOM','c',()=>CANW0&&canView('meetings'),()=>momForm('')],
  ['newtask','list-checks','New task','c',()=>calCanEdit(null)||qtCols().length,()=>calForm(null,today(),true)],
  ['upload','upload','Upload drawing','c',()=>canView('drawlib')&&canEditView('documents'),()=>{S.view='drawlib';render();scrollTo(0,0);toast('Pick the folder and press Upload on the drawing');}],
  ['addproj','building-2','New project','c',()=>canView('projects')&&canEditView('projects'),()=>openForm('projects')],
  ['dprauto','notebook-pen','Today\'s daily report','c',()=>canView('dpr')&&canEditView('dpr'),()=>runQuick('dprauto')],
  ['attbulk','calendar-check','Mark attendance','c',()=>canEditView('attendance'),()=>runQuick('attbulk')],
  ['issues','alert-triangle','Issue / snag','c',()=>canView('issues')&&canEditView('issues'),()=>runQuick('issues')],
  ['requests','arrow-left-right','Request material','c',()=>canView('requests')&&canEditView('requests'),()=>runQuick('requests')],
  ['received','package-plus','Material received','c',()=>canView('received')&&canEditView('received'),()=>runQuick('received')],
  ['issue','package-minus','Material issue','c',()=>canView('issue')&&canEditView('issue'),()=>runQuick('issue')],
  ['workupd','hammer','Work update','c',()=>canView('workupd')&&canEditView('workupd'),()=>runQuick('workupd')],
  ['payments','indian-rupee','Payment','c',()=>canView('payments')&&canEditView('payments'),()=>runQuick('payments')],
  ['equiplog','gauge','Equipment usage','c',()=>canView('equiplog')&&canEditView('equiplog'),()=>runQuick('equiplog')],
  ['leads','user-plus','New lead','c',()=>canView('leads')&&canEditView('leads'),()=>openForm('leads')],
  ['g:myday','sun','My day','g',()=>canView('myday'),null],['g:calendar','calendar','Calendar','g',()=>canView('calendar'),null],
  ['g:tasks','list-checks','Tasks','g',()=>canView('tasks'),null],['g:designsched','pencil-ruler','Design schedule','g',()=>canView('designsched'),null],
  ['g:schedule','gantt-chart','Construction schedule','g',()=>canView('schedule'),null],['g:drawlib','library','Drawings library','g',()=>canView('drawlib'),null],
  ['g:messages','message-circle','Messages','g',()=>canView('messages'),null],['g:alerts','bell','Alerts & updates','g',()=>canView('alerts'),null],
  ['g:dashboard','layout-dashboard','Dashboard','g',()=>canView('dashboard')&&!['site','design'].includes(uiOf()),null],['g:attend','calendar-check','Attendance & leave','g',()=>canView('attend'),null],
  ['g:projects','building-2','All projects','g',()=>canView('projects'),null],['g:meetings','message-square-text','Meetings & notes','g',()=>canView('meetings'),null],['g:stdlib','archive','Common library','g',()=>canView('stdlib'),null],['g:pipeline','kanban','Sales pipeline','g',()=>canView('pipeline'),null],
];
const QA_DEF={owner:['snap','newtask','addproj','upload','dprauto','payments','mom','g:calendar','g:tasks','g:alerts'],site:['snap','sitepay','dprauto','newtask','issues','requests','received','attbulk','mom','g:calendar','g:tasks'],
  design:['snap','newtask','upload','mom','g:calendar','g:designsched','g:drawlib','g:messages'],client:['g:messages'],marketing:['leads','newtask','g:pipeline','g:calendar']};
const qaK=()=>'bm-qa-'+(ME&&ME.id||'');
function qaPrefs(){try{const j=JSON.parse(localStorage.getItem(qaK())||'null');if(j&&Array.isArray(j.keys))return j;}catch(_){}return null;}
const qaOK=k=>{const x=QA_ALL.find(r=>r[0]===k);try{return !!(x&&x[4]());}catch(_){return false;}};
function qaMine(){const p=qaPrefs();const ui=uiOf();const def=QA_DEF[ui]||QA_DEF[curRole()==='Marketing'?'marketing':'owner'];
  const keys=(p?p.keys:def).filter(qaOK);const projs=(p?p.projs:(S.proj!=='all'?[S.proj]:[])).filter(id=>projOK(id));return {keys,projs,custom:!!p};}
let QA_EDIT=false;
function openQuick(){const m=qaMine();
  const tile=(k,i,l,extra)=>`<button class="qa-btn" ${extra}>${ico(i)}<span>${esc(l)}</span></button>`;
  const body=QA_EDIT?qaEditHtml(m):`
    <div class="qa-sec">Quick</div><div class="qa-grid">${m.keys.map(k=>{const x=QA_ALL.find(r=>r[0]===k);return tile(k,x[1],x[2],`data-qak="${k}"`);}).join('')||'<div class="code" style="padding:8px">No shortcuts yet — tap Customise.</div>'}</div>
    ${m.projs.length?`<div class="qa-sec">My projects</div><div class="qa-grid">${m.projs.map(id=>tile(id,'building-2',pname(id),`data-qaproj="${esc(id)}"`)).join('')}</div>`:''}`;
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane" style="height:auto;max-height:100%;margin-top:auto">
    <div class="pane-h"><h2>${QA_EDIT?'Customise your + menu':'Quick'}</h2>${QA_EDIT?'':`<button type="button" class="btn sm" id="qaEdit">${ico('pencil')}<span>Customise</span></button>`}<button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
    <div class="pane-b" style="padding:0">${body}</div>${QA_EDIT?`<div class="pane-f"><button type="button" class="btn pri" id="qaSave">${ico('check')}<span>Save</span></button><button type="button" class="btn" id="qaReset">Back to default</button><button type="button" class="btn ghost" id="qaCancel">Cancel</button></div>`:''}</div></div>`;}
function qaEditHtml(m){const av=QA_ALL.filter(r=>qaOK(r[0]));const on=new Set(m.keys);
  const row=r=>`<label class="qa-ck"><input type="checkbox" name="qak" value="${r[0]}" ${on.has(r[0])?'checked':''}> ${ico(r[1])}<span>${esc(r[2])}</span></label>`;
  return `<p class="code" style="padding:12px 16px 0">Tick what you want on your + button. Only things your role can use are listed.</p>
    <div class="qa-sec">Create</div><div class="qa-cks">${av.filter(r=>r[3]==='c').map(row).join('')}</div>
    <div class="qa-sec">Go to</div><div class="qa-cks">${av.filter(r=>r[3]==='g').map(row).join('')}</div>
    ${PJ().length?`<div class="qa-sec">Projects to open in one tap</div><div class="qa-cks">${PJ().map(p=>`<label class="qa-ck"><input type="checkbox" name="qap" value="${esc(p.id)}" ${m.projs.includes(p.id)?'checked':''}> ${ico('building-2')}<span>${esc(pname(p.id))}</span></label>`).join('')}</div>`:''}`;}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-qak],[data-qaproj],#qaEdit,#qaSave,#qaReset,#qaCancel');if(!b)return;
  if(b.dataset.qak){const k=b.dataset.qak,x=QA_ALL.find(r=>r[0]===k);closeLayer();if(!x)return;if(k.startsWith('g:')){S.view=k.slice(2);render();scrollTo(0,0);}else x[5]();return;}
  if(b.dataset.qaproj){closeLayer();S.proj=b.dataset.qaproj;try{localStorage.setItem('bm-proj',S.proj);}catch(_){}S.view=canView('project')?'project':homeView();render();scrollTo(0,0);return;}
  if(b.id==='qaEdit'){QA_EDIT=true;openQuick();return;}
  if(b.id==='qaCancel'){QA_EDIT=false;openQuick();return;}
  if(b.id==='qaReset'){try{localStorage.removeItem(qaK());}catch(_){}QA_EDIT=false;toast('Back to the standard shortcuts for your role');openQuick();return;}
  if(b.id==='qaSave'){const L=document.querySelector('.qa-drawer');const keys=[...L.querySelectorAll('input[name=qak]:checked')].map(i=>i.value),projs=[...L.querySelectorAll('input[name=qap]:checked')].map(i=>i.value);
    try{localStorage.setItem(qaK(),JSON.stringify({keys,projs}));}catch(_){}QA_EDIT=false;toast('Your + menu is saved');openQuick();return;}});

/* ================= Common library (company standard files) =================
   Folders and sub-folders of standard files for every project: standard details, typical drawings, specifications,
   BOQ / estimate formats, company forms, agreements, catalogues, checklists, codes. Each folder says who can see it
   and who can upload (everyone, roles, chosen people, clients). Kept in org main `stdFolders`; files in `stdlib`.
   A file can be copied into a project's Drawings library in one tap. */
COLS.push('stdlib');if(!D.stdlib)D.stdlib=[];
{const g=NAV[0].items;if(!g.some(x=>x[0]==='stdlib')){const i=g.findIndex(x=>x[0]==='drawlib');g.splice(i>=0?i+1:g.length,0,['stdlib','archive','Common library','సాధారణ లైబ్రరీ']);}}
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&!a.includes('stdlib'))a.push('stdlib');});
EDIT_TIE.stdlib='stdlib';
const STD_UP0=['Admin','Project manager'];
const STD_DEF=[['Standard details',['Footing & column details','Beam & slab details','Staircase details','Sump & septic tank','Waterproofing']],['Typical drawings',[]],['Specifications',[]],
  ['BOQ & estimate formats',[]],['Company forms & templates',[]],['Agreements & letters',[]],['Product catalogues & brochures',[]],['Site checklists',[]],['Codes & references (IS codes)',[]]];
function stdFolders(){const l=orgMain().stdFolders;if(Array.isArray(l)&&l.length)return l;
  const out=[];STD_DEF.forEach(([n,subs],i)=>{const id='f'+i;out.push({id,name:n,parent:'',view:['all'],up:STD_UP0.slice()});subs.forEach((sn,j)=>out.push({id:id+'_'+j,name:sn,parent:id,view:['all'],up:STD_UP0.slice()}));});return out;}
const stdOk=(list)=>{if(isAdmin()||curRole()==='Project manager')return true;list=list||[];return list.includes(ME.id)||list.includes(curRole())||(list.includes('all')&&curRole()!=='Client');};
const stdF=id=>stdFolders().find(f=>f.id===id);
const stdCanSee=f=>!!f&&(stdOk(f.view)||stdOk(f.up));
const stdCanUp=f=>!!f&&CANW0&&stdOk(f.up)&&!!A;
const STD={f:'',q:''};
/* → library: stdAccTxt */
/* → library: vStdLib */
/* upload / new version */
/* → library: stdUpForm */
/* folders & access (admin / PM) */
/* → library: stdFolderForm */
let STD_EDIT=null;
document.addEventListener('input',e=>{if(e.target.id==='stdQ'){STD.q=e.target.value;clearTimeout(STD.t);STD.t=setTimeout(()=>{render();const i=document.getElementById('stdQ');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},250);}});
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-stdf],[data-stdup],[data-stddel],[data-stdproj],#stdFolders,#stdFAdd,[data-sfdel]');if(!b)return;const ds=b.dataset;
  if(ds.stdf){STD.f=ds.stdf;STD.q='';render();return;}
  if(ds.stdup!==undefined){const [f,id]=ds.stdup.split('|');stdUpForm(f,id);return;}
  if(b.id==='stdFolders'){STD_EDIT=JSON.parse(JSON.stringify(stdFolders()));stdFolderForm2();return;}
  if(b.id==='stdFAdd'){stdCollect();STD_EDIT.push({id:'f'+Date.now().toString(36),name:'New folder',parent:'',view:['all'],up:STD_UP0.slice()});stdFolderForm2(STD_EDIT.length-1);return;}
  if(ds.sfdel!==undefined){stdCollect();const f=STD_EDIT[+ds.sfdel];const n=(D.stdlib||[]).filter(x=>x.folder===f.id).length;
    if(n){toast(`Move or delete the ${n} file${n>1?'s':''} in “${f.name}” first`);return;}STD_EDIT=STD_EDIT.filter((x,i)=>i!==+ds.sfdel).map(x=>x.parent===f.id?{...x,parent:''}:x);stdFolderForm2();return;}
  if(ds.stddel){const x=(D.stdlib||[]).find(r=>r.id===ds.stddel);if(!x)return;if(b.dataset.sure!=='1'){b.dataset.sure='1';b.innerHTML=ico('trash-2')+'<span>Tap again to delete</span>';return;}
    await write(()=>db.doc('stdlib/'+x.id).delete(),'Deleted');render();return;}
  if(ds.stdproj){const x=(D.stdlib||[]).find(r=>r.id===ds.stdproj);if(!x)return;stdToProj(x);return;}});
/* folder editor keeps its working copy in STD_EDIT */
/* → library: stdFolderForm2 */
/* → library: stdCollect */
document.addEventListener('submit',async e=>{const f=e.target;
  if(f.id==='stdFForm'){e.preventDefault();stdCollect();const list=STD_EDIT;
    const ok=await write(()=>db.doc('org/main').update({stdFolders:list}),'Folders & access saved');
    if(ok){   // each file carries its folder's access
      const out=(D.stdlib||[]).map(x=>{const fo=list.find(o=>o.id===x.folder);if(!fo)return null;const acc={view:fo.view||[],up:fo.up||[]};return JSON.stringify(acc)!==JSON.stringify(x.acc||{})?['stdlib',x.id,{...recOf(x),acc}]:null;}).filter(Boolean);
      if(out.length)await write(()=>dbBatch(out),null);closeLayer();render();}return;}
  if(f.id!=='stdUpForm')return;e.preventDefault();
  const fid=f.elements.folder.value,fo=stdF(fid),id=f.dataset.id,old=id?(D.stdlib||[]).find(r=>r.id===id):null;if(!fo||!stdCanUp(fo))return;
  const btn=f.querySelector('.btn.pri');btn.disabled=true;btn.querySelector('span').textContent='Uploading…';
  const up=[];for(const file of [...f.elements.files.files]){if(file.size>25*1048576){toast(file.name+' is over 25 MB');continue;}
    try{const r=await A.upload(file,{type:fileType(file.name)||file.type||'application/octet-stream'});up.push({id:r.id,name:file.name,type:fileType(file.name)||file.type});}catch(er){toast(file.name+': '+(er.message||'upload failed'));}}
  if(!up.length){btn.disabled=false;btn.querySelector('span').textContent='Upload';return;}
  const rec={folder:fid,title:f.elements.title.value.trim(),rev:f.elements.rev.value.trim()||(old&&old.rev?'':''),notes:f.elements.notes.value.trim(),files:up,at:Date.now(),by:ME.id,acc:{view:fo.view||[],up:fo.up||[]},
    old:old?[{files:old.files||[],rev:old.rev||'',at:old.at||0,by:old.by||''},...(old.old||[])].slice(0,10):[]};
  const nid=id||`s${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;
  const ok=await write(()=>db.doc('stdlib/'+nid).set(rec),old?'New version uploaded':'Uploaded to '+fo.name);
  if(ok){STD.f=fid;closeLayer();render();}else{btn.disabled=false;btn.querySelector('span').textContent='Upload';}});
/* copy a standard file into a project's Drawings library */
/* → library: stdToProj */
/* → library: stdPjDisc */
document.addEventListener('change',e=>{if(e.target.id==='stdPj')stdPjDisc();});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='stdPjForm')return;e.preventDefault();const x=(D.stdlib||[]).find(r=>r.id===f.dataset.id);if(!x)return;
  const pid=f.elements.pid.value,disc=f.elements.disc.value,key=f.elements.key.value.trim()||x.title;
  const id=`d${Date.now().toString(36)}${Math.random().toString(36).slice(2,5)}`;
  const ok=await write(()=>db.doc('documents/'+id).set({project:pid,disc,dkey:key,title:key,cat:dlCat(disc),rev:x.rev||'R0',status:'For checking',files:x.files||[],std:x.id,fu:1,at:Date.now(),by:ME.id,appr:{s1:{by:ME.id,at:Date.now()}},rv:[]}),`Copied to ${pname(pid)} — ${disc}`);
  if(ok)closeLayer();});

/* Settings: calendar work → tasks on/off, and removing the tasks it already made */
function ctBox(){const on=calTasksOn(),all=[...(D.tasks||[]).map(t=>['tasks',t]),...(D.dtasks||[]).map(t=>['dtasks',t])].filter(([,t])=>t.calId);
  const pj=[...new Set(all.map(([,t])=>t.project||''))];
  return `<div class="box"><div class="box-h">${ico('calendar')}<h2>Calendar tasks</h2></div>
  <div class="srow" style="flex-wrap:wrap;gap:8px"><span style="flex:1;min-width:220px">Older calendar work (scheduled before each work had its own “Also add to Tasks” tick) creates a task for each person it is given to.</span>
    <span class="pill ${on?'p-green':'p-grey'}">${on?'On':'Off'}</span><button type="button" class="btn sm" id="ctToggle">${on?'Turn off':'Turn on'}</button></div>
  <div class="srow" style="flex-wrap:wrap;gap:8px"><span style="flex:1;min-width:220px">${all.length?`${all.length} task${all.length>1?'s were':' was'} created from calendar work. Removing them keeps the calendar work on the Calendar and in My day.`:'No tasks from calendar work right now.'}</span>
    ${all.length?`<select id="ctProj" aria-label="Project"><option value="*">All projects (${all.length})</option>${pj.map(p=>`<option value="${esc(p)}">${esc(p?pname(p):'Office / no project')} (${all.filter(([,t])=>(t.project||'')===p).length})</option>`).join('')}</select>
    <button type="button" class="btn sm danger" id="ctRemove">${ico('trash-2')}<span>Remove calendar tasks</span></button>`:''}</div>
  <div class="srow"><span class="code">This switch is the default for work that has no choice of its own. Each calendar work also has its own tick “Also add to Tasks” (ticked for New task). Removed tasks are not made again.</span></div></div>`;}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ctToggle,#ctRemove');if(!b)return;
  if(b.id==='ctToggle'){const on=!calTasksOn();if(await write(()=>db.doc('org/main').update({calTasks:on}),on?'Calendar work will create tasks again':'Calendar work no longer creates tasks')){if(on){CT_BACK=false;calBackfill();}render();}return;}
  const pj=(document.getElementById('ctProj')||{}).value||'*';
  const list=[...(D.tasks||[]).map(t=>['tasks',t]),...(D.dtasks||[]).map(t=>['dtasks',t])].filter(([,t])=>t.calId&&(pj==='*'||(t.project||'')===pj));if(!list.length)return;
  if(b.dataset.sure!=='1'){b.dataset.sure='1';b.querySelector('span').textContent=`Tap again to remove ${list.length}`;return;}
  b.disabled=true;let n=0;const cids=[...new Set(list.map(([,t])=>t.calId))];
  const ok=await write(async()=>{for(const cid of cids){if((D.cal||[]).some(x=>x.id===cid))await db.doc('cal/'+cid).update({mkTask:false});}for(const [c,t] of list){await db.doc(c+'/'+t.id).delete();n++;}},`${list.length} calendar task${list.length>1?'s':''} removed — the calendar work stays`);render();});
/* ================= Task review: finish → check → approve, or send the SAME task back with corrections =================
   Like Fieldwire (Completed → Verified) and Procore submittals (Revise and resubmit): when someone finishes work another
   person gave them, it goes to that person "For review". The reviewer approves it, or sends the same task back with what
   to change and their corrected / marked-up files (any type: DWG, PDF, photo…), a new due date and, if needed, to someone
   else. Every step is kept on the task as its history, shows in the bell and as a phone / PC notification.
   From the Drawings library, "Send to…" gives a drawing back to a person (reopening the task it came from, or a new one). */
const TR_COLS=['tasks','dtasks','issues'];
const TR_DONE=c=>c==='issues'?'Resolved':'Completed';
['tasks','dtasks','issues'].forEach(k=>{const f=MOD[k]&&MOD[k].fields.find(x=>x.k==='status');if(f&&!f.o.includes('For review'))f.o.splice(Math.max(1,f.o.indexOf(TR_DONE(k))),0,'Changes requested','For review');});
const trOn=()=>orgMain().taskReview!==false;
const trRec=(c,id)=>(D[c]||[]).find(x=>x.id===id);
const trNeeds=t=>trOn()&&!!t&&!!t.who&&!!t.by&&t.by!==t.who&&!t.calId;   // given by someone else → they check it
const trCanReview=t=>!!t&&ME&&(t.by===ME.id||actBoss());
const trIsDone=(c,t)=>!!t&&t.status===TR_DONE(c);
const trGate=(c,t,st)=>t&&st===TR_DONE(c)&&t.status!==st&&t.who===ME.id&&!actBoss()&&trNeeds(t)?'For review':st;
const trRel=()=>['Client','Site engineer','Supervisor'].includes(curRole());
const trWhen=at=>{if(!at)return '';const d=new Date(at);return fd(new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10))+' '+d.toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'});};
const trPill=s=>s==='For review'?'p-amber':s==='Changes requested'?'p-red':s==='Completed'||s==='Resolved'?'p-green':'p-grey';
/* ---------- task photos: camera → stamped (date, project, GPS, name) → task history ---------- */
const TR_PH=['Progress','Before','After','Issue'];
/* photos one at a time (phones run out of memory decoding many big photos together); max 10; HEIC cannot be shown in the app */
function phPick(fs){const all=[...(fs||[])];const heic=all.filter(f=>/heic|heif/i.test(f.type||'')||/\.(heic|heif)$/i.test(f.name||''));const ok=all.filter(f=>!heic.includes(f));
  if(heic.length)toast(`${heic.length} HEIC photo${heic.length>1?'s':''} skipped — set the camera to JPEG / "Most compatible", or pick another photo`);if(ok.length>10)toast('Only the first 10 photos are added');return ok.slice(0,10);}
async function phEach(fs,fn){const out=[];for(const f of fs)out.push(await fn(f));return out;}
const trThumbs=fs=>(fs||[]).length?`<div class="thumbs big tr-thumbs">${fs.map(f=>`<a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(f.id)}" alt="${esc(f.name||'Photo')}" loading="lazy"></a>`).join('')}</div>`:'';
const bmLoc=()=>new Promise(ok=>{try{if(!navigator.geolocation)return ok(null);let done=0;const fin=v=>{if(!done){done=1;ok(v);}};setTimeout(()=>fin(null),7000);
  navigator.geolocation.getCurrentPosition(p=>fin({lat:+p.coords.latitude.toFixed(5),lng:+p.coords.longitude.toFixed(5)}),()=>fin(null),{timeout:6500,maximumAge:120000,enableHighAccuracy:true});}catch(_){ok(null);}});
async function bmStamp(file,lines){try{if(!/^image\//.test(file.type||''))return file;const bmp=await createImageBitmap(file);const k=Math.min(1,1600/Math.max(bmp.width,bmp.height));
  const w=Math.round(bmp.width*k),h=Math.round(bmp.height*k),c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(bmp,0,0,w,h);try{bmp.close&&bmp.close();}catch(_){}
  const L=lines.filter(Boolean),fz=Math.max(14,Math.round(Math.min(w,h)/34)),pad=Math.round(fz*.7),lh=Math.round(fz*1.3),bh=L.length*lh+pad*2;
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,h-bh,w,bh);g.fillStyle='#fff';g.font=`600 ${fz}px system-ui,-apple-system,"Segoe UI",sans-serif`;g.textBaseline='top';
  L.forEach((t,i)=>{let s2=String(t);while(s2.length>4&&g.measureText(s2).width>w-pad*2)s2=s2.slice(0,-2);g.fillText(s2===String(t)?s2:s2+'…',pad,h-bh+pad+i*lh);});
  const b=await new Promise(ok=>c.toBlob(ok,'image/jpeg',.85));if(!b)return file;
  return new File([b],'photo-'+new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')+'.jpg',{type:'image/jpeg'});}catch(_){return file;}}
async function trPhoto(c,id,fs,tag){const t=trRec(c,id);if(!t||!fs||!fs.length)return;if(!trCanWrite(c,t)){toast('You cannot add photos to this task');return;}
  tag=TR_PH.includes(tag)?tag:'Progress';const pk=phPick(fs);if(!pk.length)return;toast('Adding photo…');const loc=await bmLoc(),now=new Date();
  const lines=[`${tag} · ${t.title||'Task'}`,`${t.project?pname(t.project)+' · ':''}${now.toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}`,`${pnm(ME.id)}${loc?` · GPS ${loc.lat}, ${loc.lng}`:''}`];
  const files=await phEach(pk,f=>bmStamp(f,lines));
  const up=await trUpload(files);if(!up||!up.length)return;
  if(await trPatch(c,id,{log:[...(t.log||[]),{k:'note',by:ME.id,at:Date.now(),t:`${tag} photo${up.length>1?'s':''}`,ph:tag,files:up,...(loc?{loc}:{})}]},`${up.length} photo${up.length>1?'s':''} added to “${t.title}”`)){
    const open=document.querySelector('.drawer [data-trphoto]');if(open)trOpen(c,id);else render();}}
const trCamBtn=(c,id,cls)=>`<label class="btn ${cls||'sm ghost'} tr-cam" title="Take a photo for this task (date, place and your name are stamped on it)">${ico('camera')}<span>Photo</span><input type="file" accept="image/*" capture="environment" multiple hidden data-trphoto="${c}|${esc(id)}"></label>`;
const trFiles=fs=>(fs||[]).length?`<div class="dl-files">${fs.map(f=>`<span class="dl-f"><a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${ico(fileIco(f))}${esc(f.name)}</a></span>`).join('')}</div>`:'';
const trLast=(t,k)=>{const L=(t&&t.log)||[];for(let i=L.length-1;i>=0;i--)if(!k||L[i].k===k)return L[i];return null;};
/* the drawing this task produced / is about */
function trDoc(t){if(!t)return null;const ds=D.documents||[];const d=t.doneDoc&&ds.find(x=>x.id===t.doneDoc);
  const key=(d&&(d.dkey||d.title))||t.doneFile||t.dkey;if(!key)return d||null;
  const all=ds.filter(x=>x.project===t.project&&(x.dkey||x.title)===key).sort((a,b)=>(b.at||0)-(a.at||0));return all.find(x=>x.status!=='Superseded')||all[0]||d||null;}
/* tasks linked to a drawing (made by Upload & finish, or sent from the library) */
function trTasksOf(pid,key,ids){const out=[];['tasks','dtasks'].forEach(c=>(D[c]||[]).forEach(t=>{if(t.project===pid&&((t.doneDoc&&(ids||[]).includes(t.doneDoc))||t.doneFile===key||t.dkey===key))out.push([c,t]);}));
  return out.sort((a,b)=>((b[1].log||[]).slice(-1)[0]||{at:0}).at-((a[1].log||[]).slice(-1)[0]||{at:0}).at);}
async function trUpload(fs){const up=[];if(!fs||!fs.length)return up;if(!A){toast('File upload needs Contributor access.');return null;}
  for(const file of [...fs]){const type=fileType(file.name)||file.type||'application/octet-stream';
    if(file.size>10*1048576){toast(`${file.name} is over 10 MB — nothing was sent. Zip it, or put it on Google Drive and paste the link in the note.`);return null;}
    toast(`Uploading ${file.name}…`);try{const r=await A.upload(file,{type});up.push({id:r.id,name:file.name,type});}catch(e){toast(`${file.name}: ${e.message||'upload failed'} — nothing was sent, try again`);return null;}}
  return up;}
const trCanWrite=(c,t)=>CANW0&&(canEditView(c)||(t&&(t.who===ME.id||t.by===ME.id)));
async function trPatch(c,id,patch,msg){NTF.mine[c+'|'+id]=Date.now();const ok=await write(()=>db.doc(c+'/'+id).update(patch),msg);
  if(ok){const r=trRec(c,id);if(r)Object.assign(r,patch);}   /* show the change at once, before the next sync */
  return ok;}

/* ---------- the task page (history + actions) ---------- */
const TRK={done:'finished it',back:'sent it back',ok:'approved it',note:'commented',reopen:'reopened it'};
function trOpen(c,id,mode){const t=trRec(c,id);if(!t){toast('This task is no longer there');return;}
  const st=t.status||'Not started',done=trIsDone(c,t),rv=trCanReview(t),wk=t.who===ME.id,L=[...(t.log||[]),...(t.comments||[]).map(x=>({k:'note',byName:x.by,at:x.at,t:x.t}))].sort((a,b)=>(a.at||0)-(b.at||0));
  const doc=trDoc(t),canW=trCanWrite(c,t),hideF=trRel()&&t.who!==ME.id&&t.by!==ME.id;
  const ent=x=>`<div class="ap-note ${x.k==='back'?'back':''}"><div><b>${esc(x.byName||pnm(x.by))}</b> <span class="code">${esc(x.ph?'added '+((x.files||[]).length>1?'photos':'a photo'):TRK[x.k]||'')} · ${esc(trWhen(x.at))}${x.k==='back'&&x.who?' → '+esc(pnm(x.who)):''}${x.due?' · due '+esc(fd(x.due)):''}</span>${x.t?`<div>${esc(x.t)}</div>`:''}${x.key?`<div class="code">${ico('file')} ${esc(x.key)}${x.rev?' '+esc(x.rev):''}</div>`:''}${hideF?'':x.ph?trThumbs(x.files):trFiles(x.files)}${x.loc?`<a class="code" href="https://maps.google.com/?q=${+x.loc.lat},${+x.loc.lng}" target="_blank" rel="noopener">${ico('map-pin')} on map</a>`:''}</div></div>`;
  const ppl=schPeople();
  const backF=`<form id="trBackForm" class="tr-f" data-c="${c}" data-id="${esc(id)}"><b>${done?'Reopen with corrections':'Send back with corrections'}</b>
    <label>What needs to change (required)<textarea name="t" rows="3" required maxlength="1500" placeholder="e.g. Staircase width 1.2 m, dimension the toilet, update the door schedule"></textarea></label>
    <label>Corrected / marked-up files (optional — DWG, PDF, photos…)<input type="file" name="files" multiple></label>
    <div class="e2form" style="padding:0"><label>Give it to<select name="who">${ppl.map(p=>`<option value="${esc(p.account)}" ${p.account===t.who?'selected':''}>${esc(p.name)}${p.account===t.who?' (did this)':''}</option>`).join('')}</select></label>
    <label>New due date<input type="date" name="due" value="${esc(t.due&&t.due>=today()?t.due:new Date(Date.now()+2*864e5).toISOString().slice(0,10))}"></label></div>
    ${doc&&CANW&&canEditView('documents')&&doc.status!=='Sent back'?`<label class="pl-chk"><input type="checkbox" name="doc" checked> Also mark the drawing <b>${esc(doc.dkey||doc.title)}${doc.rev?' '+esc(doc.rev):''}</b> as “Sent back” in the library</label>`:''}
    <div class="srow" style="padding:0;border:0"><button class="btn warn">${ico('corner-up-left')}<span>${done?'Reopen & send':'Send back'}</span></button><button type="button" class="btn ghost" data-tropen="${c}|${esc(id)}">Cancel</button></div></form>`;
  const noteF=`<form id="trNoteForm" class="tr-f" data-c="${c}" data-id="${esc(id)}"><label>Comment${wk?' / question':''}<textarea name="t" rows="2" maxlength="1500" placeholder="${wk?'e.g. Done the plan, need the door sizes':'e.g. Also check the lintel levels'}"></textarea></label>
    <label>Files (optional)<input type="file" name="files" multiple></label><div class="srow" style="padding:0;border:0"><button class="btn">${ico('message-square')}<span>Add comment</span></button></div></form>`;
  const acts=[];
  if(wk&&!done&&st!=='For review'){if(c!=='issues'&&t.project)acts.push(`<button type="button" class="btn pri" data-fin="${c}|${esc(id)}|">${ico('upload')}<span>${st==='Changes requested'?'Upload corrected file':'Upload & finish'}</span></button>`);
    acts.push(`<button type="button" class="btn" data-trdone="${c}|${esc(id)}">${ico('check')}<span>${c==='issues'?'Mark fixed':'Done (no file)'}</span></button>`);}
  if(rv&&st==='For review')acts.push(`<button type="button" class="btn pri" data-trok="${c}|${esc(id)}">${ico('check-check')}<span>Approve</span></button><button type="button" class="btn warn" data-trback="${c}|${esc(id)}">${ico('corner-up-left')}<span>Send back with corrections</span></button>${(doc||t.doneFile)&&t.project&&CANW&&canEditView('documents')?`<label class="btn" title="You fixed it yourself: your file becomes the next revision in the library and the task is approved">${ico('upload')}<span>Upload my corrected version & approve</span><input type="file" hidden multiple data-trfix="${c}|${esc(id)}"></label>`:''}`);
  else if(rv&&canW&&mode!=='back')acts.push(`<button type="button" class="btn ${done?'':'ghost'}" data-trback="${c}|${esc(id)}">${ico('corner-up-left')}<span>${done?'Reopen with corrections':'Send corrections'}</span></button>`);
  const lastBack=st==='Changes requested'?trLast(t,'back'):null;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${esc(t.title||'Task')}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b" style="display:grid;gap:12px">
    <div class="srow" style="padding:0;border:0;flex-wrap:wrap;gap:6px"><span class="pill ${trPill(st)}">${esc(st)}</span>${t.project?`<span class="code">${esc(pname(t.project))}</span>`:''}${c==='dtasks'&&t.disc?`<span class="code">· ${esc(secOf(t))}</span>`:''}
      <span class="code">· ${esc(c==='issues'?'Issue':c==='dtasks'?'Design task':'Site task')} · given to <b>${esc(pnm(t.who))}</b>${t.by?' by <b>'+esc(pnm(t.by))+'</b>':''}${t.due?' · due '+esc(fd(t.due)):''}</span></div>
    ${lastBack?`<div class="note warn">${ico('corner-up-left')}<span><b>Corrections from ${esc(pnm(lastBack.by))}:</b> ${esc(lastBack.t||'')}${trFiles(lastBack.files)}</span></div>`:''}
    ${t.notes||t.details?`<div>${esc(t.notes||t.details)}</div>`:''}${trFiles(t.files)}
    ${doc?`<div class="tr-doc">${ico('library')}<span style="flex:1"><b>${esc(doc.dkey||doc.title)}</b>${doc.rev?' '+esc(doc.rev):''} <span class="pill ${apPill(apStatus(doc))}">${esc(apStatus(doc))}</span>${trFiles(doc.files)}</span>${canView('drawlib')?`<button type="button" class="btn sm" data-trlib="${esc(doc.project)}|${esc(doc.disc||'')}">Library</button>`:''}</div>`:''}
    ${acts.length&&canW?`<div class="srow" style="padding:0;border:0;flex-wrap:wrap;gap:8px">${acts.join('')}</div>`:''}
    ${(()=>{const phs=(t.log||[]).filter(x=>x.ph&&(x.files||[]).length);const all=phs.flatMap(x=>x.files.map(f=>({...f,ph:x.ph})));
      return (canW||all.length)&&!hideF?`<div class="tr-phbox"><div class="md-g">Photos · ${all.length}</div>${all.length?`<div class="thumbs big tr-thumbs">${all.slice(-12).reverse().map(f=>`<a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener" title="${esc(f.ph)}"><img src="/_blob/${esc(f.id)}" alt="${esc(f.ph)} photo" loading="lazy"><i>${esc(f.ph)}</i></a>`).join('')}</div>`:''}
      ${canW?`<div class="srow" style="padding:6px 0 0;border:0;gap:8px;flex-wrap:wrap"><select id="trPhTag" aria-label="Photo type">${TR_PH.map(x=>`<option>${x}</option>`).join('')}</select><label class="btn pri">${ico('camera')}<span>Take photo</span><input type="file" accept="image/*" capture="environment" multiple hidden data-trphoto="${c}|${esc(id)}"></label><label class="btn">${ico('image')}<span>From gallery</span><input type="file" accept="image/*" multiple hidden data-trphoto="${c}|${esc(id)}"></label></div><div class="code">Date, time, project, your name and GPS (if allowed) are stamped on each photo.</div>`:''}</div>`:'';})()}
    ${mode==='back'&&rv&&canW?backF:''}
    <div><div class="md-g">History · ${L.length}</div>${L.length?L.map(ent).join(''):`<div class="code">Nothing yet. Finishing, comments and corrections are kept here.</div>`}</div>
    ${(rv||wk)&&canW?noteF:''}
   </div></div></div>`;
  if(mode==='back')setTimeout(()=>{const a=document.querySelector('#trBackForm textarea');if(a)a.focus();},50);}

async function trApprove(c,id,fs){const t=trRec(c,id);if(!t)return;if(t.status!=='For review'){toast(`This is now “${t.status||'Not started'}” — nothing to approve`);render();return;}
  let doc=trDoc(t),fixed=null;
  if(fs&&fs.length){const pid=t.project||(doc&&doc.project),key=(doc&&(doc.dkey||doc.title))||t.doneFile;if(!pid||!key){toast('No drawing to file this under');return;}
    fixed=await dlUploadTo(pid,(doc&&doc.disc)||t.doneDisc||'Architecture',key,fs,{task:t.id,taskCol:c});if(!fixed)return;
    doc=(D.documents||[]).find(x=>x.id===fixed.id)||{id:fixed.id,project:pid,dkey:key,title:key,rev:fixed.rev,files:fixed.files,status:'For checking',appr:{s1:{by:ME.id,at:Date.now()}},rv:[]};}
  const now=Date.now();
  if(!await trPatch(c,id,{status:TR_DONE(c),progress:100,log:[...(t.log||[]),{k:'ok',by:ME.id,at:now,...(fixed?{t:'Approved with my corrected file',key:doc&&(doc.dkey||doc.title),rev:fixed.rev,files:fixed.files}:{})}]},`Approved: ${t.title}`))return;
  if(doc&&apCan(3)&&(fixed||(doc.status!=='Superseded'&&apStage(doc)<3&&doc.status!=='Sent back'))){NTF.mine['documents|'+doc.id]=now;const a={...(doc.appr||{})};for(let i=1;i<=3;i++)if(!a['s'+i])a['s'+i]={by:ME.id,at:now};
    if(await write(()=>db.doc('documents/'+doc.id).update({appr:a,status:'Approved',rv:[...(doc.rv||[]),{k:'go',by:ME.id,at:now,st:3,t:'Approved with the task'}]})))toast(`Approved: ${t.title} — and ${doc.dkey||doc.title}${doc.rev?' '+doc.rev:''} in the library`);}
  closeLayer();render();}
async function trBack(c,id,f){const t=trRec(c,id);if(!t)return false;const txt=f.elements.t.value.trim();if(!txt){toast('Write what needs to change');return false;}
  const btn=f.querySelector('.btn.warn');if(btn)btn.disabled=true;
  const up=await trUpload(f.elements.files.files);if(up===null){if(btn)btn.disabled=false;return false;}
  const who=f.elements.who?f.elements.who.value||t.who:t.who,due=f.elements.due?f.elements.due.value:'';const now=Date.now();
  const ok=await trPatch(c,id,{status:'Changes requested',progress:Math.min(+t.progress||0,90),who,...(due?{due}:{}),log:[...(t.log||[]),{k:'back',by:ME.id,at:now,t:txt,files:up,who,...(due?{due}:{})}]},`Sent back to ${pnm(who)}`);
  if(!ok){if(btn)btn.disabled=false;return false;}
  const doc=trDoc(t);
  if(doc&&f.elements.doc&&f.elements.doc.checked&&CANW&&canEditView('documents')){NTF.mine['documents|'+doc.id]=now;
    await write(()=>db.doc('documents/'+doc.id).update({appr:{},status:'Sent back',rel:null,rv:[...(doc.rv||[]),{k:'back',by:ME.id,at:now,t:txt,files:up,st:apStage(doc)}]}));}
  closeLayer();render();return true;}
async function trNote(c,id,f){const t=trRec(c,id);if(!t)return;const txt=f.elements.t.value.trim();const fs=f.elements.files.files;
  if(!txt&&!fs.length){toast('Write a comment or add a file');return;}const btn=f.querySelector('.btn');btn.disabled=true;
  const up=await trUpload(fs);if(up===null){btn.disabled=false;return;}
  if(await trPatch(c,id,{log:[...(t.log||[]),{k:'note',by:ME.id,at:Date.now(),t:txt,files:up}]},'Comment added'))trOpen(c,id);else btn.disabled=false;}
async function trDoneNoFile(c,id){const t=trRec(c,id);if(!t)return;const rv=trNeeds(t);
  const n=prompt(rv?`Note for ${pnm(t.by)} (optional)`:'Note (optional)','');if(n===null)return;
  if(await trPatch(c,id,{status:rv?'For review':TR_DONE(c),progress:100,doneAt:Date.now(),log:[...(t.log||[]),{k:'done',by:ME.id,at:Date.now(),t:n.trim()}]},rv?`Sent to ${pnm(t.by)} for review`:'Marked done ✓')){closeLayer();render();}}

/* ---------- "Waiting for your review" box (home screens) ---------- */
function trWaiting(){const out=[];if(!ME||!ME.id)return out;TR_COLS.forEach(c=>(D[c]||[]).forEach(t=>{if(t.status==='For review'&&trCanReview(t)&&t.who!==ME.id)out.push([c,t]);}));
  return out.sort((a,b)=>(b[1].doneAt||0)-(a[1].doneAt||0));}
function trReviewBox(){if(!S.ready||curRole()==='Client')return '';const xs=trWaiting();if(!xs.length)return '';
  return `<div class="box tr-box"><div class="box-h">${ico('check-check')}<h2>Waiting for your review</h2><span class="pill p-amber">${xs.length}</span></div>
  ${xs.slice(0,8).map(([c,t])=>{const d=trLast(t,'done')||{},doc=trDoc(t);return `<div class="md-task"><div style="flex:1;min-width:0"><b>${esc(t.title)}</b>
     <div class="code">${esc(pnm(t.who))} finished it${d.at?' · '+esc(trWhen(d.at)):''}${t.project?' · '+esc(pname(t.project)):''}</div>${d.t?`<div>${esc(d.t)}</div>`:''}${trFiles(d.files&&d.files.length?d.files:doc&&doc.files)}</div>
     <div class="srow" style="padding:0;border:0;gap:6px;flex-wrap:wrap">${trCanWrite(c,t)?`<button type="button" class="btn sm pri" data-trok="${c}|${esc(t.id)}">${ico('check')}<span>Approve</span></button><button type="button" class="btn sm warn" data-trback="${c}|${esc(t.id)}">${ico('corner-up-left')}<span>Send back</span></button>`:''}<button type="button" class="btn sm ghost" data-tropen="${c}|${esc(t.id)}">Details</button></div></div>`;}).join('')}
  ${xs.length>8?`<div class="code" style="padding:8px 16px">+${xs.length-8} more in Tasks</div>`:''}</div>`;}
/* a small status note for a task row */
function trBadge(t){if(!t)return '';if(t.status==='Changes requested'){const b=trLast(t,'back');return ` <span class="pill p-red">Corrections</span>${b&&b.t?`<div class="tr-back">↩ ${esc(pnm(b.by))}: ${esc(String(b.t).slice(0,140))}</div>`:''}`;}
  if(t.status==='For review')return ` <span class="pill p-amber">With ${esc(pnm(t.by))} for review</span>`;return '';}

/* ---------- Drawings library: send a drawing to someone (reopens its task, or makes one) ---------- */
function trSendForm(docId){const d=(D.documents||[]).find(x=>x.id===docId);if(!d)return;const key=d.dkey||d.title;
  const all=(D.documents||[]).filter(x=>x.project===d.project&&(x.dkey||x.title)===key);const linked=trTasksOf(d.project,key,all.map(x=>x.id));
  const last=linked[0],ppl=schPeople().filter(p=>p.account!==ME.id);
  const prevBy=(all.slice().sort((a,b)=>(b.at||0)-(a.at||0)).find(x=>x.by&&x.by!==ME.id)||{}).by;const def=(last&&last[1].who!==ME.id&&last[1].who)||prevBy||'';
  document.getElementById('layer').innerHTML=`<div class="drawer qa-drawer"><div class="pane" style="height:auto;max-height:100%"><div class="pane-h"><h2>Send ${esc(key)} to…</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <form id="trSendForm" class="pane-b" data-doc="${esc(docId)}" style="display:grid;gap:10px"><div class="code">${esc(pname(d.project))}${d.rev?' · current '+esc(d.rev):''}</div>
    <label>Person<select name="who" required><option value="">Choose…</option>${ppl.map(p=>`<option value="${esc(p.account)}" ${p.account===def?'selected':''}>${esc(p.name)} — ${esc(p.role||'')}</option>`).join('')}</select></label>
    <label>What to do (required)<textarea name="t" rows="3" required maxlength="1500">${esc(`Please update ${key} as per the attached corrections and upload the new revision.`)}</textarea></label>
    <label>Corrected / marked-up files (optional — DWG, PDF, photos…)<input type="file" name="files" multiple></label>
    <label>Due date<input type="date" name="due" value="${new Date(Date.now()+2*864e5).toISOString().slice(0,10)}"></label>
    <div class="code" id="trSendHow">${last?`Reopens the task “${esc(last[1].title)}” (${esc(last[1].status||'')}, with ${esc(pnm(last[1].who))})${trIsDone(last[0],last[1])?` if you pick ${esc(pnm(last[1].who))}; anyone else gets a new task`:' — for whoever you pick'}.`:'A new task is made for this drawing.'} They see it in My day, the bell and as a notification, and finish it with <b>Upload corrected file</b> — it becomes the next revision.</div>
    <div class="srow" style="padding:0;border:0"><button class="btn pri">${ico('send')}<span>Send</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div></div>`;}
async function trSend(f){const d=(D.documents||[]).find(x=>x.id===f.dataset.doc);if(!d)return;const key=d.dkey||d.title,who=f.elements.who.value,txt=f.elements.t.value.trim(),due=f.elements.due.value;
  if(!who){toast('Choose the person');return;}if(!txt){toast('Write what to do');return;}const btn=f.querySelector('.btn.pri');btn.disabled=true;
  const up=await trUpload(f.elements.files.files);if(up===null){btn.disabled=false;return;}const now=Date.now();
  const all=(D.documents||[]).filter(x=>x.project===d.project&&(x.dkey||x.title)===key);const lk=trTasksOf(d.project,key,all.map(x=>x.id)).filter(([c,t])=>trCanWrite(c,t));
  const ex=lk.find(([c,t])=>t.who===who)||lk.find(([c,t])=>!trIsDone(c,t));   // the same person's task, or the open one (moved to the new person)
  const ent={k:'back',by:ME.id,at:now,t:txt,files:up,who,...(due?{due}:{}),key,rev:d.rev||''};let ok;
  if(ex){const [c,t]=ex;ok=await trPatch(c,t.id,{status:'Changes requested',progress:Math.min(+t.progress||0,90),who,...(due?{due}:{}),log:[...(t.log||[]),ent]},`Sent back to ${pnm(who)} — task reopened`);}
  else{const c=['dtasks','tasks'].find(k=>CANW0&&canEditView(k));if(!c){toast('You cannot give tasks. Ask the admin.');btn.disabled=false;return;}
    const id=(crypto.randomUUID?crypto.randomUUID():now.toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,20);
    const disc=c==='dtasks'&&MOD.dtasks.fields.find(x=>x.k==='disc').o.includes(d.disc)?d.disc:'';NTF.mine[c+'|'+id]=now;
    ok=await write(()=>db.doc(c+'/'+id).set({project:d.project,title:`Update ${key}`,...(disc?{disc}:{}),who,by:ME.id,start:today(),...(due?{due}:{}),status:'Changes requested',progress:0,dkey:key,doneDisc:d.disc||'',files:up,notes:txt,log:[ent]}),`Sent to ${pnm(who)} — new task`);}
  if(ok){closeLayer();render();}else btn.disabled=false;}
/* a line on a library row: who has this drawing now */
function trLibLine(pid,x){const t=trTasksOf(pid,x.k,x.all.map(d=>d.id)).find(([c,t])=>!trIsDone(c,t));if(!t)return '';
  return `<div class="code"><button type="button" class="btn sm ghost" data-tropen="${t[0]}|${esc(t[1].id)}">${ico('list-checks')}<span>Task: ${esc(pnm(t[1].who))} · ${esc(t[1].status||'Not started')}</span></button></div>`;}

/* ---------- Settings switch ---------- */
function trSetBox(){const on=trOn();return `<div class="box"><div class="box-h">${ico('check-check')}<h2>Review finished work</h2></div>
  <div class="srow" style="flex-wrap:wrap;gap:8px"><span style="flex:1;min-width:220px">When someone finishes work another person gave them, it goes to that person “For review” to approve or send back with corrections. Turn off to mark such work Completed straight away.</span>
  <span class="pill ${on?'p-green':'p-grey'}">${on?'On':'Off'}</span><button type="button" class="btn sm" id="trToggle">${on?'Turn off':'Turn on'}</button></div></div>`;}

/* ---------- events ---------- */
document.addEventListener('click',async e=>{if(!e.target.closest)return;let b;
  if((b=e.target.closest('[data-tropen]'))){const [c,id]=b.dataset.tropen.split('|');trOpen(c,id);return;}
  if((b=e.target.closest('[data-trback]'))){const [c,id]=b.dataset.trback.split('|');trOpen(c,id,'back');return;}
  if((b=e.target.closest('[data-trok]'))){const [c,id]=b.dataset.trok.split('|');b.disabled=true;await trApprove(c,id);return;}
  if((b=e.target.closest('[data-trdone]'))){const [c,id]=b.dataset.trdone.split('|');trDoneNoFile(c,id);return;}
  if((b=e.target.closest('[data-dlsend]'))){trSendForm(b.dataset.dlsend);return;}
  if((b=e.target.closest('[data-trlib]'))){const [p,d]=b.dataset.trlib.split('|');closeLayer();if(p&&projOK(p))S.proj=p;if(d)DL.disc=d;S.view='drawlib';render();return;}
  if((b=e.target.closest('#trToggle'))){const on=!trOn();if(await write(()=>db.doc('org/main').update({taskReview:on}),on?'Finished work now goes for review':'Finished work is marked Completed straight away'))render();return;}});
document.addEventListener('change',e=>{const i=e.target;if(i.dataset&&i.dataset.trphoto&&i.files&&i.files.length){const [c,id]=i.dataset.trphoto.split('|');const tg=document.getElementById('trPhTag');const fl=[...i.files];i.value='';trPhoto(c,id,fl,i.closest('.drawer')&&tg?tg.value:'Progress');return;}if(!i.dataset||!i.dataset.trfix||!i.files.length)return;const [c,id]=i.dataset.trfix.split('|');trApprove(c,id,i.files);});
document.addEventListener('submit',e=>{const f=e.target;
  if(f.id==='trBackForm'){e.preventDefault();trBack(f.dataset.c,f.dataset.id,f);}
  else if(f.id==='trNoteForm'){e.preventDefault();trNote(f.dataset.c,f.dataset.id,f);}
  else if(f.id==='trSendForm'){e.preventDefault();trSend(f);}});
document.head.insertAdjacentHTML('beforeend',`<style>
.tr-f{display:grid;gap:10px;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--panel,#fff)}
.tr-f textarea,.tr-f input[type=file]{width:100%}
.tr-f .pl-chk{display:flex;gap:8px;align-items:flex-start;text-align:left}.tr-f .pl-chk input{margin-top:3px}
.tr-doc{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid var(--line);border-radius:12px}
.tr-back{font-size:12.5px;color:var(--red-ink,#b42318);margin-top:2px}
.note.warn{border-color:#f3c0b9;background:#fff4f2}
.tr-box .md-task{align-items:flex-start;flex-wrap:wrap}
.sp-kinds{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sp-k{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 6px;border:1px solid var(--line);border-radius:12px;background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer;min-height:72px;text-align:center}
.sp-k.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent);font-weight:700}.sp-k .i{width:22px;height:22px}
.sp-modes{display:flex;flex-wrap:wrap;gap:8px}.sp-modes .chip{border:1px solid var(--line);border-radius:18px;padding:8px 14px;background:transparent;color:inherit;font:inherit;cursor:pointer;min-height:40px}.sp-modes .chip.on{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.sp-amt{font-size:24px!important;font-weight:700}.sp-ph{justify-content:center}
@media (max-width:420px){.sp-kinds{grid-template-columns:repeat(2,1fr)}}
.m-only{display:none!important}
.tile[data-go]{cursor:pointer;text-align:left;font:inherit;color:inherit;background:transparent;border-top:0;border-left:0}
.m-link{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;background:transparent;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer}.m-link>span{flex:1;display:flex;flex-direction:column}.m-link small{color:var(--muted);font-size:13px}
@media (max-width:700px){
 .m-hide{display:none!important}.m-only{display:block!important}.m-link.m-only{display:flex!important}
 .dash-tiles .tile.z{display:none}.dash-tiles{grid-template-columns:1fr 1fr!important}.dash-tiles .tile{padding:12px 14px}.dash-tiles .tile b{font-size:22px}
 .box.qt:not(.open) #qtForm{display:none}.box.qt{padding:0}.box.qt.open .qt-open .i:last-child{transform:rotate(180deg)}.box.qt.open #qtForm{padding:0 12px 12px}
 [data-mopen]{display:none!important}.md-task [data-tropen] span{display:none}
 .wf-t thead{display:none}.wf-t,.wf-t tbody{display:block;width:100%}.wf-t tr{display:grid;grid-template-columns:30px 1fr auto;gap:2px 8px;padding:10px 12px;border-bottom:1px solid var(--line)}
 .wf-t td{display:block;padding:0!important;border:0!important;min-width:0}.wf-t td:nth-child(1){grid-row:1/span 3}.wf-t td:nth-child(2){grid-column:2}.wf-t td:nth-child(3){display:none}
 .wf-t td:nth-child(4){grid-column:2;font-size:13px;color:var(--muted)}.wf-t td:nth-child(5){grid-column:2;font-size:13px}.wf-t td:nth-child(6){grid-column:3;grid-row:1;text-align:right;font-size:13px;white-space:nowrap}.wf-t td:nth-child(7){grid-column:3;grid-row:2;text-align:right}
 .wf-t td:nth-child(5) select{min-height:36px;padding:4px 8px}
 .box-h{flex-wrap:wrap;row-gap:6px}.bar h1{font-size:22px}
 .own-t td:nth-child(3),.own-t td:nth-child(4),.own-t td:nth-child(5){display:none!important}.own-t td:first-child{display:flex;justify-content:space-between;align-items:center}.own-t td:first-child::before{content:none!important}
 .box-h [data-viewas]{display:none!important}.box-h:has([data-viewas]) .code{display:none}
}
.mr-box{display:flex;flex-wrap:wrap;gap:8px;align-items:center;border:1px dashed var(--accent);border-radius:10px;padding:10px 12px;background:color-mix(in srgb,var(--accent) 5%,transparent)}
.mr-box.rec{border-style:solid;border-color:var(--red-ink);background:var(--red)}.mr-dot{width:12px;height:12px;border-radius:6px;background:var(--red-ink);display:inline-block;animation:mrb 1s infinite}
@keyframes mrb{50%{opacity:.25}}@media (prefers-reduced-motion:reduce){.mr-dot{animation:none}}
#mrChip{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(86px + env(safe-area-inset-bottom));z-index:70;display:flex;gap:10px;align-items:center;background:var(--panel);border:2px solid var(--red-ink);border-radius:24px;padding:6px 8px 6px 14px;box-shadow:0 6px 20px rgba(0,0,0,.2)}
.mr-tr{white-space:pre-wrap;max-height:260px;overflow:auto;font-size:13px;border:1px solid var(--line);border-radius:8px;padding:8px;margin-top:6px}
.snap-big{display:grid;grid-template-columns:1fr 1fr;gap:10px}.snap-big .btn{justify-content:center;min-height:56px;font-size:16px}
@media (max-width:700px){body .btn.sm{min-height:40px;padding:7px 11px}body .btn{min-height:44px}:is(.pane-b,.tr-f,.filters,.al-bar) :is(select,input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden])){min-height:44px}}
.mom-act{display:grid;grid-template-columns:1fr 150px 140px;gap:6px;margin:4px 0}.mom-act input,.mom-act select{min-width:0}
.mom-att{border:1px solid var(--line);border-radius:10px;padding:8px 12px;display:flex;flex-wrap:wrap;gap:4px 14px}.mom-att legend{font-size:13px;color:var(--muted);padding:0 4px}
.mom-ol{margin:4px 0 0 18px;padding:0}.mom-ol li{margin:2px 0}
@media (max-width:600px){.mom-act{grid-template-columns:1fr 1fr;border-bottom:1px dashed var(--line);padding-bottom:6px}.mom-act input[name=at]{grid-column:1/-1}}
.tr-thumbs{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.tr-thumbs a{position:relative;display:block}.tr-thumbs img{width:88px;height:88px;object-fit:cover;border-radius:8px;border:1px solid var(--line);display:block}
.tr-thumbs a i{position:absolute;left:4px;bottom:4px;font-style:normal;font-size:11px;font-weight:700;background:rgba(0,0,0,.6);color:#fff;border-radius:4px;padding:1px 5px}
.tr-phbox{border:1px solid var(--line);border-radius:10px;padding:10px 12px}.tr-cam .i{width:16px;height:16px}
@media (max-width:600px){.tr-cam span{display:none}}
.lgrp td{background:var(--grey);font-weight:700;padding:8px 14px!important;border-top:1px solid var(--line)}.lgrp .lg-n{margin-left:12px;font-weight:500;font-size:13px;color:var(--muted)}.lgrp td{position:sticky;left:0}
.al-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:0 0 12px}
.al-t{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--panel);color:inherit;font:inherit;cursor:pointer}
.al-t.on{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-soft)}.al-t span{display:flex;flex-wrap:wrap;gap:6px}.al-t i.pill{font-style:normal}
.al-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px 16px;border-bottom:1px solid var(--line)}
.al-q{flex:1 1 220px;display:flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:8px;padding:0 10px}.al-q input{border:0;outline:0;flex:1;min-width:0;padding:8px 0;background:transparent;color:inherit;font:inherit}
.al-s,.al-u{display:flex;align-items:center;gap:6px;font-size:14px;white-space:nowrap}
.al-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px;border-bottom:1px solid var(--line)}
.al-chips .chip{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:16px;padding:4px 10px;background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer}
.al-chips .chip.on{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}.al-chips .chip .i{width:14px;height:14px}
.al-g{display:flex;justify-content:space-between;padding:8px 16px;background:var(--grey);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--grey-ink)}
.al-row{display:flex;gap:10px;align-items:center;padding:10px 16px 10px 13px;border-bottom:1px solid var(--line);border-left:3px solid transparent}
.al-row.sev-high{border-left-color:var(--red-ink)}.al-row.sev-med{border-left-color:var(--amber-ink)}.al-row.new{background:color-mix(in srgb,var(--accent) 7%,transparent)}
.al-ic{flex:0 0 30px;height:30px;border-radius:8px;background:var(--grey);color:var(--grey-ink);display:grid;place-items:center}.al-ic .i{width:16px;height:16px}
.al-row.sev-high .al-ic{background:var(--red);color:var(--red-ink)}.al-row.sev-med .al-ic{background:var(--amber);color:var(--amber-ink)}
.al-tx{flex:1;min-width:0;overflow-wrap:anywhere}
.al-share{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:4px 0 16px}
@media (max-width:600px){.al-row{flex-wrap:wrap}.al-tx{flex-basis:calc(100% - 44px)}.al-row .btn{margin-left:40px}}
.md-task{flex-wrap:wrap}.md-task>div[style*="flex:1"]{flex:1 1 220px!important}
@media (max-width:700px){.md-task{flex-wrap:wrap}.md-task>div[style*="flex:1"]{flex-basis:calc(100% - 52px)!important}}
</style>`);

/* ================= CSV export ================= */
async function exportCsv(k){
  let headers,rows;
  if(k==='inventory'){headers=['Project','Material','Unit','Received','Issued','Returned','Consumed','In store'];
    rows=stock().filter(inProj).map(s=>[pname(s.project),s.material,s.unit,s.received+s.tin,s.issued+s.tout,s.returned,s.consumed,s.store]);}
  else if(k==='wages'){headers=['Worker','Trade','Daily wage','Days','OT hours','Earned','Advances','To pay'];rows=wagesRows().map(r=>[r.name,r.trade,r.wage,r.days,r.ot,Math.round(r.gross),r.advance,Math.round(r.net)]);}
  else if(k==='balances'){const b=balanceRows();headers=['Type','Name','Billed','Paid / received','Balance'];rows=[...b.cli,...b.vend].map(r=>[r.kind,r.name,Math.round(r.billed),Math.round(r.paid),Math.round(r.bal)]);}
  else{const m=MOD[k];const fs=m.fields.filter(f=>f.t!=='photos');headers=[...fs.map(f=>f.l),'Added by'];
    rows=D[k].filter(r=>(m.noProject?true:inProj(r))&&(k!=='documents'||relOK(r))).map(r=>[...fs.map(f=>{const v=r[f.k];return f.t==='project'?pname(v):f.t==='member'?pnm(v):f.t==='vendor'?vname(v):f.t==='labour'?lname(v):f.t==='client'?cname(v):f.t==='equipment'?ename(v):f.t==='files'?(v||[]).map(x=>x.name).join('; '):f.t==='workrows'?(f.plan?dprPlan(r).map(x=>`${x.trade}: ${x.work.trim()}`).join(' | '):dprWork({...r,work:''}).replace(/\n/g,' | ')):f.t==='crew'?crewTxt(v):f.t==='matrows'?dprMats({mats:v}).map(x=>`${x.item} ${x.qty!==''&&x.qty!=null?x.qty:''} ${x.unit||''} (${x.kind||'Received'})`.replace(/\s+/g,' ')).join('; '):f.t==='projects'?((v||[]).includes('all')?'All projects':(v||[]).map(pname).join('; ')):v??'';}),nm(r.by)]);}
  const csv='﻿'+[headers,...rows].map(r=>r.map(v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}).join(',')).join('\r\n');
  const pn=S.proj==='all'?'all-projects':(proj(S.proj)?.prefix||proj(S.proj)?.name||'project').replace(/[^\w-]+/g,'-');
  await saveFile(`BuildMitr-${k}-${pn}-${today()}.csv`,new Blob([csv],{type:'text/csv'}));
}

/* ================= Render ================= */
/* ================= Meetings (MOM) & project notes =================
   meetings: date, type, title, place, attendees (team + others), points, decisions, action items → each becomes a task for that person.
   pnotes:   short notes on a project (pin the important ones), optional photos. Staff only; clients do not see either. */
COLS.push('meetings','pnotes');['meetings','pnotes'].forEach(c=>{if(!D[c])D[c]=[];});
{const g=NAV.find(x=>x.g==='Progress & quality');if(g&&!g.items.some(x=>x[0]==='meetings'))g.items.push(['meetings','message-square-text','Meetings & notes','సమావేశాలు & నోట్స్']);}
Object.keys(ROLE_VIEWS).forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&r!=='none'&&r!=='Client'&&!a.includes('meetings'))a.push('meetings');});
const MOM_KINDS=['Site meeting','Client meeting','Design review','Internal meeting','Vendor / contractor meeting'];
const MM={tab:'mom',q:''};
const momMine=x=>x.by===ME.id||isAdmin()||curRole()==='Project manager';
const momTaskCol=()=>{if(!CANW0)return '';const r=curRole();const c=['Admin','Project manager','Site engineer','Supervisor'].includes(r)?'tasks':['Architect','Structural engineer','Draftsman','Senior architect'].includes(r)?'dtasks':'';return c&&canEditView(c)?c:'';};
const momLines=t=>String(t||'').split('\n').map(x=>x.trim()).filter(Boolean);
const momTc=a=>['tasks','dtasks'].includes(a&&a.tc)?a.tc:'';
function momActState(a){const r=momTc(a)&&a.tid?trRec(momTc(a),a.tid):null;return r?(r.status||'Not started'):(a.done?'Done':'Open');}
/* → meetings: momText */
/* → meetings: vMeetings */
/* → meetings: momOpen */
const momPeople=(pid,keep)=>schPeople().filter(t=>!pid||t.role==='Admin'||t.role==='Project manager'||(t.projects||[]).includes('all')||(t.projects||[]).includes(pid)||(keep||[]).includes(t.account));
const momKeep=m=>m?[...(m.att||[]),...(m.acts||[]).map(a=>a.who)].filter(Boolean):[];
const momWhoOpts=(ppl,sel)=>`<option value="">Who…</option>${ppl.map(p=>`<option value="${esc(p.account)}" ${p.account===sel?'selected':''}>${esc(p.name)}</option>`).join('')}`;
const momAttHtml=(ppl,chk)=>`<legend>Present from our team</legend>${ppl.map(p=>`<label class="pl-chk"><input type="checkbox" name="att" value="${esc(p.account)}" ${chk(p.account)?'checked':''}> ${esc(p.name)}</label>`).join('')}`;
function momForm(id,pid0){const m=id?D.meetings.find(x=>x.id===id):null;if(id&&!m)return;if(!MR.rec&&!MR.busy&&!MR.starting){if(MR.formId&&MR.formId!==(id||'new'))mrReset();MR.formId=id||'new';}const pid=m?m.project:(pid0||(S.proj!=='all'?S.proj:''));const ppl=momPeople(pid,momKeep(m));
  const act=(a,i)=>a.tid&&momTc(a)?`<div class="mom-act mom-done" data-i="${i}"><input type="hidden" name="at" value="${esc(a.t||'')}"><input type="hidden" name="aw" value="${esc(a.who||'')}"><input type="hidden" name="ad" value="${esc(a.due||'')}"><input type="hidden" name="atid" value="${esc(a.tid)}"><input type="hidden" name="atc" value="${esc(momTc(a))}"><span style="grid-column:1/-1"><b>${esc(a.t)}</b> <span class="code">· ${esc(a.who?pnm(a.who):'—')}${a.due?' · by '+esc(fd(a.due)):''} · task ${esc(momActState(a))} — change it on the task</span></span></div>`
    :`<div class="mom-act" data-i="${i}"><input name="at" placeholder="What needs to be done" value="${esc(a.t||'')}" maxlength="300"><select name="aw" aria-label="Who">${momWhoOpts(ppl,a.who)}</select><input type="date" name="ad" value="${esc(a.due||'')}" aria-label="Due date"><input type="hidden" name="atid" value=""><input type="hidden" name="atc" value=""></div>`;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${m?'Edit minutes':'New minutes of meeting'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <form id="momForm" class="pane-b tr-f" data-id="${esc(id||'')}" style="display:grid;gap:10px"><div id="mrPanel">${mrPanel()}</div>
    <div class="e2form" style="padding:0"><label>Project<select name="project" required><option value="">Choose…</option>${D.projects.filter(p=>projOK(p.id)).map(p=>`<option value="${esc(p.id)}" ${p.id===pid?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
     <label>Type<select name="kind">${MOM_KINDS.map(k=>`<option ${m&&m.kind===k?'selected':''}>${k}</option>`).join('')}</select></label>
     <label>Date<input type="date" name="date" required value="${esc(m?m.date:today())}"></label><label>Time<input type="time" name="time" value="${esc(m&&m.time||'')}"></label></div>
    <label>Title<input name="title" maxlength="140" placeholder="e.g. Slab casting plan / Kitchen layout review" value="${esc(m&&m.title||'')}"></label>
    <label>Place<input name="place" maxlength="120" placeholder="Site / office / video call" value="${esc(m&&m.place||'')}"></label>
    <fieldset class="mom-att">${momAttHtml(ppl,u=>m?(m.att||[]).includes(u):u===ME.id)}</fieldset>
    <label>Others present (one per line — client, vendor, consultant)<textarea name="others" rows="2" maxlength="600">${esc(m&&m.others||'')}</textarea></label>
    <label>Points discussed (one per line)<textarea name="points" rows="4" maxlength="4000">${esc(m&&m.points||'')}</textarea></label>
    <label>Decisions (one per line)<textarea name="decisions" rows="3" maxlength="3000">${esc(m&&m.decisions||'')}</textarea></label>
    <div><div class="md-g">Action items — each one becomes a task for that person</div><div id="momActs">${[...((m&&m.acts)||[]),{},{}].map(act).join('')}</div><button type="button" class="btn sm ghost" data-momaddact>${ico('plus')}<span>Add row</span></button></div>
    <label>Next meeting (optional)<input type="date" name="next" value="${esc(m&&m.next||'')}"></label>
    ${A?`<label>Photos (optional — whiteboard, site, signed sheet)<input type="file" name="files" accept="image/*" capture="environment" multiple></label>`:''}
    <div class="srow" style="padding:0;border:0"><button class="btn pri" id="momSaveBtn">${ico('check')}<span>Save minutes</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div></form></div></div>`;}
/* → meetings: momSave */
/* → meetings: pnAdd */
/* → meetings: pnPatch */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-mmtab],[data-momnew],[data-momopen],[data-momedit],[data-momaddact],[data-pnpin],[data-pnarch]');if(!b)return;const d=b.dataset;
  if(d.mmtab){MM.tab=d.mmtab;MM.q='';render();return;}
  if(b.hasAttribute('data-momnew')){if(!D.projects.some(p=>projOK(p.id))){toast('Add a project first');return;}momForm('');return;}
  if(d.momopen){momOpen(d.momopen);return;}if(d.momedit){momForm(d.momedit);return;}
  if(b.hasAttribute('data-momaddact')){const box=document.getElementById('momActs');if(box){const r=box.querySelector('.mom-act:not(.mom-done)');if(!r)return;const c=r.cloneNode(true);c.querySelectorAll('input').forEach(i=>i.value='');c.querySelectorAll('select').forEach(s=>s.selectedIndex=0);box.appendChild(c);}return;}
  if(d.pnpin){const n=D.pnotes.find(x=>x.id===d.pnpin);if(n)pnPatch(n.id,{pin:!n.pin},n.pin?'Unpinned':'Pinned to top');return;}
  if(d.pnarch){pnPatch(d.pnarch,{hidden:true},'Note hidden');return;}});
document.addEventListener('change',e=>{const i=e.target;if(!(i&&i.name==='project'&&i.form&&i.form.id==='momForm'))return;const f=i.form;const m0=f.dataset.id?D.meetings.find(x=>x.id===f.dataset.id):null;const ppl=momPeople(i.value,[ME.id,...momKeep(m0)]);
  const had=new Set([...f.querySelectorAll('[name=att]:checked')].map(x=>x.value));const fs=f.querySelector('.mom-att');if(fs)fs.innerHTML=momAttHtml(ppl,u=>had.has(u));
  f.querySelectorAll('.mom-act:not(.mom-done) select[name=aw]').forEach(sl=>{const v=sl.value;sl.innerHTML=momWhoOpts(ppl,ppl.some(p=>p.account===v)?v:'');});});
document.addEventListener('submit',e=>{const f=e.target;if(f.id==='momForm'){e.preventDefault();momSave(f);}else if(f.id==='pnForm'){e.preventDefault();pnAdd(f);}});
let mmQT=0;document.addEventListener('input',e=>{if(S.view!=='meetings'||!e.target||e.target.id!=='mmQ')return;MM.q=e.target.value;if(e.isComposing)return;clearTimeout(mmQT);mmQT=setTimeout(()=>{if(S.view!=='meetings')return;const i0=document.getElementById('mmQ'),pos=i0?i0.selectionStart:null;render();const i=document.getElementById('mmQ');if(i){i.focus();try{i.setSelectionRange(pos,pos);}catch(_){}}},250);});
/* project page: pinned notes + latest meeting */
function projMeetBox(p){if(!canView('meetings'))return '';const ns=D.pnotes.filter(n=>n.project===p.id&&!n.hidden).sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||(b.at||0)-(a.at||0)).slice(0,3);
  const ms=D.meetings.filter(m=>m.project===p.id).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))).slice(0,2);
  return `<div class="box"><div class="box-h">${ico('message-square-text')}<h2>Meetings & notes</h2><button type="button" class="btn sm" data-go="meetings">See all</button></div>
    ${ns.map(n=>`<div class="al-row ${n.pin?'sev-med':''}"><span class="al-ic">${ico(n.pin?'pin':'notebook-pen')}</span><div class="al-tx"><div style="white-space:pre-wrap">${esc(n.t)}</div><div class="code">${esc(pnm(n.by))} · ${esc(trWhen(n.at))}</div></div></div>`).join('')}
    ${ms.map(m=>`<div class="al-row"><span class="al-ic">${ico('message-square-text')}</span><div class="al-tx"><b>${esc(m.title||m.kind)}</b><div class="code">${esc(fd(m.date))} · ${esc(m.kind||'')}</div></div><button type="button" class="btn sm" data-momopen="${esc(m.id)}">Open</button></div>`).join('')}
    ${!ns.length&&!ms.length?`<div class="code" style="padding:12px 16px">No meetings or notes for this project yet.</div>`:''}</div>`;}

/* ================= Site photo (quick capture): photo → project → task or project note ================= */
const SNAP={pid:'',to:''};
const snapTasks=pid=>[...(D.tasks||[]).map(t=>['tasks',t]),...(D.dtasks||[]).map(t=>['dtasks',t])].filter(([c,t])=>t.project===pid&&!trIsDone(c,t)&&trCanWrite(c,t)&&(isAdmin()||curRole()==='Project manager'||t.who===ME.id||t.by===ME.id))
  .sort((a,b)=>(b[1].who===ME.id?1:0)-(a[1].who===ME.id?1:0)||String(a[1].due||'9999').localeCompare(String(b[1].due||'9999')));
function snapOpen(pid){const ps=D.projects.filter(p=>projOK(p.id)&&!p.archived);if(!ps.length){toast('Add a project first');return;}
  const inL=x=>x&&ps.some(p=>p.id===x);SNAP.pid=inL(pid)?pid:inL(S.proj)?S.proj:inL(SNAP.pid)?SNAP.pid:(ps.length===1?ps[0].id:'');const ts=SNAP.pid?snapTasks(SNAP.pid):[];SNAP.to='';
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${ico('camera')} Site photo</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <div class="pane-b" style="display:grid;gap:10px">
    <label>Project<select id="snapP">${SNAP.pid?'':'<option value="">Choose…</option>'}${ps.map(p=>`<option value="${esc(p.id)}" ${p.id===SNAP.pid?'selected':''}>${esc(pname(p.id))}</option>`).join('')}</select></label>
    <label>Add it to<select id="snapTo"><option value="">Project notes (no task)</option>${ts.map(([c,t])=>`<option value="${c}|${esc(t.id)}" ${SNAP.to===c+'|'+t.id?'selected':''}>${esc(t.title)}${t.who&&t.who!==ME.id?' — '+esc(pnm(t.who)):''}${t.due?' · due '+esc(fd(t.due)):''}</option>`).join('')}</select></label>
    <label>Photo type<select id="trPhTag">${TR_PH.map(x=>`<option>${x}</option>`).join('')}</select></label>
    <label>Note (optional)<input id="snapNote" maxlength="300" placeholder="e.g. Column C4 shuttering done"></label>
    <div class="snap-big">${SNAP.pid?`<label class="btn pri">${ico('camera')}<span>Take photo</span><input type="file" accept="image/*" capture="environment" multiple hidden data-snap></label><label class="btn">${ico('image')}<span>From gallery</span><input type="file" accept="image/*" multiple hidden data-snap></label>`:'<div class="code">Choose the project first.</div>'}</div>
    <div class="code">Date, time, project, your name and GPS (if allowed) are stamped on each photo.</div></div></div></div>`;}
/* → meetings: snapSave */
document.addEventListener('change',e=>{const i=e.target;if(!i)return;
  if(i.id==='snapP'){SNAP.pid=i.value;SNAP.to='';snapOpen(i.value);return;}if(i.id==='snapTo'){SNAP.to=i.value;return;}
  if(i.dataset&&i.dataset.snap!==undefined&&i.files&&i.files.length){const fl=[...i.files];i.value='';snapSave(fl);}});

/* ================= Meeting recording → transcript → draft MOM =================
   Record in the app (5-minute parts, so long meetings never hit the size or time limits) or upload a recording.
   Each part becomes a 16 kHz mono WAV (≤ 4.5 min, < 9 MB), is uploaded, and the server asks Gemini for an English transcript.
   Then the server writes a draft MOM that fills this form for the person to check. */
const MR={rec:null,stream:null,parts:[],t0:0,segT0:0,timer:0,seg:0,lock:null,files:[],tparts:[],transcript:'',busy:false,msg:'',draft:null,consent:false,starting:false,formId:''};
const mrReset=()=>{MR.parts=[];MR.files=[];MR.tparts=[];MR.transcript='';MR.msg='';MR.draft=null;MR.tfile=null;};
const mrFmt=s=>{s=Math.max(0,Math.round(s));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
const mrMime=()=>{try{for(const t of ['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'])if(window.MediaRecorder&&MediaRecorder.isTypeSupported(t))return t;}catch(_){}return '';};
/* → meetings: mrChip */
/* → meetings: mrSegStart */
/* → meetings: mrStart */
/* → meetings: mrStop */
/* any audio/video file → WAV parts, 16 kHz mono, ≤ 270 s each */
async function mrToWavs(blob){const buf=await blob.arrayBuffer();let ab;
  try{const oc=new OfflineAudioContext(1,16000,16000);ab=await oc.decodeAudioData(buf);}catch(_){let ac=null;try{ac=new (window.AudioContext||window.webkitAudioContext)();ab=await ac.decodeAudioData(buf);}catch(e){throw new Error('This file could not be read as audio. Use MP3, M4A, WAV, OGG or a phone recording.');}finally{try{ac&&ac.close&&ac.close();}catch(_){}}}
  if(ab.duration>95*60)throw new Error('This recording is longer than 95 minutes — split it into shorter files and add them one by one.');
  const sr=ab.sampleRate,ch=ab.numberOfChannels,len=ab.length;let mono=ab.getChannelData(0);
  if(ch>1){const m=new Float32Array(len);for(let c=0;c<ch;c++){const d=ab.getChannelData(c);for(let i=0;i<len;i++)m[i]+=d[i]/ch;}mono=m;}
  let pcm=mono;if(sr!==16000){const n=Math.floor(len*16000/sr),o=new Float32Array(n),k=sr/16000;for(let i=0;i<n;i++){const x=i*k,j=Math.floor(x),f=x-j;o[i]=(mono[j]||0)*(1-f)+(mono[j+1]||0)*f;}pcm=o;}
  const out=[],step=16000*270;
  for(let s=0;s<pcm.length;s+=step){const seg=pcm.subarray(s,Math.min(pcm.length,s+step));const b=new ArrayBuffer(44+seg.length*2),v=new DataView(b);
    const w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i));};w(0,'RIFF');v.setUint32(4,36+seg.length*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,16000,true);v.setUint32(28,32000,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,seg.length*2,true);
    for(let i=0;i<seg.length;i++){const x=Math.max(-1,Math.min(1,seg[i]));v.setInt16(44+i*2,x<0?x*0x8000:x*0x7fff,true);}
    out.push({blob:new Blob([b],{type:'audio/wav'}),dur:seg.length/16000});}
  return out;}
function mrPanel(){const can=!!(S.cloud&&A);
  if(MR.rec)return `<div class="mr-box rec"><i class="mr-dot"></i><b>Recording</b> <span id="mrTime">${mrFmt((Date.now()-MR.t0)/1000)}</span><button type="button" class="btn warn" data-mrstop>Stop recording</button><div class="code" style="flex-basis:100%">Keep the phone near the people speaking. You can close this and use the app; tap Stop at the bottom when the meeting ends.</div></div>`;
  return `<div class="mr-box"><div style="flex-basis:100%"><b>${ico('mic')} Write this MOM from a recording</b> <span class="code">(physical meeting, phone on speaker, or a Meet / Zoom recording)</span></div>
    ${MR.busy?`<div class="code" style="flex-basis:100%">${esc(MR.msg)}</div>`:`${MR.msg?`<div class="code" style="flex-basis:100%">${esc(MR.msg)}</div>`:''}
    ${can?`<label class="pl-chk" style="flex-basis:100%"><input type="checkbox" id="mrConsent" ${MR.consent?'checked':''}> Everyone present knows this meeting is being recorded</label>
    <button type="button" class="btn pri" data-mrstart ${MR.consent?'':'disabled'}>${ico('mic')}<span>Record meeting</span></button>
    <label class="btn">${ico('upload')}<span>Upload recording</span><input type="file" accept="audio/*,video/*,.m4a,.mp3,.wav,.aac,.ogg,.amr,.3gp" hidden data-mrfile></label>
    ${MR.parts.length&&!MR.draft?`<button type="button" class="btn pri" data-mrgo>${ico('sparkles')}<span>${MR.tparts.length?'Continue writing MOM':'Write MOM from recording'}</span></button>`:''}`:'<div class="code">Recording needs the team version of BuildMitr (signed in).</div>'}`}
    ${MR.transcript?`<details style="flex-basis:100%"><summary>Transcript (${MR.transcript.length} characters)</summary><div class="mr-tr">${esc(MR.transcript)}</div></details>`:''}</div>`;}
/* → meetings: mrPanelRefresh */
/* → meetings: mrGo */
/* → meetings: mrFill */
/* → meetings: mrListen */
/* → meetings: mrText */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-mrtxt]');if(b)mrText(b.dataset.mrtxt,b);});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-mrstart],[data-mrstop],[data-mrgo],[data-mrlisten]');if(!b)return;
  if(b.hasAttribute('data-mrstart'))mrStart();else if(b.hasAttribute('data-mrstop'))mrStop();else if(b.hasAttribute('data-mrgo'))mrGo();else mrListen(b.dataset.mrlisten,b);});
document.addEventListener('change',e=>{const i=e.target;if(!i)return;if(i.id==='mrConsent'){MR.consent=i.checked;mrPanelRefresh();return;}
  if(i.dataset&&i.dataset.mrfile!==undefined&&i.files&&i.files.length){const fl=i.files[0];i.value='';if(fl.size>100*1048576){toast('This file is over 100 MB — export only the audio (M4A / MP3), or split it, and try again');return;}
    const fm=document.getElementById('momForm');MR.formId=fm?(fm.dataset.id||'new'):'new';mrReset();MR.parts=[fl];MR.msg=`“${fl.name}” added (${(fl.size/1048576).toFixed(1)} MB). Tap “Write MOM from recording”.`;mrPanelRefresh();}});
window.addEventListener('beforeunload',e=>{if(MR.rec){e.preventDefault();e.returnValue='';}});

/* ================= Site payments (site engineer / supervisor) =================
   Money paid out at site in one simple screen: what for → who → amount → cash/UPI → bill photo.
   It is saved straight into Payments (project costs); the site team sees only the entries they made. */
const SP_KINDS=[['Labour wages','hard-hat','Paid to labour','Labour'],['Labour contractor','users','Paid to vendor','Labour'],['Material','package','Paid to vendor','Material'],['Transport','truck','Site expense','Site expense'],['Machine hire','hammer','Paid to vendor','Equipment'],['Other expense','receipt','Site expense','Site expense']];
const SP_VT={'Labour contractor':['Labour contractor','Sub-contractor'],'Material':['Material supplier'],'Transport':['Other','Equipment hire'],'Machine hire':['Equipment hire'],'Other expense':[]};
const SP={kind:'',mode:'Cash'};
{const g=NAV.find(x=>x.g==='Manpower');if(g&&!g.items.some(x=>x[0]==='sitepay'))g.items.unshift(['sitepay','wallet','Site payments','సైట్ చెల్లింపులు']);}
['Site engineer','Supervisor'].forEach(r=>{const a=ROLE_VIEWS[r];if(Array.isArray(a)&&!a.includes('sitepay'))a.push('sitepay');});
const spCan=()=>CANW0&&!!A&&(['Site engineer','Supervisor','Admin','Project manager','Accountant'].includes(curRole()));
const spKindOf=p=>p.spk||(p.dir==='Paid to labour'?'Labour wages':p.cat==='Material'?'Material':p.cat==='Equipment'?'Machine hire':p.dir==='Paid to vendor'?'Labour contractor':'Other expense');
const spTo=p=>p.vendor?((D.vendors.find(v=>v.id===p.vendor)||{}).name||p.party||'—'):(p.party||'—');
function vSitePay(){const mine=D.payments.filter(p=>p.by===ME.id&&p.src==='site'&&p.dir!=='Received from client'&&(S.proj==='all'||p.project===S.proj)).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||(b.at||0)-(a.at||0));
  const t=today(),mo=t.slice(0,7),sum=a=>a.reduce((s,p)=>s+(+p.amount||0),0);const td=mine.filter(p=>p.date===t),mm=mine.filter(p=>String(p.date||'').slice(0,7)===mo);
  const byK={};mm.forEach(p=>{const k=spKindOf(p);byK[k]=(byK[k]||0)+(+p.amount||0);});
  const days={};mine.slice(0,150).forEach(p=>(days[p.date]=days[p.date]||[]).push(p));
  return header(label('sitepay'),spCan()?`<button type="button" class="btn pri" data-spnew>${ico('plus')}<span>Record payment</span></button>`:'')+
  `<div class="box tiles"><div class="tile"><b>${inr(sum(td))}</b><span>Paid today · ${td.length} entr${td.length===1?'y':'ies'}</span></div><div class="tile"><b>${inr(sum(mm))}</b><span>This month</span></div></div>
  ${Object.keys(byK).length?`<div class="box"><div class="box-h">${ico('bar-chart-3')}<h2>This month by type</h2></div>${Object.entries(byK).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="srow"><span style="flex:1">${esc(k)}</span><b>${inr(v)}</b></div>`).join('')}</div>`:''}
  <div class="box">${mine.length?Object.entries(days).map(([d,xs])=>`<div class="al-g">${esc(d===t?'Today':fd(d))}<span class="code">${inr(sum(xs))}</span></div>${xs.map(p=>`<div class="al-row"><span class="al-ic">${ico((SP_KINDS.find(k=>k[0]===spKindOf(p))||['','receipt'])[1])}</span><div class="al-tx"><div><b>${inr(+p.amount||0)}</b> · ${esc(spKindOf(p))} · ${esc(spTo(p))}</div><div class="code">${esc(pname(p.project))} · ${esc(p.mode||'')}${p.note?' · '+esc(p.note):''}</div>${(p.photos||[]).length?`<div class="thumbs tr-thumbs">${p.photos.slice(0,2).map(id=>`<a href="/_blob/${esc(id)}" target="_blank" rel="noopener"><img src="/_blob/${esc(id)}" alt="Bill" loading="lazy"></a>`).join('')}</div>`:''}</div>${spCan()?`<button type="button" class="btn sm ghost" data-spedit="${esc(p.id)}">Edit</button>`:''}</div>`).join('')}`).join('')
    :`<div class="hero-empty">${ico('wallet')}<h2>No payments entered yet</h2><p>Record every payment made at site — labour wages, contractors, material, transport, machine hire. Add a photo of the bill.</p>${spCan()?`<button type="button" class="btn pri" data-spnew>${ico('plus')}<span>Record payment</span></button>`:''}</div>`}</div>`;}
function spWhoField(kind,p){const pid=(document.getElementById('spP')||{}).value||(p&&p.project)||'';
  if(kind==='Labour wages'){const ls=D.labour.filter(l=>!pid||!l.project||l.project===pid).sort((a,b)=>String(a.name).localeCompare(String(b.name)));
    return `<label>Paid to (worker)<select name="who"><option value="">Choose worker…</option>${ls.map(l=>`<option value="L:${esc(l.id)}" ${p&&p.lab===l.id?'selected':''}>${esc(l.name)}${l.trade?' · '+esc(l.trade):''}</option>`).join('')}<option value="other" ${p&&!p.lab&&p.party?'selected':''}>Someone else (type name)</option></select></label>`;}
  if(kind==='Other expense'||kind==='Transport'&&!D.vendors.length)return '';
  const pref=SP_VT[kind]||[];const vs=[...D.vendors].sort((a,b)=>(pref.includes(b.type)?1:0)-(pref.includes(a.type)?1:0)||String(a.name).localeCompare(String(b.name)));
  return `<label>Paid to<select name="who"><option value="">Choose…</option>${vs.map(v=>`<option value="V:${esc(v.id)}" ${p&&p.vendor===v.id?'selected':''}>${esc(v.name)}${v.type?' · '+esc(v.type):''}</option>`).join('')}<option value="other" ${p&&!p.vendor&&p.party?'selected':''}>Someone else (type name)</option></select></label>`;}
function spForm(id){const p=id?D.payments.find(x=>x.id===id):null;if(id&&(!p||p.src!=='site'||p.by!==ME.id&&!['Admin','Project manager','Accountant'].includes(curRole())))return;
  const ps=D.projects.filter(x=>projOK(x.id)&&!x.archived);if(!ps.length){toast('Add a project first');return;}
  SP.kind=p?spKindOf(p):(SP.kind||'');SP.mode=p?(p.mode||'Cash'):'Cash';const pid=p?p.project:(S.proj!=='all'?S.proj:(ps.length===1?ps[0].id:''));
  const showOther=p&&!p.vendor&&!p.lab&&p.party;
  document.getElementById('layer').innerHTML=`<div class="drawer"><div class="pane"><div class="pane-h"><h2>${ico('wallet')} ${p?'Edit payment':'Record payment'}</h2><button type="button" class="btn ghost" data-close aria-label="Close">${ico('x')}</button></div>
   <form id="spForm" class="pane-b tr-f" data-id="${esc(id||'')}" style="display:grid;gap:12px">
    <div class="e2form" style="padding:0"><label>Project<select name="project" id="spP" required>${pid?'':'<option value="">Choose…</option>'}${ps.map(x=>`<option value="${esc(x.id)}" ${x.id===pid?'selected':''}>${esc(pname(x.id))}</option>`).join('')}</select></label><label>Date<input type="date" name="date" required value="${esc(p?p.date:today())}" max="${today()}"></label></div>
    <div><div class="md-g">What was it for?</div><div class="sp-kinds">${SP_KINDS.map(([k,i])=>`<button type="button" class="sp-k ${SP.kind===k?'on':''}" data-spk="${k}" aria-pressed="${SP.kind===k}">${ico(i)}<span>${k}</span></button>`).join('')}</div></div>
    <div id="spWho">${SP.kind?spWhoField(SP.kind,p):''}</div>
    <label id="spOther" style="${showOther||SP.kind==='Other expense'||(SP.kind==='Transport'&&!D.vendors.length)?'':'display:none'}">${SP.kind==='Other expense'?'Paid to / for what':'Name'}<input name="party" maxlength="120" value="${esc(p&&!p.vendor&&!p.lab?p.party||'':'')}" placeholder="e.g. Tea & snacks, Auto charges, Ramesh (helper)"></label>
    <label>Amount (₹)<input name="amount" type="number" inputmode="decimal" min="1" step="any" required class="sp-amt" value="${esc(p?p.amount:'')}" placeholder="0"></label>
    <div><div class="md-g">Paid by</div><div class="sp-modes">${['Cash','UPI','Bank transfer','Cheque'].map(m=>`<button type="button" class="chip ${SP.mode===m?'on':''}" data-spm="${m}" aria-pressed="${SP.mode===m}">${m}</button>`).join('')}</div></div>
    <label>Note (optional)<input name="note" maxlength="200" value="${esc(p&&p.note||'')}" placeholder="e.g. 3 days wages, 50 bags cement, UPI ref"></label>
    ${(p&&(p.photos||[]).length)?`<div class="thumbs tr-thumbs">${p.photos.map(id=>`<img src="/_blob/${esc(id)}" alt="Bill" loading="lazy">`).join('')}</div>`:''}
    <label class="btn sp-ph">${ico('camera')}<span>Photo of bill / receipt (optional)</span><input type="file" name="files" accept="image/*" capture="environment" multiple hidden></label><div class="code" id="spPhN"></div>
    <div class="srow" style="padding:0;border:0"><button class="btn pri" id="spSave">${ico('check')}<span>Save payment</span></button><button type="button" class="btn ghost" data-close>Cancel</button></div>
    <div class="code">This goes straight into the project's payments and costs. You see only the payments you entered.</div></form></div></div>`;
  setTimeout(()=>{fixBlobs&&fixBlobs(document.getElementById('layer'));},50);}
function spRefreshWho(){const w=document.getElementById('spWho');const f=document.getElementById('spForm');if(!w||!f)return;const old=f.dataset.id?D.payments.find(x=>x.id===f.dataset.id):null;
  w.innerHTML=SP.kind?spWhoField(SP.kind,old&&spKindOf(old)===SP.kind?old:null):'';spOtherShow();}
function spOtherShow(){const o=document.getElementById('spOther');if(!o)return;const sel=document.querySelector('#spWho select');
  o.style.display=SP.kind==='Other expense'||(sel&&sel.value==='other')||(!sel&&SP.kind)?'':'none';const lb=o.firstChild;if(lb&&lb.nodeType===3)lb.textContent=SP.kind==='Other expense'?'Paid to / for what':'Name';}
async function spSave(f){const E_=f.elements,id=f.dataset.id,old=id?D.payments.find(x=>x.id===id):null;
  const project=E_.project.value,amount=+E_.amount.value;if(!project){toast('Choose the project');return;}if(!SP.kind){toast('Choose what it was for');return;}if(!(amount>0)){toast('Enter the amount');return;}
  const k=SP_KINDS.find(x=>x[0]===SP.kind);const sel=f.querySelector('#spWho select'),wv=sel?sel.value:'';const party=(E_.party.value||'').trim();
  let vendor='',lab='',pn='';if(wv.startsWith('V:')){vendor=wv.slice(2);pn=(D.vendors.find(v=>v.id===vendor)||{}).name||'';}else if(wv.startsWith('L:')){lab=wv.slice(2);pn=(D.labour.find(l=>l.id===lab)||{}).name||'';}
  if(!vendor&&!lab&&!party){toast(SP.kind==='Other expense'?'Write what it was for':'Choose who was paid, or type the name');return;}
  if(amount>500000&&!confirm(`₹${amount.toLocaleString('en-IN')} — is this amount correct?`))return;
  const btn=document.getElementById('spSave');btn.disabled=true;let up=[];
  if(E_.files&&E_.files.files.length){const pk=phPick(E_.files.files);if(pk.length){const now=new Date();const st=await phEach(pk,x=>bmStamp(x,[`Bill · ${pname(project)} · ₹${amount.toLocaleString('en-IN')}`,now.toLocaleString('en-IN'),pnm(ME.id)]));up=await trUpload(st);if(up===null){btn.disabled=false;return;}}}
  const dir=vendor?'Paid to vendor':k[2]==='Paid to vendor'&&!vendor?(SP.kind==='Labour contractor'?'Paid to labour':'Site expense'):k[2];
  const rec={project,date:E_.date.value||today(),dir,cat:k[3],spk:SP.kind,vendor,lab,party:vendor||lab?pn:party,amount,mode:SP.mode,note:(E_.note.value||'').trim(),photos:[...((old&&old.photos)||[]),...(up||[]).map(x=>x.id)],src:'site'};
  let ok,nid=id;if(old)ok=await write(()=>db.doc('payments/'+id).update(rec),'Payment saved');else ok=await write(async()=>{const r=await db.collection('payments').add({...rec,by:ME.id,at:Date.now()});nid=r.id;},'Payment saved');
  btn.disabled=false;if(!ok)return;if(old)Object.assign(old,rec);else if(!D.payments.some(x=>x.id===nid))D.payments.push({id:nid,...rec,by:ME.id,at:Date.now()});
  try{audit(old?'edited':'added','payments',nid,`₹${amount} ${SP.kind} — ${rec.party}`);}catch(_){}closeLayer();if(S.view!=='sitepay'&&canView('sitepay')){S.view='sitepay';}render();}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-spnew],[data-spedit],[data-spk],[data-spm]');if(!b)return;const d=b.dataset;
  if(b.hasAttribute('data-spnew')){SP.kind='';spForm('');return;}if(d.spedit){spForm(d.spedit);return;}
  if(d.spk){SP.kind=d.spk;document.querySelectorAll('[data-spk]').forEach(x=>{x.classList.toggle('on',x.dataset.spk===SP.kind);x.setAttribute('aria-pressed',x.dataset.spk===SP.kind);});spRefreshWho();return;}
  if(d.spm){SP.mode=d.spm;document.querySelectorAll('[data-spm]').forEach(x=>{x.classList.toggle('on',x.dataset.spm===SP.mode);x.setAttribute('aria-pressed',x.dataset.spm===SP.mode);});}});
document.addEventListener('change',e=>{const i=e.target;if(!i||!i.closest||!i.closest('#spForm'))return;if(i.id==='spP')spRefreshWho();else if(i.closest('#spWho'))spOtherShow();else if(i.name==='files'){const n=document.getElementById('spPhN');if(n)n.textContent=i.files.length?`${i.files.length} photo${i.files.length>1?'s':''} ready`:'';}});
document.addEventListener('submit',e=>{if(e.target.id==='spForm'){e.preventDefault();spSave(e.target);}});

function draw(){}
function toast(m){document.querySelectorAll('.toast').forEach(x=>x.remove());const d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2800);}
/* drag & drop: a file dropped on any upload button or box goes into that upload, exactly as if it had been chosen */
{let dzOn=null,dzInner=false;
  document.addEventListener('dragstart',()=>{dzInner=true;});document.addEventListener('dragend',()=>{dzInner=false;});   // pictures dragged inside the app are not uploads
  const dzFiles=e=>{if(dzInner)return false;try{return [...(e.dataTransfer&&e.dataTransfer.types||[])].includes('Files');}catch(_){return false;}};
  const dzSeen=i=>{const z=i.closest('label,button,.btn,.dm-drop,[data-drop]')||i.parentElement;return !!(z&&z.offsetParent!==null);};
  const dzPick=list=>{let c=[...list].filter(i=>!i.disabled&&!i.hasAttribute('data-nodrop')&&dzSeen(i));if(c.length>1){const nc=c.filter(i=>!i.hasAttribute('capture'));if(nc.length)c=nc;}return c.length===1?c[0]:null;};
  /* only the upload itself takes a drop: its button / label / drop box, or a small area right around it (3 steps up) */
  const dzInput=el=>{for(let n=el,k=0;n&&n.nodeType===1&&n!==document.body&&k<4;n=n.parentElement,k++){
      if(n.matches('input[type=file]'))return n.disabled||n.hasAttribute('data-nodrop')?null:n;
      const all=n.querySelectorAll('input[type=file]');if(all.length){const one=dzPick(all);return one;}
      if(n.matches('.box,form,.pane-f,#layer,dialog'))return null;}return null;};
  const dzBox=i=>i.closest('label,.dm-drop,.ph-add,.att,.srow,form,.box')||i.parentElement;
  const dzOk=(f,acc)=>{if(!acc.length)return true;const nm=(f.name||'').toLowerCase(),ty=(f.type||(typeof fileType==='function'?fileType(nm):'')||'').toLowerCase();
    return acc.some(a=>a.startsWith('.')?nm.endsWith(a):a.endsWith('/*')?ty.startsWith(a.slice(0,-1)):ty===a);};
  const dzOff=()=>{if(dzOn){dzOn.classList.remove('drop-on');dzOn=null;}};
  document.addEventListener('dragover',e=>{if(!dzFiles(e))return;e.preventDefault();const i=dzInput(e.target),z=i&&dzBox(i);
    if(z!==dzOn){dzOff();if(z){z.classList.add('drop-on');dzOn=z;}}try{e.dataTransfer.dropEffect=z?'copy':'none';}catch(_){}});
  document.addEventListener('dragleave',e=>{if(dzOn&&(!e.relatedTarget||!dzOn.contains(e.relatedTarget)))dzOff();});
  document.addEventListener('drop',e=>{if(!dzFiles(e))return;e.preventDefault();dzOff();const i=dzInput(e.target);
    if(!i){toast('Drop the file on an upload button or box.');return;}
    const acc=(i.accept||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);let fs=[...e.dataTransfer.files];const all=fs.length;fs=fs.filter(f=>dzOk(f,acc));
    if(!fs.length){toast('That kind of file can’t be added here.');return;}if(!i.multiple)fs=fs.slice(0,1);if(fs.length<all&&i.multiple)toast(`${all-fs.length} file(s) of a kind that can’t be added here were left out.`);
    try{const dt=new DataTransfer();fs.forEach(f=>dt.items.add(f));i.files=dt.files;}catch(_){toast('Drag and drop is not supported here — tap to choose the file.');return;}
    i.dispatchEvent(new Event('change',{bubbles:true}));});
  document.addEventListener('dragend',dzOff);document.addEventListener('drop',()=>{setTimeout(()=>{dzInner=false;},0);},true);}
/* the alerts list is worked out again only when the data, the day, the language or the person changes (or after 10 s) —
   the bell number is drawn on every page, so this used to be repeated on every redraw */
{const _ca=computeAlerts;const CAM={k:null,at:0,v:null,arr:null};
  computeAlerts=function(){let role='';try{role=curRole();}catch(_){}
    const k=[today(),LANG,ME&&ME.id,role,S.viewAsPerson||'',S.viewAs||'',S.cloud?1:0,typeof SHR!=='undefined'?SHR.data:null];const arr=COLS.map(c=>D[c]);const len=arr.map(x=>x?x.length:-1).join(',');
    const same=CAM.v&&Date.now()-CAM.at<10000&&CAM.k.length===k.length&&CAM.k.every((x,i)=>x===k[i])&&CAM.len===len&&CAM.arr.every((x,i)=>x===arr[i]);
    if(!same){CAM.v=_ca();CAM.k=k;CAM.arr=arr;CAM.len=len;CAM.at=Date.now();}
    return CAM.v.slice();};}
function render(){
  document.documentElement.lang=LANG;
  if(S.cloud&&S.authStep){if(!LG.warm&&CLOUD.url){LG.warm=1;try{fetch(CLOUD.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:'{"action":"ping"}'}).catch(()=>{});}catch(_){}}   // wakes the server while the person types
    try{document.body.setAttribute('data-view','login');}catch(_){}document.getElementById('side').innerHTML='';document.getElementById('view').innerHTML=vLogin();draw();return;}
  if(!db){document.getElementById('side').innerHTML=`<div class="brand">BuildMitr</div>`;
    document.getElementById('view').innerHTML=`<div class="box hero-empty">${ico('log-in')}<h2>Sign in to use BuildMitr</h2><p>Open this page signed in to claude.ai with the account it was shared with. All project data is saved there for the whole team.</p></div>`;draw();return;}
  if(S.proj!=='all'&&!proj(S.proj)&&S.ready)S.proj='all';
  if(S.view!==S._lmV||S.proj!==S._lmP){S.lmN={};S._lmV=S.view;S._lmP=S.proj;}
  if(S.ready&&S.view!==S._lastView){if(S.view==='alerts'){try{AL.snap=actSeen();AL.tab=bellActs().some(a=>a.at>AL.snap&&(S.proj==='all'||!a.project||a.project===S.proj))&&!computeAlerts().some(a=>a.sev==='high')?'upd':AL.tab||'act';}catch(_){}}S._lastView=S.view;}
  if(S.ready&&!['noaccess'].includes(S.view)&&!(UI_ONLY[S.view]?uiOf()===UI_ONLY[S.view]&&canView(S.view):canView(S.view))){S.view=homeView();}
  navTrack();
  if(S.ready&&curRole()==='none')S.view='noaccess';
  side();
  {const q=document.getElementById('qaFab');if(q)q.hidden=!(S.ready&&curRole()!=='none');}
  const v=S.view;
  CANW=CANW0&&(!S.ready||['sitehome','desk','client','dashboard','project','noaccess'].includes(v)||canEditView(v));   // decided for THIS page before it is drawn
  const html=!S.ready?`<div class="box hero-empty"><h2>${S.stale?"Can't reach the server yet. Check your connection.":'Loading…'}</h2></div>`:
    v==='agents'?(typeof vAgents==='function'?vAgents():`<div class="box hero-empty"><h2>Loading…</h2></div>`):v==='stdlib'?vStdLib():v==='calendar'?vCalendar():v==='myday'?vMyDay():v==='attend'?vAttend():v==='dashboard'?vDashboard():v==='orgs'?(header(label('orgs'))+(isSuperAdmin()?orgsBox():`<div class="box hero-empty">${ico('shield')}<h2>Only the BuildMitr admin can open this page</h2></div>`)):v==='projects'?vProjects():v==='inventory'?vInventory():v==='reports'?vReports():v==='settings'?vSettings():v==='wages'?vWages():v==='balances'?vBalances():v==='budgetva'?vBudgetVA():v==='schedule'||v==='designsched'?vSchedule():v==='planner'?vPlanner():v==='drawlib'?vDrawLib():v==='docmaker'?vDocMaker():v==='worktime'?vWorkTime():v==='notices'?vNotices():v==='install'?vInstall():v==='cctv'?vCctv():v==='project'?vProject():v==='alerts'?vAlerts():v==='meetings'?vMeetings():v==='sitepay'?vSitePay():v==='attbulk'?vAttBulk():v==='client'?vClient():v==='noaccess'?vNoAccess():v==='audit'?vAudit():v==='forms'?vForms():v==='form'?vForm():v==='messages'?vMessages():v==='roleaccess'?vRoleAccess():v==='adminpanel'?vAdminPanel():v==='sitehome'?vSiteHome():v==='desk'?vDesk():v==='cphotos'?vCPhotos():v==='cpay'?vCPay():v==='cdocs'?vCDocs():v==='pipeline'?vPipeline():v==='followups'?vFollowups():v==='estimator'?vEstimator():v==='content'?vContent():v==='mktdash'?vMktDash():v==='leadimp'?vLeadImp():MOD[v]?(v==='tasks'?calIntoTasks(vModule(v)):vModule(v)):vDashboard();
  try{document.body.setAttribute('data-ui',S.ready?uiOf():'owner');document.body.setAttribute('data-view',S.view);}catch(_){}
  document.getElementById('view').innerHTML=html+(S.ready&&HOME_VIEWS.includes(v)?signOutBar():'')+tabBar();draw();
  if(v==='adminpanel'&&S.cloud&&isAdmin())aiAdminLoad();
  if(v==='orgs'&&S.cloud&&isSuperAdmin()){if(ORGS.length)orgsDraw();if(Date.now()-ORGS_AT>60000)orgsLoad();}
  if(v==='messages'&&S.ready){const box=document.getElementById('chatMsgs');if(box&&box.scrollTo)box.scrollTop=box.scrollHeight;if(S.chatFocus){const ta=document.getElementById('chatText');if(ta&&ta.focus){ta.focus();try{ta.setSelectionRange(ta.value.length,ta.value.length);}catch(_){}}}chatMarkSeen();}
  const qi=document.getElementById('q');
  if(qi)qi.oninput=e=>{S.q=e.target.value;S.dprN=0;S.lmN={};const pos=e.target.selectionStart;render();const n=document.getElementById('q');if(n){n.focus();n.setSelectionRange(pos,pos);}};
}
let rT;
function refresh(){clearTimeout(rT);rT=setTimeout(async()=>{
  const ids=new Set(D.members.map(m=>m.id));
  Object.keys(MOD).forEach(k=>D[k].forEach(r=>{if(r.by)ids.add(r.by);if(r.who)ids.add(r.who);}));
  if(U&&ids.size){try{P=await U.profiles([...ids]);}catch(e){}}
  if(document.querySelector('.drawer')){S.dirtyL=true;return;}   // redrawn when the drawer closes
  const ae=document.activeElement;if(ae&&ae.closest&&ae.closest('#view')&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)){S.dirty=true;return;}   // don't redraw under someone typing
  if(S.view==='cctv'&&document.querySelector('.cam-view .cam-video')){S.dirty=true;return;}                                         // or over a playing camera
  render();
},60);}
document.addEventListener('focusout',()=>{if(S.dirty)setTimeout(()=>{const ae=document.activeElement;if(S.dirty&&!(ae&&ae.closest&&ae.closest('#view')&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName))&&!(S.view==='cctv'&&document.querySelector('.cam-view .cam-video'))){S.dirty=false;refresh();}},300);});

/* ================= Events ================= */
document.addEventListener('click',e=>{
  if(e.target.closest&&e.target.closest('#snackUndo')){const f=SNACK_FN;SNACK_FN=null;document.querySelectorAll('.snack').forEach(x=>x.remove());f&&f();return;}
  if(S._noClick&&Date.now()-S._noClick<450&&!e.target.closest('.mmenu')){e.preventDefault();e.stopPropagation();return;}
  if(e.target.id==='scrim'){setCollapsed(true);return;}
  if(e.target.closest('#aiFab')){aiOpen(true);return;}
  if(e.target.closest('#aiClose')){aiOpen(false);return;}
  if(e.target.id==='aiSend'&&AI.busy){e.preventDefault();AI.stop=true;AI.ctl&&AI.ctl.abort();return;}
  if(e.target.closest('#aiClear')){aiClear();return;}
  {const r=e.target.closest('[data-airetry]');if(r){const q=AI.lastQ;r.closest('.ai-m').remove();const box=document.getElementById('aiMsgs');const last=box.lastElementChild;if(last&&last.classList.contains('u'))last.remove();aiAsk(q);return;}}
  {const c=e.target.closest('[data-aicopy]');if(c){const t=c.closest('.ai-m').querySelector('.ai-body').textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Copied')).catch(()=>toast('Could not copy'));return;}}
  {const m=e.target.closest('[data-aimore]');if(m){const box=m.closest('.ai-m');box.classList.toggle('ai-open');m.textContent=box.classList.contains('ai-open')?'Show less':'Show full answer';return;}}
  {const f=e.target.closest('[data-aiform]');if(f){const x=(AI.forms||{})[f.dataset.aiform];if(x){aiOpen(false);openForm(x.c,null,x.pre);}return;}}
  {const q=e.target.closest('[data-aiq]');if(q){aiAsk(q.dataset.aiq);return;}}
  {const u=e.target.closest('[data-aiundo]');if(u){const[c,id]=u.dataset.aiundo.split(':');write(()=>db.doc(c+'/'+id).delete(),'Removed').then(ok=>{if(ok){u.closest('.ai-card').innerHTML='Undone — the entry was removed.';AI.turns.push({role:'user',content:`(I tapped Undo: the ${c} record ${id} was deleted.)`},{role:'assistant',content:'Noted, that entry was removed.'});}});return;}}
  {const x=e.target.closest('[data-aiexport]');if(x){const[w,pid]=x.dataset.aiexport.split('|');const keep=S.proj;S.proj=pid;exportCsv(w).finally(()=>{S.proj=keep;});return;}}
  const el=e.target.closest('button,.drawer');if(!el)return;
  if(el.id==='burger'){setCollapsed(!COLLAPSED);return;}
  if(el.dataset.grp){const g=el.dataset.grp;
    if(COLLAPSED){OPENG.add(g);setCollapsed(false);return;}
    OPENG.has(g)?OPENG.delete(g):OPENG.add(g);side();draw();return;}
  if(el.classList.contains('drawer')){if(e.target===el)closeLayer();return;}
  const d=el.dataset;
  if(!d.del&&!d.reset&&!d.fdel&&!d.tdelx&&S.confirm)S.confirm=null;
  if('close' in d){closeLayer();render();return;}
  if(el.id==='signOut'||el.id==='lgOut'){cloudSignOut();return;}
  if(el.id==='lgBack'){if(LG.signup){LG.signup=false;lgSet('signup');return;}lgSet('email');return;}
  if(el.id==='lgResend'){lgSend();return;}
  if(el.id==='lgRecheck'||el.id==='lgRetry'){cloudEnter(CLOUD.user);return;}
  if(el.id==='lgDemo'){try{sessionStorage.setItem('bm-forcedemo','1');}catch(_){}location.reload();return;}
  if(el.id==='lgExitDemo'){try{sessionStorage.removeItem('bm-forcedemo');localStorage.removeItem('bm-forcedemo');}catch(_){}location.reload();return;}
  if(d.lgorg){cloudEnter(CLOUD.user,d.lgorg);return;}
  if(el.id==='orgPick'){try{localStorage.removeItem('bm-org');}catch(_){}bmClearCache();location.reload();return;}
  if(d.jrok){joinReqAct(d.jrok,true);return;}
  if(el.id==='lgSignup'){LG.reset=false;const i=document.getElementById('lgEmail');if(i)LG.email=i.value.trim();lgSet('signup');return;}
  if(el.id==='lgUseCode'){LG.mode='code';const i=document.getElementById('lgEmail');if(i)LG.email=i.value.trim();lgSet('email');return;}
  if(el.id==='lgUsePw'){LG.mode='pw';LG.reset=false;LG.signup=false;const i=document.getElementById('lgEmail');if(i)LG.email=i.value.trim();lgSet('email');return;}
  if(el.id==='pwSet'){pwDialog(false);return;}
  if(d.jrno){joinReqAct(d.jrno,false);return;}
  if(el.id==='langBtn'){const i=LANGS.findIndex(l=>l[0]===LANG);setLang(LANGS[(i+1)%LANGS.length][0]);return;}
  if(d.settheme){setTheme(d.settheme);return;}
  if(d.setlang){setLang(d.setlang);return;}
  if(el.id==='keepSave'){const v=(document.getElementById('keepWords')||{}).value||'';I18N_USERKEEP=v.split(/[,\n]/).map(x=>x.trim()).filter(Boolean).join(',');try{localStorage.setItem('bm-keep',I18N_USERKEEP);}catch(_){}buildKeep();render();trNode(document.body);toast(LANG==='te'?'సేవ్ అయింది':LANG==='hi'?'सेव हो गया':'Saved');return;}
  if((d.go||d.fback)&&S.view==='form'&&FORM&&FORM.dirty&&!S.leaveOk){S.leaveOk=true;toast('You have unsaved changes. Tap again to leave without saving, or tap Save.');return;}
  if(d.fback){S.leaveOk=false;FORM=null;S.view='forms';render();scrollTo(0,0);return;}
  if(d.fproj){S.proj=d.fproj;try{localStorage.setItem('bm-proj',S.proj)}catch(_){}S.view='forms';render();scrollTo(0,0);return;}
  if(d.fpick){S.proj='all';S.view='forms';render();scrollTo(0,0);return;}
  if(d.go){S.leaveOk=false;S.view=d.go;S.q='';S.fstat='';S.dprT='';S.fwho='';try{DL.miss=false;}catch(_){}if(typeof matchMedia!=='undefined'&&matchMedia(SMALL_MQ).matches)COLLAPSED=true;render();scrollTo(0,0);return;}
  if(d.proj){S.proj=d.proj;try{localStorage.setItem('bm-proj',S.proj)}catch(_){}S.view='project';render();scrollTo(0,0);return;}
  if(d.add){openForm(d.add);return;}
  if(d.edit){const[k,id]=d.edit.split(':');openForm(k,id);return;}
  if(d.del){const[k,id]=d.del.split(':');if(S.confirm!==id){S.confirm=id;render();return;}S.confirm=null;const rec0=D[k].find(x=>x.id===id)||{};const lb=recLabel(k,rec0),fids=recFileIds(rec0);write(()=>db.doc(k+'/'+id).delete(),'Deleted').then(ok=>{if(ok){audit('deleted',k,id,lb);trashFiles(fids);}});return;}
  if(d.export){exportCsv(d.export);return;}
  if(d.reset){if(S.confirm!=='reset'){S.confirm='reset';toast('Tap Reset demo again to clear your changes and reload sample data.');return;}db.reset();return;}
  if(d.demo){setDemo(d.demo==='on');return;}
  if(d.addteam){openForm('team',null,{name:nm(d.addteam)!=='Someone'?nm(d.addteam):'',account:d.addteam,access:'Add & edit entries',status:'Active'});return;}
  if(el.id==='locFind'){findPlace();return;}
  if(el.id==='locMe'){if(!navigator.geolocation){toast('This browser cannot share location.');return;}toast('Finding your location…');
    navigator.geolocation.getCurrentPosition(p=>{MAP&&MAP.setView([p.coords.latitude,p.coords.longitude],18);MAP&&MAP._place(p.coords.latitude,p.coords.longitude,true);},()=>toast('Location permission was refused. Search or tap the map instead.'),{enableHighAccuracy:true,timeout:15000});return;}
  if(el.id==='locUse'){const v=(document.getElementById('locPaste')||{}).value||'';const l=parseLoc(v);
    if(!l){toast(/goo\.gl|maps\.app/.test(v)?'Short links cannot be read here. Open the link, then copy the full address-bar link or the coordinates.':'Could not read a location. Paste a full map link or coordinates like 17.4483, 78.3915.');return;}
    if(MAP&&MAP._place){MAP.setView([l.lat,l.lng],17);MAP._place(l.lat,l.lng,true);}else setLoc(l.lat,l.lng,false);toast('Pin set');return;}
  if(el.id==='locClear'){DRAFT.loc=null;if(PIN&&MAP){MAP.removeLayer(PIN);PIN=null;}const sh=document.getElementById('locShow');if(sh)sh.innerHTML=locShow(null);return;}
  if(el.id==='qaFab'||el.id==='tabAdd'){openQuick();return;}
  if(el.id==='tabMore'){setCollapsed(false);return;}
  if(d.react){const[i,em]=d.react.split('|');msgReact(i,em);return;}
  if(d.mact){const[k,i]=d.mact.split('|');msgAction(k,i);return;}
  if(d.mmenu){openMsgMenu(d.mmenu);return;}
  if(d.jump){const x=document.getElementById('m-'+d.jump);if(x){x.scrollIntoView({block:'center',behavior:'smooth'});x.classList.add('flash');setTimeout(()=>x.classList.remove('flash'),1400);}else toast('That message is no longer in this chat.');return;}
  if(d.rcancel){if(S.chatEdit)S.chatDraft='';S.chatReply=null;S.chatEdit=null;render();return;}
  if(d.charch){S.chatArch=true;S.chatProj=null;S.chatThread=null;render();return;}
  if(el.id==='fwdGo'){doForward();return;}
  if(d.chatproj){S.chatArch=false;S.chatProj=d.chatproj;S.chatThread=null;S.chatPpl=false;render();return;}
  if(d.chatlevel){if(d.chatlevel==='projects'){S.chatProj=null;S.chatArch=false;}S.chatThread=null;S.chatPpl=false;render();return;}
  if(d.cfilter){S.chatF=d.cfilter;render();return;}
  if(d.chatppl){S.chatPpl=!S.chatPpl;render();return;}
  if(d.chatpin){const p=d.chatpin;PINS=PINS.includes(p)?PINS.filter(x=>x!==p):[...PINS,p];try{localStorage.setItem('bm-chatpin',JSON.stringify(PINS));}catch(_){}render();return;}
  if(d.chat){if(d.jumpto)setTimeout(()=>{const x=document.getElementById('m-'+d.jumpto);if(x){x.scrollIntoView({block:'center'});x.classList.add('flash');setTimeout(()=>x.classList.remove('flash'),1400);}},120);S.chatReply=null;S.chatEdit=null;S.chatProj=d.chat.split('|')[0];S.chatPpl=false;S.chatThread=d.chat;S.chatMention=[];S.chatSeen=null;S.chatPhotos=[];render();return;}
  if(d.chatback){S.chatThread=null;render();return;}
  if(d.men){const t=myThreads().find(x=>x.key===S.chatThread);const others=t?threadMembers(t.pid,t.g).filter(x=>x.id!==myChatId()).map(x=>x.id):[];let m=S.chatMention||[];
    if(d.men==='*')m=others.every(id=>m.includes(id))?[]:others;else m=m.includes(d.men)?m.filter(x=>x!==d.men):[...m,d.men];S.chatMention=m;const ta=document.getElementById('chatText');if(ta)S.chatDraft=ta.value;render();return;}
  if(d.seen){S.chatSeen=S.chatSeen===d.seen?null:d.seen;render();return;}
  if(el.id==='chatSend'){chatSend();return;}
  if(el.id==='chatNew'){openChatGroup();return;}
  if(el.id==='pgRoles'){openRoleGroup();return;}
  if(d.gedit){openChatGroup(D.chatgroups.find(x=>x.id===d.gedit));return;}
  if(d.gdel){if(S.confirm!=='gdel'){S.confirm='gdel';openChatGroup(D.chatgroups.find(x=>x.id===d.gdel));return;}S.confirm=null;const g=D.chatgroups.find(x=>x.id===d.gdel);write(()=>db.doc('chatgroups/'+d.gdel).delete(),'Group deleted').then(ok=>{if(ok){audit('deleted','chatgroups',d.gdel,g?g.name:'');closeLayer();S.chatThread=null;render();}});return;}
  if(d.rarole){S.raRole=d.rarole;render();return;}
  if(d.ramode){S.raMode=d.ramode;render();return;}
  if(d.raperson){S.raMode='person';S.raPerson=d.raperson;if(S.view!=='roleaccess'){S.view='roleaccess';render();scrollTo(0,0);}else render();return;}
  if(d.viewperson){const t=D.team.find(x=>x.id===d.viewperson);if(!t)return;S.viewAsPerson=t.id;S.viewAs=t.role;S.view=homeView();render();scrollTo(0,0);return;}
  if(d.rap){const[k,v]=d.rap.split('|');raSetPerson(S.raPerson,{[k]:v});return;}
  if(d.rapall){const t=D.team.find(x=>x.id===S.raPerson);if(!t)return;const ch={};raGroups(t.role).flatMap(g=>g[1]).forEach(k=>ch[k]=d.rapall==='h'?'h':(raValP(t,k)==='e'?'e':'v'));raSetPerson(t.id,ch);return;}
  if(d.rapreset){const t=D.team.find(x=>x.id===S.raPerson);write(()=>db.doc('roleaccess/'+PKEY(S.raPerson)).delete(),(t?t.name:'This person')+' now follows their role').then(ok=>{if(ok)audit('edited','roleaccess',PKEY(S.raPerson),(t?t.name:'')+': reset to role');});return;}
  if(d.ra){const[k,v]=d.ra.split('|');raSet(S.raRole,{[k]:v});return;}
  if(d.raall){const ch={};raGroups(S.raRole).flatMap(g=>g[1]).forEach(k=>ch[k]=d.raall==='h'?'h':(raVal(S.raRole,k)==='e'?'e':'v'));raSet(S.raRole,ch);return;}
  if(d.rareset){const key=ROLE_KEY(S.raRole);write(()=>db.doc('roleaccess/'+key).delete(),'Back to default for '+S.raRole).then(ok=>{if(ok)audit('edited','roleaccess',key,S.raRole+': reset to default');});return;}
  if(d.pickproj){S.proj=d.pickproj;try{localStorage.setItem('bm-proj',S.proj)}catch(_){}render();scrollTo(0,0);return;}
  if(d.quick){runQuick(d.quick);return;}
  if(d.raise){raiseInvoice(d.raise);return;}
  if(d.alertgo){const[v,pid]=d.alertgo.split('|');if(pid)S.proj=pid;S.view=v;render();scrollTo(0,0);return;}
  if(d.viewas!==undefined){S.viewAsPerson=null;S.viewAs=d.viewas||null;S.view=homeView();render();scrollTo(0,0);return;}
  if(d.coapp){const[id,st]=d.coapp.split(':');write(()=>db.doc('changes/'+id).update({status:st,clientAt:Date.now(),clientBy:ME.id}),st==='Approved'?'Change approved — thank you':'Change rejected').then(ok=>{if(ok)audit(st.toLowerCase(),'changes',id,'By client');});return;}
  if(d.attmark){ATT.marks[d.attmark]=ATT.marks[d.attmark]===d.v?'':d.v;render();return;}
  if(d.attallset!==undefined){Object.keys(ATT.marks).forEach(k=>ATT.marks[k]=d.attallset);render();return;}
  if(d.attall){S.attAll=!S.attAll;render();return;}
  if(el.id==='attSave'){saveAttBulk();return;}
  if(el.id==='bkXlsx'){backupXlsx();return;}
  if(el.id==='bkJson'){backupJson();return;}
  if(d.fnew){newForm(d.fnew);scrollTo(0,0);return;}
  if(d.fopen){openForm2(d.fopen);scrollTo(0,0);return;}
  if(d.fall){S.fall=d.fall;render();return;}
  if(d.facc){openAccess(d.facc);return;}
  if(d.fsave){saveFormDoc(d.fsave);return;}
  if(d.fxlsx){exportFormXlsx();return;}
  if(d.fprint){printForm();return;}
  if(d.fdel){if(S.confirm!=='fdel'){S.confirm='fdel';render();return;}S.confirm=null;const id=FORM.id;write(()=>db.doc('forms/'+id).delete(),'Deleted').then(ok=>{if(ok){FORM=null;S.view='forms';render();}});return;}
  if(d.fans){if(el.disabled)return;const a=FORM.ans[d.fans]=FORM.ans[d.fans]||{};a.v=a.v===d.v?'':d.v;FORM.dirty=true;render();return;}
  if(d.faddrow){for(let i=0;i<+d.faddrow;i++)FORM.rows.push({});FORM.dirty=true;render();return;}
  if(d.frow){FORM.rows.splice(+d.frow,1);FORM.dirty=true;render();return;}
  if(d.tdelx){if(S.confirm!==d.tdelx){S.confirm=d.tdelx;render();return;}S.confirm=null;write(()=>db.doc('templates/'+d.tdelx).delete(),'Format removed');return;}
  if(d.camplay){playCam(d.camplay);return;}
  if(d.import){openImport();return;}
  if(el.id==='impPasteGo'){parsePaste(document.getElementById('imp-paste').value);return;}
  if(el.id==='impTpl'){saveFile('BuildMitr-schedule-template.csv',new Blob(['\ufeffWBS,Task Name,Start,Finish,Duration,% Complete,Resource,Predecessors\r\n1,Site clearing & marking,01-12-2026,03-12-2026,3,0,Site team,\r\n2,Footing excavation,04-12-2026,09-12-2026,6,0,JCB + gang,1\r\n3,PCC & footings,10-12-2026,20-12-2026,11,0,Mason gang,2\r\n'],{type:'text/csv'}));return;}
  if(d.convert){convertLead(d.convert);return;}
  if(d.lmove){const[id,dir]=d.lmove.split(':');const l=D.leads.find(x=>x.id===id);if(!l)return;const i=STAGES_L.indexOf(l.stage||'New')+(+dir);if(i>=0&&i<STAGES_L.length)moveLead(id,STAGES_L[i]);return;}
  if(d.fudone){const[id,kind,step]=d.fudone.split('|');followDone(id,kind,step);return;}
  if(d.wtpl){openForm('wtpl',null,{kind:d.wtpl,name:d.wtpl,text:DEFAULT_TPL[d.wtpl]||''});return;}
  if(d.cflag){const f=D.cflags.find(c=>c.id===d.cflag);write(()=>db.doc('cflags/'+d.cflag).set({ok:!(f&&f.ok),by:ME.id,at:Date.now()}),f&&f.ok?'Marked internal only':'Marked OK for public use');return;}
  if(el.id==='estDoc'){estDoc();return;}
  if(el.id==='estSave'){const c=estCalc();const l=D.leads.find(x=>x.id===EST.lead);if(!l)return;write(()=>db.doc('leads/'+l.id).update({budget:Math.round(c.total),estimate:{pkg:c.p.name,area:c.area,floors:EST.floors,total:Math.round(c.total),date:today()}}),'Estimate saved to '+l.name).then(ok=>{if(ok)audit('edited','leads',l.id,`Estimate ${inr(c.total)} (${c.p.name})`);});return;}
  if(el.id==='estQuote'){const c=estCalc();const l=D.leads.find(x=>x.id===EST.lead)||{};const cl=D.clients.find(x=>x.phone&&waNum(x.phone)===waNum(l.phone));openForm('invoices',null,{kind:'Quotation',client:cl?cl.id:'',date:today(),desc:`Construction of ${EST.floors} house, ${num(c.area)} sq.ft — ${c.p.name} package${l.name?' for '+l.name:''}`,amount:Math.round(c.sub),gst:EST.gst?'GST 18%':'',status:'Unpaid'});return;}
  if(el.id==='limpGo'){runLeadImport();return;}
  if(d.doc){const[k,id]=d.doc.split(':');if(k==='portfolio'){portfolioDoc(id);return;}if(k==='invoices'){docOpen(id);return;}downloadDoc(k,id);return;}
});
document.addEventListener('change',e=>{
  if(e.target&&e.target.dataset&&e.target.dataset.adrole){adminSetRole(e.target.dataset.adrole,e.target.value);return;}
  if(e.target.id==='projSel'){S.proj=e.target.value;S.dprN=0;try{localStorage.setItem('bm-proj',S.proj)}catch(_){}render();return;}
  if(e.target.id==='fstat'){S.fstat=e.target.value;render();return;}
  if(e.target.id==='fdprt'){S.dprT=e.target.value;S.dprN=0;render();return;}
  if(e.target.id==='fwho'){S.fwho=e.target.value;render();return;}
  if(e.target.id==='lsort'){S.lsort=e.target.value;try{localStorage.setItem('bm-lsort',S.lsort);}catch(_){}render();return;}
  if(e.target.id==='fbranch'){S.fbranch=e.target.value;render();return;}
  if(e.target.id==='chatWho'){S.chatWho=e.target.value;render();return;}
  if(e.target.id==='pg-proj'){const p=e.target.value;document.querySelectorAll('#pg-list .pg-row').forEach(r=>{r.hidden=!(r.dataset.elig||'').split(' ').includes(p);});return;}
  if(e.target.dataset&&e.target.dataset.pgmode){const r=e.target.closest('.pg-row');const cb=r&&r.querySelector('input[type=checkbox]');if(cb)cb.checked=true;return;}
  if(e.target.id==='chatPhoto'&&e.target.files.length){(async()=>{if(!A){toast('Photo upload needs Contributor access.');return;}S.chatPhotos=S.chatPhotos||[];for(const f of [...e.target.files]){const type=/^image\/(jpeg|png|webp|gif)$/.test(f.type)?f.type:'';if(!type){toast(f.name+': use JPG or PNG photos.');continue;}if(f.size>20*1048576){toast(f.name+' is over 20 MB.');continue;}try{toast('Uploading photo…');const r=await A.upload(f,{type});S.chatPhotos.push(r.id);}catch(err){toast('Upload failed: '+(err.message||err));}}const ta=document.getElementById('chatText');if(ta)S.chatDraft=ta.value;render();})();return;}
  if(e.target.id==='cpub'){S.cpub=e.target.checked;render();return;}
  if(e.target.id==='est-lead'){EST.lead=e.target.value;const l=D.leads.find(x=>x.id===EST.lead);if(l&&l.estimate&&!EST.area)EST.area=String(l.estimate.area||'');render();return;}
  if(e.target.id==='est-pkg'){EST.pkg=e.target.value;render();return;}
  if(e.target.id==='est-floors'){EST.floors=e.target.value;render();return;}
  if(e.target.id==='est-gst'){EST.gst=e.target.checked;render();return;}
  if(e.target.id==='limp-src'){LIMP.src=e.target.value;return;}
  if(e.target.id==='limp-file'&&e.target.files[0]){readLeadFile(e.target.files[0]);e.target.value='';return;}
  if(e.target.dataset.photos){addPhotos(e.target.files,e.target.dataset.photos);e.target.value='';}
  if(e.target.dataset.files){addFiles(e.target.files,e.target.dataset.files);e.target.value='';}
  if(e.target.id==='month'){S.month=e.target.value;render();}
  if(e.target.id==='imp-file'&&e.target.files[0]){readImportFile(e.target.files[0]);}
  if(S.view==='form'&&FORM&&(e.target.dataset.fc||e.target.dataset.fgst!==undefined||e.target.dataset.fh!==undefined)){const d=e.target.dataset;if(d.fc&&e.target.tagName==='SELECT'){const[i,k]=d.fc.split(':');FORM.rows[+i][k]=e.target.value;}FORM.dirty=true;render();}
  if(e.target.id==='viewAsSel'){S.viewAsPerson=null;S.viewAs=e.target.value||null;S.view=homeView();render();scrollTo(0,0);return;}
  if(e.target.id==='att-proj'){ATT.pid=e.target.value;S.proj=e.target.value;ATT.marks={};ATT.ot={};render();return;}
  if(e.target.id==='att-date'){ATT.date=e.target.value;ATT.marks={};ATT.ot={};render();return;}
  if(e.target.id==='bkRestore'&&e.target.files[0]){restoreJson(e.target.files[0]);e.target.value='';return;}
  if(e.target.id==='tplUp'&&e.target.files[0]){uploadTemplate(e.target.files[0]);e.target.value='';}
  if(e.target.id==='fPhotos'){(async()=>{for(const file of [...e.target.files]){const ext=(file.name.split('.').pop()||'').toLowerCase();const type={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp'}[ext];if(!type||!A){toast('Use JPG or PNG photos.');continue;}try{const r=await A.upload(file,{type});FORM.photos=[...(FORM.photos||[]),r.id];FORM.dirty=true;render();}catch(_){toast('Photo upload failed.');}}})();}
  if(e.target.dataset.impmap){IMP.map[e.target.dataset.impmap]=e.target.value;impRender();}
  if(e.target.id==='imp-proj'){impRender();}
});
document.addEventListener('input',e=>{const d=e.target.dataset;if(d.attot){ATT.ot[d.attot]=e.target.value;return;}
  if(e.target.id==='fwdQ'){const q=e.target.value.toLowerCase();document.querySelectorAll('#fwdList .pg-row').forEach(r=>{r.hidden=!(r.dataset.fq||'').includes(q);});return;}
  if(e.target.id==='pg-q'){const q=e.target.value.toLowerCase();const p=(document.getElementById('pg-proj')||{}).value;document.querySelectorAll('#pg-list .pg-row').forEach(r=>{r.hidden=!((r.dataset.elig||'').split(' ').includes(p)&&(r.dataset.q||'').includes(q));});return;}
  if(e.target.id==='chatSearch'){S.chatQ=e.target.value;const pos=e.target.selectionStart;render();const x=document.getElementById('chatSearch');if(x&&x.focus){x.focus();try{x.setSelectionRange(pos,pos);}catch(_){}}return;}
  if(e.target.id==='chatText'){S.chatDraft=e.target.value;e.target.style.height='auto';e.target.style.height=Math.min(140,e.target.scrollHeight)+'px';return;}
  if(e.target.id==='est-area'||d.estx!==undefined){if(e.target.id==='est-area')EST.area=e.target.value;else EST.extras[d.estx]=e.target.value;const sel=e.target.id?'#'+e.target.id:`[data-estx="${d.estx}"]`,pos=e.target.selectionStart;render();const x=document.querySelector(sel);if(x){x.focus();try{x.setSelectionRange(pos,pos);}catch(_){}}return;}if(S.view!=='form'||!FORM)return;
  if(d.fh!==undefined){FORM.head[d.fh]=e.target.value;FORM.dirty=true;}
  else if(d.ff!==undefined){FORM.foot[d.ff]=e.target.value;FORM.dirty=true;}
  else if(d.frem){(FORM.ans[d.frem]=FORM.ans[d.frem]||{}).r=e.target.value;FORM.dirty=true;}
  else if(d.ftitle!==undefined){FORM.title=e.target.value;FORM.dirty=true;}
  else if(d.ftask!==undefined){FORM.task=e.target.value;FORM.dirty=true;}
  else if(d.fgst!==undefined){FORM.gst=e.target.value;FORM.dirty=true;}
  else if(d.fc){const[i,k]=d.fc.split(':');FORM.rows[+i][k]=e.target.value;FORM.dirty=true;}
});
document.addEventListener('focusin',e=>{if(e.target&&e.target.id==='chatText')S.chatFocus=true;});
document.addEventListener('focusout',e=>{if(e.target&&e.target.id==='chatText')setTimeout(()=>{if(document.activeElement&&document.activeElement.id!=='chatText')S.chatFocus=false;},0);});
document.addEventListener('keydown',e=>{if(e.target.id==='chatText'&&e.key==='Enter'&&!e.shiftKey&&typeof matchMedia!=='undefined'&&matchMedia('(pointer:fine)').matches){e.preventDefault();chatSend();return;}if(e.target.id==='aiText'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();const t=e.target.value;e.target.value='';aiAsk(t);return;}if(e.key==='Escape'&&!document.getElementById('aiPanel').hidden){aiOpen(false);return;}if(e.key==='Enter'&&e.target.id==='locSearch'){e.preventDefault();findPlace();}if(e.key==='Enter'&&e.target.id==='locPaste'){e.preventDefault();document.getElementById('locUse').click();}});
document.addEventListener('submit',async e=>{
  e.preventDefault();
  if(e.target.id==='lgEmailForm'){lgSend();return;}
  if(e.target.id==='lgSignupForm'){lgSignup();return;}
  if(e.target.id==='lgPwForm'){lgPwLogin();return;}
  if(e.target.id==='pwForm'){pwSave();return;}
  if(e.target.id==='lgCodeForm'){lgVerify();return;}
  if(e.target.id==='lgOrgForm'){lgCreateOrg();return;}
  if(e.target.id==='impForm'){runImport();return;}
  if(e.target.id==='accForm'){saveAccess(e.target);return;}
  if(e.target.id==='pgForm'){const f=e.target;const id=f.dataset.id;const d=id?D.chatgroups.find(x=>x.id===id):null;const pid=d?d.project:document.getElementById('pg-proj').value;
    const name=document.getElementById('pg-name').value.trim();if(!name){toast('Give the group a name.');return;}
    const mm={};f.querySelectorAll('#pg-list .pg-row').forEach(r=>{const cb=r.querySelector('input[type=checkbox]');if(cb.checked&&!r.hidden)mm[cb.value]=r.querySelector('select').value;});
    const me=myChatId();if(!d)mm[me]='admin';
    if(Object.keys(mm).length<2){toast('Add at least one more person.');return;}
    if(!Object.values(mm).includes('admin')){toast('Keep at least one admin in the group.');return;}
    if(d&&!canEditPG(d)){toast('Only the admin or a group admin can change this group.');return;}
    let nid=id;const ok=d?await write(()=>db.doc('chatgroups/'+id).update({name,mm,at2:Date.now()}),'Group saved')
      :await write(async()=>{const r=await db.collection('chatgroups').add({project:pid,name,mm,by:ME.id,creator:me,at:Date.now()});nid=r.id;},'Group created');
    if(ok){audit(d?'edited':'created','chatgroups',nid,`${name}: ${Object.keys(mm).map(chatName).join(', ')}`);closeLayer();S.chatProj=pid;S.chatThread=thKey(pid,'g:'+nid);S.chatPpl=false;render();}return;}
  if(e.target.id==='chatGrpForm'){const pid=document.getElementById('cg-proj').value;const cats=['owner',...[...e.target.querySelectorAll('input:checked')].map(x=>x.value)].filter(c=>!(pid==='_co'&&c==='client'));if(cats.length<2){toast('Pick at least one more role.');return;}const g=grpKey(cats);
    if(!D.chatgroups.some(x=>x.project===pid&&x.grp===g))await write(()=>db.collection('chatgroups').add({project:pid,grp:g,by:ME.id,at:Date.now()}));closeLayer();S.chatProj=pid;S.chatThread=thKey(pid,g);render();return;}
  if(e.target.id==='lostForm'){const r=(e.target.querySelector('input[name=lr]:checked')||{}).value||'Other';const id=e.target.dataset.id;closeLayer();await moveLead(id,'Lost',r);render();return;}
  if(e.target.id==='aiCfgForm'){const g=id=>document.getElementById(id);aiAdminLoad({dailyLimit:+g('ai-lim').value,maxInputChars:+g('ai-in').value,maxOutputTokens:+g('ai-out').value,model:g('ai-model').value.trim(),enabled:g('ai-on').checked}).then(()=>toast('AI settings saved'));return;}
  if(e.target.id==='aiForm'){const t=document.getElementById('aiText');const v=t.value;t.value='';aiAsk(v);return;}
  if(e.target.id==='orgForm'){const g=id=>document.getElementById(id).value.trim();const gst=g('o-gst').toUpperCase().replace(/\s/g,'');if(gst&&!GSTIN_RE.test(gst)){toast('GSTIN format looks wrong — it has 15 characters, like 36ABCDE1234F1Z5.');return;}
    write(()=>db.doc('org/main').update({name:g('o-name'),gstin:gst,address:g('o-addr'),state:g('o-state'),invPrefix:g('o-pre')||'INV',sac:g('o-sac'),bank:g('o-bank'),acc:g('o-acc'),ifsc:g('o-ifsc').toUpperCase(),upi:g('o-upi'),phone:g('o-phone'),website:g('o-web'),brochure:g('o-broch'),reviewLink:g('o-review')}),'Company details saved').then(ok=>{if(ok)audit('edited','org','main','Company details');});return;}
  if(e.target.id!=='entryForm')return;
  if(S.ready&&!canEditView(DRAFT.k)){toast('The admin has given you view-only access here.');return;}
  const body={};
  for(const f of DRAFT.fields){
    if(f.t==='photos'){body[f.k]=DRAFT.photos[f.k]||[];continue;}
    if(f.t==='workrows'){const box=document.getElementById('f-'+f.k);
      if(!f.plan&&box&&[...box.querySelectorAll('.wr-row')].some(rw=>!rw.querySelector('[data-w=work]').value.trim()&&(DRAFT.photos['wr:'+rw.dataset.rk]||[]).length)){toast('A work line has photos but no description — write what was done, or remove the photos.');return;}
      body[f.k]=box?[...box.querySelectorAll('.wr-row')].map(rw=>{const o={trade:rw.querySelector('[data-w=trade]').value||'Other',work:rw.querySelector('[data-w=work]').value.trim().slice(0,4000)};if(!f.plan)o.photos=[...(DRAFT.photos['wr:'+rw.dataset.rk]||[])];return o;}).filter(x=>x.work).slice(0,40):[];
      if(f.plan)body.plan='';continue;}
    if(f.t==='crew'){const box=document.getElementById('f-'+f.k),c={};if(box)box.querySelectorAll('input[data-trade]').forEach(i=>{const x=+i.value;if(x>0)c[i.dataset.trade]=Math.round(x*2)/2;});body[f.k]=c;continue;}
    if(f.t==='matrows'){const box=document.getElementById('f-'+f.k);if(box&&[...box.querySelectorAll('.mr-row')].some(rw=>!rw.querySelector('[data-m=item]').value.trim()&&rw.querySelector('[data-m=qty]').value.trim())){toast('A material row has a quantity but no material name — fill the name or clear the row.');return;}body[f.k]=box?[...box.querySelectorAll('.mr-row')].map(rw=>{const g=n=>(rw.querySelector(`[data-m="${n}"]`)||{}).value||'';const q=g('qty').trim();return {item:g('item').trim().slice(0,120),qty:q===''?'':+q,unit:g('unit'),kind:g('kind')||'Received'};}).filter(x=>x.item):[];continue;}
    if(f.t==='files'){body[f.k]=DRAFT.files[f.k]||[];continue;}
    if(f.t==='location'){body[f.k]=DRAFT.loc||null;continue;}
    if(f.t==='tplmulti'){const box=document.getElementById('f-'+f.k);body[f.k]=box?[...box.querySelectorAll('input:checked')].map(x=>x.value):[];continue;}
    if(f.t==='projects'){const box=document.getElementById('f-'+f.k);body[f.k]=box?[...box.querySelectorAll('input:checked')].map(x=>x.value):[];continue;}
    let v=(document.getElementById('f-'+f.k)||{}).value;v=typeof v==='string'?v.trim():v;
    if((f.t==='number'||f.t==='money')&&v!=='')v=+v;
    body[f.k]=v??'';
  }

  if(DRAFT.k==='dpr'){body.civil='';body.electrical='';body.plumbing='';}
  if(DRAFT.k==='dpr'&&!dprWork(body).trim()){toast('Write the work done today — pick the work type (Civil, Electrical, Plumbing…) and write what was done.');return;}
  if(body.link&&!/^https:\/\//i.test(body.link)){toast('Link must start with https://');return;}
  const k=DRAFT.k,id=DRAFT.id;
  if(body.gstin){body.gstin=body.gstin.toUpperCase().replace(/\s/g,'');if(!GSTIN_RE.test(body.gstin)){toast('GSTIN format looks wrong — it has 15 characters, like 36ABCDE1234F1Z5.');return;}}
  if(TR_COLS.includes(k)&&id&&body.status)body.status=trGate(k,(D[k]||[]).find(x=>x.id===id),body.status);
  if(k==='tasks'&&body.status==='Completed'){const miss=gateMissing({...body,id});if(miss.length){toast(`Can't mark Completed yet — first get these checklists approved: ${miss.join(', ')}. (Reports & export → Checklists & sheets)`);return;}}
  const tplPick=k==='projects'&&!id?body.tpl:null;if(k==='projects')delete body.tpl;
  let newId=null;
  const ok=id?await write(()=>db.doc(k+'/'+id).update(body),'Saved')
    :await write(async()=>{const r=await db.collection(k).add({...body,by:ME.id,at:Date.now(),...(k==='projects'?{created:Date.now()}:{})});newId=r.id;if(DRAFT.ms){await db.doc('milestones/'+DRAFT.ms).update({inv:r.id});}if(k==='projects'&&DRAFT.lead){await db.doc('leads/'+DRAFT.lead).update({stage:'Won',project:r.id});}if(k==='projects'){S.proj=r.id;try{localStorage.setItem('bm-proj',r.id)}catch(_){}S.view='dashboard';}},k==='projects'?'Project created':'Saved');
  if(ok){const rm=(DRAFT.removed||[]).slice();DRAFT.removed=[];if(rm.length)trashFiles(rm);audit(id?'edited':'created',k,id||newId,recLabel(k,body));closeLayer();render();
    if(tplPick&&tplPick!=='None'&&newId&&isAdmin())await seedProject(newId,tplPick,body.start,body.value);}
});

/* ================= Start ================= */
(async()=>{
  render();
  if(!window.claude||!claude.use){
    {const cfg=cloudCfg();let forceDemo=false;try{localStorage.removeItem('bm-forcedemo');forceDemo=sessionStorage.getItem('bm-forcedemo')==='1'||/[?&]demo\b/.test(location.search);}catch(_){}
     if(cfg&&!forceDemo){S.web=true;S.cloud=true;bmSwReg();
       CLOUD.url=cfg.googleScriptUrl;try{CLOUD.token=localStorage.getItem('bm-token')||'';}catch(_){}
       try{const o=new URLSearchParams(location.search).get('org');if(o&&/^[\w-]{3,40}$/.test(o)){LG.fixedOrg=o;LG.org=o;LG.fixedName=String(new URLSearchParams(location.search).get('n')||'').slice(0,120);localStorage.setItem('bm-org',o);}}catch(_){}
       S.authStep='loading';render();
       if(CLOUD.token)await cloudEnter({id:'',email:''});else lgSet('email');
       return;}}
    S.web=true;db=localDb();bmSwReg();{const f=document.getElementById('aiFab');f.hidden=false;document.getElementById('aiFabIco').innerHTML=ico('sparkles');}ME={id:'dm1',name:'Bala Krishna',isOwner:true,canEdit:true,avatarUrl:''};CANW=CANW0=true;
    const loaded=new Set();
    COLS.forEach(c=>db.collection(c).onSnapshot(snap=>{REAL[c]=snap.docs.map(x=>({id:x.id,...x.data()}));D[c]=REAL[c];loaded.add(c);if(loaded.size===COLS.length)S.ready=true;refresh();}));
    return;}
  [db,U,A,AI.sample]=await Promise.all([claude.use('db'),claude.use('user'),claude.use('assets'),claude.use('sample')]);
  if(AI.sample){try{const lim=await AI.sample.limits();if(lim&&!lim.tools)AI.sample=null;}catch(_){}}
  {const f=document.getElementById('aiFab');f.hidden=!AI.sample;document.getElementById('aiFabIco').innerHTML=ico('sparkles');}
  if(!db){render();return;}
  if(U){ME=await U.me();const cw=await U.can('data.write');CANW=CANW0=cw!==false;}
  const timer=setTimeout(()=>{S.stale=true;S.ready=true;render();},10000);
  const loaded=new Set();
  const done=()=>{if(loaded.size===COLS.length&&!S.ready){S.ready=true;clearTimeout(timer);}};
  COLS.forEach(c=>db.collection(c).onSnapshot(snap=>{
    REAL[c]=snap.docs.map(x=>({id:x.id,...x.data()}));if(!S.demo)D[c]=REAL[c];loaded.add(c);
    if(!snap.metadata.fromCache)S.stale=false;done();refresh();
  },()=>{loaded.add(c);done();refresh();}));
  if(ME.id&&CANW){try{const m=await db.doc('members/'+ME.id).get();if(!m.exists)await db.doc('members/'+ME.id).set({joined:Date.now()});}catch(e){if(e&&e.code==='invalid_argument'){CANW=CANW0=false;render();}}}
})();
