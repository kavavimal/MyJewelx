"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { post } from "@/utils/api";
function QuickContact({ vendor }) {
  const session = useSession();
  const router = useRouter();
  console.log(vendor);
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name should have at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number should be 10 digits"),
    message: Yup.string()
      .required("Message is required")
      .min(5, "Message should have at least 5 characters"),
  });
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    vendorId: vendor?.id || "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    if (!session.data) {
      Cookies.set("redirect", window.location.href, { expires: 1 });
      return router.push("/login");
    } else {
      try {
        const response = await post(`/api/contact/`, values);
        console.log("Form values:", response);
        if (response.status === 200) {
          enqueueSnackbar("User updated successfully", {
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
          router.refresh();
          resetForm();
        }
      } catch (error) {
        enqueueSnackbar(error, {
          variant: "error",
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
      }
    }
  };

  return (
    <>
      <section className="pt-5 pb-[70px]">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="border-2 rounded-[4px] border-primary-200 border-l-0 border-r-0 border-b-0 bg-primary-50 pt-[50px] pl-[50px] pb-[46px] pr-[60px] w-[1100px] max-w-[1100px] ">
              <div className="flex gap-[60px]">
                <div>
                  <Image
                    src={"/assets/images/Illustration40.png"}
                    height={378}
                    width={437}
                    className="w-[437px] h-[378px] object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[32px] leading-[28.8px] pb-[40px] !mt-0 !pt-0 font-playfairdisplay">
                    Quick Contact
                  </h2>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className="w-[441px]  pb-5">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={props.values.name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={`px-3 h-[36px] py-1 w-full border rounded-[4px]  text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 ${
                              props.errors.name && props.touched.name
                                ? "border-red-400"
                                : "border-blueGray-300"
                            }`}
                            // labelProps={{
                            //   className: "hidden",
                            // }}
                            // error={props.errors.name && props.touched.name}
                            // containerProps={{
                            //   className:
                            //     "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full ",
                            // }}
                          />
                        </div>

                        <div className="w-[441px]  pb-5">
                          <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={`px-3 h-[36px] py-1 w-full border rounded-[4px]  text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 ${
                              props.errors.email && props.touched.email
                                ? "border-red-400"
                                : "border-blueGray-300"
                            }`}
                            // labelProps={{
                            //   className: "hidden",
                            // }}
                            // containerProps={{
                            //   className:
                            //     "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full",
                            // }}
                            // error={props.errors.email && props.touched.email}
                          />
                        </div>

                        <div className="w-[441px]  pb-5">
                          <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={props.values.phone}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={`px-3 h-[36px] py-1 w-full border rounded-[4px]  text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 ${
                              props.errors.phone && props.touched.phone
                                ? "border-red-400"
                                : "border-blueGray-300"
                            }`}
                            // labelProps={{
                            //   className: "hidden",
                            // }}
                            // containerProps={{
                            //   className:
                            //     "min-w-[100px] !h-[36px] !min-h-[36px] !max-h-full",
                            // }}
                            // error={props.errors.phone && props.touched.phone}
                          />
                        </div>

                        <div className="w-[441px]  pb-[30px]">
                          <textarea
                            placeholder="Message..."
                            name="message"
                            // rows={2}
                            value={props.values.message}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={`px-3 h-[75px]  py-1 w-full border rounded-[4px]  text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 ${
                              props.errors.message && props.touched.message
                                ? "border-red-400"
                                : "border-blueGray-300"
                            }`}
                            // className=" !max-h-[75px] !min-h-[100%] border-t-blueGray-300 disabled:border-t-transparent   !h-[75px] !rounded-[4px] border-blueGray-300 bg-white text-gray-900  placeholder:text-secondary-100 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            // labelProps={{
                            //   className: "hidden",
                            // }}
                            // height="25px"
                            // containerProps={{
                            //   className:
                            //     "min-w-[100px] !h-[75px] !min-h-[75px] !max-h-full",
                            // }}
                            // error={
                            //   props.errors.message && props.touched.message
                          />
                        </div>

                        <Button
                          type="submit"
                          className="normal-case text-[14px] font-emirates text-dark-50 leading-[16.8px] pt-[11px] pb-[8px] pl-[60px] pr-[59px] !w-[162px] !h-[36px] font-bold"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="flex justify-between pt-[79px]">
                <div className="flex">
                  <svg
                    width="18"
                    height="26"
                    viewBox="0 0 18 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1 h-[30px] w-[30px] mr-[11px]"
                  >
                    <path
                      d="M9 25.5C8.70833 25.5 8.45833 25.4167 8.25 25.25C8.04167 25.0833 7.88542 24.8646 7.78125 24.5938C7.38542 23.4271 6.88542 22.3333 6.28125 21.3125C5.69792 20.2917 4.875 19.0938 3.8125 17.7188C2.75 16.3438 1.88542 15.0312 1.21875 13.7812C0.572917 12.5312 0.25 11.0208 0.25 9.25C0.25 6.8125 1.09375 4.75 2.78125 3.0625C4.48958 1.35417 6.5625 0.5 9 0.5C11.4375 0.5 13.5 1.35417 15.1875 3.0625C16.8958 4.75 17.75 6.8125 17.75 9.25C17.75 11.1458 17.3854 12.7292 16.6562 14C15.9479 15.25 15.125 16.4896 14.1875 17.7188C13.0625 19.2188 12.2083 20.4688 11.625 21.4688C11.0625 22.4479 10.5938 23.4896 10.2188 24.5938C10.1146 24.8854 9.94792 25.1146 9.71875 25.2812C9.51042 25.4271 9.27083 25.5 9 25.5ZM9 21.0312C9.35417 20.3229 9.75 19.625 10.1875 18.9375C10.6458 18.25 11.3125 17.3333 12.1875 16.1875C13.0833 15.0208 13.8125 13.9479 14.375 12.9687C14.9583 11.9687 15.25 10.7292 15.25 9.25C15.25 7.52083 14.6354 6.05208 13.4063 4.84375C12.1979 3.61458 10.7292 3 9 3C7.27083 3 5.79167 3.61458 4.5625 4.84375C3.35417 6.05208 2.75 7.52083 2.75 9.25C2.75 10.7292 3.03125 11.9687 3.59375 12.9687C4.17708 13.9479 4.91667 15.0208 5.8125 16.1875C6.6875 17.3333 7.34375 18.25 7.78125 18.9375C8.23958 19.625 8.64583 20.3229 9 21.0312ZM9 12.375C9.875 12.375 10.6146 12.0729 11.2188 11.4688C11.8229 10.8646 12.125 10.125 12.125 9.25C12.125 8.375 11.8229 7.63542 11.2188 7.03125C10.6146 6.42708 9.875 6.125 9 6.125C8.125 6.125 7.38542 6.42708 6.78125 7.03125C6.17708 7.63542 5.875 8.375 5.875 9.25C5.875 10.125 6.17708 10.8646 6.78125 11.4688C7.38542 12.0729 8.125 12.375 9 12.375Z"
                      fill="#F0AE11"
                    />
                  </svg>
                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Address
                    </h3>
                    <Link
                      href="https://www.google.com/maps/search/Shop+53,Ground+Floor,The+Gold+Center+Building,+Deira+Dubai,+Dubai,+U.A.E"
                      className="text-[16px] leading-[22.4px] text-blueGray-700"
                    >
                      Shop.53, Ground Floor, The Gold Center Building, Deira
                      Dubai, Dubai, U.A.E.
                    </Link>
                  </div>
                </div>
                <div className="flex">
                  <svg
                    width="23"
                    className="mt-[3px] h-[24px] w-[24px] mr-[12px]"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0475 5C15.0242 5.19057 15.9219 5.66826 16.6256 6.37194C17.3292 7.07561 17.8069 7.97326 17.9975 8.95M14.0475 1C16.0768 1.22544 17.9691 2.13417 19.4137 3.57701C20.8584 5.01984 21.7695 6.91101 21.9975 8.94M20.9975 16.92V19.92C20.9986 20.1985 20.9416 20.4742 20.83 20.7293C20.7184 20.9845 20.5548 21.2136 20.3496 21.4019C20.1443 21.5901 19.9021 21.7335 19.6382 21.8227C19.3744 21.9119 19.0949 21.9451 18.8175 21.92C15.7403 21.5856 12.7845 20.5341 10.1875 18.85C7.77132 17.3147 5.72283 15.2662 4.18749 12.85C2.49747 10.2412 1.44573 7.27099 1.11749 4.18C1.0925 3.90347 1.12537 3.62476 1.21399 3.36162C1.30262 3.09849 1.44506 2.85669 1.63226 2.65162C1.81945 2.44655 2.0473 2.28271 2.30128 2.17052C2.55527 2.05833 2.82983 2.00026 3.10749 2H6.10749C6.5928 1.99522 7.06328 2.16708 7.43125 2.48353C7.79922 2.79999 8.03957 3.23945 8.10749 3.72C8.23412 4.68007 8.46894 5.62273 8.80749 6.53C8.94204 6.88792 8.97116 7.27691 8.8914 7.65088C8.81164 8.02485 8.62636 8.36811 8.35749 8.64L7.08749 9.91C8.51105 12.4135 10.5839 14.4864 13.0875 15.91L14.3575 14.64C14.6294 14.3711 14.9726 14.1858 15.3466 14.1061C15.7206 14.0263 16.1096 14.0555 16.4675 14.19C17.3748 14.5286 18.3174 14.7634 19.2775 14.89C19.7633 14.9585 20.2069 15.2032 20.524 15.5775C20.8412 15.9518 21.0097 16.4296 20.9975 16.92Z"
                      stroke="#F0AE11"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Phone
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href="tel:+97123555478"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        +97 123 5555 478
                      </Link>
                      <Link
                        href="tel:+97123555478"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        +97 123 5555 478
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <svg
                    width="20"
                    className="mt-[3px] h-[22px] w-[22px] mr-[15px]"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.556 0.666016H1.44488C1.12073 0.666016 0.809848 0.794785 0.580637 1.024C0.351426 1.25321 0.222656 1.56408 0.222656 1.88824V14.1105C0.222656 14.4346 0.351426 14.7455 0.580637 14.9747C0.809848 15.2039 1.12073 15.3327 1.44488 15.3327H18.556C18.8801 15.3327 19.191 15.2039 19.4202 14.9747C19.6494 14.7455 19.7782 14.4346 19.7782 14.1105V1.88824C19.7782 1.56408 19.6494 1.25321 19.4202 1.024C19.191 0.794785 18.8801 0.666016 18.556 0.666016ZM17.6149 14.1105H2.45932L6.7371 9.68602L5.8571 8.83657L1.44488 13.4016V2.81713L9.04099 10.3766C9.26999 10.6042 9.57976 10.732 9.90266 10.732C10.2256 10.732 10.5353 10.6042 10.7643 10.3766L18.556 2.62768V13.3221L14.0582 8.82435L13.1965 9.68602L17.6149 14.1105ZM2.24543 1.88824H17.566L9.90266 9.50879L2.24543 1.88824Z"
                      fill="#F0AE11"
                    />
                  </svg>

                  <div className="max-w-[293px]">
                    <h3 className="text-[20px] leading-7 text-primary-200 pb-[5px] ">
                      Email
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href="mailto:info@scintillastore.com"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        Info@scintillastore.com
                      </Link>
                      <Link
                        href="mailto:info@scintillastore.com"
                        className="text-[16px] leading-[22.4px] text-blueGray-700"
                      >
                        Info@scintillastore.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default QuickContact;
