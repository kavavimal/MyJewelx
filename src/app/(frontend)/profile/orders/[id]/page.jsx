import React from "react";
import OrderDetails from "./components/OrderDetails";

export const revalidate = 0;

const page = async ({ params: { id } }) => {
  return <OrderDetails id={id} />;
};

export default page;
