import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      setError("There was a problem. Your email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-welcome">
            <div className="welcome-icon">
              <ShoppingBagOutlinedIcon fontSize="large" />
            </div>
            <h1>Welcome to EpicStore</h1>
            <p>Discover extraordinary products with unbeatable quality and prices</p>
            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">
                  <LocalShippingOutlinedIcon />
                </span>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <LockOutlinedIcon />
                </span>
                <span>Secure Payments</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <StarOutlineOutlinedIcon />
                </span>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Sign in to EpicStore</h2>
              <p>Enter your email and password to continue shopping</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              {error && <div className="auth-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <EmailOutlinedIcon />
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <LockOutlinedIcon />
                  </span>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="auth-submit-btn">
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>New to EpicStore? <Link to="/register" className="auth-link">Create your account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}