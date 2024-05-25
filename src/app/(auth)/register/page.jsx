import Image from "next/image";
import Form from "@/components/Form";
import Link from "next/link";
import "@/styles/globals.css";

export default function Register() {
  return (
    <div className="h-screen bg-[#FFFCF5] w-full overflow-auto">
      <div className="h-full flex items-center justify-center">
        <div className="shadow-3xl p-10 bg-white rounded-2xl max-w-md w-full">
          <div className="mb-5">
            <h4 className="text-2xl font-bold trekking-wide font-emirates">
              Create Your Account
            </h4>
          </div>
          <Form type="register" />
        </div>
      </div>
    </div>
  );
}
