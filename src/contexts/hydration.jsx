"use client";

import * as React from "react";
import { useCartStore } from "@/contexts/cartStore";

const Hydration = () => {
  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
