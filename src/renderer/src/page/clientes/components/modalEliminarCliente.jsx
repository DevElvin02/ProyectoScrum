import { useContext } from 'react'
import { ClientesProvider, ClientesContext } from "../../context/ClienteContext"

export default function modalEliminarCliente({ idCliente, nombreCliente, setDialogoEliminar }) {
    const { clientes, cargando, cargarClientes, agregarClientes, eliminarCliente } = useContext(ClientesContext);

    const confirmarEliminar = async () => {

        try {
            await eliminarCliente(idCliente);
        } catch (error) {
            console.log("Ocurrio un error al eliminar el cliente", error)
            setDialogoEliminar(false)
        } finally {
            setDialogoEliminar(false)
        }

        // setClientes(clientes.filter((c) => c.id !== clienteActual.id))
        // También eliminar los precios especiales asociados
        // setPreciosEspeciales(preciosEspeciales.filter((p) => p.cliente_id !== clienteActual.id))
        // alert(`Se ha eliminado a ${clienteActual.nombre} correctamente.`)

    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Confirmar eliminación</h3>
                </div>
                <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de que deseas eliminar a {nombreCliente}? Esta acción no se puede deshacer.
                    </p>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <button
                        onClick={() => setDialogoEliminar(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => confirmarEliminar()}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

