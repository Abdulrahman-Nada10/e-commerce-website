'use client';

import React, { useId } from 'react';

const STAR_PATH = "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z";
const maxStars = 5;
const filledColor = "#22D3EE"; // cyan-400
const emptyColor = "#E5E7EB"; // gray-200

const RatingStars = ({ rating }) => {
    const safeRating = Math.min(maxStars, Math.max(0, parseFloat(rating) || 0));
    const filledStars = Math.floor(safeRating);
    const fractionalPart = safeRating % 1;
    const hasPartialStar = fractionalPart > 0;
    const emptyStars = maxStars - filledStars - (hasPartialStar ? 1 : 0);
    const displayRating = isNaN(parseFloat(rating)) ? '0' : rating;

    const uniqueId = useId();
    const gradientId = `half-${uniqueId}`;

    const StarSVG = ({ color, fillUrl = '' }) => (
        <svg
            className={`w-5 h-5 fill-current ${color}`}
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
        >
            {fillUrl ? (
                <path fill={`url(#${fillUrl})`} d={STAR_PATH} />
            ) : (
                <path d={STAR_PATH} />
            )}
        </svg>
    );

    return (
        <div className="flex items-center space-x-1"
            role="img"
            aria-label={`Rating: ${safeRating} out of ${maxStars} stars`}
        >
            {/* Filled Stars */}
            {Array(filledStars).fill().map((_, i) => (
                <StarSVG key={`full-${i}`} color="text-cyan-400" />
            ))}

            {/* PartialStar (If exist) */}
            {hasPartialStar && (
                <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    key={`partial-${uniqueId}`}
                    aria-hidden="true" 
                    focusable="false"
                >
                    {/* left filled, right empty */}
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset={`${fractionalPart * 100}%`} stopColor={filledColor} /> {/* cyan - filled */}
                            <stop offset={`${fractionalPart * 100}%`} stopColor={emptyColor} /> {/* switch back to gray */}
                        </linearGradient>
                    </defs>
                    <path
                        fill={`url(#${gradientId})`}
                        d={STAR_PATH}
                    />
                </svg>
            )}

            {/* Empty Stars */}
            {Array(emptyStars).fill().map((_, i) => (
                <StarSVG key={`empty-${i}`} color="text-gray-200" />
            ))}

            <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
    );
};

export default RatingStars;