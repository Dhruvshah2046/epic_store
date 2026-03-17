import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch {
      setError("There was a problem. Please try again.");
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
              <CelebrationOutlinedIcon fontSize="large" />
            </div>
            <h1>Join EpicStore Today</h1>
            <p>Create your account and start exploring amazing products</p>
            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">
                  <LocalOfferOutlinedIcon />
                </span>
                <span>Exclusive Deals</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <CardGiftcardOutlinedIcon />
                </span>
                <span>Welcome Offers</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <PeopleOutlineOutlinedIcon />
                </span>
                <span>Community Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Create your EpicStore account</h2>
              <p>Join thousands of happy customers shopping with us</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <small className="password-hint">Password must be at least 6 characters long</small>
              </div>

              <button type="submit" disabled={loading} className="auth-submit-btn">
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  'Create your EpicStore account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}