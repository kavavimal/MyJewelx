import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(params.order_id) },
      include: {
        user: true,
        orderItems: true,
        seller: { include: { user: true } },
      },
    });
    return NextResponse.json({
      success: true,
      order: order,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal sever error", error },
      { status: 500 }
    );
  }
}
