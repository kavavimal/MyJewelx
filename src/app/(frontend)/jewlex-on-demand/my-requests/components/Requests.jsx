"use client";
import Image from "next/image";
import moment from "moment";
import dynamic from "next/dynamic";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState, useCallback } from "react";
import UpdateStatus from "@/app/admin/jod/UpdateStatus";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
export default function Requests({ product }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpen = useCallback((row) => {
    setSelectedRow(row);
    setOpen((prev) => !prev);
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        fontSize: "19px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const columns = [
    // {
    //   name: "Images",
    //   selector: (row) => (
    //     <Image
    //       height={50}
    //       width={50}
    //       alt="JOD Image"
    //       src={row?.Images ? row.Images[0].path : ""}
    //       className="h-[50px] w-[50px] object-cover"
    //     />
    //   ),
    // },
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
      id: "createdAt",
    },
    {
      name: "Status",
      selector: (row) => row?.Status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UpdateStatus id={row.id} status={row.Status} />
          <IconButton
            onClick={() => handleOpen(row)}
            color="red"
            variant="text"
            className="rounded-full"
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
        </div>
      ),
      width: "35%",
    },
  ];

  return (
    <>
      <DataTable
        data={product}
        columns={columns}
        highlightOnHover
        pagination
        pointerOnHover
        defaultSortFieldId={"createdAt"}
        defaultSortAsc
        customStyles={customStyles}
        striped
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography className="font-emirates" variant="h5" color="blue-gray">
            Details for {selectedRow?.name}
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography
                variant="h6"
                className="font-emirates"
                color="blue-gray"
              >
                Description
              </Typography>
              <Typography className="font-emirates">
                {selectedRow?.description || "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                className="font-emirates"
                color="blue-gray"
              >
                Made In
              </Typography>
              <Typography className="font-emirates">
                {selectedRow?.made_in || "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                className="font-emirates"
                color="blue-gray"
              >
                Metal Type
              </Typography>
              <Typography className="font-emirates">
                {selectedRow?.metal_type || "N/A"}
              </Typography>
            </div>

            {selectedRow?.metal_type == "Gold" && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  Karat
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.karat || "N/A"}
                </Typography>
              </div>
            )}
            {selectedRow?.contact != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  Contact
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.contact || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.price_type != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  price type
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.price_type || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.min_price !== null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  min price
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.min_price || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.max_price != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  max price
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.max_price || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.weight_type != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  weight type
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.weight_type || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.min_weight != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  min weight
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.min_weight || "N/A"}
                </Typography>
              </div>
            )}

            {selectedRow?.max_weight != null && (
              <div>
                <Typography
                  variant="h6"
                  className="font-emirates"
                  color="blue-gray"
                >
                  max weight
                </Typography>
                <Typography className="font-emirates">
                  {selectedRow?.max_weight || "N/A"}
                </Typography>
              </div>
            )}
            <div className="pt-4 flex items-start gap-5">
              <Image
                height={50}
                width={50}
                alt="JOD Image"
                src={selectedRow?.Images ? selectedRow.Images[0].path : ""}
                className="h-[65px] w-[70px] object-contain rounded-lg "
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="font-emirates">
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
