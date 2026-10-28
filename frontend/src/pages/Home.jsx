import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to Smart Bistro</h1>
        <p>
          Fresh Italian-style food made to order. Order online for pickup or delivery,
          or book a table for your next dinner or celebration.
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn">Order Now</Link>
          <Link to="/reservations" className="btn btn-light">Book a Table</Link>
        </div>
      </section>

      <section className="card special">
        <h2>Today's Special</h2>
        <p>
          <strong>Chicken Alfredo</strong> - fettuccine with grilled chicken in a creamy
          parmesan sauce, only <strong>$18.99</strong>.
        </p>
        <Link to="/menu">See the full menu →</Link>
      </section>

      <div className="features">
        <div className="card">
          <h3>Order Online</h3>
          <p>Add your favorite dishes to the cart and choose pickup or delivery.</p>
        </div>
        <div className="card">
          <h3>Reservations & Events</h3>
          <p>Book a table or plan a birthday party or a corporate gathering with us.</p>
        </div>
        <div className="card">
          <h3>AI Assistant</h3>
          <p>Not sure what to eat? Click "Ask our AI" at the bottom of the page.</p>
        </div>
      </div>

      <p className="small center">Open every day from 11:00 to 22:00 · 123 Main St, Calgary</p>
    </>
  )
}

export default Home
