"use client";
import StarRatings from "@/components/frontend/StarRatings";
import { useState } from "react";
import AddToCart from "@/components/frontend/cart/AddToCart";
import ProductImages from "./ProductImages";
import Paragraph from "@/components/Paragraph";
import Share from "./Share";
import ProductMeta from "./ProductMeta";
import { printPrice, truncate } from "@/utils/helper";
import ProductAttributeSelections from "./ProductAttributeSelections";
import AddToWishlist from "@/components/frontend/cart/AddToWishlist";
import ProductLikes from "@/components/frontend/ProductLikes";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

const Detail = ({
  product,
  selectedOptions,
  filteredAttributes,
  avgRating,
}) => {
  const [variation, setVariation] = useState(product?.variations[0]);
  const [isReadMore, setIsReadMore] = useState(false);
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
      <section className="body-font overflow-hidden">
        <div className="container mx-auto">
          <div className="border-b border-primary-200 py-[20px] mb-[30px]">
            <Breadcrumbs
              items={[
                { link: "/product", label: "Product" },
                {
                  link: `/product/${product?.product_id}`,
                  label: product?.product_name,
                  current: true,
                },
              ]}
            />
          </div>
          <div className="mx-auto flex justify-center items-start gap-[50px]">
            <ProductImages variation={variation} />
            <div className="lg:w-1/2 w-full">
              <div className="p-5 px-4 pt-7 pb-[15px] lg:mt-0 border border-blueGray-300 rounded-sm">
                <div className="flex justify-between items-center pb-2.5 border-b border-b-blueGray-300">
                  <div className="flex items-center gap-2.5">
                    <div>
                      <Image
                        src="/assets/images/Mark.svg"
                        width={30}
                        height={30}
                        alt="Mark"
                      />
                    </div>
                    <h4 className="text-black text-xl">
                      Malabar Golds and Diamonds
                    </h4>
                  </div>
                  <div className="w-[55px] h-[55px] bg-clip-border overflow-hidden rounded-sm">
                    <Image
                      src="/assets/images/brand.png"
                      height={100}
                      width={100}
                      alt="brand"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h1 className="text-gray-900 text-3xl title-font font-medium mt-2.5 leading-[40px]">
                  {product.product_name}
                </h1>
                <div className="flex items-center">
                  <StarRatings starRatings={avgRating ? avgRating : 0} />
                  <p className="ml-3 leading-5 text-sm">
                    {product?.reviews?.length} Customer Reviews
                  </p>

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
                <div className="mb-3.5">
                  <ProductMeta product={product} />
                </div>

                <div className="w-1/2 mb-1 flex ">
                  <strong className="md:w-1/2 text-lg font-medium">
                    {printPrice(
                      variation?.selling_price
                        ? variation?.selling_price
                        : variation?.regular_price
                    )}
                  </strong>
                  <p className="md:w-1/2 ps-5 border-l text-base text-secondary-100">
                    {variation?.net_weight} gram
                  </p>
                </div>

                <div className="product__description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isReadMore
                        ? variation?.description
                        : truncate(variation?.description, 300),
                    }}
                  />
                  {variation?.description?.length > 300 && (
                    <div>
                      <button
                        className="font-medium text-base"
                        onClick={() => setIsReadMore(!isReadMore)}
                      >
                        {isReadMore ? "Less..." : "Read More..."}
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-b border-b-blueGray-300 py-3">
                  <ProductAttributeSelections
                    product={product}
                    setVariation={setVariation}
                    variation={variation}
                    selectedOptions={selectedOptions}
                    filteredAttributes={filteredAttributes}
                  />
                </div>

                <div className="pb-3 border-b border-b-blueGray-300 pt-2.5">
                  {/* <p className="leading-relaxed pb-3">
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
                  </p> */}
                  <table className="w-1/2">
                    <thead>
                      <tr>
                        <th className="text-left font-medium text-base text-black py-1">
                          Cost Type
                        </th>
                        <th className="text-right font-medium text-base text-black py-1">
                          Amount AED
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Metal Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          5,000.00
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Making Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          {printPrice(
                            variation.making_charges
                              ? variation.making_charges?.value
                              : 0
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Other Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          {printPrice(gemstone_total)}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Add Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          {printPrice(other_charges_total)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Discount <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          -60.00
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Shipping Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          - 50.90
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          Sub Total <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          5,470.00
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base py-1">
                          VAT 5% <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base py-1">
                          {vat ? vat?.value : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="text-left text-black font-medium text-base py-1">
                          Total <span>:</span>
                        </td>
                        <td className="text-right text-black font-medium text-base py-1">
                          {printPrice(
                            variation?.selling_price
                              ? variation?.selling_price
                              : variation?.regular_price
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-base font-light text-secondary-100 mb-3 mt-2.5">
                  Seller :{" "}
                  {product.user.firstName + " " + product.user.lastName}
                </p>

                <div className="flex justify-between items-center text-xs gap-[15px]">
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
