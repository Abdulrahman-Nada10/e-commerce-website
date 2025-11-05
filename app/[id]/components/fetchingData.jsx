import React from 'react'

const Data = async (id) => {
    if (!id || isNaN(id)) {
        return { success: false, error: 'Invalid product ID' };
    }
    const url = `https://api.example.com/products/${id}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Product not found or server error`);
        }

        const product = await res.json();

        return { success: true, data: product };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to fetch product'
        };
    }
}


export default Data;
