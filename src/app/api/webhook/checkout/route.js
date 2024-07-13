import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY;
  const sig = headers().get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  const eventType = event.type;
  if (
    eventType !== "checkout.session.completed" &&
    eventType !== "checkout.session.async_payment_succeeded"
  )
    return new Response("Server Error", {
      status: 500,
    });
  const data = event.data.object;
  const metadata = data.metadata;
  const userId = metadata.userId;
  const priceId = metadata.priceId;
  const created = data.created;
  const currency = data.currency;
  const customerDetails = data.customer_details;
  const amount = data.amount_total;
  const transactionDetails = {
    userId,
    priceId,
    created,
    currency,
    customerDetails,
    amount,
  };
  try {
    if (metadata && metadata.order_id) {
      const findOrder = prisma.order.findFirst({
        where: { id: metadata.order_id },
      });
      if (findOrder) {
        let updateOrder = prisma.order.update({
          where: { order_id: findOrder.id },
          data: {
            status: OrderStatus.PROCESSING,
            paymentResponse: JSON.stringify(transactionDetails),
          },
        });
      }
    }

    // database update here
    return new NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return new NextResponse.json("OK error", { status: 200 });
  }
}
