"use client";
import { updateOrderStatus } from "@/app/actions/orders";
import { showToast } from "@/utils/helper";
import { Button, Option, Select } from "@material-tailwind/react";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";

export default function UpdateOrderStatus({ order_id, status, item }) {
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdatedStatus] = useState(status);
  const handleChange = (newVal) => {
    setUpdatedStatus(newVal);
  };
  const saveStatus = async () => {
    if (status !== updateStatus) {
      setLoading(true);
      const update = await updateOrderStatus(order_id, updateStatus, item);
      if (update.message) {
        showToast({
          message: update.message,
          variant: update.status === "error" ? "error" : "success",
        });
        if (update.status === "error") {
          setUpdatedStatus(status);
        }
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
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
      </div>
      <div>
        <Button fullWidth loading={loading} onClick={saveStatus}>
          Update
        </Button>
      </div>
    </div>
  );
}
