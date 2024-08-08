import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
