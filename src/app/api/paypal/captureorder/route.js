import prisma from "@/lib/prisma";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.formData();
    const orderID = req.get("orderID");

    if (!orderID)
      return NextResponse.json(
        { success: false, message: "Please Provide order ID" },
        { status: 404 }
      );

    //Capture order to complete payment
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const response = await PaypalClient.execute(request);
    if (!response) {
      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured at backend" });
    }

    // Your Custom Code to Update Order Status
    // And Other stuff that is related to that order, like wallet
    // Here I am updateing the wallet and sending it back to frontend to update it on frontend

    return NextResponse.json(
      {
        message:
          "paypal amount captured successfully, return wallet in data here",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
