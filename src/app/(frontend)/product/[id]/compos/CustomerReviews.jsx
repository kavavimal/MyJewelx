"use client";
import { Button, Rating } from "@material-tailwind/react";
import React from "react";

const CustomerReviews = ({ reviews }) => {
  const average =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const FiveStarRating =
    reviews?.filter((review) => review.rating === 5).length || 0;
  const FourStarRating =
    reviews?.filter((review) => review.rating === 4).length || 0;
  const ThreeStarRating =
    reviews?.filter((review) => review.rating === 3).length || 0;
  const TwoStarRating =
    reviews?.filter((review) => review.rating === 2).length || 0;
  const OneStarRating =
    reviews?.filter((review) => review.rating === 1).length || 0;

  const percent = (average / 5) * 100;
  const percentageFiveStars = (FiveStarRating / reviews.length) * 100 || 0;
  const percentageFourStars = (FourStarRating / reviews.length) * 100 || 0;
  const percentageThreeStars = (ThreeStarRating / reviews.length) * 100 || 0;
  const percentageTwoStars = (TwoStarRating / reviews.length) * 100 || 0;
  const percentageOneStars = (OneStarRating / reviews.length) * 100 || 0;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-playfairdisplay font-semibold">
            Customer Reviews
          </h3>
          <div>
            <Button variant="outlined">Cancel Review</Button>
          </div>
        </div>
        <div className="px-5 pt-[29px] pb-[31px] border border-blueGray-300">
          <div className="flex items-center justify-between">
            <div className="pl-[60px] w-[500px] border-r border-r-blueGray-300">
              <span className="block text-[56px] font-normal font-playfairdisplay">
                {Math.floor(average)}
              </span>
              <div>
                <Rating
                  readonly
                  value={Math.floor(average)}
                  className="gap-[5px]"
                  ratedIcon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.9088 1.58103C12.8288 1.40757 12.7007 1.26066 12.5398 1.15769C12.3789 1.05472 12.1918 1 12.0008 1C11.8098 1 11.6227 1.05472 11.4618 1.15769C11.3009 1.26066 11.1728 1.40757 11.0928 1.58103L8.2228 7.80103L1.4218 8.60803C1.23205 8.63043 1.05269 8.70673 0.904952 8.82789C0.757211 8.94905 0.647271 9.10999 0.588146 9.29168C0.52902 9.47337 0.523184 9.6682 0.571328 9.8531C0.619471 10.038 0.719579 10.2052 0.859804 10.335L5.8898 14.985L4.5548 21.705C4.51772 21.8924 4.53506 22.0864 4.60475 22.2642C4.67444 22.442 4.79359 22.5961 4.94809 22.7083C5.10259 22.8205 5.286 22.8862 5.47663 22.8975C5.66725 22.9087 5.85713 22.8652 6.0238 22.772L12.0008 19.426L17.9778 22.772C18.1446 22.8656 18.3347 22.9094 18.5256 22.8983C18.7165 22.8871 18.9002 22.8214 19.055 22.709C19.2097 22.5966 19.3289 22.4422 19.3986 22.264C19.4682 22.0859 19.4853 21.8916 19.4478 21.704L18.1128 14.986L23.1418 10.335C23.282 10.2052 23.3821 10.038 23.4303 9.8531C23.4784 9.6682 23.4726 9.47337 23.4135 9.29168C23.3543 9.10999 23.2444 8.94905 23.0967 8.82789C22.9489 8.70673 22.7696 8.63043 22.5798 8.60803L15.7778 7.80003L12.9088 1.58103Z"
                        fill="#F0AE11"
                      />
                    </svg>
                  }
                  unratedIcon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M12.0011 2L15.1051 8.728L22.4631 9.601L17.0231 14.631L18.4671 21.899L12.0011 18.28L5.53506 21.9L6.97906 14.632L1.53906 9.6L8.89806 8.727L12.0011 2Z"
                        stroke="#CBCBCB"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col mt-[15px]">
                <div className="inline-flex">
                  <p className="text-base inline font-light border-b border-b-blueGray-400 pb-2.5">
                    Total {reviews?.length ?? 0} customer reviews
                  </p>
                </div>
                <span className="text-secondary-100 pt-2.5 pb-[19px]">
                  {Math.floor(percent)}% customers recommended this product
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="flex gap-[15px] items-center">
                <span className="text-secondary-100 font-light">
                  5 Star reviews
                </span>
                <div className="h-[15px] bg-primary-100 w-[432px]">
                  <div
                    className="h-full bg-primary-200"
                    style={{ width: `${percentageFiveStars}%` }}
                  />
                </div>
                <span className="text-secondary-100 font-light">
                  {percentageFiveStars.toFixed(2)}%
                </span>
              </div>
              <div className="flex gap-[15px] items-center">
                <span className="text-secondary-100 font-light">
                  4 Star reviews
                </span>
                <div className="h-[15px] bg-primary-100 w-[432px]">
                  <div
                    className="h-full bg-primary-200"
                    style={{ width: `${percentageFourStars}%` }}
                  />
                </div>
                <span className="text-secondary-100 font-light">
                  {percentageFourStars.toFixed(2)}%
                </span>
              </div>
              <div className="flex gap-[15px] items-center">
                <span className="text-secondary-100 font-light">
                  3 Star reviews
                </span>
                <div className="h-[15px] bg-primary-100 w-[432px]">
                  <div
                    className="h-full bg-primary-200"
                    style={{ width: `${percentageThreeStars}%` }}
                  />
                </div>
                <span className="text-secondary-100 font-light">
                  {percentageThreeStars.toFixed(2)}%
                </span>
              </div>
              <div className="flex gap-[15px] items-center">
                <span className="text-secondary-100 font-light">
                  2 Star reviews
                </span>
                <div className="h-[15px] bg-primary-100 w-[432px]">
                  <div
                    className="h-full bg-primary-200"
                    style={{ width: `${percentageTwoStars}%` }}
                  />
                </div>
                <span className="text-secondary-100 font-light">
                  {percentageTwoStars.toFixed(2)}%
                </span>
              </div>
              <div className="flex gap-[15px] items-center">
                <span className="text-secondary-100 font-light">
                  1 Star reviews
                </span>
                <div className="h-[15px] bg-primary-100 w-[432px]">
                  <div
                    className="w-0 h-full bg-primary-200"
                    style={{ width: `${percentageOneStars}%` }}
                  />
                </div>
                <span className="text-secondary-100 font-light">
                  {percentageOneStars.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
