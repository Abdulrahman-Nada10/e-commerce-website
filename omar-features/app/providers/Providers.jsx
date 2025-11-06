"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import { WishlistProvider } from "../context/WishlistContext";
import { OrderProvider } from "../context/OrderContext";
import ReactQueryProvider from "../../providers/ReactQueryProvider";


const Providers = ({ children }) => {
  return (
    <ReactQueryProvider>
      <CartProvider>
        <ProductProvider>
          
            <OrderProvider>
              {children}
            </OrderProvider>
          
        </ProductProvider>
      </CartProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
