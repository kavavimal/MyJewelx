"use client";
import ImageCarousel from "./ImageCarousel";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import { truncate } from "@/utils/helper";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Paragraph from "@/app/components/Paragraph";
export default function PODItem({ pod }) {
  const weight_print = () => {
    let weight = "";
    switch (pod.weight_type) {
      case "range":
        weight = `${pod.min_weight} Grams - ${pod.max_weight} Grams`;
        break;
      case "min":
        weight = `Min: ${pod.min_weight} Grams`;
        break;
      case "max":
        weight = `Max: ${pod.min_weight} Grams`;
        break;

      default:
        break;
    }
    return weight;
  };
  const price_print = () => {
    let price = "";
    switch (pod.price_type) {
      case "range":
        price = `${CURRENCY_SYMBOL} ${pod.min_price} - ${CURRENCY_SYMBOL} ${pod.max_price}`;
        break;
      case "min":
        price = `Min: ${CURRENCY_SYMBOL} ${pod.min_price}`;
        break;
      case "max":
        price = `Max: ${CURRENCY_SYMBOL} ${pod.max_price}`;
        break;

      default:
        break;
    }
    return price;
  };
  return (
    <div className="border rounded-sm border-blueGray-150 flex md:flex-row flex-col items-start relative ">
      <div className="w-full md:w-[370px] relative overflow-hidden">
        <ImageCarousel images={pod.Images} />
      </div>
      <div className="flex-1 border-l w-full p-[15px] md:px-5 md:py-[10px] ">
        <div className="flex items-center justify-between pb-4">
          <h4 className="text-dark-50 text-[18px]">{pod.name}</h4>
          <Paragraph
            color={"secondary-100"}
            classes="text-right leading-[18px]"
            size={"[12px]"}
          >
            POD ID: {`myjewlex${pod.id}`}
          </Paragraph>
        </div>
        <div className="grid grid-cols-2 pb-2">
          <div>
            <h4 className="text-[#a9a9a9] text-[14px] leading-[20.4px]">
              Material
            </h4>
            <Paragraph color="blueGray-500">{pod.metal_type}</Paragraph>
          </div>
          {pod.metal_type === "Gold" ? (
            <div>
              <h4 className="text-[#a9a9a9] text-[14px] leading-[20.4px]">
                Karat
              </h4>
              <Paragraph color="blueGray-500">{pod.karat}</Paragraph>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-2 pb-2">
          <div>
            <h4 className="text-[#a9a9a9] text-[14px] leading-[20.4px] ">
              Weight
            </h4>
            <Paragraph color="blueGray-500">{weight_print()}</Paragraph>
          </div>
          <div>
            <h4 className="text-[#a9a9a9] text-[14px] leading-[20.4px] ">
              Made in
            </h4>
            <Paragraph color="blueGray-500">
              {String(pod.made_in).split(",").join(" | ")}
            </Paragraph>
          </div>
        </div>
        <div className="grid grid-cols-2 pb-1">
          <div>
            <h4 className="text-[#a9a9a9] text-[14px] leading-[20.4px]">
              Price
            </h4>
            <Paragraph color="blueGray-500">{price_print()}</Paragraph>
          </div>
        </div>
        <div className="border-t flex flex-col justify-between pt-1">
          <Paragraph color={"secondary-100"} classes={"h-[95px]"}>
            {truncate(pod.description, 70)}
          </Paragraph>
          <div>
            <div className="flex gap-1 leading-[25.2px] items-center justify-between">
              <Link
                data-ripple-light="true"
                className="flex gap-[8px] max-w-full w-[188px] sm:w-[150px] border border-primary-200 hover:shadow-none hover:bg-transparent hover:text-primary-200 text-dark-50 text-center justify-center rounded-sm items-center  middle none bg-primary-200 py-[5px] px-[14px] align-middle text-[14px]  shadow-md shadow-primary-200/10 transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 "
                href={`tel:${pod.contact}`}
              >
                <svg
                  className="mb-1"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8 14C12.4111 14 11.0389 13.6973 9.68333 13.092C8.32778 12.4867 7.09444 11.6282 5.98333 10.5167C4.87222 9.40511 4.014 8.17178 3.40867 6.81667C2.80333 5.46156 2.50044 4.08933 2.5 2.7C2.5 2.5 2.56667 2.33333 2.7 2.2C2.83333 2.06667 3 2 3.2 2H5.9C6.05556 2 6.19444 2.05289 6.31667 2.15867C6.43889 2.26444 6.51111 2.38933 6.53333 2.53333L6.96667 4.86667C6.98889 5.04444 6.98333 5.19444 6.95 5.31667C6.91667 5.43889 6.85556 5.54444 6.76667 5.63333L5.15 7.26667C5.37222 7.67778 5.636 8.07489 5.94133 8.458C6.24667 8.84111 6.58289 9.21067 6.95 9.56667C7.29444 9.91111 7.65556 10.2307 8.03333 10.5253C8.41111 10.82 8.81111 11.0893 9.23333 11.3333L10.8 9.76667C10.9 9.66667 11.0307 9.59178 11.192 9.542C11.3533 9.49222 11.5116 9.47822 11.6667 9.5L13.9667 9.96667C14.1222 10.0111 14.25 10.0918 14.35 10.2087C14.45 10.3256 14.5 10.456 14.5 10.6V13.3C14.5 13.5 14.4333 13.6667 14.3 13.8C14.1667 13.9333 14 14 13.8 14Z"
                    fill="currentColor"
                  />
                </svg>
                {pod.contact}
              </Link>
              <WhatsappShareButton
                url="https://tailwindcss.com/"
                title="Hello"
                separator=": "
              >
                <Button className="bg-primary-200 border border-primary-200 hover:shadow-none hover:bg-transparent hover:text-primary-200 text-[14px] text-dark-50 flex gap-[8px] w-[80px] max-w-full sm:w-[150px] text-center justify-center rounded-sm items-center px-[14px] py-[5px] font-normal font-emirates normal-case">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-1 "
                  >
                    <path
                      d="M14.6991 7.95125C14.6991 10.8486 11.9243 13.1974 8.50191 13.1974C7.88808 13.1987 7.27676 13.1216 6.6838 12.9681C6.2314 13.1899 5.19259 13.6156 3.44498 13.8929C3.29005 13.9169 3.1723 13.761 3.2335 13.6216C3.50772 12.9951 3.75561 12.1602 3.82998 11.3987C2.88103 10.4769 2.30469 9.27028 2.30469 7.95125C2.30469 5.05386 5.07949 2.70508 8.50191 2.70508C11.9243 2.70508 14.6991 5.05386 14.6991 7.95125ZM6.17795 7.95125C6.17795 7.75248 6.09634 7.56185 5.95106 7.4213C5.80579 7.28075 5.60875 7.20179 5.4033 7.20179C5.19785 7.20179 5.00081 7.28075 4.85554 7.4213C4.71026 7.56185 4.62865 7.75248 4.62865 7.95125C4.62865 8.15001 4.71026 8.34064 4.85554 8.48119C5.00081 8.62174 5.19785 8.7007 5.4033 8.7007C5.60875 8.7007 5.80579 8.62174 5.95106 8.48119C6.09634 8.34064 6.17795 8.15001 6.17795 7.95125ZM9.27656 7.95125C9.27656 7.75248 9.19495 7.56185 9.04967 7.4213C8.9044 7.28075 8.70736 7.20179 8.50191 7.20179C8.29646 7.20179 8.09942 7.28075 7.95415 7.4213C7.80887 7.56185 7.72726 7.75248 7.72726 7.95125C7.72726 8.15001 7.80887 8.34064 7.95415 8.48119C8.09942 8.62174 8.29646 8.7007 8.50191 8.7007C8.70736 8.7007 8.9044 8.62174 9.04967 8.48119C9.19495 8.34064 9.27656 8.15001 9.27656 7.95125ZM11.6005 8.7007C11.806 8.7007 12.003 8.62174 12.1483 8.48119C12.2936 8.34064 12.3752 8.15001 12.3752 7.95125C12.3752 7.75248 12.2936 7.56185 12.1483 7.4213C12.003 7.28075 11.806 7.20179 11.6005 7.20179C11.3951 7.20179 11.198 7.28075 11.0528 7.4213C10.9075 7.56185 10.8259 7.75248 10.8259 7.95125C10.8259 8.15001 10.9075 8.34064 11.0528 8.48119C11.198 8.62174 11.3951 8.7007 11.6005 8.7007Z"
                      fill="currentColor"
                    />
                  </svg>
                  Chat
                </Button>
              </WhatsappShareButton>
              <Menu>
                <MenuHandler>
                  <Button className="bg-primary-200 border border-primary-200 hover:shadow-none hover:bg-transparent hover:text-primary-200 text-[14px] text-dark-50 flex gap-[8px] w-[80px] max-w-full sm:w-[150px] text-center justify-center rounded-sm items-center px-[14px] py-[5px] font-normal font-emirates normal-case">
                    <svg
                      className="mb-1"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 10.7207C11.9933 10.7207 11.54 10.9207 11.1933 11.234L6.44 8.46732C6.47333 8.31398 6.5 8.16065 6.5 8.00065C6.5 7.84065 6.47333 7.68732 6.44 7.53398L11.14 4.79398C11.5 5.12732 11.9733 5.33398 12.5 5.33398C13.6067 5.33398 14.5 4.44065 14.5 3.33398C14.5 2.22732 13.6067 1.33398 12.5 1.33398C11.3933 1.33398 10.5 2.22732 10.5 3.33398C10.5 3.49398 10.5267 3.64732 10.56 3.80065L5.86 6.54065C5.5 6.20732 5.02667 6.00065 4.5 6.00065C3.39333 6.00065 2.5 6.89398 2.5 8.00065C2.5 9.10732 3.39333 10.0007 4.5 10.0007C5.02667 10.0007 5.5 9.79398 5.86 9.46065L10.6067 12.234C10.5733 12.374 10.5533 12.5206 10.5533 12.6673C10.5533 13.7407 11.4267 14.614 12.5 14.614C13.5733 14.614 14.4467 13.7407 14.4467 12.6673C14.4467 11.594 13.5733 10.7207 12.5 10.7207Z"
                        fill="currentColor"
                      />
                    </svg>
                    Share
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <FacebookShareButton
                      url="https://tailwindcss.com/"
                      title="Hello"
                      separator=": "
                    >
                      <span className="flex items-center gap-2 text-black text-base">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.0029 2.00195C6.48091 2.00195 2.00391 6.47895 2.00391 12.001C2.00391 16.991 5.65991 21.127 10.4409 21.88V14.892H7.90091V12.001H10.4409V9.79795C10.4409 7.28995 11.9339 5.90695 14.2169 5.90695C15.3109 5.90695 16.4569 6.10195 16.4569 6.10195V8.56095H15.1929C13.9529 8.56095 13.5649 9.33295 13.5649 10.124V11.999H16.3359L15.8929 14.89H13.5649V21.878C18.3459 21.129 22.0019 16.992 22.0019 12.001C22.0019 6.47895 17.5249 2.00195 12.0029 2.00195Z"
                            fill="#4D4D4D"
                          />
                        </svg>
                        Facebook
                      </span>
                    </FacebookShareButton>
                  </MenuItem>
                  <MenuItem>
                    <LinkedinShareButton
                      url="https://tailwindcss.com/"
                      title="Hello"
                      separator=": "
                    >
                      <span className="flex items-center gap-2 text-black text-base">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_741_10083)">
                            <path
                              d="M9.99844 0.400391C4.69644 0.400391 0.398438 4.69839 0.398438 10.0004C0.398438 15.3024 4.69644 19.6004 9.99844 19.6004C15.3004 19.6004 19.5984 15.3024 19.5984 10.0004C19.5984 4.69839 15.3004 0.400391 9.99844 0.400391ZM7.64844 13.9794H5.70444V7.72339H7.64844V13.9794ZM6.66444 6.95539C6.05044 6.95539 5.65344 6.52039 5.65344 5.98239C5.65344 5.43339 6.06244 5.01139 6.68944 5.01139C7.31644 5.01139 7.70044 5.43339 7.71244 5.98239C7.71244 6.52039 7.31644 6.95539 6.66444 6.95539ZM14.7484 13.9794H12.8044V10.5124C12.8044 9.70539 12.5224 9.15739 11.8194 9.15739C11.2824 9.15739 10.9634 9.52839 10.8224 9.88539C10.7704 10.0124 10.7574 10.1924 10.7574 10.3714V13.9784H8.81244V9.71839C8.81244 8.93739 8.78744 8.28439 8.76144 7.72239H10.4504L10.5394 8.59139H10.5784C10.8344 8.18339 11.4614 7.58139 12.5104 7.58139C13.7894 7.58139 14.7484 8.43839 14.7484 10.2804V13.9794Z"
                              fill="#4D4D4D"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_741_10083">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Linkedin
                      </span>
                    </LinkedinShareButton>
                  </MenuItem>
                  <MenuItem>
                    <InstapaperShareButton
                      url="https://tailwindcss.com/"
                      title="Hello"
                      separator=": "
                    >
                      <span className="flex items-center gap-2 text-black text-base">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.6099 12.2438C13.6038 12.5606 13.5039 12.8684 13.3227 13.1283C13.1415 13.3882 12.8872 13.5885 12.592 13.7037C12.2969 13.819 11.9742 13.844 11.6648 13.7756C11.3554 13.7072 11.0733 13.5485 10.8542 13.3196C10.6352 13.0907 10.489 12.8019 10.4342 12.4898C10.3795 12.1777 10.4186 11.8564 10.5467 11.5666C10.6747 11.2768 10.886 11.0315 11.1536 10.8619C11.4212 10.6923 11.7331 10.6059 12.0499 10.6138C12.4708 10.6294 12.8691 10.8083 13.1603 11.1126C13.4515 11.4168 13.6128 11.8226 13.6099 12.2438Z"
                            fill="#4D4D4D"
                          />
                          <path
                            d="M14.7615 7.23438H9.3365C8.7997 7.23438 8.28489 7.44762 7.90532 7.82719C7.52574 8.20676 7.3125 8.72158 7.3125 9.25838V14.8054C7.3125 15.0712 7.36485 15.3344 7.46657 15.5799C7.56828 15.8255 7.71737 16.0486 7.90532 16.2366C8.09326 16.4245 8.31639 16.5736 8.56195 16.6753C8.80751 16.777 9.0707 16.8294 9.3365 16.8294H14.7615C15.0273 16.8294 15.2905 16.777 15.5361 16.6753C15.7816 16.5736 16.0047 16.4245 16.1927 16.2366C16.3806 16.0486 16.5297 15.8255 16.6314 15.5799C16.7331 15.3344 16.7855 15.0712 16.7855 14.8054V9.26838C16.7866 9.00181 16.735 8.73766 16.6338 8.49106C16.5326 8.24446 16.3837 8.02026 16.1956 7.83131C16.0076 7.64236 15.7842 7.49237 15.5381 7.38993C15.292 7.2875 15.0281 7.23464 14.7615 7.23438ZM12.0485 14.9574C11.5115 14.9695 10.983 14.8213 10.5305 14.5318C10.0781 14.2422 9.72216 13.8245 9.50819 13.3317C9.29422 12.839 9.23191 12.2937 9.32922 11.7654C9.42652 11.2372 9.67903 10.7498 10.0545 10.3657C10.43 9.98154 10.9114 9.71798 11.4373 9.60865C11.9633 9.49931 12.5098 9.54916 13.0073 9.75183C13.5048 9.95449 13.9306 10.3008 14.2304 10.7465C14.5302 11.1923 14.6904 11.7172 14.6905 12.2544C14.6946 12.6054 14.6295 12.9537 14.4989 13.2795C14.3683 13.6053 14.1749 13.9022 13.9295 14.1532C13.6842 14.4043 13.3918 14.6045 13.069 14.7425C12.7463 14.8804 12.3995 14.9535 12.0485 14.9574ZM14.9845 9.55237C14.9185 9.55239 14.8532 9.53924 14.7924 9.51369C14.7315 9.48814 14.6764 9.4507 14.6302 9.40358C14.584 9.35646 14.5477 9.3006 14.5233 9.23926C14.499 9.17792 14.4872 9.11235 14.4885 9.04638C14.4885 8.91218 14.5418 8.78347 14.6367 8.68858C14.7316 8.59369 14.8603 8.54037 14.9945 8.54037C15.1287 8.54037 15.2574 8.59369 15.3523 8.68858C15.4472 8.78347 15.5005 8.91218 15.5005 9.04638C15.5025 9.11781 15.489 9.18883 15.461 9.25458C15.433 9.32033 15.3911 9.37924 15.3382 9.42729C15.2853 9.47535 15.2227 9.5114 15.1545 9.53299C15.0864 9.55458 15.0144 9.56119 14.9435 9.55237H14.9845Z"
                            fill="#4D4D4D"
                          />
                          <path
                            d="M12.0501 2.00013C9.39796 1.98686 6.84915 3.02771 4.96441 4.8937C3.07967 6.75969 2.01339 9.29796 2.00013 11.9501C1.98686 14.6023 3.02771 17.1511 4.8937 19.0358C6.75969 20.9206 9.29796 21.9869 11.9501 22.0001C13.2633 22.0067 14.565 21.7545 15.7808 21.2581C16.9965 20.7616 18.1026 20.0305 19.0358 19.1065C19.9691 18.1826 20.7112 17.0839 21.2198 15.8732C21.7284 14.6624 21.9936 13.3633 22.0001 12.0501C22.0067 10.7369 21.7545 9.43525 21.2581 8.21948C20.7616 7.00372 20.0305 5.89764 19.1065 4.96441C18.1826 4.03118 17.0839 3.28908 15.8732 2.78046C14.6624 2.27185 13.3633 2.00669 12.0501 2.00013ZM18.1231 14.7021C18.1259 15.1508 18.0396 15.5955 17.8693 16.0105C17.6989 16.4256 17.4478 16.8026 17.1306 17.1199C16.8134 17.4372 16.4364 17.6884 16.0214 17.8589C15.6065 18.0294 15.1618 18.1158 14.7131 18.1131H9.38913C8.94057 18.1156 8.49596 18.0292 8.08105 17.8587C7.66614 17.6882 7.28915 17.4372 6.97192 17.12C6.65469 16.8029 6.40351 16.426 6.23293 16.0111C6.06234 15.5963 5.97574 15.1517 5.97813 14.7031V9.37813C5.97534 8.92949 6.06163 8.48477 6.232 8.06973C6.40237 7.6547 6.65343 7.27761 6.97062 6.96033C7.28781 6.64304 7.66482 6.39187 8.07981 6.22138C8.49479 6.05089 8.93949 5.96447 9.38812 5.96713H14.7131C15.1617 5.96447 15.6063 6.05086 16.0212 6.22129C16.4361 6.39172 16.8131 6.6428 17.1303 6.95997C17.4475 7.27715 17.6985 7.65412 17.869 8.06904C18.0394 8.48396 18.1258 8.92858 18.1231 9.37713V14.7021Z"
                            fill="#4D4D4D"
                          />
                        </svg>
                        Instagram
                      </span>
                    </InstapaperShareButton>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
