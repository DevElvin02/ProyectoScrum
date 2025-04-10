import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom' // Añadir esta importación
import Sidebar from '../components/Sidebar'
import Productos from './productos'
import Clientes from './clientes'
import Pedidos from './pedidos'
import Proveedores from './Proveedores'
import OfertasDashboard from './Ofertas/OfertasDashboard'

export default function Main() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Bienvenido al Sistema de Gestión</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Tarjetas de resumen con enlaces */}
                <Link 
                  to="/productos" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600">Productos</h2>
                  <p className="text-gray-600">Gestiona tu inventario</p>
                </Link>

                <Link 
                  to="/clientes" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600">Clientes</h2>
                  <p className="text-gray-600">Administra tus clientes</p>
                </Link>

                <Link 
                  to="/pedidos" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600">Pedidos</h2>
                  <p className="text-gray-600">Control de pedidos</p>
                </Link>

                <Link 
                  to="/proveedores" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600">Proveedores</h2>
                  <p className="text-gray-600">Gestión de proveedores</p>
                </Link>

                <Link 
                  to="/ofertas" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600">Ofertas</h2>
                  <p className="text-gray-600">Administra promociones</p>
                </Link>
              </div>
            </div>
          } />
          <Route path="/productos" element={<Productos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/ofertas" element={<OfertasDashboard />} />
        </Routes>
      </div>
    </div>
  )
}
