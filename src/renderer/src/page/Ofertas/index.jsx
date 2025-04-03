import OfertasExport from "./OfertasExport";

export default function Ofertas() {
  // ...existing code...

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar ofertas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-2">
          <OfertasExport ofertas={ofertasFiltradas} />
          <button
            onClick={handleNuevaOferta}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Oferta
          </button>
        </div>
      </div>
      {/* ...rest of the code... */}
    </div>
  );
}
