"use client";
import dynamic from "next/dynamic";
import UpdateStatus from "../UpdateStatus";
import { useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { PODStatus } from "@prisma/client";
import moment from "moment";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function Pod({ podr }) {
  console.log(podr);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPod, setFilteredPod] = useState(podr);
  const [status, setStatus] = useState("");
  const [filteredSelectPod, setFilteredSelectPod] = useState(podr);

  const handleStatusChange = (value) => {
    setStatus(value);

    const filtered = podr.filter((item) => {
      return item.Status === value;
    });
    setFilteredPod(filtered);
    setFilteredSelectPod(filtered);
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = filteredSelectPod.filter((item) => {
      return (
        item.name.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.metal_type.toLowerCase().includes(value) ||
        item.made_in.toLowerCase().includes(value) ||
        item.contact.toLowerCase().includes(value)
      );
    });
    setFilteredPod(filtered);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "13%",
    },
    {
      name: "Description",
      selector: (row) => row?.description,
      sortable: true,
      width: "15%",
    },
    {
      name: "Metal Type",
      selector: (row) => row?.metal_type,
      sortable: true,
      width: "13%",
    },
    {
      name: "Made In",
      selector: (row) => row?.made_in,
      sortable: true,
      width: "13%",
    },
    {
      name: "Contact",
      selector: (row) => row?.contact,
      sortable: true,
      width: "13%",
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      width: "10%",
    },
    {
      name: "Actions",
      cell: (row) => <UpdateStatus id={row.id} status={row.Status} isAdmin />,
      width: "23%",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
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

  const StatusList = [
    PODStatus.DRAFT,
    PODStatus.REQUESTED,
    PODStatus.PUBLISHED,
    PODStatus.ACCEPTEDBYSELLER,
    // PODStatus.SOLD,
    // PODStatus.ARCHIVED,
    PODStatus.CANCELED,
  ];

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Jewlex On Demand Requests</h2>{" "}
        <div className="flex gap-3 items-end">
          <Select
            className="!min-w-full !w-[120px]"
            containerProps={{ className: "!min-w-0 w-[120px]" }}
            label="Select Status"
            value={status}
            onChange={handleStatusChange}
          >
            {StatusList.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input
            type="text"
            label="Search"
            placeholder="Search Patterns"
            value={searchTerm}
            style={{ fontSize: "15px" }}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
        </div>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          data={filteredPod}
          columns={columns}
          highlightOnHover
          pagination
          pointerOnHover
          customStyles={customStyles}
          striped
        />
      </div>
    </>
  );
}
