import React from "react";
import CategoryForm from "../components/CategoryForm";
import prisma from "@/lib/prisma";
const getCategories = async () => {
  return await prisma.category.findMany({});
};
const CategoryAdd = async () => {
  const categories = await getCategories();
  return <CategoryForm categories={categories} />;
};

export default CategoryAdd;
