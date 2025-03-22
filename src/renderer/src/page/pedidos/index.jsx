
import { useState, useContext } from 'react'
import { Plus, Pencil, Trash2, Search, Eye, ShoppingCart, X } from 'lucide-react'
import { ToastContext } from '../../App'

// Datos de ejemplo
const clientesEjemplo = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María López' },
  { id: 3, nombre: 'Carlos Rodríguez' },
  { id: 4, nombre: 'Ana Martínez' },
  { id: 5, nombre: 'Pedro Sánchez' }
]

const productosEjemplo = [
  { id: 1, nombre: 'Laptop Pro', precio: 1299.99, stock: 15 },
  { id: 2, nombre: 'Monitor 27"', precio: 349.99, stock: 30 },
  { id: 3, nombre: 'Teclado Mecánico', precio: 89.99, stock: 50 },
  { id: 4, nombre: 'Mouse Inalámbrico', precio: 45.99, stock: 100 },
  { id: 5, nombre: 'Auriculares Bluetooth', precio: 129.99, stock: 25 }
]

const pedidosIniciales = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nombre: 'Juan Pérez',
    fecha: '2023-03-15',
    total: 1389.98,
    estado: 'completado',
    detalles: [
      {
        id: 1,
        producto_id: 1,
        producto_nombre: 'Laptop Pro',
        cantidad: 1,
        precio: 1299.99,
        subtotal: 1299.99
      },
      {
        id: 2,
        producto_id: 3,
        producto_nombre: 'Teclado Mecánico',
        cantidad: 1,
        precio: 89.99,
        subtotal: 89.99
      }
    ]
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nombre: 'María López',
    fecha: '2023-03-18',
    total: 395.98,
    estado: 'procesando',
    detalles: [
      {
        id: 3,
        producto_id: 2,
        producto_nombre: 'Monitor 27"',
        cantidad: 1,
        precio: 349.99,
        subtotal: 349.99
      },
      {
        id: 4,
        producto_id: 4,
        producto_nombre: 'Mouse Inalámbrico',
        cantidad: 1,
        precio: 45.99,
        subtotal: 45.99
      }
    ]
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nombre: 'Carlos Rodríguez',
    fecha: '2023-03-20',
    total: 129.99,
    estado: 'pendiente',
    detalles: [
      {
        id: 5,
        producto_id: 5,
        producto_nombre: 'Auriculares Bluetooth',
        cantidad: 1,
        precio: 129.99,
        subtotal: 129.99
      }
    ]
  }
]

