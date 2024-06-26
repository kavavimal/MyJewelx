import { INDIA, attributeIDs } from "@/utils/constants";
import * as Yup from "yup";
import { z } from "zod";

export const permissionValidationSchema = Yup.object({
  permission_name: Yup.string().required("Please enter permission name"),
  description: Yup.string().required("Please enter description"),
});

export const roleValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  permissions: Yup.array()
    .min(1, "Select at least one permission")
    .required("Select at least one permission"),
});

export const userValidationSchema = Yup.object({
  firstName: Yup.string().required("FirstName is required"),
  lastName: Yup.string().required("LastName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  // account_type: Yup.string().required("Account type is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  // category_image: Yup.string().required("Category image is required"),
});

export const tagsValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export const countryValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  region: Yup.string().required("Region is required"),
});

export const registrationValidationSchema = Yup.object({
  firstName: Yup.string().required("FirstName is required"),
  lastName: Yup.string().required("LastName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const productAttributeValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export const productValueValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  attribute_id: Yup.string().required("Attribute is required"),
});

export const genderValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export const patternValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export const productValidationSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  category: Yup.number().required("Category is required"),
  subCategory: Yup.number().required("Sub category is required"),
  attributes: Yup.array()
    .min(1, "At least one attribute is required")
    .required("Attributes are required")
    .test("attributes-material", "Attributes must have material", (value) => {
      return value && value.includes(attributeIDs.MATERIAL);
    }),
});

export const additionalValidationSchema = Yup.object().shape({
  country_id: Yup.number().required("Country is required"),
  states: Yup.number().when("country_id", {
    is: INDIA,
    then: (schema) => schema.required("States are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  return_policy: Yup.string().required("Return policy is required"),
  delivery_includes: Yup.string().required("Delivery includes is required"),
});

export const variationValidationSchema = (isVariation) => {
  const baseSchema = {
    description: z
      .string()
      .min(1, "Description is required")
      .max(200, "Description must be less than 200 characters"),
    length: z.number().min(0, "Length is required"),
    width: z.number().min(0, "Width is required"),
    height: z.number().min(0, "Height is required"),
    thickness: z.number().min(0, "Thickness is required"),
    sku: z
      .string()
      .min(1, "SKU is required")
      .max(20, "SKU must be less than 20 characters"),
    stock_management: z.boolean().optional(),
    stock_status: z.enum(
      ["in_stock", "out_of_stock"],
      "Stock status is required"
    ),
    weight_unit: z
      .string()
      .min(1, "Weight unit is required")
      .max(20, "Weight unit must be less than 20 characters"),
    net_weight: z.number().min(0, "Net weight is required"),
    gross_weight: z
      .number()
      .min(0, "Gross weight should be greater than zero")
      .refine((val, ctx) => val >= ctx.parent.net_weight, {
        message: "Gross weight should be more than net weight",
      }),
    isPriceFixed: z.boolean(),
    regular_price: z
      .number()
      .optional()
      .refine(
        (val, ctx) => {
          if (ctx.parent.isPriceFixed && val === undefined) {
            return false;
          }
          return true;
        },
        { message: "Regular price is required when price is fixed" }
      ),
  };

  if (!isVariation) {
    baseSchema.files = z
      .array(
        z.object({
          size: z
            .number()
            .refine((val) => val <= FILE_SIZE, { message: "File too large" }),
          type: z.string().refine((val) => SUPPORTED_FORMATS.includes(val), {
            message: "Unsupported Format",
          }),
        })
      )
      .min(1, { message: "At least one image is required" });
  }

  return z.object(baseSchema);
};

export default variationValidationSchema;
