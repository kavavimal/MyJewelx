import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
// import { getServerSession } from "next-auth";

const stepOneSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  attributes: z.string().array().nonempty("At least one attribute is required"),
  category: z.number().min(1, "Category is required"),
  subCategory: z.number().optional().nullable(),
});

const stepTwoSchema = z.object({
  // status: z.string().optional(),
  country_id: z.number().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  characteristics: z.array(z.string()).optional().nullable(),
  isOnlineBuyable: z.boolean().optional(),
  collections: z.array(z.string()).optional().nullable(),
  patterns: z.array(z.string()).optional().nullable(),
  states: z.array(z.string()).optional().nullable(),
  genders: z.array(z.string()).optional().nullable(),
  offline_reason: z.string().optional().nullable(),
  delivery_includes: z.string().refine((value) => value.trim().length > 0, {
    message: "delivery_includes field value cannot be empty or just spaces",
  }),
  return_policy: z.string().refine((value) => value.trim().length > 0, {
    message: "return_policy field value cannot be empty or just spaces",
  }),
  purchase_note: z.string().optional().nullable(),
});

export async function PUT(request, { params }) {
  try {
    const product_id = Number(params.id);
    const req = await request.formData();

    const product = await prisma.product.findUnique({
      where: { product_id: product_id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Can't find the product with given product_id" },
        { status: 400 }
      );
    }

    // const tags = req.get("tags") !== "" ? req.get("tags").split(",") : [];
    const slug = req.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Step slug required for updating product." },
        { status: 400 }
      );
    }

    let result;
    if (slug === "basic_details") {
      const product_name = req.get("product_name")
        ? req.get("product_name")
        : null;
      const attributes =
        req.get("attributes") !== "" ? req.get("attributes").split(",") : [];
      const category = Number(req.get("category"));
      const subCategory = req.get("subCategory")
        ? Number(req.get("subCategory"))
        : null;

      const stepOneData = stepOneSchema.parse({
        product_name,
        attributes,
        category,
        subCategory,
      });

      result = await prisma.product.update({
        where: { product_id: product_id },
        data: {
          product_name: stepOneData.product_name,
          attributes: {
            deleteMany: {},
            create: [
              ...stepOneData.attributes.map((attribute_id) => {
                return {
                  attribute: {
                    connect: {
                      attribute_id: Number(attribute_id),
                    },
                  },
                };
              }),
            ],
          },
          category: {
            connect: { category_id: category },
          },
          ...(stepOneData.subCategory && {
            subcategory: {
              connect: { category_id: stepOneData.subCategory },
            },
          }),
        },
      });
    } else if (slug === "additional_tags_attributes") {
      const country_id = req.get("country_id")
        ? Number(req.get("country_id"))
        : null;
      const tags =
        req.get("tags") !== ""
          ? req.get("tags").split(",")
          : req.get("tags") == ""
          ? []
          : null;
      const characteristics =
        req.get("characteristics") !== ""
          ? req.get("characteristics").split(",")
          : req.get("characteristics") == ""
          ? []
          : null;
      const isOnlineBuyable = req.get("isOnlineBuyable") === "true";
      console.log("isonlineBuyable", isOnlineBuyable);
      const collections =
        req.get("collections") !== ""
          ? req.get("collections").split(",")
          : req.get("collections") == ""
          ? []
          : null;
      const patterns =
        req.get("patterns") !== ""
          ? req.get("patterns").split(",")
          : req.get("patterns") == ""
          ? []
          : null;
      const states =
        req.get("states") !== ""
          ? req.get("states").split(",")
          : req.get("states") == ""
          ? []
          : null;
      const genders =
        req.get("genders") !== ""
          ? req.get("genders").split(",")
          : req.get("genders") == ""
          ? []
          : null;
      const offline_reason = !isOnlineBuyable ? req.get("offline_reason") : "";
      const delivery_includes = req.get("delivery_includes");
      const return_policy = req.get("return_policy");
      const purchase_note = req.get("purchase_note")
        ? req.get("purchase_note")
        : "";
      const relatedProducts =
        req.get("relatedProducts") !== "" ? req.get("relatedProducts").split(",") : [];
      const stepTwoData = stepTwoSchema.parse({
        isOnlineBuyable,
        country_id,
        states,
        tags,
        characteristics,
        collections,
        patterns,
        genders,
        offline_reason,
        delivery_includes,
        return_policy,
        purchase_note,
      });

      const productUpdateQuery = {
        isOnlineBuyable: stepTwoData.isOnlineBuyable,
        delivery_includes: stepTwoData.delivery_includes,
        return_policy: stepTwoData.return_policy,
        purchase_note: purchase_note,
        ...(stepTwoData.country_id && {
          country: {
            connect: { country_id: stepTwoData.country_id },
          },
        }),
        ...(stepTwoData.tags && {
          tags: {
            deleteMany: {},
            ...(stepTwoData.tags.length > 0 && {
              create: stepTwoData.tags.map((tag_id) => ({
                tag: {
                  connect: { tag_id: Number(tag_id) },
                },
              })),
            }),
          },
        }),
        ...(stepTwoData.characteristics && {
          productChars: {
            deleteMany: {},
            ...(stepTwoData.characteristics.length > 0 && {
              create: stepTwoData.characteristics.map((chars_id) => ({
                characteristic: {
                  connect: { chars_id: Number(chars_id) },
                },
              })),
            }),
          },
        }),
        ...(stepTwoData.collections && {
          collections: {
            deleteMany: {},
            ...(stepTwoData.collections.length > 0 && {
              create: stepTwoData.collections.map((collection_id) => ({
                collection: {
                  connect: { collection_id: Number(collection_id) },
                },
              })),
            }),
          },
        }),
        ...(stepTwoData.patterns && {
          patterns: {
            deleteMany: {},
            ...(stepTwoData.patterns.length > 0 && {
              create: stepTwoData.patterns.map((pattern_id) => ({
                pattern: {
                  connect: { pattern_id: Number(pattern_id) },
                },
              })),
            }),
          },
        }),
        ...(stepTwoData.states && {
          states: {
            deleteMany: {},
            ...(stepTwoData.states.length > 0 && {
              create: stepTwoData.states.map((state_id) => ({
                state: {
                  connect: { state_id: Number(state_id) },
                },
              })),
            }),
          },
        }),
        ...(stepTwoData.genders && {
          genders: {
            deleteMany: {},
            ...(stepTwoData.genders.length > 0 && {
              create: stepTwoData.genders.map((gender_id) => ({
                gender: {
                  connect: { gender_id: Number(gender_id) },
                },
              })),
            }),
          },
        }),
        ...(relatedProducts && {
          relatedProducts: {
            deleteMany: {},
            ...(relatedProducts.length > 0 && {
              create: relatedProducts.map((product_id) => ({
                relatedProduct: {
                  connect: { product_id: Number(product_id) },
                },
              })),
            }),
          },
        }),
      };

      if (!isOnlineBuyable) {
        productUpdateQuery.offline_reason = stepTwoData.offline_reason;
      }

      result = await prisma.product.update({
        where: { product_id: product_id },
        data: productUpdateQuery,
      });
    }

    return NextResponse.json({
      message: "Product updated successfully",
      result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: error.errors,
        },
        { status: 400 }
      );
    }
    console.log("error from catch", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const product_id = Number(params.id);

    const product = await prisma.product.findUnique({
      where: { product_id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 400 });
    }

    const productVariations = await prisma.productVariation.findMany({
      where: { product_id },
    });

    const variationIds = productVariations.map(
      (variation) => variation.variation_id
    );

    await prisma.productVariationAttribute.deleteMany({
      where: {
        productVariation_id: { in: variationIds },
      },
    });

    await prisma.productVariation.deleteMany({
      where: { product_id: product_id },
    });

    await prisma.productAttributeValue.deleteMany({
      where: { product_id: product_id },
    });

    await prisma.productTag.deleteMany({
      where: { product_id },
    });

    await prisma.productChars.deleteMany({
      where: { product_id },
    });

    await prisma.productAttribute.deleteMany({
      where: { product_id },
    });

    // await prisma.productCategory.deleteMany({
    //   where: { product_id },
    // });

    await prisma.productCollection.deleteMany({
      where: { product_id },
    });
    await prisma.productPatten.deleteMany({
      where: { product_id },
    });

    await prisma.productState.deleteMany({
      where: { product_id },
    });

    await prisma.productGender.deleteMany({
      where: { product_id },
    });

    // Delete the product
    const result = await prisma.product.delete({
      where: { product_id },
    });
    return NextResponse.json(
      { message: "Product successfully Deleted", result },
      { status: 201 }
    );
  } catch (error) {
    console.log("error from catch", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
