// BuildMitr for Windows: opens the BuildMitr web app in its own window (always the latest version).
const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');
const APP_URL = 'https://buildmitr.github.io/buildmitr_1/';
const ORIGIN = new URL(APP_URL).origin;
let win = null;

if (!app.requestSingleInstanceLock()) { app.quit(); }
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.setAppUserModelId('com.buildmitr.app');

const inApp = u => { try { const x = new URL(u); return x.origin === ORIGIN && x.pathname.startsWith('/buildmitr_1'); } catch (_) { return false; } };
const openOutside = u => { if (/^(https?:|mailto:|tel:|whatsapp:)/i.test(u)) shell.openExternal(u); };

function createWindow() {
  win = new BrowserWindow({
    width: 1366, height: 860, minWidth: 360, minHeight: 500,
    title: 'BuildMitr', icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#f4f6f5', autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, spellcheck: true }
  });
  win.maximize();
  win.once('ready-to-show', () => win.show());
  // WhatsApp, email, Drive files, maps… open in the normal browser / app; BuildMitr pages stay here
  win.webContents.setWindowOpenHandler(({ url }) => { if (inApp(url)) { win.loadURL(url); } else openOutside(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!inApp(url) && !/^file:/.test(url)) { e.preventDefault(); openOutside(url); } });
  // no internet on the very first start: show a retry page (after one visit the app also works offline)
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (isMain && code !== -3) win.loadFile(path.join(__dirname, 'offline.html'));
  });
  win.loadURL(APP_URL + '?src=win');
}

app.whenReady().then(() => {
  // camera (site photos, QR scanning), notifications, clipboard and file saving are allowed for BuildMitr only
  const ok = ['media', 'notifications', 'clipboard-read', 'clipboard-sanitized-write', 'fullscreen', 'geolocation'];
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb, d) => cb(ok.includes(perm) && (!d || !d.requestingUrl || inApp(d.requestingUrl) || /^file:/.test(d.requestingUrl))));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
