import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import Cliente from './Cliente.js'
import Producto from './Producto.js'

const PrecioPersonalizado = sequelize.define('PrecioPersonalizado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'precios_personalizados',
  indexes: [
    {
      unique: true,
      fields: ['clienteId', 'productoId']
    }
  ]
})

// Establecer relaciones
PrecioPersonalizado.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  as: 'cliente'
})

PrecioPersonalizado.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
})

export default PrecioPersonalizado