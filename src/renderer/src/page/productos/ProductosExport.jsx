import ExportOptions from "../../components/shared/ExportOptions"
import { exportToPDF, exportToExcel } from "../../services/exportService"

const ProductosExport = ({ productos }) => {
  // Columnas para exportación
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Descripción", accessor: "descripcion" },
    { header: "Precio", accessor: (item) => formatCurrency(item.precio) },
    { header: "Stock", accessor: "stock" },
  ]

  const handleExport = ({ startDate, endDate, type }) => {
    if (type === "pdf") {
      exportToPDF(productos, columns, "Catálogo de Productos", { startDate, endDate })
    } else {
      exportToExcel(productos, columns, "Catálogo de Productos", { startDate, endDate })
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  return <ExportOptions onExport={handleExport} title="Exportar productos" />
}

export default ProductosExport

