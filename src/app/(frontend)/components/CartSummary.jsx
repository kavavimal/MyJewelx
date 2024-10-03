"use client";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { printPrice } from "@/utils/helper";
import { Button } from "@material-tailwind/react";

export default function CartSummary({
  cart,
  isCheckout = false,
  showCoupon = false,
}) {
  const { cartItems } = cart;
  let totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  let totalVat = 0;

  cartItems.forEach((items) => {
    if (items?.productVariation?.other_charges) {
      const other_charges = JSON.parse(items?.productVariation?.other_charges);
      const vat = other_charges.find((item) => item.charge_type === "vat/tax");
      if (vat) {
        totalVat += Number(vat?.tax || 0) * Number(items?.quantity || 0);
      }
    }
  });

  let totalShippingCharge = 0;
  cartItems.forEach((items) => {
    totalShippingCharge += Number(items?.productVariation?.shipping_charge);
    //  *Number(items?.quantity || 0);
  });

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="space-y-6 lg:mt-0 lg:w-full border border-blueGray-300">
        <div className="space-y-4 bg-white p-3">
          <h3 className="my-2 pb-2 border-b border-blueGray-300 text-2xl">
            Order summary
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-900">
                  Cost Type
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Amount {CURRENCY_SYMBOL}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Price ({cartItems.length} Product Selected)
                </dt>
                <dd className="text-base font-medium text-gray-500">
                  {printPrice(totalAmount - totalVat - totalShippingCharge)}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Shipping Charge
                </dt>
                <dd className="text-base font-medium text-gray-500">
                  {printPrice(totalShippingCharge)}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-500">
                  {printPrice(totalAmount - totalVat)}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">VAT 5%</dt>
                <dd className="text-base font-medium text-gray-500">
                  {printPrice(totalVat)}
                </dd>
              </dl>

              {showCoupon === true && (
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Coupon discount
                  </dt>
                  <dd className="text-base font-medium text-gray-500">-0.00</dd>
                </dl>
              )}
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                {printPrice(totalAmount)}
              </dd>
            </dl>
          </div>
          {showCoupon === true && (
            <div className="flex items-center justify-start">
              <input type="text" placeholder="coupon code" className="border" />
              <button className="block w-full border-top text-center text-[#F0AE11] bg-white border-l-0 py-2 px-4 border-[#F0AE11] focus:outline-none hover:bg-yellow-600 hover:text-white rounded">
                Apply
              </button>
            </div>
          )}
          {isCheckout === true ? (
            <Button fullWidth>Place Order</Button>
          ) : (
            <Link
              href="/checkout"
              data-ripple-light="true"
              className="block w-full middle none rounded bg-primary-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-200/10 transition-all hover:shadow-lg hover:primary-200/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Continue
            </Link>
          )}
        </div>
      </div>
      <div className="border hidden sm:block border-blueGray-300 rounded-sm pt-5 px-5 pb-3">
        <div>
          <h4 className="text-xl font-normal border-b border-b-blueGray-300 pb-4">
            Payment Accepted
          </h4>
        </div>
        <div className="flex items-center gap-3 py-[15px]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_677_5021)">
              <path
                d="M6.47734 10.909C6.47734 11.3332 6.14005 11.6561 5.71265 11.6561C5.39288 11.6561 5.15634 11.4753 5.15634 11.1349C5.15634 10.7106 5.48675 10.3702 5.91102 10.3702C6.23454 10.3702 6.47734 10.5685 6.47734 10.909ZM2.79907 9.22314H2.63574C2.5838 9.22314 2.53124 9.25819 2.52435 9.31701L2.3748 10.2457L2.66015 10.235C3.04249 10.235 3.33785 10.1831 3.40731 9.74128C3.48741 9.27508 3.19205 9.22314 2.79907 9.22314ZM12.6725 9.22314H12.516C12.4534 9.22314 12.4115 9.25819 12.4046 9.31701L12.2588 10.2457L12.5367 10.235C12.9885 10.235 13.3014 10.1305 13.3014 9.60924C13.2976 9.24066 12.9684 9.22314 12.6725 9.22314ZM20.0252 4.71385V16.9514C20.0251 17.394 19.8492 17.8184 19.5362 18.1313C19.2233 18.4443 18.7989 18.6202 18.3563 18.6203H1.66893C1.22635 18.6202 0.801949 18.4443 0.489001 18.1313C0.176052 17.8184 0.000165852 17.394 0 16.9514V4.71385C0.000165852 4.27127 0.176052 3.84687 0.489001 3.53392C0.801949 3.22097 1.22635 3.04509 1.66893 3.04492H18.3563C18.7989 3.04509 19.2233 3.22097 19.5362 3.53392C19.8492 3.84687 20.0251 4.27127 20.0252 4.71385ZM4.46111 9.42089C4.46111 8.69061 3.89792 8.44719 3.25463 8.44719H1.86417C1.81925 8.44753 1.77602 8.46436 1.74269 8.49446C1.70935 8.52457 1.68822 8.56587 1.68332 8.61052L1.11324 12.1599C1.10261 12.2293 1.15517 12.2988 1.22463 12.2988H1.88544C1.97931 12.2988 2.06629 12.1981 2.07693 12.1004L2.23337 11.1755C2.26841 10.9252 2.69206 11.0122 2.85914 11.0122C3.85349 11.0122 4.46174 10.4215 4.46174 9.42026L4.46111 9.42089ZM7.38846 9.72689H6.72765C6.59561 9.72689 6.58873 9.91837 6.58184 10.0122C6.38035 9.71688 6.08811 9.66431 5.75771 9.66431C4.90603 9.66431 4.25586 10.4115 4.25586 11.2356C4.25586 11.9133 4.68013 12.3551 5.35784 12.3551C5.67072 12.3551 6.05995 12.1849 6.27897 11.9415C6.25875 12.0118 6.24698 12.0843 6.24393 12.1574C6.24393 12.2375 6.27897 12.2963 6.35532 12.2963H6.95355C7.04742 12.2963 7.12751 12.1955 7.14504 12.0979L7.49985 9.86268C7.51049 9.79635 7.45792 9.72689 7.38846 9.72689ZM8.79644 13.1304L11.011 9.91086C11.0286 9.89334 11.0286 9.87582 11.0286 9.85204C11.0286 9.79322 10.9766 9.73064 10.9172 9.73064H10.2495C10.2184 9.73187 10.1881 9.74038 10.1609 9.75548C10.1337 9.77059 10.1105 9.79188 10.093 9.81762L9.1719 11.1737L8.78956 9.87019C8.77519 9.83054 8.74926 9.79611 8.71513 9.77135C8.681 9.74658 8.64022 9.73262 8.59807 9.73127H7.9479C7.88845 9.73127 7.83651 9.79385 7.83651 9.85267C7.83651 9.89459 8.51422 11.8276 8.57367 12.0116C8.4798 12.1436 7.86092 13.0059 7.86092 13.1104C7.86092 13.173 7.91286 13.2218 7.9723 13.2218H8.64C8.67123 13.2198 8.70157 13.2106 8.7287 13.1949C8.75582 13.1793 8.77899 13.1577 8.79644 13.1317V13.1304ZM14.3345 9.42089C14.3345 8.69061 13.7713 8.44719 13.128 8.44719H11.7476C11.7013 8.44682 11.6565 8.46313 11.6214 8.49313C11.5862 8.52313 11.563 8.56481 11.5561 8.61052L10.9929 12.1567C10.986 12.2262 11.0379 12.2957 11.1043 12.2957H11.817C11.8865 12.2957 11.9384 12.2437 11.956 12.1843L12.1124 11.1762C12.1474 10.9259 12.5717 11.0128 12.7382 11.0128C13.7256 11.0128 14.3345 10.4221 14.3345 9.42089ZM17.2612 9.72689H16.6004C16.4684 9.72689 16.4615 9.91837 16.4509 10.0122C16.2594 9.71688 15.964 9.66431 15.6267 9.66431C14.775 9.66431 14.1249 10.4115 14.1249 11.2356C14.1249 11.9133 14.5491 12.3551 15.2268 12.3551C15.5504 12.3551 15.9396 12.1849 16.148 11.9415C16.1373 11.9934 16.1129 12.1048 16.1129 12.1574C16.1129 12.2375 16.148 12.2963 16.2243 12.2963H16.8257C16.9196 12.2963 16.9997 12.1955 17.0172 12.0979L17.372 9.86268C17.3826 9.79635 17.3307 9.72689 17.2612 9.72689ZM18.9126 8.56921C18.9126 8.49975 18.8607 8.44781 18.8012 8.44781H18.158C18.106 8.44781 18.0534 8.48974 18.0466 8.54168L17.4834 12.1574L17.4734 12.1749C17.4734 12.2375 17.5253 12.2963 17.5948 12.2963H18.1686C18.2556 12.2963 18.3426 12.1955 18.3494 12.0979L18.9126 8.57985V8.56921ZM15.7838 10.3702C15.3595 10.3702 15.0291 10.7075 15.0291 11.1349C15.0291 11.4722 15.2725 11.6561 15.5923 11.6561C16.0097 11.6561 16.347 11.3364 16.347 10.909C16.3507 10.5685 16.1073 10.3702 15.7838 10.3702Z"
                fill="#2790C3"
              />
            </g>
            <defs>
              <clipPath id="clip0_677_5021">
                <rect
                  width="20.0246"
                  height="20.0246"
                  fill="white"
                  transform="translate(0 0.820312)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="39"
            height="13"
            viewBox="0 0 39 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_677_5022)">
              <path
                d="M20.3544 4.62527C20.333 6.31213 21.8577 7.2534 23.0063 7.8131C24.1863 8.3873 24.5827 8.75555 24.578 9.26911C24.5692 10.055 23.6367 10.4018 22.7641 10.4153C21.2418 10.4389 20.3566 10.0043 19.6529 9.67559L19.1045 12.2418C19.8105 12.5671 21.1179 12.8508 22.4735 12.8633C25.6558 12.8633 27.7377 11.2924 27.749 8.85692C27.7614 5.7659 23.4735 5.59482 23.5028 4.21322C23.5129 3.79429 23.9127 3.34723 24.7886 3.23356C25.2222 3.17614 26.4191 3.1322 27.7761 3.75708L28.3087 1.27425C27.5789 1.00854 26.641 0.754104 25.4733 0.754104C22.4781 0.754104 20.3714 2.34634 20.3544 4.62527ZM33.4264 0.967964C32.8453 0.967964 32.3556 1.30692 32.1371 1.82707L27.5914 12.6809H30.7713L31.4041 10.9321H35.2899L35.657 12.6809H38.4597L36.014 0.967964H33.4264ZM33.8713 4.13207L34.7889 8.53041H32.2756L33.8713 4.13207ZM16.4989 0.96811L13.9924 12.6808H17.0226L19.528 0.967817L16.4989 0.96811ZM12.0162 0.96811L8.8622 8.94026L7.58636 2.16163C7.43666 1.40491 6.84546 0.967964 6.18894 0.967964H1.03315L0.960938 1.30809C2.0194 1.53777 3.222 1.90822 3.95059 2.30459C4.39647 2.54672 4.52362 2.75838 4.67009 3.33376L7.08657 12.6809H10.2888L15.1982 0.967964L12.0162 0.96811Z"
                fill="url(#paint0_linear_677_5022)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_677_5022"
                x1="1724.93"
                y1="37.1543"
                x2="1759.98"
                y2="-1206.48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#222357" />
                <stop offset="1" stopColor="#254AA5" />
              </linearGradient>
              <clipPath id="clip0_677_5022">
                <rect
                  width="37.4988"
                  height="12.1578"
                  fill="white"
                  transform="translate(0.960938 0.753906)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="28"
            height="22"
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_677_5023)">
              <path
                d="M5.41813 21.4526V20.0326C5.41813 19.4881 5.08671 19.1332 4.51864 19.1332C4.23465 19.1332 3.92695 19.2279 3.71391 19.5356C3.54831 19.2752 3.31166 19.1332 2.95663 19.1332C2.71987 19.1332 2.48333 19.2041 2.2939 19.4645V19.1805H1.79688V21.4526H2.2939V20.1982C2.2939 19.7959 2.50694 19.6065 2.83836 19.6065C3.16956 19.6065 3.33538 19.8195 3.33538 20.1982V21.4526H3.8324V20.1982C3.8324 19.7959 4.06894 19.6065 4.37665 19.6065C4.70807 19.6065 4.87367 19.8195 4.87367 20.1982V21.4526H5.41813ZM12.7787 19.1805H11.9741V18.4942H11.477V19.1805H11.0274V19.6301H11.4769V20.6716C11.4769 21.1923 11.69 21.4999 12.2581 21.4999C12.4711 21.4999 12.7076 21.429 12.8735 21.3343L12.7314 20.9082C12.5894 21.0029 12.4238 21.0266 12.3054 21.0266C12.0687 21.0266 11.9741 20.8846 11.9741 20.6479V19.6301H12.7787V19.1805ZM16.9916 19.1331C16.7076 19.1331 16.5183 19.2752 16.3999 19.4645V19.1805H15.9029V21.4526H16.3999V20.1746C16.3999 19.7959 16.5655 19.5829 16.8732 19.5829C16.9679 19.5829 17.0863 19.6066 17.1809 19.6302L17.3229 19.1569C17.2283 19.1332 17.0863 19.1332 16.9916 19.1332M10.625 19.37C10.3882 19.2042 10.0569 19.1333 9.7019 19.1333C9.13393 19.1333 8.75529 19.4173 8.75529 19.867C8.75529 20.2457 9.03927 20.4587 9.53629 20.5297L9.77294 20.5534C10.0333 20.6007 10.1753 20.6717 10.1753 20.7901C10.1753 20.9557 9.98599 21.0741 9.65457 21.0741C9.32325 21.0741 9.06288 20.9557 8.89717 20.8374L8.66052 21.2161C8.92089 21.4054 9.27592 21.5 9.63085 21.5C10.2936 21.5 10.6723 21.1924 10.6723 20.7664C10.6723 20.364 10.3646 20.151 9.89122 20.08L9.65457 20.0563C9.44153 20.0326 9.27592 19.9854 9.27592 19.8434C9.27592 19.6777 9.44152 19.583 9.7019 19.583C9.98598 19.583 10.27 19.7013 10.412 19.7723L10.625 19.37ZM23.8317 19.1333C23.5476 19.1333 23.3582 19.2753 23.2399 19.4646V19.1806H22.7428V21.4527H23.2399V20.1747C23.2399 19.796 23.4056 19.583 23.7132 19.583C23.8079 19.583 23.9263 19.6067 24.021 19.6303L24.163 19.157C24.0683 19.1333 23.9263 19.1333 23.8317 19.1333ZM17.4886 20.3167C17.4886 21.003 17.9619 21.5 18.6957 21.5C19.027 21.5 19.2637 21.4291 19.5003 21.2398L19.2637 20.8374C19.0744 20.9794 18.885 21.0503 18.672 21.0503C18.2696 21.0503 17.9857 20.7664 17.9857 20.3167C17.9857 19.8907 18.2696 19.6066 18.672 19.583C18.885 19.583 19.0744 19.6539 19.2637 19.796L19.5003 19.3937C19.2637 19.2042 19.027 19.1333 18.6957 19.1333C17.9619 19.1333 17.4886 19.6303 17.4886 20.3167ZM22.0802 20.3167V19.1806H21.5832V19.4646C21.4175 19.2517 21.1808 19.1333 20.8731 19.1333C20.2341 19.1333 19.7371 19.6303 19.7371 20.3167C19.7371 21.003 20.2341 21.5 20.8731 21.5C21.2045 21.5 21.4412 21.3818 21.5832 21.1687V21.4527H22.0802V20.3167ZM20.2577 20.3167C20.2577 19.9143 20.5181 19.583 20.9441 19.583C21.3464 19.583 21.6305 19.8907 21.6305 20.3167C21.6305 20.719 21.3464 21.0503 20.9441 21.0503C20.5181 21.0266 20.2577 20.719 20.2577 20.3167ZM14.3172 19.1333C13.6545 19.1333 13.181 19.6066 13.181 20.3167C13.181 21.0267 13.6544 21.5 14.3408 21.5C14.6721 21.5 15.0035 21.4054 15.2639 21.1924L15.0271 20.8374C14.8378 20.9794 14.6012 21.0741 14.3645 21.0741C14.0568 21.0741 13.7491 20.9321 13.6781 20.5296H15.3586V20.3404C15.3823 19.6066 14.9563 19.1333 14.3172 19.1333ZM14.3171 19.5593C14.6247 19.5593 14.8378 19.7487 14.885 20.1037H13.7017C13.749 19.796 13.9621 19.5593 14.3171 19.5593ZM26.648 20.3167V18.2812H26.1509V19.4646C25.9852 19.2517 25.7486 19.1333 25.4409 19.1333C24.8019 19.1333 24.3049 19.6303 24.3049 20.3167C24.3049 21.003 24.8019 21.5 25.4409 21.5C25.7723 21.5 26.009 21.3818 26.1509 21.1687V21.4527H26.648V20.3167ZM24.8256 20.3167C24.8256 19.9143 25.0859 19.583 25.5119 19.583C25.9143 19.583 26.1983 19.8907 26.1983 20.3167C26.1983 20.719 25.9143 21.0503 25.5119 21.0503C25.0859 21.0266 24.8256 20.719 24.8256 20.3167ZM8.21072 20.3167V19.1806H7.7137V19.4646C7.54799 19.2517 7.31134 19.1333 7.00364 19.1333C6.36462 19.1333 5.8676 19.6303 5.8676 20.3167C5.8676 21.003 6.36462 21.5 7.00364 21.5C7.33506 21.5 7.57171 21.3818 7.7137 21.1687V21.4527H8.21072V20.3167ZM6.36462 20.3167C6.36462 19.9143 6.625 19.583 7.05097 19.583C7.45333 19.583 7.73742 19.8907 7.73742 20.3167C7.73742 20.719 7.45333 21.0503 7.05097 21.0503C6.625 21.0266 6.36462 20.719 6.36462 20.3167Z"
                fill="black"
              />
              <path
                d="M10.457 1.92773H17.9124V15.3237H10.457V1.92773Z"
                fill="#FF5F00"
              />
              <path
                d="M10.9307 8.62589C10.9307 5.90413 12.2087 3.48996 14.1731 1.92785C12.7294 0.791812 10.9071 0.105469 8.91897 0.105469C4.2089 0.105469 0.398438 3.91593 0.398438 8.62589C0.398438 13.3357 4.2089 17.1463 8.91886 17.1463C10.9069 17.1463 12.7293 16.46 14.1731 15.3238C12.2087 13.7854 10.9307 11.3477 10.9307 8.62589Z"
                fill="#EB001B"
              />
              <path
                d="M27.9699 8.62589C27.9699 13.3357 24.1595 17.1463 19.4495 17.1463C17.4614 17.1463 15.639 16.46 14.1953 15.3238C16.1834 13.7618 17.4378 11.3477 17.4378 8.62589C17.4378 5.90413 16.1597 3.48996 14.1953 1.92785C15.6389 0.791812 17.4614 0.105469 19.4495 0.105469C24.1595 0.105469 27.9699 3.93965 27.9699 8.62589Z"
                fill="#F79E1B"
              />
            </g>
            <defs>
              <clipPath id="clip0_677_5023">
                <rect
                  width="27.6003"
                  height="21.455"
                  fill="white"
                  transform="translate(0.398438 0.105469)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="block text-base font-light text-blueGray-500 mb-2.5">
          Buyer Protection
        </span>
        <div className="flex items-start gap-2.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 10.3688L7.13125 8.75L6.25 9.63125L8.75 12.1313L13.75 7.13125L12.8688 6.25L8.75 10.3688Z"
              fill="#F0AE11"
            />
            <path
              d="M10 18.75L6.14 16.6919C5.0395 16.1066 4.11919 15.2325 3.4779 14.1637C2.83661 13.0948 2.49854 11.8715 2.5 10.625V2.5C2.5 2.16848 2.6317 1.85054 2.86612 1.61612C3.10054 1.3817 3.41848 1.25 3.75 1.25H16.25C16.5815 1.25 16.8995 1.3817 17.1339 1.61612C17.3683 1.85054 17.5 2.16848 17.5 2.5V10.625C17.5015 11.8715 17.1634 13.0948 16.5221 14.1637C15.8808 15.2325 14.9605 16.1066 13.86 16.6919L10 18.75ZM3.75 2.5V10.625C3.74931 11.6448 4.02618 12.6456 4.55093 13.52C5.07568 14.3945 5.82853 15.1096 6.72875 15.5887L10 17.3331L13.2713 15.5894C14.1716 15.1102 14.9245 14.3949 15.4492 13.5204C15.974 12.6458 16.2508 11.6449 16.25 10.625V2.5H3.75Z"
              fill="#F0AE11"
            />
          </svg>
          <span className="text-secondary-100">
            Get full refund if the item is not as describe or if it is not
            delivered
          </span>
        </div>
      </div>
    </div>
  );
}