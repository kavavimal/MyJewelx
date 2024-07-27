"use client";

import { post } from "@/utils/api";

const SendInvoice = ({ order }) => {
  async function sendEmail() {
    await post("/api/sendorderemail", { order_id: order.id });
  }
  return (
    <button
      onClick={sendEmail}
      className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
    >
      Send order email with invoice
    </button>
  );
};

export default SendInvoice;
