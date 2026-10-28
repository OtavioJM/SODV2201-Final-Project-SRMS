# Smart Restaurant Management System - Assignment 1 (Front-End)

Otavio Menoni - SODV2201 Web Programming

React front-end for the Smart Restaurant Management System (Smart Bistro).
Made with React, Vite and React Router. For now the data is kept in React state,
the back-end and the database will be added in Assignment 2.

## Pages

- **Home** - welcome page and today's special
- **Menu** - dishes by category (starters, mains, desserts, beverages) with search and filters by category, diet and price
- **Cart** - change quantities, choose pickup or delivery and place the order
- **My Orders** - order history and the status of each order
- **Reservations** - book a table or a special event (birthday, corporate...) and cancel bookings
- **Admin** - dashboard with simple analytics, menu CRUD, order status and approve/cancel reservations
- **AI Assistant** - chat button on every page, the AI is simulated locally with a dataset (`src/data/aiData.js`)

## How to run

```
npm install
npm run dev
```
