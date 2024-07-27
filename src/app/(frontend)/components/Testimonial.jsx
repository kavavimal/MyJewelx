"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Avatar, Rating } from "@material-tailwind/react";
import { Slide } from "react-awesome-reveal";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
import { Autoplay } from "swiper/modules";

const Testimonial = ({ homeSlide }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          className="pb-[50px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <div>
              <h3 className="text-2xl mb-5 font-playfairdisplay font-semibold">
                Testimonial
              </h3>
            </div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              slidesPerView={3}
              spaceBetween={20}
            >
              {new Array(5).fill(0).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="p-5 border border-secondary-400 rounded border-b-primary-200 border-b-2">
                    <div className="flex justify-between items-center mb-[15px]">
                      <div>
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.125 16.4062H6.68281C6.88609 15.0526 7.36946 13.7561 8.10205 12.5998C8.83464 11.4435 9.80036 10.4527 10.9375 9.69062L12.8953 8.37812L11.6922 6.5625L9.73437 7.875C8.0864 8.97321 6.73499 10.4612 5.80008 12.207C4.86517 13.9528 4.37566 15.9024 4.375 17.8828V25.1562C4.375 25.7364 4.60547 26.2928 5.0157 26.703C5.42594 27.1133 5.98234 27.3438 6.5625 27.3438H13.125C13.7052 27.3438 14.2616 27.1133 14.6718 26.703C15.082 26.2928 15.3125 25.7364 15.3125 25.1562V18.5938C15.3125 18.0136 15.082 17.4572 14.6718 17.047C14.2616 16.6367 13.7052 16.4062 13.125 16.4062ZM28.4375 16.4062H21.9953C22.1986 15.0526 22.682 13.7561 23.4146 12.5998C24.1471 11.4435 25.1129 10.4527 26.25 9.69062L28.2078 8.37812L27.0156 6.5625L25.0469 7.875C23.3989 8.97321 22.0475 10.4612 21.1126 12.207C20.1777 13.9528 19.6882 15.9024 19.6875 17.8828V25.1562C19.6875 25.7364 19.918 26.2928 20.3282 26.703C20.7384 27.1133 21.2948 27.3438 21.875 27.3438H28.4375C29.0177 27.3438 29.5741 27.1133 29.9843 26.703C30.3945 26.2928 30.625 25.7364 30.625 25.1562V18.5938C30.625 18.0136 30.3945 17.4572 29.9843 17.047C29.5741 16.6367 29.0177 16.4062 28.4375 16.4062Z"
                            fill="#EFEFEF"
                          />
                        </svg>
                      </div>
                      <div>
                        <Rating
                          value={4}
                          unratedIcon={
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.00006 1.33398L10.0694 5.81932L14.9747 6.40132L11.3481 9.75465L12.3107 14.6L8.00006 12.1873L3.68939 14.6007L4.65206 9.75532L1.02539 6.40065L5.93139 5.81865L8.00006 1.33398Z"
                                stroke="#F0AE11"
                                stroke-linejoin="round"
                              />
                            </svg>
                          }
                          ratedIcon={
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_510_5658)">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.60587 1.05337C8.55251 0.937727 8.46714 0.839789 8.35987 0.771143C8.25259 0.702497 8.1279 0.666016 8.00054 0.666016C7.87318 0.666016 7.74848 0.702497 7.64121 0.771143C7.53393 0.839789 7.44856 0.937727 7.3952 1.05337L5.48187 5.20004L0.947869 5.73804C0.821369 5.75297 0.701796 5.80384 0.603302 5.88461C0.504807 5.96538 0.431514 6.07268 0.392097 6.1938C0.35268 6.31493 0.348789 6.44481 0.380885 6.56808C0.412981 6.69135 0.479719 6.80285 0.573202 6.88937L3.92654 9.98937L3.03654 14.4694C3.01182 14.5943 3.02337 14.7236 3.06983 14.8421C3.1163 14.9607 3.19572 15.0634 3.29873 15.1382C3.40173 15.213 3.524 15.2568 3.65109 15.2643C3.77817 15.2718 3.90475 15.2428 4.01587 15.1807L8.00054 12.95L11.9852 15.1807C12.0964 15.2431 12.2231 15.2723 12.3504 15.2648C12.4777 15.2574 12.6002 15.2136 12.7033 15.1387C12.8065 15.0637 12.886 14.9608 12.9324 14.842C12.9788 14.7233 12.9902 14.5937 12.9652 14.4687L12.0752 9.99004L15.4279 6.88937C15.5214 6.80285 15.5881 6.69135 15.6202 6.56808C15.6523 6.44481 15.6484 6.31493 15.609 6.1938C15.5696 6.07268 15.4963 5.96538 15.3978 5.88461C15.2993 5.80384 15.1797 5.75297 15.0532 5.73804L10.5185 5.19937L8.60587 1.05337Z"
                                  fill="#F0AE11"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_510_5658">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                          readonly
                        />
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-base">
                        Fantastic shopping experience at my Jewlex. The staff
                        was incredibly helpful, and my bracelet is even more
                        gorgeous in person.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <Avatar size="md" src="./assets/images/avatar.jpg" />
                      </div>
                      <div className="ms-[15px]">
                        <h3>Bessie Cooper</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Testimonial;
