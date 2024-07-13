import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

export async function createOrder(user, requestData) {
  const shippingAddress = requestData.shippingAddress;
  const billingAddress = requestData.billingAddress;
  const paymentMethod = requestData.paymentMethod;
  const userCart = await prisma.cart.findFirst({
    where: { user_id: user.id },
    include: {
      cartItems: {
        include: {
          productVariation: {
            include: {
              productAttributeValues: {
                include: {
                  productAttributeValue: {
                    include: {
                      attribute: true,
                      attributeValue: true,
                    },
                  },
                },
              },
              product: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // find seller ids
  let sellerId = [];
  if (userCart.cartItems.length > 0) {
    userCart.cartItems.map((item) => {
      sellerId.push(item.productVariation?.product?.user?.id);
    });
    sellerId = [...new Set(sellerId)];
  }
  const order = await prisma.order.create({
    data: {
      // userId: user.id,
      user: { connect: { id: user.id } },
      seller: { create: sellerId.map((userS) => ({ user_id: userS })) },
      shippingAddress,
      billingAddress: shippingAddress,
      paymentMethod,
      status: OrderStatus.PENDING,
      orderItems: {
        create: userCart.cartItems.map((item) => ({
          variationData: JSON.stringify(item.productVariation),
          name: item.productVariation?.product?.product_name,
          productVariationId: item.variation_id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });
  if (order) {
    await prisma.cart.delete({ where: { cart_id: userCart.cart_id } });
    return order;
  }
  return false;
}
export async function POST(request) {
  const requestData = await request.formData();
  const shippingAddress = requestData.get("shippingAddress");
  const billingAddress = requestData.get("billingAddress");
  const paymentMethod = requestData.get("paymentMethod");
  try {
    const user = await checkUserSession();
    const order = await createOrder(user, {
      shippingAddress,
      billingAddress,
      paymentMethod,
    });
    if (order && order.id) {
      return NextResponse.json(
        {
          success: true,
          message: `Order Created Successfully`,
          order,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Order not created",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}
