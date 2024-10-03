"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const checkUserSession = async () => {
  const session = await getServerSession(authOptions);
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
        vendor: true,
        image: true,
      },
    });
    return user;
  }
  return false;
};

export const fetchCurrentUser = async () => {
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
        carts: true,
        // wishlist: true,
        // likes: true,
        vendor: true,
        image: true,
      },
    });
    return user;
  }
  return false;
};

export const getEmails = () => {
  return prisma.user.findMany({
    select: {
      email: true,
    },
  });
};
