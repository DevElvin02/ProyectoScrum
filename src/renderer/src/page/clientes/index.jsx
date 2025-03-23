
import { useState, useContext } from "react"
import { Plus } from "lucide-react"
import { ToastContext } from "../../App"
import { SearchBar } from "../../components/shared/SearchBar"
import { Table } from "../../components/shared/Table"
import { ActionButtons } from "../../components/shared/ActionButtons"
import { Dialog } from "../../components/shared/Dialog"
import { DeleteDialog } from "../../components/shared/DeleteDialog"
import { FormInput } from "../../components/shared/FormInput"

const clientesIniciales = [
  { id: 1, nombre: "Juan Pérez", telefono: "555-1234", email: "juan@ejemplo.com", direccion: "Calle Principal 123" },
  { id: 2, nombre: "María López", telefono: "555-5678", email: "maria@ejemplo.com", direccion: "Avenida Central 456" },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    telefono: "555-9012",
    email: "carlos@ejemplo.com",
    direccion: "Plaza Mayor 789",
  },
  { id: 4, nombre: "Ana Martínez", telefono: "555-3456", email: "ana@ejemplo.com", direccion: "Calle Secundaria 101" },
  { id: 5, nombre: "Pedro Sánchez", telefono: "555-7890", email: "pedro@ejemplo.com", direccion: "Avenida Norte 202" },
]

export default function Clientes() {
  const [clientes, setClientes] = useState(clientesIniciales)
  const [clienteActual, setClienteActual] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [dialogoEliminar, setDialogoEliminar] = useState(false)
  const { toast } = useContext(ToastContext)

  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  })

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(busqueda.toLowerCase()) // Añadida búsqueda por teléfono
  )

  const handleNuevoCliente = () => {
    setClienteActual(null)
    setFormData({
      id: 0,
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",
    })
    setDialogoAbierto(true)
  }

  const handleEditarCliente = (cliente) => {
    setClienteActual(cliente)
    setFormData({ ...cliente })
    setDialogoAbierto(true)
  }

  const handleEliminarCliente = (cliente) => {
    setClienteActual(cliente)
    setDialogoEliminar(true)
  }

  const confirmarEliminar = () => {
    if (clienteActual) {
      setClientes(clientes.filter((c) => c.id !== clienteActual.id))
      toast({
        title: "Cliente eliminado",
        description: `Se ha eliminado a ${clienteActual.nombre} correctamente.`,
      })
      setDialogoEliminar(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (clienteActual) {
      setClientes(clientes.map((c) => (c.id === clienteActual.id ? { ...formData, id: clienteActual.id } : c)))
      toast({
        title: "Cliente actualizado",
        description: `Se ha actualizado a ${formData.nombre} correctamente.`,
      })
    } else {
      const nuevoId = Math.max(0, ...clientes.map((c) => c.id)) + 1
      setClientes([...clientes, { ...formData, id: nuevoId }])
      toast({
        title: "Cliente creado",
        description: `Se ha creado a ${formData.nombre} correctamente.`,
      })
    }
    setDialogoAbierto(false)
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar clientes..."
        />
        <button
          onClick={handleNuevoCliente}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </button>
      </div>

      <Table
        headers={['ID', 'Nombre', 'Teléfono', 'Email', 'Dirección', 'Acciones']}
        empty="No se encontraron clientes"
      >
        {clientesFiltrados.map(cliente => (
          <tr key={cliente.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.telefono}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.direccion}</td>
            <ActionButtons
              onEdit={() => handleEditarCliente(cliente)}
              onDelete={() => handleEliminarCliente(cliente)}
            />
          </tr>
        ))}
      </Table>

      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        title={clienteActual ? 'Editar Cliente' : 'Nuevo Cliente'}
      >
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <FormInput
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            required
          />
          <FormInput
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Número de teléfono"
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
            required
          />
          <FormInput
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Dirección completa"
            required
          />
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {clienteActual ? 'Guardar cambios' : 'Crear cliente'}
            </button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        open={dialogoEliminar}
        onClose={() => setDialogoEliminar(false)}
        onConfirm={confirmarEliminar}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${clienteActual?.nombre}? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}

