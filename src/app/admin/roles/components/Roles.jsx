"use client";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";
import DeleteRole from "./DeleteRole";
import SessionLoader from "@/components/SessionLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Roles = ({ roles }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
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
