import React, { useState } from 'react';
import { utils, write } from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ExportOptions = ({ data, fileName, columns }) => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const exportToExcel = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, 'Sheet1');
    write(wb, `${fileName}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: data.map(item => columns.map(col => item[col.field]))
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="export-options p-4 border rounded">
      <div className="date-filters mb-4">
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
          className="mr-2"
        />
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
        />
      </div>
      
      <div className="export-buttons">
        <button 
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Exportar a Excel
        </button>
        <button 
          onClick={exportToPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;