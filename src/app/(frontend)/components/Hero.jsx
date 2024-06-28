'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Carousel, Typography, Button } from '@material-tailwind/react';

const Hero = ({ categories }) => {
    return (
        <>
            <section className="bg-primary-250 py-5">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-center justify-between gap-5">
                        <div className="w-[220]">
                            <ul className="border border-primary-200 rounded-sm	">
                                <li className="flex items-center gap-2 h-9 p-5 border-b">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                                        ></path>
                                    </svg>{' '}
                                    <p className="text-sm">All Categories</p>
                                </li>
                                {categories.slice(0, 9).map((category) => {
                                    return (
                                        <li className="flex items-center gap-2 h-9 p-5 bg-white border-b">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                                                ></path>
                                            </svg>
                                            <p className="text-sm">
                                                {category.name}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="w-[800]">
                            <Carousel className="rounded">
                                <div className="relative ">
                                    <img
                                        src="/assets/images/banner.png"
                                        alt="image 2"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 grid items-center">
                                        <div className="w-2/3 pl-24">
                                            <Typography
                                                variant="h1"
                                                color="black"
                                                className="mb-4 text-3xl  font-playfairdisplay"
                                            >
                                                WHITE GOLD RINGS
                                            </Typography>
                                            <Typography
                                                variant="lead"
                                                className="mb-6 opacity-80 text-secondary-200 font-emirates"
                                            >
                                                Discover the elegance of our
                                                exquisite gold earrings
                                                collection.
                                            </Typography>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="lg"
                                                    color="white"
                                                    className="normal-case bg-primary-200 font-emirates font-bold"
                                                >
                                                    Shop now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative ">
                                    <img
                                        src="/assets/images/banner.png"
                                        alt="image 2"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 grid items-center">
                                        <div className="w-2/3 pl-24">
                                            <Typography
                                                variant="h1"
                                                color="black"
                                                className="mb-4 text-3xl  font-playfairdisplay"
                                            >
                                                WHITE GOLD RINGS
                                            </Typography>
                                            <Typography
                                                variant="lead"
                                                className="mb-6 opacity-80 text-secondary-200 font-emirates"
                                            >
                                                Discover the elegance of our
                                                exquisite gold earrings
                                                collection.
                                            </Typography>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="lg"
                                                    color="white"
                                                    className="normal-case bg-primary-200 font-emirates font-bold"
                                                >
                                                    Shop now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative ">
                                    <img
                                        src="/assets/images/banner.png"
                                        alt="image 2"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 grid items-center">
                                        <div className="w-2/3 pl-24">
                                            <Typography
                                                variant="h1"
                                                color="black"
                                                className="mb-4 text-3xl  font-playfairdisplay"
                                            >
                                                WHITE GOLD RINGS
                                            </Typography>
                                            <Typography
                                                variant="lead"
                                                className="mb-6 opacity-80 text-secondary-200 font-emirates"
                                            >
                                                Discover the elegance of our
                                                exquisite gold earrings
                                                collection.
                                            </Typography>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="lg"
                                                    color="white"
                                                    className="normal-case bg-primary-200 font-emirates font-bold"
                                                >
                                                    Shop now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                        <div className="w-[220]">
                            <div className="relative flex flex-col gap-4">
                                <Image
                                    src="/assets/images/dimond.jfif"
                                    width={100}
                                    height={182}
                                    className="w-full h-[182] object-cover mb-5"
                                />
                                <div className="absolute top-6 left-6">
                                    <p className="text-base font-playfairdisplay font-semibold w-4/5 ">
                                        Discover the latest product
                                    </p>
                                    <Link
                                        href="/"
                                        className="text-xs py-1 px-2 inline-block border border-black rounded-sm mt-2.5"
                                    >
                                        Shop now
                                    </Link>
                                </div>
                            </div>
                            <div className="relative flex flex-col gap-4">
                                <Image
                                    src="/assets/images/latest-product.png"
                                    width={100}
                                    height={182}
                                    className="w-full h-[182] object-cover mb-5"
                                />
                                <div className="absolute top-6 left-6">
                                    <p className="text-base font-playfairdisplay font-semibold w-4/5">
                                        Discover the latest product
                                    </p>
                                    <Link
                                        href="/"
                                        className="text-xs py-1 px-2 inline-block border border-black rounded-sm mt-2.5"
                                    >
                                        Shop now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
