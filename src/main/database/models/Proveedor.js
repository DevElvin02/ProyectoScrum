import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Proveedor = sequelize.define('Proveedor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruc: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [11, 11]
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
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
  contacto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  timestamps: true,
  tableName: 'proveedores'
})

// Relaciones se definirán en el archivo index.js de models

export default Proveedor