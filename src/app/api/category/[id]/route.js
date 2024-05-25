import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for updating a category
const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name required").max(50),
  description: z.string().min(1, "Category description required").max(100),
  parent_id: z.union([z.string(), z.number(), z.null()]).optional(),
});

export const PUT = async (request, { params }) => {
  try {
    const category_id = Number(params.id);
    const res = await request.formData();

    const name = res.get("name");
    const description = res.get("description");
    const parent_id = res.get("parent_id");

    // Parse and validate the incoming data
    const parsedData = updateCategorySchema.parse({
      name,
      description,
      parent_id: parent_id
        ? isNaN(Number(parent_id))
          ? parent_id
          : Number(parent_id)
        : null,
    });

    // Check if a category with the same name already exists (excluding the current category)
    const exists = await prisma.category.findFirst({
      where: {
        name: parsedData.name,
        NOT: {
          category_id: category_id,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: `Category with name ${parsedData.name} already exists.` },
        { status: 405 }
      );
    }

    // Update the category
    const result = await prisma.category.update({
      where: {
        category_id: category_id,
      },
      data: {
        name: parsedData.name,
        description: parsedData.description,
        parent_id: parsedData.parent_id,
      },
    });

    return NextResponse.json(
      { result, message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const category_id = Number(params.id);

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { category_id },
    });

    if (!category) {
      return NextResponse.json(
        {
          error:
            "Can't find the category associated with the given category ID",
        },
        { status: 404 }
      );
    }

    // Delete the category
    const result = await prisma.category.delete({
      where: {
        category_id: category_id,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in DELETE:", error);
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
};
