'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});
import Button from '@/components/Button';
import { IconButton } from '@material-tailwind/react';

const OrdersPage = ({ orders }) => {
    console.log(orders);
    const columns = [
        {
            name: 'Order ID',
            selector: (row) => row?.id,
        },
        {
            name: 'Username',
            selector: (row) =>
                row?.user['firstName'] + ' ' + row?.user['lastName'],
        },
        {
            name: 'Mobile No',
            selector: (row) =>
                row?.user['phone_number'] ? row?.user['phone_number'] : '-',
        },
        {
            name: 'Email Id',
            selector: (row) => row?.user['email'],
        },
        {
            name: 'Order Total',
            selector: (row) => {
                return row.orderItems.reduce((total, i) => total + i.price, 0);
            },
        },
        {
            name: 'Order Status',
            selector: (row) => row?.status,
        },
        {
            name: 'Action',
            selector: (row) => (
                <>
                    <IconButton
                        variant="text"
                        color="red"
                        className="rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 32 32"
                        >
                            <circle cx="22" cy="24" r="2" fill="currentColor" />
                            <path
                                fill="currentColor"
                                d="M29.777 23.479A8.64 8.64 0 0 0 22 18a8.64 8.64 0 0 0-7.777 5.479L14 24l.223.522A8.64 8.64 0 0 0 22 30a8.64 8.64 0 0 0 7.777-5.478L30 24zM22 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4M7 17h5v2H7zm0-5h12v2H7zm0-5h12v2H7z"
                            />
                            <path
                                fill="currentColor"
                                d="M22 2H4a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8v-2H4V4h18v11h2V4a2.006 2.006 0 0 0-2-2"
                            />
                        </svg>
                    </IconButton>

                    <IconButton
                        variant="text"
                        color="red"
                        className="rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                            ></path>
                        </svg>
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={orders}
                columns={columns}
                highlightOnHover
                pagination
                pointerOnHover
            />
        </>
    );
};

export default OrdersPage;
