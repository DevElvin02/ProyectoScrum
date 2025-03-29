import { electronAPI } from './apiService'

export const getAllOrders = async () => {
  try {
    return await electronAPI.getAllOrders()
  } catch (error) {
    console.error('Error getting orders:', error)
    throw error
  }
}

export const getOrderById = async (id) => {
  try {
    return await electronAPI.getOrderById(id)
  } catch (error) {
    console.error('Error getting order:', error)
    throw error
  }
}

export const createOrder = async (data) => {
  try {
    return await electronAPI.createOrder(data)
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export const updateOrderStatus = async (id, estado) => {
  try {
    return await electronAPI.updateOrderStatus(id, estado)
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export const registerPartialPayment = async (pedidoId, monto) => {
  try {
    return await electronAPI.registerPartialPayment(pedidoId, monto)
  } catch (error) {
    console.error('Error registering payment:', error)
    throw error
  }
}

export const deleteOrder = async (id) => {
  try {
    return await electronAPI.deleteOrder(id)
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}