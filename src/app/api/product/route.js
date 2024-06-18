import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  status: z.string().optional(),
  user_id: z.string(),
  country_id: z.number().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  attributes: z.array(z.string()),
  category: z.number(),
  subCategory: z.number().optional().nullable(),
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

export async function POST(request) {
  try {
    const user = await checkUserSession();

    const req = await request.formData();

    const product_name = req.get("product_name");
    const status = req.get("status") ? req.get("status") : "DRAFT";
    const user_id = user.id;
    const country_id = req.get("country_id")
      ? Number(req.get("country_id"))
      : null;
    const tags = req.get("tags") !== "" ? req.get("tags").split(",") : null;
    const attributes = req.get("attributes").split(",");
    const category = Number(req.get("category"));
    const subCategory = req.get("subCategory")
      ? Number(req.get("subCategory"))
      : null;
    const isOnlineBuyable = req.get("isOnlineBuyable") === "true";
    const collections =
      req.get("collections") !== "" ? req.get("collections").split(",") : null;
    const patterns =
      req.get("patterns") !== "" ? req.get("patterns").split(",") : null;
    const states =
      req.get("states") !== "" ? req.get("states").split(",") : null;
    const genders =
      req.get("genders") !== "" ? req.get("genders").split(",") : null;

    const productData = productSchema.parse({
      product_name,
      status,
      user_id,
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

    const result = await prisma.product.create({
      data: {
        product_name: productData.product_name,
        status: status,
        user: {
          connect: { id: user_id },
        },
        isOnlineBuyable: productData.isOnlineBuyable,
        attributes: {
          create: attributes.map((attribute_id) => ({
            attribute: {
              connect: { attribute_id: Number(attribute_id) },
            },
          })),
        },
        category: {
          connect: { category_id: category },
        },
        // subcategory: {
        //   connect: { category_id: subCategory },
        // },
        ...(productData.subCategory && {
          subcategory: {
            connect: { category_id: productData.subCategory },
          },
        }),
        ...(productData.country_id && {
          country: {
            connect: { country_id: productData.country_id },
          },
        }),
        ...(tags &&
          tags.length > 0 && {
            tags: {
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
              create: productData.genders.map((gender_id) => ({
                gender: {
                  connect: { gender_id: Number(gender_id) },
                },
              })),
            },
          }),
      },
    });

    return NextResponse.json({ message: "Product added successfully", result });
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
