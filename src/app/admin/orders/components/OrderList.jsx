"use client";
import { IconButton, Input, Select, Option } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import moment from "moment";
import { OrderStatus } from "@prisma/client";

const OrdersPage = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filteredsearch, setFilteredSearch] = useState(orders);
  const [status, setStatus] = useState(orders.status);
  // Columns definition
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row?.user["firstName"] + " " + row?.user["lastName"],
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) =>
        row?.user["phone_number"] ? row?.user["phone_number"] : "-",
      sortable: true,
    },
    {
      name: "Email Id",
      selector: (row) => row?.user["email"],
      sortable: true,
    },
    {
      name: "Order Total",
      sortable: true,
      selector: (row) => {
        return row.orderItems.reduce((total, i) => total + i.price, 0);
      },
    },
    {
      name: "Order Status",
      selector: (row) => row?.status,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link href={`/admin/orders/${row.id}`}>
            <IconButton variant="text" color="red" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 32 32"
              >
                <circle cx="22" cy="24" r="2" fill="currentColor" />
                <path
                  fill="currentColor"
                  d="M29.777 23.479A8.64 8.64 0 0 0 22 18a8.64 8.64 0 0 0-7.777 5.479L14 24l.223.522A8.64 8.64 0 0 0 22 30a8.64 8.64 0 0 0 7.777-5.478L30 24zM22 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4M7 17h5v2H7zm0-5h12v2H7zm0-5h12v2H7z"
                />
                <path
                  fill="currentColor"
                  d="M22 2H4a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8v-2H4V4h18v11h2V4a2.006 2.006 0 0 0-2-2"
                />
              </svg>
            </IconButton>
          </Link>

          <IconButton variant="text" color="red" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
              ></path>
            </svg>
          </IconButton>
        </>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = filteredsearch.filter((order) => {
      const { id, user, status } = order;
      const { firstName, lastName, phone_number, email } = user;

      return (
        id.toString().includes(value) ||
        firstName.toLowerCase().includes(value) ||
        lastName.toLowerCase().includes(value) ||
        (firstName + " " + lastName).toLowerCase().includes(value) ||
        phone_number?.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value) ||
        status.toLowerCase().includes(value)
      );
    });

    setFilteredOrders(filtered);
  };
  console.log(orders);
  const customStyles = {
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const handlefilterChange = (value) => {
    setStatus(value);

    const filtered = orders.filter((order) => {
      return order.status === value;
    });
    setFilteredOrders(filtered);
    setFilteredSearch(filtered);
  };

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold ">Orders</h2>
        <div className="flex gap-3 items-end">
          <Select
            label="Order Status"
            name="updateStatus"
            value={status}
            onChange={handlefilterChange}
          >
            {[
              OrderStatus.PROCESSING,
              OrderStatus.SHIPPED,
              OrderStatus.PACKED,
              OrderStatus.DELIVERED,
              OrderStatus.OUTFORDELIVERY,
              OrderStatus.SELLERCANCELLED,
              OrderStatus.USERCANCELLED,
            ].map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input
            label="Search"
            type="text"
            style={{ fontSize: "15px" }}
            placeholder="Search Orders"
            value={searchTerm}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
        </div>
      </div>

      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          data={filteredOrders}
          columns={columns}
          highlightOnHover
          pagination
          customStyles={customStyles}
          pointerOnHover
          striped
        />
      </div>
    </>
  );
};

export default OrdersPage;
