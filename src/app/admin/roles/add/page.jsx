import React from "react";
import RoleForm from "../components/RoleForm";
import prisma from "@/lib/prisma";

export const revalidate = 0;
async function getPermissions() {
  const fetchPermissions = await prisma.permission.findMany({});
  return fetchPermissions;
}

const AddRolePage = async () => {
  const allPermissions = await getPermissions();
  return <RoleForm permissions={allPermissions} />;
};

export default AddRolePage;
