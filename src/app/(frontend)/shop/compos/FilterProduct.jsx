"use client";
import {
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import React from "react";

const FilterProduct = () => {
  return (
    <div>
      <div className="w-full">
        <h4 className="text-sm text-secondary-300 border-b border-[#E6E6E6] pb-2">
          Filter By Categories
        </h4>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Input label="Search Category" type="text" size="lg" />
          </div>
          {/* <List>
            <ListItem>
              <ListItemPrefix>
                <Checkbox />
              </ListItemPrefix>
            </ListItem>
          </List> */}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
