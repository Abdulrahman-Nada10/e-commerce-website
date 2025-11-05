import React from 'react'
import { useWishList } from "../../context/WishListContext";

const WishList = ({ productId }) => {
  const { addToWishList } = useWishList();

  return (
    <button
      onClick={() => addToWishList(productId)}
      className="flex-1 font-semibold text-gray-500 px-4 py-2 rounded-full hover:text-gray-800 hover:bg-gray-200 cursor-pointer transition duration-300"
    >
      WishList
    </button>
  )
}

export default WishList;


