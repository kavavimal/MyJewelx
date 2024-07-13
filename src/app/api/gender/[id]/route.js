import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const genderSchema = z.object({
  name: z.string().min(1, "gender name required").max(50),
});

export async function PUT(request, { params }) {
  try {
    const gender_id = Number(params.id);

    const gender = await prisma.gender.findUnique({
      where: { gender_id },
      include:{products :true}
    });
    if (!gender) {
      return NextResponse.json(
        {
          error: `Couldn't find Gender with gender_id ${gender_id}`,
        },
        { status: 400 }
      );
    }
    const req = await request.formData();
    const name = req.get("name");

    const exists = await prisma.gender.findFirst({
      where: { name: name, NOT: { gender_id: gender_id } },
    });

    if (exists) {
      return NextResponse.json({ error: `${name} gender name already exist` });
    }

    const genderData = genderSchema.parse({ name });

    const result = await prisma.gender.update({
      where: { gender_id },
      data: genderData,
    });

    if (gender.products.length > 0) {
      return NextResponse.json(
        { error: `${gender.name} gender is in use, can't update it` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Gender updated successfully", result },
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
    const gender_id = Number(params.id);

    const gender = await prisma.gender.findUnique({
      where: { gender_id },
      include:{products :true}
    });
    if (!gender) {
      return NextResponse.json(
        {
          error: `Couldn't find Gender with gender_id ${gender_id}`,
        },
        { status: 400 }
      );
    }

    if (gender.products.length > 0) {
      return NextResponse.json(
        { error: `${gender.name} gender is in use, can't delete it` },
        { status: 500 }
      );
    }

    const result = await prisma.gender.delete({
      where: { gender_id },
    });
    return NextResponse.json(
      {
        message: "Product gender deleted successfully",
        gender,
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
