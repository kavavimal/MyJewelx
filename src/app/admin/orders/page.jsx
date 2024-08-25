import prisma from "@/lib/prisma";
import { AcountType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import OrdersList from "./components/OrderList";

export const revalidate = 0;

const getOrders = async (user) => {
  try {
    if (user.account_type === AcountType.VENDOR) {
      const userOrdersData = await prisma.user.findFirst({
        where: { id: user.id },
        include: {
          sellerOrders: {
            include: {
              order: {
                include: {
                  user: true,
                  orderItems: true,
                  seller: { include: { user: true } },
                },
              },
            },
          },
        },
      });
      return userOrdersData.sellerOrders.map((item) => item.order);
    } else {
      return prisma.order.findMany({
        include: {
          user: true,
          orderItems: true,
          seller: { include: { user: true } },
        },
        orderBy: {
          id: "desc",
        },
      });
    }
  } catch (error) {
    console.log("error in order fetch", error);
  }
};

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  const orders = await getOrders(session.user);
  return (
    <>
      <OrdersList orders={orders} />
    </>
  );
};

export default OrdersPage;
