import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const patternSchema = z.object({
  name: z.string().min(1, "pattern name required").max(50),
  description: z.string().optional(),
});

export async function PUT(request, { params }) {
  try {
    const pattern_id = Number(params.id);

    const pattern = await prisma.pattern.findUnique({
      where: { pattern_id },
    });
    if (!pattern) {
      return NextResponse.json(
        {
          error: `Couldn't find product pattern with pattern_id ${pattern_id}`,
        },
        { status: 400 }
      );
    }
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");

    const patternData = patternSchema.parse({ name, description });

    const result = await prisma.pattern.update({
      where: { pattern_id },
      data: patternData,
    });

    return NextResponse.json(
      { message: "Product pattern updated successfully", result },
      { status: 201 }
    );
  } catch (error) {
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
    const pattern_id = Number(params.id);

    const pattern = await prisma.pattern.findUnique({
      where: { pattern_id },
    });
    if (!pattern) {
      return NextResponse.json(
        {
          error: `Couldn't Find product pattern with pattern_id ${pattern_id}`,
        },
        { status: 400 }
      );
    }

    const result = await prisma.pattern.delete({
      where: { pattern_id },
    });
    return NextResponse.json(
      {
        message: "Product pattern deleted successfully",
        pattern,
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
