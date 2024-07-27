import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/sendMails";
import { NextResponse } from "next/server";

export async function POST(request) {
  const requestData = await request.formData();
  const order_id = requestData.get("order_id");

  try {
    const order = await prisma.order.findFirst({
      where: { id: Number(order_id) },
      include: {
        user: true,
        seller: {
          include: {
            user: {
              include: {
                vendor: true,
              },
            },
          },
        },
        orderItems: true,
      },
    });
    const user = order.user;
    let orderTotal = 0;
    if (order.orderItems.length > 0) {
      orderTotal = order.orderItems.reduce(
        (total, item) => parseFloat(total) + parseFloat(item.price),
        0
      );
    }
    let meta = { orderTotal };
    sendOrderEmail(user, order, meta);

    if (order && order.id) {
      return NextResponse.json(
        {
          success: true,
          message: `Order mail sent Successfully`,
          order,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}
