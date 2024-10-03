import { Switch } from "@material-tailwind/react";
import { UserStatus } from "@prisma/client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { changeVendorStatus } from "@/app/actions/vendor";

const VendorStatus = ({ row, isActive }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Switch
        value={row.status}
        checked={isActive}
        label={isActive ? "Active" : "Deactive"}
        ripple={false}
        onChange={() => setOpen(true)}
      />
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
        <DialogHeader>Change Vendor Status</DialogHeader>
        <DialogBody>
          {`Are You Sure Want To ${isActive ? "Deactive" : "Active"} ${
            row.firstName
          } ${row.lastName} ?`}
          <br />
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
            onClick={async () => {
              setLoading(true);
              await changeVendorStatus(
                row.id,
                isActive ? UserStatus.DISABLED : UserStatus.ACTIVE
              );
              setLoading(false);
              setOpen(false);
            }}
            loading={loading}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default VendorStatus;
