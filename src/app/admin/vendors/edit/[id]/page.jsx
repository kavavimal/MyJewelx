import React from "react";
import VendorForm from "../../components/VendorForm";
import prisma from "@/lib/prisma";
import {
  getAccountNumbers,
  getLicenseNumbers,
  getStoreURLs,
} from "@/actions/vendor";
import { getEmails } from "@/actions/users";
import StoreSetup from "@/app/(auth)/vendor/details/components/StoreSetup";
import PaymentSetup from "@/app/(auth)/vendor/details/components/PaymentSetup";

export const revalidate = 0;

const getVendorById = (id) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      vendor: true,
      image: true,
    },
  });
};
const page = async ({ params: { id } }) => {
  const vendor = await getVendorById(id);
  const accountNumbers = await getAccountNumbers();
  const storeURLs = await getStoreURLs();
  const licenseNumbers = await getLicenseNumbers();
  const email = await getEmails();
  return (
    <>
      <VendorForm vendor={vendor} emails={email} storeURLs={storeURLs} />
      <div className="grid grid-cols-2 gap-5 items-start mt-5">
        <StoreSetup vendor={vendor?.vendor} licenseNumbers={licenseNumbers} />
        <PaymentSetup vendor={vendor?.vendor} accountNumbers={accountNumbers} />
      </div>
    </>
  );
};

export default page;
