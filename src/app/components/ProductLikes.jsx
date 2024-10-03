"use client";
import { useWishlistStore } from "@/contexts/wishlistStore";
import { useEffect, useState } from "react";
import LikeIcon from "./LikeIcon";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import LoadingDots from "./LoadingDots";

export default function ProductLikes({
  product_id,
  count = 0,
  showCount = false,
  like,
  isproductid = false,
}) {
  const user = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const [showLikes, setShowLikes] = useState(like);

  const findLikelist = useWishlistStore((state) => state.findLikelist);
  const addToLikedlist = useWishlistStore((state) => state.addToLikedlist);
  const removeFromLikedlist = useWishlistStore(
    (state) => state.removeFromLikedlist
  );

  useEffect(() => {
    setLikeCount(count);
    setShowLikes(like);
  }, [product_id, count, like]);

  const updateMyLikeStatus = async () => {
    if (!user.data) {
      Cookies.set("redirect", window.location.href, { expires: 1 });
      router.push("/login");
      return;
    }
    setLoading(true);
    if (findLikelist(product_id)) {
      await removeFromLikedlist(product_id);
      setLikeCount((c) => c - 1);
      setShowLikes((c) => c - 1);
    } else {
      await addToLikedlist(product_id);
      setLikeCount((c) => c + 1);
      setShowLikes((c) => c + 1);
    }
    setLoading(false);
  };

  return (
    <Tooltip
      content="Likes"
      className="bg-gray-800 text-white text-xs p-2 rounded shadow-lg"
      placement="top-end"
    >
      <button
        type="button"
        className="flex items-center relative justify-center gap-1 text-sm"
        onClick={updateMyLikeStatus}
      >
        {loading && (
          <span
            className={`px-1 absolute ${
              isproductid === true ? "right-[-30px]" : "top-[22px]"
            }  `}
          >
            <LoadingDots />
          </span>
        )}
        {count == 0 ? (
          <p
            className={`text-[13px] pt-[3px] ${
              findLikelist(product_id) ? "text-primary-200" : ""
            }`}
          >
            {showLikes ? showLikes : "0"}
          </p>
        ) : (
          ""
        )}
        <LikeIcon
          className={showCount !== false ? "mr-1" : ""}
          filled={findLikelist(product_id)}
        />
        {showCount !== false ? likeCount + " Likes" : ""}
      </button>
    </Tooltip>
  );
}
