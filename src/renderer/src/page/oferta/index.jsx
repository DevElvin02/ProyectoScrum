import { useState, useContext } from 'react'
import { Plus } from 'lucide-react'
import { ToastContext } from '../../App'
import { SearchBar } from '../../components/shared/SearchBar'
import { Table } from '../../components/shared/Table'
import { ActionButtons } from '../../components/shared/ActionButtons'
import { Dialog } from '../../components/shared/Dialog'
import { DeleteDialog } from '../../components/shared/DeleteDialog'
import { FormInput } from '../../components/shared/FormInput'

// Datos de ejemplo para ofertas
const ofertasIniciales = [
  {
    id: 1,
    nombre: 'Descuento Verano',
    descripcion: '20% de descuento en productos seleccionados',
    descuento: 20,
    fechaInicio: '2025-06-01',
    fechaFin: '2025-08-31',
    estado: 'Activa',
    productosAplicables: ['Laptop Pro', 'Monitor 27"']
  },
  {
    id: 2,
    nombre: 'Oferta Flash',
    descripcion: 'Descuento relámpago por tiempo limitado',
    descuento: 15,
    fechaInicio: '2025-03-30',
    fechaFin: '2025-04-02',
    estado: 'Activa',
    productosAplicables: ['Teclado Mecánico', 'Mouse Inalámbrico']
  },
  {
    id: 3,
    nombre: 'Promoción Aniversario',
    descripcion: 'Celebra nuestro aniversario con grandes descuentos',
    descuento: 25,
    fechaInicio: '2025-05-15',
    fechaFin: '2025-05-30',
    estado: 'Próxima',
    productosAplicables: ['Auriculares Bluetooth', 'Disco SSD 1TB']
  },
  {
    id: 4,
    nombre: 'Liquidación Invierno',
    descripcion: 'Liquidación de productos de temporada invernal',
    descuento: 30,
    fechaInicio: '2025-01-10',
    fechaFin: '2025-02-28',
    estado: 'Finalizada',
    productosAplicables: ['Cámara Web HD', 'Impresora Láser']
  }
]

const estadosOferta = ['Activa', 'Próxima', 'Finalizada', 'Cancelada']
const productosDisponibles = [
  'Laptop Pro',
  'Monitor 27"',
  'Teclado Mecánico',
  'Mouse Inalámbrico',
  'Auriculares Bluetooth',
  'Disco SSD 1TB',
  'Cámara Web HD',
  'Impresora Láser'
]

export default function Ofertas() {
  const [ofertas, setOfertas] = useState(ofertasIniciales)
  const [ofertaActual, setOfertaActual] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [dialogoEliminar, setDialogoEliminar] = useState(false)
  const { toast } = useContext(ToastContext)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    descripcion: '',
    descuento: 0,
    fechaInicio: '',
    fechaFin: '',
    estado: 'Activa',
    productosAplicables: []
  })

  const ofertasFiltradas = ofertas.filter(
    (oferta) =>
      oferta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      oferta.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      oferta.estado.toLowerCase().includes(busqueda.toLowerCase())
  )
  
  const handleNuevaOferta = () => {
    setOfertaActual(null)
    setFormData({
      id: 0,
      nombre: '',
      descripcion: '',
      descuento: 0,
      fechaInicio: '',
      fechaFin: '',
      estado: 'Activa',
      productosAplicables: []
    })
    setDialogoAbierto(true)
  }

  const handleEditarOferta = (oferta) => {
    setOfertaActual(oferta)
    setFormData({ ...oferta })
    setDialogoAbierto(true)
  }

  const handleEliminarOferta = (oferta) => {
    setOfertaActual(oferta)
    setDialogoEliminar(true)
  }

  const confirmarEliminar = () => {
    if (ofertaActual) {
      setOfertas(ofertas.filter((o) => o.id !== ofertaActual.id))
      toast({
        title: 'Oferta eliminada',
        description: `Se ha eliminado "${ofertaActual.nombre}" correctamente.`
      })
      setDialogoEliminar(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (e) => {
    const options = e.target.options
    const selectedProducts = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedProducts.push(options[i].value)
      }
    }
    setFormData({
      ...formData,
      productosAplicables: selectedProducts
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (ofertaActual) {
      // Editar oferta existente
      setOfertas(
        ofertas.map((o) =>
          o.id === ofertaActual.id ? { ...formData, id: ofertaActual.id } : o
        )
      )
      toast({
        title: 'Oferta actualizada',
        description: `Se ha actualizado "${formData.nombre}" correctamente.`
      })
    } else {
      // Crear nueva oferta
      const nuevoId = Math.max(0, ...ofertas.map((o) => o.id)) + 1
      setOfertas([...ofertas, { ...formData, id: nuevoId }])
      toast({
        title: 'Oferta creada',
        description: `Se ha creado "${formData.nombre}" correctamente.`
      })
    }
    setDialogoAbierto(false)
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activa':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Próxima':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Finalizada':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'Cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <SearchBar 
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar ofertas..."
        />
        <button
          onClick={handleNuevaOferta}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Nueva Oferta
        </button>
      </div>

      <Table
        headers={['ID', 'Nombre', 'Descuento', 'Fechas', 'Estado', 'Productos', 'Acciones']}
        empty="No se encontraron ofertas"
      >
        {ofertasFiltradas.map(oferta => {
          const estadoColor = getEstadoColor(oferta.estado)
          
          return (
            <tr key={oferta.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{oferta.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {oferta.nombre}
                <p className="text-xs text-gray-500">{oferta.descripcion}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="font-bold">{oferta.descuento}%</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex flex-col">
                  <span>Inicio: {oferta.fechaInicio}</span>
                  <span>Fin: {oferta.fechaFin}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 text-xs rounded-full ${estadoColor}`}>
                  {oferta.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="max-w-xs truncate">
                  {oferta.productosAplicables.join(', ')}
                </div>
              </td>
              <ActionButtons
                onEdit={() => handleEditarOferta(oferta)}
                onDelete={() => handleEliminarOferta(oferta)}
              />
            </tr>
          )
        })}
      </Table>

      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        title={ofertaActual ? 'Editar Oferta' : 'Nueva Oferta'}
      >
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <FormInput
            label="Nombre de la oferta"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre descriptivo de la oferta"
            required
          />
          <FormInput
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Detalles de la oferta"
            as="textarea"
            rows={3}
            required
          />
          <FormInput
            label="Descuento (%)"
            name="descuento"
            type="number"
            value={formData.descuento}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            max="100"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Fecha de inicio"
              name="fechaInicio"
              type="date"
              value={formData.fechaInicio}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Fecha de fin"
              name="fechaFin"
              type="date"
              value={formData.fechaFin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {estadosOferta.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Productos aplicables
            </label>
            <select
              multiple
              name="productosAplicables"
              value={formData.productosAplicables}
              onChange={handleSelectChange}
              className="w-full px-3 py-2 border rounded-md h-32"
              required
            >
              {productosDisponibles.map(producto => (
                <option key={producto} value={producto}>{producto}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500">Mantén presionado Ctrl para seleccionar múltiples productos</p>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {ofertaActual ? 'Guardar cambios' : 'Crear oferta'}
            </button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        open={dialogoEliminar}
        onClose={() => setDialogoEliminar(false)}
        onConfirm={confirmarEliminar}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar la oferta "${ofertaActual?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}