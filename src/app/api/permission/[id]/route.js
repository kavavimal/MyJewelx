import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const permission_id = Number(params.id);

    const permission = await prisma.permission.findUnique({
      where: permission_id,
    });

    if (!permission) {
      return NextResponse.json(
        { error: "Can't find the permission with given permission_id" },
        { status: 400 }
      );
    }

    const req = await request.formData();
    let updateData = {};
    if (
      typeof req.get("permission_name") === "string" &&
      req.get("permission_name") !== ""
    ) {
      updateData.permission_name = req.get("permission_name");

      const exists = await prisma.permission.findFirst({
        where: {
          permission_name: updateData.permission_name,
          NOT: {
            permission_id: permission_id,
          },
        },
      });

      if (exists) {
        return NextResponse.json(
          {
            error: `${updateData.permission_name} permission is already created`,
          },
          { status: 400 }
        );
      }
    }

    if (
      typeof req.get("description") === "string" &&
      req.get("description") !== ""
    ) {
      updateData.description = req.get("description");
    }

    const criticalPermissions = await prisma.rolePermission.findMany({
      where: {
        permission_id: permission_id,
      },
    });

    if (criticalPermissions.length > 0) {
      return NextResponse.json(
        { error: "Can't update permission with associated rolePermission/s" },
        { status: 400 }
      );
    }

    const result = await prisma.permission.update({
      where: {
        permission_id: Number(params.id),
      },
      data: { ...updateData },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const permission_id = Number(params.id);

    const permission = await prisma.permission.findFirst({
      where: { permission_id: permission_id },
    });
    if (!permission) {
      return NextResponse.json(
        { error: "Can't find permission with given permission_id" },
        { status: 400 }
      );
    }
    //check if there are permission associated with the role

    const criticalPermissions = await prisma.rolePermission.findMany({
      where: {
        permission_id: permission_id,
      },
    });

    if (criticalPermissions.length > 0) {
      return NextResponse.json(
        { error: "Can't delete permission with associated rolePermission/s" },
        { status: 400 }
      );
    }

    const deletedPermission = await prisma.permission.delete({
      where: { permission_id: permission_id },
    });

    return NextResponse.json(deletedPermission);
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
