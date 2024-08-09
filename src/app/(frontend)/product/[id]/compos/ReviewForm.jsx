"use client";
import { post } from "@/utils/api";
import { Button, Rating } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const ReviewForm = ({ product_id, user_id }) => {
  const [rating, setRating] = useState(0); // State to manage rating
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      recommendation: "Recommended",
      review: "",
      files: null,
    },
    validationSchema: Yup.object({
      review: Yup.string().required("Review is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await post("/api/review/product", {
        productId: product_id,
        userId: user_id,
        rating: rating,
        review: values.review,
        recommandation: values.recommendation,
        files: values.files,
      });
      setLoading(false);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("files", event.currentTarget.files);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Write a review</h2>

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
          <div>
            <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
              First name
            </label>
            <input
              type="text"
              className="border border-blueGray-300 rounded block w-full px-2.5 py-2 placeholder:text-secondary-100 focus:outline-primary-200"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
              Last name
            </label>
            <input
              type="text"
              className="border border-blueGray-300 text-secondary-100 rounded block w-full px-2.5 py-2 placeholder:text-secondary-100 focus:outline-primary-200"
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
              Email
            </label>
            <input
              type="text"
              className="border border-blueGray-300 text-secondary-100 rounded block w-full px-2.5 py-2  placeholder:text-secondary-100 focus:outline-primary-200"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-[5px] text-base font-light text-blueGray-500 dark:text-white">
              Recommendation
            </label>
            <select
              name="recommendation"
              onBlur={formik.handleBlur}
              value={formik.values.recommendation}
              className="border border-blueGray-300 rounded block w-full px-2.5 py-[7px] text-secondary-100 placeholder:text-secondary-100 focus:border-primary-200 focus:outline-primary-200"
            >
              <option value="Highly Recommended">Highly Recommended</option>
              <option value="Recommended">Recommended</option>
              <option value="Neutral">Neutral</option>
              <option value="Not Recommended">Not Recommended</option>
              <option value="Strongly Not Recommended">
                Strongly Not Recommended
              </option>
            </select>
          </div>
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
          <div className="col-span-2">
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
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" loading={loading}>
            Submit review
          </Button>
          <Button type="button" variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
