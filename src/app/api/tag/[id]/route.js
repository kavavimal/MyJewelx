import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateTagSchema = z.object({
  name: z.string().min(1, "Tag name required").max(50),
  description: z.string().min(1, "Tag description required").max(100),
});

export async function PUT(request, { params }) {
  try {
    const tag_id = Number(params.id);
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");

    const parsedData = updateTagSchema.parse({ name, description });

    const exists = await prisma.tag.findFirst({
      where: {
        name: parsedData.name,
        NOT: {
          tag_id: tag_id,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: `Tag with name ${parsedData.name} already exists.` },
        { status: 405 }
      );
    }

    const result = await prisma.tag.update({
      where: {
        tag_id: tag_id,
      },
      data: {
        name: parsedData.name,
        description: parsedData.description,
      },
    });

    return NextResponse.json(
      { result, message: "Tag updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const tag_id = Number(params.id);

    const tag = await prisma.tag.findUnique({ where: { tag_id } });

    if (!tag) {
      return NextResponse.json(
        {
          error: `There is no Tag found associated with the tag_id ${tag_id}.`,
        },
        { status: 400 }
      );
    }

    const result = await prisma.tag.delete({ where: { tag_id } });

    return NextResponse.json(
      { result, message: "Tag deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
