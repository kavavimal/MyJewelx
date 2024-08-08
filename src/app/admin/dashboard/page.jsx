import React from "react";
import Dashboard from "./components/Dashboard";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AcountType } from "@prisma/client";

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

const page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === AcountType.VENDOR) {
    const counts = await getCountsData(session.user.id);
    return (
      <Dashboard
        products={counts.products}
        sellerOrders={counts.sellerOrders}
        allUsers={false}
        allOrders={false}
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
// const page = async () => {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role === AcountType.VENDOR) {
//     const counts = await getCountsData(session.user.id);
//     return (
//       <Dashboard
//         vendors={false}
//         products={counts.products}
//         allUsers={false}
//         allOrders={counts.sellerOrders}
//       />
//     );
//   } else {
//     const vendors = await getVendors();
//     const products = await getProducts();
//     const allUsers = await getUsers();
//     const allOrders = await getOrders();

//     return (
//       <Dashboard
//         vendors={vendors}
//         products={products}
//         allUsers={allUsers}
//         allOrders={allOrders}
//       />
//     );
//   }
// };

export default page;
