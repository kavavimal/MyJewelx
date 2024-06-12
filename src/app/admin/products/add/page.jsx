import React from "react";
import dynamic from "next/dynamic";
import ProductForm from "../componets/ProductForm";
import prisma from "@/lib/prisma";
import { attributeIDs } from "@/utils/constants";

const getCategories = async () => {
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

const page = async () => {
  const categories = await getCategories();
  const tags = await getTags();
  const attributes = await getAttributes();
  const countries = await getCountries();
  const genders = await getGenders();
  const patterns = await getPatterns();
  const collections = await getCollections();
  const karats = await getGoldKarat();
  const asianSizes = await getAsianSize();
  const usSizes = await getUsSize();

  return (
    <ProductForm
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
