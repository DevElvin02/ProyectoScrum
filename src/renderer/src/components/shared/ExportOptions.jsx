import { useState } from 'react';
import { Calendar, FileText, FileSpreadsheet, Download } from 'lucide-react';

const ExportOptions = ({ onExport, title = "Exportar datos" }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (!startDate || !endDate) {
      alert("Por favor selecciona un rango de fechas");
      return;
    }

    onExport({
      startDate: startDate || today,
      endDate: endDate || today,
      type,
    });

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Download className="h-4 w-4 mr-2" />
        {title}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 p-4 border border-gray-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha inicial
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha final
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleExport("pdf")}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </button>
              <button
                onClick={() => handleExport("excel")}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;