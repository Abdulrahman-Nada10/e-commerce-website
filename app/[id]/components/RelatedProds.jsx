'use client'

import Image from 'next/image'
import React from 'react'

const RelatedProds = () => {
    const relatedProducts = [
        { id: "r1", name: "Cool T-Shirt", price: 29.99, image: "https://placehold.co/400x400" },
        { id: "r2", name: "Running Shoes", price: 59.99, image: "https://placehold.co/400x400" },
        { id: "r3", name: "Smart Watch", price: 99.99, image: "https://placehold.co/400x400" },
        { id: "r4", name: "Hoodie", price: 45.99, image: "https://placehold.co/400x400" },
        { id: "r5", name: "Sunglasses", price: 25.99, image: "https://placehold.co/400x400" },
    ];

    return (//w-fit
        <section className="m-10 mt-15 max-w-fit bg-white p-6 rounded-xl shadow-lg border border-[#060010]/20">
            <h2 className="text-xl font-bold mb-4 text-[#060010]">Related Products</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[180px] shrink-0 border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
                    >
                        <div className="w-full h-40 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                            {/* <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: "cover" }}
                            /> */}
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </div>
                        <p className="font-semibold text-[#060010]">{product.name}</p>
                        <p className="text-[#060010]/70">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-2 w-full py-1 text-sm bg-[#4EC5F5] text-white rounded-md hover:opacity-80 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProds
