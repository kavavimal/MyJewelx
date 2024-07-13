import prisma from "@/lib/prisma";
import RoleForm from "../../components/RoleForm";

async function getRole(id) {
  try {
    const role = await prisma.role.findFirst({
      where: { role_id: Number(id) },
      include: {
        permissions: true,
      },
    });
    return role;
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
}

export const revalidate = 2;
async function getPermissions() {
  const fetchPermissions = await prisma.permission.findMany({});
  return fetchPermissions;
}

export default async function EditRolePage({ params: { id } }) {
  try {
    const role = await getRole(id);
    const permissions = await getPermissions();
    if (id && id !== "" && role !== null && typeof role == "object") {
      return <RoleForm role={role} permissions={permissions} />;
    } else {
      return <>No role found!!!</>;
    }
  } catch (error) {
    console.error("Error in EditRolePage:", error);
    return <>An unexpected error occurred!</>;
  }
}
