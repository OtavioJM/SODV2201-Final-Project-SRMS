// One dish on the menu page
function MenuItemCard({ item, onAdd }) {
  return (
    <div className={item.available ? 'menu-item' : 'menu-item unavailable'}>
      <div className="menu-item-top">
        <h4>{item.name}</h4>
        <span className="price">${item.price.toFixed(2)}</span>
      </div>

      <p>{item.description}</p>
      <p className="small">
        <strong>Ingredients:</strong> {item.ingredients.join(', ')}
      </p>

      <div className="tags">
        {item.dietary.map((diet) => (
          <span key={diet} className="tag">{diet}</span>
        ))}
      </div>

      {item.available ? (
        <button onClick={() => onAdd(item)}>Add to Cart</button>
      ) : (
        <p className="sold-out">Not available right now</p>
      )}
    </div>
  )
}

export default MenuItemCard
