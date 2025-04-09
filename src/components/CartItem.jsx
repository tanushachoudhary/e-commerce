// src/components/CartItem.jsx
import { useCart } from "../context/CartContext";
import "../styles/CartItem.css";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-container">
        <div className="cart-item-image">
          <img src={item.image} alt={item.title} />
        </div>
        
        <div className="cart-item-details">
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-price">${item.price}</p>
          
          <div className="quantity-controls">
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              className="quantity-btn"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="quantity-btn"
            >
              +
            </button>
            <button
              onClick={onRemove}
              className="remove-btn"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="remove-icon" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;