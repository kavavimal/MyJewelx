import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

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
    const files = req.getAll("files[]");
    console.log("files upload", files);
    const parsedAttributeAndValues = reviewSchema.parse({
      productId: productId,
      userId: userId,
      rating: rating,
      text: text,
      recommandation: recommandation,
    });

    const createReviewQueryData = {
      fromUserId: userId,
      rating: rating,
      text: text,
      productId: productId,
      recommandation: recommandation
    };

    let images = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const dateSuffix = Date.now();
        const uploadPath = '/assets/uploads/review';
        const dynamicFileName = `${dateSuffix}_${i}_${file.name}`;
        const path = join(
          process.cwd(),
          "/public"+uploadPath,
          dynamicFileName
        );
        await writeFile(path, buffer);

        images.push({
          path: `${uploadPath}/${dynamicFileName}`,
          image_type: "review",
        });
      }
      if (images.length > 0){
        createReviewQueryData.images = {
          //check this query for updating relations with images and variation and for delete support
          createMany: {
            data: images,
          },
        };
      }
    }
    const result = await prisma.review.create({
      data: createReviewQueryData,
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
