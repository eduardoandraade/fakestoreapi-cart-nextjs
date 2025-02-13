import Image from "next/image";


interface ProductProps {
    product: {
      id: number;
      title: string;
      price: number;
      image: string;
    };
  }
  
  export default function ProductCard({ product }: ProductProps) {
    return (
      <div className="relative bg-transparent rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Imagem do Produto */}
        <Image 
        src={product.image} 
        alt={product.title}
        width={800}
        height={800}
        className="rounded-lg h-48 w-full object-cover"
        />
        {/* Botão de Adicionar ao Carrinho sobreposto */}
        <button className="absolute left-1/2 -translate-x-1/2 bottom-16 -translate-y-1/2 bg-white text-gray-900 px-6 py-2 rounded-full border border-gray-300 flex items-center gap-2 shadow-md hover:bg-gray-100 transition whitespace-nowrap min-w-[140px]">
            🛒 Adicionar
        </button>
  
        {/* Informações do Produto */}
        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500 font-medium">Dessert</p>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-orange-500 font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  