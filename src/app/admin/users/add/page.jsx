import prisma from "@/lib/prisma";
import Link from "next/link";
import UserForm from "../components/UserForm";

export async function getRoles() {
  const roles = await prisma.role.findMany();
  return roles;
}

export default async function AddUser() {
  const roles = await getRoles();
  return (
    <div>
      <div className="flex items-center mb-10">
        <h2 className="text-2xl font-semibold">Add New User</h2>
      </div>

      <UserForm roles={roles} />
    </div>
  );
}
