"use client";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const OrderTable = ({ orders }) => {
  const columns = [
    {
      name: "orderId",
      selector: (row) => row.id,
      center: true,
      sort: true,
    },
    {
      name: "Order Items",
      cell: (row) => (
        <div className="flex gap-3 w-full justify-left items-center">
          {row.orderItems[0]?.productVariation?.image[0] && (
            <Image
              src={row.orderItems[0]?.productVariation?.image[0].path}
              alt="product image"
              width={50}
              height={50}
              className="w-full max-w-[50px] max-h-[50px] h-full object-cover"
            />
          )}
          {row.orderItems?.map((item, i) => (
            <div className="flex flex-col justify-left items-start" key={i}>
              <Link
                href={`/product/${
                  JSON.parse(item.variationData).product_id ?? "0"
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Order Total",
      cell: (row) => (
        <span>{row.orderItems.reduce((total, i) => total + i.price, 0)}</span>
      ),
      center: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      center: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <Link href={`/profile/orders/${row.id}`}>
          <Button
            variant="contained"
            // color="red"
            className="rounded-full items-center flex gap-2 py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 32 32"
            >
              <circle cx="22" cy="24" r="2" fill="currentColor" />
              <path
                fill="currentColor"
                d="M29.777 23.479A8.64 8.64 0 0 0 22 18a8.64 8.64 0 0 0-7.777 5.479L14 24l.223.522A8.64 8.64 0 0 0 22 30a8.64 8.64 0 0 0 7.777-5.478L30 24zM22 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4M7 17h5v2H7zm0-5h12v2H7zm0-5h12v2H7z"
              />
              <path
                fill="currentColor"
                d="M22 2H4a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8v-2H4V4h18v11h2V4a2.006 2.006 0 0 0-2-2"
              />
            </svg>
            View Order
          </Button>
        </Link>
      ),
      center: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        alignItems: "center",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        padding: "10px 0",
      },
    },
  };

  return (
    <>
      <h4 className="text-2xl font-semibold pb-3 text-center">My Orders</h4>

      {/* <h2 className="pb-5 text-center">My Orders</h2> */}
      <div className="border rounded-lg p-5">
        <DataTable
          className="pt-2"
          data={orders}
          columns={columns}
          highlightOnHover
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default OrderTable;
