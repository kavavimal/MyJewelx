"use client";
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

const DeleteVariation = ({
  variation_id,
  variations,
  setVariations,
  index,
  isVariation,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const del = async () => {
    setLoading(true);
    if (isVariation) {
      try {
        await fetch(`/api/variation/${variation_id}`, {
          method: "DELETE",
        }).then((resp) => {
          if (resp.status === 201) {
            enqueueSnackbar("Variation deleted successfully", {
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
            setVariations(
              variations.filter(
                (variation) => variation.variation_id !== variation_id
              )
            );
          }
          router.refresh();
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      setVariations(variations.filter((_, i) => i !== index));
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <Button color="red" onClick={handleOpen}>
        Delete
      </Button>
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

export default DeleteVariation;
