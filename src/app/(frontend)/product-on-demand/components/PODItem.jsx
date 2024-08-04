"use client";
import Paragraph from "@/components/Paragraph";
import ImageCarousel from "./ImageCarousel";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { truncate } from "@/utils/helper";
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
    <div className="border rounded-sm shadow-sm flex items-start relative ">
      <div className="w-[370px] relative overflow-hidden">
        <ImageCarousel images={pod.Images} />
      </div>
      <div className="flex-1 border-l px-5 py-[10px] ">
        <div className="flex items-center justify-between pb-4">
          <h4 className="text-dark-50 text-[18px]">{pod.name}</h4>
          <Paragraph color={"secondary-100"} classes="text-right text-[13px]">
            POD ID: {`myjewlex${pod.id}`}
          </Paragraph>
        </div>
        <div className="grid grid-cols-2 pb-2">
          <div>
            <h4 className="text-secondary-100">Material</h4>
            <Paragraph>{pod.metal_type}</Paragraph>
          </div>
          {pod.metal_type === "Gold" ? (
            <div>
              <h4 className="text-secondary-100">Karat</h4>
              <Paragraph>{pod.karat}</Paragraph>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-2 pb-2">
          <div>
            <h4 className="text-secondary-100 ">Weight</h4>
            <Paragraph>{weight_print()}</Paragraph>
          </div>
          <div>
            <h4 className="text-secondary-100 ">Made in</h4>
            <Paragraph>{String(pod.made_in).split(",").join(" | ")}</Paragraph>
          </div>
        </div>
        <div className="grid grid-cols-2 pb-1">
          <div>
            <h4 className="text-secondary-100">Price</h4>
            <Paragraph>{price_print()}</Paragraph>
          </div>
        </div>
        <div className="border-t flex flex-col justify-between pt-1">
          <Paragraph color={"secondary-100"} classes={"mb-[74px]"}>
            {truncate(pod.description, 70)}
          </Paragraph>
          <div>
            <div className="flex items-center justify-between">
              <Link
                data-ripple-light="true"
                className="flex gap-[8px] w-[150px] text-dark-50 text-center justify-center rounded-sm items-center  middle none bg-primary-200 py-[5px] px-[14px] align-middle text-[14px]  shadow-md shadow-primary-200/10 transition-all hover:shadow-lg hover:primary-200/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                href={`tel:${pod.contact}`}
              >
                <svg
                  className="mb-1"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8 14C12.4111 14 11.0389 13.6973 9.68333 13.092C8.32778 12.4867 7.09444 11.6282 5.98333 10.5167C4.87222 9.40511 4.014 8.17178 3.40867 6.81667C2.80333 5.46156 2.50044 4.08933 2.5 2.7C2.5 2.5 2.56667 2.33333 2.7 2.2C2.83333 2.06667 3 2 3.2 2H5.9C6.05556 2 6.19444 2.05289 6.31667 2.15867C6.43889 2.26444 6.51111 2.38933 6.53333 2.53333L6.96667 4.86667C6.98889 5.04444 6.98333 5.19444 6.95 5.31667C6.91667 5.43889 6.85556 5.54444 6.76667 5.63333L5.15 7.26667C5.37222 7.67778 5.636 8.07489 5.94133 8.458C6.24667 8.84111 6.58289 9.21067 6.95 9.56667C7.29444 9.91111 7.65556 10.2307 8.03333 10.5253C8.41111 10.82 8.81111 11.0893 9.23333 11.3333L10.8 9.76667C10.9 9.66667 11.0307 9.59178 11.192 9.542C11.3533 9.49222 11.5116 9.47822 11.6667 9.5L13.9667 9.96667C14.1222 10.0111 14.25 10.0918 14.35 10.2087C14.45 10.3256 14.5 10.456 14.5 10.6V13.3C14.5 13.5 14.4333 13.6667 14.3 13.8C14.1667 13.9333 14 14 13.8 14Z"
                    fill="#010101"
                  />
                </svg>
                {pod.contact}
              </Link>
              <Button className="bg-primary-200 text-[14px] text-dark-50 flex gap-[8px] w-[150px] text-center justify-center rounded-sm items-center px-[14px] py-[5px] font-normal font-emirates normal-case">
                <svg
                  className="mb-1"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6991 7.95125C14.6991 10.8486 11.9243 13.1974 8.50191 13.1974C7.88808 13.1987 7.27676 13.1216 6.6838 12.9681C6.2314 13.1899 5.19259 13.6156 3.44498 13.8929C3.29005 13.9169 3.1723 13.761 3.2335 13.6216C3.50772 12.9951 3.75561 12.1602 3.82998 11.3987C2.88103 10.4769 2.30469 9.27028 2.30469 7.95125C2.30469 5.05386 5.07949 2.70508 8.50191 2.70508C11.9243 2.70508 14.6991 5.05386 14.6991 7.95125ZM6.17795 7.95125C6.17795 7.75248 6.09634 7.56185 5.95106 7.4213C5.80579 7.28075 5.60875 7.20179 5.4033 7.20179C5.19785 7.20179 5.00081 7.28075 4.85554 7.4213C4.71026 7.56185 4.62865 7.75248 4.62865 7.95125C4.62865 8.15001 4.71026 8.34064 4.85554 8.48119C5.00081 8.62174 5.19785 8.7007 5.4033 8.7007C5.60875 8.7007 5.80579 8.62174 5.95106 8.48119C6.09634 8.34064 6.17795 8.15001 6.17795 7.95125ZM9.27656 7.95125C9.27656 7.75248 9.19495 7.56185 9.04967 7.4213C8.9044 7.28075 8.70736 7.20179 8.50191 7.20179C8.29646 7.20179 8.09942 7.28075 7.95415 7.4213C7.80887 7.56185 7.72726 7.75248 7.72726 7.95125C7.72726 8.15001 7.80887 8.34064 7.95415 8.48119C8.09942 8.62174 8.29646 8.7007 8.50191 8.7007C8.70736 8.7007 8.9044 8.62174 9.04967 8.48119C9.19495 8.34064 9.27656 8.15001 9.27656 7.95125ZM11.6005 8.7007C11.806 8.7007 12.003 8.62174 12.1483 8.48119C12.2936 8.34064 12.3752 8.15001 12.3752 7.95125C12.3752 7.75248 12.2936 7.56185 12.1483 7.4213C12.003 7.28075 11.806 7.20179 11.6005 7.20179C11.3951 7.20179 11.198 7.28075 11.0528 7.4213C10.9075 7.56185 10.8259 7.75248 10.8259 7.95125C10.8259 8.15001 10.9075 8.34064 11.0528 8.48119C11.198 8.62174 11.3951 8.7007 11.6005 8.7007Z"
                    fill="#010101"
                  />
                </svg>
                Chat
              </Button>
              <Button className="bg-primary-200 text-[14px] text-dark-50 flex gap-[8px] w-[150px] text-center justify-center rounded-sm items-center px-[14px] py-[5px] font-normal font-emirates normal-case">
                <svg
                  className="mb-1"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 10.7207C11.9933 10.7207 11.54 10.9207 11.1933 11.234L6.44 8.46732C6.47333 8.31398 6.5 8.16065 6.5 8.00065C6.5 7.84065 6.47333 7.68732 6.44 7.53398L11.14 4.79398C11.5 5.12732 11.9733 5.33398 12.5 5.33398C13.6067 5.33398 14.5 4.44065 14.5 3.33398C14.5 2.22732 13.6067 1.33398 12.5 1.33398C11.3933 1.33398 10.5 2.22732 10.5 3.33398C10.5 3.49398 10.5267 3.64732 10.56 3.80065L5.86 6.54065C5.5 6.20732 5.02667 6.00065 4.5 6.00065C3.39333 6.00065 2.5 6.89398 2.5 8.00065C2.5 9.10732 3.39333 10.0007 4.5 10.0007C5.02667 10.0007 5.5 9.79398 5.86 9.46065L10.6067 12.234C10.5733 12.374 10.5533 12.5206 10.5533 12.6673C10.5533 13.7407 11.4267 14.614 12.5 14.614C13.5733 14.614 14.4467 13.7407 14.4467 12.6673C14.4467 11.594 13.5733 10.7207 12.5 10.7207Z"
                    fill="#010101"
                  />
                </svg>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
