import { useState } from 'react'
import MenuForm from './MenuForm'

// Admin CRUD for the menu items
function MenuManager({ menu, onAdd, onUpdate, onDelete, onToggle }) {
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  function openNewForm() {
    setEditingItem(null)
    setShowForm(true)
  }

  function openEditForm(item) {
    setEditingItem(item)
    setShowForm(true)
  }

  function closeForm() {
    setEditingItem(null)
    setShowForm(false)
  }

  function handleSave(item) {
    if (editingItem) {
      onUpdate(item)
    } else {
      onAdd(item)
    }
    closeForm()
  }

  function handleDelete(item) {
    if (window.confirm(`Delete ${item.name} from the menu?`)) {
      onDelete(item.id)
    }
  }

  return (
    <div className="card">
      <div className="card-top">
        <h3>Menu Items</h3>
        {!showForm && <button onClick={openNewForm}>+ Add Item</button>}
      </div>

      {/* The key makes the form restart when I pick another item */}
      {showForm && (
        <MenuForm
          key={editingItem ? editingItem.id : 'new'}
          item={editingItem}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    className={item.available ? 'small-btn green' : 'small-btn gray'}
                    onClick={() => onToggle(item.id)}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="actions">
                  <button className="small-btn" onClick={() => openEditForm(item)}>Edit</button>
                  <button className="small-btn remove" onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MenuManager
