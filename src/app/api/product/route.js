import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";

const productSchema = z.object({
  product_name: z.string().min(1, "Product name required").max(50),
  description: z.string().min(1, "Description of product required").max(100),
  sku: z.string(),
  status: z.string().optional(),
  user_id: z.string(),
  tags: z.array(z.string()),
  attributes: z.array(z.string()),
  category: z.array(z.string()),
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

    const res = await request.formData();

    const sku = res.get("sku");

    const exists = await prisma.product.findFirst({
      where: { sku },
    });

    if (exists) {
      return NextResponse.json(
        { error: `Product with similar ${sku} already exists` },
        { status: 400 }
      );
    }

    const product_name = res.get("product_name");
    const description = res.get("description");
    const status = res.get("status") ? res.get("status") : "DRAFT";
    const user_id = user.id;
    const tags = res.get("tags").split(",");
    const attributes = res.get("attributes").split(",");
    const category = res.get("category").split(",");

    const productData = productSchema.parse({
      product_name,
      sku,
      description,
      status,
      user_id,
      tags,
      attributes,
      category,
    });

    const files = res.get("files");
    let images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(process.cwd(), "/public/assets/uploads", file.name);
        await writeFile(path, buffer);

        images.push("/assets/uploads/" + Date.now() + file.name);
      }
    }

    const result = await prisma.product.create({
      data: {
        product_name: productData.product_name,
        sku: productData.sku,
        description: productData.description,
        status: status,
        images: images,
        user: {
          connect: { id: user_id },
        },
        tags: {
          create: [
            ...tags.map((tag_id) => {
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
          create: [
            ...attributes.map((attribute_id) => {
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
          create: [
            ...category.map((category_id) => {
              return {
                category: {
                  connect: {
                    category_id: Number(category_id),
                  },
                },
              };
            }),
          ],
        },
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
