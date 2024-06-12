import { NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile } from "fs/promises";
import prisma from "@/lib/prisma";

const productVariationSchema = z.object({
  product_id: z.number(),
  productAttributeValue_id: z.array(z.number()),
  variation_name: z.string(),
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
    const res = await request.formData();

    const variationData = {
      product_id: Number(res.get("product_id")),
      productAttributeValue_id: res
        .get("productAttributeValue_id")
        .split(",")
        .map((id) => parseInt(id)),
      sku: res.get("sku"),
      variation_name: res.get("variation_name"),
      regular_price: Number(res.get("regular_price")),
      selling_price: Number(res.get("selling_price")),
      description: res.get("description"),
      stock_management: res.get("stock_management") === "true" ? true : false,
      stock_status: res.get("stock_status") === "true" ? true : false,
      quantity: Number(res.get("quantity")),
      length: Number(res.get("length")),
      height: Number(res.get("height")),
      width: Number(res.get("width")),
      thickness: Number(res.get("thickness")),
      weight_unit: res.get("weight_unit"),
      net_weight: Number(res.get("net_weight")),
      gross_weight: Number(res.get("gross_weight")),
      isPriceFixed: res.get("isPriceFixed") === "true" ? true : false,
      other_charges: res.get("other_charges"),
      making_charges: res.get("making_charges"),
    };

    const parsedVariation = productVariationSchema.parse(variationData);

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

    const files = await res.getAll("files[]");
    let images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(
          process.cwd(),
          "/public/assets/uploads",
          parsedVariation.product_id + variationData.sku + "_" + i + file.name
        );
        await writeFile(path, buffer);

        images.push(
          "/assets/uploads/" +
            parsedVariation.product_id +
            variationData.sku +
            "_" +
            i +
            file.name
        );
      }
    } else
      NextResponse.json(
        {
          error: "Product-Variation should have at lease 1 Image",
        },
        { status: 400 }
      );

    const mainProduct = await prisma.product.findUnique({
      where: { product_id: parsedVariation.product_id },
    });

    const result = await prisma.productVariation.create({
      data: {
        product_id: parsedVariation.product_id,
        variation_name: parsedVariation.variation_name,
        productAttributeValues: {
          create: [
            ...parsedVariation.productAttributeValue_id.map((id) => ({
              productAttributeValue: {
                connect: { productAttributeValue_id: parseInt(id) },
              },
            })),
          ],
        },
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
        images: images,
      },
    });

    return NextResponse.json(
      {
        message: `A variation of product ${mainProduct.name} is added`,
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
