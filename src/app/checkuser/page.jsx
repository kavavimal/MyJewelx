import { redirect } from "next/navigation";
import { checkUserSession } from "../(frontend)/layout";
import { USER_ROLES } from "@/lib/constants";

export default async function CheckUser() {
  const user = await checkUserSession();
  if (user) {
    if (user?.role?.role_name === USER_ROLES.ADMIN || user?.role?.role_name === USER_ROLES.VENDOR) {
      redirect("/admin/dashboard");
    // } else if (user?.role?.role_name === USER_ROLES.VENDOR) {
    //   redirect("/vendor");
    } else {
      redirect("/");
    }
  } else {
    redirect("/");
  }
  return <></>;
}
