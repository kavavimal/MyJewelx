'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const TopVendors = () => {
    return (
        <>
            <section className="bg-primary-250 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="">
                        <h2 className="text-2xl font-semibold pb-12 font-playfairdisplay block">
                            Our Top Vendors
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
                                            James Mertagh Jewelers
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
                                            Stiquette Jewellery lnc
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
                                            Pure Diamond Jewelry
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
                                            Gold Rush Jewelers
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
                                            New Diamond Store
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

export default TopVendors;
