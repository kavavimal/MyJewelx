"use client";
import FileUploadIcon from "@/components/FileUploadIcon";
import { post, update } from "@/utils/api";
import { VENDOR_ID } from "@/utils/constants";
import { showToast } from "@/utils/helper";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const VendorForm = ({ vendor, storeURLs, emails, FormHeader = true }) => {
  const { countries } = useCountries();
  const [data, setData] = useState(countries);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("India");
  const { name, flags, countryCallingCode } = countries?.find(
    (item) => item.name === country
  );
  const router = useRouter();
  const [previewURL, setPreviewURL] = useState("");
  const [file, setFile] = useState("");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    store_name: Yup.string().required("Store Name is required"),
    store_url: Yup.string()
      // .url("Invalid URL")
      .required("Store URL is required")
      .test("is-unique-url", "URL already exists", async (value) => {
        return vendor
          ? storeURLs
              .filter((url) => url.store_url !== vendor?.vendor?.store_url)
              .every((url) => url.store_url !== value)
          : storeURLs.every((url) => url.store_url !== value);
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
        return vendor
          ? emails
              .filter((email) => email.email !== vendor?.email)
              .every((email) => email.email !== value)
          : emails.every((email) => email.email !== value);
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

  const [isShowPassword, setIsShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: vendor ? vendor?.firstName : "",
      lastName: vendor ? vendor?.lastName : "",
      store_name: vendor ? vendor?.vendor?.store_name : "",
      store_url: vendor ? vendor?.vendor?.store_url : "",
      email: vendor ? vendor?.email : "",
      phone_number: vendor ? vendor?.phone_number?.split(" ")[1] : "",
      password: vendor ? vendor?.password : "",
      confirm_password: vendor ? vendor?.password : "",
      role_id: VENDOR_ID,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (vendor) {
        const response = await update(`/api/user/${vendor?.id}`, {
          ...values,
          phone_number: `${countryCallingCode} ${values?.phone_number}`,
          file: file,
        });

        if (response.status === 200) {
          showToast({
            message: "Vendor Updated Successfully",
            variant: "success",
          });
        }
      } else {
        try {
          const response = await post("/api/vendor_registration", {
            ...values,
            phone_number: `${countryCallingCode} ${values?.phone_number}`,
            file: file,
          });
          if (response.status === 201) {
            enqueueSnackbar("Vendor Registration Success", {
              variant: "success",
              preventDuplicates: true,
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

            router.push("/admin/vendors");
          }
        } catch (error) {
          enqueueSnackbar(error.response?.data?.error, {
            variant: "error",
            preventDuplicates: true,
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
        }
      }
    },
  });

  useEffect(() => {
    setData(countries);
  }, [open]);

  useEffect(() => {
    if (vendor) {
      let country = {};
      country = countries.find(
        (item) =>
          item.countryCallingCode === vendor?.phone_number?.split(" ")[0]
      );
      setCountry(country?.name);
      if (vendor?.image?.path) {
        setPreviewURL(vendor?.image?.path);
      }
    }
  }, [vendor]);

  useEffect(() => {
    setPreviewURL(file ? URL.createObjectURL(file) : null);
  }, [file]);

  useEffect(() => {
    if (vendor && vendor?.image?.path) {
      setPreviewURL(vendor?.image?.path);
    }
  }, []);

  return (
    <div>
      {FormHeader && (
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-2xl font-bold trekking-wide font-emirates">
            {vendor ? "Store Account" : "Create Store Account"}
          </h4>
          <Button variant="outlined" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      )}
      <div className="flex items-start justify-center">
        <div className="bg-white p-7 shadow-3xl rounded-2xl w-full">
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
                    error={formik.errors.firstName && formik.touched.firstName}
                  />

                  {formik.errors.firstName && formik.touched.firstName && (
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

                  {formik.errors.lastName && formik.touched.lastName && (
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

                  {formik.errors.store_name && formik.touched.store_name && (
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
                    error={formik.errors.store_url && formik.touched.store_url}
                  />

                  {formik.errors.store_url && formik.touched.store_url && (
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
                    readOnly={vendor}
                  />

                  {formik.errors.email && formik.touched.email && (
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

                {!vendor && (
                  <>
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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                  </>
                )}

                <div className="col-span-2">
                  <label
                    htmlFor={`vendor-image`}
                    className={`flex h-28 w-28 flex-col items-center rounded-full justify-center border-2 ${
                      formik.errors.file && formik.touched.file
                        ? "border-red-500"
                        : "border-blueGray-100"
                    } border-dashed cursor-pointer bg-gray-50 dark:hover :bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                  >
                    {previewURL ? (
                      <div className="flex justify-center items-center h-full">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={previewURL}
                          alt="Preview"
                        />
                      </div>
                    ) : (
                      <FileUploadIcon />
                    )}
                    <input
                      id={`vendor-image`}
                      type="file"
                      name="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
                <div>
                  <Button
                    fullWidth
                    size="lg"
                    type="submit"
                    className="flex justify-center items-center"
                    loading={formik.isSubmitting}
                  >
                    {vendor ? "Update Vendor" : "Create Vendor"}
                  </Button>
                  {/* <Typography className="text-sm text-secondary-100 mt-1.5 font-emirates">
                    By proceeding next, you are agree with the my jewlex{" "}
                    <Link href="/" className="text-primary-200">
                      Term of use
                    </Link>{" "}
                    and{" "}
                    <Link href="/" className="text-primary-200">
                      Privacy Policy
                    </Link>
                  </Typography> */}
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
