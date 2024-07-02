import { getCart, removeFromCart, updateCartQuantity } from "@/actions/cart";
import addToCart from "@/actions/cart/addToCart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface BearState {
//   bears: number;
//   increaseBears: () => void;
//   decreaseBears: () => void;
//   removeAllBears: () => void;
// }

export const useCartStore = create()(
  persist(
    (set, get) => ({
      cartItems: [],
      loading: false,
      count: () => {
        const { cartItems } = get();
        if (cartItems.length)
          return cartItems
            .map((item) => item.quantity)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      fetchCart: async () => {
        const cartres = await getCart();
        if (cartres.status === "success" && cartres.cartData) {
          set({ cartItems: cartres.cartData.cartItems });
        }
      },
      updateCartQantity: async (itemId, qty) => {
        const { cartItems } = get();
        set({ loading: true });
        const updateres = await updateCartQuantity(itemId, qty);
        if (updateres.status === "success") {
          set({
            cartItems: [
              ...cartItems.map((item) =>
                item.cartItem_id === itemId ? updateres.cartData : item
              ),
            ],
            loading: false,
          });
        } else {
          set({ loading: false });
        }
      },
      addToCart: async (item) => {
        set({ loading: true });
        const { cartItems } = get();
        let newCartItems = [...cartItems];
        const itemres = await addToCart(item);
        if (itemres.status === "success") {
          console.log("item res", itemres);
          newCartItems = [...newCartItems, itemres.cartItem];
          set({ cartItems: newCartItems, loading: false });
        } else {
          set({ loading: false });
        }
      },
      removeFromCart: async (itemId) => {
        set({ loading: true });
        const { cartItems } = get();
        const removeres = await removeFromCart(itemId);
        if (removeres.status === "success") {
          set({
            cartItems: [
              ...cartItems.filter((item) => item.cartItem_id !== itemId),
            ],
            loading: false,
          });
        } else {
          set({ loading: false });
        }
      },
      emptyStore: () =>
        set((state) => {
          return {
            cartItems: [],
          };
        }),
      totalAmount: () => {
        const { cartItems } = get();
        return cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);
        return 0;
      },
    }),
    {
      name: "cart store",
    }
  )
);
