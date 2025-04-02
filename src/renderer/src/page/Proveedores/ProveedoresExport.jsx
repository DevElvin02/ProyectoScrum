import ExportOptions from "../../components/shared/ExportOptions"
import { exportToPDF, exportToExcel } from "../../services/exportService"

const ProveedoresExport = ({ proveedores }) => {
  // Columnas para exportación
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Contacto", accessor: "contact" },
    { header: "Email", accessor: "email" },
    { header: "Tipo de Insumo", accessor: "supplyType" },
    { header: "Categoría", accessor: "category" },
  ]

  // Columnas detalladas para Excel (incluye historial de compras si está disponible)
  const detailedColumns = [
    ...columns,
    {
      header: "Última Compra",
      accessor: (item) =>
        item.purchases && item.purchases.length > 0
          ? formatDate(item.purchases[item.purchases.length - 1].date)
          : "N/A",
    },
    {
      header: "Total Compras",
      accessor: (item) =>
        item.purchases ? formatCurrency(item.purchases.reduce((sum, p) => sum + p.amount, 0)) : "N/A",
    },
  ]

  const handleExport = ({ startDate, endDate, type }) => {
    if (type === "pdf") {
      exportToPDF(proveedores, columns, "Directorio de Proveedores", { startDate, endDate })
    } else {
      exportToExcel(proveedores, detailedColumns, "Directorio de Proveedores", { startDate, endDate })
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

  return <ExportOptions onExport={handleExport} title="Exportar proveedores" />
}

export default ProveedoresExport

