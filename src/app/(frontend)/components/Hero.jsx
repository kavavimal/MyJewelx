'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
    Carousel,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from '@material-tailwind/react';
import category from '@/app/admin/category/page';

const Hero = ({ categories, homeSlide, promolist, vendors }) => {
    console.log(vendors);
    return (
        <>
            <section className="bg-primary-250 py-5">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-start justify-between gap-5">
                        <div className="w-[220px]">
                            <ul className="border border-primary-200 rounded-sm relative">
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
                                {categories &&
                                    categories.length > 0 &&
                                    categories
                                        .filter(
                                            (category) =>
                                                category.parent_id === null
                                        )
                                        .slice(0, 9)
                                        .map((category, index) => {
                                            const id = category.category_id;
                                            return (
                                                <React.Fragment key={index}>
                                                    <Menu
                                                        placement="right"
                                                        allowHover
                                                        offset={{
                                                            mainAxis: 20,
                                                            crossAxis:
                                                                index === 0
                                                                    ? 137
                                                                    : index ===
                                                                      1
                                                                    ? 96
                                                                    : index ===
                                                                      2
                                                                    ? 55
                                                                    : index ===
                                                                      3
                                                                    ? 15
                                                                    : index ===
                                                                      4
                                                                    ? -27
                                                                    : index ===
                                                                      5
                                                                    ? -68
                                                                    : index ===
                                                                      6
                                                                    ? -107
                                                                    : index ===
                                                                      7
                                                                    ? -148
                                                                    : index ===
                                                                      8
                                                                    ? -189
                                                                    : 0,
                                                            alignmentAxis: 0,
                                                        }}
                                                        dismiss={{
                                                            itemPress: false,
                                                        }}
                                                    >
                                                        <MenuHandler>
                                                            <li
                                                                key={index}
                                                                className="flex items-center gap-2 hover:border-s-[3px] hover:border-s-primary-200 h-9 p-5 bg-white border-b cursor-pointer hover:bg-primary-300 transition-all"
                                                            >
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
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                                                                    ></path>
                                                                </svg>
                                                                <p className="text-sm">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </p>
                                                            </li>
                                                        </MenuHandler>
                                                        <MenuList className="bg-white p-4 h-[400px] w-[800px] rounded-sm outline-0 hover:outline-0">
                                                            <div className="grid grid-cols-2 gap-x-48 gap-y-3">
                                                                <div className="w-[309px]">
                                                                    <div className="relative mb-4">
                                                                        <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </h3>
                                                                        <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                                                    </div>
                                                                    <div className="flex items-center flex-wrap gap-x-[88px] gap-y-3">
                                                                        {categories
                                                                            .filter(
                                                                                (
                                                                                    subcategory
                                                                                ) =>
                                                                                    subcategory.parent_id ===
                                                                                    id
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    subcategory,
                                                                                    i
                                                                                ) => {
                                                                                    return (
                                                                                        <p
                                                                                            className="text-base"
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                subcategory.name
                                                                                            }
                                                                                        </p>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="w-[257px]">
                                                                    <div className="relative mb-4">
                                                                        <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                                                            Collection
                                                                        </h3>
                                                                        <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <p className="text-base">
                                                                            Featured
                                                                            Products
                                                                        </p>
                                                                        <p className="text-base">
                                                                            Popular
                                                                            Products
                                                                        </p>
                                                                        <p className="text-base">
                                                                            New
                                                                            Products
                                                                        </p>
                                                                        <p className="text-base">
                                                                            Best
                                                                            Selling
                                                                            Product
                                                                        </p>
                                                                        <p className="text-base">
                                                                            Eyeglass
                                                                            chain
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <div className="relative mb-4">
                                                                        <h3 className="text-lg text-black pb-4 border-b border-[#E6E6E6]">
                                                                            Popular
                                                                            Stores
                                                                        </h3>
                                                                        <div className="border border-primary-200 absolute bottom-[0.08px] min-w-16 rounded-full"></div>
                                                                    </div>
                                                                    <div className="flex gap-[30px]">
                                                                        {vendors
                                                                            .slice(
                                                                                0,
                                                                                4
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    list,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="bg-clip-border overflow-hidden rounded-sm"
                                                                                        >
                                                                                            <Image
                                                                                                src={
                                                                                                    list
                                                                                                        .image
                                                                                                        ?.path ??
                                                                                                    '/assets/images/vendor1.jpg'
                                                                                                }
                                                                                                height={
                                                                                                    100
                                                                                                }
                                                                                                width={
                                                                                                    100
                                                                                                }
                                                                                                className="w-20 h-20"
                                                                                            />
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </MenuList>
                                                    </Menu>
                                                </React.Fragment>
                                            );
                                        })}
                            </ul>
                        </div>
                        <div className="w-[800px]">
                            <Carousel className="rounded">
                                {homeSlide.map((slide, index) => {
                                    return (
                                        <div className="relative" key={index}>
                                            <img
                                                src={slide.image_url}
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
                                                        {slide.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="lead"
                                                        className="mb-6 opacity-80 text-secondary-200 font-emirates"
                                                    >
                                                        {slide.description}
                                                    </Typography>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            size="lg"
                                                            color="white"
                                                            className="normal-case bg-primary-200 font-emirates font-bold"
                                                            href={
                                                                slide.link_url
                                                            }
                                                        >
                                                            <Button className="rounded-md hover:shadow-none">
                                                                Shop now
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </div>
                        <div className="w-[220px]">
                            {promolist.slice(0, 2).map((promo, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="relative flex flex-col gap-4"
                                    >
                                        <Image
                                            src={promo.ads_img_url}
                                            width={100}
                                            height={100}
                                            className="w-full h-[182px] object-cover mb-5"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <p className="text-base font-playfairdisplay font-semibold w-4/5 ">
                                                {promo.ads_title}
                                            </p>
                                            <Link
                                                href={promo.ads_link}
                                                className="text-xs py-1 px-2 inline-block border border-black rounded-sm mt-2.5"
                                            >
                                                Shop now
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
