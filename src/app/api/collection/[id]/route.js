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
    });
    if (!collection) {
      return NextResponse.json(
        {
          error: `Couldn't Find product collection with collection_id ${collection_id}`,
        },
        { status: 400 }
      );
    }
    const res = await request.formData();
    console.log("response", res)
    const name = res.get("name");
    const description = res.get("description");
    console.log("description", description, name)

    const collectionData = collectionSchema.parse({ name, description });

    const result = await prisma.collection.update({
      where: { collection_id },
      data: collectionData,
    });

    return NextResponse.json(
      { message: "Product collection updated successfully", result },
      { status: 201 }
    );
  } catch (error) {
      console.log("error", error)
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
    });
    if (!collection) {
      return NextResponse.json(
        {
          error: `Couldn't Find product collection with collection_id ${collection_id}`,
        },
        { status: 400 }
      );
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
