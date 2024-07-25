import { attributeIDs, theme } from "@/utils/constants";
import { Typography } from "@material-tailwind/react";
import React from "react";
import ReactSelect from "react-select";

export default function ProductAttributeItem({
  attributes,
  productAttribute,
  options,
  style,
  values,
  handleValueChange,
  formik,
  isGold,
  karatOptions,
  goldCarate,
  setGoldCarate,
  asianSizeOptions,
  asianSizes,
  setAsianSizes,
  USSizeOptions,
  usSizes,
  setUsSizes,
  isAsian,
  isUS,
}) {
  return (
    <>
      {attributes.includes(productAttribute.attribute_id) && (
        <div>
          <div className="flex justify-between items-center mb-px">
            <Typography className="">{productAttribute?.name}</Typography>
          </div>
          <div>
            <ReactSelect
              isMulti={productAttribute?.isMultiple}
              options={options}
              styles={style}
              theme={theme}
              name={productAttribute?.name}
              placeholder={productAttribute?.name}
              value={
                productAttribute?.isMultiple
                  ? options.filter((option) => {
                      return (
                        Array.isArray(values) && values.includes(option.value)
                      );
                    })
                  : options.find((option) => option.value === values[0])
              }
              onChange={(newValue) => {
                handleValueChange(
                  productAttribute.attribute_id,
                  newValue,
                  productAttribute?.isMultiple
                );
              }}
            />
            {formik.errors.productAttribute?.name && (
              <p>{formik.errors.productAttribute?.name}</p>
            )}
          </div>
        </div>
      )}
      {isGold && productAttribute.attribute_id === attributeIDs.MATERIAL && (
        <div>
          <Typography className="">Karats</Typography>
          <ReactSelect
            options={karatOptions}
            theme={theme}
            isMulti
            name="karats"
            value={karatOptions.filter((gc) => goldCarate.includes(gc.value))}
            styles={style}
            onChange={(newVal) => setGoldCarate(newVal.map((a) => a.value))}
          />
        </div>
      )}
      {isAsian && productAttribute.attribute_id === attributeIDs.SIZE && (
        <div>
          <Typography className="">Asian Size</Typography>
          <ReactSelect
            isMulti
            theme={theme}
            options={asianSizeOptions}
            styles={style}
            value={asianSizeOptions.filter((a) => asianSizes.includes(a.value))}
            onChange={(e) => setAsianSizes(e.map((a) => a.value))}
          />
        </div>
      )}

      {isUS && productAttribute.attribute_id === attributeIDs.SIZE && (
        <div>
          <Typography className="">US Size</Typography>
          <ReactSelect
            isMulti
            theme={theme}
            options={USSizeOptions}
            styles={style}
            value={USSizeOptions.filter((a) => usSizes.includes(a.value))}
            onChange={(e) => setUsSizes(e.map((a) => a.value))}
          />
        </div>
      )}
    </>
  );
}
