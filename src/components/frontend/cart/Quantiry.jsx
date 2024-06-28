import { updateCartQuantity } from "@/actions/cart";
import { showToast } from "@/utils/helper";
import { useEffect, useState } from "react";

const Quantity = ({ cartItem }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isLoading, setIsLoading] = useState(false);

  const quantityChange = (type) => {
    setIsLoading(true);
    if (type === "increment") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  async function handleQuantity() {
    const res = await updateCartQuantity(cartItem.cartItem_id, quantity);
    if (res.success === true) {
      console.log("response", res.message, res);
      showToast({ message: "Quantity updated successfully." });
    } else {
      showToast({ message: "Quantity not updated.", variant: "error" });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleQuantity();
  }, [quantity]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        disabled={quantity === 1 || isLoading}
        id="decrement-button"
        data-input-counter-decrement="counter-input"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        onClick={() => quantityChange("decrement")}
      >
        <svg
          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        id="counter-input"
        disabled={isLoading}
        data-input-counter
        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
        placeholder=""
        value={quantity}
        required
      />
      <button
        type="button"
        id="increment-button"
        data-input-counter-increment="counter-input"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        onClick={() => quantityChange("increment")}
      >
        <svg
          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default Quantity;
