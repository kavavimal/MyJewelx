"use client";
import React from "react";
import { useCartStore } from "@/contexts/cartStore";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import Quantity from "./Quantity";
import LoadingDots from "@/components/loading-dots";
import ButtonComponent from "../ButtonComponent";

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
    <ButtonComponent onClick={onAddtoCart}>
      {loading === true && (
        <span className="px-2">
          <LoadingDots />
        </span>
      )}
      Add to Cart
    </ButtonComponent>
  );
}
