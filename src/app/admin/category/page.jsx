import React from "react";
import Categories from "./components/Categories";

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

const category = async () => {
  const categories = await getCategories();
  return <Categories categories={categories} />;
};

export default category;
