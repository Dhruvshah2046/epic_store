import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Tags, Gift, Users, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex text-slate-200 bg-slate-950 overflow-hidden relative">
      {/* Left Decoration Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900/10 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 max-w-lg">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl backdrop-blur-md">
            <ShoppingBag size={40} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Join Nexus-Shop Today</h1>
          <p className="text-xl text-slate-400 mb-12">Create your account and start exploring amazing products.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Tags size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">Exclusive Deals & Offers</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Gift size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">Welcome Gifts & Rewards</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <Users size={24} className="text-indigo-400" />
              </div>
              <span className="text-lg font-medium text-slate-300">Vibrant Shopping Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Register Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md glass-card p-8 sm:p-10">
          <div className="text-center mb-8 pr-1 lg:hidden">
            <ShoppingBag size={40} className="text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Nexus-Shop</h2>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 mb-8">Join thousands of happy customers shopping with us</p>

          <form onSubmit={handleRegister} className="space-y-6">
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
                  placeholder="Create a strong password"
                  className="w-full glass-input py-3 pl-10 pr-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Password must be at least 6 characters long</p>
            </div>

            <button type="submit" disabled={loading} className="w-full glass-btn py-3 mt-4 text-lg">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus size={20} />
                  Sign Up
                  <ArrowRight size={20} className="ml-1" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}