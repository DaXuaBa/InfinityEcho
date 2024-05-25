import React from 'react';

const ElectioneersPage = () => {
    return (
        <div className="flex justify-between items-center p-10">
            <div className="w-1/4">
                <img src="trump.png" alt="Trump" className="w-full" />
            </div>
            <div className="w-1/2 text-center">
                <h2 className="text-6xl font-bold mb-4">The Best Candidate for the Job</h2>
                <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-serif px-4 py-2 rounded mb-2">Vote Now</button>
                <p className='mt-2 text-gray-400 font-serif'>Unleash the Power of Leadership</p>
            </div>
            <div className="w-1/4">
                <img src="biden.png" alt="Biden" className="w-full" />
            </div>
        </div>
    );
};

export default ElectioneersPage;
