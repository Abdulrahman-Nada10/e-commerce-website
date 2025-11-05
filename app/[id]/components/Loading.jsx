import React from 'react';

const Loading = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 animate-pulse">
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="flex-1 space-y-4">
                    <div className="bg-gray-300 rounded-xl w-full h-64 md:h-80"></div>

                    <div className="flex justify-center gap-3">
                        <div className="bg-gray-300 rounded-lg w-20 h-20"></div>
                        <div className="bg-gray-300 rounded-lg w-20 h-20"></div>
                        <div className="bg-gray-300 rounded-lg w-20 h-20"></div>
                    </div>
                </div>

                <div className="flex-2 space-y-4">
                    <div className="flex justify-center gap-3">
                        <div className="bg-gray-300 rounded-xl h-10 w-30"></div>
                        <div className="bg-gray-300 rounded-xl h-10 w-30"></div>
                        <div className="bg-gray-300 rounded-xl h-10 w-30"></div>
                    </div>

                    <div className="bg-gray-300 rounded-xl w-full h-[350px]"></div>
                </div>
            </div>

            <div className="mt-20 bg-gray-300 rounded-xl w-full h-48 md:h-64"></div>
        </div>
    );
}

export default Loading;