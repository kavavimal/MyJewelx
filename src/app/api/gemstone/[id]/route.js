import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const gemstoneSchema = z.object({
  name: z.string().min(1, "Gemstone name required."),
  description: z.string().min(1, "Describe the gemstone."),
});

export async function PUT(request, {params}) {
  try {
    const gemstone_id = Number(params.id);
    const res = await request.formData();

    const gemstone = await prisma.gemstone.findUnique({
      where: { gemstone_id : gemstone_id },
    });

    if (!gemstone) {
      return NextResponse.json(
        {
          error: `Couldn't find the gemstone with id ${gemstone.gemstone_id}`,
        },
        { status: 400 }
      );
    }

    const name = res.get("name");
    
    const exists = await prisma.gemstone.findFirst({
      where: {
        name,
        NOT: {
          gemstone_id: gemstone_id,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `gemstone name is already used in gemstone with id ${exists.gemstone_id}`,
        },
        { status: 400 }
      );
    }
    const description = res.get("description");

    const gemstoneData = gemstoneSchema.parse({ name, description });
    
    const updateGemstone = await prisma.gemstone.update({
      where: { gemstone_id },
      data: gemstoneData,
    });

    return NextResponse.json(
      { message: "Gemstone updated successfully", updateGemstone },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const gemstone_id = Number(params.id);

    const gemstone = await prisma.gemstone.findFirst({
      where: { gemstone_id },
    });

    if (!gemstone) {
      return NextResponse.json(
        { error: "Gemstone not found" },
        { status: 400 }
      );
    }
    const deletedGemstone = await prisma.gemstone.delete({
      where: { gemstone_id },
    });
    return NextResponse.json(
      { message: " Gemstone deleted successfully", deletedGemstone },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
