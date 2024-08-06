import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(request) {
  try {
    const req = await request.formData();

    const title = req.get("title");
    const description = req.get("description");
    const link_url = req.get("link_url");

    const file = req.get("image_url");
    let imageUrl = "";

    if (
      typeof file === "object" &&
      file !== "" &&
      file !== undefined &&
      file !== null
    ) {
      const timestamp = Date.now();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        timestamp + "_" + file.name
      );
      await writeFile(path, buffer);
      imageUrl = "/assets/uploads/" + timestamp + "_" + file.name;
    } else {
      return NextResponse.json(
        { error: "Slide image missing from the request" },
        { status: 401 }
      );
    }

    const result = await prisma.homeSlider.create({
      data: {
        title: title,
        description: description,
        image_url: imageUrl,
        link_url: link_url,
      },
    });

    return NextResponse.json(
      { result },
      { message: "New Slide created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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
