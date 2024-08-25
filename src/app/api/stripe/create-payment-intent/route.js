import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import { stripe } from "@/lib/stripe";
import { AddressType } from "@prisma/client";
const calculateTax = false;

const getUserAddress = (uid) =>
  prisma.address.findFirst({
    where: { userId: uid, type: AddressType.SHIPPING },
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

const calculate_tax = async (
  orderAmount,
  currency,
  line_items,
  shippingAddress
) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postal_code: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
      address_source: "shipping",
    },
    line_items: line_items,
  });

  return taxCalculation;
};

export async function POST(request) {
  const user = await checkUserSession();
  try {
    const req = await request.formData();
    // const { paymentMethodType, paymentMethodOptions, items } = request.body;
    const paymentMethodType = req.get("paymentMethodType");
    const paymentMethodOptions = req.get("paymentMethodOptions");
    let items = req.get("items");
    items = JSON.parse(items);
    // const shippingAddress = req.get("shippingAddress");
    // const billingAddress = req.get("billingAddress");
    const currency = CURRENCY_SYMBOL;
    const shippingAddress = await getUserAddress(user.id);
    // Each payment method type has support for different currencies. In order to
    // support many payment method types and several currencies, this server
    // endpoint accepts both the payment method type and the currency as
    // parameters. To get compatible payment method types, pass
    // `automatic_payment_methods[enabled]=true` and enable types in your dashboard
    // at https://dashboard.stripe.com/settings/payment_methods.
    //
    // Some example payment method types include `card`, `ideal`, and `link`.
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
          unit_amount: parseFloat(item.price) * 100,
        },
      };
    });

    let orderAmount = transformedItem.reduce(
      (total, item) => total + parseFloat(item.price_data.unit_amount),
      0
    );
    let params = {};
    if (calculateTax) {
      let taxCalculation = await calculate_tax(
        orderAmount,
        currency,
        transformedItem,
        shippingAddress
      );
      params = {
        payment_method_types:
          paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
        amount: Math.ceil(taxCalculation.amount_total),
        currency: currency,
        description: "pay by stripe with tax",
        metadata: { tax_calculation: taxCalculation.id },
      };
    } else {
      params = {
        payment_method_types:
          paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
        amount: Math.ceil(orderAmount),
        currency: currency,
        description: "pay by stripe",
      };
    }
    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.

    if (paymentMethodType === "acss_debit") {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: "sporadic",
            transaction_type: "personal",
          },
        },
      };
    } else if (paymentMethodType === "konbini") {
      /**
       * Default value of the payment_method_options
       */
      params.payment_method_options = {
        konbini: {
          product_description: "myjewlex",
          expires_after_days: 3,
        },
      };
    } else if (paymentMethodType === "customer_balance") {
      params.payment_method_data = {
        type: "customer_balance",
      };
      params.confirm = true;
    }
    params.customer =
      request.body.customerId ||
      (await stripe.customers
        .create({
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          description: "test description",
          email: user.email,
          // 'source' : $token,
          address: {
            city: shippingAddress.city,
            country: shippingAddress.country,
            line1: shippingAddress.street,
            line2: shippingAddress.address_2,
            postal_code: shippingAddress.zipCode,
            state: shippingAddress.state,
          },
        })
        .then((data) => data.id));

    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }

    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    const paymentIntent = await stripe.paymentIntents.create(params);
    // Send publishable key and PaymentIntent details to client
    return NextResponse.json(
      {
        message: "Stripe order created successfully",
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
        billingDetails: {
          name: `${user.firstName} ${user.lastName}`,
        },
        // order: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('cache error',error);
    return new NextResponse.json({
      message: error.message || "Internal Server",
      error 
    }, {
      status: 400
    });
  }
}
