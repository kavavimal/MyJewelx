import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

// Define the schema for updating a category
const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name required").max(50),
  description: z.string().min(1, "Category description required").max(100),
  parent_id: z.union([z.string(), z.number(), z.null()]).optional(),
});

export const PUT = async (request, { params }) => {
  try {
    const category_id = Number(params.id);
    const req = await request.formData();

    const category = await prisma.category.findFirst({
      where: {
        category_id,
      },
      include: { image: true },
    });

    if (!category) {
      return NextResponse.json({
        error: `Couldn't find category with category id ${category_id}`,
      });
    }

    // Check if the category is in use
    const isCategoryInUse = await prisma.product.findFirst({
      where: {
        OR: [{ categoryId: category_id }, { subCategoryId: category_id }],
      },
    });

    const name = req.get("name");

    if (isCategoryInUse && name !== category.name) {
      return NextResponse.json(
        { error: "Category is in use and cannot be updated." },
        { status: 405 }
      );
    }

    const description = req.get("description");
    const parent_id = req.get("parent_id");

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

    const categoryQuery = {
      name: parsedData.name,
      description: parsedData.description,
      parent_id: parsedData.parent_id,
    };

    const file = await req.get("file");
    let category_image;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        `${parsedData.name}_${file.name}`
      );
      await writeFile(path, buffer);

      category_image = `/assets/uploads/${parsedData.name}_${file.name}`;

      if (category.image?.path) {
        const oldFilePath = join(process.cwd(), "public", category.image.path);
        try {
          await unlink(oldFilePath);
          console.log(`Successfully deleted ${oldFilePath}`);
        } catch (error) {
          console.error(`Error deleting file ${oldFilePath}:`, error);
        }
      }

      if (category.image) {
        categoryQuery.image = {
          update: {
            path: category_image,
            image_type: "category",
          },
        };
      } else {
        categoryQuery.image = {
          create: {
            path: category_image,
            image_type: "category",
          },
        };
      }
    }

    // Update the category
    const result = await prisma.category.update({
      where: {
        category_id: category_id,
      },
      data: categoryQuery,
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
      include: { image: true },
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
    // Check if the category is in use
    const isCategoryInUse = await prisma.product.findFirst({
      where: {
        OR: [{ categoryId: category_id }, { subCategoryId: category_id }],
      },
    });

    if (isCategoryInUse) {
      return NextResponse.json(
        { error: "Category is in use and cannot be deleted." },
        { status: 405 }
      );
    }

    const category_image_path = category.image.path;
    if (category_image_path) {
      const filePath = join(process.cwd(), "public", category_image_path);
      try {
        await unlink(filePath);
        console.log(`Successfully deleted ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    } else {
      NextResponse.json(
        { error: `${category_image_path} image can't be deleted` },
        { status: 400 }
      );
    }

    // await prisma.image.delete({                     //check if Cascade do the same
    //   where: { image_id: userImage.image_id },
    // });

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
