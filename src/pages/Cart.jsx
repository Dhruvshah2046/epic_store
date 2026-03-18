import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingCart size={32} className="text-indigo-400" />
            Your Cart
          </h1>
          <span className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full font-semibold text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </header>

        {cart.length === 0 ? (
          <div className="glass p-12 text-center rounded-2xl max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner">
              <ShoppingCart size={40} className="text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our amazing products!</p>
            <button className="glass-btn px-8 py-3 mx-auto" onClick={() => navigate("/products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full space-y-4">
              {cart.map((item, i) => (
                <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 group" key={item.id || i}>
                  <div className="w-full sm:w-32 h-32 bg-white/5 rounded-xl p-2 flex items-center justify-center flex-shrink-0 backdrop-blur-sm relative overflow-hidden">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-lg" />
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-indigo-400 font-medium mb-4">₹{item.price.toLocaleString('en-IN')} <span className="text-slate-500 text-sm">each</span></p>

                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <div className="flex items-center bg-slate-900 border border-white/10 rounded-lg p-1">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors disabled:opacity-50"
                          onClick={() => updateQuantity(i, (item.quantity || 1) - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-semibold text-white">
                          {item.quantity || 1}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                          onClick={() => updateQuantity(i, (item.quantity || 1) + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors ml-auto sm:ml-4 flex items-center gap-1 text-sm font-medium"
                        onClick={() => removeFromCart(i)}
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto text-center sm:text-right border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total</p>
                    <span className="text-xl font-bold text-white block">
                      ₹{((item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <aside className="w-full lg:w-96 glass p-6 rounded-2xl sticky top-24 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="text-white font-medium">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping estimate</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax estimate</span>
                  <span className="text-white font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-semibold text-white">Order Total</span>
                  <span className="text-2xl font-bold text-indigo-400">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="w-full glass-btn py-3 text-lg mb-4">
                Checkout Now
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6 bg-slate-900/50 py-2 rounded-lg border border-white/5">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Secure encrypted transaction</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}