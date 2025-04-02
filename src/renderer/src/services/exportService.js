import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, columns, title, { startDate, endDate }) => {
  const doc = new jsPDF();
  
  // Agregar título
  doc.text(title, 14, 15);
  
  // Preparar datos para la tabla
  const headers = columns.map(col => col.header);
  const rows = data.map(item => 
    columns.map(col => 
      typeof col.accessor === 'function' 
        ? col.accessor(item) 
        : item[col.accessor]
    )
  );

  // Generar tabla
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 25,
  });

  // Guardar PDF
  doc.save(`${title}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (data, columns, title, { startDate, endDate }) => {
  // Preparar datos para Excel
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => {
      const row = {};
      columns.forEach(col => {
        row[col.header] = typeof col.accessor === 'function' 
          ? col.accessor(item) 
          : item[col.accessor];
      });
      return row;
    })
  );

  // Crear libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);

  // Guardar archivo
  XLSX.writeFile(workbook, `${title}_${new Date().toISOString().split('T')[0]}.xlsx`);
};