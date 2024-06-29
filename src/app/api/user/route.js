import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { AcountType } from "@prisma/client";

export async function POST(request) {
  try {
    const req = await request.formData();

    const firstName = req.get("firstName");
    const lastName = req.get("lastName");
    const email = req.get("email");

    const existingEmail = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "An user already Created with same Email Id." },
        { status: 401 }
      );
    }

    // const phone_number = req.get("phone_number");
    const password = req.get("password");
    const confirmPassword = req.get("confirm_password");
    // const account_type = req.get("account_type");
    const role = req.get("role");
    const account_type =
      role == 2
        ? AcountType.ADMIN
        : role == 6
        ? AcountType.VENDOR
        : AcountType.CUSTOMER;

    const userCreateQuery = {
      firstName: firstName ? String(firstName) : "",
      lastName: lastName ? String(lastName) : "",
      email: email ? String(email) : "",
      password: password ? await hash(password, 10) : "",
      account_type: account_type,
      role: {
        connect: {
          role_id: Number(role),
        },
      },
    };

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirm Password must be same" },
        { status: 401 }
      );
    }

    const file = req.get("file");
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

    if (profileImage) {
      userCreateQuery.image = {
        create: {
          path: profileImage,
          image_type: "user",
        },
      };
    }

    const result = await prisma.user.create({
      data: userCreateQuery,
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
