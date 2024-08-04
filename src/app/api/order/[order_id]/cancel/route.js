import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    // TODO: get user and check session, only own order can be cancelled
    // validate cancel requirements

    const order_id = Number(params.order_id);

    const order = await prisma.order.findUnique({
      where: {
        id: order_id,
        status: { in: [OrderStatus.PROCESSING, OrderStatus.PENDING] },
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: `Couldn't find order or your order is not cancellable` },
        { status: 400 }
      );
    }
    const result = await prisma.order.update({
      where: { id: order_id },
      data: { status: OrderStatus.USERCANCELLED },
    });

    // TODO: Send mail to seller about order cancel update and update quantity to variation for order
    order.orderItems.forEach(async (item) => {
      const nq = await prisma.productVariation.update({
        where: { variation_id: item.productVariationId },
        data: { quantity: { increment: item.quantity } },
      });
    });
    return NextResponse.json(
      { message: "Order Canceled successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal sever error", error },
      { status: 500 }
    );
  }
}
