"use client";
import { Button, IconButton } from "@material-tailwind/react";
import { UserStatus } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import DeleteUser from "../../users/components/DeleteUser";
import VendorStatus from "./VendorStatus";
import moment from "moment";
import Image from "next/image";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const Vendors = ({ vendors }) => {
  const [filterVendors, setFilterVendors] = useState(vendors);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Store Name",
      selector: (row) => row?.vendor?.store_name,
      sortable: true,
    },
    {
      name: "Store Image",
      selector: (row) => (
        <>
          {row?.image !== null ? (
            <Image
              src={row?.image?.path}
              alt="Vendor Image"
              width={50}
              height={50}
              unoptimized={true}
              onError={(event) => {
                event.target.src = "/assets/images/vendor1.jpg";
                event.target.alt = "/assets/images/vendor1.jpg";
              }}
            />
          ) : null}
        </>
      ),
    },
    {
      name: "Store Banner",
      selector: (row) => (
        <>
          {row?.banner_image !== null ? (
            <Image
              src={row?.banner_image?.path}
              alt="Vendor Image"
              width={50}
              height={50}
              unoptimized={true}
              onError={(event) => {
                event.target.src = "/assets/images/vendor1.jpg";
                event.target.alt = "/assets/images/vendor1.jpg";
              }}
            />
          ) : null}
        </>
      ),
    },
    {
      name: "Status",
      cell: (row) => {
        const isActive = row.status === UserStatus.ACTIVE;
        return <VendorStatus row={row} isActive={isActive} />;
      },
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.createdAt);
        const dateB = new Date(rowB.createdAt);
        return dateB - dateA;
      },
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link href={`/admin/vendors/edit/${row.id}`}>
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

          <DeleteUser id={row.id} />
        </>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = vendors.filter((vendor) => {
      const { firstName, lastName, email, account_type, role } = vendor;

      return (
        firstName.toLowerCase().includes(value) ||
        (lastName && lastName.toLowerCase().includes(value)) ||
        (firstName + " " + lastName).toLowerCase().includes(value) ||
        (email && email.toLowerCase().includes(value))
        // || (account_type && account_type.toLowerCase().includes(value)) ||
        // (role?.role_name && role.role_name.toLowerCase().includes(value))
      );
    });
    setFilterVendors(filtered);
  };

  const customStyles = {
    cells: {
      style: {
        padding: "10px",
        fontSize: "15px ",
      },
    },
  };

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Vendors</h2>
        <div className="flex items-end gap-3">
          <Input
            label="Search"
            placeholder="Search Vendors"
            onChange={handleSearch}
            style={{ fontSize: "15px" }}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Link
            href="/admin/vendors/add"
            className="flex justify-end btn btn-primary"
          >
            <Button
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
              Add New Vender
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          data={filterVendors}
          columns={columns}
          highlightOnHover
          pagination
          pointerOnHover
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Vendors;
