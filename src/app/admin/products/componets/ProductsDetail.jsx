import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Input,
  Select,
  Option,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

const ProductsDetail = ({
  index,
  productsDetails,
  setProductsDetails,
  item,
  open,
  handleOpen,
}) => {
  const [checked, setChecked] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isFixPrice, setIsFixPrice] = useState(false);
  const [isGemstone, setIsGemstone] = useState(false);
  const [gemstone, setGemstone] = useState("");
  const [gemstoneAmount, setGemstoneAmount] = useState("");
  const [gemstoneCharges, setGemstoneCharges] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const [discount, setDiscont] = useState("Per Gram On Net Weight");
  const [isTax, setIsTax] = useState(false);
  const [isAddtionalCharges, setIsAdditionalCharges] = useState(false);
  const [additionalChargesType, setAdditionalChargesType] = useState("");
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [additionalCharge, setAdditionalCharge] = useState("");

  const [weight, setWeight] = useState("");
  const [makingCharge, setMakingCharge] = useState("Per Gram On Net Weight");
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
    Array.from(e.target.files).map((file) => {
      setPreviewURLs((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviewURLs(previewURLs.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Accordion
        className="overflow-visible"
        key={index}
        open={open === index + 1}
        icon={
          <IconButton
            variant="text"
            onClick={() =>
              setProductsDetails(productsDetails.filter((_, i) => i !== index))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
              ></path>
            </svg>
          </IconButton>
        }
      >
        <AccordionHeader onClick={() => handleOpen(index + 1)}>
          {item?.color} - {item?.karat}
        </AccordionHeader>
        <AccordionBody>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <div className="flex flex-col gap-5 border-b border-gray-300 pb-8">
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="flex flex-col gap-5">
                      <div className="flex gap-5 items-center">
                        <Input label="Length" type="number" name="length" />
                        <Input label="Height" type="number" name="height" />
                      </div>
                      <div className="flex gap-5 items-center">
                        <Input label="Width" type="number" name="width" />
                        <Input
                          label="Thickness"
                          type="number"
                          name="thickness"
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-1 font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-px h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      L x W x H in (cm)
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <Input label="SKU" name="sku" size="lg" />
                  </div>
                  <div>
                    <div className="mb-1.5">
                      <Checkbox
                        label="Stock management"
                        onChange={(e) => setChecked(e.target.checked)}
                        checked={checked}
                      />
                    </div>
                    {checked && (
                      <Input type="number" label="Quantity" size="lg" />
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2">Stock Status</h4>
                    <ul class="flex gap-5 items-center">
                      <li>
                        <input
                          type="radio"
                          id={`in-stock-${index}`}
                          name="hosting"
                          value="hosting-small"
                          class="hidden peer"
                          required
                        />
                        <label
                          htmlFor={`in-stock-${index}`}
                          class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div class="block">
                            <div class="w-full text-base font-medium">
                              In Stock
                            </div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id={`out-of-stock-${index}`}
                          name="hosting"
                          value="hosting-big"
                          class="hidden peer"
                        />
                        <label
                          htmlFor={`out-of-stock-${index}`}
                          class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-200 peer-checked:border-primary-200 peer-checked:text-primary-200 hover:text-blueGray-200 hover:bg-blueGray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div class="block">
                            <div class="w-full text-base font-medium">
                              Out Of Stock
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <Select
                    label="Weight"
                    size="lg"
                    onChange={(value) => setWeight(value)}
                    value={weight}
                  >
                    <Option value="Ounces">Ounces</Option>
                    <Option value="Grams">Grams</Option>
                  </Select>

                  {weight === "Grams" && (
                    <div className="flex gap-5 items-center">
                      <Input
                        type="number"
                        label="Net Weight (grams)"
                        size="lg"
                      />
                      <Input
                        type="number"
                        label="Gross Weight (grams)"
                        size="lg"
                      />
                    </div>
                  )}

                  {weight === "Ounces" && (
                    <div className="flex gap-5 items-center">
                      <Input
                        type="number"
                        label="Net Weight (ounces)"
                        size="lg"
                      />
                      <Input
                        type="number"
                        label="Gross Weight (ounces)"
                        size="lg"
                      />
                    </div>
                  )}

                  <Checkbox
                    label="Fixed price"
                    onChange={(e) => setIsFixPrice(e.target.checked)}
                    checked={isFixPrice}
                  />
                </div>
                <div>
                  <Input type="number" label="Regular Price" size="lg" />
                </div>
                {!isFixPrice && (
                  <>
                    <div>
                      <Input type="number" label="Metal Amount" size="lg" />
                    </div>
                    <div className="w-full flex gap-5 items-center">
                      <div className="w-1/2">
                        <Select
                          label="Making Charges"
                          size="lg"
                          onChange={(value) => setMakingCharge(value)}
                          value={makingCharge}
                        >
                          <Option value="Per Gram On Net Weight">
                            Per Gram On Net Weight
                          </Option>
                          <Option value="Per Piece / Flat">
                            Per Piece / Flat
                          </Option>
                          <Option value="Per(%) On Metal Rate On Karat">
                            Per(%) On Metal Rate On Karat
                          </Option>
                        </Select>
                      </div>
                      <div className="w-1/2">
                        <Input
                          // label="Making Charge"
                          size="lg"
                          label={makingCharge}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="pt-3">
                <Typography>Other Charges</Typography>
                <Checkbox
                  label="Gemstone"
                  checked={isGemstone}
                  onChange={(e) => setIsGemstone(e.target.checked)}
                />
                {isGemstone && (
                  <div>
                    <div className="flex gap-5 items-center">
                      <div className="flex-1 grid grid-cols-2 items-center gap-5">
                        <Select
                          label="Gemstone"
                          size="lg"
                          value={gemstone}
                          onChange={(value) => setGemstone(value)}
                        >
                          {[
                            "Ruby",
                            "Sapphire",
                            "Emerald",
                            "Amethyst",
                            "Topaz",
                            "Opal",
                            "Turquoise",
                            "Garnet",
                            "Aquamarine",
                            "Peridot",
                          ].map((item, index) => (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>

                        <Input
                          label="Amount"
                          size="lg"
                          type="number"
                          value={gemstoneAmount}
                          onChange={(e) => setGemstoneAmount(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-auto"
                        onClick={() => {
                          if (
                            gemstone.trim() !== "" &&
                            gemstoneAmount.trim() !== ""
                          ) {
                            setGemstoneCharges([
                              ...gemstoneCharges,
                              {
                                gemstone: gemstone,
                                amount: gemstoneAmount,
                              },
                            ]);
                            setGemstone("");
                            setGemstoneAmount("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex">
                      <List>
                        {gemstoneCharges.length > 0 &&
                          gemstoneCharges.map((item, index) => (
                            <ListItem
                              key={index}
                              ripple={false}
                              className="py-1 pr-1 pl-4"
                            >
                              {item.gemstone} - ₹{item.amount}
                              <ListItemSuffix>
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    setGemstoneCharges(
                                      gemstoneCharges.filter(
                                        (_, i) => i !== index
                                      )
                                    );
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
                                    ></path>
                                  </svg>
                                </IconButton>
                              </ListItemSuffix>
                            </ListItem>
                          ))}
                      </List>
                    </div>
                  </div>
                )}

                <div>
                  <Checkbox
                    label="Additional Charges"
                    onChange={(e) => setIsAdditionalCharges(e.target.checked)}
                  />
                </div>

                {isAddtionalCharges && (
                  <div>
                    <div className="flex gap-5 items-center">
                      <div className="flex-1 grid grid-cols-2 items-center gap-5">
                        <Input
                          label="Additional Charges Type"
                          size="lg"
                          value={additionalChargesType}
                          onChange={(e) =>
                            setAdditionalChargesType(e.target.value)
                          }
                        />
                        <Input
                          label={additionalChargesType}
                          size="lg"
                          type="number"
                          value={additionalCharge}
                          onChange={(e) => setAdditionalCharge(e.target.value)}
                        />
                      </div>
                      <Button
                        className="w-auto"
                        onClick={() => {
                          if (
                            additionalChargesType.trim() !== "" &&
                            additionalCharge.trim() !== ""
                          ) {
                            setAdditionalCharges([
                              ...additionalCharges,
                              {
                                additionalChargesType: additionalChargesType,
                                additionalCharge: additionalCharge,
                              },
                            ]);
                            setAdditionalChargesType("");
                            setAdditionalCharge("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex">
                      <List>
                        {additionalCharges.length > 0 &&
                          additionalCharges.map((item, index) => (
                            <ListItem
                              key={index}
                              ripple={false}
                              className="py-1 pr-1 pl-4"
                            >
                              {item.additionalChargesType} -₹
                              {item.additionalCharge}
                              <ListItemSuffix>
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    setAdditionalCharges(
                                      additionalCharges.filter(
                                        (_, i) => i !== index
                                      )
                                    );
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
                                    ></path>
                                  </svg>
                                </IconButton>
                              </ListItemSuffix>
                            </ListItem>
                          ))}
                      </List>
                    </div>
                  </div>
                )}

                <div>
                  <Checkbox
                    label="Discount"
                    checked={isDiscount}
                    onChange={(e) => setIsDiscount(e.target.checked)}
                  />
                </div>

                {isDiscount && (
                  <div className="w-full flex gap-5 items-center">
                    <div className="w-1/2">
                      <Select
                        label="Discount Type"
                        size="lg"
                        onChange={(value) => setDiscountType(value)}
                        value={discountType}
                      >
                        <Option value="Per Gram On Net Weight">
                          Per Gram On Net Weight
                        </Option>
                        <Option value="Per Piece / Flat">
                          Per Piece / Flat
                        </Option>
                        <Option value="Per(%) On Metal Rate On Karat">
                          Per(%) On Metal Rate On Karat
                        </Option>
                      </Select>
                    </div>
                    <div className="w-1/2">
                      <Input label={discountType} size="lg" type="number" />
                    </div>
                  </div>
                )}

                <div>
                  <Checkbox
                    label="VAT/Taxes (%)"
                    checked={isTax}
                    onChange={(e) => setIsTax(e.target.checked)}
                  />
                </div>
                <Input
                  label={`VAT/Taxes ${isTax ? "(%)" : ""}`}
                  size="lg"
                  type="number"
                />
              </div>
              <div className="mt-5">
                <Button>Save</Button>
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="product-images"
                  className="flex h-36 w-full flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
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
                  <input
                    id="product-images"
                    type="file"
                    name="product_images"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                    // accept="image/png, image/gif, image/jpeg"
                    multiple
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-5">
                {previewURLs.length > 0 &&
                  previewURLs.map((url, i) => (
                    <div key={i}>
                      <div className="relative">
                        <div className="absolute right-0 top-0">
                          <IconButton
                            variant="text"
                            size="sm"
                            className="rounded-full h-7 w-7"
                            onClick={() => removeImage(i)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                              ></path>
                            </svg>
                          </IconButton>
                        </div>
                      </div>
                      <Image
                        key={i}
                        width={100}
                        height={100}
                        src={url}
                        alt={`Preview ${i}`}
                        className="w-20 h-20 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default ProductsDetail;
