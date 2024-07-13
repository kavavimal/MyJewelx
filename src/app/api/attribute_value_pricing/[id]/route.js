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

export async function PUT(request, { params }) {
  try {
    const pricing_id = Number(params.id);
    const req = await request.formData();

    const name = req.get("name");

    const attributeValuePricing = await prisma.attributeValuePricing.findUnique(
      {
        where: { pricing_id },
        include: { products: true },
      }
    );

    if (!attributeValuePricing) {
      return NextResponse.json(
        {
          error: `Couldn't find the attribute value pricing with pricing_id ${pricing_id}`,
        },
        { status: 400 }
      );
    }

    const attributeValue_id = Number(req.get("attributeValue_id"));

    const exists = await prisma.attributeValuePricing.findFirst({
      where: {
        name: name,
        attributeValue_id: attributeValue_id,
        NOT: {
          pricing_id: pricing_id,
        },
      },
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

    if (attributeValuePricing.products.length > 0) {
      return NextResponse.json({
        error: `${attributeValuePricing.name} attributeValuePricing is in use, can't update it.`,
      });
    }

    const pricing = await prisma.attributeValuePricing.update({
      where: { pricing_id: pricing_id },
      data: pricingData,
    });

    return NextResponse.json(
      {
        message: `AttributeValue pricing updated for successfully`,
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

export async function DELETE(request, { params }) {
  try {
    const pricing_id = Number(params.id);

    const attributeValuePricing = await prisma.attributeValuePricing.findUnique(
      {
        where: { pricing_id },
        include: { products: true },
      }
    );

    if (!attributeValuePricing) {
      return NextResponse.json(
        {
          error: `Couldn't find the attribute value pricing with pricing_id ${pricing_id}`,
        },
        { status: 400 }
      );
    }

    if (attributeValuePricing.products.length > 0) {
      return NextResponse.json({
        error: `${attributeValuePricing.name} attributeValuePricing is in use, can't delete it.`,
      });
    }

    const deletedPricing = await prisma.attributeValuePricing.delete({
      where: { pricing_id },
    });

    return NextResponse.json(
      {
        message: "Attribute Value Pricing deleted successfully",
        attributeValuePricing,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
