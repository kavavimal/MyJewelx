"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImages({ variation }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const [mainImage, setMainImage] = useState(variation?.image[0].path);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={mainImage} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} absolute right-5 top-1/2 h-5 w-5 bg-red`}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  return (
    <div className="w-[630px]">
      <div className="slider-container flex flex-col gap-5">
        {/* <Slider
          //   nextArrow={<NextArrow />}
          //   prevArrow={<PrevArrow />}
          arrows={false}
          asNavFor={nav2}
          ref={(slider) => (sliderRef1 = slider)}
        >
          {variation?.image &&
            variation?.image.length > 0 &&
            variation?.image?.map((image, index) => {
              return (
                <div className="px-2 h-[500px] w-[500px]" key={index}>
                  <Image
                    className="border-2 h-full w-full object-cover"
                    key={index}
                    src={image.path}
                    onClick={() => setMainImage(image.path)}
                    alt="Gallery Image"
                    width={500}
                    height={500}
                    objectFit="cover"
                  />
                </div>
              );
            })}
        </Slider>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          arrows={false}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {variation?.image &&
            variation?.image.length > 0 &&
            variation?.image?.map((image, index) => {
              return (
                <div className="px-2 h-[142px] w-[142px]" key={index}>
                  <Image
                    className="border-2 h-full w-full object-cover"
                    key={index}
                    src={image.path}
                    onClick={() => setMainImage(image.path)}
                    alt="Gallery Image"
                    width={142}
                    height={142}
                    objectFit="cover"
                  />
                </div>
              );
            })}
        </Slider> */}
        {variation?.image && variation?.image.length > 0 && (
          <>
            <div>
              <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
              >
                {variation?.image?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        className="border h-[607px] w-full object-cover border-blueGray-300"
                        key={index}
                        src={image.path}
                        alt="Gallery Image"
                        width={500}
                        height={500}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={20}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
              >
                {variation?.image &&
                  variation?.image.length > 0 &&
                  variation?.image?.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          className="border h-[142px] w-full object-cover border-blueGray-300"
                          key={index}
                          src={image.path}
                          alt="Gallery Image"
                          width={142}
                          height={142}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
