import React from 'react'
import { useCart } from "../../context/CartContext";

const AddToCart = ({ productId }) => {
    const { addToCart } = useCart();
    return (
        <button
            onClick={() => addToCart(productId)}
            className="flex-1 font-semibold bg-[#4EC5F5] text-white px-4 py-2 rounded-full hover:bg-cyan-500 cursor-pointer transition duration-300"
        >
            Add to Cart
        </button>
    )
}

export default AddToCart;
