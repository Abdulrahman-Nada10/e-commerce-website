"use client";
import React, { useState, useEffect, useRef } from "react";
import { Edit3, Trash2, Star } from "lucide-react";
import AnimatedButton from "../components/constants/AnimatedButton";
import Header from "./Header";
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const COLORS = {
  primary: "#4EC5F5",
  textDark: "#060010",
  textLight: "#ffffff",
};

const FAKE_PRODUCTS: Product[] = [
  { id: 1, title: "Modern Sofa Deluxe", price: 1200, image: "https://picsum.photos/seed/sofa/300/200", rating: 4 },
  { id: 2, title: "Luxury Armchair", price: 800, image: "https://picsum.photos/seed/armchair/300/200", rating: 4 },
  { id: 3, title: "Wooden Coffee Table", price: 450, image: "https://picsum.photos/seed/table/300/200", rating: 4 },
  { id: 4, title: "Minimalist Bookshelf", price: 600, image: "https://picsum.photos/seed/bookshelf/300/200", rating: 4 },
];

export default function AdminProductsGrid() {
  const [products, setProducts] = useState<Product[]>(FAKE_PRODUCTS);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [visible, setVisible] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const handleEdit = (product: Product) => setModalProduct(product);


  const handleAdd = () => {
    setModalProduct({ id: Date.now(), title: "", price: 0, image: "", rating: 4 });
    setIsAdding(true);
  };


  const handleSave = () => {
    if (isAdding && modalProduct) {
      setProducts([...products, modalProduct]);
    } else if (modalProduct) {
      setProducts(products.map(p => (p.id === modalProduct.id ? modalProduct : p)));
    }
    setModalProduct(null);
    setIsAdding(false);
  };

  // الحذف
  const handleDelete = (id: number) => setProducts(products.filter(p => p.id !== id));

  // Animation: كل منتج يظهر لوحده عند النزول
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!visible.includes(index)) {
              setTimeout(() => setVisible(prev => [...prev, index]), index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = containerRef.current?.querySelectorAll(".product-item");
    items?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [products, visible]);

  return (
    <div>
      <Header/>
    <div className="max-w-7xl mx-auto px-6 py-10">
     
      <h2 className="text-2xl font-bold mb-6">Admin Products</h2>

      <AnimatedButton onClick={handleAdd} filled>
        Add Product
      </AnimatedButton>

      <div ref={containerRef} className="grid grid-cols-4 gap-6 mt-6">
        {products.map((product, i) => (
          <div
            key={product.id}
            data-index={i}
            className={`product-item relative group bg-white rounded-lg overflow-hidden shadow-md transform transition-all duration-700 ease-out
              ${visible.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
           
            <div className="relative w-full h-48 overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
              <img src={product.image} className="w-full h-full object-cover" alt={product.title} />

              <div className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black bg-opacity-40">
                <button onClick={() => handleEdit(product)} className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-110">
                  <Edit3 className="w-5 h-5 text-white" />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-transform transform hover:scale-110">
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

         
            <div className="p-3">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-purple-500">${product.price}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < product.rating ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {modalProduct && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-900" onClick={() => setModalProduct(null)}>&times;</button>

            <input type="text" value={modalProduct.title} onChange={e => setModalProduct({...modalProduct, title: e.target.value})} className="w-full p-2 border rounded mb-2" placeholder="Product Name"/>
            <input type="number" value={modalProduct.price} onChange={e => setModalProduct({...modalProduct, price: Number(e.target.value)})} className="w-full p-2 border rounded mb-2" placeholder="Price"/>
            <input type="text" value={modalProduct.image} onChange={e => setModalProduct({...modalProduct, image: e.target.value})} className="w-full p-2 border rounded mb-2" placeholder="Image URL"/>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, idx) => (
                <span key={idx} onClick={() => setModalProduct({...modalProduct, rating: idx+1})} className={`cursor-pointer w-6 h-6 inline-block mr-1 ${idx < modalProduct.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
              ))}
              <span className="ml-2 text-sm">{modalProduct.rating} / 5</span>
            </div>

            <AnimatedButton onClick={handleSave} filled>
              Save
            </AnimatedButton>
          </div>
        </div>
     
      )}
    </div>
    </div>
  );
}
