import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { AcountType } from "@prisma/client";

export async function POST(request) {
  try {
    const res = await request.formData();

    // const first_name = res.get("first_name");
    // const last_name = res.get("last_name");
    const firstName = res.get("firstName");
    const lastName = res.get("lastName");
    const email = res.get("email");

    const existingEmail = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "An user already Created with same Email Id." },
        { status: 401 }
      );
    }

    // const phone_number = res.get("phone_number");
    const password = res.get("password");
    const confirmPassword = res.get("confirm_password");
    // const account_type = res.get("account_type");
    const role = res.get("role");
    const account_type =
      role == 2
        ? AcountType.ADMIN
        : role == 6
        ? AcountType.VENDOR
        : AcountType.CUSTOMER;
    const file = res.get("file");
    let profileImage = "";

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
      profileImage = "/assets/uploads/" + timestamp + "_" + file.name;
    } else {
      return NextResponse.json(
        { error: "User profile image missing from the request" },
        { status: 401 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirm Password must be same" },
        { status: 401 }
      );
    }

    const result = await prisma.user.create({
      data: {
        // first_name: first_name ? String(first_name) : "",
        // last_name: last_name ? String(last_name) : "",
        firstName: firstName ? String(firstName) : "",
        lastName: lastName ? String(lastName) : "",
        email: email ? String(email) : "",
        // phone_number: phone_number ? String(phone_number) : "",
        password: password ? await hash(password, 10) : "",
        // account_type: account_type ? account_type : AcountType.CUSTOMER,
        account_type: account_type,
        image: profileImage,
        role: {
          connect: {
            role_id: Number(role),
          },
        },
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
