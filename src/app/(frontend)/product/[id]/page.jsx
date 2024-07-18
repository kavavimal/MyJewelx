import prisma from "@/lib/prisma";
import Detail from "./compos/Detail";
import { ATTRIBUTE_ORDER } from "@/utils/constants";
import ReviewForm from "./compos/ReviewForm";
import { checkUserSession } from "../../layout";
import { ReviewStatus } from "@prisma/client";
import Image from "next/image";
import StarRatings from "@/components/frontend/StarRatings";
import Container from "@/components/frontend/Container";
import moment from "moment";

async function get_productBy_id(id) {
  if(id){
    const product = await prisma.product.findFirst({
      where: { product_id: Number(id) },
      include: {
        variations: {
          include: {
            image: true,
            productAttributeValues: {
              include: {
                productAttributeValue: {
                  include: {
                    attribute: true, // Include attribute details if needed
                    attributeValue: true,
                  },
                },
              },
            },
          },
        },
        user: true,
        
        country: true,
        likes: true,
        genders: {
          include: {
            gender: true,
          },
        },
        reviews: {
          include: {
            images: true,
            fromUser: true,
          },
        },
        ProductAttributeValue: {
          include: { attribute: true, attributeValue: true },
        },
      },
    });
    const reviews = product.reviews.filter(
      (review) => review.status === ReviewStatus.PUBLISHED
    );
    const allRating = reviews.reduce((arr, item) => [...arr, item.rating],[]);
    const sumRating = allRating.reduce((a, b) => a + b, 0);
    const avgRating = (sumRating / allRating.length) || 0;
    
    const attributeCount = product.ProductAttributeValue.reduce((acc, item) => {
      acc[item.attribute_id] = (acc[item.attribute_id] || 0) + 1;
      return acc;
    }, {});

    const multipleAttributesCount = Object.keys(attributeCount).map((att) =>
      attributeCount[att] > 1
        ? product.ProductAttributeValue.filter(
            (item) => Number(item.attribute_id) === Number(att)
          )
        : false
    );
    const filteredAttributes = ATTRIBUTE_ORDER.map((orderId) => {
      return multipleAttributesCount.find(
        (attributeArray) =>
          attributeArray &&
          attributeArray.length > 0 &&
          Number(attributeArray[0].attribute_id) === orderId
      );
    }).filter(Boolean); // Remove any false values

    let selectedOptions = {};
    const variation = product.variations[0];
    const multipleAttributesCountFirstVariation = Object.keys(attributeCount).map(
      (att) =>
        attributeCount[att] > 1
          ? variation.productAttributeValues.find(
              (item) =>
                Number(item.productAttributeValue.attribute_id) === Number(att)
            )
          : false
    );
    selectedOptions = multipleAttributesCountFirstVariation
      .filter((a) => a !== false)
      .map((a) => {
        return {
          attribute_id: a.productAttributeValue.attribute_id,
          value_id: a.productAttributeValue.attributeValue_id,
        };
      });

    return {
      product: product,
      selectedOptions: selectedOptions,
      filteredAttributes: filteredAttributes,
      reviews: reviews,
      avgRating: avgRating
    };
  }
  return false;
}
async function updateViewForThisProduct(userId, productId) {
  const existingCheck = await prisma.viewedProduct.findUnique({
    where: {
      userId_productId: {
        userId: userId,
        productId: Number(productId)
      }
    }
  });
  if (existingCheck){
    return existingCheck;
  }
  const viewProduct = await prisma.viewedProduct.create({
    data: {
      user: {connect: {id: userId}},
      product: {connect: {product_id: Number(productId)}},
    },
  });
  return viewProduct;
};

export default async function ProductDetails({ params: { id } }) {
  const user = await checkUserSession();
  const productData = await get_productBy_id(id);
  if (user.id) {
    await updateViewForThisProduct(user.id, id);
  }
  return (
    <>
      <Detail
        product={productData.product}
        selectedOptions={productData?.selectedOptions}
        filteredAttributes={productData?.filteredAttributes}
        avgRating={productData?.avgRating}
      />
      <Container >
        <div>Review</div>
        {user.id && <ReviewForm user_id={user.id} product_id={id} />}
        {productData?.reviews &&
          productData?.reviews?.map((review, index) => {
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
                {review?.replay && review.replay != '' ? (
              <div className="border-t mt-3 pt-2 pl-5">
                  <div className="p2 bg-blue-gray-50">Replay from seller: {review.replay}</div>
              </div>
                  ):''}                
          </div>
            );
          })}
      </Container>
    </>
  );
}
