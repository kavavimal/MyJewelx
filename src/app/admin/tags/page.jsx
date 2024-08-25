import React from "react";
import Tags from "./components/Tags";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getTags = () => {
  return prisma.tag.findMany();
};

const tags = async () => {
  const tags = await getTags();
  return <Tags tags={tags} />;
};

export default tags;
