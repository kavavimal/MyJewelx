import React from "react";
import Contacts from "./components/Contacts";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { AcountType } from "@prisma/client";
export const revalidate = 0;
const checkUserSession = async () => {
  const session = await getServerSession();
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });
    return user;
  }
  return false;
};

const page = async () => {
  const user = await checkUserSession();
  if (user?.role?.role_name === AcountType.ADMIN) {
    const getContacts = await prisma.contact.findMany();
    return <Contacts contacts={getContacts} />;
  } else {
    const getContact = await prisma.contact.findMany({
      where: {
        vendorId: user?.id,
      },
    });
    return <Contacts contacts={getContact} />;
  }
};

export default page;
