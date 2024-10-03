import React from "react";
import Dashboard from "./components/Dashboard";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AcountType } from "@prisma/client";

export const revalidate = 0;

const getVendors = () =>
  prisma.user.count({
    where: {
      role_id: 2,
    },
  });
const getProducts = () => prisma.product.count({});
const getOrders = () => prisma.order.count({});
const getUsers = () =>
  prisma.user.count({
    where: {
      role_id: 3,
    },
  });

const getCountsData = async (id) => {
  const userData = await prisma.user.findFirst({
    where: { id: id },
    select: {
      _count: {
        select: {
          sellerOrders: true,
          products: true,
        },
      },
    },
  });
  return userData._count;
};

const totalOrderAmount = async (user) => {
  let total = 0;
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

    userOrdersData.sellerOrders.map((item) => {
      total += item.order?.orderTotal;
      return item.order;
    });

    return total;
  }
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const role = session.user?.role;

  if (role === AcountType.VENDOR) {
    const counts = await getCountsData(session.user.id);
    const orders = await totalOrderAmount(session.user);
    return (
      <Dashboard
        products={counts.products}
        sellerOrders={counts.sellerOrders}
        allUsers={false}
        allOrders={false}
        totalOrderAmount={orders}
      />
    );
  }

  const [vendors, products, allUsers, allOrders] = await Promise.all([
    getVendors(),
    getProducts(),
    getUsers(),
    getOrders(),
  ]);

  return (
    <Dashboard
      vendors={vendors}
      products={products}
      allUsers={allUsers}
      allOrders={allOrders}
    />
  );
};

export default page;
