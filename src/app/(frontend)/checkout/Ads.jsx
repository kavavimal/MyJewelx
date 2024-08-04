"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Ads = ({ ads }) => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-start justify-center gap-6">
            {ads.map((adslist, index) => {
              return (
                <div key={index} className="relative">
                  <Image
                    src={adslist.ads_img_url}
                    alt={adslist.ads_desc}
                    layout="responsive"
                    height={100}
                    width={100}
                    className="h-[100%] w-[100%]"
                  />
                  <div className="absolute inset-0 flex items-center w-1/2 ms-[30px] text-black">
                    <div>
                      <h3 className="font-playfairdisplay font-semibold text-xl">
                        {adslist.ads_desc}
                      </h3>
                      <Link
                        href={adslist.ads_link}
                        className="text-xs py-1 px-2 inline-block border border-black rounded font-bold mt-2.5"
                      >
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Ads;
