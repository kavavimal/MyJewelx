import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.formData();

    const name = res.get("name");
    const description = res.get("description");

    const result = await prisma.category.create({
      data: {
        name: name ? String(name) : "",
        description: description ? String(description) : "",
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
