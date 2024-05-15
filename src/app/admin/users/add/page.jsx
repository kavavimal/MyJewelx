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
      <UserForm roles={roles} />
    </div>
  );
}
