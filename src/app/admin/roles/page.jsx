import Roles from "@/components/Roles";
import React from "react";
import prisma from "@/lib/prisma";

export const revalidate = 2;
async function getRoles() {
  const fetchRoles = await prisma.role.findMany();
  return fetchRoles;
}
const roles = async() => {
  const allRoles = await getRoles();
  return <Roles roles={allRoles} />;
};

export default roles;
