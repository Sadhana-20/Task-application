import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ user, onLogout, theme, onToggleTheme }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          ShopKart
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          <Link to="/wishlist" className="nav-link">
            Wishlist ({wishlistItems.length})
          </Link>

          <Link to="/cart" className="nav-link cart-link">
            Cart
            <span className="cart-badge">{totalItems}</span>
          </Link>

          <Link to="/profile" className="nav-link">Profile</Link>

          <button
            className="theme-button"
            onClick={onToggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          {user ? (
            <button
              className="nav-auth-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-auth-button">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
