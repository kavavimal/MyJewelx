"use client";

import ProductLikes from "@/components/frontend/ProductLikes";
import LoadingDots from "@/components/loading-dots";
import { useWishlistStore } from "@/contexts/wishlistStore";
import {
  Dialog,
  DialogHeader,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  DialogBody,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
} from "react-share";
const StarRatings = dynamic(() => import("@/components/frontend/StarRatings"), {
  ssr: false,
});

const Engagement = ({ product_id, averateRating, variation }) => {
  const user = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, wishlistItems]);

  const updateWishlistStatus = async () => {
    if (!user.data) {
      router.push("/login");
      return;
    }
    setLoading(true);
    if (isInWishlist) {
      await removeFromWishlist(product_id);
    } else {
      await addToWishlist(product_id);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <StarRatings starRatings={averateRating ? averateRating : 0} />
        </div>
        <div className="flex items-center gap-2">
          <ProductLikes product_id={product_id} />
          <Popover placement="bottom">
            <PopoverHandler>
              <button className="rounded-full">
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
            </PopoverHandler>
            <PopoverContent>
              <div className="flex gap-2 items-center">
                <FacebookShareButton
                  url="https://tailwindcss.com/"
                  title="Hello"
                  separator=": "
                >
                  <span className="flex items-center gap-2 text-black text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#1877f2"
                        d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                      ></path>
                      <path
                        fill="#fff"
                        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                      ></path>
                    </svg>
                  </span>
                </FacebookShareButton>
                <LinkedinShareButton
                  url="https://tailwindcss.com/"
                  title="Hello"
                  separator=": "
                >
                  <span className="flex items-center gap-2 text-black text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 256 256"
                    >
                      <g fill="none">
                        <rect
                          width={256}
                          height={256}
                          fill="#fff"
                          rx={60}
                        ></rect>
                        <rect
                          width={256}
                          height={256}
                          fill="#0a66c2"
                          rx={60}
                        ></rect>
                        <path
                          fill="#fff"
                          d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </LinkedinShareButton>
              </div>
            </PopoverContent>
          </Popover>
          {loading && <LoadingDots />}
          <button className="rounded-full" onClick={updateWishlistStatus}>
            <svg
              width="15"
              height="15"
              toolTip="hello"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-black hover:text-primary-200 hover:fill-primary-200`}
            >
              <path
                d="M10.4297 2.34375C9.21973 2.34375 8.16035 2.86406 7.5 3.74355C6.83965 2.86406 5.78027 2.34375 4.57031 2.34375C3.60716 2.34484 2.68377 2.72793 2.00273 3.40898C1.32168 4.09002 0.938586 5.01341 0.9375 5.97656C0.9375 10.0781 7.01895 13.398 7.27793 13.5352C7.34619 13.5719 7.42249 13.5911 7.5 13.5911C7.57751 13.5911 7.65381 13.5719 7.72207 13.5352C7.98105 13.398 14.0625 10.0781 14.0625 5.97656C14.0614 5.01341 13.6783 4.09002 12.9973 3.40898C12.3162 2.72793 11.3928 2.34484 10.4297 2.34375ZM7.5 12.5859C6.43008 11.9625 1.875 9.12246 1.875 5.97656C1.87593 5.26201 2.1602 4.57698 2.66547 4.07172C3.17073 3.56645 3.85576 3.28218 4.57031 3.28125C5.70996 3.28125 6.6668 3.88828 7.06641 4.86328C7.10172 4.94926 7.1618 5.02279 7.239 5.07454C7.31621 5.12629 7.40706 5.15392 7.5 5.15392C7.59295 5.15392 7.68379 5.12629 7.761 5.07454C7.8382 5.02279 7.89828 4.94926 7.93359 4.86328C8.3332 3.88652 9.29004 3.28125 10.4297 3.28125C11.1442 3.28218 11.8293 3.56645 12.3345 4.07172C12.8398 4.57698 13.1241 5.26201 13.125 5.97656C13.125 9.11777 8.56875 11.9619 7.5 12.5859Z"
                fill={isInWishlist ? "#F0AE11" : ""}
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Engagement;
