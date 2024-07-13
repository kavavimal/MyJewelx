"use client";
import React, { useEffect, useState } from "react";
import Variation from "./Variation";
import { getProduct } from "@/actions/product";
import LoadingDots from "@/components/loading-dots";
import { Option, Select, Button } from "@material-tailwind/react";
import { ATTRIBUTE_ORDER, attributeIDs } from "@/utils/constants";
import { transformAttributeName } from "@/utils/helper";

const buildCustomOrder = (groupedData, defaultOrder) => {
  return defaultOrder.filter((attributeId) =>
    groupedData.hasOwnProperty(attributeId)
  );
};
const AttributeSelectBoxes = ({ groupedData, pavValues, setPavValues }) => {
  const customOrder = buildCustomOrder(groupedData, ATTRIBUTE_ORDER);

  return (
    <div className="w-full flex flex-row flex-wrap gap-2">
      {customOrder.map((attributeId) => {
        const attributeGroup = groupedData[attributeId] || false;
        if (!attributeGroup) return null;

        const attributeName = attributeGroup[0].attribute.name;
        return (
          <div className="w-[24%]" key={attributeId}>
            <Select
              label={attributeName}
              id={`attribute-${attributeId}`}
              name={attributeName}
              value={pavValues?.[attributeId]}
              onChange={(value) => {
                setPavValues((prev) => {
                  return { ...prev, [attributeId]: value };
                });
              }}
            >
              {attributeGroup.map((item) => (
                <Option
                  key={item.attributeValue.id}
                  value={item.attributeValue.id}
                >
                  {item.attributeValue.name}
                </Option>
              ))}
            </Select>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default function ProductVariationsStepWrap({ product_id, pricing }) {
  const [productData, setProductData] = useState();
  const [productAttributeValueData, setProductAttributeValueData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pavValues, setPavValues] = useState();
  const [variations, setVariations] = useState([]);
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const fetchProduct = async () => {
    setIsLoading(true);
    const pData = await getProduct(product_id);
    if (pData.productData) {
      setProductData(pData.productData);
      if (pData.productData?.variations) {
        setVariations(pData.productData?.variations);
      }
      const groupedData = pData.productData.ProductAttributeValue.reduce(
        (acc, item) => {
          const key = item.attribute_id;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        },
        {}
      );

      let initPAValues = {};
      for (const attributeId in groupedData) {
        const attributeGroup = groupedData[attributeId];
        if (attributeGroup.length === 1) {
          initPAValues[attributeId] = attributeGroup[0]?.attributeValue?.id;
        }
      }
      if (initPAValues) {
        setPavValues(initPAValues);
      }

      setProductAttributeValueData(groupedData);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  const updateVariation = async () => {
    fetchProduct();
  };

  const onAddButton = () => {
    if (pavValues) {
      let groupedData = productAttributeValueData;
      const customOrder = buildCustomOrder(groupedData, ATTRIBUTE_ORDER);
      let names = [];
      let variationSelected = [];
      customOrder.map((attributeId) => {
        const attributeGroup = groupedData[attributeId] || false;
        const selectedAttributeValue = attributeGroup.find(
          (ag) => ag.attributeValue.id === pavValues[attributeId]
        );
        const attributeValueName = selectedAttributeValue.attributeValue.name;
        const attributeName = attributeGroup[0].attribute.name;

        variationSelected.push({
          productAttributeValue_id:
            selectedAttributeValue?.productAttributeValue_id,
          id: selectedAttributeValue?.attributeValue_id,
          attributeId: selectedAttributeValue?.attribute_id,
          name: `${attributeName} : ${attributeValueName}`,
          attributeValueName: attributeValueName,
        });
        if (
          selectedAttributeValue.attributeValue_id !==
            attributeIDs.MATERIAL_GOLD &&
          selectedAttributeValue?.attribute_id !== attributeIDs.SIZE
        ) {
          let fname = attributeName;
          if (selectedAttributeValue?.attribute_id === attributeIDs.GOLDKARAT) {
            fname = "Gold";
          } else if (
            selectedAttributeValue?.attribute_id === attributeIDs.SIZE_US
          ) {
            fname = "Size: US";
          } else if (
            selectedAttributeValue?.attribute_id === attributeIDs.SIZE_ASIAN
          ) {
            fname = "Size: ASIAN";
          }
          names.push(`${fname}: ${transformAttributeName(attributeValueName)}`);
        }
      });

      setVariations([
        ...variations,
        {
          name: names.join(", "),
          productAttributeValues: variationSelected,
        },
      ]);
    }
  };

  return (
    <div className="p-7 shadow-3xl rounded-2xl bg-white">
      <div className="mb-6">
        <h3 className="text-xl font-medium tracking-wide">
          Product Details :{productData?.product_name ?? ""}
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <LoadingDots size="6" />{" "}
            </div>
          ) : (
            ""
          )}
        </h3>
      </div>
      {!isLoading && productAttributeValueData ? (
        <AttributeSelectBoxes
          groupedData={productAttributeValueData}
          pavValues={pavValues}
          setPavValues={setPavValues}
        />
      ) : (
        ""
      )}
      <div className="flex justify-end items-center">
        <Button type="button" disabled={isLoading} onClick={onAddButton}>
          Add
        </Button>
      </div>

      {variations?.map((variation, index) => (
        <Variation
          key={index}
          index={index}
          open={open}
          handleOpen={handleOpen}
          variation={variation}
          productAttributeValues={variation.productAttributeValues}
          variations={variations}
          setVariations={updateVariation}
          pricing={pricing}
        />
      ))}
    </div>
  );
}
