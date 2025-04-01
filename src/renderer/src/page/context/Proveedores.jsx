import { createContext, useContext, useState, useEffect } from 'react'
import { createProvider, getAllProviders, updateProvider } from '../../services/proveedorService'

const ProvidersContext = createContext()

export const PageProvider = ({ children }) => {
  const [supplysList, setSupplysList] = useState([])

  const loadSupplyList = async () => {
    try {
      const supply = await getAllProviders()
      const supplysData = supply.map((item) => item.dataValues)

      setSupplysList(supplysData)
    } catch (error) {
      console.log('Error al cargar la lista de proveedores', error)
    }
  }

  const addSupply = async (newSupplier) => {
    try {
      await createProvider(newSupplier)
      await loadSupplyList()
    } catch (error) {
      console.log('error al guardar el proveedor', error)
    }
  }

  const editSupply = async (id, supplierData) => {
    try {
      await updateProvider(id, supplierData)
      await loadSupplyList()
    } catch (err) {
      console.log('error al editar el proveedor', err)
    }
  }

  useEffect(() => {
    loadSupplyList()
  }, [])
  return <ProvidersContext.Provider 
    value={{ 
        supplysList,
         addSupply 
        }}>
    {children}
        </ProvidersContext.Provider>
}

export const useProvider = () => useContext(ProvidersContext)
