import React from "react";
import Users from "./components/Users";
import prisma from "@/lib/prisma";

export const revalidate = 0;
async function getUsers() {
  const fetchUsers = await prisma.user.findMany({
    include: {
      role: true,
      image: true,
    },
    where: {
      role_id: 3,
    },
  });
  return fetchUsers;
}

const users = async () => {
  const allUsers = await getUsers();
  return <Users users={allUsers} />;
};

export default users;
