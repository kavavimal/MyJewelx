"use client";
import React, { useEffect, useState } from "react";
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

  const [findCartItem, setFindCartItem] = useState(cartItems.find(
    (ci) => ci.variation_id === variation.variation_id
  ))

  useEffect(() => {
    setFindCartItem(cartItems.find(
      (ci) => ci.variation_id === variation.variation_id
    ))
  }, [cartItems, variation.variation_id])


  const onAddtoCart = () => {
    if (session && session.status === "authenticated" && session.data.user.id) {
      addToCart({
        quantity: 1,
        variation_id: variation.variation_id,
        price: variation?.selling_price ? variation?.selling_price : variation?.regular_price,
      });
    } else {
      Router.push(`/login?redirect=${encodeURIComponent(pathname)}`, "replace");
    }
  };

  if (cartItems && cartItems.length > 0 && findCartItem) {
      return <Quantity cartItem={findCartItem} />;
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
