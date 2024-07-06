import React from "react";
import { checkUserSession } from "../../layout";
import { redirect } from "next/navigation";
import Container from "@/components/frontend/Container";
import { getOrders } from "@/actions/orders";

export default async function OrderPage() {
  const user = await checkUserSession();
  if (!user) {
    redirect("/login");
  }
  const orders = await getOrders();
  console.log("orders", orders);
  return (
    <Container>
      <h2>Your Orders</h2>
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
    </Container>
  );
}
