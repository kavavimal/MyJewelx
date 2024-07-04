'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const TopVendors = ({ vendors }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <section className="bg-primary-250 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="">
                        <h2 className="text-2xl font-semibold pb-12 font-playfairdisplay block">
                            Our Top Vendors
                        </h2>
                        <div>
                            <div className="slider-container">
                                <Slider className="" {...settings}>
                                    {vendors.map((vendor, index) => {
                                        return (
                                            <div
                                                className="text-center"
                                                key={index}
                                            >
                                                <Link href="/">
                                                    <Image
                                                        src="/assets/images/latest-product.png"
                                                        width={100}
                                                        height={100}
                                                        className="mx-auto rounded-full"
                                                    ></Image>
                                                    <p className="py-5 text-base font-semibold	">
                                                        {vendor.firstName +
                                                            ' ' +
                                                            vendor.lastName}
                                                    </p>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TopVendors;
