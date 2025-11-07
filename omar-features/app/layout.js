

import { Poppins } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import Providers from "./providers/Providers";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Shopylx - E-commerce Website",
  description: "A modern e-commerce website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased font-poppins">
        <Providers>
<<<<<<< HEAD
          <WishlistProvider>
            <OrderProvider>
              <ReactQueryProvider>
                <NavBar />
                <main>{children}</main>
                <Footer />
              </ReactQueryProvider>
            </OrderProvider>
          </WishlistProvider>
=======
          <NavBar />
          <main>{children}</main>
          <Footer />
>>>>>>> 0d5bba2e92a8051a5a1ee0b33645a892ec739bb9
        </Providers>
      </body>
    </html>
  );
}
