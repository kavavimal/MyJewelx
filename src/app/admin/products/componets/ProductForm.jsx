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
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Variation from "./Variation";
import { get, post, update } from "@/utils/api";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  additionalValidationSchema,
  productValidationSchema,
} from "@/schemas/ValidationSchema";
import { attributeIDs, theme } from "@/utils/constants";
import ProductAttributeItem from "./ProductAttributeItem";
import { Router } from "next/router";
import { AcountType, CharsType } from "@prisma/client";
import Link from "next/link";
import ProductVariationsStepWrap from "./ProductVariationsStepWrap";
import { getProduct } from "@/actions/product";
import AsignProduct from "./AsignProduct";
import { useUserStore } from "@/contexts/userStore";

const lables = [
  {
    value: "Popular",
    label: "Popular",
  },
  {
    value: "Featured",
    label: "Featured",
  },
  {
    value: "Trending",
    label: "Trending",
  },
  {
    value: "Limited-Editions",
    label: "Limited Editions",
  },
  {
    value: "Gift-Idea",
    label: "Gift Idea",
  },
  {
    value: "Holiday-Special",
    label: "Holiday Special",
  },
];

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
  brands,
  styles,
  themes,
  trends,
  allproducts,
}) => {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(product ?? {});
  const [attributes, setAttributes] = useState([attributeIDs.MATERIAL]);
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
  const [productBrand, setProductBrand] = useState([]);
  const [productStyle, setProductStyle] = useState([]);
  const [productTheme, setProductTheme] = useState([]);
  const [productTrend, setProductTrend] = useState([]);
  const [productLables, setProductLables] = useState([]);

  const { user } = useUserStore((state) => state);

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
    return selectedValues.map((attr) => ({
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
    }));
  };

  const style = {
    control: (provided) => ({
      ...provided,
      borderWidth: "1px",
      backgroundColor: "#fff",
      color: "#222",
      padding: 2,
      borderRadius: 4,
    }),

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderRadius: "4px",
      borderColor: "#F0AE11",
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

  const sortedProductAttributes = [...productAttributes].sort((a, b) => {
    if (a.name === "Material") return -1;
    if (b.name === "Material") return 1;
    return 0;
  });

  let productAttributesOptions = sortedProductAttributes
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

  const materialAttribute = productAttributesOptions?.find(
    (a) => a.label === "Material"
  );
  const otherAttributes = productAttributesOptions?.filter(
    (a) => a.label !== "Material"
  );

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

  const brandsOptions = brands?.map((brand) => ({
    value: brand?.chars_id,
    label: brand?.name,
  }));

  const stylesOptions = styles?.map((style) => ({
    value: style?.chars_id,
    label: style?.name,
  }));

  const themeOptions = themes?.map((theme) => ({
    value: theme?.chars_id,
    label: theme?.name,
  }));

  const trendsOptions = trends?.map((trend) => ({
    value: trend?.chars_id,
    label: trend?.name,
  }));

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
      status: product ? product?.status : "DRAFT",
      collections: product
        ? product?.collections?.map((item) => item?.collection_id)
        : [],
      patterns: product
        ? product?.patterns?.map((item) => item?.pattern_id)
        : [],
      genders: product ? product?.genders?.map((item) => item?.gender_id) : [],
      attributes: product
        ? product?.attributes?.map((item) => item?.attribute_id)
        : [attributeIDs.MATERIAL],
      offline_reason: product ? product?.offline_reason ?? "" : "",
      delivery_includes: product ? product?.delivery_includes ?? "" : "",
      return_policy: product ? product?.return_policy ?? "" : "",
      purchase_note: product ? product?.purchase_note ?? "" : "",
      relatedProducts: product
        ? product?.relatedProducts?.map((item) => item?.relatedProductId)
        : [],
    },

    enableReinitialize: true,
    validationSchema:
      activeStep === 0
        ? productValidationSchema
        : activeStep === 3
        ? additionalValidationSchema
        : null,
    onSubmit: async (values) => {
      if (product) {
        if (activeStep === 0) {
          try {
            const response = await update(
              `/api/product/${product.product_id}`,
              {
                product_name: values.product_name,
                status: values.status,
                attributes: values.attributes.join(","),
                category: values.category,
                subCategory: values.subCategory,
                slug: "basic_details",
              }
            );

            const productRes = await getProduct(product.product_id);
            setCurrentProduct(productRes?.productData);
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

            const productData = await get(
              `/api/product/${product.product_id}/attributes`
            );
            setProductData(productData.data?.product);
            const productRes = await getProduct(product.product_id);
            setCurrentProduct(productRes?.productData);
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
                slug: "additional_tags_attributes",
                return_policy: values.return_policy,
                purchase_note: values.purchase_note,
                delivery_includes: values.delivery_includes,
                country_id: values.country_id,
                tags: values.tags.join(","),
                isOnlineBuyable: values.isOnlineBuyable,
                collections: values.collections.join(","),
                patterns: values.patterns.join(","),
                states: values.states,
                genders: values.genders.join(","),
                offline_reason: values.offline_reason,
                relatedProducts: values.relatedProducts.join(","),
                characteristics: [
                  productBrand,
                  productStyle,
                  productTheme,
                  productTrend,
                ]
                  .flat()
                  .join(","),
                lables: productLables.join(","),
              }
            );
            router.push(`/admin/products`);
            router.refresh();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if (activeStep === 0) {
          try {
            setLoading(true);
            const response = await post("/api/product", {
              product_name: values.product_name,
              status: values.status,
              attributes: values.attributes.join(","),
              category: values.category,
              subCategory: values.subCategory,
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
          } catch (error) {
          } finally {
            setLoading(false);
          }
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
      countries?.find((c) => c.country_id === formik.values.country_id)
        ?.states ?? []
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

    if (product) {
      let themes = [];
      let styles = [];
      let brands = "";
      let trends = [];
      let variation = [];
      let labels = [];
      variation = product.variations;
      setVariations(variation);

      if (product.productChars?.length > 0 || product.productChars) {
        product.productChars.forEach((element) => {
          if (element.characteristic?.chars_type === CharsType.THEME) {
            themes.push(element.chars_id);
          }

          if (element.characteristic?.chars_type === CharsType.STYLE) {
            styles.push(element.chars_id);
          }

          if (element.characteristic?.chars_type === CharsType.BRAND) {
            brands = element.chars_id;
          }

          if (element.characteristic?.chars_type === CharsType.TREND) {
            trends.push(element.chars_id);
          }

          setProductBrand(brands);
          setProductStyle(styles);
          setProductTheme(themes);
          setProductTrend(trends);
        });
      } else {
        setProductBrand(brands);
        setProductStyle(styles);
        setProductTheme(themes);
        setProductTrend(trends);
      }

      if (product.labels) {
        labels = product?.labels.split(",");
        setProductLables(labels);
      }
    }
  }, [productData, product]);

  useEffect(() => {
    if (product) {
      setAttributes(formik.values.attributes);
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
      <div className="flex items-center intro-y justify-between mb-10">
        <h2 className="text-2xl font-semibold">
          {product ? "Edit" : "Save"} Product
        </h2>
        <Button
          onClick={() => router.back()}
          variant="outlined"
          className="font-emirates"
        >
          Back
        </Button>
      </div>
      <div>
        <AsignProduct id={product?.product_id} product={product} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="mb-20">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
            lineClassName="bg-[#E6E6E6]"
            activeLineClassName="bg-primary-200"
          >
            <Step
              onClick={() => setActiveStep(0)}
              activeClassName="bg-primary-200 text-black"
              completedClassName="bg-primary-200 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinejoin="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem] left-0 w-max text-start">
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Basic Details
                </Typography>
              </div>
            </Step>
            <Step
              onClick={() => setActiveStep(1)}
              activeClassName="bg-primary-200 text-black"
              completedClassName="bg-primary-200 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinejoin="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Attributes
                </Typography>
              </div>
            </Step>
            <Step
              onClick={() => setActiveStep(2)}
              activeClassName="bg-primary-200 text-black"
              completedClassName="bg-primary-200 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinejoin="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Product Details
                </Typography>
              </div>
            </Step>
            <Step
              onClick={() => setActiveStep(3)}
              activeClassName="bg-primary-200 text-black"
              completedClassName="bg-primary-200 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinejoin="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <div className="absolute right-0 -bottom-[2.5rem] w-max text-end">
                <Typography
                  color={activeStep === 3 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Additional Tags & Attributes
                </Typography>
              </div>
            </Step>
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
                    theme={theme}
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
                    theme={theme}
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

                  {formik.errors.product_name &&
                    formik.touched.product_name && (
                      <p className="text-red-500">
                        {formik.errors.product_name}
                      </p>
                    )}
                </div>

                <div>
                  <ReactSelect
                    isMulti
                    onChange={(options) => {
                      formik.setFieldValue(
                        "attributes",
                        options.map((option) => option.value)
                      );
                      // setSelectedProductAttributes(options);
                      setAttributes(options.map((option) => option.value));
                    }}
                    theme={theme}
                    styles={style}
                    options={productAttributesOptions}
                    value={
                      productAttributesOptions.filter((option) =>
                        formik.values.attributes.includes(option.value)
                      ) ?? []
                    }
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
            {currentProduct &&
              currentProduct?.ProductAttributeValue &&
              currentProduct?.ProductAttributeValue.length > 0 && (
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

                  {/* <div className="flex flex-col gap-1">
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
                  </div> */}

                  <div className="mt-5 flex flex-col gap-5">
                    {/* filter attribute to restrict goldcaret attribute */}
                    {sortedProductAttributes
                      .filter((a) => {
                        return (
                          a.attribute_id !== attributeIDs.GOLDKARAT &&
                          a.attribute_id !== attributeIDs.SIZE_ASIAN &&
                          a.attribute_id !== attributeIDs.SIZE_US &&
                          currentProduct?.attributes?.find(
                            (pa) => pa.attribute_id === a.attribute_id
                          )
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
                            key={index}
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
          <ProductVariationsStepWrap
            product_id={product.product_id}
            pricing={pricing}
          />
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

                  {!formik.values.isOnlineBuyable && (
                    <div className="col-span-2">
                      <Textarea
                        label="Remarks"
                        name="offline_reason"
                        className="min-h-[50px]"
                        value={formik.values.offline_reason ?? ""}
                        onChange={formik.handleChange}
                      />
                    </div>
                  )}

                  <div>
                    {countries?.length > 0 && (
                      <Select
                        label="Made in"
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
                    {formik.errors.country_id && formik.touched.country_id && (
                      <p className="text-red-500">{formik.errors.country_id}</p>
                    )}
                  </div>

                  <div>
                    {statesOptions && statesOptions.length > 0 && (
                      <Select
                        label="State"
                        size="lg"
                        name="states"
                        error={formik.errors.states && formik.touched.states}
                        onChange={(value) => {
                          formik.setFieldValue("states", value);
                        }}
                        value={formik.values.states ?? ""}
                      >
                        {statesOptions.map((state) => (
                          <Option key={state.state_id} value={state.state_id}>
                            {state.name}
                          </Option>
                        ))}
                      </Select>
                    )}

                    {!statesOptions ||
                      (statesOptions.length === 0 && (
                        <Select label="State" size="lg">
                          <Option value="No State" disabled>
                            No State
                          </Option>
                        </Select>
                      ))}

                    {formik.errors.states && formik.touched.states && (
                      <p className="text-red-500">{formik.errors.states}</p>
                    )}
                  </div>

                  <div>
                    <Typography>Tags</Typography>
                    <ReactSelect
                      isMulti
                      theme={theme}
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
                      theme={theme}
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
                      theme={theme}
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
                      theme={theme}
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
                      placeholder="Brand"
                      theme={theme}
                      name="brand"
                      options={brandsOptions}
                      styles={style}
                      value={brandsOptions.find((option) => {
                        return productBrand === option.value;
                      })}
                      onChange={({ value }) => setProductBrand(value)}
                    />
                  </div>

                  <div>
                    <Typography>Style</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Style"
                      name="style"
                      options={stylesOptions}
                      theme={theme}
                      styles={style}
                      value={stylesOptions.filter((option) =>
                        productStyle.includes(option.value)
                      )}
                      onChange={(options) =>
                        setProductStyle(options.map((option) => option.value))
                      }
                    />
                  </div>

                  <div>
                    <Typography>Theme</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Theme"
                      theme={theme}
                      name="theme"
                      options={themeOptions}
                      styles={style}
                      value={themeOptions.filter((option) =>
                        productTheme.includes(option.value)
                      )}
                      onChange={(options) =>
                        setProductTheme(options.map((option) => option.value))
                      }
                    />
                  </div>

                  <div>
                    <Typography>Trends</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Trends"
                      name="trends"
                      theme={theme}
                      options={trendsOptions}
                      styles={style}
                      value={trendsOptions.filter((option) =>
                        productTrend.includes(option.value)
                      )}
                      onChange={(options) =>
                        setProductTrend(options.map((option) => option.value))
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Textarea
                      label="Delivery Includes"
                      name="delivery_includes"
                      value={formik.values.delivery_includes}
                      onChange={formik.handleChange}
                      error={
                        formik?.errors?.delivery_includes &&
                        formik?.touched?.delivery_includes
                      }
                    />
                    {formik?.errors?.delivery_includes &&
                      formik?.touched?.delivery_includes && (
                        <p className="text-red-500 text-xs">
                          {formik.errors.delivery_includes}
                        </p>
                      )}
                  </div>
                  <div className="col-span-2">
                    <Textarea
                      label="Return Policy"
                      name="return_policy"
                      className="min-h-[50px]"
                      value={formik.values.return_policy ?? ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik?.errors?.return_policy &&
                        formik?.touched?.return_policy
                      }
                    />
                    {formik?.errors?.return_policy &&
                      formik?.touched?.return_policy && (
                        <p className="text-red-500 text-xs">
                          {formik.errors.return_policy}
                        </p>
                      )}
                  </div>
                  <div className="col-span-2">
                    <Textarea
                      label="Purchase Notes"
                      name="purchase_note"
                      className="min-h-[50px]"
                      onBlur={formik.handleBlur}
                      value={formik.values.purchase_note ?? ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div>
                    <Typography>Related products</Typography>
                    <ReactSelect
                      isMulti
                      placeholder="Related Products"
                      theme={theme}
                      name="relatedProducts"
                      options={allproducts
                        .filter((p) => p.product_id !== product.product_id)
                        ?.map((p) => {
                          return { label: p.product_name, value: p.product_id };
                        })}
                      styles={style}
                      value={allproducts
                        .filter((p) => p.product_id !== product.product_id)
                        ?.map((p) => {
                          return { label: p.product_name, value: p.product_id };
                        })
                        ?.filter((option) =>
                          formik.values.relatedProducts.includes(option.value)
                        )}
                      onChange={(options) =>
                        formik.setFieldValue(
                          "relatedProducts",
                          options.map((option) => option.value)
                        )
                      }
                    />
                  </div>
                  {user?.role?.role_name === AcountType.ADMIN && (
                    <div>
                      <Typography>Label Your List</Typography>
                      <ReactSelect
                        isMulti
                        options={lables}
                        value={lables.filter((label) =>
                          productLables.includes(label.value)
                        )}
                        onChange={(options) => {
                          setProductLables(
                            options?.map((option) => option?.value)
                          );
                        }}
                        styles={style}
                        theme={theme}
                        menuPortalTarget={
                          typeof window !== "undefined" && document.body
                        }
                      />
                    </div>
                  )}
                </div>
              </Form>
            </Formik>
          </>
        )}

        <div
          className={`flex ${
            activeStep !== 0 ? "justify-between" : "justify-end"
          } items-center`}
        >
          {activeStep !== 0 && (
            <Button onClick={handlePrev} type="button">
              Prev
            </Button>
          )}
          <Button
            onClick={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            type="button"
          >
            {activeStep === 3 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
