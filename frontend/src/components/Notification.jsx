import { useContext, useEffect } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'

// Small message at the top of the page that hides after 3 seconds
function Notification() {
  const { notification, setNotification } = useContext(RestaurantContext)

  useEffect(() => {
    if (notification === '') return

    const timer = setTimeout(() => setNotification(''), 3000)
    return () => clearTimeout(timer)
  }, [notification, setNotification])

  if (notification === '') return null

  return <div className="notification">{notification}</div>
}

export default Notification
