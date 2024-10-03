import Link from "next/link";
import CartItem from "./components/CartItem";
import prisma from "@/lib/prisma";
import Ads from "./components/Ads";
import CartSummeryData from "./components/CartSummeryData";
import { getCart } from "@/app/actions/cart";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Paragraph from "@/app/components/Paragraph";
export const revalidate = 0;

const getAds = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "CART",
    },
  });

export default async function Cart() {
  const cart = await getCart();
  const ads = await getAds();
  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return (
      <div className="container">
        <Breadcrumbs
          items={[{ link: "/cart", label: "Cart", current: true }]}
        />
        <Paragraph classes="mb-5">
          Your Cart is empty! please add items to cart to continue{" "}
          <Link className="text-yellow-400" href="/shop">
            Go to Shop
          </Link>
        </Paragraph>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="border-b border-b-primary-200 py-[20px] mb-[30px]">
        <Breadcrumbs
          items={[{ link: "/cart", label: "Cart", current: true }]}
        />
      </div>
      <section className="bg-white pb-4 antialiased">
        <div className="p-0 sm:px-4 2xl:px-0">
          <div className="flex mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-6">
            <div className="border p-3 w-full sm:w-[860px] border-blueGray-300">
              <h3 className="my-2 pb-2 text-2xl">Item Summary</h3>
              <div className="space-y-[15px]">
                {cart.cartData.cartItems?.map((item, i) => {
                  return (
                    <CartItem key={"cartItem" + i} item={item} index={i} />
                  );
                })}
              </div>
            </div>
            <CartSummeryData cart={cart.cartData} />
          </div>
        </div>
      </section>
      <Ads ads={ads} />
    </div>
  );
}
