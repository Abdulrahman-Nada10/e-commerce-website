import React from 'react'
import RatingStars from './RatingStart';

const reviewsData = [
    {
        id: 1,
        img: 'https://placehold.co/400x400',
        name: 'John Doe',
        date: '2023-10-01',
        rating: 4.5,
        comment: 'Great product! Highly recommend it.',
    },
    {
        id: 2,
        img: 'https://placehold.co/400x400',
        name: 'Jane Smith',
        date: '2023-09-15',
        rating: 3,
        comment: 'Exceeded my expectations in every way.',
    },
];

const Reviews = (data) => {
    return (
        <div className="flex flex-col h-full max-h-[300px] rounded-lg p-4 space-y-4">
            <h2 className="text-2xl font-bold text-[#060010]">Customer Reviews</h2>

            <div className='flex-1 overflow-auto'>
                {data.reviews.length > 0 ? (
                    data.reviews.map((review) => (
                        <div key={review.id} className="mb-3 rounded-2xl bg-gray-100 p-4">
                            <div className="flex items-center space-x-4 mb-2">
                                <img
                                    src={review.img}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{review.name}</h3>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <RatingStars rating={review.rating} />
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    )
}

export default Reviews
