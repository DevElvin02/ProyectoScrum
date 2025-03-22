import { ipcMain } from 'electron'
import { db } from '../config/db'

export default function dbSystem() {
  // Crear un nuevo item
  ipcMain.handle('createItem', (_, { name, description }) => {
    try {
      const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)')
      const result = stmt.run(name, description)
      return result.lastInsertRowid // Retorna el ID del nuevo item
    } catch (error) {
      console.error('Error creating item:', error)
      throw error // Relanzar el error para que el frontend lo maneje
    }
  })

  // Leer todos los items
  ipcMain.handle('getItems', () => {
    try {
      return db.prepare('SELECT * FROM items').all()
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  })

  // Actualizar un item
  ipcMain.handle('updateItem', (_, { id, name, description }) => {
    try {
      const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?')
      const result = stmt.run(name, description, id)
      return result.changes > 0 // Retorna true si se actualizó correctamente
    } catch (error) {
      console.error('Error updating item:', error)
      throw error
    }
  })

  // Eliminar un item
  ipcMain.handle('deleteItem', (_, id) => {
    try {
      const stmt = db.prepare('DELETE FROM items WHERE id = ?')
      const result = stmt.run(id)
      return result.changes > 0 // Retorna true si se eliminó correctamente
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  })
}
