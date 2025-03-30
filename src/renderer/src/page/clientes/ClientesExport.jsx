import ExportOptions from "../../components/shared/ExportOptions"
import { exportToPDF, exportToExcel } from "../../services/exportService"

// Ejemplo de servicio para clientes
const guardarCliente = async (cliente) => {
  try {
    // Validar datos
    if (!cliente.nombre || !cliente.email) {
      throw new Error('Datos incompletos');
    }

    // Llamar a la base de datos
    const result = await db.clientes.insert(cliente);
    
    // Verificar resultado
    if (!result) {
      throw new Error('Error al guardar cliente');
    }

    return result;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const ClientesExport = ({ clientes }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Email", accessor: "email" },
    { header: "Dirección", accessor: "direccion" },
  ]

  const handleExport = async ({ startDate, endDate, type }) => {
    try {
      // Verificar si hay datos para exportar
      if (!clientes || clientes.length === 0) {
        console.error("No hay datos de clientes para exportar");
        return;
      }

      // Limpiar y validar los datos antes de exportar
      const dataToExport = clientes.map(cliente => ({
        id: cliente.id || '',
        nombre: cliente.nombre || '',
        telefono: cliente.telefono || '',
        email: cliente.email || '',
        direccion: cliente.direccion || ''
      }));

      if (type === "pdf") {
        await exportToPDF(dataToExport, columns, "Listado de Clientes", { startDate, endDate });
      } else {
        await exportToExcel(dataToExport, columns, "Listado de Clientes", { startDate, endDate });
      }
    } catch (error) {
      console.error("Error al exportar:", error);
    }
  }

  return <ExportOptions onExport={handleExport} title="Exportar clientes" />
}

export default ClientesExport

