"use client";
import React from "react";
import { Button, Chip, IconButton, Switch } from "@material-tailwind/react";
import Link from "next/link";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import DeleteProduct from "./DeleteProduct";
import { ADMIN_ID, CUSTOMER_ID, VENDOR_ID } from "@/utils/constants";
import dynamic from "next/dynamic";
import { ProductStatus } from "@prisma/client";
import { updateProductStatus } from "@/actions/product";

const Products = ({ products }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("activeStep", 0);
  }
  console.log(products);
  const columns = [
    {
      name: "Product Name",
      selector: (row) => row?.product_name,
    },
    {
      name: "Created By",
      selector: (row) => {
        if (row?.user?.role_id === ADMIN_ID) {
          return `${row?.user?.firstName} ${row?.user?.lastName} (ADMIN)`;
        } else if (row?.user?.role_id === VENDOR_ID) {
          return `${row?.user?.vendor?.store_name} (VENDOR)`;
        }
      },
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <div className="flex items-center grow">
            <Switch
              checked={row.status === ProductStatus.PUBLISHED}
              label={row.status}
              ripple={false}
              onChange={() =>
                updateProductStatus(
                  row.product_id,
                  row.status === ProductStatus.PUBLISHED
                    ? ProductStatus.DRAFT
                    : ProductStatus.PUBLISHED
                )
              }
            />
          </div>
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link href={`/admin/products/edit/${row.product_id}`}>
            <IconButton variant="text" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                ></path>
              </svg>
            </IconButton>
          </Link>
          <DeleteProduct product_id={row?.product_id} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-10">
        <h2 className="text-2xl font-semibold ">Products</h2>
        <Link
          href="/admin/products/add"
          className="flex justify-end btn btn-primary"
        >
          <Button
            size="md"
            className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
              ></path>
            </svg>
            Add New Products
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={products}
        highlightOnHover
        pagination
        pointerOnHover
      />
    </>
  );
};

export default Products;
