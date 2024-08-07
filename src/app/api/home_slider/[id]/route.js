import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

export async function PUT(request, { params }) {
  try {
    const existingSlide = await prisma.homeSlider.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingSlide) {
      throw new Error("Slide not found");
    }

    const formData = await request.formData();
    const file = formData.get("image_url");

    let updateData = {};

    if (
      typeof formData.get("title") === "string" &&
      formData.get("title") !== ""
    ) {
      updateData.title = formData.get("title");
    }
    if (
      typeof formData.get("description") === "string" &&
      formData.get("description") !== ""
    ) {
      updateData.description = formData.get("description");
    }
    if (
      typeof formData.get("link_url") === "string" &&
      formData.get("link_url") !== ""
    ) {
      updateData.link_url = formData.get("link_url");
    }

    let image_url;

    if (file && file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        `${existingSlide.title}_${file.name}`
      );
      await writeFile(path, buffer);

      image_url = `/assets/uploads/${updateData.title}_${file.name}`;

      if (existingSlide.image_url) {
        const oldFilePath = join(
          process.cwd(),
          "public",
          existingSlide.image_url
        );
        try {
          await unlink(oldFilePath);
          console.log(`Successfully deleted ${oldFilePath}`);
        } catch (error) {
          console.error(`Error deleting file ${oldFilePath}:`, error);
        }
      }

      updateData.image_url = image_url;
    }

    const result = await prisma.homeSlider.update({
      where: { id: Number(params.id) },
      data: updateData,
    });

    return NextResponse.json(
      { result, message: "Home Slide updated successfully" },
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
      { error: "Internal Server Error", e: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = Number(params.id);

    const result = await prisma.homeSlider.delete({ where: { id } });

    return NextResponse.json(
      { result, message: "HomeSlider deleted successfully" },
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
