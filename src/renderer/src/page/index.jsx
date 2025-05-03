import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import LoginPage from './auth/LoginPage'
import ResumenPage from './resumen/ResumenPage'
import Productos from './productos'
import Clientes from './clientes'
import Pedidos from './pedidos'
import Proveedores from './proveedores'
import OfertasDashboard from './ofertas/OfertasDashboard'

function Layout({ setIsAuthenticated }) {
  return (
    <div className="flex h-screen">
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Limpiar localStorage al iniciar la aplicación
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    localStorage.removeItem("sessionExpiration")
    localStorage.removeItem("lastActive")
    setIsAuthenticated(false)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />} 
      />
      
      <Route 
        element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />}
      >
        <Route path="/" element={<ResumenPage />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/ofertas" element={<OfertasDashboard />} />
      </Route>
    </Routes>
  )
}
