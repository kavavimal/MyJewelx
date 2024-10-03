"use client";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function AddToWishlist({ product_id, icon = false }) {
  const [loading, setLoading] = useState(false);
  const findWishlist = useWishlistStore((state) => state.find);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  if (icon) {
    return (
      <button
        disabled={loading}
        className="flex gap-1 disabled:opacity-50sss"
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5154 3.3125C13.5386 3.31373 14.5196 3.72076 15.2432 4.44432C15.9668 5.16795 16.3738 6.14907 16.375 7.17244C16.3747 9.3992 14.7064 11.496 12.8579 13.1149C11.0355 14.7108 9.17102 15.727 9.03254 15.8003L9.03253 15.8003L9.02961 15.8019C9.02051 15.8068 9.01033 15.8093 9 15.8093C8.98967 15.8093 8.97949 15.8068 8.9704 15.8018L8.96746 15.8003C8.82898 15.727 6.96446 14.7108 5.14213 13.1149C3.2935 11.4959 1.62514 9.39902 1.625 7.17215C1.62623 6.14889 2.03326 5.16788 2.75682 4.44432C3.48039 3.72076 4.46139 3.31373 5.48465 3.3125C6.79037 3.31258 7.90874 3.8716 8.60016 4.79248L9 5.32501L9.39984 4.79248C10.0913 3.8716 11.2096 3.31258 12.5154 3.3125Z"
            stroke="#F0AE11"
          />
        </svg>
        <span className="text-sm text-secondary-100">Wishlist</span>
      </button>
    );
  }

  return (
    <div className="w-2/5">
      <Button
        type="button"
        loading={loading}
        className="flex justify-center items-center"
        fullWidth
        variant="outlined"
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
        Add To Wishlist
      </Button>
    </div>
  );
}
