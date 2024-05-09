"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import Select from "react-select";

export default function AddRole({ permissions }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = permissions.map((permission) => ({
    value: permission.permission_id,
    label: permission.permission_name,
  }));
  const handleInputChange = (event) => {
    if (event.target.name === "permissions[]") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, [event.target.name]: selectedOptions });
    } else
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataValues = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      dataValues.set(key, value);
    });

    try {
      setLoading(true);
      const response = await fetch("/api/role", {
        method: "POST",
        body: dataValues,
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., server error)
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      } else {
        // Reset form and navigate on success
        setFormData({ name: "", description: "" });
        setError(null);
        router.push("/admin/roles");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center  h-10 intro-y">
        <h2 className="mr-5 text-lg font-medium truncate">New Role</h2>
      </div>
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-4"
      >
        {/* <h5 className="mb-2">Add Role</h5> */}
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
            value={formData?.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="description"
            value={formData?.description || ""}
            name="description"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="account_type"
          >
            Permission
          </label>
          {/* <select
            name="permissions[]"
            multiple
            size="8"
            onChange={handleInputChange}
          >
            {permissions.map((permission) => (
              <option
                key={permission.permission_id}
                value={permission.permission_id}
              >
                {permission.permission_name}
              </option>
            ))}
          </select> */}
          <Select
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
            options={options}
            isMulti
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      {loading && (
        <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
          <LoadingDots color="#808080" size="15px" />
        </div>
      )}
    </div>
  );
}
