import { orderStatuses } from '../data/restaurantData'

// Shows the progress of an order (Pending > Preparing > Ready > Delivered)
function OrderStatus({ status }) {
  const currentStep = orderStatuses.indexOf(status)

  return (
    <div className="tracker">
      {orderStatuses.map((step, index) => (
        <div key={step} className={index <= currentStep ? 'step done' : 'step'}>
          <span className="dot"></span>
          {step}
        </div>
      ))}
    </div>
  )
}

export default OrderStatus
