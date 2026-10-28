import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Notification from './components/Notification'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import Reservations from './pages/Reservations'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Router>
      <Header title="Smart Bistro" />
      <Notification />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <div className="card center">
                <h2>Page not found</h2>
                <Link to="/" className="btn">Back to Home</Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* The AI chat shows on every page */}
      <ChatBot />

      <footer className="footer">
        Smart Bistro © 2026 - SODV2201 Final Project by Otavio Menoni
      </footer>
    </Router>
  )
}

export default App
