"use client";
import Image from "next/image";
import { post, update } from "@/utils/api";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import DeleteAds from "./DeleteAds";
import { Select, Option } from "@material-tailwind/react";

const Promotional = ({ promotional }) => {
  const [previewURLs, setPreviewURLs] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <>
          <Image src={row?.ads_img_url} width={50} height={50} />
        </>
      ),
    },
    {
      name: "Ads Title",
      selector: (row) => row?.ads_title,
    },
    {
      name: "Ads Description",
      selector: (row) => row?.ads_desc,
    },
    {
      name: "Ads Link",
      selector: (row) => (
        <>
          <Button>
            <Link href={row?.ads_link} className="">
              Shop Now
            </Link>
          </Button>
        </>
      ),
    },
    {
      name: "Ads Type",
      selector: (row) => row?.ads_type,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <Button>Edit</Button>
          <DeleteAds ads_id={row?.ads_id} />
        </>
      ),
    },
  ];
  const formik = useFormik({
    initialValues: {
      ads_title: "",
      ads_desc: "",
      ads_link: "",
      ads_img_url: "",
      ads_type: "",
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("ads_title", values.ads_title);
        formData.append("ads_desc", values.ads_desc);
        formData.append("ads_link", values.ads_link);
        formData.append("ads_type", values.ads_type);
        formData.append("ads_img_url", image);

        const response = await post("/api/promotional", formData);
        if (response?.status === 200) {
          enqueueSnackbar("Ads created successfully", {
            variant: "success",
            preventDuplicate: true,
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
        }
        setImage(null);
        setPreviewURLs([]);
        router.refresh();
        formik.resetForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "error",
          preventDuplicate: true,
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
      }
    },
  });

  return (
    <div className="w-full">
      <div className="mt-10 rounded-2xl shadow-3xl bg-white">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="mb-2 w-1/2">
                  <Input
                    label="Ads Title"
                    type="text"
                    name="ads_title"
                    value={formik.values?.ads_title || ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <Input
                    label="Ads Description"
                    type="text"
                    value={formik.values?.ads_desc || ""}
                    name="ads_desc"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="mb-2 w-1/2">
                  <Input
                    label="Ads Link"
                    type="text"
                    name="ads_link"
                    value={formik.values?.ads_link || ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <Select
                    name="ads_type"
                    onChange={(e) => {
                      formik.setFieldValue("ads_type", e);
                    }}
                    value={formik.values?.ads_type || ""}
                  >
                    <Option value="">Select Type</Option>
                    <Option value="HOME">HOME</Option>
                    <Option value="POD">POD</Option>
                    <Option value="SHOP">SHOP</Option>
                    <Option value="STORE">STORE</Option>
                  </Select>
                </div>
              </div>
              <div className="mb-2 w-1/2">
                <label
                  htmlFor="images"
                  className="flex h-24 w-24 flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {previewURLs[0] ? (
                    <img
                      src={previewURLs}
                      alt=""
                      className="w-full h-64 rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="text-blueGray-200"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M12 9.273c-2.301 0-4.167 1.831-4.167 4.09c0 2.26 1.866 4.092 4.167 4.092c2.301 0 4.167-1.832 4.167-4.091c0-2.26-1.866-4.091-4.167-4.091m0 1.636c-1.38 0-2.5 1.099-2.5 2.455c0 1.355 1.12 2.454 2.5 2.454s2.5-1.099 2.5-2.454c0-1.356-1.12-2.455-2.5-2.455m4.722-.818c0-.452.373-.818.834-.818h1.11c.46 0 .834.366.834.818a.826.826 0 0 1-.833.818h-1.111a.826.826 0 0 1-.834-.818"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <input
                    id="images"
                    className="hidden"
                    type="file"
                    name="ads_img_url"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files[0];
                      formik.setFieldValue("ads_img_url", files);
                      setImage(files);
                      setPreviewURLs([URL.createObjectURL(files)]);
                    }}
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" loading={formik.isSubmitting}>
                  Add {/* {tag ? 'Update' : 'Add'} */}
                </Button>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <DataTable
        data={promotional}
        columns={columns}
        highlightOnHover
        pagination
        pointerOnHover
      />
    </div>
  );
};

export default Promotional;
