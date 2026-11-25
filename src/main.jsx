import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './context/ToastContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { PropertiesProvider } from './context/PropertiesContext'
import './styles/variables.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>
          <PropertiesProvider>
            <App />
          </PropertiesProvider>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
)