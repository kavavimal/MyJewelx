"use client";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DeleteRole from "./DeleteRole";
import SessionLoader from "@/components/SessionLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@material-tailwind/react";
import moment from "moment";
const Roles = ({ roles }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [filterRoles, setFilterRoles] = useState(roles);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.role_id,
      sortable: true,
    },
    {
      name: "Role Name",
      selector: (row) => row.role_name,
      sortable: true,
    },
    {
      name: "Role Description",
      selector: (row) => row.description,
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
          <Link href={`/admin/roles/edit/${row.role_id}`}>
            <IconButton className="rounded-full" variant="text">
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
          <DeleteRole role_id={row.role_id} />
        </>
      ),
    },
  ];

  if (status === "loading") {
    return <SessionLoader />;
  } else if (!session.user.permissions.includes("roles_view")) {
    router.push("/");
  }

  const customStyles = {
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = roles.filter((role) => {
      const { role_id, role_name, description } = role;

      return (
        role_id === parseInt(e.target.value) ||
        (role_name && role_name.toLowerCase().includes(value)) ||
        (description && description.toLowerCase().includes(value))
      );
    });
    setFilterRoles(filtered);
  };

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Roles</h2>
        <div className="flex gap-3 items-end">
          <Input
            label="Search"
            placeholder="Search Roles"
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Link href="/admin/roles/add">
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
              Add New Roles
            </Button>
          </Link>{" "}
        </div>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          data={filterRoles}
          columns={columns}
          pagination
          highlightOnHover
          striped
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Roles;
