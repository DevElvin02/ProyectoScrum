// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron'

// Exponer métodos de IPC al frontend
contextBridge.exposeInMainWorld('electronAPI', {
  getAllMaterials: () => ipcRenderer.invoke('material:getAll'),
  getMaterialById: (id) => ipcRenderer.invoke('material:getById', id),
  createMaterial: (data) => ipcRenderer.invoke('material:create', data),
  // updateMaterial: (id, data) => ipcRenderer.invoke('material:update', { id, data }),
  // deleteMaterial: (id) => ipcRenderer.invoke('material:delete', id),

})
