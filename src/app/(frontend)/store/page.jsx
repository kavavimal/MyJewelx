import React from "react";
import StoreList from "./components/StoreList";
import prisma from "@/lib/prisma";
import StorelistSlide from "./components/StorelistSlide";
import { VENDOR_ID } from "@/utils/constants";
import FilterVendor from "./components/FilterVendor";
import { attributeIDs } from "@/utils/constants";
import { checkUserSession } from "@/app/actions/users";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { UserStatus } from "@prisma/client";

export const revalidate = 0;

const getFilterableDatas = async () => {
  const vendors = await prisma.user.findMany({
    where: {
      role_id: VENDOR_ID,
      status: UserStatus.ACTIVE,
    },
    include: {
      vendor: true,
      reviews: true,
      products: {
        include: {
          variations: {
            include: {
              orderItems: true,
              image: true,
            },
          },
          reviews: true,
        },
      },
      image: true,
      _count: {
        select: {
          products: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
      likesReceived: true,
      _count: {
        select: {
          likesReceived: true,
          products: true,
          reviews: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({});

  const metals = await prisma.attributeValue.findMany({
    where: {
      attribute_id: attributeIDs.MATERIAL,
    },
  });

  const karats = await prisma.attribute.findMany({
    include: {
      values: true,
    },
    where: {
      attribute_id: {
        equals: attributeIDs.GOLDKARAT,
      },
    },
  });

  const patterns = await prisma.pattern.findMany();
  const characteristics = await prisma.characteristic.findMany();
  const collections = await prisma.collection.findMany();
  const tags = await prisma.tag.findMany();

  return {
    vendors,
    categories,
    metals,
    patterns,
    characteristics,
    collections,
    karats,
    tags,
  };
};
const getVendors = () =>
  prisma.user.findMany({
    where: {
      role_id: VENDOR_ID,
      status: UserStatus.ACTIVE,
    },
    include: {
      vendor: true,
      reviews: true,
      products: {
        include: {
          variations: {
            include: {
              orderItems: true,
              image: true,
            },
          },
          reviews: true,
          tags: true,
          collections: true,
        },
      },
      image: true,
      banner_image: true,
      _count: {
        select: {
          products: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
      likesReceived: true,
      _count: {
        select: {
          likesReceived: true,
          products: true,
          reviews: true,
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

export default async function Store() {
  const user = await checkUserSession();

  const vendors = await getVendors(user?.id);
  const promolist = await getPromoList();

  // const product = await searchVendors();

  const filteredDatas = await getFilterableDatas();

  return (
    <>
      <div className="container pb-[30px] sm:pb-[69px] pt-[35px]">
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
          <div
            className="w-[229px] max-h-[84vh] sticky overflow-auto pr-[16px] lg:block hidden"
            style={{ position: "sticky", top: "120px" }}
          >
            <FilterVendor filterdDatas={filteredDatas} />
          </div>
          <div className="pl-2.5 flex-1">
            <StoreList vendors={vendors} />
          </div>
        </div>
      </div>
    </>
  );
}
