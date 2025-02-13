import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const dummyProducts = [
  { id: 1, title: "Waffle with Berries", price: 6.5, image: "/image-brownie-desktop.jpg" },
  { id: 2, title: "Vanilla Bean Crème Brûlée", price: 7.0, image: "/image-brownie-desktop.jpg" },
  { id: 3, title: "Macaron Mix of Five", price: 8.0, image: "" },
  { id: 4, title: "Classic Tiramisu", price: 5.5, image: "" },
  { id: 5, title: "Pistachio Baklava", price: 4.0, image: "" },
  { id: 6, title: "Lemon Meringue Pie", price: 5.0, image: "" },
  { id: 7, title: "Red Velvet Cake", price: 4.5, image: "" },
  { id: 8, title: "Salted Caramel Brownie", price: 5.5, image: "" },
  { id: 9, title: "Vanilla Panna Cotta", price: 6.5, image: "" },
];

export default function Home() {
  return (
    <div className="bg-[#F8F6F2] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Sobremesas</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* Carrinho */}
        <div className="w-full md:w-1/3">
          <Cart />
        </div>
      </div>
    </div>
  );
}
