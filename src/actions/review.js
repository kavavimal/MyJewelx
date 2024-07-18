"use server";
import prisma from "@/lib/prisma";

export const addReviewReplay = async (review_id, replay) => {
    try {
      const review = await prisma.review.update({
        where: { id: review_id },
        data: {
          replay: replay,
        },
      });
      return {
          status: "success",
          message: "Review Replay added successfully",
          review,
      };
    } catch (e) {
      return {
        message: "Something went wrong",
        error: e,
        status: "error",
      };
    }
  };