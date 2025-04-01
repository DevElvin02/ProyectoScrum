"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Tag, Calendar, PercentCircle, CheckCircle, XCircle } from "lucide-react"
import ExportOptions from "../../components/shared/ExportOptions"
// import { exportToPDF, exportToExcel } from "../../services/exportService"
import OfertaForm from "./OfertaForm"

// Datos de ejemplo para ofertas
const initialOfertas = [
  {
    id: 1,
    nombre: "Descuento de Verano",
    descripcion: "20% de descuento en todos los productos de temporada",
    porcentaje: 20,
    fechaInicio: "2023-06-01",
    fechaFin: "2023-08-31",
    estado: "Activa",
    productos: ["Laptop Pro", "Monitor UltraWide", "Teclado Mecánico"],
    condiciones: "Aplica solo para compras en línea",
  },
  {
    id: 2,
    nombre: "Oferta Flash",
    descripcion: "30% de descuento en periféricos",
    porcentaje: 30,
    fechaInicio: "2023-12-10",
    fechaFin: "2023-12-12",
    estado: "Activa",
    productos: ["Mouse Inalámbrico", "Teclado Mecánico", "Auriculares Bluetooth"],
    condiciones: "Máximo 2 unidades por cliente",
  },
  {
    id: 3,
    nombre: "Black Friday",
    descripcion: "Hasta 40% de descuento en productos seleccionados",
    porcentaje: 40,
    fechaInicio: "2023-11-24",
    fechaFin: "2023-11-27",
    estado: "Inactiva",
    productos: ["Laptop Pro", "Monitor UltraWide", "Auriculares Bluetooth"],
    condiciones: "Hasta agotar existencias",
  },
  {
    id: 4,
    nombre: "Descuento para Clientes Frecuentes",
    descripcion: "15% de descuento para clientes con más de 5 compras",
    porcentaje: 15,
    fechaInicio: "2023-01-01",
    fechaFin: "2023-12-31",
    estado: "Activa",
    productos: ["Todos los productos"],
    condiciones: "Cliente debe tener al menos 5 compras previas",
  },
  {
    id: 5,
    nombre: "Promoción de Lanzamiento",
    descripcion: "25% de descuento en nuevos productos",
    porcentaje: 25,
    fechaInicio: "2023-10-15",
    fechaFin: "2023-11-15",
    estado: "Inactiva",
    productos: ["Laptop Pro 2023", 'Monitor Curvo 32"'],
    condiciones: "No acumulable con otras promociones",
  },
]

