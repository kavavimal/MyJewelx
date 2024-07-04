'use client';
import { post, update } from '@/utils/api';
import { Button, IconButton, Input } from '@material-tailwind/react';
import { Formik, useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
});
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DeleteSlide from './DeleteSlide';
const Homeslider = ({ homeslider }) => {
    const columns = [
        // {
        //     name: 'Image',
        //     selector: (row) => (
        //         <>
        //             <Image src={row?.image_url} width={50} height={50} />
        //         </>
        //     ),
        // },
        {
            name: 'Title',
            selector: (row) => row?.title,
        },
        {
            name: 'Description',
            selector: (row) => row?.description,
        },
        {
            name: 'Link',
            selector: (row) => (
                <>
                    <Button>
                        <Link href={row?.link_url} className="">
                            Shop Now
                        </Link>
                    </Button>
                </>
            ),
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <Button>Edit</Button>
                    <DeleteSlide id={row?.id} />
                </>
            ),
        },
    ];
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            link_url: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await post('/api/home_slider', values);
                if (response?.status === 200) {
                    enqueueSnackbar('Slide created successfully', {
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
                                        label="Title"
                                        type="text"
                                        name="title"
                                        value={formik.values?.title || ''}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Description"
                                        type="text"
                                        id="description"
                                        value={formik.values?.description || ''}
                                        name="description"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Link Url"
                                        type="text"
                                        name="link_url"
                                        value={formik.values?.link_url || ''}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="mb-2 w-1/2">
                                    <Input
                                        label="Description"
                                        type="file"
                                        id="description"
                                        value={formik.values?.description || ''}
                                        name="description"
                                        onChange={formik.handleChange}
                                    />
                                </div>
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
                data={homeslider}
                columns={columns}
                highlightOnHover
                pagination
                pointerOnHover
            />
        </div>
    );
};

export default Homeslider;
