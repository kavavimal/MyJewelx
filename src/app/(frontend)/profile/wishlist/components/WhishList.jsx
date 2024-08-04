"use client";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { removeFromWishlist } from "@/actions/wishlist";
import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const Wishlist = ({ wishlist }) => {
  const [loadingRemove, setLoadingRemove] = React.useState({});

  const handleRemove = (productId) => {
    setLoadingRemove((prevLoading) => ({ ...prevLoading, [productId]: true }));
    removeFromWishlist(productId)
      .then((response) => {
        if (response.status === "success") {
          wishlist.wishlistItems = wishlist.wishlistItems.filter(
            (item) => item.productId !== productId
          );
        } else {
          console.error(response.error);
        }
      })
      .then(() => {
        setLoadingRemove((prevLoading) => ({
          ...prevLoading,
          [productId]: false,
        }));
      });
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <>
          <div className="flex items-center">
            <IconButton
              variant="text"
              color="red"
              className="rounded-full mr-3"
              onClick={() => {
                handleRemove(row.productId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                ></path>
              </svg>
            </IconButton>
            <Image
              src={row.product.variations[0].image[0].path}
              className="py-3"
              width={75}
              height={75}
              alt=""
            />
          </div>
        </>
      ),
    },

    {
      name: "Product Name",
      selector: (row) => {
        const productName = row.product["product_name"];
        return productName
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      },
    },
    {
      name: "Price",
      selector: (row) => (
        <>
          <p>AED 1155.00</p>
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) =>
        row.product.variations[0].stock_status === true
          ? "In-Stock"
          : "Out of Stock",
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
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };
  return (
    <>
      <div class="flex items-center text-sm before:flex-1 before:border-t after:pr-64 before:border-primary-200 after:border-t after:border-primary-200 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
        <img src="/assets/images/divider.svg" alt="" />
      </div>
      <h1 className="text-3xl mt-2 text-center">My Wishlist</h1>
      <DataTable
        className="pt-2"
        data={wishlist.wishlistItems}
        columns={columns}
        highlightOnHover
        pagination
        pointerOnHover
        customStyles={customStyles}
      />
    </>
  );
};

export default Wishlist;
