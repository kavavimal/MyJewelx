"use client";

import { useState } from "react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpSendTimeout, setOtpSendTimeout] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState();
  const [otpError, setOtpError] = useState();
  const router = useRouter();

  const sendOtp = (e) => {
    e.preventDefault();
    setOtpError("");
    console.log("formdata", formData);
    setLoading(true);
    if (!formData.email || formData.email === "") {
      setOtpError("email is required");
      console.log("error email is required");
    } else {
      // fetch("/api/auth/sendForgotOtp", {
      startOtpTimeout();
      fetch("/api/auth/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          mode: "forgotPassword",
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 201) {
          // toast.success("Account created! Redirecting to login...");
          setIsOtpSent(true);
        } else {
          const { error } = await res.json();
          setOtpError("send Otp Failed");
          console.error("send Otp Failed", error);
          // toast.error(error);
        }
      });
    }
  };

  const startOtpTimeout = () => {
    // Set otpSendTimeout to true
    setOtpSendTimeout(false);
    setTimeout(() => {
      setOtpSendTimeout(true);
    }, 10 * 1000); // 10 seconds in milliseconds
  };

  const requestResendOtp = (e) => {
    e.preventDefault();
    setOtpError("");
    console.log("formdata", formData);
    setLoading(true);
    if (!formData.email || formData.email === "") {
      setOtpError("email is required");
      console.log("error email is required");
    } else {
      startOtpTimeout();
      fetch("/api/auth/otp/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          phone_number: formData.phone_number,
          mode: "forgotPassword",
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 201) {
          // toast.success("Account created! Redirecting to login...");
          setIsOtpSent(true);
        } else {
          const { error } = await res.json();
          setOtpError("send Otp Failed");
          console.error("send Otp Failed", error);
          // toast.error(error);
        }
      });
    }
  };

  const VerifyOtp = (e) => {
    e.preventDefault();
    setOtpError("");
    setLoading(true);
    if (!formData.email || formData.email === "") {
      console.log("email is required");
    } else if (!formData.otp || formData.otp === "") {
      setOtpError("otp is required");
      console.log("error otp is required");
    } else {
      // fetch("/api/auth/verifyForgotOtp", {
      fetch("/api/auth/otp/verify", {
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
          setOtpVerified(true);
          setIsOtpSent(false);
          const responseData = await res.json(); // Parse response JSON
          setUpdatedPassword(responseData.data.password);
          setFormData({});
        } else {
          const { error } = await res.json();
          setOtpError("Verify Otp Failed");
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
          {updatedPassword && (
            <span className="text-sm">
              Your New password :{" "}
              <span className="text-blue-500">{updatedPassword}</span>
            </span>
          )}
          {otpError && (
            <span className="text-sm text-red-400 leading-3">{otpError}</span>
          )}
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

          <div className="flex gap-2">
            {isOtpSent ? (
              // <button
              //   data-ripple-light="true"
              //   className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              //   type="button"
              //   onClick={VerifyOtp}
              // >
              //   Verify Otp
              // </button>
              <Button
                onClick={VerifyOtp}
                loading={loading}
                className="w-full justify-center items-center"
              >
                Verify Otp
              </Button>
            ) : (
              // <button
              //   data-ripple-light="true"
              //   className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              //   type="button"
              //   onClick={sendOtp}
              //   disabled={otpVerified}
              // >
              //   Send Otp
              // </button>
              <Button
                onClick={sendOtp}
                loading={loading}
                className="w-full justify-center items-center"
                disabled={otpVerified}
              >
                Send Otp
              </Button>
            )}
            {isOtpSent && otpSendTimeout && !otpVerified && (
              // <button
              //   data-ripple-light="true"
              //   className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              //   type="button"
              //   onClick={requestResendOtp}
              // >
              //   Resend OTP
              // </button>
              <Button
                onClick={requestResendOtp}
                loading={loading}
                className="w-full justify-center items-center"
              >
                Resend OTP
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
