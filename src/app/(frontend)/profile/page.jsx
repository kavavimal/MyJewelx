import PaymentSetup from "@/app/(auth)/vendor/details/components/PaymentSetup";
import StoreSetup from "@/app/(auth)/vendor/details/components/StoreSetup";
import VendorForm from "@/app/admin/vendors/components/VendorForm";
import { AcountType } from "@prisma/client";
import React from "react";
import Profile from "./components/Profile";
import { AddressType } from "@prisma/client";
import Address from "./components/Address";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import {
  getAccountNumbers,
  getLicenseNumbers,
  getStoreURLs,
} from "@/app/actions/vendor";
import { checkUserSession, getEmails } from "@/app/actions/users";
import prisma from "@/lib/prisma";
export const revalidate = 0;
const getUserAddress = (uid) =>
  prisma.address.findFirst({
    where: { userId: uid, type: AddressType.SHIPPING },
  });
const page = async () => {
  const user = await checkUserSession();
  const accountNumbers = await getAccountNumbers();
  const licenseNumbers = await getLicenseNumbers();
  const storeURLs = await getStoreURLs();
  const emails = await getEmails();
  const addresses = await getUserAddress(user.id);
  if (user.role?.role_name === AcountType.ADMIN) {
    return <h1>Admin Profile</h1>;
  } else if (user.role?.role_name === AcountType.VENDOR) {
    return (
      <section>
        <div className="container">
          <h4 className="text-2xl font-semibold mt-3">Profile</h4>
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
            <PaymentSetup
              vendor={user?.vendor}
              accountNumbers={accountNumbers}
            />
          </div>
        </div>
      </section>
    );
  } else if (user.role?.role_name === AcountType.CUSTOMER) {
    return (
      <section>
        <div className="container">
          <div className="py-10">
            <Breadcrumbs autoBread={true} showDevider={true} />
            <div className="flex items-center gap-4 pb-3">
              <h4 className="text-2xl font-semibold pb-3">Profile</h4>
            </div>
            <Profile user={user} />
            <Address addresses={addresses} user={user} />
          </div>
        </div>
      </section>
    );
  }
};

export default page;
