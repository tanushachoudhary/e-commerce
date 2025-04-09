// src/pages/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty-message">
          <p className="cart-empty-text">Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {orderPlaced && (
        <div className="order-success-message">
          Order placed successfully!
        </div>
      )}

      <div className="products-list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => removeFromCart(item.id)}
            onQuantityChange={(newQuantity) =>
              updateQuantity(item.id, newQuantity)
            }
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <h3 className="summary-total-label">Total:</h3>
          <span className="summary-total-value">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          className="checkout-btn"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;