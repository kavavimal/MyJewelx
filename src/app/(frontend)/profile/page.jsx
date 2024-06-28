import PaymentSetup from "@/app/(auth)/vendor/details/components/PaymentSetup";
import StoreSetup from "@/app/(auth)/vendor/details/components/StoreSetup";
import { checkUserSession } from "@/app/(frontend)/layout";
import { AcountType } from "@prisma/client";
import React from "react";

const page = async () => {
  const user = await checkUserSession();
  if (user.role?.role_name === AcountType.ADMIN) {
    return <h1>Admin Profile</h1>;
  } else if (user.role?.role_name === AcountType.VENDOR) {
    return (
      <section>
        <div className="container">
          <h4 className="text-2xl font-semibold">Profile</h4>
          <div className="grid gap-7 items-start py-7 grid-cols-2">
            <StoreSetup vendor={user?.vendor} />
            <PaymentSetup vendor={user?.vendor} />
          </div>
        </div>
      </section>
    );
  }
};

export default page;