export default function Pedidos() {
  const [pedidos, setPedidos] = useState(pedidosIniciales)
  const [pedidoActual, setPedidoActual] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [dialogoEliminar, setDialogoEliminar] = useState(false)
  const [dialogoDetalle, setDialogoDetalle] = useState(false)
  const [detallesPedido, setDetallesPedido] = useState([])
  const { toast } = useContext(ToastContext)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    id: 0,
    cliente_id: 0,
    cliente_nombre: '',
    fecha: new Date().toISOString().split('T')[0],
    total: 0,
    estado: 'pendiente',
    producto_id: 0,
    cantidad: 1
  })

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.cliente_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.id.toString().includes(busqueda)
  )

  const handleNuevoPedido = () => {
    setPedidoActual(null)
    setDetallesPedido([])
    setFormData({
      id: 0,
      cliente_id: 0,
      cliente_nombre: '',
      fecha: new Date().toISOString().split('T')[0],
      total: 0,
      estado: 'pendiente',
      producto_id: 0,
      cantidad: 1
    })
    setDialogoAbierto(true)
  }

  const handleVerDetalle = (pedido) => {
    setPedidoActual(pedido)
    setDialogoDetalle(true)
  }

  const handleEditarPedido = (pedido) => {
    setPedidoActual(pedido)
    setDetallesPedido([...pedido.detalles])
    setFormData({
      id: pedido.id,
      cliente_id: pedido.cliente_id,
      cliente_nombre: pedido.cliente_nombre,
      fecha: pedido.fecha,
      total: pedido.total,
      estado: pedido.estado,
      producto_id: 0,
      cantidad: 1
    })
    setDialogoAbierto(true)
  }

  const handleEliminarPedido = (pedido) => {
    setPedidoActual(pedido)
    setDialogoEliminar(true)
  }

  const confirmarEliminar = () => {
    if (pedidoActual) {
      setPedidos(pedidos.filter((p) => p.id !== pedidoActual.id))
      toast({
        title: 'Pedido eliminado',
        description: `Se ha eliminado el pedido #${pedidoActual.id} correctamente.`
      })
      setDialogoEliminar(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]:
        name === 'cliente_id' || name === 'producto_id' || name === 'cantidad'
          ? Number(value)
          : value
    })
  }

  const agregarProducto = () => {
    const producto_id = formData.producto_id
    const cantidad = formData.cantidad

    if (!producto_id || cantidad <= 0) {
      toast({
        title: 'Error',
        description: 'Selecciona un producto y una cantidad válida',
        variant: 'destructive'
      })
      return
    }

    const producto = productosEjemplo.find((p) => p.id === producto_id)
    if (!producto) return

    const subtotal = producto.precio * cantidad

    const nuevoDetalle = {
      id: Math.max(0, ...detallesPedido.map((d) => d.id), 0) + 1,
      producto_id,
      producto_nombre: producto.nombre,
      cantidad,
      precio: producto.precio,
      subtotal
    }

    setDetallesPedido([...detallesPedido, nuevoDetalle])

    setFormData({
      ...formData,
      producto_id: 0,
      cantidad: 1
    })
  }

  const eliminarProducto = (id) => {
    setDetallesPedido(detallesPedido.filter((d) => d.id !== id))
  }

  const calcularTotal = () => {
    return detallesPedido.reduce((total, detalle) => total + detalle.subtotal, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (detallesPedido.length === 0) {
      toast({
        title: 'Error',
        description: 'Debes agregar al menos un producto al pedido',
        variant: 'destructive'
      })
      return
    }

    const total = calcularTotal()
    const cliente = clientesEjemplo.find((c) => c.id === formData.cliente_id)

    if (!cliente) {
      toast({
        title: 'Error',
        description: 'Selecciona un cliente válido',
        variant: 'destructive'
      })
      return
    }

    if (pedidoActual) {
      // Editar pedido existente
      const pedidoActualizado = {
        ...formData,
        cliente_nombre: cliente.nombre,
        total,
        detalles: detallesPedido
      }

      setPedidos(pedidos.map((p) => (p.id === pedidoActual.id ? pedidoActualizado : p)))
      toast({
        title: 'Pedido actualizado',
        description: `Se ha actualizado el pedido #${pedidoActual.id} correctamente.`
      })
    } else {
      // Crear nuevo pedido
      const nuevoId = Math.max(0, ...pedidos.map((p) => p.id)) + 1
      const nuevoPedido = {
        ...formData,
        id: nuevoId,
        cliente_nombre: cliente.nombre,
        total,
        detalles: detallesPedido
      }

      setPedidos([...pedidos, nuevoPedido])
      toast({
        title: 'Pedido creado',
        description: `Se ha creado el pedido #${nuevoId} correctamente.`
      })
    }

    setDialogoAbierto(false)
  }

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'pendiente':
        return {
          label: 'Pendiente',
          variant: 'secondary',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }
      case 'procesando':
        return {
          label: 'Procesando',
          variant: 'default',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        }
      case 'completado':
        return {
          label: 'Completado',
          variant: 'success',
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        }
      case 'cancelado':
        return {
          label: 'Cancelado',
          variant: 'destructive',
          color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }
      default:
        return {
          label: estado,
          variant: 'outline',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pedidos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          />
        </div>
        <button
          onClick={handleNuevoPedido}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Pedido
        </button>
      </div>

      <div className="rounded-md border bg border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="  min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pedidosFiltrados.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No se encontraron pedidos
                </td>
              </tr>
            ) : (
              pedidosFiltrados.map((pedido) => {
                const estadoBadge = getEstadoBadge(pedido.estado)

                return (
                  <tr key={pedido.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      #{pedido.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {pedido.cliente_nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {pedido.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${pedido.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <span className={`px-2 py-1 text-xs rounded-full ${estadoBadge.color}`}>
                        {estadoBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                        onClick={() => handleVerDetalle(pedido)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 ml-2"
                        onClick={() => handleEditarPedido(pedido)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-2"
                        onClick={() => handleEliminarPedido(pedido)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Diálogo para ver detalle de pedido */}
      {dialogoDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Detalle del Pedido #{pedidoActual?.id}</h3>
              <button
                onClick={() => setDialogoDetalle(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-4">Información del Pedido</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Cliente:</span>
                      <span>{pedidoActual?.cliente_nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fecha:</span>
                      <span>{pedidoActual?.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estado:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getEstadoBadge(pedidoActual?.estado || 'pendiente').color}`}
                      >
                        {getEstadoBadge(pedidoActual?.estado || 'pendiente').label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${pedidoActual?.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-4">Productos</h4>
                  <div className="space-y-4">
                    {pedidoActual?.detalles.map((detalle) => (
                      <div
                        key={detalle.id}
                        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                      >
                        <div>
                          <div className="font-medium">{detalle.producto_nombre}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {detalle.cantidad} x ${detalle.precio.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-medium">${detalle.subtotal.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setDialogoDetalle(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para crear/editar pedido */}
      {dialogoAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {pedidoActual ? 'Editar Pedido' : 'Nuevo Pedido'}
              </h3>
              <button
                onClick={() => setDialogoAbierto(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cliente
                    </label>
                    <select
                      name="cliente_id"
                      value={formData.cliente_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      required
                    >
                      <option value="">Seleccionar cliente</option>
                      {clientesEjemplo.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Estado
                    </label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      required
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="procesando">Procesando</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <h4 className="font-medium mb-2">Agregar Producto</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Producto
                        </label>
                        <select
                          name="producto_id"
                          value={formData.producto_id}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        >
                          <option value="">Seleccionar producto</option>
                          {productosEjemplo.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                              {producto.nombre} - ${producto.precio.toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cantidad
                        </label>
                        <input
                          type="number"
                          name="cantidad"
                          value={formData.cantidad}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={agregarProducto}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h4 className="font-medium mb-2">Productos en el Pedido</h4>
                  {detallesPedido.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                      <ShoppingCart className="h-10 w-10 mb-2" />
                      <p>No hay productos en el pedido</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {detallesPedido.map((detalle) => (
                        <div
                          key={detalle.id}
                          className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                          <div>
                            <div className="font-medium">{detalle.producto_nombre}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {detalle.cantidad} x ${detalle.precio.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">${detalle.subtotal.toFixed(2)}</div>
                            <button
                              type="button"
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                              onClick={() => eliminarProducto(detalle.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full my-2" />

                      <div className="flex justify-between items-center font-bold">
                        <div>Total</div>
                        <div>${calcularTotal().toFixed(2)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {pedidoActual ? 'Guardar cambios' : 'Crear pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diálogo para confirmar eliminación */}
      {dialogoEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium">Confirmar eliminación</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar el pedido #{pedidoActual?.id}? Esta acción no
                se puede deshacer.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
              <button
                onClick={() => setDialogoEliminar(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
