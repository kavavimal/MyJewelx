import React from "react";
import Products from "./componets/Products";
import prisma from "@/lib/prisma";
import { checkUserSession } from "@/app/(frontend)/layout";

export const revalidate = 0;

const getProducts = async () => {
  const user = await checkUserSession();
  try {
    if (user.role.role_name !== "ADMIN") {
      return prisma.product.findMany({
        include: {
          user: true,
        },
        orderBy: {
          product_id: "desc",
        },
        where: {
          user_id: user.id,
        },
      });
    }
    return prisma.product.findMany({
      include: {
        user: true,
      },
      orderBy: {
        product_id: "desc",
      },
    });
  } catch (error) {}
};

const products = async () => {
  const response = await getProducts();
  return (
    <>
      <Products products={response} />
    </>
  );
};

export default products;
