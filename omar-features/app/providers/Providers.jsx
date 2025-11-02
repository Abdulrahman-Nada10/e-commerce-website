// app/providers/Providers.jsx
"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";

const Providers = ({ children }) => {
  return <CartProvider>      {children}    </CartProvider>;
};

export default Providers;
