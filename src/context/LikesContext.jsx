import { createContext, useState, useEffect } from "react";

export const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState(() => {
    try {
      const stored = localStorage.getItem('likes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (productId) => {
    setLikes(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};
