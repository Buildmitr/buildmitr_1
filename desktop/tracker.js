// BuildMitr Work Tracker: records which program is in front (AutoCAD, SketchUp, Revit…) and whether the PC is in use.
// Only the program name and the open drawing's file name are kept — no screenshots, no typing.
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const STEP = 15;          // seconds between samples
const IDLE_AFTER = 300;   // no mouse / keyboard for 5 minutes = idle

// PowerShell loop: prints "processName<TAB>window title" of the window in front every 5 seconds
const PS = `
[Console]::OutputEncoding=[Text.Encoding]::UTF8
Add-Type @"
using System;using System.Runtime.InteropServices;using System.Text;
public class BmFw{
 [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr h,StringBuilder s,int n);
 [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h,out uint p);
}
"@
while($true){
 $h=[BmFw]::GetForegroundWindow();$sb=New-Object System.Text.StringBuilder 512;[void][BmFw]::GetWindowText($h,$sb,512)
 $p=[uint32]0;[void][BmFw]::GetWindowThreadProcessId($h,[ref]$p);$n=''
 try{$n=(Get-Process -Id $p -ErrorAction Stop).ProcessName}catch{}
 [Console]::Out.WriteLine($n+"\`t"+($sb.ToString() -replace "[\`t\`r\`n]"," "));[Console]::Out.Flush()
 Start-Sleep -Seconds 5
}`;

