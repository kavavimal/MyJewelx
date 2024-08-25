import React from "react";
import Vendors from "./components/Vendors";
import prisma from "@/lib/prisma";
import { VENDOR_ID } from "@/utils/constants";

export const revalidate = 0;
async function getVendors() {
  const fetchVendors = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      vendor: true,
      role: true,
      image: true,
    },
    where: {
      role_id: VENDOR_ID,
    },
  });
  return fetchVendors;
}

const vendors = async () => {
  const allVendors = await getVendors();
  return <Vendors vendors={allVendors} />;
};

export default vendors;
