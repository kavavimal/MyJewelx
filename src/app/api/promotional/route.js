import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(request) {
  try {
    const res = await request.formData();

    const ads_title = res.get("ads_title");
    const ads_desc = res.get("ads_desc");
    const ads_link = res.get("ads_link");
    const ads_type = res.get("ads_type");

    const file = res.get("ads_img_url");
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

    const result = await prisma.promotional.create({
      data: {
        ads_title: ads_title,
        ads_desc: ads_desc,
        ads_img_url: imageUrl,
        ads_link: ads_link,
        ads_type: ads_type,
      },
    });

    return NextResponse.json(
      { result },
      { message: "New Ads created successfully." },
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
