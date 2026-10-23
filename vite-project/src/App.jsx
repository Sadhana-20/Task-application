
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shopkart-theme') || 'light';
  });

  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('shopkart-theme', newTheme);
  };

  return (
    <BrowserRouter>
      <div className={`app theme-${theme}`}>
        <Navbar
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <Routes>
          <Route path="/" element={<Products />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />
            }
          />

          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          <Route
            path="/signup"
            element={<Signup onSignup={handleLogin} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
