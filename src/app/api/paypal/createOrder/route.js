import prisma from "@/lib/prisma";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import client from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("request order create");
  try {
    const req = await request.formData();
    const order_price = req.get("order_price");
    const user_id = req.get("user_id");

    if (!order_price || !user_id)
      return NextResponse.json(
        { success: false, message: "Please Provide order_price And User ID" },
        { status: 404 }
      );

    const PaypalClient = client();
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const reqN = new paypal.orders.OrdersCreateRequest();
    reqN.headers["prefer"] = "return=representation";
    reqN.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: CURRENCY_SYMBOL,
            value: order_price + "",
          },
        },
      ],
    });
    const response = await PaypalClient.execute(reqN);
    console.log("RES: ", response);
    if (response.statusCode !== 201) {
      return NextResponse.json(
        { error: "Some Error Occured at backend" },
        { status: 500 }
      );
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB

    return NextResponse.json(
      { message: "Paypal order created successfully, return order here", order: response.result },
      { status: 201 }
    );
  } catch (error) {
    console.log("error creating order", error);
    return NextResponse.json(
      { error: "Internal sever error" , error},
      { status: 500 }
    );
  }
}
