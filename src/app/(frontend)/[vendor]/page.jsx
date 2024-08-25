import React from "react";
import Image from "next/image";
import StorePage from "./components/StorePage";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getVendor = async (firstName = "", lastName = "", storeName = "") => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          firstName: {
            equals: firstName,
          },
          lastName: {
            equals: lastName,
          },
        },
        {
          vendor: {
            store_name: {
              equals: storeName,
            },
          },
        },
      ],
    },
    include: {
      image: true,
      likes: true,
      vendor: true,
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
    },
  });
};

const getStoreReview = async (id) => {
  return prisma.review.findMany({
    where: {
      userId: id,
    },
    include: {
      fromUser: {
        include: {
          image: true,
        },
      },
    },
  });
};
export default async function StoreVendorPage({ params }) {
  const vendorName = decodeURIComponent(params.vendor).replace(/\s+/g, " ");
  const firstName = vendorName.split(" ")[0];
  const lastName = vendorName.split(" ")[1];
  const vendor = await getVendor(firstName, lastName, vendorName);
  // console.log(vendor);
  const reviews = await getStoreReview(vendor?.id);

  return (
    <>
      <StorePage vendor={vendor} reviews={reviews} />
    </>
  );
}
