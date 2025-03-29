import ExportOptions from "../../components/shared/ExportOptions"
import { exportToPDF, exportToExcel } from "../../services/exportService"

const ClientesExport = ({ clientes }) => {
  // Columnas para exportación
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Email", accessor: "email" },
    { header: "Dirección", accessor: "direccion" },
  ]

  const handleExport = ({ startDate, endDate, type }) => {
    // En un caso real, filtrarías los datos por fecha
    // Aquí simplemente pasamos todos los datos
    if (type === "pdf") {
      exportToPDF(clientes, columns, "Listado de Clientes", { startDate, endDate })
    } else {
      exportToExcel(clientes, columns, "Listado de Clientes", { startDate, endDate })
    }
  }

  return <ExportOptions onExport={handleExport} title="Exportar clientes" />
}

export default ClientesExport

