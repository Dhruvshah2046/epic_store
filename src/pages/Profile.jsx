import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div>
      <Navbar />

      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-section">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.email?.split('@')[0] || 'User'}&background=6366f1&color=ffffff&size=120`}
                alt="Profile Avatar"
                className="profile-avatar"
              />
              <div className="profile-info">
                <h1>{user?.email?.split('@')[0] || 'User'}</h1>
                <p>{user?.email}</p>
                <span className="member-since">EpicStore Member</span>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-info">
                <span className="stat-number">{cartItemCount}</span>
                <span className="stat-label">Items in Cart</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <span className="stat-number">12</span>
                <span className="stat-label">Orders Placed</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/products" className="profile-action-card">
              <div className="action-icon">🛍️</div>
              <div className="action-content">
                <h3>Continue Shopping</h3>
                <p>Browse our amazing collection</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/cart" className="profile-action-card">
              <div className="action-icon">🛒</div>
              <div className="action-content">
                <h3>View Cart</h3>
                <p>{cartItemCount} items waiting</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <div className="profile-action-card">
              <div className="action-icon">📋</div>
              <div className="action-content">
                <h3>Order History</h3>
                <p>View your past orders</p>
              </div>
              <span className="action-arrow">→</span>
            </div>

            <div className="profile-action-card">
              <div className="action-icon">❤️</div>
              <div className="action-content">
                <h3>Wishlist</h3>
                <p>Your saved items</p>
              </div>
              <span className="action-arrow">→</span>
            </div>
          </div>

          <div className="profile-settings">
            <h2>Account Settings</h2>
            <div className="settings-grid">
              <div className="setting-item">
                <span className="setting-icon">📧</span>
                <div className="setting-info">
                  <h4>Email Address</h4>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="setting-icon">🔒</span>
                <div className="setting-info">
                  <h4>Password</h4>
                  <p>Change your password</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="setting-icon">📍</span>
                <div className="setting-info">
                  <h4>Addresses</h4>
                  <p>Manage delivery addresses</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="setting-icon">💳</span>
                <div className="setting-info">
                  <h4>Payment Methods</h4>
                  <p>Manage payment options</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-logout">
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon">🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}