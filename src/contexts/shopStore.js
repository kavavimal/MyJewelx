import { searchProducts } from "@/actions/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShopStore = create()(
  (set, get) => ({
    products: [],
    filters: {
      categories: [],
      vendors: [],
      metals: [],
      patterns: [],
      characteristics: [],
      sort: "Ascending",
      price: { min: 0, max: 2000000 },
    },
    loading: false,

    setProducts: async (products) => {
      set({ products: products });
    },
    setFilters: async (filters) => {
      set({ loading: true, filters: filters });
      const searchedProducts = await searchProducts(filters);
      set({ products: searchedProducts, loading: false });
    },
  }),
  {
    name: "Shop store",
  }
);
