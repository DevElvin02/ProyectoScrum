import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main from './page'
import {
  productosIniciales,
  clientesIniciales,
  pedidosIniciales,
  proveedoresIniciales,
  ofertasIniciales
  
} from './data/initialData.js'

// Contexto para el tema
export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {}
})

// Contexto para las notificaciones toast
export const ToastContext = React.createContext({
  toast: () => {}
})

// Contexto para los datos globales
export const GlobalDataContext = React.createContext({
  productos: [],
  clientes: [],
  pedidos: [],
  proveedores: [],
  ofertas: []
  
})

// Componente para manejar el tema claro/oscuro
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return (
      savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

// Componente para manejar las notificaciones toast
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = ({ title, description, variant = 'default' }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, title, description, variant }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-md transition-all duration-300 max-w-md ${
              toast.variant === 'destructive'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            {toast.title && <h4 className="font-medium">{toast.title}</h4>}
            {toast.description && <p className="text-sm">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Componente para manejar los datos globales
function GlobalDataProvider({ children }) {
  const [globalData, setGlobalData] = useState({
    productos: [],
    clientes: [],
    pedidos: [],
    proveedores: [],
    ofertas: []
  })

  useEffect(() => {
    // Agregar este console.log para depuración
    console.log('Datos iniciales:', {
      productosIniciales,
      clientesIniciales,
      pedidosIniciales,
      proveedoresIniciales,
      ofertasIniciales
    })

    setGlobalData({
      productos: productosIniciales,
      clientes: clientesIniciales,
      pedidos: pedidosIniciales,
      proveedores: proveedoresIniciales,
      ofertas: ofertasIniciales
    })
  }, [])

  // Agregar este console.log para verificar el estado
  console.log('Estado actual:', globalData)

  return (
    <GlobalDataContext.Provider value={globalData}>
      {children}
    </GlobalDataContext.Provider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <GlobalDataProvider>
          <Main />
        </GlobalDataProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
