import { useContext, useState } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'
import OrderManager from '../components/admin/OrderManager'
import MenuManager from '../components/admin/MenuManager'
import ReservationManager from '../components/admin/ReservationManager'

const today = new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })

// Counts how many of each dish was ordered and returns the top one
function getPopularItem(orders) {
  const count = {}
  orders.forEach((order) => {
    order.items.forEach((item) => {
      count[item.name] = (count[item.name] || 0) + item.quantity
    })
  })

  let popular = '-'
  let max = 0
  for (const name in count) {
    if (count[name] > max) {
      max = count[name]
      popular = name
    }
  }
  return popular
}

function Admin() {
  const {
    menu,
    orders,
    reservations,
    updateOrderStatus,
    updateReservationStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailable,
  } = useContext(RestaurantContext)

  const [tab, setTab] = useState('orders')

  // Simple analytics for the dashboard
  const ordersToday = orders.filter((order) => order.date.startsWith(today)).length
  const revenue = orders.reduce((total, order) => total + order.total, 0)
  const pendingBookings = reservations.filter((res) => res.status === 'Pending').length

  return (
    <section>
      <h2 className="page-title">Admin Dashboard</h2>

      <div className="stats">
        <div className="card stat">
          <span>{ordersToday}</span>
          Orders today
        </div>
        <div className="card stat">
          <span>${revenue.toFixed(2)}</span>
          Total revenue
        </div>
        <div className="card stat">
          <span>{pendingBookings}</span>
          Pending bookings
        </div>
        <div className="card stat">
          <span>{getPopularItem(orders)}</span>
          Most popular dish
        </div>
      </div>

      <div className="tabs">
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>
          Orders ({orders.length})
        </button>
        <button className={tab === 'menu' ? 'active' : ''} onClick={() => setTab('menu')}>
          Menu ({menu.length})
        </button>
        <button className={tab === 'reservations' ? 'active' : ''} onClick={() => setTab('reservations')}>
          Reservations ({reservations.length})
        </button>
      </div>

      {/* Shows only the selected tab */}
      {tab === 'orders' && <OrderManager orders={orders} onStatusChange={updateOrderStatus} />}

      {tab === 'menu' && (
        <MenuManager
          menu={menu}
          onAdd={addMenuItem}
          onUpdate={updateMenuItem}
          onDelete={deleteMenuItem}
          onToggle={toggleAvailable}
        />
      )}

      {tab === 'reservations' && (
        <ReservationManager reservations={reservations} onStatusChange={updateReservationStatus} />
      )}
    </section>
  )
}

export default Admin
