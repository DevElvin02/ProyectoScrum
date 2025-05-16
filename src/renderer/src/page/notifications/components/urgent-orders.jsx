"use client"

import React, { useState } from "react"
import { AlertTriangle, ArrowUp, Bell, Calendar, CheckCircle, Clock, MessageSquare, Phone, User } from "lucide-react"

const UrgentOrders = () => {
  // Estado para seguimiento de pedidos atendidos
  const [attendedOrders, setAttendedOrders] = useState([])

  // Datos de ejemplo para pedidos urgentes
  const urgentOrders = [
    {
      id: 1,
      name: "Pedido #1234",
      client: "Empresa ABC",
      contactPerson: "Juan Pérez",
      contactPhone: "+34 612 345 678",
      dueDate: "2025-05-15",
      daysLeft: 5,
      items: 12,
      priority: "alta",
      notes: "Cliente VIP, requiere atención prioritaria",
    },
    {
      id: 4,
      name: "Pedido #3456",
      client: "Tienda Online",
      contactPerson: "María García",
      contactPhone: "+34 623 456 789",
      dueDate: "2025-05-12",
      daysLeft: 2,
      items: 3,
      priority: "crítica",
      notes: "Pedido con retraso, cliente esperando confirmación urgente",
    },
    {
      id: 7,
      name: "Pedido #2468",
      client: "Supermercados Norte",
      contactPerson: "Carlos Rodríguez",
      contactPhone: "+34 634 567 890",
      dueDate: "2025-05-11",
      daysLeft: 1,
      items: 8,
      priority: "crítica",
      notes: "Productos perecederos, entrega inmediata",
    },
  ]

  // Función para marcar un pedido como atendido
  const markAsAttended = (orderId) => {
    if (attendedOrders.includes(orderId)) {
      setAttendedOrders(attendedOrders.filter((id) => id !== orderId))
    } else {
      setAttendedOrders([...attendedOrders, orderId])
    }
  }

  // Función para determinar el color de prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "crítica":
        return "bg-red-600"
      case "alta":
        return "bg-orange-500"
      default:
        return "bg-yellow-500"
    }
  }

  // Función para determinar el color de días restantes
  const getDaysLeftColor = (days) => {
    if (days <= 1) return "text-red-600"
    if (days <= 3) return "text-orange-600"
    return "text-yellow-600"
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 bg-red-50 border-b border-red-200">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pedidos Urgentes</h2>
            <p className="text-gray-600 mt-1">
              Estos pedidos requieren atención inmediata para evitar retrasos en las entregas
            </p>
          </div>
        </div>
      </div>

      {/* Estadísticas de pedidos urgentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Pedidos Urgentes</h4>
            <p className="text-xl font-bold text-gray-800">{urgentOrders.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Atendidos</h4>
            <p className="text-xl font-bold text-gray-800">{attendedOrders.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Pendientes</h4>
            <p className="text-xl font-bold text-gray-800">{urgentOrders.length - attendedOrders.length}</p>
          </div>
        </div>
      </div>

      {/* Lista de pedidos urgentes */}
      <div className="p-4">
        <div className="grid gap-4">
          {urgentOrders.map((order) => {
            const isAttended = attendedOrders.includes(order.id)

            return (
              <div
                key={order.id}
                className={`border-l-4 rounded-lg transition-all ${
                  isAttended ? "border-l-green-500 bg-green-50" : `${getPriorityColor(order.priority)} bg-red-50`
                }`}
              >
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800">{order.name}</h3>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            isAttended ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isAttended ? <CheckCircle className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
                          {isAttended ? "Atendido" : "Urgente"}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{order.client}</p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>Contacto: {order.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{order.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Entrega: {order.dueDate}</span>
                          <span className={`font-medium ${getDaysLeftColor(order.daysLeft)}`}>
                            ({order.daysLeft <= 0 ? "¡Hoy!" : order.daysLeft === 1 ? "1 día" : `${order.daysLeft} días`}
                            )
                          </span>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-3 bg-white p-3 rounded border border-gray-200">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Notas:</span>
                          </div>
                          <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-full px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                          order.priority === "crítica" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        <ArrowUp className="w-4 h-4" />
                        <span className="font-medium capitalize">Prioridad {order.priority}</span>
                      </div>

                      <button
                        className={`w-full px-4 py-2 rounded-lg font-medium ${
                          isAttended
                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                        onClick={() => markAsAttended(order.id)}
                      >
                        {isAttended ? "Desmarcar atendido" : "Marcar como atendido"}
                      </button>

                      <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>

                {/* Barra de progreso para pedidos atendidos */}
                {isAttended && (
                  <div className="bg-green-200 h-2 w-full rounded-b-lg">
                    <div className="bg-green-500 h-2 rounded-bl-lg" style={{ width: "100%" }}></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Acciones rápidas</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
            Atender todos
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Enviar recordatorios
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Generar informe
          </button>
        </div>
      </div>
    </div>
  )
}

export default UrgentOrders
