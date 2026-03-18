import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LikesProvider } from "./context/LikesContext";
import "./index.css";   // ✅ ADD THIS LINE

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LikesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LikesProvider>
    </AuthProvider>
  </React.StrictMode>
);