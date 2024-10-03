import { Suspense } from "react";
import ShopBannerCraousel from "./compos/ShopBannerCraousel";
import prisma from "@/lib/prisma";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import DeviderX from "@/app/components/DeviderX";

const getPromoList = async () =>
  await prisma.promotional.findMany({
    where: {
      ads_type: "SHOP",
    },
  });

export default async function ShopLayout({ children }) {
  const promolist = await getPromoList();
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center z-40">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary-200 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      }
    >
      <section className="pb-5 md:pb-20 pt-5">
        <div
          // className="w-[1280px] max-w-[96%] mx-auto my-0"
          className="container mx-auto my-0"
        >
          <ShopBannerCraousel promolist={promolist} />
          <Breadcrumbs
            items={[{ link: "/shop", label: "Shop", current: true }]}
          />
          <DeviderX />
          {children}
        </div>
      </section>
    </Suspense>
  );
}
