import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema
const addCategorySchema = z.object({
  name: z.string().min(1, "Category name required").max(50),
  description: z.string().min(1, "Category description required").max(100),
  parent_id: z.union([z.string(), z.number(), z.null()]).optional(),
});

export async function POST(request) {
  try {
    // Extract form data
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");
    const parent_id = res.get("parent_id");

    // Parse and validate the data
    const parsedData = addCategorySchema.parse({
      name,
      description,
      parent_id: parent_id
        ? isNaN(Number(parent_id))
          ? parent_id
          : Number(parent_id)
        : null,
    });

    const exists = await prisma.category.findFirst({
      where: { name: parsedData.name },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Category with name ${parsedData.name} already exists.`,
        },
        { status: 405 }
      );
    }

    // Create a new category
    const result = await prisma.category.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
        parent_id: parsedData.parent_id,
      },
    });

    // Return the created result
    return NextResponse.json(
      { result },
      { message: "Category created successfully." },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    console.error("Error in POST:", error);
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
