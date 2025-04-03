<<<<<<< HEAD
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, columns, title) => {
  try {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // Preparar datos
    const headers = columns.map(col => col.header);
    const rows = data.map(item => 
      columns.map(col => 
        typeof col.accessor === 'function' 
          ? col.accessor(item) 
          : item[col.accessor] || ''
      )
    );

    // Generar tabla
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 25,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { 
        fillColor: [63, 81, 181],
        textColor: [255, 255, 255]
      }
    });

    // Guardar
    doc.save(`${title.toLowerCase().replace(/ /g, '_')}.pdf`);
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    throw error;
  }
};

export const exportToExcel = (data, columns, title) => {
  try {
    // Preparar datos
    const excelData = data.map(item => {
      const row = {};
      columns.forEach(col => {
        const value = typeof col.accessor === 'function' 
          ? col.accessor(item) 
          : item[col.accessor];
        row[col.header] = value || '';
      });
      return row;
    });

    // Crear libro
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Ajustar anchos de columna
    const colWidths = columns.map(col => ({
      wch: Math.max(
        col.header.length,
        ...excelData.map(row => String(row[col.header]).length)
      )
    }));
    ws['!cols'] = colWidths;

    // Agregar hoja y guardar
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${title.toLowerCase().replace(/ /g, '_')}.xlsx`);
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    throw error;
  }
=======
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
>>>>>>> 9c576223af187c75157139e1b0afa3d9ffac3ce8
};