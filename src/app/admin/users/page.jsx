import React from "react";
import Users from "./components/Users";

export const revalidate = 2;
async function getUsers() {
  const fetchUsers = await prisma.user.findMany({
    include: {
      role: true,
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
