'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

// const topVendors = await getVendors();
// console.log(topVendors);
const TopVendors = ({ vendors }) => {
    console.log(vendors);
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
                                {vendors.slice(0, 9).map((vendor) => {
                                    return (
                                        <li className="text-center">
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
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TopVendors;
