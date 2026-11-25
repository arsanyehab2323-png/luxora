import { useContext } from 'react'
import { PropertiesContext } from '../context/PropertiesContext'

/**
 * useProperties
 * Access the properties and agents state and actions from PropertiesContext.
 *
 * Returns:
 *  - properties, agents: arrays
 *  - isLoading: boolean
 *  - getPropertyById(id), addProperty(data), updateProperty(id, updates), deleteProperty(id)
 *  - getAgentById(id), addAgent(data), updateAgent(id, updates), deleteAgent(id)
 *  - resetData()
 */
export default function useProperties() {
  const context = useContext(PropertiesContext)

  if (context === null) {
    throw new Error('useProperties must be used inside a <PropertiesProvider>.')
  }

  return context
}