import React from "react";
import { redirect } from "next/navigation";
import Container from "@/components/frontend/Container";
import { getOrders } from "@/actions/orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import OrderTable from "./components/Orders";
import Breadcrumbs from "@/components/Breadcrumbs";
export default async function OrderPage() {
  const { user } = await getServerSession(authOptions);
  if (!user) {
    redirect("/login");
  }
  const orders = await getOrders();
  // console.log("orders", orders);
  return (
    <Container>
      <div className="py-7">
        <Breadcrumbs autoBread={true} showDevider={true} />
        <OrderTable orders={orders} />
      </div>
      {/* {orders.map((order) => {
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
            <Link href={`/profile/orders/${order.id}`}>View Order Details</Link>
          </div>
        );
      })} */}
    </Container>
  );
}
