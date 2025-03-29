import ExportOptions from "../../components/shared/ExportOptions"
import { exportToPDF, exportToExcel } from "../../services/exportService"

// Este componente se puede incluir en cualquier dashboard donde necesites exportación
const PedidosExport = ({ pedidos }) => {
  // Columnas para exportación básica (PDF)
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Fecha", accessor: (item) => formatDate(item.fecha) },
    { header: "Total", accessor: (item) => formatCurrency(item.total) },
    { header: "Estado", accessor: "estado" },
  ]

  // Columnas detalladas para exportación (Excel)
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
    const filteredByDate = pedidos.filter((pedido) => {
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

  return <ExportOptions onExport={handleExport} title="Exportar pedidos" />
}

export default PedidosExport

