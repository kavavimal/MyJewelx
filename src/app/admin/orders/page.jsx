import React from 'react';
import prisma from '@/lib/prisma';
import { checkUserSession } from '@/app/(frontend)/layout';
import dynamic from 'next/dynamic';
import OrdersList from './components/OrderList';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});

export const revalidate = 0;

const getOrders = async () => {
    const user = await checkUserSession();
    try {
        return prisma.order.findMany({
            include: {
                user: true,
                orderItems: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
    } catch (error) {}
};

const OrdersPage = async () => {
    const orders = await getOrders();
    return (
        <>
            <div className="flex justify-between items-center btn btn-primary mb-10">
                <h2 className="text-2xl font-semibold ">Orders</h2>
            </div>
            <OrdersList orders={orders} />
        </>
    );
};

export default OrdersPage;
