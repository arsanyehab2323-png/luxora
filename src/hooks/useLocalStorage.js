import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage
 * A drop-in replacement for useState that persists its value in localStorage.
 *
 * @param {string} key - The localStorage key.
 * @param {*} initialValue - Default value (or a function returning it).
 * @returns {[*, Function]} - [storedValue, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    const fallback =
      initialValue instanceof Function ? initialValue() : initialValue

    if (typeof window === 'undefined') return fallback

    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : fallback
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error)
      return fallback
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) =>
        value instanceof Function ? value(prev) : value
      )
    },
    []
  )

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Keep multiple tabs in sync
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue))
        } catch (error) {
          console.warn(`Could not sync localStorage key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [storedValue, setValue]
}