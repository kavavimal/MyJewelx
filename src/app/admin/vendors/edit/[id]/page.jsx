import React from "react";
import VendorForm from "../../components/VendorForm";
import prisma from "@/lib/prisma";
import { getStoreURLs } from "@/actions/vendor";
import { getEmails } from "@/actions/users";

const getVendorById = (id) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      vendor: true,
    },
  });
};
const page = async ({ params: { id } }) => {
  const vendor = await getVendorById(id);
  const storeURLs = await getStoreURLs();
  const email = await getEmails();
  return <VendorForm vendor={vendor} emails={email} storeURLs={storeURLs} />;
};

export default page;
