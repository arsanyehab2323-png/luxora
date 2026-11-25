import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Properties from './pages/Properties/Properties'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import About from './pages/About/About'
import Agents from './pages/Agents/Agents'
import AgentProfile from './pages/Agents/AgentProfile'
import Favorites from './pages/Favorites/Favorites'
import Contact from './pages/Contact/Contact'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}