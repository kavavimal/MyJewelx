import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChekcoutStore = create()(
  persist(
    (set, get) => ({
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: null,
      setShippingAddress: (address) =>
        set((state) => ({
          checkout: {
            ...state.checkout,
            shippingAddress: address,
          },
        })),
      setBillingAddress: (address) =>
        set((state) => ({
          checkout: {
            ...state.checkout,
            billingAddress: address,
          },
        })),
      setPaymentMethod: (method) =>
        set((state) => ({
          checkout: {
            ...state.checkout,
            paymentMethod: method,
          },
        })),
    }),
    {
      name: "Checkout store",
    }
  )
);
