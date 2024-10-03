import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SearchPODForm from "../components/SearchPODForm";
import { AcountType } from "@prisma/client";
import { redirect } from "next/navigation";
import Requests from "./components/Requests";
import { checkUserSession } from "@/app/actions/users";
export const revalidate = 0;
const getPODProducts = async (user_id) => {
  return prisma.productOnDemand.findMany({
    where: { userId: user_id },
    include: {
      Images: true,
    },
  });
};

async function PODPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const user = await checkUserSession();

  if (
    [AcountType.CUSTOMER, AcountType.VENDOR].includes(
      session.user?.role || session.role
    )
  ) {
    const products = await getPODProducts(user.id);
    return (
      <div className="container">
        <div className="flex items-center pt-5 justify-end">
          {/* <SearchPODForm /> */}
          <Link
            className="flex items-center gap-2 border border-red-100 hover:shadow-none hover:bg-transparent hover:text-red-100 align-middle select-none text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-[16px] font-normal py-2.5 px-11 rounded-sm bg-red-100 text-base text-white shadow-md shadow-gray-900/10  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none "
            href="/jewlex-on-demand/create"
          >
            + Add Product on Demand
          </Link>
        </div>
        <div className="mt-5">
          <Requests product={products} />
        </div>
      </div>
    );
  } else {
    return redirect("/login");
  }
}

export default PODPage;
