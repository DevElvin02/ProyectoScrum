import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import NotificationDropdown from '../components/NotificationDropdown'
import LoginPage from './auth/LoginPage'
import ResumenPage from './resumen/ResumenPage'
import Productos from './productos'
import Clientes from './clientes'
import Pedidos from './pedidos'
import Proveedores from './proveedores'
import OfertasDashboard from './ofertas/OfertasDashboard'
import SecurityPage from './security/SecurityPage'
import SecurityLogsPage from './security/SecurityLogsPage'
import ProfilePage from './profile/ProfilePage'
import NotificationPage from './notifications/notificationPage'


function Layout({ setIsAuthenticated }) {
  return (
    <div className="flex h-screen">
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-end items-center">
          <NotificationDropdown />
        </header>
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
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
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/security-logs" element={<SecurityLogsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        
        {/* Redirigir a la página de inicio si la ruta no coincide */}
      </Route>
    </Routes>
  )
}
