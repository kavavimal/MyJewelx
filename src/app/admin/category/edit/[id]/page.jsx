import React from "react";
import CategoryForm from "../../components/CategoryForm";
import prisma from "@/lib/prisma";

async function getCategory(id) {
  try {
    const category = await prisma.category.findFirst({
      where: { category_id: Number(id) },
    });
    return category;
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
}

const getCategories = async () => {
  return await prisma.category.findMany({});
};

const CategoryEdit = async ({ params: { id } }) => {
  const category = await getCategory(id);
  const categories = await getCategories();
  return <CategoryForm category={category} categories={categories} />;
};

export default CategoryEdit;
