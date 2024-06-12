import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const pricingSchema = z.object({
  name: z.string().min(1, "name required"),
  attributeValue_id: z.number(1, "attributeValue_id required"),
  price: z.number(1, "price required"),
  base_q: z.number().min(1, "base_q required"),
  unit: z.string().min(1, "unit required"),
  purity: z.string().optional(),
});
export async function POST(request) {
  try {
    const req = await request.formData();

    const name = req.get("name");
    const attributeValue_id = Number(req.get("attributeValue_id"));

    const exists = await prisma.attributeValuePricing.findFirst({
      where: { name: name, attributeValue_id: attributeValue_id },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: `This pricing name ${name} for attributeValue_id ${attributeValue_id} is already exists`,
        },
        { status: 400 }
      );
    }

    const price = parseFloat(req.get("price"));
    const base_q = parseFloat(req.get("base_q"));
    const unit = req.get("unit");
    const purity = req.get("purity");

    const pricingData = pricingSchema.parse({
      name,
      attributeValue_id,
      price,
      base_q,
      unit,
      purity,
    });

    const pricing = await prisma.attributeValuePricing.create({
      data: pricingData,
    });

    return NextResponse.json(
      {
        message: `New pricing added for attributeValue_id ${attributeValue_id} successfully`,
        pricing,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
