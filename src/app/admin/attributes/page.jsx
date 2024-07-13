import React from "react";
import AttributeForm from "./components/AttributeForm";
import prisma from "@/lib/prisma";

const getAttriubutes = () => {
  return prisma.attribute.findMany();
};

const attributes = async () => {
  const product_attribute = await getAttriubutes();
  return <AttributeForm product_attribute={product_attribute} />;
};

export default attributes;
