'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

export default function ProductImages({ variation }) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
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
        dotsClass: 'slick-dots slick-thumb',
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
                style={{ ...style, display: 'block', background: 'red' }}
                onClick={onClick}
            />
        );
    }
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'green' }}
                onClick={onClick}
            />
        );
    }

    return (
        <div className="w-1/2 pr-5">
            <div className="slider-container">
                <Slider
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
                                <div
                                    className="px-2 h-[500px] w-[500px]"
                                    key={index}
                                >
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
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    {variation?.image &&
                        variation?.image.length > 0 &&
                        variation?.image?.map((image, index) => {
                            return (
                                <div
                                    className="px-2 h-[142px] w-[142px]"
                                    key={index}
                                >
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
                </Slider>
            </div>
        </div>
    );
}
