import { getCart } from "@/actions/cart";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/frontend/Container";
import Link from "next/link";
import CartItem from "./CartItem";
import Paragraph from "@/components/Paragraph";
import prisma from "@/lib/prisma";
import Ads from "./Ads";
import CartSummary from "@/components/frontend/cart/CartSummary";

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
      <Container>
        <Breadcrumbs
          items={[{ link: "/cart", label: "Cart", current: true }]}
        />
        <Paragraph classes="mb-5">
          Your Cart is empty! please add items to cart to continue{" "}
          <Link className="text-yellow-400" href="/shop">
            Go to Shop
          </Link>
        </Paragraph>
      </Container>
    );
  }

  return (
    <Container>
      <div className="border-b border-b-primary-200 py-[20px] mb-[30px]">
        <Breadcrumbs
          items={[{ link: "/cart", label: "Cart", current: true }]}
        />
      </div>
      <section className="bg-white pb-4 antialiased">
        <div className="px-4 2xl:px-0">
          <div className="flex mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-6">
            <div className="border p-3 w-[860px] border-blueGray-300">
              <h3 className="my-2 pb-2 text-2xl">
                {/* <input type="checkbox" name="selectall" value="all" /> */}
                Item Summary
                {/* <span>( {cart.cartData.cartItems?.length} )</span> */}
              </h3>
              <div className="space-y-6">
                {cart.cartData.cartItems?.map((item, i) => {
                  return <CartItem key={"cartItem" + i} item={item} />;
                })}
              </div>
            </div>

            <CartSummary cart={cart.cartData} />
          </div>
        </div>
      </section>
      <Ads ads={ads} />
    </Container>
  );
}
