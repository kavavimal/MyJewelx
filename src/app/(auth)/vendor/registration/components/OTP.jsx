"use client";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import moment from "moment";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Enter a valid 6 digit OTP"),
});

const OTP = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(60);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (isCounting && remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCounting, remainingTime]);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/auth/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            otp: values.otp,
            mode: "registration",
          }),
        });

        if (response.status === 201) {
          enqueueSnackbar("OTP verified successfully", {
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

          router.push("/vendor/details");
        } else if (response.status === 500) {
        }
      } catch (error) {}
    },
  });

  const handleResendOTP = async () => {
    try {
      const response = await fetch("/api/auth/otp/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          mode: "registration",
        }),
      });

      if (response.status === 201) {
        setRemainingTime(60);
        setIsCounting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-3xl p-10 bg-white max-w-md w-full rounded border-t-2 border-primary-200">
      <div className="mb-10">
        <h4 className="text-2xl font-bold trekking-wide font-emirates mb-6">
          OTP
        </h4>
        <Typography
          className="text-[#676767] font-emirates font-extralight"
          variant="small"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          fugiat ipsam natus dignissimos doloribus!
        </Typography>
      </div>
      <Formik initialValues={formik.initialValues}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8">
            <div>
              <Input
                label="OTP"
                type="text"
                size="lg"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.otp && formik.touched.otp}
              />
            </div>
            <Button
              type="button"
              disabled={remainingTime > 0}
              fullWidth
              className="flex justify-center items-center"
              size="lg"
              onClick={handleResendOTP}
            >
              Resend OTP{" "}
              {remainingTime > 0 &&
                moment.utc(remainingTime * 1000).format("mm:ss")}
            </Button>
            <Button
              type="submit"
              fullWidth
              className="flex justify-center items-center"
              loading={formik.isSubmitting}
              size="lg"
            >
              Verify
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default OTP;
