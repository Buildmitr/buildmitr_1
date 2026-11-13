// CI check on Windows: the PowerShell part of the work tracker runs and reports the window in front.
const { spawn } = require('child_process');
const { PS, classify } = require('./tracker');
// file names read from window titles of the main programs
const CASES = [
  ['acad', 'Autodesk AutoCAD 2024 - [Tharun STR Details.dwg]', 'AutoCAD', 'Tharun STR Details.dwg'],
  ['Revit', 'Autodesk Revit 2024 - [Tharun WD - Floor Plan: Level 1]', 'Revit', 'Tharun WD'],
  ['Revit', 'Autodesk Revit 2024 - Tharun WD.rvt - 3D View: {3D}', 'Revit', 'Tharun WD.rvt'],
  ['EXCEL', 'Tharun BOQ - Excel', 'Excel', 'Tharun BOQ'],
  ['EXCEL', 'Book1 - Excel', 'Excel', ''],
  ['ETABS', 'ETABS Ultimate 21.0.0 - Tharun G+3.EDB', 'ETABS', 'Tharun G+3.EDB'],
  ['SketchUp', 'Tharun Elevation - SketchUp Pro 2023', 'SketchUp', 'Tharun Elevation'],
  ['chrome', 'Tharun BOQ - Google Sheets - Google Chrome', 'Google Sheets', 'Tharun BOQ'],
];
let bad = 0;
for (const [p, t, a, f] of CASES) { const c = classify(p, t); if (c.app !== a || c.file !== f) { bad++; console.log('WRONG', p, t, JSON.stringify(c)); } }
console.log('title cases:', CASES.length - bad + '/' + CASES.length);
if (bad) process.exit(1);
if (process.platform !== 'win32') process.exit(0);
const p = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', Buffer.from(PS, 'utf16le').toString('base64')], { windowsHide: true });
let out = '', err = '';
p.stdout.on('data', b => out += b); p.stderr.on('data', b => err += b);
setTimeout(() => {
  p.kill();
  const L = out.split(/\r?\n/).filter(x => x.includes('\t'));
  console.log('lines:', L.length, JSON.stringify(L.slice(0, 3)), JSON.stringify(L.slice(0, 1).map(l => classify(...l.split('\t')))));
  if (err) console.log('stderr:', err.slice(0, 1500));
  require('child_process').execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', '(Get-CimInstance Win32_Battery | Measure-Object).Count'], { windowsHide: true }, (e, o) => { console.log('battery count:', e ? 'error ' + e.message : String(o).trim()); process.exit(L.length >= 2 && !e ? 0 : 1); });
}, 16000);
