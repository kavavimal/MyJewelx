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
        reviews: {some: {}},
        user_id: user.id,
      },
      include: {
        reviews:{
          include: {
            fromUser: true,
            user: true,
            images: true,
            product: {
              include: {
                user: true,
              },
            },
          }
        }
      }
    });
  } else {
    products = prisma.product.findMany({
      where: {
        reviews: {some: {}},      
      },
      include: {
        reviews:{
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
          orderBy: [{"createdAt" : "desc"}]
        }
      }
    });

  }

  return products
};

const ReviewsPage = async () => {
  const user = await checkUserSession();
  const products = await getProductReviews(user);
  return (
    <section>
      <h4 className="text-2xl font-semibold">Product Reviews</h4>
      {products?.length > 0 && products?.map((prod) => {
        return <div key={'review'+prod.product_id} className="p-2 border">
          Product: {prod.product_name}
          {prod?.reviews && prod?.reviews.map((review, index) => {
            return (
              <div key={index} className="border p-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <strong>{review.fromUser?.firstName}{" "}{review.fromUser?.lastName} </strong>
                  <div>on {moment(review.createdAt.toString()).fromNow()}</div>
                </div>
                <StarRatings starRatings={review.rating} />
                {review.text} 
                <div className="flex items-center gap-1">
                  {review?.images?.length > 0 && review?.images.map((imageItem,index) =>{
                  return <Image key={index} src={imageItem?.path} width={100} height={100} alt=""/>
                })}
                </div> 
                <div className="border-t mt-3 pt-2 pl-5">
                  {review?.replay && review.replay != '' ? (
                    <div className="p2 bg-blue-gray-50">Replay from seller: {review.replay}</div>)
                    :<ReplayOnReview review={review} /> }
                  
                </div>
            </div>
            );
          })}
        </div>
      })}
    </section>
  );
};

export default ReviewsPage;
