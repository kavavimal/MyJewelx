"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { log } from "handlebars";
const OrderDetails = ({ id }) => {
  const [order, setOrder] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const getOrder = async () => {
    setLoading(true);
    const response = await get(`/api/order/${id}`);
    setOrder(response.data.order);
    if (response.data.order.shippingAddress) {
      setShippingAddress(JSON.parse(response.data.order.shippingAddress));
      setBillingAddress(JSON.parse(response.data.order.billingAddress));
    }
    setLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return (
      <div role="status" className="container animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { link: "/profile", label: "Profile" },
          { link: "/profile/orders", label: "Orders" },
          {
            link: `/profile/orders/${id}`,
            label: `Order ID: ${id}`,
            current: true,
          },
        ]}
        showDevider={true}
      />
      {console.log(order)}

      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="flex py-2 justify-between ">
        <div>
          Ordered on {moment(order.createdAt).format("DD MMM YYYY")} | Order ID
          : {id} | Order Total : {order.orderTotal}
        </div>
        <div>Payment Method : {order.paymentMethod}</div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap md:flex-nowrap gap-4 row-gap-4">
        <div className="lg:w-1/3 max-w-full border p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Billing Address</h3>
          <p>
            {billingAddress.firstName} {billingAddress.lastName}
          </p>
          <p>
            {billingAddress.street} {billingAddress.address_2}
          </p>
          <p>
            {billingAddress.city},{billingAddress.state}
            {""}
            {billingAddress.zipCode}
          </p>
          <p>{billingAddress.country}</p>
          <p>phone : {billingAddress.phone}</p>
          <p>email : {billingAddress.email}</p>
        </div>
        <div className="lg:w-2/3 max-w-full border p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Shipping Address</h3>
          <p>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p>
            {shippingAddress.street} {shippingAddress.address_2}
          </p>
          <p>
            {shippingAddress.city},{shippingAddress.state}
            {""}
            {shippingAddress.zipCode}
          </p>
          <p>{shippingAddress.country}</p>
          <p>phone : {shippingAddress.phone}</p>
          <p>email : {shippingAddress.email}</p>
        </div>
      </div>
      <div className="border p-4 rounded-lg mt-4">
        <h3 className="text-lg font-bold mb-2">Order Items</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (AED)</th>
              <th>Total (AED)</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-lg font-bold mt-4">
          Total Amount: AED {order.orderTotal.toFixed(2)}
        </h3>
      </div>
    </section>
  );
};

export default OrderDetails;
