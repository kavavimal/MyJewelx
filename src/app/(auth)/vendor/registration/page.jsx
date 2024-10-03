import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import { getStoreURLs } from "@/app/actions/vendor";
import { getEmails } from "@/app/actions/users";

const page = async () => {
  const storeURLs = await getStoreURLs();
  const emails = await getEmails();
  return <RegistrationForm storeURLs={storeURLs} emails={emails} />;
};

export default page;
