// Lets the BuildMitr page talk to the Windows app (work time tracker); nothing else is exposed.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('bmDesk', {
  version: '1.2.0',
  device: () => ipcRenderer.invoke('bm-device'),
  track: info => ipcRenderer.send('bm-track', { on: !!(info && info.on), user: String((info && info.user) || ''), org: String((info && info.org) || '') }),
  onWork: cb => ipcRenderer.on('bm-work', (_e, batch) => { try { cb(batch); } catch (_) {} }),
  ack: seq => ipcRenderer.send('bm-ack', String(seq || ''))
});
