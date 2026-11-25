/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const FavoritesContext = createContext(null)

const STORAGE_KEY = 'luxora_favorites'

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEY, [])

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(Number(id)),
    [favoriteIds]
  )

  const addFavorite = useCallback(
    (id) => {
      const numericId = Number(id)
      setFavoriteIds((prev) =>
        prev.includes(numericId) ? prev : [...prev, numericId]
      )
    },
    [setFavoriteIds]
  )

  const removeFavorite = useCallback(
    (id) => {
      const numericId = Number(id)
      setFavoriteIds((prev) => prev.filter((item) => item !== numericId))
    },
    [setFavoriteIds]
  )

  const toggleFavorite = useCallback(
    (id) => {
      const numericId = Number(id)
      setFavoriteIds((prev) =>
        prev.includes(numericId)
          ? prev.filter((item) => item !== numericId)
          : [...prev, numericId]
      )
    },
    [setFavoriteIds]
  )

  const clearFavorites = useCallback(() => setFavoriteIds([]), [setFavoriteIds])

  const value = useMemo(
    () => ({
      favoriteIds,
      favoritesCount: favoriteIds.length,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [
      favoriteIds,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
    ]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}