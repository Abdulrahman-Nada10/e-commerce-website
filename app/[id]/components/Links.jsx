'use client';
import React from 'react';
import { useState } from 'react';
import Description from './Description';
import Reviews from './Reviews';
import Specs from './Specs';

const tabs = [
    {
        id: 'description',
        label: 'DESCRIPTION',
        content: (
            <div>
                <Description data={details} />
            </div>
        ),
    },
    {
        id: 'reviews',
        label: 'REVIEWS',
        content: (
            <div>
                <Reviews data={details} />
            </div>
        ),
    },
    {
        id: 'specs',
        label: 'SPECS',
        content: (
            <div>
                <Specs data={details} />
            </div>
        ),
    },
];

const Links = (details) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="flex-2 mt-8">
            {/* Tabs */}
            <div className="flex justify-center gap-2 border-gray-300">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 -mt-px font-semibold border-2 rounded-xl transition-all duration-300 ${activeTab === tab.id
                            ? "border-[#4EC5F5] text-[#4EC5F5] shadow-md"
                            : "text-gray-600 border-transparent hover:text-[#4EC5F5] hover:border-gray-300 hover:bg-gray-50"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div className="mt-4">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <div
                                key={tab.id}
                                className="bg-white shadow-xl rounded-2xl p-4"
                            >
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
}

export default Links;
