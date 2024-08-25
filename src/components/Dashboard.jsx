import Image from 'next/image';
import React from 'react';

const Dashboard = () => {
    const cards = [
        {
            image: 'assets/images/glass_bag.png',
            count: '714k',
            title: 'Weekly Sales',
        },
        {
            image: 'assets/images/glass_users.png',
            count: '1.35m',
            title: 'New Users',
        },
        {
            image: 'assets/images/glass_buy.png',
            count: '1.72m',
            title: 'Item Orders',
        },
        {
            image: 'assets/images/glass_message.png',
            count: '234',
            title: 'Bug Reports',
        },
    ];
    return (
        <main>
            <div>
                <h4 className="text-2xl font-bold mb-14">
                    Hi, Welcome back 👋
                </h4>
                <div className="flex items-center justify-between">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex shadow-3xl px-10 py-8 items-center gap-5 rounded-xl"
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
