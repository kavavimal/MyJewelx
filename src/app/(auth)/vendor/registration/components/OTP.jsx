"use client";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import moment from "moment";
import { useRouter } from "next/navigation";
import { post } from "@/utils/api";
import LoadingDots from "@/components/loading-dots";
import { showToast } from "@/utils/helper";

const OTP = ({setShowOtp, onOTPVerified, email}) => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isCounting && remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCounting, remainingTime]);

  const validationSchema = yup.object({
    otp: yup
      .string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "Enter a valid 6 digit OTP"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: values.otp,
            mode: "registration",
          }),
        });

        if (response.status === 201) {
          showToast({message: "OTP Verified successfully, processing your registration", variant: "success"});
          if(onOTPVerified) {
            onOTPVerified();
          }
        } else if (response.status === 500) {
          showToast({message: "Failed to verify OTP", variant: "error"});
        } else if (response.status === 400) {
          showToast({message:"Invalid OTP", variant: "error"});
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
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
    <div className="relative shadow-3xl p-10 bg-white max-w-md w-full rounded border-t-2 border-primary-200">
      {
        isLoading && <div className="absolute -top-1 -left-1 bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div class="flex items-center"><LoadingDots /></div></div>
      }
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
