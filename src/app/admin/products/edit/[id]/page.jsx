import prisma from "@/lib/prisma";
import React from "react";
import ProductForm from "../../componets/ProductForm";
import { attributeIDs } from "@/utils/constants";

export const getCategories = async (id = null) => {
  return await prisma.category.findMany({});
};

const getTags = () => {
  return prisma.tag.findMany({});
};

const getAttributes = () => {
  return prisma.attribute.findMany({
    include: {
      values: true,
    },
  });
};

const getCountries = () =>
  prisma.country.findMany({
    include: {
      states: true,
    },
  });

const getGenders = () => prisma.gender.findMany();
const getPatterns = () => prisma.pattern.findMany();
const getCollections = () => prisma.collection.findMany();
const getGoldKarat = () =>
  prisma.attributeValue.findMany({
    where: {
      attribute_id: 10,
    },
  });

const getAsianSize = () => {
  return prisma.attributeValue.findMany({
    where: {
      attribute_id: attributeIDs.SIZE_ASIAN,
    },
  });
};

const getUsSize = () => {
  return prisma.attributeValue.findMany({
    where: {
      attribute_id: attributeIDs.SIZE_US,
    },
  });
};

const getProduct = (id) => {
  return prisma.product.findFirst({
    where: { product_id: Number(id) },
    include: {
      ProductAttributeValue: true,
      attributes: true,
      variations: true,
      genders: true,
      category: true,
      tags: true,
      collections: true,
      patterns: true,
      states: true,
    },
  });
};

const page = async ({ params: { id } }) => {
  const categories = await getCategories();
  const tags = await getTags();
  const attributes = await getAttributes();
  const countries = await getCountries();
  const genders = await getGenders();
  const patterns = await getPatterns();
  const collections = await getCollections();
  const product = await getProduct(id);
  const karats = await getGoldKarat();
  const asianSizes = await getAsianSize();
  const usSizes = await getUsSize();

  return (
    <ProductForm
      product={product}
      categories={categories}
      tags={tags}
      productAttributes={attributes}
      countries={countries}
      genders={genders}
      patterns={patterns}
      collections={collections}
      karats={karats}
      asian={asianSizes}
      usSize={usSizes}
    />
  );
};

export default page;
