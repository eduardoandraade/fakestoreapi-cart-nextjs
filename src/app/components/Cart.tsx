import { useState } from "react";
import { useCart } from "../context/CartContext";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import OrderConfirmationModal from "./OrderConfirmationModal";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[320px] border border-gray-200">
      <h2 className="text-xl font-bold text-orange-500">
        Seu Carrinho ({cart.length})
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-4">
          <Image
            src="illustration-empty-cart.svg"
            width={250}
            height={250}
            alt="Carrinho Vazio"
            className="h-32 opacity-50"
          />
          <p className="mt-2 text-xs text-center">
            Seus itens adicionados aparecerão aqui
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{item.title}</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-orange-500 font-bold">{item.quantity}x</span>
                  <span className="text-sm text-gray-500">R${item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  <span className="text-sm text-gray-700 font-semibold">= R${(item.price * (item.quantity || 1)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Order Total */}
      {cart.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Valor Total:</p>
            <p className="text-xl font-bold text-gray-900">
              R$
              {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Carbon Neutral Delivery */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg flex items-center gap-2 text-sm">
            <span className="text-green-600">🌿</span>
            <p>
              Essa é uma entrega <span className="font-bold">carbono neutro</span>.
            </p>
          </div>

          {/* Confirm Order Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 transition">
              Confirmar Pedido
          </button>
        </>
      )}

      <OrderConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
