// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron'

// Exponer métodos de IPC al frontend
contextBridge.exposeInMainWorld('electronAPI', {
  getAllClient: () => ipcRenderer.invoke('cliente:getAll')
  // getById: (id) => ipcRenderer.invoke('controller:getById', id),
  // create: (data) => ipcRenderer.invoke('controller:create', data)
  // update: (id, data) => ipcRenderer.invoke('controller:update', { id, data }),
  // delete: (id) => ipcRenderer.invoke('controller:delete', id),
})
