"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, userInfo) => {
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      status: 'waiting',
      user: { ...userInfo, id: 'user1' }, // Add user ID for filtering
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.user.id === userId);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      updateOrderStatus,
      getUserOrders,
      getAllOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};