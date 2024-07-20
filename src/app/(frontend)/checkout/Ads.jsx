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
                <div key={index} className="relative">
                  <Image
                    src={adslist.ads_img_url}
                    layout="responsive"
                    height={100}
                    width={100}
                    className="h-[100%] w-[100%]"
                  />
                  <div className="absolute left-10 top-14">
                    <h3 className="font-playfairdisplay font-semibold text-2xl">
                      {adslist.ads_desc}
                    </h3>
                    <Link href={adslist.ads_link}>Shop now</Link>
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
