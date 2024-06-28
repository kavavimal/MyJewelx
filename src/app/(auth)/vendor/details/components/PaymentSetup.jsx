"use client";
import React from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { update } from "@/utils/api";

const PaymentSetup = ({ setActiveStep, vendor }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = vendor ? vendor?.id : searchParams.get("id");
  const formik = useFormik({
    initialValues: {
      account_name: vendor ? vendor.account_name : "",
      account_number: vendor ? vendor.account_number : "",
      bank_name: vendor ? vendor.bank_name : "",
      bank_iban: vendor ? vendor.bank_iban : "",
      bank_swift_code: vendor ? vendor.bank_swift_code : "",
      bank_address: vendor ? vendor.bank_address : "",
      bank_city: vendor ? vendor.bank_city : "",
      bank_state: vendor ? vendor.bank_state : "",
      bank_zip_code: vendor ? vendor.bank_zip_code : "",
      bank_country: vendor ? vendor.bank_country : "",
      routing_number: vendor ? vendor.routing_number : "",
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
          Payment Setup
        </h4>
        <Formik initialValues={formik.initialValues}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
              Bank Information
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Account Name"
                  type="text"
                  size="lg"
                  value={formik.values.account_name}
                  onChange={formik.handleChange}
                  name="account_name"
                />
              </div>
              <div>
                <Input
                  label="Account Number"
                  type="text"
                  size="lg"
                  value={formik.values.account_number}
                  onChange={formik.handleChange}
                  name="account_number"
                />
              </div>
              <div>
                <Input
                  label="Bank Name"
                  type="text"
                  size="lg"
                  name="bank_name"
                  onChange={formik.handleChange}
                  value={formik.values.bank_name}
                />
              </div>
              <div>
                <Input
                  label="Routing Number"
                  type="text"
                  size="lg"
                  name="routing_number"
                  onChange={formik.handleChange}
                  value={formik.values.routing_number}
                />
              </div>
              <div>
                <Input
                  label="IBAN Number"
                  type="text"
                  size="lg"
                  name="bank_iban"
                  onChange={formik.handleChange}
                  value={formik.values.bank_iban}
                />
              </div>
              <div>
                <Input
                  label="Swift Code"
                  type="text"
                  size="lg"
                  name="bank_swift_code"
                  onChange={formik.handleChange}
                  value={formik.values.bank_swift_code}
                />
              </div>
            </div>

            <div className="py-5 flex items-center text-lg font-light text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-neutral-600">
              Bank Address
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <Textarea
                  label="Address"
                  size="lg"
                  name="bank_address"
                  value={formik.values.bank_address ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Input
                  label="City"
                  type="text"
                  size="lg"
                  name="bank_city"
                  value={formik.values.bank_city ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Select
                  label="State"
                  size="lg"
                  name="bank_state"
                  value={formik.values.bank_state ?? ""}
                  onChange={formik.handleChange}
                >
                  <Option value="California">California</Option>
                  <Option value="New York">New York</Option>
                  <Option value="Illinois">Illinois</Option>
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
                  name="bank_zip_code"
                  value={formik.values.bank_zip_code ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <Select
                  label="Country"
                  size="lg"
                  name="bank_country"
                  value={formik.values.bank_country ?? ""}
                  onChange={(value) =>
                    formik.setFieldValue("bank_country", value)
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

export default PaymentSetup;
