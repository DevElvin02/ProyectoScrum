import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import Pedido from './Pedido.js'

const PagoParcial = sequelize.define('PagoParcial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pedido,
      key: 'id'
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia'),
    allowNull: false,
    defaultValue: 'efectivo'
  },
  comprobante: {
    type: DataTypes.STRING,
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'pagos_parciales'
})

// Establecer relación con Pedido
PagoParcial.belongsTo(Pedido, {
  foreignKey: 'pedidoId',
  as: 'pedido'
})

export default PagoParcial