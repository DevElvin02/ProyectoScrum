import { useState, useEffect } from "react"
import { Shield, AlertTriangle, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SecurityLogsPage() {
  const [loginHistory, setLoginHistory] = useState([])
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [successfulLogins, setSuccessfulLogins] = useState(0)
  const navigate = useNavigate()

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("loginHistory") || "[]")
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    setLoginHistory(history)
    setFailedAttempts(history.filter(entry => !entry.success).length)
    setSuccessfulLogins(history.filter(entry => entry.success).length)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const clearHistory = () => {
    localStorage.setItem("loginHistory", "[]")
    loadHistory()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Registros de Seguridad</h1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Panel principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <div className="flex items-center text-white">
              <Shield className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Actividad de Seguridad</h2>
            </div>
            <p className="text-blue-100 mt-1">Monitoreo de intentos de acceso al sistema</p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-blue-700">Total de Actividades</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{loginHistory.length}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium text-green-700">Accesos Exitosos</h3>
              </div>
              <p className="text-2xl font-bold text-green-800">{successfulLogins}</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium text-red-700">Intentos Fallidos</h3>
              </div>
              <p className="text-2xl font-bold text-red-800">{failedAttempts}</p>
            </div>
          </div>

          {/* Alerta de seguridad */}
          {failedAttempts > 0 && (
            <div className="mx-6 mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Se han detectado {failedAttempts} intentos fallidos de inicio de sesión en su cuenta.
                    Recomendamos cambiar su contraseña si no reconoce estos intentos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de historial */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Historial de Actividad</h3>
              <button
                onClick={clearHistory}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border rounded-md hover:bg-gray-50"
              >
                Limpiar historial
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha y Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginHistory.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(entry.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.ipAddress || "127.0.0.1"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          entry.success 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {entry.success ? "Exitoso" : "Fallido"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}