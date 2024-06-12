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

export async function POST(request) {
  try {
    const user = await checkUserSession();
    const user_id = user.id;
    const res = await request.formData();

    // const cart_id = res.get("cart_id");
    const variation_id = Number(res.get("variation_id"));

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

    // const price = res.get("price");
    const quantity = Number(res.get("quantity"));
    const discount = parseFloat(res.get("discount") ? res.get("discount") : 0);
    console.log("discount", discount);
    const discount_type = res.get("discount_type")
      ? res.get("discount_type")
      : "fixedAmount";

    const cart = await prisma.cart.findFirst({
      where: { user_id: user_id },
    });

    if (!cart) {
      let cart_total = 0;
      if (discount === "percentage") {
        cart_total = cart_total - (price * quantity * discount) / 100;
      } else cart_total = cart_total + price * quantity - discount;
      const cartData = cartSchema.parse({
        user_id,
        cart_total,
        discount,
        discount_type,
      });

      const cart = await prisma.cart.create({
        data: cartData,
      });

      console.log("cart", cart.cart_id);

      const cartItemData = cartItemSchema.parse({
        cart_id: cart.cart_id,
        variation_id,
        price,
        quantity,
      });
      console.log("cartItemData", cartItemData);

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
      });

      return NextResponse.json(
        { message: "Item added to cart successfully", cartItem },
        { status: 201 }
      );
    } else {
      let cart_total = cart.cart_total;
      console.log("cart_total", cart_total);
      let item_total = price * quantity;
      console.log("item_total", item_total);
      if (discount_type === "percentage") {
        item_total = item_total - (item_total * discount) / 100;
      } else item_total = item_total - discount;
      console.log("item_total", item_total);
      
      cart_total = Number((cart_total + item_total).toFixed(2));
      console.log("cart_total", cart_total);
      let cart_id = cart.cart_id;

      const cartWithCartItem = await prisma.cartItem.findFirst({
        where: { cart_id: cart_id, variation_id: variation_id },
      });

      if (cartWithCartItem) {
        return NextResponse.json(
          { error: "This product variation is already added" },
          { status: 400 }
        );
      }

      const cartData = cartSchema.parse({
        user_id,
        cart_total,
        discount,
        discount_type,
      });

      const cartItemData = cartItemSchema.parse({
        cart_id,
        variation_id,
        price,
        quantity,
      });

      const cartItem = await prisma.cartItem.create({
        data: cartItemData,
      });

      const updateCart = await prisma.cart.update({
        where : {cart_id : cartItemData.cart_id},
        data: cartData,
      });

      return NextResponse.json(
        { message: "Item added to cart successfully", cartItem },
        { status: 201 }
      );
    }
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

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { z } from "zod";

// const cartItemSchema = z.object({
//   cart_id: z.number().min(1, "cart_id required"),
//   variation_id: z.number().min(1, "variation_id required"),
//   price: z.number().min(1, "price required"),
//   quantity: z.number().min(1, "quantity required"),
// });

// export async function POST(request) {
//   try {
//     const res = await request.formData();

//     const cart_id = res.get("cart_id");
//     const variation_id = res.get("variation_id");
//     const price = res.get("price");
//     const quantity = res.get("quantity");

//     const cartItemData = cartItemSchema.parse({
//       cart_id,
//       variation_id,
//       price,
//       quantity,
//     });

//     const cart = await prisma.cart.create({
//       data: cartItemData,
//     });

//     return NextResponse.json(
//       { message: "Customer user shopping cart created successfully", cart },
//       { status: 201 }
//     );
//   } catch (error) {
//     if (error.name === "ZodError") {
//       return NextResponse.json(
//         { error: "Validation Error", issues: error.errors },
//         { status: 400 }
//       );
//     }
//     NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
