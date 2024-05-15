import Image from "next/image";
import Form from "@/components/Form";
import Link from "next/link";
import "@/styles/globals.css";

export default function Register() {
  return (
    <div className="h-screen bg-[#F9FAFB] w-full overflow-auto">
      <div className="h-full flex items-center justify-center">
        <div className="shadow-3xl p-10 bg-white rounded-2xl max-w-md w-full">
          <div>
            <h4 className="text-2xl font-bold trekking-wide">
              Sign Up to Jewelx
            </h4>
          </div>
          <Form type="register" />
        </div>
      </div>
    </div>
  );
}
