"use client";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { useEffect, useState } from "react";
import LikeIcon from "./LikeIcon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductLikes({
  product_id,
  count = 0,
  showCount = false,
}) {
  const user = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const findLikelist = useWishlistStore((state) => state.findLikelist);
  const addToLikedlist = useWishlistStore((state) => state.addToLikedlist);
  const removeFromLikedlist = useWishlistStore(
    (state) => state.removeFromLikedlist
  );

  useEffect(() => {
    setLikeCount(count);
  }, [product_id, count]);

  const updateMyLikeStatus = async () => {
    if (!user.data) {
      router.push("/login");
      return;
    }
    setLoading(true);
    if (findLikelist(product_id)) {
      await removeFromLikedlist(product_id);
      showCount !== false && setLikeCount((c) => Number(c) - 1);
    } else {
      await addToLikedlist(product_id);
      showCount !== false && setLikeCount((c) => Number(c) + 1);
    }
    setLoading(false);
  };

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
      <LikeIcon
        className={showCount !== false ? "mr-1" : ""}
        filled={findLikelist(product_id)}
      />{" "}
      {showCount !== false ? likeCount + " Likes" : ""}
    </button>
  );
}
