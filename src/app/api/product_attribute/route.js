import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const addAttributeSchema = z.object({
  name: z.string().min(1, "Attribute name required").max(50),
  isRequired: z.boolean(),
  isMultiple: z.boolean(),
  description: z.string().optional(),
});

export async function POST(request) {
  try {
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

    const AttributeData = addAttributeSchema.parse({
      name,
      isRequired,
      isMultiple,
      description,
    });

    const exists = await prisma.attribute.findFirst({
      where: { name },
    });

    if (exists) {
      return NextResponse.json({
        error: `Attribute with name ${AttributeData.name} already exists.`,
      });
    }

    const result = await prisma.attribute.create({
      data: AttributeData,
    });

    return NextResponse.json(
      { message: "Attribute added successfully", result },
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
