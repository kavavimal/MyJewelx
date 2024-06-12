import React from "react";
import PricingForm from "./components/PricingForm";
import prisma from "@/lib/prisma";

const attributeValues = () => {
  return prisma.attributeValue.findMany();
};

const getPricings = () => {
  return prisma.attributeValuePricing.findMany();
};

const page = async () => {
  const attributes = await attributeValues();
  const pricings = await getPricings();
  return <PricingForm attributes={attributes} pricings={pricings} />;
};

export default page;
