"use client";
import { updatePODStatus } from "@/actions/pod";
import LoadingDots from "@/components/loading-dots";
import { showToast } from "@/utils/helper";
import { Button, Option, Select } from "@material-tailwind/react";
import { PODStatus } from "@prisma/client";
import { useState } from "react";

export default function UpdateStatus({ id, status, isAdmin=false }) {
  const [loading, setLoading] = useState(false);
  const [updateRequestStatus, setUpdateRequestStatus] = useState(status);
  const handleChange = (newVal) => {
    setUpdateRequestStatus(newVal);
  };
  const saveStatus = async () => {
    if (status !== updateRequestStatus) {
      setLoading(true);
      const update = await updatePODStatus(id, updateRequestStatus);
      if (update.message) {
        showToast({
          message: update.message,
          variant: update.status === "error" ? "error" : "success",
        });
        if (update.status === 'error'){
            setUpdateRequestStatus(status);
        }
      }
      setLoading(false);
    }
  };
  const StatusList = isAdmin ? [
    PODStatus.DRAFT,
    PODStatus.REQUESTED,
    PODStatus.PUBLISHED,
    PODStatus.ACCEPTEDBYSELLER,
    PODStatus.SOLD,
    PODStatus.ARCHIVED,
    PODStatus.CANCELED
  ]: [
    PODStatus.DRAFT,
    PODStatus.REQUESTED,
    PODStatus.ARCHIVED,
    PODStatus.CANCELED
  ]
  return (
    <div className="flex justify-between items-center">
      <Select
        label="Request Status"
        name="updateRequestStatus"
        value={updateRequestStatus}
        onChange={handleChange}
      >
        {StatusList.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <Button onClick={saveStatus}>
        {loading && <LoadingDots color="text-black" />}Update
      </Button>
    </div>
  );
}
