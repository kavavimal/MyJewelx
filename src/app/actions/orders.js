"use server";
import { checkUserSession } from "./users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { OrderStatusMail } from "@/lib/sendMails";
import { getServerSession } from "next-auth";

export const getOrders = async () => {
  const user = await checkUserSession();
  try {
    const orderData = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        seller: {
          include: {
            user: true,
          },
        },
        orderItems: {
          include: {
            productVariation: {
              include: {
                image: true,
              },
            },
          },
        },
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

export const updateOrderStatus = async (orderid, newStatus, orderItem) => {
  const { user } = await getServerSession(authOptions);
  try {
    const findorderData = await prisma.order.findFirst({
      where: {
        id: orderid,
      },
      include: {
        seller: true,
        user: true,
      },
    });

    const billingAddress = JSON.parse(findorderData.billingAddress);
    const orderItems = orderItem;
    if (!findorderData) {
      return {
        message: "Order not found or you not have access to this order",
        status: "error",
      };
    }

    // const isSellerInOrder = findorderData.seller.some(
    //   (seller) => seller.user_id === user.id
    // );
    // if (!isSellerInOrder) {
    //   return {
    //     message: "Seller not associated with this order",
    //     status: "error",
    //   };
    // }
    const orderData = await prisma.order.update({
      where: {
        id: orderid,
      },
      data: {
        status: newStatus,
      },
    });

    await OrderStatusMail(
      {
        email: billingAddress.email,
        firstName: findorderData.user.firstName,
        lastName: findorderData.user.lastName,
      },
      {
        new: orderData?.status,
        prev: findorderData.status,
        order_id: orderData?.id,
        total_amount: orderData?.orderTotal,
      },
      {
        orderItem: orderItems,
      }
    );

    await OrderStatusMail(
      user,
      {
        new: orderData?.status,
        prev: findorderData.status,
        order_id: orderData?.id,
        total_amount: orderData?.orderTotal,
      },
      {
        orderItem: orderItems,
      }
    );
    return { message: "Order Status Updated Succesfully", orderData };
  } catch (e) {
    return {
      message: "Something went wrong",
      status: "error",
      error: e,
    };
  }
};
