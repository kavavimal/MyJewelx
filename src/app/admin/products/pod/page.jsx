import prisma from "@/lib/prisma";
import UpdateStatus from "./UpdateStatus";

export const revalidate = 0;

const getProducts = () => prisma.productOnDemand.findMany({
  include: {
    Images: true,
    user: true,
  },
});

const products = async () => {
  const response = await getProducts();
  return (
    <div>
      <div className="flex justify-between items-center btn btn-primary mb-10">
        <h2 className="text-2xl font-semibold ">Products On Demand Requests</h2>
       
      </div>
      {response?.length > 0 ? (
        <div>
          {response.map((podItem) => {
            return <div key={podItem.id} className="border p-2 flex items-center justify-between">
              <div>{podItem.name} </div><UpdateStatus id={podItem.id} status={podItem.Status} isAdmin />
            </div>
          })}
        </div>
      ) : (<div>No Request Found</div>)}
    </div>
  );
};

export default products;
