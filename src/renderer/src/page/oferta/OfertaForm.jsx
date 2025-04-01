"use client"

import { useState, useEffect } from "react"
import { X, Calendar } from "lucide-react"

const OfertaForm = ({ onSubmit, initialData, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    porcentaje: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "Activa",
    productos: [],
    condiciones: "",
  })

  const [productoInput, setProductoInput] = useState("")
  const [productosDisponibles, setProductosDisponibles] = useState([
    "Laptop Pro",
    "Monitor UltraWide",
    "Teclado Mecánico",
    "Mouse Inalámbrico",
    "Auriculares Bluetooth",
    "Laptop Pro 2023",
    'Monitor Curvo 32"',
    "Todos los productos",
  ])

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        productos: [...initialData.productos],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "porcentaje" ? Number.parseFloat(value) || "" : value,
    })
  }

  const handleAddProducto = () => {
    if (productoInput && !formData.productos.includes(productoInput)) {
      setFormData({
        ...formData,
        productos: [...formData.productos, productoInput],
      })
      setProductoInput("")
    }
  }

  const handleRemoveProducto = (producto) => {
    setFormData({
      ...formData,
      productos: formData.productos.filter((p) => p !== producto),
    })
  }

  const handleSelectProducto = (producto) => {
    if (!formData.productos.includes(producto)) {
      setFormData({
        ...formData,
        productos: [...formData.productos, producto],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{isEditing ? "Editar Oferta" : "Nueva Oferta"}</h3>
        <button
          onClick={onCancel}
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre de la Oferta
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="porcentaje" className="block text-sm font-medium text-gray-700">
                Porcentaje de Descuento
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="porcentaje"
                  id="porcentaje"
                  required
                  min="1"
                  max="100"
                  value={formData.porcentaje}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <div className="mt-1">
                <textarea
                  name="descripcion"
                  id="descripcion"
                  rows={2}
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="fechaInicio"
                  id="fechaInicio"
                  required
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">
                Fecha de Fin
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="fechaFin"
                  id="fechaFin"
                  required
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <div className="mt-1">
                <select
                  name="estado"
                  id="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="productos" className="block text-sm font-medium text-gray-700">
                Productos Aplicables
              </label>
              <div className="mt-1">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="productos"
                    value={productoInput}
                    onChange={(e) => setProductoInput(e.target.value)}
                    placeholder="Añadir producto..."
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddProducto}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Añadir
                  </button>
                </div>

                <div className="mt-2">
                  <label className="text-xs text-gray-500">Productos disponibles:</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {productosDisponibles.map((producto) => (
                      <button
                        key={producto}
                        type="button"
                        onClick={() => handleSelectProducto(producto)}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          formData.productos.includes(producto)
                            ? "bg-indigo-100 text-indigo-800 cursor-not-allowed"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        disabled={formData.productos.includes(producto)}
                      >
                        {producto}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  {formData.productos.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.productos.map((producto) => (
                        <span
                          key={producto}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {producto}
                          <button
                            type="button"
                            onClick={() => handleRemoveProducto(producto)}
                            className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No hay productos seleccionados</p>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="condiciones" className="block text-sm font-medium text-gray-700">
                Condiciones
              </label>
              <div className="mt-1">
                <textarea
                  name="condiciones"
                  id="condiciones"
                  rows={2}
                  value={formData.condiciones}
                  onChange={handleChange}
                  placeholder="Ej: No acumulable con otras promociones, límite de unidades, etc."
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditing ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OfertaForm

