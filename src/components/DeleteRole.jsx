"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  MenuItem,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteRole({ role_id }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  async function del() {
    setLoading(true);
    try {
      await fetch(`/api/role/${role_id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
    setLoading(false);
  }

  return (
    <>
      <MenuItem
        onClick={handleOpen}
        animate={{
          mount: {
            opacity: [0, 1],
            transition: { duration: 0.3 },
          },
          unmount: {
            opacity: [1, 0],
            transition: { duration: 0.3 },
          },
        }}
      >
        <button className="flex items-center gap-2 text-red-600 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
            ></path>
          </svg>
          Delete
        </button>
      </MenuItem>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { opacity: 1 },
          unmount: { opacity: 0 },
        }}
        size="sm"
        className="rounded-2xl"
      >
        <DialogHeader>Delete</DialogHeader>
        <DialogBody>Are you sure want to delete?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-2"
            size="md"
          >
            <span>Cancel</span>
          </Button>
          <Button
            size="md"
            variant="gradient"
            color="red"
            onClick={() => del()}
            loading={loading}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
