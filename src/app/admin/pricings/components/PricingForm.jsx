"use client";
import { post } from "@/utils/api";
import { Button, Input } from "@material-tailwind/react";
import { Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Moment from "react-moment";
import { formatDateString } from "@/utils/helper";

const PricingForm = ({ pricing, pricings }) => {
  const router = useRouter();

  // Sort pricings by date in descending order (latest first)
  const sortedPricings = [...pricings].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const columns = [
    {
      name: "Date",
      selector: (row) => formatDateString(row?.date),
      sortable: true,
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Time",
      selector: (row) => <Moment format="hh:mm A">{row?.created_at}</Moment>,
      sortable: true,
      style: {
        textAlign: "left",
      },
    },
    {
      name: "24 Karat",
      selector: (row) => row?.karat24.toFixed(2),
      sortable: true,
    },
    {
      name: "22 Karat",
      selector: (row) => row?.karat22.toFixed(2),
      sortable: true,
    },
    {
      name: "21 Karat",
      selector: (row) => row?.karat21.toFixed(2),
      sortable: true,
    },
    {
      name: "18 Karat",
      selector: (row) => row?.karat18.toFixed(2),
      sortable: true,
    },
    {
      name: "14 Karat",
      selector: (row) => row?.karat14.toFixed(2),
      sortable: true,
    },
    {
      name: "9 Karat",
      selector: (row) => row?.karat09.toFixed(2),
      sortable: true,
    },
    {
      name: "Silver",
      selector: (row) => row?.silver.toFixed(2),
      sortable: true,
    },
    {
      name: "Platinum",
      selector: (row) => row?.platinum.toFixed(2),
      sortable: true,
    },
    {
      name: "Palladium",
      selector: (row) => row?.palladium.toFixed(2),
      sortable: true,
    },
  ];

  const validationSchema = Yup.object().shape({
    karat24: Yup.number().min(0, "Must be greater than or equal to 0"),
    karat22: Yup.number().min(0, "Must be greater than or equal to 0"),
    karat21: Yup.number().min(0, "Must be greater than or equal to 0"),
    karat18: Yup.number().min(0, "Must be greater than or equal to 0"),
    karat14: Yup.number().min(0, "Must be greater than or equal to 0"),
    karat09: Yup.number().min(0, "Must be greater than or equal to 0"),
    silver: Yup.number().min(0, "Must be greater than or equal to 0"),
    platinum: Yup.number().min(0, "Must be greater than or equal to 0"),
    palladium: Yup.number().min(0, "Must be greater than or equal to 0"),
  });

  const formik = useFormik({
    initialValues: {
      karat24: pricing?.karat24 ?? "",
      karat22: pricing?.karat22 ?? "",
      karat21: pricing?.karat21 ?? "",
      karat18: pricing?.karat18 ?? "",
      karat14: pricing?.karat14 ?? "",
      karat09: pricing?.karat09 ?? "",
      silver: pricing?.silver ?? "",
      platinum: pricing?.platinum ?? "",
      palladium: pricing?.palladium ?? "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await post("/api/pricing_history", values);
        router.refresh();
        formik.resetForm();
        if (response?.status === 200) {
          enqueueSnackbar("Pricing Created Successfully", {
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

  const customStyles = {
    headCells: {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right",
        marginRight: "20px",
        fontSize: "15px",
      },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 intro-y">
        <h2 className="text-2xl font-semibold">Today's Metal Rate</h2>

        <div>
          <p>
            <Moment
              format="DD MMM YYYY"
              interval={1000}
              suppressHydrationWarning
              className="pr-3"
            />

            <Moment
              format="hh:mm:ss A"
              interval={1000}
              suppressHydrationWarning
            />
          </p>
        </div>
      </div>

      <div className="rounded-lg shadow border border-dark-200 mb-5 bg-white">
        <Formik initialValues={formik.initialValues}>
          <form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
            <div className="flex flex-col gap-5">
              <div className="grid items-start grid-cols-3 gap-5">
                <div className="col-span-3 pt-1  flex items-center text-sm text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Gold
                </div>

                <div>
                  <Input
                    label="24 Karat"
                    type="number"
                    name="karat24"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat24 ?? ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat24 && formik.errors.karat24}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>
                {/* <div>
                  {attributes && attributes?.length > 0 && (
                    <Select
                      label="Attribute"
                      name="attributeValue_id"
                      value={formik.values?.attributeValue_id ?? ""}
                      onChange={(value) =>
                        formik.setFieldValue("attributeValue_id", value)
                      }
                      error={
                        formik.touched.attributeValue_id &&
                        formik.errors.attributeValue_id
                      }
                    >
                      {attributes?.map((attribute) => (
                        <Option key={attribute?.id} value={attribute?.id}>
                          {attribute?.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div> */}
                <div>
                  <Input
                    label="22 Karat"
                    type="number"
                    name="karat22"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat22 || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat22 && formik.errors.karat22}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="21 Karat"
                    type="number"
                    name="karat21"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat21 || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat21 && formik.errors.karat21}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="18 Karat"
                    type="number"
                    name="karat18"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat18 || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat18 && formik.errors.karat18}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="14 Karat"
                    type="number"
                    name="karat14"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat14 || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat14 && formik.errors.karat14}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="9 Karat"
                    type="number"
                    name="karat09"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.karat09 || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.karat09 && formik.errors.karat09}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>
                <div className="col-span-3 flex items-center text-sm text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Metal
                </div>

                <div>
                  <Input
                    label="Silver"
                    type="number"
                    name="silver"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.silver || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.silver && formik.errors.silver}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="Platinum"
                    type="number"
                    name="platinum"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.platinum || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.platinum && formik.errors.platinum}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="Palladium"
                    type="number"
                    name="palladium"
                    style={{ fontSize: "15px" }}
                    value={formik.values?.palladium || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.palladium && formik.errors.palladium}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
                  loading={formik.isSubmitting}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Formik>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          columns={columns}
          data={sortedPricings}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default PricingForm;
