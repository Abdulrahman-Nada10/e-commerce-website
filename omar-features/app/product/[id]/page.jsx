"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectWishlist } from '../../store/slices/wishlistSlice';
import { selectProductById } from '../../store/slices/productSlice';
import { Heart } from "lucide-react";
import GlowPillButton from "../../components/gsap/GlowPillButton";
import Link from "next/link";
import toast from 'react-hot-toast';

const ACCENT_COLOR = "#4EC5F5";
const PILL_COLOR = "#ffffff";
const TEXT_COLOR = "#060010";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const product = useSelector((state) => selectProductById(state, productId));
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Excellent product! Highly recommend.",
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Good quality, fast delivery.",
      date: "2024-01-10"
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 5,
      comment: "Perfect for my needs. Will buy again.",
      date: "2024-01-05"
    }
  ];

  useEffect(() => {
    if (product) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const isInWishlist = wishlist.some(item => item.id === product?.id);

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success(`${product.title} removed from wishlist!`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const calculateAverageRating = () => {
    const total = mockReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / mockReviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: PILL_COLOR }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: ACCENT_COLOR }}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: PILL_COLOR }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: TEXT_COLOR }}>Product Not Found</h1>
          <Link href="/products">
            <GlowPillButton>GO Back</GlowPillButton>
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.image ? [product.image, product.image, product.image] : ['/images/placeholder.jpg', '/images/placeholder.jpg', '/images/placeholder.jpg'];

  return (
    <div className="min-h-screen py-8 mt-16" style={{ backgroundColor: PILL_COLOR, color: TEXT_COLOR }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 relative overflow-hidden rounded border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: TEXT_COLOR }}>
                {product.title}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(Math.floor(calculateAverageRating()))}
                </div>
                <span className="text-sm text-gray-600">
                  ({calculateAverageRating()}) • {mockReviews.length} reviews
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold" style={{ color: TEXT_COLOR }}>
              ${product.price?.toFixed(2)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {product.stock > 0 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} items remaining` : 'Currently unavailable'}
              </p>
            </div>

            <div className="pt-4 flex gap-4">
              <GlowPillButton onClick={handleAddToCart}>
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </div>
              </GlowPillButton>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: TEXT_COLOR }}>
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8" style={{ color: TEXT_COLOR }}>
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md border"
                style={{ borderColor: ACCENT_COLOR + '20' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold" style={{ color: TEXT_COLOR }}>
                    {review.user}
                  </h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
