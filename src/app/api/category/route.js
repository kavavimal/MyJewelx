import prisma from "@/lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema
const addCategorySchema = z.object({
  name: z.string().min(1, "Category name required").max(50),
  description: z.string().min(1, "Category description required").max(100),
  parent_id: z.union([z.string(), z.number(), z.null()]).optional(),
});

export const GET = async (request, { params }) => {
  try {
    const category_id = Number(params.id);

    // Check if a category with the same name already exists (excluding the current category)
    const exists = await prisma.category.findFirst({
      where: {
        category_id: category_id,
      },
    });

    if (!exists) {
      return NextResponse.json(
        { error: `Category with id : ${category_id} not exists.` },
        { status: 404 }
      );
    }

    // Update the category
    const subCategory = await prisma.category.findMany({
      where: {
        parent_id: category_id,
      },
    });

    return NextResponse.json(
      { result: exists, subCategory, message: "Category fetch successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle other errors
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
};

export async function POST(request) {
  try {
    // Extract form data
    const req = await request.formData();
    const name = req.get("name");
    const description = req.get("description");
    const parent_id = req.get("parent_id");

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
        { status: 400 }
      );
    }

    const categoryQuery = {
      name: parsedData.name,
      description: parsedData.description,
      parent_id: parsedData.parent_id,
    };

    const file = await req.get("file");
    let category_image;
    let path;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      path = join(
        process.cwd(),
        "/public/assets/uploads",
        parsedData.name + "_" + file.name
      );
      await writeFile(path, buffer);

      category_image = "/assets/uploads/" + parsedData.name + "_" + file.name;
    }

    if (category_image && path) {
      // categoryQuery.category_image = category_image;
      categoryQuery.image = {
        create: {
          path: category_image,
          image_type: "category",
        },
      };
    }

    // Create a new category
    const result = await prisma.category.create({
      data: categoryQuery,
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
