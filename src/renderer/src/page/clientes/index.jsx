import { useState, useContext } from "react";
import { Plus, Pencil, Trash2, Search, X, Tag, DollarSign } from "lucide-react";
import { ClientesProvider, ClientesContext } from "../context/ClienteContext";
import ModalCliente from "./components/modalCliente";
import ModalEliminarCliente from "./components/modalEliminarCliente";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import ClientesExport from "./ClientesExport";

// Datos de ejemplo para precios especiales
const preciosEspecialesIniciales = [
  { id: 1, cliente_id: 1, producto_id: 1, precio: 1199.99, descuento: 100.0 },
  { id: 2, cliente_id: 1, producto_id: 3, precio: 79.99, descuento: 10.0 },
  { id: 3, cliente_id: 2, producto_id: 2, precio: 329.99, descuento: 20.0 },
  { id: 4, cliente_id: 5, producto_id: 5, precio: 119.99, descuento: 10.0 },
];

function ClientesPage() {
  const { clientes } = useContext(ClientesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogoNuevoCliente, setDialogoNuevoCliente] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogoEliminar, setDialogoEliminar] = useState(false);
  const [clienteActual, setClienteActual] = useState(null);
  
  const [preciosEspeciales, setPreciosEspeciales] = useState(preciosEspecialesIniciales);
  const [busqueda, setBusqueda] = useState("");

  // Filtrar clientes por nombre o email
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono?.includes(searchTerm)
  );

  const handleDialogNuevoCliente = () => {
    setIsEditing(false);
    setDialogoNuevoCliente(true);
  };

  const handleEliminarCliente = (cliente) => {
    setClienteActual(cliente);
    setDialogoEliminar(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex space-x-4">
          <ClientesExport clientes={clientes} />
          <button
            onClick={handleDialogNuevoCliente}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Modal para crear/editar cliente */}
      {dialogoNuevoCliente && (
        <ModalCliente
          isEditing={isEditing}
          setDialogoNuevoCliente={setDialogoNuevoCliente}
          clienteData={clienteActual}
        />
      )}

      {/* Modal para confirmar eliminación */}
      {dialogoEliminar && (
        <ModalEliminarCliente
          idCliente={clienteActual.id}
          nombreCliente={clienteActual.nombre}
          setDialogoEliminar={setDialogoEliminar}
        />
      )}

      {/* Tabla de clientes */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dirección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No se encontraron clientes</td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.frecuente ? "Frecuente" : "Regular"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1" onClick={() => handleEditarCliente(cliente)} title="Editar cliente">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-2" onClick={() => handleEliminarCliente(cliente)} title="Eliminar cliente">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ClientesIndex() {
  return (
    <ClientesProvider>
      <ClientesPage />
    </ClientesProvider>
  );
}