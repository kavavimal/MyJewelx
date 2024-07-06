import React from 'react';
import Dashboard from './components/Dashboard';
import prisma from '@/lib/prisma';

const getVendors = () =>
    prisma.user.findMany({
        where: {
            role_id: 2,
        },
        include: {
            vendor: true,
        },
    });
const getProducts = () => prisma.product.findMany({});
const getOrders = () => prisma.order.findMany({});
const getUsers = () =>
    prisma.user.findMany({
        include: {
            role: true,
        },
        where: {
            role_id: 3,
        },
    });

const page = async () => {
    const vendors = await getVendors();
    const products = await getProducts();
    const allUsers = await getUsers();
    const allOrders = await getOrders();
    return (
        <Dashboard
            vendors={vendors}
            products={products}
            allUsers={allUsers}
            allOrders={allOrders}
        />
    );
};

export default page;
