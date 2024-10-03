"use client";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SUPPORTStatus } from "@prisma/client";
import * as Yup from "yup";
import { showToast } from "@/utils/helper";
import { post } from "@/utils/api";
import SupportTable from "./SupportTable";
import { useState, useEffect } from "react";

function Support({ supports, orders, products }) {
  const [productItemId, setProductItemId] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      reasonType: "",
      reasonText: "",
      status: "OPEN",
      productId: "",
      orderId: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      reasonText: Yup.string().required("Reason text is required"),
      reasonType: Yup.string().required("Reason type is required"),
      productId: Yup.number(),
      orderId: Yup.number(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await post(`/api/support/`, values);
        if (response.status === 200) {
          router.refresh();
          showToast({
            message: "Ticket created successfully",
            variant: "success",
          });
        } else {
          showToast({ message: "Error creating ticket", variant: "error" });
        }

        resetForm();
        router.refresh();
      } catch (error) {
        console.log(error);
        showToast({ message: "Error creating ticket", variant: "error" });
      }
    },
  });

  const handleCreateTicket = () => {
    const formSection = document.getElementById("create-ticket-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setFilteredProducts([]);
    if (productItemId && productItemId.length > 0) {
      const filtered = products.filter((product) =>
        productItemId.includes(product.product_id)
      );
      setFilteredProducts(filtered);
      formik.setFieldValue("productId", "");
    }
  }, [productItemId]);

  useEffect(() => {
    if (formik.values.productId) {
      setSelectedProduct(formik.values.productId);
    }
  }, [formik.values.productId]);

  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <Input
            label="Search Reason"
            className="max-w-[300px]"
            containerProps={{ className: "max-w-[300px]" }}
          />
          <Button
            className="flex w-[150px] flex-col items-center"
            onClick={handleCreateTicket}
          >
            Create Ticket
          </Button>
        </div>
        <div className="py-5">
          <SupportTable Support={supports} />
        </div>

        <div className="flex py-5 flex-col w-full items-start">
          <h2 className="py-2">Create A New Ticket</h2>

          <div className="bg-primary-200/10 w-full p-6 rounded-lg">
            <p className="text-lg font-medium text-black mb-4">
              Before posting a new topic, please follow these steps:
            </p>
            <ul className="list-inside list-disc text-base text-gray-700 leading-relaxed space-y-2">
              <li>
                Read the Welcome Guide to maximize your understanding of the
                community.
              </li>
              <li>Search for existing topics to avoid duplicates.</li>
              <li>Use descriptive titles for better engagement.</li>
              <li>Be respectful and follow the community guidelines.</li>
              <li>Provide enough details and context in your posts.</li>
              <li>Use relevant tags to categorize your topic correctly.</li>
            </ul>
          </div>

          <div className="w-full py-5">
            <Formik
              initialValues={formik.initialValues}
              validationSchema={formik.validationSchema}
              onSubmit={formik.handleSubmit}
            >
              <Form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col items-start gap-3"
              >
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 items-start gap-3 justify-between">
                  <Input
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && formik.errors.title}
                    containerProps={{ className: "max-w-[500px] !min-w-0" }}
                  />

                  <Select
                    label="Reason"
                    name="reasonType"
                    value={formik.values.reasonType}
                    onChange={(e) => formik.setFieldValue("reasonType", e)}
                    containerProps={{ className: "max-w-[400px] !min-w-0" }}
                    error={
                      formik.touched.reasonType && formik.errors.reasonType
                    }
                  >
                    <Option value={SUPPORTStatus.INQUIRIES}>Inquiries</Option>
                    <Option value={SUPPORTStatus.COMPLAINTS}>Complaints</Option>
                    <Option value={SUPPORTStatus.RETURNS}>Returns</Option>
                  </Select>

                  <Select
                    label="Order ID"
                    name="orderId"
                    value={formik.values.orderId}
                    onChange={(e) => {
                      const selectedOrder = orders.find(
                        (order) => order.id === parseInt(e)
                      );
                      formik.setFieldValue("orderId", selectedOrder.id);
                      if (
                        selectedOrder &&
                        selectedOrder.orderItems.length > 0
                      ) {
                        const productIds = selectedOrder.orderItems.map(
                          (item) => item?.productVariation?.product_id
                        );
                        setProductItemId(productIds);
                      } else {
                        setProductItemId([]);
                      }
                    }}
                    error={formik.touched.orderId && formik.errors.orderId}
                    containerProps={{ className: "max-w-[350px] !min-w-0" }}
                  >
                    {orders &&
                      orders.map((order, index) => (
                        <Option key={index} value={order.id}>
                          {order.id}
                        </Option>
                      ))}
                  </Select>
                  {filteredProducts && filteredProducts.length > 0 && (
                    <Select
                      key={filteredProducts.length}
                      label="Product"
                      name="productId"
                      value={formik.values.productId}
                      onChange={(e) => formik.setFieldValue("productId", e)}
                      error={
                        formik.touched.productId && formik.errors.productId
                      }
                      containerProps={{ className: "max-w-[400px] !min-w-0" }}
                    >
                      {filteredProducts.map((product) => (
                        <Option
                          key={product.product_id}
                          value={product.product_id}
                        >
                          {product.product_name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div>
                <div className="w-full">
                  <Textarea
                    className="h-[200px] min-h-0"
                    containerProps={{ className: "min-h-0 h-[200px]" }}
                    label="Reason"
                    name="reasonText"
                    value={formik.values.reasonText}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.reasonText && formik.errors.reasonText
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="flex w-[150px] flex-col items-center"
                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
