"use client";
import { printFormatPrice } from "@/utils/helper";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CustomerDetails = ({ total, user, order }) => {
  let subTotal = order.orderItems.reduce((acc, item) => acc + item.price, 0);
  let vat = 0;
  let shipping = 0;
  let discountTotal = 0;

  order.orderItems.forEach((item) => {
    const variation = JSON.parse(item.variationData);
    const other_charges = JSON.parse(variation.other_charges);
    const vatTax = other_charges.find((a) => a.charge_type === "vat/tax");
    const discount = other_charges.find((a) => a.charge_type === "discount");

    if (vatTax) {
      vat += Number(vatTax?.tax || 0) * Number(item.quantity || 0);
    }

    if (variation.shipping_charge) {
      shipping += Number(variation.shipping_charge || 0);
      //  * Number(item.quantity || 0);
    }

    if (discount) {
      discountTotal +=
        Number(discount?.discount || 0) * Number(item.quantity || 0);
    }
  });

  subTotal = subTotal - vat - shipping + discountTotal;
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
                  Price ({order.orderItems.length} Product)
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  {printFormatPrice(subTotal)}
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  Discount
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  -{printFormatPrice(discountTotal)}
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  Shipping Charge
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  {printFormatPrice(shipping)}
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  Sub Total
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  {printFormatPrice(subTotal + shipping - discountTotal)}
                </td>
              </tr>

              <tr>
                <td className="text-left text-secondary-100 font-light text-base pb-2.5">
                  VAT 5%
                </td>
                <td className="text-right text-secondary-100 font-light text-base pb-2.5">
                  {printFormatPrice(vat)}
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
      <Button
        className="sm:block hidden hover:bg-primary-200 hover:text-white"
        fullWidth
        variant="outlined"
        onClick={() => router.push("/")}
      >
        Back To Home
      </Button>
    </>
  );
};

export default CustomerDetails;
