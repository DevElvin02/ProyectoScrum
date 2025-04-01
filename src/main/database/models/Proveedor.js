import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Proveedor = sequelize.define(
  'Proveedor',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    supplyType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: 'proveedores'
  }
)

// Relaciones se definirán en el archivo index.js de models

export default Proveedor
