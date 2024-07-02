"use server";
import { checkUserSession } from "@/app/(frontend)/layout";
import prisma from "@/lib/prisma";
import { z } from "zod";

const cartSchema = z.object({
  user_id: z.string().min(1, "user_id required"),
  cart_total: z.number().min(0, "cart_total required").optional(),
  discount: z.number().min(0, "discount required").optional(),
  discount_type: z.string().optional(),
});

const cartItemSchema = z.object({
  cart_id: z.number().min(1, "cart_id required"),
  variation_id: z.number().min(1, "variation_id required"),
  quantity: z.number().min(1, "quantity required"),
  price: z.number().min(1, "price required").optional(),
});

const addToCart = async (item) => {
  try {
    const user = await checkUserSession();
    const variation = await prisma.productVariation.findFirst({
      where: { variation_id: item.variation_id },
    });

    if (!variation) {
      return {
        error: `Product Variation couldn't found with variation_id ${item.variation_id}`,
        status: "error",
      };
    }

    const price = variation.selling_price
      ? variation.selling_price
      : variation.regular_price;

    const cart = await prisma.cart.findFirst({
      where: { user_id: user.id },
    });

    if (!cart) {
      // cart is not create for this user, create new one
      const cartData = cartSchema.parse({
        user_id: user.id,
        cart_total: 0,
        discount: 0,
        discount_type: "",
      });

      const cart = await prisma.cart.create({
        data: cartData,
      });

      const cartItemData = cartItemSchema.parse({
        cart_id: cart.cart_id,
        variation_id: item.variation_id,
        price,
        quantity: item.quantity,
      });

      const cartItem = await prisma.cartItem.create({
        data: {
          cart: {
            connect: { cart_id: cartItemData.cart_id },
          },
          productVariation: {
            connect: { variation_id: cartItemData.variation_id },
          },
          price: cartItemData.price,
          quantity: cartItemData.quantity,
        },
        include: {
          productVariation: {
            include: { product: true },
          },
        },
      });

      return {
        message: "Item added to cart successfully",
        cartItem,
        status: "success",
      };
    } else {
      // cart is already available add cartitem
      const cartWithCartItem = await prisma.cartItem.findFirst({
        where: { cart_id: cart.cart_id, variation_id: item.variation_id },
      });

      if (cartWithCartItem) {
        // cart item is already available for this variation
        const cartItemData = cartItemSchema.parse({
          cart_id: cart.cart_id,
          variation_id: item.variation_id,
          price,
          quantity: Number(cartWithCartItem.quantity) + item.quantity,
        });

        const cartItem = await prisma.cartItem.update({
          where: { cartItem_id: cartWithCartItem.cartItem_id },
          data: {
            quantity: cartItemData.quantity,
          },
          include: {
            productVariation: {
              include: { product: true },
            },
          },
        });
        return {
          message: "Cart Item updated successfully",
          cartItem,
          status: "success",
        };
      } else {
        // add variation to cart item
        const cartItemData = cartItemSchema.parse({
          cart_id: cart.cart_id,
          variation_id: item.variation_id,
          price,
          quantity: item.quantity,
        });
        const cartItem = await prisma.cartItem.create({
          data: {
            cart: {
              connect: { cart_id: cartItemData.cart_id },
            },
            productVariation: {
              connect: { variation_id: cartItemData.variation_id },
            },
            price: cartItemData.price,
            quantity: cartItemData.quantity,
          },
          include: {
            productVariation: {
              include: { product: true },
            },
          },
        });
        return {
          message: "Item added to cart successfully",
          cartItem,
          status: "success",
        };
      }
    }
  } catch (error) {
    if (error.name === "ZodError") {
      return {
        error: "Validation Error",
        error: error.errors,
        status: "error",
      };
    }
    return { error: "Internal server error", status: "error" };
  }
};
export default addToCart;
