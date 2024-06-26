import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  status: z.string().optional(),
  user_id: z.string(),
  attributes: z.array(z.string()),
  category: z.number(),
  subCategory: z.number().optional().nullable(),
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
    const attributes = req.get("attributes").split(",");
    const category = Number(req.get("category"));
    const subCategory = req.get("subCategory")
      ? Number(req.get("subCategory"))
      : null;

    const productData = productSchema.parse({
      product_name,
      status,
      user_id,
      attributes,
      category,
      subCategory,
    });

    const result = await prisma.product.create({
      data: {
        product_name: productData.product_name,
        status: status,
        user: {
          connect: { id: user_id },
        },
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
        ...(productData.subCategory && {
          subcategory: {
            connect: { category_id: productData.subCategory },
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
