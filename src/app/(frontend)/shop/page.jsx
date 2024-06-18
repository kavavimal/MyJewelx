import prisma from "@/lib/prisma";
import ShopComponent from "./compos/ShopComponent";
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
  return <ShopComponent products={products} />;
}
