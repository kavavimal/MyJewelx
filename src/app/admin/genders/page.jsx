import React from "react";
import GenderForm from "./components/GenderForm";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getGenders = () => prisma.gender.findMany();
const genders = async () => {
  const genders = await getGenders();
  return <GenderForm genders={genders} />;
};

export default genders;
