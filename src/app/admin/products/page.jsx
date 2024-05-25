import React from "react";
import Products from "./componets/Products";
import prisma from "@/lib/prisma";

const getProducts = () => {
  return prisma.product.findMany({});
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
