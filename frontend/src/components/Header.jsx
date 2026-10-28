import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'

// Top bar with the restaurant name and the menu
function Header({ title }) {
  const { cart } = useContext(RestaurantContext)

  // Total number of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="header">
      <NavLink to="/" className="logo">{title}</NavLink>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/reservations">Reservations</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart">
          Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/admin" className="admin-link">Admin</NavLink>
      </nav>
    </header>
  )
}

export default Header
