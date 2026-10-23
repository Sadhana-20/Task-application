import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="cart-icon">🛒</div>

        <h1>Your cart is empty</h1>

        <p>
          Looks like you haven't added anything to your cart yet.
        </p>

        <button onClick={() => navigate('/')}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div>
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
