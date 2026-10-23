import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import {
  addToWishlist,
  removeFromWishlist
} from '../redux/wishlistSlice';

import './Products.css';

const Products = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading, error]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlist = (product) => {
    const alreadySaved = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (alreadySaved) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Search and category filtering
  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts];

  if (sort === 'low-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'high-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    sortedProducts.sort(
      (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
    );
  }

  if (loading) {
    return <h2 className="message">Loading products...</h2>;
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

  return (
    <div className="products-page">
      <h1>ShopKart Products</h1>
      <p className="subtitle">Find your everyday favourites</p>

      {/* Search and sorting */}
      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      {/* Category filter buttons */}
      <div className="category-buttons">
        <button
          className={category === 'All' ? 'active' : ''}
          onClick={() => setCategory('All')}
        >
          All
        </button>

        <button
          className={category === 'electronics' ? 'active' : ''}
          onClick={() => setCategory('electronics')}
        >
          Electronics
        </button>

        <button
          className={category === 'jewelery' ? 'active' : ''}
          onClick={() => setCategory('jewelery')}
        >
          Jewellery
        </button>

        <button
          className={category === "men's clothing" ? 'active' : ''}
          onClick={() => setCategory("men's clothing")}
        >
          Men's Clothing
        </button>

        <button
          className={category === "women's clothing" ? 'active' : ''}
          onClick={() => setCategory("women's clothing")}
        >
          Women's Clothing
        </button>
      </div>

      <p className="results-count">
        Showing {sortedProducts.length} products
      </p>

      {sortedProducts.length === 0 ? (
        <div className="wishlist-empty">
          <h2>No products found</h2>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => {
            const cartProduct = cartItems.find(
              (item) => item.id === product.id
            );

            const isWishlisted = wishlistItems.some(
              (item) => item.id === product.id
            );

            return (
              <div className="product-card" key={product.id}>
                <button
                  className="wishlist-heart"
                  onClick={() => handleWishlist(product)}
                  aria-label={
                    isWishlisted
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  {isWishlisted ? '♥' : '♡'}
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="product-image-link"
                >
                  <img src={product.image} alt={product.title} />
                </Link>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p className="rating">
                    ⭐ {product.rating?.rate ?? 'No rating'}
                  </p>

                  <p className="price">
                    ${product.price.toFixed(2)}
                  </p>

                  {cartProduct && (
                    <p className="quantity">
                      In cart: {cartProduct.quantity}
                    </p>
                  )}

                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
