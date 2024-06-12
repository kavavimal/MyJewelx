import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const collectionSchema = z.object({
  name: z.string().min(1, "collection name required").max(50),
  description: z.string().optional(),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");

    const collectionData = collectionSchema.parse({ name, description });

    const newCollection = await prisma.collection.create({
      data: collectionData,
    });

    return NextResponse.json(
      { message: "New product collection created successfully", newCollection },
      { status: 201 }
    );
  } catch (error) {
    if (error === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
