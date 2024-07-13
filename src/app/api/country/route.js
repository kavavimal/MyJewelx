import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const countrySchema = z.object({
  name: z.string().min(1, "Country name is required").max(50),
  region: z.string().min(1, "Region is required").max(50),
});

export async function POST(request) {
  try {
    const res = await request.formData();

    const name = res.get("name");
    const region = res.get("region");

    const parsedData = countrySchema.parse({ name, region });

    const exists = await prisma.country.findFirst({
      where: { name: parsedData.name },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Country with name ${parsedData.name} already exists.`,
        },
        { status: 405 }
      );
    }

    const result = await prisma.country.create({
      data: {
        name: parsedData.name,
        region: parsedData.region,
      },
    });

    return NextResponse.json(
      { result },
      { message: "New country added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
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
