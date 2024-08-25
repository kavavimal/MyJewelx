import prisma from "@/lib/prisma";
import { VENDOR_ID } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.user.findMany({
      where: {
        role_id: VENDOR_ID,
      },
      include: {
        vendor: true,
      },
    });

    return NextResponse.json({ success: true, vendors: response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
