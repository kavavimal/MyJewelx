import { searchVendors } from "@/app/actions/vendor";
import { create } from "zustand";
export const initFiltersData = {
  categories: [],
  locations: [],
  subCategories: [],
  soldProducts: [],
  collections: [],
  tags: [],
  // vendors: [],
  metals: [],
  // patterns: [],
  characteristics: [],
  // sort: "Ascending",
  // price: { min: 0, max: 2000000 },
  karats: [],
  rating: [],
  // weights: [],
};
export const useVendorStore = create()(
  (set, get) => ({
    vendors: [],
    filters: initFiltersData,
    loading: false,

    setVendors: async (vendor) => {
      set({ vendors: vendor });
    },
    setFilters: async (filters) => {
      set({ loading: true, filters: filters });
      const searchedVendors = await searchVendors(filters);
      set({ vendors: searchedVendors, loading: false });
    },
  }),
  {
    name: "Vendor store",
  }
);
