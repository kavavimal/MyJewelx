import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/dashboard/home");
};

export default page;
