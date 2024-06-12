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

const DeleteVariation = ({ variation_id, variations, setVariations }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const del = async () => {
    setLoading(true);
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
};

export default DeleteVariation;
