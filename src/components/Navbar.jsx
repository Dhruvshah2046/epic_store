import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/";
  const navClass = isDashboard ? "glass-nav-hero" : "glass-nav";

  const cartItemCount = cart ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`${navClass} py-4 px-6 sm:px-10`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0 group">
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight group-hover:from-indigo-300 group-hover:to-cyan-300 transition-all">
            epicstore
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden md:flex items-center">
          <input
            type="text"
            className="w-full glass-input py-2.5 pl-4 pr-12 text-sm"
            placeholder="Search for amazing products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-2 p-1.5 text-slate-400 hover:text-indigo-400 transition-colors">
            <Search size={20} />
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <Link to="/profile" className="hidden sm:flex flex-col hover:text-indigo-400 transition-colors cursor-pointer group">
              <span className="text-slate-400 text-xs text-right">Hello, {user.email?.split('@')[0]}</span>
              <span className="font-semibold text-slate-200 group-hover:text-indigo-300">Account & Profile</span>
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:flex flex-col hover:text-indigo-400 transition-colors cursor-pointer group">
              <span className="text-slate-400 text-xs text-right">Hello, sign in</span>
              <span className="font-semibold text-slate-200 group-hover:text-indigo-300">Login / Register</span>
            </Link>
          )}

          <Link to="/cart" className="relative flex items-center gap-2 hover:text-indigo-400 transition-colors group">
            <div className="relative">
              <ShoppingCart size={28} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </div>
            <span className="font-semibold text-slate-200 hidden lg:block group-hover:text-indigo-300 mt-1">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}