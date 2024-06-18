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

    // if (
    //   typeof file === "object" &&
    //   file !== "" &&
    //   file !== undefined &&
    //   file !== null
    // ) {
    //   const timestamp = Date.now();
    //   const bytes = await file.arrayBuffer();
    //   const buffer = Buffer.from(bytes);
    //   const path = join(
    //     process.cwd(),
    //     "/public/assets/uploads",
    //     timestamp + "_" + file.name
    //   );
    //   await writeFile(path, buffer);

    //   profileImage = "/assets/uploads/" + timestamp + "_" + file.name;
    // }

    // if (profileImage) {
    //   updateData.image = {
    //     update: {
    //       path: profileImage,
    //       image_type: "user",
    //     },
    //   };
    // } else {
    //   updateData.image = {
    //     create: {
    //       path: profileImage,
    //       image_type: "user",
    //     },
    //   };
    // }

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
        const oldFilePath = join(process.cwd(), "public", existingUser.image.path);
        try {
          await unlink(oldFilePath);
          console.log(`Successfully deleted ${oldFilePath}`);
        } catch (error) {
          console.error(`Error deleting file ${oldFilePath}:`, error);
        }
      }

      if (user_image) {
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

    // await prisma.image.delete({                     //check if Cascade do the same
    //   where: { image_id: userImage.image_id },
    // });

    const user_image_path = user.image.path;
    if (user_image_path) {
      const filePath = join(process.cwd(), "public", user_image_path);
      try {
        await unlink(filePath);
        console.log(`User image successfully deleted ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    } else {
      NextResponse.json(
        { error: `${user_image_path} image can't be deleted` },
        { status: 400 }
      );
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
