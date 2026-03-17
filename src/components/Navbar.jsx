import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">epicstore</span>
        </Link>
      </div>

      {/* Search Bar */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search EpicStore"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>

      {/* Navigation Links */}
      <nav className="nav-links">
        <div className="nav-link">
          <span className="nav-line-1">Hello, {user?.email?.split('@')[0] || 'sign in'}</span>
          <span className="nav-line-2">Account & Lists</span>
        </div>

        <div className="nav-link">
          <span className="nav-line-1">Returns</span>
          <span className="nav-line-2">& Orders</span>
        </div>

        <Link to="/cart" className="nav-cart">
          <div className="cart-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H19L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
          <span className="nav-line-2">Cart</span>
        </Link>
      </nav>
    </header>
  );
}