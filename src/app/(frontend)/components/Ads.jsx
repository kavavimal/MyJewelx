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
                <div key={index} className="relative ">
                  <Image
                    src={adslist.ads_img_url}
                    // layout="responsive"
                    height={230}
                    width={630}
                    className="h-[230px] w-full"
                  />
                  <div className="absolute left-[30px] top-[45px] translate-x-0 translate-y-[40%]">
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
