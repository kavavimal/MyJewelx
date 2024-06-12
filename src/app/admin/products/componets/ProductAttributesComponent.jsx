"use client";
import { get } from "@/utils/api";
import { Button, Typography } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";

export default function ProductAttributes({ productId, productAttributes, handlePrev }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  // defind all attributes selectable formate
  const productAttributesOptions = productAttributes.map((attribute) => {
    return {
      label: attribute.name,
      value: attribute.attribute_id,
    };
  });

  //  get product attribute data from api
  const getProductAttributesData = useCallback(async () => {
    setLoading(true);
    const getProductResponse = await get(
      "/api/product/" + productId + "/attributes"
    );
    const productData = getProductResponse.data.product;
    setProduct(productData);
    setSelectedAttributes(productData.attributes.map((a) => a.attribute_id));
    setLoading(false);
    return productData;
  });
  useEffect(() => {
    getProductAttributesData();
  }, [productId]);

  const formik = useFormik({
    initialValues: {
      attributes: product
        ? product?.attributes?.map((item) => item?.attribute_id)
        : [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (product) {
        try {
          let selectedattributesValues = selectedValues;
          if (goldCarate.length > 0) {
            selectedattributesValues = [
              ...selectedattributesValues,
              { attribute_id: 10, aValues: goldCarate },
            ];
          }
          const response = await post("/api/productAttributeValue", {
            attribute_and_values: JSON.stringify(selectedattributesValues),
            product_id: localStorage.getItem("product_id"),
          });
          router.refresh();
          !isLastStep && setActiveStep((cur) => cur + 1);
        } catch (error) {}
      }
    },
  });

  return (
    <div>
      <Formik>
        <Form>
          <div className="p-7 shadow-3xl rounded-2xl bg-white">
            <h3 className="text-xl mb-6 font-medium tracking-wide">
              Product: {product.product_name}
            </h3>
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <Typography>Attributes</Typography>
                  <ReactSelect
                    placeholder="Select Attributes"
                    isMulti
                    name="attributes"
                    options={productAttributesOptions}
                    // styles={style}
                    value={productAttributesOptions.filter((a) =>
                      selectedAttributes.includes(a.value)
                    )}
                    onChange={(e) => {
                      console.log("eonchange", e);
                      setSelectedAttributes(e.map((a) => a.value));
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </Form>
      </Formik>
      <div className="flex justify-between items-center">
        <Button onClick={handlePrev} type="button">
          Prev
        </Button>
        <Button
          onClick={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
