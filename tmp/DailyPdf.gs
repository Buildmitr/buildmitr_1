/* ======================================================================
 * Daily project reports as PDF on WhatsApp (BuildMitr → Admin panel → Daily PDF reports)
 * 7:30 am: yesterday's work + today's plan.  7:30 pm: today's work + tomorrow's plan.
 * One PDF per project. Each person the admin picked gets only the projects their
 * team entry can open, and only what their role may see:
 *   money (payments)  → only roles that can see payments
 *   issues & tasks    → only roles that can see them
 *   clients           → a client copy of their own project (work, progress, photos, plan)
 * Sending: WhatsApp Business Cloud API — the PDF goes as a document with an approved
 * template that has a DOCUMENT header and one {{1}} body text. Without that template,
 * a message with a link to the PDF is sent instead (Cloud API or CallMeBot).
 * A timer (drpTick, every 15 minutes) sends each report once a day; run drpInstall once.
 * ==================================================================== */
const DRP_AM_ = 7 * 60 + 30, DRP_PM_ = 19 * 60 + 30;

function drpCfg_(org) {
  let c = {}; try { c = JSON.parse(props_().getProperty('DRP_' + org) || '{}'); } catch (e) { c = {}; }
  return { am: c.am !== false, pm: c.pm !== false, on: !!c.on, people: Array.isArray(c.people) ? c.people : [], clients: !!c.clients, tpl: String(c.tpl || ''), lang: String(c.lang || 'en') };
}
function drpGet_(m, org) {
  if (m.role !== 'Admin') fail_('Only the admin can see this.', 'denied');
  org = m.org;
  const c = drpCfg_(org), p = props_(), w = waCfg_(org) || {};
  return { cfg: c, last: { am: p.getProperty('DRPAM_' + org) || '', pm: p.getProperty('DRPPM_' + org) || '', log: (function () { try { return JSON.parse(p.getProperty('DRPLOG_' + org) || '[]'); } catch (e) { return []; } })() },
    wa: { on: !!w.on, mode: w.mode || 'bot', api: !!(w.api && w.api.pid && w.api.token) }, timer: drpHasTimer_() };
}
function drpSet_(m, org, inp) {
  if (m.role !== 'Admin') fail_('Only the admin can change this.', 'denied');
  org = m.org;
  inp = inp || {};
  const people = (Array.isArray(inp.people) ? inp.people : []).map(String).filter(function (x) { return /^[\w-]{1,80}$/.test(x); }).slice(0, 60);
  props_().setProperty('DRP_' + org, JSON.stringify({ on: inp.on === true, am: inp.am !== false, pm: inp.pm !== false, people: people, clients: inp.clients === true,
    tpl: String(inp.tpl || '').replace(/[^\w]/g, '').slice(0, 60), lang: String(inp.lang || 'en').replace(/[^\w]/g, '').slice(0, 10) }));
  return drpGet_(m, org);
}

/* ---------------- data ---------------- */
function drpData_(org) {
  const R = {}, want = ['projects', 'team', 'clients', 'dpr', 'tasks', 'issues', 'received', 'consumed', 'attendance', 'vlabour', 'payments', 'milestones'];
  rows_(sheet_('records')).forEach(function (r) {
    if (String(r[1]) !== org || r[8]) return;
    const col = String(r[2]); if (want.indexOf(col) < 0) return;
    let d = {}; try { d = JSON.parse(r[5] || '{}'); } catch (e) { return; }
    d.id = String(r[3]); (R[col] = R[col] || []).push(d);
  });
  return R;
}
function drpDay_(ms) { return Utilities.formatDate(new Date(ms), 'Asia/Kolkata', 'yyyy-MM-dd'); }
function drpMin_() { const d = new Date(); return Number(Utilities.formatDate(d, 'Asia/Kolkata', 'H')) * 60 + Number(Utilities.formatDate(d, 'Asia/Kolkata', 'm')); }
function drpLive_(p, today) { return !!p && !p.archived && !/complet|closed|hold/i.test(String(p.status || '')) && (!p.start || String(p.start) <= today); }

