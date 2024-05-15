// import Banner from "@/components/Banner";
// import Product from "@/components/Products";
import prisma from "@/lib/prisma";
// import { ProductStatus } from "@prisma/client";
import "@/styles/globals.css";
// import ProductLayout from "@/components/ProductLayout";
// import ShopSection from "@/components/ShopSection";
// async function get_all_products() {
//   const products = await prisma.product.findMany({
//     where: {
//       status: ProductStatus.APPROVED,
//     },
//     include: {
//       user: true,
//       category: { include: { category: true } },
//       country: { include: { country: true } },
//     },
//   });
//   return products || [];
// }
export default async function Home() {
//   const products = await get_all_products();
  return (
    <main>
      {/* <Banner /> */}
      {/* <ProductLayout />
      <ShopSection />
      <Trendy /> */}
    </main>
  );
}
