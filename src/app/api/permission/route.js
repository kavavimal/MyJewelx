import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.formData();

    const name = req.get("permission_name");

    const exists = await prisma.permission.findFirst({
      where: { permission_name: permission_name },
    });

    if (exists) {
      return NextResponse.json(
        { error: `${permission_name} permission is already created` },
        { status: 400 }
      );
    }

    const description = req.get("description");

    const result = await prisma.permission.create({
      data: {
        permission_name: name ? String(name) : "",
        description: description ? String(description) : "",
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
