
import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Package, ShoppingCart, Menu, X } from 'lucide-react'
import ClientesPage from './clientes'
import ProductosPage from './productos'
import PedidosPage from './pedidos'
import ResumenPage from './resumen/ResumenPage'

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800`}
      >
        <div className="flex h-16 items-center justify-center">
          {sidebarOpen ? (
            <div className="flex items-center justify-between gap-5">
              <div>
                <h1 className="text-xl font-bold">Sistema Pedidos</h1>
              </div>
              <button onClick={toggleSidebar} className="cursor-pointer">
                <X size={24} />
              </button>
            </div>
          ) : (
            <button onClick={toggleSidebar} className="cursor-pointer">
              <Menu size={24} />
            </button>
          )}
        </div>

        <nav className="p-4">
          <NavItem
            icon={<LayoutDashboard size={24} />}
            label="Inicio"
            active={location.pathname === '/'}
            expanded={sidebarOpen}
            onClick={() => navigate('/')}
          />
          <NavItem
            icon={<Users size={24} />}
            label="Clientes"
            active={location.pathname === '/clientes'}
            expanded={sidebarOpen}
            onClick={() => navigate('/clientes')}
          />
          <NavItem
            icon={<Package size={24} />}
            label="Productos"
            active={location.pathname === '/productos'}
            expanded={sidebarOpen}
            onClick={() => navigate('/productos')}
          />
          <NavItem
            icon={<ShoppingCart size={24} />}
            label="Pedidos"
            active={location.pathname === '/pedidos'}
            expanded={sidebarOpen}
            onClick={() => navigate('/pedidos')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
          <Route path="/" element={<ResumenPage />} /> {/* Cambiar esto */}
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/pedidos" element={<PedidosPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, expanded, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      {expanded && <span>{label}</span>}
    </button>
  )
}
