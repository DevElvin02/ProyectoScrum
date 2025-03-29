import { electronAPI } from './apiService'

export const getAllProducts = async () => {
  try {
    return await electronAPI.getAllProducts()
  } catch (error) {
    console.error('Error getting products:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    return await electronAPI.getProductById(id)
  } catch (error) {
    console.error('Error getting product:', error)
    throw error
  }
}

export const createProduct = async (data) => {
  try {
    return await electronAPI.createProduct(data)
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const updateProduct = async (id, data) => {
  try {
    return await electronAPI.updateProduct(id, data)
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    return await electronAPI.deleteProduct(id)
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

export const updateProductStock = async (id, cantidad) => {
  try {
    return await electronAPI.updateProductStock(id, cantidad)
  } catch (error) {
    console.error('Error updating product stock:', error)
    throw error
  }
}

export const setCustomPrice = async (productoId, clienteId, precio) => {
  try {
    return await electronAPI.setCustomPrice(productoId, clienteId, precio)
  } catch (error) {
    console.error('Error setting custom price:', error)
    throw error
  }
}