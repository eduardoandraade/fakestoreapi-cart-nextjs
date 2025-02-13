import Image from "next/image";

export default function Cart() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[320px]">
        <h2 className="text-xl font-bold text-orange-500">Seu Carrinho (0)</h2>
        <div className="flex flex-col items-center justify-center text-gray-500 mt-4">
            <Image
            src="illustration-empty-cart.svg"
            width={250}
            height={250}
            alt="Carrinho Vazio"
            className="h-32 opacity-50"
            />
          <p className="mt-2 text-xs text-center">Seus itens adicionados aparecerão aqui</p>
        </div>
      </div>
    );
  }
