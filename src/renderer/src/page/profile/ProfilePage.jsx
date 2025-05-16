import { useState, useEffect } from "react"
import { User, Lock, Eye, EyeOff, Save } from "lucide-react"

export default function ProfilePage() {
  const [username, setUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem("user")
    if (currentUser) {
      setUsername(currentUser)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Validar contraseña actual
      if (currentPassword !== "admin123") {
        setError("La contraseña actual es incorrecta")
        return
      }

      // Validar nueva contraseña
      if (newPassword.length < 6) {
        setError("La nueva contraseña debe tener al menos 6 caracteres")
        return
      }

      if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden")
        return
      }

      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Actualizar datos
      localStorage.setItem("user", username)
      // En un sistema real, aquí actualizaríamos la contraseña en el backend

      setSuccess("Perfil actualizado correctamente")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError("Error al actualizar el perfil")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Perfil</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de Usuario
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña Actual
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nueva Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar Nueva Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}