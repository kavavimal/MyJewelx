import { getEmails } from "@/actions/users";
import {
  getAccountNumbers,
  getLicenseNumbers,
  getStoreURLs,
} from "@/actions/vendor";
import PaymentSetup from "@/app/(auth)/vendor/details/components/PaymentSetup";
import StoreSetup from "@/app/(auth)/vendor/details/components/StoreSetup";
import { checkUserSession } from "@/app/(frontend)/layout";
import VendorForm from "@/app/admin/vendors/components/VendorForm";
import { AcountType, UserStatus } from "@prisma/client";
import React from "react";
import Profile from "./components/Profile";
import Link from "next/link";

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
        <div className="container">
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
          <h4 className="text-2xl font-semibold">Profile</h4>
          <Link href="/profile/orders">Orders</Link>
          <Profile user={user} />
        </div>
      </section>
    );
  }
};

export default page;
