import { useContext } from 'react'
import { X } from 'lucide-react';
import { ClientesProvider, ClientesContext } from "../../context/ClienteContext"
import { useForm } from "react-hook-form";

export default function modalAgregarCliente({ isEditing, setDialogoNuevoCliente, clienteData }) {
    const { clientes, cargando, cargarClientes, agregarClientes, eliminarCliente, actulizarCliente } = useContext(ClientesContext);

    const {
        register,        // Función para "registrar" campos
        handleSubmit,    // Función que maneja el envío
        formState: { errors } // Objeto que contiene los errores de validación
    } = useForm({
        defaultValues: {
            nombre: isEditing ? clienteData.nombre : "",
            telefono: isEditing ? clienteData.telefono : "",
            email: isEditing ? clienteData.email : "",
            frecuente: isEditing ? clienteData.frecuente : false,
            direccion: isEditing ? clienteData.direccion : "",
        },
    });

    // Función que se llama cuando el formulario se envía correctamente
    const onSubmitCliente = async (data) => {
        const dataCliente = ({
            nombre: data.nombre,
            telefono: data.telefono,
            email: data.email,
            frecuente: data.frecuente,
            direccion: data.direccion
        })

        // console.log(clienteData)
        if (isEditing) {
            try {
                await actulizarCliente(clienteData.id, dataCliente);
            } catch (error) {
                console.log("Ocurrio un error al actualizar el nuevo cliente", error)
                setDialogoNuevoCliente(false)
                set
            } finally {
                console.log("Usuario actulizado con exito")
                setDialogoNuevoCliente(false)
            }
        } else {
            try {
                await agregarClientes(dataCliente);
            } catch (error) {
                console.log("Ocurrio un error al guardar el nuevo cliente", error)
                setDialogoNuevoCliente(false)
                set
            } finally {
                console.log("Usuario guardado con exito")
                setDialogoNuevoCliente(false)
            }
            // console.log('dataCliente', dataCliente)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium">{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</h3>
                    <button
                        onClick={() => setDialogoNuevoCliente(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmitCliente)} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            {...register('nombre', { required: true })}
                            placeholder="Nombre completo"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                        <input
                            id="telefono"
                            type="text"
                            {...register('telefono', { required: true })}
                            placeholder="Número de teléfono"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            {...register('email', { required: true })}
                            placeholder="Correo electrónico"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            {...register('direccion', { required: true })}
                            placeholder="Dirección completa"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                            required
                        />
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="frecuente"
                                name="frecuente"
                                {...register('frecuente')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="frecuente"
                                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Cliente frecuente
                            </label>
                        </div>
                        {/* {formData.frecuente && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Los clientes frecuentes pueden recibir precios especiales en productos específicos. Podrá gestionar
                                estos precios después de guardar el cliente.
                            </p>
                        )} */}
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            {isEditing ? "Guardar cambios" : "Crear cliente"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

