import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import Cliente from './clienteModel.js'
import Producto from './Producto.js'

const Pedido = sequelize.define('Pedido', {
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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'parcial', 'pagado', 'entregado', 'cancelado'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 0
  },
  descuento: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 0
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'pedidos'
})

// Establecer relaciones
Pedido.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  as: 'cliente'
})

Pedido.belongsToMany(Producto, {
  through: 'PedidoProductos',
  foreignKey: 'pedidoId',
  otherKey: 'productoId',
  as: 'productos'
})

export default Pedido