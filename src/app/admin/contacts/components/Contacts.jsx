"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import moment from "moment";
function Contacts({ contacts }) {
  const router = useRouter();
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
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
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row?.phone_number,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row?.message,
      sortable: true,
    },
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <>
    //       <IconButton
    //         variant="text"
    //         className="rounded-full"
    //         onClick={() => setGender(row)}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width={18}
    //           height={18}
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             fill="currentColor"
    //             d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
    //           ></path>
    //         </svg>
    //       </IconButton>
    //       <DeleteGender gender_id={row?.gender_id} />
    //     </>
    //   ),
    // },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
      },
    },
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Contacts</h2>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          data={contacts}
          columns={columns}
          highlightOnHover
          customStyles={customStyles}
          pagination
        />
      </div>
    </div>
  );
}

export default Contacts;
