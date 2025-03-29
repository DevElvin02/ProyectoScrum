// import { Producto, Proveedor, PrecioPersonalizado } from '../../models/index.js'
import { ipcMain } from 'electron'
import Producto from '../models/Producto.js'


// Crear producto
ipcMain.handle('producto:create', async (_, data) => {
  try {
    const producto = await Producto.create(data)
    return producto
  } catch (error) {
    console.error('Error creating producto:', error)
    throw error
  }
})

// Obtener todos los productos
ipcMain.handle('producto:getAll', async () => {
  try {
    const productos = await Producto.findAll()
    return productos
  } catch (error) {
    console.error('Error fetching productos:', error)
    throw error
  }
})

// Obtener producto por ID
ipcMain.handle('producto:getById', async (_, id) => {
  try {
    const producto = await Producto.findByPk(id)
    return producto
  } catch (error) {
    console.error('Error fetching producto:', error)
    throw error
  }
})

// Actualizar producto
ipcMain.handle('producto:update', async (_, { id, data }) => {
  try {
    const producto = await Producto.findByPk(id)
    if (producto) {
      await producto.update(data)
      return producto
    }
    return null
  } catch (error) {
    console.error('Error updating producto:', error)
    throw error
  }
})

// Actualizar stock de producto
ipcMain.handle('producto:updateStock', async (_, { id, cantidad }) => {
  try {
    const producto = await Producto.findByPk(id)
    if (producto) {
      await producto.update({ stock: cantidad })
      return producto
    }
    return null
  } catch (error) {
    console.error('Error updating producto stock:', error)
    throw error
  }
})

// Eliminar producto
ipcMain.handle('producto:delete', async (_, id) => {
  try {
    const producto = await Producto.findByPk(id)
    if (producto) {
      await producto.destroy()
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting producto:', error)
    throw error
  }
})

// class ProductoController {
//   // Crear un nuevo producto
//   async crearProducto(productoData) {
//     try {
//       const producto = await Producto.create(productoData)
//       return producto
//     } catch (error) {
//       console.error('Error al crear producto:', error)
//       throw error
//     }
//   }

//   // Obtener todos los productos
//   async obtenerProductos() {
//     try {
//       const productos = await Producto.findAll({
//         include: [
//           { model: Proveedor },
//           { model: PrecioPersonalizado }
//         ]
//       })
//       return productos
//     } catch (error) {
//       console.error('Error al obtener productos:', error)
//       throw error
//     }
//   }

//   // Obtener un producto por ID
//   async obtenerProductoPorId(id) {
//     try {
//       const producto = await Producto.findByPk(id, {
//         include: [
//           { model: Proveedor },
//           { model: PrecioPersonalizado }
//         ]
//       })
//       return producto
//     } catch (error) {
//       console.error('Error al obtener producto:', error)
//       throw error
//     }
//   }

//   // Actualizar producto
//   async actualizarProducto(id, datos) {
//     try {
//       const producto = await Producto.findByPk(id)
//       if (!producto) {
//         throw new Error('Producto no encontrado')
//       }
//       await producto.update(datos)
//       return producto
//     } catch (error) {
//       console.error('Error al actualizar producto:', error)
//       throw error
//     }
//   }

//   // Actualizar stock
//   async actualizarStock(id, cantidad) {
//     try {
//       const producto = await Producto.findByPk(id)
//       if (!producto) {
//         throw new Error('Producto no encontrado')
//       }
//       producto.stock += cantidad
//       await producto.save()
//       return producto
//     } catch (error) {
//       console.error('Error al actualizar stock:', error)
//       throw error
//     }
//   }

//   // Establecer precio personalizado
//   async establecerPrecioPersonalizado(productoId, clienteId, precio) {
//     try {
//       const precioPersonalizado = await PrecioPersonalizado.create({
//         productoId,
//         clienteId,
//         precio
//       })
//       return precioPersonalizado
//     } catch (error) {
//       console.error('Error al establecer precio personalizado:', error)
//       throw error
//     }
//   }

//   // Eliminar producto
//   async eliminarProducto(id) {
//     try {
//       const resultado = await Producto.destroy({
//         where: { id }
//       })
//       return resultado
//     } catch (error) {
//       console.error('Error al eliminar producto:', error)
//       throw error
//     }
//   }
// }

// export default new ProductoController()