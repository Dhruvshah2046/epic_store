import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { LikesContext } from "../context/LikesContext";
import Navbar from "../components/Navbar";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Heart } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { likes, toggleLike } = useContext(LikesContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        
        const formattedData = {
          ...data,
          name: data.title,
          price: data.price * 83, // INR conversion
          rating: data.rating ? data.rating : 0,
          reviews: data.reviews ? data.reviews.length : Math.floor(Math.random() * 500) + 10,
          image: data.images && data.images.length > 0 ? data.images[0] : data.thumbnail,
          images: data.images || []
        };
        
        setProduct(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (hasHalfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");

    return stars.join("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="glass p-12 rounded-2xl max-w-2xl mx-auto border-red-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Oops! {error}</h2>
            <button onClick={() => navigate('/products')} className="glass-btn px-8 py-3 mx-auto">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        {/* Breadcrumb / Back Navigation */}
        <Link to="/products" className="inline-flex items-center text-slate-400 hover:text-indigo-400 font-medium mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to all products
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="lg:w-1/2 space-y-4">
            <div className="glass-card aspect-square flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <span className="absolute top-4 left-4 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-md z-10 shadow-lg">
                {product.category}
              </span>
              <img 
                src={product.images[activeImage] || product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 shrink-0 rounded-xl glass p-2 transition-all ${activeImage === idx ? 'border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] bg-white/10' : 'border-white/5 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pr-4">
                {product.name}
              </h1>
              <button 
                onClick={() => toggleLike(product.id)}
                className="shrink-0 w-12 h-12 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-slate-800/60 hover:scale-110"
              >
                <Heart size={24} className={`${likes.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-slate-900 border border-white/10 px-3 py-1 rounded-full">
                <span className="text-indigo-400 font-sans tracking-widest">{renderStars(product.rating)}</span>
                <span className="text-white font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-400 text-sm">{product.reviews.toLocaleString()} verified reviews</span>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-slate-500 ml-3 line-through">₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="glass p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Truck size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Free Delivery</div>
                  <div className="text-xs text-slate-400">Within 3-5 days</div>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">1 Year Warranty</div>
                  <div className="text-xs text-slate-400">100% Authentic</div>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">30-Day Returns</div>
                  <div className="text-xs text-slate-400">No questions asked</div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 glass-btn py-4 text-lg font-bold shadow-indigo-500/20"
                onClick={() => {
                  addToCart(product);
                  navigate('/cart');
                }}
              >
                Buy It Now
              </button>
              <button 
                className="flex-1 glass-btn-secondary py-4 text-lg font-bold flex items-center justify-center gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
