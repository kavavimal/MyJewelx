import React from "react";
import Vendors from "./components/Vendors";
import prisma from "@/lib/prisma";

export const revalidate = 2;
async function getVendors() {
  const fetchVendors = await prisma.user.findMany({
    include: {
      role: true,
    },
    where: {
      role_id : 2
    }
  });
  return fetchVendors;
}

const vendors = async () => {
  const allVendors = await getVendors();
  return <Vendors vendors={allVendors} />;
};

export default vendors;
