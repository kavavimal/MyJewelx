import prisma from "@/lib/prisma";
import { AcountType, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";
import { join } from "path";
import { writeFile } from "fs/promises";
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
    const req = await request.formData();

    const vendorData = {
      email: req.get("email"),
      firstName: req.get("firstName"),
      lastName: req.get("lastName"),
      store_name: req.get("store_name"),
      store_url: req.get("store_url"),
      phone_number: req.get("phone_number"),
      role_id: Number(req.get("role_id")),
      account_type: AcountType.VENDOR,
      password: req.get("password"),
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

    const existing_store_url = await prisma.vendor.findUnique({
      where: { store_url: parsedVendorData.store_url },
    });

    if (existing_store_url) {
      return NextResponse.json(
        { error: "An user already Created with similar store_url." },
        { status: 400 }
      );
    }

    const userCreateQuery = {
      firstName: vendorData.firstName ? String(parsedVendorData.firstName) : "",
      lastName: vendorData.lastName ? String(parsedVendorData.lastName) : "",
      email: vendorData.email ? String(parsedVendorData.email) : "",
      phone_number: vendorData.phone_number
        ? String(parsedVendorData.phone_number)
        : "",
      password: vendorData.password
        ? await hash(parsedVendorData.password, 10)
        : "",
      account_type: AcountType.VENDOR,
      status: UserStatus.DISABLED,
      role: {
        connect: {
          role_id: Number(parsedVendorData.role_id),
        },
      },
    };

    const file = req.get("file");

    if (
      typeof file === "object" &&
      file !== "" &&
      file !== undefined &&
      file !== null
    ) {
      const timestamp = Date.now();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        timestamp + "_" + file.name
      );
      await writeFile(path, buffer);
      let profileImage = "/assets/uploads/" + timestamp + "_" + file.name;
      userCreateQuery.image = {
        create: {
          path: profileImage,
          image_type: "user",
        },
      };
    }

    const userResponse = await prisma.user.create({
      data: userCreateQuery,
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
