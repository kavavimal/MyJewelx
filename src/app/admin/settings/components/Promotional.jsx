'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button, IconButton, Input } from '@material-tailwind/react';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DeleteAds from './DeleteAds';
const Promotional = ({ promotional }) => {
    console.log(promotional);
    const columns = [
        {
            name: 'Ads Image',
            selector: (row) => (
                <>
                    <Image
                        src={row?.ads_img_url}
                        width={50}
                        height={50}
                    ></Image>
                </>
            ),
        },
        {
            name: 'Ads Title',
            selector: (row) => row?.ads_title,
        },
        {
            name: 'Ads Description',
            selector: (row) => row?.ads_desc,
        },
        {
            name: 'Ads Link',
            selector: (row) => (
                <>
                    <Button>
                        <Link href={row?.ads_link} className="">
                            Shop Now
                        </Link>
                    </Button>
                </>
            ),
        },
        {
            name: 'Ads Type',
            selector: (row) => row?.ads_type,
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <Button>Edit</Button>
                    <DeleteAds ads_id={row?.ads_id} />
                </>
            ),
        },
    ];
    return (
        <div className="w-full">
            <DataTable
                data={promotional}
                columns={columns}
                highlightOnHover
                pagination
                pointerOnHover
            />
        </div>
    );
};

export default Promotional;
