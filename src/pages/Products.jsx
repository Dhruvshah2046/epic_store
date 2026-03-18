import { useContext, useMemo, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { LikesContext } from "../context/LikesContext";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart } from "lucide-react";

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const { likes, toggleLike } = useContext(LikesContext);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=194');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        // DummyJSON returns { products: [ { id, title, price, category, description, images, rating } ] }
        const allowedCategories = ['smartphones', 'laptops', 'mobile-accessories', 'mens-watches', 'mens-shirts', 'mens-shoes', 'sunglasses', 'sports-accessories', 'tablets'];
        const formattedData = data.products
          .filter(item => allowedCategories.includes(item.category))
          .map(item => ({
            ...item,
            name: item.title,
            price: item.price * 83, // convert to INR for consistency
            rating: item.rating ? item.rating : 0,
            reviews: item.reviews ? item.reviews.length : Math.floor(Math.random() * 500) + 10,
            image: item.images && item.images.length > 0 ? item.images[0] : item.thumbnail
          }));
        setProducts(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    if (searchQuery) {
      return products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
      );
    }
    return products;
  }, [searchParams]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆");
    }
    while (stars.length < 5) {
      stars.push("☆");
    }

    return stars.join("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'All Products'}
          </h1>
          <p className="text-slate-400 text-lg">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-4 h-[420px] rounded-2xl animate-pulse">
                <div className="w-full h-56 bg-slate-800/50 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-800/50 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-800/50 rounded w-1/2 mb-6"></div>
                <div className="h-8 bg-slate-800/50 rounded w-1/3 mb-4 mt-auto"></div>
                <div className="h-12 bg-slate-800/50 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass p-8 text-center rounded-2xl border-red-500/30 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Error loading products</h3>
            <p className="text-slate-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
              <div className="glass-card group flex flex-col" key={product.id}>
                <div className="relative h-60 bg-white/5 overflow-hidden rounded-t-2xl p-6 flex items-center justify-center backdrop-blur-sm">
                  <span className="absolute top-4 left-4 bg-indigo-600/90 border border-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-md z-10 shadow-lg capitalize">
                    {product.category.replace('-', ' ')}
                  </span>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(product.id); }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-slate-800/60 hover:scale-110"
                  >
                    <Heart size={20} className={`${likes.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy" 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="text-indigo-400 tracking-wider font-sans">{renderStars(product.rating)}</span>
                    <span className="text-slate-300 font-medium">{product.rating}</span>
                    <span className="text-slate-500">({product.reviews.toLocaleString()})</span>
                  </div>

                    <div className="mt-auto space-y-3">
                      <p className="text-2xl font-bold text-indigo-300 mb-2">₹{product.price.toLocaleString('en-IN')}</p>
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full glass-btn-secondary py-2 block text-center"
                      >
                        View Details
                      </Link>
                      <button
                        className="w-full glass-btn py-3"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                </div>
              </div>
            ))
            ) : (
              <div className="col-span-full glass p-12 text-center rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-3">No products found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search terms or browse all products.</p>
                <Link to="/products" className="glass-btn inline-flex px-8 py-3 mx-auto">Browse All Products</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}