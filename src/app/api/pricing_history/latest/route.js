import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestPricing = await prisma.pricingHistory.findFirst({
      orderBy: {
        created_at: "desc",
      },
    });

    if (!latestPricing) {
      return NextResponse.json(
        {
          message: "No pricing history found",
          latestPricing,
        },
        { status: 200 }
      );
    } else
      return NextResponse.json(
        {
          message: "Latest's prices for metal fetched successfully",
          latestPricing,
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
