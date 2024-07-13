import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const addTagSchema = z.object({
  name: z.string().min(1, "Tag name required").max(50),
  description: z.string().min(1, "Tag description required").max(100),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");
    const parsedData = addTagSchema.parse({ name, description });

    const exists = await prisma.tag.findFirst({
      where: { name: parsedData.name },
    });

    if (exists) {
      return NextResponse.json(
        { message: `Tag Name with ${parsedData.name} is already exists.` },
        { status: 405 }
      );
    }

    const result = await prisma.tag.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
      },
    });

    return NextResponse.json(
      { result },
      { message: "New Tag created successfully." },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tags = await prisma.tag.findMany();
  return NextResponse.json({ tags, success: true }, { status: 200 });
}
