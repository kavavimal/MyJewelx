"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";

export const fetchWishlist = async () => {
  const user = await checkUserSession();
  if (!user) {
    return {
      message: "User is not login",
      status: "error"
    }
  }
  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });

    return {
      message: "fetch Wishlist successfully",
      wishlistItems,
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
export const addToWishlist = async (productId) => {
  const user = await checkUserSession();
  try {
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId: productId,
      },
      include: {
        product: true
      }
    });

    return {
      message: "Item Added To Wishlist",
      wishlistItem,
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
export const removeFromWishlist = async (productId) => {
  const user = await checkUserSession();
  try {
    await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        productId: productId,
      },
    });

    return {
      message: "Item Removed from Wishlist",
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
