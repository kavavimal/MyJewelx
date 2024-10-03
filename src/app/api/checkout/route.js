import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/sendMails";
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
  const paymentResponse = requestData.paymentResponse;
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
  if (!userCart || userCart.cartItems.length === 0) {
    throw new Error("Cart is empty or cart items could not be retrieved.");
  }
  // find seller ids
  let sellerId = [];
  let productItemsUpdate = [];

  for (const item of userCart.cartItems) {
    // Check if stock management is true
    if (item.productVariation.stock_management) {
      let nQuantity = item.productVariation.quantity - item.quantity;
      let updateProductItem = {};

      if (nQuantity <= 0) {
        updateProductItem = { quantity: 0, stock_status: false };
      } else {
        updateProductItem = { quantity: nQuantity };
      }

      productItemsUpdate.push({
        data: updateProductItem,
        variation_id: item.productVariation.variation_id,
      });
    }
    sellerId.push(item.productVariation.product.user.id);
  }

  sellerId = [...new Set(sellerId)];

  let orderData = {
    user: { connect: { id: user.id } },
    seller: { create: sellerId.map((userS) => ({ user_id: userS })) },
    shippingAddress,
    billingAddress: shippingAddress,
    paymentMethod,
    orderTotal: userCart.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: OrderStatus.PENDING,
    orderItems: {
      create: userCart.cartItems.map((item) => ({
        sellerId: item.productVariation.product.user_id,
        variationData: JSON.stringify(item.productVariation),
        name: item.productVariation.product.product_name,
        productVariationId: item.productVariation.variation_id,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
    },
  };

  if (paymentResponse && paymentResponse !== null && paymentResponse !== "") {
    orderData.status = OrderStatus.PROCESSING;
    orderData.paymentResponse = JSON.stringify(paymentResponse);
    if (typeof paymentResponse === "string" && paymentResponse !== "") {
      let pr = JSON.parse(paymentResponse);
      if (pr.paidAmount) {
        orderData.paidAmount = parseFloat(pr.paidAmount);
      }
    }
  }
  const order = await prisma.order.create({
    data: orderData,
    include: {
      orderItems: true,
      seller: {
        include: {
          user: {
            include: {
              vendor: true,
            },
          },
        },
      },
      user: true,
    },
  });
  try {
    const order = await prisma.order.create({
      data: orderData,
      include: {
        orderItems: true,
        seller: {
          include: {
            user: {
              include: {
                vendor: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (productItemsUpdate.length > 0) {
      await Promise.all(
        productItemsUpdate.map(async (variationProd) => {
          await prisma.productVariation.update({
            where: { variation_id: variationProd.variation_id },
            data: { ...variationProd.data },
          });
        })
      );
    }

    await prisma.cart.delete({ where: { cart_id: userCart.cart_id } });

    // Send order email if the status is PROCESSING
    if (order.status === OrderStatus.PROCESSING) {
      sendOrderEmail(user, order);
    }

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order.");
  }
}
export async function POST(request) {
  const requestData = await request.formData();
  const shippingAddress = requestData.get("shippingAddress");
  // const billingAddress = requestData.get("billingAddress");
  const billingAddress = shippingAddress;
  const paymentMethod = requestData.get("paymentMethod");
  const paymentResponse = requestData.get("paymentResponse");
  try {
    const user = await checkUserSession();
    const order = await createOrder(user, {
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentResponse,
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
