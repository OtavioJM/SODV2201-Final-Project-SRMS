import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'

const DELIVERY_FEE = 5

function Cart() {
  const { cart, changeQuantity, removeFromCart, placeOrder } = useContext(RestaurantContext)
  const navigate = useNavigate()

  const [orderType, setOrderType] = useState('Pickup')
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [error, setError] = useState('')

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = orderType === 'Delivery' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.name.trim() === '' || form.phone.trim() === '') {
      setError('Please enter your name and phone number.')
      return
    }
    if (orderType === 'Delivery' && form.address.trim() === '') {
      setError('Please enter your address for the delivery.')
      return
    }

    placeOrder({
      customer: form.name,
      phone: form.phone,
      address: orderType === 'Delivery' ? form.address : '',
      type: orderType,
      total,
    })
    navigate('/orders')
  }

  // Nothing in the cart yet
  if (cart.length === 0) {
    return (
      <section className="card center">
        <h2>Your cart is empty</h2>
        <p>Take a look at our menu and add something you like.</p>
        <Link to="/menu" className="btn">See the Menu</Link>
      </section>
    )
  }

  return (
    <section className="two-columns">
      <div className="card">
        <h2>Your Cart</h2>

        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id}>
              <div className="cart-name">
                <strong>{item.name}</strong>
                <span className="small">${item.price.toFixed(2)} each</span>
              </div>

              <div className="qty">
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
              </div>

              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>

        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          {orderType === 'Delivery' && <p>Delivery fee: ${DELIVERY_FEE.toFixed(2)}</p>}
          <p className="total">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      <form className="card form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Pickup"
              checked={orderType === 'Pickup'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Pickup
          </label>
          <label>
            <input
              type="radio"
              value="Delivery"
              checked={orderType === 'Delivery'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Delivery (+$5.00)
          </label>
        </div>

        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>

        {/* Only asks for the address when it's a delivery */}
        {orderType === 'Delivery' && (
          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} />
          </label>
        )}

        {error && <p className="error">{error}</p>}

        <p className="small">Payment is simulated, you pay when you get your food.</p>
        <button type="submit">Place Order - ${total.toFixed(2)}</button>
      </form>
    </section>
  )
}

export default Cart
