// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron'

// Exponer métodos de IPC al frontend
contextBridge.exposeInMainWorld('electronAPI', {
  // Cliente handlers
  getAllClients: () => ipcRenderer.invoke('cliente:getAll'),
  getClientById: (id) => ipcRenderer.invoke('cliente:getById', id),
  createClient: (data) => ipcRenderer.invoke('cliente:create', data),
  updateClient: (id, data) => ipcRenderer.invoke('cliente:update', { id, data }),
  deleteClient: (id) => ipcRenderer.invoke('cliente:delete', id),

  // Producto handlers
  getAllProducts: () => ipcRenderer.invoke('producto:getAll'),
  getProductById: (id) => ipcRenderer.invoke('producto:getById', id),
  createProduct: (data) => ipcRenderer.invoke('producto:create', data),
  updateProduct: (id, data) => ipcRenderer.invoke('producto:update', { id, data }),
  deleteProduct: (id) => ipcRenderer.invoke('producto:delete', id),
  updateProductStock: (id, cantidad) => ipcRenderer.invoke('producto:updateStock', { id, cantidad }),
  setCustomPrice: (productoId, clienteId, precio) => ipcRenderer.invoke('producto:setCustomPrice', { productoId, clienteId, precio }),

  // Pedido handlers
  getAllOrders: () => ipcRenderer.invoke('pedido:getAll'),
  getOrderById: (id) => ipcRenderer.invoke('pedido:getById', id),
  createOrder: (data) => ipcRenderer.invoke('pedido:create', data),
  updateOrderStatus: (id, estado) => ipcRenderer.invoke('pedido:updateStatus', { id, estado }),
  registerPartialPayment: (pedidoId, monto) => ipcRenderer.invoke('pedido:registerPayment', { pedidoId, monto }),
  deleteOrder: (id) => ipcRenderer.invoke('pedido:delete', id),

  // Proveedor handlers
  getAllProviders: () => ipcRenderer.invoke('proveedor:getAll'),
  getProviderById: (id) => ipcRenderer.invoke('proveedor:getById', id),
  createProvider: (data) => ipcRenderer.invoke('proveedor:create', data),
  updateProvider: (id, data) => ipcRenderer.invoke('proveedor:update', { id, data }),
  deleteProvider: (id) => ipcRenderer.invoke('proveedor:delete', id),
  getProviderProducts: (id) => ipcRenderer.invoke('proveedor:getProducts', id)
})
