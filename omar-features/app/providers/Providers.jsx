"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import ReactQueryProvider from "../../providers/ReactQueryProvider";

const Providers = ({ children }) => {
  return (
    <ReactQueryProvider>
      <CartProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </CartProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
