import prisma from "@/lib/prisma";
import ShopComponent from "./compos/ShopComponent";
import { getCategories } from "@/actions/category";
const getProducts = async () => {
  return await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    include: {
      variations: {
        include: { image: true },
      },
      user: true,
    },
    // include: { variations: true, image: true },
  });
};

export default async function Shop() {
  const products = await getProducts();
  const categories = await getCategories();
  return <ShopComponent products={products} categories={categories} />;
}
