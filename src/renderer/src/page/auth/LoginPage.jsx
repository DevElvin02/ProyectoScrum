import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock, Eye, EyeOff, AlertTriangle, LogIn } from "lucide-react"

export default function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0)

  useEffect(() => {
    // Limpiar intentos al iniciar
    localStorage.setItem("failedAttempts", "0")
    setFailedAttempts(0)
    
    // Verificar bloqueo al cargar
    const checkBlockStatus = () => {
      const storedBlockUntil = localStorage.getItem("blockUntil")

      if (storedBlockUntil) {
        const blockUntil = parseInt(storedBlockUntil)
        const now = new Date().getTime()

        if (blockUntil > now) {
          setIsBlocked(true)
          const remainingTime = Math.ceil((blockUntil - now) / 1000)
          setBlockTimeRemaining(remainingTime)
          startCountdown(remainingTime)
        } else {
          localStorage.removeItem("blockUntil")
          setIsBlocked(false)
        }
      }
    }

    checkBlockStatus()
  }, [])

  const startCountdown = (duration) => {
    const interval = setInterval(() => {
      setBlockTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval)
          setIsBlocked(false)
          setError("Cuenta desbloqueada. Puede intentar nuevamente.")
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (isBlocked) {
      setError(`Cuenta bloqueada. Por favor espere ${blockTimeRemaining} segundos antes de volver a intentar.`)
      return
    }

    if (!username.trim() || !password.trim()) {
      setError("Por favor ingrese usuario y contraseña")
      return
    }

    setLoading(true)

    try {
      if (username === "admin" && password === "admin123") {
        // Login exitoso
        setFailedAttempts(0)
        localStorage.removeItem("failedAttempts")
        localStorage.removeItem("blockUntil")
        
        // Guardar en historial
        const loginHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]")
        loginHistory.push({
          timestamp: new Date().toISOString(),
          username,
          success: true
        })
        localStorage.setItem("loginHistory", JSON.stringify(loginHistory))
        
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", username)
        setIsAuthenticated(true)
        navigate("/")
      } else {
        // Login fallido
        const newFailedAttempts = failedAttempts + 1
        setFailedAttempts(newFailedAttempts)
        localStorage.setItem("failedAttempts", newFailedAttempts.toString())

        // Guardar en historial
        const loginHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]")
        loginHistory.push({
          timestamp: new Date().toISOString(),
          username,
          success: false,
          ipAddress: "127.0.0.1" // En un sistema real, esto vendría del servidor
        })
        localStorage.setItem("loginHistory", JSON.stringify(loginHistory))

        const remainingAttempts = 3 - newFailedAttempts

        if (newFailedAttempts >= 3) {
          // Bloquear cuenta
          const blockDuration = 30 * 1000 // 30 segundos
          const blockUntil = new Date().getTime() + blockDuration
          localStorage.setItem("blockUntil", blockUntil.toString())
          
          setIsBlocked(true)
          setBlockTimeRemaining(30)
          startCountdown(30)
          setError("Cuenta bloqueada temporalmente por exceder el número de intentos permitidos.")
          
          // Limpiar campos
          setUsername("")
          setPassword("")
        } else {
          setError(`Credenciales incorrectas. Le quedan ${remainingAttempts} ${remainingAttempts === 1 ? 'intento' : 'intentos'}.`)
        }
      }
    } catch (err) {
      console.error("Error en login:", err)
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sistema de Gestión de Pedidos</h2>
          <p className="text-blue-100 mt-1">Panel de Administración</p>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-center mb-6">Bienvenido</h3>

          {isBlocked && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium">Demasiados intentos fallidos</p>
                  <p>Por favor espere {blockTimeRemaining} segundos antes de volver a intentar.</p>
                </div>
              </div>
            </div>
          )}

          {error && !isBlocked && (
            <div className="mb-4 p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-700">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isBlocked}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isBlocked ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isBlocked}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    isBlocked ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  disabled={isBlocked}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isBlocked || loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Procesando..."
              ) : isBlocked ? (
                "Cuenta bloqueada temporalmente"
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}