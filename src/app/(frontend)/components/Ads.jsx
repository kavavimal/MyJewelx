"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Ads = ({ ads }) => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-6">
            {ads.map((adslist, index) => {
              return (
                <div key={index} className="relative h-[180px] w-[630px]">
                  <Image
                    src={adslist.ads_img_url}
                    layout="responsive"
                    height={630}
                    width={180}
                    className="h-full w-full"
                  />
                  <div className="absolute left-[30px] top-[45px]">
                    <h3 className="font-playfairdisplay font-semibold text-2xl">
                      {adslist.ads_desc}
                    </h3>
                    <Link
                      href={adslist.ads_link}
                      className="text-xs py-2 px-3.5 inline-block border border-black rounded font-bold mt-[15px]"
                    >
                      Shop now
                    </Link>
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
