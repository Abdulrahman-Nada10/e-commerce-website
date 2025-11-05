'use client';
import React from 'react';
import { useState } from 'react';

const tabs = [
    {
        id: 'img1',
        label: (<img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />),
        content: (
            <div>
                <img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />
            </div>
        ),
    },
    {
        id: 'img2',
        label: (<img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />),
        content: (
            <div>
                <img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />
            </div>
        ),
    },
    {
        id: 'img3',
        label: (<img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />),
        content: (
            <div>
                <img src="https://placehold.co/400x400" alt="All Images" className="w-full h-full inline-block object-cover" />
            </div>
        ),
    },
];

const ImagesSec = (imgs) => {
    const [activeTab, setActiveTab] = useState(imgs[0].id);

    return (
        <div className="flex-1 mt-8 flex flex-col items-center">
            {/* Tab Content */}
            <div className="mb-4">
                {imgs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <div
                                key={tab.id}
                                className="bg-white shadow-xl rounded-2xl overflow-hidden"
                            >
                                <img src={tab.url} alt={tab.id} className="w-full h-full inline-block object-cover" />
                            </div>
                        )
                )}
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 border-gray-300">
                {imgs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`-mt-px w-20 shadow-lg rounded-xl border-2 transition-colors cursor-pointer overflow-hidden ${activeTab === tab.id
                            ? "border-[#4EC5F5]"
                            : "border-gray-300 hover:border-gray-400"
                            }`
                        }

                        onClick={() => setActiveTab(tab.id)}
                    >
                        <div>
                            <img src={tab.url} alt={tab.id} className="w-full h-full inline-block object-cover" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ImagesSec
