// import { Pedido, Cliente, Producto, PagoParcial } from '../../models/'
import { ipcMain } from 'electron'
import Pedido from "../models/Pedido.js"

// class PedidoController {
//   // Crear un nuevo pedido
//   async crearPedido(pedidoData) {
//     try {
//       const pedido = await Pedido.create(pedidoData)
//       return pedido
//     } catch (error) {
//       console.error('Error al crear pedido:', error)
//       throw error
//     }
//   }

//   // Obtener todos los pedidos
//   async obtenerPedidos() {
//     try {
//       const pedidos = await Pedido.findAll({
//         include: [
//           { model: Cliente },
//           { model: Producto },
//           { model: PagoParcial }
//         ]
//       })
//       return pedidos
//     } catch (error) {
//       console.error('Error al obtener pedidos:', error)
//       throw error
//     }
//   }

//   // Obtener un pedido por ID
//   async obtenerPedidoPorId(id) {
//     try {
//       const pedido = await Pedido.findByPk(id, {
//         include: [
//           { model: Cliente },
//           { model: Producto },
//           { model: PagoParcial }
//         ]
//       })
//       return pedido
//     } catch (error) {
//       console.error('Error al obtener pedido:', error)
//       throw error
//     }
//   }

//   // Actualizar estado del pedido
//   async actualizarEstadoPedido(id, estado) {
//     try {
//       const pedido = await Pedido.findByPk(id)
//       if (!pedido) {
//         throw new Error('Pedido no encontrado')
//       }
//       pedido.estado = estado
//       await pedido.save()
//       return pedido
//     } catch (error) {
//       console.error('Error al actualizar estado:', error)
//       throw error
//     }
//   }

//   // Registrar pago parcial
//   async registrarPagoParcial(pedidoId, monto) {
//     try {
//       const pedido = await Pedido.findByPk(pedidoId)
//       if (!pedido) {
//         throw new Error('Pedido no encontrado')
//       }
      
//       const pagoParcial = await PagoParcial.create({
//         pedidoId,
//         monto,
//         fecha: new Date()
//       })
      
//       return pagoParcial
//     } catch (error) {
//       console.error('Error al registrar pago parcial:', error)
//       throw error
//     }
//   }

//   // Eliminar pedido
//   async eliminarPedido(id) {
//     try {
//       const resultado = await Pedido.destroy({
//         where: { id }
//       })
//       return resultado
//     } catch (error) {
//       console.error('Error al eliminar pedido:', error)
//       throw error
//     }
//   }
// }

// Crear pedido
ipcMain.handle('pedido:create', async (_, data) => {
  try {
    const pedido = await Pedido.create(data)
    return pedido
  } catch (error) {
    console.error('Error creating pedido:', error)
    throw error
  }
})

// Obtener todos los pedidos
ipcMain.handle('pedido:getAll', async () => {
  try {
    const pedidos = await Pedido.findAll()
    return pedidos
  } catch (error) {
    console.error('Error fetching pedidos:', error)
    throw error
  }
})

// Obtener pedido por ID
ipcMain.handle('pedido:getById', async (_, id) => {
  try {
    const pedido = await Pedido.findByPk(id)
    return pedido
  } catch (error) {
    console.error('Error fetching pedido:', error)
    throw error
  }
})

// Actualizar estado del pedido
ipcMain.handle('pedido:updateStatus', async (_, { id, estado }) => {
  try {
    const pedido = await Pedido.findByPk(id)
    if (pedido) {
      await pedido.update({ estado })
      return pedido
    }
    return null
  } catch (error) {
    console.error('Error updating pedido status:', error)
    throw error
  }
})

// Registrar pago parcial
ipcMain.handle('pedido:registerPayment', async (_, { pedidoId, monto }) => {
  try {
    const pedido = await Pedido.findByPk(pedidoId)
    if (pedido) {
      const nuevoPagado = pedido.pagado + monto
      await pedido.update({ pagado: nuevoPagado })
      return pedido
    }
    return null
  } catch (error) {
    console.error('Error registering payment:', error)
    throw error
  }
})

// Eliminar pedido
ipcMain.handle('pedido:delete', async (_, id) => {
  try {
    const pedido = await Pedido.findByPk(id)
    if (pedido) {
      await pedido.destroy()
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting pedido:', error)
    throw error
  }
})

// export default new PedidoController()