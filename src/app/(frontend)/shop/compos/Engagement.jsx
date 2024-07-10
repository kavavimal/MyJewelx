"use client";

import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("@/components/frontend/StarRatings"), {
  ssr: false,
});
import { useWishlistStore } from "@/contexts/wishlistStore";
import { useState } from "react";
import { IconButton, Rating } from "@material-tailwind/react";

const Engagement = ({ product_id, variation }) => {
  const findWishlist = useWishlistStore((state) => state.find);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  // const starRatings = variation.starRatings;
  function getRandomValue() {
    let randomNumber = Math.random() * (5.0 - 2.0) + 2.0;
    let randomValue = randomNumber.toFixed(2);
    return Number(randomValue);
  }
  const starRatings = getRandomValue();

  const [liked, setLiked] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <div>
        <Rating
          value={4}
          ratedIcon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <g clip-path="url(#clip0_1259_2293)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.4544 0.790515C6.41438 0.703783 6.35036 0.63033 6.2699 0.578845C6.18944 0.527361 6.09592 0.5 6.0004 0.5C5.90488 0.5 5.81136 0.527361 5.7309 0.578845C5.65045 0.63033 5.58642 0.703783 5.5464 0.790515L4.1114 3.90052L0.710902 4.30401C0.616027 4.31522 0.526347 4.35337 0.452476 4.41394C0.378605 4.47452 0.323636 4.555 0.294073 4.64584C0.26451 4.73669 0.261592 4.8341 0.285664 4.92655C0.309736 5.019 0.35979 5.10262 0.429902 5.16751L2.9449 7.49251L2.2774 10.8525C2.25886 10.9462 2.26753 11.0432 2.30237 11.1321C2.33722 11.221 2.39679 11.298 2.47405 11.3541C2.5513 11.4103 2.643 11.4431 2.73831 11.4487C2.83363 11.4544 2.92856 11.4326 3.0119 11.386L6.0004 9.71302L8.9889 11.386C9.07229 11.4328 9.16735 11.4547 9.26281 11.4491C9.35827 11.4435 9.45012 11.4107 9.52748 11.3545C9.60484 11.2983 9.66446 11.2211 9.69928 11.132C9.73409 11.043 9.74264 10.9458 9.7239 10.852L9.0564 7.49301L11.5709 5.16751C11.641 5.10262 11.6911 5.019 11.7151 4.92655C11.7392 4.8341 11.7363 4.73669 11.7067 4.64584C11.6772 4.555 11.6222 4.47452 11.5483 4.41394C11.4745 4.35337 11.3848 4.31522 11.2899 4.30401L7.8889 3.90002L6.4544 0.790515Z"
                  fill="#F0AE11"
                />
              </g>
              <defs>
                <clipPath id="clip0_1259_2293">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
          unratedIcon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M6.00053 1L7.55253 4.364L11.2315 4.8005L8.51153 7.3155L9.23353 10.9495L6.00053 9.14L2.76753 10.95L3.48953 7.316L0.769531 4.8L4.44903 4.3635L6.00053 1Z"
                stroke="#F0AE11"
                stroke-width="0.75"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          variant="text"
          className="rounded-full"
          size="sm"
          onClick={() => setLiked(!liked)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.875 6.39626L2.34188 6.35626C2.33112 6.23621 2.27452 6.12491 2.18385 6.04549C2.09318 5.96607 1.9754 5.92463 1.85497 5.92978C1.73455 5.93493 1.62074 5.98627 1.53717 6.07314C1.45361 6.16001 1.40672 6.27573 1.40625 6.39626H1.875ZM12.6475 7.53564L12.2063 10.0856L13.1306 10.2456L13.5713 7.69564L12.6475 7.53564ZM8.27813 13.2813H5.3725V14.2188H8.27813V13.2813ZM4.80313 12.7581L4.29563 6.88751L3.36125 6.96814L3.86938 12.8388L4.80313 12.7581ZM12.2063 10.0856C11.8894 11.9169 10.2381 13.2813 8.27813 13.2813V14.2188C10.6694 14.2188 12.7319 12.5506 13.1306 10.2456L12.2063 10.0856ZM8.28438 3.18751L7.87 5.71564L8.795 5.86689L9.20938 3.33939L8.28438 3.18751ZM4.4925 6.40376L5.39188 5.62876L4.77938 4.91876L3.88125 5.69376L4.4925 6.40376ZM7.0275 3.10751L7.325 1.96126L6.4175 1.72626L6.12 2.87189L7.0275 3.10751ZM7.77375 1.73626L7.86438 1.76564L8.15125 0.873135L8.06063 0.84376L7.77375 1.73626ZM6.57688 4.26001C6.77211 3.89501 6.92337 3.50814 7.0275 3.10751L6.12 2.87189C6.03455 3.20103 5.91035 3.51888 5.75 3.81876L6.57688 4.26001ZM7.86438 1.76564C7.95355 1.79266 8.03446 1.84178 8.09958 1.90843C8.1647 1.97508 8.21193 2.0571 8.23688 2.14689L9.14438 1.91189C9.07979 1.66908 8.95489 1.44653 8.78126 1.26492C8.60763 1.08332 8.39092 0.948549 8.15125 0.873135L7.86438 1.76564ZM7.325 1.96126C7.33746 1.91624 7.35956 1.87448 7.38978 1.83886C7.42 1.80324 7.45761 1.77463 7.5 1.75501L7.09313 0.910635C6.76063 1.07064 6.51063 1.36689 6.4175 1.72626L7.325 1.96126ZM7.5 1.75501C7.58554 1.71416 7.68344 1.70745 7.77375 1.73626L8.06063 0.84376C7.74145 0.74146 7.3952 0.765393 7.09313 0.910635L7.5 1.75501ZM8.84625 6.86501H12.0838V5.92751H8.84625V6.86501ZM2.94938 13.3788L2.34188 6.35626L1.40813 6.43689L2.01438 13.4594L2.94938 13.3788ZM2.34375 13.4456V6.39626H1.40625V13.4456H2.34375ZM2.01438 13.4594C2.01247 13.4367 2.01593 13.4138 2.02333 13.3923C2.03074 13.3707 2.04254 13.3509 2.058 13.3342C2.07346 13.3174 2.09223 13.3041 2.11313 13.2949C2.13402 13.2858 2.15658 13.2812 2.17938 13.2813V14.2188C2.63313 14.2188 2.98813 13.83 2.94938 13.3788L2.01438 13.4594ZM9.20938 3.33939C9.28733 2.86422 9.26519 2.378 9.14438 1.91189L8.23688 2.14751C8.32496 2.48709 8.34114 2.84132 8.28438 3.18751L9.20938 3.33939ZM5.3725 13.2813C5.22938 13.281 5.09155 13.2272 4.98616 13.1303C4.88077 13.0335 4.81547 12.9007 4.80313 12.7581L3.86938 12.8388C3.9019 13.2151 4.0743 13.5656 4.35257 13.8211C4.63083 14.0765 4.99475 14.2184 5.3725 14.2188V13.2813ZM5.39188 5.62876C5.81688 5.26251 6.27438 4.82689 6.5775 4.26001L5.75 3.81876C5.53375 4.22439 5.18938 4.56626 4.77938 4.91876L5.39188 5.62876ZM13.5713 7.69564C13.6089 7.47875 13.5986 7.25627 13.5412 7.04376C13.4838 6.83125 13.3807 6.63386 13.239 6.46542C13.0973 6.29698 12.9204 6.16155 12.7209 6.06863C12.5213 5.97572 12.3039 5.92755 12.0838 5.92751V6.86501C12.4381 6.86501 12.7088 7.18501 12.6475 7.53564L13.5713 7.69564ZM2.17938 13.2813C2.27063 13.2813 2.34375 13.355 2.34375 13.4456H1.40625C1.40625 13.8719 1.75188 14.2188 2.17938 14.2188V13.2813ZM7.87 5.71564C7.8467 5.85725 7.85449 6.00223 7.89282 6.14054C7.93116 6.27884 7.99912 6.40714 8.092 6.51655C8.18488 6.62596 8.30045 6.71385 8.43069 6.77413C8.56094 6.83441 8.70273 6.86501 8.84625 6.86501V5.92751C8.83862 5.92754 8.83109 5.92652 8.82417 5.92331C8.81725 5.9201 8.81113 5.9154 8.80624 5.90955C8.80134 5.9037 8.7978 5.89685 8.79586 5.88947C8.79391 5.8821 8.79362 5.87439 8.795 5.86689L7.87 5.71564ZM4.29563 6.88751C4.2879 6.797 4.30115 6.70595 4.33549 6.62185C4.36982 6.53775 4.42364 6.463 4.4925 6.40376L3.88 5.69314C3.69876 5.84941 3.55722 6.04648 3.46704 6.26815C3.37685 6.48981 3.34059 6.72972 3.36125 6.96814L4.29563 6.88751Z"
              fill="currentColor"
            />
          </svg>
        </button>
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
        <button
          variant="text"
          className="rounded-full"
          size="sm"
          onClick={() =>
            findWishlist(product_id)
              ? removeFromWishlist(product_id)
              : addToWishlist(product_id)
          }
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
              fill={findWishlist(product_id) ? "red" : "#1A1A1A"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Engagement;
