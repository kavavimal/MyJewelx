"use client";
import {
  getCharacteristics,
  getCollections,
  getMetals,
  getPatterns,
  getVendors,
} from "@/actions/product";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { CharsType } from "@prisma/client";
import React, { useEffect, useState } from "react";

const FilterProduct = ({ categories, setSelectedFilters }) => {
  const [vendors, setVendors] = useState([]);
  const [metals, setMetals] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([1]);

  const handleAccordionToggle = (value) => {
    setOpenAccordions((prevOpenAccordions) =>
      prevOpenAccordions.includes(value)
        ? prevOpenAccordions.filter((id) => id !== value)
        : [...prevOpenAccordions, value]
    );
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        { category_id: categoryId },
      ]);
    } else {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter(
          (category) => category.category_id !== categoryId
        )
      );
    }
  };

  const handleVendorChange = (event) => {
    const vendorName = event.target.value;
    if (event.target.checked) {
      setSelectedVendors((prevSelectedVendors) => [
        ...prevSelectedVendors,
        { name: vendorName },
      ]);
    } else {
      setSelectedVendors((prevSelectedVendors) =>
        prevSelectedVendors.filter((vendor) => vendor.name !== vendorName)
      );
    }
  };

  const handleMetalChange = (event) => {
    const id = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedMetals((prevSelectedMetals) => [
        ...prevSelectedMetals,
        { id: id },
      ]);
    } else {
      setSelectedMetals((prevSelectedMetals) =>
        prevSelectedMetals.filter((metal) => metal.id !== id)
      );
    }
  };

  const handlePatternChange = (event) => {
    const id = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedPatterns((prevSelectedPatterns) => [
        ...prevSelectedPatterns,
        { id: id },
      ]);
    } else {
      setSelectedPatterns((prevSelectedPatterns) =>
        prevSelectedPatterns.filter((pattern) => pattern.id !== id)
      );
    }
  };

  const handleCharacteristicsChange = (event) => {
    const id = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCharacteristics((prevSelectedCharacteristics) => [
        ...prevSelectedCharacteristics,
        { id: id },
      ]);
    } else {
      setSelectedCharacteristics((prevSelectedCharacteristics) =>
        prevSelectedCharacteristics.filter(
          (characteristic) => characteristic.id !== id
        )
      );
    }
  };

  const handleCollectionsChange = (event) => {
    const id = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCollections((prevSelectedCollections) => [
        ...prevSelectedCollections,
        { id: id },
      ]);
    } else {
      setSelectedCollections((prevSelectedCollections) =>
        prevSelectedCollections.filter((collection) => collection.id !== id)
      );
    }
  };
  const fetchVendors = async () => {
    try {
      const vendorsData = await getVendors();
      setVendors(vendorsData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchMetals = async () => {
    try {
      const metalsData = await getMetals();
      setMetals(metalsData);
    } catch (error) {
      console.error("Error fetching metals:", error);
    }
  };

  const fetchPatterns = async () => {
    try {
      const patternsData = await getPatterns();
      console.log(patternsData);
      setPatterns(patternsData);
    } catch (error) {
      console.error("Error fetching patterns:", error);
    }
  };

  const fetchCharacteristics = async () => {
    try {
      const characteristicsData = await getCharacteristics();
      setCharacteristics(characteristicsData);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  const fetchCollections = async () => {
    try {
      const collectionsData = await getCollections();
      setCollections(collectionsData);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      categories: selectedCategories.map((category) => category.category_id),
    }));
  }, [selectedCategories]);

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      vendors: selectedVendors.map((vendor) => vendor.name),
    }));
  }, [selectedVendors]);

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      metals: selectedMetals.map((metal) => metal.id),
    }));
  }, [selectedMetals]);

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      characteristics: selectedCharacteristics.map(
        (characteristic) => characteristic.id
      ),
    }));
  }, [selectedCharacteristics]);

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      patterns: selectedPatterns.map((pattern) => pattern.id),
    }));
  }, [selectedPatterns]);

  useEffect(() => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      collections: selectedCollections.map((collection) => collection.id),
    }));
  }, [selectedCollections]);

  useEffect(() => {
    fetchVendors();
    fetchMetals();
    fetchPatterns();
    fetchCharacteristics();
    fetchCollections();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedVendors([]);
            setSelectedMetals([]);
            setSelectedCharacteristics([]);
            setSelectedPatterns([]);
            setSelectedCollections([]);
            setSelectedFilters({});
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
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </div>
      <Accordion
        open={openAccordions.includes(1)}
        icon={<Icon id={1} open={openAccordions.includes(1)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(1)}
        >
          Filter By Categories
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 pt-2 p-0 px-0 flex flex-col gap-3">
            {categories
              ?.slice(0, isShowMore ? categories?.length : 5)
              .map((category, index) => {
                return (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={category.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={category.category_id}
                        id={category.name}
                        checked={selectedCategories.some(
                          (selectedCategory) =>
                            selectedCategory.category_id ===
                            category.category_id
                        )}
                        onChange={handleCategoryChange}
                        ripple={false}
                        label={category.name}
                      />
                    </label>
                  </div>
                );
              })}
          </div>

          {categories && categories?.length > 5 && (
            <button
              variant="text"
              className="flex justify-start mt-4"
              onClick={() => setIsShowMore(!isShowMore)}
              ripple={false}
            >
              {isShowMore ? (
                "Show Less"
              ) : (
                <span className="flex items-center gap-5 text-gray-700">
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
                  Show More
                </span>
              )}
            </button>
          )}
        </AccordionBody>
      </Accordion>
      <Accordion
        open={openAccordions.includes(2)}
        icon={<Icon id={1} open={openAccordions.includes(2)} />}
      >
        <AccordionHeader
          className="text-sm py-3 font-medium font-emirates"
          onClick={() => handleAccordionToggle(2)}
        >
          Filter By Vendor
        </AccordionHeader>
        <AccordionBody>
          <div className="min-w-0 pt-2 p-0 px-0 flex flex-col gap-3">
            {vendors &&
              vendors.length > 0 &&
              vendors?.map((vendor, index) => {
                return (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={`${vendor.firstName} ${vendor.lastName}`}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={`${vendor.firstName} ${vendor.lastName}`}
                        checked={selectedVendors.some(
                          (selectedVendor) =>
                            selectedVendor.name ===
                            `${vendor.firstName} ${vendor.lastName}`
                        )}
                        onChange={handleVendorChange}
                        id={`${vendor.firstName} ${vendor.lastName}`}
                        ripple={false}
                        label={`${vendor.firstName} ${vendor.lastName}`}
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
              metals?.map((metal, index) => {
                return (
                  <div className="p-0" key={index}>
                    <label
                      htmlFor={metal?.name}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Checkbox
                        value={metal?.id}
                        onChange={handleMetalChange}
                        checked={selectedMetals.some(
                          (selectedMetal) => selectedMetal.id === metal?.id
                        )}
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
                        checked={selectedPatterns.some(
                          (selectedPattern) =>
                            selectedPattern.id === pattern?.pattern_id
                        )}
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
          <div className="min-w-0 py-2 p-0 px-0 grid gap-3">
            {characteristics &&
              characteristics.length > 0 &&
              characteristics
                .filter(
                  (characteristic) =>
                    characteristic.chars_type === CharsType.BRAND
                )
                ?.map((brand, index) => {
                  return (
                    <div className="p-0" key={index}>
                      <label
                        htmlFor={brand?.name}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Checkbox
                          value={brand?.chars_id}
                          onChange={handleCharacteristicsChange}
                          checked={selectedCharacteristics.some(
                            (selectedCharacteristic) =>
                              selectedCharacteristic.id === brand?.chars_id
                          )}
                          id={brand?.name}
                          ripple={false}
                          label={brand?.name}
                        />
                      </label>
                    </div>
                  );
                })}
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
                          checked={selectedCharacteristics.some(
                            (selectedCharacteristic) =>
                              selectedCharacteristic.id === trend?.chars_id
                          )}
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
                        checked={selectedCollections.some(
                          (selectedCollection) =>
                            selectedCollection.id === collection?.collection_id
                        )}
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
                          checked={selectedCharacteristics.some(
                            (selectedCharacteristic) =>
                              selectedCharacteristic.id === style?.chars_id
                          )}
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
                          checked={selectedCharacteristics.some(
                            (selectedCharacteristic) =>
                              selectedCharacteristic.id === theme?.chars_id
                          )}
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