import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import SupplierForm from '../../components/shared/SupplierForm'
import SupplierList from '../../components/shared/SupplierList'
import PurchaseHistory from '../../components/shared/PurchaseHistory'
import ExportOptions from '../../components/shared/ExportOptions'
import ProveedoresExport from "./ProveedoresExport";

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-2">
          <ProveedoresExport proveedores={filteredSuppliers} />
          <button
            onClick={() => {
              setIsEditing(false)
              setSelectedSupplier(null)
              setIsFormOpen(true)
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Nuevo Proveedor
          </button>
        </div>
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













