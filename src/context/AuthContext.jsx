import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    const interval = setInterval(() => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        if (Date.now() - parseInt(loginTime) > 5 * 60 * 1000) {
          signOut(auth);
          localStorage.removeItem('loginTime');
        }
      }
    }, 10000); // Check every 10 seconds

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};