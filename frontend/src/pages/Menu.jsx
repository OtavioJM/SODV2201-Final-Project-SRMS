import { useContext, useState } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'
import { categories } from '../data/menuData'
import MenuItemCard from '../components/MenuItemCard'

function Menu() {
  const { menu, addToCart } = useContext(RestaurantContext)

  // Filters
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [diet, setDiet] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')

  const filteredMenu = menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    const matchDiet = diet === 'All' || item.dietary.includes(diet)
    const matchPrice = maxPrice === '' || item.price <= Number(maxPrice)

    return matchSearch && matchCategory && matchDiet && matchPrice
  })

  function clearFilters() {
    setSearch('')
    setCategory('All')
    setDiet('All')
    setMaxPrice('')
  }

  return (
    <section>
      <h2 className="page-title">Our Menu</h2>

      <div className="card filters">
        <input
          placeholder="Search a dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="All">Any diet</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten-Free</option>
        </select>

        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Any price</option>
          <option value="10">Under $10</option>
          <option value="15">Under $15</option>
          <option value="20">Under $20</option>
        </select>

        <button className="btn-light" onClick={clearFilters}>Clear</button>
      </div>

      {filteredMenu.length === 0 && (
        <p className="empty">No dishes match your search. Try other filters.</p>
      )}

      {/* One section for each category */}
      {categories.map((cat) => {
        const items = filteredMenu.filter((item) => item.category === cat)
        if (items.length === 0) return null

        return (
          <div key={cat} className="menu-category">
            <h3>{cat}</h3>
            <div className="menu-grid">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Menu
