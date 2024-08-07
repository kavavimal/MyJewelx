"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
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
        <div className="flex flex-col justify-left items-start">
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
        <Link href={`/profile/orders/${row.id}`}>View Order Details</Link>
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
    // cells: {
    //   style: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    // },
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
