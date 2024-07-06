import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { AcountType } from "@prisma/client";

export async function PUT(request, { params }) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: String(params.id) },
      include: { image: true },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const req = await request.formData();
    const file = req.get("file");

    let updateData = {};

    if (
      typeof req.get("firstName") === "string" &&
      req.get("firstName") !== ""
    ) {
      updateData.firstName = req.get("firstName");
    }
    if (typeof req.get("lastName") === "string" && req.get("lastName") !== "") {
      updateData.lastName = req.get("lastName");
    }

    let user_image;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(
        process.cwd(),
        "/public/assets/uploads",
        `${updateData.firstName}_${file.name}`
      );
      await writeFile(path, buffer);

      user_image = `/assets/uploads/${updateData.firstName}_${file.name}`;

      if (existingUser.image?.path) {
        const oldFilePath = join(
          process.cwd(),
          "public",
          existingUser.image.path
        );
        try {
          await unlink(oldFilePath);
          console.log(`Successfully deleted ${oldFilePath}`);
        } catch (error) {
          console.error(`Error deleting file ${oldFilePath}:`, error);
        }
      }

      if (existingUser.image ) {
        updateData.image = {
          update: {
            path: user_image,
            image_type: "user",
          },
        };
      } else {
        updateData.image = {
          create: {
            path: user_image,
            image_type: "user",
          },
        };
      }
    }

    if (typeof req.get("role") === "string" && req.get("role") !== "") {
      const role = req.get("role");
      const account_type =
        role == 2
          ? AcountType.ADMIN
          : role == 6
          ? AcountType.VENDOR
          : AcountType.CUSTOMER;
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

    const vendorData = {};

    if (
      typeof req.get("store_name") === "string" &&
      req.get("store_name") !== ""
    ) {
      vendorData.store_name = req.get("store_name");
    }
    if (
      typeof req.get("store_url") === "string" &&
      req.get("store_url") !== ""
    ) {
      const store_url = req.get("store_url");
      const existing_store_url = await prisma.vendor.findUnique({
        where: {
          store_url: store_url,
          NOT: {
            user_id: String(params.id),
          },
        },
      });

      if (existing_store_url) {
        return NextResponse.json(
          { error: "A user already created with a similar store_url." },
          { status: 400 }
        );
      } else {
        vendorData.store_url = store_url;
      }
    }

    if (Object.keys(vendorData).length > 0) {
      await prisma.vendor.update({
        where: { user_id: String(params.id) },
        data: vendorData,
      });

      result.store_name = vendorData.store_name;
      result.store_url = vendorData.store_url;
    }

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { image: true },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const accountToDelete = await prisma.account.findFirst({
      where: { userId: userId },
    });

    if (accountToDelete) {
      await prisma.account.delete({
        where: { userId: userId },
      });
    }

    const vendorToDelete = await prisma.vendor.findFirst({
      where: { user_id: userId },
    });

    if (vendorToDelete) {
      await prisma.vendor.delete({
        where: { user_id: userId },
      });
    }

    const user_image_path = user?.image?.path;
    if (user_image_path) {
      const filePath = join(process.cwd(), "public", user_image_path);
      try {
        await unlink(filePath);
        console.log(`User image successfully deleted ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
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
