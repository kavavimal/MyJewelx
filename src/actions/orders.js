"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

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

export const updateOrderStatus = async (orderid, newStatus) => {
  const { user } = await getServerSession(authOptions);
  try {
    const findorderData = await prisma.order.findFirst({
      where: {
        id: orderid,
      },
      include: {
        seller: true,
      },
    });
    if (!findorderData) {
      return {
        message: "Order not found or you not have access to this order",
        status: "error",
      };
    }
    const isSellerInOrder = findorderData.seller.some(
      (seller) => seller.user_id === user.id
    );
    if (!isSellerInOrder) {
      return {
        message: "Seller not associated with this order",
        status: "error",
      };
    }
    const orderData = await prisma.order.update({
      where: {
        id: orderid,
      },
      data: {
        status: newStatus,
      },
    });
    return { message: "Order Status Updated Succesfully", orderData };
  } catch (e) {
    return {
      message: "Something went wrong",
      status: "error",
      error: e,
    };
  }
};
