import { NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import prisma from "@/lib/prisma";

const productVariationSchema = z.object({
  product_id: z.number(),
  variation_name: z.string(),
  regular_price: z.number(),
  selling_price: z.number().optional(),
  isDiscount: z.boolean(),
  variation_discount: z.number().optional().nullable(),
  variation_discount_type: z.number().optional().nullable(),
  description: z.string().min(1, "description required"),
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
  oldImageChange: z.array(z.string()).optional(),
});

export async function PUT(request, { params }) {
  try {
    const variation_id = Number(params.id);

    const variation = await prisma.productVariation.findUnique({
      where: { variation_id },
      include: { image: true, cartItems: true },
    });

    if (!variation) {
      return NextResponse.json({
        error: `Can't find the product variation associated with the given variation ID ${variation_id}`,
      });
    }

    // Check if there are any cart items associated with the ProductVariation
    if (variation.cartItems.length > 0) {
      return NextResponse.json(
        { error: "Product variation is in use and cannot be updated." },
        { status: 405 }
      );
    }

    const req = await request.formData();

    const isDiscount = req.get("isDiscount") === "true" ? true : false;

    const variationData = {
      product_id: Number(req.get("product_id")),
      sku: req.get("sku"),

      variation_name: req.get("variation_name"),
      regular_price: Number(req.get("regular_price")),
      selling_price: Number(req.get("selling_price")),
      isDiscount: isDiscount,
      variation_discount: isDiscount
        ? Number(req.get("variation_discount"))
        : null,
      variation_discount_type: isDiscount
        ? Number(req.get("variation_discount_type"))
        : null,
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
      oldImageChange:
        req.get("old_img_change") !== ""
          ? req.get("old_img_change").split(",")
          : [],
      shipping_charge: Number(req.get("shipping_charge")) ?? "",
    };
    const parsedVariation = productVariationSchema.parse(variationData);

    const existsWithSKU = await prisma.productVariation.findFirst({
      where: { sku: parsedVariation.sku, NOT: { variation_id: variation_id } },
    });

    if (existsWithSKU) {
      return NextResponse.json(
        {
          error: `A product variation with similar SKU ${parsedVariation.sku} is found.`,
        },
        { status: 400 }
      );
    }

    const files = req.getAll("files[]");

    const variationImages = variation.image;
    let removedImages;

    if (files.length === 0 && variationData.oldImageChange.length === 0) {
      return NextResponse.json(
        { error: "ProductVariation should have at least 1 image" },
        { status: 400 }
      );
    } else {
      removedImages = variationImages.filter(
        (image) => !variationData.oldImageChange.includes(image.path)
      );

      if (removedImages.length > 0) {
        // Use Promise.all to handle the deletion of multiple files concurrently
        await Promise.all(
          removedImages.map(async (removedImage) => {
            const filePath = join(process.cwd(), "public", removedImage.path);
            try {
              await unlink(filePath);
              console.log(`Successfully deleted ${filePath}`);
            } catch (error) {
              console.error(`Error deleting file ${filePath}:`, error);
            }
          })
        );
      }
    }

    const removedImageIds = removedImages.map((image) => image.image_id);

    let images = [];
    if (files && files.length > 0) {
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
    }

    const variationQuery = {
      variation_name: parsedVariation.variation_name,
      regular_price: parsedVariation.regular_price,
      selling_price: variationData.selling_price
        ? parsedVariation.selling_price
        : null,
      isDiscount: parsedVariation.isDiscount,
      variation_discount: parsedVariation.variation_discount,
      variation_discount_type: parsedVariation.variation_discount_type,
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
      shipping_charge: variationData.shipping_charge,
    };

    if (images.length > 0) {
      // const newImages = variationData.oldImageChange.concat(images);
      // variationQuery.images = newImages;

      variationQuery.image = {
        //check this query for updating relations with images and variation and for delete support
        createMany: {
          data: images,
        },
      };
    }

    const result = await prisma.productVariation.update({
      where: {
        variation_id: variation_id,
      },
      data: variationQuery,
    });

    if (removedImages.length > 0) {
      await prisma.image.deleteMany({
        where: { image_id: { in: removedImageIds } },
      });
    }

    return NextResponse.json(
      {
        message: `product variation with variation_id ${variation_id} updated successfully`,
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: error.errors,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const variation_id = Number(params.id);

    const variation = await prisma.productVariation.findUnique({
      where: { variation_id },
      include: { image: true, cartItems: true },
    });

    const variationImages = variation.image;

    if (!variation) {
      return NextResponse.json({
        error: `Can't find the product variation associated with the given variation ID ${variation_id}`,
      });
    }

    // Check if there are any cart items associated with the ProductVariation
    if (variation.cartItems.length > 0) {
      return NextResponse.json(
        { error: "Product variation is in use and cannot be deleted." },
        { status: 405 }
      );
    }

    await prisma.productVariationAttribute.deleteMany({
      where: { productVariation_id: variation_id },
    });

    const image_ids = variationImages?.map((image) => image.image_id);

    if (variationImages.length > 0) {
      variationImages.forEach(async (image) => {
        const filePath = join(process.cwd(), "public", image.path);
        try {
          await unlink(filePath);
          console.log(`Successfully deleted ${filePath}`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
        }
      });
    }

    const result = await prisma.productVariation.delete({
      where: { variation_id },
    });
    return NextResponse.json(
      { message: "Product variation deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}
