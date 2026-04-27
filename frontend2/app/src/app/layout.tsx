import "../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/cart-context";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[url('/images/paper.jpg')] bg-cover bg-fixed bg-center min-h-screen flex flex-col bg-white-opacity-50">
          <div className="bg-white/80 bg-cover backdrop-blur-xs">
            <CartProvider>
              <Toaster position="top-center" offset={80} />
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
