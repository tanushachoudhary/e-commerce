// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { cartItems } = useCart();
  const { logout } = useAuth();

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
};

export default Header;