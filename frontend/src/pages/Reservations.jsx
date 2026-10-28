import { useContext, useState } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'

const times = ['11:00', '12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const eventTypes = ['Birthday Party', 'Corporate Gathering', 'Anniversary', 'Other']
const eventMenus = ['Pasta & Salad', 'Pizza & Drinks', '3-Course Dinner']

// Today in the format YYYY-MM-DD, same as the date input
const today = new Date().toLocaleDateString('en-CA')

const emptyForm = {
  type: 'Table',
  name: '',
  email: '',
  date: '',
  time: '',
  guests: 2,
  eventType: eventTypes[0],
  eventMenu: eventMenus[0],
  notes: '',
}

function Reservations() {
  const { reservations, addReservation, updateReservationStatus } = useContext(RestaurantContext)

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState([])
  const [confirmation, setConfirmation] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const list = []
    if (form.name.trim() === '') list.push('Please enter your name.')
    if (!form.email.includes('@')) list.push('Please enter a valid email.')
    if (form.date === '' || form.date < today) list.push('Please choose a date from today on.')
    if (form.time === '') list.push('Please choose a time.')
    if (form.guests < 1 || form.guests > 30) list.push('Guests must be between 1 and 30.')
    return list
  }

  function handleSubmit(e) {
    e.preventDefault()

    const formErrors = validate()
    setErrors(formErrors)
    if (formErrors.length > 0) return

    const data = { ...form, guests: Number(form.guests) }
    if (form.type === 'Table') {
      delete data.eventType
      delete data.eventMenu
    }

    setConfirmation(addReservation(data))
    setForm(emptyForm)
  }

  return (
    <section>
      <h2 className="page-title">Reservations</h2>

      <div className="two-columns">
        <form className="card form" onSubmit={handleSubmit}>
          <h3>Book a table or an event</h3>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="Table"
                checked={form.type === 'Table'}
                onChange={handleChange}
              />
              Table
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Special Event"
                checked={form.type === 'Special Event'}
                onChange={handleChange}
              />
              Special Event
            </label>
          </div>

          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>

          <div className="row">
            <label>
              Date
              <input type="date" name="date" min={today} value={form.date} onChange={handleChange} />
            </label>
            <label>
              Time
              <select name="time" value={form.time} onChange={handleChange}>
                <option value="">Select</option>
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </label>
            <label>
              Guests
              <input type="number" name="guests" min="1" max="30" value={form.guests} onChange={handleChange} />
            </label>
          </div>

          {/* Extra fields only for special events */}
          {form.type === 'Special Event' && (
            <div className="row">
              <label>
                Event type
                <select name="eventType" value={form.eventType} onChange={handleChange}>
                  {eventTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label>
                Menu
                <select name="eventMenu" value={form.eventMenu} onChange={handleChange}>
                  {eventMenus.map((menu) => (
                    <option key={menu}>{menu}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <label>
            Special requests (optional)
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
          </label>

          {errors.length > 0 && (
            <ul className="error">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <button type="submit">{form.type === 'Table' ? 'Book Table' : 'Book Event'}</button>
        </form>

        <div>
          {confirmation && (
            <div className="success">
              <h3>Reservation confirmed!</h3>
              <p>
                Thank you, {confirmation.name}. Your{' '}
                {confirmation.type === 'Table' ? 'table' : confirmation.eventType.toLowerCase()} for{' '}
                {confirmation.guests} guests on {confirmation.date} at {confirmation.time} was booked.
              </p>
              <p>
                Confirmation number: <strong>#{confirmation.id}</strong>. We will send the
                details to {confirmation.email}.
              </p>
            </div>
          )}

          <div className="card">
            <h3>My Reservations</h3>

            {reservations.length === 0 ? (
              <p className="empty">You don't have any reservations yet.</p>
            ) : (
              <ul className="reservation-list">
                {reservations.map((res) => (
                  <li key={res.id}>
                    <div>
                      <strong>#{res.id} {res.type === 'Table' ? 'Table' : res.eventType}</strong>
                      <span className="small">
                        {res.date} at {res.time} · {res.guests} guests
                      </span>
                    </div>
                    <span className={`status ${res.status.toLowerCase()}`}>{res.status}</span>
                    {res.status !== 'Cancelled' && (
                      <button className="remove" onClick={() => updateReservationStatus(res.id, 'Cancelled')}>
                        Cancel
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservations
