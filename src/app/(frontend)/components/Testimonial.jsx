'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Testimonial = () => {
    return (
        <>
            <section className=" py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="">
                        <h2 className="text-2xl font-semibold pb-12 font-playfairdisplay block">
                            Testimonials
                        </h2>
                        <div>
                            <ul className="flex items-center justify-between">
                                <li className="">
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
                                </li>
                                <li className="">
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
                                </li>
                                <li className="">
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
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
