import React from "react";
import DetailsForm from "./components/DetailsForm";
import { getAccountNumbers, getLicenseNumbers } from "@/app/actions/vendor";

const page = async () => {
  const accountNumbers = await getAccountNumbers();
  const licenseNumbers = await getLicenseNumbers();
  return (
    <DetailsForm
      accountNumbers={accountNumbers}
      licenseNumbers={licenseNumbers}
    />
  );
};

export default page;
