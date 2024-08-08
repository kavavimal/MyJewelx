import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

export async function PUT(request, { params }) {
  try {
    const existingAds = await prisma.promotional.findUnique({
      where: { ads_id: Number(params.id) },
    });

    if (!existingAds) {
      throw new Error("Slide not found");
    }

    const formData = await request.formData();
    const file = formData.get("ads_img_url");

    let updateData = {};

    if (
      typeof formData.get("ads_title") === "string" &&
      formData.get("ads_title") !== ""
    ) {
      updateData.ads_title = formData.get("ads_title");
    }
    if (
      typeof formData.get("ads_desc") === "string" &&
      formData.get("ads_desc") !== ""
    ) {
      updateData.ads_desc = formData.get("ads_desc");
    }
    if (
      typeof formData.get("ads_link") === "string" &&
      formData.get("ads_link") !== ""
    ) {
      updateData.ads_link = formData.get("ads_link");
    }

    if (
      typeof formData.get("ads_type") === "string" &&
      formData.get("ads_type") !== ""
    ) {
      updateData.ads_type = formData.get("ads_type");
    }

    let ads_img_url;

    if (file && file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        `${existingAds.ads_title}_${file.name}`
      );
      await writeFile(path, buffer);

      ads_img_url = `/assets/uploads/${updateData.ads_title}_${file.name}`;

      //unlink image code

      if (existingAds.ads_img_url) {
        const oldFilePath = join(
          process.cwd(),
          "public",
          existingAds.ads_img_url
        );
        try {
          await unlink(oldFilePath);
          console.log(`Successfully deleted ${oldFilePath}`);
        } catch (error) {
          console.error(`Error deleting file ${oldFilePath}:`, error);
        }
      }

      updateData.ads_img_url = ads_img_url;
    }

    const result = await prisma.promotional.update({
      where: { ads_id: Number(params.id) },
      data: updateData,
    });

    return NextResponse.json(
      { result, message: "Ads updated successfully" },
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
    const ads_id = Number(params.id);

    const result = await prisma.promotional.delete({ where: { ads_id } });

    return NextResponse.json(
      { result, message: "Ads deleted successfully" },
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
