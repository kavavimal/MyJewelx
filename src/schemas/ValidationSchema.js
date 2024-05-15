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
  username: Yup.string().required("Username is required"),
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
