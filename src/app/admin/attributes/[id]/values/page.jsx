import React from "react";
import ValueForm from "./components/ValueForm";
import prisma from "@/lib/prisma";

const getValues = (id) =>
  prisma.attributeValue.findMany({
    where: { attribute_id: Number(id) },
  });

const page = async ({ params: { id } }) => {
  const attribute_values = await getValues(id);
  return (
    <ValueForm attribute_values={attribute_values} attribute_id={Number(id)} />
  );
};

export default page;
