"use client";
import LoadingDots from "@/components/loading-dots";
import { useCartStore } from "@/contexts/cartStore";
import { showToast } from "@/utils/helper";
import { useEffect, useState } from "react";

const Quantity = ({ cartItem, maxQ }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const findItem = useCartStore((state) => state.findItem);
  const updateQanity = useCartStore((state) => state.updateCartQantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [localLoading, setLocalLoading] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(maxQ || -1);
  const [q, setQ] = useState(cartItem.quantity);

  useEffect(() => {
    setMaxQuantity(maxQ || -1);
  },[maxQ]);

  useEffect(() => {
    let cartI = findItem(cartItem.cartItem_id);
    if (cartI.quantity !== q) {
      setQ(cartI.quantity);
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
    if (newQ > maxQuantity) {
      showToast({message: "Max product Quantity reached", variant: "error"});
    } else {
      setLocalLoading(true);
      await updateQanity(cartItem.cartItem_id, newQ);
      setLocalLoading(false);
    }
  };

  return (
    <>
      {localLoading === true && <LoadingDots />}
      <div className="flex items-center border rounded-sm text-md pointer">
        <button
          type="button"
          disabled={q === 1}
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className="inline-flex h-7 w-7 items-center justify-center  border-r"
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
              stroke-linejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          className="w-10 border-0 bg-transparent text-center font-medium focus:outline-0"
          placeholder=""
          value={q < 9 ? "0" + q : q}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="inline-flex h-7 w-7 items-center justify-center border-l"
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
              stroke-linejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Quantity;
