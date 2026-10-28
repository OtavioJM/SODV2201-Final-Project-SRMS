import { createContext, useState } from 'react'
import { menuData } from '../data/menuData'
import { sampleOrders, sampleReservations } from '../data/restaurantData'

// Global state of the restaurant, shared by the customer pages and the admin page
export const RestaurantContext = createContext()

export function RestaurantProvider({ children }) {
  const [menu, setMenu] = useState(menuData)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState(sampleOrders)
  const [reservations, setReservations] = useState(sampleReservations)
  const [notification, setNotification] = useState('')

  // ---------- Cart ----------
  function addToCart(item) {
    const inCart = cart.find((cartItem) => cartItem.id === item.id)

    if (inCart) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    setNotification(`${item.name} added to your cart`)
  }

  // amount is +1 or -1, items with 0 are removed
  function changeQuantity(id, amount) {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    )
    setCart(updated.filter((item) => item.quantity > 0))
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  // ---------- Orders ----------
  function placeOrder(details) {
    const newOrder = {
      id: 1001 + orders.length,
      ...details,
      items: cart.map((item) => ({ name: item.name, price: item.price, quantity: item.quantity })),
      status: 'Pending',
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    }

    setOrders([newOrder, ...orders])
    setCart([])
    setNotification(`Order #${newOrder.id} confirmed! You can follow the status in My Orders.`)
  }

  function updateOrderStatus(id, status) {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)))
    setNotification(`Order #${id} is now ${status}`)
  }

  // ---------- Reservations ----------
  function addReservation(data) {
    const newReservation = { id: 101 + reservations.length, ...data, status: 'Pending' }
    setReservations([newReservation, ...reservations])
    setNotification(`Reservation #${newReservation.id} confirmed for ${data.date} at ${data.time}`)
    return newReservation
  }

  function updateReservationStatus(id, status) {
    setReservations(reservations.map((res) => (res.id === id ? { ...res, status } : res)))
    setNotification(`Reservation #${id} ${status.toLowerCase()}`)
  }

  // ---------- Menu (admin) ----------
  function addMenuItem(item) {
    setMenu([...menu, { ...item, id: Date.now() }])
    setNotification(`${item.name} added to the menu`)
  }

  function updateMenuItem(updatedItem) {
    setMenu(menu.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setNotification(`${updatedItem.name} updated`)
  }

  function deleteMenuItem(id) {
    setMenu(menu.filter((item) => item.id !== id))
  }

  function toggleAvailable(id) {
    setMenu(menu.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <RestaurantContext.Provider
      value={{
        menu,
        cart,
        orders,
        reservations,
        notification,
        setNotification,
        addToCart,
        changeQuantity,
        removeFromCart,
        placeOrder,
        updateOrderStatus,
        addReservation,
        updateReservationStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailable,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}
