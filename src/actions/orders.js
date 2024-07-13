"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";

export const getOrders = async () => {
  const user = await checkUserSession();
  try {
    const orderData = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        orderItems: true,
      },
    });
    return orderData;
  } catch (e) {
    return {
      message: "Something went wrong",
      status: "error",
      error: e,
    };
  }
};
