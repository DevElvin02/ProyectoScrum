import ExportOptions from "../../components/shared/ExportOptions";
import { exportToPDF, exportToExcel } from "../../services/exportService";

const ProductosExport = ({ productos }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Descripción", accessor: "descripcion" },
    { header: "Categoría", accessor: "categoria" },
    { header: "Precio", accessor: (item) => `$${Number(item.precio).toFixed(2)}` },
    { header: "Stock", accessor: "stock" }
  ];

  const handleExport = ({ type }) => {
    try {
      if (type === "pdf") {
        exportToPDF(productos, columns, "Reporte de Productos");
      } else {
        exportToExcel(productos, columns, "Reporte de Productos");
      }
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al generar el archivo de exportación");
    }
  };

  return <ExportOptions onExport={handleExport} title="Exportar Productos" />;
};

export default ProductosExport;

