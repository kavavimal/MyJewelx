import React from "react";
import CollectionForm from "./components/CollectionForm";
import prisma from "@/lib/prisma";

const getCollections = () => prisma.collection.findMany();
const page = async () => {
  const collections = await getCollections();
  return <CollectionForm collections={collections} />;
};

export default page;
