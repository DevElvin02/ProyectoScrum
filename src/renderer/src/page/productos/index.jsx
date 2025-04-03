import { useState, useContext } from 'react'
import { Plus } from 'lucide-react'
import { ToastContext } from '../../App'
import { SearchBar } from '../../components/shared/SearchBar'
import { Table } from '../../components/shared/Table'
import { ActionButtons } from '../../components/shared/ActionButtons'
import { Dialog } from '../../components/shared/Dialog'
import { DeleteDialog } from '../../components/shared/DeleteDialog'
import { FormInput } from '../../components/shared/FormInput'
import ProductosExport from "./ProductosExport";

// Datos de ejemplo
const productosIniciales = [
  {
    id: 1,
    nombre: 'Laptop Pro',
    descripcion: 'Laptop de alta gama para profesionales',
    precio: 1299.99,
    stock: 15,
    categoria: 'Computadoras'
  },
  {
    id: 2,
    nombre: 'Monitor 27"',
    descripcion: 'Monitor de 27 pulgadas 4K',
    precio: 349.99,
    stock: 30,
    categoria: 'Periféricos'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    descripcion: 'Teclado mecánico con retroiluminación RGB',
    precio: 89.99,
    stock: 50,
    categoria: 'Periféricos'
  },
  {
    id: 4,
    nombre: 'Mouse Inalámbrico',
    descripcion: 'Mouse ergonómico inalámbrico',
    precio: 45.99,
    stock: 100,
    categoria: 'Periféricos'
  },
  {
    id: 5,
    nombre: 'Auriculares Bluetooth',
    descripcion: 'Auriculares con cancelación de ruido',
    precio: 129.99,
    stock: 25,
    categoria: 'Periféricos'
  },
  {
    id: 6,
    nombre: 'Disco SSD 1TB',
    descripcion: 'Disco de estado sólido de 1TB',
    precio: 149.99,
    stock: 40,
    categoria: 'Repuestos'
  },
  {
    id: 7,
    nombre: 'Cámara Web HD',
    descripcion: 'Cámara web 1080p para videoconferencias',
    precio: 69.99,
    stock: 20,
    categoria: 'Accesorios'
  },
  {
    id: 8,
    nombre: 'Impresora Láser',
    descripcion: 'Impresora láser monocromática',
    precio: 199.99,
    stock: 10,
    categoria: 'Oficina'
  }
]

const categorias = [
  'Computadoras',
  'Periféricos',
  'Almacenamiento',
  'Audio',
  'Accesorios',
  'Impresoras',
  'Networking'
]

export default function Productos() {
  const [productos, setProductos] = useState(productosIniciales)
  const [productoActual, setProductoActual] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [dialogoEliminar, setDialogoEliminar] = useState(false)
  const { toast } = useContext(ToastContext)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: ''
  })

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  )
  
  const handleNuevoProducto = () => {
    setProductoActual(null)
    setFormData({
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0
    })
    setDialogoAbierto(true)
  }

  const handleEditarProducto = (producto) => {
    setProductoActual(producto)
    setFormData({ ...producto })
    setDialogoAbierto(true)
  }

  const handleEliminarProducto = (producto) => {
    setProductoActual(producto)
    setDialogoEliminar(true)
  }

  const confirmarEliminar = () => {
    if (productoActual) {
      setProductos(productos.filter((p) => p.id !== productoActual.id))
      toast({
        title: 'Producto eliminado',
        description: `Se ha eliminado "${productoActual.nombre}" correctamente.`
      })
      setDialogoEliminar(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (productoActual) {
      // Editar producto existente
      setProductos(
        productos.map((p) =>
          p.id === productoActual.id ? { ...formData, id: productoActual.id } : p
        )
      )
      toast({
        title: 'Producto actualizado',
        description: `Se ha actualizado "${formData.nombre}" correctamente.`
      })
    } else {
      // Crear nuevo producto
      const nuevoId = Math.max(0, ...productos.map((p) => p.id)) + 1
      setProductos([...productos, { ...formData, id: nuevoId }])
      toast({
        title: 'Producto creado',
        description: `Se ha creado "${formData.nombre}" correctamente.`
      })
    }
    setDialogoAbierto(false)
  }

  const getStockStatus = (stock) => {
    if (stock <= 0) return { label: 'Sin stock', variant: 'destructive' }
    if (stock < 10) return { label: 'Bajo', variant: 'destructive' }
    if (stock < 30) return { label: 'Medio', variant: 'warning' }
    return { label: 'Alto', variant: 'success' }
  }

  const getBadgeColor = (variant) => {
    if (variant === 'destructive') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    if (variant === 'warning') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    if (variant === 'success') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <SearchBar 
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar productos..."
        />
        <div className="flex space-x-2">
          <ProductosExport productos={productosFiltrados} />
          <button
            onClick={handleNuevoProducto}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </button>
        </div>
      </div>

      <Table
  headers={['ID', 'Nombre', 'Descripción', 'Categoría', 'Precio', 'Stock', 'Acciones']}
  empty="No se encontraron productos"
>
  {productosFiltrados.map(producto => {
    const stockStatus = getStockStatus(producto.stock)
    const badgeColor = getBadgeColor(stockStatus.variant)

    return (
      <tr key={producto.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{producto.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{producto.nombre}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">{producto.descripcion}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{producto.categoria}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">${producto.precio.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${badgeColor}`}>{stockStatus.label}</span>
            <span>{producto.stock} unidades</span>
          </div>
        </td>
        <ActionButtons
          onEdit={() => handleEditarProducto(producto)}
          onDelete={() => handleEliminarProducto(producto)}
        />
      </tr>
    )
  })}
</Table>

<Dialog
  open={dialogoAbierto}
  onClose={() => setDialogoAbierto(false)}
  title={productoActual ? 'Editar Producto' : 'Nuevo Producto'}
>
  <form onSubmit={handleSubmit} className="p-4 space-y-4">
    <FormInput
      label="Nombre"
      name="nombre"
      value={formData.nombre}
      onChange={handleInputChange}
      placeholder="Nombre del producto"
      required
    />
    <FormInput
      label="Descripción"
      name="descripcion"
      value={formData.descripcion}
      onChange={handleInputChange}
      placeholder="Descripción del producto"
      as="textarea"
      rows={3}
      required
    />
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Categoría
      </label>
      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md"
        required
      >
        <option value="">Seleccionar categoría</option>
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
    <FormInput
      label="Precio"
      name="precio"
      type="number"
      value={formData.precio}
      onChange={handleInputChange}
      placeholder="0.00"
      step="0.01"
      min="0"
      required
    />
    <FormInput
      label="Stock"
      name="stock"
      type="number"
      value={formData.stock}
      onChange={handleInputChange}
      placeholder="0"
      min="0"
      required
    />
    <div className="flex justify-end pt-4">
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        {productoActual ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </div>
  </form>
</Dialog>

      <DeleteDialog
        open={dialogoEliminar}
        onClose={() => setDialogoEliminar(false)}
        onConfirm={confirmarEliminar}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar ${productoActual?.nombre}? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}
