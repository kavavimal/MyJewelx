"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  MenuItem,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const DeleteCategory = ({ category_id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  async function del() {
    setLoading(true);
    try {
      await fetch(`/api/category/${category_id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
    setLoading(false);
    enqueueSnackbar("Category deleted successfully", {
      variant: "success",
      preventDuplicates: true,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      autoHideDuration: 3000,
      style: {
        background: "white",
        color: "black",
        borderRadius: ".5rem",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        padding: "0 4px",
      },
    });
  }
  return (
    <>
      <IconButton
        variant="text"
        color="red"
        className="rounded-full"
        onClick={handleOpen}
      >
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

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { opacity: 1 },
          unmount: { opacity: 0 },
        }}
        size="sm"
        className="rounded-xl bg-white shadow-lg"
      >
        <DialogBody className="w-full max-w-lg p-5 relative mx-auto my-auto  bg-white">
          <div className="text-center p-5 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-red-500 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-bold pt-4">
              {" "}
              Do you really want to delete this?
            </h2>
          </div>
          <DialogFooter className="flex justify-center space-x-4 p-3">
            <Button
              variant="text"
              color="white"
              onClick={handleOpen}
              className="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-white"
            >
              <span>Cancel</span>
            </Button>
            <Button
              size="md"
              variant="gradient"
              color="red"
              onClick={() => del()}
              loading={loading}
              className="bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DeleteCategory;
