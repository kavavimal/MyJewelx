import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateAttributeSchema = z.object({
  name: z.string().min(1, "Attribute name required").max(50),
  isRequired: z.boolean(),
  isMultiple: z.boolean(),
  description: z.string().optional(),
});

export async function PUT(request, { params }) {
  try {
    const attribute_id = Number(params.id);
    const res = await request.formData();

    const name = res.get("name");
    const isRequired =
      res.get("isRequired") === "true"
        ? true
        : res.get("isRequired") === "false"
        ? false
        : undefined;
    const isMultiple =
      res.get("isMultiple") === "true"
        ? true
        : res.get("isMultiple") === "false"
        ? false
        : undefined;
    const description = res.get("description");

    const attributeData = updateAttributeSchema.parse({
      name,
      isRequired,
      isMultiple,
      description,
    });

    const exists = await prisma.attribute.findFirst({
      where: {
        name: attributeData.name,
        NOT: {
          attribute_id: attribute_id,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Attribute with name ${attributeData.name} is already exists`,
        },
        { status: 400 }
      );
    }

    const result = await prisma.attribute.update({
      where: { attribute_id },
      data: attributeData,
    });

    return NextResponse.json(
      { message: "Attribute updated Successfully", result },
      { status: 201 }
    );
  } catch (error) {
    if (error === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const attribute_id = Number(params.id);

    const attribute = await prisma.attribute.findFirst({
      where: { attribute_id },
    });

    if (!attribute) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
    }

    const result = await prisma.attribute.delete({
      where: { attribute_id },
    });

    return NextResponse.json(
      { message: "Attribute deleted successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
