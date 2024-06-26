"use client";
import { Button, IconButton } from "@material-tailwind/react";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import AddPermission from "./AddPermission";
import DeletePermission from "./DeletePermission";
import { useState } from "react";
import SessionLoader from "@/components/SessionLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Permissions = ({ permissions }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [editData, setEditData] = useState(false);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.permission_id,
    },
    {
      name: "Permission Name",
      selector: (row) => row.permission_name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <IconButton
            //   href={`/admin/permission/edit/${row.permission_id}`}
            variant="text"
            className="rounded-full"
            onClick={() => {
              setEditData(row);
            }}
          >
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

          <DeletePermission permission_id={row.permission_id} />
        </>
      ),
    },
  ];

  if (status === "loading") {
    return <SessionLoader />;
  } else if (!session.user.permissions.includes("permissions_view")) {
    router.push("/");
  }
  return (
    <>
      <div className="flex items-center justify-between mb-10 intro-y">
        <h2 className="text-2xl font-semibold">Permissions</h2>
        <Button
          variant="gradient"
          size="md"
          className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90"
          onClick={() => {
            setEditData(false);
          }}
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
          Add New Permission
        </Button>
      </div>
      <AddPermission edit={editData} />
      <DataTable
        data={permissions}
        columns={columns}
        highlightOnHover
        pagination
        pointerOnHover
      />
    </>
  );
};

export default Permissions;
