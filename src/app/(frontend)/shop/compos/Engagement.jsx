"use client";

import ProductLikes from "@/components/frontend/ProductLikes";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const StarRatings = dynamic(() => import("@/components/frontend/StarRatings"), {
  ssr: false,
});

const Engagement = ({ product_id, averateRating, variation }) => {
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const findWishlist = useWishlistStore((state) => state.find);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  useEffect(() => {
    setIsInWishlist(findWishlist(product_id));
  }, [product_id, wishlistItems]);

  const updateWishlistStatus = async () => {
    setLoading(true);
    if (isInWishlist) {
        await removeFromWishlist(product_id);
    } else {
        await addToWishlist(product_id);
    }
    setLoading(false);
  }


  return (
    <div className="flex justify-between items-center">
      <div>
        <StarRatings starRatings={averateRating ? averateRating : 0} />
      </div>
      <div className="flex items-center gap-2">
        <ProductLikes product_id={product_id} />
        <button variant="text" className="rounded-full" size="sm">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 10.05C10.775 10.05 10.35 10.2375 10.025 10.5313L5.56875 7.9375C5.6 7.79375 5.625 7.65 5.625 7.5C5.625 7.35 5.6 7.20625 5.56875 7.0625L9.975 4.49375C10.3125 4.80625 10.7563 5 11.25 5C12.2875 5 13.125 4.1625 13.125 3.125C13.125 2.0875 12.2875 1.25 11.25 1.25C10.2125 1.25 9.375 2.0875 9.375 3.125C9.375 3.275 9.4 3.41875 9.43125 3.5625L5.025 6.13125C4.6875 5.81875 4.24375 5.625 3.75 5.625C2.7125 5.625 1.875 6.4625 1.875 7.5C1.875 8.5375 2.7125 9.375 3.75 9.375C4.24375 9.375 4.6875 9.18125 5.025 8.86875L9.475 11.4688C9.44375 11.6 9.425 11.7375 9.425 11.875C9.425 12.8813 10.2438 13.7 11.25 13.7C12.2563 13.7 13.075 12.8813 13.075 11.875C13.075 10.8688 12.2563 10.05 11.25 10.05Z"
              fill="#1A1A1A"
            />
          </svg>
        </button>
        {loading && <LoadingDots />}
        <button
          variant="text"
          className="rounded-full"
          size="sm"
          onClick={updateWishlistStatus}
        >
          <svg
            // className=" hover: cursor-pointer"
            width="15"
            height="15"
            toolTip="hello"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4297 2.34375C9.21973 2.34375 8.16035 2.86406 7.5 3.74355C6.83965 2.86406 5.78027 2.34375 4.57031 2.34375C3.60716 2.34484 2.68377 2.72793 2.00273 3.40898C1.32168 4.09002 0.938586 5.01341 0.9375 5.97656C0.9375 10.0781 7.01895 13.398 7.27793 13.5352C7.34619 13.5719 7.42249 13.5911 7.5 13.5911C7.57751 13.5911 7.65381 13.5719 7.72207 13.5352C7.98105 13.398 14.0625 10.0781 14.0625 5.97656C14.0614 5.01341 13.6783 4.09002 12.9973 3.40898C12.3162 2.72793 11.3928 2.34484 10.4297 2.34375ZM7.5 12.5859C6.43008 11.9625 1.875 9.12246 1.875 5.97656C1.87593 5.26201 2.1602 4.57698 2.66547 4.07172C3.17073 3.56645 3.85576 3.28218 4.57031 3.28125C5.70996 3.28125 6.6668 3.88828 7.06641 4.86328C7.10172 4.94926 7.1618 5.02279 7.239 5.07454C7.31621 5.12629 7.40706 5.15392 7.5 5.15392C7.59295 5.15392 7.68379 5.12629 7.761 5.07454C7.8382 5.02279 7.89828 4.94926 7.93359 4.86328C8.3332 3.88652 9.29004 3.28125 10.4297 3.28125C11.1442 3.28218 11.8293 3.56645 12.3345 4.07172C12.8398 4.57698 13.1241 5.26201 13.125 5.97656C13.125 9.11777 8.56875 11.9619 7.5 12.5859Z"
              fill={isInWishlist ? "red" : "#1A1A1A"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Engagement;
