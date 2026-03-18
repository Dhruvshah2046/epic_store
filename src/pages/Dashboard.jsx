import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  ShoppingCart, 
  User, 
  Smartphone, 
  Shirt, 
  Home, 
  Trophy, 
  ArrowRight,
  TrendingUp,
  Award,
  Star
} from "lucide-react";
import Navbar from "../components/Navbar";

// Data Constants
const featuredProducts = [
  { id: 1, name: "Nike Air Max 270", price: 9960, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop", badge: "Trending", icon: <TrendingUp size={16} /> },
  { id: 2, name: "Sony WH-1000XM4", price: 16317, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop", badge: "Best Seller", icon: <Award size={16} /> },
  { id: 3, name: "Seiko Chronograph", price: 20750, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", badge: "Premium", icon: <Star size={16} /> }
];

const categories = [
  { name: "Electronics", icon: <Smartphone />, count: "2.1K+" },
  { name: "Fashion", icon: <Shirt />, count: "5.8K+" },
  { name: "Home & Garden", icon: <Home />, count: "1.9K+" },
  { name: "Sports", icon: <Trophy />, count: "3.2K+" }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Elevate Your Lifestyle with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Nexus-Shop</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Experience the pinnacle of online shopping with curated collections and precision-engineered service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products" className="glass-btn px-8 py-4 text-lg w-full sm:w-auto">
                Start Shopping <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/products" className="glass-btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                View Collections
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Editor's Choice</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                className="glass-card group flex flex-col overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 bg-white/5 p-8 flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg border border-white/10 z-10">
                    {product.icon}
                    <span>{product.badge}</span>
                  </div>
                  <img src={product.image} alt={product.name} loading="lazy" className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-indigo-400 mb-6 mt-auto">₹{product.price.toLocaleString('en-IN')}</p>
                  <Link to={`/product/${product.id}`} className="flex items-center text-indigo-300 hover:text-indigo-200 font-medium transition-colors">
                    Explore Now <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActionCard 
              to="/products" 
              icon={<ShoppingBag size={32} className="text-indigo-400" />} 
              title="Premium Store" 
              desc="Hand-picked selections from global designers." 
            />
            <ActionCard 
              to="/cart" 
              icon={<ShoppingCart size={32} className="text-indigo-400" />} 
              title="Secure Checkout" 
              desc="Your data is protected with military-grade encryption." 
            />
            <ActionCard 
              to="/profile" 
              icon={<User size={32} className="text-indigo-400" />} 
              title="Elite Membership" 
              desc="Exclusive rewards and priority shipping." 
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component for repetitive cards
function ActionCard({ to, icon, title, desc }) {
  return (
    <Link to={to} className="glass p-8 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </Link>
  );
}