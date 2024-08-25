"use client";
import dynamic from "next/dynamic";
import UpdateStatus from "../UpdateStatus";
import moment from "moment";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function Pod({ podr }) {
  const columns = [
    {
      name: "Name",
      selector: (row) => <span className="text-[15px]">{row?.name}</span>,
      sortable: true,
      width: "13%",
    },
    {
      name: "Description",
      selector: (row) => (
        <span className="text-[15px]">{row?.description}</span>
      ),
      sortable: true,
      width: "18%",
    },
    {
      name: "Metal Type",
      selector: (row) => <span className="text-[15px]">{row?.metal_type}</span>,
      sortable: true,
      width: "13%",
    },
    {
      name: "Made In",
      selector: (row) => <span className="text-[15px]">{row?.made_in}</span>,
      sortable: true,
      width: "13%",
    },
    {
      name: "Contact",
      selector: (row) => <span className="text-[15px]">{row?.contact}</span>,
      sortable: true,
      width: "13%",
    },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <UpdateStatus id={row.id} status={row.Status} isAdmin />,
      width: "28%",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
        fontSize: "19px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="rounded-2xl shadow-3xl bg-white py-5">
      <DataTable
        data={podr}
        columns={columns}
        highlightOnHover
        pagination
        pointerOnHover
        customStyles={customStyles}
        striped
      />
    </div>
  );
}
