import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const collectionSchema = z.object({
  name: z.string().min(1, "collection name required").max(50),
  description: z.string().optional(),
});

export async function PUT(request, { params }) {
  try {
    const collection_id = Number(params.id);

    const collection = await prisma.collection.findUnique({
      where: { collection_id },
      include: { products: true },
    });
    if (!collection) {
      return NextResponse.json(
        {
          error: `Couldn't Find product collection with collection_id ${collection_id}`,
        },
        { status: 400 }
      );
    }
    const req = await request.formData();
    const name = req.get("name");

    const exists = await prisma.collection.findFirst({
      where: { name: name, NOT: { collection_id: collection_id } },
    });

    if (exists) {
      return NextResponse.json({
        error: `${name} collection name already exist`,
      });
    }
    const description = req.get("description");

    const collectionData = collectionSchema.parse({ name, description });

    if (collection.products.length > 0) {
      return NextResponse.json({
        error: `${collection.name} collection is in use, can't update it.`,
      });
    }

    const result = await prisma.collection.update({
      where: { collection_id },
      data: collectionData,
    });

    return NextResponse.json(
      { message: "Product collection updated successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
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

export async function DELETE(request, { params }) {
  try {
    const collection_id = Number(params.id);

    const collection = await prisma.collection.findUnique({
      where: { collection_id },
      include: { products: true },
    });
    if (!collection) {
      return NextResponse.json(
        {
          error: `Couldn't Find product collection with collection_id ${collection_id}`,
        },
        { status: 400 }
      );
    }

    if (collection.products.length > 0) {
      return NextResponse.json({
        error: `${collection.name} collection is in use, can't delete it.`,
      });
    }

    const result = await prisma.collection.delete({
      where: { collection_id },
    });
    return NextResponse.json(
      {
        message: "Product collection deleted successfully",
        collection,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
