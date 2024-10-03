import { searchProducts } from "@/app/actions/product";
import { create } from "zustand";
export const initFilterData = {
  categories: [],
  subCategories: [],
  vendors: [],
  metals: [],
  patterns: [],
  characteristics: [],
  sort: "Ascending",
  price: { min: 0, max: 2000000 },
  karats: [],
  rating: [],
  weights: [],
};
export const useShopStore = create()(
  (set, get) => ({
    products: [],
    filters: initFilterData,
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
