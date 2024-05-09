import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const permission_id = Number(params.id);
    if (!permission_id) {
      return NextResponse.json(
        { error: "Permission id missing" },
        { status: 400 }
      );
    }
    const res = await request.formData();
    let updateData = {};
    if (
      typeof res.get("permission_name") === "string" &&
      res.get("permission_name") !== ""
    ) {
      updateData.permission_name = res.get("permission_name");
    }
    if (
      typeof res.get("description") === "string" &&
      res.get("description") !== ""
    ) {
      updateData.description = res.get("description");
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
    if (!permission_id) {
      return NextResponse.json(
        { error: "Permission id missing" },
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
        { error: "Can't delete Role with associated rolePermission/s" },
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
