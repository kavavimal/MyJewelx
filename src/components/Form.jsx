"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
// import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { USER_ROLES } from "@/lib/constants";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import { AcountType } from "@prisma/client";
import { registrationValidationSchema } from "@/schemas/ValidationSchema";

export default function Form({ type }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpSendTimeout, setOtpSendTimeout] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState();
  const [isTextPassword, setIsTextPassword] = useState(false);

  if (session) {
    if (role === AcountType.ADMIN) {
      redirect("/admin/dashboard");
    } else {
      redirect("/");
    }
  }

  const startOtpTimeout = () => {
    // Set otpSendTimeout to true
    setOtpSendTimeout(false);
    setTimeout(() => {
      setOtpSendTimeout(true);
    }, 10 * 1000); // 10 seconds in milliseconds
  };

  const socialLogin = (socialMediaType) => {
    signIn(socialMediaType, {
      redirect: false,
    });
  };

  const requestOtp = (e) => {
    registrationValidationSchema.validate(formData, { abortEarly: false });
    e.preventDefault();
    setOtpError("");
    setLoading(true);
    if (!formData.email || formData.email === "") {
      setOtpError("email is required");
      console.log("error email is required");
    } else {
      startOtpTimeout();
      fetch("/api/auth/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          phone_number: formData.phone_number,
          mode: "registration",
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 201) {
          // toast.success("Account created! Redirecting to login...");
          setIsOtpSent(true);
        } else {
          const { error, issues } = await res.json();
          if (error === "ZodError") {
            const ZodError = issues.map((issue) => issue.message);
            setOtpError(ZodError);
          } else setOtpError(error);
          console.error("send Otp Failed", error);
          // toast.error(error);
        }
      });
    }
  };

  const requestResendOtp = (e) => {
    e.preventDefault();
    setOtpError("");
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
          mode: "registration",
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
          setEmailVerified(true);
          setIsOtpSent(false);
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
          if (type === "login") {
            signIn("credentials", {
              redirect: false,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            })
              .then((res) => {
                if (res?.error) {
                  if (res?.status == 401) {
                    setLoginError("Your Provided credentials are Incorrect");
                  }
                  setLoading(false);
                  // toast.error(res?.error);
                } else {
                  // router.push("/checkuser");
                  window.location.replace("/checkuser");
                }
              })
              .catch((error) => {
                console.log("catch", error);
              });
          } else {
            fetch("/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: e.currentTarget.firstName.value,
                lastName: e.currentTarget.lastName.value,
                // phone_number: e.currentTarget.phone_number.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
                confirmPassword: e.currentTarget.confirmPassword.value,
              }),
            })
              .then(async (res) => {
                setLoading(false);
                if (res.status === 201) {
                  enqueueSnackbar("Registration Successfull", {
                    variant: "success",
                    preventDuplicate: true,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                    autoHideDuration: 3000,
                    style: {
                      background: "white",
                      color: "black",
                      borderRadius: ".5rem",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      padding: "0 4px",
                    },
                  });
                  // setTimeout(() => {
                  //   router.push("/login");
                  // }, 2000);
                  router.push("/login");
                } else {
                  const { error } = await res.json();
                  console.error("Registration Failed");
                  // toast.error(error);
                }
              })
              .catch((error) => {
                setLoading(false);
              });
          }
        }}
      >
        <div className="flex flex-col gap-5">
          {loginError.length > 0 && (
            <span className="text-sm text-red-400">{loginError}</span>
          )}
          {type === "register" ? (
            <>
              <div className="flex gap-5">
                <div>
                  <Input
                    label="Firstname"
                    name="firstName"
                    type="text"
                    placeholder=""
                    className="font-emirates"
                    containerProps={{
                      className: "!min-w-0",
                    }}
                    labelProps={{
                      className: "font-emirates",
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Lastname"
                    name="lastName"
                    type="text"
                    placeholder=" "
                    containerProps={{
                      className: "!min-w-0",
                    }}
                    labelProps={{
                      className: "font-emirates",
                    }}
                    className="font-emirates"
                  />
                </div>
              </div>
              {/* <div className="relative w-full min-w-[200px] h-11">
                <input
                  name="phone_number"
                  type="text"
                  className="w-full h-full px-3 py-4 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                  onChange={(e) => {
                    setFormData({ ...formData, phone_number: e.target.value });
                  }}
                />
                <label className="flex text-base w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Phone Number
                </label>
              </div> */}
            </>
          ) : (
            ""
          )}
          <div className="relative w-full min-w-[200px] h-11">
            <Input
              name="email"
              type="email"
              size="lg"
              placeholder=" "
              label={"Email"}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              disabled={isOtpSent}
              className="rounded"
              labelProps={{
                className: "font-emirates",
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              name="password"
              type={isTextPassword ? "text" : "password"}
              placeholder=" "
              size="lg"
              label="Password"
              className="rounded"
              labelProps={{
                className: "font-emirates",
              }}
              icon={
                <button
                  type="button"
                  onClick={() => setIsTextPassword(!isTextPassword)}
                >
                  {isTextPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                        <path
                          fill="currentColor"
                          d="M3.05 9.31a1 1 0 1 1 1.914-.577c2.086 6.986 11.982 6.987 14.07.004a1 1 0 1 1 1.918.57a9.509 9.509 0 0 1-1.813 3.417L20.414 14A1 1 0 0 1 19 15.414l-1.311-1.311a9.116 9.116 0 0 1-2.32 1.269l.357 1.335a1 1 0 1 1-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 1 1-1.931-.518l.357-1.335a9.118 9.118 0 0 1-2.32-1.27l-1.31 1.312A1 1 0 0 1 3.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414Z"
                        ></path>
                      </g>
                    </svg>
                  )}
                </button>
              }
            />

            {type === "login" ? (
              <div className="flex justify-between items-center">
                <Checkbox label="Remember me" className="rounded" />
                <Link
                  href="/forgotpassword"
                  className="text-primary-200 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
          {type === "register" ? (
            <>
              <div>
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  labelProps={{
                    className: "font-emirates",
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}

          {isOtpSent ? (
            <div className="relative w-full min-w-[200px] h-11">
              <Input
                name="otp"
                label="Enter OTP"
                type="password"
                placeholder=" "
                onChange={(e) => {
                  setFormData({ ...formData, otp: e.target.value });
                }}
                labelProps={{
                  className: "font-emirates",
                }}
                icon
              />
            </div>
          ) : (
            ""
          )}
          {otpError && typeof otpError === "string" && (
            <span className="text-sm text-red-400 leading-3">{otpError}</span>
          )}

          {otpError &&
            typeof otpError === "object" &&
            otpError.map((error, index) => (
              <span key={index} className="text-sm text-red-400 leading-3">
                {error}
              </span>
            ))}
          {type === "register" && !emailVerified && (
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
                  className="bg-primary-200 text-black rounded normal-case w-full flex items-center justify-center"
                >
                  Verify Otp
                </Button>
              ) : (
                // <button
                //   data-ripple-light="true"
                //   className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                //   type="button"
                //   onClick={requestOtp}
                //   disabled={emailVerified}
                // >
                //   Send Otp
                // </button>
                <Button
                  onClick={requestOtp}
                  loading={loading}
                  className="w-full flex items-center justify-center bg-primary-200 text-black rounded normal-case"
                >
                  Send Otp
                </Button>
              )}
              {isOtpSent && otpSendTimeout && (
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
                  className="w-full flex items-center justify-center bg-primary-200 text-black rounded normal-case"
                >
                  Resend OTP
                </Button>
              )}
            </div>
          )}

          {type === "register" && emailVerified && (
            <div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center bg-primary-200 text-black rounded normal-case"
                loading={loading}
              >
                Register
              </Button>
            </div>
          )}

          {type === "login" && (
            <div>
              <Button
                type="submit"
                size="lg"
                className="rounded w-full flex justify-center items-center bg-primary-200 text-black font-semibold font-emirates normal-case text-base"
                loading={loading}
              >
                <span className="font-emirates">Sign In</span>
              </Button>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            Or
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                variant="outlined"
                className="rounded w-full border-secondary-200 text-secondary-200 font-emirates normal-case text-base font-normal"
                onClick={() => signIn("google")}
              >
                <span className="flex gap-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    ></path>
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                  </svg>
                  Continue with google
                </span>
              </Button>

              <Button
                type="button"
                variant="outlined"
                className="rounded w-full border-secondary-200 text-secondary-200 font-emirates normal-case text-base font-normal"
                onClick={() => socialLogin("facebook")}
              >
                <span className="flex gap-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#1877f2"
                      d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                    ></path>
                    <path
                      fill="#fff"
                      d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
                    ></path>
                  </svg>
                  Continue with facebook
                </span>
              </Button>

              <Button
                type="button"
                variant="outlined"
                className="rounded w-full border-secondary-200 text-secondary-200 font-emirates normal-case text-base font-normal"
              >
                <span className="flex gap-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#0a66c2"
                      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                    ></path>
                  </svg>
                  Continue with Linkedin
                </span>
              </Button>
            </div>

            <div className="mt-2">
              <Typography className="font-emirates text-sm text-gray-700">
                By proceeding next, you are agree with the my jewlex Term of use
                and{" "}
                <Link href="/" className="text-primary-200">
                  Privacy Policy
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
