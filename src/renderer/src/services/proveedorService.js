import { electronAPI } from './apiService'

export const getAllProviders = async () => {
  try {
    return await electronAPI.getAllProviders()
  } catch (error) {
    console.error('Error getting providers:', error)
    throw error
  }
}

export const getProviderById = async (id) => {
  try {
    return await electronAPI.getProviderById(id)
  } catch (error) {
    console.error('Error getting provider:', error)
    throw error
  }
}

export const createProvider = async (data) => {
  try {
    return await electronAPI.createProvider(data)
  } catch (error) {
    console.error('Error creating provider:', error)
    throw error
  }
}

export const updateProvider = async (id, data) => {
  try {
    return await electronAPI.updateProvider(id, data)
  } catch (error) {
    console.error('Error updating provider:', error)
    throw error
  }
}

export const deleteProvider = async (id) => {
  try {
    return await electronAPI.deleteProvider(id)
  } catch (error) {
    console.error('Error deleting provider:', error)
    throw error
  }
}

export const getProviderProducts = async (id) => {
  try {
    return await electronAPI.getProviderProducts(id)
  } catch (error) {
    console.error('Error getting provider products:', error)
    throw error
  }
}