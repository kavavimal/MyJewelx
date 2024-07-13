import prisma from "@/lib/prisma";
import { CharsType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const characteristicSchema = z.object({
  name: z.string(),
  chars_type: z.nativeEnum(CharsType),
});

export async function PUT(request, { params }) {
  try {
    const chars_id = Number(params.id);
    const req = await request.formData();

    const characteristic = await prisma.characteristic.findUnique({
      where: { chars_id },
      include: { productChars: true },
    });

    if (!characteristic) {
      return NextResponse.json(
        { error: "Can't find Characteristic with given id" },
        { status: 400 }
      );
    }

    if (characteristic.productChars.length > 0) {
      return NextResponse.json(
        { error: "Characteristic is in use, Can't update it." },
        { status: 400 }
      );
    }

    const name = req.get("name");
    const chars_type = req.get("chars_type");

    const characteristicData = characteristicSchema.parse({
      name,
      chars_type,
    });

    const result = await prisma.characteristic.update({
      where: { chars_id },
      data: characteristicData,
    });
    return NextResponse.json(
      { message: "Characteristic updated successfully ", result },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
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

export async function DELETE(request, { params }) {
  try {
    const chars_id = Number(params.id);

    const characteristic = await prisma.characteristic.findUnique({
      where: { chars_id },
      include: { productChars: true },
    });

    if (!characteristic) {
      return NextResponse.json(
        { error: "Can't find Characteristic with given id" },
        { status: 400 }
      );
    }

    if (characteristic.productChars.length > 0) {
      return NextResponse.json(
        { error: "Characteristic is in use, Can't delete it." },
        { status: 400 }
      );
    }

    const result = await prisma.characteristic.delete({
      where: { chars_id },
    });

    return NextResponse.json(
      { message: "Characteristic deleted successfully ", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
