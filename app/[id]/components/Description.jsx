import React from 'react'
import RatingStars from './RatingStart'
import { House, TriangleAlert, Twitter } from 'lucide-react'
import AddToCart from './AddToCart';
import AddToCart from './AddToCart';
import WishList from './WishList';

const rate = 4.5;

const Description = (data) => {
    return (
        <div className="max-h-[300px] rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-[#060010]">{data.title}</h2>

            <div className="flex items-center space-x-2">
                <p className="text-xl text-gray-600 font-semibold">${data.price}</p>
                <RatingStars rating={rate} />
            </div>

            <div className="flex items-center gap-5 text-gray-700">
                <div className="flex items-center space-x-1">
                    <Twitter className='fill-current w-5' /> <span>Stock</span>
                </div>
                <div className="flex items-center space-x-1">
                    {data.inStock ? <House className='w-5' />
                    :<TriangleAlert className='w-5' />}
                    <span>{inStock? "In" : "Out of"} Stock</span>
                </div>
            </div>

            <div className="flex space-x-3">
                <button className="flex-1 font-semibold bg-[#4EC5F5] text-white px-4 py-2 rounded-full hover:bg-cyan-500 cursor-pointer transition duration-300">
                    <AddToCart details={data.id} />
                </button>
                <button className="flex-1 font-semibold text-gray-500 px-4 py-2 rounded-full hover:text-gray-800 hover:bg-gray-200 cursor-pointer transition duration-300">
                    <WishList details={data.id} />
                </button>
            </div>
        </div>

    )
}

export default Description;
