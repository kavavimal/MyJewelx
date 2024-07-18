'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Testimonial = ({ homeSlide }) => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 3,
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
            <section className="py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="">
                        <h2 className="text-2xl font-semibold pb-12 font-playfairdisplay block">
                            Testimonials
                        </h2>
                        <div>
                            <Slider className="" {...settings}>
                                <div className="text-center border">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/latest-product.png"
                                            width={100}
                                            height={100}
                                            className="mx-auto rounded-full"
                                        ></Image>
                                        <p className="py-5 text-base font-semibold	">
                                            Fantastic shopping experience at my
                                            Jewlex. The staff was incredibly
                                            helpful, and my bracelet is even
                                            more gorgeous in person.
                                        </p>
                                    </Link>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
