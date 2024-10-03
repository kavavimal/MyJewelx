import prisma from "@/lib/prisma";
import UpdateOrderStatus from "./UpdateOrderStatus";
import moment from "moment";
import Link from "next/link";
import { checkUserSession } from "@/app/actions/users";
import { AcountType } from "@prisma/client";
import Image from "next/image";
export const revalidate = 0;

const getOrders = async (order_id) => {
  return await prisma.order.findFirst({
    where: { id: Number(order_id) },
    include: {
      user: true,
      orderItems: {
        include: {
          productVariation: {
            include: {
              image: true,
            },
          },
        },
      },
      seller: { include: { user: true } },
    },
  });
};

const OrdersPage = async ({ params: { order_id } }) => {
  const session = await checkUserSession();
  // console.log(session);
  const order = await getOrders(order_id);
  let filteredOrders;
  if (session?.account_type !== AcountType.VENDOR) {
    filteredOrders = order.orderItems;
  } else {
    filteredOrders = order.orderItems.filter(
      (item) => item.sellerId === session.id
    );
  }

  const totalPrice = filteredOrders.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  const shippingAddress = JSON.parse(order.shippingAddress);
  const billingAddress = JSON.parse(order.billingAddress);

  const capitalizeWords = (str) =>
    str
      ? str
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  const uppercase = (str) => (str ? str.toUpperCase() : " ");
  const variationDataSplit = filteredOrders
    ? filteredOrders[0].productVariation?.variation_name?.split(",")
    : "";

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Order Details</h2>
        <UpdateOrderStatus
          status={order.status}
          order_id={order.id}
          item={filteredOrders}
        />
      </div>
      <div className="flex py-2 justify-between ">
        <div>
          Ordered On{" "}
          <span className="font-semibold">
            {moment(order.createdAt).format("DD MMM YYYY")}
          </span>{" "}
          | Order ID : <span className="font-semibold">{order.id}</span> | Order
          Total : <span className="font-semibold">{order.orderTotal}</span> |
          Status :<span className="font-semibold">{order.status}</span>
        </div>
        <div>
          Payment Method :{" "}
          <span className="font-semibold">
            {capitalizeWords(order.paymentMethod)}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap md:flex-nowrap gap-4 row-gap-4">
        <div className="lg:w-1/2 max-w-full border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-bold mb-2">Billing Address</h3>
          <p>
            {capitalizeWords(billingAddress.firstName)}
            {capitalizeWords(billingAddress.lastName)}
          </p>
          <p>
            {capitalizeWords(billingAddress.street)}
            {capitalizeWords(billingAddress.address_2)}
          </p>
          <p>
            {uppercase(billingAddress.city)}
            {uppercase(billingAddress.state)}
            {billingAddress.zipCode}
          </p>
          <p>{uppercase(billingAddress.country)}</p>
          <p>
            <span className="font-semibold">phone</span> :{" "}
            {billingAddress.phone}
          </p>
          <p>
            <span className="font-semibold">email</span> :{" "}
            {billingAddress.email}
          </p>
        </div>
        <div className="lg:w-1/2 max-w-full border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-bold mb-2"> Shipping Address</h3>
          <p>
            {capitalizeWords(shippingAddress.firstName)}
            {capitalizeWords(shippingAddress.lastName)}
          </p>
          <p>
            {capitalizeWords(shippingAddress.street)}{" "}
            {shippingAddress.address_2
              ? capitalizeWords(shippingAddress.address_2)
              : ""}
          </p>
          <p>
            {uppercase(shippingAddress.city)},{uppercase(shippingAddress.state)}
            {shippingAddress.zipCode}
          </p>
          <p>{uppercase(shippingAddress.country)}</p>
          <p>
            <span className="font-semibold">phone</span> :{" "}
            {shippingAddress.phone}
          </p>
          <p>
            <span className="font-semibold">email</span> :{" "}
            {shippingAddress.email}
          </p>
        </div>
      </div>
      <div className="border p-4 rounded-lg mt-4 bg-white">
        <h3 className="text-lg font-bold mb-2">Order Items</h3>
        <table className="w-full border border-gray-200 ">
          <thead className="bg-gray-100 border border-gray-200">
            <tr className="text-left">
              <th className="p-1">Product</th>
              <th>Quantity</th>
              <th>Price (AED)</th>
              <th>Total (AED)</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="p-1 !max-w-[500px] !w-[500px] ">
                  <div
                    className={`flex max-w-[500px] pr-3 items-center gap-[15px] ${
                      index === 0
                        ? "pt-0"
                        : "pt-[15px] border-t border-blueGray-300 mt-[15px]"
                    }`}
                  >
                    <div className="w-[100px] bg-clip-border overflow-hidden rounded-sm border border-blueGray-300">
                      {item?.productVariation?.image[0] && (
                        <Image
                          src={item?.productVariation?.image[0].path}
                          height={200}
                          width={200}
                          className="w-full h-[127px] object-cover"
                          alt=""
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="flex justify-between items-center">
                        <Link
                          href={`/product/${
                            JSON.parse(item.variationData).product_id ?? "0"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="py-0.5">
                        {variationDataSplit?.map((item, index) => {
                          return (
                            <span
                              key={index}
                              className={`size-sm text-secondary-100 pr-[6px] 
                                 ${
                                   index !== variationDataSplit.length - 1 &&
                                   "border-r"
                                 }
                                 border-blueGray-300 text-sm`}
                            >
                              {item}
                            </span>
                          );
                        })}
                      </div>
                      <p className="size-sm text-secondary-100  text-sm">
                        Seller: Malabar&apos;s Gold and Diamonds
                      </p>
                    </div>
                  </div>
                </td>

                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-lg font-bold mt-4">
          Total Amount: AED {totalPrice.toFixed(2)}
        </h3>
      </div>
    </section>
  );
};

export default OrdersPage;
