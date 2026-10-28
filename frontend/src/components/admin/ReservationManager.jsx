import { useState } from 'react'

// Admin list of reservations and special events (approve or cancel)
function ReservationManager({ reservations, onStatusChange }) {
  const [filter, setFilter] = useState('All')

  const filtered = reservations.filter((res) => filter === 'All' || res.type === filter)

  return (
    <div className="card">
      <div className="card-top">
        <h3>Reservations & Events</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All bookings</option>
          <option value="Table">Tables</option>
          <option value="Special Event">Special Events</option>
        </select>
      </div>

      {filtered.length === 0 && <p className="empty">No bookings here.</p>}

      <ul className="booking-list">
        {filtered.map((res) => (
          <li key={res.id}>
            <div className="card-top">
              <strong>
                #{res.id} - {res.type === 'Table' ? 'Table' : res.eventType} for {res.guests} guests
              </strong>
              <span className={`status ${res.status.toLowerCase()}`}>{res.status}</span>
            </div>

            <p>
              {res.name} ({res.email}) · {res.date} at {res.time}
            </p>
            {res.type === 'Special Event' && <p className="small">Menu: {res.eventMenu}</p>}
            {res.notes && <p className="small">Notes: {res.notes}</p>}

            <div className="buttons">
              <button
                className="small-btn green"
                disabled={res.status !== 'Pending'}
                onClick={() => onStatusChange(res.id, 'Approved')}
              >
                Approve
              </button>
              <button
                className="small-btn remove"
                disabled={res.status === 'Cancelled'}
                onClick={() => onStatusChange(res.id, 'Cancelled')}
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReservationManager
