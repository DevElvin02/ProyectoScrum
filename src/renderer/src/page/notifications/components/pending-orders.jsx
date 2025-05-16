"use client"

import React, { useState } from "react"
import { Bell, Calendar, Clock, Filter, Search, Tag } from "lucide-react"

const PendingOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDays, setFilterDays] = useState("all")

  // Datos de ejemplo para pedidos pendientes
  const pendingOrders = [
    {
      id: 1,
      name: "Pedido #1234",
      client: "Empresa ABC",
      dueDate: "2025-05-15",
      isUrgent: true,
      daysLeft: 5,
      items: 12,
      status: "En proceso",
    },
    {
      id: 2,
      name: "Pedido #5678",
      client: "Distribuidora XYZ",
      dueDate: "2025-05-18",
      isUrgent: false,
      daysLeft: 8,
      items: 5,
      status: "Preparando",
    },
    {
      id: 3,
      name: "Pedido #9012",
      client: "Comercial 123",
      dueDate: "2025-05-20",
      isUrgent: false,
      daysLeft: 10,
      items: 8,
      status: "Pendiente",
    },
    {
      id: 4,
      name: "Pedido #3456",
      client: "Tienda Online",
      dueDate: "2025-05-12",
      isUrgent: true,
      daysLeft: 2,
      items: 3,
      status: "En proceso",
    },
    {
      id: 5,
      name: "Pedido #7890",
      client: "Mayorista Central",
      dueDate: "2025-05-25",
      isUrgent: false,
      daysLeft: 15,
      items: 20,
      status: "Pendiente",
    },
  ]

  // Filtrar pedidos según búsqueda y filtro de días
  const filteredOrders = pendingOrders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterDays === "all") return matchesSearch
    if (filterDays === "urgent") return matchesSearch && order.isUrgent
    if (filterDays === "week") return matchesSearch && order.daysLeft <= 7
    if (filterDays === "today") return matchesSearch && order.daysLeft <= 1

    return matchesSearch
  })

  // Función para determinar el color de la etiqueta de días restantes
  const getDaysLeftColor = (days) => {
    if (days <= 2) return "bg-red-100 text-red-800"
    if (days <= 7) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Pedidos Pendientes</h2>
        <p className="text-gray-600 mt-1">Gestiona y monitorea todos tus pedidos pendientes de entrega</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Buscar pedido o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={filterDays}
            onChange={(e) => setFilterDays(e.target.value)}
          >
            <option value="all">Todos los pedidos</option>
            <option value="urgent">Pedidos urgentes</option>
            <option value="today">Entrega hoy</option>
            <option value="week">Entrega esta semana</option>
          </select>
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="p-4">
        <div className="grid gap-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  order.isUrgent ? "border-l-4 border-l-red-500" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800">{order.name}</h3>
                      {order.isUrgent && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Bell className="w-3 h-3" /> Urgente
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{order.client}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {order.items} artículos
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Entrega: {order.dueDate}</span>
                    </div>
                    <span
                      className={`${getDaysLeftColor(order.daysLeft)} text-xs font-medium px-2.5 py-0.5 rounded-full mt-2`}
                    >
                      {order.daysLeft <= 0
                        ? "¡Entrega hoy!"
                        : order.daysLeft === 1
                          ? "1 día restante"
                          : `${order.daysLeft} días restantes`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                    Ver detalles
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Actualizar estado
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No se encontraron pedidos</h3>
              <p className="mt-1 text-gray-500">Prueba con otros términos de búsqueda o filtros</p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen de pedidos */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500">Total Pedidos</h4>
            <p className="text-2xl font-bold text-gray-800">{pendingOrders.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500">Pedidos Urgentes</h4>
            <p className="text-2xl font-bold text-red-600">{pendingOrders.filter((o) => o.isUrgent).length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500">Entregas Esta Semana</h4>
            <p className="text-2xl font-bold text-yellow-600">{pendingOrders.filter((o) => o.daysLeft <= 7).length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingOrders
