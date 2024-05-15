import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { AcountType } from "@prisma/client";

export async function PUT(request, { params }) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: String(params.id) },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const res = await request.formData();
    const file = res.get("file");

    let updateData = {};
    // if (
    //   typeof res.get("first_name") === "string" &&
    //   res.get("first_name") !== ""
    // ) {
    //   updateData.first_name = res.get("first_name");
    // }
    // if (
    //   typeof res.get("last_name") === "string" &&
    //   res.get("last_name") !== ""
    // ) {
    //   updateData.last_name = res.get("last_name");
    // }
    if (typeof res.get("username") === "string" && res.get("username") !== "") {
      updateData.username = res.get("username");
    }
    // if (
    //   typeof res.get("phone_number") === "string" &&
    //   res.get("phone_number") !== ""
    // ) {
    //   updateData.phone_number = res.get("phone_number");
    // }
    // if (typeof res.get("email") === "string" && res.get("email") !== "") {

    //   updateData.email = res.get("email");
    // }
    // if (
    //   typeof res.get("account_type") === "string" &&
    //   res.get("account_type") !== ""
    // ) {
    //   updateData.account_type = res.get("account_type");
    // }

    if (
      typeof file === "object" &&
      file !== "" &&
      file !== undefined &&
      file !== null
    ) {
      let profileImage = "";
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
      updateData.image = profileImage;
    }

    if (typeof res.get("role") === "string" && res.get("role") !== "") {
      const role = res.get("role");
      const account_type = role == 2 ? AcountType.ADMIN : role == 6 ? AcountType.VENDOR : AcountType.CUSTOMER;
      updateData.role = {
        connect: {
          role_id: Number(role),
        },
      };

      updateData.account_type = account_type;
    }

    const result = await prisma.user.update({
      where: {
        id: String(params.id),
      },
      data: { ...updateData },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const userId = String(params.id);

    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const accountToDelete = await prisma.account.findFirst({
      where: { userId: userId },
    });

    if(accountToDelete) {
      await prisma.account.delete({
        where: { userId: userId }
      });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
