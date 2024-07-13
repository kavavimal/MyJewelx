import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { CharsType } from "@prisma/client";

const characteristicSchema = z.object({
  name: z.string(),
  chars_type: z.nativeEnum(CharsType),
});

export async function POST(request) {
  try {
    const req = await request.formData();

    const name = req.get("name");
    const chars_type = req.get("chars_type");

    const characteristicData = characteristicSchema.parse({
      name,
      chars_type,
    });

    const result = await prisma.characteristic.create({
      data: characteristicData,
    });

    return NextResponse.json(
      {
        message: `${name + " " + chars_type} added successfully`,
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", issues: error.errors },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
