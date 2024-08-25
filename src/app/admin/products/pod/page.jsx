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
  return (
    <div>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Products On Demand Requests</h2>
      </div>
      <Pod podr={response} />
    </div>
  );
};

export default products;
