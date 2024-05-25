import React from "react";
import ProductForm from "../componets/ProductForm";
import prisma from "@/lib/prisma";

const getCategories = async () => {
  return await prisma.category.findMany({});
};

const getTags = () => {
  return prisma.tag.findMany({});
};

const getAttributes = () => {
  return prisma.attribute.findMany({});
};
const page = async () => {
  const categories = await getCategories();
  const tags = await getTags();
  const attributes = await getAttributes();

  return (
    <ProductForm
      categories={categories}
      tags={tags}
      productAttributes={attributes}
    />
  );
};

export default page;
