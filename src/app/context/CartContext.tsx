"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Carregar carrinho do LocalStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Salvar carrinho no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remover UMA unidade do produto, e remove totalmente se a quantidade chegar a 0
  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((p) => (p.id === id ? { ...p, quantity: (p.quantity || 1) - 1 } : p))
        .filter((p) => p.quantity && p.quantity > 0); // Remove itens com quantidade 0
    });
  };

  // Limpar todo o carrinho
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para acessar o carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
