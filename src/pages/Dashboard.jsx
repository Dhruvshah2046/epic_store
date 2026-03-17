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
    <div className="dashboard-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-text">
            <h1 className="hero-title">
              Elevate Your Lifestyle with <span className="hero-highlight">EpicStore</span>
            </h1>
            <p className="hero-subtitle">
              Experience the pinnacle of online shopping with curated collections and precision-engineered service.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary hero-cta">
                Start Shopping <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/products" className="btn btn-outline hero-secondary">
                View Collections
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Editor's Choice</h2>
          <motion.div 
            className="featured-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                className="featured-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="product-badge">
                  {product.icon}
                  <span>{product.badge}</span>
                </div>
                <div className="image-container">
                  <img src={product.image} alt={product.name} loading="lazy" className="featured-image" />
                </div>
                <div className="featured-content">
                  <h3>{product.name}</h3>
                  <p className="featured-price">₹{product.price.toLocaleString('en-IN')}</p>
                  <Link to={`/product/${product.id}`} className="btn-link">
                    Explore Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <div className="container">
          <div className="actions-grid">
            <ActionCard 
              to="/products" 
              icon={<ShoppingBag size={32} />} 
              title="Premium Store" 
              desc="Hand-picked selections from global designers." 
            />
            <ActionCard 
              to="/cart" 
              icon={<ShoppingCart size={32} />} 
              title="Secure Checkout" 
              desc="Your data is protected with military-grade encryption." 
            />
            <ActionCard 
              to="/profile" 
              icon={<User size={32} />} 
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
    <Link to={to} className="action-card">
      <div className="action-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}