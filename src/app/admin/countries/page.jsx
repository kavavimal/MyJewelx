import React from "react";
import CountryForm from "./components/CountryForm";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const getCountries = () => {
  return prisma.country.findMany();
};

const page = async () => {
  const countries = await getCountries();
  return <CountryForm countries={countries} />;
};

export default page;