/* who gets what: [{name, phone, role, projects:['all'|ids], kind:'team'|'client', client:id}] */
function drpPeople_(org, cfg, R) {
  const out = [], seen = {};
  const add = function (o) { const k = o.phone + '|' + drpView_(o); if (seen[k]) { o.projects.forEach(function (x) { if (seen[k].projects.indexOf(x) < 0) seen[k].projects.push(x); }); return; } seen[k] = o; out.push(o); };
  const ph = function (p) { let d = String(p || '').replace(/\D/g, ''); if (d.length === 10) d = '91' + d; return d.length >= 11 && d.length <= 15 ? d : ''; };
  (R.team || []).forEach(function (t) {
    if (cfg.people.indexOf(t.id) < 0 || /removed|inactive/i.test(String(t.status || ''))) return;
    const phone = ph(t.phone); if (!phone) return;
    const boss = t.role === 'Admin' || t.role === 'Project manager';
    add({ name: String(t.name || ''), phone: phone, role: String(t.role || ''), projects: boss ? ['all'] : (Array.isArray(t.projects) ? t.projects.map(String) : []), kind: t.role === 'Client' ? 'client' : 'team', client: '' });
  });
  if (cfg.clients) (R.clients || []).forEach(function (c) {
    const phone = ph(c.phone); if (!phone) return;
    const mine = (R.projects || []).filter(function (p) { return p.client === c.id; }).map(function (p) { return p.id; });
    if (!mine.length) return;
    add({ name: String(c.name || ''), phone: phone, role: 'Client', projects: mine, kind: 'client', client: c.id });
  });
  return out;
}
function drpSees_(person, pid) { return person.projects.indexOf('all') >= 0 || person.projects.indexOf(pid) >= 0; }
/* what a role may see in the report */
function drpView_(person) {
  if (person.kind === 'client' || person.role === 'Client') return 'client';
  const can = function (c) { return roleCan_(person.role, c); }, sub = person.role === 'Sub-contractor';
  if (!can('dpr') && !can('tasks')) return '';
  return 'v' + (can('payments') ? 'm' : '') + (can('issues') && !sub ? 'i' : '') + (can('tasks') && !sub ? 't' : '') + (can('labour') || can('attendance') ? 'l' : '') + (can('received') || can('consumed') ? 's' : '');
}

