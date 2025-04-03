"use client"

import { useState } from "react"
import { Search, Plus, Eye, Trash2, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import { exportToPDF, exportToExcel } from "../../services/exportService"
import PedidosExport from "./PedidosExport"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Datos de ejemplo para pedidos
const initialPedidos = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nombre: "Juan Pérez",
    fecha: "2023-12-01",
    total: 1299.99,
    estado: "Completado",
    items: [{ producto_id: 1, nombre: "Laptop Pro", cantidad: 1, precio: 1299.99, subtotal: 1299.99 }],
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nombre: "María López",
    fecha: "2023-12-02",
    total: 635.97,
    estado: "En proceso",
    items: [
      { producto_id: 3, nombre: "Teclado Mecánico", cantidad: 2, precio: 89.99, subtotal: 179.98 },
      { producto_id: 4, nombre: "Mouse Inalámbrico", cantidad: 1, precio: 45.99, subtotal: 45.99 },
      { producto_id: 5, nombre: "Auriculares Bluetooth", cantidad: 1, precio: 129.99, subtotal: 129.99 },
    ],
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nombre: "Carlos Rodríguez",
    fecha: "2023-12-03",
    total: 499.99,
    estado: "Pendiente",
    items: [{ producto_id: 2, nombre: "Monitor UltraWide", cantidad: 1, precio: 499.99, subtotal: 499.99 }],
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nombre: "Ana Martínez",
    fecha: "2023-12-04",
    total: 259.98,
    estado: "Cancelado",
    items: [{ producto_id: 5, nombre: "Auriculares Bluetooth", cantidad: 2, precio: 129.99, subtotal: 259.98 }],
  },
  {
    id: 5,
    cliente_id: 1,
    cliente_nombre: "Juan Pérez",
    fecha: "2023-12-05",
    total: 589.98,
    estado: "Completado",
    items: [
      { producto_id: 3, nombre: "Teclado Mecánico", cantidad: 1, precio: 89.99, subtotal: 89.99 },
      { producto_id: 2, nombre: "Monitor UltraWide", cantidad: 1, precio: 499.99, subtotal: 499.99 },
    ],
  },
]

export const exportToPDF = (data, columns, title, options = {}) => {
  const doc = new jsPDF();
  const { startDate, endDate } = options;

  // Título
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Fechas del reporte
  if (startDate && endDate) {
    doc.setFontSize(10);
    doc.text(`Período: ${startDate} - ${endDate}`, 14, 25);
  }

  // Preparar datos para la tabla
  const tableData = data.map(item => 
    columns.map(col => {
      if (typeof col.accessor === 'function') {
        return col.accessor(item);
      }
      return item[col.accessor];
    })
  );

  doc.autoTable({
    head: [columns.map(col => col.header)],
    body: tableData,
    startY: startDate && endDate ? 30 : 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [63, 81, 181] }
  });

  doc.save(`${title.toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (data, columns, title, options = {}) => {
  const { startDate, endDate } = options;

  // Preparar datos para Excel
  const excelData = data.map(item => {
    const row = {};
    columns.forEach(col => {
      if (typeof col.accessor === 'function') {
        row[col.header] = col.accessor(item);
      } else {
        row[col.header] = item[col.accessor];
      }
    });
    return row;
  });

  // Crear libro de trabajo
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Agregar metadatos
  if (startDate && endDate) {
    XLSX.utils.sheet_add_aoa(ws, 
      [[`${title} - Período: ${startDate} - ${endDate}`]], 
      { origin: 'A1' }
    );
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Datos');
  XLSX.writeFile(wb, `${title.toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

const PedidosDashboard = () => {
  const [pedidos, setPedidos] = useState(initialPedidos)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPedido, setSelectedPedido] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filtrar pedidos basado en término de búsqueda
  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.id.toString().includes(searchTerm),
  )

  // Columnas para exportación
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Fecha", accessor: (item) => formatDate(item.fecha) },
    { header: "Total", accessor: (item) => formatCurrency(item.total) },
    { header: "Estado", accessor: "estado" },
  ]

  // Columnas detalladas para exportación
  const detailedColumns = [
    { header: "ID Pedido", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Fecha", accessor: (item) => formatDate(item.fecha) },
    { header: "Producto", accessor: (item) => item.items.map((i) => i.nombre).join(", ") },
    { header: "Cantidad", accessor: (item) => item.items.map((i) => i.cantidad).join(", ") },
    { header: "Precio Unitario", accessor: (item) => item.items.map((i) => formatCurrency(i.precio)).join(", ") },
    { header: "Subtotal", accessor: (item) => item.items.map((i) => formatCurrency(i.subtotal)).join(", ") },
    { header: "Total", accessor: (item) => formatCurrency(item.total) },
    { header: "Estado", accessor: "estado" },
  ]

  const handleExport = ({ startDate, endDate, type }) => {
    // Filtrar pedidos por fecha si es necesario
    const filteredByDate = filteredPedidos.filter((pedido) => {
      const pedidoDate = new Date(pedido.fecha)
      const start = new Date(startDate)
      const end = new Date(endDate)
      return pedidoDate >= start && pedidoDate <= end
    })

    if (type === "pdf") {
      exportToPDF(filteredByDate, columns, "Reporte de Pedidos", { startDate, endDate })
    } else {
      exportToExcel(filteredByDate, detailedColumns, "Reporte de Pedidos", { startDate, endDate })
    }
  }

  const handleViewDetails = (pedido) => {
    setSelectedPedido(pedido)
    setIsDetailsOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      setPedidos(pedidos.filter((pedido) => pedido.id !== id))
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completado":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "en proceso":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "pendiente":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "cancelado":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h2>
        <div className="flex space-x-2">
          <PedidosExport pedidos={filteredPedidos} />
          <button
            onClick={() => {
              // Aquí iría la lógica para crear un nuevo pedido
              alert("Funcionalidad para crear nuevo pedido")
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Pedido
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
          placeholder="Buscar por cliente, estado o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de pedidos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Pedidos</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{filteredPedidos.length} pedidos encontrados</p>
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
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
                {filteredPedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{pedido.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.cliente_nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pedido.fecha)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(pedido.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {getStatusIcon(pedido.estado)}
                        <span className="ml-1">{pedido.estado}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(pedido)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Ver detalles"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(pedido.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar pedido"
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

      {/* Detalles del pedido */}
      {isDetailsOpen && selectedPedido && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Detalles del Pedido #{selectedPedido.id}</h3>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedPedido.cliente_nombre}</p>
                </div>
                <div className="sm:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedPedido.fecha)}</p>
                </div>
                <div className="sm:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    {getStatusIcon(selectedPedido.estado)}
                    <span className="ml-1">{selectedPedido.estado}</span>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Total</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(selectedPedido.total)}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500">Productos</h4>
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Producto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Cantidad
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Precio Unitario
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPedido.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.cantidad}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.precio)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(item.subtotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          Total:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(selectedPedido.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PedidosDashboard

