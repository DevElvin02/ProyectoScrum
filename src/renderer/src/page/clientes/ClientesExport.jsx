import ExportOptions from "../../components/shared/ExportOptions";
import { exportToPDF, exportToExcel } from "../../services/exportService";

const ClientesExport = ({ clientes }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Email", accessor: "email" },
    { header: "Dirección", accessor: "direccion" },
    { header: "Frecuente", accessor: (item) => item.frecuente ? 'Sí' : 'No' }
  ];

  const handleExport = async ({ startDate, endDate, type }) => {
    try {
      const dataToExport = clientes.filter(cliente => {
        if (!startDate || !endDate) return true;
        const clienteDate = new Date(cliente.createdAt);
        return clienteDate >= new Date(startDate) && 
               clienteDate <= new Date(endDate);
      });

      if (type === "pdf") {
        await exportToPDF(dataToExport, columns, "Listado de Clientes", { startDate, endDate });
      } else {
        await exportToExcel(dataToExport, columns, "Listado de Clientes", { startDate, endDate });
      }
    } catch (error) {
      console.error("Error al exportar:", error);
    }
  };

  return <ExportOptions onExport={handleExport} title="Exportar Clientes" />;
};

export default ClientesExport;

