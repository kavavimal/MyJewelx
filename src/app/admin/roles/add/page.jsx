import React from "react";
import RoleForm from "../components/RoleForm";

export const revalidate = 2;
async function getPermissions() {
  const fetchPermissions = await prisma.permission.findMany({});
  return fetchPermissions;
}

const AddRolePage = async () => {
  const allPermissions = await getPermissions();
  return <RoleForm permissions={allPermissions} />;
};

export default AddRolePage;
