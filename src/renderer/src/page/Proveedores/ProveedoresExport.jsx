import ExportOptions from "../../components/shared/ExportOptions";
import { exportToPDF, exportToExcel } from "../../services/exportService";

const ProveedoresExport = ({ proveedores }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Contacto", accessor: "contact" },
    { header: "Email", accessor: "email" },
    { header: "Tipo", accessor: "supplyType" },
    { header: "Categoría", accessor: "category" }
  ];

  const handleExport = ({ type }) => {
    try {
      console.log('Iniciando exportación:', { type, proveedores });
      
      if (!proveedores || proveedores.length === 0) {
        alert("No hay datos para exportar");
        return;
      }

      if (type === "pdf") {
        exportToPDF(proveedores, columns, "Reporte_Proveedores");
      } else if (type === "excel") {
        exportToExcel(proveedores, columns, "Reporte_Proveedores");
      }
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al generar el archivo de exportación");
    }
  };

  return <ExportOptions onExport={handleExport} title="Exportar Proveedores" />;
};

export default ProveedoresExport;

