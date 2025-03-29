import { useState, useContext } from "react"
import { Plus, Pencil, Trash2, Search, X, Tag, DollarSign, FileDown } from "lucide-react"
import { ClientesProvider, ClientesContext } from "../context/ClienteContext"
import { useForm } from "react-hook-form";
import ModalCliente from "./components/modalCliente"
import ModalEliminarCliente from "./components/modalEliminarCliente"
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Datos de ejemplo para productos
const productosEjemplo = [
  { id: 1, nombre: "Laptop Pro", precio: 1299.99, stock: 15 },
  { id: 2, nombre: 'Monitor 27"', precio: 349.99, stock: 30 },
  { id: 3, nombre: "Teclado Mecánico", precio: 89.99, stock: 50 },
  { id: 4, nombre: "Mouse Inalámbrico", precio: 45.99, stock: 100 },
  { id: 5, nombre: "Auriculares Bluetooth", precio: 129.99, stock: 25 },
  { id: 6, nombre: "Disco SSD 1TB", precio: 149.99, stock: 40 },
  { id: 7, nombre: "Cámara Web HD", precio: 69.99, stock: 20 },
  { id: 8, nombre: "Impresora Láser", precio: 199.99, stock: 10 },
]

// Datos de ejemplo para precios especiales
const preciosEspecialesIniciales = [
  { id: 1, cliente_id: 1, producto_id: 1, precio: 1199.99, descuento: 100.0 },
  { id: 2, cliente_id: 1, producto_id: 3, precio: 79.99, descuento: 10.0 },
  { id: 3, cliente_id: 2, producto_id: 2, precio: 329.99, descuento: 20.0 },
  { id: 4, cliente_id: 5, producto_id: 5, precio: 119.99, descuento: 10.0 },
]

function ClientesPage() {
  const { clientes, cargando, cargarClientes, agregarClientes, eliminarCliente } = useContext(ClientesContext);

  // Estados
  // const [clientes, setClientes] = useState(clientesIniciales)
  const [preciosEspeciales, setPreciosEspeciales] = useState(preciosEspecialesIniciales)
  const [clienteActual, setClienteActual] = useState(null)
  const [busqueda, setBusqueda] = useState("")

  const [dialogoNuevoCliente, setDialogoNuevoCliente] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [dialogoEliminar, setDialogoEliminar] = useState(false)

  const [dialogoPreciosEspeciales, setDialogoPreciosEspeciales] = useState(false)
  const [dialogoNuevoPrecioEspecial, setDialogoNuevoPrecioEspecial] = useState(false)

  // Estado para el formulario de cliente
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    frecuente: false,
  })

  // Estado para el formulario de precio especial
  const [formPrecioEspecial, setFormPrecioEspecial] = useState({
    id: 0,
    cliente_id: 0,
    producto_id: 0,
    precio: 0,
    descuento: 0,
  })

  // Agregar este nuevo estado junto a los demás estados
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Filtrar clientes por nombre o email
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase()),
  )

  // Handlers para clientes
  const handleDialogNuevoCliente = () => {
    setIsEditing(false)
    setDialogoNuevoCliente(true)
  }
  const handleEditarCliente = (cliente) => {
    setClienteActual(cliente)
    setDialogoNuevoCliente(true)
    setIsEditing(true)
  }

  const handleEliminarCliente = (cliente) => {
    setClienteActual(cliente)
    setDialogoEliminar(true)
  }


