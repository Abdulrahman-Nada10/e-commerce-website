// components/features/ProductCard.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from "../../../lib/useWishlistMutations";
import { useGetWishlistQuery } from "../../../lib/useWishlistMutations";

const ACCENT_COLOR = "#4EC5F5";
const TEXT_COLOR = "#060010";
const CARD_BG = "#ffffff";

const ProductCard = ({ product }) => {
  const { id, title, price, description, image } = product;
  const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const { data: wishlist } = useGetWishlistQuery();
  const isInWishlist = wishlist ? wishlist.some((item) => item.id === id) : false;

  const glowStyle = {
    "--accent-color": ACCENT_COLOR,
    "--text-color": TEXT_COLOR,
  };

  return (
    <div
      className="product-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 shrink-0 w-full"
      style={{
        backgroundColor: CARD_BG,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-72 overflow-hidden p-6 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={250}
          height={288}
          className="object-contain transition-transform duration-500 hover:scale-110"
          priority={false}
        />
        {isHovered && (
          <div className="absolute top-2 right-2 flex space-x-2">
             <button
              onClick={() => isInWishlist ? removeFromWishlistMutation.mutate(id) : addToWishlistMutation.mutate(id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
               aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              data-active={isInWishlist}
            >
              <Heart className={`w-5 h-5 ${isInWishlist  ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
            <Link href={`/product/${id}`}>
              <button
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="View product details"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="p-5 pt-3" style={{ color: TEXT_COLOR }}>
        <h3
          className="text-base font-semibold truncate mb-1 text-gray-800"
          title={title}
        >
          {title}
        </h3>

        <p className="text-xs text-gray-500 mb-2 line-clamp-2 min-h-[30px]">
          {description || "No description available."}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-extrabold" style={{ color: TEXT_COLOR }}>
            ${price.toFixed(2)}
          </p>

          <div className="flex space-x-2">
            {/* <button
              className="wishlist-button relative p-2.5 rounded-full transition-all duration-300 group overflow-hidden"
              onClick={() => isInWishlist ? removeFromWishlistMutation.mutate(id) : addToWishlistMutation.mutate(id)}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              data-active={isInWishlist}
            >
             
              <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              
              <div className={`absolute inset-0 bg-linear-to-br from-red-500 to-pink-600 transition-opacity duration-300 ${isInWishlist ? 'opacity-100' : 'opacity-0'}`} />
              
    
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            
              {isInWishlist && (
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-75" />
              )}
              
    
              <Heart 
                className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                  isInWishlist 
                    ? 'text-white scale-110' 
                    : 'text-gray-600 group-hover:text-white group-hover:scale-110'
                }`}
                fill={isInWishlist ? 'currentColor' : 'none'}
                strokeWidth={2.5}
              />
            </button> */}

            <button
              className="flex items-center space-x-2 py-2 px-4 rounded-full font-bold text-sm transition-all duration-300 button-glow-min"
              style={glowStyle}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .button-glow-min {
          background-color: var(--accent-color);
          color: var(--text-color);
          border: 1px solid var(--accent-color);
        }

        .button-glow-min:hover {
          color: ${CARD_BG} !important;
          background-color: ${TEXT_COLOR} !important;
          border-color: ${TEXT_COLOR} !important;
          box-shadow: 0 0 5px rgba(6, 0, 16, 0.4),
             0 0 15px rgba(78, 197, 245, 0.8);
        }

        .button-glow-min:hover svg {
          color: ${CARD_BG} !important;
        }

        /* Wishlist button styling */
        .wishlist-button {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .wishlist-button:hover {
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
          transform: scale(1.05);
        }

        .wishlist-button[data-active="true"] {
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.5),
                      0 0 30px rgba(239, 68, 68, 0.3);
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .wishlist-button[data-active="true"]:hover {
          box-shadow: 0 6px 24px rgba(239, 68, 68, 0.6),
                      0 0 40px rgba(239, 68, 68, 0.4);
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10% {
            transform: scale(1.1);
          }
          20% {
            transform: scale(1);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;

// // components/features/ProductCard.jsx
// "use client";

// import React from "react";
// import Image from "next/image";
// import { ShoppingCart, Heart } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from "../../../lib/useWishlistMutations";
// import { useGetWishlistQuery } from "../../../lib/useWishlistMutations";

// const ACCENT_COLOR = "#4EC5F5";
// const TEXT_COLOR = "#060010";
// const CARD_BG = "#ffffff";

// const ProductCard = ({ product }) => {
//   const { id, title, price, description, image } = product;
//   const { addToCart } = useCart();
//   const addToWishlistMutation = useAddToWishlistMutation();
//   const removeFromWishlistMutation = useRemoveFromWishlistMutation();
//   const { data: wishlist } = useGetWishlistQuery();
//   const isInWishlist = wishlist ? wishlist.some((item) => item.id === id) : false;

//   const glowStyle = {
//     "--accent-color": ACCENT_COLOR,
//     "--text-color": TEXT_COLOR,
//   };

//   return (
//     <div
//       className="product-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 shrink-0 w-full"
//       style={{
//         backgroundColor: CARD_BG,
//       }}
//     >
//       <div className="relative w-full h-72 overflow-hidden p-6 flex items-center justify-center">
//         <Image
//           src={image}
//           alt={title}
//           width={250}
//           height={288}
//           className="object-contain transition-transform duration-500 hover:scale-110"
//           priority={false}
//         />
//       </div>

//       <div className="p-5 pt-3" style={{ color: TEXT_COLOR }}>
//         <h3
//           className="text-base font-semibold truncate mb-1 text-gray-800"
//           title={title}
//         >
//           {title}
//         </h3>

//         <p className="text-xs text-gray-500 mb-2 line-clamp-2 min-h-[30px]">
//           {description || "No description available."}
//         </p>

//         <div className="flex justify-between items-center mt-4">
//           <p className="text-xl font-extrabold" style={{ color: TEXT_COLOR }}>
//             ${price.toFixed(2)}
//           </p>

//           <div className="flex space-x-2">
//             <button
//               className={`p-2 rounded-full transition-colors duration-300 ${
//                 isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white'
//               }`}
//               onClick={() => isInWishlist ? removeFromWishlistMutation.mutate(id) : addToWishlistMutation.mutate(id)}
//               aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//             >
//               <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
//             </button>

//             <button
//               className="flex items-center space-x-2 py-2 px-4 rounded-full font-bold text-sm transition-all duration-300 button-glow-min"
//               style={glowStyle}
//               onClick={() => addToCart(product)}
//             >
//               <ShoppingCart className="w-4 h-4" />
//               <span>Add</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .button-glow-min {
//           background-color: var(--accent-color);
//           color: var(--text-color);
//           border: 1px solid var(--accent-color);
//         }

//         .button-glow-min:hover {
//           color: ${CARD_BG} !important;
//           background-color: ${TEXT_COLOR} !important;
//           border-color: ${TEXT_COLOR} !important;


//           box-shadow: 0 0 5px rgba(6, 0, 16, 0.4),
//              0 0 15px rgba(78, 197, 245, 0.8);
//         }

//         .button-glow-min:hover svg {
//           color: ${CARD_BG} !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCard;
