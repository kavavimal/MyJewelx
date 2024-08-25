import { redirect } from "next/navigation";
import Checkout from "./Checkout";
import { getCart } from "@/actions/cart";
import Container from "@/components/frontend/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartSummary from "@/components/frontend/cart/CartSummary";
import { fetchCurrentUser } from "@/actions/users";
import CartItem from "../cart/CartItem";
import CheckoutSummary from "./CheckoutSummary";
import prisma from "@/lib/prisma";
import Ads from "./Ads";
import { AddressType } from "@prisma/client";
import Image from "next/image";

export const revalidate = 0;

const getAds = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "CART",
    },
  });
const getUserAddress = (uid) =>
  prisma.address.findFirst({
    where: { userId: uid, type: AddressType.SHIPPING },
  });

export default async function CheckoutPage() {
  const cart = await getCart();
  const user = await fetchCurrentUser();
  const ads = await getAds();
  const addresses = await getUserAddress(user.id);

  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return redirect("/cart");
  }
  return (
    <Container>
      <div className="border-b border-b-primary-200 py-[20px] mb-[30px]">
        <Breadcrumbs
          items={[
            // { link: '/cart', label: 'Cart' },
            { link: "/checkout", label: "Checkout", current: true },
          ]}
        />
      </div>
      <section className="bg-white pb-4 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-6">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-2xl mb-[14px]">
                Billing Information
              </h2>
              <div className="border flex flex-col border-blueGray-300 px-[15px] pt-[15px] pb-5">
                <div>
                  <Image
                    height={100}
                    width={100}
                    src={user?.image?.path ?? "/assets/images/avatar.jpg"}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="w-1/2">
                    <label className="text-blueGray-600">Full Name : </label>
                    <span className="text-blueGray-500">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <div className="w-1/2">
                    <label className="text-gray-400">Phone : </label>
                    <span className="text-blueGray-500">
                      {user.phone_number}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2.5">
                  <div className="w-1/2">
                    <label className="text-blueGray-600">Email : </label>
                    <span className="text-blueGray-500">{user.email}</span>
                  </div>
                  <div className="w-1/2">
                    <label className="text-gray-400">Address : </label>
                    Address
                  </div>
                </div>
              </div>

              <Checkout cart={cart} user={user} addresses={addresses} />
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl ">
                <h3 className="my-2 pb-2 text-2xl">
                  Cart <span>( {cart.cartData.cartItems?.length} Product)</span>
                </h3>
                <div className="space-y-[15px] py-4 px-[15px] border border-blueGray-300">
                  {cart.cartData.cartItems?.map((item, i) => {
                    return (
                      <CartItem
                        key={"cartItem" + i}
                        item={item}
                        isCart={false}
                        index={i}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <CheckoutSummary
              cart={cart.cartData}
              user={user}
              showCoupon
              isCheckout
            />
          </div>
        </div>
      </section>
      <Ads ads={ads} />
    </Container>
  );
}
