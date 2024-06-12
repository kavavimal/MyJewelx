import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  status: z.string().optional(),
  tags: z.array(z.string()),
  country_id: z.number(),
  attributes: z.array(z.string()),
  // category: z.array(z.string()),
  category: z.number(),
  subCategory: z.number(),
  isOnlineBuyable: z.boolean(),
  collections: z.array(z.string()).optional(),
  patterns: z.array(z.string()).optional(),
  states: z.array(z.string()).optional(),
  genders: z.array(z.string()).optional(),
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
    console.log("isOnlineBuyable", res.get("isOnlineBuyable"));

    const product_name = res.get("product_name");
    const status = res.get("status") ? res.get("status") : "DRAFT";
    const country_id = Number(res.get("country_id"));
    const tags = res.get("tags").split(",");
    const attributes = res.get("attributes").split(",");
    const category = Number(res.get("category"));
    const subCategory = Number(res.get("subCategory"));
    const isOnlineBuyable =
      res.get("isOnlineBuyable") === "true" ? true : false;
    console.log("isOnlineBuyable", isOnlineBuyable);
    const collections = res.get("collections").split(",");
    const patterns = res.get("patterns").split(",");
    const states = res.get("states").split(",");
    const genders = res.get("genders").split(",");

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
        country: {
          connect: { country_id: country_id },
        },
        isOnlineBuyable: productData.isOnlineBuyable,
        tags: {
          deleteMany: {},
          create: [
            ...productData.tags.map((tag_id) => {
              return {
                tag: {
                  connect: {
                    tag_id: Number(tag_id),
                  },
                },
              };
            }),
          ],
        },
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
        // category: {
        //   deleteMany: {},
        //   create: [
        //     ...productData.category.map((category_id) => {
        //       return {
        //         category: {
        //           connect: {
        //             category_id: Number(category_id),
        //           },
        //         },
        //       };
        //     }),
        //   ],
        // },
        category: {
          connect: { category_id: category },
        },
        subcategory: {
          connect: { category_id: subCategory },
        },
        collections: {
          deleteMany: {},
          create: [
            ...productData.collections.map((collection_id) => {
              return {
                collection: {
                  connect: {
                    collection_id: Number(collection_id),
                  },
                },
              };
            }),
          ],
        },
        patterns: {
          deleteMany: {},
          create: [
            ...productData.patterns.map((pattern_id) => {
              return {
                pattern: {
                  connect: {
                    pattern_id: Number(pattern_id),
                  },
                },
              };
            }),
          ],
        },
        states: {
          deleteMany: {},
          create: [
            ...productData.states.map((state_id) => {
              return {
                state: {
                  connect: {
                    state_id: Number(state_id),
                  },
                },
              };
            }),
          ],
        },
        genders: {
          deleteMany: {},
          create: [
            ...productData.genders.map((gender_id) => {
              return {
                gender: {
                  connect: {
                    gender_id: Number(gender_id),
                  },
                },
              };
            }),
          ],
        },
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
