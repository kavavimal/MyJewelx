"use client";
import { getMetals, getPatterns, getVendors } from "@/actions/product";
import {
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const FilterProduct = ({ categories, setSelectedFilters }) => {
  const [vendors, setVendors] = useState([]);
  const [metals, setMetals] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);

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
      patterns: selectedPatterns.map((pattern) => pattern.id),
    }));
  }, [selectedPatterns]);

  useEffect(() => {
    fetchVendors();
    fetchMetals();
    fetchPatterns();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full">
        <h4 className="text-sm text-secondary-300 font-medium border-b border-[#E6E6E6] pb-2">
          Filter By Categories
        </h4>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Input label="Search Category" type="text" size="lg" />
          </div>
          <List className="min-w-0 py-2 p-0 px-0">
            {categories?.map((category, index) => {
              return (
                <ListItem className="p-0" ripple={false} key={index}>
                  <label
                    htmlFor={category.name}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
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
                        className="hover:before:opacity-0 rounded-md"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography className="font-medium text-sm">
                      {category.name}
                    </Typography>
                  </label>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm text-secondary-300 font-medium border-b border-[#E6E6E6] pb-2">
          Filter By Vendor
        </h4>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Input label="Search Vendor" type="text" size="lg" />
          </div>
          <List className="min-w-0 py-2 p-0 px-0">
            {vendors &&
              vendors.length > 0 &&
              vendors?.map((vendor, index) => {
                return (
                  <ListItem className="p-0" ripple={false} key={index}>
                    <label
                      htmlFor={`${vendor.firstName} ${vendor.lastName}`}
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
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
                          className="hover:before:opacity-0 rounded-md"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography className="font-medium text-sm capitalize">
                        {`${vendor.firstName} ${vendor.lastName}`}
                      </Typography>
                    </label>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm text-secondary-300 font-medium border-b border-[#E6E6E6] pb-2">
          Filter by Metal
        </h4>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Input label="Search Metal" type="text" size="lg" />
          </div>
          <List className="min-w-0 py-2 p-0 px-0">
            {metals &&
              metals.length > 0 &&
              metals?.map((metal, index) => {
                return (
                  <ListItem className="p-0" ripple={false} key={index}>
                    <label
                      htmlFor={metal?.name}
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          value={metal?.id}
                          onChange={handleMetalChange}
                          checked={selectedMetals.some(
                            (selectedMetal) => selectedMetal.id === metal?.id
                          )}
                          id={metal?.name}
                          ripple={false}
                          className="hover:before:opacity-0 rounded-md"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography className="font-medium text-sm capitalize">
                        {metal?.name}
                      </Typography>
                    </label>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>
      <div className="w-full">
        <h4 className="text-sm text-secondary-300 font-medium border-b border-[#E6E6E6] pb-2">
          Filter by Pattern
        </h4>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Input label="Search Pattern" type="text" size="lg" />
          </div>
          <List className="min-w-0 py-2 p-0 px-0">
            {patterns &&
              patterns.length > 0 &&
              patterns?.map((pattern, index) => {
                return (
                  <ListItem className="p-0" ripple={false} key={index}>
                    <label
                      htmlFor={pattern?.name}
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          value={pattern?.pattern_id}
                          onChange={handlePatternChange}
                          checked={selectedPatterns.some(
                            (selectedPattern) =>
                              selectedPattern.id === pattern?.pattern_id
                          )}
                          id={pattern?.name}
                          ripple={false}
                          className="hover:before:opacity-0 rounded-md"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography className="font-medium text-sm capitalize">
                        {pattern?.name}
                      </Typography>
                    </label>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
