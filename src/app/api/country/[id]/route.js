import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const countryUpdateSchema = z.object({
  name: z.string().min(1, "Country name is required").max(50).optional(),
  region: z.string().min(1, "Region name is required").max(50).optional(),
});

export async function PUT(request, { params }) {
  try {
    const country_id = Number(params.id);
    const country = await prisma.country.findUnique({
      where: { country_id },
    });

    if (!country) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 405 }
      );
    }
    const res = await request.formData();

    const name = res.get("name");
    const region = res.get("region");

    const parseCountryData = countryUpdateSchema.parse({ name, region });

    const exists = await prisma.country.findFirst({
      where: { name: parseCountryData.name },
    });

    if (exists && exists.country_id !== country_id) {
      return NextResponse.json(
        {
          error: `Country with name ${parseCountryData.name} already exists.`,
        },
        { status: 405 }
      );
    }

    const result = await prisma.country.update({
      where: { country_id },
      data: {
        name: parseCountryData.name,
        region: parseCountryData.region,
      },
    });

    return NextResponse.json(
      { result },
      { message: "Country record Updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const country_id = Number(params.id);
    const country = await prisma.country.findUnique({
      where: { country_id },
    });

    if (!country) {
      return NextResponse.json(
        { error: "Can't find the country associated with given country Id" },
        { status: 405 }
      );
    }
    await prisma.country.delete({
      where: { country_id },
    });
    return NextResponse.json(
      {
        message: `Country with country_id ${country_id} deleted successfully.`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error while Deleting country", error: error },
      { status: 500 }
    );
  }
}
