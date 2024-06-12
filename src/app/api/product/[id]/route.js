import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  status: z.string().optional(),
  country_id: z.number().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  attributes: z.array(z.string()),
  category: z.number(),
  subCategory: z.number(),
  isOnlineBuyable: z.boolean().optional(),
  collections: z.array(z.string()).optional().nullable(),
  patterns: z.array(z.string()).optional().nullable(),
  states: z.array(z.string()).optional().nullable(),
  genders: z.array(z.string()).optional().nullable(),
});

const checkUserSession = async () => {
  const session = await getServerSession();
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });
    return user;
  }
  return false;
};

export async function GET(request, { params }) {
  try {
    const product_id = Number(params.id);

    const product = await prisma.product.findUnique({
      where: { product_id },
      include: {
        ProductAttributeValue: true,
        attributes: true,
        variations: true,
        genders: true,
        category: true,
        tags: true,
        collections: true,
        patterns: true,
        states: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Couldn't find product record" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Product found successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await checkUserSession();
    const product_id = Number(params.id);
    const res = await request.formData();

    const product_name = res.get("product_name");
    const status = res.get("status") ? res.get("status") : "DRAFT";
    const country_id = res.get("country_id")
      ? Number(res.get("country_id"))
      : null;
    const tags = res.get("tags") !== "" ? res.get("tags").split(",") : null;
    const attributes = res.get("attributes").split(",");
    const category = Number(res.get("category"));
    const subCategory = Number(res.get("subCategory"));
    const isOnlineBuyable = res.get("isOnlineBuyable") === "true";
    const collections =
      res.get("collections") !== "" ? res.get("collections").split(",") : null;
    const patterns =
      res.get("patterns") !== "" ? res.get("patterns").split(",") : null;
    const states =
      res.get("states") !== "" ? res.get("states").split(",") : null;
    const genders =
      res.get("genders") !== "" ? res.get("genders").split(",") : null;

    const productData = productSchema.parse({
      product_name,
      status,
      country_id,
      tags,
      attributes,
      category,
      subCategory,
      isOnlineBuyable,
      collections,
      patterns,
      states,
      genders,
    });

    const result = await prisma.product.update({
      where: { product_id: product_id },
      data: {
        product_name: productData.product_name,
        status: productData.status,
        isOnlineBuyable: productData.isOnlineBuyable,
        attributes: {
          deleteMany: {},
          create: [
            ...productData.attributes.map((attribute_id) => {
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
        subcategory: {
          connect: { category_id: subCategory },
        },
        ...(productData.country_id && {
          country: {
            connect: { country_id: productData.country_id },
          },
        }),
        ...(tags &&
          tags.length > 0 && {
            tags: {
              deleteMany: {},
              create: tags.map((tag_id) => ({
                tag: {
                  connect: { tag_id: Number(tag_id) },
                },
              })),
            },
          }),
        ...(productData.collections &&
          productData.collections.length > 0 && {
            collections: {
              deleteMany: {},
              create: productData.collections.map((collection_id) => ({
                collection: {
                  connect: { collection_id: Number(collection_id) },
                },
              })),
            },
          }),
        ...(productData.patterns &&
          productData.patterns.length > 0 && {
            patterns: {
              deleteMany: {},
              create: productData.patterns.map((pattern_id) => ({
                pattern: {
                  connect: { pattern_id: Number(pattern_id) },
                },
              })),
            },
          }),
        ...(productData.states &&
          productData.states.length > 0 && {
            states: {
              deleteMany: {},
              create: productData.states.map((state_id) => ({
                state: {
                  connect: { state_id: Number(state_id) },
                },
              })),
            },
          }),
        ...(productData.genders &&
          productData.genders.length > 0 && {
            genders: {
              deleteMany: {},
              create: productData.genders.map((gender_id) => ({
                gender: {
                  connect: { gender_id: Number(gender_id) },
                },
              })),
            },
          }),
      },
    });

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
