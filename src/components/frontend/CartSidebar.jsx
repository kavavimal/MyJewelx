"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Quantity from "./cart/Quantity";
import { useCartStore } from "@/contexts/cartStore";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import RemoveCartItem from "./cart/RemoveCartItem";

const CartSidebar = () => {
  const carts = useCartStore((state) => state);
  const totalAmount = useCartStore((state) => state.totalAmount());

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  const refreshCart = async () => {
    carts.emptyStore();
    carts.fetchCart();
  };
  useEffect(() => {
    refreshCart();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="px-4 py-2 rounded-md flex items-center relative"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.5C1.14294 0.5 0.920376 0.592187 0.756282 0.756282C0.592187 0.920376 0.5 1.14294 0.5 1.375C0.5 1.60706 0.592187 1.82962 0.756282 1.99372C0.920376 2.15781 1.14294 2.25 1.375 2.25H1.8055C1.9955 2.25033 2.18023 2.31249 2.33177 2.4271C2.48332 2.5417 2.59344 2.70252 2.6455 2.88525L5.421 12.5977C5.57798 13.1459 5.90915 13.628 6.36443 13.9712C6.81971 14.3144 7.37435 14.5 7.9445 14.5H15.9403C16.465 14.5001 16.9777 14.3429 17.4122 14.0488C17.8468 13.7546 18.1831 13.337 18.378 12.8498L20.9575 6.39925C21.0635 6.13382 21.103 5.84646 21.0723 5.56228C21.0416 5.2781 20.9418 5.00575 20.7816 4.76905C20.6214 4.53235 20.4056 4.3385 20.1532 4.20443C19.9008 4.07037 19.6193 4.00018 19.3335 4H4.784L4.32725 2.404C4.17067 1.85585 3.8399 1.37358 3.38495 1.03007C2.92999 0.686562 2.37557 0.500498 1.8055 0.5H1.375ZM7.1045 12.1147L5.2845 5.75H19.3335L16.7522 12.2005C16.6872 12.3627 16.5752 12.5017 16.4304 12.5997C16.2857 12.6976 16.115 12.75 15.9403 12.75H7.9445C7.7545 12.7497 7.56977 12.6875 7.41823 12.5729C7.26668 12.4583 7.15656 12.2975 7.1045 12.1147ZM8.375 21.5C8.71972 21.5 9.06106 21.4321 9.37954 21.3002C9.69802 21.1683 9.9874 20.9749 10.2312 20.7312C10.4749 20.4874 10.6683 20.198 10.8002 19.8795C10.9321 19.5611 11 19.2197 11 18.875C11 18.5303 10.9321 18.1889 10.8002 17.8705C10.6683 17.552 10.4749 17.2626 10.2312 17.0188C9.9874 16.7751 9.69802 16.5817 9.37954 16.4498C9.06106 16.3179 8.71972 16.25 8.375 16.25C7.67881 16.25 7.01113 16.5266 6.51884 17.0188C6.02656 17.5111 5.75 18.1788 5.75 18.875C5.75 19.5712 6.02656 20.2389 6.51884 20.7312C7.01113 21.2234 7.67881 21.5 8.375 21.5ZM8.375 19.75C8.14294 19.75 7.92038 19.6578 7.75628 19.4937C7.59219 19.3296 7.5 19.1071 7.5 18.875C7.5 18.6429 7.59219 18.4204 7.75628 18.2563C7.92038 18.0922 8.14294 18 8.375 18C8.60706 18 8.82962 18.0922 8.99372 18.2563C9.15781 18.4204 9.25 18.6429 9.25 18.875C9.25 19.1071 9.15781 19.3296 8.99372 19.4937C8.82962 19.6578 8.60706 19.75 8.375 19.75ZM15.375 21.5C15.7197 21.5 16.0611 21.4321 16.3795 21.3002C16.698 21.1683 16.9874 20.9749 17.2312 20.7312C17.4749 20.4874 17.6683 20.198 17.8002 19.8795C17.9321 19.5611 18 19.2197 18 18.875C18 18.5303 17.9321 18.1889 17.8002 17.8705C17.6683 17.552 17.4749 17.2626 17.2312 17.0188C16.9874 16.7751 16.698 16.5817 16.3795 16.4498C16.0611 16.3179 15.7197 16.25 15.375 16.25C14.6788 16.25 14.0111 16.5266 13.5188 17.0188C13.0266 17.5111 12.75 18.1788 12.75 18.875C12.75 19.5712 13.0266 20.2389 13.5188 20.7312C14.0111 21.2234 14.6788 21.5 15.375 21.5ZM15.375 19.75C15.1429 19.75 14.9204 19.6578 14.7563 19.4937C14.5922 19.3296 14.5 19.1071 14.5 18.875C14.5 18.6429 14.5922 18.4204 14.7563 18.2563C14.9204 18.0922 15.1429 18 15.375 18C15.6071 18 15.8296 18.0922 15.9937 18.2563C16.1578 18.4204 16.25 18.6429 16.25 18.875C16.25 19.1071 16.1578 19.3296 15.9937 19.4937C15.8296 19.6578 15.6071 19.75 15.375 19.75Z"
            fill="#1A1A1A"
          />
        </svg>
        {carts && carts?.cartItems.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-400 text-white font-semibold text-xs rounded-full grid place-content-center">
            {carts?.count()}
          </span>
        )}
      </button>
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-500"
          >
            ×
          </button>
          {carts && carts?.cartItems?.length > 0 ? (
            <>
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                {carts?.cartItems?.map((cartItem) => {
                  return (
                    <li class="flex py-6" key={cartItem.id}>
                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">
                                {
                                  cartItem.productVariation?.product
                                    ?.product_name
                                }
                              </a>
                            </h3>
                            <p class="ml-4 w-1/3 text-right">
                              {CURRENCY_SYMBOL} {cartItem.price}
                            </p>
                          </div>
                          {/* <p class="mt-1 text-sm text-gray-500">vendor</p> */}
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <Quantity cartItem={cartItem} />
                          {/* <p class="text-gray-500">Qty {cartItem.quantity}</p> */}

                          <div class="flex">
                            <RemoveCartItem cartItem={cartItem} />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>
                    {CURRENCY_SYMBOL} {totalAmount}
                  </p>
                </div>
                <div class="mt-6 flex">
                  <Link
                    href="/cart"
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8">
              <p className="text-gray-700">Your cart is currently empty.</p>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}
    </>
  );
};

export default CartSidebar;
