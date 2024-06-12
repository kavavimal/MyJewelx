import React from "react";
import GemstoneForm from "./components/GemstoneForm";
import prisma from "@/lib/prisma";

const getGemstones = () => {
  return prisma.gemstone.findMany();
};

const page = async () => {
  const gemstones = await getGemstones();
  return <GemstoneForm gemstones={gemstones} />;
};

export default page;
