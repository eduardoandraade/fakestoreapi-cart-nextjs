import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext"; 


export const metadata: Metadata = {
  title: "Carrinho - Fakestore API",
  description: "Carrinho utilizando dados da API Fake Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className='font-redhat antialiased min-h-screen'
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
