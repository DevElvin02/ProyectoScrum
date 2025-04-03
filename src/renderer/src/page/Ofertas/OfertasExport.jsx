import ExportOptions from "../../components/shared/ExportOptions";
import { exportToPDF, exportToExcel } from "../../services/exportService";

const OfertasExport = ({ ofertas }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Producto", accessor: "producto_nombre" },
    { header: "Precio Normal", accessor: (item) => `$${Number(item.precio_normal).toFixed(2)}` },
    { header: "Precio Oferta", accessor: (item) => `$${Number(item.precio_oferta).toFixed(2)}` },
    { header: "Descuento", accessor: (item) => `${item.descuento}%` },
    { header: "Fecha Inicio", accessor: (item) => new Date(item.fecha_inicio).toLocaleDateString() },
    { header: "Fecha Fin", accessor: (item) => new Date(item.fecha_fin).toLocaleDateString() },
    { header: "Estado", accessor: "estado" }
  ];

  const handleExport = ({ type }) => {
    try {
      if (type === "pdf") {
        exportToPDF(ofertas, columns, "Reporte de Ofertas");
      } else {
        exportToExcel(ofertas, columns, "Reporte de Ofertas");
      }
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al generar el archivo de exportación");
    }
  };

  return <ExportOptions onExport={handleExport} title="Exportar Ofertas" />;
};

export default OfertasExport;