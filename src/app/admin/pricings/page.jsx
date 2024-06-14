import React from "react";
import PricingForm from "./components/PricingForm";
import prisma from "@/lib/prisma";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const currentDay = currentDate.getDate().toString().padStart(2, "0");

const getPricings = () => {
  return prisma.pricingHistory.findMany({
    // where: {
    //   date: `${currentYear}-${currentMonth}-${currentDay}`,
    // },
  });
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
