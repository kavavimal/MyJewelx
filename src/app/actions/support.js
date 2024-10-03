"use server";
import prisma from "@/lib/prisma";
import { checkUserSession } from "./users";

export const getSupports = async () => {
  const user = await checkUserSession();
  try {
    const support = await prisma.Support.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        product: true,
        order: true,
      },
    });

    return support;
  } catch (e) {
    return {
      message: "Something went wrong",
      status: "error",
      error: e,
    };
  }
};
