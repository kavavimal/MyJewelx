"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/contexts/cartStore";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import Quantity from "./Quantity";
import LoadingDots from "@/components/loading-dots";
import ButtonComponent from "../ButtonComponent";
import { Button } from "@material-tailwind/react";

export default function AddToCart({ variation }) {
  const Router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const loading = useCartStore((state) => state.loading);
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const maxQ =
    variation?.stock_management && variation?.stock_status
      ? variation?.quantity
      : -1;
  const isProductInstock =
    variation?.stock_management &&
    variation?.stock_status &&
    variation?.quantity > 0;
  const [findCartItem, setFindCartItem] = useState(
    cartItems.find((ci) => ci.variation_id === variation.variation_id)
  );

  useEffect(() => {
    setFindCartItem(
      cartItems.find((ci) => ci.variation_id === variation.variation_id)
    );
  }, [cartItems, variation.variation_id]);

  if (!isProductInstock) {
    return (
      <p className="error text-red-500">
        Product is not available at the moment
      </p>
    );
  }

  const onAddtoCart = () => {
    if (session && session.status === "authenticated" && session.data.user.id) {
      addToCart({
        quantity: 1,
        variation_id: variation.variation_id,
        price: variation?.selling_price
          ? variation?.selling_price
          : variation?.regular_price,
      });
    } else {
      Router.push(`/login?redirect=${encodeURIComponent(pathname)}`, "replace");
    }
  };

  if (!isProductInstock) {
    return (
      <p className="error text-red-500">
        Product is not available at the moment
      </p>
    );
  }

  if (cartItems && cartItems.length > 0 && findCartItem) {
    return <Quantity cartItem={findCartItem} maxQ={maxQ} />;
  }
  return (
    // <ButtonComponent onClick={onAddtoCart}>
    //   {loading === true && (
    //     <span className="px-2">
    //       <LoadingDots />
    //     </span>
    //   )}
    //   Add to Cart
    // </ButtonComponent>
    <div className="w-3/5">
      <Button
        onClick={onAddtoCart}
        fullWidth
        loading={loading}
        className="shadow-none hover:shadow-none flex justify-center items-center"
      >
        Add to Cart
      </Button>
    </div>
  );
}
