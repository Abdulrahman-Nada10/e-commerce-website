import { Poppins } from "next/font/google";
import "./globals.css";
import {NavBar} from "./components/sections/Navbar";
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
  title: "E-commerce Website",
  description:
    "A modern e-commerce website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
     <body className="antialiased font-poppins">
      <Providers>
  <WishlistProvider>
    <OrderProvider>
      <ReactQueryProvider>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </ReactQueryProvider>
    </OrderProvider>
  </WishlistProvider>
</Providers>


      </body>
    </html>
  );
}
