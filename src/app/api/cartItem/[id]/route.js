import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const cartItemSchema = z.object({
  cart_id: z.number().min(1, "cart_id required"),
  variation_id: z.number().min(1, "variation_id required"),
  price: z.number().min(1, "price required"),
  quantity: z.number().min(1, "quantity required"),
});

const cartSchema = z.object({
  user_id: z.string().min(1, "user_id required"),
  cart_total: z.number().min(0, "cart_total required"),
  discount: z.number().min(0, "discount required"),
  discount_type: z.string().min(1, "discount_type required"),
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

export async function PUT(request, { params }) {
  try {
    const cartItem_id = Number(params.id);
    const user = await checkUserSession();
    const res = await request.formData();

    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItem_id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "CartItem not found, try adding new Item." },
        { status: 400 }
      );
    }

    const user_id = user.id;
    // const cart_id = res.get("cart_id");
    const cart_id = cartItem.cart_id;
    // const variation_id = res.get("variation_id");
    const variation_id = cartItem.variation_id;

    const variation = await prisma.productVariation.findFirst({
      where: { variation_id },
    });

    if (!variation) {
      return NextResponse.json(
        {
          error: `Product Variation couldn't found with variation_id ${variation_id}`,
        },
        { status: 400 }
      );
    }
    const price = variation.selling_price
      ? variation.selling_price
      : variation.regular_price;
    const quantity = Number(res.get("quantity"));
    // const discount = parseFloat(res.get("discount") ? res.get("discount") : 0);
    // const discount_type = res.get("discount_type")
    //   ? res.get("discount_type")
    //   : "fixedAmount";

    const cart = await prisma.cart.findFirst({
      where: { cart_id },
    });

    const discount = cart.discount;
    const discount_type = cart.discount_type;

    // let cart_total = cart.cart_total;
    // let previous_item_total = cartItem.price * cartItem.quantity;
    // let item_total = price * quantity;
    // if (discount === "percentage") {
    //   item_total = item_total + (item_total * discount) / 100;
    //   previous_item_total =
    //     previous_item_total + (previous_item_total * discount) / 100;
    // } else {
    //   item_total = item_total + discount;
    //   previous_item_total = previous_item_total + discount;
    // }

    // cart_total = Number(
    //   (cart_total + item_total - previous_item_total).toFixed(2)
    // );

    const cartItemData = cartItemSchema.parse({
      cart_id,
      variation_id,
      price,
      quantity,
    });

    const updateCartItem = await prisma.cartItem.update({
      where: { cartItem_id },
      data: {
        price: cartItemData.price,
        quantity: cartItemData.quantity,
      },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: cartItem.cart_id },
    });

    let cart_total = cartItems.reduce((total, item) => {
      let item_total = item.price * item.quantity;
      if (discount_type === "percentage") {
        item_total = item_total - (item_total * discount) / 100;
      } else {
        item_total = item_total - discount;
      }
      return total + item_total;
    }, 0);

    const cartData = cartSchema.parse({
      user_id,
      cart_total,
      discount,
      discount_type,
    });

    const updateCart = await prisma.cart.update({
      where: { cart_id: cartItemData.cart_id },
      data: {
        cart_total: cartData.cart_total,
        discount: cartData.discount,
        discount_type: cartData.discount_type,
      },
    });

    return NextResponse.json(
      { message: "User cartItem updated successfully", updateCartItem },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await checkUserSession();
    const cartItem_id = Number(params.id);

    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItem_id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Couldn't find the cartItem" },
        { status: 500 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { cart_id: cartItem.cart_id },
    });

    const user_id = user.id;
    const discount = cart.discount;
    const discount_type = cart.discount_type;

    const deletedCartItem = await prisma.cartItem.delete({
      where: { cartItem_id },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: cartItem.cart_id },
    });

    let cart_total = cartItems.reduce((total, item) => {
      let item_total = item.price * item.quantity;
      if (discount_type === "percentage") {
        item_total = item_total - (item_total * discount) / 100;
      } else {
        item_total = item_total - discount;
      }
      return total + item_total;
    }, 0);

    const cartData = cartSchema.parse({
      user_id,
      cart_total,
      discount,
      discount_type,
    });

    const updateCart = await prisma.cart.update({
      where: { cart_id: cartItem.cart_id },
      data: {
        cart_total: cartData.cart_total,
        discount: cartData.discount,
        discount_type: cartData.discount_type,
      },
    });

    return NextResponse.json(
      {
        message: "cartItem removed from cart successfully",
        cartItem,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", issues: error.errors },
        { status: 400 }
      );
    }
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}
