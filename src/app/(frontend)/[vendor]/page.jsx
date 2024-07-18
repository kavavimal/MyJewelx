import React from 'react';
import Image from 'next/image';

export default function StoreVendorPage({ params }) {
    return (
        <>
            <section className="py-6">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="border">
                        <div>
                            <Image
                                src="/assets/images/store-bg.png"
                                alt="Store Banner"
                                width={1000}
                                height={1000}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="flex p-5 items-center justify-between">
                            <div>
                                <Image
                                    src="/assets/images/store-bg.png"
                                    alt="Store Banner"
                                    width={100}
                                    height={100}
                                    className="w-[80px] h-[80px] rounded-full"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    Store Vendor page for {params.vendor}{' '}
                                </div>

                                <div>
                                    Store Vendor page for {params.vendor}{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
