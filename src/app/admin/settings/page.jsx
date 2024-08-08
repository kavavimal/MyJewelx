import React from "react";
import Settings from "./components/Settings";
import prisma from "@/lib/prisma";

const getHomeSlider = () => {
  return prisma.homeSlider.findMany();
};

const getPromotional = () => {
  return prisma.promotional.findMany();
};

const settings = async () => {
  const homeslider = await getHomeSlider();
  // console.log(homeslider);

  const promotional = await getPromotional();
  console.log(promotional);
  return <Settings homeslider={homeslider} promotional={promotional} />;
};

export default settings;
