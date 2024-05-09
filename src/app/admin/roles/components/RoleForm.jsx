"use client";
import React from "react";
import { Formik, useFormik } from "formik";
import { roleValidationSchema } from "@/schemas/ValidationSchema";
import { Button, Input } from "@material-tailwind/react";
import { post, update } from "@/utils/api";
import ReactSelect from "react-select";
import { useRouter } from "next/navigation";
const RoleForm = ({ permissions, role }) => {
  const router = useRouter();
  const options = permissions.map((permission) => ({
    value: permission.permission_id,
    label: permission.permission_name,
  }));
  const formik = useFormik({
    initialValues: {
      name: role ? role?.role_name : "",
      description: role ? role?.description : "",
      permissions: role
        ? role?.permissions?.map((permission) => permission.permission_id)
        : [],
    },
    validationSchema: roleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (role) {
        try {
          const data = {
            name: values.name,
            description: values.description,
            permissions: values.permissions.join(","),
          };
          const response = await update(`/api/role/${role.role_id}`, data);
          router.push("/admin/roles");
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const data = {
            name: values.name,
            description: values.description,
            permissions: values.permissions.join(","),
          };
          const response = await post("/api/role", data);
          router.push("/admin/roles");
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleSelectChange = (selectedOptions) => {
    formik.setFieldValue(
      "permissions",
      selectedOptions.map((option) => option.value)
    );
  };

  return (
    <div>
      <div className="flex items-center intro-y">
        <h2 className="text-2xl font-semibold mb-10">
          {role ? "Edit" : "Save"} role
        </h2>
      </div>
      <Formik initialValues={formik.initialValues}>
        <form
          onSubmit={formik.handleSubmit}
          className="p-7 shadow-3xl bg-white rounded-2xl"
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && formik.errors.name}
                />
              </div>
              <div className="w-1/2">
                <Input
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <ReactSelect
                isMulti
                onChange={handleSelectChange}
                options={options}
                name="permissions"
                value={
                  options.filter((option) =>
                    formik.values.permissions.includes(option.value)
                  ) ?? []
                }
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderWidth: "1px",
                    borderColor: "#000",
                    backgroundColor: "#fff",
                    padding: ".2rem",
                    color: "#222",
                    boxShadow: state.isFocused
                      ? "0 0 0 calc(1px + #fff) rgb(255 255 255)"
                      : "",
                    ":hover": {
                      borderColor: "#000",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#000" : "white",
                    color: state.isSelected ? "white" : "#1E293B",
                    borderRadius: ".5rem",
                    ":hover": {
                      backgroundColor: state.isSelected
                        ? "#222"
                        : "rgba(145, 158, 171, 0.16)",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    padding: ".7rem",
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "#fff" : "",
                  }),
                }}
              />
              {formik.touched.permissions && formik.errors.permissions && (
                <div className="text-red-500">{formik.errors.permissions}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="gradient"
                size="md"
                loading={formik.isSubmitting}
              >
                {role ? "Update" : "Save"} Role
              </Button>
            </div>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default RoleForm;
