import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.formData();

    const name = res.get("permission_name");
    const description = res.get("description");

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
