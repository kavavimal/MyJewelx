"use client";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";

const Roles = ({roles}) => {

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
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //       <Link
    //         className="mx-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
    //         href={`/admin/roles/edit/${row.role_id}`}
    //       >
    //         Edit
    //       </Link>
    //       {/* <DeleteRole row={row} role_id={row.id} /> */}
    //     </>
    //   ),
    // },
  ];
  return (
    <>
    <Link href="/dashboard/roles/add" className="flex justify-end btn btn-primary">Add New Roles</Link>
    <DataTable data={roles} columns={columns} pagination highlightOnHover />
    </>
  );
};

export default Roles;