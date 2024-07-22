import { searchProducts } from "@/actions/product";
import { attributeIDs } from "@/utils/constants";
import FilterProduct from "./compos/FilterProduct";
import ProductLoop from "./compos/ProductLoop";
import ShopTopComponent from "./compos/ShopTopComponent";

const getFilterableDatas = async () => {
  const vendors = await prisma.user.findMany({
    where: {
      role_id: 2,
    },
    include: {
      vendor: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      parent_id: null,
    },
  });

  const metals = await prisma.attributeValue.findMany({
    where: {
      attribute_id: attributeIDs.MATERIAL,
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
  };
};

export default async function Shop({ searchParams }) {
  console.log("searchParams", searchParams);
  let searchFilter = {};
  if (searchParams?.q) {
    searchFilter = { ...searchFilter, q: searchParams.q };
  }
  if (searchParams?.category) {
    searchFilter = { ...searchFilter, category: searchParams.category };
  }
  const products = await searchProducts(searchFilter);
  const filterdDatas = await getFilterableDatas();
  return (
    <>
      <ShopTopComponent />
      <div className="flex items-start gap-[11px]">
        <div
          className="w-[224px]"
          style={{
            position: "sticky",
            top: 120,
            left: 0,
          }}
        >
          <FilterProduct filterdDatas={filterdDatas} />
        </div>

        <ProductLoop products={products} />
      </div>
    </>
  );
}
