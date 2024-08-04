"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";
import { CURRENCY_SYMBOL } from "@/utils/constants";

var options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "currency",
  currency: "AED",
};

export const printPrice = (price = "") => {
  if (price === "") {
    return "";
  } else {
    return `${Number(price).toLocaleString("en-IN", options)}`;
  }
};
export const getCart = async () => {
  const user = await checkUserSession();
  if (!user)
    return {
      message: "User is not Login",
      status: "error",
    };
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
                product: {
                  include: { user: true },
                },
                image: true,
              },
            },
          },
        },
      },
    });
    return {
      message: "cart data available",
      cartData,
      status: "success",
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      status: "error",
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

export const updateCartQuantity = async (item_id, quantity) => {
  try {
    const cartData = await prisma.cartItem.update({
      where: { cartItem_id: item_id },
      data: {
        quantity: quantity,
      },
      include: {
        productVariation: {
          include: { product: true },
        },
      },
    });
    return {
      message: "Cart item updated successfully",
      cartData,
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
