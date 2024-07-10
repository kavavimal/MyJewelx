import prisma from "@/lib/prisma";
import Detail from "./compos/Detail";
import { ATTRIBUTE_ORDER } from "@/utils/constants";

async function get_productBy_id(id) {
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
      reviews: true,
      country: true,
      genders: {
        include: {
          gender: true,
        },
      },
      ProductAttributeValue: {
        include: { attribute: true, attributeValue: true },
      },
    },
  });

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
  };
}

export default async function ProductDetails({ params: { id } }) {
  const productData = await get_productBy_id(id);
  return (
    <Detail
      product={productData.product}
      selectedOptions={productData?.selectedOptions}
      filteredAttributes={productData?.filteredAttributes}
    />
  );
}
