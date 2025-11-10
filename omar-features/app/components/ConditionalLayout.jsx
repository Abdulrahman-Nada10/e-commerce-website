"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <main className={!isAdminRoute ? "pt-10" : ""}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
