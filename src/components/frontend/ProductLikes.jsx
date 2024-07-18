"use client";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { useEffect, useState } from "react";
import LikeIcon from "./LikeIcon";

export default function ProductLikes({ product_id, count = 0, showCount = false }) {
  const [loading, setLoading] = useState(false);
  const [likeCount , setLikeCount] = useState(count);
  const findLikelist = useWishlistStore((state) => state.findLikelist);
  const addToLikedlist = useWishlistStore((state) => state.addToLikedlist);
  const removeFromLikedlist = useWishlistStore(
    (state) => state.removeFromLikedlist
  );

  useEffect(() => {
    setLikeCount(count);
  },[product_id, count]);

  const updateMyLikeStatus = async () => {
    setLoading(true);
    if (findLikelist(product_id)) {
        await removeFromLikedlist(product_id);
        showCount !== false && setLikeCount((c) => Number(c) - 1);
    } else {
        await addToLikedlist(product_id);
        showCount !== false && setLikeCount((c) => Number(c) + 1);
    }
    setLoading(false);
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center text-sm"
      onClick={updateMyLikeStatus}
    >
      {loading === true && (
        <span className="px-1">
          <LoadingDots />
        </span>
      )}
      <LikeIcon className={showCount !== false ? "mr-1" : ''} filled={findLikelist(product_id)} />{" "}
      {showCount !== false ? likeCount + ' Likes' : ""}
    </button>
  );
}
