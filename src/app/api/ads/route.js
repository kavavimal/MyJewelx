import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(request) {
  try {
    const req = await request.formData();
    const response = await prisma.promotional.findMany({
      where: {
        ads_type: req.get("type"),
      },
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (e) {
    console.log(e);
  }
}
