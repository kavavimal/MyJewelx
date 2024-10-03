import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

export const revalidate = 0;

const supportSchema = z.object({
  status: z.string(),
  response: z.string(),
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

export async function PUT(request, { params }) {
  try {
    const user = await checkUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const support_id = Number(params.id);
    const support = await prisma.Support.findUnique({
      where: { id: support_id },
    });
    if (!support) {
      return NextResponse.json(
        {
          error: `Couldn't find Support with support_id ${support_id}`,
        },
        { status: 400 }
      );
    }

    const req = await request.formData();
    const response = req.get("response");
    const status = req.get("status");
    const supportData = supportSchema.parse({
      status,
      response,
    });

    const result = await prisma.Support.update({
      where: { id: support_id },
      data: supportData,
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
