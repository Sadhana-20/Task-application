
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';

import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading, error]);

  const product = items.find(
    (item) => item.id === Number(id)
  );

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  if (loading) {
    return <h2 className="message">Loading product...</h2>;
  }

  if (error) {
    return (
      <div className="message">
        <h2>{error}</h2>

        <button onClick={() => dispatch(fetchProducts())}>
          Try Again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="message">
        <h2>Product not found</h2>

        <button onClick={() => navigate('/')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Products
      </button>

      <div className="details-card">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="details-rating">
            ⭐ {product.rating?.rate ?? 'No rating'}
            {product.rating
              ? ` (${product.rating.count} reviews)`
              : ''}
          </p>

          <p className="details-price">
            ${product.price.toFixed(2)}
          </p>

          <h3>Description</h3>

          <p className="details-description">
            {product.description}
          </p>

          <div className="quantity-control">
            <span>Quantity:</span>

            <button
              onClick={() =>
                setQuantity((previous) =>
                  Math.max(1, previous - 1)
                )
              }
              disabled={quantity === 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity((previous) => previous + 1)
              }
            >
              +
            </button>
          </div>

          <button
            className="details-add-button"
            onClick={handleAddToCart}
          >
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
