'use client';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@material-tailwind/react';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});

const Wishlist = ({ wishlist }) => {
    const columns = [
        {
            name: 'Image',
            selector: (row) => (
                <>
                    <Image
                        src="/assets/images/latest-product.png"
                        width={75}
                        height={75}
                    />
                </>
            ),
        },

        {
            name: 'Product Name',
            selector: (row) => row.product['product_name'],
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
                data={wishlist.wishlistItems}
                columns={columns}
                highlightOnHover
                pagination
                pointerOnHover
            />
        </>
    );
};

export default Wishlist;
