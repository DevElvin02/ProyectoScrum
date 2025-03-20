// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron'

// Exponer métodos de IPC al frontend
contextBridge.exposeInMainWorld('electronAPI', {
  createItem: (data) => ipcRenderer.invoke('createItem', data),
  getItems: () => ipcRenderer.invoke('getItems'),
  updateItem: (data) => ipcRenderer.invoke('updateItem', data),
  deleteItem: (id) => ipcRenderer.invoke('deleteItem', id)
})
