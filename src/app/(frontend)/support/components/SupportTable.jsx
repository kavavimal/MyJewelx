"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Textarea,
  Typography,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
function SupportTable({ Support }) {
  Support.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [open, setOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const handleOpen = (support) => {
    setSelectedSupport(support);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSupport(null);
  };

  const customStyles = {
    headCells: {
      style: {
        padding: "0 20px",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        padding: "10px 20px",
        fontSize: "15px",
      },
    },
  };

  const columns = [
    {
      name: "Topic",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Badge
          overlap="circular"
          placement="top-end"
          content={row.response ? 1 : 0}
          className={`text-[10px] !min-h-2 !min-w-4 p-0 ${
            row.response?.length > 0 ? "" : "hidden"
          } `}
        >
          <IconButton
            className="rounded-full"
            color="orange"
            onClick={() => handleOpen(row)}
            size="sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
              ></path>
              <path
                fill="currentColor"
                d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
              ></path>
            </svg>
          </IconButton>
        </Badge>
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="border rounded-lg">
          <DataTable
            className="pt-2"
            data={Support}
            columns={columns}
            highlightOnHover
            striped
            //   pagination
            //   paginationPerPage={10}
            //   paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={customStyles}
          />
        </div>
      </div>

      <Dialog open={open} handler={handleClose} size="md" className="p-4">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Support Details
          </Typography>
        </DialogHeader>
        <DialogBody>
          {selectedSupport && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2 items-start">
                  <Typography variant="h6">Title :</Typography>
                  <Typography>{selectedSupport.title}</Typography>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Typography variant="h6">Order ID :</Typography>
                    <Typography>{selectedSupport.orderId}</Typography>
                  </div>
                  <div className="flex items-start gap-2">
                    <Typography variant="h6">Product ID :</Typography>
                    <Typography>{selectedSupport.productId}</Typography>
                  </div>{" "}
                  <div className="flex items-start gap-2">
                    <Typography variant="h6">Reason Type :</Typography>
                    <Typography>{selectedSupport.reasonType}</Typography>
                  </div>
                </div>
                <div>
                  <Typography variant="h6">Reason Text :</Typography>
                  <Typography>{selectedSupport.reasonText}</Typography>
                </div>
              </div>
              {selectedSupport.response && (
                <div className="pt-3 grid gap-3">
                  <Typography variant="h6">Vendor Response:</Typography>
                  <Textarea
                    label="Message"
                    name="message"
                    value={selectedSupport.response}
                    disabled
                  />
                </div>
              )}
            </>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}

export default SupportTable;