const OfertasDashboard = () => {
  const [ofertas, setOfertas] = useState(initialOfertas)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todas")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedOferta, setSelectedOferta] = useState(null)
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  // Filtrar ofertas basado en término de búsqueda y estado
  const filteredOfertas = ofertas.filter((oferta) => {
    const matchesSearch =
      oferta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oferta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())

    if (filtroEstado === "todas") return matchesSearch
    return matchesSearch && oferta.estado.toLowerCase() === filtroEstado.toLowerCase()
  })

  // Ofertas activas para el panel de control
  const ofertasActivas = ofertas.filter((oferta) => oferta.estado === "Activa")

  // Columnas para exportación
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Descripción", accessor: "descripcion" },
    { header: "Descuento", accessor: (item) => `${item.porcentaje}%` },
    { header: "Fecha Inicio", accessor: "fechaInicio" },
    { header: "Fecha Fin", accessor: "fechaFin" },
    { header: "Estado", accessor: "estado" },
    { header: "Productos", accessor: (item) => item.productos.join(", ") },
    { header: "Condiciones", accessor: "condiciones" },
  ]

  const handleExport = ({ startDate, endDate, type }) => {
    // Filtrar ofertas por fecha si es necesario
    const filteredByDate = filteredOfertas.filter((oferta) => {
      const ofertaStartDate = new Date(oferta.fechaInicio)
      const ofertaEndDate = new Date(oferta.fechaFin)
      const start = new Date(startDate)
      const end = new Date(endDate)

      // Una oferta está dentro del rango si:
      // 1. Su fecha de inicio está dentro del rango, o
      // 2. Su fecha de fin está dentro del rango, o
      // 3. El rango está completamente dentro del período de la oferta
      return (
        (ofertaStartDate >= start && ofertaStartDate <= end) ||
        (ofertaEndDate >= start && ofertaEndDate <= end) ||
        (ofertaStartDate <= start && ofertaEndDate >= end)
      )
    })

    if (type === "pdf") {
      exportToPDF(filteredByDate, columns, "Reporte de Ofertas y Descuentos", { startDate, endDate })
    } else {
      exportToExcel(filteredByDate, columns, "Reporte de Ofertas y Descuentos", { startDate, endDate })
    }
  }

  const handleSubmit = (formData) => {
    if (selectedOferta) {
      // Editar oferta existente
      setOfertas(
        ofertas.map((oferta) => (oferta.id === selectedOferta.id ? { ...formData, id: selectedOferta.id } : oferta)),
      )
    } else {
      // Añadir nueva oferta
      const newId = Math.max(...ofertas.map((o) => o.id)) + 1
      setOfertas([...ofertas, { ...formData, id: newId }])
    }

    setIsFormOpen(false)
    setSelectedOferta(null)
  }

  const handleEdit = (oferta) => {
    setSelectedOferta(oferta)
    setIsFormOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
      setOfertas(ofertas.filter((oferta) => oferta.id !== id))
    }
  }

  const toggleEstado = (id) => {
    setOfertas(
      ofertas.map((oferta) => {
        if (oferta.id === id) {
          const nuevoEstado = oferta.estado === "Activa" ? "Inactiva" : "Activa"
          return { ...oferta, estado: nuevoEstado }
        }
        return oferta
      }),
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const isOfertaVigente = (fechaInicio, fechaFin) => {
    const today = new Date()
    const inicio = new Date(fechaInicio)
    const fin = new Date(fechaFin)
    return today >= inicio && today <= fin
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Ofertas y Descuentos</h2>
        <div className="flex space-x-2">
          <ExportOptions onExport={handleExport} title="Exportar ofertas" />
          <button
            onClick={() => {
              setSelectedOferta(null)
              setIsFormOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Oferta
          </button>
        </div>
      </div>

      {/* Panel de control de ofertas activas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Panel de Ofertas Activas</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {ofertasActivas.length} ofertas activas
          </span>
        </div>
        <div className="border-t border-gray-200">
          {ofertasActivas.length === 0 ? (
            <div className="px-4 py-5 sm:p-6 text-center text-gray-500">No hay ofertas activas en este momento.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {ofertasActivas.map((oferta) => (
                <div
                  key={oferta.id}
                  className={`border rounded-lg p-4 ${
                    isOfertaVigente(oferta.fechaInicio, oferta.fechaFin)
                      ? "bg-green-50 border-green-200"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium text-gray-900">{oferta.nombre}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {oferta.porcentaje}% OFF
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{oferta.descripcion}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {formatDate(oferta.fechaInicio)} - {formatDate(oferta.fechaFin)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Productos:</span> {oferta.productos.join(", ")}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(oferta)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Editar oferta"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleEstado(oferta.id)}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Desactivar oferta"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Buscar ofertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600"
              name="filtroEstado"
              value="todas"
              checked={filtroEstado === "todas"}
              onChange={() => setFiltroEstado("todas")}
            />
            <span className="ml-2 text-sm text-gray-700">Todas</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600"
              name="filtroEstado"
              value="activa"
              checked={filtroEstado === "activa"}
              onChange={() => setFiltroEstado("activa")}
            />
            <span className="ml-2 text-sm text-gray-700">Activas</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600"
              name="filtroEstado"
              value="inactiva"
              checked={filtroEstado === "inactiva"}
              onChange={() => setFiltroEstado("inactiva")}
            />
            <span className="ml-2 text-sm text-gray-700">Inactivas</span>
          </label>
        </div>
      </div>

      {/* Formulario de oferta */}
      {isFormOpen && (
        <OfertaForm
          onSubmit={handleSubmit}
          initialData={selectedOferta}
          onCancel={() => {
            setIsFormOpen(false)
            setSelectedOferta(null)
          }}
          isEditing={!!selectedOferta}
        />
      )}

      {/* Lista de todas las ofertas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Listado de Ofertas y Descuentos</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{filteredOfertas.length} ofertas encontradas</p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Oferta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Descuento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vigencia
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOfertas.map((oferta) => (
                  <tr key={oferta.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Tag className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{oferta.nombre}</div>
                          <div className="text-sm text-gray-500">{oferta.descripcion}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PercentCircle className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{oferta.porcentaje}%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {oferta.productos.length > 1 ? `${oferta.productos.length} productos` : oferta.productos[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(oferta.fechaInicio)} - {formatDate(oferta.fechaFin)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isOfertaVigente(oferta.fechaInicio, oferta.fechaFin)
                          ? "Vigente"
                          : new Date() < new Date(oferta.fechaInicio)
                            ? "Próximamente"
                            : "Expirada"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          oferta.estado === "Activa" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {oferta.estado === "Activa" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {oferta.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(oferta)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar oferta"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => toggleEstado(oferta.id)}
                          className={`${
                            oferta.estado === "Activa"
                              ? "text-yellow-600 hover:text-yellow-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                          title={oferta.estado === "Activa" ? "Desactivar oferta" : "Activar oferta"}
                        >
                          {oferta.estado === "Activa" ? (
                            <XCircle className="h-5 w-5" />
                          ) : (
                            <CheckCircle className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(oferta.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar oferta"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfertasDashboard

