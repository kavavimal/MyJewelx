"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button, IconButton } from "@material-tailwind/react";

export default function Footer() {
  return (
    <>
      <footer className="footer pt-16 bg-primary-250">
        <div className="footer-bar pb-4">
          <div className="container">
            <div className="flex items-start justify-between">
              <div className="w-1/4 flex flex-col gap-5">
                <Link
                  href="/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <Image
                    width={160}
                    height={160}
                    src="/assets/images/logo.svg"
                    alt="logo"
                  />
                </Link>
                <p className="text-secondary-50 tracking-wide">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry.
                </p>
                <div>
                  <form className="flex">
                    <input
                      type="text"
                      name="search"
                      className="h-[42px] rounded-s border-[#E6E6E6] border-s-[1.5px] border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100"
                      placeholder="Your Email Address"
                    />
                    <Button className="hover:shadow-none border hover:text-primary-200 hover:border-primary-200 hover:bg-transparent shadow-none outline-none rounded-s-none rounded-e focus:outline-none active:outline-none">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-playfairdisplay mb-3">
                  Company
                </h3>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      How it works
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-playfairdisplay mb-3">
                  Help and Support
                </h3>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Shipping info
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      How to order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      How to track
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-playfairdisplay mb-3">
                  Customer Service
                </h3>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Customer Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Terms and Condition
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Transaction
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-secondary-50 hover:text-black"
                    >
                      Take our feedback survey
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="stay-connected pb-8">
                  <h5 className="text-right text-xs pb-4">Stay Connected</h5>
                  <ul className="flex gap-2 justify-end">
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                          className="hover:rotate-90"
                        >
                          <path
                            fill="#1877f2"
                            d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                          ></path>
                          <path
                            fill="#fff"
                            d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="#0a66c2"
                            d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <g fill="none">
                            <rect
                              width={256}
                              height={256}
                              fill="url(#skillIconsInstagram0)"
                              rx={60}
                            ></rect>
                            <rect
                              width={256}
                              height={256}
                              fill="url(#skillIconsInstagram1)"
                              rx={60}
                            ></rect>
                            <path
                              fill="#fff"
                              d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                            ></path>
                            <defs>
                              <radialGradient
                                id="skillIconsInstagram0"
                                cx={0}
                                cy={0}
                                r={1}
                                gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fd5"></stop>
                                <stop offset={0.1} stopColor="#fd5"></stop>
                                <stop offset={0.5} stopColor="#ff543e"></stop>
                                <stop offset={1} stopColor="#c837ab"></stop>
                              </radialGradient>
                              <radialGradient
                                id="skillIconsInstagram1"
                                cx={0}
                                cy={0}
                                r={1}
                                gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#3771c8"></stop>
                                <stop offset={0.128} stopColor="#3771c8"></stop>
                                <stop
                                  offset={1}
                                  stopColor="#60f"
                                  stopOpacity={0}
                                ></stop>
                              </radialGradient>
                            </defs>
                          </g>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="payment-accept">
                  <h5 className="text-right text-xs pb-4">Payment Accept</h5>
                  <ul className="flex gap-2 justify-end">
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1em"
                          viewBox="0 0 2304 1536"
                        >
                          <path
                            fill="currentColor"
                            d="M745 778q0 37-25.5 61.5T657 864q-29 0-46.5-16T593 804q0-37 25-62.5t62-25.5q28 0 46.5 16.5T745 778m785-149q0 42-22 57t-66 15l-32 1l17-107q2-11 13-11h18q22 0 35 2t25 12.5t12 30.5m351 149q0 36-25.5 61t-61.5 25q-29 0-47-16t-18-44q0-37 25-62.5t62-25.5q28 0 46.5 16.5T1881 778M513 607q0-59-38.5-85.5T374 495H214q-19 0-21 19l-65 408q-1 6 3 11t10 5h76q20 0 22-19l18-110q1-8 7-13t15-6.5t17-1.5t19 1t14 1q86 0 135-48.5T513 607m309 312l41-261q1-6-3-11t-10-5h-76q-14 0-17 33q-27-40-95-40q-72 0-122.5 54T489 816q0 59 34.5 94t92.5 35q28 0 58-12t48-32q-4 12-4 21q0 16 13 16h69q19 0 22-19m447-263q0-5-4-9.5t-9-4.5h-77q-11 0-18 10l-106 156l-44-150q-5-16-22-16h-75q-5 0-9 4.5t-4 9.5q0 2 19.5 59t42 123t23.5 70q-82 112-82 120q0 13 13 13h77q11 0 18-10l255-368q2-2 2-7m380-49q0-59-38.5-85.5T1510 495h-159q-20 0-22 19l-65 408q-1 6 3 11t10 5h82q12 0 16-13l18-116q1-8 7-13t15-6.5t17-1.5t19 1t14 1q86 0 135-48.5t49-134.5m309 312l41-261q1-6-3-11t-10-5h-76q-14 0-17 33q-26-40-95-40q-72 0-122.5 54T1625 816q0 59 34.5 94t92.5 35q29 0 59-12t47-32q0 1-2 9t-2 12q0 16 13 16h69q19 0 22-19m218-409v-1q0-14-13-14h-74q-11 0-13 11l-65 416l-1 2q0 5 4 9.5t10 4.5h66q19 0 21-19zM392 644q-5 35-26 46t-60 11l-33 1l17-107q2-11 13-11h19q40 0 58 11.5t12 48.5m1912-516v1280q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V128q0-52 38-90t90-38h2048q52 0 90 38t38 90"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1em"
                          viewBox="0 0 256 83"
                        >
                          <defs>
                            <linearGradient
                              id="logosVisa0"
                              x1="45.974%"
                              x2="54.877%"
                              y1="-2.006%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#222357"></stop>
                              <stop offset="100%" stopColor="#254aa5"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#logosVisa0)"
                            d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
                            transform="matrix(1 0 0 -1 0 82.668)"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1em"
                          viewBox="0 0 256 199"
                        >
                          <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805"></path>
                          <path
                            fill="#ff5f00"
                            d="M93.298 16.903h69.15v124.251h-69.15z"
                          ></path>
                          <path
                            fill="#eb001b"
                            d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
                          ></path>
                          <path
                            fill="#f79e1b"
                            d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-bar ">
          <div className="container">
            <div className="flex justify-between items-center border-t py-4">
              <div>
                <p>2024 my jewlex All right reserved </p>
              </div>
              <div>
                <div className="flex gap-3 items-center">
                  <div>
                    <Link
                      href="/"
                      className="text-xs text-[#808080] hover:text-black"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-s h-3 border-secondary-50 border"></div>
                  <div>
                    <Link
                      href="/"
                      className="text-xs text-[#808080] hover:text-black"
                    >
                      Cookie Policy
                    </Link>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-s h-3 border-secondary-50 border"></div>
                  <div>
                    <Link
                      href="/"
                      className="text-xs text-[#808080] hover:text-black"
                    >
                      Terms and Conditions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
