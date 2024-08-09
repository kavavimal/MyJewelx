import prisma from "@/lib/prisma";
import { AcountType, PODStatus } from "@prisma/client";
import Link from "next/link";
import SearchPODForm from "./components/SearchPODForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PODItem from "./components/PODItem";
import { Suspense } from "react";

import AdsBanner from "@/components/frontend/AdsBanner";
import Container from "@/components/frontend/Container";
const getPODProducts = () =>
  prisma.productOnDemand.findMany({
    where: { Status: PODStatus.REQUESTED },
    include: {
      Images: true,
      user: true,
    },
  });

async function PODPage({ searchParams }) {
  const productsData = await getPODProducts();

  let products = productsData.filter((pod) => {
    let flag = true;
    if (searchParams.cat && searchParams.cat !== "") {
      flag = pod.name.toLowerCase().includes(searchParams.cat.toLowerCase());
    }
    if (flag && searchParams.filter && searchParams.filter !== "") {
      let nameSearch = pod.name
        .toLowerCase()
        .includes(searchParams.filter.toLowerCase());
      let descSearch = pod.description
        .toLowerCase()
        .includes(searchParams.filter.toLowerCase());
      flag = nameSearch && descSearch;
    }
    return flag;
  });

  const getAds = () =>
    prisma.promotional.findMany({
      where: {
        ads_type: "HOME_B",
      },
    });

  const ads = await getAds();
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex container items-center justify-between mt-5 flex-wrap ">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchPODForm />
        </Suspense>
        {session.user.role === AcountType.CUSTOMER ? (
          <div>
            <Link
              className="flex items-center gap-2 align-middle select-none text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-[16px] font-normal py-2.5 px-11 rounded-sm bg-red-100 text-base text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none "
              href="/product-on-demand/my-requests"
            >
              <svg
                className="mb-1 "
                width="14px"
                height="14px"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5013 6.83171H7.33464V10.9984C7.33464 11.2194 7.24684 11.4313 7.09056 11.5876C6.93428 11.7439 6.72232 11.8317 6.5013 11.8317C6.28029 11.8317 6.06833 11.7439 5.91205 11.5876C5.75577 11.4313 5.66797 11.2194 5.66797 10.9984V6.83171H1.5013C1.28029 6.83171 1.06833 6.74391 0.912047 6.58763C0.755766 6.43135 0.667969 6.21939 0.667969 5.99837C0.667969 5.77736 0.755766 5.5654 0.912047 5.40912C1.06833 5.25284 1.28029 5.16504 1.5013 5.16504H5.66797V0.998372C5.66797 0.777359 5.75577 0.565397 5.91205 0.409117C6.06833 0.252836 6.28029 0.165039 6.5013 0.165039C6.72232 0.165039 6.93428 0.252836 7.09056 0.409117C7.24684 0.565397 7.33464 0.777359 7.33464 0.998372V5.16504H11.5013C11.7223 5.16504 11.9343 5.25284 12.0906 5.40912C12.2468 5.5654 12.3346 5.77736 12.3346 5.99837C12.3346 6.21939 12.2468 6.43135 12.0906 6.58763C11.9343 6.74391 11.7223 6.83171 11.5013 6.83171Z"
                  fill="white"
                />
              </svg>
              Jewelex on Demand
            </Link>
            {/* <Link className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none " href="/product-on-demand/my-requests" >My Requests</Link>
                    <Link className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" href="/product-on-demand/create" >+ Add Product on Demand</Link> */}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex container flex-wrap gap-[20px] items-start justify-between pt-[20px] pb-[100px] ">
        <div className="w-[910px] max-w-[100%] flex-1">
          <div>
            {products.length > 0 ? (
              <div className="flex flex-col gap-[20px]">
                {products.map((p, index) => (
                  <PODItem key={"pod" + index} pod={p} />
                ))}
              </div>
            ) : (
              <div>No Requests Found</div>
            )}
          </div>
        </div>
        <div className="w-[350px] max-w-[100%] flex flex-row xl:flex-col items-center gap-[30px] sticky top-[120px]">
          {ads.map((adslist, index) => {
            return (
              <AdsBanner
                image={"/assets/images/static banner3.png"}
                // image={adslist.ads_img_url}
                title={adslist.ads_desc}
                link={{ link: adslist.ads_link, label: "Shop Now" }}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PODPage;
