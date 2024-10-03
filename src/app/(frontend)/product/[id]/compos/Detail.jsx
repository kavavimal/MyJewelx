"use client";
import { useState } from "react";
import ProductImages from "./ProductImages";
import Share from "./Share";
import ProductMeta from "./ProductMeta";
import { printFormatPrice, printPrice, truncate } from "@/utils/helper";
import ProductAttributeSelections from "./ProductAttributeSelections";
import Image from "next/image";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ProductLikes from "@/app/components/ProductLikes";
import AddToWishlist from "@/app/(frontend)/components/AddToWishlist";
import Paragraph from "@/app/components/Paragraph";
import AddToCart from "@/app/(frontend)/components/AddToCart";
import StarRatings from "@/app/components/StarRatings";

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
  const discount = other_charges.find((a) => a.charge_type === "discount");
  const isDiscount = Boolean(variation?.isDiscount);
  const vat = other_charges.find((a) => a.charge_type === "vat/tax");

  const makingCharge = JSON.parse(variation.making_charges);
  const metalPrice = makingCharge?.metalPrice || 0;
  const makingChargeValue = makingCharge?.value || 0;
  const net_weight = Number(variation?.net_weight);
  const shipping_charge = Number(variation?.shipping_charge || 0);

  const getMetalCharge = () => {
    switch (makingCharge?.charge_type) {
      case "Per Gram On Net Weight":
        return (
          parseFloat(makingChargeValue || 0) * parseFloat(net_weight || 0) || 0
        );
      case "Per Piece / Flat":
        return parseFloat(makingChargeValue) || 0;
      case "Per(%) On Metal Rate On Karat":
        return (
          metalPrice *
            net_weight *
            ((parseFloat(makingChargeValue) || 0) / 100) || 0
        );
      default:
        return 0;
    }
  };

  const getDiscount = () => {
    if (isDiscount) {
      switch (discount?.name) {
        case "Per Gram On Net Weight":
          return (
            parseFloat(net_weight || 0) * parseFloat(discount?.value || 0) || 0
          );

        case "Per Piece / Flat":
          return parseFloat(discount?.value) || 0;

        case "Per(%) On Metal Rate On Karat":
          return (
            metalPrice *
              net_weight *
              ((parseFloat(discount?.value) || 0) / 100) || 0
          );

        default:
          return 0;
      }
    }
    return 0;
  };

  let subtotal = 0;

  if (variation.isPriceFixed) {
    subtotal =
      variation?.regular_price +
      getMetalCharge() +
      gemstone_total +
      other_charges_total -
      getDiscount() +
      shipping_charge;
  } else {
    subtotal =
      metalPrice * net_weight +
      getMetalCharge() +
      gemstone_total +
      other_charges_total -
      getDiscount() +
      shipping_charge;
  }
  return (
    <>
      <section className="body-font overflow-hidden">
        <div className="container mx-auto px-2">
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
          <div className="mx-auto flex flex-col sm:flex-col md:flex-row justify-center items-start gap-[30px] md:gap-[20px] xl:gap-[50px]">
            <ProductImages variation={variation} />
            <div className="md:w-1/2 w-full">
              <div className="p-0 sm:p-5 sm:px-4 sm:pt-7 sm:pb-[15px] lg:mt-0 border-0 sm:border border-blueGray-300 rounded-sm">
                <div className="flex sm:gap-0 gap-4 sm:flex-row flex-row-reverse justify-end sm:justify-between items-center pb-2.5 border-b border-b-blueGray-300">
                  <div className="flex items-center gap-2.5">
                    <div className="sm:block hidden">
                      <Image
                        src="/assets/images/Mark.svg"
                        width={30}
                        height={30}
                        alt="Mark"
                      />
                    </div>
                    <h4 className="text-black text-xl sm:text-lg md:text-lg lg:text-xl">
                      {product?.user?.vendor?.store_name}
                    </h4>
                  </div>
                  <div className="w-[55px] h-[55px] bg-clip-border overflow-hidden rounded-sm">
                    <Image
                      src={`${
                        product?.user?.image?.path ||
                        "/assets/images/logo-jewelry-store.png"
                      }`}
                      height={100}
                      width={100}
                      alt="brand"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h1 className="text-gray-900 text-3xl md:text-xl lg:text-2xl xl:text-3xl title-font font-medium mt-2.5 leading-[40px]">
                  {product.product_name}
                </h1>
                <div className="flex items-center">
                  <StarRatings starRatings={avgRating ? avgRating : 0} />
                  <p className="ml-3 leading-5 text-sm xl:text-sm sm:text-xs">
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
                        like={product.likes ? product.likes.length : ""}
                        isproductid
                      />
                    </Paragraph>
                  </span>
                </div>
                <div className="mb-3.5">
                  <ProductMeta product={product} />
                </div>

                <div className="w-1/2 mb-1 flex ">
                  <strong
                    className="md:w-1/2 pr-5 sm:text-sm 
                  md:text-base
                   xl:text-lg text-lg font-medium"
                  >
                    {printPrice(
                      variation?.selling_price
                        ? variation?.selling_price
                        : variation?.regular_price
                    )}
                  </strong>
                  <p className="md:w-1/2 ps-5 border-l text-base lg:text-base sm:text-sm text-secondary-100">
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
                        className="font-medium text-base lg:text-base sm:text-sm"
                        onClick={() => setIsReadMore(!isReadMore)}
                      >
                        {isReadMore ? "Less..." : "Read More..."}
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-b border-b-blueGray-300 py-3">
                  <ProductAttributeSelections
                    className="!gap-0 !flex-wrap"
                    product={product}
                    setVariation={setVariation}
                    variation={variation}
                    selectedOptions={selectedOptions}
                    filteredAttributes={filteredAttributes}
                  />
                </div>

                <div className="pb-3 border-b border-b-blueGray-300 pt-2.5">
                  <table className="w-3/4 sm:w-10/12 xl:w-1/2">
                    <thead>
                      <tr>
                        <th className="text-left font-medium text-base lg:text-base sm:text-sm text-black py-1">
                          Cost Type
                        </th>
                        <th className="text-right font-medium text-base lg:text-base sm:text-sm text-black py-1">
                          Amount AED
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variation.isPriceFixed ? (
                        <tr>
                          {" "}
                          <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                            Fixed Price <span>:</span>
                          </td>
                          <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                            {printFormatPrice(variation?.regular_price)}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                            Metal Amount <span>:</span>
                          </td>
                          <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                            {printFormatPrice(metalPrice * net_weight)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Metal Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(getMetalCharge())}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Other Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(gemstone_total)}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Add Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(other_charges_total)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Discount <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          -{isDiscount ? printFormatPrice(getDiscount()) : 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Shipping Charges <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(variation?.shipping_charge)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          Sub Total <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          VAT {vat?.tax > 0 ? "(5%)" : "(0)"} <span>:</span>
                        </td>
                        <td className="text-right text-secondary-100 font-light text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(vat?.tax || 0)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="text-left text-black font-medium text-base lg:text-base sm:text-sm py-1">
                          Total <span>:</span>
                        </td>
                        <td className="text-right text-black font-medium text-base lg:text-base sm:text-sm py-1">
                          {printFormatPrice(
                            variation?.selling_price
                              ? variation?.selling_price
                              : variation?.regular_price
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-base lg:text-base sm:text-sm font-light text-secondary-100 mb-3 mt-2.5">
                  Seller :{" "}
                  {product.user.firstName + " " + product.user.lastName}
                </p>

                <div className="flex justify-between items-center text-xs gap-[15px]">
                  <AddToCart variation={variation} />
                  <AddToWishlist product_id={product.product_id} />
                </div>
                <Share product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
