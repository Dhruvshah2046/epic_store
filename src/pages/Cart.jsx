import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div>
      <Navbar />

      <div className="cart-container">
        <header className="cart-header-section">
          <h1 className="cart-header">Shopping Cart</h1>
          <span className="item-count-badge">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </header>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Your EpicStore Cart is empty</h2>
            <p>Shop today's deals</p>
            <button className="return-btn" onClick={() => navigate("/products")}>
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items-section">
              {cart.map((item, i) => (
                <div className="cart-item-row" key={item.id || i}>
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price-each">₹{item.price.toLocaleString('en-IN')} each</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(i, (item.quantity || 1) - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(i, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-price-action">
                    <span className="item-total-price">
                      ₹{((item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                    <button
                      className="remove-item-link"
                      onClick={() => removeFromCart(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="order-summary">
              <h2 className="summary-title">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <span className="summary-total">₹{total.toLocaleString('en-IN')}</span></h2>

              <button className="checkout-btn">
                Proceed to checkout
              </button>

              <p className="secure-text">🔒 Secure transaction</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}