"use client"; // Garantindo que o hook useState/useEffect funcione corretamente

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  }, []);

  return (
    <div className="bg-[#F8F6F2] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>Carregando produtos...</p>
          )}
        </div>

        {/* Carrinho */}
        <div className="w-full md:w-1/3">
          <Cart />
        </div>
      </div>
    </div>
  );
}
