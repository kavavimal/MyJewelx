import prisma from "@/lib/prisma";
import Detail from "./compos/Detail";
import { ATTRIBUTE_ORDER } from "@/utils/constants";
import { ReviewStatus } from "@prisma/client";
import Image from "next/image";
import moment from "moment";
import RelatedProduct from "./compos/RelatedProduct";
import CustomerReviews from "./compos/CustomerReviews";
import StarRatings from "@/app/components/StarRatings";
import { checkUserSession } from "@/app/actions/users";

export const revalidate = 0;

async function get_productBy_id(id) {
  if (id) {
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
        user: {
          include: { vendor: true, image: true },
        },
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
        relatedProducts: {
          include: {
            product: {
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
            },
          },
        },
      },
    });
    const reviews = product.reviews.filter(
      (review) => review.status === ReviewStatus.PUBLISHED
    );
    const allRating = reviews.reduce((arr, item) => [...arr, item.rating], []);
    const sumRating = allRating.reduce((a, b) => a + b, 0);
    const avgRating = sumRating / allRating.length || 0;

    const attributeCount = product.ProductAttributeValue.reduce((acc, item) => {
      acc[item.attribute_id] = (acc[item.attribute_id] || 0) + 1;
      return acc;
    }, {});

    const multipleAttributesCount = Object.keys(attributeCount).map((att) =>
      attributeCount
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
    const multipleAttributesCountFirstVariation = Object.keys(
      attributeCount
    ).map((att) =>
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
      avgRating: avgRating,
    };
  }
  return false;
}
async function updateViewForThisProduct(userId, productId) {
  const existingCheck = await prisma.viewedProduct.findUnique({
    where: {
      userId_productId: {
        userId: userId,
        productId: Number(productId),
      },
    },
  });
  if (existingCheck) {
    return existingCheck;
  }
  const viewProduct = await prisma.viewedProduct.create({
    data: {
      user: { connect: { id: userId } },
      product: { connect: { product_id: Number(productId) } },
    },
  });
  return viewProduct;
}

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
      <section className="pt-5 sm:pt-[50px] pb-5 sm:pb-[43px]">
        {user.id && (
          <div className="container">
            <CustomerReviews
              reviews={productData?.reviews}
              user_id={user.id}
              product_id={id}
            />
          </div>
        )}
      </section>
      <div className="container">
        <div className="pb-5 sm:pb-[46px] sm:pt-[50px]">
          {productData?.reviews &&
            productData?.reviews?.map((review, index) => {
              return (
                <div key={index} className="border p-5 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[13px]">
                      <div className="bg-clip-border overflow-hidden rounded-full flex w-[37px]">
                        <Image
                          height={50}
                          width={50}
                          src="/assets/images/avatar.jpg"
                          size="sm"
                          className="h-[37px] w-full"
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
                        on {moment(review?.createdAt?.toString())?.fromNow()}
                      </div>
                    </div>
                  </div>
                  <p className="text-secondary-100 leading-6 text-sm mt-[6px]">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-[15px] mt-[15px]">
                    {review?.images?.length > 0 &&
                      review?.images.map((imageItem, index) => {
                        return (
                          <Image
                            key={index}
                            src={imageItem?.path}
                            width={100}
                            height={100}
                            alt=""
                            className="w-[85px] h-[81px] border border-blueGray-400"
                          />
                        );
                      })}
                  </div>
                  {review?.replay && review.replay != "" && (
                    <div className="border rounded-sm ml-[30px] bg-[#FFFCF5] py-[7px] px-2.5">
                      <span className="block text-primary-200 text-sm">
                        Seller response
                      </span>
                      <div className="text-secondary-100 text-sm">
                        {review.replay}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <RelatedProduct product={productData} />
    </>
  );
}
