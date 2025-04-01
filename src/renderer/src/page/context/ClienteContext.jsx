import React, { createContext, useState, useEffect } from 'react'
import {
  getAllClients,
  createClient,
  deleteClient,
  updateClient
} from '../../services/clientService'

// 1. Creamos el contexto
export const ClientesContext = createContext()

// 2. Creamos el proveedor (Provider)
export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(false)

  //Función para cargar clientes
  const cargarClientes = async () => {
    try {
      const response = await getAllClients()
      const responseData = response.map((item) => item.dataValues)
      console.log('responseData', responseData)

      setClientes(responseData)
    } catch (error) {
      console.error('Error al cargar clientes', error)
    }
  }

  //Función para guardar cliente
  const agregarClientes = async (data) => {
    try {
      await createClient(data)
      await cargarClientes()
    } catch (error) {
      console.error('Error al cargar clientes', error)
    } finally {
    }
  }

  // Funcion para eliminar
  const eliminarCliente = async (id) => {
    try {
      await deleteClient(id)
      await cargarClientes()
    } catch (error) {
      console.error('Error al cargar clientes', error)
    } finally {
    }
  }

  // funcion para actualizar
  const actulizarCliente = async (id, data) => {
    // console.log("id:", id)
    // console.log("data:", data)
    try {
      await updateClient(id, data)
      await cargarClientes()
    } catch (error) {
      console.error('Error al cargar clientes', error)
    } finally {
    }
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        cargando,
        cargarClientes,
        agregarClientes,
        eliminarCliente,
        actulizarCliente
      }}
    >
      {children}
    </ClientesContext.Provider>
  )
}
