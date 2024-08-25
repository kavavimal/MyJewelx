import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SearchPODForm from "../components/SearchPODForm";
import UpdateStatus from "@/app/admin/products/pod/UpdateStatus";

export const revalidate = 0;

const getPODProducts = (user_id) =>
  prisma.productOnDemand.findMany({
    where: { userId: user_id },
  });

async function PODPage() {
  const user = getServerSession(authOptions);
  const products = await getPODProducts(user.id);
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <SearchPODForm />
        <Link href="/jewlex-on-demand/create">+ Add Product on Demand</Link>
      </div>
      <h3>My Requests</h3>
      {products.length > 0 ? (
        <div>
          {products.map((podItem) => {
            return (
              <div
                key={podItem.id}
                className="border p-2 flex items-start justify-between"
              >
                <div>
                  <h4>{podItem.name}</h4>
                  <p>{podItem.description}</p>
                </div>
                <UpdateStatus id={podItem.id} status={podItem.Status} />
              </div>
            );
          })}
        </div>
      ) : (
        <div> No Request found</div>
      )}
    </div>
  );
}

export default PODPage;
