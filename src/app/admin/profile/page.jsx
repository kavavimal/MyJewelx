import { getEmails } from "@/actions/users";
import {
  getAccountNumbers,
  getLicenseNumbers,
  getStoreURLs,
} from "@/actions/vendor";
import PaymentSetup from "@/app/(auth)/vendor/details/components/PaymentSetup";
import StoreSetup from "@/app/(auth)/vendor/details/components/StoreSetup";
import { checkUserSession } from "@/app/(frontend)/layout";
import { AcountType } from "@prisma/client";
import React from "react";
import VendorForm from "../vendors/components/VendorForm";

const page = async () => {
  const user = await checkUserSession();
  const accountNumbers = await getAccountNumbers();
  const licenseNumbers = await getLicenseNumbers();
  const storeURLs = await getStoreURLs();
  const emails = await getEmails();
  if (user.role?.role_name === AcountType.ADMIN) {
    return <h1>Admin Profile</h1>;
  } else if (user.role?.role_name === AcountType.VENDOR) {
    return (
      <section>
        <h4 className="text-2xl font-semibold">Profile</h4>
        <div className="grid gap-7 items-start py-7 grid-cols-2">
          <div className="col-span-2">
            <VendorForm
              vendor={user}
              storeURLs={storeURLs}
              emails={emails}
              FormHeader={false}
            />
          </div>
          <StoreSetup vendor={user?.vendor} licenseNumbers={licenseNumbers} />
          <PaymentSetup vendor={user?.vendor} accountNumbers={accountNumbers} />
        </div>
      </section>
    );
  }
};

export default page;
