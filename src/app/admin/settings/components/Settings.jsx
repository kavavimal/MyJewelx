"use client";
import React, { useState, useEffect } from "react";
import Homeslider from "./Homeslider";
import Promotional from "./Promotional";
import { Input } from "@material-tailwind/react";

const Settings = ({ homeslider, promotional }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHomeslider, setFilteredHomeslider] = useState(homeslider);
  const [filteredPromotional, setFilteredPromotional] = useState(promotional);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedFilter = searchQuery.toLowerCase();

      const filteredHomesliderData = homeslider.filter(
        (item) =>
          item.title.toLowerCase().includes(lowercasedFilter) ||
          (item.description &&
            item.description.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredHomeslider(filteredHomesliderData);

      const filteredPromotionalData = promotional.filter(
        (item) =>
          item.ads_title.toLowerCase().includes(lowercasedFilter) ||
          (item.ads_desc &&
            item.ads_desc.toLowerCase().includes(lowercasedFilter)) ||
          (item.ads_type &&
            item.ads_type.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredPromotional(filteredPromotionalData);
    } else {
      setFilteredHomeslider(homeslider);
      setFilteredPromotional(promotional);
    }
  }, [searchQuery, homeslider, promotional]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full tabs">
      <div className="flex">
        <button
          className={`px-3 ${
            activeTab === 0 ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab(0)}
        >
          Home Slider
        </button>
        <button
          className={`px-3 ${
            activeTab === 1 ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          Promotional
        </button>
        <div className="ml-auto">
          <Input
            label="Search"
            placeholder={`Search ${
              activeTab === 0 ? "Homeslider" : "Promotional"
            } `}
            value={searchQuery}
            style={{ fontSize: "15px" }}
            onChange={handleSearchChange}
            containerProps={{ className: "!w-[300px]" }}
          />
        </div>
      </div>
      <div className="mt-5">
        {activeTab === 0 && (
          <div className="mb-5">
            <Homeslider homeslider={filteredHomeslider} />
          </div>
        )}
        {activeTab === 1 && (
          <div className="tab-Content">
            <Promotional promotional={filteredPromotional} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
