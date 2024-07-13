import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChekcoutStore = create()(
  persist(
    (set, get) => ({
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: "cod",
      errors: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingAddress: (address) => set({ billingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setError: (errors) => set({ errors: errors }),
    }),
    {
      name: "Checkout store",
    }
  )
);
