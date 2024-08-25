import React from "react";
import StoreList from "./component/Storelist";
import prisma from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";
import StorelistSlide from "./component/StorelistSlide";
import { VENDOR_ID } from "@/utils/constants";
import { checkUserSession } from "../layout";

export const revalidate = 0;

const getVendors = () =>
  prisma.user.findMany({
    where: {
      role_id: VENDOR_ID,
    },
    include: {
      vendor: true,
      products: {
        include: {
          reviews: true,
        },
      },
      image: true,
      _count: {
        select: {
          products: true,
        },
      },
      likesReceived: true,
      _count: {
        select: {
          likesReceived: true,
          products: true,
        },
      },
    },
  });
const getPromoList = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "STORE",
    },
  });

export default async function Storelist() {
  const user = await checkUserSession();
  const vendors = await getVendors(user?.id);
  const promolist = await getPromoList();
  return (
    <>
      <div className="container pb-[69px] pt-[35px]">
        <StorelistSlide promolist={promolist} />
        <div className="border-b border-b-primary-200 py-[20px] mb-[30px]">
          <Breadcrumbs
            items={[
              {
                link: "/store",
                label: "Store list",
                current: true,
              },
            ]}
          />
        </div>
        <div className="flex items-start">
          {/* <div className="w-[230px]">
            <h3>Filter</h3>
          </div> */}
          <div className="flex-1">
            <StoreList vendors={vendors} />
          </div>
        </div>
      </div>
    </>
  );
}