// How each program's window title names the open file. Kept as data so newer rules can come from the BuildMitr
// website (track-rules.json) without reinstalling the app. p = process name, a = program, f = title patterns (group 1 = file).
const EXT = 'dwg|dxf|dwt|skp|rvt|rfa|rte|edb|e2k|fdb|sdb|std|max|psd|pln|3dm|nwd|nwf|nwc|ifc|xlsx|xlsm|xls|csv|docx|doc|pptx|ppt|pdf|mpp|ls\\d+|lsc|vrscene|blend|tekla|db1';
const FILE = '([^\\\\/\\[\\]:*?"<>|]+?\\.(?:' + EXT + '))(?![a-z0-9])';
const RULES = {
  v: 2,
  apps: [
    { p: '^acad(lt)?$', a: 'AutoCAD', f: [FILE] },
    { p: '^(sketchup|sketchupviewer|layout)', a: 'SketchUp', f: [FILE, '^(.+?)\\s+-\\s+(?:SketchUp|LayOut)'] },
    { p: '^revit$', a: 'Revit', f: [FILE, '\\[([^\\]]+?)\\s+-\\s+[^\\]]*\\]', '\\[([^\\]]+)\\]', '^Autodesk Revit[^-]*(?:-\\s*[A-Z ]*VERSION\\s*)?-\\s*(.+?)(?:\\s+-\\s+.*)?$'] },
    { p: '^etabs', a: 'ETABS', f: [FILE, '\\[([^\\]]+)\\]', '^ETABS[^-]*-\\s*(.+?)\\s*$'] },
    { p: '^safe', a: 'SAFE', f: [FILE, '^SAFE[^-]*-\\s*(.+?)\\s*$'] },
    { p: '^sap2000', a: 'SAP2000', f: [FILE, '^SAP2000[^-]*-\\s*(.+?)\\s*$'] },
    { p: 'staad', a: 'STAAD', f: [FILE, '\\[([^\\]]+)\\]', '^STAAD[^-]*-\\s*(.+?)\\s*$'] },
    { p: '^tekla', a: 'Tekla', f: [FILE, '^Tekla Structures[^-]*-\\s*(.+?)(?:\\s+-\\s+.*)?$'] },
    { p: '^3dsmax', a: '3ds Max', f: [FILE, '^(.+?)\\s+-\\s+Autodesk 3ds Max'] },
    { p: '^archicad', a: 'ArchiCAD', f: [FILE, '^(.+?)\\s+-\\s+.*Archicad'] },
    { p: '^rhino', a: 'Rhino', f: [FILE, '^(.+?)\\s+-\\s+Rhino'] },
    { p: '^roamer$', a: 'Navisworks', f: [FILE] },
    { p: '^photoshop$', a: 'Photoshop', f: [FILE] },
    { p: '^(lumion|enscape|vray|twinmotion|d5)', a: 'Rendering', f: [FILE, '^(?:Lumion|Twinmotion|D5 Render|Enscape)[^-]*-\\s*(.+?)\\s*$', '^(.+?)\\s+-\\s+(?:Lumion|Twinmotion|D5 Render|Enscape)'] },
    { p: '^excel$', a: 'Excel', f: [FILE, '^(.+?)(?:\\s+-\\s+(?:Compatibility Mode|Read-Only|Protected View|AutoRecovered|Saved|Saving|Shared|Repaired)[^-]*)*\\s+-\\s+(?:Microsoft\\s+)?Excel'] },
    { p: '^winword$', a: 'Word', f: [FILE, '^(.+?)(?:\\s+-\\s+(?:Compatibility Mode|Read-Only|Protected View|AutoRecovered|Saved|Saving|Shared|Repaired)[^-]*)*\\s+-\\s+(?:Microsoft\\s+)?Word'] },
    { p: '^powerpnt$', a: 'PowerPoint', f: [FILE, '^(.+?)(?:\\s+-\\s+(?:Compatibility Mode|Read-Only|Protected View|AutoRecovered|Saved|Saving|Shared|Repaired)[^-]*)*\\s+-\\s+(?:Microsoft\\s+)?PowerPoint'] },
    { p: '^winproj$', a: 'MS Project', f: [FILE, '^(.+?)\\s+-\\s+(?:Microsoft\\s+)?Project'] },
    { p: '^(acrobat|acrord32|foxitpdfreader|foxitphantom|foxitpdfeditor|revu|sumatrapdf|pdfxedit)$', a: 'PDF reader', f: [FILE] },
    { p: '^(chrome|msedge|firefox|brave|opera|iexplore)$', a: 'Browser', f: [], web: 1 },
    { p: '^whatsapp', a: 'WhatsApp', f: [] },
    { p: '^buildmitr$', a: 'BuildMitr', f: [] },
    { p: '^explorer$', a: 'Windows', f: [] },
  ],
  // names that are not real files (new unsaved documents)
  skip: '^(book|document|presentation|project|drawing|untitled|sheet|new project)\\s*\\d*(\\.\\w+)?$'
};
let R = null;
function setRules(r) {
  try {
    if (!r || !Array.isArray(r.apps) || (R && (r.v || 0) < R.v)) return false;
    const apps = r.apps.map(x => ({ p: new RegExp(x.p, 'i'), a: String(x.a).slice(0, 40), f: (x.f || []).map(f => new RegExp(f, 'i')), web: !!x.web }));
    R = { v: r.v || 0, apps, skip: new RegExp(r.skip || RULES.skip, 'i'), file: new RegExp(r.file || FILE, 'i') };
    return true;
  } catch (_) { return false; }
}
setRules(RULES);
function clean(f) {
  f = String(f || '');
  // drop a leading program name / version ("Autodesk Revit 2024 - ", "ETABS Ultimate 21.0.0 - ")
  for (let i = 0; i < 3; i++) { const k = f.indexOf(' - '); if (k < 0 || !/autodesk|etabs|safe|sap2000|staad|tekla|adobe|acrobat|microsoft|foxit|revu|version|\b(19|20)\d\d\b|\d+\.\d+/i.test(f.slice(0, k))) break; f = f.slice(k + 3); }
  f = f.replace(/^\*+|\*+$/g, '').replace(/\s*\[(?:read[- ]only|compatibility mode)\]\s*/ig, ' ').replace(/\s+/g, ' ').trim();
  if (!f || f.length < 2 || R.skip.test(f)) return '';
  return f.slice(0, 120);
}
function classify(proc, title) {
  proc = String(proc || ''); title = String(title || '');
  if (!proc || /^(lockapp|logonui|screensaver)$/i.test(proc)) return null;
  for (const x of R.apps) {
    if (!x.p.test(proc)) continue;
    if (x.web) {
      if (/youtube/i.test(title)) return { app: 'YouTube', file: '' };
      if (/buildmitr/i.test(title)) return { app: 'BuildMitr', file: '' };
      if (/whatsapp/i.test(title)) return { app: 'WhatsApp', file: '' };
      const g = title.match(/^(.+?)\s+-\s+Google (Sheets|Docs|Slides)/i);
      if (g) return { app: 'Google ' + g[2][0].toUpperCase() + g[2].slice(1).toLowerCase(), file: clean(g[1]) };
      const w = title.match(R.file); return { app: x.a, file: w ? clean(w[1]) : '' };
    }
    let file = '';
    for (const re of x.f) { const m = title.match(re); if (m && m[1] && (file = clean(m[1]))) break; }
    return { app: x.a, file };
  }
  // any other program: still keep the file name when the title shows one (e.g. a drawing viewer)
  const m = title.match(R.file);
  return { app: 'Other: ' + proc.slice(0, 40), file: m ? clean(m[1]) : '' };
}
const day = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

