import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CURRENCY_SYMBOL } from "@/utils/constants";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    let items = req.get("items");
    items = JSON.parse(items);
    const redirectURL = process.env.NEXT_BASE_URL;

    const transformedItem = items.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: CURRENCY_SYMBOL,
          product_data: {
            images: [process.env.NEXT_BASE_URL + item.image],
            name: item.name,
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItem,
      mode: "payment",
      success_url: redirectURL + "/checkout/?stripestatus=success",
      cancel_url: redirectURL + "/checkout/?stripestatus=cancel",
      metadata: {
        user: user.id,
      },
    });

    return NextResponse.json(
      { message: "Stripe order created successfully", id: session.id },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
