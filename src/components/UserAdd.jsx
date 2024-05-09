"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AcountType } from "@prisma/client";
import LoadingDots from "@/components/loading-dots";
import Image from "next/image";
export default function UserAdd({ roles }) {
  const [loading, setLoading] = useState(false);
  // const userRoles = roles?.map((role) => {
  //   return { label: role.role_name, value: role.role_id };
  // });
  const userAcountType = Object.keys(AcountType)?.map((type) => {
    return { label: type, value: type };
  });
  const data = {
    username: "",
    email: "",
    password: "",
    role: "",
    account_type: "",
  };
  const [formData, setFormData] = useState(data);
  const router = useRouter();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFile = (e) => {
      setMessage("");
      let selectedFile = e.target.files[0];
      const fileType = selectedFile["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
          setFile(selectedFile);
      } else {
          setMessage("only image accepted");
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataValues = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      dataValues.set(key, value);
    });
    dataValues.append("file", file);

    try {
      const response = await fetch("/api/user/", {
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
        router.push("/admin/users");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
    setLoading(false);
  };

  return (
    <div>
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-4"
      >
        <h5 className="mb-2">Add user</h5>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            name="username"
            value={formData?.username || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_name"
          >
            Last Name:
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="last_name"
            name="last_name"
            value={formData?.last_name || ""}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Phone Number
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData?.phone_number || ""}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select name="role" onChange={handleInputChange}>
            <option selected disabled>Select Role</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="account_type"
          >
            Account Type
          </label>
          <select name="account_type" onChange={handleInputChange}>
            <option selected disabled>Account Type</option>
            {userAcountType.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            value={formData?.password || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="confirm_password"
            id="confirm_password"
            name="confirm_password"
            value={formData?.confirm_password || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-3/12 mt-4">
          <div className="w-full">
            <div className="">
              <label className="flex items-center justify-center">
                <input
                  type="file"
                  onChange={handleFile}
                  multiple="multiple"
                  name="files[]"
                />
              </label>
            </div>
          </div>
          <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
            {message}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {file &&
              (<div className="overflow-hidden relative">
                {/* <i
                  onClick={() => {
                    removeImage(file.name);
                  }}
                  className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                >
                  Remove
                </i> */}
                <Image
                  className="h-20 w-20 rounded-md"
                  src={URL.createObjectURL(file)}
                  alt="POD Product"
                  width={100}
                  height={100}
                />
              </div>
              )
            }
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
