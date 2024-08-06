import React from "react";
import OrderDetails from "./components/OrderDetails";

const page = async ({ params: { id } }) => {
  return <OrderDetails id={id} />;
};

export default page;
