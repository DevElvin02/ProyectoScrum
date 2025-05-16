"use client"
import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight,
  Users, 
  Package, 
  ShoppingCart, 
  Truck, 
  Home, 
  Tag, 
  Sun, 
  Moon, 
  LogOut, 
  BarChart2, 
  User, 
  Shield,
  Bell
} from "lucide-react"
import { GlobalDataContext } from '../App'
import { ThemeContext } from '../App'
import { GlobalSearch } from './shared/GlobalSearch'

export function Sidebar({ setIsAuthenticated }) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)
  const [notificationCount, setNotificationCount] = useState(2)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`relative flex flex-col h-screen bg-indigo-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Botón para colapsar */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-indigo-800 rounded-full p-1 text-white hover:bg-indigo-700 z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div className="p-4 border-b border-indigo-800">
        <h1 className={`text-xl font-bold transition-all duration-300 ${
          isCollapsed ? 'scale-0' : 'scale-100'
        }`}>
          Sistema de Gestión
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {/* Enlaces principales */}
        <Link 
          to="/"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname === "/" ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <BarChart2 className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Resumen
          </span>
        </Link>

        <Link 
          to="/productos"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/productos") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <Package className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Productos
          </span>
        </Link>

        <Link 
          to="/clientes"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/clientes") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <Users className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Clientes
          </span>
        </Link>

        <Link 
          to="/pedidos"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/pedidos") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <ShoppingCart className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Pedidos
          </span>
        </Link>

        <Link 
          to="/proveedores"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/proveedores") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <Truck className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Proveedores
          </span>
        </Link>

        <Link 
          to="/ofertas"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/ofertas") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <Tag className="h-5 w-5 min-w-[20px]" />
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Ofertas
          </span>
        </Link>

        <Link 
          to="/notifications"
          className={`relative flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/notifications") ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <div className="relative">
            <Bell className="h-5 w-5 min-w-[20px]" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          <span className={`ml-3 transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Notificaciones
          </span>
        </Link>

        {/* Antes de la sección de perfil y seguridad */}
        <div className="pt-8 mt-8 border-t border-indigo-800">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors`}
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5 min-w-[20px]" />
                <span className={`ml-3 transition-all duration-300 ${
                  isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}>
                  Modo Oscuro
                </span>
              </>
            ) : (
              <>
                <Sun className="h-5 w-5 min-w-[20px]" />
                <span className={`ml-3 transition-all duration-300 ${
                  isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}>
                  Modo Claro
                </span>
              </>
            )}
          </button>
        </div>

        {/* Sección de perfil y seguridad */}
        <div className="pt-4 mt-4 border-t border-indigo-800 space-y-2">
          <Link 
            to="/profile"
            className={`flex items-center px-4 py-2 rounded-md ${
              location.pathname === "/profile" ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`}
          >
            <User className="h-5 w-5 min-w-[20px]" />
            <span className={`ml-3 transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>
              Mi Perfil
            </span>
          </Link>

          <Link 
            to="/security-logs"
            className={`flex items-center px-4 py-2 rounded-md ${
              location.pathname === "/security-logs" ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`}
          >
            <Shield className="h-5 w-5 min-w-[20px]" />
            <span className={`ml-3 transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>
              Seguridad
            </span>
          </Link>
        </div>
      </nav>

      <button
        onClick={handleLogout}
        className={`flex items-center px-4 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <LogOut className="h-5 w-5 min-w-[20px]" />
        <span className={`ml-2 transition-all duration-300 ${
          isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
        }`}>
          Cerrar Sesión
        </span>
      </button>
    </div>
  )
}

export const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (username === "admin" && password === "password123") {
        localStorage.setItem("currentUser", username)
        localStorage.setItem("isAuthenticated", "true")
        // Redirigir al resumen
        window.location.href = "/"
      } else {
        setError("Usuario o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form implementation */}
    </form>
  )
}

export default Sidebar

