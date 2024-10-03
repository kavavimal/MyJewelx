import { attributeIDs } from "@/utils/constants";
import FilterProduct from "./compos/FilterProduct";
import ProductLoop from "./compos/ProductLoop";
import ShopTopComponent from "./compos/ShopTopComponent";
import prisma from "@/lib/prisma";
// import "../../../styles/globals.css";
import { searchProducts } from "@/app/actions/product";
import { UserStatus } from "@prisma/client";

export const revalidate = 0;

const getFilterableDatas = async () => {
  const vendors = await prisma.user.findMany({
    where: {
      role_id: 2,
      status: UserStatus.ACTIVE,
    },
    include: {
      vendor: true,
    },
  });

  const categories = await prisma.category.findMany({});

  const metals = await prisma.attributeValue.findMany({
    where: {
      attribute_id: attributeIDs.MATERIAL,
    },
  });

  const karats = await prisma.attribute.findMany({
    include: {
      values: true,
    },
    where: {
      attribute_id: {
        equals: attributeIDs.GOLDKARAT,
      },
    },
  });

  const patterns = await prisma.pattern.findMany();
  const characteristics = await prisma.characteristic.findMany();
  const collections = await prisma.collection.findMany();

  return {
    vendors,
    categories,
    metals,
    patterns,
    characteristics,
    collections,
    karats,
  };
};

const getMaximumPrice = async () => {
  const result = await prisma.productVariation.aggregate({
    _max: {
      selling_price: true,
    },
  });

  return result?._max?.selling_price || 0;
};
export default async function Shop({ searchParams }) {
  let searchFilter = {};
  if (searchParams?.q) {
    searchFilter = { ...searchFilter, q: searchParams.q };
  }
  if (searchParams?.category) {
    searchFilter = { ...searchFilter, category: searchParams.category };
  }
  if (searchParams?.subcategory) {
    searchFilter = { ...searchFilter, subcategory: searchParams.subcategory };
  }
  const products = await searchProducts(searchFilter);
  console.log(products);
  const filterdDatas = await getFilterableDatas();
  const max = await getMaximumPrice();

  return (
    <>
      <ShopTopComponent max={max} filterdDatas={filterdDatas} />
      <div className="flex items-start gap-[11px]">
        <div
          className="w-[304px] max-h-[84vh] sticky overflow-auto pr-[16px] lg:block hidden"
          style={{ position: "sticky", top: "120px" }}
        >
          <FilterProduct filterdDatas={filterdDatas} />
        </div>

        <ProductLoop products={products} />
      </div>
    </>
  );
}