class Tracker {
  constructor(app, powerMonitor) {
    this.pm = powerMonitor; this.on = false; this.fg = null; this.ps = null;
    this.file = path.join(app.getPath('userData'), 'worktime.json');
    this.st = { buf: {}, pending: [] };
    try { this.st = Object.assign(this.st, JSON.parse(fs.readFileSync(this.file, 'utf8'))); } catch (_) {}
    this.timer = setInterval(() => this.sample(), STEP * 1000);
  }
  save() { try { fs.writeFileSync(this.file, JSON.stringify(this.st)); } catch (_) {} }
  start() {
    if (this.on) return; this.on = true; this.spawn();
  }
  stop() { this.on = false; if (this.ps) { try { this.ps.kill(); } catch (_) {} this.ps = null; } }
  spawn() {
    if (!this.on || this.ps || process.platform !== 'win32') return;
    const enc = Buffer.from(PS, 'utf16le').toString('base64');
    const ps = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', enc], { windowsHide: true });
    this.ps = ps; let rest = '';
    ps.stdout.on('data', b => { rest += b.toString('utf8'); const L = rest.split(/\r?\n/); rest = L.pop();
      const last = L.filter(Boolean).pop(); if (last) { const [p, ...t] = last.split('\t'); this.fg = { p, t: t.join(' '), at: Date.now() }; } });
    ps.on('exit', () => { this.ps = null; if (this.on) setTimeout(() => this.spawn(), 30000); });
    ps.on('error', () => {});
  }
  sample() {
    if (!this.on) return;
    let state = 'active';
    try { state = this.pm.getSystemIdleState(IDLE_AFTER); } catch (_) {}
    if (state === 'locked') return;                       // screen locked: not counted at all
    const fg = this.fg && Date.now() - this.fg.at < 60000 ? this.fg : null;
    const c = fg ? classify(fg.p, fg.t) : null; if (!c) return;
    const d = day(), k = d + '|' + c.app + '|' + c.file, now = Date.now();
    const b = this.st.buf[k] || (this.st.buf[k] = { date: d, app: c.app, file: c.file, act: 0, idle: 0, first: now, last: now });
    if (state === 'idle') b.idle += STEP; else b.act += STEP;
    b.last = now; this.save();
  }
  // a batch for the BuildMitr page to save on the server (kept here until the page confirms)
  take() {
    const items = Object.values(this.st.buf);
    if (items.length) { this.st.pending.push({ seq: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), pc: os.hostname(), items }); this.st.buf = {}; }
    this.st.pending = this.st.pending.slice(-200); this.save();
    return this.st.pending.slice(0, 20);
  }
  ack(seq) { this.st.pending = this.st.pending.filter(x => x.seq !== seq); this.save(); }
}
module.exports = { Tracker, classify, PS, RULES, setRules };
