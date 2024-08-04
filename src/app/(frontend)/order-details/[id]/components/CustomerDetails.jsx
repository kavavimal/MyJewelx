"use client";
import { printFormatPrice } from "@/utils/helper";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CustomerDetails = ({ total, user }) => {
  const router = useRouter();
  return (
    <>
      <div className="border border-blueGray-300 py-[15px] px-5 mb-5">
        <div className="flex flex-col gap-[15px] border-b pb-[15px] border-blueGray-300">
          <h4 className="text-xl text-blueGray-500">Customer Details</h4>
          <div>
            <div className="flex items-center gap-[15px]">
              <div>
                <Image
                  src={"/assets/images/avatar.jpg"}
                  height={100}
                  width={100}
                  className="rounded-full w-[50px] h-[50px] object-cover"
                  alt=""
                />
              </div>
              <div>
                <span className="block text-secondary-100 text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block text-secondary-100 text-sm">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-blueGray-500 py-2.5 text-xl border-b border-blueGray-300">
            Order Details
          </h4>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-medium text-base text-black py-2.5">
                  Cost Type
                </th>
                <th className="text-right font-medium text-base text-black py-2.5">
                  Amount AED
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-blueGray-300">
              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  Price ( 2 Product )
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  12,000.00
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  VAT 5%
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  600.00
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  Sub Total
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  12,600.00
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="text-left text-black font-medium text-base pt-2.5">
                  Grand Total
                </td>
                <td className="text-right text-black font-medium text-base pt-2.5">
                  {printFormatPrice(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Button fullWidth variant="outlined" onClick={() => router.push("/")}>
        Back To Home
      </Button>
    </>
  );
};

export default CustomerDetails;
