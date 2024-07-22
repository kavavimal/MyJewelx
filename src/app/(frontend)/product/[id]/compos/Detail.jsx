"use client";
import StarRatings from "@/components/frontend/StarRatings";
import { useState } from "react";
import AddToCart from "@/components/frontend/cart/AddToCart";
import ProductImages from "./ProductImages";
import Paragraph from "@/components/Paragraph";
import Share from "./Share";
import ProductMeta from "./ProductMeta";
import { printPrice } from "@/utils/helper";
import ProductAttributeSelections from "./ProductAttributeSelections";
import AddToWishlist from "@/components/frontend/cart/AddToWishlist";
import ProductLikes from "@/components/frontend/ProductLikes";

const Detail = ({
  product,
  selectedOptions,
  filteredAttributes,
  avgRating,
}) => {
  const [variation, setVariation] = useState(product?.variations[0]);
  const sizes = [];
  product.ProductAttributeValue.forEach((pav) => {
    if (pav.attribute.name === "Size") {
      sizes.push(pav.attributeValue.name);
    }
  });

  const other_charges = variation?.other_charges
    ? JSON.parse(variation.other_charges)
    : null;
  let other_charges_total = other_charges
    .filter((a) => a.charge_type === "additional")
    .reduce((total, charges) => total + Number(charges.value), 0);
  let gemstone_total = other_charges
    .filter((a) => a.charge_type === "gemstone")
    .reduce((total, charges) => total + Number(charges.value), 0);

  const vat = other_charges.find((a) => a.charge_type === "vat/tax");

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container py-24 mx-auto max-w-screen-xl">
          <div className="mx-auto flex flex-wrap justify-between">
            <ProductImages variation={variation} />
            <div className="lg:w-1/2 w-full pl-5">
              <div className="p-5 mt-6 lg:mt-0 border">
                {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.product_name}
                </h1>
                <div className="flex items-center">
                  <StarRatings starRatings={avgRating ? avgRating : 0} />
                  <Paragraph color="gray-600" classes="ml-3">
                    {product?.reviews?.length} Customer Reviews
                  </Paragraph>

                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <Paragraph classes="flex" color="gray-600">
                      <ProductLikes
                        product_id={product.product_id}
                        showCount
                        count={
                          product.likes && product.likes.length
                            ? product.likes.length
                            : "0"
                        }
                      />
                    </Paragraph>
                  </span>
                </div>
                <ProductMeta product={product} />

                <div className="w-1/2 mb-1 flex">
                  <strong className="md:w-1/2">
                    {printPrice(
                      variation?.selling_price
                        ? variation?.selling_price
                        : variation?.regular_price
                    )}
                  </strong>
                  <Paragraph classes="md:w-1/2 text-right  border-l">
                    {variation?.net_weight} gram
                  </Paragraph>
                </div>

                <div
                  className="leading-relaxed border-b-2 border-gray-100 pb-3"
                  dangerouslySetInnerHTML={{ __html: variation?.description }}
                ></div>
                <div className="leading-relaxed border-b-2 border-gray-100 pb-3">
                  <ProductAttributeSelections
                    product={product}
                    setVariation={setVariation}
                    variation={variation}
                    selectedOptions={selectedOptions}
                    filteredAttributes={filteredAttributes}
                  />
                </div>

                <div className="leading-relaxed border-b-2 border-gray-100 py-3">
                  <p className="leading-relaxed pb-3">
                    {console.log(variation?.making_charges)}
                    Making Charges :{" "}
                    {printPrice(
                      variation.making_charges
                        ? variation.making_charges?.value
                        : 0
                    )}
                  </p>
                  <p className="leading-relaxed pb-3">
                    Gemstone Charges : {printPrice(gemstone_total)}
                  </p>
                  <p className="leading-relaxed pb-3">
                    Other Charges : {printPrice(other_charges_total)}
                  </p>
                  <p className="leading-relaxed pb-3">
                    Value Added Tax : {vat ? vat?.value : 0}
                    <span>&#37;</span>
                  </p>
                  <p className="leading-relaxed">
                    Total Amount :{" "}
                    {printPrice(
                      variation?.selling_price
                        ? variation?.selling_price
                        : variation?.regular_price
                    )}
                  </p>
                </div>
                <Paragraph>
                  Seller :{" "}
                  {product.user.firstName + " " + product.user.lastName}
                </Paragraph>

                <div className="flex justify-between text-xs">
                  <AddToCart variation={variation} />

                  <AddToWishlist product_id={product.product_id} />
                </div>
                <Share />
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
