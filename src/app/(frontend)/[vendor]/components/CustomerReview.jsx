import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Rating,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post } from "@/utils/api";
import { useUserStore } from "@/contexts/userStore";
import { showToast, truncate } from "@/utils/helper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const CustomerReview = ({ vendor, reviews }) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    if (!session?.data) {
      return router.push("/login");
    }
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      recommendation: "Recommended",
      review: "",
      files: null,
    },
    validationSchema: Yup.object({
      review: Yup.string().required("Review is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await post("/api/review/store", {
        userId: vendor?.id,
        rating: rating,
        review: values.review,
        recommandation: values.recommendation,
      });

      if (response?.status === 201) {
        setOpen(false);
        showToast({
          message: "Review Submitted Succesfully",
          variant: "success",
        });
        resetForm();
        router.refresh();
      }
      setLoading(false);
    },
  });

  //   const handleFileChange = (event) => {
  //     formik.setFieldValue("files", event.currentTarget.files);
  //   };

  const handleStarClick = (star) => {
    setRating(star);
  };

  useEffect(() => {
    if (!open) {
      setRating(0);
      formik.resetForm();
    }
  }, [open]);

  return (
    <>
      <section className="bg-white pt-20 pb-[95px]">
        <div className="container">
          <div className="relative">
            <h3 className="text-[34px] font-playfairdisplay text-blueGray-500 font-semibold text-center mb-[50px]">
              Customer Reviews
            </h3>
            <IconButton
              onClick={handleOpen}
              variant="outlined"
              className="rounded-full !absolute !right-0 !top-0 border-primary-200 !border-[1px] !text-primary-100 !w-[50px] !h-[50px] !max-w-[50px] !max-h-[50px]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#F0AE11" />
              </svg>
            </IconButton>
          </div>
          <div className="relative">
            <Swiper
              className="mb-[50px]"
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 50000,
                disableOnInteraction: false,
              }}
              loop
              navigation={{
                nextEl: ".swiper-customer-next",
                prevEl: ".swiper-customer-prev",
              }}
              spaceBetween={126}
              slidesPerView={2}
            >
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative flex w-[473px] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                      <div className="relative flex w-full max-w-[473px] items-start gap-[30px] pt-0 mx-0 overflow-hidden  bg-transparent shadow-none rounded-xl bg-clip-border">
                        {review.fromUser?.image != null ? (
                          <Image
                            src={
                              review.fromUser?.image?.path ??
                              "/assets/images/avatar.jpg"
                            }
                            width={85}
                            height={85}
                            alt={review.name}
                            className="relative inline-block h-[85px] w-[85px] !rounded-full object-cover object-center"
                          />
                        ) : (
                          <div className="relative cursor-pointer inline-flex items-center justify-center w-10 h-10 select-none overflow-hidden hover:opacity-80 bg-primary-200/25 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-black uppercase">{`${review?.fromUser?.firstName[0]}${review?.fromUser?.lastName[0]}`}</span>
                          </div>
                        )}

                        <div className="flex w-full flex-col gap-0.5">
                          <div>
                            <p className="block text-[14px] antialiased leading-relaxed pb-[15px] text-secondary-100 font-emirates">
                              {truncate(review.text, 150)}
                            </p>
                            <Rating
                              unratedColor="amber"
                              ratedColor="amber"
                              value={review.rating ?? 0}
                              readonly
                            />
                            <h5 className="block text-[17.84px] text-black antialiased font-semibold leading-snug tracking-normal pt-2.5 font-emirates">
                              {`${review.fromUser?.firstName} ${review.fromUser?.lastName}`}
                            </h5>
                            {/* <p className="block font-emirates text-base antialiased font-light leading-relaxed text-secondary-100">
                            {review.location}
                          </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-center">No reviews</p>
              )}
            </Swiper>
            <button className="swiper-customer-prev absolute cursor-pointer z-[15] flex justify-center items-center left-[46%] rounded-full h-[35px] w-[35px]  bg-blueGray-800">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.19922 8.00078L10.3992 15.2008L11.5192 14.0008L5.59922 8.00078L11.5192 2.00078L10.3992 0.800781L3.19922 8.00078Z"
                  fill="#1A1A1A"
                />
              </svg>
            </button>
            <button className="swiper-customer-next absolute  cursor-pointer z-[15] flex justify-center items-center right-[46%] rounded-full h-[35px] w-[35px] bg-blueGray-800 ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.60047 0.800781L4.48047 2.00078L10.4005 8.00078L4.48047 14.0008L5.60047 15.2008L12.8005 8.00078L5.60047 0.800781Z"
                  fill="#1A1A1A"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Write a review</DialogHeader>
        <DialogBody>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="mb-4">
                <label className="block text-blueGray-500 mb-2.5">Rating</label>
                <div>
                  <Rating
                    value={rating}
                    onChange={(value) => handleStarClick(value)}
                  />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 items-center gap-x-5 gap-y-3">
                <div className="col-span-2">
                  <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
                    Review
                  </label>
                  <textarea
                    name="review"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.review}
                    className={`border ${
                      formik.errors.review
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blueGray-300 focus:outline-primary-200"
                    } text-secondary-100 rounded block w-full px-2.5 py-2  placeholder:text-secondary-100 `}
                  />
                  {formik.errors.review && formik.touched.review && (
                    <p className="text-red-500 text-xs mt-2 ms-2">
                      {formik.errors.review}
                    </p>
                  )}
                </div>
                {/* <div className="col-span-2">
                  <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
                    Picture/video optional
                  </label>
                  <label
                    htmlFor="review-file"
                    className="flex h-[110px] w-[110px] flex-col items-center justify-center border border-blueGray-300 rounded cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.625 23V7.71875L8.75 12.5938L6.125 9.875L15.5 0.5L24.875 9.875L22.25 12.5938L17.375 7.71875V23H13.625ZM0.5 30.5V21.125H4.25V26.75H26.75V21.125H30.5V30.5H0.5Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </div>
                    <input
                      id="review-file"
                      type="file"
                      name="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div> */}
              </div>

              <div className="flex space-x-4 justify-end">
                <Button type="submit" loading={loading}>
                  Submit review
                </Button>
                <Button type="button" variant="outlined" onClick={handleOpen}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};

export default CustomerReview;
