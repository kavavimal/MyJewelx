"use client";
import { del } from "@/utils/api";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const DeleteProduct = ({ product_id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const remove = async () => {
    setLoading(true);
    try {
      await del(`/api/product/${product_id}`).then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          enqueueSnackbar("Product deleted successfully", {
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
          router.refresh();
        }
      });
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
    setLoading(false);
  };
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
        size="sm"
        className="rounded-2xl"
        animate={{
          mount: {
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0, transitionStyle: "none" },
          },
          unmount: {
            scale: 1,
            y: 0,
            opacity: 0,
            transition: { duration: 0, transitionStyle: "none" },
          },
        }}
      >
        <DialogHeader>Delete</DialogHeader>
        <DialogBody>
          Are you sure want to delete?
          <br />
          (If you deleted it, variation will also be deleted){" "}
        </DialogBody>
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
            onClick={() => remove()}
            loading={loading}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteProduct;
