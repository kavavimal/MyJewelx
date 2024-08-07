"use client";
import { updateOrderStatus } from "@/actions/orders";
import LoadingDots from "@/components/loading-dots";
import { showToast } from "@/utils/helper";
import { Button, Option, Select } from "@material-tailwind/react";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";

export default function UpdateOrderStatus({ order_id, status }) {
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdatedStatus] = useState(status);
  const handleChange = (newVal) => {
    setUpdatedStatus(newVal);
  };
  const saveStatus = async () => {
    if (status !== updateStatus) {
      setLoading(true);
      const update = await updateOrderStatus(order_id, updateStatus);
      if (update.message) {
        showToast({
          message: update.message,
          variant: update.status === "error" ? "error" : "success",
        });
        if (update.status === 'error'){
            setUpdatedStatus(status);
        }
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <Select
        label="Order Status"
        name="updateStatus"
        value={updateStatus}
        onChange={handleChange}
      >
        {[
          OrderStatus.PROCESSING,
          OrderStatus.SHIPPED,
          OrderStatus.PACKED,
          OrderStatus.DELIVERED,
          OrderStatus.OUTFORDELIVERY,
          OrderStatus.SELLERCANCELLED,
          OrderStatus.USERCANCELLED,
        ].map((item) => (
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
