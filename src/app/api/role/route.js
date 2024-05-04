import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.formData();

    const name = res.get("name");
    const description = res.get("description");

    const result = await prisma.role.create({
      data: {
        role_name: name ? String(name) : "",
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
