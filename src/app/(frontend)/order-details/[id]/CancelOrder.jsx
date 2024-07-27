"use client";
import { showToast } from "@/utils/helper";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelOrder({ order_id }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const del = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/order/${order_id}/cancel`, {
        method: "PUT",
      });
      if (response.status === 200) {
        showToast({ message: "Order updated successfully" });
      } else {
        showToast({
          message: response.message
            ? response.message
            : "Order Not updated, try contact seller",
        });
      }
      router.refresh();
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600"
      >
        <svg
          className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
            stroke=""
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        Cancel Order
      </button>
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
        <DialogHeader>Cancel Order</DialogHeader>
        <DialogBody>Are you sure want to Cancel this order?</DialogBody>
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
