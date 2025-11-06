"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage on mount
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Initialize with empty array if no saved products
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('adminProducts', JSON.stringify(products));
      } catch (error) {
        console.error('Error saving products to localStorage:', error);
      }
    }
  }, [products, loading]);

  const addProduct = (newProduct) => {
    const product = {
      id: Date.now(), // Simple ID generation
      ...newProduct,
      title: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.images && newProduct.images[0]?.url || '/placeholder.png',
      active: newProduct.active !== undefined ? newProduct.active : true,
      stock: parseInt(newProduct.stock) || 0,
      discount: parseInt(newProduct.discount) || 0,
    };
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(product =>
      product.id == id ? {
        ...product,
        ...updatedProduct,
        title: updatedProduct.name || product.title,
        price: parseFloat(updatedProduct.price) || product.price,
        stock: parseInt(updatedProduct.stock) !== undefined ? parseInt(updatedProduct.stock) : product.stock,
        discount: parseInt(updatedProduct.discount) !== undefined ? parseInt(updatedProduct.discount) : product.discount,
        active: updatedProduct.active !== undefined ? updatedProduct.active : product.active,
        category: updatedProduct.category || product.category,
        description: updatedProduct.description || product.description,
        image: updatedProduct.images && updatedProduct.images[0]?.url || product.image,
      } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id == id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
