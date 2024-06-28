"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";

export const getCart = async () => {
  const user = await checkUserSession();
  try {
    const cartData = await prisma.cart.findFirst({
      where: {
        user_id: user.id,
      },
      include: {
        cartItems: {
          include: {
            productVariation: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return {
      message: "cart data available",
      cartData,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};

export const removeFromCart = async (item_id) => {
  try {
    const cartData = await prisma.cartItem.delete({
      where: { cartItem_id: item_id },
    });
    return {
      message: "Item Removed from Cart",
      cartData,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};

export const updateCartQuantity = async (item_id, quantity) => {
  try {
    const cartData = await prisma.cartItem.update({
      where: { cartItem_id: item_id },
      data: {
        quantity: quantity,
      },
    });
    return {
      message: "Cart item updated successfully",
      cartData,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};
