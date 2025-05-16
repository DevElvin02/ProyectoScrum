"use client"

import { useState } from "react"
import { Bell, Calendar, Clock, Mail, MessageSquare, Phone, Settings, Smartphone, Volume2 } from "lucide-react"

const NotificationSettings = () => {
  // Estado para las configuraciones
  const [settings, setSettings] = useState({
    // Configuración de notificaciones de entrega
    deliveryNotifications: true,
    deliveryDaysThreshold: 3,

    // Configuración de alertas urgentes
    urgentAlerts: true,
    urgentPriority: "alta",

    // Configuración de resumen diario
    dailySummary: true,
    summaryTime: "08:00",

    // Canales de notificación
    channels: {
      email: true,
      push: true,
      sms: false,
      inApp: true,
    },

    // Sonidos y alertas
    sound: true,
    vibration: true,

    // Configuración avanzada
    workingHours: {
      start: "09:00",
      end: "18:00",
    },
    weekends: false,
  })

  // Función para actualizar configuraciones
  const updateSettings = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Función para actualizar canales
  const updateChannel = (channel, value) => {
    setSettings((prev) => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: value,
      },
    }))
  }

  // Función para actualizar configuraciones anidadas
  const updateNestedSettings = (parent, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }))
  }

  // Función para guardar configuración
  const saveSettings = () => {
    // Aquí se implementaría la lógica para guardar en backend
    alert("Configuración guardada correctamente")
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Configuración de Notificaciones</h2>
            <p className="text-gray-600 mt-1">
              Personaliza cómo y cuándo quieres recibir notificaciones sobre tus pedidos
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Sección: Notificaciones de entrega */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Notificaciones de Entrega
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Activar notificaciones de entrega</h4>
                <p className="text-sm text-gray-600">
                  Recibe alertas cuando un pedido esté próximo a su fecha de entrega
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.deliveryNotifications}
                  onChange={(e) => updateSettings("deliveryNotifications", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {settings.deliveryNotifications && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Días de anticipación</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Recibir notificaciones cuando falten estos días para la entrega
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={settings.deliveryDaysThreshold}
                    onChange={(e) => updateSettings("deliveryDaysThreshold", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {settings.deliveryDaysThreshold} {settings.deliveryDaysThreshold === 1 ? "día" : "días"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección: Alertas para pedidos urgentes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-600" />
            Alertas para Pedidos Urgentes
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Activar alertas para pedidos urgentes</h4>
                <p className="text-sm text-gray-600">
                  Recibe notificaciones prioritarias para pedidos marcados como urgentes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.urgentAlerts}
                  onChange={(e) => updateSettings("urgentAlerts", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {settings.urgentAlerts && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Nivel de prioridad mínimo</h4>
                <p className="text-sm text-gray-600 mb-3">Recibir alertas para pedidos con esta prioridad o superior</p>

                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="baja"
                      checked={settings.urgentPriority === "baja"}
                      onChange={() => updateSettings("urgentPriority", "baja")}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500"
                    />
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Baja
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="media"
                      checked={settings.urgentPriority === "media"}
                      onChange={() => updateSettings("urgentPriority", "media")}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500"
                    />
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Media
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="alta"
                      checked={settings.urgentPriority === "alta"}
                      onChange={() => updateSettings("urgentPriority", "alta")}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                    />
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Alta</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="crítica"
                      checked={settings.urgentPriority === "crítica"}
                      onChange={() => updateSettings("urgentPriority", "crítica")}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                    />
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Crítica
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección: Resumen diario */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Resumen Diario
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Activar resumen diario</h4>
                <p className="text-sm text-gray-600">
                  Recibe un recordatorio diario con un resumen de los pedidos pendientes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.dailySummary}
                  onChange={(e) => updateSettings("dailySummary", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            {settings.dailySummary && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Hora del resumen</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Selecciona la hora a la que quieres recibir el resumen diario
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={settings.summaryTime}
                    onChange={(e) => updateSettings("summaryTime", e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección: Canales de notificación */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            Canales de Notificación
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <p className="text-sm text-gray-600">Recibir notificaciones por correo electrónico</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.channels.email}
                  onChange={(e) => updateChannel("email", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Notificaciones Push</h4>
                  <p className="text-sm text-gray-600">Recibir notificaciones en el navegador</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.channels.push}
                  onChange={(e) => updateChannel("push", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">SMS</h4>
                  <p className="text-sm text-gray-600">Recibir notificaciones por mensaje de texto</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.channels.sms}
                  onChange={(e) => updateChannel("sms", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">En la aplicación</h4>
                  <p className="text-sm text-gray-600">Recibir notificaciones dentro de la aplicación</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.channels.inApp}
                  onChange={(e) => updateChannel("inApp", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Sección: Configuración avanzada */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Configuración Avanzada
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Horario de trabajo</h4>
              <p className="text-sm text-gray-600 mb-3">Solo recibir notificaciones durante estas horas</p>

              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
                  <input
                    type="time"
                    value={settings.workingHours.start}
                    onChange={(e) => updateNestedSettings("workingHours", "start", e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora de fin</label>
                  <input
                    type="time"
                    value={settings.workingHours.end}
                    onChange={(e) => updateNestedSettings("workingHours", "end", e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Notificaciones en fin de semana</h4>
                <p className="text-sm text-gray-600">Recibir notificaciones también en sábados y domingos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.weekends}
                  onChange={(e) => updateSettings("weekends", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Sonido de notificaciones</h4>
                <p className="text-sm text-gray-600">Reproducir sonido al recibir notificaciones</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.sound}
                  onChange={(e) => updateSettings("sound", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {settings.sound && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Volumen</h4>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="80"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    
      {/* Botones de acción */}
      <div className="p-4 bg-white border-t border-gray-200 flex justify-end gap-3">
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          onClick={saveSettings}
        >
          Guardar configuración
        </button>
      </div>
    </div>
  )
}

export default NotificationSettings
