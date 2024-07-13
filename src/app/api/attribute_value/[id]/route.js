import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateAttributeValueSchema = z.object({
  name: z.string().min(1, "Attribute value name required").max(50),
  attribute_id: z.number(),
});

export async function PUT(request, { params }) {
  try {
    const id = Number(params.id);

    const attributeValue = await prisma.attributeValue.findFirst({
      where: { id },
      include: { attributeValuePricings: true, ProductAttributeValue: true },
    });

    if (attributeValue) {
      return NextResponse.json(
        { error: " Can't find the AttributeValue with given id." },
        { status: 400 }
      );
    }
    const res = await request.formData();

    const name = res.get("name");
    const attribute_id = Number(res.get("attribute_id"));

    const attributeValueData = updateAttributeValueSchema.parse({
      name,
      attribute_id,
    });

    const exists = await prisma.attributeValue.findFirst({
      where: { name: name, attribute_id: attribute_id },
      NOT: {
        id: id,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Attribute value with name ${attributeValueData.name} is already exists`,
        },
        { status: 400 }
      );
    }

    if (
      attributeValue.ProductAttributeValue.length > 0 ||
      attributeValue.attributeValuePricings.length > 0
    ) {
      return NextResponse.json({
        error: `${attributeValue.name} attributeValue is in use, can't update it.`,
      });
    }

    const result = await prisma.attributeValue.update({
      where: { id },
      data: {
        name: attributeValueData.name,
        attribute_id: attributeValueData.attribute_id,
      },
    });

    return NextResponse.json(
      { message: "Attribute value updated Successfully", result },
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
    const id = Number(params.id);

    const attributeValue = await prisma.attributeValue.findFirst({
      where: { id },
      include: { attributeValuePricings: true, ProductAttributeValue: true },
    });

    if (!attributeValue) {
      return NextResponse.json(
        { error: "Can't find the AttributeValue with given id" },
        { status: 400 }
      );
    }

    if (
      attributeValue.ProductAttributeValue.length > 0 ||
      attributeValue.attributeValuePricings.length > 0
    ) {
      return NextResponse.json({
        error: `${attributeValue.name} attributeValue is in use, can't delete it.`,
      });
    }

    const result = await prisma.attributeValue.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Attribute value deleted successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
