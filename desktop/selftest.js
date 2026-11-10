// CI check on Windows: the PowerShell part of the work tracker runs and reports the window in front.
const { spawn } = require('child_process');
const { PS, classify } = require('./tracker');
const p = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', Buffer.from(PS, 'utf16le').toString('base64')], { windowsHide: true });
let out = '', err = '';
p.stdout.on('data', b => out += b); p.stderr.on('data', b => err += b);
setTimeout(() => {
  p.kill();
  const L = out.split(/\r?\n/).filter(x => x.includes('\t'));
  console.log('lines:', L.length, JSON.stringify(L.slice(0, 3)), JSON.stringify(L.slice(0, 1).map(l => classify(...l.split('\t')))));
  if (err) console.log('stderr:', err.slice(0, 1500));
  process.exit(L.length >= 2 ? 0 : 1);
}, 16000);
