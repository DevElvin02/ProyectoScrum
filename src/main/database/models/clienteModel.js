import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db'

const Cliente = sequelize.define('Client', {
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
  frecuente: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
})

export default Cliente;