import React from "react";
import Support from "./components/Support";
import prisma from "@/lib/prisma";
import { checkUserSession } from "@/app/actions/users";
import { getOrders } from "@/app/actions/orders";
import { getSupports } from "@/app/actions/support";
import Breadcrumbs from "@/app/components/Breadcrumbs";

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      user: true,
    },
  });
  return products;
}

const Page = async () => {
  const feedback = await getSupports();
  const orders = await getOrders();
  const product = await getProducts();
  const user = await checkUserSession();
  if (!user) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      <div className="container">
        <div className="py-5">
          <Breadcrumbs
            items={[{ link: "/support", label: "Support", current: true }]}
          />
        </div>
        <div className="pb-5 text-[20px]">
          <Support supports={feedback} orders={orders} products={product} />
        </div>
      </div>
    </div>
  );
};

export default Page;
