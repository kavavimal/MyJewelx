import { INDIA, attributeIDs } from "@/utils/constants";
import * as Yup from "yup";

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

export const shippingAddressValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),

  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  street: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  phone: Yup.string()
    .matches(/^(\+?\d{1,4}|\d{1,4})?\s?\d{7,10}$/, "Phone number is not valid")
    .required("Phone is required"),

  country: Yup.string()
    .min(2, "Country name must be at least 2 characters")
    .required("Country is required"),

  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),

  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Invalid Zip Code format")
    .required("Zip Code is required"),
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
  password: Yup.string()
    .required("Password is required")
    .max(8, "Password must have 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
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
