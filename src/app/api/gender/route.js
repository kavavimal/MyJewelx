import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const genderSchema = z.object({
  name: z.string().min(1, "gender name required").max(50),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const name = res.get("name");

    const genderData = genderSchema.parse({ name });

    const exists = await prisma.gender.findFirst({
      where: { name: genderData.name },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Gender with name ${genderData.name} already exists.`,
        },
        { status: 400 }
      );
    }

    const newGender = await prisma.gender.create({
      data: genderData,
    });

    return NextResponse.json(
      { message: "New Gender added successfully", newGender },
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
