import Paragraph from "@/components/Paragraph";
import { ATTRIBUTE_ORDER, attributeIDs } from "@/utils/constants";
import { transformAttributeName } from "@/utils/helper";
import { useEffect, useState } from "react";
import AttributeRadioButton from "./AttributeRadioButton";

export default function ProductAttributeSelections({
  product,
  setVariation,
  variation,
  selectedOptions,
  filteredAttributes,
}) {
  const [selectedOption, setSelectedOption] = useState(selectedOptions);

  function findVariation(variations, selectedAttributes) {
    return variations.find((variation) =>
      selectedAttributes.every((selectedAttr) =>
        variation.productAttributeValues.some(
          (attrValue) =>
            Number(attrValue.productAttributeValue.attribute_id) ===
              Number(selectedAttr.attribute_id) &&
            Number(attrValue.productAttributeValue.attributeValue_id) ===
              Number(selectedAttr.attributeValue_id)
        )
      )
    );
  }

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption?.length ===
        filteredAttributes.filter((a) => a.length > 1).length
    ) {
      const selectedAttributes = selectedOption.map((att) => {
        return {
          attribute_id: att.attribute_id,
          attributeValue_id: att.value_id,
        };
      });
      let findv = findVariation(product.variations, selectedAttributes);
      if (findv) {
        setVariation(findv);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, filteredAttributes, product]);

  const handleRadioChange = (attribute_id, value_id) => {
    setSelectedOption([
      ...selectedOption.filter((a) => a.attribute_id !== attribute_id),
      { attribute_id: attribute_id, value_id: value_id },
    ]);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {filteredAttributes.map((group, index) => {
        if (
          !group ||
          [attributeIDs.MATERIAL, attributeIDs.SIZE].includes(
            group[0].attribute.attribute_id
          )
        )
          return "";

        return (
          <div key={index}>
            <Paragraph color="black" classes="font-bold block my-2">
              {group[0].attribute.name}
            </Paragraph>
            <div className="flex items-center justify-start gap-4">
              {group.map((attribute) => {
                const bgcolor =
                  attribute.attribute.name === "Color"
                    ? attribute.attributeValue.colorCode
                    : "";
                const selected_attr =
                  selectedOption?.length > 0
                    ? selectedOption?.find(
                        (o) => o.attribute_id === attribute.attribute_id
                      )
                    : false;
                return (
                  <div key={"selection" + attribute.attribute_id}>
                    <AttributeRadioButton
                      label={transformAttributeName(
                        attribute.attributeValue.name,
                        true
                      )}
                      name={attribute.attribute.name}
                      value={attribute.attributeValue.id}
                      selectedOption={
                        group.length > 1
                          ? selected_attr
                            ? Number(selected_attr.value_id)
                            : ""
                          : attribute.attributeValue.id
                      }
                      bgColor={bgcolor !== "" ? bgcolor : false}
                      handleRadioChange={(e) =>
                        handleRadioChange(
                          attribute.attribute_id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
