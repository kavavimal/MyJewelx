import React from "react";
import VendorForm from "../components/VendorForm";
import { getStoreURLs } from "@/actions/vendor";
import { getEmails } from "@/actions/users";

const page = async () => {
  const storeURLs = await getStoreURLs();
  const emails = await getEmails();
  return <VendorForm storeURLs={storeURLs} emails={emails} />;
};

export default page;
