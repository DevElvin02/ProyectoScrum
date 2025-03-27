import { ipcMain } from 'electron'
import { Cliente } from '../models/clienteModel'

// Crear cliente
ipcMain.handle('cliente:create', async (_, data) => {
  try {
    const cliente = await Cliente.create(data)
    return cliente
  } catch (error) {
    console.error('Error creating cliente:', error)
    throw error
  }
})

// Obtener todos los clientes
ipcMain.handle('cliente:getAll', async () => {
  try {
    const clientes = await Cliente.findAll()
    return clientes
  } catch (error) {
    console.error('Error fetching clientes:', error)
    throw error
  }
})

// Obtener cliente por ID
ipcMain.handle('cliente:getById', async (_, id) => {
  try {
    const cliente = await Cliente.findByPk(id)
    return cliente
  } catch (error) {
    console.error('Error fetching cliente:', error)
    throw error
  }
})

// Actualizar cliente
ipcMain.handle('cliente:update', async (_, { id, data }) => {
  try {
    const cliente = await Cliente.findByPk(id)
    if (cliente) {
      await cliente.update(data)
      return cliente
    }
    return null
  } catch (error) {
    console.error('Error updating cliente:', error)
    throw error
  }
})

// Eliminar cliente
ipcMain.handle('cliente:delete', async (_, id) => {
  try {
    const cliente = await Cliente.findByPk(id)
    if (cliente) {
      await cliente.destroy()
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting cliente:', error)
    throw error
  }
})
