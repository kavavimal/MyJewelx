import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import { createOrder } from "../../checkout/route";
import { stripe } from "@/lib/stripe";

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
  const user = await checkUserSession();
  try {
    const req = await request.formData();
    const shippingAddress = req.get("shippingAddress");
    const billingAddress = req.get("billingAddress");
    const paymentMethod = req.get("paymentMethod");

    let items = req.get("items");
    items = JSON.parse(items);
    const redirectURL = process.env.NEXT_BASE_URL;

    const transformedItem = items.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: CURRENCY_SYMBOL,
          product_data: {
            images: item.image ? [process.env.NEXT_BASE_URL + item.image] : [],
            name: item.name,
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
      };
    });

    const order = await createOrder(user, {
      shippingAddress,
      billingAddress,
      paymentMethod,
    });
    if (order && order.id) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedItem,
        mode: "payment",
        success_url: redirectURL + `/order-details/${order.id}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:
          redirectURL + `/order-details/${order.id}?stripeStatus=cancel`,
        metadata: {
          user: "user_" + user.id,
          order: "order_" + order.id,
        },
      });

      return NextResponse.json(
        {
          message: "Stripe order created successfully",
          id: session.id,
          order: order,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: " order not created", order },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
