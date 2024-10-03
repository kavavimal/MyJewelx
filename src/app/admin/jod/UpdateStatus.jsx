"use client";
import { showToast } from "@/utils/helper";
import { Button, Option, Select } from "@material-tailwind/react";
import { PODStatus } from "@prisma/client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { updatePODStatus } from "@/app/actions/pod";
import SessionLoader from "@/app/components/SessionLoader";
import { useRouter } from "next/navigation";
export default function UpdateStatus({ id, status, isAdmin = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateRequestStatus, setUpdateRequestStatus] = useState(status);
  const handleChange = (newVal) => {
    setUpdateRequestStatus(newVal);
  };
  const { data: session } = useSession();
  if (!session) {
    return <SessionLoader />;
  }
  const saveStatus = async () => {
    if (status !== updateRequestStatus) {
      setLoading(true);
      const update = await updatePODStatus(id, updateRequestStatus);
      if (update.message) {
        showToast({
          message: update.message,
          variant: update.status === "error" ? "error" : "success",
        });
        if (update.status === "error") {
          setUpdateRequestStatus(status);
        }
      }
      router.refresh();
      setLoading(false);
    }
  };

  const checkadmin = session?.user?.role === "ADMIN";

  const StatusList = checkadmin
    ? [
        PODStatus.DRAFT,
        PODStatus.REQUESTED,
        PODStatus.PUBLISHED,
        // PODStatus.ACCEPTEDBYSELLER,
        // PODStatus.SOLD,
        // PODStatus.ARCHIVED,
        PODStatus.CANCELED,
      ]
    : [
        PODStatus.DRAFT,
        PODStatus.REQUESTED,
        // PODStatus.ARCHIVED,
        PODStatus.CANCELED,
      ];

  const checkurs = StatusList.includes(updateRequestStatus);

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-[150px]">
        <Select
          label="JOD Status"
          containerProps={{
            style: { minWidth: "150px" },
          }}
          name="updateRequestStatus"
          value={checkurs ? updateRequestStatus : ""}
          onChange={handleChange}
        >
          {StatusList.map((item) => (
            <Option key={item} value={item}>
              {item === PODStatus.ACCEPTEDBYSELLER ? "ACCEPTED" : item}
            </Option>
          ))}
        </Select>
      </div>
      <Button onClick={saveStatus} loading={loading} className="w-32">
        Update
      </Button>
    </div>
  );
}
