"use client";
import LoadingDots from "@/components/loading-dots";
import { useCartStore } from "@/contexts/cartStore";
import { showToast } from "@/utils/helper";
import { useEffect, useState } from "react";

const Quantity = ({ cartItem }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const findItem = useCartStore((state) => state.findItem);
  const updateQanity = useCartStore((state) => state.updateCartQantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [localLoading, setLocalLoading] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(
    cartItem.productVariation?.quantity || -1
  );
  const [q, setQ] = useState(cartItem.quantity);

  useEffect(() => {
    setMaxQuantity(cartItem?.productVariation?.quantity || -1);
  }, [cartItem]);

  useEffect(() => {
    let cartI = findItem(cartItem.cartItem_id);
    if (cartI?.quantity !== q) {
      setQ(cartI?.quantity);
    }
  }, [cartItems, cartItem]);

  const quantityChange = async (type) => {
    let cartI = findItem(cartItem.cartItem_id);
    let newQ = cartI?.quantity;
    if (type === "increment") {
      newQ = parseInt(newQ) + 1;
      // setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "decrement" && cartItem?.quantity === 1) {
      setLocalLoading(true);
      await removeFromCart(cartItem.cartItem_id);
      setLocalLoading(false);
    } else if (type === "decrement" && cartItem?.quantity > 1) {
      newQ = parseInt(newQ) - 1;
      // setQuantity((prevQuantity) => prevQuantity - 1);
    }
    if (type === "increment" && maxQuantity !== -1 && newQ > maxQuantity) {
      showToast({ message: "Max product Quantity reached", variant: "error" });
    } else {
      setLocalLoading(true);
      await updateQanity(cartItem.cartItem_id, newQ);
      setLocalLoading(false);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <div className="flex items-center border rounded-sm text-md pointer">
        <button
          type="button"
          disabled={q === 1}
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className="inline-flex h-9 w-9 items-center justify-center  border-r bg-blueGray-400 disabled:opacity-50"
          onClick={() => quantityChange("decrement")}
        >
          <svg
            className="mt-1 h-2 w-4 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          className="w-20 border-0 bg-transparent text-center font-medium focus:outline-0"
          placeholder=""
          value={q < 9 ? "0" + q : q}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="inline-flex h-9 w-9 items-center justify-center border-l bg-blueGray-400"
          onClick={() => quantityChange("increment")}
        >
          <svg
            className="h-2.5 w-2.5 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      {localLoading === true && <LoadingDots />}
    </div>
  );
};

export default Quantity;
