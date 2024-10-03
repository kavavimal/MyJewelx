"use server";
import { checkUserSession } from "./users";
import prisma from "@/lib/prisma";

export const fetchLikelist = async () => {
  const user = await checkUserSession();
  if (!user) {
    return {
      message: "User is not login",
      status: "error"
    }
  }
  try {
    const LikedItems = await prisma.like.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    return {
      message: "fetch Likes successfully",
      LikedItems,
      status: "success",
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
      status: "error",
    };
  }
};
export const addToLikedlist = async (productId) => {
  const user = await checkUserSession();
  try {
    const LikedItem = await prisma.like.create({
      data: {
        userId: user.id,
        productId: productId,
      },
    });

    return {
      message: "Item Added To Liked List",
      LikedItem,
      status: "success",
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
      status: "error",
    };
  }
};
export const removeFromLikedlist = async (productId) => {
  const user = await checkUserSession();
  try {
    await prisma.like.deleteMany({
      where: {
        userId: user.id,
        productId: productId,
      },
    });

    return {
      message: "Item Removed from Like list",
      status: "success",
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
      status: "error",
    };
  }
};
