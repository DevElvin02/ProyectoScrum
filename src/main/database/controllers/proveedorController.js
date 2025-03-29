// import { Proveedor, Producto } from '../../models/index.js'
import { ipcMain } from 'electron'
import Proveedor from '../models/Proveedor.js'


// Crear proveedor
ipcMain.handle('proveedor:create', async (_, data) => {
  try {
    const proveedor = await Proveedor.create(data)
    return proveedor
  } catch (error) {
    console.error('Error creating proveedor:', error)
    throw error
  }
})

// Obtener todos los proveedores
ipcMain.handle('proveedor:getAll', async () => {
  try {
    const proveedores = await Proveedor.findAll()
    return proveedores
  } catch (error) {
    console.error('Error fetching proveedores:', error)
    throw error
  }
})

// Obtener proveedor por ID
ipcMain.handle('proveedor:getById', async (_, id) => {
  try {
    const proveedor = await Proveedor.findByPk(id)
    return proveedor
  } catch (error) {
    console.error('Error fetching proveedor:', error)
    throw error
  }
})

// Actualizar proveedor
ipcMain.handle('proveedor:update', async (_, { id, data }) => {
  try {
    const proveedor = await Proveedor.findByPk(id)
    if (proveedor) {
      await proveedor.update(data)
      return proveedor
    }
    return null
  } catch (error) {
    console.error('Error updating proveedor:', error)
    throw error
  }
})

// Obtener productos por proveedor
ipcMain.handle('proveedor:getProducts', async (_, id) => {
  try {
    const proveedor = await Proveedor.findByPk(id, {
      include: ['productos']
    })
    return proveedor ? proveedor.productos : []
  } catch (error) {
    console.error('Error fetching proveedor products:', error)
    throw error
  }
})

// Eliminar proveedor
ipcMain.handle('proveedor:delete', async (_, id) => {
  try {
    const proveedor = await Proveedor.findByPk(id)
    if (proveedor) {
      await proveedor.destroy()
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting proveedor:', error)
    throw error
  }
})

// class ProveedorController {
//   // Crear un nuevo proveedor
//   async crearProveedor(proveedorData) {
//     try {
//       const proveedor = await Proveedor.create(proveedorData)
//       return proveedor
//     } catch (error) {
//       console.error('Error al crear proveedor:', error)
//       throw error
//     }
//   }

//   // Obtener todos los proveedores
//   async obtenerProveedores() {
//     try {
//       const proveedores = await Proveedor.findAll({
//         include: [{ model: Producto }]
//       })
//       return proveedores
//     } catch (error) {
//       console.error('Error al obtener proveedores:', error)
//       throw error
//     }
//   }

//   // Obtener un proveedor por ID
//   async obtenerProveedorPorId(id) {
//     try {
//       const proveedor = await Proveedor.findByPk(id, {
//         include: [{ model: Producto }]
//       })
//       return proveedor
//     } catch (error) {
//       console.error('Error al obtener proveedor:', error)
//       throw error
//     }
//   }

//   // Actualizar proveedor
//   async actualizarProveedor(id, datos) {
//     try {
//       const proveedor = await Proveedor.findByPk(id)
//       if (!proveedor) {
//         throw new Error('Proveedor no encontrado')
//       }
//       await proveedor.update(datos)
//       return proveedor
//     } catch (error) {
//       console.error('Error al actualizar proveedor:', error)
//       throw error
//     }
//   }

//   // Obtener productos por proveedor
//   async obtenerProductosProveedor(id) {
//     try {
//       const productos = await Producto.findAll({
//         where: { proveedorId: id }
//       })
//       return productos
//     } catch (error) {
//       console.error('Error al obtener productos del proveedor:', error)
//       throw error
//     }
//   }

//   // Eliminar proveedor
//   async eliminarProveedor(id) {
//     try {
//       const resultado = await Proveedor.destroy({
//         where: { id }
//       })
//       return resultado
//     } catch (error) {
//       console.error('Error al eliminar proveedor:', error)
//       throw error
//     }
//   }
// }

// export default new ProveedorController()