"use client";
import { Button, IconButton } from "@material-tailwind/react";
import React from "react";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import CategoryForm from "./CategoryForm";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";

const Categories = ({ categories }) => {
  const column = [
    {
      name: "Id",
      selector: (row) => row.category_id,
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link href={`/admin/category/edit/${row.category_id}`}>
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
          <DeleteCategory category_id={row.category_id} />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-10 intro-y">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link href={"/admin/category/add"}>
          <Button
            variant="gradient"
            size="md"
            className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90"
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
            Add New Category
          </Button>
        </Link>
      </div>
      {/* <CategoryForm /> */}
      <DataTable
        columns={column}
        data={categories}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </>
  );
};

export default Categories;
