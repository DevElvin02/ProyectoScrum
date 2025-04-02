import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import SupplierForm from '../../components/shared/SupplierForm'
import SupplierList from '../../components/shared/SupplierList'
import PurchaseHistory from '../../components/shared/PurchaseHistory'
import ExportOptions from '../../components/shared/ExportOptions'

import { useProvider, PageProvider } from '../context/Proveedores'

// Datos de ejemplo para proveedores
const initialSuppliers = [
  {
    id: 1,
    name: 'Distribuidora ABC111',
    contact: '555-1234',
    email: 'contacto@abc.com',
    supplyType: 'Materias primas',
    category: 'Alimentos'
  },
  {
    id: 2,
    name: 'Insumos XYZ',
    contact: '123-112',
    email: 'ventas@xyz.com',
    supplyType: 'Empaques',
    category: 'Plásticos'
  },
  {
    id: 3,
    name: 'Proveedora Nacional',
    contact: '555-9012',
    email: 'info@provnacional.com',
    supplyType: 'Equipamiento',
    category: 'Maquinaria'
  }
]

// Datos de ejemplo para historial de compras
const initialPurchaseHistory = [
  { id: 1, supplierId: 1, date: '2023-10-15', amount: 1500.0, items: 'Harina, Azúcar, Sal' },
  { id: 2, supplierId: 1, date: '2023-11-20', amount: 2300.0, items: 'Harina, Levadura' },
  { id: 3, supplierId: 2, date: '2023-10-10', amount: 800.0, items: 'Bolsas, Cajas' },
  { id: 4, supplierId: 3, date: '2023-09-05', amount: 12000.0, items: 'Batidora Industrial' },
  { id: 5, supplierId: 2, date: '2023-12-01', amount: 950.0, items: 'Etiquetas, Cintas' }
]

const ProveedoresPage = () => {
  const { supplysList, addSupply } = useProvider()

  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [purchases, setPurchases] = useState(initialPurchaseHistory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Filtrar proveedores basado en término de búsqueda
  const filteredSuppliers = supplysList.filter(
    (supplier) =>
      supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Obtener historial de compras para el proveedor seleccionado
  const supplierPurchases = selectedSupplier
    ? purchases.filter((purchase) => purchase.supplierId === selectedSupplier.id)
    : []

  // FUNCION PARA AGREGAR UN PROVEEDOR
  const handleAddSupplier = async (newSupplier) => {
    // const id = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1
    // setSuppliers([...suppliers, { ...newSupplier, id }])
    await addSupply(newSupplier)
    setIsFormOpen(false)

  }

  const handleEditSupplier = (updatedSupplier) => {
    setSuppliers(
      suppliers.map((supplier) => (supplier.id === updatedSupplier.id ? updatedSupplier : supplier))
    )
    setIsEditing(false)
    setIsFormOpen(false)
    setSelectedSupplier(null)
  }

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
    if (selectedSupplier && selectedSupplier.id === id) {
      setSelectedSupplier(null)
    }
  }

  const startEdit = (supplier) => {
    setSelectedSupplier(supplier)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const viewPurchaseHistory = (supplier) => {
    setSelectedSupplier(supplier)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Registro de Proveedores de Insumos</h2>
        <div className="flex gap-4">
          <ExportOptions data={filteredSuppliers} filename="proveedores" />
          <button
            onClick={() => {
              setIsEditing(false)
              setSelectedSupplier(null)
              setIsFormOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proveedor
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario de Proveedor */}
        {isFormOpen && (
          <div className="lg:col-span-1">
            <SupplierForm
              onSubmit={isEditing ? handleEditSupplier : handleAddSupplier}
              initialData={isEditing ? selectedSupplier : null}
              onCancel={() => {
                setIsFormOpen(false)
                setIsEditing(false)
                setSelectedSupplier(null)
              }}
              isEditing={isEditing}
            />
          </div>
        )}

        {/* Lista de Proveedores */}
        <div className={`${isFormOpen ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <SupplierList
            suppliers={filteredSuppliers}
            onEdit={startEdit}
            onDelete={handleDeleteSupplier}
            onViewHistory={viewPurchaseHistory}
            selectedSupplierId={selectedSupplier?.id}
          />
        </div>
      </div>

      {/* Historial de Compras */}
      {selectedSupplier && (
        <div className="mt-6">
          <PurchaseHistory
            supplier={selectedSupplier}
            purchases={supplierPurchases}
            onClose={() => setSelectedSupplier(null)}
          />
        </div>
      )}
    </div>
  )
}


export default function index() {
  return (
    <PageProvider>
      <ProveedoresPage></ProveedoresPage>
    </PageProvider>
  )
}







// export default ProveedoresPage













