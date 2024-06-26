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
      include: { Product: true },
    });    
    if (!country) {
      return NextResponse.json(
        { error: "Can't find the country with given country_id" },
        { status: 405 }
      );
    }
    const req = await request.formData();

    const name = req.get("name");

    const exists = await prisma.country.findFirst({
      where: { name: name, NOT: { country_id: country_id } },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `Country with name ${name} already exists.`,
        },
        { status: 405 }
      );
    }

    const region = req.get("region");

    const parseCountryData = countryUpdateSchema.parse({ name, region });

    if (country.Product.length > 0) {
      return NextResponse.json(
        { error: `${country.name} country is in use, can't be updated` },
        { status: 400 }
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
      include: { Product: true },
    });

    if (!country) {
      return NextResponse.json(
        { error: "Can't find the country associated with given country Id" },
        { status: 405 }
      );
    }

    if (country.Product.length > 0) {
      return NextResponse.json(
        { error: `${country.name} country is in use, can't be deleted` },
        { status: 400 }
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
      { error: "Error while deleting country", error: error },
      { status: 500 }
    );
  }
}
