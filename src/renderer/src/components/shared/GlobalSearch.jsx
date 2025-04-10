import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export function GlobalSearch({ productos, clientes, pedidos, proveedores, ofertas }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState({
    productos: [],
    clientes: [],
    pedidos: [],
    proveedores: [],
    ofertas: []
  })
  const searchRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults({
        productos: [],
        clientes: [],
        pedidos: [],
        proveedores: [],
        ofertas: []
      })
      return
    }

    const searchResults = {
      productos: productos
        .filter(p => 
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5),
      clientes: clientes
        .filter(c => 
          c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5),
      pedidos: pedidos
        .filter(p => 
          p.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toString().includes(searchTerm)
        )
        .slice(0, 5),
      proveedores: proveedores
        .filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5),
      ofertas: ofertas
        .filter(o => 
          o.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    }

    setResults(searchResults)
  }, [searchTerm, productos, clientes, pedidos, proveedores, ofertas])

  const hasResults = Object.values(results).some(category => category.length > 0)

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Buscar en todo el sistema..."
          className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => {
              setSearchTerm('')
              setIsOpen(false)
            }}
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>

      {isOpen && searchTerm.length >= 2 && (
        <div className="absolute mt-2 w-96 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {!hasResults ? (
            <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
              No se encontraron resultados
            </div>
          ) : (
            <div className="max-h-[80vh] overflow-y-auto">
              {Object.entries(results).map(([category, items]) => {
                if (items.length === 0) return null

                return (
                  <div key={category} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                    </div>
                    <ul>
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/${category}/${item.id}`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {category === 'pedidos' 
                                ? `Pedido #${item.id} - ${item.cliente_nombre}`
                                : item.nombre || item.name}
                            </div>
                            {item.descripcion && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.descripcion}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {items.length === 5 && (
                      <Link
                        to={`/${category}?search=${searchTerm}`}
                        className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Ver todos los resultados
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}