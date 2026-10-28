import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'
import OrderStatus from '../components/OrderStatus'

// Order history of the customer with the status of each order
function MyOrders() {
  const { orders } = useContext(RestaurantContext)

  if (orders.length === 0) {
    return (
      <section className="card center">
        <h2>No orders yet</h2>
        <Link to="/menu" className="btn">Order something</Link>
      </section>
    )
  }

  return (
    <section>
      <h2 className="page-title">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="card order">
          <div className="card-top">
            <h3>Order #{order.id}</h3>
            <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
          </div>

          <p className="small">
            {order.date} · {order.type}
            {order.type === 'Delivery' && ` to ${order.address}`}
          </p>

          <ul>
            {order.items.map((item) => (
              <li key={item.name}>
                {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total: ${order.total.toFixed(2)}</strong></p>

          <OrderStatus status={order.status} />
        </div>
      ))}
    </section>
  )
}

export default MyOrders
