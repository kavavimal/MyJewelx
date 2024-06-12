import React from "react";
import Products from "./componets/Products";
import prisma from "@/lib/prisma";

const getProducts = () => {
  try {
    return prisma.product.findMany();
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
