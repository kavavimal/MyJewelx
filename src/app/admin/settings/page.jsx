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

  const promotional = await getPromotional();
  return <Settings homeslider={homeslider} promotional={promotional} />;
};

export default settings;
