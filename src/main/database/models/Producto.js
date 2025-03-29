import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import Proveedor from './Proveedor.js'

const Producto = sequelize.define('Producto', {
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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  stockMinimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: 0
    }
  },
  proveedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proveedor,
      key: 'id'
    }
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo', 'descontinuado'),
    defaultValue: 'activo'
  }
}, {
  timestamps: true,
  tableName: 'productos'
})

// Establecer relaciones
Producto.belongsTo(Proveedor, {
  foreignKey: 'proveedorId',
  as: 'proveedor'
})

export default Producto