import { redirect } from "next/navigation";
import { AcountType, UserStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { checkUserSession } from "../actions/users";

export default async function CheckUser() {
  const cookieStore = cookies();
  const redirectUrl = cookieStore?.get("redirect")?.value;
  const user = await checkUserSession();

  if (user) {
    if (
      user?.role?.role_name === AcountType.ADMIN ||
      (user?.role?.role_name === AcountType.VENDOR &&
        user?.status === UserStatus.ACTIVE)
    ) {
      redirect("/admin/dashboard");
    } else {
      redirect(redirectUrl ? redirectUrl : "/profile");
      cookieStore.delete("redirect");
    }
  } else {
    redirect(redirectUrl ? redirectUrl : "/login");
    cookieStore.delete("redirect");
  }

  return null;
}
