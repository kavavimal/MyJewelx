"use client";
import DeleteRole from "@/components/DeleteRole";
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";

const Roles = ({ roles }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.role_id,
    },
    {
      name: "Role Name",
      selector: (row) => row.role_name,
    },
    {
      name: "Role Description",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                onClick={() => setRoleId(row.role_id)}
                className="rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
                  ></path>
                </svg>
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link
                  href={`/admin/roles/edit/${row.role_id}`}
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                    ></path>
                  </svg>
                  Edit
                </Link>
              </MenuItem>

              <DeleteRole role_id={row.role_id} />
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-10">
        <h2 className="text-2xl font-semibold ">Roles</h2>
        <Link href="/admin/roles/add">
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
            Add New Roles
          </Button>
        </Link>
      </div>
      <DataTable data={roles} columns={columns} highlightOnHover />
    </>
  );
};

export default Roles;
