import { asignProduct } from "@/app/actions/product";
import { useUserStore } from "@/contexts/userStore";
import { get } from "@/utils/api";
import { showToast } from "@/utils/helper";
import { Button, Option, Select } from "@material-tailwind/react";
import { AcountType } from "@prisma/client";
import React, { useEffect, useState } from "react";

const AsignProduct = ({ id, product }) => {
  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const getVendors = async () => {
    const response = await get("/api/vendor");
    setVendors(response.data?.vendors);
  };

  const asign = async () => {
    setLoading(true);
    const response = await asignProduct({ id: id, user_id: vendor });
    showToast({
      message: response.message,
      variant: "success",
    });
    setLoading(false);
  };

  useEffect(() => {
    getVendors();

    if (product?.user) {
      setVendor(product?.user?.id);
    }
  }, []);

  if (user?.role?.role_name === AcountType.ADMIN) {
    return (
      vendors.length > 0 && (
        <div className="flex gap-3 items-center mb-10">
          <div className="flex-1">
            <Select
              label="Asign to"
              size="lg"
              onChange={(value) => setVendor(value)}
              value={vendor || ""}
            >
              {vendors.map((vendor, index) => (
                <Option key={index} value={vendor?.id}>{`${vendor?.firstName} ${
                  vendor?.lastName
                } ${
                  vendor?.vendor?.store_name
                    ? `(${vendor?.vendor?.store_name})`
                    : ""
                }`}</Option>
              ))}
            </Select>
          </div>
          <div className="flex gap-5">
            <Button onClick={asign} loading={loading}>
              Assign
            </Button>
            <Button variant="outlined" onClick={() => setVendor("")}>
              Cancel
            </Button>
          </div>
        </div>
      )
    );
  } else {
    return null;
  }
};

export default AsignProduct;
