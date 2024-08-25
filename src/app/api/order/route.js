import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";
import { AcountType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await checkUserSession();
  if (user?.role.role_name === AcountType.VENDOR) {
    const orders = await prisma.user.findFirst({
      where: { id: user.id },
      include: {
        sellerOrders: {
          include: {
            order: {
              include: {
                user: true,
                orderItems: true,
                seller: { include: { user: true } },
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders: orders.sellerOrders.map((item) => item.order),
    });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal sever error", error },
      { status: 500 }
    );
  }
}