/* ---------------- the PDF ---------------- */
function drpEsc_(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function drpInr_(n) { const v = Math.round(Number(n) || 0), s = String(Math.abs(v)), l = s.slice(-3), r = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ','); return (v < 0 ? '-' : '') + 'Rs. ' + (r ? r + ',' : '') + l; }
function drpLines_(a) { return (Array.isArray(a) ? a : []).filter(function (x) { return x && x.work && String(x.work).trim(); }).map(function (x) { return { t: String(x.trade || 'Other'), w: String(x.work).trim().slice(0, 400), ph: Array.isArray(x.photos) ? x.photos : [] }; }); }
function drpThumbs_(ids, max, memo) {
  const out = [];
  for (let i = 0; i < ids.length && out.length < max; i++) {
    const id = String(ids[i]);
    if (!(id in memo)) {
      memo[id] = '';
      try {
        const f = DriveApp.getFileById(id), small = f.getSize() < 900000 && /^image\/(jpeg|png|webp)$/.test(f.getMimeType());
        const b = small ? f.getBlob() : f.getThumbnail();
        if (b) memo[id] = 'data:' + (b.getContentType() || 'image/png') + ';base64,' + Utilities.base64Encode(b.getBytes());
      } catch (e) {}
    }
    if (memo[id]) out.push(memo[id]);
  }
  return out;
}
function drpHtml_(org, R, p, kind, view) {
  const pm = kind === 'pm', now = Date.now(), D0 = drpDay_(pm ? now : now - 864e5), today = drpDay_(now), next = drpDay_(pm ? now + 864e5 : now);
  const client = view === 'client', has = function (c) { return !client && view.indexOf(c) >= 0; }, money = has('m'), iss = has('i'), tk = has('t'), lab = has('l'), mat = has('s');
  const pid = p.id, of = function (c) { return (R[c] || []).filter(function (x) { return x.project === pid; }); };
  const reps = of('dpr').filter(function (d) { return d.date === D0; });
  const work = [], plan = [], crew = {}, mats = [], photos = [];
  reps.forEach(function (d) {
    drpLines_(d.items).forEach(function (x) { work.push(x); x.ph.forEach(function (i) { photos.push(i); }); });
    ['civil', 'electrical', 'plumbing'].forEach(function (k) { if (d[k]) work.push({ t: k.charAt(0).toUpperCase() + k.slice(1), w: String(d[k]).slice(0, 400), ph: [] }); });
    if (!client && d.work && String(d.work).trim()) work.push({ t: 'Notes', w: String(d.work).trim().slice(0, 400), ph: [] });
    if (!client) (Array.isArray(d.photos) ? d.photos : []).forEach(function (i) { photos.push(i); });
    if (d.crew && typeof d.crew === 'object') Object.keys(d.crew).forEach(function (k) { crew[k] = (crew[k] || 0) + (Number(d.crew[k]) || 0); });
    (Array.isArray(d.mats) ? d.mats : []).forEach(function (m) { if (m && m.item) mats.push(m); });
  });
  // the plan for the coming day: from the latest report of the period (evening: today's; morning: yesterday's)
  reps.forEach(function (d) { drpLines_(d.planItems).forEach(function (x) { plan.push(x); }); if (!(d.planItems || []).length && d.plan) plan.push({ t: 'Plan', w: String(d.plan).slice(0, 400) }); });
  const tasks = of('tasks'), prog = tasks.length ? Math.round(tasks.reduce(function (a, t) { return a + (t.status === 'Completed' ? 100 : Math.min(100, Number(t.progress) || 0)); }, 0) / tasks.length) : null;
  const late = tasks.filter(function (t) { return t.status !== 'Completed' && t.due && String(t.due) < today; });
  const due = tasks.filter(function (t) { return t.status !== 'Completed' && t.due === next; });
  const openIss = of('issues').filter(function (i) { return !/resolved|closed/i.test(String(i.status || '')); });
  const pays = of('payments').filter(function (x) { return x.date === D0; });
  const pin = pays.filter(function (x) { return x.dir === 'Received from client'; }).reduce(function (a, x) { return a + (Number(x.amount) || 0); }, 0);
  const pout = pays.filter(function (x) { return x.dir !== 'Received from client'; }).reduce(function (a, x) { return a + (Number(x.amount) || 0); }, 0);
  const rec = of('received').filter(function (x) { return x.date === D0; });
  const att = of('attendance').filter(function (a) { return a.date === D0 && /present|half/i.test(String(a.status || '')); }).length + of('vlabour').filter(function (v) { return v.date === D0; }).reduce(function (a, v) { return a + (Number(v.count) || 0); }, 0);
  const crewTot = Object.keys(crew).reduce(function (a, k) { return a + crew[k]; }, 0);
  const pics = drpThumbs_(photos, client ? 6 : 8, R._thumbs || (R._thumbs = {}));
  const name = (orgNames_()[org] || 'BuildMitr'), title = [p.prefix, p.name].filter(Boolean).join(' · ');
  const when = Utilities.formatDate(new Date(pm ? now : now - 864e5), 'Asia/Kolkata', 'EEEE, d MMMM yyyy');
  const E = drpEsc_, row = function (a, b) { return '<tr><td class="k">' + E(a) + '</td><td>' + b + '</td></tr>'; };
  const sec = function (h, body) { return '<h2>' + E(h) + '</h2>' + body; };
  const list = function (a) { return a.length ? '<table class="t">' + a.map(function (x) { return '<tr><td class="k">' + E(x.t) + '</td><td>' + E(x.w) + '</td></tr>'; }).join('') + '</table>' : '<p class="m">Nothing recorded.</p>'; };
  let h = '<html><head><meta charset="utf-8"><style>body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;color:#1a2420;margin:0}'
    + '.top{background:#1f3a2e;color:#fff;padding:14px 18px}.top h1{font-size:16pt;margin:0}.top p{margin:4px 0 0;font-size:10pt;color:#cfe0d7}'
    + '.b{padding:6px 18px}h2{font-size:12pt;color:#1f3a2e;border-bottom:1px solid #cfdad5;padding-bottom:3px;margin:14px 0 6px}'
    + 'table{border-collapse:collapse;width:100%}td{padding:4px 6px;vertical-align:top;border-bottom:1px solid #eef2f0}.k{width:28%;color:#5d6c66}'
    + '.m{color:#5d6c66}.tiles td{border:1px solid #dfe7e3;text-align:center;padding:8px}.tiles b{display:block;font-size:14pt}'
    + 'img{width:31%;margin:0 1% 6px 0;border-radius:4px}.f{color:#8a9893;font-size:8.5pt;padding:10px 18px}</style></head><body>';
  h += '<div class="top"><h1>' + E(title || 'Project') + '</h1><p>' + E(name) + ' · ' + (pm ? 'Evening report' : 'Morning report') + ' · ' + E(when) + '</p></div><div class="b">';
  h += '<table class="tiles"><tr><td><b>' + (prog == null ? '—' : prog + '%') + '</b>Progress</td>' + (!lab ? '' : '<td><b>' + (crewTot || att || 0) + '</b>Workers on site</td>') + '<td><b>' + reps.length + '</b>Daily reports</td>'
    + (tk ? '<td><b>' + late.length + '</b>Late tasks</td>' : '') + '</tr></table>';
  h += sec(pm ? 'Work done today' : 'Work done yesterday', reps.length ? list(work) : '<p class="m">No daily report was submitted for this day.</p>');
  if (lab && crewTot) h += sec('Labour', '<table class="t">' + Object.keys(crew).filter(function (k) { return crew[k] > 0; }).map(function (k) { return row(k, String(crew[k])); }).join('') + (att ? row('Attendance marked', String(att)) : '') + '</table>');
  if (mat && (mats.length || rec.length)) h += sec('Material', '<table class="t">' + mats.map(function (m) { return row(String(m.kind || 'Used'), E([m.item, m.qty, m.unit].filter(function (v) { return v !== '' && v != null; }).join(' '))); }).join('')
    + rec.map(function (r) { return row('Received', E([r.material, r.qty, r.unit].filter(Boolean).join(' '))); }).join('') + '</table>');
  if (pics.length) h += sec('Site photos', '<div>' + pics.map(function (s) { return '<img src="' + s + '">'; }).join('') + '</div>');
  h += sec(pm ? 'Plan for tomorrow' : 'Plan for today', list(plan));
  if (tk && (late.length || due.length)) h += sec('Tasks', '<table class="t">' + late.slice(0, 8).map(function (t) { return row('Late (due ' + t.due + ')', E(t.title)); }).join('') + due.slice(0, 8).map(function (t) { return row('Due ' + (pm ? 'tomorrow' : 'today'), E(t.title)); }).join('') + '</table>');
  if (iss && openIss.length) h += sec('Open issues (' + openIss.length + ')', '<table class="t">' + openIss.slice(0, 10).map(function (i) { return row(String(i.severity || 'Issue'), E(i.title)); }).join('') + '</table>');
  if (money) h += sec('Money ' + (pm ? 'today' : 'yesterday'), '<table class="t">' + row('Received from client', drpInr_(pin)) + row('Paid out', drpInr_(pout)) + '</table>');
  if (client) { const ms = of('milestones').filter(function (x) { return !x.inv && x.due && String(x.due) >= today; }).sort(function (a, b) { return String(a.due).localeCompare(String(b.due)); })[0];
    if (ms) h += sec('Next payment stage', '<p>' + E(ms.stage) + ' (due ' + E(ms.due) + ')</p>'); }
  h += '</div><div class="f">Made automatically by BuildMitr from the site team\'s daily report. ' + (client ? 'For questions, call your project manager.' : 'Open BuildMitr for full details.') + '</div></body></html>';
  return { html: h, empty: client || !tk ? !reps.length : !reps.length && !late.length && !due.length, summary: title + ': ' + (reps.length ? work.slice(0, 2).map(function (x) { return x.w.split('\n')[0]; }).join('; ').slice(0, 180) : 'no daily report') };
}
function drpPdf_(org, R, p, kind, view) {
  const x = drpHtml_(org, R, p, kind, view);
  const file = [p.prefix || p.name || 'Project', kind === 'pm' ? 'Evening report' : 'Morning report', drpDay_(kind === 'pm' ? Date.now() : Date.now() - 864e5)].join(' ').replace(/[\\\/:*?"<>|]/g, '_') + '.pdf';
  const pdf = Utilities.newBlob(x.html, 'text/html', 'r.html').getAs('application/pdf').setName(file);
  return { blob: pdf, name: file, key: p.id + '|' + kind + '|' + view, summary: x.summary, empty: x.empty };   // key: each copy (full / site / client) is uploaded and linked on its own
}

/* ---------------- sending ---------------- */
function drpUpload_(a, blob) {
  const r = UrlFetchApp.fetch('https://graph.facebook.com/v21.0/' + encodeURIComponent(a.pid) + '/media', { method: 'post', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + a.token }, payload: { messaging_product: 'whatsapp', type: 'application/pdf', file: blob } });
  let j = {}; try { j = JSON.parse(r.getContentText() || '{}'); } catch (e) {}
  if (r.getResponseCode() !== 200 || !j.id) throw new Error('PDF upload to WhatsApp failed (' + r.getResponseCode() + ')');
  return j.id;
}
function drpDir_() {   // its own folder in the owner's Drive — NOT inside the company folders that are shared with staff
  const p = props_(); let id = p.getProperty('DRP_DIR');
  try { if (id) return DriveApp.getFolderById(id); } catch (e) {}
  const d = DriveApp.createFolder('BuildMitr daily PDF links (auto-deleted after 7 days)'); p.setProperty('DRP_DIR', d.getId()); return d;
}
function drpLink_(org, pdf) {   // fallback until the WhatsApp PDF template is set up: a view-only link that expires after 7 days
  const f = drpDir_().createFile(pdf.blob);
  try { f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); }
  catch (e) { try { f.setTrashed(true); } catch (e2) {} throw new Error('Google Drive does not allow link sharing for this account — set up the WhatsApp PDF template instead.'); }
  return 'https://drive.google.com/file/d/' + f.getId() + '/view';
}
function drpClean_() {
  try { const old = Date.now() - 7 * 864e5, it = drpDir_().getFiles(); let n = 0;
    while (it.hasNext() && n < 200) { const f = it.next(); if (f.getDateCreated().getTime() < old) { f.setTrashed(true); n++; } } } catch (e) {}
}
function drpSendOne_(org, w, cfg, phone, pdf, cache) {
  if (!w || !w.on) throw new Error('WhatsApp updates are switched off in Settings → WhatsApp updates.');
  const a = w.api || {};
  if (w.mode === 'api' && a.pid && a.token && cfg.tpl) {
    const mid = cache.media[pdf.key] || (cache.media[pdf.key] = drpUpload_(a, pdf.blob));
    const r = UrlFetchApp.fetch('https://graph.facebook.com/v21.0/' + encodeURIComponent(a.pid) + '/messages', { method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + a.token },
      payload: JSON.stringify({ messaging_product: 'whatsapp', to: phone, type: 'template', template: { name: cfg.tpl, language: { code: cfg.lang || 'en' }, components: [
        { type: 'header', parameters: [{ type: 'document', document: { id: mid, filename: pdf.name } }] },
        { type: 'body', parameters: [{ type: 'text', text: pdf.summary.replace(/[\n\t]+/g, ' ').replace(/ {4,}/g, ' ').slice(0, 900) }] }] } }) });
    if (r.getResponseCode() !== 200) throw new Error('WhatsApp ' + r.getResponseCode() + ': ' + String(r.getContentText() || '').slice(0, 160));
    return 'pdf';
  }
  // no PDF template yet: send the link as a normal update
  const link = cache.link[pdf.key] || (cache.link[pdf.key] = drpLink_(org, pdf));
  const one = { on: true, mode: w.mode, api: w.api, to: (w.to || []).filter(function (x) { return String(x.phone || '').replace(/\D/g, '').slice(-10) === phone.slice(-10); }) };
  if (!one.to.length && w.mode === 'api') one.to = [{ phone: phone }];
  if (!one.to.length) throw new Error('This number has no CallMeBot key in Settings → WhatsApp updates (needed until the PDF template is set up).');
  if (w.mode !== 'api') Utilities.sleep(1500);   // CallMeBot slows down quick messages to one number
  const r2 = waSend_(org, [pdf.name.replace(/\.pdf$/, ''), pdf.summary, 'PDF (link works for 7 days): ' + link], one);
  if (!r2.sent) throw new Error(r2.error || 'Could not send');
  return 'link';
}
/* build and send one round (kind 'am' | 'pm'); onlyPhone/onlyPid for a test */
function drpRun_(org, kind, test, deadline) {
  const cfg = drpCfg_(org), w = waCfg_(org) || {}, R = drpData_(org), today = drpDay_(Date.now()), p0 = props_();
  const people = test && test.person ? [test.person] : drpPeople_(org, cfg, R);
  const projs = (R.projects || []).filter(function (p) { return test && test.pid ? p.id === test.pid : drpLive_(p, today); });
  const doneKey = 'DRPDONE_' + org + '_' + kind;
  let done = {}; try { const d = JSON.parse(p0.getProperty(doneKey) || '{}'); if (d.day === today) done = d.done || {}; } catch (e) {}
  const pdfs = {}, cache = { media: {}, link: {} }, log = [];
  let sent = 0, more = false;
  people.forEach(function (person) {
    const view = drpView_(person); if (!view) return;
    projs.forEach(function (p) {
      if (more || !drpSees_(person, p.id)) return;
      const key = p.id + '|' + view, dk = person.phone + '|' + p.id;
      if (!test && done[dk]) return;
      if (deadline && Date.now() > deadline) { more = true; return; }   // continue at the next tick
      try {
        const pdf = pdfs[key] || (pdfs[key] = drpPdf_(org, R, p, kind, view));
        if (pdf.empty && !test) return;   // nothing happened and nothing due: no message
        const how = drpSendOne_(org, w, cfg, person.phone, pdf, cache); sent++;
        if (!test) { done[dk] = 1; p0.setProperty(doneKey, JSON.stringify({ day: today, done: done })); }
        log.push({ to: person.name || person.phone.slice(-4), p: p.name || '', ok: how });
      } catch (e) { log.push({ to: person.name || person.phone.slice(-4), p: p.name || '', err: String(e.message || e).slice(0, 160) }); }
    });
  });
  if (!test) { let old = []; try { const o = JSON.parse(p0.getProperty('DRPLOG_' + org) || '[]'); if (o[0] && o[0].kind === kind && drpDay_(o[0].at) === today) old = o.slice(1); } catch (e) {}
    p0.setProperty('DRPLOG_' + org, JSON.stringify([{ at: Date.now(), kind: kind, sent: sent + (old.length ? old.filter(function (x) { return x.ok; }).length : 0) }].concat(log, old).slice(0, 41))); }
  return { sent: sent, log: log, pdfs: Object.keys(pdfs).length, more: more };
}
/* timer: every 15 minutes, each company's morning and evening report once a day */
function drpTick() {
  const t0 = Date.now(), deadline = t0 + 4.5 * 60000, min = drpMin_(), day = drpDay_(t0), p = props_();
  const kind = min >= DRP_PM_ ? 'pm' : min >= DRP_AM_ && min < DRP_AM_ + 150 ? 'am' : '';
  if (!kind) { if (min < 60) drpClean_(); return; }
  const lock = LockService.getScriptLock(); if (!lock.tryLock(1000)) return;   // one tick at a time
  try {
    SS_ = null; SH_ = {}; ORGN_ = null; SHR_ = null;
    Object.keys(orgNames_()).some(function (org) {
      const cfg = drpCfg_(org); if (!cfg.on || !cfg[kind]) return false;
      const k = (kind === 'am' ? 'DRPAM_' : 'DRPPM_') + org;
      if (p.getProperty(k) === day) return false;
      if (Date.now() > deadline) return true;
      let r = { more: false };
      try { r = drpRun_(org, kind, null, deadline); } catch (e) { Logger.log('Daily PDF ' + org + ': ' + e); }
      if (!r.more) p.setProperty(k, day);   // finished for today; otherwise the next tick carries on where this one stopped
      return !!r.more;
    });
  } finally { lock.releaseLock(); }
}
function drpHasTimer_() { try { return ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'drpTick'; }); } catch (e) { return null; } }
/* run once in the editor (Run ▸ drpInstall): starts the 15-minute timer */
function drpInstall() {
  ScriptApp.getProjectTriggers().filter(function (t) { return t.getHandlerFunction() === 'drpTick'; }).forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('drpTick').timeBased().everyMinutes(15).create();
  Logger.log('Daily PDF timer is on (every 15 minutes; sends at 7:30 am and 7:30 pm India time).');
}
/* admin: preview a PDF (base64) or send a test to one team member now */
function drpTest_(m, org, q) {
  if (m.role !== 'Admin') fail_('Only the admin can do this.', 'denied');
  org = m.org;
  const R = drpData_(org), p = (R.projects || []).filter(function (x) { return x.id === String(q.project || ''); })[0];
  if (!p) fail_('Choose a project.', 'bad');
  const kind = q.kind === 'pm' ? 'pm' : 'am';
  const viewOf = { full: 'vmitls', site: 'vitls', client: 'client' };
  if (q.preview) { const pdf = drpPdf_(org, R, p, kind, viewOf[q.view] || 'mit'); return { name: pdf.name, b64: Utilities.base64Encode(pdf.blob.getBytes()) }; }
  const cfg = drpCfg_(org), t = (R.team || []).filter(function (x) { return x.id === String(q.person || ''); })[0];
  if (!t) fail_('Choose a team member with a phone number.', 'bad');
  const person = drpPeople_(org, { people: [t.id], clients: false }, R)[0];
  if (!person) fail_('This person has no valid phone number.', 'bad');
  return drpRun_(org, kind, { person: person, pid: p.id });
}
