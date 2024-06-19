import prisma from "@/lib/prisma";
import Detail from "./compos/Detail";

async function get_productBy_id(id) {
  const product = await prisma.product.findFirst({
    where: { product_id: Number(id) },
    include: {
      variations: {
        include: { image: true, productAttributeValues: true },
      },
      user: true,
      ProductAttributeValue: {
        include: { attribute: true, attributeValue: true },
      },
    },
  });
  return product || [];
}

export default async function ProductDetails({ params: { id } }) {
  const product = await get_productBy_id(id);
  return <Detail product={product} />;
}
