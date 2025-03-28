"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, Eye, ShoppingCart, X, DollarSign, AlertCircle, CreditCard } from "lucide-react"

// Datos de ejemplo para clientes
const clientesEjemplo = [
  { id: 1, nombre: "Juan Pérez", frecuente: true },
  { id: 2, nombre: "María López", frecuente: true },
  { id: 3, nombre: "Carlos Rodríguez", frecuente: false },
  { id: 4, nombre: "Ana Martínez", frecuente: false },
  { id: 5, nombre: "Pedro Sánchez", frecuente: true },
]

// Datos de ejemplo para productos
const productosEjemplo = [
  { id: 1, nombre: "Laptop Pro", precio: 1299.99, stock: 15 },
  { id: 2, nombre: 'Monitor 27"', precio: 349.99, stock: 30 },
  { id: 3, nombre: "Teclado Mecánico", precio: 89.99, stock: 50 },
  { id: 4, nombre: "Mouse Inalámbrico", precio: 45.99, stock: 100 },
  { id: 5, nombre: "Auriculares Bluetooth", precio: 129.99, stock: 25 },
]

// Datos de ejemplo para precios especiales
const preciosEspecialesEjemplo = [
  { id: 1, cliente_id: 1, producto_id: 1, precio: 1199.99, descuento: 100.0 },
  { id: 2, cliente_id: 1, producto_id: 3, precio: 79.99, descuento: 10.0 },
  { id: 3, cliente_id: 2, producto_id: 2, precio: 329.99, descuento: 20.0 },
  { id: 4, cliente_id: 5, producto_id: 5, precio: 119.99, descuento: 10.0 },
]

// Datos de ejemplo para pagos
const pagosIniciales = [
  { id: 1, pedido_id: 1, fecha: "2023-03-15", monto: 1000.0, metodo: "efectivo", notas: "Pago inicial" },
  { id: 2, pedido_id: 1, fecha: "2023-03-20", monto: 389.98, metodo: "transferencia", notas: "Pago final" },
  { id: 3, pedido_id: 2, fecha: "2023-03-18", monto: 200.0, metodo: "efectivo", notas: "Pago parcial" },
  { id: 4, pedido_id: 3, fecha: "2023-03-20", monto: 129.99, metodo: "tarjeta", notas: "Pago completo" },
]

// Datos de ejemplo para pedidos
const pedidosIniciales = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nombre: "Juan Pérez",
    fecha: "2023-03-15",
    total: 1389.98,
    pagado: 1389.98,
    saldo: 0,
    estado: "completado",
    estadoPago: "pagado",
    detalles: [
      {
        id: 1,
        producto_id: 1,
        producto_nombre: "Laptop Pro",
        cantidad: 1,
        precio: 1199.99,
        subtotal: 1199.99,
        precioEspecial: true,
      },
      {
        id: 2,
        producto_id: 3,
        producto_nombre: "Teclado Mecánico",
        cantidad: 1,
        precio: 79.99,
        subtotal: 79.99,
        precioEspecial: true,
      },
    ],
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nombre: "María López",
    fecha: "2023-03-18",
    total: 395.98,
    pagado: 200.0,
    saldo: 195.98,
    estado: "procesando",
    estadoPago: "parcial",
    detalles: [
      {
        id: 3,
        producto_id: 2,
        producto_nombre: 'Monitor 27"',
        cantidad: 1,
        precio: 329.99,
        subtotal: 329.99,
        precioEspecial: true,
      },
      {
        id: 4,
        producto_id: 4,
        producto_nombre: "Mouse Inalámbrico",
        cantidad: 1,
        precio: 45.99,
        subtotal: 45.99,
        precioEspecial: false,
      },
    ],
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nombre: "Carlos Rodríguez",
    fecha: "2023-03-20",
    total: 129.99,
    pagado: 129.99,
    saldo: 0,
    estado: "pendiente",
    estadoPago: "pagado",
    detalles: [
      {
        id: 5,
        producto_id: 5,
        producto_nombre: "Auriculares Bluetooth",
        cantidad: 1,
        precio: 129.99,
        subtotal: 129.99,
        precioEspecial: false,
      },
    ],
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nombre: "Ana Martínez",
    fecha: "2023-03-25",
    total: 1649.98,
    pagado: 0,
    saldo: 1649.98,
    estado: "pendiente",
    estadoPago: "pendiente",
    detalles: [
      {
        id: 6,
        producto_id: 1,
        producto_nombre: "Laptop Pro",
        cantidad: 1,
        precio: 1299.99,
        subtotal: 1299.99,
        precioEspecial: false,
      },
      {
        id: 7,
        producto_id: 5,
        producto_nombre: "Auriculares Bluetooth",
        cantidad: 1,
        precio: 129.99,
        subtotal: 129.99,
        precioEspecial: false,
      },
      {
        id: 8,
        producto_id: 4,
        producto_nombre: "Mouse Inalámbrico",
        cantidad: 1,
        precio: 45.99,
        subtotal: 45.99,
        precioEspecial: false,
      },
      {
        id: 9,
        producto_id: 3,
        producto_nombre: "Teclado Mecánico",
        cantidad: 1,
        precio: 89.99,
        subtotal: 89.99,
        precioEspecial: false,
      },
    ],
  },
]

