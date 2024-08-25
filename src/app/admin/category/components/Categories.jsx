"use client";
import { Button, IconButton, Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import CategoryForm from "./CategoryForm";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";
import moment from "moment";
const Categories = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Columns definition
  const column = [
    {
      name: "Id",
      selector: (row) => row.category_id,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = categories.filter(
      (category) =>
        category.category_id === parseInt(value) ||
        category.name.toLowerCase().includes(value) ||
        (category.description &&
          category.description.toLowerCase().includes(value))
    );
    setFilteredCategories(filtered);
  };

  const customStyles = {
    cells: {
      style: {
        fontSize: "15px ",
      },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 intro-y">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex gap-3 items-end">
          <Input
            placeholder="Search Categories"
            type="text"
            label="Search"
            style={{ fontSize: "15px" }}
            value={searchTerm}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
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
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          columns={column}
          data={filteredCategories}
          pagination
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Categories;
