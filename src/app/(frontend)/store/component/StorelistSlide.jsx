'use client';

import React from 'react';
import { Carousel, Typography } from '@material-tailwind/react';
import Link from 'next/link';

export default function StorelistSlide({ promolist }) {
    console.log(promolist);
    return (
        <div className="">
            <Carousel className="rounded">
                {promolist.length > 0 &&
                    promolist.map((promo, index) => {
                        return (
                            <div className="relative" key={index}>
                                <img
                                    src={promo.ads_img_url}
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
                                            {promo.ads_title}
                                        </Typography>
                                        <Typography
                                            variant="lead"
                                            className="mb-6 opacity-80 text-secondary-200 font-emirates"
                                        >
                                            {promo.ads_title}
                                        </Typography>
                                        <div className="flex gap-2">
                                            <Link
                                                size="lg"
                                                color="white"
                                                className="normal-case bg-primary-200 font-emirates font-bold"
                                                href={promo.ads_title}
                                            >
                                                Shop now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </Carousel>
        </div>
    );
}
