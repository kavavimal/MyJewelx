import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "@/actions/wishlist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      loading: false,
      count: () => {
        const { wishlistItems } = get();
        return wishlistItems.length;
      },
      find: (product_id) => {
        const { wishlistItems } = get();
        return wishlistItems.find((item) => item.productId === product_id)
          ? true
          : false;
      },
      fetchWishlist: async () => {
        const wishlistResponse = await fetchWishlist();
        if (
          wishlistResponse.status === "success" &&
          wishlistResponse.wishlistItems
        ) {
          set({
            loading: false,
            wishlistItems: wishlistResponse.wishlistItems,
          });
        }
      },
      addToWishlist: async (product_id) => {
        console.log("called addToWishlist");
        set({ loading: true });
        const { wishlistItems } = get();
        let newwishlistItems = [...wishlistItems];
        const addResponse = await addToWishlist(product_id);
        if (addResponse.status === "success") {
          newwishlistItems = [...newwishlistItems, addResponse.wishlistItem];
          set({ wishlistItems: newwishlistItems, loading: false });
        } else {
          set({ loading: false });
        }
      },
      removeFromWishlist: async (product_id) => {
        console.log("called removeFromWishlist");
        set({ loading: true });
        const { wishlistItems } = get();
        const removeResponse = await removeFromWishlist(product_id);
        if (removeResponse.status === "success") {
          set({
            wishlistItems: [
              ...wishlistItems.filter((item) => item.productId !== product_id),
            ],
            loading: false,
          });
        } else {
          set({ loading: false });
        }
      },
    }),
    {
      name: "Wishlist store",
    }
  )
);
