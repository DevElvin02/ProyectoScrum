// src/main/database/db.js
import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { TableOne } from '../schemas/TableOne'
import { TableTwo } from '../schemas/TableTwo'
import { TableThree } from '../schemas/TableThree'
import { schemaUser } from '../schemas/schemaUser'
import itemHandlers from '../ipcHandlers/itemHandlers'

// Ruta de la base de datos
const dbPath = path.join(app.getPath('userData'), 'database.db')
console.log('database path: ', app.getPath('userData'))

// Verificar si la base de datos existe, si no, crearla
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '') // Crear un archivo vacío
}

// Crear o abrir la base de datos
const db = new Database(dbPath, {
  verbose: console.log // Log de consultas SQL (opcional, útil en desarrollo)
})

// Asegurar una única instancia de la base de datos
let isInitialized = false

function initializeDatabase() {
  if (isInitialized) return

  try {
    // Ejecutar el esquema para crear las tablas //ESTO ES UN EJEMPLO
    db.exec(TableOne)
    db.exec(TableTwo)
    db.exec(TableThree)
    db.exec(schemaUser)

    console.log('Database initialized successfully.')

    // Inicializar los handlers ////ESTO ES UN EJEMPLO
    itemHandlers()

    isInitialized = true
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error // Relanzar el error para que la aplicación falle claramente
  }
}

// Exportar la base de datos y funciones útiles
export { db, initializeDatabase }
