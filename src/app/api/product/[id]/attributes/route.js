import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const product_id = Number(params.id);

    const product = await prisma.product.findUnique({
      where: { product_id },
      select: {
        product_id: true,
        product_name: true,
        attributes: {
            include: {
                attribute: true
            }
        },
        ProductAttributeValue: {
          include: {
            productvariations: true,
          },
        },
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
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}
