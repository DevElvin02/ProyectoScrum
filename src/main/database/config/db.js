// src/main/database/db.js
import { Sequelize } from 'sequelize'
import { app } from 'electron'
import path from 'path'
import { is } from '@electron-toolkit/utils'
console.log(path.join(app.getPath('userData'), 'database.sqlite'))

// Configurar la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(app.getPath('userData'), 'database.sqlite'),
  logging:  false, //Logs solo en desarrollo
  define: {
    freezeTableName: true
  },
  // Agregar estas opciones para mejor manejo de conexiones
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// Función para inicializar la base de datos
async function connectDatabase() {
  try {
    // Verificar conexión
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida correctamente.')

    // Sincronizar modelos
    await sequelize.sync({ alter: true })
    console.log('Modelos sincronizados correctamente.')

    return sequelize
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error)
    throw error
  }
}

// Cerrar base de datos
async function closeDatabase() {
  try {
    if (sequelize) { // Removido this.
      await sequelize.close()
      console.log('Conexión a la base de datos cerrada correctamente.')
    }
  } catch (error) {
    console.error('Error al cerrar la conexión:', error)
    throw error
  }
}

export { sequelize, connectDatabase, closeDatabase }
