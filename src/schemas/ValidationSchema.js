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

export const genderValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export const patternValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export const productValidationSchema = Yup.object().shape({
  product_name: Yup.string().required('Product name is required'),
  category: Yup.number().required('Category is required'),
  subCategory: Yup.number().required('Sub category is required'),
  tags: Yup.array().min(1, 'At least one tag is required').required('Tags are required'),
  country_id: Yup.number().required('Country is required'),
  isOnlineBuyable: Yup.boolean().required('Is online buyable is required'),
  states: Yup.number().required('State is required'),
  status: Yup.string().required('Status is required'),
  collections: Yup.array().min(1, 'At least one collection is required').required('Collections are required'),
  patterns: Yup.array().min(1, 'At least one pattern is required').required('Patterns are required'),
  genders: Yup.array().min(1, 'At least one gender is required').required('Genders are required'),
  attributes: Yup.array().min(1, 'At least one attribute is required').required('Attributes are required'),
});