import prisma from "@/lib/prisma";
import Permissions from "./components/Permissions";

export const revalidate = 2;
async function getPermissions() {
  const fetchPermissions = await prisma.permission.findMany();
  return fetchPermissions;
}
const roles = async () => {
  const allPermissions = await getPermissions();
  return <Permissions permissions={allPermissions} />;
};

export default roles;
