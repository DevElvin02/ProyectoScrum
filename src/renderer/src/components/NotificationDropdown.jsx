import { useState, useRef, useEffect } from 'react'
import { Bell, X, Clock, AlertTriangle } from 'lucide-react'

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('pendientes')
  const dropdownRef = useRef(null)

  const notifications = [
    {
      id: 1001,
      title: "Personalización pendiente",
      description: "Pedido #1001 tiene una personalización pendiente de revisión",
      time: "hace 1 día",
      type: "pending",
      hasImage: true
    },
    {
      id: 1003,
      title: "Personalización requiere atención",
      description: "Pedido #1003 tiene una solicitud de personalización compleja",
      time: "hace 2 días",
      type: "urgent",
      hasImage: true,
      priority: true
    }
  ]

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
      >
        <Bell className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notificaciones de Personalización</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 text-sm rounded-md ${
                  activeTab === 'todas' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('todas')}
              >
                Todas
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${
                  activeTab === 'no_leidas' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('no_leidas')}
              >
                No leídas
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${
                  activeTab === 'prioritarias' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('prioritarias')}
              >
                Prioritarias
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${
                  activeTab === 'pendientes' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('pendientes')}
              >
                Pendientes
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 border-b border-gray-100 ${
                  notification.type === 'urgent' ? 'bg-red-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'urgent' 
                      ? 'bg-red-100' 
                      : 'bg-yellow-100'
                  }`}>
                    {notification.type === 'urgent' 
                      ? <AlertTriangle className="h-4 w-4 text-red-600" />
                      : <Clock className="h-4 w-4 text-yellow-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                      {notification.hasImage && (
                        <button className="text-xs text-blue-600 hover:underline">
                          Imagen
                        </button>
                      )}
                      {notification.priority && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Prioritario
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Marcar todas como leídas
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-700">
              Configuración
            </button>
          </div>
        </div>
      )}
    </div>
  )
}