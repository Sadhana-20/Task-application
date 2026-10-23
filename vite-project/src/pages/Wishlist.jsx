import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { removeFromWishlist } from '../redux/wishlistSlice';
import './Products.css';
import './Auth.css';

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="products-page">
      <h1>My Wishlist ♥</h1>
      <p className="subtitle">
        Your favourite products, all in one place.
      </p>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <h2>Your wishlist is empty</h2>
          <p>
            Browse products and tap the heart to save your favourites.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlistItems.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />

              <div className="product-info">
                <h3>{product.title}</h3>

                <p className="price">
                  ${product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="remove-wishlist-button"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
