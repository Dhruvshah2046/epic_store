import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 9960, // 120 * 83
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviews: 2847
  },
  {
    id: 2,
    name: "Seiko Chronograph Watch",
    price: 20750, // 250 * 83
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 1256
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Headphones",
    price: 16317, // 199 * 83
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 5234
  },
  {
    id: 4,
    name: "Patagonia Black Hole Backpack",
    price: 7055, // 85 * 83
    category: "Travel",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 1892
  },
  {
    id: 5,
    name: "Bellroy Leather Wallet",
    price: 3735, // 45 * 83
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    reviews: 756
  },
  {
    id: 6,
    name: "Amazon Echo Dot (4th Gen)",
    price: 10790, // 130 * 83
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    reviews: 8945
  },
  {
    id: 7,
    name: "Timberland 6-Inch Boot",
    price: 14940, // 180 * 83
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f687b76?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviews: 1234
  },
  {
    id: 8,
    name: "Breville Coffee Maker",
    price: 4980, // 60 * 83
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1544194215-541c2d3561a4?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    reviews: 2156
  }
];

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();

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
    <div>
      <Navbar />

      <div className="products-page">
        <header className="products-header">
          <h1 className="products-title">
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'All Products'}
          </h1>
          <p className="products-subtitle">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </header>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <span className="category-tag">{product.category}</span>
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>

              <div className="product-details">
                <h3>{product.name}</h3>

                <div className="product-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="rating-text">{product.rating}</span>
                  <span className="reviews-count">({product.reviews.toLocaleString()})</span>
                </div>

                <p className="price-text">₹{product.price.toLocaleString('en-IN')}</p>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search terms or browse all products.</p>
              <Link to="/products" className="btn btn-primary">Browse All Products</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}