import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db'

export const Cliente = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
})
