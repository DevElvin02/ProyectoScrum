"use client"
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { X, Users, Package, ShoppingCart, Truck, Home, Tag, Sun, Moon } from "lucide-react"
import { GlobalDataContext } from '../App'
import { ThemeContext } from '../App'
import { GlobalSearch } from './shared/GlobalSearch'

export function Sidebar() {
  const globalData = useContext(GlobalDataContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const location = useLocation()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="mr-4">
          <Home className="h-6 w-6" />
        </Link>

        <div className="flex-1 flex justify-center">
          <GlobalSearch {...globalData} />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 bg-indigo-700 p-4">
        <SidebarLink 
          icon={<Package />} 
          text="Productos" 
          to="/productos"
          active={location.pathname.startsWith('/productos')}
        />
        <SidebarLink 
          icon={<Users />} 
          text="Clientes" 
          to="/clientes"
          active={location.pathname.startsWith('/clientes')}
        />
        <SidebarLink 
          icon={<ShoppingCart />} 
          text="Pedidos" 
          to="/pedidos"
          active={location.pathname.startsWith('/pedidos')}
        />
        <SidebarLink 
          icon={<Truck />} 
          text="Proveedores" 
          to="/proveedores"
          active={location.pathname.startsWith('/proveedores')}
        />
        <SidebarLink 
          icon={<Tag />} 
          text="Ofertas" 
          to="/ofertas"
          active={location.pathname.startsWith('/ofertas')}
        />
      </nav>
    </div>
  )
}

const SidebarLink = ({ icon, text, to, active }) => {
  return (
    <Link
      to={to}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-600"
      }`}
    >
      <div className="mr-3 h-6 w-6">{icon}</div>
      {text}
    </Link>
  )
}

export default Sidebar

