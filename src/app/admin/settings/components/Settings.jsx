'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Homeslider from './Homeslider';
import Promotional from './Promotional';

const Settings = ({ homeslider, promotional }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full tabs">
            <div className="flex border-b border-gray-200">
                <button
                    className={`px-4 py-2 ${
                        activeTab === 0 ? 'border-b-2 border-blue-500' : ''
                    }`}
                    onClick={() => setActiveTab(0)}
                >
                    Home Slider
                </button>
                <button
                    className={`px-4 py-2 ${
                        activeTab === 1 ? 'border-b-2 border-blue-500' : ''
                    }`}
                    onClick={() => setActiveTab(1)}
                >
                    Promotional
                </button>
            </div>
            <div className="p-4">
                {activeTab === 0 && (
                    <div className="tab-Content">
                        {<Homeslider homeslider={homeslider} />}
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="tab-Content">
                        {<Promotional promotional={promotional} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
