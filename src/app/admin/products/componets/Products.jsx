"use client";
import React from "react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
const Products = () => {
  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-10">
        <h2 className="text-2xl font-semibold ">Products</h2>
        <Link
          href="/admin/products/add"
          className="flex justify-end btn btn-primary"
        >
          <Button
            variant="gradient"
            size="md"
            className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none"
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
    </>
  );
};

export default Products;
