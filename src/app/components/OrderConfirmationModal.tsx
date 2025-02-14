  import { useCart } from "../context/CartContext";
  import { Dialog } from "@headlessui/react";
  import { CheckCircleIcon } from "@heroicons/react/24/solid";
  import Image from "next/image";

  interface OrderConfirmationModalProps {
      isOpen: boolean;
      onClose: () => void;
    }
    
    export default function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
      const { cart, clearCart } = useCart();
    
      return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-end md:items-center justify-center z-50">
          {/* Fundo escuro */}
          <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
    
          {/* Modal Responsivo */}
          <div className="bg-white w-full md:max-w-md md:rounded-lg shadow-lg relative 
                          md:mt-0 mt-auto p-6 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[80vh]">
            
            {/* Ícone de Confirmação */}
            <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-center mt-2">Pedido Confirmado</h2>
            <p className="text-gray-600 text-center">Aproveite a suas compras</p>
    
            {/* Lista de Produtos (Agora é rolável se houver muitos produtos) */}
            <div className="mt-4 bg-gray-100 p-4 rounded-lg flex-1 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center gap-3">
                    <Image src={item.image} alt={item.title} width={400} height={400} className="w-16 h-16 rounded-md object-contain border border-gray-200" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.quantity}x R${item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold">R${(item.price * (item.quantity || 1)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
              ))}
    
              {/* Total do Pedido */}
              <div className="flex justify-between items-center font-bold text-lg mt-4">
                <span>Valor Total:</span>
                <span>
                  R$
                  {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
    
            {/* Botão para Novo Pedido*/}
            <div className="mt-4">
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 transition"
              >
                Novo Pedido
              </button>
            </div>
          </div>
        </Dialog>
      );
    }