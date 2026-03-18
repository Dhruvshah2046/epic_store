import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Truck, Lock, Star, Mail, LogIn, ArrowRight } from "lucide-react";

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
      localStorage.setItem('loginTime', Date.now());
      navigate("/");
    } catch {
      setError("There was a problem. Your email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-200 bg-slate-950 overflow-hidden relative">
      {/* Left Decoration Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900/10 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 max-w-lg">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl backdrop-blur-md">
            <ShoppingBag size={40} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Welcome to Nexus-Shop</h1>
          <p className="text-xl text-slate-400 mb-12">Discover extraordinary products with unbeatable quality and prices.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Truck size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">Free Shipping on all orders</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Lock size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Star size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">Top-Tier Quality Assurance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md glass-card p-8 sm:p-10">
          <div className="text-center mb-8 pr-1 lg:hidden">
            <ShoppingBag size={40} className="text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Nexus-Shop</h2>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sign back in</h2>
          <p className="text-slate-400 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium flex items-start gap-3">
                <span className="shrink-0 font-bold text-lg leading-none">!</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full glass-input py-3 pl-10 pr-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full glass-input py-3 pl-10 pr-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full glass-btn py-3 mt-4 text-lg">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn size={20} />
                  Sign In
                  <ArrowRight size={20} className="ml-1" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400">
              New to Nexus-Shop?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline">
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}