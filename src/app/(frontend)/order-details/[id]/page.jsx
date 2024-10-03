import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/sendMails";
import { stripe } from "@/lib/stripe";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import CheckoutItem from "./components/CheckoutItem";
import CustomerDetails from "./components/CustomerDetails";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const revalidate = 0;

const getSessionAndSetOrder = async (sessionId, orderId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session && session.status === "complete") {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
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
      data: {
        status: OrderStatus.PROCESSING,
        paymentResponse: JSON.stringify(session),
        paidAmount: session.amount_total,
      },
    });
    sendOrderEmail(order.user, order);
    return { session, order };
  }

  throw new Error("You should not be able to access this page");
};

const updateOrderCanceled = async (id) => {
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status: OrderStatus.USERCANCELLED },
    include: {
      orderItems: true,
      seller: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });
  return order;
};

const fetchOrder = async (id) => {
  const order = await prisma.order.findFirst({
    where: { id: Number(id) },
    include: {
      orderItems: true,
      seller: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });
  return order;
};

export default async function OrderDetailsPage({ params, searchParams }) {
  let order = await fetchOrder(params.id);
  if (!order.id) {
    return "No order found";
  }
  let user = order.user;
  if (order.paymentMethod === "stripe" && searchParams.success) {
    const sessionId = searchParams.session_id;
    if (!sessionId) throw new Error("Incorrect callback URL");
    const sessionData = await getSessionAndSetOrder(sessionId, order.id);
    order = sessionData.order;
  } else if (
    order.paymentMethod === "stripe" &&
    searchParams.stripeStatus &&
    searchParams.stripeStatus === "cancel"
  ) {
    if (order.status === OrderStatus.PENDING) {
      updateOrderCanceled(order.id);
    }
  }

  const orderTotal = order.orderItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="container">
      <section className="relative">
        <div className="container">
          <div className="border-b border-b-primary-200 py-[20px] mb-[30px]">
            <Breadcrumbs
              items={[
                {
                  link: "/Order",
                  label: "Order",
                  current: true,
                },
              ]}
            />
          </div>
          <div className="pb-[30px] flex gap-4">
            <div className="flex-1">
              <div className="pb-[15px] sm:border-b border-b-blueGray-300">
                <div className="w-full sm:w-[350px]">
                  <h3 className="text-black text-[28px]">
                    Thank you for your order!
                  </h3>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-left text-secondary-100 font-light text-base py-1">
                        Order Number :
                      </p>
                      <p>{params?.id}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-left text-secondary-100 font-light text-base py-1">
                        Payment Status :
                      </p>
                      <p>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23 12L20.56 9.22004L20.9 5.54004L17.29 4.72004L15.4 1.54004L12 3.00004L8.6 1.54004L6.71 4.72004L3.1 5.53004L3.44 9.21004L1 12L3.44 14.78L3.1 18.47L6.71 19.29L8.6 22.47L12 21L15.4 22.46L17.29 19.28L20.9 18.46L20.56 14.78L23 12ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58004L18 9.00004L10 17Z"
                            fill="#F0AE11"
                          />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-left text-secondary-100 font-light text-base py-1">
                        Order Status :
                      </p>
                      <p className="font-[#D4180E]">{order.status}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:hidden block sm:w-[400px]">
                <CustomerDetails order={order} total={orderTotal} user={user} />
              </div>
              <div className="pt-0 sm:pt-[15px]">
                <h3 className="text-xl py-[15px]">
                  {order.orderItems?.length || 0} Product Checkout
                </h3>
                <div>
                  <div className="px-[15px] pt-[20px] pb-[15px] border border-blueGray-400">
                    {order.orderItems.length > 0 &&
                      order.orderItems.map((item, index) => {
                        const variation = JSON.parse(item.variationData);
                        return (
                          <CheckoutItem
                            key={index}
                            item={item}
                            variation={variation}
                            index={index}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="mt-[15px]">
                  <p className="text-blueGray-600 text-base">
                    Need help related to your order ?{" "}
                    <Link href="/contact-us" className="text-primary-200">
                      Contact us
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:block hidden sm:w-[400px]">
              <CustomerDetails order={order} total={orderTotal} user={user} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
