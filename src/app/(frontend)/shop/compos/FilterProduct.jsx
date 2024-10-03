"use client";
import { initFilterData, useShopStore } from "@/contexts/shopStore";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { CharsType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const FilterProduct = ({ filterdDatas }) => {
  const selectedFilters = useShopStore((store) => store.filters);
  const setSelectedFilters = useShopStore((store) => store.setFilters);
  const category = useSearchParams().get("category");
  const subcategory = useSearchParams().get("subcategory");
  const vendors = filterdDatas.vendors;
  const metals = filterdDatas.metals;
  const karats = filterdDatas.karats;
  const patterns = filterdDatas.patterns;
  const characteristics = filterdDatas.characteristics;
  const collections = filterdDatas.collections;
  const categories = filterdDatas.categories;
  const subcategories = filterdDatas.subCategories;
  const [isShowMoreBrands, setIsShowMoreBrands] = useState(false);
  const [isShowMoreWeights, setIsShowMoreWeights] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([0, 2]);
  const [nestedAccordions, setNestedAccordions] = useState({});
  const handleAccordionToggle = (id, isNested = false) => {
    if (isNested) {
      // For nested accordions
      setNestedAccordions((prevNested) => ({
        ...prevNested,
        [id]: !prevNested[id],
      }));
    } else {
      // For main accordions
      setOpenAccordions((prevOpen) =>
        prevOpen.includes(id)
          ? prevOpen.filter((item) => item !== id)
          : [...prevOpen, id]
      );
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      categories: event.target.checked
        ? [...filters.categories, categoryId]
        : [...filters.categories.filter((c) => c !== categoryId)],
    };

    setSelectedFilters(filters);
  };

  const handleVendorChange = (event) => {
    const vendorName = event.target.value;
    let filters = selectedFilters;
    filters = {
      ...filters,
      vendors: event.target.checked
        ? [...filters.vendors, vendorName]
        : [...filters.vendors.filter((c) => c !== vendorName)],
    };
    setSelectedFilters(filters);
  };

  const handleMetalChange = (event) => {
    const id = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      metals: event.target.checked
        ? [...filters.metals, id]
        : [...filters.metals.filter((c) => c !== id)],
    };
    setSelectedFilters(filters);
  };

  const handleKaratChange = (event) => {
    const name = event.target.value;
    let filters = selectedFilters;
    filters = {
      ...filters,
      karats: event.target.checked
        ? [...filters.karats, name]
        : [...filters.karats.filter((c) => c !== name)],
    };
    setSelectedFilters(filters);
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      rating: event.target.checked
        ? [...filters.rating, rating]
        : [...filters.rating.filter((c) => c !== rating)],
    };
    setSelectedFilters(filters);
  };

  const handlePatternChange = (event) => {
    const id = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      patterns: event.target.checked
        ? [...filters.patterns, id]
        : [...filters.patterns.filter((c) => c !== id)],
    };
    setSelectedFilters(filters);
  };

  const handleWeightChange = (event, min, max) => {
    const isChecked = event.target.checked;
    let filters = selectedFilters;

    // If checked, add the weight range to the filters
    if (isChecked) {
      filters = {
        ...filters,
        weights: [...filters.weights, { min, max }],
      };
    } else {
      // If unchecked, remove the weight range from the filters
      filters = {
        ...filters,
        weights: filters.weights.filter(
          (weight) => weight.min !== min || weight.max !== max
        ),
      };
    }

    setSelectedFilters(filters);
  };
  const handleCharacteristicsChange = (event) => {
    const id = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      characteristics: event.target.checked
        ? [...filters.characteristics, id]
        : [...filters.characteristics.filter((c) => c !== id)],
    };
    setSelectedFilters(filters);
  };

  const handleCollectionsChange = (event) => {
    const id = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      collections: event.target.checked
        ? [...filters.collections, id]
        : [...filters.collections.filter((c) => c !== id)],
    };
    setSelectedFilters(filters);
  };

  const handleSubCategoryChange = (event) => {
    const id = parseInt(event.target.value);
    let filters = selectedFilters;
    filters = {
      ...filters,
      subCategories: event.target.checked
        ? [...filters.subCategories, id]
        : [...filters.subCategories.filter((c) => c !== id)],
    };

    setSelectedFilters(filters);
  };

  useEffect(() => {
    const id = categories?.find((c) => c.name === category)?.category_id;
    if (category) {
      setSelectedFilters({
        ...selectedFilters,
        categories: [parseInt(id)],
      });
    }

    const id2 = subcategories?.find((c) => c.name === subcategory)?.category_id;
    if (subcategory) {
      setSelectedFilters({
        ...selectedFilters,
        subCategories: [parseInt(id2)],
      });
    }
  }, [category, subcategory]);

  const weightOptions = [
    { weight_id: 1, text: "1 to 50 Grams", min: 1, max: 50 },
    { weight_id: 2, text: "51 to  100 Grams", min: 51, max: 100 },
    { weight_id: 3, text: "101 to 200 Grams", min: 101, max: 200 },
    { weight_id: 4, text: "201 to 300 Grams", min: 201, max: 300 },
    { weight_id: 5, text: "301 to 400 Grams", min: 301, max: 400 },
    { weight_id: 6, text: "401 to 500 Grams", min: 401, max: 500 },
    { weight_id: 7, text: "501 to 600 Grams", min: 501, max: 600 },
    { weight_id: 8, text: "601 to 700 Grams", min: 601, max: 700 },
  ];
  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={() => {
            setSelectedFilters(initFilterData);
          }}
          variant="outlined"
          className="border-[#DFDFDF] text-[#676767] focus:ring-0 font-normal text-sm font-emirates normal-case flex gap-1.5 items-center py-2.5 px-7 rounded-sm"
        >
          Clear Filter
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.83333 0.75H11.1667C11.3214 0.75 11.4698 0.811458 11.5791 0.920854C11.6885 1.03025 11.75 1.17862 11.75 1.33333V2.2585C11.75 2.4132 11.6885 2.56155 11.5791 2.67092L7.83758 6.41242C7.72818 6.52179 7.6667 6.67014 7.66667 6.82483V10.5028C7.66666 10.5914 7.64645 10.6789 7.60755 10.7586C7.56866 10.8383 7.51211 10.9081 7.44221 10.9626C7.3723 11.0172 7.29088 11.0551 7.20414 11.0734C7.11739 11.0918 7.0276 11.0901 6.94158 11.0686L5.77492 10.7769C5.64877 10.7453 5.53681 10.6725 5.4568 10.57C5.37679 10.4674 5.33334 10.3411 5.33333 10.2111V6.82483C5.3333 6.67014 5.27182 6.52179 5.16242 6.41242L1.42092 2.67092C1.31151 2.56155 1.25003 2.4132 1.25 2.2585V1.33333C1.25 1.17862 1.31146 1.03025 1.42085 0.920854C1.53025 0.811458 1.67862 0.75 1.83333 0.75Z"
              stroke="#676767"
              strokeWidth="0.875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      <Accordion
        open={openAccordions.includes(0)}
        icon={<Icon id={0} open={openAccordions.includes(0)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(0)}
        >
          Filter By Categories
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 pt-2 p-0 px-0 flex flex-col gap-3">
            {categories
              .filter((category) => category.parent_id === null)
              .slice(0, isShowMore ? categories.length : 5)
              .map((category, index) => {
                const hasSubcategories = categories.some(
                  (subcategory) =>
                    subcategory.parent_id === category.category_id
                );

                return hasSubcategories ? (
                  <Accordion
                    key={index}
                    open={nestedAccordions[category.category_id]}
                  >
                    <AccordionHeader
                      className="text-sm py-3 font-medium font-emirates flex items-center !justify-start"
                      onClick={() =>
                        handleAccordionToggle(category.category_id, true)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`h-4 w-4 mr-2 transition-transform ${
                          nestedAccordions[category.category_id]
                            ? "rotate-180"
                            : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                      <Checkbox
                        value={category.category_id}
                        id={category.name}
                        checked={
                          selectedFilters?.categories &&
                          selectedFilters?.categories?.some(
                            (selectedCategory) =>
                              selectedCategory === category.category_id
                          )
                        }
                        className="w-4 h-4"
                        onChange={handleCategoryChange}
                        ripple={false}
                        label={category.name}
                        labelProps={{ className: "pl-2" }}
                      />
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="min-w-0 p-0 px-0 flex flex-col gap-3">
                        {categories
                          .filter(
                            (subcategory) =>
                              subcategory.parent_id === category.category_id
                          )
                          .map((subcategory, i) => (
                            <label
                              key={i}
                              htmlFor={subcategory.name}
                              className="flex w-full pt-3 cursor-pointer items-center ms-7"
                            >
                              <Checkbox
                                value={subcategory.category_id}
                                onChange={handleSubCategoryChange}
                                checked={
                                  selectedFilters?.subCategories &&
                                  selectedFilters?.subCategories?.some(
                                    (selectedSubcategory) =>
                                      selectedSubcategory ===
                                      subcategory.category_id
                                  )
                                }
                                className="w-4 h-4"
                                labelProps={{ className: "pl-2" }}
                                id={subcategory.name}
                                ripple={false}
                                label={subcategory.name}
                              />
                            </label>
                          ))}
                      </div>
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={category.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={category.category_id}
                        id={category.name}
                        checked={
                          selectedFilters?.categories &&
                          selectedFilters?.categories?.some(
                            (selectedCategory) =>
                              selectedCategory === category.category_id
                          )
                        }
                        className="w-4 h-4"
                        labelProps={{ className: "pl-2" }}
                        onChange={handleCategoryChange}
                        ripple={false}
                        label={category.name}
                      />
                    </label>
                  </div>
                );
              })}

            {categories && categories.length > 5 && (
              <button
                variant="text"
                className="flex justify-start mt-4"
                onClick={() => setIsShowMore(!isShowMore)}
                ripple={false}
              >
                {isShowMore ? (
                  "Show Less"
                ) : (
                  <>
                    <span className="flex items-center gap-2 text-gray-700">
                      Show More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <circle cx="7" cy="7" r="6.5" stroke="#676767" />
                        <path
                          d="M10 7.49902H7.5V9.99902C7.5 10.1316 7.44732 10.2588 7.35355 10.3526C7.25979 10.4463 7.13261 10.499 7 10.499C6.86739 10.499 6.74022 10.4463 6.64645 10.3526C6.55268 10.2588 6.5 10.1316 6.5 9.99902V7.49902H4C3.86739 7.49902 3.74021 7.44634 3.64645 7.35258C3.55268 7.25881 3.5 7.13163 3.5 6.99902C3.5 6.86642 3.55268 6.73924 3.64645 6.64547C3.74021 6.5517 3.86739 6.49902 4 6.49902H6.5V3.99902C6.5 3.86642 6.55268 3.73924 6.64645 3.64547C6.74022 3.5517 6.86739 3.49902 7 3.49902C7.13261 3.49902 7.25979 3.5517 7.35355 3.64547C7.44732 3.73924 7.5 3.86642 7.5 3.99902V6.49902H10C10.1326 6.49902 10.2598 6.5517 10.3536 6.64547C10.4473 6.73924 10.5 6.86642 10.5 6.99902C10.5 7.13163 10.4473 7.25881 10.3536 7.35258C10.2598 7.44634 10.1326 7.49902 10 7.49902Z"
                          fill="#676767"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(2)}
        icon={<Icon id={2} open={openAccordions.includes(2)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(2)}
        >
          Filter By Store
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 pt-2 p-0 px-0 flex flex-col gap-3">
            {vendors &&
              vendors.length > 0 &&
              vendors
                ?.filter((vendor) => vendor?.vendor?.store_name)
                .map((vendor, index) => {
                  return (
                    <div className="p-0" key={index}>
                      <label
                        htmlFor={vendor?.vendor?.store_name}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={vendor?.vendor?.store_name}
                          checked={
                            selectedFilters?.vendors &&
                            selectedFilters?.vendors?.some(
                              (selectedVendor) =>
                                selectedVendor === vendor?.vendor?.store_name
                            )
                          }
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2" }}
                          onChange={handleVendorChange}
                          id={vendor?.vendor?.store_name}
                          ripple={false}
                          label={vendor?.vendor?.store_name}
                        />
                      </label>
                    </div>
                  );
                })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(3)}
        icon={<Icon id={3} open={openAccordions.includes(3)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(3)}
        >
          Filter by Metal
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 pt-2 p-0 px-0 flex flex-col gap-3">
            {metals &&
              metals.length > 0 &&
              metals.map((metal, index) => {
                const isGold = metal.name.toLowerCase() === "gold";

                return isGold ? (
                  <Accordion open={nestedAccordions[metal.id]}>
                    <AccordionHeader
                      className="text-sm py-3 font-medium font-emirates flex items-center !justify-start"
                      onClick={() => handleAccordionToggle(metal.id, true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`h-4 w-4 mr-2 transition-transform ${
                          nestedAccordions[metal.id] ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                      <Checkbox
                        value={metal?.id}
                        onChange={handleMetalChange}
                        checked={
                          selectedFilters.metals &&
                          selectedFilters?.metals?.some(
                            (selectedMetal) => selectedMetal === metal?.id
                          )
                        }
                        className="w-4 h-4"
                        labelProps={{ className: "pl-2" }}
                        id={metal?.name}
                        ripple={false}
                        label={metal?.name}
                      />
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="min-w-0 p-0 px-0 flex flex-col gap-3">
                        {karats?.length > 0 &&
                          karats[0]?.values.map((karat, i) => (
                            <label
                              key={i}
                              htmlFor={karat?.name}
                              className="flex w-full pt-3 cursor-pointer items-center ms-7"
                            >
                              <Checkbox
                                value={karat?.name}
                                onChange={handleKaratChange}
                                checked={
                                  selectedFilters.karat &&
                                  selectedFilters?.karat?.some(
                                    (selectedKarat) =>
                                      selectedKarat === karat?.name
                                  )
                                }
                                className="w-4 h-4"
                                labelProps={{ className: "pl-2" }}
                                id={karat?.name}
                                ripple={false}
                                label={karat?.name}
                              />
                            </label>
                          ))}
                      </div>
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={metal?.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={metal?.id}
                        onChange={handleMetalChange}
                        checked={
                          selectedFilters.metals &&
                          selectedFilters?.metals?.some(
                            (selectedMetal) => selectedMetal === metal?.id
                          )
                        }
                        className="w-4 h-4"
                        labelProps={{ className: "pl-2" }}
                        id={metal?.name}
                        ripple={false}
                        label={metal?.name}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(4)}
        icon={<Icon id={4} open={openAccordions.includes(4)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(4)}
        >
          Filter by Pattern
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2 gap-3">
            {patterns &&
              patterns.length > 0 &&
              patterns?.map((pattern, index) => {
                return (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={pattern?.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={pattern?.pattern_id}
                        onChange={handlePatternChange}
                        checked={
                          selectedFilters?.patterns &&
                          selectedFilters?.patterns?.some(
                            (selectedPattern) =>
                              selectedPattern === pattern?.pattern_id
                          )
                        }
                        className="w-4 h-4"
                        labelProps={{ className: "pl-2" }}
                        id={pattern?.name}
                        ripple={false}
                        label={pattern?.name}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(5)}
        icon={<Icon id={5} open={openAccordions.includes(5)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(5)}
        >
          Filter by Brand
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2 gap-2.5 w-fit">
            {characteristics &&
              characteristics.length > 0 &&
              characteristics
                .filter(
                  (characteristic) =>
                    characteristic.chars_type === CharsType.BRAND
                )
                .slice(0, isShowMoreBrands ? characteristics.length : 6)
                ?.map((brand, index) => {
                  const isChecked = selectedFilters?.characteristics?.some(
                    (selectedCharacteristic) =>
                      selectedCharacteristic === brand?.chars_id
                  );

                  return (
                    <div className="p-0 w-[105px]" key={index}>
                      <label
                        htmlFor={brand?.name}
                        className={`flex justify-center rounded-sm  h-[45px] py-1 cursor-pointer items-center border-4 ${
                          isChecked
                            ? "border-primary-200"
                            : "border-transparent"
                        }`}
                      >
                        {brand?.image ? (
                          <Image
                            src={brand?.image || ""}
                            alt={brand?.name}
                            width={100}
                            height={50}
                            className="w-[98px] rounded-sm h-[40px] object-contain"
                          />
                        ) : (
                          <div
                            className={`w-[98px] h-[40px] text-center flex flex-col justify-center ${
                              isChecked
                                ? ""
                                : "border-2 rounded-sm border-gray-300 "
                            } `}
                          >
                            {brand?.name}
                          </div>
                        )}
                        <Checkbox
                          value={brand?.chars_id}
                          hidden
                          onChange={handleCharacteristicsChange}
                          checked={isChecked}
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2 hidden" }}
                          id={brand?.name}
                          ripple={false}
                          label={brand?.name}
                          iconProps={{ className: "hidden" }}
                        />
                      </label>
                    </div>
                  );
                })}
            {characteristics && characteristics.length > 5 && (
              <button
                variant="text"
                className="flex justify-start mt-4"
                onClick={() => setIsShowMoreBrands(!isShowMoreBrands)}
                ripple={false}
              >
                {isShowMoreBrands ? (
                  "Show Less"
                ) : (
                  <>
                    <span className="flex items-center gap-2 text-gray-700">
                      Show More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <circle cx="7" cy="7" r="6.5" stroke="#676767" />
                        <path
                          d="M10 7.49902H7.5V9.99902C7.5 10.1316 7.44732 10.2588 7.35355 10.3526C7.25979 10.4463 7.13261 10.499 7 10.499C6.86739 10.499 6.74022 10.4463 6.64645 10.3526C6.55268 10.2588 6.5 10.1316 6.5 9.99902V7.49902H4C3.86739 7.49902 3.74021 7.44634 3.64645 7.35258C3.55268 7.25881 3.5 7.13163 3.5 6.99902C3.5 6.86642 3.55268 6.73924 3.64645 6.64547C3.74021 6.5517 3.86739 6.49902 4 6.49902H6.5V3.99902C6.5 3.86642 6.55268 3.73924 6.64645 3.64547C6.74022 3.5517 6.86739 3.49902 7 3.49902C7.13261 3.49902 7.25979 3.5517 7.35355 3.64547C7.44732 3.73924 7.5 3.86642 7.5 3.99902V6.49902H10C10.1326 6.49902 10.2598 6.5517 10.3536 6.64547C10.4473 6.73924 10.5 6.86642 10.5 6.99902C10.5 7.13163 10.4473 7.25881 10.3536 7.35258C10.2598 7.44634 10.1326 7.49902 10 7.49902Z"
                          fill="#676767"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(11)}
        icon={<Icon id={11} open={openAccordions.includes(11)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(11)}
        >
          Filter by Weight
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid  gap-3">
            {weightOptions &&
              weightOptions.length > 0 &&
              weightOptions
                .slice(0, isShowMoreWeights ? weightOptions.length : 3)
                .map((weight, index) => {
                  return (
                    <div className="p-0" key={index}>
                      <label
                        htmlFor={weight?.text}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={{ min: weight?.min, max: weight?.max }}
                          onChange={(event) =>
                            handleWeightChange(event, weight?.min, weight?.max)
                          }
                          checked={
                            selectedFilters?.weights &&
                            selectedFilters?.weights.some(
                              (selectedWeight) =>
                                selectedWeight.min === weight?.min &&
                                selectedWeight.max === weight?.max
                            )
                          }
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2" }}
                          id={weight?.text}
                          ripple={false}
                          label={weight?.text}
                        />
                      </label>
                    </div>
                  );
                })}

            {weightOptions && weightOptions.length > 3 && (
              <button
                variant="text"
                className="flex justify-start mt-4"
                onClick={() => setIsShowMoreWeights(!isShowMoreWeights)}
                ripple={false}
              >
                {isShowMoreWeights ? (
                  "Show Less"
                ) : (
                  <>
                    <span className="flex items-center gap-2 text-gray-700">
                      Show More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <circle cx="7" cy="7" r="6.5" stroke="#676767" />
                        <path
                          d="M10 7.49902H7.5V9.99902C7.5 10.1316 7.44732 10.2588 7.35355 10.3526C7.25979 10.4463 7.13261 10.499 7 10.499C6.86739 10.499 6.74022 10.4463 6.64645 10.3526C6.55268 10.2588 6.5 10.1316 6.5 9.99902V7.49902H4C3.86739 7.49902 3.74021 7.44634 3.64645 7.35258C3.55268 7.25881 3.5 7.13163 3.5 6.99902C3.5 6.86642 3.55268 6.73924 3.64645 6.64547C3.74021 6.5517 3.86739 6.49902 4 6.49902H6.5V3.99902C6.5 3.86642 6.55268 3.73924 6.64645 3.64547C6.74022 3.5517 6.86739 3.49902 7 3.49902C7.13261 3.49902 7.25979 3.5517 7.35355 3.64547C7.44732 3.73924 7.5 3.86642 7.5 3.99902V6.49902H10C10.1326 6.49902 10.2598 6.5517 10.3536 6.64547C10.4473 6.73924 10.5 6.86642 10.5 6.99902C10.5 7.13163 10.4473 7.25881 10.3536 7.35258C10.2598 7.44634 10.1326 7.49902 10 7.49902Z"
                          fill="#676767"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(6)}
        icon={<Icon id={6} open={openAccordions.includes(6)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(6)}
        >
          Filter by Trend
        </AccordionHeader>

        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2">
            {characteristics &&
              characteristics.length > 0 &&
              characteristics
                .filter(
                  (characteristic) =>
                    characteristic.chars_type === CharsType.TREND
                )
                ?.map((trend, index) => {
                  return (
                    <div className="p-0" ripple={false} key={index}>
                      <label
                        htmlFor={trend?.name}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={trend?.chars_id}
                          onChange={handleCharacteristicsChange}
                          checked={
                            selectedFilters?.characteristics &&
                            selectedFilters?.characteristics?.some(
                              (selectedTrend) =>
                                selectedTrend === trend?.chars_id
                            )
                          }
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2" }}
                          id={trend?.name}
                          ripple={false}
                          label={trend?.name}
                        />
                      </label>
                    </div>
                  );
                })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(7)}
        icon={<Icon id={7} open={openAccordions.includes(7)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(7)}
        >
          Filter by Collections
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2 gap-3">
            {collections &&
              collections.length > 0 &&
              collections?.map((collection, index) => {
                return (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={collection?.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={collection?.collection_id}
                        onChange={handleCollectionsChange}
                        checked={
                          selectedFilters?.collections &&
                          selectedFilters?.collections?.some(
                            (selectedCollection) =>
                              selectedCollection === collection?.collection_id
                          )
                        }
                        className="w-4 h-4"
                        labelProps={{ className: "pl-2" }}
                        id={collection?.name}
                        label={collection?.name}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(8)}
        icon={<Icon id={8} open={openAccordions.includes(8)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(8)}
        >
          Filter by Style
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2 gap-3">
            {characteristics &&
              characteristics.length > 0 &&
              characteristics
                .filter(
                  (characteristic) =>
                    characteristic.chars_type === CharsType.STYLE
                )
                ?.map((style, index) => {
                  return (
                    <div className="p-0" key={index}>
                      <label
                        htmlFor={style?.name}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={style?.chars_id}
                          onChange={handleCharacteristicsChange}
                          checked={
                            selectedFilters?.characteristics &&
                            selectedFilters?.characteristics?.some(
                              (selectedCharacteristic) =>
                                selectedCharacteristic === style?.chars_id
                            )
                          }
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2" }}
                          id={style?.name}
                          ripple={false}
                          label={style?.name}
                        />
                      </label>
                    </div>
                  );
                })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(9)}
        icon={<Icon id={9} open={openAccordions.includes(9)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(9)}
        >
          Filter by Theme
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 grid grid-cols-2 gap-3">
            {characteristics &&
              characteristics.length > 0 &&
              characteristics
                .filter(
                  (characteristic) =>
                    characteristic.chars_type === CharsType.THEME
                )
                ?.map((theme, index) => {
                  return (
                    <div className="p-0" key={index}>
                      <label
                        htmlFor={theme?.name}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={theme?.chars_id}
                          onChange={handleCharacteristicsChange}
                          checked={
                            selectedFilters?.characteristics &&
                            selectedFilters?.characteristics?.some(
                              (selectedCharacteristic) =>
                                selectedCharacteristic === theme?.chars_id
                            )
                          }
                          className="w-4 h-4"
                          labelProps={{ className: "pl-2" }}
                          id={theme?.name}
                          ripple={false}
                          label={theme?.name}
                        />
                      </label>
                    </div>
                  );
                })}
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={openAccordions.includes(10)}
        icon={<Icon id={10} open={openAccordions.includes(10)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(10)}
        >
          Filter by Rating
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 py-2 p-0 px-0 flex flex-col items-start gap-3">
            {Array.from({ length: 5 }).map((_, index) => {
              const filledStars = index + 1;
              const blankStars = 5 - filledStars;

              return (
                <div key={index} className="p-0">
                  <label className="flex w-full cursor-pointer items-center">
                    <Checkbox
                      value={filledStars}
                      onChange={handleRatingChange}
                      className="w-4 h-4"
                      ripple={false}
                    />
                    <div className="flex items-center ml-2">
                      {Array.from({ length: filledStars }).map(
                        (_, filledIndex) => (
                          <svg
                            key={filledIndex}
                            className="w-4 h-4 text-yellow-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        )
                      )}
                      {Array.from({ length: blankStars }).map(
                        (_, blankIndex) => (
                          <svg
                            key={blankIndex}
                            className="w-4 h-4 text-gray-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        )
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default FilterProduct;

function Icon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
