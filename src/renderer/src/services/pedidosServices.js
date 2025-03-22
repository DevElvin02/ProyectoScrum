import { electronAPI } from './apiService'

export const getAll = async () => {
  try {
    return await electronAPI.getAll()
  } catch (error) {
    return error
  }
}
export const getOne = async () => {
    try {
      return await electronAPI.getOne()
    } catch (error) {
      return error
    }
  }
