import { redirect } from "next/navigation";
import Checkout from "./Checkout";
import { getCart } from "@/actions/cart";
import Container from "@/components/frontend/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartSummary from "@/components/frontend/cart/CartSummary";
import { fetchCurrentUser } from "@/actions/users";
import CartItem from "../cart/CartItem";
import CheckoutSummary from "./CheckoutSummary";

export default async function CheckoutPage() {
  const cart = await getCart();
  const user = await fetchCurrentUser();
  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return redirect("/cart");
  }
  return (
    <Container>
      <Breadcrumbs
        items={[
          { link: "/cart", label: "Cart" },
          { link: "/checkout", label: "Checkout", current: true },
        ]}
      />
      <section className="bg-white pb-4 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-6">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-2xl">
                Billing Information
              </h2>
              <div className="border flex flex-col">
                <img
                  src={user?.image?.path}
                  alt=""
                  className="rounded-full w-7 h-7 object-cover"
                />
                <div className="flex items-center justify-between">
                  <div className="w-1/2 p-2">
                    <label className="text-gray-400">Full Name : </label>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="w-1/2 p-2">
                    <label className="text-gray-400">Phone : </label>
                    {user.phone_number}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-1/2 p-2">
                    <label className="text-gray-400">Email : </label>
                    {user.email}
                  </div>
                  <div className="w-1/2 p-2">
                    <label className="text-gray-400">Address : </label>Address
                  </div>
                </div>
              </div>

              <Checkout cart={cart} user={user} />
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl ">
                <h3 className="my-2 pb-2 text-2xl">
                  Cart <span>( {cart.cartData.cartItems?.length} Product)</span>
                </h3>
                <div className="space-y-6 border p-4">
                  {cart.cartData.cartItems?.map((item, i) => {
                    return <CartItem key={"cartItem" + i} item={item} isCart={false} />;
                  })}
                </div>
              </div>
            </div>

            <CheckoutSummary cart={cart.cartData} user={user} showCoupon isCheckout />
          </div>
        </div>
      </section>
    </Container>
  );
}
