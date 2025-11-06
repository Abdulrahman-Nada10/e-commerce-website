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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories with error handling
        let categoryData = { success: false, data: [] };
        try {
          const categoriesResponse = await fetch("https://localhost:7118/api/Categories?languageCode=ar&search=Living%20Room&isActive=true");
          if (categoriesResponse.ok) {
            categoryData = await categoriesResponse.json();
          }
        } catch (error) {
          console.warn("Categories API not available, using fallback data:", error);
        }

        if (categoryData.success && categoryData.data) {
          // Use the actual API data array
          setCategories(categoryData.data);
        } else {
          // Fallback data
          const fallbackCategories = [
            {
              categoryID: 1,
              title: "غرفة المعيشة",
              description: "مجموعة واسعة من أثاث غرفة المعيشة لتوفير الراحة والخصوصية",
              icon: "fa-solid fa-couch",
              isActive: true,
              displayOrder: 1,
              createdAt: "2025-11-03T00:30:06.387"
            }
          ];
          setCategories(fallbackCategories);
        }

        // Fetch products
        const productsResponse = await fetch("https://localhost:7118/api/Product?languageCode=en");
        const productData = await productsResponse.json();
        // Map the API response to expected format
        const productsWithStatus = productData.map((product) => ({
          id: product.productID,
          title: product.title,
          price: product.salePrice || product.price,
          description: product.description,
          shortDescription: product.shortDescription,
          sku: product.sku,
          currency: product.currency,
          image: '/images/placeholder.jpg', // Placeholder since API doesn't provide images
          active: product.isPublished,
          stock: product.quantity,
          discount: product.price && product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0,
          category: 'Default Category', // Will be updated when categories are fetched
          isFeatured: product.isFeatured,
          isDeleted: product.isDeleted,
          brandID: product.brandID,
          categoryID: product.categoryID,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          deletedAt: product.deletedAt,
        }));
        setProducts(productsWithStatus);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Fallback data
        const fallbackCategories = [
          {
            categoryID: 1,
            title: "غرفة المعيشة",
            description: "مجموعة واسعة من أثاث غرفة المعيشة لتوفير الراحة والخصوصية",
            icon: "fa-solid fa-couch",
            isActive: true,
            displayOrder: 1,
            createdAt: "2025-11-03T00:30:06.387"
          }
        ];
        setCategories(fallbackCategories);

        const fallbackProducts = Array.from({ length: 30 }, (_, index) => ({
          id: index + 1,
          title: `Product ${index + 1}`,
          price: Math.floor(Math.random() * 100) + 10,
          description: `Description for product ${index + 1}`,
          category: fallbackCategories[Math.floor(index / 2) % fallbackCategories.length].title,
          image: '/images/placeholder.jpg',
          active: Math.random() > 0.5,
          stock: Math.floor(Math.random() * 100) + 1,
          discount: Math.floor(Math.random() * 50),
        }));
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
