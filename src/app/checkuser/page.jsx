import { redirect } from "next/navigation";
import { checkUserSession } from "../(frontend)/layout";
import { AcountType } from "@prisma/client";

export default async function CheckUser() {
  const user = await checkUserSession();
  if (user) {
    if (
      user?.role?.role_name === AcountType.ADMIN ||
      user?.role?.role_name === AcountType.VENDOR
    ) {
      redirect("/admin/dashboard");
      // } else if (user?.role?.role_name === AcountType.VENDOR) {
      //   redirect("/vendor");
    } else {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  return null;
}
