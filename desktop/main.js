// BuildMitr for Windows: opens the BuildMitr web app in its own window (always the latest version),
// and — when the company admin switches it on — records work time in AutoCAD, SketchUp, Revit and other programs.
const { app, BrowserWindow, shell, session, Tray, Menu, nativeImage, ipcMain, powerMonitor } = require('electron');
const path = require('path');
const APP_URL = 'https://buildmitr.github.io/buildmitr_1/';
const ORIGIN = new URL(APP_URL).origin;
const HIDDEN = process.argv.includes('--hidden');   // started with Windows: stay in the tray
let win = null, tray = null, tracker = null, quitting = false, who = { user: '', org: '' };

if (!app.requestSingleInstanceLock()) { app.quit(); }
app.on('second-instance', () => showWin());
app.setAppUserModelId('com.buildmitr.app');

const inApp = u => { try { const x = new URL(u); return x.origin === ORIGIN && x.pathname.startsWith('/buildmitr_1'); } catch (_) { return false; } };
const openOutside = u => { if (/^(https?:|mailto:|tel:|whatsapp:)/i.test(u)) shell.openExternal(u); };
const icon = () => nativeImage.createFromPath(path.join(__dirname, 'build', 'icon.png'));
function showWin() { if (!win) return createWindow(true); if (win.isMinimized()) win.restore(); win.show(); win.focus(); }

function createWindow(show) {
  win = new BrowserWindow({
    width: 1366, height: 860, minWidth: 360, minHeight: 500,
    title: 'BuildMitr', icon: icon(),
    backgroundColor: '#f4f6f5', autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, spellcheck: true, preload: path.join(__dirname, 'preload.js'), backgroundThrottling: false }
  });
  if (show) { win.maximize(); win.once('ready-to-show', () => win.show()); }
  // WhatsApp, email, Drive files, maps… open in the normal browser / app; BuildMitr pages stay here
  win.webContents.setWindowOpenHandler(({ url }) => { if (inApp(url)) { win.loadURL(url); } else openOutside(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!inApp(url) && !/^file:/.test(url)) { e.preventDefault(); openOutside(url); } });
  // no internet on the very first start: show a retry page (after one visit the app also works offline)
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => { if (isMain && code !== -3) win.loadFile(path.join(__dirname, 'offline.html')); });
  // while work time is recorded, closing the window keeps BuildMitr running in the tray
  win.on('close', e => { if (!quitting && tracker && tracker.on) { e.preventDefault(); win.hide(); } });
  win.on('closed', () => { win = null; });
  win.loadURL(APP_URL + '?src=win');
}

function trayMenu() {
  if (!tracker || !tracker.on) { if (tray) { tray.destroy(); tray = null; } return; }
  if (!tray) { tray = new Tray(icon().resize({ width: 16, height: 16 })); tray.on('click', showWin); }
  tray.setToolTip(`BuildMitr — work time is being recorded${who.user ? ' for ' + who.user : ''}`);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open BuildMitr', click: showWin },
    { label: `Work time recorded for ${who.user || 'this user'}${who.org ? ' (' + who.org + ')' : ''}`, enabled: false },
    { label: 'Programs and drawing file names only — no screenshots', enabled: false },
    { type: 'separator' },
    { label: 'Quit BuildMitr', click: () => { quitting = true; app.quit(); } }
  ]));
}

// the page says whether this company records work time and who is signed in
ipcMain.on('bm-track', (_e, info) => {
  who = { user: info.user, org: info.org };
  if (info.on) {
    tracker.start();
    try { app.setLoginItemSettings({ openAtLogin: true, args: ['--hidden'] }); } catch (_) {}
  } else if (tracker.on) {
    tracker.stop();
    try { app.setLoginItemSettings({ openAtLogin: false }); } catch (_) {}
  }
  trayMenu(); send();
});
ipcMain.on('bm-ack', (_e, seq) => tracker.ack(seq));
// PC or laptop: a laptop has a battery
let devKind = null;
ipcMain.handle('bm-device', () => devKind || new Promise(ok => {
  if (process.platform !== 'win32') return ok('PC / Laptop');
  require('child_process').execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', '(Get-CimInstance Win32_Battery | Measure-Object).Count'], { windowsHide: true, timeout: 15000 },
    (err, out) => { devKind = err ? 'PC / Laptop' : (parseInt(String(out).trim(), 10) > 0 ? 'Laptop' : 'PC'); ok(devKind); });
}));
function send() { if (win && tracker && tracker.on) { const b = tracker.take(); if (b.length) win.webContents.send('bm-work', b); } }

// newer rules for reading file names from window titles come from the BuildMitr website (no reinstall needed)
function rulesLoad(setRules) {
  const fs = require('fs'), f = path.join(app.getPath('userData'), 'track-rules.json');
  try { setRules(JSON.parse(fs.readFileSync(f, 'utf8'))); } catch (_) {}
  try {
    require('electron').net.fetch(APP_URL + 'track-rules.json?t=' + Date.now()).then(r => r.ok ? r.json() : null)
      .then(j => { if (j && setRules(j)) fs.writeFileSync(f, JSON.stringify(j)); }).catch(() => {});
  } catch (_) {}
}
// the app updates itself from the "windows-latest" release: downloads quietly, installs when BuildMitr is closed
function autoUpdate() {
  if (!app.isPackaged) return;
  try {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true; autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.on('error', () => {});
    const go = () => autoUpdater.checkForUpdates().catch(() => {});
    setTimeout(go, 60 * 1000); setInterval(go, 6 * 3600 * 1000);
  } catch (_) {}
}

app.whenReady().then(() => {
  const { Tracker, setRules } = require('./tracker');
  tracker = new Tracker(app, powerMonitor);
  rulesLoad(setRules); setInterval(() => rulesLoad(setRules), 6 * 3600 * 1000);
  autoUpdate();
  setInterval(send, 2 * 60 * 1000);
  // camera (site photos, QR scanning), notifications, clipboard and file saving are allowed for BuildMitr only
  const ok = ['media', 'notifications', 'clipboard-read', 'clipboard-sanitized-write', 'fullscreen', 'geolocation'];
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb, d) => cb(ok.includes(perm) && (!d || !d.requestingUrl || inApp(d.requestingUrl) || /^file:/.test(d.requestingUrl))));
  createWindow(!HIDDEN);
  app.on('activate', () => showWin());
});
app.on('before-quit', () => { quitting = true; try { send(); } catch (_) {} });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
