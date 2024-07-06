'use client';
import Image from 'next/image';
import React from 'react';

const Dashboard = ({ vendors, products, allUsers, allOrders }) => {
    const totalVendors = vendors.length;
    const totalProduct = products.length;
    const usersAll = allUsers.length;
    const allORders = allOrders.length;
    totalVendors.toString().padStart(2, '0');

    const cards = [
        {
            image: '/assets/images/glass_bag.png',
            count: allORders.toString().padStart(2, '0'),
            title: 'Total Orders',
        },
        {
            image: '/assets/images/glass_users.png',
            count: usersAll.toString().padStart(2, '0'),
            title: 'Total Users',
        },
        {
            image: '/assets/images/glass_buy.png',
            count: totalVendors.toString().padStart(2, '0'),
            title: 'Total Vendors',
        },
        {
            image: '/assets/images/glass_message.png',
            count: totalProduct.toString().padStart(2, '0'),
            title: 'Total Products',
        },
    ];
    return (
        <main>
            <div>
                <h4 className="text-2xl font-bold mb-14">
                    Hi, Welcome back 👋
                </h4>
                <div className="flex items-center gap-5">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex shadow-3xl px-10 py-8 items-center gap-5 rounded-xl md:w-4/12 w-full"
                        >
                            <div>
                                <Image
                                    src={card.image}
                                    alt="Glass bag"
                                    width={70}
                                    height={70}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-2xl font-bold">
                                    {card.count}
                                </h4>
                                <h6 className="text-[#919EAB] font-bold text-sm tracking-wide">
                                    {card.title}
                                </h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
