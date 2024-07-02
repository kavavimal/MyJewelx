"use client";
import React from "react";
import { useCartStore } from "@/contexts/cartStore";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import Quantity from "./Quantity";
import LoadingDots from "@/components/loading-dots";

export default function AddToCart({ variation }) {
  const Router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const loading = useCartStore((state) => state.loading);
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  const onAddtoCart = () => {
    if (session && session.status === "authenticated" && session.data.user.id) {
      addToCart({
        // cartItem_id: uuidv4(),
        // user_id: session.data.user.id,
        quantity: 1,
        variation_id: variation.variation_id,
        price: variation.selling_price,
      });
    } else {
      Router.push(`/login?redirect=${encodeURIComponent(pathname)}`, "replace");
    }
  };

  if (cartItems && cartItems.length > 0) {
    const finditem = cartItems.find(
      (ci) => ci.variation_id === variation.variation_id
    );
    if (finditem) {
      return <Quantity cartItem={finditem} />;
    }
  }
  return (
    <button
      class="flex text-black weight-700 bg-[#F0AE11] border-0 py-2 flex-1 px-3 mr-2 focus:outline-none hover:bg-yellow-600 rounded"
      onClick={onAddtoCart}
    >
      Add to Cart
      {loading === true && <LoadingDots />}
    </button>
  );
}
