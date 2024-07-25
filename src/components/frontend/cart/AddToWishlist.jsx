"use client";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function AddToWishlist({ product_id }) {
  const [loading, setLoading] = useState(false);
  const findWishlist = useWishlistStore((state) => state.find);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

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
