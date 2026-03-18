import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { User, LogOut, ShoppingCart, Star, Box, Package, Heart, Clock, Settings, MapPin, CreditCard, Mail, ChevronRight } from "lucide-react";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const cartItemCount = cart ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  const username = user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <p className="text-slate-400">Manage your profile, orders, and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Settings */}
          <div className="space-y-8">
            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600/40 to-cyan-600/40"></div>
              
              <div className="relative z-10">
                <div className="w-28 h-28 mx-auto bg-slate-800 rounded-full border-4 border-slate-900 shadow-xl mb-4 overflow-hidden mt-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${username}&background=6366f1&color=ffffff&size=120&font-size=0.4`}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1">{username}</h2>
                <p className="text-slate-400 mb-4">{user?.email}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold tracking-wide">
                  <Star size={14} className="fill-indigo-400" />
                  Nexus-Shop Member
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings size={20} className="text-indigo-400" />
                Account Settings
              </h3>
              
              <div className="space-y-2">
                <SettingsItem icon={<Mail />} title="Email Address" value={user?.email} />
                <SettingsItem icon={<Lock />} title="Password" value="••••••••" />
                <SettingsItem icon={<MapPin />} title="Addresses" value="Manage delivery" />
                <SettingsItem icon={<CreditCard />} title="Payment Methods" value="Manage options" />
              </div>
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full glass-btn-secondary py-3 text-red-400 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-300 flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut size={20} />
              Sign Out Securely
            </button>
          </div>

          {/* Right Column: Stats & Actions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon={<ShoppingCart />} value={cartItemCount} label="Items in Cart" color="from-emerald-500/20 to-emerald-600/5 text-emerald-400" />
              <StatCard icon={<Star />} value="4.8" label="Average Rating" color="from-amber-500/20 to-amber-600/5 text-amber-400" />
              <StatCard icon={<Package />} value="12" label="Orders Placed" color="from-indigo-500/20 to-indigo-600/5 text-indigo-400" />
            </div>

            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                <ActionLink to="/products" icon={<Box />} title="Continue Shopping" desc="Browse our amazing collection" />
                <ActionLink to="/cart" icon={<ShoppingCart />} title="View Cart" desc={`${cartItemCount} items waiting for you`} />
                <ActionLink to="#" icon={<Clock />} title="Order History" desc="View your past orders and invoices" className="border-t border-white/5" />
                <ActionLink to="#" icon={<Heart />} title="Saved Items" desc="Products you're keeping an eye on" className="border-t border-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-white/5 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-400 font-medium">{label}</div>
      </div>
    </div>
  );
}

function ActionLink({ to, icon, title, desc, className = "" }) {
  return (
    <Link to={to} className={`p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors group ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-white/5">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold text-white mb-1 flex items-center justify-between">
          {title}
          <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
        </h4>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </Link>
  );
}

function SettingsItem({ icon, title, value }) {
  return (
    <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 text-left group transition-colors">
      <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors border border-white/5">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{title}</div>
        <div className="text-xs text-slate-500">{value}</div>
      </div>
      <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
    </button>
  );
}