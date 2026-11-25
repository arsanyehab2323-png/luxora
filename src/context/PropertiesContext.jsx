/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { initialProperties } from '../data/properties'
import { initialAgents } from '../data/agents'

export const PropertiesContext = createContext(null)

const PROPERTIES_KEY = 'luxora_properties'
const AGENTS_KEY = 'luxora_agents'
const LOADING_DELAY = 600

const today = () => new Date().toISOString().slice(0, 10)

const nextId = (items) =>
  items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useLocalStorage(
    PROPERTIES_KEY,
    initialProperties
  )
  const [agents, setAgents] = useLocalStorage(AGENTS_KEY, initialAgents)
  const [isLoading, setIsLoading] = useState(true)

  // Simulated loading so the UI can show skeleton / loading states
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY)
    return () => clearTimeout(timer)
  }, [])

  /* ---------- Property actions ---------- */

  const getPropertyById = useCallback(
    (id) => properties.find((property) => property.id === Number(id)),
    [properties]
  )

  const addProperty = useCallback(
    (data) => {
      const newProperty = {
        features: [],
        amenities: [],
        images: [],
        featured: false,
        parking: 0,
        yearBuilt: new Date().getFullYear(),
        coordinates: { lat: 40.7527, lng: -73.9772 },
        ...data,
        id: nextId(properties),
        createdAt: today(),
      }
      setProperties((prev) => [newProperty, ...prev])
      return newProperty
    },
    [properties, setProperties]
  )

  const updateProperty = useCallback(
    (id, updates) => {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === Number(id) ? { ...property, ...updates } : property
        )
      )
    },
    [setProperties]
  )

  const deleteProperty = useCallback(
    (id) => {
      setProperties((prev) =>
        prev.filter((property) => property.id !== Number(id))
      )
    },
    [setProperties]
  )

  /* ---------- Agent actions ---------- */

  const getAgentById = useCallback(
    (id) => agents.find((agent) => agent.id === Number(id)),
    [agents]
  )

  const addAgent = useCallback(
    (data) => {
      const newAgent = {
        languages: ['English'],
        experience: 0,
        propertiesSold: 0,
        bio: '',
        image: '',
        social: { linkedin: '#', instagram: '#', twitter: '#' },
        ...data,
        id: nextId(agents),
      }
      setAgents((prev) => [...prev, newAgent])
      return newAgent
    },
    [agents, setAgents]
  )

  const updateAgent = useCallback(
    (id, updates) => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === Number(id) ? { ...agent, ...updates } : agent
        )
      )
    },
    [setAgents]
  )

  const deleteAgent = useCallback(
    (id) => {
      setAgents((prev) => prev.filter((agent) => agent.id !== Number(id)))
    },
    [setAgents]
  )

  /* ---------- Reset demo data ---------- */

  const resetData = useCallback(() => {
    setProperties(initialProperties)
    setAgents(initialAgents)
  }, [setProperties, setAgents])

  const value = useMemo(
    () => ({
      properties,
      agents,
      isLoading,
      getPropertyById,
      addProperty,
      updateProperty,
      deleteProperty,
      getAgentById,
      addAgent,
      updateAgent,
      deleteAgent,
      resetData,
    }),
    [
      properties,
      agents,
      isLoading,
      getPropertyById,
      addProperty,
      updateProperty,
      deleteProperty,
      getAgentById,
      addAgent,
      updateAgent,
      deleteAgent,
      resetData,
    ]
  )

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  )
}