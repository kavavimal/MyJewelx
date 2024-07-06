import React from "react";
import prisma from "@/lib/prisma";
import { checkUserSession } from "@/app/(frontend)/layout";

export const revalidate = 0;

const getOrders = async () => {
  const user = await checkUserSession();
  try {
    return prisma.order.findMany({
      include: {
        user: true,
        orderItems: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {}
};

const OrdersPage = async () => {
  const orders = await getOrders();
  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-10">
        <h2 className="text-2xl font-semibold ">Orders</h2>
      </div>
      {orders.map((order) => {
        return (
          <div
            key={"order" + order.id}
            className="border rounded-lg mt-2 mb-3 p-2"
          >
            Order Id: #{order.id}
            <br />
            Order Status: {order.status}
            <br />
            Order Total:{" "}
            {order.orderItems.reduce((total, i) => total + i.price, 0)}
            <div className="border rounded-lg mt-2 mb-3 p-2">
              Order Items:
              {order.orderItems?.map((item, i) => {
                return (
                  <div
                    key={"orderitem" + order.id + i}
                    className={i > 0 ? "border-t-2" : ""}
                  >
                    Product Name: {item.name}, <br />
                    Product Price: {item.price}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrdersPage;
