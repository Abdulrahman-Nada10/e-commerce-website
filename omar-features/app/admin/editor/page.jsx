"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '../../components/features/ProductCard';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const ACCENT_COLOR = "#4EC5F5";
const PILL_COLOR = "#FFFFFF";
const TEXT_COLOR = "#060010";

const AddEditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const productId = searchParams.get('id');
  const { categories, addProduct, updateProduct, getProductById } = useProducts();

  const [apiCategories, setApiCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discount: '',
    stock: '',
    description: '',
    images: [],
    active: true,
    featured: false,
  });

  const [loading, setLoading] = useState(isEdit);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7118/api/Categories?languageCode=ar&search=Living%20Room&isActive=true");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setApiCategories(data.data);
          } else {
            setApiCategories([]);
          }
        } else {
          setApiCategories([]);
        }
      } catch (error) {
        console.warn("Categories API not available, using fallback data:", error);
        // Fallback
        setApiCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEdit && productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData({
          name: product.title,
          category: product.category,
          price: product.price.toString(),
          discount: product.discount?.toString() || '0',
          stock: product.stock.toString(),
          description: product.description,
          images: product.image ? [{ url: product.image }] : [],
          active: product.active,
          featured: false, // Mock featured
        });
      }
      setLoading(false);
    }
  }, [isEdit, productId, getProductById]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleSave = () => {
    const productData = {
      ...formData,
      images: formData.images,
    };

    if (isEdit && productId) {
      updateProduct(productId, productData);
      setToast({ type: 'success', message: 'Product updated successfully!' });
    } else {
      addProduct(productData);
      setToast({ type: 'success', message: 'Product added successfully!' });
    }

    setTimeout(() => {
      router.push('/admin/productsmanagement');
    }, 2000);
  };

  const handleCancel = () => {
    router.push('/admin/productsmanagement');
  };

  const previewProduct = {
    id: productId || 'preview',
    title: formData.name || 'Product Name',
    price: parseFloat(formData.price) || 0,
    discount: parseFloat(formData.discount) || 0,
    description: formData.description || 'Product description',
    image: formData.images[0]?.url || '/images/placeholder.jpg',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: ACCENT_COLOR }}></div>
      </div>
    );
  }

  const categoryOptions = apiCategories.map(cat => cat.title).filter((value, index, self) => self.indexOf(value) === index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2" style={{ color: TEXT_COLOR }}>
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="text-gray-600">Dashboard / Products / {isEdit ? 'Edit' : 'Add'} New Product</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <form className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price and Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full  text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3  text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                  Product Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter product description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR }}>
                  Product Images
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Drag and drop images here, or click to select</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img.url} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm" style={{ color: TEXT_COLOR }}>
                    Active / Inactive
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm" style={{ color: TEXT_COLOR }}>
                    Featured Product
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
                  style={{ backgroundColor: ACCENT_COLOR, color: PILL_COLOR }}
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border rounded-lg font-medium transition-all hover:bg-gray-50"
                  style={{ borderColor: TEXT_COLOR, color: TEXT_COLOR }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: TEXT_COLOR }}>
              Product Preview
            </h2>
            <div className="max-w-sm mx-auto">
              <ProductCard product={previewProduct} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toast.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{toast.message}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddEditProductPage;
