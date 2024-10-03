import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Rating,
  PopoverContent,
  Popover,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";
import { truncate } from "@/utils/helper";
import Link from "next/link";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { useUserStore } from "@/contexts/userStore";
import { useRouter } from "next/navigation";
import { get, post } from "@/utils/api";
import Cookies from "js-cookie";

const StoreCard = ({ list }) => {
  // console.log(list);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [counts, setCounts] = useState(list?._count?.likesReceived);
  // console.log(list);

  // function calculateAverageRating(list) {
  //   let totalRating = 0;
  //   let totalReviews = 0;
  //   if (list && list.products) {
  //     list.products.forEach((product) => {
  //       product.reviews.forEach((review) => {
  //         totalRating += review.rating;
  //         totalReviews++;
  //       });
  //     });
  //   }
  //   const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
  //   return averageRating;
  // }

  const calculateAverageRating = (list) => {
    const reviews = list?.reviews || [];
    if (!reviews) {
      return 0;
    } else {
      const allRating = reviews.reduce(
        (arr, item) => [...arr, item.rating],
        []
      );
      const sumRating = allRating.reduce((a, b) => a + b, 0);
      const avgRating = sumRating / allRating.length || 0;
      return avgRating;
    }
  };

  const totalOrderItems = (list) => {
    const totalSoldItems = list?.products?.reduce((totalItems, product) => {
      const productOrderItems = product?.variations?.reduce(
        (variationItems, variation) => {
          return variationItems + variation.orderItems.length;
        },
        0
      );
      return totalItems + productOrderItems;
    }, 0);
    return totalSoldItems;
  };
  const soldproducts = totalOrderItems(list);
  const vendorAverageRating = calculateAverageRating(list);
  // console.log(`Average rating: ${vendorAverageRating}`);
  const getLike = async () => {
    if (user?.id) {
      try {
        const response = await post(`/api/store/like`, {
          likerId: user?.id,
          likedId: list?.id,
        });
        // console.log(response?.data);
        setLiked(response?.data?.liked);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLike = async () => {
    if (!user?.id) {
      Cookies.set("redirect", window.location.href, { expires: 1 });
      return router.push("/login");
    }

    const response = await post(`/api/store/like/${list?.id}`, {
      likerId: user?.id,
      liked: liked,
    });

    if (response.status === 201) {
      setLiked(true);
      setCounts(counts + 1);
    } else if (response.status === 200) {
      setLiked(false);
      setCounts(counts - 1);
    }
  };

  useEffect(() => {
    getLike();
  }, [list?.id, user?.id]);

  return (
    <Card className="rounded-sm relative h-[496px] sm:h-[415px] bg-clip-border overflow-hidden border-blueGray-300 border">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 overflow-visible h-[240px] sm:h-[200px]"
      >
        <Image
          height={300}
          width={300}
          src={list?.banner_image?.path || "/assets/images/storeimg.jpg"}
          onError={(event) => {
            event.target.src = "/assets/images/storeimg.jpg";
            event.target.alt = "/assets/images/storeimg.jpg";
          }}
          unoptimized={true}
          alt="ui/ux review check"
          className="w-full h-[240px] sm:h-[200px] object-cover"
        />
        <Image
          src={
            list?.image?.path
              ? list.image.path
              : "/assets/images/logo-jewelry-store.png"
          }
          onError={(event) => {
            event.target.src = "/assets/images/vendor1.jpg";
            event.target.alt = "/assets/images/vendor1.jpg";
          }}
          unoptimized={true}
          alt="vendor store image"
          height={100}
          width={100}
          className="h-[72px] w-[72px] sm:w-[60px] sm:h-[60px] absolute bottom-[-7px] left-1/2 -translate-x-1/2 object-cover rounded-full shadow-4xl"
        />
      </CardHeader>
      <CardBody className="px-[18.30px] sm:px-[15px] h-[145.22px] sm:h-[121.5px] pb-[10.84px] sm:pb-[8.5px] pt-[14.34px] sm:pt-[12px] border-b border-blueGray-300">
        <div className="flex flex-col">
          <Link
            href={`${
              list.vendor?.store_name ?? list?.firstName + " " + list?.lastName
            }`}
            className="text-[21.51px] sm:text-lg mb-[5px] font-playfairdisplay text-blueGray-500 text-center font-semibold hover:text-primary-200"
          >
            {list.vendor?.store_name ?? `${list.firstName} ${list.lastName}`}
          </Link>
          <div className="flex items-center flex-col">
            <p className="font-light leading-6 w-[323px] sm:w-[271px] h-[56px] sm:h-[48px] text-sm text-center">
              {list.vendor?.licence_address ||
                "Shop.53" + ", " + list.vendor?.licence_city ||
                "Ground Floor" +
                  ", Zip Code - " +
                  list.vendor?.licence_zip_code ||
                "The Gold Center Building" +
                  ", " +
                  list.vendor?.licence_state ||
                "Deira Dubai" + ", " + list.vendor?.licence_country ||
                "Dubai" + ", "}
            </p>
          </div>
          <div className="flex justify-between relative items-center">
            <div>
              <p className="text-sm flex items-center leading-6">
                <svg
                  height={12}
                  width={12}
                  className="mr-[5px]"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.95 18C14.8667 18 12.8083 17.546 10.775 16.638C8.74167 15.73 6.89167 14.4423 5.225 12.775C3.55833 11.1077 2.271 9.25767 1.363 7.225C0.455 5.19233 0.000666667 3.134 0 1.05C0 0.75 0.0999999 0.5 0.3 0.3C0.5 0.0999999 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0793332 5.725 0.238C5.90833 0.396667 6.01667 0.584 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.704 9.11233 5.162 9.687C5.62 10.2617 6.12433 10.816 6.675 11.35C7.19167 11.8667 7.73333 12.346 8.3 12.788C8.86667 13.23 9.46667 13.634 10.1 14L12.45 11.65C12.6 11.5 12.796 11.3877 13.038 11.313C13.28 11.2383 13.5173 11.2173 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1377 17.775 12.313C17.925 12.4883 18 12.684 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18Z"
                    fill="#1A1A1A"
                  />
                </svg>

                {list?.phone_number ?? "+97 123-75678"}
              </p>
            </div>
            <div className="h-[18px] w-px self-stretch absolute left-1/2 bg-blueGray-300"></div>
            <div>
              <p className="text-sm flex items-center leading-6">
                <svg
                  className="mr-[6px]"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_255_792)">
                    <path
                      d="M21.5531 3.99994C21.4622 3.99058 21.3706 3.99058 21.2798 3.99994H2.6131C2.49346 4.00179 2.37462 4.01972 2.25977 4.05328L11.8931 13.6466L21.5531 3.99994Z"
                      fill="#1A1A1A"
                    />
                    <path
                      d="M22.5404 4.92676L12.8338 14.5934C12.584 14.8418 12.246 14.9811 11.8938 14.9811C11.5415 14.9811 11.2036 14.8418 10.9538 14.5934L1.33378 5.00009C1.3042 5.10878 1.28852 5.22079 1.28711 5.33342V18.6668C1.28711 19.0204 1.42759 19.3595 1.67763 19.6096C1.92768 19.8596 2.26682 20.0001 2.62044 20.0001H21.2871C21.6407 20.0001 21.9799 19.8596 22.2299 19.6096C22.48 19.3595 22.6204 19.0204 22.6204 18.6668V5.33342C22.6151 5.19453 22.5881 5.05731 22.5404 4.92676ZM3.53378 18.6668H2.60711V17.7134L7.45378 12.9068L8.39378 13.8468L3.53378 18.6668ZM21.2738 18.6668H20.3404L15.4804 13.8468L16.4204 12.9068L21.2671 17.7134L21.2738 18.6668Z"
                      fill="#1A1A1A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_255_792">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {truncate(list?.email, 22)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="p-0 h-[111.75px] sm:h-[93.5px]">
        <div className="px-[17px] pt-[9.21px] sm:px-[15px] sm:pt-[8px] pb-0 flex flex-col gap-[7.42px] sm:gap-[5px]">
          <div className="flex h-[27px] sm:h-[22px] justify-between items-center">
            <div className="flex items-center gap-1">
              <Rating
                readonly
                value={Math.floor(vendorAverageRating)}
                ratedIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2203_6278)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.52818 0.922918C7.48149 0.821731 7.4068 0.736036 7.31293 0.675971C7.21906 0.615905 7.10995 0.583984 6.99852 0.583984C6.88708 0.583984 6.77797 0.615905 6.6841 0.675971C6.59024 0.736036 6.51554 0.821731 6.46885 0.922918L4.79468 4.55125L0.827432 5.022C0.716745 5.03507 0.612119 5.07958 0.525936 5.15025C0.439753 5.22093 0.375622 5.31481 0.341132 5.4208C0.306642 5.52679 0.303238 5.64043 0.331321 5.74829C0.359405 5.85615 0.417801 5.95371 0.499599 6.02942L3.43377 8.74192L2.65502 12.6619C2.63339 12.7712 2.6435 12.8844 2.68415 12.9881C2.72481 13.0918 2.7943 13.1817 2.88443 13.2472C2.97456 13.3126 3.08155 13.3509 3.19275 13.3575C3.30394 13.3641 3.4147 13.3387 3.51193 13.2843L6.99852 11.3325L10.4851 13.2843C10.5824 13.3389 10.6933 13.3645 10.8047 13.358C10.916 13.3514 11.0232 13.3131 11.1134 13.2476C11.2037 13.182 11.2733 13.0919 11.3139 12.988C11.3545 12.8841 11.3645 12.7707 11.3426 12.6613L10.5638 8.7425L13.4974 6.02942C13.5792 5.95371 13.6376 5.85615 13.6657 5.74829C13.6938 5.64043 13.6904 5.52679 13.6559 5.4208C13.6214 5.31481 13.5573 5.22093 13.4711 5.15025C13.3849 5.07958 13.2803 5.03507 13.1696 5.022L9.20177 4.55067L7.52818 0.922918Z"
                        fill="#F0AE11"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2203_6278">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                unratedIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2203_6280)">
                      <path
                        d="M7.00127 1.16602L8.81194 5.09068L13.1041 5.59993L9.93077 8.5341L10.7731 12.7738L7.00127 10.6627L3.22944 12.7743L4.07177 8.53468L0.898438 5.59935L5.19119 5.0901L7.00127 1.16602Z"
                        stroke="#F0AE11"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2203_6280">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
              <div className="text-sm leading-6">
                ({list?._count?.reviews ? list?._count?.reviews : 0} Reviews)
              </div>
            </div>

            <div className="flex items-center gap-[5px]">
              <button
                onClick={handleLike}
                className={`flex items-center gap-0.5 ${
                  liked ? "text-primary-200" : "text-blueGray-500"
                } text-base`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9987 13.9993H5.33203V5.33268L9.9987 0.666016L10.832 1.49935C10.9098 1.57713 10.9738 1.68268 11.024 1.81602C11.0743 1.94935 11.0991 2.07713 11.0987 2.19935V2.43268L10.3654 5.33268H13.9987C14.3543 5.33268 14.6654 5.46602 14.932 5.73268C15.1987 5.99935 15.332 6.31046 15.332 6.66602V7.99935C15.332 8.07713 15.3238 8.16046 15.3074 8.24935C15.2909 8.33824 15.2658 8.42157 15.232 8.49935L13.232 13.1993C13.132 13.4216 12.9654 13.6105 12.732 13.766C12.4987 13.9216 12.2543 13.9993 11.9987 13.9993ZM3.9987 5.33268V13.9993H1.33203V5.33268H3.9987Z"
                    fill="currentColor"
                  />
                </svg>
                {counts}
              </button>
              <div className="h-[14px] w-px bg-blueGray-300"></div>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 7.99949C14 10.7606 11.3135 12.999 8 12.999C7.40571 13.0002 6.81384 12.9267 6.23975 12.7804C5.80175 12.9918 4.796 13.3975 3.104 13.6618C2.954 13.6846 2.84 13.5361 2.89925 13.4032C3.16475 12.8061 3.40475 12.0105 3.47675 11.2849C2.558 10.4064 2 9.2565 2 7.99949C2 5.23834 4.6865 3 8 3C11.3135 3 14 5.23834 14 7.99949ZM5.75 7.99949C5.75 7.81006 5.67098 7.6284 5.53033 7.49446C5.38968 7.36052 5.19891 7.28527 5 7.28527C4.80109 7.28527 4.61032 7.36052 4.46967 7.49446C4.32902 7.6284 4.25 7.81006 4.25 7.99949C4.25 8.18891 4.32902 8.37057 4.46967 8.50451C4.61032 8.63845 4.80109 8.7137 5 8.7137C5.19891 8.7137 5.38968 8.63845 5.53033 8.50451C5.67098 8.37057 5.75 8.18891 5.75 7.99949ZM8.75 7.99949C8.75 7.81006 8.67098 7.6284 8.53033 7.49446C8.38968 7.36052 8.19891 7.28527 8 7.28527C7.80109 7.28527 7.61032 7.36052 7.46967 7.49446C7.32902 7.6284 7.25 7.81006 7.25 7.99949C7.25 8.18891 7.32902 8.37057 7.46967 8.50451C7.61032 8.63845 7.80109 8.7137 8 8.7137C8.19891 8.7137 8.38968 8.63845 8.53033 8.50451C8.67098 8.37057 8.75 8.18891 8.75 7.99949ZM11 8.7137C11.1989 8.7137 11.3897 8.63845 11.5303 8.50451C11.671 8.37057 11.75 8.18891 11.75 7.99949C11.75 7.81006 11.671 7.6284 11.5303 7.49446C11.3897 7.36052 11.1989 7.28527 11 7.28527C10.8011 7.28527 10.6103 7.36052 10.4697 7.49446C10.329 7.6284 10.25 7.81006 10.25 7.99949C10.25 8.18891 10.329 8.37057 10.4697 8.50451C10.6103 8.63845 10.8011 8.7137 11 8.7137Z"
                    fill="#343434"
                  />
                </svg>
              </span>
              <div className="h-[14px] w-px bg-blueGray-300"></div>
              <Popover placement="bottom">
                <PopoverHandler>
                  <button>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 10.7207C11.4933 10.7207 11.04 10.9207 10.6933 11.234L5.94 8.46732C5.97333 8.31398 6 8.16065 6 8.00065C6 7.84065 5.97333 7.68732 5.94 7.53398L10.64 4.79398C11 5.12732 11.4733 5.33398 12 5.33398C13.1067 5.33398 14 4.44065 14 3.33398C14 2.22732 13.1067 1.33398 12 1.33398C10.8933 1.33398 10 2.22732 10 3.33398C10 3.49398 10.0267 3.64732 10.06 3.80065L5.36 6.54065C5 6.20732 4.52667 6.00065 4 6.00065C2.89333 6.00065 2 6.89398 2 8.00065C2 9.10732 2.89333 10.0007 4 10.0007C4.52667 10.0007 5 9.79398 5.36 9.46065L10.1067 12.234C10.0733 12.374 10.0533 12.5207 10.0533 12.6673C10.0533 13.7407 10.9267 14.614 12 14.614C13.0733 14.614 13.9467 13.7407 13.9467 12.6673C13.9467 11.594 13.0733 10.7207 12 10.7207Z"
                        fill="#343434"
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
            </div>
          </div>
          <div className="flex h-[27px] sm:h-[24px] items-center justify-between">
            <div className="flex gap-[5px] text-blueGray-700 text-sm">
              <button>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.49901 4.01065V3.33398C5.49901 2.67094 5.76241 2.03506 6.23125 1.56622C6.70009 1.09738 7.33597 0.833984 7.99902 0.833984C8.66206 0.833984 9.29794 1.09738 9.76678 1.56622C10.2356 2.03506 10.499 2.67094 10.499 3.33398V4.01065C11.357 4.03665 11.8823 4.12865 12.283 4.46132C12.8383 4.92265 12.985 5.70265 13.2777 7.26332L13.7777 9.92999C14.189 12.1247 14.3943 13.222 13.795 13.9447C13.195 14.6673 12.0783 14.6673 9.84568 14.6673H6.15235C3.91901 14.6673 2.80301 14.6673 2.20301 13.9447C1.60301 13.222 1.80968 12.1247 2.22035 9.92999L2.72035 7.26332C3.01368 5.70332 3.15968 4.92265 3.71501 4.46132C4.11568 4.12865 4.64102 4.03665 5.49901 4.01065ZM6.49901 3.33398C6.49901 2.93616 6.65705 2.55463 6.93835 2.27332C7.21966 1.99202 7.60119 1.83398 7.99902 1.83398C8.39684 1.83398 8.77837 1.99202 9.05968 2.27332C9.34098 2.55463 9.49902 2.93616 9.49902 3.33398V4.00065H6.49901V3.33398Z"
                    fill="#343434"
                  />
                </svg>
              </button>

              <span className="block text-sm ">Listed Products:</span>
              <span className="block">{list?._count?.products}</span>
            </div>
            <div className="flex gap-0.5 text-blueGray-700 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6122 13.7329L13.3952 5.67217C13.3093 5.15674 12.8654 4.77017 12.35 4.77017H11.0901V4.09725C11.0901 2.5796 9.85876 1.33398 8.3268 1.33398C6.79483 1.33398 5.56353 2.56528 5.56353 4.09725V4.77017H4.3036C3.77385 4.77017 3.33001 5.15674 3.25842 5.67217L2.01281 13.7329C1.91258 14.3772 2.41369 14.9499 3.05798 14.9499H13.5527C14.2113 14.9499 14.6981 14.3772 14.6122 13.7329ZM7.06686 4.11157C7.06686 3.42433 7.62524 2.86595 8.31248 2.86595C8.99972 2.86595 9.5581 3.42433 9.5581 4.11157V4.78449H7.06686V4.11157ZM10.818 8.9795L8.29816 11.6282C8.16931 11.7571 8.01181 11.8287 7.82569 11.8287C7.65388 11.8287 7.48207 11.7571 7.35321 11.6282L5.80693 9.99604C5.56353 9.73832 5.57785 9.32312 5.83556 9.07972C6.09328 8.83632 6.50848 8.85064 6.75188 9.10835L7.84 10.2537L9.8874 8.09182C10.1308 7.8341 10.546 7.81978 10.8037 8.06318C11.0614 8.32089 11.0614 8.72178 10.818 8.9795Z"
                  fill="#343434"
                />
              </svg>

              <span className="text-sm">sold Products:</span>
              <span>{soldproducts}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end h-[35.86px] sm:h-[30px] mt-[7px]">
          <Link
            href={`/${
              list?.vendor?.store_name ?? list?.firstName + " " + list?.lastName
            }`}
            className="capitalize border py-1 text-primary-200 hover:text-white transition-all delay-100 hover:bg-primary-200 border-primary-200 px-[25px] flex items-center gap-[5px] border-b-0 border-r-0 rounded-ss-[20px] rounded-es-none rounded-e-none"
          >
            Visit
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66797 8H13.3346M13.3346 8L9.33464 4M13.3346 8L9.33464 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;