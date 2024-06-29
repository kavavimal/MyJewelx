"use server";
import prisma from "@/lib/prisma";

export const getEmails = () => {
  return prisma.user.findMany({
    select: {
      email: true,
    },
  });
};
