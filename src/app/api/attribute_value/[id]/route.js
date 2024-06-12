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
    const res = await request.formData();

    const name = res.get("name");
    const attribute_id = Number(res.get("attribute_id"));

    const attributeValueData = updateAttributeValueSchema.parse({
      name,
      attribute_id,
    });

    // const exists = await prisma.attributeValue.findFirst({
    //   where: { name },
    //   NOT: {
    //     id: id,
    //   },
    // });

    // if (exists) {
    //   return NextResponse.json(
    //     {
    //       error: `Attribute value with name ${attributeValueData.name} is already exists`,
    //     },
    //     { status: 400 }
    //   );
    // }

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
    });

    if (!attributeValue) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
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
