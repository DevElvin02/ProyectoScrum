"use client"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { X, Users, Package, ShoppingCart, Truck, Home, Tag, Sun, Moon, LogOut, BarChart2 } from "lucide-react"
import { useContext, useState } from 'react'
import { GlobalDataContext } from '../App'
import { ThemeContext } from '../App'
import { GlobalSearch } from './shared/GlobalSearch'

export function Sidebar({ setIsAuthenticated }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Elimina el estado de autenticación
    setIsAuthenticated(false);
  }

  return (
    <div className="flex flex-col h-screen bg-indigo-700 text-white w-64">
      <nav className="flex-1 space-y-1 p-4">
        <Link 
          to="/"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname === "/" ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Resumen
        </Link>

        <Link 
          to="/productos"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/productos") ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <Package className="mr-3 h-5 w-5" />
          Productos
        </Link>

        <Link 
          to="/clientes"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/clientes") ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <Users className="mr-3 h-5 w-5" />
          Clientes
        </Link>

        <Link 
          to="/pedidos"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/pedidos") ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <ShoppingCart className="mr-3 h-5 w-5" />
          Pedidos
        </Link>

        <Link 
          to="/proveedores"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/proveedores") ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <Truck className="mr-3 h-5 w-5" />
          Proveedores
        </Link>

        <Link 
          to="/ofertas"
          className={`flex items-center px-4 py-2 rounded-md ${
            location.pathname.startsWith("/ofertas") ? "bg-indigo-800" : "hover:bg-indigo-600"
          }`}
        >
          <Tag className="mr-3 h-5 w-5" />
          Ofertas
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 mt-auto mb-4 mx-4 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Cerrar Sesión
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

