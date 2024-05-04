"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";

export default function AddRole() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
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
        router.push("/dashboard/roles");
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
        <Link
          href="/dashboard/roles"
          className="mx-1 bg-gray-500 hover:bg-gray-700 text-white  py-1 px-2 rounded-full"
        >
          {`< Back`}
        </Link>
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
