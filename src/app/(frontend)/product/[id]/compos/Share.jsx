import React from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function Share() {
  return (
    <span className="flex items-center gap-2 mt-3 text-secondary-100">
      Share on :
      <FacebookShareButton
        url="https://tailwindcss.com/"
        title="Hello"
        separator=": "
      >
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
      </FacebookShareButton>
      <LinkedinShareButton
        url="https://tailwindcss.com/"
        title="Hello"
        separator=": "
      >
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
      </LinkedinShareButton>
      <InstapaperShareButton
        url="https://tailwindcss.com/"
        title="Hello"
        separator=": "
      >
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
      </InstapaperShareButton>
    </span>
  );
}
