"use client";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import DeleteUser from "./DeleteUser";
import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import moment from "moment";
import Image from "next/image";
const Users = ({ users }) => {
  const [filterUsers, setFilterUsers] = useState(users);
  console.log(filterUsers);
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <>
          {row?.image !== null ? (
            <Image src={row?.image.path} width={50} height={50} />
          ) : (
            <div className="relative cursor-pointer inline-flex items-center justify-center w-10 h-10 select-none overflow-hidden hover:opacity-80 bg-primary-200/25 rounded-full dark:bg-gray-600">
              <span className="font-medium text-black uppercase">{`${row?.firstName[0]}${row?.lastName[0]}`}</span>
            </div>
          )}
        </>
      ),
    },
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
      name: "Account Type",
      selector: (row) => row.account_type,
      sortable: true,
    },
    {
      name: "User Role",
      selector: (row) => row?.role?.role_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.createdAt);
        const dateB = new Date(rowB.createdAt);
        return dateB - dateA;
      },
      sortable: true,
      id: "createdAt",
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link href={`/admin/users/edit/${row.id}`}>
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
    const filtered = users.filter((user) => {
      const { firstName, lastName, email } = user;

      return (
        firstName.toLowerCase().includes(value) ||
        (lastName && lastName.toLowerCase().includes(value)) ||
        (firstName + " " + lastName).toLowerCase().includes(value) ||
        (email && email.toLowerCase().includes(value))
      );
    });
    setFilterUsers(filtered);
  };

  const customStyles = {
    cells: {
      style: {
        padding: "10px",
        fontSize: "15px",
      },
    },
  };

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Users</h2>
        <div className="flex gap-3 items-end">
          <Input
            label="Search"
            placeholder="Search Users"
            onChange={handleSearch}
            style={{ fontSize: "15px" }}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Link
            href="/admin/users/add"
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
              Add New Users
            </Button>
          </Link>{" "}
        </div>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          data={filterUsers}
          columns={columns}
          highlightOnHover
          pagination
          defaultSortFieldId={"createdAt"}
          defaultSortAsc
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Users;