/* 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

 */



  // Handlers para precios especiales
  const handleVerPreciosEspeciales = (cliente) => {
    setClienteActual(cliente)
    setDialogoPreciosEspeciales(true)
  }

  const handleNuevoPrecioEspecial = () => {
    setFormPrecioEspecial({
      id: 0,
      cliente_id: clienteActual.id,
      producto_id: 0,
      precio: 0,
      descuento: 0,
    })
    setDialogoNuevoPrecioEspecial(true)
  }

  const handleEliminarPrecioEspecial = (precioEspecialId) => {
    setPreciosEspeciales(preciosEspeciales.filter((p) => p.id !== precioEspecialId))
    alert("Precio especial eliminado correctamente.")
  }

  const handleInputChangePrecioEspecial = (e) => {
    const { name, value } = e.target

    if (name === "producto_id") {
      const productoSeleccionado = productosEjemplo.find((p) => p.id === Number.parseInt(value))
      if (productoSeleccionado) {
        // Calcular precio con 5% de descuento por defecto
        const descuento = Number.parseFloat((productoSeleccionado.precio * 0.05).toFixed(2))
        const precioEspecial = productoSeleccionado.precio - descuento

        setFormPrecioEspecial({
          ...formPrecioEspecial,
          [name]: Number.parseInt(value),
          precio: precioEspecial,
          descuento: descuento,
        })
      }
    } else if (name === "descuento") {
      const descuento = Number.parseFloat(value)
      const producto = productosEjemplo.find((p) => p.id === formPrecioEspecial.producto_id)
      if (producto) {
        const precioEspecial = producto.precio - descuento
        setFormPrecioEspecial({
          ...formPrecioEspecial,
          descuento: descuento,
          precio: precioEspecial >= 0 ? precioEspecial : 0,
        })
      } else {
        setFormPrecioEspecial({
          ...formPrecioEspecial,
          [name]: Number.parseFloat(value),
        })
      }
    } else if (name === "precio") {
      const precio = Number.parseFloat(value)
      const producto = productosEjemplo.find((p) => p.id === formPrecioEspecial.producto_id)
      if (producto) {
        const descuento = producto.precio - precio
        setFormPrecioEspecial({
          ...formPrecioEspecial,
          precio: precio,
          descuento: descuento >= 0 ? descuento : 0,
        })
      } else {
        setFormPrecioEspecial({
          ...formPrecioEspecial,
          [name]: Number.parseFloat(value),
        })
      }
    } else {
      setFormPrecioEspecial({
        ...formPrecioEspecial,
        [name]: value,
      })
    }
  }

  const handleSubmitPrecioEspecial = (e) => {
    e.preventDefault()

    // Validar que no exista ya un precio especial para este cliente y producto
    const existePrecioEspecial = preciosEspeciales.some(
      (p) =>
        p.cliente_id === formPrecioEspecial.cliente_id &&
        p.producto_id === formPrecioEspecial.producto_id &&
        p.id !== formPrecioEspecial.id,
    )

    if (existePrecioEspecial) {
      alert("Ya existe un precio especial para este producto y cliente. Edite el existente.")
      return
    }

    if (formPrecioEspecial.id === 0) {
      // Crear nuevo precio especial
      const nuevoId = Math.max(0, ...preciosEspeciales.map((p) => p.id)) + 1
      setPreciosEspeciales([...preciosEspeciales, { ...formPrecioEspecial, id: nuevoId }])
      alert("Precio especial creado correctamente.")
    } else {
      // Actualizar precio especial existente
      setPreciosEspeciales(
        preciosEspeciales.map((p) => (p.id === formPrecioEspecial.id ? { ...formPrecioEspecial } : p)),
      )
      alert("Precio especial actualizado correctamente.")
    }

    setDialogoNuevoPrecioEspecial(false)
  }

  const handleEditarPrecioEspecial = (precioEspecial) => {
    setFormPrecioEspecial({ ...precioEspecial })
    setDialogoNuevoPrecioEspecial(true)
  }

  // Obtener el nombre del producto por ID
  const getProductoNombre = (productoId) => {
    const producto = productosEjemplo.find((p) => p.id === productoId)
    return producto ? producto.nombre : "Producto no encontrado"
  }

  // Obtener el precio estándar del producto por ID
  const getProductoPrecioEstandar = (productoId) => {
    const producto = productosEjemplo.find((p) => p.id === productoId)
    return producto ? producto.precio : 0
  }

  // Función para exportar a Excel
  const exportToExcel = () => {
    const filteredData = clientes.filter(cliente => {
      if (!dateRange.startDate || !dateRange.endDate) return true;
      const clienteDate = new Date(cliente.createdAt);
      return clienteDate >= new Date(dateRange.startDate) && 
             clienteDate <= new Date(dateRange.endDate);
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "reporte-clientes.xlsx");
  };

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    const tableData = clientes.map(cliente => ([
      cliente.id,
      cliente.nombre,
      cliente.telefono,
      cliente.email,
      cliente.direccion,
      cliente.frecuente ? 'Sí' : 'No'
    ]));

    doc.autoTable({
      head: [['ID', 'Nombre', 'Teléfono', 'Email', 'Dirección', 'Frecuente']],
      body: tableData,
      margin: { top: 10 },
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('clientes-reporte.pdf');
  };

  return (
    <div className="space-y-4">
      {/* Agregar este nuevo div justo al inicio del return, antes de tu contenido existente */}
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            className="border rounded p-2"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            className="border rounded p-2"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FileDown className="mr-2 h-4 w-4" /> Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <FileDown className="mr-2 h-4 w-4" /> PDF
          </button>
        </div>
      </div>

      {/* Modal para crear/editar cliente */}
      {dialogoNuevoCliente &&
        <ModalCliente
          isEditing={isEditing}
          setDialogoNuevoCliente={setDialogoNuevoCliente}
          clienteData={clienteActual}
        >
        </ModalCliente>}
      {/* {dialogoAbierto && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">{clienteActual ? "Editar Cliente" : "Nuevo Cliente"}</h3>
              <button
                onClick={() => setDialogoAbierto(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmitNewCliente)} className="p-4 space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  {...register('nombre', { required: true })}
                  placeholder="Nombre completo"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                <input
                  id="telefono"
                  type="text"
                  {...register('telefono', { required: true })}
                  placeholder="Número de teléfono"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register('email', { required: true })}
                  placeholder="Correo electrónico"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  {...register('direccion', { required: true })}
                  placeholder="Dirección completa"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                />
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="frecuente"
                    name="frecuente"
                    {...register('frecuente')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="frecuente"
                    className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cliente frecuente
                  </label>
                </div>
                {formData.frecuente && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Los clientes frecuentes pueden recibir precios especiales en productos específicos. Podrá gestionar
                    estos precios después de guardar el cliente.
                  </p>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {clienteActual ? "Guardar cambios" : "Crear cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}




      {/* Modal para confirmar eliminación */}
      {dialogoEliminar &&
        <ModalEliminarCliente
          idCliente={clienteActual.id}
          nombreCliente={clienteActual.nombre}
          setDialogoEliminar={setDialogoEliminar}>
        </ModalEliminarCliente>
      }
      {/* {dialogoEliminar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium">Confirmar eliminación</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar a {clienteActual?.nombre}? Esta acción no se puede deshacer.
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
                onClick={() => confirmarEliminar()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )} */}


      {/* Modal para ver precios especiales */}
      {dialogoPreciosEspeciales && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Gestión de Precios Especiales - {clienteActual?.nombre}</h3>
              <button
                onClick={() => setDialogoPreciosEspeciales(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Precios especiales asignados a este cliente.</p>
                <button
                  onClick={handleNuevoPrecioEspecial}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Asignar Nuevo Precio Especial
                </button>
              </div>

              <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Precio Estándar
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Precio Especial
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Descuento
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {preciosEspeciales.filter((p) => p.cliente_id === clienteActual?.id).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No hay precios especiales asignados a este cliente
                        </td>
                      </tr>
                    ) : (
                      preciosEspeciales
                        .filter((p) => p.cliente_id === clienteActual?.id)
                        .map((precioEspecial) => {
                          const precioEstandar = getProductoPrecioEstandar(precioEspecial.producto_id)
                          const descuentoPorcentaje = (
                            ((precioEstandar - precioEspecial.precio) / precioEstandar) *
                            100
                          ).toFixed(2)

                          return (
                            <tr key={precioEspecial.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {getProductoNombre(precioEspecial.producto_id)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                ${precioEstandar.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                ${precioEspecial.precio.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                ${precioEspecial.descuento.toFixed(2)} ({descuentoPorcentaje}%)
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                                  onClick={() => handleEditarPrecioEspecial(precioEspecial)}
                                  title="Editar precio especial"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-2"
                                  onClick={() => handleEliminarPrecioEspecial(precioEspecial.id)}
                                  title="Eliminar precio especial"
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
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setDialogoPreciosEspeciales(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear/editar precio especial */}
      {dialogoNuevoPrecioEspecial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {formPrecioEspecial.id ? "Editar Precio Especial" : "Nuevo Precio Especial"}
              </h3>
              <button
                onClick={() => setDialogoNuevoPrecioEspecial(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitPrecioEspecial} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Producto</label>
                <select
                  name="producto_id"
                  value={formPrecioEspecial.producto_id}
                  onChange={handleInputChangePrecioEspecial}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  required
                >
                  <option value="">Seleccionar producto</option>
                  {productosEjemplo.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre} - ${producto.precio.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {formPrecioEspecial.producto_id > 0 && (
                <>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <span className="text-sm font-medium">Precio estándar:</span>
                    <span className="font-bold">
                      ${getProductoPrecioEstandar(formPrecioEspecial.producto_id).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descuento ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <input
                        type="number"
                        name="descuento"
                        value={formPrecioEspecial.descuento}
                        onChange={handleInputChangePrecioEspecial}
                        step="0.01"
                        min="0"
                        max={getProductoPrecioEstandar(formPrecioEspecial.producto_id)}
                        className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Precio especial ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <input
                        type="number"
                        name="precio"
                        value={formPrecioEspecial.precio}
                        onChange={handleInputChangePrecioEspecial}
                        step="0.01"
                        min="0"
                        max={getProductoPrecioEstandar(formPrecioEspecial.producto_id)}
                        className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        required
                      />
                    </div>
                  </div>

                  {formPrecioEspecial.descuento > 0 && (
                    <div className="p-3 bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-sm">
                      Descuento del{" "}
                      {(
                        (formPrecioEspecial.descuento / getProductoPrecioEstandar(formPrecioEspecial.producto_id)) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setDialogoNuevoPrecioEspecial(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={!formPrecioEspecial.producto_id}
                >
                  {formPrecioEspecial.id ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




      {/* Barra de búsqueda y botón de nuevo cliente */}
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          />
        </div>
        <button
          onClick={() => handleDialogNuevoCliente()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </button>
      </div>

      {/* Tabla de clientes */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No se encontraron clientes
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {cliente.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {cliente.direccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {cliente.frecuente ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Frecuente
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cliente.frecuente && (
                      <button
                        className="inline-flex items-center px-2.5 py-1.5 mr-2 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800"
                        onClick={() => handleVerPreciosEspeciales(cliente)}
                      >
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        Precios Especiales
                      </button>
                    )}
                    <button
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                      onClick={() => handleEditarCliente(cliente)}
                      title="Editar cliente"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-2"
                      onClick={() => handleEliminarCliente(cliente)}
                      title="Eliminar cliente"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  )
}

// export default ClientesPage

export default function ClientesIndex() {
  return (
    <ClientesProvider>
      <ClientesPage />
    </ClientesProvider>
  );
}

