// Steps of an order, in order
export const orderStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered']

// Sample data so the pages are not empty when the app starts
export const sampleOrders = [
  {
    id: 1001,
    customer: 'Otavio Menoni',
    phone: '403-555-0142',
    address: '',
    type: 'Pickup',
    items: [
      { name: 'Chicken Alfredo', price: 18.99, quantity: 1 },
      { name: 'Chocolate Lava Cake', price: 8.99, quantity: 1 },
    ],
    total: 27.98,
    status: 'Delivered',
    date: 'Oct 20, 2026, 7:15 PM',
  },
]

export const sampleReservations = [
  {
    id: 101,
    name: 'Otavio Menoni',
    email: 'otavio@email.com',
    date: '2026-11-07',
    time: '19:00',
    guests: 12,
    type: 'Special Event',
    eventType: 'Birthday Party',
    eventMenu: 'Pizza & Drinks',
    notes: 'We will bring our own cake.',
    status: 'Pending',
  },
]
