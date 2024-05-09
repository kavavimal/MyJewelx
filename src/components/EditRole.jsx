"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import { Button, Input } from "@material-tailwind/react";

export default function EditRole({ role, permissions }) {
  const data = {
    name: role.role_name,
    description: role.description,
  };
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState();
  const handleInputChange = (event) => {
    if (event.target.name === "permissions[]") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => parseInt(option.value)
      );
      setFormData({ ...formData, [event.target.name]: selectedOptions });
    } else
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataValues = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      dataValues.set(key, value);
    });
    try {
      const response = await fetch("/api/role/" + role.role_id, {
        method: "PUT",
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
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center intro-y">
        <h2 className="text-2xl font-semibold mb-10">Edit role</h2>
      </div>
      {error && (
        <div className="mb-2 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-7 mb-4"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="mb-2 w-1/2">
              <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                value={formData?.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2 w-1/2">
              <Input
                label="Description"
                value={formData?.description || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={loading}
            >
              Save Role
            </Button>
          </div>
        </div>
      </form>
      {/* {loading && (
        <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
          <LoadingDots color="#808080" size="15px" />
        </div>
      )} */}
    </div>
  );
}
