import prisma from "@/lib/prisma";
import UpdateStatus from "./UpdateStatus";
import Pod from "./components/Pod";
export const revalidate = 0;

const getProducts = () =>
  prisma.productOnDemand.findMany({
    include: {
      Images: true,
      user: true,
    },
  });

const products = async () => {
  const response = await getProducts();
  return <Pod podr={response} />;
};

export default products;
