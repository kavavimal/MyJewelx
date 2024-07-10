"use client";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { useState } from "react";

export default function AddToWishlist({ product_id }) {
  const [loading, setLoading] = useState(false);
  const findWishlist = useWishlistStore((state) => state.find);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  return (
    <button
      type="button"
      className="flex items-center justify-center text-sm"
      onClick={async () => {
        if (findWishlist(product_id)) {
          setLoading(true);
          await removeFromWishlist(product_id);
          setLoading(false);
        } else {
          setLoading(true);
          await addToWishlist(product_id);
          setLoading(false);
        }
      }}
    >
      {loading === true && (
        <span className="px-2">
          <LoadingDots />
        </span>
      )}
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'mr-2'}
      >
        <path
          d="M11.5154 1.3125C12.5386 1.31373 13.5196 1.72076 14.2432 2.44432C14.9668 3.16795 15.3738 4.14907 15.375 5.17244C15.3747 7.3992 13.7064 9.49601 11.8579 11.1149C10.0355 12.7108 8.17102 13.727 8.03254 13.8003L8.03253 13.8003L8.02961 13.8019C8.02051 13.8068 8.01033 13.8093 8 13.8093C7.98967 13.8093 7.97949 13.8068 7.9704 13.8018L7.96746 13.8003C7.82898 13.727 5.96446 12.7108 4.14213 11.1149C2.2935 9.49594 0.625136 7.39902 0.625 5.17215C0.62623 4.14889 1.03326 3.16788 1.75682 2.44432C2.48039 1.72076 3.46139 1.31373 4.48465 1.3125C5.79037 1.31258 6.90874 1.8716 7.60016 2.79248L8 3.32501L8.39984 2.79248C9.09127 1.8716 10.2096 1.31258 11.5154 1.3125Z"
          stroke={findWishlist(product_id) ? "#F0AE11" : "#000000"}
        />
      </svg>
      Wishlist
    </button>
  );
}
