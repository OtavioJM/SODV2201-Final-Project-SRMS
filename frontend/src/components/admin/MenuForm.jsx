import { useState } from 'react'
import { categories } from '../../data/menuData'

const dietOptions = ['Vegetarian', 'Vegan', 'Gluten-Free']

const emptyItem = {
  name: '',
  category: 'Mains',
  price: '',
  description: '',
  ingredients: '',
  dietary: [],
  available: true,
}

// Form to add a new item or edit one (if it receives an item)
function MenuForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState(
    item ? { ...item, ingredients: item.ingredients.join(', ') } : emptyItem
  )
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // Adds or removes a diet from the list
  function toggleDiet(diet) {
    if (form.dietary.includes(diet)) {
      setForm({ ...form, dietary: form.dietary.filter((d) => d !== diet) })
    } else {
      setForm({ ...form, dietary: [...form.dietary, diet] })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.name.trim() === '' || form.description.trim() === '') {
      setError('Name and description are required.')
      return
    }
    if (Number(form.price) <= 0) {
      setError('Price must be more than $0.')
      return
    }

    onSave({
      ...form,
      price: Number(form.price),
      ingredients: form.ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ''),
    })
  }

  return (
    <form className="form menu-form" onSubmit={handleSubmit}>
      <h4>{item ? `Edit ${item.name}` : 'New Menu Item'}</h4>

      <div className="row">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Price ($)
          <input type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} />
        </label>
      </div>

      <label>
        Description
        <input name="description" value={form.description} onChange={handleChange} />
      </label>

      <label>
        Ingredients (separated by commas)
        <input name="ingredients" value={form.ingredients} onChange={handleChange} />
      </label>

      <div className="checkboxes">
        {dietOptions.map((diet) => (
          <label key={diet}>
            <input
              type="checkbox"
              checked={form.dietary.includes(diet)}
              onChange={() => toggleDiet(diet)}
            />
            {diet}
          </label>
        ))}
        <label>
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Available
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="buttons">
        <button type="submit">{item ? 'Save Changes' : 'Add Item'}</button>
        <button type="button" className="btn-light" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default MenuForm
