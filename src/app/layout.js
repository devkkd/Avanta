import "./globals.css";
import { geistSans, geistMono, cinzel, montserrat } from '@/lib/fonts';
import { ProductProvider } from '@/context/ProductContext';
import ConditionalLayout from '@/components/ConditionalLayout';
import { EnquiryProvider, CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Avanta India - Jaipur Kurti Creations",
  description: "Welcome to Avanta India by Jaipur Kurti Creations. Thoughtfully crafted to celebrate heritage.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${cinzel.variable} antialiased`}
      >
        <ProductProvider>
          <CartProvider>
            <EnquiryProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
            </EnquiryProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
