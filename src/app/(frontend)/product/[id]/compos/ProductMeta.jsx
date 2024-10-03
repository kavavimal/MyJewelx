import { attributeIDs } from "@/utils/constants";
import React from "react";

export default function ProductMeta({ product }) {
  const material = product.ProductAttributeValue.find(
    (attribute) => attribute.attribute_id === attributeIDs.MATERIAL
  );
  const gender = product?.genders?.map((gi) => gi.gender.name).join(",");
  return (
    <span className="flex">
      <p className="text-base leading-[20px] text-secondary-100 me-5">
        Material: {material.attributeValue.name}
      </p>
      {gender !== "" && (
        <p className="text-base leading-[20px] text-secondary-100 border-l pl-5 me-5">
          Gender: {gender}
        </p>
      )}
      {product?.country.name !== "" && (
        <p className="border-l pl-5 text-base leading-[20px] text-secondary-100 ">
          Made in: {product?.country.name}
        </p>
      )}
    </span>
  );
}
