"use client";
import {
  Button,
  Input,
  Option,
  Select,
  Step,
  Stepper,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const ProductForm = ({ product }) => {
  const data = [
    {
      label: "General",
      value: "general",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M865.3 244.7c-.3-.3-61.1 59.8-182.1 180.6l-84.9-84.9l180.9-180.9c-95.2-57.3-217.5-42.6-296.8 36.7A244.42 244.42 0 0 0 419 432l1.8 6.7l-283.5 283.4c-6.2 6.2-6.2 16.4 0 22.6l141.4 141.4c6.2 6.2 16.4 6.2 22.6 0l283.3-283.3l6.7 1.8c83.7 22.3 173.6-.9 236-63.3c79.4-79.3 94.1-201.6 38-296.6"
          ></path>
        </svg>
      ),
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Inventory",
      value: "inventory",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4zM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5zm-9-5q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
          ></path>
        </svg>
      ),
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Shipping",
      value: "shipping",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 20q-1.25 0-2.125-.875T3 17H1V6q0-.825.588-1.412T3 4h14v4h3l3 4v5h-2q0 1.25-.875 2.125T18 20t-2.125-.875T15 17H9q0 1.25-.875 2.125T6 20m0-2q.425 0 .713-.288T7 17t-.288-.712T6 16t-.712.288T5 17t.288.713T6 18m12 0q.425 0 .713-.288T19 17t-.288-.712T18 16t-.712.288T17 17t.288.713T18 18m-1-5h4.25L19 10h-2z"
          ></path>
        </svg>
      ),
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Advanced",
      value: "advanced",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8c-21.1 21.2-32.8 49.2-32.8 79.1s11.7 57.9 32.8 79.1c21.2 21.1 49.2 32.8 79.1 32.8s57.9-11.7 79.1-32.8c21.1-21.2 32.8-49.2 32.8-79.1s-11.7-57.9-32.8-79.1a110.96 110.96 0 0 0-79.1-32.8m412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a442.5 442.5 0 0 0-79.6-137.7l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.3a353.4 353.4 0 0 0-98.9 57.3l-81.8-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a445.9 445.9 0 0 0-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57c0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0 0 25.8 25.7l2.7.5a448.3 448.3 0 0 0 158.8 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35m-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8s175.8 78.7 175.8 175.8s-78.7 175.8-175.8 175.8"
          ></path>
        </svg>
      ),
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [productName, setProductName] = React.useState("");

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="mb-5">
      <div className="flex items-center intro-y">
        <h2 className="text-2xl font-semibold mb-10">
          {product ? "Edit" : "Save"} Product
        </h2>
      </div>
      <form>
        <div className="flex flex-col gap-5">
          <div>
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
            </Stepper>
          </div>

          {activeStep === 0 && (
            <div className="grid items-center grid-cols-2 gap-5 p-7 shadow-3xl rounded-2xl bg-white">
              <div className="col-span-2">
                <h3 className="text-xl font-medium tracking-wide">
                  Product Information
                </h3>
              </div>
              <div>
                <Select
                  label="Category"
                  onChange={(e) => setProductName(e)}
                  size="lg"
                >
                  <Option value="Ring">Ring</Option>
                  <Option value="Bracelet">Bracelet</Option>
                  <Option value="Earrings">Earrings</Option>
                  <Option value="Chain">Chain</Option>
                  <Option value="Necklace">Necklace</Option>
                </Select>
              </div>
              <div>
                <Select label="Subcategory">
                  <Option>Option 1</Option>
                  <Option>Option 2</Option>
                  <Option>Option 3</Option>
                  <Option>Option 4</Option>
                  <Option>Option 5</Option>
                </Select>
              </div>
              {/* <Select label="Product Name">
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
                <Option>Option 4</Option>
                <Option>Option 5</Option>
              </Select> */}
              <Input label="Product Name" readOnly value={productName} />
              <div>
                <Input label="Extend Product Name" />
              </div>
              <div className="col-span-2">
                <Editor
                  apiKey="exrtc5unpz0rnnqzlce7w4eh4pww5sj8woyuvnwgy1e9w2l5"
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "table",
                      "image",
                      "bbcode",
                      "link",
                      "image paste",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help | \
                      table | image media | link",
                  }}
                  onEditorChange={(content, editor) => {
                    console.log("Content was updated:", content);
                  }}
                />
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="p-7 shadow-3xl rounded-2xl bg-white">
              <h3 className="text-xl mb-6 font-medium tracking-wide">
                Product Details
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <Select label="Product Data">
                    <Option>Simple Product</Option>
                    <Option>Variable Product</Option>
                  </Select>
                </div>
                <div>
                  <Tabs
                    value="general"
                    orientation="vertical"
                    className="items-start"
                  >
                    <TabsHeader className="w-40">
                      {data.map(({ label, value, icon }) => (
                        <Tab
                          key={value}
                          value={value}
                          className="items-start justify-start py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            {icon}
                            {label}
                          </div>
                        </Tab>
                      ))}
                    </TabsHeader>
                    <TabsBody>
                      {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value} className="py-0">
                          {desc}
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </Tabs>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
