"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Step,
  Stepper,
  Textarea,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";

const DetailsForm = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [issuedDate, setIssuedDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);

  const format = (dateString) => {
    const date = new Date(dateString);

    // Format the date to the local format
    const formattedDate = date.toLocaleDateString("en-IN", {
      weekday: "short", // Use 'short' for abbreviated weekday name
      year: "numeric",
      month: "short", // Use 'short' for abbreviated month name
      day: "2-digit",
    });

    return `${formattedDate}`;
  };

  // Combine the formatted date and time

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
                onClick={() => setActiveStep(0)}
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
                onClick={() => setActiveStep(1)}
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
                    d="M5.57143 5C4.62423 5 3.71582 5.37627 3.04605 6.04605C2.37627 6.71582 2 7.62423 2 8.57143V9.28571H22V8.57143C22 7.62423 21.6237 6.71582 20.954 6.04605C20.2842 5.37627 19.3758 5 18.4286 5H5.57143ZM22 10.7143H2V15.7143C2 16.6615 2.37627 17.5699 3.04605 18.2397C3.71582 18.9094 4.62423 19.2857 5.57143 19.2857H18.4286C19.3758 19.2857 20.2842 18.9094 20.954 18.2397C21.6237 17.5699 22 16.6615 22 15.7143V10.7143ZM15.5714 15H18.4286C18.618 15 18.7997 15.0753 18.9336 15.2092C19.0676 15.3432 19.1429 15.5248 19.1429 15.7143C19.1429 15.9037 19.0676 16.0854 18.9336 16.2194C18.7997 16.3533 18.618 16.4286 18.4286 16.4286H15.5714C15.382 16.4286 15.2003 16.3533 15.0664 16.2194C14.9324 16.0854 14.8571 15.9037 14.8571 15.7143C14.8571 15.5248 14.9324 15.3432 15.0664 15.2092C15.2003 15.0753 15.382 15 15.5714 15Z"
                    fill="currentColor"
                  />
                </svg>
              </Step>
              <Step
                onClick={() => setActiveStep(2)}
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
                  <Button variant="outlined" className="w-3/12">
                    Skip for now
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 0 && (
            <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
              <div className="">
                <h4 className="text-2xl font-medium trekking-wide font-emirates mb-4">
                  Store Setup
                </h4>
                <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Trade License information
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Input label="Trade License Number" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="Issued at" type="text" size="lg" />
                  </div>
                  <div>
                    <Popover placement="bottom">
                      <PopoverHandler>
                        <Input
                          label="Issued Date"
                          size="lg"
                          onChange={() => null}
                          value={issuedDate ? format(issuedDate) : ""}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 30 30"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                              />
                            </svg>
                          }
                        />
                      </PopoverHandler>
                      <PopoverContent>
                        <DayPicker
                          mode="single"
                          selected={issuedDate}
                          onSelect={setIssuedDate}
                          showOutsideDays
                          className="border-0"
                          classNames={{
                            caption:
                              "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm font-medium text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                              "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal",
                            day_range_end: "day-range-end",
                            day_selected:
                              "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 text-gray-900",
                            day_outside:
                              "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                          }}
                          // components={{
                          //   IconLeft: ({ ...props }) => (
                          //     <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                          //   ),
                          //   IconRight: ({ ...props }) => (
                          //     <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                          //   ),
                          // }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Popover placement="bottom">
                      <PopoverHandler>
                        <Input
                          label="Expiry Date"
                          size="lg"
                          onChange={() => null}
                          value={expiryDate ? format(expiryDate) : ""}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 30 30"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                              />
                            </svg>
                          }
                        />
                      </PopoverHandler>
                      <PopoverContent>
                        <DayPicker
                          mode="single"
                          selected={expiryDate}
                          onSelect={setExpiryDate}
                          showOutsideDays
                          className="border-0"
                          classNames={{
                            caption:
                              "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm font-medium text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                              "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal",
                            day_range_end: "day-range-end",
                            day_selected:
                              "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 text-gray-900",
                            day_outside:
                              "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                          }}
                          // components={{
                          //   IconLeft: ({ ...props }) => (
                          //     <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                          //   ),
                          //   IconRight: ({ ...props }) => (
                          //     <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                          //   ),
                          // }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Store Address
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Textarea label="Address" size="lg" />
                  </div>
                  <div>
                    <Select label="City" size="lg">
                      <Option>Los Angeles</Option>
                      <Option>New York</Option>
                      <Option>Chicago</Option>
                      <Option>San Francisco</Option>
                      <Option>Houston</Option>
                    </Select>
                  </div>
                  <div>
                    <Select label="State" size="lg">
                      <Option>California</Option>
                      <Option>New York</Option>
                      <Option>Illinois</Option>
                      <Option>California</Option>
                      <Option>Texas</Option>
                      <Option>Florida</Option>
                      <Option>Arizona</Option>
                      <Option>Ohio</Option>
                      <Option>Michigan</Option>
                      <Option>New Jersey</Option>
                    </Select>
                  </div>
                  <div>
                    <Input label="Zip Code" type="text" size="lg" />
                  </div>
                  <div>
                    <Select label="Country" size="lg">
                      <Option>Afghanistan</Option>
                      <Option>Albania</Option>
                      <Option>Algeria</Option>
                      <Option>Andorra</Option>
                      <Option>Angola</Option>
                      <Option>Antigua and Barbuda</Option>
                      <Option>Argentina</Option>
                      <Option>Armenia</Option>
                      <Option>Australia</Option>
                      <Option>Austria</Option>
                      <Option>Azerbaijan</Option>
                      <Option>Bahamas</Option>
                      <Option>Bahrain</Option>
                      <Option>Bangladesh</Option>
                      <Option>Barbados</Option>
                      <Option>Belarus</Option>
                      <Option>Belgium</Option>
                      <Option>Belize</Option>
                      <Option>Benin</Option>
                      <Option>Bhutan</Option>
                      <Option>Bolivia</Option>
                      <Option>Bosnia and Herzegovina</Option>
                      <Option>Botswana</Option>
                      <Option>Brazil</Option>
                      <Option>Brunei</Option>
                      <Option>Bulgaria</Option>
                      <Option>Burkina Faso</Option>
                      <Option>Burundi</Option>
                      <Option>Cambodia</Option>
                      <Option>Cameroon</Option>
                      <Option>Canada</Option>
                      <Option>Central African Republic</Option>
                      <Option>Chad</Option>
                      <Option>Chile</Option>
                      <Option>China</Option>
                      <Option>Colombia</Option>
                      <Option>Comoros</Option>
                      <Option>Congo</Option>
                      <Option>Cook Islands</Option>
                      <Option>Costa Rica</Option>
                      <Option>Côte d'Ivoire</Option>
                      <Option>Croatia</Option>
                      <Option>Cuba</Option>
                      <Option>Cyprus</Option>
                      <Option>Czech Republic</Option>
                      <Option>Democratic Republic of the Congo</Option>
                      <Option>Denmark</Option>
                      <Option>Djibouti</Option>
                      <Option>Dominica</Option>
                      <Option>Dominican Republic</Option>
                      <Option>East Timor</Option>
                      <Option>Ecuador</Option>
                      <Option>Egypt</Option>
                      <Option>El Salvador</Option>
                      <Option>Equatorial Guinea</Option>
                      <Option>Eritrea</Option>
                      <Option>Estonia</Option>
                      <Option>Ethiopia</Option>
                      <Option>Fiji</Option>
                      <Option>Finland</Option>
                      <Option>France</Option>
                      <Option>Gabon</Option>
                      <Option>Gambia</Option>
                      <Option>Georgia</Option>
                      <Option>Germany</Option>
                      <Option>Ghana</Option>
                      <Option>Greece</Option>
                      <Option>Grenada</Option>
                      <Option>Guatemala</Option>
                      <Option>Guinea</Option>
                      <Option>Guinea-Bissau</Option>
                      <Option>Guyana</Option>
                      <Option>Haiti</Option>
                      <Option>Honduras</Option>
                      <Option>Hungary</Option>
                      <Option>Iceland</Option>
                      <Option>India</Option>
                      <Option>Indonesia</Option>
                      <Option>Iran</Option>
                      <Option>Iraq</Option>
                      <Option>Ireland</Option>
                      <Option>Israel</Option>
                      <Option>Italy</Option>
                      <Option>Jamaica</Option>
                      <Option>Japan</Option>
                      <Option>Jordan</Option>
                      <Option>Kazakhstan</Option>
                      <Option>Kenya</Option>
                      <Option>Kiribati</Option>
                      <Option>Korea, North</Option>
                      <Option>Korea, South</Option>
                      <Option>Kosovo</Option>
                      <Option>Kuwait</Option>
                      <Option>Kyrgyzstan</Option>
                      <Option>Laos</Option>
                      <Option>Latvia</Option>
                      <Option>Lebanon</Option>
                      <Option>Lesotho</Option>
                      <Option>Liberia</Option>
                      <Option>Libya</Option>
                      <Option>Liechtenstein</Option>
                      <Option>Lithuania</Option>
                      <Option>Luxembourg</Option>
                      <Option>Macedonia</Option>
                      <Option>Madagascar</Option>
                      <Option>Malawi</Option>
                      <Option>Malaysia</Option>
                      <Option>Maldives</Option>
                      <Option>Mali</Option>
                      <Option>Malta</Option>
                      <Option>Marshall Islands</Option>
                      <Option>Mauritania</Option>
                      <Option>Mauritius</Option>
                      <Option>Mexico</Option>
                      <Option>Micronesia</Option>
                      <Option>Moldova</Option>
                      <Option>Monaco</Option>
                      <Option>Mongolia</Option>
                      <Option>Montenegro</Option>
                      <Option>Morocco</Option>
                      <Option>Mozambique</Option>
                      <Option>Myanmar</Option>
                      <Option>Namibia</Option>
                      <Option>Nauru</Option>
                      <Option>Nepal</Option>
                      <Option>Netherlands</Option>
                      <Option>New Zealand</Option>
                      <Option>Nicaragua</Option>
                      <Option>Niger</Option>
                      <Option>Nigeria</Option>
                      <Option>North Korea</Option>
                      <Option>Norway</Option>
                      <Option>Oman</Option>
                      <Option>Pakistan</Option>
                      <Option>Palau</Option>
                      <Option>Panama</Option>
                      <Option>Papua New Guinea</Option>
                      <Option>Paraguay</Option>
                      <Option>Peru</Option>
                      <Option>Philippines</Option>
                      <Option>Poland</Option>
                      <Option>Portugal</Option>
                      <Option>Qatar</Option>
                      <Option>Romania</Option>
                      <Option>Russia</Option>
                      <Option>Rwanda</Option>
                      <Option>Saint Kitts and Nevis</Option>
                      <Option>Saint Lucia</Option>
                      <Option>Saint Vincent and the Grenadines</Option>
                      <Option>Samoa</Option>
                      <Option>San Marino</Option>
                      <Option>Sao Tome and Principe</Option>
                      <Option>Saudi Arabia</Option>
                      <Option>Senegal</Option>
                      <Option>Serbia</Option>
                      <Option>Seychelles</Option>
                      <Option>Sierra Leone</Option>
                      <Option>Singapore</Option>
                      <Option>Slovakia</Option>
                      <Option>Slovenia</Option>
                      <Option>Solomon Islands</Option>
                      <Option>Somalia</Option>
                      <Option>South Africa</Option>
                      <Option>South Korea</Option>
                      <Option>South Sudan</Option>
                      <Option>Spain</Option>
                      <Option>Sri Lanka</Option>
                      <Option>Sudan</Option>
                      <Option>Suriname</Option>
                      <Option>Swaziland</Option>
                      <Option>Sweden</Option>
                      <Option>Switzerland</Option>
                      <Option>Syria</Option>
                      <Option>Taiwan</Option>
                      <Option>Tajikistan</Option>
                      <Option>Tanzania</Option>
                      <Option>Thailand</Option>
                      <Option>Togo</Option>
                      <Option>Tonga</Option>
                      <Option>Trinidad and Tobago</Option>
                      <Option>Tunisia</Option>
                      <Option>Turkey</Option>
                      <Option>Turkmenistan</Option>
                      <Option>Tuvalu</Option>
                      <Option>Uganda</Option>
                      <Option>Ukraine</Option>
                      <Option>United Arab Emirates</Option>
                      <Option>United Kingdom</Option>
                      <Option>United States</Option>
                      <Option>Uruguay</Option>
                      <Option>Uzbekistan</Option>
                      <Option>Vanuatu</Option>
                      <Option>Venezuela</Option>
                      <Option>Vietnam</Option>
                      <Option>Yemen</Option>
                      <Option>Zambia</Option>
                      <Option>Zimbabwe</Option>
                    </Select>
                  </div>

                  <div>
                    <Button fullWidth size="lg">
                      Next
                    </Button>
                  </div>
                  <div>
                    <Button fullWidth size="lg" variant="outlined">
                      Skip for now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
              <div className="">
                <h4 className="text-2xl font-medium trekking-wide font-emirates mb-4">
                  Payment Setup
                </h4>
                <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Bank Information
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Input label="Account Name" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="Account Number" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="Bank Name" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="Routing Number" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="IBAN Number" type="text" size="lg" />
                  </div>
                  <div>
                    <Input label="Swift Code" type="text" size="lg" />
                  </div>
                </div>

                <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
                  Bank Address
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Textarea label="Address" size="lg" />
                  </div>
                  <div>
                    <Select label="City" size="lg">
                      <Option>Los Angeles</Option>
                      <Option>New York</Option>
                      <Option>Chicago</Option>
                      <Option>San Francisco</Option>
                      <Option>Houston</Option>
                    </Select>
                  </div>
                  <div>
                    <Select label="State" size="lg">
                      <Option>California</Option>
                      <Option>New York</Option>
                      <Option>Illinois</Option>
                      <Option>California</Option>
                      <Option>Texas</Option>
                      <Option>Florida</Option>
                      <Option>Arizona</Option>
                      <Option>Ohio</Option>
                      <Option>Michigan</Option>
                      <Option>New Jersey</Option>
                    </Select>
                  </div>
                  <div>
                    <Input label="Zip Code" type="text" size="lg" />
                  </div>
                  <div>
                    <Select label="Country" size="lg">
                      <Option>Afghanistan</Option>
                      <Option>Albania</Option>
                      <Option>Algeria</Option>
                      <Option>Andorra</Option>
                      <Option>Angola</Option>
                      <Option>Antigua and Barbuda</Option>
                      <Option>Argentina</Option>
                      <Option>Armenia</Option>
                      <Option>Australia</Option>
                      <Option>Austria</Option>
                      <Option>Azerbaijan</Option>
                      <Option>Bahamas</Option>
                      <Option>Bahrain</Option>
                      <Option>Bangladesh</Option>
                      <Option>Barbados</Option>
                      <Option>Belarus</Option>
                      <Option>Belgium</Option>
                      <Option>Belize</Option>
                      <Option>Benin</Option>
                      <Option>Bhutan</Option>
                      <Option>Bolivia</Option>
                      <Option>Bosnia and Herzegovina</Option>
                      <Option>Botswana</Option>
                      <Option>Brazil</Option>
                      <Option>Brunei</Option>
                      <Option>Bulgaria</Option>
                      <Option>Burkina Faso</Option>
                      <Option>Burundi</Option>
                      <Option>Cambodia</Option>
                      <Option>Cameroon</Option>
                      <Option>Canada</Option>
                      <Option>Central African Republic</Option>
                      <Option>Chad</Option>
                      <Option>Chile</Option>
                      <Option>China</Option>
                      <Option>Colombia</Option>
                      <Option>Comoros</Option>
                      <Option>Congo</Option>
                      <Option>Cook Islands</Option>
                      <Option>Costa Rica</Option>
                      <Option>Côte d'Ivoire</Option>
                      <Option>Croatia</Option>
                      <Option>Cuba</Option>
                      <Option>Cyprus</Option>
                      <Option>Czech Republic</Option>
                      <Option>Democratic Republic of the Congo</Option>
                      <Option>Denmark</Option>
                      <Option>Djibouti</Option>
                      <Option>Dominica</Option>
                      <Option>Dominican Republic</Option>
                      <Option>East Timor</Option>
                      <Option>Ecuador</Option>
                      <Option>Egypt</Option>
                      <Option>El Salvador</Option>
                      <Option>Equatorial Guinea</Option>
                      <Option>Eritrea</Option>
                      <Option>Estonia</Option>
                      <Option>Ethiopia</Option>
                      <Option>Fiji</Option>
                      <Option>Finland</Option>
                      <Option>France</Option>
                      <Option>Gabon</Option>
                      <Option>Gambia</Option>
                      <Option>Georgia</Option>
                      <Option>Germany</Option>
                      <Option>Ghana</Option>
                      <Option>Greece</Option>
                      <Option>Grenada</Option>
                      <Option>Guatemala</Option>
                      <Option>Guinea</Option>
                      <Option>Guinea-Bissau</Option>
                      <Option>Guyana</Option>
                      <Option>Haiti</Option>
                      <Option>Honduras</Option>
                      <Option>Hungary</Option>
                      <Option>Iceland</Option>
                      <Option>India</Option>
                      <Option>Indonesia</Option>
                      <Option>Iran</Option>
                      <Option>Iraq</Option>
                      <Option>Ireland</Option>
                      <Option>Israel</Option>
                      <Option>Italy</Option>
                      <Option>Jamaica</Option>
                      <Option>Japan</Option>
                      <Option>Jordan</Option>
                      <Option>Kazakhstan</Option>
                      <Option>Kenya</Option>
                      <Option>Kiribati</Option>
                      <Option>Korea, North</Option>
                      <Option>Korea, South</Option>
                      <Option>Kosovo</Option>
                      <Option>Kuwait</Option>
                      <Option>Kyrgyzstan</Option>
                      <Option>Laos</Option>
                      <Option>Latvia</Option>
                      <Option>Lebanon</Option>
                      <Option>Lesotho</Option>
                      <Option>Liberia</Option>
                      <Option>Libya</Option>
                      <Option>Liechtenstein</Option>
                      <Option>Lithuania</Option>
                      <Option>Luxembourg</Option>
                      <Option>Macedonia</Option>
                      <Option>Madagascar</Option>
                      <Option>Malawi</Option>
                      <Option>Malaysia</Option>
                      <Option>Maldives</Option>
                      <Option>Mali</Option>
                      <Option>Malta</Option>
                      <Option>Marshall Islands</Option>
                      <Option>Mauritania</Option>
                      <Option>Mauritius</Option>
                      <Option>Mexico</Option>
                      <Option>Micronesia</Option>
                      <Option>Moldova</Option>
                      <Option>Monaco</Option>
                      <Option>Mongolia</Option>
                      <Option>Montenegro</Option>
                      <Option>Morocco</Option>
                      <Option>Mozambique</Option>
                      <Option>Myanmar</Option>
                      <Option>Namibia</Option>
                      <Option>Nauru</Option>
                      <Option>Nepal</Option>
                      <Option>Netherlands</Option>
                      <Option>New Zealand</Option>
                      <Option>Nicaragua</Option>
                      <Option>Niger</Option>
                      <Option>Nigeria</Option>
                      <Option>North Korea</Option>
                      <Option>Norway</Option>
                      <Option>Oman</Option>
                      <Option>Pakistan</Option>
                      <Option>Palau</Option>
                      <Option>Panama</Option>
                      <Option>Papua New Guinea</Option>
                      <Option>Paraguay</Option>
                      <Option>Peru</Option>
                      <Option>Philippines</Option>
                      <Option>Poland</Option>
                      <Option>Portugal</Option>
                      <Option>Qatar</Option>
                      <Option>Romania</Option>
                      <Option>Russia</Option>
                      <Option>Rwanda</Option>
                      <Option>Saint Kitts and Nevis</Option>
                      <Option>Saint Lucia</Option>
                      <Option>Saint Vincent and the Grenadines</Option>
                      <Option>Samoa</Option>
                      <Option>San Marino</Option>
                      <Option>Sao Tome and Principe</Option>
                      <Option>Saudi Arabia</Option>
                      <Option>Senegal</Option>
                      <Option>Serbia</Option>
                      <Option>Seychelles</Option>
                      <Option>Sierra Leone</Option>
                      <Option>Singapore</Option>
                      <Option>Slovakia</Option>
                      <Option>Slovenia</Option>
                      <Option>Solomon Islands</Option>
                      <Option>Somalia</Option>
                      <Option>South Africa</Option>
                      <Option>South Korea</Option>
                      <Option>South Sudan</Option>
                      <Option>Spain</Option>
                      <Option>Sri Lanka</Option>
                      <Option>Sudan</Option>
                      <Option>Suriname</Option>
                      <Option>Swaziland</Option>
                      <Option>Sweden</Option>
                      <Option>Switzerland</Option>
                      <Option>Syria</Option>
                      <Option>Taiwan</Option>
                      <Option>Tajikistan</Option>
                      <Option>Tanzania</Option>
                      <Option>Thailand</Option>
                      <Option>Togo</Option>
                      <Option>Tonga</Option>
                      <Option>Trinidad and Tobago</Option>
                      <Option>Tunisia</Option>
                      <Option>Turkey</Option>
                      <Option>Turkmenistan</Option>
                      <Option>Tuvalu</Option>
                      <Option>Uganda</Option>
                      <Option>Ukraine</Option>
                      <Option>United Arab Emirates</Option>
                      <Option>United Kingdom</Option>
                      <Option>United States</Option>
                      <Option>Uruguay</Option>
                      <Option>Uzbekistan</Option>
                      <Option>Vanuatu</Option>
                      <Option>Venezuela</Option>
                      <Option>Vietnam</Option>
                      <Option>Yemen</Option>
                      <Option>Zambia</Option>
                      <Option>Zimbabwe</Option>
                    </Select>
                  </div>

                  <div>
                    <Button fullWidth size="lg">
                      Next
                    </Button>
                  </div>
                  <div>
                    <Button fullWidth size="lg" variant="outlined">
                      Skip for now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
                <Button>Go to Store</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
