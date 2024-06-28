"use client";
import StarRatings from "@/components/frontend/StarRatings";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Detail = ({ product }) => {
  const [variation, setVariation] = useState(product?.variations[0]);
  const [mainImage, setMainImage] = useState(variation?.image[0].path);
  const [makingC, setMakingC] = useState();
  const [quantity, setQuantity] = useState(1);
  const sizes = [];
  product.ProductAttributeValue.forEach((pav) => {
    if (pav.attribute.name === "Size") {
      sizes.push(pav.attributeValue.name);
    }
  });

  let newarr = [];
  // product.variations.map((variation) => {
  //   variation.productAttributeValues.map((productAttributeValue) => {
  //     if (
  //       productAttributeValue &&
  //       productAttributeValue.productAttributeValue
  //     ) {
  //       const attributeValueId =
  //         productAttributeValue.productAttributeValue.attributeValue_id;
  //       const attributeId =
  //         productAttributeValue.productAttributeValue.attribute_id;
  //       let attributObjcetItem = {
  //         productAttributeValue_id:
  //           productAttributeValue.productAttributeValue
  //             .productAttributeValue_id,
  //         attribute_id: attributeId,
  //         attribute_name:
  //           productAttributeValue.productAttributeValue.attribute.name,
  //         attributeValue_id: attributeValueId,
  //         attributeValue_name:
  //           productAttributeValue.productAttributeValue.attributeValue.name,
  //       };
  //       // check if attribute is already in newarr
  //       if (typeof newarr[attributeId] !== "undefined") {
  //         let existing = newarr[attributeId];
  //         // check if new attribuete has value already?
  //         if (
  //           !existing.find((e_a) => e_a.attributeValue_id === attributeValue_id)
  //         ) {
  //           newarr[attributeId] = [...newarr[attributeId], attributObjcetItem];
  //         }
  //       } else {
  //         newarr[attributeId] = [attributObjcetItem];
  //       }
  //     }
  //   });
  // });

  console.log("newarr", newarr);
  // Check if product and product.variations exist and are arrays
  // const allProductAttributeValuesWithVariation = [];
  // const uniqueValuesSet = new Set();

  // if (product && Array.isArray(product.variations)) {
  //   product.variations.map((variation) => {
  //     if (variation && Array.isArray(variation.productAttributeValues)) {
  //       variation.productAttributeValues.map((productAttributeValue) => {
  //         if (
  //           productAttributeValue &&
  //           productAttributeValue.productAttributeValue
  //         ) {
  //           const attributeValueId =
  //             productAttributeValue.productAttributeValue.attributeValue_id;
  //           const attributeId =
  //             productAttributeValue.productAttributeValue.attribute_id;
  //           const uniqueKey = `${attributeId}-${attributeValueId}`;

  //           // Check if the combination of attribute_id and attributeValue_id already exists in the set
  //           if (!uniqueValuesSet.has(uniqueKey)) {
  //             uniqueValuesSet.add(uniqueKey);
  //             allProductAttributeValuesWithVariation.push({
  //               productAttributeValue_id:
  //                 productAttributeValue.productAttributeValue.productAttributeValue_id,
  //               attribute_id: attributeId,
  //               attribute_name:
  //                 productAttributeValue.productAttributeValue.attribute.name,
  //               attributeValue_id: attributeValueId,
  //               attributeValue_name:
  //                 productAttributeValue.productAttributeValue.attributeValue
  //                   .name,
  //             });
  //           }
  //         }
  //       });
  //     }
  //   });
  // } else {
  //   console.log("product or product.variations is not defined or not an array");
  // }

  // console.log(
  //   "allProductAttributeValuesWithVariation",
  //   allProductAttributeValuesWithVariation
  // );

  // const attributeValuePairs = [
  //   { attribute_id: 1, attributeValue_id: 1 },
  //   // { attribute_id: 1, attributeValue_id: 2 },
  //   // { attribute_id: 1, attributeValue_id: 3 },
  //   { attribute_id: 2, attributeValue_id: 4 },
  //   // { attribute_id: 2, attributeValue_id: 5 },
  //   // { attribute_id: 2, attributeValue_id: 6 },
  //   // { attribute_id: 2, attributeValue_id: 7 },
  // ];
  // const attribute_and_value_change = (attributeValuePairs) => {
  //   let productAttributeValue_ids = [];
  //   // product.ProductAttributeValue.map((record) => {
  //   //   if (
  //   //     record.attribute_id === attribute_id &&
  //   //     record.attributeValue_id === attributeValue_id
  //   //   ) {
  //   //     productAttributeValue_ids.push(record.productAttributeValue_id);
  //   //   }
  //   // });
  //   const productAttributeValueIdsArray = attributeValuePairs.map(
  //     ({ attribute_id, attributeValue_id }) => {
  //       return product.ProductAttributeValue.filter((record) => {
  //         return (
  //           record.attribute_id === attribute_id &&
  //           record.attributeValue_id === attributeValue_id
  //         );
  //       }).map((record) => record.productAttributeValue_id);
  //     }
  //   );

  //   const selectedVariation = product.variations.find((variation) => {
  //     const found = variation.ProductAttributeValues.find(
  //       (ProductAttributeValue) => {
  //         return productAttributeValue_ids.includes(
  //           ProductAttributeValue.productAttributeValue_id
  //         );
  //       }
  //     );
  //     if (variation.ProductAttributeValues.length === found.length) {
  //       return true;
  //     } else return false;
  //   });
  //   return selectedVariation;
  // };

  const settings = {
    // dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  const making_charges = variation?.making_charges
    ? JSON.parse(variation.making_charges)
    : null;
  const other_charges = variation?.other_charges
    ? JSON.parse(variation.other_charges)
    : null;
  let other_charges_total = 0;
  useEffect(() => {
    if (making_charges) {
      if (making_charges.charge_type === "perPiece/Flat") {
        setMakingC(making_charges.metalPrice);
      } else if (making_charges.charge_type === "Per Gram On Net Weight") {
        let metalPrice = variation.net_weight * making_charges.value;
        metalPrice = metalPrice.toFixed(2);
        setMakingC(metalPrice);
      } else if (
        making_charges.charge_type === "Per(%) On Metal Rate On Karat"
      ) {
        let metalPrice =
          ((variation.selling_price
            ? variation.selling_price
            : variation.regular_price) *
            making_charges.value) /
          100;
        metalPrice = metalPrice.toFixed(2);
        setMakingC(metalPrice);
      }
    }
  }, [making_charges, variation]);

  other_charges?.map((charges) => {
    other_charges_total = other_charges_total + Number(charges.value);
  });

  const variation_price = variation?.selling_price
    ? variation?.selling_price
    : variation?.regular_price;
  const variation_vat =
    (variation_price * quantity * (variation?.vat ? variation_vat : 0)) / 100;
  const total_amount = (
    variation_price +
    variation_vat +
    (makingC ? Number(makingC) : 0) +
    other_charges_total
  ).toFixed(2);

  const addToCart = () => {
    const cartItemData = new FormData();

    cartItemData.append("variation_id", variation.variation_id);
    cartItemData.append("quantity", quantity);
    cartItemData.append("discount", 0);
    cartItemData.append("discount_type", "fixedAmount");

    fetch("/api/cartItem", {
      method: "POST",
      body: cartItemData,
    }).then(async (res) => {
      if (res.status === 201) {
        console.log("res", res.message);
      } else {
        const { error, issues } = await res.json();
        console.error("send Otp Failed", error);
        // toast.error(error);
      }
    });
  };

  const incrementValue = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementValue = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container py-24 mx-auto max-w-screen-xl">
          <div class="mx-auto flex flex-wrap">
            <div className="lg:w-1/2 flex gap-1">
              <div className="w-1/4 slider-container">
                <Slider {...settings}>
                  {variation?.image &&
                    variation?.image.length > 0 &&
                    variation?.image?.map((image, index) => {
                      return (
                        <Image
                          className="border-1 shadow"
                          key={index}
                          src={image.path}
                          onClick={() => setMainImage(image.path)}
                          alt="Gallery Image"
                          width="125"
                          height="125"
                        />
                      );
                    })}
                  {variation?.image &&
                    variation?.image.length > 0 &&
                    variation?.image?.map((image, index) => {
                      return (
                        <Image
                          key={index}
                          src={image.path}
                          onClick={() => setMainImage(image.path)}
                          alt="Gallery Image"
                          width="125"
                          height="125"
                        />
                      );
                    })}
                </Slider>
                {/* {variation.image.map((image, index) => {
                  return (
                    <>
                      <Image
                        key={index}
                        src={image.path}
                        onClick={() => setMainImage(image.path)}
                        alt="Gallery Image"
                        width="125"
                        height="125"
                      />{" "}
                      <Image
                        key={index}
                        src={image.path}
                        onClick={() => setMainImage(image.path)}
                        alt="Gallery Image"
                        width="125"
                        height="125"
                      />{" "}
                      <Image
                        key={index}
                        src={image.path}
                        onClick={() => setMainImage(image.path)}
                        alt="Gallery Image"
                        width="125"
                        height="125"
                      />{" "}
                      <Image
                        key={index}
                        src={image.path}
                        onClick={() => setMainImage(image.path)}
                        alt="Gallery Image"
                        width="125"
                        height="125"
                      />{" "}
                    </>
                  );
                })} */}
              </div>
              <img
                alt="ecommerce"
                class="lg:w-2/3 w-full lg:h-96 h-64 object-cover object-center rounded border-1 shadow"
                src={mainImage}
              />
            </div>
            <div class="lg:w-1/2 w-full px-5 py-6 mt-6 lg:mt-0 border-1 shadow">
              {/* <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                The Catcher in the Rye
              </h1>
              <div class="flex items-center">
                <StarRatings
                  starRatings={
                    variation?.starRatings ? variation?.starRatings : 4.5
                  }
                />
                <span class="text-gray-600 ml-3">4 Reviews</span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="mb-1">
                Seller : {product.user.firstName + " " + product.user.lastName}
              </p>
              <p className="mb-1">
                <span>AED </span>
                {variation?.selling_price
                  ? variation?.selling_price
                  : variation?.regular_price}
              </p>
              <p class="leading-relaxed border-b-2 border-gray-100 pb-3">
                <div
                  dangerouslySetInnerHTML={{ __html: variation?.description }}
                ></div>
              </p>
              <div class="leading-relaxed border-b-2 border-gray-100 py-3">
                <p class="leading-relaxed pb-3">
                  Making Charges :<span> AED </span>
                  {makingC ? makingC : 0}
                </p>
                <p class="leading-relaxed pb-3">
                  Other Charges :<span> AED </span>
                  {other_charges_total}
                </p>
                <p class="leading-relaxed pb-3">
                  Value Added Tax :{variation?.vat ? variation?.vat : 0}
                  <span>&#37;</span>
                </p>
                <p class="leading-relaxed">
                  <span> AED </span>
                  Total Amount :{total_amount}
                </p>
              </div>
              <div class="flex mt-6 items-center border-b-1 border-gray-100">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                {sizes.length > 0 && (
                  <div class="flex ml-6 items-center">
                    <span class="mr-3">Size</span>
                    <div class="relative">
                      <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10">
                        {sizes?.map((size, index) => (
                          <option key={index}>{size}</option>
                        ))}
                      </select>
                      <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center my-4">
                <button
                  type="button"
                  className="bg-gray-200 font-bold h-7 w-7 flex items-center justify-center"
                  onClick={decrementValue}
                >
                  -
                </button>
                <input
                  type="number"
                  step="1"
                  value={quantity}
                  name="quantity"
                  className="border border-gray-300 text-center h-7 w-20"
                  readOnly
                />
                <button
                  type="button"
                  className="bg-gray-200 font-bold h-7 w-7 flex items-center justify-center"
                  onClick={incrementValue}
                >
                  +
                </button>
              </div>
              <div class="flex justify-between text-xs">
                <button
                  class="text-black weight-700 bg-[#F0AE11] border-0 py-2 flex-1 px-3 mr-2 focus:outline-none hover:bg-yellow-600 rounded"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button class="text-[#F0AE11] bg-white border py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 rounded">
                  Add to Whish list
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="m-2">
        <h1>This is Detail page</h1>
        <div className="flex space-between">
          <div className="w-full">
            <div className="">
              <Image
                src={mainImage}
                alt="image for design"
                width="600"
                height="600"
              />
            </div>
            <div>
              {variation.image.map((image, index) => {
                return (
                  <>
                    <Image
                      key={index}
                      src={image.path}
                      onClick={() => setMainImage(image.path)}
                      alt="Gallery Image"
                      width="200"
                      height="200"
                    />{" "}
                  </>
                );
              })}
            </div>
          </div>
          <div className="w-full border rounded p-2">
            <h2>{variation.variation_name}</h2>
            <StarRatings
              starRatings={variation.starRatings ? variation.starRatings : 3.50}
            />
            <p>
              {" "}
              &#36;{variation.selling_price}{" "}
              <span className="line-through	">
                {" "}
                &#36;{variation.regular_price}
              </span>
            </p>
            <p>{variation.description}</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Detail;
