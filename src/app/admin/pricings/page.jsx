import React from "react";
import PricingForm from "./components/PricingForm";
import prisma from "@/lib/prisma";

const getPricings = () => {
  return prisma.pricingHistory.findMany({});
};

const getPricing = () => {
  return prisma.pricingHistory.findFirst({
    orderBy: {
      created_at: "desc",
    },
  });
};

const page = async () => {
  const pricings = await getPricings();
  const pricing = await getPricing();
  return <PricingForm pricings={pricings} pricing={pricing} />;
};

export default page;
