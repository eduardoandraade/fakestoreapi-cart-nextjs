import Image from "next/image";
import { useCart } from "../context/CartContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";


interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { cart, addToCart, removeFromCart} = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;


  return (
    <div className="relative bg-transparent rounded-lg p-2 overflow-hidden hover:shadow-sm transition-shadow">
      {/* Imagem do Produto */}
      <div className={`relative w-full h-60 md:h-56 lg:h-64 ${quantity > 0 ? "border-2 rounded-lg border-orange-600" : "border border-transparent"}`}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="rounded-lg"
        />
      </div>
      {/* Botão de Adicionar/Remover ao Carrinho*/}
      { quantity === 0 ? (
        <button 
        onClick={() => addToCart(product)}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-6 py-2 rounded-full border border-orange-500 flex items-center gap-2 shadow-md hover:text-orange-600 transition whitespace-nowrap min-w-[140px]">
          <Image
            src="icon-add-to-cart.svg"
            width={24}
            height={24}
            alt="Icon add cart"
          />
        Adicionar
      </button>
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-4 shadow-md min-w-[140px]">
        <button onClick={() => removeFromCart(product.id)} className="flex items-center justify-center">
          <MinusIcon className="w-5 h-5 text-white" />
        </button>
        <span className="font-semibold text-center w-6">{quantity}</span>
        <button onClick={() => addToCart(product)} className="flex items-center justify-center  ">
          <PlusIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      )}
      
      {/* Informações do Produto */}
      <div className="pt-8 text-left">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-orange-500 font-bold">R${product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}