function PedidosPage() {
  // Estados
  const [pedidos, setPedidos] = useState(pedidosIniciales)
  const [pagos, setPagos] = useState(pagosIniciales)
  const [pedidoActual, setPedidoActual] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [dialogoEliminar, setDialogoEliminar] = useState(false)
  const [dialogoDetalle, setDialogoDetalle] = useState(false)
  const [dialogoPagos, setDialogoPagos] = useState(false)
  const [dialogoNuevoPago, setDialogoNuevoPago] = useState(false)
  const [detallesPedido, setDetallesPedido] = useState([])
  const [clientesConPagosPendientes, setClientesConPagosPendientes] = useState([])
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  // Estado para el formulario de pedido
  const [formData, setFormData] = useState({
    id: 0,
    cliente_id: 0,
    cliente_nombre: "",
    fecha: new Date().toISOString().split("T")[0],
    total: 0,
    pagado: 0,
    saldo: 0,
    estado: "pendiente",
    estadoPago: "pendiente",
    producto_id: 0,
    cantidad: 1,
  })

  // Estado para el formulario de pago
  const [formPago, setFormPago] = useState({
    id: 0,
    pedido_id: 0,
    fecha: new Date().toISOString().split("T")[0],
    monto: 0,
    metodo: "efectivo",
    notas: "",
  })

  // Verificar clientes con pagos pendientes al cargar
  useEffect(() => {
    const clientesPendientes = pedidos
      .filter((pedido) => pedido.estadoPago === "pendiente" || pedido.estadoPago === "parcial")
      .map((pedido) => ({
        id: pedido.cliente_id,
        nombre: pedido.cliente_nombre,
        saldoPendiente: pedido.saldo,
      }))

    // Eliminar duplicados
    const clientesUnicos = Array.from(new Map(clientesPendientes.map((cliente) => [cliente.id, cliente])).values())

    setClientesConPagosPendientes(clientesUnicos)
    setMostrarNotificacion(clientesUnicos.length > 0)
  }, [pedidos])

  // Filtrar pedidos por nombre de cliente o ID
  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.cliente_nombre.toLowerCase().includes(busqueda.toLowerCase()) || pedido.id.toString().includes(busqueda),
  )

  // Handlers
  const handleNuevoPedido = () => {
    setPedidoActual(null)
    setDetallesPedido([])
    setFormData({
      id: 0,
      cliente_id: 0,
      cliente_nombre: "",
      fecha: new Date().toISOString().split("T")[0],
      total: 0,
      pagado: 0,
      saldo: 0,
      estado: "pendiente",
      estadoPago: "pendiente",
      producto_id: 0,
      cantidad: 1,
    })
    setDialogoAbierto(true)
  }

  const handleVerDetalle = (pedido) => {
    setPedidoActual(pedido)
    setDialogoDetalle(true)
  }

  const handleVerPagos = (pedido) => {
    setPedidoActual(pedido)
    setDialogoPagos(true)
  }

  const handleNuevoPago = () => {
    setFormPago({
      id: 0,
      pedido_id: pedidoActual.id,
      fecha: new Date().toISOString().split("T")[0],
      monto: pedidoActual.saldo,
      metodo: "efectivo",
      notas: "",
    })
    setDialogoNuevoPago(true)
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
      pagado: pedido.pagado,
      saldo: pedido.saldo,
      estado: pedido.estado,
      estadoPago: pedido.estadoPago,
      producto_id: 0,
      cantidad: 1,
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
      // También eliminar los pagos asociados
      setPagos(pagos.filter((p) => p.pedido_id !== pedidoActual.id))
      alert(`Se ha eliminado el pedido #${pedidoActual.id} correctamente.`)
      setDialogoEliminar(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "cliente_id") {
      const clienteSeleccionado = clientesEjemplo.find((c) => c.id === Number.parseInt(value))
      setFormData({
        ...formData,
        [name]: Number.parseInt(value),
        cliente_nombre: clienteSeleccionado ? clienteSeleccionado.nombre : "",
      })
    } else if (name === "pagado") {
      const pagado = Number.parseFloat(value) || 0
      const total = formData.total
      const saldo = Math.max(0, total - pagado)
      let estadoPago = "pendiente"

      if (pagado >= total) {
        estadoPago = "pagado"
      } else if (pagado > 0) {
        estadoPago = "parcial"
      }

      setFormData({
        ...formData,
        pagado,
        saldo,
        estadoPago,
      })
    } else {
      setFormData({
        ...formData,
        [name]: name === "cliente_id" || name === "producto_id" || name === "cantidad" ? Number.parseInt(value) : value,
      })
    }
  }

  const handleInputChangePago = (e) => {
    const { name, value } = e.target

    if (name === "monto") {
      const monto = Number.parseFloat(value) || 0
      // Limitar el monto al saldo pendiente
      const montoLimitado = Math.min(monto, pedidoActual.saldo)
      setFormPago({
        ...formPago,
        [name]: montoLimitado,
      })
    } else {
      setFormPago({
        ...formPago,
        [name]: value,
      })
    }
  }

  // Función para obtener el precio de un producto para un cliente específico
  const obtenerPrecioProducto = (producto_id, cliente_id) => {
    // Verificar si el cliente es frecuente
    const cliente = clientesEjemplo.find((c) => c.id === cliente_id)
    if (!cliente || !cliente.frecuente) {
      // Si no es cliente frecuente, devolver precio estándar
      const producto = productosEjemplo.find((p) => p.id === producto_id)
      return {
        precio: producto ? producto.precio : 0,
        precioEspecial: false,
      }
    }

    // Buscar si existe un precio especial para este cliente y producto
    const precioEspecial = preciosEspecialesEjemplo.find(
      (pe) => pe.cliente_id === cliente_id && pe.producto_id === producto_id,
    )

    if (precioEspecial) {
      // Si existe precio especial, devolverlo
      return {
        precio: precioEspecial.precio,
        precioEspecial: true,
      }
    } else {
      // Si no hay precio especial, devolver precio estándar
      const producto = productosEjemplo.find((p) => p.id === producto_id)
      return {
        precio: producto ? producto.precio : 0,
        precioEspecial: false,
      }
    }
  }

  const agregarProducto = () => {
    const producto_id = formData.producto_id
    const cantidad = formData.cantidad
    const cliente_id = formData.cliente_id

    if (!producto_id || cantidad <= 0 || !cliente_id) {
      alert("Selecciona un cliente, un producto y una cantidad válida")
      return
    }

    const producto = productosEjemplo.find((p) => p.id === producto_id)
    if (!producto) return

    // Obtener el precio adecuado (estándar o especial)
    const { precio, precioEspecial } = obtenerPrecioProducto(producto_id, cliente_id)
    const subtotal = precio * cantidad

    const nuevoDetalle = {
      id: Math.max(0, ...detallesPedido.map((d) => d.id), 0) + 1,
      producto_id,
      producto_nombre: producto.nombre,
      cantidad,
      precio,
      subtotal,
      precioEspecial,
    }

    setDetallesPedido([...detallesPedido, nuevoDetalle])

    // Actualizar el total del pedido
    const nuevoTotal = calcularTotal() + subtotal
    const pagado = formData.pagado
    const saldo = Math.max(0, nuevoTotal - pagado)
    let estadoPago = "pendiente"

    if (pagado >= nuevoTotal) {
      estadoPago = "pagado"
    } else if (pagado > 0) {
      estadoPago = "parcial"
    }

    setFormData({
      ...formData,
      producto_id: 0,
      cantidad: 1,
      total: nuevoTotal,
      saldo: saldo,
      estadoPago: estadoPago,
    })
  }

  const eliminarProducto = (id) => {
    // Obtener el detalle que se va a eliminar
    const detalleEliminado = detallesPedido.find((d) => d.id === id)

    // Eliminar el detalle
    setDetallesPedido(detallesPedido.filter((d) => d.id !== id))

    if (detalleEliminado) {
      // Actualizar el total del pedido
      const nuevoTotal = calcularTotal() - detalleEliminado.subtotal
      const pagado = formData.pagado
      const saldo = Math.max(0, nuevoTotal - pagado)
      let estadoPago = "pendiente"

      if (pagado >= nuevoTotal) {
        estadoPago = "pagado"
      } else if (pagado > 0) {
        estadoPago = "parcial"
      }

      setFormData({
        ...formData,
        total: nuevoTotal,
        saldo: saldo,
        estadoPago: estadoPago,
      })
    }
  }

  const calcularTotal = () => {
    return detallesPedido.reduce((total, detalle) => total + detalle.subtotal, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (detallesPedido.length === 0) {
      alert("Debes agregar al menos un producto al pedido")
      return
    }

    const total = calcularTotal()
    const cliente = clientesEjemplo.find((c) => c.id === formData.cliente_id)

    if (!cliente) {
      alert("Selecciona un cliente válido")
      return
    }

    // Asegurar que los valores de pago sean correctos
    const pagado = Math.min(formData.pagado, total)
    const saldo = total - pagado
    let estadoPago = "pendiente"

    if (pagado >= total) {
      estadoPago = "pagado"
    } else if (pagado > 0) {
      estadoPago = "parcial"
    }

    if (pedidoActual) {
      // Editar pedido existente
      const pedidoActualizado = {
        ...formData,
        cliente_nombre: cliente.nombre,
        total,
        pagado,
        saldo,
        estadoPago,
        detalles: detallesPedido,
      }

      setPedidos(pedidos.map((p) => (p.id === pedidoActual.id ? pedidoActualizado : p)))

      // Si hay un pago inicial, registrarlo
      if (pagado > 0 && !pagos.some((p) => p.pedido_id === pedidoActual.id)) {
        const nuevoPago = {
          id: Math.max(0, ...pagos.map((p) => p.id)) + 1,
          pedido_id: pedidoActual.id,
          fecha: formData.fecha,
          monto: pagado,
          metodo: "efectivo",
          notas: "Pago inicial",
        }
        setPagos([...pagos, nuevoPago])
      }

      alert(`Se ha actualizado el pedido #${pedidoActual.id} correctamente.`)
    } else {
      // Crear nuevo pedido
      const nuevoId = Math.max(0, ...pedidos.map((p) => p.id)) + 1
      const nuevoPedido = {
        ...formData,
        id: nuevoId,
        cliente_nombre: cliente.nombre,
        total,
        pagado,
        saldo,
        estadoPago,
        detalles: detallesPedido,
      }

      setPedidos([...pedidos, nuevoPedido])

      // Si hay un pago inicial, registrarlo
      if (pagado > 0) {
        const nuevoPago = {
          id: Math.max(0, ...pagos.map((p) => p.id)) + 1,
          pedido_id: nuevoId,
          fecha: formData.fecha,
          monto: pagado,
          metodo: "efectivo",
          notas: "Pago inicial",
        }
        setPagos([...pagos, nuevoPago])
      }

      alert(`Se ha creado el pedido #${nuevoId} correctamente.`)
    }

    setDialogoAbierto(false)
  }

  const handleSubmitPago = (e) => {
    e.preventDefault()

    if (formPago.monto <= 0) {
      alert("El monto del pago debe ser mayor a cero")
      return
    }

    // Crear nuevo pago
    const nuevoPago = {
      ...formPago,
      id: Math.max(0, ...pagos.map((p) => p.id)) + 1,
    }

    setPagos([...pagos, nuevoPago])

    // Actualizar el pedido
    const pedidoActualizado = { ...pedidoActual }
    pedidoActualizado.pagado += formPago.monto
    pedidoActualizado.saldo -= formPago.monto

    // Actualizar estado de pago
    if (pedidoActualizado.saldo <= 0) {
      pedidoActualizado.estadoPago = "pagado"
      pedidoActualizado.saldo = 0
    } else {
      pedidoActualizado.estadoPago = "parcial"
    }

    setPedidos(pedidos.map((p) => (p.id === pedidoActual.id ? pedidoActualizado : p)))
    setPedidoActual(pedidoActualizado)

    alert(`Pago registrado correctamente. Saldo pendiente: $${pedidoActualizado.saldo.toFixed(2)}`)
    setDialogoNuevoPago(false)
  }

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "pendiente":
        return {
          label: "Pendiente",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        }
      case "procesando":
        return {
          label: "Procesando",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        }
      case "completado":
        return {
          label: "Completado",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        }
      case "cancelado":
        return {
          label: "Cancelado",
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
      default:
        return {
          label: estado,
          color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        }
    }
  }

  const getEstadoPagoBadge = (estadoPago) => {
    switch (estadoPago) {
      case "pagado":
        return {
          label: "Pagado",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        }
      case "parcial":
        return {
          label: "Pago Parcial",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        }
      case "pendiente":
        return {
          label: "Pendiente",
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
      default:
        return {
          label: estadoPago,
          color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        }
    }
  }

  const getPagosPedido = (pedidoId) => {
    return pagos.filter((pago) => pago.pedido_id === pedidoId)
  }

  return (
    <div className="space-y-4">
      {/* Notificación de pagos pendientes */}
      {mostrarNotificacion && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900/30 dark:border-yellow-600">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200 font-medium">
                Hay {clientesConPagosPendientes.length} cliente(s) con pagos pendientes
              </p>
              <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-300">
                <ul className="list-disc pl-5 space-y-1">
                  {clientesConPagosPendientes.map((cliente) => (
                    <li key={cliente.id}>
                      {cliente.nombre}: ${cliente.saldoPendiente.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setMostrarNotificacion(false)}
                className="inline-flex text-yellow-500 hover:text-yellow-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de búsqueda y botón de nuevo pedido */}
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

      {/* Tabla de pedidos */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Pago
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pedidosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No se encontraron pedidos
                </td>
              </tr>
            ) : (
              pedidosFiltrados.map((pedido) => {
                const estadoBadge = getEstadoBadge(pedido.estado)
                const estadoPagoBadge = getEstadoPagoBadge(pedido.estadoPago)

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
                      {pedido.estadoPago === "parcial" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Pagado: ${pedido.pagado.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <span className={`px-2 py-1 text-xs rounded-full ${estadoBadge.color}`}>{estadoBadge.label}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <span className={`px-2 py-1 text-xs rounded-full ${estadoPagoBadge.color}`}>
                        {estadoPagoBadge.label}
                      </span>
                      {pedido.estadoPago === "parcial" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Saldo: ${pedido.saldo.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                        onClick={() => handleVerDetalle(pedido)}
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {(pedido.estadoPago === "pendiente" || pedido.estadoPago === "parcial") && (
                        <button
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 p-1 ml-1"
                          onClick={() => handleVerPagos(pedido)}
                          title="Gestionar pagos"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 ml-1"
                        onClick={() => handleEditarPedido(pedido)}
                        title="Editar pedido"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-1"
                        onClick={() => handleEliminarPedido(pedido)}
                        title="Eliminar pedido"
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

      {/* Modal para ver detalle de pedido */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">Información del Pedido</h4>
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
                        className={`px-2 py-1 text-xs rounded-full ${getEstadoBadge(pedidoActual?.estado || "pendiente").color}`}
                      >
                        {getEstadoBadge(pedidoActual?.estado || "pendiente").label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estado de pago:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getEstadoPagoBadge(pedidoActual?.estadoPago || "pendiente").color}`}
                      >
                        {getEstadoPagoBadge(pedidoActual?.estadoPago || "pendiente").label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${pedidoActual?.total.toFixed(2)}</span>
                    </div>
                    {pedidoActual?.estadoPago !== "pendiente" && (
                      <div className="flex justify-between">
                        <span className="font-medium">Pagado:</span>
                        <span>${pedidoActual?.pagado.toFixed(2)}</span>
                      </div>
                    )}
                    {pedidoActual?.estadoPago === "parcial" && (
                      <div className="flex justify-between">
                        <span className="font-medium">Saldo pendiente:</span>
                        <span className="text-red-600 dark:text-red-400">${pedidoActual?.saldo.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">Historial de Pagos</h4>
                  {getPagosPedido(pedidoActual?.id).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                      <CreditCard className="h-8 w-8 mb-2" />
                      <p>No hay pagos registrados</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getPagosPedido(pedidoActual?.id).map((pago) => (
                        <div key={pago.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{pago.fecha}</span>
                            <span className="text-green-600 dark:text-green-400">${pago.monto.toFixed(2)}</span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span>Método: {pago.metodo}</span>
                            {pago.notas && <span className="ml-2">- {pago.notas}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(pedidoActual?.estadoPago === "pendiente" || pedidoActual?.estadoPago === "parcial") && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleVerPagos(pedidoActual)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <DollarSign className="mr-2 h-4 w-4" /> Registrar Pago
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h4 className="text-lg font-medium mb-2">Productos</h4>
              <div className="rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Precio Unit.
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {pedidoActual?.detalles.map((detalle) => (
                      <tr key={detalle.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {detalle.producto_nombre}
                          {detalle.precioEspecial && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium">
                              Precio especial aplicado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                          {detalle.cantidad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                          ${detalle.precio.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                          ${detalle.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td
                        colSpan="3"
                        className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100 text-right"
                      >
                        Total:
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100 text-right">
                        ${pedidoActual?.total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
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

      {/* Modal para gestionar pagos */}
      {dialogoPagos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Gestión de Pagos - Pedido #{pedidoActual?.id}</h3>
              <button
                onClick={() => setDialogoPagos(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                    <p className="font-medium">{pedidoActual?.cliente_nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha del pedido</p>
                    <p className="font-medium">{pedidoActual?.fecha}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-medium">${pedidoActual?.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estado de pago</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getEstadoPagoBadge(pedidoActual?.estadoPago || "pendiente").color}`}
                    >
                      {getEstadoPagoBadge(pedidoActual?.estadoPago || "pendiente").label}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pagado</p>
                    <p className="font-medium">${pedidoActual?.pagado.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Saldo pendiente</p>
                    <p className="font-medium text-red-600 dark:text-red-400">${pedidoActual?.saldo.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-medium mb-2">Historial de Pagos</h4>
              {getPagosPedido(pedidoActual?.id).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md">
                  <CreditCard className="h-8 w-8 mb-2" />
                  <p>No hay pagos registrados</p>
                </div>
              ) : (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Método
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Notas
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {getPagosPedido(pedidoActual?.id).map((pago) => (
                        <tr key={pago.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {pago.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {pago.metodo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {pago.notas}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right font-medium">
                            ${pago.monto.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {pedidoActual?.saldo > 0 && (
                <div className="mt-4">
                  <button
                    onClick={handleNuevoPago}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Registrar Nuevo Pago
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setDialogoPagos(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para registrar nuevo pago */}
      {dialogoNuevoPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Registrar Nuevo Pago</h3>
              <button
                onClick={() => setDialogoNuevoPago(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitPago} className="p-4 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Saldo pendiente:</span>
                  <span className="font-medium">${pedidoActual?.saldo.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formPago.fecha}
                  onChange={handleInputChangePago}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monto</label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="number"
                    name="monto"
                    value={formPago.monto}
                    onChange={handleInputChangePago}
                    step="0.01"
                    min="0.01"
                    max={pedidoActual?.saldo}
                    className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Máximo: ${pedidoActual?.saldo.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Método de pago
                </label>
                <select
                  name="metodo"
                  value={formPago.metodo}
                  onChange={handleInputChangePago}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="cheque">Cheque</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notas (opcional)
                </label>
                <textarea
                  name="notas"
                  value={formPago.notas}
                  onChange={handleInputChangePago}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  rows="2"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setDialogoNuevoPago(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Registrar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear/editar pedido */}
      {dialogoAbierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogoAbierto(false)
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">{pedidoActual ? "Editar Pedido" : "Nuevo Pedido"}</h3>
              <button
                onClick={() => setDialogoAbierto(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente</label>
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
                          {cliente.nombre} {cliente.frecuente ? "(Cliente frecuente)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
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
                          {productosEjemplo.map((producto) => {
                            // Mostrar precio especial si aplica
                            let precioMostrar = producto.precio
                            let esPrecioEspecial = false

                            if (formData.cliente_id) {
                              const { precio, precioEspecial } = obtenerPrecioProducto(producto.id, formData.cliente_id)
                              precioMostrar = precio
                              esPrecioEspecial = precioEspecial
                            }

                            return (
                              <option key={producto.id} value={producto.id}>
                                {producto.nombre} - ${precioMostrar.toFixed(2)}
                                {esPrecioEspecial ? " ✓ Precio especial" : ""}
                              </option>
                            )
                          })}
                        </select>
                        {formData.cliente_id &&
                          clientesEjemplo.find((c) => c.id === formData.cliente_id)?.frecuente && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Cliente frecuente: se aplicarán precios especiales automáticamente si están disponibles.
                            </p>
                          )}
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

                  {/* Sección de pago inicial */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <h4 className="font-medium mb-2">Información de Pago</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pago inicial
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <input
                            type="number"
                            name="pagado"
                            value={formData.pagado}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            max={formData.total}
                            className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Deje en 0 para registrar el pedido sin pago inicial.
                        </p>
                      </div>

                      {formData.total > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Total del pedido:</span>
                            <span>${formData.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Pago inicial:</span>
                            <span>${formData.pagado.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Saldo pendiente:</span>
                            <span className={formData.saldo > 0 ? "text-red-600 dark:text-red-400" : ""}>
                              ${formData.saldo.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs">
                            Estado de pago:
                            <span
                              className={`ml-1 px-2 py-0.5 rounded-full ${getEstadoPagoBadge(formData.estadoPago).color}`}
                            >
                              {getEstadoPagoBadge(formData.estadoPago).label}
                            </span>
                          </div>
                        </div>
                      )}
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
                            <div className="font-medium">
                              {detalle.producto_nombre}
                              {detalle.precioEspecial && (
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium">
                                  Precio especial aplicado
                                </span>
                              )}
                            </div>
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

              <div className="flex justify-end pt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setDialogoAbierto(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {pedidoActual ? "Guardar cambios" : "Crear pedido"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación */}
      {dialogoEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium">Confirmar eliminación</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar el pedido #{pedidoActual?.id}? Esta acción no se puede deshacer.
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

export default PedidosPage

