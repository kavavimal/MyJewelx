import React from "react";
import { getRoles } from "../../add/page";
import UserForm from "../../components/UserForm";

async function getUser(id) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
}
const UserEdit = async ({ params: { id } }) => {
  const roles = await getRoles();
  const user = await getUser(id);
  return <UserForm roles={roles} user={user} />;
};

export default UserEdit;
