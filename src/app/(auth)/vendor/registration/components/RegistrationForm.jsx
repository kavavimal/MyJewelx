"use client";
import { VENDOR_ID } from "@/utils/constants";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import OTP from "./OTP";
import { isCompanyEmail } from "company-email-validator";
import { useCountries } from "use-react-countries";
import FileUploadIcon from "@/components/FileUploadIcon";
import { post } from "@/utils/api";

const RegistrationForm = ({ storeURLs, emails }) => {
  const { countries } = useCountries();
  const [data, setData] = useState(countries);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("India");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [file, setFile] = useState("");

  const { name, flags, countryCallingCode } = countries?.find(
    (item) => item.name === country
  );

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    store_name: Yup.string().required("Store Name is required"),
    store_url: Yup.string()
      // .url("Invalid URL")
      .required("Store URL is required")
      .test("is-unique-url", "URL already exists", async (value) => {
        return storeURLs.every((url) => url.store_url !== value);
      }),
    email: Yup.string()
      .email("Invalid email")
      .required("Store Email is required")
      // .test(
      //   "is-company-email",
      //   "Please enter a valid company email",
      //   async (value) => isCompanyEmail(value)
      // )
      .test("is-unique-email", "Email already exists", async (value) => {
        return emails.every((email) => email.email !== value);
      }),
    phone_number: Yup.number()
      .typeError("Invalid phone number")
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(8, "Password must have 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      store_name: "",
      store_url: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      role_id: VENDOR_ID,
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/auth/otp/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values?.email,
            mode: "registration",
          }),
        });
        if (response.status === 201) {
          showToast({
            message: "Otp Is Send To Your Mail",
            variant: "success",
          });
          setShowOtp(true);
          // router.push(`?email=${values?.email}`);
        } else if (response.status === 400) {
          showToast({ message: "Email is Already Exist", variant: "error" });
        }
      } catch (error) {
        showToast({ message: error.message, variant: "error" });
      }
    },
  });

  const onOTPVerified = async () => {
    let registration = await post("/api/vendor_registration", {
      ...formik.values,
      phone_number: `${countryCallingCode} ${formik.values?.phone_number}`,
      file: file,
    });

    if (registration.status === 201) {
      showToast({
        message: "Vendor Registration Success, Please complete your profile",
        variant: "success",
      });
    }

    router.push(`/vendor/details?id=${registration.data?.vendor?.id}`);
  };

  useEffect(() => {
    formik.setFieldValue("file", file);
  }, [file]);

  useEffect(() => {
    if (!open) {
      setData(countries);
    }
  }, [open]);

  return (
    <div className="py-20 bg-[#FFFCF5] w-full overflow-auto">
      <div className="h-full flex items-center justify-center">
        {showOtp && formik.values?.email ? (
          <OTP
            setShowOtp={setShowOtp}
            onOTPVerified={onOTPVerified}
            email={formik.values?.email}
          />
        ) : (
          <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-bold trekking-wide font-emirates mb-14">
                Create Vendor Account
              </h4>
            </div>
            <Formik initialValues={formik.initialValues}>
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 items-start gap-6">
                  <div>
                    <Input
                      label="First Name"
                      type="text"
                      size="lg"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.firstName && formik.touched.firstName
                      }
                    />

                    {formik?.errors?.firstName &&
                      formik?.touched?.firstName && (
                        <div className="text-red-500 text-xs mt-2 ms-2">
                          {formik.errors.firstName}
                        </div>
                      )}
                  </div>
                  <div>
                    <Input
                      label="Last Name"
                      type="text"
                      size="lg"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.lastName && formik.touched.lastName}
                    />

                    {formik?.errors?.lastName && formik?.touched?.lastName && (
                      <div className="text-red-500 text-xs mt-2 ms-2">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Store Name"
                      type="text"
                      size="lg"
                      name="store_name"
                      value={formik.values.store_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.store_name && formik.touched.store_name
                      }
                    />

                    {formik?.errors?.store_name &&
                      formik?.touched?.store_name && (
                        <div className="text-red-500 text-xs mt-2 ms-2">
                          {formik.errors.store_name}
                        </div>
                      )}
                  </div>
                  <div>
                    <Input
                      label="Store URL"
                      size="lg"
                      name="store_url"
                      value={formik.values.store_url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.store_url && formik.touched.store_url
                      }
                    />

                    {formik?.errors?.store_url &&
                      formik?.touched?.store_url && (
                        <div className="text-red-500 text-xs mt-2 ms-2">
                          {formik.errors.store_url}
                        </div>
                      )}
                  </div>
                  <div>
                    <Input
                      label="Store Email"
                      type="email"
                      size="lg"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.email && formik.touched.email}
                    />

                    {formik?.errors?.email && formik?.touched?.email && (
                      <div className="text-red-500 text-xs mt-2 ms-2">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="relative flex w-full">
                      <Menu
                        dismiss={{
                          itemPress: false,
                        }}
                        placement="bottom-start"
                        handler={(e) => {
                          setOpen(e);
                        }}
                        open={open}
                      >
                        <MenuHandler>
                          <Button
                            size="lg"
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-11 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-4 w-4 rounded-full object-cover"
                            />
                            {countryCallingCode}
                          </Button>
                        </MenuHandler>
                        <MenuList
                          dismissible={false}
                          className="max-h-[20rem] max-w-[18rem]"
                        >
                          <Input
                            label="Search"
                            placeholder="Search"
                            className="w-full"
                            onChange={(e) => {
                              if (!e.target.value || e.target.value === "") {
                                setData(countries);
                              } else {
                                const input = e.target.value.toLowerCase();
                                const filtered = countries.filter(({ name }) =>
                                  name.toLowerCase().includes(input)
                                );
                                setData(filtered);
                              }
                            }}
                          />
                          {data.map(
                            ({ name, flags, countryCallingCode }, index) => {
                              return (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  className="flex items-center gap-2"
                                  onClick={() => setCountry(name)}
                                >
                                  <img
                                    src={flags.svg}
                                    alt={name}
                                    className="h-5 w-5 rounded-full object-cover"
                                  />
                                  {name}{" "}
                                  <span className="ml-auto">
                                    {countryCallingCode}
                                  </span>
                                </MenuItem>
                              );
                            }
                          )}
                        </MenuList>
                      </Menu>
                      <Input
                        type="tel"
                        name="phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="lg"
                        placeholder="Mobile Number"
                        error={
                          formik.errors.phone_number &&
                          formik.touched.phone_number
                        }
                        className={`rounded-l-none ${
                          formik.errors.phone_number &&
                          formik.touched.phone_number
                            ? "!border-blue-red-200 focus:!border-red-500"
                            : "!border-blue-gray-200 focus:!border-gray-900"
                        }`}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                    </div>

                    {formik?.errors?.phone_number &&
                      formik?.touched?.phone_number && (
                        <div className="text-red-500 text-xs mt-2 ms-2">
                          {formik.errors.phone_number}
                        </div>
                      )}
                  </div>
                  <div className="grid items-start gap-6">
                    <div>
                      <Input
                        label="Password"
                        type={isShowPassword ? "text" : "password"}
                        size="lg"
                        icon={
                          <span
                            className="cursor-pointer"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          >
                            {isShowPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            )}
                          </span>
                        }
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.password && formik.touched.password
                        }
                      />

                      {formik?.errors?.password &&
                        formik?.touched?.password && (
                          <div className="text-red-500 text-xs mt-2 ms-2">
                            {formik.errors.password}
                          </div>
                        )}
                    </div>
                    <div>
                      <Input
                        label="Confirm Password"
                        type="password"
                        size="lg"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.confirm_password &&
                          formik.touched.confirm_password
                        }
                      />

                      {formik?.errors?.confirm_password &&
                        formik?.touched?.confirm_password && (
                          <div className="text-red-500 text-xs mt-2 ms-2">
                            {formik.errors.confirm_password}
                          </div>
                        )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={`vendor-image`}
                      className={`flex h-28 w-full flex-col items-center justify-center border-2 ${
                        formik.errors.file && formik.touched.file
                          ? "border-red-500"
                          : "border-blueGray-100"
                      } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                    >
                      {file && file !== "" ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview image"
                          height="100px"
                          width="100px"
                        />
                      ) : (
                        <FileUploadIcon />
                      )}
                      <input
                        id={`vendor-image`}
                        type="file"
                        name="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </label>

                    {formik?.errors?.file && (
                      <div className="text-red-500 text-xs mt-2 ms-2">
                        {formik.errors.file}
                      </div>
                    )}
                  </div>

                  <div>
                    <Button
                      fullWidth
                      size="lg"
                      type="submit"
                      className="flex justify-center items-center"
                      loading={formik.isSubmitting}
                    >
                      Registration
                    </Button>
                    <Typography className="text-sm text-secondary-100 mt-1.5 font-emirates">
                      By proceeding next, you are agree with the my jewlex{" "}
                      <Link href="/" className="text-primary-200">
                        Term of use
                      </Link>{" "}
                      and{" "}
                      <Link href="/" className="text-primary-200">
                        Privacy Policy
                      </Link>
                    </Typography>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
