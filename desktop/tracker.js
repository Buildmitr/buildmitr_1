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

const APPS = [
  [/^acad(lt)?$/i, 'AutoCAD', /([^\\/\[\]:*?"<>|]+\.dwg)/i],
  [/^sketchup/i, 'SketchUp', /([^\\/\[\]:*?"<>|]+\.skp)/i],
  [/^revit$/i, 'Revit', /([^\\/\[\]:*?"<>|]+\.(rvt|rfa|rte))/i],
  [/^etabs/i, 'ETABS', /([^\\/\[\]:*?"<>|]+\.edb)/i],
  [/^(excel)$/i, 'Excel', /([^\\/\[\]:*?"<>|]+\.(xlsx|xlsm|xls|csv))/i],
  [/^winword$/i, 'Word', /([^\\/\[\]:*?"<>|]+\.(docx|doc))/i],
  [/^(acrobat|acrord32|foxitpdfreader|foxitphantom)$/i, 'PDF reader', /([^\\/\[\]:*?"<>|]+\.pdf)/i],
  [/^(chrome|msedge|firefox|brave|opera|iexplore)$/i, 'Browser', null],
  [/^whatsapp/i, 'WhatsApp', null],
  [/^buildmitr$/i, 'BuildMitr', null],
  [/^(lumion|enscape|vray|twinmotion|d5)/i, 'Rendering', null],
];
function classify(proc, title) {
  proc = String(proc || ''); title = String(title || '');
  if (!proc || /^(lockapp|logonui|screensaver)$/i.test(proc)) return null;
  for (const [re, app, fre] of APPS) {
    if (!re.test(proc)) continue;
    let file = '';
    if (fre) { const m = title.match(fre); if (m) file = m[1].trim().slice(0, 120); }
    if (app === 'Browser' && /youtube/i.test(title)) return { app: 'YouTube', file: '' };
    if (app === 'Browser' && /buildmitr/i.test(title)) return { app: 'BuildMitr', file: '' };
    if (app === 'Browser' && /web\.whatsapp|whatsapp/i.test(title)) return { app: 'WhatsApp', file: '' };
    return { app, file };
  }
  if (/^explorer$/i.test(proc)) return { app: 'Windows', file: '' };
  return { app: 'Other: ' + proc.slice(0, 40), file: '' };
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
module.exports = { Tracker, classify, PS };
