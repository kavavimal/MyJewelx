import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

export const revalidate = 0;

const supportSchema = z.object({
  title: z.string().optional(),
  reasonType: z.string().optional(),
  reasonText: z.string().optional(),
  status: z.string().optional(),
  productId: z.number().optional(),
  orderId: z.number().optional().nullable(),
});

const checkUserSession = async () => {
  const session = await getServerSession();
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });
    return user;
  }
  return false;
};

export async function POST(request) {
  try {
    const user = await checkUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const req = await request.formData();
    const title = req.get("title");
    const reasonType = req.get("reasonType");
    const reasonText = req.get("reasonText");
    const status = req.get("status");
    const productId = req.get("productId")
      ? Number(req.get("productId"))
      : null;
    const orderId = req.get("orderId") ? Number(req.get("orderId")) : null;
    const supportData = supportSchema.parse({
      title,
      reasonType,
      reasonText,
      status,
      productId,
      orderId,
    });

    const result = await prisma.Support.create({
      data: {
        title: supportData.title,
        reasonType: supportData.reasonType,
        reasonText: supportData.reasonText,
        status: supportData.status,
        userId: user.id,
        productId: supportData.productId,
        orderId: supportData.orderId,
      },
    });

    return NextResponse.json({
      message: "Support record added successfully",
      result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: error.errors,
        },
        { status: 400 }
      );
    }
    console.log("error from catch", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await checkUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const supportData = await prisma.Support.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      support: supportData,
    });
  } catch (error) {
    console.error("Error fetching support data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching support data",
      },
      { status: 500 }
    );
  }
}
