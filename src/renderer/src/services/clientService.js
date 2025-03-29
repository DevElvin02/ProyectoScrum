import { electronAPI } from './apiService'

export const getAllClients = async () => {
  try {
    return await electronAPI.getAllClients()
  } catch (error) {
    console.error('Error getting clients:', error)
    throw error
  }
}

export const getClientById = async (id) => {
  try {
    return await electronAPI.getClientById(id)
  } catch (error) {
    console.error('Error getting client:', error)
    throw error
  }
}

export const createClient = async (data) => {
  try {
    return await electronAPI.createClient(data)
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}

export const updateClient = async (id, data) => {
  // console.log("id: ",id)
  // console.log("data",data)
  try {
    return await electronAPI.updateClient(id, data)
  } catch (error) {
    console.error('Error updating client:', error)
    throw error
  }
}

export const deleteClient = async (id) => {
  try {
    return await electronAPI.deleteClient(id)
  } catch (error) {
    console.error('Error deleting client:', error)
    throw error
  }
}
