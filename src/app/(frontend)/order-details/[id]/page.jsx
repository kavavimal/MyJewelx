import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/frontend/Container";
import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/sendMails";
import { stripe } from "@/lib/stripe";
import { OrderStatus } from "@prisma/client";
import SendInvoice from "./SendInvoice";
import CancelOrder from "./CancelOrder";
import { redirect } from "next/navigation";
import CustomerDetails from "./components/CustomerDetails";
import Image from "next/image";
import Link from "next/link";
import CheckoutItem from "./components/CheckoutItem";

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
  const variationData = JSON.parse(order.orderItems[0].variationData);
  console.log(order);
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
    <Container>
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

          {/* <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Order Placed
          </h2>

          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks for making a purchase you can check our order summary below
          </p>
          <div
            className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span className="text-indigo-600 font-medium">
                    #{order.id}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Order Status :{" "}
                  <span className="text-gray-400 font-medium">
                    {order.status}
                  </span>
                </p>
              </div>
              <SendInvoice order={order} />
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              {order.orderItems.length > 0 &&
                order.orderItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                    >
                      <div className="img-box max-lg:w-full">
                        <img
                          src="/assets/images/image.png"
                          alt="Premium Watch"
                          className="aspect-square w-full lg:max-w-[140px]"
                        />
                      </div>
                      <div className="flex flex-row items-center w-full ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                          <div className="flex items-center">
                            <div className="">
                              <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                {item.name}
                              </h2>
                              <div className="flex items-center ">
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Size:{" "}
                                  <span className="text-gray-500">100 ml</span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black ">
                                  Qty:{" "}
                                  <span className="text-gray-500">
                                    {item.quantity}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5">
                            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">
                                  price
                                </p>
                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                  ${item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                {[OrderStatus.PENDING, OrderStatus.PROCESSING].includes(
                  order.status
                ) ? (
                  <CancelOrder order_id={order.id} />
                ) : (
                  ""
                )}
                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Paid using{" "}
                  <span className="text-gray-500">{order.paymentMethod}</span>
                </p>
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span className="text-indigo-600"> ${orderTotal}</span>
              </p>
            </div>
          </div> */}
          <div className="pb-[30px] flex gap-4">
            <div className="flex-1">
              <div className="pb-[15px] border-b border-b-blueGray-300">
                <div className="w-[350px]">
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
              <div className="pt-[15px]">
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
            <div className="w-[400px]">
              <CustomerDetails order={order} total={orderTotal} user={user} />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
