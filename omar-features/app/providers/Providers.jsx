"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";

const Providers = ({ children }) => {
  return (
    <CartProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </CartProvider>
  );
};

export default Providers;
