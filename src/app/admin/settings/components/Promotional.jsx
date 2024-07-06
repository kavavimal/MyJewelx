'use client';
import Image from 'next/image';
import { post, update } from '@/utils/api';
import { Button, IconButton, Input } from '@material-tailwind/react';
import { Formik, useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DeleteAds from './DeleteAds';
const Promotional = ({ promotional }) => {
    const columns = [
        // {
        //     name: 'Image',
        //     selector: (row) => (
        //         <>
        //             <Image src={row?.ads_img_url} width={50} height={50} />
        //         </>
        //     ),
        // },
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
    const formik = useFormik({
        initialValues: {
            ads_title: '',
            ads_desc: '',
            ads_link: '',
            ads_img_url: '',
            ads_type: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await post('/api/promotional', values);
                if (response?.status === 200) {
                    enqueueSnackbar('Ads created successfully', {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        autoHideDuration: 3000,
                        style: {
                            background: 'white',
                            color: 'black',
                            borderRadius: '.5rem',
                            boxShadow:
                                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            padding: '0 4px',
                        },
                    });
                }
                router.refresh();
                formik.resetForm();
            } catch (error) {
                console.log(error);
                enqueueSnackbar(error?.response?.data?.message, {
                    variant: 'error',
                    preventDuplicate: true,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 3000,
                    style: {
                        background: 'white',
                        color: 'black',
                        borderRadius: '.5rem',
                        boxShadow:
                            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        padding: '0 4px',
                    },
                });
            }
        },
    });
    return (
        <div className="w-full">
            <div className="mt-10 rounded-2xl shadow-3xl bg-white">
                <Formik initialValues={formik.initialValues}>
                    <form
                        onSubmit={formik.handleSubmit}
                        className=" rounded p-7 mb-4"
                    >
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Ads Title"
                                        type="text"
                                        name="ads_title"
                                        value={formik.values?.ads_title || ''}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Ads Description"
                                        type="text"
                                        value={formik.values?.ads_desc || ''}
                                        name="ads_desc"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Ads Link"
                                        type="text"
                                        name="ads_link"
                                        value={formik.values?.ads_link || ''}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {/* <div className="mb-2 w-1/2">
                                    <Input
                                        label="Ads Type"
                                        type="text"
                                        value={formik.values?.ads_type || ''}
                                        name="ads_type"
                                        onChange={formik.handleChange}
                                    />
                                </div> */}
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="submit"
                                    loading={formik.isSubmitting}
                                >
                                    Add {/* {tag ? 'Update' : 'Add'} */}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Formik>
            </div>
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
