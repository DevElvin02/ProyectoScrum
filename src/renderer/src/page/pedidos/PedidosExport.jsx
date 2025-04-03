import ExportOptions from "../../components/shared/ExportOptions";
import { exportToPDF, exportToExcel } from "../../services/exportService";

const PedidosExport = ({ pedidos }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Fecha", accessor: (item) => new Date(item.fecha).toLocaleDateString() },
    { header: "Total", accessor: (item) => `$${Number(item.total).toFixed(2)}` },
    { header: "Estado", accessor: "estado" },
    { header: "Productos", accessor: (item) => 
      item.detalles?.map(i => `${i.producto_nombre} (${i.cantidad})`).join(", ") 
    }
  ];

  const handleExport = ({ type }) => {
    try {
      if (type === "pdf") {
        exportToPDF(pedidos, columns, "Reporte de Pedidos");
      } else {
        exportToExcel(pedidos, columns, "Reporte de Pedidos");
      }
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al generar el archivo de exportación");
    }
  };

  return <ExportOptions onExport={handleExport} title="Exportar Pedidos" />;
};

export default PedidosExport;

