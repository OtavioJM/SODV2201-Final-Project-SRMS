import { orderStatuses } from '../../data/restaurantData'

// All the orders, the admin changes the status with the select
function OrderManager({ orders, onStatusChange }) {
  if (orders.length === 0) {
    return <p className="card empty">No orders yet.</p>
  }

  return (
    <div className="card">
      <h3>Incoming Orders</h3>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Type</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.customer}
                  <span className="small block">{order.phone}</span>
                </td>
                <td>{order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</td>
                <td>
                  {order.type}
                  {order.type === 'Delivery' && <span className="small block">{order.address}</span>}
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <select
                    className={`status-select ${order.status.toLowerCase()}`}
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManager
