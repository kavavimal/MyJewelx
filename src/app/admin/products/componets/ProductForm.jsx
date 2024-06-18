"use client";
import {
  Alert,
  Button,
  Checkbox,
  IconButton,
  Input,
  Option,
  Select,
  Spinner,
  Step,
  Stepper,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Variation from "./Variation";
import { get, post, update } from "@/utils/api";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { productValidationSchema } from "@/schemas/ValidationSchema";
import { attributeIDs } from "@/utils/constants";
import ProductAttributeItem from "./ProductAttributeItem";

const ProductForm = ({
  product,
  categories,
  tags,
  productAttributes,
  countries,
  genders,
  patterns,
  collections,
  karats,
  asian,
  usSize,
}) => {
  const router = useRouter();

  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(() => {
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("activeStep");
      return savedStep !== null ? Number(savedStep) : 0;
    }
    return 0;
  });
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [statesOptions, setStatesOptions] = useState([]);
  const [productAttributeValues, setProductAttributeValues] = useState([]);
  const [variations, setVariations] = useState([]);
  const [open, setOpen] = useState(0);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [selectedProductAttributes, setSelectedProductAttributes] = useState(
    []
  );
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isGold, setIsGold] = useState(false);
  const [isAsian, setIsAsian] = useState(false);
  const [asianSizes, setAsianSizes] = useState([]);
  const [isUS, setIsUS] = useState(false);
  const [usSizes, setUsSizes] = useState([]);
  const [goldCarate, setGoldCarate] = useState([]);
  const [productData, setProductData] = useState(product ?? {});
  const [pricing, setPricing] = useState({});

  const getPricing = async () => {
    const data = await get("/api/pricing_history/latest");
    setPricing(data?.data?.latestPricing);
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleValueChange = (attributeId, newValue, isMultiple) => {
    // check if attribute material has value gold
    if (
      attributeId === attributeIDs.MATERIAL &&
      newValue?.value === attributeIDs.MATERIAL_GOLD
    ) {
      setIsGold(true);
    } else if (
      attributeId === attributeIDs.MATERIAL &&
      newValue?.value !== attributeIDs.MATERIAL_GOLD
    ) {
      setIsGold(false);
      setSelectedValues([
        ...selectedValues.filter(
          (a) => a.attribute_id !== attributeIDs.GOLDKARAT
        ),
      ]);
    }

    if (
      attributeId === attributeIDs.SIZE &&
      newValue?.value === attributeIDs.ASIAN
    ) {
      setIsAsian(true);
    } else if (
      attributeId === attributeIDs.SIZE &&
      newValue?.value !== attributeIDs.ASIAN
    ) {
      setIsAsian(false);
      setSelectedValues([
        ...selectedValues.filter(
          (a) => a.attribute_id !== attributeIDs.SIZE_ASIAN
        ),
      ]);
    }

    if (
      attributeId === attributeIDs.SIZE &&
      newValue?.value === attributeIDs.US
    ) {
      setIsUS(true);
    } else if (
      attributeId === attributeIDs.SIZE &&
      newValue?.value !== attributeIDs.US
    ) {
      setIsUS(false);
      setSelectedValues([
        ...selectedValues.filter(
          (a) => a.attribute_id !== attributeIDs.SIZE_US
        ),
      ]);
    }

    setSelectedValues((prevValues) => {
      let updatedValues = prevValues.map((value) => {
        if (value.attribute_id === attributeId) {
          return {
            ...value,
            aValues: isMultiple
              ? newValue.map((option) => option.value)
              : [newValue?.value],
            isMultiple,
          };
        }
        return value;
      });
      const existingIndex = updatedValues.findIndex(
        (value) => value.attribute_id === attributeId
      );

      if (existingIndex === -1) {
        updatedValues.push({
          attribute_id: attributeId,
          aValues: isMultiple
            ? newValue.map((option) => option.value)
            : [newValue?.value],
          isMultiple,
        });
      }
      // check if attribute material has value gold
      if (
        attributeId === attributeIDs.MATERIAL &&
        newValue?.value === attributeIDs.MATERIAL_GOLD
      ) {
        updatedValues.push({
          attribute_id: attributeIDs.GOLDKARAT,
          aValues: [],
          isMultiple: false,
        });
      } else if (
        attributeId === attributeIDs.MATERIAL &&
        newValue?.value !== attributeIDs.MATERIAL_GOLD
      ) {
        updatedValues = updatedValues.filter(
          (a) => a.attribute_id !== attributeIDs.GOLDKARAT
        );
      }

      // check if attribute size has value asian
      if (
        attributeId === attributeIDs.SIZE &&
        newValue?.value === attributeIDs.ASIAN
      ) {
        updatedValues.push({
          attribute_id: attributeIDs.SIZE_ASIAN,
          aValues: [],
          isMultiple: false,
        });
      } else if (
        attributeId === attributeIDs.SIZE &&
        newValue?.value !== attributeIDs.ASIAN
      ) {
        updatedValues = updatedValues.filter(
          (a) => a.attribute_id !== attributeIDs.SIZE_ASIAN
        );
      }

      // check if attribute size has value us
      if (
        attributeId === attributeIDs.SIZE &&
        newValue?.value === attributeIDs.US
      ) {
        updatedValues.push({
          attribute_id: attributeIDs.SIZE_US,
          aValues: [],
          isMultiple: false,
        });
      } else if (
        attributeId === attributeIDs.SIZE &&
        newValue?.value !== attributeIDs.US
      ) {
        updatedValues = updatedValues.filter(
          (a) => a.attribute_id !== attributeIDs.SIZE_US
        );
      }

      updatedValues = updatedValues.filter((attr) => {
        return attributes.includes(attr.attribute_id);
      });
      return updatedValues;
    });
  };

  const getTransformedValues = () => {
    return selectedValues
      .map((attr) => ({
        id: attr.attribute_id,
        isMultiple: attr.isMultiple,
        attribute: {
          name: productAttributes.find(
            (pa) => pa.attribute_id === attr.attribute_id
          )?.name,
          values: Array.isArray(attr.aValues)
            ? attr.aValues?.map((valueId) => {
                const valueObject = productAttributes
                  .find((pa) => pa.attribute_id === attr.attribute_id)
                  ?.values.find((v) => v.id === valueId);
                return {
                  name: valueObject?.name,
                  id: valueObject?.id,
                };
              })
            : attr.aValues,
        },
      }))
      .filter((attr) => attributes.includes(attr.id));
  };

  const style = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: "#9ca3af",
      backgroundColor: "#fff",
      padding: ".2rem",
      color: "#222",
      boxShadow: state.isFocused
        ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
        : "",
      ":hover": {
        borderColor: "#9ca3af",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#000" : "white",
      color: state.isSelected ? "white" : "#1E293B",
      borderRadius: ".5rem",
      ":hover": {
        backgroundColor: state.isSelected
          ? "#222"
          : "rgba(145, 158, 171, 0.16)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      padding: ".7rem",
      zIndex: 99,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "",
    }),
  };

  const patternOptions = patterns?.map((pattern) => ({
    value: pattern?.pattern_id,
    label: pattern?.name,
  }));

  const categoryOptions = categories
    .filter((category) => category.parent_id === null)
    ?.map((category) => ({
      value: category.category_id,
      label: category.name,
    }));

  const tagsOptions = tags?.map((tag) => ({
    value: tag?.tag_id,
    label: tag?.name,
  }));

  const productAttributesOptions = productAttributes
    ?.filter(
      (a) =>
        a.attribute_id !== attributeIDs.GOLDKARAT &&
        a.attribute_id !== attributeIDs.SIZE_ASIAN &&
        a.attribute_id !== attributeIDs.SIZE_US
    )
    .map((item) => ({
      value: item?.attribute_id,
      label: item?.name,
      id: item?.attribute_id,
    }));

  const gendersOptions = genders?.map((gender) => ({
    value: gender?.gender_id,
    label: gender?.name,
  }));

  const featuredCollectionOptions = collections?.map((collection) => ({
    value: collection?.collection_id,
    label: collection?.name,
  }));

  const karatOptions = karats?.map((karat) => ({
    value: karat?.id,
    label: karat?.name,
  }));

  const asianSizeOptions = asian.map((size) => ({
    value: size.id,
    label: size.name,
  }));

  const USSizeOptions = usSize.map((size) => ({
    value: size.id,
    label: size.name,
  }));

  const brandsOptions = [
    {
      value: "jimmy_choo",
      label: "Jimmy Choo",
    },
    {
      value: "manolo",
      label: "Manolo",
    },
    {
      value: "Prada",
      label: "Prada",
    },
    {
      value: "galiano",
      label: "Galiano",
    },
    {
      value: "louis vuitton",
      label: "Louis Vuitton",
    },
    {
      value: "stella_mccartney",
      label: "Stella McCartney",
    },
    {
      value: "donatella_versace",
      label: "Donatella Versace",
    },
    {
      value: "gucci",
      label: "Gucci",
    },
  ];

  const stylesOptions = [
    {
      value: "classic",
      label: "Classic",
    },
    {
      value: "modern",
      label: "Modern",
    },
    {
      value: "vintage",
      label: "Vintage",
    },
  ];

  const themeOptions = [
    {
      value: "nature_inspired",
      label: "Nature Inspired",
    },
    {
      value: "Floral",
      label: "Floral",
    },
    {
      value: "Celestial",
      label: "Celestial",
    },
  ];

  const trendsOptions = [
    {
      value: "color",
      label: "Color",
    },
    {
      value: "material",
      label: "Material",
    },
    {
      value: "size",
      label: "Size",
    },
  ];

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const formik = useFormik({
    initialValues: {
      product_name: product ? product?.product_name : "",
      category: product ? product?.category?.category_id : "",
      subCategory: product ? product?.subCategoryId : "",
      tags: product ? product?.tags?.map((item) => item?.tag_id) : [],
      country_id: product ? product?.country_id ?? "" : "",
      isOnlineBuyable: product ? product?.isOnlineBuyable : false,
      states: product ? product?.states[0]?.state_id ?? "" : "",
      status: product ? product?.status : "PUBLISHED",
      collections: product
        ? product?.collections?.map((item) => item?.collection_id)
        : [],
      patterns: product
        ? product?.patterns?.map((item) => item?.pattern_id)
        : [],
      genders: product ? product?.genders?.map((item) => item?.gender_id) : [],
      attributes: product
        ? product?.attributes?.map((item) => item?.attribute_id)
        : [],
    },

    enableReinitialize: true,
    validationSchema:
      activeStep === 0 || activeStep === 3 ? productValidationSchema : null,
    onSubmit: async (values) => {
      if (product) {
        if (activeStep === 0) {
          try {
            const response = await update(
              `/api/product/${product.product_id}`,
              {
                ...values,
                attributes: values.attributes.join(","),
                tags: values.tags.join(","),
                collections: values.collections.join(","),
                genders: values.genders.join(","),
                patterns: values.patterns.join(","),
              }
            );
            window.localStorage.setItem("product_id", product.product_id);
            router.refresh();
            !isLastStep && setActiveStep((cur) => cur + 1);
          } catch (error) {}
        }

        if (activeStep === 1) {
          try {
            let selectedattributesValues = selectedValues;
            if (
              goldCarate.length > 0 &&
              selectedattributesValues.find(
                (a) =>
                  a.attribute_id === attributeIDs.MATERIAL &&
                  a.aValues.includes(attributeIDs.MATERIAL_GOLD)
              )
            ) {
              selectedattributesValues = [
                ...selectedattributesValues?.filter(
                  (a) => a.attribute_id !== attributeIDs.GOLDKARAT
                ),
                { attribute_id: attributeIDs.GOLDKARAT, aValues: goldCarate },
              ];
            }

            if (
              asianSizes.length > 0 &&
              selectedattributesValues.find(
                (a) =>
                  a.attribute_id === attributeIDs.SIZE &&
                  a.aValues.includes(attributeIDs.ASIAN)
              )
            ) {
              selectedattributesValues = [
                ...selectedattributesValues?.filter(
                  (a) => a.attribute_id !== attributeIDs.SIZE_ASIAN
                ),
                { attribute_id: attributeIDs.SIZE_ASIAN, aValues: asianSizes },
              ];
            }

            if (
              usSizes.length > 0 &&
              selectedattributesValues.find(
                (a) =>
                  a.attribute_id === attributeIDs.SIZE &&
                  a.aValues.includes(attributeIDs.US)
              )
            ) {
              selectedattributesValues = [
                ...selectedattributesValues?.filter(
                  (a) => a.attribute_id !== attributeIDs.SIZE_US
                ),
                { attribute_id: attributeIDs.SIZE_US, aValues: usSizes },
              ];
            }

            const response = await post("/api/productAttributeValue", {
              attribute_and_values: JSON.stringify(selectedattributesValues),
              product_id: localStorage.getItem("product_id"),
            });

            const productData = await get(`/api/product/${product.product_id}`);
            setProductData(productData.data?.product);
            router.refresh();
            !isLastStep && setActiveStep((cur) => cur + 1);
          } catch (error) {
            console.log(error);
          }
        }

        if (activeStep === 2) {
          !isLastStep && setActiveStep((cur) => cur + 1);
        }

        if (activeStep === 3) {
          try {
            const response = await update(
              `/api/product/${product.product_id}`,
              {
                ...values,
                attributes: values.attributes.join(","),
                tags: values.tags.join(","),
                collections: values.collections.join(","),
                genders: values.genders.join(","),
                patterns: values.patterns.join(","),
              }
            );
            router.refresh();
            router.push(`/admin/products`);
            setActiveStep(0);
          } catch (error) {}
        }
      } else {
        if (activeStep === 0) {
          try {
            const response = await post("/api/product", {
              ...values,
              attributes: values.attributes.join(","),
              tags: values.tags.join(","),
              collections: values.collections.join(","),
              genders: values.genders.join(","),
              patterns: values.patterns.join(","),
            });

            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "product_id",
                response.data?.result?.product_id
              );
            }
            router.refresh();
            router.push(
              `/admin/products/edit/${response.data?.result?.product_id}`
            );
            !isLastStep && setActiveStep((cur) => cur + 1);
          } catch (error) {}
        }
      }
    },
  });

  useEffect(() => {
    setSubcategoryOptions(
      categories
        ?.filter((item) => item.parent_id === formik.values.category)
        .map((item) => ({ label: item.name, value: item.category_id }))
    );
  }, [formik.values.category]);

  useEffect(() => {
    setStatesOptions(
      countries?.find((c) => c.country_id === formik.values.country_id)?.states
    );
  }, [formik.values.country_id]);

  useEffect(() => {
    if (Object.keys(productData).length > 0) {
      let attributes = [];
      let variations = [];

      productData.ProductAttributeValue.forEach((item) => {
        if (!attributes.includes(item.attribute_id)) {
          attributes.push(item.attribute_id);
        }
      });

      setAttributes(attributes);
      const newAttributeValues = productData.ProductAttributeValue.reduce(
        (acc, item) => {
          const existingIndex = acc.findIndex(
            (value) => value.attribute_id === item.attribute_id
          );

          if (existingIndex === -1) {
            acc.push({
              attribute_id: item.attribute_id,
              aValues: [item.attributeValue_id],
            });
          } else {
            if (!acc[existingIndex].aValues.includes(item.attributeValue_id)) {
              acc[existingIndex].aValues.push(item.attributeValue_id);
            }
          }

          return acc;
        },
        []
      );
      // check if gold caret is selected
      const goldCaretItem = newAttributeValues.find(
        (a) => a.attribute_id === attributeIDs.GOLDKARAT
      );

      if (goldCaretItem) {
        setIsGold(true);
        setGoldCarate(goldCaretItem.aValues);
      }

      const asianItem = newAttributeValues.find(
        (a) => a.attribute_id === attributeIDs.SIZE_ASIAN
      );

      if (asianItem) {
        setIsAsian(true);
        setAsianSizes(asianItem.aValues);
      }

      const usItems = newAttributeValues.find(
        (a) => a.attribute_id === attributeIDs.SIZE_US
      );

      if (usItems) {
        setIsUS(true);
        setUsSizes(usItems.aValues);
      }

      setSelectedValues(newAttributeValues);

      variations = productData.variations;
      setVariations(variations);
    } else {
      if (product) {
        let variation = [];
        variation = product.variations;
        setVariations(variation);
      }
    }
  }, [productData, product]);

  useEffect(() => {
    if (product) {
      setSelectedProductAttributes(() => {
        const attributeIds = product.attributes.map(
          (attr) => attr.attribute_id
        );

        return productAttributesOptions.filter((option) =>
          attributeIds.includes(option.id)
        );
      });
    }
  }, [formik.values.attributes]);

  useEffect(() => {
    setSelectedAttributes(getTransformedValues());
  }, [selectedValues, attributes, productData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeStep", activeStep);
    }
  }, [activeStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStep = window.localStorage.getItem("activeStep");
      if (savedStep !== null) {
        setActiveStep(Number(savedStep));
      }
    }
    setLoading(false);

    getPricing();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex items-center intro-y">
        <h2 className="text-2xl font-semibold mb-10">
          {product ? "Edit" : "Save"} Product
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
            <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
            <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
            <Step className="h-4 w-4" onClick={() => setActiveStep(3)} />
          </Stepper>
        </div>

        {activeStep === 0 && (
          <Formik>
            <Form>
              <div className="grid items-start grid-cols-2 gap-5 p-7 shadow-3xl rounded-2xl bg-white">
                <div className="col-span-2">
                  <h3 className="text-xl font-medium tracking-wide">
                    Basic Details
                  </h3>
                </div>

                <div>
                  <ReactSelect
                    label="Category"
                    options={categoryOptions}
                    styles={style}
                    placeholder="Category"
                    value={
                      categoryOptions.find(
                        (options) => options.value === formik.values.category
                      ) ?? ""
                    }
                    name="category"
                    onChange={({ value }) => {
                      formik.setFieldValue("category", value);
                    }}
                  />
                  {formik.errors.category && formik.touched.category && (
                    <p className="text-red-500">{formik.errors.category}</p>
                  )}
                </div>

                <div>
                  <ReactSelect
                    options={subcategoryOptions}
                    styles={style}
                    placeholder="Subcategory"
                    name="subCategory"
                    value={
                      subcategoryOptions.find(
                        (options) => options.value === formik.values.subCategory
                      ) ?? ""
                    }
                    onChange={({ value }) => {
                      formik.setFieldValue("subCategory", value);
                    }}
                  />

                  {formik.errors.subCategory && formik.touched.subCategory && (
                    <p className="text-red-500">{formik.errors.subCategory}</p>
                  )}
                </div>

                <div>
                  <Input
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                    label="Product Name"
                    name="product_name"
                    labelProps={{
                      className: "font-emirates",
                    }}
                    size="lg"
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.product_name && formik.touched.product_name
                    }
                  />
                </div>

                <div>
                  <ReactSelect
                    isMulti
                    onChange={(options) => {
                      formik.setFieldValue(
                        "attributes",
                        options.map((option) => option.value)
                      );
                      setSelectedProductAttributes(options);
                    }}
                    options={productAttributesOptions}
                    value={
                      productAttributesOptions.filter((option) =>
                        formik.values.attributes.includes(option.value)
                      ) ?? []
                    }
                    styles={style}
                    name="attributes"
                    placeholder="Attributes"
                  />

                  {formik.errors.attributes && formik.touched.attributes && (
                    <p className="text-red-500">{formik.errors.attributes}</p>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        )}

        {activeStep === 1 && (
          <>
            {product &&
              product?.ProductAttributeValue &&
              product?.ProductAttributeValue.length > 0 && (
                <Alert
                  color="red"
                  open={true}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  }
                >
                  If You Change Attributes, Relations Will Be Affected By It
                </Alert>
              )}

            <Formik>
              <Form>
                <div className="p-7 shadow-3xl rounded-2xl bg-white">
                  <h3 className="text-xl mb-6 font-medium tracking-wide">
                    Add Attributes : {product?.product_name ?? ""}
                  </h3>

                  <div className="flex flex-col gap-1">
                    <Typography>Attributes</Typography>
                    <ReactSelect
                      isMulti
                      name="attributes"
                      options={selectedProductAttributes}
                      styles={style}
                      value={selectedProductAttributes.filter((a) =>
                        attributes.includes(a.value)
                      )}
                      onChange={(e) => {
                        setAttributes(e.map((a) => a.value));
                        setSelectedValues((prev) => {
                          return prev.filter((p) => {
                            return e
                              .map((a) => a.value)
                              .includes(p.attribute_id);
                          });
                        });
                      }}
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-5">
                    {/* filter attribute to restrict goldcaret attribute */}
                    {productAttributes
                      .filter((a) => {
                        return (
                          a.attribute_id !== attributeIDs.GOLDKARAT &&
                          a.attribute_id !== attributeIDs.SIZE_ASIAN &&
                          a.attribute_id !== attributeIDs.SIZE_US
                        );
                      })
                      .map((productAttribute, index) => {
                        const options = productAttribute?.values.map(
                          (value) => ({
                            value: value?.id,
                            label: value?.name,
                          })
                        );

                        const values =
                          selectedValues.find(
                            (v) =>
                              v.attribute_id === productAttribute.attribute_id
                          )?.aValues ?? [];

                        return (
                          <ProductAttributeItem
                            attributes={attributes}
                            productAttribute={productAttribute}
                            options={options}
                            style={style}
                            values={values}
                            handleValueChange={handleValueChange}
                            formik={formik}
                            isGold={isGold}
                            karatOptions={karatOptions}
                            goldCarate={goldCarate}
                            setGoldCarate={setGoldCarate}
                            asianSizeOptions={asianSizeOptions}
                            asianSizes={asianSizes}
                            setAsianSizes={setAsianSizes}
                            USSizeOptions={USSizeOptions}
                            usSizes={usSizes}
                            setUsSizes={setUsSizes}
                            isAsian={isAsian}
                            isUS={isUS}
                          />
                        );
                      })}
                  </div>
                </div>
              </Form>
            </Formik>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Product Details : {product?.product_name ?? ""}
              </h3>
              <div className="w-full flex flex-col gap-5">
                <div className="w-auto flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        productAttributeValues &&
                        productAttributeValues.length > 0
                      ) {
                        setVariations([
                          ...variations,
                          {
                            name: productAttributeValues
                              .filter(Boolean)
                              ?.map((pa) => pa?.name)
                              .join(", "),
                            productAttributeValues:
                              productAttributeValues.filter(Boolean),
                          },
                        ]);
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-5">
                  {selectedAttributes &&
                    selectedAttributes.length > 0 &&
                    selectedAttributes.map(
                      (attribute, index) =>
                        attribute?.attribute?.values &&
                        attribute?.attribute?.values.length > 0 && (
                          <div className="w-[32%]" key={index}>
                            <Select
                              label={attribute?.attribute?.name}
                              onChange={(value) => {
                                let id = product?.ProductAttributeValue.find(
                                  (pa) => {
                                    return (
                                      pa?.attribute_id === attribute.id &&
                                      pa.attributeValue_id === value?.id
                                    );
                                  }
                                )?.productAttributeValue_id;
                                if (id) {
                                  setProductAttributeValues((prev) => {
                                    let attributeValues = [...prev];
                                    attributeValues[index] = {
                                      productAttributeValue_id: id,
                                      name: `${attribute?.attribute?.name} : ${value?.name}`,
                                      id: value?.id,
                                      attributeId: attribute.id,
                                      attributeValueName: value?.name,
                                    };
                                    return attributeValues;
                                  });
                                }
                              }}
                            >
                              {attribute?.attribute?.values.map((value, i) => (
                                <Option key={i} value={value ?? ""}>
                                  {value?.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        )
                    )}
                </div>
              </div>
              {variations?.map((variation, index) => (
                <Variation
                  key={index}
                  index={index}
                  open={open}
                  handleOpen={handleOpen}
                  variation={variation}
                  productAttributeValues={productAttributeValues.filter(
                    Boolean
                  )}
                  variations={variations}
                  setVariations={setVariations}
                  pricing={pricing}
                />
              ))}
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <Formik>
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid items-start grid-cols-2 gap-5 p-7 shadow-3xl rounded-2xl bg-white">
                  <div className="col-span-2">
                    <h3 className="text-xl font-medium tracking-wide">
                      Additional Attributes & Tags
                    </h3>
                  </div>
                  <div className="col-span-2">
                    <Checkbox
                      label="Online Buyable"
                      name="isOnlineBuyable"
                      checked={formik.values.isOnlineBuyable ?? false}
                      onChange={formik.handleChange}
                      color={formik.errors.isOnlineBuyable ? "red" : "black"}
                    />
                  </div>

                  <div>
                    {countries?.length > 0 && (
                      <Select
                        label="Made in Country"
                        size="lg"
                        name="country_id"
                        error={
                          formik.errors.country_id && formik.touched.country_id
                        }
                        value={formik.values.country_id ?? ""}
                        onChange={(value) => {
                          formik.setFieldValue("country_id", value);
                        }}
                      >
                        {countries.map((country) => (
                          <Option
                            key={country.country_id}
                            value={country.country_id}
                          >
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </div>

                  <div>
                    <Select
                      label="State"
                      size="lg"
                      name="states"
                      error={formik.errors.states && formik.touched.states}
                      value={formik.values.states}
                      onChange={(value) => {
                        formik.setFieldValue("states", value);
                      }}
                    >
                      {statesOptions && statesOptions.length > 0 ? (
                        statesOptions.map((state) => (
                          <Option key={state.state_id} value={state.state_id}>
                            {state.name}
                          </Option>
                        ))
                      ) : (
                        <Option disabled>No states</Option>
                      )}
                    </Select>
                  </div>

                  <div>
                    <Typography>Tags</Typography>
                    <ReactSelect
                      isMulti
                      onChange={(options) =>
                        formik.setFieldValue(
                          "tags",
                          options.map((option) => option.value)
                        )
                      }
                      options={tagsOptions}
                      name="tags"
                      value={
                        tagsOptions.filter((option) =>
                          formik.values.tags.includes(option.value)
                        ) ?? []
                      }
                      styles={style}
                      placeholder="Tags"
                    />
                  </div>

                  <div>
                    <Typography>Featured Collections</Typography>
                    <ReactSelect
                      isMulti
                      options={featuredCollectionOptions}
                      styles={style}
                      value={
                        featuredCollectionOptions.filter((option) =>
                          formik.values.collections.includes(option.value)
                        ) ?? []
                      }
                      name="collections"
                      onChange={(options) =>
                        formik.setFieldValue(
                          "collections",
                          options.map((option) => option.value)
                        )
                      }
                      placeholder="Featured Collections"
                    />
                    {formik.errors.collections &&
                      formik.touched.collections && (
                        <p className="text-red-500">
                          {formik.errors.collections}
                        </p>
                      )}
                  </div>

                  <div>
                    <Typography>Pattern</Typography>
                    <ReactSelect
                      isMulti
                      options={patternOptions}
                      value={
                        patternOptions.filter((option) =>
                          formik.values.patterns.includes(option.value)
                        ) ?? []
                      }
                      onChange={(options) =>
                        formik.setFieldValue(
                          "patterns",
                          options.map((option) => option.value)
                        )
                      }
                      styles={style}
                      placeholder="Pattern"
                    />

                    {formik.errors.patterns && formik.touched.patterns && (
                      <p className="text-red-500">{formik.errors.patterns}</p>
                    )}
                  </div>

                  <div>
                    <Typography>Gender</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Gender"
                      name="genders"
                      options={gendersOptions}
                      value={
                        gendersOptions.filter((option) =>
                          formik.values.genders.includes(option.value)
                        ) ?? []
                      }
                      onChange={(options) =>
                        formik.setFieldValue(
                          "genders",
                          options.map((option) => option.value)
                        )
                      }
                      styles={style}
                    />
                  </div>

                  <div>
                    <Typography>Brand</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Brand"
                      name="brand"
                      options={brandsOptions}
                      styles={style}
                    />
                  </div>

                  <div>
                    <Typography>Style</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Style"
                      name="style"
                      options={stylesOptions}
                      styles={style}
                    />
                  </div>

                  <div>
                    <Typography>Theme</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Theme"
                      name="theme"
                      options={themeOptions}
                      styles={style}
                    />
                  </div>

                  <div>
                    <Typography>Trends</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Trends"
                      name="trends"
                      options={trendsOptions}
                      styles={style}
                    />
                  </div>
                </div>
              </Form>
            </Formik>
          </>
        )}

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
    </div>
  );
};

export default ProductForm;
