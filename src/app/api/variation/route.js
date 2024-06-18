import { NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile } from "fs/promises";
import prisma from "@/lib/prisma";

const productVariationSchema = z.object({
  product_id: z.number(),
  productAttributeValue_id: z.array(z.number()),
  variation_name: z.string().min(1, "variation_name required").max(100),
  regular_price: z.number(),
  selling_price: z.number().optional(),
  description: z.string().min(1, "description required").max(200),
  sku: z.string().min(1, "sku required").max(20),
  stock_management: z.boolean(),
  stock_status: z.boolean(),
  quantity: z.number().optional(),
  length: z.number(),
  height: z.number(),
  width: z.number(),
  thickness: z.number(),
  weight_unit: z.string().min(1, "weight_unit required").max(20),
  net_weight: z.number(),
  gross_weight: z.number(),
  isPriceFixed: z.boolean(),
  making_charges: z.string().optional(),
  other_charges: z.string().optional(),
});

export async function POST(request) {
  try {
    const req = await request.formData();

    const variationData = {
      product_id: Number(req.get("product_id")),
      productAttributeValue_id: req
        .get("productAttributeValue_id")
        .split(",")
        .map((id) => parseInt(id)),
      sku: req.get("sku"),
      variation_name: req.get("variation_name"),
      regular_price: Number(req.get("regular_price")),
      selling_price: Number(req.get("selling_price")),
      description: req.get("description"),
      stock_management: req.get("stock_management") === "true" ? true : false,
      stock_status: req.get("stock_status") === "true" ? true : false,
      quantity: Number(req.get("quantity")),
      length: Number(req.get("length")),
      height: Number(req.get("height")),
      width: Number(req.get("width")),
      thickness: Number(req.get("thickness")),
      weight_unit: req.get("weight_unit"),
      net_weight: Number(req.get("net_weight")),
      gross_weight: Number(req.get("gross_weight")),
      isPriceFixed: req.get("isPriceFixed") === "true" ? true : false,
      other_charges: req.get("other_charges"),
      making_charges: req.get("making_charges"),
    };

    const parsedVariation = productVariationSchema.parse(variationData);

    const existsWithSKU = await prisma.productVariation.findFirst({
      where: { sku: variationData.sku },
    });

    if (existsWithSKU) {
      return NextResponse.json(
        {
          error: `A product variation with similar SKU ${parsedVariation.sku} is found.`,
        },
        { status: 400 }
      );
    }

    const existingVariations = await prisma.productVariation.findMany({
      where: { product_id: parsedVariation.product_id },
      include: {
        productAttributeValues: {
          select: { productAttributeValue_id: true },
        },
      },
    });

    // Extract existing combinations
    const existingCombinations = existingVariations.map((variation) =>
      variation.productAttributeValues
        .map((attr) => attr.productAttributeValue_id)
        .sort()
        .join(",")
    );

    // Sort and join the new combination to compare with existing ones
    const newCombination = parsedVariation.productAttributeValue_id
      .sort()
      .join(",");

    // Check if the new combination already exists
    if (existingCombinations.includes(newCombination)) {
      return NextResponse.json(
        {
          error:
            "A variation with this exact combination of attributes already exists.",
        },
        { status: 400 }
      );
    }

    const variationQuery = {
      product_id: parsedVariation.product_id,
      productAttributeValues: {
        create: [
          ...parsedVariation.productAttributeValue_id.map((id) => ({
            productAttributeValue: {
              connect: { productAttributeValue_id: parseInt(id) },
            },
          })),
        ],
      },
      variation_name: parsedVariation.variation_name,
      regular_price: parsedVariation.regular_price,
      selling_price: variationData.selling_price
        ? parsedVariation.selling_price
        : null,
      description: parsedVariation.description,
      sku: parsedVariation.sku,
      stock_management: parsedVariation.stock_management,
      stock_status: parsedVariation.stock_status,
      quantity: parsedVariation.quantity,
      length: parsedVariation.length,
      height: parsedVariation.height,
      width: parsedVariation.width,
      thickness: parsedVariation.thickness,
      weight_unit: parsedVariation.weight_unit,
      net_weight: parsedVariation.net_weight,
      gross_weight: parsedVariation.gross_weight,
      isPriceFixed: parsedVariation.isPriceFixed,
      other_charges: parsedVariation.other_charges,
      making_charges: parsedVariation.making_charges,
    };

    const files = await req.getAll("files[]");
    let images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const dateSuffix = Date.now();

        const path = join(
          process.cwd(),
          "/public/assets/uploads",
          `${dateSuffix}_${i}_${file.name}`
        );
        await writeFile(path, buffer);

        images.push({
          path: `/assets/uploads/${dateSuffix}_${i}_${file.name}`,
          image_type: "variation",
        });
      }
    } else
      return NextResponse.json(
        {
          error: "Product-Variation should have at lease 1 Image",
        },
        { status: 400 }
      );

    if (images.length > 0) {
      variationQuery.image = {
        createMany: {
          data: images,
        },
      };
    }

    const mainProduct = await prisma.product.findUnique({
      where: { product_id: parsedVariation.product_id },
    });

    const result = await prisma.productVariation.create({
      data: variationQuery,
    });

    return NextResponse.json(
      {
        message: `A variation of product ${mainProduct.product_name} is added`,
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json({
        error: "Validation Error",
        issues: error.errors,
      });
    }
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}
