import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'

/**
 * useFavorites
 * Access the favorites state and actions from FavoritesContext.
 *
 * Returns:
 *  - favoriteIds: number[]
 *  - favoritesCount: number
 *  - isFavorite(id): boolean
 *  - addFavorite(id)
 *  - removeFavorite(id)
 *  - toggleFavorite(id)
 *  - clearFavorites()
 */
export default function useFavorites() {
  const context = useContext(FavoritesContext)

  if (context === null) {
    throw new Error('useFavorites must be used inside a <FavoritesProvider>.')
  }

  return context
}