// app/productsmanagment/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '../../context/ProductContext';
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Percent } from 'lucide-react';

const ACCENT_COLOR = "#4EC5F5";
const TEXT_COLOR = "#060010";

const ProductsListPage = () => {
  const router = useRouter();
  const { products, deleteProduct, updateProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const handleAddProduct = () => {
    router.push('/admin/editor');
  };

  const handleEditProduct = (id) => {
    router.push(`/admin/editor?edit=true&id=${id}`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const toggleStatus = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      updateProduct(id, { ...product, active: !product.active });
    }
  };

  const toggleDiscount = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      // Simply toggle between 0 and 20% discount
      const newDiscount = product.discount > 0 ? 0 : 20;
      updateProduct(id, { ...product, discount: newDiscount });
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-semibold mb-4 sm:mb-0" style={{ color: TEXT_COLOR }}>
            Products List
          </h1>
          <button
            onClick={handleAddProduct}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
            style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
          >
            <Plus className="h-5 w-5" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث عن المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ color: TEXT_COLOR }}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: TEXT_COLOR }}
          >
            <option value="">جميع الفئات</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لم يتم العثور على منتجات.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الخصم</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المخزون</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: TEXT_COLOR }}>{product.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: TEXT_COLOR }}>
                          ${product.price.toFixed(2)}
                          {product.discount > 0 && (
                            <span className="ml-2 text-red-500 text-xs">
                              (${(product.price * (1 - product.discount / 100)).toFixed(2)})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleDiscount(product.id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.discount > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <Percent className="h-3 w-3 mr-1" />
                          {product.discount > 0 ? `${product.discount}%` : 'لا خصم'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.stock || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStatus(product.id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.active ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                          {product.active ? 'نشط' : 'غير نشط'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
