import prisma from "@/lib/prisma";
import { AcountType } from "@prisma/client";
import { hash } from "bcrypt";
import { isCompanyEmail } from "company-email-validator";
import { NextResponse } from "next/server";
import { z } from "zod";

const vendorSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "email required"),
  firstName: z.string().min(1, "firstName required").max(20),
  lastName: z.string().min(1, "lastName required").max(20),
  store_name: z.string().min(1, "store_name required"),
  store_url: z
    .string()
    .url({ message: "Invalid url format" })
    .min(1, "store_url required"),
  phone_number: z.string().min(1, "phone_number required"),
  role_id: z.number(),
  password: z.string().min(1, "password required"),
});

export async function POST(request) {
  try {
    const res = await request.formData();

    const vendorData = {
      email: res.get("email"),
      firstName: res.get("firstName"),
      lastName: res.get("lastName"),
      store_name: res.get("store_name"),
      store_url: res.get("store_url"),
      phone_number: res.get("phone_number"),
      role_id: Number(res.get("role_id")),
      account_type: AcountType.VENDOR,
      password: res.get("password"),
    };

    const parsedVendorData = vendorSchema.parse(vendorData);

    const existingEmail = await prisma.user.findUnique({
      where: { email: parsedVendorData.email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "An user already Created with same Email Id." },
        { status: 400 }
      );
    }

    const isBusinessEmail = isCompanyEmail(parsedVendorData.email);

    if (!isBusinessEmail) {
      return NextResponse.json(
        {
          error: "Error validating business email. It's not a business email",
          email: parsedVendorData.email,
        },
        { status: 400 }
      );
    }

    const userResponse = await prisma.user.create({
      data: {
        firstName: vendorData.firstName
          ? String(parsedVendorData.firstName)
          : "",
        lastName: vendorData.lastName ? String(parsedVendorData.lastName) : "",
        email: vendorData.email ? String(parsedVendorData.email) : "",
        phone_number: vendorData.phone_number
          ? String(parsedVendorData.phone_number)
          : "",
        password: vendorData.password
          ? await hash(parsedVendorData.password, 10)
          : "",
        account_type: parsedVendorData.account_type,
        role: {
          connect: {
            role_id: Number(parsedVendorData.role_id),
          },
        },
      },
    });

    if (userResponse && userResponse.id) {
      const storeData = {
        user_id: userResponse.id,
        store_name: parsedVendorData.store_name,
        store_url: parsedVendorData.store_url,
      };

      const vendor = await prisma.vendor.create({
        data: storeData,
      });

      return NextResponse.json(
        { message: "vendor registration successful", vendor },
        { status: 201 }
      );
    } else
      return NextResponse.json(
        { error: "Error registering vendor" },
        { status: 400 }
      );
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json({
        error: "Validation error",
        issues: error.errors,
      });
    }
    NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
