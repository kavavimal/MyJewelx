"use client";
import React from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { formatDateString } from "@/utils/helper";
import { Form, Formik, useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { update } from "@/utils/api";

const StoreSetup = ({ setActiveStep, vendor }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = vendor ? vendor?.id : searchParams.get("id");
  const formik = useFormik({
    initialValues: {
      license_number: vendor ? vendor.license_number : "",
      issued_at: vendor ? vendor.issued_at : "",
      issued_date: vendor ? vendor.issued_date : "",
      expiry_date: vendor ? vendor.expiry_date : "",
      licence_address: vendor ? vendor.licence_address : "",
      licence_city: vendor ? vendor.licence_city : "",
      licence_state: vendor ? vendor.licence_state : "",
      licence_zip_code: vendor ? vendor.licence_zip_code : "",
      licence_country: vendor ? vendor.licence_country : "",
    },
    onSubmit: async (values) => {
      try {
        const response = await update(`/api/vendor_registration/${id}`, values);
        if (response.status === 201) {
          if (vendor) {
            console.log("vendor details updated successfully");
            router.refresh();
          } else {
            setActiveStep((curr) => curr + 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="shadow-3xl p-10 bg-white max-w-3xl w-full rounded border-t-2 border-primary-200">
      <div className="">
        <h4 className="text-2xl font-medium trekking-wide font-emirates mb-4">
          Store Setup
        </h4>
        <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
          Trade License information
        </div>

        <Formik initialValues={formik.initialValues}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Trade License Number"
                  type="text"
                  size="lg"
                  name="license_number"
                  value={formik.values.license_number}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Input
                  label="Issued at"
                  type="text"
                  size="lg"
                  name="issued_at"
                  value={formik.values.issued_at}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      label="Issued Date"
                      size="lg"
                      name="issued_date"
                      onChange={formik.handleChange}
                      value={
                        formik.values.issued_date
                          ? formatDateString(formik.values.issued_date)
                          : ""
                      }
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
                      selected={formik.values.issued_date}
                      onSelect={(value) =>
                        formik.setFieldValue("issued_date", value)
                      }
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
                      name="expiry_date"
                      onChange={() => null}
                      value={
                        formik.values.expiry_date
                          ? formatDateString(formik.values.expiry_date)
                          : ""
                      }
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
                      selected={formik.values.expiry_date}
                      onSelect={(value) =>
                        formik.setFieldValue("expiry_date", value)
                      }
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
                <Textarea
                  label="Address"
                  size="lg"
                  name="licence_address"
                  value={formik.values.licence_address}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Input
                  label="City"
                  type="text"
                  size="lg"
                  name="licence_city"
                  value={formik.values.licence_city}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Select
                  label="State"
                  size="lg"
                  name="licence_state"
                  value={formik.values.licence_state ?? ""}
                  onChange={(value) =>
                    formik.setFieldValue("licence_state", value)
                  }
                >
                  <Option value="California">California</Option>
                  <Option value="New York">New York</Option>
                  <Option value="Illinois">Illinois</Option>
                  <Option value="California">California</Option>
                  <Option value="Texas">Texas</Option>
                  <Option value="Florida">Florida</Option>
                  <Option value="Arizona">Arizona</Option>
                  <Option value="Ohio">Ohio</Option>
                  <Option value="Michigan">Michigan</Option>
                  <Option value="New Jersey">New Jersey</Option>
                </Select>
              </div>
              <div>
                <Input
                  label="Zip Code"
                  type="text"
                  size="lg"
                  name="licence_zip_code"
                  value={formik.values.licence_zip_code}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Select
                  label="Country"
                  size="lg"
                  name="licence_country"
                  value={formik.values.licence_country ?? ""}
                  onChange={(value) =>
                    formik.setFieldValue("licence_country", value)
                  }
                >
                  <Option value="AF">Afghanistan</Option>
                  <Option value="AL">Albania</Option>
                  <Option value="DZ">Algeria</Option>
                  <Option value="AD">Andorra</Option>
                  <Option value="AO">Angola</Option>
                  <Option value="AI">Antigua and Barbuda</Option>
                  <Option value="AR">Argentina</Option>
                  <Option value="AM">Armenia</Option>
                  <Option value="AU">Australia</Option>
                  <Option value="AT">Austria</Option>
                  <Option value="AZ">Azerbaijan</Option>
                  <Option value="BS">Bahamas</Option>
                  <Option value="BH">Bahrain</Option>
                  <Option value="BD">Bangladesh</Option>
                  <Option value="BB">Barbados</Option>
                  <Option value="BY">Belarus</Option>
                  <Option value="BE">Belgium</Option>
                  <Option value="BZ">Belize</Option>
                  <Option value="BJ">Benin</Option>
                  <Option value="BT">Bhutan</Option>
                  <Option value="BO">Bolivia</Option>
                  <Option value="BA">Bosnia and Herzegovina</Option>
                  <Option value="BW">Botswana</Option>
                  <Option value="BR">Brazil</Option>
                  <Option value="BN">Brunei</Option>
                  <Option value="BG">Bulgaria</Option>
                  <Option value="BF">Burkina Faso</Option>
                  <Option value="BI">Burundi</Option>
                  <Option value="KH">Cambodia</Option>
                  <Option value="CM">Cameroon</Option>
                  <Option value="CA">Canada</Option>
                  <Option value="CF">Central African Republic</Option>
                  <Option value="TD">Chad</Option>
                  <Option value="CL">Chile</Option>
                  <Option value="CN">China</Option>
                  <Option value="CO">Colombia</Option>
                  <Option value="KM">Comoros</Option>
                  <Option value="CG">Congo</Option>
                  <Option value="KY">Cook Islands</Option>
                  <Option value="CR">Costa Rica</Option>
                  <Option value="CI">Côte d'Ivoire</Option>
                  <Option value="HR">Croatia</Option>
                  <Option value="CU">Cuba</Option>
                  <Option value="CY">Cyprus</Option>
                  <Option value="CZ">Czech Republic</Option>
                  <Option value="CD">Democratic Republic of the Congo</Option>
                  <Option value="DK">Denmark</Option>
                  <Option value="DJ">Djibouti</Option>
                  <Option value="DM">Dominica</Option>
                  <Option value="DO">Dominican Republic</Option>
                  <Option value="TL">East Timor</Option>
                  <Option value="EC">Ecuador</Option>
                  <Option value="EG">Egypt</Option>
                  <Option value="SV">El Salvador</Option>
                  <Option value="GQ">Equatorial Guinea</Option>
                  <Option value="ER">Eritrea</Option>
                  <Option value="EE">Estonia</Option>
                  <Option value="ET">Ethiopia</Option>
                  <Option value="FJ">Fiji</Option>
                  <Option value="FI">Finland</Option>
                  <Option value="FR">France</Option>
                  <Option value="GA">Gabon</Option>
                  <Option value="GM">Gambia</Option>
                  <Option value="GE">Georgia</Option>
                  <Option value="DE">Germany</Option>
                  <Option value="GH">Ghana</Option>
                  <Option value="GR">Greece</Option>
                  <Option value="GD">Grenada</Option>
                  <Option value="GT">Guatemala</Option>
                  <Option value="GN">Guinea</Option>
                  <Option value="GW">Guinea-Bissau</Option>
                  <Option value="GY">Guyana</Option>
                  <Option value="HT">Haiti</Option>
                  <Option value="HN">Honduras</Option>
                  <Option value="HU">Hungary</Option>
                  <Option value="IS">Iceland</Option>
                  <Option value="IN">India</Option>
                  <Option value="ID">Indonesia</Option>
                  <Option value="IR">Iran</Option>
                  <Option value="IQ">Iraq</Option>
                  <Option value="IE">Ireland</Option>
                  <Option value="IL">Israel</Option>
                  <Option value="IT">Italy</Option>
                  <Option value="JM">Jamaica</Option>
                  <Option value="JP">Japan</Option>
                  <Option value="JO">Jordan</Option>
                  <Option value="KZ">Kazakhstan</Option>
                  <Option value="KE">Kenya</Option>
                  <Option value="KI">Kiribati</Option>
                  <Option value="KP">Korea, North</Option>
                  <Option value="KR">Korea, South</Option>
                  <Option value="XK">Kosovo</Option>
                  <Option value="KW">Kuwait</Option>
                  <Option value="KG">Kyrgyzstan</Option>
                  <Option value="LA">Laos</Option>
                  <Option value="LV">Latvia</Option>
                  <Option value="LB">Lebanon</Option>
                  <Option value="LS">Lesotho</Option>
                  <Option value="LR">Liberia</Option>
                  <Option value="LY">Libya</Option>
                  <Option value="LI">Liechtenstein</Option>
                  <Option value="LT">Lithuania</Option>
                  <Option value="LU">Luxembourg</Option>
                  <Option value="MK">Macedonia</Option>
                  <Option value="MG">Madagascar</Option>
                  <Option value="MW">Malawi</Option>
                  <Option value="MY">Malaysia</Option>
                  <Option value="MV">Maldives</Option>
                  <Option value="ML">Mali</Option>
                  <Option value="MT">Malta</Option>
                  <Option value="MH">Marshall Islands</Option>
                  <Option value="MR">Mauritania</Option>
                  <Option value="MU">Mauritius</Option>
                  <Option value="MX">Mexico</Option>
                  <Option value="FM">Micronesia</Option>
                  <Option value="MD">Moldova</Option>
                  <Option value="MC">Monaco</Option>
                  <Option value="MN">Mongolia</Option>
                  <Option value="ME">Montenegro</Option>
                  <Option value="MA">Morocco</Option>
                  <Option value="MZ">Mozambique</Option>
                  <Option value="MM">Myanmar</Option>
                  <Option value="NA">Namibia</Option>
                  <Option value="NR">Nauru</Option>
                  <Option value="NP">Nepal</Option>
                  <Option value="NL">Netherlands</Option>
                  <Option value="NZ">New Zealand</Option>
                  <Option value="NI">Nicaragua</Option>
                  <Option value="NG">Niger</Option>
                  <Option value="NE">Nigeria</Option>
                  <Option value="KP">North Korea</Option>
                </Select>
              </div>

              {!vendor ? (
                <>
                  <div>
                    <Button fullWidth size="lg" type="submit">
                      Next
                    </Button>
                  </div>
                  <div>
                    <Button
                      fullWidth
                      size="lg"
                      variant="outlined"
                      type="button"
                      onClick={() => setActiveStep((curr) => curr + 1)}
                    >
                      Skip for now
                    </Button>
                  </div>
                </>
              ) : (
                <div className="col-span-2 flex justify-center items-center">
                  <Button fullWidth size="lg" type="submit">
                    Save
                  </Button>
                </div>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default StoreSetup;
