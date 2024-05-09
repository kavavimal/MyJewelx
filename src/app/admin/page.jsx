"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  console.log("session", session.data);
  return redirect("/admin/dashboard");
};

export default Page;
