import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const addAttributeValueSchema = z.object({
  name: z.string().min(1, "Attribute value name required").max(50),
  attribute_id: z.number(),
});

export async function POST(request) {
  try {
    const req = await request.formData();

    const name = req.get("name");
    const attribute_id = Number(req.get("attribute_id"));

    const exists = await prisma.attributeValue.findFirst({
      where: { name: name, attribute_id: attribute_id },
    });

    if (exists) {
      return NextResponse.json({
        error: `${name} attributeValue name already exist with attribute_id ${attribute_id}`,
      });
    }

    const AttributeValueData = addAttributeValueSchema.parse({
      name,
      attribute_id,
    });

    const result = await prisma.attributeValue.create({
      data: {
        name: AttributeValueData.name,
        attribute_id: AttributeValueData.attribute_id,
      },
    });

    return NextResponse.json(
      { message: "Attribute value added successfully", result },
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
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
