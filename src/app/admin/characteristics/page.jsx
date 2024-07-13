import React from "react";
import CharacteristicsForm from "./components/CharacteristicsForm";
import prisma from "@/lib/prisma";
import { CharsType } from "@prisma/client";

const getCharacteristics = () => {
  return prisma.characteristic.findMany();
};

const getCharTypes = () => {
  return CharsType;
};

const page = async () => {
  const characteristics = await getCharacteristics();
  const charTypes = await getCharTypes();
  return (
    <CharacteristicsForm
      characteristics={characteristics}
      charTypes={charTypes}
    />
  );
};

export default page;
