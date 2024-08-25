import React from "react";
import StatesForm from "./components/StatesForm";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getState = async (id) => {
  return prisma.state.findMany({
    where: {
      country_id: Number(id),
    },
  });
};

const page = async ({ params: { id } }) => {
  const states = await getState(id);
  return <StatesForm id={id} states={states} />;
};

export default page;
