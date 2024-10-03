"use client";
import React, { useState } from "react";
import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import StoreSetup from "./StoreSetup";
import PaymentSetup from "./PaymentSetup";
import { useRouter } from "next/navigation";

const DetailsForm = ({ accountNumbers, licenseNumbers }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(null);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState({
    0: false,
    1: false,
  });

  const handleStepClick = (step) => {
    // Ensure that for every step less than the clicked step, the form has been submitted
    for (let i = 0; i < step; i++) {
      if (!isFormSubmitted[i]) {
        return; // Prevent moving forward if any previous step is not submitted
      }
    }

    // Set the active step if conditions are met
    setActiveStep(step);
  };

  return (
    <div className="py-16 bg-[#FFFCF5] w-full overflow-auto">
      <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="mb-10">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              lineClassName="bg-[#E6E6E6]"
              activeLineClassName="bg-primary-200"
            >
              <Step
                onClick={() => handleStepClick(0)}
                className="h-12 w-12 text-[#808080]"
                activeClassName="bg-primary-200 text-black"
                completedClassName="bg-primary-200 text-black"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18Z"
                    fill="currentColor"
                  />
                </svg>
              </Step>
              <Step
                onClick={() => handleStepClick(1)}
                className="h-12 w-12 text-[#808080]"
                activeClassName="bg-primary-200 text-black"
                completedClassName="bg-primary-200 text-black"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57143 5C4.62423 5 3.71582 5.37627 3.04605 6.04605C2.37627 6.71582 2 7.62423 2 8.57143V9.28571H22V8.57143C22 7.62423 21.6237 6.71582 20.954 6.04605C20.2842 5.37627 19.3758 5 18.4286 5H5.57143ZM22 10.7143H2V15.7143C2 16.6615 2.37627 17.5699 3.04605 18.2397C3.71582 18.9094 4.62423 19.2857 5.57143 19.2857H18.4286C19.3758 19.2857 20.2842 18.9094 20.954 18.2397C21.6237 17.5699 22 16.6615 22 15.7143V10.7143ZM15.5714 15H18.4286C18.618 15 18.7997 15.0753 18.9336 15.2092C19.0676 15.3432 19.1429 15.5248 19.1429 15.7143C19.1429 15.9037 19.0676 16.0854 18.9336 16.2194C18.7997 16.3533 18.618 16.4286 18.4286 16.4286H15.5714C15.382 16.4286 15.2003 16.3533 15.0664 16.2194C14.9324 16 .0854 14.8571 15.9037 14.8571 15.7143C14.8571 15.5248 14.9324 15.3432 15.0664 15.2092C15.2003 15.0753 15.382 15 15.5714 15Z"
                    fill="currentColor"
                  />
                </svg>
              </Step>
              <Step
                onClick={() => handleStepClick(2)}
                className="h-12 w-12 text-[#808080]"
                activeClassName="bg-primary-200 text-black"
                completedClassName="bg-primary-200 text-black"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 21H8V8L15 1L16.25 2.25C16.3667 2.36667 16.4627 2.525 16.538 2.725C16.6133 2.925 16.6507 3.11667 16.65 3.3V3.65L15.55 8H21C21.5333 8 22 8.2 22.4 8.6C22.8 9 23 9.46667 23 10V12C23 12.1167 22.9877 12.2417 22.963 12.375C22.9383 12.5083 22.9007 12.6333 22.85 12.75L19.85 19.8C19.7 20.1333 19.45 20.4167 19.1 20.65C18.75 20.8833 18.3833 21 18 21ZM6 8V21H2V8H6Z"
                    fill="currentColor"
                  />
                </svg>
              </Step>
            </Stepper>
          </div>

          {activeStep === null && (
            <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
              <div className="">
                <h4 className="text-2xl font-medium trekking-wide font-emirates mb-10">
                  Welcome to my Jewlex !
                </h4>
                <Typography className="font-emirates text-[#4D4D4D] text-base tracking-wide">
                  Congratulations on completing your registration with My
                  Jewelex! We are thrilled to welcome you to our esteemed
                  community of jewelry vendors. As you embark on this exciting
                  journey, our comprehensive onboarding process will guide you
                  through the essential steps to set up your store, ensuring a
                  smooth and successful start.
                </Typography>
                <div className="flex gap-5 items-center mt-5">
                  <Button className="w-3/12" onClick={() => setActiveStep(0)}>
                    Do it now
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setActiveStep(
                        activeStep === null ? 1 : activeStep === 1 ? 2 : 0
                      )
                    }
                    className="w-3/12 hover:bg-primary-200 hover:text-black hover:opacity-100"
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 0 && (
            <StoreSetup
              setActiveStep={setActiveStep}
              licenseNumbers={licenseNumbers}
              setIsFormSubmitted={setIsFormSubmitted}
            />
          )}

          {activeStep === 1 && (
            <PaymentSetup
              setActiveStep={setActiveStep}
              accountNumbers={accountNumbers}
              setIsFormSubmitted={setIsFormSubmitted}
            />
          )}

          {activeStep === 2 && (
            <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
              <div className="flex justify-center items-center flex-col gap-10">
                <div>
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 65 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="32.5" cy="32.5" r="32.5" fill="#2EEA59" />
                    <path
                      d="M46.7987 22.5331H19.0654V19.0664H46.7987V22.5331ZM39.328 36.3997H36.3987V39.3291C35.3067 40.9757 34.6654 42.9344 34.6654 45.0664C34.6654 45.6557 34.7347 46.2277 34.8214 46.7997H19.0654V36.3997H17.332V32.9331L19.0654 24.2664H46.7987L48.532 32.9331V35.2731C47.44 34.8917 46.2787 34.6664 45.0654 34.6664C42.9334 34.6664 40.9747 35.3077 39.328 36.3997ZM32.932 36.3997H22.532V43.3331H32.932V36.3997ZM49.1214 39.5891L42.8987 45.8117L40.1427 43.0557L38.132 45.0664L42.8987 50.2664L51.132 42.0331L49.1214 39.5891Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-medium Trekking-wide font-emirates">
                  Your store is all set and ready to shine!
                </h4>
                <Button onClick={() => router.push("/shop")}>
                  Go to Store
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailsForm;
