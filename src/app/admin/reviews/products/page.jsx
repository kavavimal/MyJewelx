import React from "react";
import prisma from "@/lib/prisma";
import StarRatings from "@/components/frontend/StarRatings";
import Image from "next/image";
import { checkUserSession } from "@/app/(frontend)/layout";
import moment from "moment";
import ReplayOnReview from "./ReplayOnReview";

export const revalidate = 0;

const getProductReviews = async (user) => {
  let products = [];
  if (user.role.role_name !== "ADMIN") {
    products = prisma.product.findMany({
      where: {
        reviews: { some: {} },
        user_id: user.id,
      },
      include: {
        reviews: {
          include: {
            fromUser: true,
            user: true,
            images: true,
            product: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  } else {
    products = prisma.product.findMany({
      where: {
        reviews: { some: {} },
      },
      include: {
        reviews: {
          include: {
            fromUser: true,
            user: true,
            images: true,
            product: {
              include: {
                user: true,
              },
            },
          },
          orderBy: [{ createdAt: "desc" }],
        },
      },
    });
  }

  return products;
};

const ReviewsPage = async () => {
  const user = await checkUserSession();
  const products = await getProductReviews(user);
  console.log(products);
  return (
    <section className="py-2">
      <h4 className="text-2xl font-semibold mb-5">Product Reviews</h4>
      {products?.length > 0 &&
        products?.map((prod) => (
          <div
            key={"review" + prod.product_id}
            className="p-5 border bg-white mb-3"
          >
            <h5 className="font-bold mb-5">{prod.product_name}</h5>
            {prod?.reviews &&
              prod?.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border p-5 rounded-sm bg-white mb-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[13px]">
                      <div className="bg-clip-border overflow-hidden rounded-full flex w-[37px]">
                        <Image
                          height={50}
                          width={50}
                          src="/assets/images/avatar.jpg"
                          size="sm"
                          className="h-[37px] w-full"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-[.5px]">
                        <h4 className="text-lg font-medium text-secondary-100">
                          {review.fromUser?.firstName}{" "}
                          {review.fromUser?.lastName}
                        </h4>
                        <StarRatings starRatings={review.rating} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-secondary-100">
                      <div>
                        on {moment(review.createdAt.toString()).fromNow()}
                      </div>
                    </div>
                  </div>
                  <p className="text-secondary-100 leading-6 text-sm mt-[6px]">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-[15px] my-[15px]">
                    {review?.images?.length > 0 &&
                      review?.images.map((imageItem, index) => (
                        <Image
                          key={index}
                          src={imageItem?.path}
                          width={100}
                          height={100}
                          alt=""
                          className="w-[85px] h-[81px] border border-blueGray-400"
                        />
                      ))}
                  </div>
                  {/* {review?.replay && review.replay !== "" && (
                    <div className="border rounded-sm ml-[30px] bg-[#FFFCF5] py-[7px] px-2.5">
                      <span className="block text-primary-200 text-sm ">
                        Seller response
                      </span>
                      <div className="text-secondary-100 text-sm">
                        {review.replay}
                      </div>
                    </div>
                  )} */}
                  {/* {!review?.replay && <ReplayOnReview review={review} />} */}
                </div>
              ))}
          </div>
        ))}
    </section>
  );
};

export default ReviewsPage;
