"use client";
import React from "react";
import { useCartStore } from "@/contexts/cartStore";
import { useRouter } from "next/navigation";
export default function RemoveCartItem({ cartItem, variant = "" }) {
  const deleteFromCart = useCartStore((state) => state.removeFromCart);
  const router = useRouter();
  return (
    <button
      type="button"
      className="inline-flex items-center text-sm font-medium hover:underlin"
      onClick={async () => {
        await deleteFromCart(cartItem.cartItem_id);
        variant === "cart" && router.refresh();
      }}
    >
      {variant === "cart" ? (
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
        >
          <mask id="path-1-inside-1_1226_7247" fill="white">
            <path d="M11.25 1H8.625L7.875 0.25H4.125L3.375 1H0.75V2.5H11.25M1.5 12.25C1.5 12.6478 1.65804 13.0294 1.93934 13.3107C2.22064 13.592 2.60218 13.75 3 13.75H9C9.39782 13.75 9.77936 13.592 10.0607 13.3107C10.342 13.0294 10.5 12.6478 10.5 12.25V3.25H1.5V12.25Z" />
          </mask>
          <path
            d="M8.625 1L7.91789 1.70711L8.21079 2H8.625V1ZM7.875 0.25L8.58211 -0.457107L8.28921 -0.75H7.875V0.25ZM4.125 0.25V-0.75H3.71079L3.41789 -0.457107L4.125 0.25ZM3.375 1V2H3.78921L4.08211 1.70711L3.375 1ZM0.75 1V0H-0.25V1H0.75ZM0.75 2.5H-0.25V3.5H0.75V2.5ZM1.5 12.25H0.5H1.5ZM10.5 3.25H11.5V2.25H10.5V3.25ZM1.5 3.25V2.25H0.5V3.25H1.5ZM11.25 0H8.625V2H11.25V0ZM9.33211 0.292893L8.58211 -0.457107L7.16789 0.957107L7.91789 1.70711L9.33211 0.292893ZM7.875 -0.75H4.125V1.25H7.875V-0.75ZM3.41789 -0.457107L2.66789 0.292893L4.08211 1.70711L4.83211 0.957107L3.41789 -0.457107ZM3.375 0H0.75V2H3.375V0ZM-0.25 1V2.5H1.75V1H-0.25ZM0.75 3.5H11.25V1.5H0.75V3.5ZM0.5 12.25C0.5 12.913 0.763392 13.5489 1.23223 14.0178L2.64645 12.6036C2.55268 12.5098 2.5 12.3826 2.5 12.25H0.5ZM1.23223 14.0178C1.70107 14.4866 2.33696 14.75 3 14.75V12.75C2.86739 12.75 2.74022 12.6973 2.64645 12.6036L1.23223 14.0178ZM3 14.75H9V12.75H3V14.75ZM9 14.75C9.66304 14.75 10.2989 14.4866 10.7678 14.0178L9.35355 12.6036C9.25978 12.6973 9.13261 12.75 9 12.75V14.75ZM10.7678 14.0178C11.2366 13.5489 11.5 12.913 11.5 12.25H9.5C9.5 12.3826 9.44732 12.5098 9.35355 12.6036L10.7678 14.0178ZM11.5 12.25V3.25H9.5V12.25H11.5ZM10.5 2.25H1.5V4.25H10.5V2.25ZM0.5 3.25V12.25H2.5V3.25H0.5Z"
            fill="#D4180E"
            mask="url(#path-1-inside-1_1226_7247)"
          />
        </svg>
      ) : (
        <svg
          className="me-1.5 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      )}
      Delete
    </button>
  );
}
