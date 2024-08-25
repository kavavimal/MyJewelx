import React from "react";
import Categories from "./components/Categories";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getCategories = () => {
  return prisma.category.findMany({});
};

const category = async () => {
  const categories = await getCategories();
  return <Categories categories={categories} />;
};

export default category;
