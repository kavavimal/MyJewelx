import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const gemstoneSchema = z.object({
  name: z.string().min(1, "Gemstone name required."),
  description: z.string().min(1, "Describe the gemstone."),
});
export async function POST(request) {
  try {
    const res = await request.formData();

    const name = res.get("name");

    const gemstone = await prisma.gemstone.findFirst({
      where: { name: name },
    });

    if (gemstone) {
      return NextResponse.json(
        {
          error: `gemstone name is already used in gemstone with id ${gemstone.gemstone_id}`,
        },
        { status: 400 }
      );
    }
    const description = res.get("description");

    const gemstoneData = gemstoneSchema.parse({ name, description });
    const newGemstone = await prisma.gemstone.create({
      data: gemstoneData,
    });

    return NextResponse.json(
      { message: "Gemstone added successfully", newGemstone },
      { status: 201 }
    );
  } catch (error) {
    if (error.main === "ZodError") {
      return NextResponse.json({ error: "Validation error" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
