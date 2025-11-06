import { Poppins } from "next/font/google";
import "./globals.css";
import {NavBar} from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import Providers from "./providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Shopylx - E-commerce Website",
  description:
    "A modern e-commerce website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased font-poppins">
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
