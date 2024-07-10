import Paragraph from "@/components/Paragraph";
import { attributeIDs } from "@/utils/constants";
import React from "react";

export default function ProductMeta({ product }) {
  const material = product.ProductAttributeValue.find(
    (attribute) => attribute.attribute_id === attributeIDs.MATERIAL
  );
  const gender = product?.genders?.map((gi) => gi.gender.name).join(",");
  return (
    <span className="flex space-x-2">
      <Paragraph>Material: {material.attributeValue.name}</Paragraph>
      {gender !== "" && (
        <Paragraph classes="border-l pl-2">Gender: {gender}</Paragraph>
      )}
      {product?.country.name !== "" && (
        <Paragraph classes="border-l pl-2">
          Made in: {product?.country.name}
        </Paragraph>
      )}
    </span>
  );
}
