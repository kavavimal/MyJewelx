"use client";

import { useState } from "react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const sendOtp = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    setLoading(true);
    if (!formData.email || formData.email === "") {
      console.log("error email is required");
    } else {
      fetch("/api/auth/sendForgotOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 201) {
          // toast.success("Account created! Redirecting to login...");
          setIsOtpSent(true);
        } else {
          const { error } = await res.json();
          console.error("send Otp Failed", error);
          // toast.error(error);
        }
      });
    }
  };
  const VerifyOtp = (e) => {
    e.preventDefault();

    setLoading(true);
    if (!formData.email || formData.email === "") {
      console.log("error email is required");
    } else if (!formData.otp || formData.otp === "") {
      console.log("error otp is required");
    } else {
      fetch("/api/auth/verifyForgotOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 201) {
          // toast.success("Account created! Redirecting to login...");
          setIsOtpSent(false);
          setFormData({});
        } else {
          const { error } = await res.json();
          console.error("Verify Otp Failed", error);
          // toast.error(error);
        }
      });
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="relative w-full min-w-[200px] h-11">
            <input
              name="email"
              type="email"
              className="w-full h-full px-3 py-4 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
              disabled={isOtpSent}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <label className="flex text-base w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Email
            </label>
          </div>
          {isOtpSent ? (
            <div className="relative w-full min-w-[200px] h-11">
              <input
                name="otp"
                type="password"
                className="w-full h-full px-3 py-4 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                onChange={(e) => {
                  setFormData({ ...formData, otp: e.target.value });
                }}
              />
              <label className="flex text-base w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Otp
              </label>
            </div>
          ) : (
            ""
          )}

          <div>
            {isOtpSent ? (
              <button
                data-ripple-light="true"
                className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={VerifyOtp}
              >
                Verify Otp
              </button>
            ) : (
              <button
                data-ripple-light="true"
                className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={sendOtp}
              >
                Send Otp
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
