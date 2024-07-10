import { getCart } from "@/actions/cart";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartSummary from "@/components/frontend/cart/CartSummary";
import Container from "@/components/frontend/Container";
import Link from "next/link";
import CartItem from "./CartItem";
import Paragraph from "@/components/Paragraph";

export default async function Cart() {
  const cart = await getCart();
  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return (
      <Container>
        <Breadcrumbs
          items={[{ link: "/cart", label: "Cart", current: true }]}
        />
        <Paragraph classes="mb-5">
          Your Cart is empty! please add items to cart to continue{" "}
          <Link className="text-yellow-400" href="/shop">Go to Shop</Link>
        </Paragraph>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs items={[{ link: "/cart", label: "Cart", current: true }]} />
      <section className="bg-white pb-4 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-6">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl border p-3 ">
              <h3 className="my-2 pb-2 text-2xl">
                <input type="checkbox" name="selectall" value="all" /> Item
                Summary <span>( {cart.cartData.cartItems?.length} )</span>
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
    </Container>
  );
}
