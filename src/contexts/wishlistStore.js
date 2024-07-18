import { addToLikedlist, fetchLikelist, removeFromLikedlist } from "@/actions/likes";
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
        } else {
          set({
            loading: false,
            wishlistItems: [],
          });
        }
      },
      addToWishlist: async (product_id) => {
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
      // like functions
      likedItems: [],
      findLikelist: (product_id) => {
        const { likedItems } = get();
        return likedItems.find((item) => item.productId === product_id)
          ? true
          : false;
      },
      fetchLikedlist: async () => {
        const likedlistResponse = await fetchLikelist();
        if (
          likedlistResponse.status === "success" &&
          likedlistResponse.LikedItems
        ) {
          set({
            loading: false,
            likedItems: likedlistResponse.LikedItems,
          });
        } else {
          set({
            loading: false,
            likedItems: [],
          });
        }
      },
      addToLikedlist: async (product_id) => {
        set({ loading: true });
        const { likedItems } = get();
        let newlikedItems = [...likedItems];
        const addResponse = await addToLikedlist(product_id);
        if (addResponse.status === "success") {
          newlikedItems = [...newlikedItems, addResponse.LikedItem];
          set({ likedItems: newlikedItems, loading: false });
        } else {
          set({ loading: false });
        }
      },
      removeFromLikedlist: async (product_id) => {
        set({ loading: true });
        const { likedItems } = get();
        const removeResponse = await removeFromLikedlist(product_id);
        if (removeResponse.status === "success") {
          set({
            likedItems: [
              ...likedItems.filter((item) => item.productId !== product_id),
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
