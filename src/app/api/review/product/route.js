import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.number(),
  userId: z.string(),
  rating: z.number(),
  text: z.string(),
  recommandation: z.string().optional(),
});
// add review to Product
export async function POST(request) {
  try {
    const req = await request.formData();

    const productId = Number(req.get("productId"));
    const userId = req.get("userId");// from user login user id
    const rating = Number(req.get("rating"));
    const text = req.get("review");
    const recommandation = req.get("recommandation");
    
    const parsedAttributeAndValues = reviewSchema.parse({
      productId: productId,
      userId: userId,
      rating: rating,
      text: text,
      recommandation: recommandation,
    });

    const result = await prisma.review.create({
      data: {
        fromUserId: userId,
        rating: rating,
        text: text,
        productId: productId,
        recommandation: recommandation
      },
    });

    return NextResponse.json({message: "Review Added Successfully", review: result }, {status: 201});
  } catch (error) {
    console.error("Error in POST:", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation error",
          issues: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
