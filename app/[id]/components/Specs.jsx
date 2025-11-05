import React from 'react'

const details = [
    { key: 'Weight', value: '1.5 kg' },
    { key: 'Dimensions', value: '25 x 15 x 10 cm' },
    { key: 'Material', value: 'Aluminum' },
    { key: 'Battery Life', value: '10 hours' },
    { key: 'Warranty', value: '2 years' },
]

const Specs = (data) => {
    return (
        <div className="flex flex-col h-full max-h-[300px] rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-[#060010]">Product Specifications</h2>
            {data.specs.length > 0 ? (
            <ul className="space-y-2 flex-1 overflow-auto">
                {data.specs.map((detail, index) => (
                    <li key={index} className={`flex justify-between pb-2
                    ${index === details.length - 1 ? '' : 'border-b border-gray-300'}`}>
                        <span className="font-medium text-gray-700">{detail.key}</span>
                        <span className="text-gray-900">{detail.value}</span>
                    </li>
                ))}
            </ul>
            ) : (
                <p className="text-gray-600">No specifications available for this product.</p>
            )}
        </div>
    )
}

export default Specs
